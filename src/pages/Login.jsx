import { useState } from "react";

import {
  useNavigate
} from "react-router-dom";

import API from "../services/api";

export default function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  // =========================
  // LOGIN
  // =========================

  const handleLogin =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      setError(null);

      try {

        const res =
          await API.post(

            "/auth/login/",

            {
              email,
              password,
            }

          );

        console.log(
          "LOGIN:",
          res.data
        );

        // ACCESS
        localStorage.setItem(

          "access",

          res.data.access

        );

        // REFRESH
        localStorage.setItem(

          "refresh",

          res.data.refresh

        );

        // USER
        localStorage.setItem(

          "user",

          JSON.stringify(
            res.data.user
          )

        );

        // TENANT SLUG
        if (
          res.data.tenant?.slug
        ) {

          localStorage.setItem(

            "tenant_slug",

            res.data.tenant.slug

          );

        }

        // REDIRECT
        navigate("/home/slots");

      } catch (err) {

        console.log(
          err.response?.data || err
        );

        setError(
          "Invalid email or password"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">

      {/* LEFT */}

      <div className="hidden lg:flex flex-col justify-between w-1/2 p-16 bg-white border-r border-slate-100">

        <div>

          {/* LOGO */}

          <div
            className="flex items-center gap-3 mb-16 cursor-pointer"
            onClick={() =>
              navigate("/")
            }
          >

            <div className="w-11 h-11 bg-[#5850EC] rounded-2xl flex items-center justify-center">

              <div className="w-4 h-4 bg-white rounded-full" />

            </div>

            <h1 className="text-3xl font-bold">
              Slotify
            </h1>

          </div>

          {/* CONTENT */}

          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#EEF2FF] text-[#5850EC] text-sm font-semibold mb-6">

            Smart Booking Platform

          </span>

          <h1 className="text-6xl font-black leading-tight mb-6">

            Manage
            <br />
            bookings
            <br />
            easily.

          </h1>

          <p className="text-slate-500 text-lg max-w-lg leading-relaxed">

            Access your dashboard,
            manage appointments,
            and book available slots
            in real-time.

          </p>

          {/* STATS */}

          <div className="grid grid-cols-2 gap-5 mt-14 max-w-md">

            <div className="p-6 bg-[#F8FAFC] rounded-3xl">

              <h2 className="text-3xl font-bold">
                24/7
              </h2>

              <p className="text-slate-400 mt-2">
                Availability
              </p>

            </div>

            <div className="p-6 bg-[#F8FAFC] rounded-3xl">

              <h2 className="text-3xl font-bold">
                99%
              </h2>

              <p className="text-slate-400 mt-2">
                Fast Booking
              </p>

            </div>

          </div>

        </div>

        <p className="text-slate-300 text-sm">
          © 2026 Slotify
        </p>

      </div>

      {/* RIGHT */}

      <div className="flex-1 flex items-center justify-center p-8">

        <div className="w-full max-w-[480px] bg-white rounded-[32px] p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">

          {/* TOP */}

          <div className="mb-10">

            <h2 className="text-4xl font-bold mb-3">

              Sign In

            </h2>

            <p className="text-slate-400 text-lg">

              Welcome back

            </p>

          </div>

          {/* ERROR */}

          {error && (

            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">

              {error}

            </div>

          )}

          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >

            {/* EMAIL */}

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">

                Email

              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="you@example.com"
                className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

            </div>

            {/* PASSWORD */}

            <div>

              <div className="flex justify-between mb-2">

                <label className="text-sm font-semibold text-slate-700">

                  Password

                </label>

                <button
                  type="button"
                  className="text-xs text-[#5850EC] font-bold"
                >

                  Forgot?

                </button>

              </div>

              <input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="••••••••"
                className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl bg-[#5850EC] text-white font-bold text-lg transition-all ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-indigo-700"
              }`}
            >

              {
                loading
                  ? "Signing In..."
                  : "Sign In"
              }

            </button>

          </form>

          {/* REGISTER */}

          <div className="mt-10 text-center">

            <p className="text-slate-400">

              Don’t have account?

              {" "}

              <button
                onClick={() =>
                  navigate(
                    "/register"
                  )
                }
                className="text-[#5850EC] font-bold"
              >

                Register

              </button>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}