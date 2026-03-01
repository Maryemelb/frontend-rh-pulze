"use client";
import { useState, useEffect } from "react";

const FIELDS = [
  { key: "job_title",          label: "Job Title",        type: "text",     half: true  },
  { key: "company_name",       label: "Company Name",     type: "text",     half: true  },
  { key: "salary_estimate",    label: "Salary Estimate",  type: "text",     half: true  },
  { key: "rating",             label: "Rating (0–5)",     type: "number",   half: true  },
  { key: "location",           label: "Location",         type: "text",     half: true  },
  { key: "headquarters",       label: "Headquarters",     type: "text",     half: true  },
  { key: "size",               label: "Company Size",     type: "text",     half: true  },
  { key: "founded",            label: "Founded Year",     type: "number",   half: true  },
  { key: "type_of_ownership",  label: "Ownership Type",   type: "text",     half: true  },
  { key: "industry",           label: "Industry",         type: "text",     half: true  },
  { key: "sector",             label: "Sector",           type: "text",     half: true  },
  { key: "revenue",            label: "Revenue",          type: "text",     half: true  },
  { key: "competitors",        label: "Competitors",      type: "text",     half: false },
  { key: "job_description",    label: "Job Description",  type: "textarea", half: false },
];

const empty = () => Object.fromEntries(FIELDS.map(f => [f.key, ""]));

const AVATAR_COLORS = [
  "from-[#FDC3A1] to-[#FB9B8F]",
  "from-[#FB9B8F] to-[#F57799]",
  "from-[#F57799] to-[#FDC3A1]",
  "from-[#FDC3A1] to-[#F57799]",
];

export default function JobsPage() {
  const [form, setForm]         = useState(empty());
  const [jobs, setJobs]         = useState([]);
  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(true);
  const [msg, setMsg]           = useState(null);
  const [openIdx, setOpenIdx]   = useState(null);
  const [showForm, setShowForm] = useState(false);

  async function fetchJobs() {
    setFetching(true);
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch { setJobs([]); }
    setFetching(false);
  }

  useEffect(() => { fetchJobs(); }, []);

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  setMsg(null);

  try {
    const payload = { 
      ...form, 
      rating: Number(form.rating) || 0, 
      founded: Number(form.founded) || 0, 
      index: jobs.length 
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/jobs/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // <-- IMPORTANT: sends cookies to backend
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setMsg({ ok: true, text: "Job added successfully ✓" });
      setForm(empty());
      setShowForm(false);
      fetchJobs();
    } else {
      const errorData = await res.json();
      setMsg({ ok: false, text: errorData.detail || "Failed to save job." });
    }
  } catch (err) {
    setMsg({ ok: false, text: "Network error." });
  }

  setLoading(false);
}
  const avgRating = jobs.length
    ? (jobs.reduce((s, j) => s + (Number(j.rating) || 0), 0) / jobs.length).toFixed(1)
    : "—";
  const industryCount = new Set(jobs.map(j => j.industry).filter(Boolean)).size;

  const inputClass = "w-full rounded-xl border border-[#FDC3A1]/60 bg-[#FFF7CD]/60 px-3.5 py-2.5 text-sm text-[#5a3a2a] placeholder-[#5a3a2a]/30 outline-none focus:border-[#FB9B8F] focus:ring-2 focus:ring-[#FB9B8F]/20 transition";
  const labelClass = "block text-[10px] font-semibold uppercase tracking-widest text-[#5a3a2a]/50 mb-1.5";

  return (
    <div className="min-h-screen bg-[#FFF7CD] p-8">

      {/* Header */}
      <div className="flex items-end justify-between mb-7">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#5a3a2a]/40 mb-1">Workspace</p>
          <h1 className="text-4xl font-bold text-[#5a3a2a] tracking-tight">
            Job <em className="text-[#F57799] not-italic">Board</em>
          </h1>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FB9B8F] to-[#F57799] text-white text-sm font-semibold shadow-[0_4px_16px_rgba(245,119,153,0.4)] hover:shadow-[0_6px_24px_rgba(245,119,153,0.5)] hover:-translate-y-0.5 transition-all"
        >
          {showForm ? "✕ Cancel" : "+ Add Job"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        {[
          { label: "Total Jobs",  value: jobs.length,   color: "text-[#FDC3A1]" },
          { label: "Industries",  value: industryCount, color: "text-[#FB9B8F]" },
          { label: "Avg Rating",  value: avgRating,     color: "text-[#F57799]" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#FDC3A1]/30 px-5 py-4 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#5a3a2a]/40 mb-1.5">{s.label}</p>
            <p className={`text-4xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Message */}
      {msg && (
        <div className={`mb-5 px-4 py-3 rounded-xl text-sm font-medium border-l-4 ${msg.ok ? "bg-[#FDC3A1]/25 border-[#FDC3A1] text-[#7a3a1a]" : "bg-[#F57799]/10 border-[#F57799] text-[#8a2a4a]"}`}>
          {msg.text}
        </div>
      )}

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-[#FDC3A1]/40 p-7 mb-7 shadow-[0_4px_24px_rgba(245,119,153,0.08)]">
          <h2 className="text-xl font-bold text-[#5a3a2a] mb-1">New Job Entry</h2>
          <p className="text-xs text-[#5a3a2a]/45 mb-5">Fill in the details below to add a new position.</p>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {FIELDS.map(f => (
                <div key={f.key} className={f.half ? "" : "col-span-2"}>
                  <label className={labelClass}>{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea rows={3} className={`${inputClass} resize-y`} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={`Enter ${f.label.toLowerCase()}…`} />
                  ) : (
                    <input type={f.type} className={inputClass} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={`Enter ${f.label.toLowerCase()}…`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button type="submit" disabled={loading} className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#FDC3A1] to-[#FB9B8F] text-[#5a3a2a] font-semibold text-sm shadow-sm hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                {loading ? "Saving…" : "Save Job →"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl border border-[#FDC3A1]/60 text-[#5a3a2a]/60 text-sm hover:border-[#FB9B8F] hover:text-[#FB9B8F] transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Jobs list */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-[#5a3a2a]">All Listings</h2>
        <span className="text-xs font-semibold text-white px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FDC3A1] to-[#FB9B8F]">{jobs.length}</span>
      </div>

      {fetching ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-[#FDC3A1]/50">
          <div className="w-9 h-9 rounded-full border-2 border-[#FDC3A1]/40 border-t-[#F57799] animate-spin mb-3" />
          <p className="text-sm text-[#5a3a2a]/40">Loading…</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-[#FDC3A1]/50">
          <span className="text-4xl mb-3">🌸</span>
          <p className="text-lg font-bold text-[#5a3a2a] mb-1">No jobs yet</p>
          <p className="text-sm text-[#5a3a2a]/40">Click "+ Add Job" to get started.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {jobs.map((job, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#FDC3A1]/30 overflow-hidden hover:shadow-[0_4px_20px_rgba(245,119,153,0.1)] transition-all">
              {/* Row */}
              <div className="flex items-center gap-4 px-5 py-4 cursor-pointer" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${AVATAR_COLORS[i % 4]} flex items-center justify-center text-white font-bold text-base shrink-0`}>
                  {(job.job_title || "J")[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#5a3a2a] truncate">{job.job_title || "Untitled"}</p>
                  <p className="text-xs text-[#5a3a2a]/45 mt-0.5">
                    🏢 {job.company_name || "—"} · 📍 {job.location || "—"}
                    {Number(job.rating) > 0 && ` · ⭐ ${job.rating}`}
                  </p>
                </div>
                {job.salary_estimate && (
                  <span className="text-xs font-semibold text-[#c0574a] bg-[#FDC3A1]/30 px-3 py-1 rounded-full shrink-0">{job.salary_estimate}</span>
                )}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`shrink-0 transition-transform ${openIdx === i ? "rotate-90 text-[#F57799]" : "text-[#5a3a2a]/25"}`}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
              {/* Details */}
              {openIdx === i && (
                <div className="border-t border-[#FDC3A1]/25 px-5 pt-4 pb-5">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {[["Industry", job.industry], ["Sector", job.sector], ["Size", job.size], ["Founded", job.founded], ["Revenue", job.revenue], ["HQ", job.headquarters], ["Ownership", job.type_of_ownership], ["Competitors", job.competitors]]
                      .filter(([, v]) => v)
                      .map(([k, v]) => (
                        <div key={k}>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#5a3a2a]/35 mb-1">{k}</p>
                          <p className="text-sm text-[#5a3a2a]">{v}</p>
                        </div>
                      ))}
                  </div>
                  {job.job_description && (
                    <div className="bg-[#FFF7CD]/60 rounded-xl p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#5a3a2a]/35 mb-1.5">Description</p>
                      <p className="text-sm text-[#5a3a2a]/65 leading-relaxed line-clamp-3">{job.job_description}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}