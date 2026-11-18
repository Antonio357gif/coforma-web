import type { MetadataRoute } from 'next';
import { operationalControls } from './data/controls';
import { guides } from './data/guides';
import { legalPages } from './data/legal';
import { flowModules } from './data/modules';
import { profiles } from './data/profiles';
import { siteUrl } from './data/seo';
import { videoPath, videos } from './data/videos';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '/', '/plataforma', '/modulos', '/controles', '/tarifas', '/quienes-somos', '/acerca-de', '/contacto', '/demo', '/blog', '/legal',
    ...profiles.map(({ path }) => path),
    ...flowModules.map(({ slug }) => `/modulos/${slug}`),
    ...operationalControls.map(({ slug }) => `/controles/${slug}`),
    ...guides.map(({ slug }) => `/blog/${slug}`),
    ...legalPages.map(({ slug }) => `/legal/${slug}`),
    ...videos.map(({ slug }) => videoPath(slug)),
  ];
  return pages.map((path) => ({ url: new URL(path, siteUrl).href }));
}
