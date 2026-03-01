"use client";
import { useState } from "react";

const FIELDS = [
  { key: "job_title", label: "Job Title", type: "text", half: true },
  { key: "company_name", label: "Company Name", type: "text", half: true },
  { key: "salary_estimate", label: "Current Estimate", type: "text", half: true },
  { key: "rating", label: "Company Rating", type: "number", half: true },
  { key: "location", label: "Location", type: "text", half: true },
  { key: "headquarters", label: "Headquarters", type: "text", half: true },
  { key: "size", label: "Company Size", type: "text", half: true },
  { key: "founded", label: "Founded Year", type: "number", half: true },
  { key: "type_of_ownership", label: "Ownership Type", type: "text", half: true },
  { key: "industry", label: "Industry", type: "text", half: true },
  { key: "sector", label: "Sector", type: "text", half: true },
  { key: "revenue", label: "Revenue", type: "text", half: true },
  { key: "competitors", label: "Competitors", type: "text", half: false },
  { key: "job_description", label: "Job Description", type: "textarea", half: false },
];

const empty = () => Object.fromEntries(FIELDS.map(f => [f.key, ""]));

export default function PredictSalaryPage() {
  const [form, setForm] = useState(empty());
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        ...form,
        rating: form.rating ? Number(form.rating) : null,
        founded: form.founded ? Number(form.founded) : null,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/predict-salary/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", 
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Prediction failed");
      }

      const data = await res.json();
      setResult(data);

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  const salaryKey = result
    ? Object.keys(result).find(k =>
        k.toLowerCase().includes("salary") ||
        k.toLowerCase().includes("predicted")
      )
    : null;

  const inputClass =
    "w-full rounded-xl border border-[#FDC3A1]/60 bg-[#FFF7CD]/60 px-3.5 py-2.5 text-sm text-[#5a3a2a] placeholder-[#5a3a2a]/30 outline-none focus:border-[#F57799] focus:ring-2 focus:ring-[#F57799]/15 transition";

  const labelClass =
    "block text-[10px] font-semibold uppercase tracking-widest text-[#5a3a2a]/50 mb-1.5";

  return (
    <div className="min-h-screen bg-[#FFF7CD] p-8">
      <div className="mb-7">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#5a3a2a]/40 mb-1">
          AI Powered
        </p>
        <h1 className="text-4xl font-bold text-[#5a3a2a] tracking-tight">
          Salary <em className="text-[#F57799] not-italic">Oracle</em>
        </h1>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-6 items-start">

        {/* FORM */}
        <div className="bg-white rounded-2xl border border-[#FDC3A1]/35 p-7 shadow-sm">
          <h2 className="text-lg font-bold text-[#5a3a2a] mb-1">Job Details</h2>
          <p className="text-xs text-[#5a3a2a]/45 mb-5">
            Fill in all available info for the best prediction.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {FIELDS.map(f => (
                <div key={f.key} className={f.half ? "" : "col-span-2"}>
                  <label className={labelClass}>{f.label}</label>

                  {f.type === "textarea" ? (
                    <textarea
                      rows={3}
                      className={`${inputClass} resize-y`}
                      value={form[f.key]}
                      onChange={e =>
                        setForm(p => ({ ...p, [f.key]: e.target.value }))
                      }
                    />
                  ) : (
                    <input
                      type={f.type}
                      className={inputClass}
                      value={form[f.key]}
                      onChange={e =>
                        setForm(p => ({ ...p, [f.key]: e.target.value }))
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-[#FB9B8F] to-[#F57799] text-white font-semibold text-sm disabled:opacity-50 transition-all"
            >
              {loading ? "Predicting…" : "Predict Salary →"}
            </button>

            {error && (
              <p className="mt-3 px-4 py-2.5 rounded-xl bg-[#F57799]/10 border-l-4 border-[#F57799] text-sm text-[#8a2a4a]">
                {error}
              </p>
            )}
          </form>
        </div>

        {/* RESULT */}
        <div className="sticky top-8">
          <div className="bg-white rounded-2xl border border-[#FDC3A1]/35 p-6 shadow-sm min-h-[280px]">

            {!result && !loading && (
              <div className="text-center py-12 text-sm text-[#5a3a2a]/45 italic">
                Fill the form and click predict to see the salary.
              </div>
            )}

            {loading && (
              <div className="text-center py-12 text-sm italic">
                Consulting the oracle…
              </div>
            )}

            {result && !loading && (
              <>
                {salaryKey && (
                  <div className="bg-gradient-to-br from-[#FDC3A1]/30 to-[#F57799]/20 rounded-xl p-5 text-center mb-5">
                    <p className="text-[10px] uppercase tracking-widest text-[#5a3a2a]/45">
                      Predicted Salary
                    </p>
                    <p className="text-3xl font-bold text-[#F57799]">
                      {result[salaryKey]}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
