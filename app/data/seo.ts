import type { Metadata } from 'next';

export const siteUrl = 'https://coforma.es';

export function pageMetadata(title: string, description: string, path: string, image?: string): Metadata {
  const preview = { url: image ?? '/logo-coforma.png', alt: image ? title : 'Coforma CRM Integral FPE' };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, locale: 'es_ES', type: 'website', siteName: 'Coforma', images: [preview] },
    twitter: { card: 'summary_large_image', title, description, images: [preview] },
  };
}
