"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import {
  ArrowRight,
  Rocket,
  CreditCard,
  PhoneOff,
  MessageCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Star,
  Zap,
  Lock,
  Users,
  BadgeCheck,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { logEvent } from "@/lib/analytics";

interface SignupClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    metaStars: "4.9/5 — 200+ teams trust SiteSafe",
    headline: "Start your 14-day free trial",
    subheadline: "No credit card required · Cancel anytime · Setup in 2 minutes",
    googleBtn: "Continue with Google",
    divider: "or use email",
    emailPlaceholder: "Work email address",
    passwordPlaceholder: "Create a password",
    passwordStrength: ["Weak", "Weak", "Okay", "Good", "Strong"],
    ctaLoading: "Creating your account…",
    ctaIdle: "Start My Free Trial",
    trustSSL: "SSL encrypted",
    trustNoCard: "No card required",
    trustNoCalls: "No sales calls",
    alreadyHaveAccount: "Already have an account?",
    signIn: "Sign in",
    badge: "200+ teams signed up this month",
    sidebarHeadline: "What you get instantly:",
    features: [
      { icon: Users, text: "Up to 20 sites under one account" },
      { icon: CheckCircle2, text: "Unlimited visitors — no per-check-in fees" },
      { icon: ShieldCheck, text: "Mandatory safety briefings (OSHA-ready)" },
      { icon: Lock, text: "Watchlist screening + lockdown mode" },
      { icon: FileText, text: "Audit exports: CSV, Excel, PDF" },
      { icon: Zap, text: "REST API + Slack/Zapier webhooks" },
    ],
    testimonialQuote:
      "We have 8 locations and used to rely on paper logs at each site. SiteSafe gives me a single dashboard across all of them. Setup took 3 minutes.",
    testimonialName: "Marcus Chen",
    testimonialRole: "Director of Facilities, Coastal Build Group",
    complianceSOC: "SOC 2 Type II",
    complianceGDPR: "GDPR/LGPD Ready",
    questions: "Questions?",
  },
  pt: {
    metaStars: "4,9/5 — Mais de 200 empresas confiam na SiteSafe",
    headline: "Comece seu teste grátis de 14 dias",
    subheadline: "Sem cartão de crédito · Cancele quando quiser · Configuração em 2 minutos",
    googleBtn: "Continuar com Google",
    divider: "ou use seu e-mail",
    emailPlaceholder: "E-mail corporativo",
    passwordPlaceholder: "Crie uma senha",
    passwordStrength: ["Fraca", "Fraca", "Razoável", "Boa", "Forte"],
    ctaLoading: "Criando sua conta…",
    ctaIdle: "Começar Meu Teste Grátis",
    trustSSL: "Criptografia SSL",
    trustNoCard: "Sem cartão exigido",
    trustNoCalls: "Sem ligações de vendas",
    alreadyHaveAccount: "Já tem uma conta?",
    signIn: "Entrar",
    badge: "Mais de 200 empresas se cadastraram este mês",
    sidebarHeadline: "O que você recebe instantaneamente:",
    features: [
      { icon: Users, text: "Até 20 locais em uma única conta" },
      { icon: CheckCircle2, text: "Visitantes ilimitados — sem taxa por check-in" },
      { icon: ShieldCheck, text: "Briefings de segurança obrigatórios" },
      { icon: Lock, text: "Lista de bloqueio + modo de lockdown" },
      { icon: FileText, text: "Exportação de auditoria: CSV, Excel, PDF" },
      { icon: Zap, text: "API REST + webhooks Slack/Zapier" },
    ],
    testimonialQuote:
      "Temos 8 unidades e antes dependíamos de registros em papel em cada local. A SiteSafe me dá um único painel para todos. A configuração levou 3 minutos.",
    testimonialName: "Marcus Chen",
    testimonialRole: "Diretor de Facilities, Coastal Build Group",
    complianceSOC: "SOC 2 Tipo II",
    complianceGDPR: "LGPD/GDPR Ready",
    questions: "Dúvidas?",
  },
};

export default function SignupClient({ locale }: SignupClientProps) {
  const router = useRouter();
  const copy = t[locale];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.match(/[a-z]/)) score++;
    if (pwd.match(/[A-Z]/)) score++;
    if (pwd.match(/[0-9]/)) score++;
    if (pwd.match(/[^a-zA-Z0-9]/)) score++;
    return Math.min(score, 4);
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthColors = [
    "bg-red-400",
    "bg-red-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-400",
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const region = locale === "pt" ? "br" : "en";

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, region }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || (locale === "pt" ? "Falha no cadastro. Tente novamente." : "Signup failed. Please try again."));
      setLoading(false);
      return;
    }

    logEvent("signup_completed");

    const signInResult = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (signInResult?.error) {
      setError(locale === "pt" ? "Conta criada, mas falha ao entrar. Entre manualmente." : "Account created but sign in failed. Please sign in manually.");
      setLoading(false);
      return;
    }

    router.push(locale === "pt" ? "/dashboard?region=br" : "/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      <PublicHeader locale={locale} narrow />

      <main className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          
          {/* ===== LEFT: Form ===== */}
          <div className="w-full md:w-1/2 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-400">{copy.metaStars}</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-center mb-2">
              {copy.headline}
            </h1>
            <p className="text-sm text-slate-400 text-center mb-6">
              {copy.subheadline}
            </p>

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: locale === "pt" ? "/dashboard?region=br" : "/dashboard" })}
              className="w-full flex items-center justify-center gap-2 bg-white text-slate-800 font-medium rounded-xl px-6 py-3 text-sm hover:bg-slate-100 transition-all mb-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {copy.googleBtn}
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-slate-500">{copy.divider}</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder={copy.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={copy.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {password.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${strengthColors[passwordStrength]}`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {copy.passwordStrength[passwordStrength]}
                  </span>
                </div>
              )}

              {error && (
                <p className="text-rose-400 text-sm text-center bg-rose-500/10 rounded-lg py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/30 text-white font-semibold rounded-xl px-6 py-3.5 text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-[0.98]"
              >
                {loading ? copy.ctaLoading : copy.ctaIdle}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" /> {copy.trustSSL}
              </span>
              <span className="flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-emerald-400" /> {copy.trustNoCard}
              </span>
              <span className="flex items-center gap-1">
                <PhoneOff className="w-3 h-3 text-emerald-400" /> {copy.trustNoCalls}
              </span>
            </div>

            <p className="text-xs text-slate-600 text-center mt-4">
              {copy.alreadyHaveAccount}{" "}
              <Link href="/admin/login" className="text-sky-400 hover:text-sky-300 transition-colors">
                {copy.signIn}
              </Link>
            </p>
          </div>

          {/* ===== RIGHT: Social Proof Sidebar ===== */}
          <div className="hidden md:flex md:w-1/2 rounded-2xl border border-white/10 bg-white/[0.03] p-8 flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
                <Zap className="w-3.5 h-3.5" />
                {copy.badge}
              </div>

              <h2 className="text-xl font-bold mb-2">{copy.sidebarHeadline}</h2>

              <ul className="space-y-3 mt-4">
                {copy.features.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <item.icon className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    {item.text}
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-5 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  {copy.testimonialQuote}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center text-xs font-bold text-sky-400">
                    MC
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{copy.testimonialName}</p>
                    <p className="text-[11px] text-slate-500">{copy.testimonialRole}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" /> {copy.complianceSOC}
                </span>
                <span className="flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" /> {copy.complianceGDPR}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-3 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
                {copy.questions}{" "}
                <a href="mailto:hello@thesift.space" className="text-sky-400 hover:text-sky-300 transition-colors">
                  hello@thesift.space
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}