import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.event.deleteMany();
  await prisma.program.deleteMany();

  await prisma.clubProfile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'FPTU Data Science Club',
      acronym: 'FDS',
      slogan: 'Insights in our eyes',
      university: 'FPT University',
      foundedYear: 2018,
      description:
        'FDS la cong dong sinh vien yeu du lieu, AI va khoa hoc may tinh tai Dai hoc FPT, noi y tuong duoc bien thanh san pham va nghien cuu thuc chien.',
    },
  });

  await prisma.program.createMany({
    data: [
      {
        title: 'Data Bootcamp',
        category: 'Learning',
        description: 'Lo trinh Python, SQL, statistics, machine learning va dashboard cho thanh vien moi.',
        impact: 'Onboard thanh vien moi nhanh hon qua project thuc chien.',
      },
      {
        title: 'AI Product Lab',
        category: 'Product',
        description: 'Nhom xay dung san pham AI, chatbot, recommendation va computer vision.',
        impact: 'Bien kien thuc thanh demo co the trinh bay trong showcase.',
      },
      {
        title: 'Research Circle',
        category: 'Research',
        description: 'Doc paper, thuc nghiem mo hinh va chia se insight theo tung chu de.',
        impact: 'Tao van hoa hoc sau va phan bien co du lieu.',
      },
    ],
  });

  await prisma.event.createMany({
    data: [
      {
        title: 'FDS Data Day',
        date: new Date('2026-10-12T09:00:00.000Z'),
        location: 'FPT University',
        description: 'Ngay hoi chia se du an, lightning talk va networking cho cong dong du lieu.',
      },
      {
        title: 'AI Mini Hackathon',
        date: new Date('2026-11-08T02:00:00.000Z'),
        location: 'Innovation Lab',
        description: 'Cuoc thi 24h de xay dung prototype AI giai quyet bai toan trong truong.',
      },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
