"use client";

import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

interface ForgotPasswordClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    backToSignIn: "Back to sign in",
    title: "Reset your password",
    sentMessage:
      "If that email address is registered, you will receive a password reset link shortly.",
    emailPlaceholder: "Email address",
    errorGeneric: "Something went wrong.",
    sending: "Sending…",
    sendResetLink: "Send Reset Link",
  },
  pt: {
    backToSignIn: "Voltar para entrar",
    title: "Redefinir sua senha",
    sentMessage:
      "Se esse endereço de e-mail estiver cadastrado, você receberá um link para redefinir sua senha em breve.",
    emailPlaceholder: "Endereço de e-mail",
    errorGeneric: "Algo deu errado.",
    sending: "Enviando…",
    sendResetLink: "Enviar link de redefinição",
  },
};

export default function ForgotPasswordClient({ locale }: ForgotPasswordClientProps) {
  const copy = t[locale];
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) setSent(true);
    else {
      const data = await res.json();
      setError(data.error || copy.errorGeneric);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale={locale} narrow />

      <main className="flex items-center justify-center px-4 py-12">
        <div className="max-w-sm w-full bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-8">
          <Link
            href="/admin/login"
            className="text-sky-400 hover:text-sky-300 text-sm inline-flex items-center gap-1 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {copy.backToSignIn}
          </Link>
          <h2 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-sky-400" /> {copy.title}
          </h2>
          {sent ? (
            <p className="text-sm text-slate-300">{copy.sentMessage}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder={copy.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
                />
              </div>
              {error && <p className="text-rose-400 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/50 text-white font-medium tracking-wide rounded-xl px-6 py-3 text-sm transition-all duration-200 active:scale-[0.98]"
              >
                {loading ? copy.sending : copy.sendResetLink}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}