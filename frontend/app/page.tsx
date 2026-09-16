import { ArrowRight, BarChart3, BrainCircuit, CalendarDays, Database, LineChart, Sparkles } from 'lucide-react';

type Program = {
  id: number;
  title: string;
  category: string;
  description: string;
  impact: string;
};

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
};

type ClubOverview = {
  profile: {
    name: string;
    acronym: string;
    slogan: string;
    university: string;
    foundedYear: number;
    description: string;
  };
  programs: Program[];
  events: Event[];
  metrics: {
    yearsActive: number;
    programs: number;
    events: number;
    messages: number;
  };
};

const fallback: ClubOverview = {
  profile: {
    name: 'FPTU Data Science Club',
    acronym: 'FDS',
    slogan: 'Insights in our eyes',
    university: 'FPT University',
    foundedYear: 2018,
    description:
      'Cong dong sinh vien yeu du lieu, AI va khoa hoc may tinh tai Dai hoc FPT, noi y tuong duoc bien thanh san pham va nghien cuu thuc chien.',
  },
  programs: [
    {
      id: 1,
      title: 'Data Bootcamp',
      category: 'Learning',
      description: 'Python, SQL, statistics, machine learning va dashboard cho thanh vien moi.',
      impact: 'Hoc nhanh qua project thuc chien.',
    },
    {
      id: 2,
      title: 'AI Product Lab',
      category: 'Product',
      description: 'Xay dung chatbot, recommendation, computer vision va cac demo AI ung dung.',
      impact: 'Bien insight thanh prototype.',
    },
    {
      id: 3,
      title: 'Research Circle',
      category: 'Research',
      description: 'Doc paper, thuc nghiem mo hinh va chia se insight theo tung chu de.',
      impact: 'Tang chieu sau hoc thuat.',
    },
  ],
  events: [
    {
      id: 1,
      title: 'FDS Data Day',
      date: '2026-10-12T09:00:00.000Z',
      location: 'FPT University',
      description: 'Ngay hoi chia se du an, lightning talk va networking cho cong dong du lieu.',
    },
    {
      id: 2,
      title: 'AI Mini Hackathon',
      date: '2026-11-08T02:00:00.000Z',
      location: 'Innovation Lab',
      description: 'Cuoc thi 24h de xay dung prototype AI giai quyet bai toan trong truong.',
    },
  ],
  metrics: { yearsActive: 8, programs: 3, events: 2, messages: 0 },
};

async function getClub(): Promise<ClubOverview> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

  try {
    const response = await fetch(`${apiUrl}/club`, { next: { revalidate: 60 } });
    if (!response.ok) return fallback;
    return response.json();
  } catch {
    return fallback;
  }
}

export default async function Home() {
  const club = await getClub();
  const stats = [
    { label: 'Nam hoat dong', value: `${club.metrics.yearsActive}+` },
    { label: 'Tracks san pham', value: `${club.metrics.programs}` },
    { label: 'Su kien sap toi', value: `${club.metrics.events}` },
  ];

  return (
    <main>
      <nav className="nav">
        <div className="brand">
          <span>FDS</span>
          <small>FPTU Data Science Club</small>
        </div>
        <div className="navLinks">
          <a href="#programs">Programs</a>
          <a href="#events">Events</a>
          <a href="#contact">Join</a>
        </div>
      </nav>

      <section className="hero">
        <div className="heroCopy">
          <span className="eyebrow"><Sparkles size={16} /> {club.profile.slogan}</span>
          <h1>{club.profile.name}</h1>
          <p>{club.profile.description}</p>
          <div className="heroActions">
            <a className="primary" href="#contact">
              Tham gia FDS <ArrowRight size={18} />
            </a>
            <a className="secondary" href="#programs">Kham pha chuong trinh</a>
          </div>
        </div>
        <div className="dataOrb" aria-label="FDS data visualization">
          <div className="radar">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="orbPanel">
            <Database size={28} />
            <strong>8 years of data curiosity</strong>
            <p>Learning, research, hackathons, and products shaped by student insight.</p>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="FDS highlights">
        {stats.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section id="programs" className="section">
        <div className="sectionTitle">
          <span>What we build</span>
          <h2>Tu insight den san pham du lieu</h2>
        </div>
        <div className="programGrid">
          {club.programs.map((program, index) => {
            const Icon = [BarChart3, BrainCircuit, LineChart][index % 3];
            return (
              <article className="programCard" key={program.id}>
                <Icon size={28} />
                <small>{program.category}</small>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <strong>{program.impact}</strong>
              </article>
            );
          })}
        </div>
      </section>

      <section id="events" className="section events">
        <div className="sectionTitle">
          <span>Upcoming</span>
          <h2>Lich hoat dong gan nhat</h2>
        </div>
        <div className="eventList">
          {(club.events.length ? club.events : fallback.events).map((event) => (
            <article key={event.id} className="eventItem">
              <CalendarDays size={24} />
              <div>
                <strong>{event.title}</strong>
                <span>{new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' }).format(new Date(event.date))} - {event.location}</span>
                <p>{event.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="join">
        <div>
          <span className="eyebrow"><Sparkles size={16} /> Join the signal</span>
          <h2>Muon xay dung tuong lai voi data?</h2>
          <p>FDS chao don sinh vien yeu phan tich, AI, engineering, design va nhung cau hoi hay.</p>
        </div>
        <a className="primary" href="mailto:fds@fpt.edu.vn">Lien he CLB</a>
      </section>
    </main>
  );
}
