'use client';

import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { siteUrl } from '../data/seo';

export function SiteShare({ pagePaths }: { pagePaths: string[] }) {
  const pathname = usePathname();

  if (!pathname || pathname.startsWith('/videos/') || !pagePaths.includes(pathname)) return null;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-6">
      <SharePage key={pathname} path={pathname} />
    </div>
  );
}

const optionClass = 'inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 hover:border-emerald-400 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700';

export default function SharePage({ path }: { path: string }) {
  const [title, setTitle] = useState('Coforma');
  const [canShare, setCanShare] = useState(false);
  const [status, setStatus] = useState('');
  const [manualCopy, setManualCopy] = useState(false);
  const url = new URL(path, siteUrl).href;
  const encodedUrl = encodeURIComponent(url);
  const message = encodeURIComponent(`${title}\n${url}`);
  const destinations = [
    { name: 'WhatsApp', href: `https://wa.me/?text=${message}` },
    { name: 'Correo electrónico', href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodedUrl}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
  ];

  function onToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    if (!event.currentTarget.open) return;
    setTitle(document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content || document.title);
    setCanShare(typeof navigator.share === 'function');
    setStatus('');
    setManualCopy(false);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setManualCopy(false);
      setStatus('Enlace copiado.');
    } catch {
      setManualCopy(true);
      setStatus('Selecciona el enlace para copiarlo.');
    }
  }

  async function shareWithDevice() {
    try {
      await navigator.share({ title, url });
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        setStatus('Prueba una de las opciones para compartir o copia el enlace.');
      }
    }
  }

  return (
    <details className="group" onToggle={onToggle}>
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-bold text-emerald-900 hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 [&::-webkit-details-marker]:hidden">
        Compartir página
        <span aria-hidden="true" className="transition group-open:rotate-180">▾</span>
      </summary>
      <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-3">
        <div className="flex flex-wrap gap-2">
          {destinations.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith('https:') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={optionClass}
            >
              {name}
            </a>
          ))}
          <button type="button" className={optionClass} onClick={copyLink}>Copiar enlace</button>
          {canShare && <button type="button" className={optionClass} onClick={shareWithDevice}>Más opciones</button>}
        </div>
        {manualCopy && (
          <input
            aria-label="Enlace de esta página"
            className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800"
            readOnly
            value={url}
            onFocus={(event) => event.currentTarget.select()}
          />
        )}
        <p role="status" className="text-sm text-slate-700 [&:not(:empty)]:mt-2">{status}</p>
      </div>
    </details>
  );
}
