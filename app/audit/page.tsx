// app/audit/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { ArrowRight, CheckCircle2, XCircle, ShieldAlert } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Do you have a digital visitor log (not just paper)?",
    hint: "Paper sheets can be lost, damaged, or altered. Digital logs are searchable and exportable.",
  },
  {
    id: 2,
    question: "Can you prove every visitor acknowledged your safety rules?",
    hint: "Inspectors want to see that visitors were informed — not just that they signed their name.",
  },
  {
    id: 3,
    question: "Is your visitor check‑in process completely contactless?",
    hint: "QR codes or self‑service kiosks reduce shared surfaces and speed up entry.",
  },
  {
    id: 4,
    question: "Does every entry have an accurate, automatic timestamp?",
    hint: "Hand‑written times are easy to forge. Digital timestamps can’t be changed after the fact.",
  },
  {
    id: 5,
    question: "Can you filter and export your visitor records by date, site, or host?",
    hint: "During an audit you’ll need to produce a filtered report in minutes, not hours.",
  },
  {
    id: 6,
    question: "Are host notifications sent automatically when a visitor arrives?",
    hint: "The person being visited should know immediately — without you having to call or text.",
  },
  {
    id: 7,
    question: "Can you pre‑register expected visitors so they can sign in with one tap?",
    hint: "Pre‑registration saves time at the front desk and reduces typing errors.",
  },
  {
    id: 8,
    question: "Do you capture a photo of each visitor at check‑in?",
    hint: "A photo adds a layer of security and helps with badge printing and identification.",
  },
  {
    id: 9,
    question: "Is your check‑in system available on any device without installing an app?",
    hint: "Visitors should be able to sign in on their own phone or a shared tablet — no app store required.",
  },
  {
    id: 10,
    question: "Do you have a clear retention policy for visitor data?",
    hint: "You need to know how long records are kept and be able to delete them if required.",
  },
];

export default function AuditPage() {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const score =
    submitted && Object.values(answers).filter((v) => v === true).length;

  function getScoreCategory(score: number) {
    if (score <= 3)
      return {
        label: "High risk",
        color: "text-rose-400",
        icon: ShieldAlert,
        message:
          "Your current visitor log would likely fail a safety audit. You’re missing the majority of the essentials.",
      };
    if (score <= 6)
      return {
        label: "Moderate risk",
        color: "text-amber-400",
        icon: ShieldAlert,
        message:
          "You’re doing some things right, but there are important gaps an inspector would notice.",
      };
    if (score <= 9)
      return {
        label: "Almost there",
        color: "text-sky-400",
        icon: CheckCircle2,
        message:
          "You’ve covered most of the basics. A few improvements would make your log audit‑proof.",
      };
    return {
      label: "Fully covered",
      color: "text-emerald-400",
      icon: CheckCircle2,
      message:
        "You’re doing everything right — a digital system with mandatory safety acknowledgment, automated records, and exports. Keep it up!",
    };
  }

  function handleAnswer(qId: number, value: boolean) {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [qId]: value }));
    }
  }

  function handleSubmit() {
    if (Object.keys(answers).length < questions.length) return;
    setSubmitted(true);
    track("self_audit_completed", { score });
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  const ScoreIcon = submitted ? getScoreCategory(score as number).icon : CheckCircle2;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
            Free Visitor Log Self‑Audit
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Answer 10 quick questions to see if your current visitor log would
            survive a safety inspection.
          </p>
        </div>

        {/* Questions */}
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 sm:p-8 space-y-6">
          {!submitted && (
            <p className="text-xs text-slate-500 text-center">
              Answer all questions, then click “See my score” at the bottom.
            </p>
          )}

          {questions.map((q) => {
            const answer = answers[q.id];
            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border transition-colors ${
                  submitted
                    ? answer === true
                      ? "border-emerald-400/20 bg-emerald-500/5"
                      : "border-rose-400/20 bg-rose-500/5"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <p className="text-sm font-medium text-white mb-2">{q.question}</p>
                <p className="text-xs text-slate-400 mb-3">{q.hint}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAnswer(q.id, true)}
                    disabled={submitted}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      answer === true
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                        : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(q.id, false)}
                    disabled={submitted}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      answer === false
                        ? "bg-rose-500/20 text-rose-300 border border-rose-400/30"
                        : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" /> No
                  </button>
                </div>
              </div>
            );
          })}

          {/* Submit / Result */}
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < questions.length}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/30 disabled:text-sky-200/50 text-white font-medium rounded-xl px-6 py-3 text-sm transition-all"
            >
              See my score
            </button>
          ) : (
            <div className="text-center pt-4">
              <div className="inline-flex items-center gap-2 text-3xl font-extrabold text-white">
                <ScoreIcon className={`w-6 h-6 ${getScoreCategory(score as number).color}`} />
                {score}/10
              </div>
              <p
                className={`text-sm font-semibold mt-1 ${
                  getScoreCategory(score as number).color
                }`}
              >
                {getScoreCategory(score as number).label}
              </p>
              <p className="text-sm text-slate-300 mt-2 max-w-sm mx-auto leading-relaxed">
                {getScoreCategory(score as number).message}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-slate-900 font-medium rounded-xl px-6 py-3 text-sm transition-all"
                  onClick={() => track("audit_cta_click")}
                >
                  Start free trial <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <button
                  onClick={reset}
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Retake audit
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                SiteSafe fixes all 10 of these automatically — no credit card, no sales call.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}