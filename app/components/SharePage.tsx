'use client';

import type { MouseEvent } from 'react';
import { useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { siteUrl } from '../data/seo';
import ShareIcon from './ShareIcon';

export function SiteShare({ pagePaths }: { pagePaths: string[] }) {
  const pathname = usePathname();

  if (!pathname || pathname.startsWith('/videos/') || !pagePaths.includes(pathname)) return null;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-6">
      <SharePage key={pathname} path={pathname} />
    </div>
  );
}

const iconButton = 'inline-flex size-11 shrink-0 items-center justify-center rounded-full border transition hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700';
const neutralButton = `${iconButton} border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100`;

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
        <a
          href={`https://wa.me/?text=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
          className={`${iconButton} border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100`}
          onClick={shareByWhatsApp}
        >
          <ShareIcon name="whatsapp" />
        </a>
        <a
          href={`mailto:?body=${encodedUrl}`}
          aria-label="Correo electrónico"
          title="Correo electrónico"
          className={neutralButton}
          onClick={shareByEmail}
        >
          <ShareIcon name="envelope" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          className={`${iconButton} border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100`}
        >
          <ShareIcon name="linkedin" />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          title="Facebook"
          className={`${iconButton} border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100`}
        >
          <ShareIcon name="facebook" />
        </a>
        <button type="button" aria-label="Copiar enlace" title="Copiar enlace" className={neutralButton} onClick={copyLink}>
          <ShareIcon name="link-45deg" />
        </button>
        {canShare && (
          <button type="button" aria-label="Más opciones" title="Más opciones" className={neutralButton} onClick={shareWithDevice}>
            <ShareIcon name="share" />
          </button>
        )}
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
