import { notFound } from 'next/navigation';
import ContentPage from '../../components/ContentPage';
import LegalContent from '../../components/LegalContent';
import { legalPages } from '../../data/legal';
import { pageMetadata } from '../../data/seo';

type LegalPageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => legalPages.map(({ slug }) => ({ slug }));

async function findPage(params: LegalPageProps['params']) {
  const { slug } = await params;
  const page = legalPages.find((item) => item.slug === slug);
  if (!page) notFound();
  return page;
}

export async function generateMetadata({ params }: LegalPageProps) {
  const page = await findPage(params);
  return pageMetadata(page.title, page.title + ' de la web pública de Coforma.', `/legal/${page.slug}`);
}

export default async function LegalPage({ params }: LegalPageProps) {
  const page = await findPage(params);
  return (
    <ContentPage title={page.title}>
      <div className="mt-7 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6"><LegalContent type={page.topic} /></div>
    </ContentPage>
  );
}
