import ProfilePage from '../components/ProfilePage';
import { profiles } from '../data/profiles';
import { pageMetadata } from '../data/seo';

const profile = profiles[0];
export const metadata = pageMetadata(profile.title, profile.intro, profile.path);

export default function Page() {
  return <ProfilePage profile={profile} />;
}
