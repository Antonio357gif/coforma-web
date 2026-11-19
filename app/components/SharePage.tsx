'use client';

import type { MouseEvent } from 'react';
import { useState, useSyncExternalStore } from 'react';
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

function getPageTitle() {
  return document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content || document.title;
}

const subscribeToShareSupport = () => () => {};
const hasNativeShare = () => typeof navigator.share === 'function';
const serverHasNativeShare = () => false;

export default function SharePage({ path }: { path: string }) {
  const canShare = useSyncExternalStore(subscribeToShareSupport, hasNativeShare, serverHasNativeShare);
  const [status, setStatus] = useState('');
  const [manualCopy, setManualCopy] = useState(false);
  const url = new URL(path, siteUrl).href;
  const encodedUrl = encodeURIComponent(url);

  function shareByWhatsApp(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.href = `https://wa.me/?text=${encodeURIComponent(`${getPageTitle()}\n${url}`)}`;
  }

  function shareByEmail(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.href = `mailto:?subject=${encodeURIComponent(getPageTitle())}&body=${encodedUrl}`;
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
      await navigator.share({ title: getPageTitle(), url });
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        setStatus('Prueba una de las opciones para compartir o copia el enlace.');
      }
    }
  }

  return (
    <div role="group" aria-label="Compartir este enlace">
      <div className="flex flex-wrap gap-2">
        <a href={`https://wa.me/?text=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={optionClass} onClick={shareByWhatsApp}>
          WhatsApp
        </a>
        <a href={`mailto:?body=${encodedUrl}`} className={optionClass} onClick={shareByEmail}>
          Correo electrónico
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={optionClass}>
          LinkedIn
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={optionClass}>
          Facebook
        </a>
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
  );
}
