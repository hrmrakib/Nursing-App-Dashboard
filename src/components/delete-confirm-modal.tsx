"use client";

import { AlertTriangle, X, Loader2 } from "lucide-react";

interface DeleteConfirmModalProps {
  title?: string;
  message?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  title = "Delete Shift",
  message = "Are you sure you want to delete this shift? This action cannot be undone.",
  loading = false,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'
      onClick={onCancel}
    >
      <div
        className='bg-surface rounded-xl border border-border shadow-xl max-w-sm w-full p-6 animate-fade-in'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-start justify-between gap-3'>
          <div className='w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0'>
            <AlertTriangle size={20} className='text-accent-red' />
          </div>
          <button
            onClick={onCancel}
            className='text-text-muted hover:text-text-primary transition-colors'
            aria-label='Close'
          >
            <X size={18} />
          </button>
        </div>

        <h3 className='text-base font-semibold text-text-primary mt-3'>
          {title}
        </h3>
        <p className='text-sm text-text-muted mt-1.5'>{message}</p>

        <div className='flex items-center gap-3 mt-6'>
          <button
            onClick={onCancel}
            disabled={loading}
            className='flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-text-primary
                       hover:bg-surface-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className='flex-1 py-2.5 rounded-xl bg-accent-red text-white text-sm font-semibold hover:opacity-90
                       transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {loading && <Loader2 size={15} className='animate-spin' />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
