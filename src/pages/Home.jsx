import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// ─── Icons (inline SVG, no deps) ─────────────────────────────────────────────
const IconCompass = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconBookmark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
  </svg>
);
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IconChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconLogout = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconDots = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
  </svg>
);

// ─── Nav Config ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Explore",    path: "/home/explore",    icon: <IconCompass />,  badge: null },
  { label: "Slots",      path: "/home/slots",      icon: <IconCalendar />, badge: "3" },
  { label: "My Booking", path: "/home/mybooking",  icon: <IconBookmark />, badge: null },
  { label: "Profile",    path: "/home/profile",    icon: <IconUser />,     badge: null },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --brand:       #3B7597;
    --brand-light: #EBF4FA;
    --brand-mid:   #5B9FBF;
    --brand-dark:  #245A75;
    --brand-xdark: #163E52;
    --sidebar-bg:  #0E2430;
    --sidebar-border: rgba(255,255,255,0.06);
    --text-on-dark: rgba(255,255,255,0.85);
    --text-muted:  rgba(255,255,255,0.45);
    --page-bg:     #F4F7FA;
    --card-bg:     #FFFFFF;
    --border:      #E5EAF0;
    --text-primary: #16293A;
    --text-secondary: #64798A;
    --font-display: 'Clash Display', sans-serif;
    --font-body:    'Satoshi', sans-serif;
    --radius-sm:    8px;
    --radius-md:    12px;
    --radius-lg:    16px;
    --radius-xl:    20px;
    --sidebar-w:    258px;
    --sidebar-collapsed: 72px;
    --topbar-h:     66px;
    --transition:   0.22s cubic-bezier(0.4, 0, 0.2, 1);
  }

  html, body, #root { height: 100%; }

  .slotify-layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
    background: var(--page-bg);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
  }

  /* ── SIDEBAR ─────────────────────────────────────────── */
  .sidebar {
    width: var(--sidebar-w);
    min-width: var(--sidebar-w);
    background: var(--sidebar-bg);
    display: flex;
    flex-direction: column;
    transition: width var(--transition), min-width var(--transition);
    position: relative;
    z-index: 10;
    overflow: hidden;
  }
  .sidebar.collapsed {
    width: var(--sidebar-collapsed);
    min-width: var(--sidebar-collapsed);
  }

  /* accent line top */
  .sidebar::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--brand) 0%, var(--brand-mid) 100%);
  }

  /* ── Logo ─── */
  .sidebar-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 22px 18px 18px;
    border-bottom: 1px solid var(--sidebar-border);
    min-height: 70px;
    overflow: hidden;
  }
  .logo-mark {
    width: 38px; height: 38px;
    border-radius: var(--radius-md);
    background: var(--brand);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 18px;
    color: #fff;
    flex-shrink: 0;
    letter-spacing: -0.5px;
    box-shadow: 0 0 0 4px rgba(59,117,151,0.22);
  }
  .logo-text { overflow: hidden; white-space: nowrap; }
  .logo-name {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 17px;
    color: #fff;
    letter-spacing: -0.3px;
    line-height: 1;
  }
  .logo-sub {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 3px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  /* ── Nav label ─── */
  .nav-section-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
    padding: 18px 20px 8px;
    white-space: nowrap;
    overflow: hidden;
    opacity: 1;
    transition: opacity var(--transition), padding var(--transition);
  }
  .collapsed .nav-section-label {
    opacity: 0;
    padding-top: 12px;
    padding-bottom: 4px;
  }

  /* ── Nav ─── */
  .nav-list {
    flex: 1;
    padding: 6px 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow: hidden;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: var(--radius-md);
    cursor: pointer;
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-align: left;
    position: relative;
    transition: background var(--transition), color var(--transition);
  }
  .nav-item:hover {
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.75);
  }
  .nav-item.active {
    background: var(--brand);
    color: #fff;
    box-shadow: 0 4px 16px rgba(59,117,151,0.35);
  }
  .nav-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
  }
  .nav-label { flex: 1; letter-spacing: 0.01em; }
  .nav-badge {
    background: rgba(255,255,255,0.18);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    border-radius: 20px;
    padding: 1px 7px;
    flex-shrink: 0;
  }
  .nav-item.active .nav-badge {
    background: rgba(255,255,255,0.25);
  }

  /* ── Collapse toggle ─── */
  .collapse-btn {
    margin: 0 12px 10px;
    padding: 9px;
    border-radius: var(--radius-md);
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--sidebar-border);
    color: var(--text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background var(--transition), color var(--transition);
  }
  .collapse-btn:hover {
    background: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.7);
  }

  /* ── User footer ─── */
  .sidebar-footer {
    border-top: 1px solid var(--sidebar-border);
    padding: 14px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .user-row {
    display: flex;
    align-items: center;
    gap: 10px;
    overflow: hidden;
  }
  .user-avatar {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: var(--brand);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 13px;
    color: #fff;
    flex-shrink: 0;
    box-shadow: 0 0 0 2px rgba(59,117,151,0.4);
  }
  .user-info { overflow: hidden; flex: 1; }
  .user-name {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.88);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user-role {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 1px;
  }
  .user-dots {
    flex-shrink: 0;
    color: var(--text-muted);
    cursor: pointer;
    padding: 2px;
  }
  .logout-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 12px;
    border-radius: var(--radius-md);
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.2);
    color: #f87171;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background var(--transition);
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }
  .logout-btn:hover { background: rgba(239,68,68,0.18); }

  /* ── MAIN ─────────────────────────────────────────── */
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* ── Topbar ─── */
  .topbar {
    height: var(--topbar-h);
    background: var(--card-bg);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
    flex-shrink: 0;
  }
  .topbar-left { display: flex; flex-direction: column; gap: 2px; }
  .page-title {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.3px;
    line-height: 1;
  }
  .page-breadcrumb {
    font-size: 12px;
    color: var(--text-secondary);
  }
  .breadcrumb-sep { margin: 0 5px; opacity: 0.5; }
  .breadcrumb-active { color: var(--brand); font-weight: 500; }

  .topbar-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .topbar-search {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--page-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 7px 14px;
    color: var(--text-secondary);
    font-family: var(--font-body);
    font-size: 13px;
  }
  .topbar-search input {
    border: none;
    background: transparent;
    outline: none;
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: 13px;
    width: 160px;
  }
  .topbar-search input::placeholder { color: var(--text-secondary); }
  .icon-btn {
    width: 36px; height: 36px;
    border-radius: var(--radius-md);
    background: var(--page-bg);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: var(--text-secondary);
    position: relative;
    transition: background var(--transition), border-color var(--transition);
  }
  .icon-btn:hover { background: var(--brand-light); border-color: var(--brand); color: var(--brand); }
  .notif-dot {
    position: absolute;
    top: 6px; right: 6px;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #ef4444;
    border: 2px solid var(--card-bg);
  }
  .topbar-avatar {
    width: 36px; height: 36px;
    border-radius: var(--radius-md);
    background: var(--brand);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 13px;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 0 0 2px var(--brand-light);
  }

  /* ── Content ─── */
  .content {
    flex: 1;
    overflow-y: auto;
    padding: 28px;
  }
  .content::-webkit-scrollbar { width: 6px; }
  .content::-webkit-scrollbar-track { background: transparent; }
  .content::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }
`;

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({ fullName: "Loading...", initials: ".." });

  useEffect(() => {
    const storedName = localStorage.getItem("user_fullname") || "Guest User";
    setUser({
      fullName: storedName,
      initials: storedName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2),
    });
  }, []);

  const handleLogout = () => { localStorage.clear(); navigate("/login"); };

  const currentPage = NAV_ITEMS.find((item) => location.pathname === item.path);

  return (
    <>
      <style>{CSS}</style>
      <div className="slotify-layout">

        {/* ── SIDEBAR ─────────────────── */}
        <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>

          {/* Logo */}
          <div className="sidebar-logo">
            <div className="logo-mark">S</div>
            {!collapsed && (
              <div className="logo-text">
                <div className="logo-name">Slotify</div>
                <div className="logo-sub">Booking System</div>
              </div>
            )}
          </div>

          {/* Nav label */}
          <div className="nav-section-label">Main Menu</div>

          {/* Nav items */}
          <nav className="nav-list">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  className={`nav-item${active ? " active" : ""}`}
                  onClick={() => navigate(item.path)}
                  title={collapsed ? item.label : undefined}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!collapsed && <span className="nav-label">{item.label}</span>}
                  {!collapsed && item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Collapse btn */}
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
          </button>

          {/* Footer */}
          <div className="sidebar-footer">
            <div className="user-row">
              <div className="user-avatar">{user.initials}</div>
              {!collapsed && (
                <>
                  <div className="user-info">
                    <div className="user-name">{user.fullName}</div>
                    <div className="user-role">Member</div>
                  </div>
                  <span className="user-dots"><IconDots /></span>
                </>
              )}
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <IconLogout />
              {!collapsed && "Logout"}
            </button>
          </div>
        </aside>

        {/* ── MAIN ─────────────────────── */}
        <div className="main">

          {/* Topbar */}
          <header className="topbar">
            <div className="topbar-left">
              <div className="page-title">{currentPage?.label || "Dashboard"}</div>
              <div className="page-breadcrumb">
                Slotify
                <span className="breadcrumb-sep">/</span>
                <span className="breadcrumb-active">{currentPage?.label || "Dashboard"}</span>
              </div>
            </div>
            <div className="topbar-right">
              <div className="topbar-search">
                <IconSearch />
                <input placeholder="Search..." />
              </div>
              <button className="icon-btn">
                <IconBell />
                <span className="notif-dot" />
              </button>
              <div className="topbar-avatar">{user.initials}</div>
            </div>
          </header>

          {/* Page Content */}
          <main className="content">
            <Outlet />
          </main>
        </div>

      </div>
    </>
  );
}