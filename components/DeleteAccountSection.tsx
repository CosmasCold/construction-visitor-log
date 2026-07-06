"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface DeleteAccountSectionProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    title: "Delete Account",
    warning: "This will permanently delete your account, all sites, visitor logs, and data. This action cannot be undone.",
    confirmLabel: "Type DELETE to confirm",
    confirmPlaceholder: "DELETE",
    button: "Delete Account",
    deleting: "Deleting...",
    modalTitle: "Are you absolutely sure?",
    modalBody: "All your data will be permanently removed. This includes sites, visitor logs, hosts, and settings.",
    modalCancel: "Cancel",
    modalConfirm: "Yes, delete everything",
    success: "Account deleted. Redirecting...",
    error: "Failed to delete account. Please try again or contact support.",
  },
  pt: {
    title: "Excluir Conta",
    warning: "Isso excluira permanentemente sua conta, todos os locais, registros de visitantes e dados. Esta acao nao pode ser desfeita.",
    confirmLabel: "Digite EXCLUIR para confirmar",
    confirmPlaceholder: "EXCLUIR",
    button: "Excluir Conta",
    deleting: "Excluindo...",
    modalTitle: "Tem certeza absoluta?",
    modalBody: "Todos os seus dados serao permanentemente removidos. Isso inclui locais, registros de visitantes, anfitrioes e configuracoes.",
    modalCancel: "Cancelar",
    modalConfirm: "Sim, excluir tudo",
    success: "Conta excluida. Redirecionando...",
    error: "Falha ao excluir conta. Tente novamente ou entre em contato com o suporte.",
  },
};

export default function DeleteAccountSection({ locale }: DeleteAccountSectionProps) {
  const copy = t[locale];
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const confirmWord = locale === "pt" ? "EXCLUIR" : "DELETE";
  const canDelete = confirmText === confirmWord;

  async function handleDelete() {
    if (!canDelete) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/account/delete", { method: "DELETE" });
      if (res.ok) {
        router.push("/");
      } else {
        const data = await res.json();
        setError(data.error || copy.error);
      }
    } catch {
      setError(copy.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 mt-8">
      <h3 className="text-lg font-semibold text-rose-400 flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5" /> {copy.title}
      </h3>
      <p className="text-sm text-slate-400 mb-4">{copy.warning}</p>

      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-colors"
      >
        <Trash2 className="w-4 h-4" /> {copy.button}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f172a] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">{copy.modalTitle}</h4>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-400 mb-6">{copy.modalBody}</p>

            <div className="mb-6">
              <label className="block text-sm text-slate-300 mb-2">{copy.confirmLabel}</label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={copy.confirmPlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
            </div>

            {error && (
              <p className="text-rose-400 text-sm mb-4">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 transition-colors"
              >
                {copy.modalCancel}
              </button>
              <button
                onClick={handleDelete}
                disabled={!canDelete || loading}
                className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-rose-500 text-white hover:bg-rose-400 disabled:bg-rose-500/30 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? copy.deleting : copy.modalConfirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}