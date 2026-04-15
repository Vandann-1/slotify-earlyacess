import React, { useState, useEffect, useRef } from 'react';

// --- Animated Rolling Counter logic ---
const RollingCounter = ({ to, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000;
        const step = to / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= to) { setCount(to); clearInterval(timer); }
          else { setCount(Math.floor(start)); }
        }, 16);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

export default function SlotifyLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app min-h-screen overflow-x-hidden bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* Exact CSS injection for original animations and fonts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
        
        :root {
          --font-display: "Sora", sans-serif;
          --font-body: "DM Sans", sans-serif;
        }

        .font-display { font-family: var(--font-display); }
        .font-body { font-family: var(--font-body); }

        @keyframes scrollLogos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-logo-scroll { animation: scrollLogos 28s linear infinite; }

        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.6s ease both; }

        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 3px rgba(59,130,246,0.2); }
          50% { box-shadow: 0 0 0 6px rgba(59,130,246,0.08); }
        }
        .animate-pulse-dot { animation: pulseDot 2s ease-in-out infinite; }

        .hero-mask {
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.07) 0%, transparent 70%);
        }
        .logo-mask {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}} />

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-200 backdrop-blur-lg ${scrolled ? 'bg-white/92 border-b border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)]' : 'bg-transparent border-transparent'}`}>
        <div className="max-w-[1200px] mx-auto px-8 h-16 flex items-center gap-8">
          <div className="flex items-center gap-2.5 cursor-pointer flex-shrink-0">
            <div className="w-8 h-8 rounded-[9px] bg-[#2563eb] flex items-center justify-center shadow-[0_2px_8px_rgba(37,99,235,0.35)]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1" y="1" width="7" height="7" rx="2" fill="white" fillOpacity="0.95"/>
                <rect x="10" y="1" width="7" height="7" rx="2" fill="white" fillOpacity="0.6"/>
                <rect x="1" y="10" width="7" height="7" rx="2" fill="white" fillOpacity="0.6"/>
                <rect x="10" y="10" width="7" height="7" rx="2" fill="white" fillOpacity="0.95"/>
              </svg>
            </div>
            <span className="font-display font-bold text-[18px] text-slate-900">Slotify</span>
            <span className="text-[10px] font-semibold tracking-wider uppercase bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200 ml-1">Early Access</span>
          </div>
          
          <div className="hidden md:flex flex-1 gap-1">
            {['Features', 'How it works', 'Pricing', 'FAQ'].map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="text-[14px] font-body text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-md transition-all">{link}</a>
            ))}
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            {/* Standard Page Redirects */}
            <a href="/login" className="text-[14px] font-semibold text-slate-700 border-[1.5px] border-slate-200 px-[18px] py-[9px] rounded-[10px] hover:bg-slate-50 transition-all">Log in</a>
            <a href="/register" className="text-[14px] font-semibold text-white bg-[#2563eb] px-5 py-2.5 rounded-[10px] shadow-[0_2px_8px_rgba(37,99,235,0.3)] hover:bg-[#1d4ed8] transition-all active:scale-95">Get early access</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-[100px] px-8 bg-gradient-to-b from-[#f0f7ff] to-white overflow-hidden">
        <div className="absolute inset-0 hero-mask pointer-events-none" style={{ backgroundImage: 'linear-gradient(#dbeafe 1px, transparent 1px), linear-gradient(90deg, #dbeafe 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[64px] pointer-events-none" />
        <div className="absolute top-[50px] -right-20 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[64px] pointer-events-none" />

        <div className="relative z-10 max-w-[640px] mx-auto text-center pb-[60px]">
          <div className="animate-fade-up inline-flex items-center gap-2 bg-white border-[1.5px] border-blue-200 px-4 py-[7px] rounded-full shadow-[0_2px_8px_rgba(59,130,246,0.12)] text-[#1d4ed8] text-[13px] font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-dot" />
            2,400+ people on the waitlist →
          </div>

          <h1 className="animate-fade-up [animation-delay:0.1s] font-display font-extrabold text-[clamp(40px,6vw,64px)] leading-[1.1] tracking-[-2px] text-slate-900 mb-6">
            Stop wasting time <br /> on scheduling. <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Start using AI.</span>
          </h1>

          <p className="animate-fade-up [animation-delay:0.2s] font-body text-[18px] text-slate-500 leading-[1.75] mb-10 max-w-[540px] mx-auto">
            Slotify's AI engine syncs every calendar, eliminates double-bookings, and handles all the back-and-forth — automatically.
          </p>

          <div className="animate-fade-up [animation-delay:0.3s] flex flex-wrap justify-center gap-3.5 mb-12">
            <a href="/register" className="flex items-center gap-2 bg-[#2563eb] text-white px-7 py-[15px] rounded-[16px] font-bold text-[16px] shadow-[0_8px_32px_rgba(59,130,246,0.25)] hover:bg-[#1d4ed8] hover:-translate-y-0.5 transition-all text-center">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.9 15.5L8.5 14.1l-6.1-1.6c-.3 0-.3-.5 0-.6l6.1-1.5c.3-.1.4-.2.5-.5l1.6-6.1c.1-.3.5-.3.6 0l1.5 6.1c.1.3.2.4.5.5l6.1 1.6c.3 0 .3.5 0 .6l-6.1 1.5c-.3.1-.4.2-.5.5l-1.6 6.1c-.1.3-.5.3-.6 0z" /></svg>
               Join the waitlist — free
            </a>
            <button className="flex items-center gap-2 bg-white border-[1.5px] border-slate-200 text-slate-700 px-6 py-[14px] rounded-[16px] font-semibold text-[16px] hover:border-blue-300 hover:text-blue-700 transition-all">
              See how it works
            </button>
          </div>

          {/* Stats Bar */}
          <div className="animate-fade-up [animation-delay:0.4s] grid grid-cols-2 md:grid-cols-4 bg-white rounded-[24px] border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.08)] divide-x divide-slate-100 overflow-hidden">
            {[
              { n: 2400, s: "+", l: "Waitlist" },
              { n: 18, s: " min", l: "Saved daily" },
              { n: 98, s: "%", l: "No-shows" },
              { n: 40, s: "%", l: "Off Early" }
            ].map((stat, i) => (
              <div key={i} className="py-5 px-4 text-center">
                <div className="font-display text-[26px] font-bold text-[#2563eb] leading-none">
                  <RollingCounter to={stat.n} suffix={stat.s} />
                </div>
                <div className="text-[12px] text-slate-400 font-medium mt-1 uppercase tracking-wider">{stat.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Mockup UI */}
        <div className="animate-fade-up [animation-delay:0.5s] relative max-w-[500px] mx-auto px-4 perspective-[1000px]">
          <div className="bg-white rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.12),0_0_0_1px_rgba(15,23,42,0.05)] overflow-hidden transform rotate-x-2">
            <div className="bg-[#f8fafc] border-b border-slate-100 px-4 py-3 flex items-center gap-[7px]">
              <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
              <div className="w-[11px] h-[11px] rounded-full bg-[#febc2e]" />
              <div className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
              <div className="ml-2 text-[12px] text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full font-mono">slotify.app/maya</div>
            </div>
            <div className="p-5 text-left">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <div className="font-display font-bold text-slate-900 text-[16px]">Maya Rodriguez</div>
                  <div className="text-[13px] text-slate-400 mt-0.5">30-min discovery call</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[13px]">MR</div>
              </div>
              <div className="text-[12px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Select a date</div>
              <div className="grid grid-cols-5 gap-1.5 mb-4">
                {[14,15,16,17,18].map(d => (
                  <div key={d} className={`py-2 rounded-[6px] text-center text-[13px] font-medium transition-all ${d === 17 ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50/50 text-blue-700'}`}>{d}</div>
                ))}
              </div>
              <button className="w-full bg-[#2563eb] text-white py-3 rounded-[10px] font-bold text-[14px]">Confirm Booking</button>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Strip Section */}
      <section className="py-10 bg-[#f8fafc] border-y border-slate-100 overflow-hidden">
        <p className="text-center text-[12px] font-medium uppercase tracking-[1.5px] text-slate-400 mb-5">Integrates with the tools you already use</p>
        <div className="relative logo-mask">
          <div className="flex gap-4 animate-logo-scroll whitespace-nowrap">
            {['Zoom', 'Notion', 'Slack', 'HubSpot', 'Salesforce', 'Linear', 'Zapier', 'Stripe', 'Loom', 'Figma'].concat(['Zoom', 'Notion', 'Slack', 'HubSpot', 'Salesforce', 'Linear', 'Zapier', 'Stripe', 'Loom', 'Figma']).map((logo, i) => (
              <div key={i} className="flex-shrink-0 bg-white border-[1.5px] border-slate-200 px-[22px] py-[10px] rounded-[10px] font-bold text-[13px] text-slate-400">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section with Standard Link Redirects */}
      <section id="pricing" className="py-24 max-w-[1200px] mx-auto px-8 text-center">
         <div className="mb-16">
            <div className="inline-block bg-blue-50 text-blue-700 text-[12px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-blue-200 mb-3">Pricing</div>
            <h2 className="font-display font-extrabold text-[42px] tracking-tight text-slate-900 mb-4">Simple, honest pricing</h2>
            <p className="text-slate-500 max-w-[540px] mx-auto text-[17px]">Lock in 40% off Pro forever. No credit card required.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { name: 'Starter', price: 0, desc: 'Perfect for freelancers.', features: ['1 Calendar sync', '5 Booking types'] },
              { name: 'Pro', price: 9, desc: 'For heavy schedulers.', features: ['Unlimited syncs', 'AI Assistant'], featured: true },
              { name: 'Team', price: 29, desc: 'For scaling teams.', features: ['Round-robin', 'Admin dashboard'] }
            ].map((plan, i) => (
              <div key={i} className={`p-8 rounded-[24px] bg-white border-[1.5px] flex flex-col ${plan.featured ? 'border-blue-500 shadow-2xl relative scale-[1.03]' : 'border-slate-100 shadow-sm'}`}>
                {plan.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">Most Popular</div>}
                <div className="font-display font-bold text-[18px] text-slate-900 mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-display text-[44px] font-extrabold text-slate-900 leading-none">${plan.price}</span>
                  <span className="text-[16px] text-slate-400 font-medium">/mo</span>
                </div>
                <p className="text-[14px] text-slate-500 mb-6 leading-relaxed">{plan.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-[14px] font-medium text-slate-700">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg> {f}
                    </li>
                  ))}
                </ul>
                <a href="/register" className={`block w-full py-3.5 rounded-[12px] font-bold text-center transition-all ${plan.featured ? 'bg-blue-600 text-white hover:bg-[#1d4ed8]' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>Get started</a>
              </div>
            ))}
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-8 mt-24">
         <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2.5">
               <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">S</div>
               <span className="font-display font-bold text-xl">Slotify</span>
            </div>
            <div className="flex gap-8 text-[14px] text-slate-400 font-medium">
               <a href="/login" className="hover:text-white transition-colors">Log In</a>
               <a href="/register" className="hover:text-white transition-colors">Register</a>
               <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
            <div className="text-slate-500 text-[12px] font-medium tracking-wide">
               © 2026 Slotify, Inc. All rights reserved.
            </div>
         </div>
      </footer>
    </div>
  );
}