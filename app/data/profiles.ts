type TrainingProfile = {
  path: string;
  title: string;
  label: string;
  intro: string;
  tasks: string[];
  modules: [label: string, path: string][];
  example?: {
    id?: string;
    title: string;
    body: string;
    steps?: { title: string; body: string; link: { label: string; path: string } }[];
    video: { label: string; path: string };
    showDemo?: boolean;
  };
};

export const profiles: TrainingProfile[] = [
  {
    path: '/academias',
    title: 'Software de gestión para academias de formación',
    label: 'Dirección de academia',
    intro: 'Gestiona alumnos, matrículas, horarios y notas con un programa para academias de Formación Profesional para el Empleo (FPE). El equipo puede seguir cada solicitud desde el primer contacto hasta el expediente académico.',
    tasks: ['Consulta qué personas están pendientes de contacto y cuáles avanzan a matrícula.', 'Vincula las inscripciones con el curso, la convocatoria y la sede correspondiente.', 'Organiza el calendario con sus aulas y docentes y revisa la asistencia y las calificaciones del alumnado.'],
    modules: [['Registrar solicitudes de información', '/modulos/captacion'], ['Gestionar matrículas', '/modulos/matriculas'], ['Planificar aulas, docentes y horarios', '/modulos/planificacion'], ['Consultar asistencia y calificaciones', '/modulos/alumnado']],
    example: {
      title: 'De la primera solicitud al expediente académico',
      body: 'En la demo, una persona pregunta por un curso. El equipo comprueba la oferta, registra el contacto y formaliza la matrícula. Una vez iniciado el curso, puede consultar las calificaciones, el estado del acta y la documentación pendiente del expediente.',
      video: { label: 'Ver el recorrido completo del CRM', path: '/videos/recorrido-crm' },
    },
  },
  {
    path: '/coordinacion-formativa',
    title: 'Coordinación y planificación de cursos FPE',
    label: 'Coordinación de formación',
    intro: 'Planifica acciones formativas con sus fechas, aulas y docentes y sigue los cursos desde la preparación hasta el cierre.',
    tasks: ['Localiza las acciones de la oferta pendientes de organizar.', 'Contrasta recursos y horarios con los avisos de solapamiento.', 'Distingue próximos arranques, cursos activos y cursos finalizados al coordinar al equipo.'],
    modules: [['Oferta formativa', '/modulos/oferta-formativa'], ['Planificación', '/modulos/planificacion'], ['Cursos en ejecución', '/modulos/cursos-en-ejecucion']],
    example: {
      id: 'cursos-subvencionados',
      title: 'Cómo gestionar cursos subvencionados en tu academia',
      body: 'Imagina que tu academia va a impartir un curso subvencionado. Con Coforma puedes coordinar el trabajo desde las primeras solicitudes hasta la revisión del expediente académico.',
      steps: [
        {
          title: 'Organiza las solicitudes y matrículas',
          body: 'Registra a las personas interesadas y comprueba qué matrículas se han formalizado. Cada matrícula queda vinculada al curso, la sede y la convocatoria.',
          link: { label: 'Cómo gestionar las matrículas', path: '/modulos/matriculas' },
        },
        {
          title: 'Prepara el calendario del curso',
          body: 'Asigna horarios, aulas y docentes. Revisa los avisos de solapamiento antes de cerrar la planificación.',
          link: { label: 'Cómo detectar solapamientos de aulas y docentes', path: '/controles/alarmas-de-planificacion' },
        },
        {
          title: 'Haz seguimiento de la asistencia y la evaluación',
          body: 'Durante el curso, consulta la asistencia y las calificaciones de cada alumno para saber qué queda por revisar.',
          link: { label: 'Consultar asistencia y calificaciones', path: '/modulos/alumnado' },
        },
        {
          title: 'Revisa el expediente antes del cierre',
          body: 'Consulta el estado del acta y comprueba qué documentos y anexos del expediente académico siguen pendientes.',
          link: { label: 'Ver un ejemplo de expediente académico', path: '/modulos/alumnado#expediente-academico' },
        },
      ],
      video: { label: 'Ver el recorrido del CRM', path: '/videos/recorrido-crm' },
      showDemo: true,
    },
  },
  {
    path: '/grupos-de-formacion',
    title: 'Software para gestionar varias academias',
    label: 'Grupos de formación',
    intro: 'Gestiona varias academias desde una sola plataforma. Consulta los indicadores de captación, alumnado y oferta del grupo y abre el detalle de cada sede cuando necesites intervenir.',
    tasks: ['Consulta la actividad de distintas academias relacionadas con tu grupo.', 'Organiza el acceso de los equipos con los perfiles previstos en el CRM.', 'Abre el detalle desde los indicadores para revisar dónde hace falta intervenir.'],
    modules: [['Panel de control', '/modulos/panel-de-control'], ['Comunicación interna', '/modulos/comunicacion-interna'], ['Trazabilidad', '/controles/trazabilidad']],
    example: {
      title: 'Cómo coordinar una red de academias',
      body: 'La demostración reúne siete academias en tres islas. Dirección puede consultar la actividad de la red y, desde el panel, abrir el listado de captación para revisar las gestiones que requieren atención.',
      video: { label: 'Ver el cuadro de mando de una red de academias', path: '/videos/dashboard-ejecutivo' },
    },
  },
];
