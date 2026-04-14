import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      await API.post("/register/", form);
      alert("Registration successful");
      window.location.href = "/login";
    } catch (err) {
      console.error(err.response?.data);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-slate-900">
      {/* Left Side: Branding & Stats */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-16 xl:p-24 bg-white border-r border-slate-100">
        <div className="space-y-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5850EC] rounded-xl flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-[#5850EC] border-b-[4px] border-b-transparent ml-0.5"></div>
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight">Slotify</span>
          </div>

          <div className="space-y-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#5850EC]">
              <span className="w-1.5 h-1.5 bg-[#5850EC] rounded-full mr-2"></span>
              Trusted by 10,000+ teams
            </span>
            <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight">
              The smarter way <br /> to manage <br /> bookings.
            </h1>
            <p className="text-lg text-slate-500 max-w-md leading-relaxed">
              Slotify gives your team a seamless scheduling experience — from availability to confirmation in seconds.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 max-w-md">
            {[
              { label: "Active users", val: "10K+" },
              { label: "Satisfaction rate", val: "98%" },
              { label: "Slots booked", val: "3M+" },
              { label: "Uptime SLA", val: "99.9%" },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <div className="text-2xl font-bold">{stat.val}</div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-slate-300">© 2025 Slotify Inc.</div>
      </div>

      {/* Right Side: Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:bg-[#F8FAFC]">
        <div className="w-full max-w-[520px] bg-white p-10 rounded-[32px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
            <p className="text-slate-400 mt-3 text-lg leading-snug">
              Free forever. No credit card required.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full name</label>
              <input
                name="full_name"
                placeholder="Jane Doe"
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
                <input
                  name="username"
                  placeholder="janedoe"
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@work.com"
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Min. 8 characters"
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-[#5850EC] text-white font-bold rounded-xl hover:bg-indigo-700 transform transition-active active:scale-[0.98] shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
            >
              Get started free <span className="text-lg">→</span>
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
              Already have an account? <a href="/login" className="text-[#5850EC] font-bold hover:underline">Sign in</a>
            </p>
            <p className="mt-4 text-xs text-slate-400 px-8 leading-relaxed">
              By signing up, you agree to our <a href="#" className="underline">Terms</a> & <a href="#" className="underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}