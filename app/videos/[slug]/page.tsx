import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContentPage, { DemoLink } from '../../components/ContentPage';
import SharePage from '../../components/SharePage';
import { pageMetadata, siteUrl } from '../../data/seo';
import { videoPath, videoSeconds, videoThumbnail, videos } from '../../data/videos';

type VideoPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return videos.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: VideoPageProps) {
  const { slug } = await params;
  const video = videos.find((item) => item.slug === slug);
  if (!video) notFound();
  return pageMetadata(video.search.title, video.search.description, videoPath(slug), videoThumbnail(slug));
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const video = videos.find((item) => item.slug === slug);
  if (!video) notFound();
  const { title, description, phrase, publishedOn, topics, related } = video.search;
  const thumbnail = videoThumbnail(slug);
  const videoData = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description,
    thumbnailUrl: new URL(thumbnail, siteUrl).href,
    uploadDate: publishedOn,
    duration: `PT${videoSeconds(video.duration)}S`,
    contentUrl: new URL(video.file, siteUrl).href,
    url: new URL(videoPath(slug), siteUrl).href,
    inLanguage: 'es',
    keywords: phrase,
  };

  return (
    <ContentPage title={title} intro={description}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoData).replace(/</g, '\\u003c') }} />
      <video
        aria-label={title}
        className="mt-6 aspect-video max-h-[70vh] w-full rounded-2xl bg-slate-950 object-contain"
        controls
        playsInline
        preload="metadata"
        poster={thumbnail}
      >
        <source src={video.file} type="video/mp4" />
        {video.captions && <track kind="captions" label="Español" srcLang="es" src={video.captions} />}
        <a href={video.file}>Descargar el vídeo</a>
      </video>
      <section aria-labelledby="temas-video" className="mt-8 max-w-3xl">
        <h2 id="temas-video" className="text-xl font-bold text-slate-950">Qué verás en el vídeo</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
          {topics.map((topic) => <li key={topic}>{topic}</li>)}
        </ul>
      </section>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        {related.map(({ href, label }) => (
          <Link key={href} href={href} className="font-semibold text-emerald-800 underline">{label}</Link>
        ))}
        <DemoLink />
      </div>
      <div className="mt-5 flex flex-wrap items-start gap-x-5 gap-y-3">
        <SharePage path={videoPath(slug)} />
        <Link href={`/#${video.homeSection}`} className="inline-flex min-h-11 items-center font-semibold text-emerald-800 underline">
          Volver a la portada
        </Link>
      </div>
    </ContentPage>
  );
}
