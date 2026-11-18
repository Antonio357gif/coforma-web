import Link from 'next/link';
import ContentPage, { cardClass, DemoLink } from '../components/ContentPage';
import { profiles } from '../data/profiles';
import { pageMetadata } from '../data/seo';

const title = 'Plataforma de gestión FPE para academias';
const intro = 'Coforma conecta solicitudes, matrículas, alumnado, oferta, planificación y seguimiento operativo en un mismo CRM.';
export const metadata = pageMetadata(title, intro, '/plataforma');

export default function PlatformPage() {
  return (
    <ContentPage title={title} intro={intro}>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Link href="/modulos" className={cardClass}><h2 className="font-bold">Flujo formativo</h2><p className="mt-2 text-sm leading-6 text-slate-600">Sigue los nueve módulos desde el primer contacto hasta el cuadro de mando.</p></Link>
        <Link href="/controles" className={cardClass}><h2 className="font-bold">Controles operativos</h2><p className="mt-2 text-sm leading-6 text-slate-600">Consulta cómo se gestionan duplicidades, solapamientos y seguimiento de tareas.</p></Link>
        <Link href="/grupos-de-formacion" className={cardClass}><h2 className="font-bold">Multientidad y acceso por roles</h2><p className="mt-2 text-sm leading-6 text-slate-600">Organiza las academias de la red y el acceso de sus equipos según sus funciones.</p></Link>
      </div>
      <section id="casos-de-uso" className="mt-10 scroll-mt-5">
        <h2 className="text-2xl font-extrabold">Casos de uso</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {profiles.map((profile) => <Link key={profile.path} href={profile.path} className={cardClass}><h3 className="font-bold">{profile.label}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{profile.intro}</p></Link>)}
        </div>
      </section>
      <div className="mt-8 flex flex-wrap items-center gap-5"><DemoLink /><Link href="/legal/privacidad" className="text-sm font-semibold text-emerald-800 underline">Política de privacidad</Link></div>
    </ContentPage>
  );
}
