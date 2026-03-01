"use client";
import { useState } from "react";

const PILL_COLORS = [
  "bg-[#FDC3A1]/40 border-[#FDC3A1]/70 text-[#9a4a2a]",
  "bg-[#FB9B8F]/25 border-[#FB9B8F]/50 text-[#8a3a2a]",
  "bg-[#F57799]/15 border-[#F57799]/40 text-[#8a2a4a]",
  "bg-[#FFF7CD] border-[#FDC3A1]/60 text-[#7a4a1a]",
];

export default function ExtractSkillsPage() {
  const [text, setText]       = useState("");
  const [skills, setSkills]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSkills(null);
    try {
      const res = await fetch("/api/extract-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        setSkills(await res.json());
      } else {
        setError("Extraction failed. Please try again.");
      }
    } catch {
      setError("Network error.");
    }
    setLoading(false);
  }

  const totalSkills =
    Array.isArray(skills) ? skills.length
    : skills && typeof skills === "object" ? Object.values(skills).flat().length
    : 0;

  function renderSkills() {
    if (!skills) return null;

    if (Array.isArray(skills)) {
      return (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#5a3a2a]/45 mb-3">
            {skills.length} skills extracted
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className={`border px-3.5 py-1.5 rounded-full text-sm font-medium ${PILL_COLORS[i % PILL_COLORS.length]}`}>
                {s}
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (typeof skills === "object") {
      return (
        <div className="space-y-5">
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="h-px flex-1 bg-[#FDC3A1]/40" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#5a3a2a]/45">{cat}</span>
                <div className="h-px flex-1 bg-[#FDC3A1]/40" />
              </div>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(items) ? items : [items]).map((s, i) => (
                  <span key={i} className={`border px-3.5 py-1.5 rounded-full text-sm font-medium ${PILL_COLORS[i % PILL_COLORS.length]}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return <pre className="text-xs text-[#5a3a2a]/60 whitespace-pre-wrap">{JSON.stringify(skills, null, 2)}</pre>;
  }

  return (
    <div className="min-h-screen bg-[#FFF7CD] p-8">

      {/* Header */}
      <div className="mb-7">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#5a3a2a]/40 mb-1">NLP Analysis</p>
        <h1 className="text-4xl font-bold text-[#5a3a2a] tracking-tight">
          Skill <em className="text-[#F57799] not-italic">Extractor</em>
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-6 items-start">

        {/* Input */}
        <div className="bg-white rounded-2xl border border-[#FDC3A1]/35 p-7 shadow-sm">
          <h2 className="text-lg font-bold text-[#5a3a2a] mb-1">Job Description</h2>
          <p className="text-xs text-[#5a3a2a]/45 mb-5">
            Paste any job posting — we'll extract skills, tools, and qualifications.
          </p>

          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full min-h-72 resize-y rounded-xl border border-[#FDC3A1]/50 bg-[#FFF7CD]/40 px-4 py-3.5 text-sm text-[#5a3a2a] placeholder-[#5a3a2a]/30 italic outline-none focus:border-[#FB9B8F] focus:ring-2 focus:ring-[#FB9B8F]/15 focus:not-italic leading-relaxed transition"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste a job description here…"
            />

            <div className="flex justify-between text-[10px] text-[#5a3a2a]/30 mt-1.5 mb-3">
              <span>{text.length} chars</span>
              <span>{wordCount} words</span>
            </div>

            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FDC3A1] via-[#FB9B8F] to-[#F57799] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(245,119,153,0.3)] hover:shadow-[0_6px_24px_rgba(245,119,153,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Extracting…" : "Extract Skills →"}
            </button>

            {error && (
              <p className="mt-3 px-4 py-2.5 rounded-xl bg-[#F57799]/10 border-l-4 border-[#F57799] text-sm text-[#8a2a4a]">{error}</p>
            )}
          </form>
        </div>

        {/* Output */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-[#FDC3A1]/35 p-7 shadow-sm min-h-72 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#5a3a2a]/40">Extracted Skills</p>
              {totalSkills > 0 && (
                <span className="text-xs font-semibold text-white px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FDC3A1] to-[#F57799]">
                  {totalSkills} found
                </span>
              )}
            </div>

            {/* Empty state */}
            {!skills && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FDC3A1]/30 to-[#F57799]/15 border-2 border-dashed border-[#FDC3A1]/50 flex items-center justify-center text-2xl mb-3">
                  ✦
                </div>
                <p className="text-sm text-[#5a3a2a]/40 italic">Skills will appear here after extraction.</p>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <div className="flex gap-1.5">
                  {["#FDC3A1", "#FB9B8F", "#F57799"].map((c, i) => (
                    <span key={i} className="w-2.5 h-2.5 rounded-full animate-bounce" style={{ background: c, animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
                <p className="text-sm text-[#5a3a2a]/40 italic">Analysing description…</p>
              </div>
            )}

            {/* Skills */}
            {skills && !loading && renderSkills()}
          </div>

          {/* How it works */}
          <div className="rounded-2xl px-5 py-4 bg-gradient-to-br from-[#FDC3A1]/40 to-[#F57799]/20 border border-[#FDC3A1]/40">
            <p className="text-sm font-semibold text-[#5a3a2a] mb-1.5">💡 How it works</p>
            <p className="text-xs text-[#5a3a2a]/60 leading-relaxed">
              Paste any job posting or description. The API will parse and return structured skills, technologies, and qualifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}