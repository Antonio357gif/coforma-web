'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

import Modal from './components/Modal';

const HeroCube = dynamic(() => import('./components/HeroCube'), { ssr: false });

const demoSlides = [
  '/demo/slide-01-login.png',
  '/demo/slide-02-dashboard.png',
  '/demo/slide-03-ejecutivo.png',
  '/demo/slide-04-ficha-alumno.png',
  '/demo/slide-05-listado-alumnos.png',
  '/demo/slide-06-registrar-llamada.png',
  '/demo/slide-07-acciones-formativas.png',
  '/demo/slide-08-auditoria.png',
  '/demo/slide-09-panel-control.png',
];

function DemoCarousel({
  i,
  setI,
}: {
  i: number;
  setI: React.Dispatch<React.SetStateAction<number>>;
}) {
  const prev = () => setI((v) => (v - 1 + demoSlides.length) % demoSlides.length);
  const next = () => setI((v) => (v + 1) % demoSlides.length);

  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        <div className="relative h-[54vh] min-h-[320px] max-h-[520px] w-full">
          <Image
            src={demoSlides[i]}
            alt={`Demo ${i + 1}`}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {demoSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                idx === i ? 'bg-emerald-600' : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Ir a slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            ← Atrás
          </button>
          <button
            onClick={next}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactForm({ onSent }: { onSent: () => void }) {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;

    setSending(true);
    setOk(null);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Error enviando el formulario');
      }

      setOk(true);
      formEl.reset();

      onSent();
    } catch {
      setOk(false);
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {[
        {
          name: 'company',
          placeholder: 'Empresa',
          type: 'text',
          required: true,
          autoComplete: 'organization',
        },
        {
          name: 'name',
          placeholder: 'Nombre',
          type: 'text',
          required: true,
          autoComplete: 'name',
        },
        {
          name: 'phone',
          placeholder: 'Teléfono',
          type: 'text',
          required: false,
          autoComplete: 'tel',
        },
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email',
          required: true,
          autoComplete: 'email',
        },
      ].map((f) => (
        <div key={f.name}>
          <input
            name={f.name}
            type={f.type}
            required={f.required}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete}   {/* ✅ ÚNICA MODIFICACIÓN */}
            className="w-full rounded-xl border border-slate-900/45 bg-white px-4 py-2.5 text-[15px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-slate-900"
          />
        </div>
      ))}

      <div>
        <textarea
          name="notes"
          rows={3}
          placeholder="Observaciones"
          autoComplete="off"               {/* ✅ ÚNICA MODIFICACIÓN */}
          className="w-full resize-none rounded-xl border border-slate-900/45 bg-white px-4 py-2.5 text-[15px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-slate-900"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-blue-600 px-5 py-3 text-base font-extrabold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {sending ? 'Enviando…' : 'Enviar solicitud'}
      </button>

      {ok === false && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
          No se pudo enviar ahora mismo. Prueba de nuevo.
        </div>
      )}
    </form>
  );
}

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [openDemo, setOpenDemo] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [demoIndex, setDemoIndex] = useState(0);
  const [sentMsg, setSentMsg] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(16,185,129,0.18),transparent_60%),radial-gradient(900px_500px_at_10%_20%,rgba(2,132,199,0.08),transparent_55%),radial-gradient(900px_500px_at_90%_25%,rgba(148,163,184,0.16),transparent_55%)]" />
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-coforma.png"
            alt="Coforma"
            width={150}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </div>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-700 md:flex">
          <a href="#inicio" className="hover:text-slate-900">Inicio</a>
          <a href="#caracteristicas" className="hover:text-slate-900">Características</a>
          <a href="#tarifas" className="hover:text-slate-900">Tarifas</a>
        </nav>
      </header>

      <section id="inicio" className="mx-auto max-w-6xl px-5 pb-10 pt-4 sm:px-6 sm:pb-14">
        <div className="rounded-[32px] border border-slate-200 bg-white/70 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.12)] backdrop-blur sm:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="max-w-[560px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900">
                Gestión integral para <span className="font-extrabold">academias</span> →
              </div>

              <h1 className="mt-6 text-[22px] font-extrabold leading-[1.14] tracking-tight text-slate-900 sm:text-[26px] lg:text-[28px]">
                Captación, seguimiento y gestión operativa{' '}
                <span className="text-emerald-700">de la Formación Profesional para el Empleo</span>{' '}
                para academias, <span className="text-slate-900">en una sola plataforma.</span>
              </h1>

              <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-700 sm:text-[16px]">
                Centraliza alumnos, acciones formativas, llamadas, auditoría y panel de control.
                Menos Excel, más control.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setSentMsg(false);
                    setOpenContact(false);
                    setDemoIndex(0);
                    setOpenDemo(true);
                  }}
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-base font-extrabold text-slate-900 hover:bg-slate-50"
                >
                  Ver DEMO
                </button>

                <button
                  onClick={() => {
                    setSentMsg(false);
                    setOpenDemo(false);
                    setOpenContact(true);
                  }}
                  className="rounded-2xl bg-emerald-600 px-6 py-3 text-base font-extrabold text-white shadow-[0_14px_38px_rgba(16,185,129,0.22)] hover:bg-emerald-700"
                >
                  Concertar cita
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(420px_240px_at_55%_30%,rgba(16,185,129,0.22),transparent_60%)]" />
              <div className="rounded-[32px] border border-slate-200 bg-white/80 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur">
                <HeroCube />
              </div>
            </div>
          </div>
        </div>

        <footer className="mx-auto mt-10 max-w-6xl px-2 text-center text-sm font-semibold text-slate-500">
          © {year} Coforma · CRM Integral FPE
        </footer>
      </section>

      <section id="caracteristicas" className="mx-auto max-w-6xl px-5 pb-12 sm:px-6">
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            { title: 'Registra tus cursos y convocatorias', body: 'Añade fácilmente tus cursos, horarios y convocatorias en un solo clic.' },
            { title: 'Gestiona inscripciones sin complicaciones', body: 'Centraliza alumnos, etapas, asistencia y documentación con trazabilidad.' },
            { title: 'Control total de tus convocatorias', body: 'Supervisa progreso y resultados desde un panel unificado y auditable.' },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur"
            >
              <h3 className="text-lg font-extrabold text-slate-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tarifas" className="mx-auto max-w-6xl px-5 pb-14 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="text-sm font-extrabold text-slate-700">Pack base</div>
            <h3 className="mt-2 text-lg font-extrabold text-slate-900">CRM + Seguimiento</h3>
            <ul className="mt-3 space-y-2 text-sm font-semibold text-slate-700">
              <li>• Contactos y pipeline</li>
              <li>• Registro de llamadas</li>
              <li>• Panel básico</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="text-sm font-extrabold text-emerald-800">Pack completo</div>
            <h3 className="mt-2 text-lg font-extrabold text-slate-900">Operativa FPE + Auditoría</h3>
            <ul className="mt-3 space-y-2 text-sm font-semibold text-slate-700">
              <li>• Acciones formativas</li>
              <li>• Gestión de alumnos</li>
              <li>• Auditoría y control</li>
            </ul>
          </div>
        </div>
      </section>

      <Modal
        open={openDemo}
        title="DEMO"
        onClose={() => setOpenDemo(false)}
        maxWidthClass="max-w-5xl"
      >
        <DemoCarousel i={demoIndex} setI={setDemoIndex} />
      </Modal>

      <Modal
        open={openContact}
        title="Concertar cita"
        onClose={() => setOpenContact(false)}
        maxWidthClass="max-w-sm"
      >
        {sentMsg ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-base font-bold text-emerald-800">
            Mensaje enviado
          </div>
        ) : (
          <ContactForm onSent={() => setSentMsg(true)} />
        )}
      </Modal>
    </div>
  );
}
