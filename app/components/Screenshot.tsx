'use client';

import Image from 'next/image';
import { useState } from 'react';
import Modal from './Modal';

export default function Screenshot({ src, title }: { src: string; title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <figure className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <button type="button" className="block w-full text-right text-sm font-bold text-emerald-800 hover:underline" onClick={() => setOpen(true)}>
        <span className="relative mb-3 block aspect-video">
          <Image src={src} alt={title + ' en Coforma CRM'} fill sizes="(min-width: 1024px) 55vw, 90vw" className="rounded-lg object-contain" />
        </span>
        Ampliar captura
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title={title} maxWidthClass="max-w-6xl">
        <div className="relative aspect-video">
          <Image src={src} alt={title + ' en Coforma CRM'} fill sizes="90vw" className="object-contain" />
        </div>
      </Modal>
    </figure>
  );
}
