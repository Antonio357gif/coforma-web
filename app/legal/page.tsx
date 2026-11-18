import Link from 'next/link';
import ContentPage, { cardClass } from '../components/ContentPage';
import { legalPages } from '../data/legal';
import { pageMetadata } from '../data/seo';

const title = 'Información legal';
const intro = 'Consulta el aviso legal y las políticas de privacidad y cookies de coforma.es.';
export const metadata = pageMetadata(title, intro, '/legal');

export default function LegalIndex() {
  return (
    <ContentPage title={title} intro={intro}>
      <ul className="mt-7 grid gap-3 sm:grid-cols-3">
        {legalPages.map((page) => <li key={page.slug}><Link className={cardClass} href={`/legal/${page.slug}`}>{page.title} →</Link></li>)}
      </ul>
    </ContentPage>
  );
}
