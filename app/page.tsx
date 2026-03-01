'use client'
// pages/index.js - MOBILE HEADER FIXED
import { useState } from 'react';

export default function FixedLandingPage() {
  const [salary, setSalary] = useState('');
  const [isPredicted, setIsPredicted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-indigo-100 text-slate-900">
      {/* FIXED MOBILE HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-rose-200/50">
  <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16 sm:h-20">
      {/* Logo - Always visible */}
        <div className="flex items-center gap-2 mt-7 mb-8">
            <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="3" />
                <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
              </svg>
            </div>
            <span className="text-gray-800 font-semibold text-base">dotwork</span>
          </div>

      {/* Desktop Nav + Login Button - Hidden on mobile */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="#home" className="px-3 py-2 text-slate-700 font-medium hover:text-rose-600 border-b-2 border-transparent hover:border-rose-600 transition-colors">Home</a>
        <a href="#about" className="px-3 py-2 text-slate-700 font-medium hover:text-rose-600 border-b-2 border-transparent hover:border-rose-600 transition-colors">About</a>
        <a href="#tech" className="px-3 py-2 text-slate-700 font-medium hover:text-rose-600 border-b-2 border-transparent hover:border-rose-600 transition-colors">Tech</a>
        {/* Login Button */}
        <a 
          href="/login" 
          className="px-4 py-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-orange-600 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
        >
          <span>Login</span>
        </a>
      </div>

      {/* Mobile Menu Button - Always visible */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-600 text-xl shadow-md flex-shrink-0"
        aria-label="Menu"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>
    </div>

    {/* Mobile Menu - Slides down */}
    {mobileMenuOpen && (
      <div className="md:hidden bg-white border-t border-rose-200 px-4 py-4 shadow-lg">
        <div className="flex flex-col space-y-4 text-lg font-medium text-slate-700">
          <a href="#home" className="py-2 hover:text-rose-600 border-b border-rose-100 hover:border-rose-300 transition-colors">Home</a>
          <a href="#about" className="py-2 hover:text-rose-600 border-b border-rose-100 hover:border-rose-300 transition-colors">About</a>
          <a href="#tech" className="py-2 hover:text-rose-600 border-b border-rose-100 hover:border-rose-300 transition-colors">Tech</a>
          {/* Mobile Login Button */}
          <a 
            href="/login"
            className="py-3 px-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-orange-600 transition-all duration-200 text-center"
          >
            Login
          </a>
        </div>
      </div>
    )}
  </nav>
</header>



      {/* Main Content */}
      <section className="max-w-6xl mt-2.5 mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* RH Column */}
          <div className="order-2 lg:order-1 bg-white/70 backdrop-blur-xl rounded-3xl border border-rose-200 shadow-xl p-6 sm:p-8 lg:p-10 hover:shadow-2xl transition-shadow">
            <div className="flex items-start space-x-4 mb-6 sm:mb-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mt-1 flex-shrink-0 text-xl">
                👩‍💼
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 leading-tight">
                  I'm Sarah, Your 
                  <br />
                  <span className="bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">Brain Hunter</span>
                </h2>
                <p className="text-sm sm:text-base text-rose-600 font-semibold bg-rose-100 px-3 py-1 rounded-full w-fit">
                  Ex-Google RH • Chaos Enthusiast
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                <em>"I used to hire suits. Now I hunt <strong>mad scientists</strong> who think in colors and break rules for fun."</em>
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                My job? Spot the <strong>hidden creatives</strong> drowning in boring jobs. 
                Extract their superpowers with AI. Pay them what they're <strong>actually worth</strong>.
              </p>

              {/* Salary Predictor */}
              <div className="bg-gradient-to-r from-rose-50 to-orange-50 p-6 sm:p-8 rounded-2xl border-2 border-dashed border-rose-200">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-slate-900 flex items-center">
                  💰 What's this genius worth?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <a
                    href= "/predict-salary"
                    disabled={isPredicted}
                    className="flex-1 py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-pink-400 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    Predict Salary
                  </a>
                  <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent min-w-[140px] sm:min-w-[160px] text-center">
                    {salary || '???k'}
                  </div>
                </div>
                
                {isPredicted && (
                  <p className="mt-4 text-sm sm:text-base text-slate-600 italic text-center">
                    AI says this creative deserves champagne salary
                  </p>
                )}
              </div>

              {/* Skills */}
              <div className="pt-6 border-t-2 border-dashed border-rose-200">
                <h4 className="text-lg sm:text-xl font-bold mb-4 text-slate-800">
                  🛠️ AI-Scanned Superpowers:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Rule-Breaking Ideas', 'AI Whisperer', 'Design Alchemist', 'Chaos Tamer'].map((skill) => (
                    <div key={skill} className="bg-gradient-to-r from-rose-100 to-orange-100 p-3 sm:p-4 rounded-xl border border-rose-200 hover:bg-rose-200 hover:to-orange-200 transition-colors shadow-sm hover:shadow-md">
                      <span className="font-semibold text-slate-800 block text-sm sm:text-base">{skill}</span>
                      <span className="text-xs sm:text-sm text-rose-600 font-semibold">⭐⭐⭐⭐⭐</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Column */}
          <div className="order-1 lg:order-2 p-8 sm:p-10 md:p-12 bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 rounded-3xl text-white shadow-2xl hover:shadow-3xl transition-shadow">
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
                <div>YO!</div>
                <div className="text-5xl sm:text-6xl md:text-7xl">What</div>
                <div className="text-2xl sm:text-4xl tracking-widest">R U</div>
                <div className="text-5xl sm:text-7xl">WAITING</div>
                <div className="text-4xl sm:text-5xl">FOR?!</div>
              </h2>
              
              <p className="text-lg sm:text-xl mb-8 sm:mb-12 leading-relaxed opacity-95 max-w-lg mx-auto">
                Your dream team of weird geniuses is <strong>3 clicks away</strong>.
                <br className="hidden md:block" /> Don't make Sarah cry.
              </p>
              
              <a href="/predict-salary" className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 bg-white text-rose-600 text-lg sm:text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all border-4 border-white/20">
                GRAB YOUR BRAINS NOW!
              </a>
              
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t-2 border-white/30">
                <p className="text-base sm:text-lg opacity-90">⚡ Instant Access • AI Magic • No BS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="tech" className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
              Powered by Human + AI
            </h3>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
              We built this with coffee, late nights, and AI wizardry
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: '🤖', name: 'AI Brain', desc: 'Finds hidden geniuses' },
              { icon: '⚛️', name: 'Next.js', desc: 'Lightning fast' },
              { icon: '⚛️', name: 'FastApi', desc: 'Lightning fast' },
              { icon: '⚛️', name: 'TailwindCSS', desc: 'Zero bloat styling' },
              { icon: '🚀', name: 'Docker', desc: 'Deploy in 0.1s' }
            ].map(({ icon, name, desc }) => (
              <div key={name} className="p-6 sm:p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/20 shadow-xl hover:shadow-2xl transition-all text-center">
                <div className="text-3xl sm:text-4xl mb-3 mx-auto">{icon}</div>
                <h4 className="font-bold text-lg sm:text-xl mb-2">{name}</h4>
                <p className="opacity-75 text-sm">{desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 pt-8 border-t border-white/20">
            <p className="text-base sm:text-lg opacity-75">&copy; 2026 Sarah's Brain Hunt. Made by humans who love hiring humans.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
