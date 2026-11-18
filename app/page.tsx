'use client';

import Image from 'next/image';
import Link from 'next/link';
import { flowModules } from './data/modules';
import { operationalControls } from './data/controls';
import { useState } from 'react';

import DemoVideos from './components/DemoVideos';
import HeroCube from './components/HeroCube';
import Modal from './components/Modal';

type PlatformCard = {
  title: string;
  image: string;
};

const platformCards: PlatformCard[] = [
  {
    title: 'Un flujo, no módulos aislados',
    image: '/cards/01-flujo-conectado.png',
  },
  {
    title: 'Pensada para FPE',
    image: '/cards/02-fpe-operativa.png',
  },
  {
    title: 'Escalable y multientidad',
    image: '/cards/03-red-multientidad.png',
  },
];

export default function Home() {
  const [selectedPlatformCard, setSelectedPlatformCard] = useState<PlatformCard | null>(null);

  return (
    <div>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_48%_-8%,rgba(16,185,129,0.15),transparent_62%),radial-gradient(780px_420px_at_8%_18%,rgba(2,132,199,0.07),transparent_58%),radial-gradient(780px_420px_at_92%_20%,rgba(148,163,184,0.13),transparent_58%)]" />
      </div>

      <section id="inicio" className="mx-auto max-w-6xl px-5 pb-6 pt-3 sm:px-6">
        <div className="rounded-[30px] border border-slate-200 bg-white/72 p-6 shadow-[0_18px_58px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
          <div className="grid items-center gap-7 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-[590px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[13px] font-semibold text-emerald-900">
                Gestión integral para <span className="font-extrabold">academias</span> →
              </div>

              <h1 className="mt-5 text-[25px] font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-[30px] lg:text-[34px]">
                Todo el <span className="text-emerald-700">flujo formativo</span>, conectado y
                bajo control.
              </h1>

              <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-700 sm:text-[16px]">
                Coforma centraliza captación, matrículas, alumnado, planificación,
                comunicación y control operativo en una sola plataforma para academias
                y entidades de Formación Profesional para el Empleo.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/contacto"
                  className="rounded-2xl bg-emerald-600 px-6 py-3 text-[15px] font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition hover:bg-emerald-700"
                >
                  Solicitar Demo
                </Link>

                <a
                  href="#videos"
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-[15px] font-extrabold text-slate-900 transition hover:bg-slate-50"
                >
                  Ver en vídeo
                </a>
              </div>

              <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-3">
                {[
                  ['Multientidad', 'Redes de academias y usuarios por roles.'],
                  ['Trazabilidad', 'Cada paso queda vinculado al flujo formativo.'],
                  ['Control operativo', 'Indicadores y tareas en un mismo entorno.'],
                ].map(([title, body]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3"
                  >
                    <div className="text-[12px] font-extrabold text-slate-950">{title}</div>
                    <div className="mt-1 text-[11px] leading-4 text-slate-600">{body}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[36px] bg-[radial-gradient(460px_280px_at_52%_48%,rgba(16,185,129,0.12),transparent_66%)]" />
              <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.13)]">
                <HeroCube />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="plataforma" className="mx-auto max-w-6xl px-5 pb-6 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {platformCards.map((card) => (
            <button
              key={card.title}
              type="button"
              onClick={() => setSelectedPlatformCard(card)}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-[0_14px_42px_rgba(15,23,42,0.07)] backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_16px_46px_rgba(15,23,42,0.10)]"
              aria-label={`Ampliar imagen: ${card.title}`}
            >
              <div className="relative h-[255px] w-full overflow-hidden bg-white p-2">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain transition duration-300 group-hover:scale-[1.015]"
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      <DemoVideos />

      <section id="flujo" className="mx-auto max-w-6xl px-5 pb-6 sm:px-6">
        <div className="rounded-[30px] border border-slate-200 bg-white/78 p-5 shadow-[0_16px_52px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-emerald-700">
                Flujo formativo completo
              </div>
              <h2 className="mt-2 text-[23px] font-extrabold tracking-tight text-slate-950">
                De la captación al panel de control.
              </h2>
            </div>

            <p className="max-w-[460px] text-[13px] leading-6 text-slate-600">
              Explora cada módulo, sus funciones y una captura de la aplicación.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {flowModules.map((module) => (
              <Link
                key={module.slug}
                href={`/modulos/${module.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-[0_14px_38px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[12px] font-extrabold text-emerald-800 ring-1 ring-emerald-100">
                    {module.number}
                  </div>

                  <div>
                    <h3 className="text-[15px] font-extrabold leading-5 text-slate-950">
                      {module.title}
                    </h3>

                    <p className="mt-2 text-[12px] leading-5 text-slate-600">
                      {module.body}
                    </p>

                    <div className="mt-3 inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[12px] font-extrabold text-emerald-700 transition group-hover:border-emerald-200 group-hover:bg-emerald-100">
                      Ver módulo →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="controles" className="mx-auto max-w-6xl px-5 pb-6 sm:px-6">
        <div className="rounded-[30px] border border-slate-200 bg-white/78 p-5 shadow-[0_16px_52px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <div className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-emerald-700">
                Controles operativos integrados
              </div>

              <h2 className="mt-2 text-[23px] font-extrabold tracking-tight text-slate-950">
                Pequeños controles que evitan errores reales.
              </h2>

              <p className="mt-3 text-[14px] leading-7 text-slate-700">
                Coforma no solo ordena pantallas: incorpora avisos, reglas y trazabilidad
                para reducir duplicidades, mejorar la coordinación interna y anticipar
                incidencias antes de que afecten al trabajo diario.
              </p>

              <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-[12px] font-semibold leading-5 text-emerald-900">
                El valor no está solo en gestionar más datos, sino en evitar llamadas
                repetidas, matrículas duplicadas, solapamientos y tareas invisibles.
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {operationalControls.map((control) => (
                <article
                  key={control.title}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/25"
                >
                  <div className="mb-2 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
                    {control.badge}
                  </div>

                  <h3 className="text-[14px] font-extrabold leading-5 text-slate-950">
                    {control.title}
                  </h3>

                  <p className="mt-2 text-[12px] leading-5 text-slate-600">
                    {control.body}
                  </p>

                  <Link href={`/controles/${control.slug}`}
                    className="mt-3 inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[12px] font-extrabold text-emerald-700 transition hover:border-emerald-200 hover:bg-emerald-100"
                  >
                    Ver más →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="mx-auto max-w-6xl px-5 pb-10 sm:px-6">
        <div className="rounded-[30px] border border-emerald-200 bg-emerald-50/70 p-6 text-center shadow-[0_16px_48px_rgba(15,23,42,0.07)] sm:p-7">
          <h2 className="text-[22px] font-extrabold tracking-tight text-slate-950">
            ¿Quieres ver Coforma aplicado a tu academia?
          </h2>

          <p className="mx-auto mt-3 max-w-[620px] text-[14px] leading-6 text-slate-700">
            Solicita una demo y revisamos contigo cómo encaja la plataforma en tu flujo
            de captación, matrícula, planificación y seguimiento.
          </p>

          <Link href="/contacto"
            className="mt-5 inline-block rounded-2xl bg-emerald-600 px-6 py-3 text-[15px] font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.20)] transition hover:bg-emerald-700"
          >
            Solicitar Demo
          </Link>
        </div>
      </section>
      <Modal
        open={Boolean(selectedPlatformCard)}
        title={selectedPlatformCard ? selectedPlatformCard.title : 'Coforma'}
        onClose={() => setSelectedPlatformCard(null)}
        maxWidthClass="max-w-6xl"
      >
        {selectedPlatformCard && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="relative h-[260px] w-full sm:h-[520px] lg:h-[660px]">
              <Image
                src={selectedPlatformCard.image}
                alt={selectedPlatformCard.title}
                fill
                sizes="95vw"
                className="object-contain"
              />
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
