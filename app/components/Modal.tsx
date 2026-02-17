'use client';

import React, { useEffect } from 'react';

export default function Modal({
  open,
  title,
  onClose,
  children,
  maxWidthClass = 'max-w-5xl',
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClass?: string;
}) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        // cerrar al clickar en el fondo (no en el contenido)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full ${maxWidthClass} overflow-hidden rounded-[26px] bg-white shadow-[0_28px_90px_rgba(15,23,42,0.25)]`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-xl font-extrabold tracking-tight text-slate-900">
            {title}
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          >
            ✕
          </button>
        </div>

        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
}
