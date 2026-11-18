export const editorialBlog = 'https://coforma.wordpress.com/';

const platforms = [
  { name: 'Facebook', url: process.env.COFORMA_FACEBOOK_URL, hosts: ['facebook.com', 'www.facebook.com'] },
  { name: 'X (Twitter)', url: process.env.COFORMA_X_URL, hosts: ['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com'] },
  { name: 'Instagram', url: process.env.COFORMA_INSTAGRAM_URL, hosts: ['instagram.com', 'www.instagram.com'] },
];

export function configuredSocialProfiles() {
  return platforms.flatMap(({ name, url, hosts }) => {
    if (!url) return [];
    try {
      const profile = new URL(url);
      if (profile.protocol !== 'https:' || !hosts.includes(profile.host) || profile.username || profile.password || profile.pathname === '/') {
        return [];
      }
      return [{ name, url: profile.href }];
    } catch {
      return [];
    }
  });
}
