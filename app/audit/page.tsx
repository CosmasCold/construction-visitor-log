// app/audit/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Copy,
  Award,
} from "lucide-react";

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
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "loading" | "sent" | "error"
  >("idle");
  const [scoreRevealed, setScoreRevealed] = useState(false);
  const [badgeCopied, setBadgeCopied] = useState(false);

  const score =
    submitted && scoreRevealed
      ? Object.values(answers).filter((v) => v === true).length
      : 0;

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
    if (!submitted && !showEmailCapture) {
      setAnswers((prev) => ({ ...prev, [qId]: value }));
    }
  }

  function handleSeeMyScore() {
    if (Object.keys(answers).length < questions.length) return;
    setShowEmailCapture(true);
    setSubmitted(true); // mark submitted so answers can't change, but score not yet revealed
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setEmailStatus("loading");
    try {
      const res = await fetch("/api/send-checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        track("self_audit_report_requested");
        setEmailStatus("sent");
        // reveal score after a brief moment
        setTimeout(() => {
          setScoreRevealed(true);
        }, 500);
      } else {
        setEmailStatus("error");
      }
    } catch {
      setEmailStatus("error");
    }
  }

  function skipEmail() {
    setScoreRevealed(true);
    track("self_audit_completed", { score: Object.values(answers).filter(v => v === true).length });
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
    setShowEmailCapture(false);
    setEmail("");
    setEmailStatus("idle");
    setScoreRevealed(false);
  }

  function copyBadge() {
    const badgeCode = `<a href="https://sitesafe.thesift.space/audit" target="_blank" rel="noopener noreferrer">
  <img src="https://sitesafe.thesift.space/api/audit-badge?score=${score}" alt="SiteSafe Audit Score: ${score}/10" style="width:200px;height:auto;" />
</a>`;
    navigator.clipboard.writeText(badgeCode);
    setBadgeCopied(true);
    setTimeout(() => setBadgeCopied(false), 2000);
    track("audit_badge_copied", { score });
  }

  const ScoreIcon = scoreRevealed ? getScoreCategory(score).icon : CheckCircle2;

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
            const disabled = submitted || showEmailCapture;
            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border transition-colors ${
                  scoreRevealed
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
                    disabled={disabled}
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
                    disabled={disabled}
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

          {/* Email capture step (before score) */}
          {showEmailCapture && !scoreRevealed ? (
            <div className="bg-white/[0.04] rounded-xl p-6 border border-white/5 space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Want the full report?
              </h3>
              <p className="text-sm text-slate-300">
                Enter your email and we’ll send you a detailed breakdown of your
                score, plus the exact steps to fix each gap. No spam, no sales call.
              </p>
              {emailStatus !== "sent" ? (
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  />
                  <button
                    type="submit"
                    disabled={emailStatus === "loading"}
                    className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/50 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
                  >
                    {emailStatus === "loading" ? "Sending…" : "Send report"}
                  </button>
                </form>
              ) : (
                <p className="text-emerald-400 text-sm">Report sent! Check your inbox.</p>
              )}
              {emailStatus === "error" && (
                <p className="text-rose-400 text-xs">Something went wrong. Please try again.</p>
              )}
              <button
                onClick={skipEmail}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                No thanks, just show my score
              </button>
            </div>
          ) : null}

          {/* Submit button (before email capture) */}
          {!submitted && !showEmailCapture ? (
            <button
              onClick={handleSeeMyScore}
              disabled={Object.keys(answers).length < questions.length}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/30 disabled:text-sky-200/50 text-white font-medium rounded-xl px-6 py-3 text-sm transition-all"
            >
              See my score
            </button>
          ) : null}

          {/* Score display (after email or skip) */}
          {scoreRevealed ? (
            <div className="text-center pt-4">
              <div className="inline-flex items-center gap-2 text-3xl font-extrabold text-white">
                <ScoreIcon className={`w-6 h-6 ${getScoreCategory(score).color}`} />
                {score}/10
              </div>
              <p
                className={`text-sm font-semibold mt-1 ${
                  getScoreCategory(score).color
                }`}
              >
                {getScoreCategory(score).label}
              </p>
              <p className="text-sm text-slate-300 mt-2 max-w-sm mx-auto leading-relaxed">
                {getScoreCategory(score).message}
              </p>

              {/* Embeddable badge */}
              <div className="mt-6 bg-white/[0.04] border border-white/10 rounded-xl p-4 inline-block mx-auto">
                <p className="text-xs text-slate-400 mb-2 flex items-center justify-center gap-1">
                  <Award className="w-4 h-4" /> Your badge
                </p>
                <div className="flex items-center gap-3 justify-center">
                  <div className="bg-slate-800 rounded-lg px-4 py-2 inline-flex items-center gap-2 border border-white/10">
                    <CheckCircle2 className={`w-4 h-4 ${getScoreCategory(score).color}`} />
                    <span className="text-white font-bold">{score}/10</span>
                    <span className="text-xs text-slate-300">SiteSafe Audit</span>
                  </div>
                  <button
                    onClick={copyBadge}
                    className="text-sky-400 hover:text-sky-300 text-xs flex items-center gap-1 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" /> {badgeCopied ? "Copied!" : "Copy embed code"}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">
                  Embed this badge on your website to show you take visitor safety seriously.
                </p>
              </div>

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
          ) : null}
        </div>
      </div>
    </div>
  );
}