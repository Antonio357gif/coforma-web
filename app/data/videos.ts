type Video = {
  slug: string;
  title: string;
  description: string;
  duration: string;
  file: string;
  homeSection: string;
  poster?: string;
  captions?: string;
  search: {
    title: string;
    description: string;
    phrase: string;
    publishedOn: string;
    topics: string[];
    related: { href: string; label: string }[];
  };
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
    search: {
      title: 'Demo de un CRM para academias de formación FPE',
      description: 'Ve cómo funciona el CRM de Coforma para academias: captación de alumnos, matrículas, planificación de cursos, calificaciones y expediente académico.',
      phrase: 'demo de CRM para academias de formación',
      publishedOn: '2026-11-18',
      topics: [
        'Busca un curso disponible y sigue las solicitudes de información hasta la matrícula.',
        'Planifica fechas, horarios, aulas y docentes y abre los cursos que están en marcha.',
        'Consulta las calificaciones, el estado del acta y los documentos pendientes del expediente.',
      ],
      related: [
        { href: '/academias', label: 'Software de gestión para academias' },
        { href: '/modulos/matriculas', label: 'Gestión de matrículas' },
        { href: '/modulos/alumnado', label: 'Asistencia, notas y expedientes' },
      ],
    },
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
    search: {
      title: 'Cuadro de mando para grupos de academias',
      description: 'Consulta los indicadores de varias academias desde un solo panel: captación, alumnado activo, matrículas y cursos por sede y convocatoria.',
      phrase: 'cuadro de mando para grupos de academias',
      publishedOn: '2026-11-18',
      topics: [
        'Consulta la actividad de una red de siete academias en tres islas con los datos de la demo.',
        'Compara captación, alumnado activo y matrículas entre centros y revisa la oferta por convocatoria.',
        'Abre el detalle de los indicadores para localizar cursos activos y gestiones pendientes.',
      ],
      related: [
        { href: '/grupos-de-formacion', label: 'Gestionar varias academias desde una plataforma' },
        { href: '/modulos/panel-de-control', label: 'Indicadores de captación, alumnado y cursos' },
      ],
    },
  },
];

export const operationalControlsVideo: Video = {
  slug: 'controles-operativos',
  title: 'Controles operativos',
  description: 'Ve cómo Coforma ayuda a detectar duplicados, revisar solapamientos y consultar el historial de actividad.',
  duration: '1:14',
  file: '/videos/controles-operativos.mp4',
  homeSection: 'controles',
  search: {
    title: 'Control de duplicados y solapamientos en academias',
    description: 'Ve cómo detectar contactos duplicados y llamadas repetidas, revisar solapamientos de aulas y docentes y dar seguimiento a las tareas del equipo.',
    phrase: 'control de duplicados y solapamientos en academias',
    publishedOn: '2026-11-18',
    topics: [
      'Recupera la ficha de un contacto existente y revisa el historial antes de volver a llamarlo.',
      'Revisa los avisos de solapamiento de horarios, aulas y docentes al planificar un curso.',
      'Coordina las gestiones con mensajería, agenda compartida y un registro de la actividad.',
    ],
    related: [
      { href: '/controles/antiduplicados', label: 'Evitar contactos duplicados en captación' },
      { href: '/controles/alarmas-de-planificacion', label: 'Detectar solapamientos de aulas y docentes' },
      { href: '/controles', label: 'Ver los seis controles operativos' },
    ],
  },
};

export const personalMessageVideo: Video = {
  slug: 'mensaje-personal-de-antonio',
  title: 'Mensaje personal de Antonio para ti',
  description: 'Antonio Barragán presenta Coforma a las academias y grupos de formación.',
  duration: '1:46',
  file: '/videos/presentacion-coforma.mp4',
  homeSection: 'contacto',
  search: {
    title: 'CRM para academias de Canarias: mensaje de Antonio',
    description: 'Antonio Barragán, fundador de Coforma, presenta su CRM desarrollado en Canarias y explica qué valorar antes de elegir un programa de gestión para una academia.',
    phrase: 'CRM para academias de Canarias',
    publishedOn: '2026-11-18',
    topics: [
      'Conoce el proyecto de Coforma de la mano de Antonio Barragán, docente de FPE y fundador.',
      'Valora cuánto trabajo seguirá haciendo a mano tu equipo al comparar programas de gestión.',
    ],
    related: [
      { href: '/academias', label: 'Qué puedes gestionar con Coforma en tu academia' },
      { href: '/videos/recorrido-crm', label: 'Ver la demostración del CRM de formación' },
    ],
  },
};

export const videos = [...demoVideos, operationalControlsVideo, personalMessageVideo];

export function videoPath(slug: string) {
  return `/videos/${slug}`;
}

export function videoThumbnail(slug: string) {
  return `/share/${slug}.jpg`;
}

export function videoSeconds(duration: string) {
  const [minutes, seconds] = duration.split(':').map(Number);
  return minutes * 60 + seconds;
}
