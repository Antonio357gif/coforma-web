export const flowModules = [
  {
    number: '01',
    slug: 'captacion',
    title: 'Captación de personas',
    body: 'Registra solicitudes, oportunidades y primeros contactos desde una vista operativa.',
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
    title: 'Matrículas',
    body: 'Formaliza inscripciones vinculadas a acción formativa, convocatoria y academia.',
    image: '/slides/03-matriculas.png',
  },
  {
    number: '04',
    slug: 'alumnado',
    title: 'Alumnado',
    body: 'Centraliza la ficha, el estado y el histórico formativo de cada alumno.',
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
    title: 'Planificación',
    body: 'Coordina aulas, docentes, fechas, horarios y recursos desde una vista común.',
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

const moduleDetails = {
  captacion: {
    problem: 'Las solicitudes llegan por distintos canales y una misma persona puede hablar con más de un miembro del equipo.',
    workflow: ['Registra el primer contacto y la solicitud en la ficha de la persona.', 'Consulta los contactos anteriores antes de abrir un seguimiento.', 'Pasa a seguimiento cuando la persona necesita orientación o una nueva llamada.'],
  },
  seguimiento: {
    problem: 'Entre la primera solicitud y la matrícula hay decisiones, llamadas y cambios de interés que el equipo necesita compartir.',
    workflow: ['Consulta el estado de cada persona dentro del flujo.', 'Recupera las gestiones anteriores antes de contactar de nuevo.', 'Deriva a otra oferta o continúa a matrícula cuando hay una acción adecuada.'],
  },
  matriculas: {
    problem: 'Una inscripción necesita identificar a la persona, la formación que va a cursar y el centro que se hace cargo.',
    workflow: ['Selecciona la persona y la acción formativa correspondiente.', 'Revisa la convocatoria y la academia vinculadas a la inscripción.', 'Usa la matrícula para consultar la evolución del alumno durante el curso.'],
  },
  alumnado: {
    problem: 'Coordinación y administración necesitan encontrar el historial de una persona sin recomponerlo desde varias listas de cursos.',
    workflow: ['Abre la ficha individual del alumno.', 'Consulta su estado y las acciones formativas vinculadas.', 'Recupera su historial cuando necesites revisar el recorrido académico.'],
  },
  'oferta-formativa': {
    problem: 'El equipo de captación necesita saber qué formación puede ofrecer y coordinación necesita saber qué acciones debe preparar.',
    workflow: ['Identifica la acción formativa y su convocatoria.', 'Consulta la oferta junto a las acciones que ya están en marcha.', 'Lleva a planificación las acciones que tienen que organizarse antes de iniciar.'],
  },
  planificacion: {
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
