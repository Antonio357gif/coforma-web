import type { Metadata } from 'next';

export const siteUrl = 'https://coforma.es';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, locale: 'es_ES', type: 'website', siteName: 'Coforma' },
  };
}
