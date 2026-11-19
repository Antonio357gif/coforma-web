import ProfilePage from '../components/ProfilePage';
import { profiles } from '../data/profiles';
import { pageMetadata } from '../data/seo';

const profile = profiles[1];
export const metadata = pageMetadata(
  profile.title,
  'Gestiona cursos subvencionados con Coforma, desde la matrícula y la planificación de horarios, aulas y docentes hasta la asistencia, las notas y el expediente.',
  profile.path,
);

export default function Page() {
  return <ProfilePage profile={profile} />;
}
