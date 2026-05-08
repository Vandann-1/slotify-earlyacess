import { useState } from "react";

const CATEGORIES = [
  { id: "all",        label: "All"        },
  { id: "wellness",   label: "Wellness"   },
  { id: "fitness",    label: "Fitness"    },
  { id: "consulting", label: "Consulting" },
  { id: "education",  label: "Education"  },
  { id: "beauty",     label: "Beauty"     },
  { id: "medical",    label: "Medical"    },
];

const SERVICES = [
  {
    id: 1, category: "wellness",
    emoji: "🧘", bg: "#eff6ff",
    name: "Morning Yoga Flow",
    provider: "Priya S.", duration: "60 min",
    rating: 4.9, reviews: 128,
    price: "₹499", badge: "4 slots left", badgeType: "green",
  },
  {
    id: 2, category: "wellness",
    emoji: "💆", bg: "#faf5ff",
    name: "Deep Tissue Massage",
    provider: "Karan M.", duration: "90 min",
    rating: 4.8, reviews: 94,
    price: "₹1,200", badge: "Popular", badgeType: "blue",
  },
  {
    id: 3, category: "consulting",
    emoji: "📊", bg: "#fefce8",
    name: "Finance Consultation",
    provider: "Nisha R.", duration: "45 min",
    rating: 4.7, reviews: 61,
    price: "₹800", badge: "2 slots left", badgeType: "amber",
  },
  {
    id: 4, category: "fitness",
    emoji: "🏋️", bg: "#f0fdf4",
    name: "Personal Training",
    provider: "Rohit V.", duration: "60 min",
    rating: 4.9, reviews: 203,
    price: "₹650", badge: "Top Rated", badgeType: "blue",
  },
  {
    id: 5, category: "education",
    emoji: "🎓", bg: "#ecfdf5",
    name: "UPSC Coaching",
    provider: "Meena K.", duration: "90 min",
    rating: 4.6, reviews: 47,
    price: "₹399", badge: "New", badgeType: "green",
  },
  {
    id: 6, category: "beauty",
    emoji: "💅", bg: "#fff1f2",
    name: "Hair & Styling",
    provider: "Divya P.", duration: "120 min",
    rating: 4.8, reviews: 89,
    price: "₹950", badge: "3 slots left", badgeType: "amber",
  },
  {
    id: 7, category: "medical",
    emoji: "🩺", bg: "#ecfeff",
    name: "General Checkup",
    provider: "Dr. Arora", duration: "30 min",
    rating: 4.9, reviews: 312,
    price: "₹299", badge: "Popular", badgeType: "blue",
  },
  {
    id: 8, category: "fitness",
    emoji: "🚴", bg: "#f0fdf4",
    name: "Cycling Session",
    provider: "Amit S.", duration: "45 min",
    rating: 4.5, reviews: 38,
    price: "₹350", badge: "New", badgeType: "green",
  },
];

const RECENT = [
  {
    emoji: "🧘", bg: "#eff6ff",
    name: "Morning Yoga Flow",
    sub: "with Priya S. · Yesterday",
    price: "₹499", time: "Completed", timeColor: "#64748b",
  },
  {
    emoji: "📊", bg: "#fefce8",
    name: "Finance Consultation",
    sub: "with Nisha R. · 2 days ago",
    price: "₹800", time: "Completed", timeColor: "#64748b",
  },
  {
    emoji: "🏋️", bg: "#f0fdf4",
    name: "Personal Training",
    sub: "with Rohit V. · Tomorrow 10:00 AM",
    price: "₹650", time: "Upcoming", timeColor: "#16a34a",
  },
];

const BADGE_STYLES = {
  green: { background: "#dcfce7", color: "#166534" },
  blue:  { background: "#dbeafe", color: "#1d4ed8" },
  amber: { background: "#fef9c3", color: "#854d0e" },
};

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = SERVICES.filter((s) => {
    const matchCat = activeCategory === "all" || s.category === activeCategory;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.provider.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <style>{`
        .ex-search-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px 16px;
          margin-bottom: 20px;
          transition: border-color 150ms, box-shadow 150ms;
        }
        .ex-search-wrap:focus-within {
          border-color: #93c5fd;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.08);
        }
        .ex-search-wrap input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 13.5px;
          color: #0f172a;
          font-family: 'Geist', 'SF Pro Display', -apple-system, sans-serif;
          background: transparent;
        }
        .ex-search-wrap input::placeholder { color: #94a3b8; }
        .ex-kbd {
          font-size: 11px;
          color: #94a3b8;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 2px 7px;
          flex-shrink: 0;
          font-family: 'Geist', 'SF Pro Display', -apple-system, sans-serif;
        }

        .ex-hero {
          background: #1e3a8a;
          border-radius: 16px;
          padding: 28px 28px 26px;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
        }
        .ex-hero-ring {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          background: rgba(255,255,255,0.05);
        }
        .ex-hero-label {
          font-size: 11px;
          font-weight: 600;
          color: #93c5fd;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .ex-hero-title {
          font-size: 23px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.5px;
          line-height: 1.25;
          margin-bottom: 8px;
        }
        .ex-hero-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          line-height: 1.55;
          margin-bottom: 20px;
          max-width: 400px;
        }
        .ex-hero-btns { display: flex; gap: 10px; flex-wrap: wrap; }
        .ex-btn-white {
          background: #ffffff;
          color: #1d4ed8;
          border: none;
          border-radius: 10px;
          padding: 9px 20px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Geist', 'SF Pro Display', -apple-system, sans-serif;
          transition: opacity 150ms;
        }
        .ex-btn-white:hover { opacity: 0.9; }
        .ex-btn-ghost {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 10px;
          padding: 9px 20px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Geist', 'SF Pro Display', -apple-system, sans-serif;
          transition: background 150ms;
        }
        .ex-btn-ghost:hover { background: rgba(255,255,255,0.08); }

        .ex-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 26px;
        }
        .ex-stat-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px 16px;
        }
        .ex-stat-label {
          font-size: 11px;
          color: #64748b;
          font-weight: 500;
          margin-bottom: 4px;
        }
        .ex-stat-val {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.5px;
          line-height: 1.1;
        }
        .ex-stat-sub {
          font-size: 11px;
          font-weight: 500;
          margin-top: 3px;
        }

        .ex-section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .ex-section-title {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.2px;
        }
        .ex-see-all {
          font-size: 12px;
          color: #2563eb;
          font-weight: 500;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'Geist', 'SF Pro Display', -apple-system, sans-serif;
          padding: 0;
        }
        .ex-see-all:hover { text-decoration: underline; }

        .ex-cats {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 22px;
        }
        .ex-cat {
          padding: 7px 15px;
          border-radius: 40px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          font-size: 12.5px;
          font-weight: 500;
          color: #334155;
          cursor: pointer;
          font-family: 'Geist', 'SF Pro Display', -apple-system, sans-serif;
          transition: all 150ms;
        }
        .ex-cat:hover { border-color: #93c5fd; color: #1d4ed8; }
        .ex-cat.active {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
        }

        .ex-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
          gap: 14px;
          margin-bottom: 28px;
        }
        .ex-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 150ms, transform 150ms;
        }
        .ex-card:hover { border-color: #93c5fd; transform: translateY(-2px); }
        .ex-card-banner {
          height: 94px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          position: relative;
        }
        .ex-card-badge {
          position: absolute;
          top: 10px; right: 10px;
          font-size: 10px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
          letter-spacing: 0.2px;
        }
        .ex-card-body { padding: 14px; }
        .ex-card-name {
          font-size: 13.5px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 2px;
        }
        .ex-card-meta {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 8px;
        }
        .ex-rating-row {
          display: flex;
          align-items: center;
          gap: 3px;
          margin-bottom: 10px;
        }
        .ex-rating-val { font-size: 12px; font-weight: 600; color: #334155; margin-left: 2px; }
        .ex-rating-count { font-size: 11px; color: #94a3b8; }
        .ex-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #f1f5f9;
          padding-top: 10px;
          margin-top: 2px;
        }
        .ex-price {
          font-size: 14px;
          font-weight: 700;
          color: #1d4ed8;
        }
        .ex-price span { font-size: 11px; font-weight: 400; color: #94a3b8; }
        .ex-slot-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #16a34a;
          font-weight: 500;
        }
        .ex-slot-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
        }

        .ex-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 48px 20px;
          color: #94a3b8;
          font-size: 13.5px;
        }
        .ex-empty-icon { font-size: 36px; margin-bottom: 10px; }

        .ex-recent {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 8px;
        }
        .ex-rec-item {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px 14px;
          cursor: pointer;
          transition: border-color 150ms;
        }
        .ex-rec-item:hover { border-color: #93c5fd; }
        .ex-rec-icon {
          width: 42px; height: 42px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .ex-rec-info { flex: 1; min-width: 0; }
        .ex-rec-name {
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ex-rec-sub { font-size: 11.5px; color: #64748b; margin-top: 2px; }
        .ex-rec-right { text-align: right; flex-shrink: 0; }
        .ex-rec-price { font-size: 13px; font-weight: 700; color: #1d4ed8; }
        .ex-rec-time { font-size: 11px; font-weight: 500; margin-top: 2px; }
      `}</style>

      {/* ── Search Bar ── */}
      <div className="ex-search-wrap">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          placeholder="Search services, providers, or slots…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="ex-kbd">⌘K</span>
      </div>

      {/* ── Hero Banner ── */}
      <div className="ex-hero">
        <div className="ex-hero-ring" style={{ width: 160, height: 160, right: -20, top: -30 }} />
        <div className="ex-hero-ring" style={{ width: 110, height: 110, right: 80, bottom: -40, background: "rgba(255,255,255,0.04)" }} />
        <div className="ex-hero-label">✦ Featured this week</div>
        <div className="ex-hero-title">Book smarter,<br />not harder.</div>
        <div className="ex-hero-sub">
          Discover top-rated services with instant slot availability — no back-and-forth needed.
        </div>
        <div className="ex-hero-btns">
          <button className="ex-btn-white">Browse Slots</button>
          <button className="ex-btn-ghost">How it works</button>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="ex-stats">
        <div className="ex-stat-card">
          <div className="ex-stat-label">Available slots</div>
          <div className="ex-stat-val">248</div>
          <div className="ex-stat-sub" style={{ color: "#16a34a" }}>↑ 12 added today</div>
        </div>
        <div className="ex-stat-card">
          <div className="ex-stat-label">Active providers</div>
          <div className="ex-stat-val">64</div>
          <div className="ex-stat-sub" style={{ color: "#16a34a" }}>↑ 3 new this week</div>
        </div>
        <div className="ex-stat-card">
          <div className="ex-stat-label">Your bookings</div>
          <div className="ex-stat-val">3</div>
          <div className="ex-stat-sub" style={{ color: "#2563eb" }}>Next: Tomorrow 10am</div>
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="ex-section-head">
        <div className="ex-section-title">Categories</div>
      </div>
      <div className="ex-cats">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`ex-cat${activeCategory === cat.id ? " active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── Service Cards ── */}
      <div className="ex-section-head">
        <div className="ex-section-title">Top Picks</div>
        <button className="ex-see-all">See all →</button>
      </div>
      <div className="ex-cards">
        {filtered.length === 0 ? (
          <div className="ex-empty">
            <div className="ex-empty-icon">🔍</div>
            No services found for "{search}"
          </div>
        ) : (
          filtered.map((s) => (
            <div className="ex-card" key={s.id}>
              <div className="ex-card-banner" style={{ background: s.bg }}>
                <span style={{ fontSize: 36 }}>{s.emoji}</span>
                <span className="ex-card-badge" style={BADGE_STYLES[s.badgeType]}>
                  {s.badge}
                </span>
              </div>
              <div className="ex-card-body">
                <div className="ex-card-name">{s.name}</div>
                <div className="ex-card-meta">with {s.provider} · {s.duration}</div>
                <div className="ex-rating-row">
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                  <span className="ex-rating-val">{s.rating}</span>
                  <span className="ex-rating-count">({s.reviews})</span>
                </div>
                <div className="ex-card-footer">
                  <div className="ex-price">{s.price} <span>/ session</span></div>
                  <div className="ex-slot-pill">
                    <span className="ex-slot-dot" />
                    Available
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Recent Activity ── */}
      <div className="ex-section-head">
        <div className="ex-section-title">Recent Activity</div>
        <button className="ex-see-all">View all →</button>
      </div>
      <div className="ex-recent">
        {RECENT.map((r, i) => (
          <div className="ex-rec-item" key={i}>
            <div className="ex-rec-icon" style={{ background: r.bg }}>
              <span style={{ fontSize: 20 }}>{r.emoji}</span>
            </div>
            <div className="ex-rec-info">
              <div className="ex-rec-name">{r.name}</div>
              <div className="ex-rec-sub">{r.sub}</div>
            </div>
            <div className="ex-rec-right">
              <div className="ex-rec-price">{r.price}</div>
              <div className="ex-rec-time" style={{ color: r.timeColor }}>{r.time}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}