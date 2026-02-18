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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={[
          'w-full',
          'max-w-[94vw]',          // en móvil no se sale
          'sm:max-w-none',         // en pantallas mayores respeta maxWidthClass
          maxWidthClass,
          'max-h-[92vh]',          // en móvil no se corta por abajo
          'overflow-hidden',
          'rounded-[26px]',
          'bg-white',
          'shadow-[0_28px_90px_rgba(15,23,42,0.25)]',
        ].join(' ')}
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <div className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
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

        {/* Aquí es donde permitimos scroll del contenido en móvil */}
        <div className="max-h-[calc(92vh-56px)] overflow-y-auto px-4 pb-4 sm:max-h-none sm:overflow-visible sm:px-6 sm:pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}
