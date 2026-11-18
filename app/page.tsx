import Link from 'next/link';
import DemoVideos from './components/DemoVideos';
import HeroCube from './components/HeroCube';
import { operationalControls } from './data/controls';
import { flowModules } from './data/modules';
import { profiles } from './data/profiles';

export default function Home() {
  return (
    <div>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_48%_-8%,rgba(16,185,129,0.15),transparent_62%),radial-gradient(780px_420px_at_8%_18%,rgba(2,132,199,0.07),transparent_58%),radial-gradient(780px_420px_at_92%_20%,rgba(148,163,184,0.13),transparent_58%)]" />
      </div>

      <section id="inicio" className="mx-auto max-w-6xl px-5 pb-6 pt-3 sm:px-6">
        <div className="rounded-[30px] border border-slate-200 bg-white/72 p-6 shadow-[0_18px_58px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
          <div className="grid items-center gap-7 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-[590px]">
              <p className="text-sm font-semibold text-emerald-800">CRM para academias y grupos de Formación Profesional para el Empleo</p>

              <h1 className="mt-4 text-balance text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-4xl xl:text-5xl">
                Todo el <span className="text-emerald-700">flujo formativo</span>, conectado y bajo control
              </h1>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
                Gestiona la captación, las matrículas y la planificación en un mismo CRM. Sigue la actividad de cada curso hasta el expediente académico.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/contacto"
                  className="rounded-2xl bg-emerald-700 px-6 py-3 text-base font-bold text-white transition hover:bg-emerald-800"
                >
                  Solicitar demo
                </Link>

                <a
                  href="#videos"
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-[15px] font-extrabold text-slate-900 transition hover:bg-slate-50"
                >
                  Ver en vídeo
                </a>
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

      <section id="plataforma" aria-labelledby="casos-portada" className="mx-auto max-w-6xl px-5 pb-8 pt-2 sm:px-6">
        <h2 id="casos-portada" className="text-2xl font-extrabold tracking-tight text-slate-950">Coforma en tu equipo</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {profiles.map(({ path, label, intro }) => (
            <Link
              key={path}
              href={path}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              <h3 className="flex items-start justify-between gap-3 font-bold text-slate-950">
                {label}
                <span aria-hidden="true" className="text-emerald-800">→</span>
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{intro}</p>
            </Link>
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

                    <p className="mt-2 text-sm leading-6 text-slate-600">
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
                Revisa los avisos de duplicados y solapamientos y consulta el historial de actividad antes de continuar una gestión.
              </p>

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

                  <p className="mt-2 text-sm leading-6 text-slate-600">
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
            Solicitar demo
          </Link>
        </div>
      </section>
    </div>
  );
}
