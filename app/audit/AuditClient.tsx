// app/audit/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { logEvent } from "@/lib/analytics";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Copy,
  Award,
  ShieldCheck,
  Mail,
  Zap,
  AlertTriangle,
  TrendingUp,
  Lock,
  Clock,
  FileText,
  Eye,
  Users,
  Camera,
} from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Do you have a digital visitor log (not just paper)?",
    hint: "Paper sheets can be lost, damaged, or altered. Digital logs are searchable and exportable.",
    icon: FileText,
  },
  {
    id: 2,
    question: "Can you prove every visitor acknowledged your safety rules?",
    hint: "Inspectors want to see that visitors were informed — not just that they signed their name.",
    icon: ShieldCheck,
  },
  {
    id: 3,
    question: "Is your visitor check-in process completely contactless?",
    hint: "QR codes or self-service kiosks reduce shared surfaces and speed up entry.",
    icon: Zap,
  },
  {
    id: 4,
    question: "Does every entry have an accurate, automatic timestamp?",
    hint: "Hand-written times are easy to forge. Digital timestamps can't be changed after the fact.",
    icon: Clock,
  },
  {
    id: 5,
    question: "Can you filter and export your visitor records by date, site, or host?",
    hint: "During an audit you'll need to produce a filtered report in minutes, not hours.",
    icon: Eye,
  },
  {
    id: 6,
    question: "Are host notifications sent automatically when a visitor arrives?",
    hint: "The person being visited should know immediately — without you having to call or text.",
    icon: Mail,
  },
  {
    id: 7,
    question: "Can you pre-register expected visitors so they can sign in with one tap?",
    hint: "Pre-registration saves time at the front desk and reduces typing errors.",
    icon: Users,
  },
  {
    id: 8,
    question: "Do you capture a photo of each visitor at check-in?",
    hint: "A photo adds a layer of security and helps with badge printing and identification.",
    icon: Camera,
  },
  {
    id: 9,
    question: "Is your check-in system available on any device without installing an app?",
    hint: "Visitors should be able to sign in on their own phone or a shared tablet — no app store required.",
    icon: Zap,
  },
  {
    id: 10,
    question: "Do you have a clear retention policy for visitor data?",
    hint: "You need to know how long records are kept and be able to delete them if required.",
    icon: Lock,
  },
];

export default function AuditPage() {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [scoreRevealed, setScoreRevealed] = useState(false);
  const [badgeCopied, setBadgeCopied] = useState(false);

  const score = submitted && scoreRevealed
    ? Object.values(answers).filter((v) => v === true).length
    : 0;

  function getScoreCategory(score: number) {
    if (score <= 3) return {
      label: "High risk",
      color: "text-rose-400",
      bgColor: "bg-rose-500/5",
      borderColor: "border-rose-500/20",
      icon: ShieldAlert,
      message: "Your current visitor log would likely fail a safety audit. You're missing the majority of the essentials.",
    };
    if (score <= 6) return {
      label: "Moderate risk",
      color: "text-amber-400",
      bgColor: "bg-amber-500/5",
      borderColor: "border-amber-500/20",
      icon: AlertTriangle,
      message: "You're doing some things right, but there are important gaps an inspector would notice.",
    };
    if (score <= 9) return {
      label: "Almost there",
      color: "text-sky-400",
      bgColor: "bg-sky-500/5",
      borderColor: "border-sky-500/20",
      icon: TrendingUp,
      message: "You've covered most of the basics. A few improvements would make your log audit-proof.",
    };
    return {
      label: "Fully covered",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/5",
      borderColor: "border-emerald-500/20",
      icon: CheckCircle2,
      message: "You're doing everything right — a digital system with mandatory safety acknowledgment, automated records, and exports. Keep it up!",
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
    setSubmitted(true);
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setEmailStatus("loading");
    const trueCount = Object.values(answers).filter((v) => v === true).length;
    try {
      const res = await fetch("/api/send-audit-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, score: trueCount, answers }),
      });
      const data = await res.json();
      if (data.success) {
        logEvent("self_audit_report_requested");
        setEmailStatus("sent");
        setTimeout(() => setScoreRevealed(true), 500);
      } else {
        setEmailStatus("error");
      }
    } catch {
      setEmailStatus("error");
    }
  }

  function skipEmail() {
    setScoreRevealed(true);
    logEvent("self_audit_completed", {
      score: Object.values(answers).filter((v) => v === true).length,
    });
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
    logEvent("audit_badge_copied", { score });
  }

  const ScoreIcon = scoreRevealed ? getScoreCategory(score).icon : CheckCircle2;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* ─── Header ─── */}
      <header className="border-b border-white/5 bg-[#0a0f1c]/90 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-white">SiteSafe</span>
          </Link>
          <Link href="/" className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1">
            Back to site <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        {/* ─── Hero ─── */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-4">
            <ShieldAlert className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Free Visitor Log Self-Audit
          </h1>
          <p className="text-base text-slate-400 max-w-md mx-auto leading-relaxed">
            Take this 10-question audit to see if your current sign-in process would survive a safety inspection. 
            Takes 60 seconds. No sign-up required.
          </p>
        </div>

        {/* ─── Progress Bar ─── */}
        {!submitted && (
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Progress</span>
              <span>{answeredCount} of {questions.length}</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-sky-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* ─── Questions ─── */}
        <div className="space-y-4">
          {questions.map((q) => {
            const answer = answers[q.id];
            const disabled = submitted || showEmailCapture;
            const category = scoreRevealed ? getScoreCategory(score) : null;
            return (
              <div
                key={q.id}
                className={`rounded-2xl border p-5 transition-all ${
                  scoreRevealed
                    ? answer === true
                      ? "border-emerald-500/20 bg-emerald-500/5"
                      : "border-rose-500/20 bg-rose-500/5"
                    : "border-white/5 bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <q.icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {q.id}. {q.question}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{q.hint}</p>
                  </div>
                </div>
                <div className="flex gap-2 ml-11">
                  <button
                    onClick={() => handleAnswer(q.id, true)}
                    disabled={disabled}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                      answer === true
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                        : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(q.id, false)}
                    disabled={disabled}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                      answer === false
                        ? "bg-rose-500/20 text-rose-300 border border-rose-400/30"
                        : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" /> No
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Email Capture ─── */}
        {showEmailCapture && !scoreRevealed && (
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Want the full report?
            </h3>
            <p className="text-sm text-slate-400 mb-6 max-w-sm mx-auto">
              Enter your email and we&apos;ll send you a detailed breakdown of your score, 
              plus the exact steps to fix each gap. No spam, no sales call.
            </p>
            {emailStatus !== "sent" ? (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={emailStatus === "loading"}
                  className="bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/30 text-white font-semibold rounded-xl px-6 py-3 text-sm transition-all active:scale-[0.98]"
                >
                  {emailStatus === "loading" ? "Sending…" : "Send report"}
                </button>
              </form>
            ) : (
              <p className="text-emerald-400 text-sm font-medium mb-4">Report sent! Check your inbox.</p>
            )}
            {emailStatus === "error" && (
              <p className="text-rose-400 text-xs mb-4">Something went wrong. Please try again.</p>
            )}
            <button
              onClick={skipEmail}
              className="text-slate-500 hover:text-white text-sm transition-colors"
            >
              No thanks, just show my score →
            </button>
          </div>
        )}

        {/* ─── Submit Button ─── */}
        {!submitted && !showEmailCapture && (
          <button
            onClick={handleSeeMyScore}
            disabled={Object.keys(answers).length < questions.length}
            className="w-full bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/20 disabled:text-sky-200/30 text-white font-semibold rounded-xl px-6 py-4 text-base transition-all active:scale-[0.98] shadow-lg shadow-sky-500/20"
          >
            {Object.keys(answers).length < questions.length
              ? `Answer ${questions.length - Object.keys(answers).length} more question${questions.length - Object.keys(answers).length > 1 ? 's' : ''}`
              : "See my score →"}
          </button>
        )}

        {/* ─── Score Display ─── */}
        {scoreRevealed && (
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
            
            <div className="relative">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl ${getScoreCategory(score).bgColor} border ${getScoreCategory(score).borderColor} mb-6`}>
                <ScoreIcon className={`w-10 h-10 ${getScoreCategory(score).color}`} />
              </div>
              
              <div className="text-5xl sm:text-6xl font-extrabold text-white mb-2">
                {score}<span className="text-2xl text-slate-500">/10</span>
              </div>
              <p className={`text-lg font-semibold ${getScoreCategory(score).color} mb-2`}>
                {getScoreCategory(score).label}
              </p>
              <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed mb-8">
                {getScoreCategory(score).message}
              </p>

              {/* Badge */}
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5 inline-block mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-800 rounded-lg px-4 py-2 inline-flex items-center gap-2 border border-white/10">
                    <ScoreIcon className={`w-5 h-5 ${getScoreCategory(score).color}`} />
                    <span className="text-white font-bold text-lg">{score}/10</span>
                    <span className="text-xs text-slate-400">SiteSafe Audit</span>
                  </div>
                  <button
                    onClick={copyBadge}
                    className="text-sky-400 hover:text-sky-300 text-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {badgeCopied ? "Copied!" : "Copy embed"}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Embed this badge on your website to show you take visitor safety seriously.
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
                  onClick={() => logEvent("audit_cta_click")}
                >
                  Fix this with SiteSafe <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
                >
                  Retake audit
                </button>
              </div>
              
              <p className="text-xs text-slate-500">
                SiteSafe fixes all 10 of these automatically — flat $49/mo, no credit card, no sales call.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#070b14]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            © 2026 SiteSafe by TheSift. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}