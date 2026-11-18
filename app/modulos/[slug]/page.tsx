import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContentPage, { DemoLink } from '../../components/ContentPage';
import Screenshot from '../../components/Screenshot';
import { modules } from '../../data/modules';
import { pageMetadata } from '../../data/seo';

type ModulePageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return modules.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ModulePageProps) {
  const { slug } = await params;
  const feature = modules.find((item) => item.slug === slug);
  if (!feature) notFound();
  return pageMetadata(feature.title + ' en academias FPE', feature.body, `/modulos/${slug}`);
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { slug } = await params;
  const index = modules.findIndex((item) => item.slug === slug);
  const feature = modules[index];
  if (!feature) notFound();
  const previous = modules[index - 1];
  const next = modules[index + 1];

  return (
    <ContentPage title={feature.title} intro={feature.body}>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_1.25fr]">
        <section className="space-y-4 leading-7 text-slate-700">
          <h2 className="text-xl font-bold text-slate-950">Qué problema resuelve</h2>
          <p>{feature.problem}</p>
          <h2 className="text-xl font-bold text-slate-950">Cómo se usa en Coforma</h2>
          <ol className="list-decimal space-y-2 pl-5">{feature.workflow.map((step) => <li key={step}>{step}</li>)}</ol>
          <DemoLink />
        </section>
        <Screenshot src={feature.image} title={feature.title} />
      </div>
      <nav aria-label="Módulos del flujo formativo" className="mt-8 flex flex-wrap gap-4 border-t border-slate-200 pt-5 text-sm font-semibold text-emerald-800">
        {previous && <Link href={`/modulos/${previous.slug}`}>← {previous.title}</Link>}
        <Link href="/modulos">Todos los módulos</Link>
        {next && <Link href={`/modulos/${next.slug}`}>{next.title} →</Link>}
      </nav>
    </ContentPage>
  );
}
