import { useEffect, useState } from "react";
import API from "../services/api";

// --- PROFESSIONAL SOLID ICONS ---
const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ServiceIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3B7597]">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const FastBookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#3B7597]">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export default function Slots() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [slotLoading, setSlotLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await API.get("/services/");
      setServices(res.data || []);
    } catch (err) {
      console.log(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedService && selectedDate) {
      fetchSlots(selectedDate);
    }
  }, [selectedDate, selectedService]);

  const fetchSlots = async (date) => {
    try {
      setSlotLoading(true);
      const tenantSlug = selectedService?.tenant_slug;
      if (!tenantSlug) return;
      const res = await API.get(`/tenant/${tenantSlug}/booking/slots/`, {
        params: { service_id: selectedService.id, date },
      });
      setSlots(res.data.slots || []);
    } catch (err) {
      setSlots([]);
    } finally {
      setSlotLoading(false);
    }
  };

  const handleBooking = async (slot) => {
    try {
      setBookingLoading(true);
      const tenantSlug = selectedService?.tenant_slug;
      if (!tenantSlug) return;
      await API.post(`/tenant/${tenantSlug}/booking/create/`, {
        service: selectedService.id,
        date: selectedDate,
        start_time: slot,
      });
      alert("Booking Successful");
      setSelectedService(null);
      setSelectedDate("");
      setSlots([]);
    } catch (err) {
      alert("Booking Failed");
    } finally {
      setBookingLoading(false);
    }
  };

  const filteredServices = services.filter((s) => {
    const q = search.toLowerCase();
    return s.name?.toLowerCase().includes(q) || s.tenant_name?.toLowerCase().includes(q);
  });

  const formatSlotTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const start = new Date();
    start.setHours(hours, minutes, 0);
    const end = new Date(start.getTime() + duration * 60000);
    const f = (d) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `${f(start)} - ${f(end)}`;
  };

  return (
    <>
      <style>{`
        .sl-container { font-family: 'Geist', 'SF Pro Display', sans-serif; color: #0f172a; max-width: 1000px; margin: 0 auto; }
        .sl-search-wrap {
          display: flex; align-items: center; gap: 10px;
          background: #ffffff; border: 1px solid #e2e8f0;
          border-radius: 12px; padding: 10px 16px; margin-bottom: 20px;
          transition: border-color 150ms;
        }
        .sl-search-wrap:focus-within { border-color: #3B7597; box-shadow: 0 0 0 3px rgba(202, 89, 149, 0.08); }
        .sl-search-wrap input {
          flex: 1; border: none; outline: none; font-size: 13.5px;
          color: #0f172a; background: transparent;
        }
        .sl-kbd {
          font-size: 11px; color: #94a3b8; background: #f1f5f9;
          border: 1px solid #e2e8f0; border-radius: 6px; padding: 2px 7px;
        }

        .sl-hero {
          background: #1e293b; border-radius: 16px; padding: 32px;
          margin-bottom: 30px; position: relative; overflow: hidden;
        }
        .sl-hero-title { font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -0.6px; margin-bottom: 10px; line-height: 1.2; }
        .sl-hero-sub { font-size: 14px; color: rgba(255,255,255,0.55); max-width: 440px; margin-bottom: 22px; line-height: 1.5; }
        .sl-btn-brand {
          background: #3B7597; color: #fff; border: none;
          border-radius: 10px; padding: 10px 24px; font-size: 13.5px; font-weight: 600; cursor: pointer;
          transition: transform 150ms;
        }
        .sl-btn-brand:active { transform: scale(0.97); }

        .sl-section-title { font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 14px; letter-spacing: -0.2px; }

        .sl-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px; margin-bottom: 32px;
        }
        .sl-card {
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;
          overflow: hidden; cursor: pointer; transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sl-card:hover { border-color: #3B7597; transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.04); }
        .sl-card-banner {
          height: 90px; background: #fff1f8; display: flex;
          align-items: center; justify-content: center; position: relative;
        }
        .sl-card-body { padding: 16px; }
        .sl-card-name { font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
        .sl-card-meta { font-size: 12px; color: #64748b; margin-bottom: 10px; font-weight: 500; }
        .sl-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid #f8fafc; padding-top: 12px; margin-top: 4px;
        }
        .sl-price { font-size: 15px; font-weight: 800; color: #3B7597; }

        .sl-overlay {
          position: fixed; inset: 0; background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(6px); display: flex; align-items: center;
          justify-content: center; z-index: 100; padding: 20px;
        }
        .sl-modal {
          background: #ffffff; width: 100%; max-width: 420px;
          border-radius: 24px; padding: 32px; position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .sl-date-input {
          width: 100%; padding: 14px; border-radius: 12px;
          border: 1px solid #e2e8f0; margin-bottom: 24px; outline: none;
          font-family: inherit; font-weight: 500; font-size: 14px; color: #1e293b;
        }
        .sl-slot-btn {
          width: 100%; padding: 14px; margin-bottom: 10px;
          background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;
          text-align: left; font-size: 13px; font-weight: 600; cursor: pointer;
          display: flex; justify-content: space-between; transition: all 150ms;
        }
        .sl-slot-btn:hover { border-color: #3B7597; background: #fff1f8; color: #3B7597; }
      `}</style>

      <div className="sl-container">
        <div className="sl-search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            placeholder="Search providers, services or locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="sl-kbd">ESC</span>
        </div>

        <div className="sl-hero">
          <div className="sl-hero-title">Your next appointment,<br />simplified.</div>
          <div className="sl-hero-sub">Secure your spot with top-rated professionals in seconds. No phone calls, no waiting.</div>
          <button className="sl-btn-brand">Explore All</button>
        </div>

        <div className="sl-section-title">Verified Services</div>
        {loading ? (
          <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-[#3B7597] border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="sl-grid">
            {filteredServices.map((s) => (
              <div className="sl-card" key={s.id} onClick={() => setSelectedService(s)}>
                <div className="sl-card-banner">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-[#3B7597]/10">
                    <ServiceIcon />
                  </div>
                </div>
                <div className="sl-card-body">
                  <div className="sl-card-name">{s.name}</div>
                  <div className="sl-card-meta">{s.tenant_name} • {s.duration}m</div>
                  <div className="flex gap-0.5 mb-2"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div>
                  <div className="sl-card-footer">
                    <div className="sl-price">₹{s.price}</div>
                    <div className="text-[10px] font-bold text-[#3B7597] bg-[#fff1f8] px-2.5 py-1 rounded-lg tracking-wide uppercase">Select</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="sl-section-title">Quick Selection</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {filteredServices.slice(0, 2).map((s) => (
            <div key={`rec-${s.id}`} className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 cursor-pointer hover:border-[#3B7597] transition-all group" onClick={() => setSelectedService(s)}>
              <div className="w-12 h-12 bg-[#fff1f8] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FastBookIcon />
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-bold text-slate-800">{s.name}</div>
                <div className="text-[12px] text-slate-500 font-medium">{s.tenant_name}</div>
              </div>
              <div className="text-right">
                <div className="text-[14px] font-extrabold text-[#3B7597]">₹{s.price}</div>
                <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Book</div>
              </div>
            </div>
          ))}
        </div>

        {selectedService && (
          <div className="sl-overlay" onClick={() => setSelectedService(null)}>
            <div className="sl-modal" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              
              <div className="text-[11px] font-black text-[#3B7597] uppercase tracking-[0.2em] mb-2">{selectedService.tenant_name}</div>
              <div className="text-2xl font-black text-slate-900 mb-6 tracking-tight leading-tight">{selectedService.name}</div>
              
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-3">1. Select Date</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="sl-date-input" />

              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-3">2. Choose Time</label>
              <div className="max-h-60 overflow-y-auto pr-2 custom-scroll">
                {slotLoading ? (
                  <div className="text-center py-6 text-xs font-bold text-slate-300 animate-pulse tracking-widest">CHECKING SLOTS...</div>
                ) : slots.length > 0 ? (
                  slots.map((slot, i) => (
                    <button key={i} className="sl-slot-btn group" disabled={bookingLoading} onClick={() => handleBooking(slot)}>
                      <span className="text-slate-700 group-hover:text-[#3B7597] transition-colors">{formatSlotTime(slot, selectedService.duration)}</span>
                      <span className="text-[#3B7597] opacity-0 group-hover:opacity-100 transition-opacity">Confirm →</span>
                    </button>
                  ))
                ) : (
                  selectedDate && <div className="text-center py-8 text-xs font-bold text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200 uppercase tracking-widest">No slots found</div>
                )}
              </div>

              {bookingLoading && (
                <div className="absolute inset-0 bg-white/90 rounded-[24px] flex flex-col items-center justify-center z-10">
                  <div className="w-10 h-10 border-[3px] border-[#3B7597] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <div className="text-[11px] font-black text-[#3B7597] tracking-[0.3em] uppercase">Securing Slot</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}