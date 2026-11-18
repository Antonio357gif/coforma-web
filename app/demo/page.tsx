import ContentPage, { DemoLink } from '../components/ContentPage';
import DemoVideos from '../components/DemoVideos';
import { pageMetadata } from '../data/seo';

const title = 'Demostración del CRM Integral FPE';
const intro = 'Ve el recorrido general de Coforma y cómo dirección consulta el dashboard ejecutivo en una red de academias.';
export const metadata = pageMetadata(title, intro, '/demo');

export default function DemoPage() {
  return (
    <>
      <ContentPage title={title} intro={intro} />
      <DemoVideos />
      <div className="mx-auto max-w-6xl px-5 pb-12 sm:px-6"><DemoLink>Solicitar una demo para mi centro</DemoLink></div>
    </>
  );
}
