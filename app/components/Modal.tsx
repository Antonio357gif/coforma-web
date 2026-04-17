'use client';

import React, { useEffect } from 'react';

export default function Modal({
  open,
  title,
  onClose,
  children,
  maxWidthClass = 'max-w-3xl', // Mantener el ancho máximo controlado
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

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-slate-900/45 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex min-h-full items-center justify-center pt-6 sm:pt-8">
        <div
          className={[
            'w-[calc(100vw-24px)]',
            'sm:w-full',
            maxWidthClass,
            'max-h-[calc(100vh-48px)]', // Limitar la altura para que no haya desplazamiento
            'overflow-auto', // Si el contenido es grande, permitimos el scroll solo dentro del modal
            'rounded-[18px]',
            'bg-white',
            'shadow-[0_24px_80px_rgba(15,23,42,0.24)]',
          ].join(' ')}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-5">
            <div className="text-[16px] font-extrabold tracking-tight text-slate-900 sm:text-[17px]">
              {title}
            </div>

            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            >
              ✕
            </button>
          </div>

          <div className="overflow-y-auto px-3 py-3 sm:px-4 sm:py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}