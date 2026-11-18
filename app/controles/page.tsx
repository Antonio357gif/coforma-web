import Link from 'next/link';
import ContentPage, { cardClass } from '../components/ContentPage';
import { operationalControls } from '../data/controls';
import { pageMetadata } from '../data/seo';

const title = 'Controles operativos del CRM FPE';
const intro = 'Revisa los avisos y herramientas que ayudan a coordinar al equipo, detectar duplicidades y seguir la actividad.';
export const metadata = pageMetadata(title, intro, '/controles');

export default function ControlsPage() {
  return (
    <ContentPage title={title} intro={intro}>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {operationalControls.map((control) => (
          <Link key={control.slug} href={`/controles/${control.slug}`} className={cardClass}>
            <h2 className="font-bold">{control.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{control.body}</p>
          </Link>
        ))}
      </div>
    </ContentPage>
  );
}
