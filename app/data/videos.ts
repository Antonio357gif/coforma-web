type Video = {
  slug: string;
  title: string;
  description: string;
  duration: string;
  file: string;
  homeSection: string;
  poster?: string;
  captions?: string;
};

export const demoVideos: Video[] = [
  {
    slug: 'recorrido-crm',
    title: 'Recorrido general de Coforma CRM',
    description: 'De la captación y la matrícula a la planificación, la evaluación y el expediente académico.',
    duration: '3:00',
    file: '/videos/recorrido-crm.mp4',
    homeSection: 'videos',
    poster: '/videos/recorrido-crm.webp',
    captions: '/videos/recorrido-crm.vtt',
  },
  {
    slug: 'dashboard-ejecutivo',
    title: 'Dashboard ejecutivo',
    description: 'Consulta los indicadores de una red de academias y navega desde el cuadro de mando hasta Captación.',
    duration: '2:02',
    file: '/videos/dashboard.mp4',
    homeSection: 'videos',
    poster: '/videos/dashboard.webp',
    captions: '/videos/dashboard.vtt',
  },
];

export const operationalControlsVideo: Video = {
  slug: 'controles-operativos',
  title: 'Controles operativos',
  description: 'Ve cómo Coforma ayuda a detectar duplicados, revisar solapamientos y consultar el historial de actividad.',
  duration: '1:14',
  file: '/videos/controles-operativos.mp4',
  homeSection: 'controles',
};

export const personalMessageVideo: Video = {
  slug: 'mensaje-personal-de-antonio',
  title: 'Mensaje personal de Antonio para ti',
  description: 'Antonio Barragán presenta Coforma a las academias y grupos de formación.',
  duration: '1:46',
  file: '/videos/presentacion-coforma.mp4',
  homeSection: 'contacto',
};

export const videos = [...demoVideos, operationalControlsVideo, personalMessageVideo];

export function videoPath(slug: string) {
  return `/videos/${slug}`;
}
