import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await API.post("/auth/login/", {
        email,
        password,
      });

      // Store tokens
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // Success alert & Redirect
      window.location.href = "/Home";
    } catch (err) {
      console.error(err.response?.data);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-slate-900">
      {/* Left Side: Branding & Stats (Same as Register) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-16 xl:p-24 bg-white border-r border-slate-100">
        <div className="space-y-12">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href = "/"}>
            <div className="w-10 h-10 bg-[#5850EC] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-[#5850EC] border-b-[4px] border-b-transparent ml-0.5"></div>
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight">Slotify</span>
          </div>

          <div className="space-y-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#5850EC]">
              <span className="w-1.5 h-1.5 bg-[#5850EC] rounded-full mr-2"></span>
              Welcome back to the smart way to book
            </span>
            <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight">
              Manage your <br /> scheduling <br /> with ease.
            </h1>
            <p className="text-lg text-slate-500 max-w-md leading-relaxed">
              Log in to access your dashboard, manage upcoming slots, and sync your team's availability in real-time.
            </p>
          </div>

          {/* Stats Grid (Consistency) */}
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="p-6 bg-[#F8FAFC] border border-slate-50 rounded-2xl">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-slate-400 mt-1">SLA Uptime</div>
            </div>
            <div className="p-6 bg-[#F8FAFC] border border-slate-50 rounded-2xl">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-slate-400 mt-1">Smart Support</div>
            </div>
          </div>
        </div>
        <div className="text-sm text-slate-300">© 2026 Slotify Inc.</div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:bg-[#F8FAFC]">
        <div className="w-full max-w-[480px] bg-white p-10 rounded-[32px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Sign in</h2>
            <p className="text-slate-400 mt-3 text-lg leading-snug">
              Welcome back! Please enter your details.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
              <input
                required
                type="email"
                placeholder="you@work.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs font-bold text-[#5850EC] hover:underline">Forgot?</a>
              </div>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 bg-[#5850EC] text-white font-bold rounded-xl hover:bg-indigo-700 transform transition-all active:scale-[0.98] shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? "Signing in..." : "Sign in"} 
              {!loading && <span className="text-lg">→</span>}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <span className="relative px-4 text-xs font-medium text-slate-400 bg-white uppercase tracking-widest">or continue with</span>
          </div>

          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-5 h-5" alt="GitHub" />
              GitHub
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-400 font-medium">
              Don't have an account? <a href="/register" className="text-[#5850EC] font-bold hover:underline">Create one free</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}