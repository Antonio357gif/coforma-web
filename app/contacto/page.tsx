import ContentPage from '../components/ContentPage';
import ContactForm from '../components/ContactForm';
import { pageMetadata } from '../data/seo';

const title = 'Solicita una demostración de Coforma';
const intro = 'Cuéntanos qué quieres ver y te contactaremos para acordar una demostración adaptada a tu academia o grupo de formación.';
export const metadata = pageMetadata(title, intro, '/contacto');

export default function ContactPage() {
  return (
    <ContentPage title={title} intro={intro}>
      <div className="mt-7 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><ContactForm /></div>
    </ContentPage>
  );
}
