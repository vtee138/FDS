import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GoogleAuthGuard } from './google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  private setVisitorSessionCookie(
    res: Response,
    sessionToken: string,
    expiresAt: Date,
  ) {
    res.cookie('visitorSession', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: Math.max(expiresAt.getTime() - Date.now(), 0),
    });
  }

  private async retireAnonymousSession(req: Request, res: Response) {
    await this.authService.removeAnonymousSession(req.cookies?.visitorSession);
    res.clearCookie('visitorSession', { httpOnly: true, sameSite: 'lax' });
  }

  private getSessionMetadata(req: Request) {
    const forwardedFor = req.headers['x-forwarded-for'];
    const forwardedIp = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor?.split(',')[0]?.trim();
    const ipAddress = forwardedIp ?? req.ip ?? req.socket.remoteAddress;

    return {
      // IPv6 addresses are at most 45 characters, matching the database limit.
      ipAddress: ipAddress?.slice(0, 45),
      userAddress: req.get('user-agent')?.slice(0, 2048) ?? 'Unknown user agent',
    };
  }

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(dto, this.getSessionMetadata(req));
    await this.retireAnonymousSession(req, res);
    this.setRefreshTokenCookie(res, result.refreshToken);
    const { refreshToken, ...rest } = result;
    return rest;
  }

  @Post('session')
  async createAnonymousSession(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const session = await this.authService.ensureAnonymousSession(
      req.cookies?.visitorSession,
      this.getSessionMetadata(req),
    );
    this.setVisitorSessionCookie(res, session.sessionToken, session.expiresAt);
    return { expiresAt: session.expiresAt };
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto, this.getSessionMetadata(req));
    await this.retireAnonymousSession(req, res);
    this.setRefreshTokenCookie(res, result.refreshToken);
    const { refreshToken, ...rest } = result;
    return rest;
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.refreshToken;
    if (!token) throw new UnauthorizedException('No refresh token found');
    const result = await this.authService.refresh(token, this.getSessionMetadata(req));
    this.setRefreshTokenCookie(res, result.refreshToken);
    const { refreshToken, ...rest } = result;
    return rest;
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.refreshToken;
    if (token) {
      await this.authService.logout(token);
      res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'lax' });
    }
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request & { user: { sub: string } }) {
    return this.authService.getProfile(req.user.sub);
  }

  // ── Google OAuth ────────────────────────────────────────

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {
    // Guard redirects to Google consent screen
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(
    @Req() req: Request & { user: { googleId: string; email: string; name: string } },
    @Res() res: Response,
  ) {
    const result = await this.authService.googleLogin(
      req.user,
      this.getSessionMetadata(req),
    );
    const frontendUrl = this.config.get<string>('FRONTEND_ORIGIN') ?? 'http://localhost:3000';

    await this.retireAnonymousSession(req, res);
    this.setRefreshTokenCookie(res, result.refreshToken);

    // Redirect to frontend with tokens in URL hash
    const redirectUrl = `${frontendUrl}/auth?accessToken=${result.accessToken}&user=${encodeURIComponent(JSON.stringify(result.user))}`;
    res.redirect(redirectUrl);
  }
}
