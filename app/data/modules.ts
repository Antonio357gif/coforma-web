export const flowModules = [
  {
    number: '01',
    slug: 'captacion',
    title: 'Captación y seguimiento de interesados para academias',
    body: 'Gestiona las solicitudes de información de tu academia en un CRM. Consulta qué cursos interesan a cada persona y qué contacto o cita queda pendiente.',
    image: '/slides/01-captacion-personas.png',
  },
  {
    number: '02',
    slug: 'seguimiento',
    title: 'Personas en flujo formativo',
    body: 'Organiza el seguimiento de cada persona hasta su matrícula o derivación.',
    image: '/slides/02-personas-flujo-formativo.png',
  },
  {
    number: '03',
    slug: 'matriculas',
    title: 'Gestión de matrículas para academias',
    body: 'Convierte las solicitudes en matrículas y consulta a qué curso, convocatoria y academia corresponde cada inscripción.',
    image: '/slides/03-matriculas.png',
  },
  {
    number: '04',
    slug: 'alumnado',
    title: 'Gestión del alumnado y calificaciones en cursos FPE',
    body: 'Consulta las fichas del alumnado, su asistencia, las notas de cada curso y el estado de las actas y expedientes académicos.',
    image: '/slides/04-alumnado.png',
  },
  {
    number: '05',
    slug: 'oferta-formativa',
    title: 'Oferta formativa',
    body: 'Gestiona acciones formativas, certificados profesionales y convocatorias.',
    image: '/slides/05-oferta-formativa.png',
  },
  {
    number: '06',
    slug: 'planificacion',
    title: 'Planificación de cursos, aulas, docentes y horarios',
    body: 'Organiza los cursos de tu centro de formación en un calendario común. Asigna fechas, aulas y docentes y revisa los avisos de solapamiento.',
    image: '/slides/06-planificacion.png',
  },
  {
    number: '07',
    slug: 'cursos-en-ejecucion',
    title: 'Cursos en ejecución',
    body: 'Sigue cursos activos, próximos arranques, finalizados y pendientes de planificar.',
    image: '/slides/07-cursos-ejecucion.png',
  },
  {
    number: '08',
    slug: 'comunicacion-interna',
    title: 'Comunicación interna',
    body: 'Conecta agenda, mensajería, llamadas, prioridades y actividad diaria del equipo.',
    image: '/slides/08-comunicacion-interna.png',
  },
  {
    number: '09',
    slug: 'panel-de-control',
    title: 'Panel de control',
    body: 'Consulta indicadores, listados y trazabilidad para tomar decisiones con información ordenada.',
    image: '/slides/09-panel-control.png',
  },
] as const;

const moduleDetails: Record<(typeof flowModules)[number]['slug'], {
  problem: string;
  workflow: string[];
  searchTitle?: string;
  examples?: { id?: string; title: string; body: string; image: string }[];
}> = {
  captacion: {
    searchTitle: 'CRM de captación de alumnos para academias',
    problem: 'Las solicitudes llegan por distintos canales y una misma persona puede hablar con más de un miembro del equipo.',
    workflow: ['Registra el primer contacto y la solicitud en la ficha de la persona.', 'Consulta los contactos anteriores antes de abrir un seguimiento.', 'Pasa a seguimiento cuando la persona necesita orientación o una nueva llamada.'],
  },
  seguimiento: {
    problem: 'Entre la primera solicitud y la matrícula hay decisiones, llamadas y cambios de interés que el equipo necesita compartir.',
    workflow: ['Consulta el estado de cada persona dentro del flujo.', 'Recupera las gestiones anteriores antes de contactar de nuevo.', 'Deriva a otra oferta o continúa a matrícula cuando hay una acción adecuada.'],
  },
  matriculas: {
    searchTitle: 'Gestión de matrículas para academias',
    problem: 'Una inscripción necesita identificar a la persona, la formación que va a cursar y el centro que se hace cargo.',
    workflow: ['Selecciona la persona y la acción formativa correspondiente.', 'Revisa la convocatoria y la academia vinculadas a la inscripción.', 'Usa la matrícula para consultar la evolución del alumno durante el curso.'],
  },
  alumnado: {
    searchTitle: 'Gestión de alumnos, asistencia y notas en cursos FPE',
    problem: 'Coordinación y administración necesitan encontrar el historial de una persona sin recomponerlo desde varias listas de cursos.',
    workflow: ['Abre la ficha individual del alumno y consulta sus cursos e historial.', 'Revisa la asistencia y los resultados de evaluación desde el curso.', 'Consulta el estado del acta y abre el expediente para revisar anexos, plazos y documentos pendientes.'],
    examples: [
      {
        title: 'Calificaciones y actas por curso',
        body: 'En la vista de ejemplo se consultan la nota media, el número de personas aptas y no aptas y el estado del acta. En los certificados profesionales la consulta llega a los módulos y unidades evaluables.',
        image: '/slides/calificaciones-cursos-fpe.webp',
      },
      {
        id: 'expediente-academico',
        title: 'Documentación del expediente académico',
        body: 'En el ejemplo del curso se muestran los anexos previstos y su estado. El equipo puede abrir el expediente para distinguir qué información ya está disponible y qué sigue pendiente antes del cierre.',
        image: '/slides/expediente-academico-fpe.webp',
      },
    ],
  },
  'oferta-formativa': {
    problem: 'El equipo de captación necesita saber qué formación puede ofrecer y coordinación necesita saber qué acciones debe preparar.',
    workflow: ['Identifica la acción formativa y su convocatoria.', 'Consulta la oferta junto a las acciones que ya están en marcha.', 'Lleva a planificación las acciones que tienen que organizarse antes de iniciar.'],
  },
  planificacion: {
    searchTitle: 'Software para planificar cursos, aulas y horarios',
    problem: 'Asignar un curso requiere cruzar horarios, disponibilidad de aulas y docentes antes de confirmar el calendario.',
    workflow: ['Reúne fechas, horarios, aulas y docentes en la planificación.', 'Revisa los avisos de solapamiento al coordinar recursos compartidos.', 'Consulta los próximos arranques y las acciones que aún necesitan planificación.'],
  },
  'cursos-en-ejecucion': {
    problem: 'Cuando conviven varios cursos, el equipo necesita distinguir con claridad qué está activo, qué comienza pronto y qué ha terminado.',
    workflow: ['Consulta los cursos en ejecución desde la vista operativa.', 'Revisa los próximos arranques y los cursos pendientes de planificación.', 'Identifica los cursos cerrados para consultar su historial sin mezclarlos con el trabajo diario.'],
  },
  'comunicacion-interna': {
    problem: 'Las tareas y los avisos pierden contexto cuando se reparten entre mensajes, llamadas y agendas individuales.',
    workflow: ['Consulta las citas, tareas y llamadas previstas en la agenda.', 'Coordina con el equipo desde la mensajería interna.', 'Revisa las prioridades antes de reasignar o continuar una gestión.'],
  },
  'panel-de-control': {
    problem: 'Dirección necesita interpretar qué ocurre en cada academia y poder pasar del indicador al detalle operativo.',
    workflow: ['Revisa la cobertura de la red, el alumnado activo y las personas en flujo formativo.', 'Abre el detalle de un indicador, como Captación, para revisar los registros.', 'Usa los estados de la oferta para orientar el seguimiento de cursos y convocatorias.'],
  },
};

export const modules = flowModules.map((module) => ({
  ...module,
  ...moduleDetails[module.slug],
}));
