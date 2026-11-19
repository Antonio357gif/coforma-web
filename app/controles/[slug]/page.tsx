import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContentPage from '../../components/ContentPage';
import Screenshot from '../../components/Screenshot';
import { operationalControls } from '../../data/controls';
import { modules } from '../../data/modules';
import { pageMetadata } from '../../data/seo';

type ControlPageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return operationalControls.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ControlPageProps) {
  const { slug } = await params;
  const control = operationalControls.find((item) => item.slug === slug);
  if (!control) notFound();
  return pageMetadata(control.title, control.body, `/controles/${slug}`, control.image);
}

export default async function ControlPage({ params }: ControlPageProps) {
  const { slug } = await params;
  const control = operationalControls.find((item) => item.slug === slug);
  if (!control) notFound();
  const relatedModule = modules.find((item) => item.slug === control.moduleSlug);
  return (
    <ContentPage title={control.title} intro={control.body}>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_1.25fr]">
        <section className="space-y-3 leading-7 text-slate-700">
          <h2 className="text-xl font-bold text-slate-950">Cuándo utilizarlo</h2>
          <p>{control.detail}</p>
          {relatedModule && <Link href={`/modulos/${relatedModule.slug}`} className="font-semibold text-emerald-800 underline">{relatedModule.title}</Link>}
        </section>
        <Screenshot src={control.image} title={control.title} />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <Link href="/controles" className="font-semibold text-emerald-800 underline">Ver todos los controles</Link>
      </div>
    </ContentPage>
  );
}
