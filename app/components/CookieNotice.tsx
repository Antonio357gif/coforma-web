'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState, useSyncExternalStore } from 'react';
import { Analytics } from '@vercel/analytics/next';
import Modal from './Modal';
import GoogleAnalytics, { disableGoogleAnalytics } from './GoogleAnalytics';

type CookieChoice = 'accepted' | 'rejected' | 'configured';

const consentEvent = 'coforma:cookie-consent';
const preferencesEvent = 'coforma:cookie-preferences';
const analyticsVersion = '2';

function subscribe(listener: () => void) {
  window.addEventListener(consentEvent, listener);
  window.addEventListener('storage', listener);
  return () => {
    window.removeEventListener(consentEvent, listener);
    window.removeEventListener('storage', listener);
  };
}

function readConsent() {
  if (!window.localStorage.getItem('coforma_cookie_choice')) return 'pending';
  if (window.localStorage.getItem('coforma_cookie_analytics') !== 'true') return 'essential';
  return window.localStorage.getItem('coforma_cookie_analytics_version') === analyticsVersion
    ? 'analytics'
    : 'legacy-analytics';
}

export function CookiePreferencesButton() {
  return (
    <button type="button" className="mt-2 font-bold text-emerald-700 hover:underline"
      onClick={() => window.dispatchEvent(new Event(preferencesEvent))}>
      Cambiar preferencias de cookies
    </button>
  );
}

export default function CookieNotice() {
  const consent = useSyncExternalStore(subscribe, readConsent, () => 'loading');
  const [openCookieConfig, setOpenCookieConfig] = useState(false);
  const [analyticsCookies, setAnalyticsCookies] = useState(false);

  useEffect(() => {
    const openPreferences = () => {
      setAnalyticsCookies(readConsent() === 'analytics');
      setOpenCookieConfig(true);
    };
    window.addEventListener(preferencesEvent, openPreferences);
    return () => window.removeEventListener(preferencesEvent, openPreferences);
  }, []);

  function saveCookieChoice(choice: CookieChoice, analytics: boolean) {
    if (!analytics) disableGoogleAnalytics();
    window.localStorage.setItem('coforma_cookie_analytics', String(analytics));
    window.localStorage.setItem('coforma_cookie_analytics_version', analyticsVersion);
    window.localStorage.setItem('coforma_cookie_choice', choice);
    setOpenCookieConfig(false);
    window.dispatchEvent(new Event(consentEvent));
  }

  return (
    <>
      {(consent === 'analytics' || consent === 'legacy-analytics') && <Analytics />}
      {consent === 'analytics' && (
        <Suspense fallback={null}><GoogleAnalytics /></Suspense>
      )}
      {(consent === 'pending' || consent === 'legacy-analytics') && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-4 shadow-[0_-14px_40px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[14px] font-extrabold text-slate-950">Uso de cookies</div>
              <p className="mt-1 text-[12px] leading-5 text-slate-600">
                Utilizamos cookies técnicas necesarias para el funcionamiento de la web y,
                si lo aceptas, usamos Google Analytics y Vercel Analytics para medir las visitas
                y mejorar Coforma.
              </p>
              <Link href="/legal/cookies"
                className="mt-1 text-[12px] font-bold text-emerald-700 hover:text-emerald-800"
              >
                Ver política de cookies
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => saveCookieChoice('rejected', false)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-[12px] font-extrabold text-slate-800 transition hover:bg-slate-50"
              >
                Rechazar
              </button>

              <button
                type="button"
                onClick={() => setOpenCookieConfig(true)}
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-[12px] font-extrabold text-emerald-800 transition hover:bg-emerald-100"
              >
                Configurar
              </button>

              <button
                type="button"
                onClick={() => saveCookieChoice('accepted', true)}
                className="rounded-xl bg-emerald-700 px-4 py-2 text-[12px] font-extrabold text-white transition hover:bg-emerald-800"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        open={openCookieConfig}
        title="Configurar cookies"
        onClose={() => setOpenCookieConfig(false)}
        maxWidthClass="max-w-md"
      >
        <div className="space-y-4 text-[13px] leading-6 text-slate-700">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="font-extrabold text-slate-950">Cookies técnicas necesarias</div>
            <p className="mt-1">
              Son necesarias para el funcionamiento básico de la web y para recordar tu
              preferencia de cookies.
            </p>
            <div className="mt-2 text-[12px] font-extrabold text-slate-500">Siempre activas</div>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <input
              type="checkbox"
              checked={analyticsCookies}
              onChange={(e) => setAnalyticsCookies(e.target.checked)}
              className="mt-1 h-4 w-4 accent-emerald-600"
            />
            <span>
              <span className="block font-extrabold text-slate-950">Cookies analíticas</span>
              <span className="mt-1 block text-slate-600">
                Permiten medir el uso de la web para mejorar contenidos, rendimiento y experiencia.
                Incluyen Google Analytics y Vercel Analytics.
              </span>
            </span>
          </label>

          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => saveCookieChoice('rejected', false)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-[12px] font-extrabold text-slate-800 transition hover:bg-slate-50"
            >
              Rechazar
            </button>

            <button
              type="button"
              onClick={() => saveCookieChoice('configured', analyticsCookies)}
              className="rounded-xl bg-emerald-700 px-4 py-2 text-[12px] font-extrabold text-white transition hover:bg-emerald-800"
            >
              Guardar configuración
            </button>
          </div>
        </div>
      </Modal>

    </>
  );
}
