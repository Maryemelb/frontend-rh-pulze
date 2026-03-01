"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/jobs",           label: "Job Board",       sub: "Browse & add",      icon: "💼" },
  { href: "/predict-salary", label: "Salary Oracle",   sub: "AI prediction",     icon: "🔮" },
  { href: "/extract-skills", label: "Skill Extractor", sub: "Parse descriptions",icon: "⭐" },
];

export default function DashboardLayout({ children }) {
  const path = usePathname();

  return (
    <div className="flex min-h-screen bg-[#FFF7CD]">

      {/* Sidebar */}
      <aside className="w-60 min-h-screen flex flex-col bg-gradient-to-b from-[#FDC3A1] via-[#FB9B8F] to-[#F57799] relative overflow-hidden">

        {/* Background decorations */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute bottom-20 -left-8 w-32 h-32 rounded-full bg-white/8 pointer-events-none" />

        {/* Logo */}
        <div className="px-5 pt-7 pb-4">
          <div className="flex items-center gap-2.5 mb-0.5">
            <span className="text-2xl">📍</span>
            <span className="text-[#FFF7CD] text-xl font-bold tracking-tight">JobLens</span>
          </div>
          <p className="text-[#FFF7CD]/60 text-[10px] uppercase tracking-widest pl-9">Career Intel</p>
        </div>

        <div className="mx-5 my-3 h-px bg-white/20" />

        {/* Nav links */}
        <nav className="flex-1 px-3 pt-1">
          <p className="text-[#FFF7CD]/50 text-[9px] uppercase tracking-[3px] font-semibold px-2 mb-2">Menu</p>
          {links.map(({ href, label, sub, icon }) => {
            const active = path === href || path?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200 border",
                  active
                    ? "bg-white/25 border-white/40 shadow-sm"
                    : "border-transparent hover:bg-white/15",
                ].join(" ")}
              >
                <span className="text-lg leading-none">{icon}</span>
                <span>
                  <span className={`block text-sm font-semibold ${active ? "text-[#FFF7CD]" : "text-[#FFF7CD]/85"}`}>
                    {label}
                  </span>
                  <span className="block text-[10px] text-[#FFF7CD]/50">{sub}</span>
                </span>
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FFF7CD] shadow-[0_0_6px_white]" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mx-3 mb-5 p-3.5 rounded-2xl bg-white/15 border border-white/20">
          <p className="text-[#FFF7CD] text-xs italic leading-snug">
            "Find the role that fits, not just the one that's open."
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-[#FFF7CD]">
        {children}
      </main>
    </div>
  );
}