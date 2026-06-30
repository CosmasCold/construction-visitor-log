// components/ConfirmModal.tsx
"use client";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
        <p className="text-sm text-slate-300 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
                    <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}