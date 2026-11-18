import ContentPage, { DemoLink } from '../components/ContentPage';
import { pageMetadata } from '../data/seo';

const title = 'Quiénes somos';
const intro = 'Coforma nace de la experiencia de Antonio Barragán Cabrera como docente de Formación Profesional para el Empleo y de la necesidad de conectar el trabajo diario de las academias.';
export const metadata = pageMetadata(title, intro, '/quienes-somos');

export default function AboutPage() {
  return (
    <ContentPage title={title} intro={intro}>
      <div className="mt-7 max-w-3xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6 leading-7 text-slate-700">
        <h2 className="text-xl font-bold text-slate-950">Por qué existe Coforma</h2>
        <p>La gestión de una acción formativa empieza mucho antes de la primera clase. Captación, administración y coordinación toman decisiones que afectan a la misma persona y al mismo curso. Creamos Coforma para que los equipos puedan seguir esa actividad y consultar su contexto en un solo lugar.</p>
        <h2 className="text-xl font-bold text-slate-950">Cómo hacemos una demostración</h2>
        <p>Partimos del proceso que gestiona tu centro. Podemos recorrer una matrícula, revisar una planificación o explorar los indicadores de la red de academias con datos de demostración.</p>
        <DemoLink />
      </div>
    </ContentPage>
  );
}
