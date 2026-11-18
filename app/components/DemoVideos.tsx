const videos = [
  {
    id: 'presentacion-antonio',
    title: 'Presentación de Antonio Barragán',
    description: 'Antonio presenta el recorrido que vas a ver, desde el primer contacto hasta el expediente académico.',
    duration: '0:11',
    featured: true,
  },
  {
    id: 'recorrido-crm',
    title: 'Recorrido general de Coforma CRM',
    description: 'De la captación y la matrícula a la planificación, la evaluación y el expediente académico.',
    duration: '3:00',
  },
  {
    id: 'dashboard',
    title: 'Dashboard ejecutivo',
    description: 'Consulta los indicadores de una red de academias y navega desde el cuadro de mando hasta Captación.',
    duration: '2:02',
  },
];

export default function DemoVideos() {
  return (
    <section
      id="videos"
      aria-labelledby="videos-title"
      className="mx-auto max-w-6xl scroll-mt-5 px-5 pb-6 sm:px-6"
    >
      <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_16px_52px_rgba(15,23,42,0.08)] sm:p-6">
        <h2 id="videos-title" className="text-[23px] font-extrabold tracking-tight text-slate-950">
          Coforma en acción
        </h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {videos.map(({ id, title, description, duration, featured }) => (
            <article
              key={id}
              className={featured
                ? 'overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 lg:col-span-2'
                : 'overflow-hidden rounded-2xl border border-slate-200'}
            >
              <div className="flex items-start justify-between gap-3 px-4 pt-4">
                <h3 id={id + '-title'} className="text-base font-extrabold leading-6 text-slate-950">
                  {title}
                </h3>
                <span className="pt-0.5 text-sm tabular-nums text-slate-600">{duration}</span>
              </div>
              <p className="px-4 pb-4 pt-2 text-sm leading-6 text-slate-600">{description}</p>
              <div className={featured ? 'px-4 pb-4' : undefined}>
                <video
                  aria-labelledby={id + '-title'}
                  className={featured
                    ? 'mx-auto block aspect-video w-full max-w-3xl rounded-xl bg-slate-950 object-contain'
                    : 'aspect-video w-full bg-slate-950 object-contain'}
                  controls
                  playsInline
                  preload="none"
                  poster={`/videos/${id}.webp`}
                >
                  <source src={`/videos/${id}.mp4`} type="video/mp4" />
                  <track kind="captions" label="Español" srcLang="es" src={`/videos/${id}.vtt`} />
                  <a href={`/videos/${id}.mp4`}>Descargar el vídeo</a>
                </video>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
