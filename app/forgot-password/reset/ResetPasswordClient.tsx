"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";

interface ResetPasswordClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    backToSignIn: "Back to sign in",
    title: "Set new password",
    invalidLink: "Invalid reset link.",
    missingToken: "Missing reset token.",
    passwordMinLength: "Password must be at least 8 characters.",
    passwordsDoNotMatch: "Passwords do not match.",
    successAlert: "Password reset successfully. You can now log in.",
    errorGeneric: "Something went wrong.",
    loading: "Loading…",
    newPasswordPlaceholder: "New password (min. 8 characters)",
    confirmPasswordPlaceholder: "Confirm new password",
    resetting: "Resetting…",
    resetPassword: "Reset Password",
  },
  pt: {
    backToSignIn: "Voltar para entrar",
    title: "Definir nova senha",
    invalidLink: "Link de redefinição inválido.",
    missingToken: "Token de redefinição ausente.",
    passwordMinLength: "A senha deve ter pelo menos 8 caracteres.",
    passwordsDoNotMatch: "As senhas não coincidem.",
    successAlert: "Senha redefinida com sucesso. Agora você pode entrar.",
    errorGeneric: "Algo deu errado.",
    loading: "Carregando…",
    newPasswordPlaceholder: "Nova senha (mín. 8 caracteres)",
    confirmPasswordPlaceholder: "Confirmar nova senha",
    resetting: "Redefinindo…",
    resetPassword: "Redefinir senha",
  },
};

function ResetPasswordForm({ locale }: { locale: "en" | "pt" }) {
  const copy = t[locale];
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      setError(copy.missingToken);
      return;
    }
    if (password.length < 8) {
      setError(copy.passwordMinLength);
      return;
    }
    if (password !== confirmPassword) {
      setError(copy.passwordsDoNotMatch);
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert(copy.successAlert);
      router.push("/admin/login");
    } else {
      setError(data.error || copy.errorGeneric);
    }
    setLoading(false);
  }

  if (!token) return <p className="text-rose-400 text-sm">{copy.invalidLink}</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="password"
          placeholder={copy.newPasswordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
        />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="password"
          placeholder={copy.confirmPasswordPlaceholder}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        {loading ? copy.resetting : copy.resetPassword}
      </button>
    </form>
  );
}

export default function ResetPasswordClient({ locale }: ResetPasswordClientProps) {
  const copy = t[locale];

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
            <Lock className="w-5 h-5 text-sky-400" /> {copy.title}
          </h2>
          <Suspense fallback={<p className="text-slate-400">{copy.loading}</p>}>
            <ResetPasswordForm locale={locale} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}