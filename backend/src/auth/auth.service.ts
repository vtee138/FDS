import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma.service';
import { LoginDto, RegisterDto } from './dto';

export type SessionMetadata = {
  ipAddress?: string;
  userAddress: string;
};

type AuthUser = {
  id: bigint;
  email: string;
  name: string;
  role: Role;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  /** Register a new account and record the device session that created it. */
  async register(dto: RegisterDto, sessionMetadata: SessionMetadata) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        name: dto.name,
        // Public registration must use the database's guest default. Roles are
        // assigned later by an authorised administrator, not by request input.
        role: Role.GUEST,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.saveSession(user.id, tokens.refreshToken, sessionMetadata);

    return { user: this.serializeUser(user), ...tokens };
  }

  /** Login with email and password, creating a session for this device. */
  async login(dto: LoginDto, sessionMetadata: SessionMetadata) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.saveSession(user.id, tokens.refreshToken, sessionMetadata);

    return { user: this.serializeUser(user), ...tokens };
  }

  /** Login or register via Google OAuth, then persist that browser's session. */
  async googleLogin(
    googleUser: { googleId: string; email: string; name: string },
    sessionMetadata: SessionMetadata,
  ) {
    let user = await this.prisma.user.findUnique({
      where: { googleId: googleUser.googleId },
    });

    if (!user) {
      user = await this.prisma.user.findUnique({
        where: { email: googleUser.email },
      });

      if (user) {
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: { googleId: googleUser.googleId },
        });
      } else {
        user = await this.prisma.user.create({
          data: {
            email: googleUser.email,
            name: googleUser.name,
            googleId: googleUser.googleId,
            role: Role.GUEST,
          },
        });
      }
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.saveSession(user.id, tokens.refreshToken, sessionMetadata);

    return { user: this.serializeUser(user), ...tokens };
  }

  /** Rotate a valid device-session token. */
  async refresh(refreshToken: string, sessionMetadata: SessionMetadata) {
    const stored = await this.prisma.session.findUnique({
      where: { sessionToken: refreshToken },
      include: { user: true },
    });

    if (!stored || stored.expiresAt <= new Date() || !stored.user) {
      if (stored) {
        await this.prisma.session.delete({ where: { id: stored.id } });
      }
      throw new UnauthorizedException('Invalid or expired session');
    }

    await this.prisma.session.delete({ where: { id: stored.id } });

    const tokens = await this.generateTokens(
      stored.user.id,
      stored.user.email,
      stored.user.role,
    );
    await this.saveSession(stored.user.id, tokens.refreshToken, sessionMetadata);

    return tokens;
  }

  /** Logout revokes only the supplied browser/device session. */
  async logout(refreshToken: string) {
    await this.prisma.session
      .delete({ where: { sessionToken: refreshToken } })
      .catch(() => undefined);
    return { message: 'Logged out' };
  }

  /**
   * Start (or retain) a browser session for a visitor who has not logged in.
   * The nullable user_id is what distinguishes this row from an account session.
   */
  async ensureAnonymousSession(
    existingSessionToken: unknown,
    sessionMetadata: SessionMetadata,
  ) {
    const now = new Date();
    if (
      typeof existingSessionToken === 'string' &&
      existingSessionToken.length > 0 &&
      existingSessionToken.length <= 255
    ) {
      const existing = await this.prisma.session.findUnique({
        where: { sessionToken: existingSessionToken },
      });
      if (
        existing &&
        existing.userId === null &&
        existing.expiresAt > now
      ) {
        return {
          sessionToken: existing.sessionToken,
          expiresAt: existing.expiresAt,
        };
      }
    }

    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + 7);
    const sessionToken = randomBytes(32).toString('base64url');

    await this.prisma.session.deleteMany({
      where: { expiresAt: { lte: now } },
    });
    await this.prisma.session.create({
      data: {
        sessionToken,
        ipAddress: sessionMetadata.ipAddress,
        userAddress: sessionMetadata.userAddress,
        expiresAt,
      },
    });

    return { sessionToken, expiresAt };
  }

  /** Remove the transient pre-login record after this browser authenticates. */
  async removeAnonymousSession(sessionToken: unknown) {
    if (
      typeof sessionToken !== 'string' ||
      sessionToken.length === 0 ||
      sessionToken.length > 255
    ) {
      return;
    }

    await this.prisma.session.deleteMany({
      where: { sessionToken, userId: null },
    });
  }

  async getProfile(userId: string) {
    let id: bigint;
    try {
      id = BigInt(userId);
    } catch {
      throw new UnauthorizedException('Invalid user identifier');
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return { ...this.serializeUser(user), createdAt: user.createdAt };
  }

  private async generateTokens(userId: bigint, email: string, role: Role) {
    // JSON Web Token payloads cannot contain BigInt values. A decimal string
    // preserves the full PostgreSQL BIGINT identifier without precision loss.
    const payload = { sub: userId.toString(), email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: this.config.get<string>('JWT_SECRET') ?? 'jwt_dev_secret',
        expiresIn: '15m',
      }),
      this.jwt.signAsync(payload, {
        secret:
          this.config.get<string>('JWT_REFRESH_SECRET') ??
          'jwt_refresh_dev_secret',
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async saveSession(
    userId: bigint,
    sessionToken: string,
    sessionMetadata: SessionMetadata,
  ) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // The scheduled database task is the primary cleanup mechanism. This keeps
    // the table tidy as well if the scheduler is delayed between executions.
    await this.prisma.session.deleteMany({
      where: { expiresAt: { lte: new Date() } },
    });
    await this.prisma.session.create({
      data: {
        userId,
        sessionToken,
        ipAddress: sessionMetadata.ipAddress,
        userAddress: sessionMetadata.userAddress,
        expiresAt,
      },
    });
  }

  private serializeUser(user: AuthUser) {
    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
