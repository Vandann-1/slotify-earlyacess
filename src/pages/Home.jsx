import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconCompass = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconBookmark = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
  </svg>
);
const IconUser = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconBell = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconSettings = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
);

// ─── Nav Config ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Explore",    path: "/home/explore",    icon: <IconCompass />,  badge: null },
  { label: "Slots",      path: "/home/slots",      icon: <IconCalendar />, badge: "3" },
  { label: "My Booking", path: "/home/mybooking",  icon: <IconBookmark />, badge: null },
  { label: "Profile",    path: "/home/profile",    icon: <IconUser />,     badge: null },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Syne:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --brand:         #2F2FE4;
    --brand-hover:   #2424c4;
    --brand-light:   #EEEEFF;
    --brand-mid:     #5858EC;
    --brand-xlight:  #F5F5FF;
    --nav-bg:        #2F2FE4;
    --nav-border:    rgba(255,255,255,0.12);
    --page-bg:       #F7F8FC;
    --card-bg:       #FFFFFF;
    --border:        #E8ECF2;
    --text-primary:  #0D0F1C;
    --text-secondary:#6B7280;
    --text-on-brand: #FFFFFF;
    --text-nav-idle: rgba(255,255,255,0.72);
    --text-nav-active: #FFFFFF;
    --success:       #10B981;
    --warning:       #F59E0B;
    --danger:        #EF4444;
    --font-display:  'Syne', sans-serif;
    --font-body:     'Plus Jakarta Sans', sans-serif;
    --radius-sm:     6px;
    --radius-md:     10px;
    --radius-lg:     14px;
    --radius-xl:     20px;
    --nav-h:         62px;
    --subnav-h:      46px;
    --shadow-sm:     0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md:     0 4px 16px rgba(47,47,228,0.10);
    --shadow-lg:     0 8px 32px rgba(47,47,228,0.15);
    --transition:    0.18s cubic-bezier(0.4,0,0.2,1);
  }

  html, body, #root { height: 100%; }

  .slotify-app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--page-bg);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
  }

  /* ── TOP NAV ─────────────────────────────────────────── */
  .topnav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--nav-bg);
    border-bottom: 1px solid var(--nav-border);
    box-shadow: 0 2px 20px rgba(47,47,228,0.18);
  }

  /* Primary bar */
  .topnav-primary {
    height: var(--nav-h);
    display: flex;
    align-items: center;
    padding: 0 32px;
    gap: 0;
    max-width: 1440px;
    margin: 0 auto;
    width: 100%;
  }

  /* Logo */
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    flex-shrink: 0;
    margin-right: 36px;
    cursor: pointer;
  }
  .logo-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(255,255,255,0.2);
    border: 1.5px solid rgba(255,255,255,0.3);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 17px;
    color: #fff;
    letter-spacing: -0.5px;
    backdrop-filter: blur(8px);
    transition: background var(--transition), transform var(--transition);
  }
  .nav-logo:hover .logo-icon {
    background: rgba(255,255,255,0.28);
    transform: scale(1.04);
  }
  .logo-wordmark {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 20px;
    color: #fff;
    letter-spacing: -0.5px;
  }
  .logo-dot {
    color: rgba(255,255,255,0.55);
  }

  /* Nav links — primary */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 2px;
    flex: 1;
  }
  .nav-link {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 8px 14px;
    border-radius: var(--radius-md);
    background: transparent;
    border: none;
    color: var(--text-nav-idle);
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    position: relative;
    transition: background var(--transition), color var(--transition);
    white-space: nowrap;
    letter-spacing: 0.01em;
  }
  .nav-link:hover {
    background: rgba(255,255,255,0.1);
    color: #fff;
  }
  .nav-link.active {
    background: rgba(255,255,255,0.18);
    color: #fff;
    font-weight: 600;
  }
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 14px;
    right: 14px;
    height: 2px;
    border-radius: 2px 2px 0 0;
    background: rgba(255,255,255,0.85);
  }
  .nav-badge {
    background: rgba(255,255,255,0.22);
    border: 1px solid rgba(255,255,255,0.3);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    border-radius: 20px;
    padding: 1px 6px;
    line-height: 1.5;
  }
  .nav-link.active .nav-badge {
    background: rgba(255,255,255,0.9);
    color: var(--brand);
    border-color: transparent;
  }

  /* Nav right */
  .nav-right {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
    flex-shrink: 0;
  }

  /* Search pill */
  .nav-search {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 999px;
    padding: 7px 16px;
    color: rgba(255,255,255,0.6);
    transition: background var(--transition), border-color var(--transition);
    cursor: text;
  }
  .nav-search:hover, .nav-search:focus-within {
    background: rgba(255,255,255,0.18);
    border-color: rgba(255,255,255,0.3);
  }
  .nav-search input {
    border: none;
    background: transparent;
    outline: none;
    color: #fff;
    font-family: var(--font-body);
    font-size: 13px;
    width: 140px;
  }
  .nav-search input::placeholder { color: rgba(255,255,255,0.5); }

  /* Icon btn */
  .nav-icon-btn {
    width: 36px; height: 36px;
    border-radius: 999px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.18);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: rgba(255,255,255,0.8);
    position: relative;
    transition: background var(--transition), border-color var(--transition);
    flex-shrink: 0;
  }
  .nav-icon-btn:hover {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.3);
    color: #fff;
  }
  .notif-dot {
    position: absolute;
    top: 7px; right: 7px;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #FF5A5A;
    border: 2px solid var(--brand);
  }

  /* User menu */
  .nav-user {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 999px;
    padding: 4px 10px 4px 4px;
    cursor: pointer;
    transition: background var(--transition), border-color var(--transition);
    position: relative;
  }
  .nav-user:hover {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.3);
  }
  .user-avatar {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    color: var(--brand);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 11px;
    flex-shrink: 0;
  }
  .user-name-nav {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.9);
    white-space: nowrap;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* User dropdown */
  .user-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: 220px;
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: 0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
    overflow: hidden;
    animation: dropIn 0.15s ease;
    z-index: 200;
  }
  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-6px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)   scale(1); }
  }
  .dropdown-header {
    padding: 16px;
    border-bottom: 1px solid var(--border);
    background: var(--brand-xlight);
  }
  .dropdown-name {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 14px;
    color: var(--text-primary);
  }
  .dropdown-role {
    font-size: 12px;
    color: var(--text-secondary);
    margin-top: 2px;
  }
  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 16px;
    font-size: 13.5px;
    font-weight: 500;
    color: var(--text-primary);
    cursor: pointer;
    transition: background var(--transition);
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
    font-family: var(--font-body);
  }
  .dropdown-item:hover { background: var(--brand-xlight); color: var(--brand); }
  .dropdown-item.danger { color: var(--danger); }
  .dropdown-item.danger:hover { background: #FFF5F5; }
  .dropdown-divider { height: 1px; background: var(--border); margin: 4px 0; }

  /* ── SUB-NAV / Breadcrumb bar ─────────────────────────── */
  .subnav {
    background: rgba(255,255,255,0.08);
    border-top: 1px solid rgba(255,255,255,0.1);
    height: var(--subnav-h);
    display: flex;
    align-items: center;
    padding: 0 32px;
    max-width: 1440px;
    margin: 0 auto;
    width: 100%;
    gap: 8px;
  }
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12.5px;
    color: rgba(255,255,255,0.55);
  }
  .breadcrumb-brand { font-weight: 600; color: rgba(255,255,255,0.75); }
  .breadcrumb-sep { opacity: 0.4; }
  .breadcrumb-current {
    color: rgba(255,255,255,0.95);
    font-weight: 600;
    background: rgba(255,255,255,0.14);
    padding: 2px 10px;
    border-radius: 999px;
    font-size: 12px;
  }

  /* ── PAGE CONTENT ─────────────────────────────────────── */
  .page-body {
    flex: 1;
    overflow-y: auto;
    padding: 32px;
    max-width: 1440px;
    margin: 0 auto;
    width: 100%;
  }
  .page-body::-webkit-scrollbar { width: 5px; }
  .page-body::-webkit-scrollbar-track { background: transparent; }
  .page-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }

  /* ── MOBILE NAV ───────────────────────────────────────── */
  .mobile-nav {
    display: none;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    background: #fff;
    border-top: 1px solid var(--border);
    box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
    z-index: 100;
    padding: 8px 0 max(8px, env(safe-area-inset-bottom));
  }
  .mobile-nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-around;
    max-width: 480px;
    margin: 0 auto;
  }
  .mobile-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 6px 16px;
    border-radius: var(--radius-md);
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--text-secondary);
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 500;
    transition: color var(--transition);
    position: relative;
  }
  .mobile-nav-item.active {
    color: var(--brand);
  }
  .mobile-nav-item.active .mobile-icon-wrap {
    background: var(--brand-light);
  }
  .mobile-icon-wrap {
    width: 32px; height: 32px;
    border-radius: var(--radius-md);
    display: flex; align-items: center; justify-content: center;
    transition: background var(--transition);
  }
  .mobile-badge {
    position: absolute;
    top: 4px;
    right: calc(50% - 22px);
    width: 16px; height: 16px;
    border-radius: 50%;
    background: var(--brand);
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    border: 2px solid #fff;
  }

  @media (max-width: 768px) {
    .topnav-primary { padding: 0 16px; }
    .nav-links { display: none; }
    .nav-search { display: none; }
    .nav-user .user-name-nav { display: none; }
    .subnav { padding: 0 16px; }
    .page-body { padding: 16px 16px 88px; }
    .mobile-nav { display: block; }
    .logo-wordmark { font-size: 18px; }
  }
`;

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({ fullName: "Loading...", initials: ".." });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedName = localStorage.getItem("user_fullname") || "Guest User";
    setUser({
      fullName: storedName,
      initials: storedName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2),
    });
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const currentPage = NAV_ITEMS.find((item) => location.pathname === item.path);

  return (
    <>
      <style>{CSS}</style>
      <div className="slotify-app">

        {/* ── TOP NAV ─────────────────────────────────────── */}
        <nav className="topnav">
          <div className="topnav-primary">

            {/* Logo */}
            <div className="nav-logo" onClick={() => navigate("/home/explore")}>
              <div className="logo-icon">S</div>
              <span className="logo-wordmark">Slotify<span className="logo-dot">.</span></span>
            </div>

            {/* Nav Links */}
            <div className="nav-links">
              {NAV_ITEMS.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    className={`nav-link${active ? " active" : ""}`}
                    onClick={() => navigate(item.path)}
                  >
                    {item.icon}
                    {item.label}
                    {item.badge && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right side */}
            <div className="nav-right">
              <div className="nav-search">
                <IconSearch />
                <input placeholder="Search slots, services..." />
              </div>

              <button className="nav-icon-btn" title="Notifications">
                <IconBell />
                <span className="notif-dot" />
              </button>

              {/* User menu */}
              <div
                className="nav-user"
                ref={dropdownRef}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="user-avatar">{user.initials}</div>
                <span className="user-name-nav">{user.fullName.split(" ")[0]}</span>
                <IconChevronDown />

                {dropdownOpen && (
                  <div className="user-dropdown">
                    <div className="dropdown-header">
                      <div className="dropdown-name">{user.fullName}</div>
                      <div className="dropdown-role">Member</div>
                    </div>
                    <button className="dropdown-item" onClick={() => { navigate("/home/profile"); setDropdownOpen(false); }}>
                      <IconUser /> My Profile
                    </button>
                    <button className="dropdown-item" onClick={() => { navigate("/home/mybooking"); setDropdownOpen(false); }}>
                      <IconBookmark /> My Bookings
                    </button>
                    <button className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <IconSettings /> Settings
                    </button>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item danger" onClick={handleLogout}>
                      <IconLogout /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sub-nav / Breadcrumb */}
          <div style={{ background: "rgba(0,0,0,0.12)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="subnav">
              <div className="breadcrumb">
                <span className="breadcrumb-brand">Slotify</span>
                <span className="breadcrumb-sep">›</span>
                <span className="breadcrumb-current">{currentPage?.label || "Home"}</span>
              </div>
            </div>
          </div>
        </nav>

        {/* ── PAGE CONTENT ─────────────────────────────────── */}
        <main className="page-body">
          <Outlet />
        </main>

        {/* ── MOBILE BOTTOM NAV ─────────────────────────────── */}
        <div className="mobile-nav">
          <div className="mobile-nav-inner">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  className={`mobile-nav-item${active ? " active" : ""}`}
                  onClick={() => navigate(item.path)}
                >
                  {item.badge && (
                    <span className="mobile-badge">{item.badge}</span>
                  )}
                  <span className="mobile-icon-wrap">{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}