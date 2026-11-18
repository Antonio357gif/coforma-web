import Link from 'next/link';
import ContentPage, { cardClass } from '../components/ContentPage';
import { guides } from '../data/guides';
import { pageMetadata } from '../data/seo';

const title = 'Guías para gestionar academias y cursos FPE';
const intro = 'Recursos para dirección y coordinación sobre captación, matrículas y planificación de la formación.';
export const metadata = pageMetadata(title, intro, '/blog');

export default function ResourcesPage() {
  return (
    <ContentPage title={title} intro={intro}>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link key={guide.slug} className={cardClass} href={`/blog/${guide.slug}`}>
            <h2 className="text-xl font-bold">{guide.title}</h2>
            <p className="mt-2 leading-6 text-slate-600">{guide.summary}</p>
          </Link>
        ))}
      </div>
    </ContentPage>
  );
}
