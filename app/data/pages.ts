import { operationalControls } from './controls';
import { guides } from './guides';
import { legalPages } from './legal';
import { flowModules } from './modules';
import { profiles } from './profiles';
import { videoPath, videos } from './videos';

export const publicPagePaths = [
  '/', '/plataforma', '/modulos', '/controles', '/tarifas', '/quienes-somos', '/acerca-de', '/contacto', '/demo', '/blog', '/legal',
  ...profiles.map(({ path }) => path),
  ...flowModules.map(({ slug }) => `/modulos/${slug}`),
  ...operationalControls.map(({ slug }) => `/controles/${slug}`),
  ...guides.map(({ slug }) => `/blog/${slug}`),
  ...legalPages.map(({ slug }) => `/legal/${slug}`),
  ...videos.map(({ slug }) => videoPath(slug)),
];
