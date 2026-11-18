import Link from 'next/link';
import ContentPage, { cardClass } from '../components/ContentPage';
import { flowModules } from '../data/modules';
import { pageMetadata } from '../data/seo';

const title = 'Módulos del CRM Integral FPE';
const intro = 'Explora las nueve áreas de Coforma que conectan la captación, la gestión académica y el seguimiento de cursos.';
export const metadata = pageMetadata(title, intro, '/modulos');

export default function ModulesPage() {
  return (
    <ContentPage title={title} intro={intro}>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {flowModules.map((module) => (
          <Link key={module.slug} href={`/modulos/${module.slug}`} className={cardClass}>
            <h2 className="font-bold text-slate-950">{module.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{module.body}</p>
          </Link>
        ))}
      </div>
    </ContentPage>
  );
}
