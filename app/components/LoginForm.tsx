
'use client';
"use client";

import { useState } from "react";

export default function LoginForm({ is_login }) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[560px]">

        {/* ── LEFT: Form Panel ── */}
        <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="3" />
                <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
              </svg>
            </div>
            <span className="text-gray-800 font-semibold text-base">dotwork</span>
          </div>

          {/* Heading */}

          { is_login &&
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Log in to your Account</h1>
          }
          { !is_login &&
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Create your Account</h1>
          }


          {/* Email */}
          <div className="relative mb-3">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 pl-10 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-all ${rememberMe ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"
                  }`}
              >
                {rememberMe && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-gray-600 text-sm">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-md shadow-blue-200">
            Log in
          </button>

          {/* Sign up */}
          <p className="text-center text-gray-500 text-sm mt-5">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Create an account
            </a>
          </p>
        </div>

        {/* ── RIGHT: Blue Decorative Panel ── */}
        <div className="hidden lg:flex flex-col items-center justify-center flex-1 bg-blue-600 relative overflow-hidden p-10">

          {/* Concentric circle background */}
          <div className="absolute w-[500px] h-[500px] rounded-full border border-blue-500/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-[380px] h-[380px] rounded-full border border-blue-500/25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-[260px] h-[260px] rounded-full bg-blue-500/25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Illustration */}
          <div className="relative z-10 w-full flex items-center justify-center mb-8" style={{ height: "260px" }}>

            {/* SVG lines from nodes to center */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 260" fill="none">
              <line x1="90" y1="72" x2="180" y2="130" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
              <line x1="90" y1="188" x2="180" y2="130" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
              <line x1="180" y1="130" x2="270" y2="130" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            </svg>

            {/* Slack node */}
            <div className="absolute" style={{ left: "52px", top: "46px" }}>
              <div className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z" fill="#E01E5A" />
                  <path d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A" />
                  <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834z" fill="#36C5F0" />
                  <path d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0" />
                  <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834z" fill="#2EB67D" />
                  <path d="M17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D" />
                  <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52z" fill="#ECB22E" />
                  <path d="M15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E" />
                </svg>
              </div>
            </div>

            {/* Center hub */}
            <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
              <div className="w-16 h-16 rounded-full bg-blue-500 border-2 border-blue-300/50 flex items-center justify-center shadow-2xl">
                <div className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-9a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2V8a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Google node */}
            <div className="absolute" style={{ left: "52px", bottom: "46px" }}>
              <div className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center">
                <svg className="w-7 h-7" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
            </div>

            {/* Right: white card mock */}
            <div className="absolute shadow-2xl rounded-2xl bg-white overflow-hidden" style={{ right: "8px", top: "50%", transform: "translateY(-50%)", width: "148px" }}>
              {/* top bar with window dots */}
              <div className="bg-gray-50 px-3 py-2 flex items-center gap-1 border-b border-gray-100">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <div className="ml-2 flex-1 h-1.5 bg-gray-200 rounded-full" />
              </div>
              <div className="p-3 space-y-3">
                {[
                  { color: "bg-pink-300" },
                  { color: "bg-blue-300" },
                  { color: "bg-orange-300" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full ${row.color} flex-shrink-0`} />
                    <div className="flex-1 space-y-1">
                      <div className="h-1.5 bg-gray-200 rounded-full w-full" />
                      <div className="h-1.5 bg-gray-100 rounded-full w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <div className="relative z-10 text-center">
            <h2 className="text-white text-xl font-bold mb-1">Connect with every application.</h2>
            <p className="text-blue-100/80 text-sm">Everything you need in an easily customizable dashboard.</p>
            <div className="flex items-center justify-center gap-1.5 mt-5">
              <div className="w-2 h-2 rounded-full bg-white" />
              <div className="w-2 h-2 rounded-full bg-blue-400/50" />
              <div className="w-2 h-2 rounded-full bg-blue-400/50" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}