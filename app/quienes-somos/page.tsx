import Link from 'next/link';
import ContentPage from '../components/ContentPage';
import { pageMetadata } from '../data/seo';

const title = 'Quiénes somos';
const intro = 'Coforma nace en Canarias de la experiencia de Antonio Barragán Cabrera como docente de Formación Profesional para el Empleo y de una necesidad concreta: conectar el trabajo diario de las academias.';
export const metadata = pageMetadata(title, 'Conoce el origen de Coforma y la misión, visión y valores de su CRM para Formación Profesional para el Empleo.', '/quienes-somos');

const values = [
  {
    title: 'Conocimiento del sector',
    description: 'Diseñamos los procesos a partir de cómo trabajan dirección, coordinación, administración y docencia en un centro de formación.',
  },
  {
    title: 'Claridad operativa',
    description: 'Cada equipo debe poder identificar qué le corresponde hacer, cuándo y con qué información.',
  },
  {
    title: 'Trazabilidad',
    description: 'El seguimiento debe conservar el contexto, desde la primera solicitud hasta las decisiones que quedan reflejadas en el expediente.',
  },
  {
    title: 'Responsabilidad con los datos',
    description: 'La información del alumnado forma parte de su trayectoria. Trabajamos para que cada perfil acceda a lo que necesita para desempeñar su función.',
  },
];

export default function AboutPage() {
  return (
    <ContentPage title={title} intro={intro}>
      <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.4fr]" aria-labelledby="origen">
        <div className="rounded-[28px] bg-slate-900 p-7 text-white sm:p-9">
          <h2 id="origen" className="text-2xl font-bold tracking-tight sm:text-3xl">De la experiencia en FPE al día a día de la academia</h2>
          <p className="mt-6 text-sm font-semibold text-emerald-300">Antonio Barragán Cabrera · Impulsor de Coforma</p>
        </div>
        <div className="self-center space-y-4 px-1 leading-7 text-slate-700 sm:px-5">
          <p>Una acción formativa empieza antes de la primera clase. Alguien atiende al alumno, otra persona formaliza su matrícula y coordinación organiza los recursos. Los tres equipos necesitan poder continuar el trabajo con la información que ya existe.</p>
          <p>Coforma reúne ese recorrido en una plataforma común. Está pensada para un centro que busca ordenar su operativa y para grupos que necesitan seguir la actividad de varias academias.</p>
          <Link href="/acerca-de" className="inline-block font-bold text-emerald-800 underline">Conocer el proyecto Coforma</Link>
        </div>
      </section>

      <div className="mt-9 grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
          <h2 className="text-xl font-extrabold text-slate-950">Misión</h2>
          <p className="mt-3 leading-7 text-slate-700">Ayudar a las academias y entidades de Formación Profesional para el Empleo a coordinar el ciclo formativo completo, desde el primer contacto con el alumnado hasta el expediente académico.</p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-extrabold text-slate-950">Visión</h2>
          <p className="mt-3 leading-7 text-slate-700">Convertir Coforma en una plataforma de referencia para la gestión de la FPE, con origen en Canarias y capacidad para adaptarse a la operativa de los centros y grupos de otras comunidades.</p>
        </section>
      </div>

      <section className="mt-10" aria-labelledby="valores">
        <h2 id="valores" className="text-2xl font-extrabold tracking-tight">Valores</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ title, description }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-emerald-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-9 flex flex-wrap items-center gap-5">
        <Link href="/videos/mensaje-personal-de-antonio" className="text-sm font-semibold text-emerald-800 underline">Ver el mensaje personal de Antonio</Link>
      </div>
    </ContentPage>
  );
}
