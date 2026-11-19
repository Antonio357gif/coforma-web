import type { MetadataRoute } from 'next';
import { publicPagePaths } from './data/pages';
import { siteUrl } from './data/seo';
import { videoPath, videoSeconds, videoThumbnail, videos } from './data/videos';

export default function sitemap(): MetadataRoute.Sitemap {
  const videosByPath = new Map(videos.map((video) => [videoPath(video.slug), video]));

  return publicPagePaths.map((path) => {
    const url = new URL(path, siteUrl).href;
    const video = videosByPath.get(path);
    if (!video) return { url };

    return {
      url,
      videos: [{
        title: video.search.title,
        description: video.search.description,
        thumbnail_loc: new URL(videoThumbnail(video.slug), siteUrl).href,
        content_loc: new URL(video.file, siteUrl).href,
        duration: videoSeconds(video.duration),
        publication_date: video.search.uploadedAt,
        tag: video.search.phrase,
      }],
    };
  });
}
