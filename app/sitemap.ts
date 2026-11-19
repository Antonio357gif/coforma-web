import type { MetadataRoute } from 'next';
import { publicPagePaths } from './data/pages';
import { siteUrl } from './data/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPagePaths.map((path) => ({ url: new URL(path, siteUrl).href }));
}
