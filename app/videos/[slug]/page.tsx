import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContentPage from '../../components/ContentPage';
import SharePage from '../../components/SharePage';
import { pageMetadata } from '../../data/seo';
import { videoPath, videos } from '../../data/videos';

type VideoPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return videos.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: VideoPageProps) {
  const { slug } = await params;
  const video = videos.find((item) => item.slug === slug);
  if (!video) notFound();
  return pageMetadata(video.title, video.description, videoPath(slug), `/share/${slug}.jpg`);
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const video = videos.find((item) => item.slug === slug);
  if (!video) notFound();

  return (
    <ContentPage title={video.title} intro={video.description}>
      <video
        aria-label={video.title}
        className="mt-6 aspect-video max-h-[70vh] w-full rounded-2xl bg-slate-950 object-contain"
        controls
        playsInline
        preload="metadata"
        poster={video.poster}
      >
        <source src={video.file} type="video/mp4" />
        {video.captions && <track kind="captions" label="Español" srcLang="es" src={video.captions} />}
        <a href={video.file}>Descargar el vídeo</a>
      </video>
      <div className="mt-5 flex flex-wrap items-start gap-x-5 gap-y-3">
        <SharePage path={videoPath(slug)} />
        <Link href={`/#${video.homeSection}`} className="inline-flex min-h-11 items-center font-semibold text-emerald-800 underline">
          Volver a la portada
        </Link>
      </div>
    </ContentPage>
  );
}
