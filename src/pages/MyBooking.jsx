import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      // Assuming your backend has a dedicated endpoint for user bookings
      const res = await API.get("/my-bookings/"); 
      setBookings(res.data || []);
    } catch (err) {
      console.log(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId, tenantSlug) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      setCancellingId(bookingId);
      await API.delete(`/tenant/${tenantSlug}/booking/${bookingId}/cancel/`);
      alert("Booking cancelled successfully.");
      setBookings(bookings.filter((b) => b.id !== bookingId));
    } catch (err) {
      alert("Failed to cancel booking.");
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const d = new Date();
    d.setHours(hours, minutes);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="min-h-screen bg-[#F9FBFF] p-4 md:p-10 font-sans text-[#1e293b]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight">
            My <span className="text-[#3B7597]">Bookings</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1 font-medium italic">
            Track and manage your scheduled appointments.
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center py-20">
            <div className="w-8 h-8 border-2 border-[#3B7597] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Retrieving your schedule...</p>
          </div>
        )}

        {/* Bookings List - Style matches image_2ac490.png */}
        <div className="space-y-4">
          {!loading && bookings.length === 0 && (
            <div className="bg-white p-16 text-center rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-bold italic">You haven't booked any services yet.</p>
            </div>
          )}

          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="group flex flex-col md:flex-row items-center justify-between bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-[#3B7597] transition-all relative overflow-hidden"
            >
              {/* Status Ribbon */}
              <div className="absolute top-0 left-0 w-1 h-full bg-[#3B7597]"></div>

              <div className="flex items-center gap-5 w-full">
                {/* Visual Icon */}
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex flex-col items-center justify-center border border-gray-100 shrink-0">
                  <span className="text-[10px] font-black text-[#3B7597] uppercase leading-none mb-1">
                    {new Date(booking.date).toLocaleString('default', { month: 'short' })}
                  </span>
                  <span className="text-lg font-black text-gray-800 leading-none">
                    {new Date(booking.date).getDate()}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">
                    {booking.tenant_name}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800">{booking.service_name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500 font-bold uppercase tracking-tight">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      {formatTime(booking.start_time)}
                    </span>
                    <span>•</span>
                    <span>{booking.duration} Minutes</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                <div className="hidden md:block text-right mr-4">
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Status</p>
                  <p className="text-xs font-bold text-green-500 uppercase tracking-widest">Confirmed</p>
                </div>

                <button
                  onClick={() => handleCancelBooking(booking.id, booking.tenant_slug)}
                  disabled={cancellingId === booking.id}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all disabled:opacity-50"
                >
                  {cancellingId === booking.id ? "Processing..." : "Cancel"}
                </button>
                
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-[#3B7597] shadow-inner">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}