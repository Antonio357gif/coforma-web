import type { LegalTopic } from '../components/LegalContent';

export const legalPages = [
  { slug: 'aviso-legal', title: 'Aviso legal', topic: 'aviso' },
  { slug: 'privacidad', title: 'Política de privacidad', topic: 'privacidad' },
  { slug: 'cookies', title: 'Política de cookies', topic: 'cookies' },
] satisfies { slug: string; title: string; topic: LegalTopic }[];
