import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ClubService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview() {
    const [profile, programs, events, messages] = await Promise.all([
      this.prisma.clubProfile.findUnique({ where: { id: 1 } }),
      this.prisma.program.findMany({ orderBy: { id: 'asc' } }),
      this.prisma.event.findMany({ orderBy: { date: 'asc' } }),
      this.prisma.contactMessage.count(),
    ]);

    const currentYear = new Date().getFullYear();
    const yearsActive = profile ? currentYear - profile.foundedYear : 8;

    return {
      profile,
      programs,
      events,
      metrics: {
        yearsActive,
        programs: programs.length,
        events: events.length,
        messages,
      },
    };
  }

  getMessages() {
    return this.prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
