import Image from 'next/image';
import Link from 'next/link';
import { demoVideos, videoPath } from '../data/videos';

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
          {demoVideos.map(({ slug, title, description, duration, poster }) => (
            <Link
              key={slug}
              href={videoPath(slug)}
              aria-labelledby={`${slug}-title`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 hover:border-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              <div className="flex items-start justify-between gap-3 px-4 pt-4">
                <h3 id={`${slug}-title`} className="text-base font-extrabold leading-6 text-slate-950">{title}</h3>
                <span className="pt-0.5 text-sm tabular-nums text-slate-600">{duration}</span>
              </div>
              <p className="grow px-4 pb-4 pt-2 text-sm leading-6 text-slate-600">{description}</p>
              <div className="relative grid aspect-video place-items-center bg-slate-950">
                {poster && <Image src={poster} alt="" fill sizes="(min-width: 1024px) 540px, 90vw" className="object-contain" />}
                <span className="relative rounded-xl bg-slate-950/90 px-4 py-2 text-sm font-bold text-white group-hover:bg-emerald-800">
                  <span aria-hidden="true">▶ </span>Ver vídeo
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
