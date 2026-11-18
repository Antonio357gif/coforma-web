import Link from 'next/link';
import ContentPage, { DemoLink, cardClass } from '../components/ContentPage';
import Screenshot from '../components/Screenshot';
import { pageMetadata } from '../data/seo';

const title = 'Acerca de Coforma';
const intro = 'Coforma es un CRM integral para academias y grupos de Formación Profesional para el Empleo. Conecta la captación, la gestión académica y la supervisión de la actividad.';
export const metadata = pageMetadata(title + ' CRM Integral FPE', intro, '/acerca-de');

const sections = [
  { title: 'Dirección de academia', href: '/academias', description: 'Organiza las solicitudes, matrículas y el seguimiento del alumnado de tu centro.' },
  { title: 'Coordinación formativa', href: '/coordinacion-formativa', description: 'Coordina la planificación de aulas, docentes y horarios y consulta los cursos en ejecución.' },
  { title: 'Grupos de formación', href: '/grupos-de-formacion', description: 'Consulta la actividad de varias sedes y asigna el acceso de los equipos según sus funciones.' },
];

export default function AboutProductPage() {
  return (
    <ContentPage title={title} intro={intro}>
      <section className="mt-8 grid items-center gap-6 lg:grid-cols-[1fr_1.25fr]" aria-labelledby="funcionamiento">
        <div className="space-y-4 leading-7 text-slate-700">
          <h2 id="funcionamiento" className="text-2xl font-bold tracking-tight text-slate-950">Cómo encajan los procesos</h2>
          <p>Une cada solicitud con su seguimiento y, cuando se formaliza la matrícula, con la acción formativa y la academia. Coordinación puede revisar qué cursos están en preparación o en marcha, y dirección puede consultar los indicadores y entrar en su detalle.</p>
          <Link href="/plataforma" className="inline-block font-bold text-emerald-800 underline">Explorar la plataforma</Link>
        </div>
        <Screenshot src="/slides/09-panel-control.png" title="Panel de control" />
      </section>
      <section className="mt-10" aria-labelledby="perfiles">
        <h2 id="perfiles" className="text-2xl font-extrabold tracking-tight">Para quién está pensado</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {sections.map(({ title, href, description }) => (
            <Link key={href} href={href} className={cardClass}>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
            </Link>
          ))}
        </div>
      </section>
      <div className="mt-9 flex flex-wrap items-center gap-5">
        <DemoLink />
        <Link href="/quienes-somos" className="text-sm font-semibold text-emerald-800 underline">Quiénes somos, misión y valores</Link>
      </div>
    </ContentPage>
  );
}
