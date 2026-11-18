export const profiles = [
  {
    path: '/academias',
    title: 'Software de gestión para academias de formación',
    label: 'Dirección de academia',
    intro: 'Organiza el trabajo de captación, administración y coordinación desde la primera solicitud hasta el seguimiento académico.',
    tasks: ['Consulta qué personas están pendientes de contacto y cuáles avanzan a matrícula.', 'Vincula las inscripciones con el curso, la convocatoria y la sede correspondiente.', 'Revisa el estado de los cursos y las prioridades del equipo antes de la siguiente jornada.'],
    modules: [['Captación', '/modulos/captacion'], ['Matrículas', '/modulos/matriculas'], ['Alumnado', '/modulos/alumnado']],
  },
  {
    path: '/coordinacion-formativa',
    title: 'Coordinación y planificación de cursos FPE',
    label: 'Coordinación de formación',
    intro: 'Planifica acciones formativas con sus fechas, aulas y docentes y sigue los cursos desde la preparación hasta el cierre.',
    tasks: ['Localiza las acciones de la oferta pendientes de organizar.', 'Contrasta recursos y horarios con los avisos de solapamiento.', 'Distingue próximos arranques, cursos activos y cursos finalizados al coordinar al equipo.'],
    modules: [['Oferta formativa', '/modulos/oferta-formativa'], ['Planificación', '/modulos/planificacion'], ['Cursos en ejecución', '/modulos/cursos-en-ejecucion']],
  },
  {
    path: '/grupos-de-formacion',
    title: 'Software para grupos y redes de academias',
    label: 'Grupos de formación',
    intro: 'Supervisa la actividad de varias academias y consulta los indicadores de captación, alumnado y oferta en el contexto de tu red.',
    tasks: ['Consulta la actividad de distintas academias relacionadas con tu grupo.', 'Organiza el acceso de los equipos con los perfiles previstos en el CRM.', 'Abre el detalle desde los indicadores para revisar dónde hace falta intervenir.'],
    modules: [['Panel de control', '/modulos/panel-de-control'], ['Comunicación interna', '/modulos/comunicacion-interna'], ['Trazabilidad', '/controles/trazabilidad']],
  },
];
