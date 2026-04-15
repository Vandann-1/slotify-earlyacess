// import { useState } from "react";

// const NAV = [
//   {
//     id: "slots",
//     label: "Slots",
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//         <rect x="3" y="4" width="18" height="18" rx="2"/>
//         <line x1="16" y1="2" x2="16" y2="6"/>
//         <line x1="8" y1="2" x2="8" y2="6"/>
//         <line x1="3" y1="10" x2="21" y2="10"/>
//         <circle cx="8" cy="15" r="1.5" fill="currentColor"/>
//         <circle cx="12" cy="15" r="1.5" fill="currentColor"/>
//         <circle cx="16" cy="15" r="1.5" fill="currentColor"/>
//       </svg>
//     ),
//   },
//   {
//     id: "explore",
//     label: "Explore",
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//         <circle cx="11" cy="11" r="8"/>
//         <line x1="21" y1="21" x2="16.65" y2="16.65"/>
//         <polygon points="11,8 14,14 11,12 8,14" fill="currentColor" stroke="none"/>
//       </svg>
//     ),
//   },
//   {
//     id: "mybooking",
//     label: "My Bookings",
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M9 11l3 3L22 4"/>
//         <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
//       </svg>
//     ),
//   },
//   {
//     id: "profile",
//     label: "Profile",
//     icon: (
//       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
//         <circle cx="12" cy="7" r="4"/>
//       </svg>
//     ),
//   },
// ];

// const SLOTS_DATA = [
//   { id: 1, title: "Dr. Priya Sharma", category: "Dermatology", time: "10:00 AM", date: "Apr 17", available: 3, color: "#E1F5EE", accent: "#0F6E56", tag: "Medical" },
//   { id: 2, title: "The Loft Salon", category: "Hair & Styling", time: "2:30 PM", date: "Apr 18", available: 1, color: "#FBEAF0", accent: "#993556", tag: "Beauty" },
//   { id: 3, title: "FitZone Studio", category: "Personal Training", time: "7:00 AM", date: "Apr 19", available: 5, color: "#E6F1FB", accent: "#185FA5", tag: "Fitness" },
//   { id: 4, title: "Aura Spa", category: "Full Body Massage", time: "3:00 PM", date: "Apr 20", available: 2, color: "#FAEEDA", accent: "#854F0B", tag: "Wellness" },
// ];

// const EXPLORE_DATA = [
//   { id: 1, name: "Wellness", emoji: "🌿", count: "240+ slots" },
//   { id: 2, name: "Medical", emoji: "🩺", count: "180+ slots" },
//   { id: 3, name: "Fitness", emoji: "💪", count: "320+ slots" },
//   { id: 4, name: "Beauty", emoji: "✨", count: "150+ slots" },
//   { id: 5, name: "Education", emoji: "📚", count: "90+ slots" },
//   { id: 6, name: "Tech", emoji: "💻", count: "60+ slots" },
// ];

// const BOOKINGS_DATA = [
//   { id: 1, title: "Dr. Mehta Clinic", type: "General Checkup", date: "Apr 12, 2026", status: "Completed", statusColor: "#1D9E75", statusBg: "#E1F5EE" },
//   { id: 2, title: "Glow Studio", type: "Facial Treatment", date: "Apr 17, 2026", status: "Upcoming", statusColor: "#185FA5", statusBg: "#E6F1FB" },
//   { id: 3, title: "PowerHouse Gym", type: "Zumba Class", date: "Apr 22, 2026", status: "Upcoming", statusColor: "#185FA5", statusBg: "#E6F1FB" },
//   { id: 4, title: "MindBloom Therapy", type: "Session #3", date: "Mar 30, 2026", status: "Cancelled", statusColor: "#993C1D", statusBg: "#FAECE7" },
// ];

// function SlotsPage() {
//   return (
//     <div>
//       <div style={{ marginBottom: "28px" }}>
//         <p style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888780", marginBottom: "6px" }}>Today's Picks</p>
//         <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#2C2C2A", margin: 0 }}>Available Slots</h2>
//       </div>

//       <div style={{ display: "flex", gap: "10px", marginBottom: "28px", flexWrap: "wrap" }}>
//         {["All", "Medical", "Beauty", "Fitness", "Wellness"].map((f, i) => (
//           <button key={f} style={{
//             padding: "7px 18px",
//             borderRadius: "999px",
//             border: i === 0 ? "none" : "1px solid #D3D1C7",
//             background: i === 0 ? "#2C2C2A" : "transparent",
//             color: i === 0 ? "#fff" : "#5F5E5A",
//             fontSize: "13px",
//             fontWeight: 500,
//             cursor: "pointer",
//             fontFamily: "inherit"
//           }}>{f}</button>
//         ))}
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
//         {SLOTS_DATA.map(slot => (
//           <div key={slot.id} style={{
//             background: "#fff",
//             borderRadius: "18px",
//             border: "1px solid #E8E6E0",
//             overflow: "hidden",
//             transition: "transform 0.15s",
//           }}
//           onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
//           onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
//           >
//             <div style={{ background: slot.color, padding: "20px 20px 16px", position: "relative" }}>
//               <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: slot.accent, background: "#fff", padding: "3px 10px", borderRadius: "999px" }}>{slot.tag}</span>
//               <div style={{ marginTop: "14px" }}>
//                 <p style={{ fontSize: "16px", fontWeight: 700, color: "#2C2C2A", margin: "0 0 2px" }}>{slot.title}</p>
//                 <p style={{ fontSize: "13px", color: "#5F5E5A", margin: 0 }}>{slot.category}</p>
//               </div>
//             </div>
//             <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//               <div>
//                 <p style={{ fontSize: "12px", color: "#888780", margin: "0 0 2px" }}>{slot.date}</p>
//                 <p style={{ fontSize: "15px", fontWeight: 600, color: "#2C2C2A", margin: 0 }}>{slot.time}</p>
//                 <p style={{ fontSize: "11px", color: slot.accent, margin: "4px 0 0", fontWeight: 500 }}>{slot.available} slots left</p>
//               </div>
//               <button style={{
//                 background: "#2C2C2A",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "12px",
//                 padding: "10px 18px",
//                 fontSize: "13px",
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 fontFamily: "inherit"
//               }}>Book</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function ExplorePage() {
//   return (
//     <div>
//       <div style={{ marginBottom: "28px" }}>
//         <p style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888780", marginBottom: "6px" }}>Discover</p>
//         <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#2C2C2A", margin: 0 }}>Explore Categories</h2>
//       </div>

//       <div style={{ background: "#F1EFE8", borderRadius: "14px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888780" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
//         <input placeholder="Search services, providers…" style={{ border: "none", background: "transparent", fontSize: "14px", color: "#2C2C2A", outline: "none", width: "100%", fontFamily: "inherit" }} />
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "14px" }}>
//         {EXPLORE_DATA.map(cat => (
//           <div key={cat.id} style={{
//             background: "#fff",
//             border: "1px solid #E8E6E0",
//             borderRadius: "18px",
//             padding: "24px 16px",
//             textAlign: "center",
//             cursor: "pointer",
//             transition: "all 0.15s",
//           }}
//           onMouseEnter={e => { e.currentTarget.style.background = "#2C2C2A"; e.currentTarget.querySelectorAll("p").forEach(p => p.style.color = "#fff"); }}
//           onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.querySelectorAll("p").forEach((p, i) => p.style.color = i === 0 ? "#2C2C2A" : "#888780"); }}
//           >
//             <div style={{ fontSize: "32px", marginBottom: "10px" }}>{cat.emoji}</div>
//             <p style={{ fontSize: "14px", fontWeight: 600, color: "#2C2C2A", margin: "0 0 4px", transition: "color 0.15s" }}>{cat.name}</p>
//             <p style={{ fontSize: "12px", color: "#888780", margin: 0, transition: "color 0.15s" }}>{cat.count}</p>
//           </div>
//         ))}
//       </div>

//       <div style={{ marginTop: "32px" }}>
//         <p style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888780", marginBottom: "16px" }}>Trending Now</p>
//         <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//           {["Yoga with Rina Kapoor — Andheri", "MindFlow Therapy — Online", "Nail Studio Express — Bandra"].map((item, i) => (
//             <div key={i} style={{ background: "#fff", border: "1px solid #E8E6E0", borderRadius: "14px", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                 <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#F1EFE8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
//                   {["🧘", "🧠", "💅"][i]}
//                 </div>
//                 <span style={{ fontSize: "14px", fontWeight: 500, color: "#2C2C2A" }}>{item}</span>
//               </div>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888780" strokeWidth="2"><polyline points="9,18 15,12 9,6"/></svg>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function MyBookingsPage() {
//   return (
//     <div>
//       <div style={{ marginBottom: "28px" }}>
//         <p style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888780", marginBottom: "6px" }}>History</p>
//         <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#2C2C2A", margin: 0 }}>My Bookings</h2>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "28px" }}>
//         {[["4", "Total"], ["2", "Upcoming"], ["1", "Completed"]].map(([n, l]) => (
//           <div key={l} style={{ background: "#F1EFE8", borderRadius: "14px", padding: "16px", textAlign: "center" }}>
//             <p style={{ fontSize: "24px", fontWeight: 700, color: "#2C2C2A", margin: "0 0 2px" }}>{n}</p>
//             <p style={{ fontSize: "12px", color: "#5F5E5A", margin: 0 }}>{l}</p>
//           </div>
//         ))}
//       </div>

//       <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//         {BOOKINGS_DATA.map(b => (
//           <div key={b.id} style={{ background: "#fff", border: "1px solid #E8E6E0", borderRadius: "16px", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
//               <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#F1EFE8", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F5E5A" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
//               </div>
//               <div>
//                 <p style={{ fontSize: "15px", fontWeight: 600, color: "#2C2C2A", margin: "0 0 2px" }}>{b.title}</p>
//                 <p style={{ fontSize: "13px", color: "#888780", margin: "0 0 4px" }}>{b.type}</p>
//                 <p style={{ fontSize: "12px", color: "#5F5E5A", margin: 0 }}>{b.date}</p>
//               </div>
//             </div>
//             <span style={{ fontSize: "11px", fontWeight: 600, color: b.statusColor, background: b.statusBg, padding: "5px 12px", borderRadius: "999px" }}>{b.status}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function ProfilePage() {
//   return (
//     <div>
//       <div style={{ marginBottom: "28px" }}>
//         <p style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888780", marginBottom: "6px" }}>Account</p>
//         <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#2C2C2A", margin: 0 }}>My Profile</h2>
//       </div>

//       <div style={{ background: "linear-gradient(135deg, #2C2C2A 0%, #444441 100%)", borderRadius: "20px", padding: "28px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "20px" }}>
//         <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#F1EFE8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: 700, color: "#2C2C2A", flexShrink: 0 }}>RA</div>
//         <div>
//           <p style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>Rahul Agarwal</p>
//           <p style={{ fontSize: "13px", color: "#B4B2A9", margin: "0 0 8px" }}>rahul.agarwal@gmail.com</p>
//           <span style={{ fontSize: "11px", fontWeight: 600, background: "#F1EFE8", color: "#2C2C2A", padding: "4px 12px", borderRadius: "999px" }}>Early Access Member</span>
//         </div>
//       </div>

//       <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//         {[
//           { icon: "📍", label: "Location", value: "Bhayandar, Maharashtra" },
//           { icon: "📱", label: "Phone", value: "+91 98765 43210" },
//           { icon: "🎂", label: "Member Since", value: "April 2026" },
//           { icon: "⭐", label: "Bookings Done", value: "4 sessions" },
//         ].map(row => (
//           <div key={row.label} style={{ background: "#fff", border: "1px solid #E8E6E0", borderRadius: "14px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "14px" }}>
//             <span style={{ fontSize: "18px" }}>{row.icon}</span>
//             <div>
//               <p style={{ fontSize: "11px", color: "#888780", margin: "0 0 2px", fontWeight: 500 }}>{row.label}</p>
//               <p style={{ fontSize: "14px", color: "#2C2C2A", margin: 0, fontWeight: 500 }}>{row.value}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
//         <button style={{ flex: 1, padding: "13px", background: "#2C2C2A", color: "#fff", border: "none", borderRadius: "14px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Edit Profile</button>
//         <button style={{ flex: 1, padding: "13px", background: "transparent", color: "#993C1D", border: "1px solid #F0997B", borderRadius: "14px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Sign Out</button>
//       </div>
//     </div>
//   );
// }

// const PAGE_COMPONENTS = {
//   slots: SlotsPage,
//   explore: ExplorePage,
//   mybooking: MyBookingsPage,
//   profile: ProfilePage,
// };

// export default function Home() {
//   const [active, setActive] = useState("slots");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const PageComponent = PAGE_COMPONENTS[active];

//   return (
//     <div style={{
//       display: "flex",
//       height: "100vh",
//       fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
//       background: "#F1EFE8",
//       overflow: "hidden",
//     }}>
//       {/* Sidebar */}
//       <aside style={{
//         width: sidebarOpen ? "240px" : "72px",
//         background: "#fff",
//         borderRight: "1px solid #E8E6E0",
//         display: "flex",
//         flexDirection: "column",
//         transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
//         overflow: "hidden",
//         flexShrink: 0,
//         zIndex: 10,
//       }}>
//         {/* Logo */}
//         <div style={{ padding: "24px 18px 20px", display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #F1EFE8" }}>
//           <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#2C2C2A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
//           </div>
//           {sidebarOpen && (
//             <div>
//               <p style={{ fontSize: "16px", fontWeight: 800, color: "#2C2C2A", margin: 0, letterSpacing: "-0.3px" }}>Slotify</p>
//               <p style={{ fontSize: "10px", color: "#888780", margin: 0, fontWeight: 500, letterSpacing: "0.04em" }}>EARLY ACCESS</p>
//             </div>
//           )}
//         </div>

//         {/* Nav items */}
//         <nav style={{ flex: 1, padding: "16px 10px", display: "flex", flexDirection: "column", gap: "4px" }}>
//           {NAV.map(item => {
//             const isActive = active === item.id;
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => setActive(item.id)}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "12px",
//                   padding: "11px 12px",
//                   borderRadius: "12px",
//                   border: "none",
//                   background: isActive ? "#2C2C2A" : "transparent",
//                   color: isActive ? "#fff" : "#5F5E5A",
//                   cursor: "pointer",
//                   width: "100%",
//                   textAlign: "left",
//                   fontFamily: "inherit",
//                   fontSize: "14px",
//                   fontWeight: isActive ? 600 : 400,
//                   transition: "all 0.15s",
//                   whiteSpace: "nowrap",
//                   overflow: "hidden",
//                 }}
//                 onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "#F1EFE8"; }}
//                 onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
//               >
//                 <span style={{ flexShrink: 0 }}>{item.icon}</span>
//                 {sidebarOpen && <span>{item.label}</span>}
//               </button>
//             );
//           })}
//         </nav>

//         {/* Toggle & Early badge */}
//         <div style={{ padding: "14px 10px", borderTop: "1px solid #F1EFE8" }}>
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: sidebarOpen ? "flex-start" : "center",
//               gap: "10px",
//               width: "100%",
//               padding: "10px 12px",
//               background: "transparent",
//               border: "none",
//               borderRadius: "12px",
//               cursor: "pointer",
//               color: "#888780",
//               fontSize: "13px",
//               fontFamily: "inherit",
//             }}
//             onMouseEnter={e => e.currentTarget.style.background = "#F1EFE8"}
//             onMouseLeave={e => e.currentTarget.style.background = "transparent"}
//           >
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: sidebarOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s", flexShrink: 0 }}>
//               <polyline points="15,18 9,12 15,6"/>
//             </svg>
//             {sidebarOpen && <span>Collapse</span>}
//           </button>
//         </div>
//       </aside>

//       {/* Main area */}
//       <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
//         {/* Topbar */}
//         <header style={{ background: "#fff", borderBottom: "1px solid #E8E6E0", padding: "0 28px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
//           <div>
//             <p style={{ fontSize: "12px", color: "#888780", margin: 0 }}>Wednesday, Apr 15, 2026</p>
//             <p style={{ fontSize: "15px", fontWeight: 600, color: "#2C2C2A", margin: 0 }}>Welcome back, Rahul 👋</p>
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//             <div style={{ position: "relative" }}>
//               <button style={{ width: "38px", height: "38px", borderRadius: "10px", border: "1px solid #E8E6E0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F5E5A" strokeWidth="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
//               </button>
//               <span style={{ position: "absolute", top: "6px", right: "6px", width: "8px", height: "8px", background: "#D85A30", borderRadius: "50%", border: "2px solid #fff" }}></span>
//             </div>
//             <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#2C2C2A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#fff", cursor: "pointer" }}>RA</div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main style={{ flex: 1, overflowY: "auto", padding: "32px 32px" }}>
//           <PageComponent />
//         </main>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";

// --- VIBRANT SAAS BLUE THEME ---
const THEME = {
  primary: "#2563EB", 
  sidebarBg: "#2563EB", // Solid Brand Blue Sidebar
  sidebarActive: "rgba(255, 255, 255, 0.2)", // Brighter glass effect
  sidebarHover: "rgba(255, 255, 255, 0.1)",
  bgApp: "#F8FAFC", 
  border: "#E2E8F0",
  textMain: "#0F172A",
  textMuted: "#64748B",
  white: "#FFFFFF"
};

const NAV = [
  { id: "explore", label: "Explore", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><polygon points="11,8 14,14 11,12 8,14" fill="currentColor" stroke="none"/></svg>
  )},
  { id: "slots", label: "Slots", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 2v4M16 2v4"/><circle cx="8" cy="15" r="1" fill="currentColor"/><circle cx="12" cy="15" r="1" fill="currentColor"/><circle cx="16" cy="15" r="1" fill="currentColor"/></svg>
  )},
  { id: "mybooking", label: "My Bookings", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
  )},
  { id: "profile", label: "Profile", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  )},
];

function ExplorePage() {
  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, color: THEME.primary, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Platform</p>
        <h2 style={{ fontSize: "26px", fontWeight: 800, color: THEME.textMain, margin: 0 }}>Explore Categories</h2>
      </div>
      <div style={{ background: "#fff", border: `1px solid ${THEME.border}`, borderRadius: "16px", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={THEME.textMuted} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input placeholder="Search services..." style={{ border: "none", background: "transparent", fontSize: "16px", outline: "none", width: "100%", fontFamily: "inherit" }} />
      </div>
    </div>
  );
}

function SlotsPage() { return <h2 style={{ fontWeight: 800, color: THEME.textMain }}>Available Slots</h2>; }
function MyBookingsPage() { return <h2 style={{ fontWeight: 800, color: THEME.textMain }}>My Bookings</h2>; }
function ProfilePage() { return <h2 style={{ fontWeight: 800, color: THEME.textMain }}>My Profile</h2>; }

const PAGE_COMPONENTS = { explore: ExplorePage, slots: SlotsPage, mybooking: MyBookingsPage, profile: ProfilePage };

export default function Home() {
  const [active, setActive] = useState("explore");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const PageComponent = PAGE_COMPONENTS[active];

  return (
    <div style={{ display: "flex", height: "100vh", background: THEME.bgApp, fontFamily: "'Inter', system-ui, sans-serif", overflow: "hidden" }}>
      
      {/* SIDEBAR - VIBRANT BRAND BLUE */}
      <aside style={{
        width: sidebarOpen ? "250px" : "84px",
        background: THEME.sidebarBg,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        flexShrink: 0,
        boxShadow: "4px 0 24px rgba(37, 99, 235, 0.1)"
      }}>
        {/* Logo Section */}
        <div style={{ padding: "32px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: THEME.white, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={THEME.primary} strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M9 2v4M15 2v4"/></svg>
          </div>
          {sidebarOpen && <span style={{ color: THEME.white, fontWeight: 800, fontSize: "22px", letterSpacing: "-0.5px" }}>Slotify</span>}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "0 14px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {NAV.map(item => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  background: isActive ? THEME.sidebarActive : "transparent",
                  color: THEME.white,
                  opacity: isActive ? 1 : 0.8,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => !isActive && (e.currentTarget.style.background = THEME.sidebarHover)}
                onMouseLeave={e => !isActive && (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span style={{ fontWeight: isActive ? 700 : 500, fontSize: "15px" }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Toggle */}
        <div style={{ padding: "20px 14px" }}>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "none", background: "rgba(255,255,255,0.1)", color: THEME.white, cursor: "pointer", fontSize: "13px", fontWeight: 600 }}
          >
            {sidebarOpen ? "Collapse View" : "→"}
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <header style={{ height: "72px", background: THEME.white, borderBottom: `1px solid ${THEME.border}`, padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ color: THEME.textMuted, fontSize: "14px", fontWeight: 500 }}>Dashboard Overview</div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: THEME.textMain, margin: 0 }}>Rahul Agarwal</p>
              <p style={{ fontSize: "11px", color: THEME.primary, fontWeight: 700, margin: 0, textTransform: "uppercase" }}>Pro Member</p>
            </div>
            <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: THEME.primary, color: THEME.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>RA</div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "48px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <PageComponent />
          </div>
        </main>
      </div>
    </div>
  );
}