import Link from 'next/link';
import ContentPage, { cardClass } from '../components/ContentPage';
import { guides } from '../data/guides';
import { editorialBlog } from '../data/channels';
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
      <section aria-labelledby="blog-coforma" className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
        <div>
          <h2 id="blog-coforma" className="text-xl font-bold">Blog de Coforma</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">Estamos preparando el blog para publicar novedades de Coforma y contenidos sobre Formación Profesional para el Empleo.</p>
        </div>
        <a href={editorialBlog} className="rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-bold text-emerald-900 hover:bg-emerald-100">Visitar el blog en WordPress →</a>
      </section>
    </ContentPage>
  );
}
