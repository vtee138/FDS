import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, CalendarDays, Inbox, LayoutDashboard, LogOut, Send, Users } from 'lucide-react';
import './styles.css';

type ClubOverview = {
  profile?: {
    name: string;
    slogan: string;
    university: string;
    foundedYear: number;
  };
  metrics: {
    yearsActive: number;
    programs: number;
    events: number;
    messages: number;
  };
  programs: Array<{ id: number; title: string; category: string; impact: string }>;
  events: Array<{ id: number; title: string; date: string; location: string }>;
};

const fallback: ClubOverview = {
  profile: {
    name: 'FPTU Data Science Club',
    slogan: 'Insights in our eyes',
    university: 'FPT University',
    foundedYear: 2018,
  },
  metrics: { yearsActive: 8, programs: 3, events: 2, messages: 0 },
  programs: [
    { id: 1, title: 'Data Bootcamp', category: 'Learning', impact: 'Onboard thanh vien moi nhanh hon.' },
    { id: 2, title: 'AI Product Lab', category: 'Product', impact: 'Bien insight thanh prototype.' },
    { id: 3, title: 'Research Circle', category: 'Research', impact: 'Tao van hoa hoc sau.' },
  ],
  events: [],
};

function useClubData() {
  const [data, setData] = React.useState<ClubOverview>(fallback);
  const [status, setStatus] = React.useState('Loading...');

  React.useEffect(() => {
    // 1. Check for token in URL hash (SSO from frontend)
    if (window.location.hash) {
      const params = new URLSearchParams(window.location.hash.substring(1));
      const token = params.get('token');
      if (token) localStorage.setItem('adminAccessToken', token);
      
      // Clean up URL hash
      window.history.replaceState(null, '', window.location.pathname);
    }

    // 2. Fetch data using token
    const token = localStorage.getItem('adminAccessToken');
    const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
    
    fetch(`${apiUrl}/club`, {
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) throw new Error('Unauthorized');
          throw new Error('API unavailable');
        }
        return response.json();
      })
      .then((payload) => {
        setData(payload);
        setStatus('Connected');
      })
      .catch((err) => {
        if (err.message === 'Unauthorized') setStatus('Unauthorized - Please login');
        else setStatus('API offline (Fallback mode)');
      });
  }, []);

  return { data, status };
}

function App() {
  const { data, status } = useClubData();
  const metrics = [
    { label: 'Years active', value: `${data.metrics.yearsActive}+`, icon: Activity },
    { label: 'Programs', value: data.metrics.programs, icon: LayoutDashboard },
    { label: 'Events', value: data.metrics.events, icon: CalendarDays },
    { label: 'Messages', value: data.metrics.messages, icon: Inbox },
  ];

  const handleLogout = async () => {
    const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

    // Call backend logout API to revoke refresh token cookie
    try {
      await fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // Ignore errors — we still clear local state
    }

    // Clear access token from localStorage
    localStorage.removeItem('adminAccessToken');

    // Redirect to frontend login page with logout flag
    window.location.href = 'http://localhost:3000/auth?logout=true';
  };

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="logo">FDS</div>
        <nav>
          <a className="active"><LayoutDashboard size={18} /> Dashboard</a>
          <a><Users size={18} /> Members</a>
          <a><CalendarDays size={18} /> Events</a>
          <a><Inbox size={18} /> Messages</a>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} /> Đăng xuất
        </button>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <span>{status}</span>
            <h1>{data.profile?.name}</h1>
            <p>{data.profile?.slogan}</p>
          </div>
          <button><Send size={18} /> Publish</button>
        </header>

        <div className="metricGrid">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article className="metric" key={metric.label}>
                <Icon size={22} />
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            );
          })}
        </div>

        <div className="workspace">
          <section className="panel">
            <div className="panelTitle">
              <h2>Programs</h2>
              <button>New</button>
            </div>
            <div className="rows">
              {data.programs.map((program) => (
                <article key={program.id}>
                  <div>
                    <strong>{program.title}</strong>
                    <span>{program.category}</span>
                  </div>
                  <p>{program.impact}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="panelTitle">
              <h2>Operations</h2>
              <button>Sync</button>
            </div>
            <div className="ops">
              <div>
                <span>API</span>
                <strong>{status}</strong>
              </div>
              <div>
                <span>Database</span>
                <strong>PostgreSQL</strong>
              </div>
              <div>
                <span>Founded</span>
                <strong>{data.profile?.foundedYear}</strong>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
