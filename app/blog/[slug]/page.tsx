import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContentPage from '../../components/ContentPage';
import { guides } from '../../data/guides';
import { pageMetadata } from '../../data/seo';

type GuideProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => guides.map(({ slug }) => ({ slug }));

async function findGuide(params: GuideProps['params']) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();
  return guide;
}

export async function generateMetadata({ params }: GuideProps) {
  const guide = await findGuide(params);
  return pageMetadata(guide.title, guide.summary, `/blog/${guide.slug}`);
}

export default async function GuidePage({ params }: GuideProps) {
  const guide = await findGuide(params);
  return (
    <ContentPage title={guide.title} intro={guide.summary}>
      <div className="mt-7 max-w-3xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
        {guide.sections.map(([heading, body]) => (
          <section key={heading}>
            <h2 className="text-xl font-bold">{heading}</h2>
            <p className="mt-2 leading-7 text-slate-700">{body}</p>
          </section>
        ))}
        <Link href={guide.related} className="inline-block font-semibold text-emerald-800 underline">{guide.relatedLabel} →</Link>
      </div>
    </ContentPage>
  );
}
