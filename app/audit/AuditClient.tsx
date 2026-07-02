"use client";

import { useState } from "react";
import Link from "next/link";
import { logEvent } from "@/lib/analytics";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Copy,
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

interface AuditClientProps {
  locale: "en" | "pt";
}

const questionIcons = [
  FileText, ShieldCheck, Zap, Clock, Eye, Mail, Users, Camera, Zap, Lock,
];

const t = {
  en: {
    title: "Free Visitor Log Self-Audit",
    subtitle:
      "Take this 10-question audit to see if your current sign-in process would survive a safety inspection. Takes 60 seconds. No sign-up required.",
    progress: "Progress",
    yes: "Yes",
    no: "No",
    reportTitle: "Want the full report?",
    reportDesc:
      "Enter your email and we'll send you a detailed breakdown of your score, plus the exact steps to fix each gap. No spam, no sales call.",
    emailPlaceholder: "your@email.com",
    sendReport: "Send report",
    sending: "Sending…",
    reportSent: "Report sent! Check your inbox.",
    reportError: "Something went wrong. Please try again.",
    skipEmail: "No thanks, just show my score →",
    seeScore: "See my score →",
    answerRemaining: (n: number) =>
      `Answer ${n} more question${n > 1 ? "s" : ""}`,
    scoreHighRisk: "High risk",
    scoreHighRiskMsg:
      "Your current visitor log would likely fail a safety audit. You're missing the majority of the essentials.",
    scoreModerateRisk: "Moderate risk",
    scoreModerateRiskMsg:
      "You're doing some things right, but there are important gaps an inspector would notice.",
    scoreAlmostThere: "Almost there",
    scoreAlmostThereMsg:
      "You've covered most of the basics. A few improvements would make your log audit-proof.",
    scoreFullyCovered: "Fully covered",
    scoreFullyCoveredMsg:
      "You're doing everything right — a digital system with mandatory safety acknowledgment, automated records, and exports. Keep it up!",
    copyEmbed: "Copy embed",
    copied: "Copied!",
    badgeDesc:
      "Embed this badge on your website to show you take visitor safety seriously.",
    fixWithSiteSafe: "Fix this with SiteSafe",
    retakeAudit: "Retake audit",
    footerNote:
      "SiteSafe fixes all 10 of these automatically — flat $49/mo, no credit card, no sales call.",
    questions: [
      {
        q: "Do you have a digital visitor log (not just paper)?",
        hint: "Paper sheets can be lost, damaged, or altered. Digital logs are searchable and exportable.",
      },
      {
        q: "Can you prove every visitor acknowledged your safety rules?",
        hint: "Inspectors want to see that visitors were informed — not just that they signed their name.",
      },
      {
        q: "Is your visitor check-in process completely contactless?",
        hint: "QR codes or self-service kiosks reduce shared surfaces and speed up entry.",
      },
      {
        q: "Does every entry have an accurate, automatic timestamp?",
        hint: "Hand-written times are easy to forge. Digital timestamps can't be changed after the fact.",
      },
      {
        q: "Can you filter and export your visitor records by date, site, or host?",
        hint: "During an audit you'll need to produce a filtered report in minutes, not hours.",
      },
      {
        q: "Are host notifications sent automatically when a visitor arrives?",
        hint: "The person being visited should know immediately — without you having to call or text.",
      },
      {
        q: "Can you pre-register expected visitors so they can sign in with one tap?",
        hint: "Pre-registration saves time at the front desk and reduces typing errors.",
      },
      {
        q: "Do you capture a photo of each visitor at check-in?",
        hint: "A photo adds a layer of security and helps with badge printing and identification.",
      },
      {
        q: "Is your check-in system available on any device without installing an app?",
        hint: "Visitors should be able to sign in on their own phone or a shared tablet — no app store required.",
      },
      {
        q: "Do you have a clear retention policy for visitor data?",
        hint: "You need to know how long records are kept and be able to delete them if required.",
      },
    ],
  },
  pt: {
    title: "Auto-Auditoria Gratuita de Registro de Visitantes",
    subtitle:
      "Responda estas 10 perguntas para ver se seu processo de registro atual sobreviveria a uma inspeção de segurança. Leva 60 segundos. Não precisa de cadastro.",
    progress: "Progresso",
    yes: "Sim",
    no: "Não",
    reportTitle: "Quer o relatório completo?",
    reportDesc:
      "Digite seu e-mail e enviaremos uma análise detalhada da sua pontuação, mais os passos exatos para corrigir cada lacuna. Sem spam, sem ligação de vendas.",
    emailPlaceholder: "seu@email.com",
    sendReport: "Enviar relatório",
    sending: "Enviando…",
    reportSent: "Relatório enviado! Verifique sua caixa de entrada.",
    reportError: "Algo deu errado. Tente novamente.",
    skipEmail: "Não, obrigado, só mostrar minha pontuação →",
    seeScore: "Ver minha pontuação →",
    answerRemaining: (n: number) =>
      `Responda mais ${n} pergunta${n > 1 ? "s" : ""}`,
    scoreHighRisk: "Alto risco",
    scoreHighRiskMsg:
      "Seu registro de visitantes atual provavelmente falharia em uma auditoria de segurança. Você está sem a maioria dos itens essenciais.",
    scoreModerateRisk: "Risco moderado",
    scoreModerateRiskMsg:
      "Você está fazendo algumas coisas certas, mas há lacunas importantes que um inspetor notaria.",
    scoreAlmostThere: "Quase lá",
    scoreAlmostThereMsg:
      "Você cobriu a maioria dos fundamentos. Algumas melhorias tornariam seu registro à prova de auditoria.",
    scoreFullyCovered: "Totalmente coberto",
    scoreFullyCoveredMsg:
      "Você está fazendo tudo certo — um sistema digital com reconhecimento obrigatório de segurança, registros automatizados e exportações. Continue assim!",
    copyEmbed: "Copiar embed",
    copied: "Copiado!",
    badgeDesc:
      "Incorpore este selo no seu site para mostrar que leva a segurança de visitantes a sério.",
    fixWithSiteSafe: "Corrigir isso com a SiteSafe",
    retakeAudit: "Refazer auditoria",
    footerNote:
      "A SiteSafe corrige todos esses 10 itens automaticamente — R$249/mês, sem cartão de crédito, sem ligação de vendas.",
    questions: [
      {
        q: "Você tem um registro digital de visitantes (não apenas papel)?",
        hint: "Papel pode ser perdido, danificado ou alterado. Registros digitais são pesquisáveis e exportáveis.",
      },
      {
        q: "Você pode provar que cada visitante reconheceu suas regras de segurança?",
        hint: "Inspetores querem ver que os visitantes foram informados — não apenas que assinaram o nome.",
      },
      {
        q: "O processo de check-in é completamente sem contato?",
        hint: "QR codes ou quiosques de autoatendimento reduzem superfícies compartilhadas e aceleram a entrada.",
      },
      {
        q: "Cada entrada tem um timestamp automático e preciso?",
        hint: "Horários escritos à mão são fáceis de falsificar. Timestamps digitais não podem ser alterados.",
      },
      {
        q: "Você pode filtrar e exportar seus registros por data, local ou anfitrião?",
        hint: "Durante uma auditoria você precisará produzir um relatório filtrado em minutos, não horas.",
      },
      {
        q: "As notificações aos anfitriões são enviadas automaticamente quando um visitante chega?",
        hint: "A pessoa sendo visitada deve saber imediatamente — sem você precisar ligar ou mandar mensagem.",
      },
      {
        q: "Você pode pré-cadastrar visitantes esperados para que eles façam check-in com um toque?",
        hint: "Pré-cadastro economiza tempo na recepção e reduz erros de digitação.",
      },
      {
        q: "Você captura uma foto de cada visitante no check-in?",
        hint: "Uma foto adiciona uma camada de segurança e ajuda na impressão de crachás e identificação.",
      },
      {
        q: "Seu sistema de check-in está disponível em qualquer dispositivo sem instalar um app?",
        hint: "Visitantes devem poder fazer check-in no próprio celular ou em um tablet compartilhado — sem precisar da loja de apps.",
      },
      {
        q: "Você tem uma política clara de retenção de dados de visitantes?",
        hint: "Você precisa saber por quanto tempo os registros são mantidos e poder excluí-los se necessário.",
      },
    ],
  },
};

export default function AuditClient({ locale }: AuditClientProps) {
  const copy = t[locale];
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
    if (score <= 3)
      return {
        label: copy.scoreHighRisk,
        color: "text-rose-400",
        bgColor: "bg-rose-500/5",
        borderColor: "border-rose-500/20",
        icon: ShieldAlert,
        message: copy.scoreHighRiskMsg,
      };
    if (score <= 6)
      return {
        label: copy.scoreModerateRisk,
        color: "text-amber-400",
        bgColor: "bg-amber-500/5",
        borderColor: "border-amber-500/20",
        icon: AlertTriangle,
        message: copy.scoreModerateRiskMsg,
      };
    if (score <= 9)
      return {
        label: copy.scoreAlmostThere,
        color: "text-sky-400",
        bgColor: "bg-sky-500/5",
        borderColor: "border-sky-500/20",
        icon: TrendingUp,
        message: copy.scoreAlmostThereMsg,
      };
    return {
      label: copy.scoreFullyCovered,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/5",
      borderColor: "border-emerald-500/20",
      icon: CheckCircle2,
      message: copy.scoreFullyCoveredMsg,
    };
  }

  function handleAnswer(qId: number, value: boolean) {
    if (!submitted && !showEmailCapture) {
      setAnswers((prev) => ({ ...prev, [qId]: value }));
    }
  }

  function handleSeeMyScore() {
    if (Object.keys(answers).length < copy.questions.length) return;
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
  const progress = (answeredCount / copy.questions.length) * 100;
  const remaining = copy.questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale={locale} narrow />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        {/* ─── Hero ─── */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-4">
            <ShieldAlert className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            {copy.title}
          </h1>
          <p className="text-base text-slate-400 max-w-md mx-auto leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        {/* ─── Progress Bar ─── */}
        {!submitted && (
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>{copy.progress}</span>
              <span>{answeredCount} of {copy.questions.length}</span>
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
          {copy.questions.map((q, idx) => {
            const answer = answers[idx + 1];
            const disabled = submitted || showEmailCapture;
            const Icon = questionIcons[idx];
            return (
              <div
                key={idx + 1}
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
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {idx + 1}. {q.q}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{q.hint}</p>
                  </div>
                </div>
                <div className="flex gap-2 ml-11">
                  <button
                    onClick={() => handleAnswer(idx + 1, true)}
                    disabled={disabled}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                      answer === true
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                        : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> {copy.yes}
                  </button>
                  <button
                    onClick={() => handleAnswer(idx + 1, false)}
                    disabled={disabled}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                      answer === false
                        ? "bg-rose-500/20 text-rose-300 border border-rose-400/30"
                        : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" /> {copy.no}
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
              {copy.reportTitle}
            </h3>
            <p className="text-sm text-slate-400 mb-6 max-w-sm mx-auto">
              {copy.reportDesc}
            </p>
            {emailStatus !== "sent" ? (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
                <input
                  type="email"
                  placeholder={copy.emailPlaceholder}
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
                  {emailStatus === "loading" ? copy.sending : copy.sendReport}
                </button>
              </form>
            ) : (
              <p className="text-emerald-400 text-sm font-medium mb-4">{copy.reportSent}</p>
            )}
            {emailStatus === "error" && (
              <p className="text-rose-400 text-xs mb-4">{copy.reportError}</p>
            )}
            <button
              onClick={skipEmail}
              className="text-slate-500 hover:text-white text-sm transition-colors"
            >
              {copy.skipEmail}
            </button>
          </div>
        )}

        {/* ─── Submit Button ─── */}
        {!submitted && !showEmailCapture && (
          <button
            onClick={handleSeeMyScore}
            disabled={Object.keys(answers).length < copy.questions.length}
            className="w-full bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/20 disabled:text-sky-200/30 text-white font-semibold rounded-xl px-6 py-4 text-base transition-all active:scale-[0.98] shadow-lg shadow-sky-500/20"
          >
            {remaining > 0 ? copy.answerRemaining(remaining) : copy.seeScore}
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
                    {badgeCopied ? copy.copied : copy.copyEmbed}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  {copy.badgeDesc}
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
                  onClick={() => logEvent("audit_cta_click")}
                >
                  {copy.fixWithSiteSafe} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
                >
                  {copy.retakeAudit}
                </button>
              </div>
              
              <p className="text-xs text-slate-500">
                {copy.footerNote}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* ─── Footer ─── */}
      <PublicFooter locale={locale} />
    </div>
  );
}