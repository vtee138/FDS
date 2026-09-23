import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  CalendarDays,
  Check,
  ChevronDown,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  ShieldCheck,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
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

type MemberStatus = 'Active' | 'Pending' | 'Inactive';
type MemberRole = 'Core team' | 'Member' | 'Alumni';

type Member = {
  id: number;
  name: string;
  email: string;
  initials: string;
  cohort: string;
  role: MemberRole;
  status: MemberStatus;
  joined: string;
  track: string;
};

const mockMembers: Member[] = [
  { id: 1, name: 'Nguyen Minh Anh', email: 'minhanh.nguyen@fpt.edu.vn', initials: 'NA', cohort: 'K18', role: 'Core team', status: 'Active', joined: 'Sep 2024', track: 'Data Analytics' },
  { id: 2, name: 'Tran Duc Minh', email: 'ducminh.tran@fpt.edu.vn', initials: 'TM', cohort: 'K18', role: 'Core team', status: 'Active', joined: 'Sep 2024', track: 'Machine Learning' },
  { id: 3, name: 'Le Hoang Nam', email: 'hoangnam.le@fpt.edu.vn', initials: 'LN', cohort: 'K19', role: 'Member', status: 'Active', joined: 'Jan 2025', track: 'Data Engineering' },
  { id: 4, name: 'Pham Khanh Linh', email: 'khanhlinh.pham@fpt.edu.vn', initials: 'PL', cohort: 'K19', role: 'Member', status: 'Pending', joined: 'May 2025', track: 'Data Analytics' },
  { id: 5, name: 'Vo Gia Bao', email: 'giabao.vo@fpt.edu.vn', initials: 'VB', cohort: 'K17', role: 'Alumni', status: 'Inactive', joined: 'Aug 2023', track: 'Machine Learning' },
  { id: 6, name: 'Do Thuy Tien', email: 'thuytien.do@fpt.edu.vn', initials: 'DT', cohort: 'K20', role: 'Member', status: 'Pending', joined: 'Jun 2025', track: 'Research' },
  { id: 7, name: 'Bui Quang Huy', email: 'quanghuy.bui@fpt.edu.vn', initials: 'BH', cohort: 'K18', role: 'Member', status: 'Active', joined: 'Oct 2024', track: 'Data Engineering' },
  { id: 8, name: 'Nguyen Ha My', email: 'hamy.nguyen@fpt.edu.vn', initials: 'NM', cohort: 'K19', role: 'Member', status: 'Active', joined: 'Feb 2025', track: 'Research' },
];

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
  const [activeView, setActiveView] = React.useState<'dashboard' | 'members'>('members');
  const [members, setMembers] = React.useState<Member[]>(mockMembers);
  const [query, setQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'All status' | MemberStatus>('All status');
  const [roleFilter, setRoleFilter] = React.useState<'All roles' | MemberRole>('All roles');
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [newMemberName, setNewMemberName] = React.useState('');
  const [newMemberEmail, setNewMemberEmail] = React.useState('');
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

  const visibleMembers = members.filter((member) => {
    const matchesQuery = `${member.name} ${member.email} ${member.track}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === 'All status' || member.status === statusFilter;
    const matchesRole = roleFilter === 'All roles' || member.role === roleFilter;
    return matchesQuery && matchesStatus && matchesRole;
  });

  const toggleSelected = (memberId: number) => {
    setSelectedIds((current) => current.includes(memberId) ? current.filter((id) => id !== memberId) : [...current, memberId]);
  };

  const toggleAllVisible = () => {
    const visibleIds = visibleMembers.map((member) => member.id);
    const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));
    setSelectedIds((current) => allSelected ? current.filter((id) => !visibleIds.includes(id)) : Array.from(new Set([...current, ...visibleIds])));
  };

  const updateMemberStatus = (memberId: number, nextStatus: MemberStatus) => {
    setMembers((current) => current.map((member) => member.id === memberId ? { ...member, status: nextStatus } : member));
  };

  const removeMember = (memberId: number) => {
    setMembers((current) => current.filter((member) => member.id !== memberId));
    setSelectedIds((current) => current.filter((id) => id !== memberId));
  };

  const addMember = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = newMemberName.trim();
    const email = newMemberEmail.trim();
    if (!name || !email) return;
    const initials = name.split(' ').map((part) => part[0]).join('').slice(-2).toUpperCase();
    setMembers((current) => [{
      id: Date.now(), name, email, initials, cohort: 'K20', role: 'Member', status: 'Pending', joined: 'Today', track: 'Data Analytics',
    }, ...current]);
    setNewMemberName('');
    setNewMemberEmail('');
    setIsAddOpen(false);
  };

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="logo">FDS</div>
        <nav>
          <a className={activeView === 'dashboard' ? 'active' : ''} onClick={() => setActiveView('dashboard')}><LayoutDashboard size={18} /> Dashboard</a>
          <a className={activeView === 'members' ? 'active' : ''} onClick={() => setActiveView('members')}><Users size={18} /> Members</a>
          <a><CalendarDays size={18} /> Events</a>
          <a><Inbox size={18} /> Messages</a>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} /> Đăng xuất
        </button>
      </aside>

      <section className="content">
        {activeView === 'members' ? (
          <>
            <header className="pageHeading">
              <div>
                <span className="eyebrow">Community directory</span>
                <h1>Members</h1>
                <p>Manage your club community, roles and member access.</p>
              </div>
              <button className="primaryAction" onClick={() => setIsAddOpen(true)}><UserPlus size={17} /> Add member</button>
            </header>

            <div className="memberStats">
              <article><span>Total members</span><strong>{members.length}</strong><small><span className="trend">+12%</span> this semester</small></article>
              <article><span>Active members</span><strong>{members.filter((member) => member.status === 'Active').length}</strong><small>Engaged this month</small></article>
              <article><span>Pending review</span><strong>{members.filter((member) => member.status === 'Pending').length}</strong><small>Needs your attention</small></article>
              <article><span>Alumni</span><strong>{members.filter((member) => member.role === 'Alumni').length}</strong><small>Growing network</small></article>
            </div>

            <section className="memberPanel">
              <div className="directoryHeader">
                <div><h2>All members</h2><span>{visibleMembers.length} people in your directory</span></div>
                <button className="exportButton"><Send size={15} /> Export list</button>
              </div>
              <div className="filters">
                <label className="searchBox"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search members..." /></label>
                <label className="selectBox"><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'All status' | MemberStatus)}><option>All status</option><option>Active</option><option>Pending</option><option>Inactive</option></select><ChevronDown size={15} /></label>
                <label className="selectBox"><select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value as 'All roles' | MemberRole)}><option>All roles</option><option>Core team</option><option>Member</option><option>Alumni</option></select><ChevronDown size={15} /></label>
              </div>
              {selectedIds.length > 0 && <div className="bulkBar"><span>{selectedIds.length} selected</span><button onClick={() => setSelectedIds([])}>Clear selection</button><button className="bulkDanger" onClick={() => { selectedIds.forEach(removeMember); }}>Remove selected</button></div>}
              <div className="memberTableWrap">
                <table className="memberTable">
                  <thead><tr><th><button className={`checkBox ${visibleMembers.length > 0 && visibleMembers.every((member) => selectedIds.includes(member.id)) ? 'checked' : ''}`} onClick={toggleAllVisible}>{visibleMembers.length > 0 && visibleMembers.every((member) => selectedIds.includes(member.id)) && <Check size={13} />}</button></th><th>Member</th><th>Role</th><th>Status</th><th>Track</th><th>Joined</th><th /></tr></thead>
                  <tbody>{visibleMembers.map((member) => <tr key={member.id}>
                    <td><button className={`checkBox ${selectedIds.includes(member.id) ? 'checked' : ''}`} onClick={() => toggleSelected(member.id)}>{selectedIds.includes(member.id) && <Check size={13} />}</button></td>
                    <td><div className="memberIdentity"><span className="avatar">{member.initials}</span><div><strong>{member.name}</strong><span>{member.email}</span></div></div></td>
                    <td><span className={`roleTag ${member.role === 'Core team' ? 'core' : ''}`}>{member.role === 'Core team' && <ShieldCheck size={13} />}{member.role}</span></td>
                    <td><select className={`statusSelect ${member.status.toLowerCase()}`} value={member.status} onChange={(event) => updateMemberStatus(member.id, event.target.value as MemberStatus)}><option>Active</option><option>Pending</option><option>Inactive</option></select></td>
                    <td><span className="trackTag">{member.track}</span></td><td className="joinedDate">{member.joined}</td>
                    <td><button className="iconButton" title="Member actions"><MoreHorizontal size={18} /></button></td>
                  </tr>)}</tbody>
                </table>
                {visibleMembers.length === 0 && <div className="emptyState"><Users size={26} /><strong>No members found</strong><span>Try a different search or filter.</span></div>}
              </div>
              <div className="tableFooter"><span>Showing {visibleMembers.length} of {members.length} members</span><div><button className="paginationButton">Previous</button><button className="paginationButton current">1</button><button className="paginationButton">Next</button></div></div>
            </section>
          </>
        ) : (
        <>
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
        </>
        )}
      </section>
      {isAddOpen && <div className="modalBackdrop" onClick={() => setIsAddOpen(false)}><section className="modal" onClick={(event) => event.stopPropagation()}><div className="modalHeading"><div><span className="eyebrow">New profile</span><h2>Add member</h2></div><button className="closeButton" onClick={() => setIsAddOpen(false)}><X size={18} /></button></div><form onSubmit={addMember}><label>Full name<input autoFocus value={newMemberName} onChange={(event) => setNewMemberName(event.target.value)} placeholder="e.g. Nguyen Van A" /></label><label>Email address<input type="email" value={newMemberEmail} onChange={(event) => setNewMemberEmail(event.target.value)} placeholder="name@fpt.edu.vn" /></label><div className="modalActions"><button type="button" className="secondaryButton" onClick={() => setIsAddOpen(false)}>Cancel</button><button className="primaryAction" type="submit"><Plus size={16} /> Add member</button></div></form></section></div>}
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
