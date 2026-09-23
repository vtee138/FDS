import { Injectable } from '@nestjs/common';
@Injectable()
export class ClubService {
  /**
   * Public club content is static. Keeping it outside Prisma ensures the
   * Supabase database has only the requested user and session tables.
   */
  async getOverview() {
    const profile = {
      name: 'FPTU Data Science Club',
      acronym: 'FDS',
      slogan: 'Insights in our eyes',
      university: 'FPT University',
      foundedYear: 2018,
      description:
        'FDS la cong dong sinh vien yeu du lieu, AI va khoa hoc may tinh tai Dai hoc FPT.',
    };
    const programs = [
      {
        id: 1,
        title: 'Data Bootcamp',
        category: 'Learning',
        description: 'Python, SQL, statistics, machine learning va dashboard.',
        impact: 'Onboard thanh vien moi nhanh hon qua project thuc chien.',
      },
      {
        id: 2,
        title: 'AI Product Lab',
        category: 'Product',
        description: 'Nhom xay dung san pham AI, chatbot va computer vision.',
        impact: 'Bien kien thuc thanh demo co the trinh bay trong showcase.',
      },
      {
        id: 3,
        title: 'Research Circle',
        category: 'Research',
        description: 'Doc paper, thuc nghiem mo hinh va chia se insight.',
        impact: 'Tao van hoa hoc sau va phan bien co du lieu.',
      },
    ];
    const events = [
      {
        id: 1,
        title: 'FDS Data Day',
        date: new Date('2026-10-12T09:00:00.000Z'),
        location: 'FPT University',
        description: 'Ngay hoi chia se du an, lightning talk va networking.',
      },
      {
        id: 2,
        title: 'AI Mini Hackathon',
        date: new Date('2026-11-08T02:00:00.000Z'),
        location: 'Innovation Lab',
        description: 'Cuoc thi 24h xay dung prototype AI.',
      },
    ];

    return {
      profile,
      programs,
      events,
      metrics: {
        yearsActive: new Date().getFullYear() - profile.foundedYear,
        programs: programs.length,
        events: events.length,
        messages: 0,
      },
    };
  }

  getMessages() {
    // Contact-message persistence needs a separate table and is deliberately
    // not part of the requested two-table database design.
    return [];
  }
}
