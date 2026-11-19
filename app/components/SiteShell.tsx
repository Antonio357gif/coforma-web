import Image from 'next/image';
import Link from 'next/link';
import { configuredSocialProfiles, editorialBlog } from '../data/channels';

const navigation = [
  ['Plataforma', '/plataforma'],
  ['Módulos', '/modulos'],
  ['Casos de uso', '/plataforma#casos-de-uso'],
  ['Demo', '/demo'],
  ['Tarifas', '/tarifas'],
  ['Recursos', '/blog'],
  ['Quiénes somos', '/quienes-somos'],
];

const legal = [
  ['Aviso legal', '/legal/aviso-legal'],
  ['Privacidad', '/legal/privacidad'],
  ['Cookies', '/legal/cookies'],
];

function Brand() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-950" aria-label="Coforma, inicio">
      <Image src="/coforma-isotipo.png" alt="" width={36} height={36} />
      <span><span className="text-emerald-700">Co</span>forma</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-5 gap-y-3 px-5 py-4 sm:px-6">
      <Brand />
      <nav aria-label="Navegación principal" className="order-last flex w-full flex-wrap gap-x-4 gap-y-2 border-t border-slate-200 pt-3 text-sm font-semibold text-slate-700 lg:order-none lg:w-auto lg:border-0 lg:pt-0">
        {navigation.map(([name, href]) => <Link className="hover:text-emerald-800 hover:underline" key={href} href={href}>{name}</Link>)}
      </nav>
      <div className="flex items-center gap-3 text-sm font-semibold">
        <a href="https://app.coforma.es/login" className="text-emerald-800 hover:underline">Área clientes</a>
        <Link href="/contacto" className="text-slate-700 hover:text-emerald-800 hover:underline">Contacto</Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const socialProfiles = configuredSocialProfiles();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 text-sm text-slate-600 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div><Brand /><p className="mt-3 max-w-xs">CRM integral para academias y entidades de Formación Profesional para el Empleo.</p></div>
        <nav aria-label="Producto" className="flex flex-col gap-2">
          <Link href="/plataforma">Plataforma</Link>
          <Link href="/controles">Controles operativos</Link>
          <Link href="/demo">Ver la demo</Link>
        </nav>
        <nav aria-label="Coforma y recursos" className="flex flex-col gap-2">
          <Link href="/quienes-somos">Quiénes somos</Link>
          <Link href="/acerca-de">Acerca de Coforma</Link>
          <Link href="/blog">Guías para academias</Link>
          <a href={editorialBlog}>Blog de Coforma (en preparación)</a>
          {socialProfiles.map(({ name, url }) => <a key={name} href={url}>Coforma en {name}</a>)}
        </nav>
        <nav aria-label="Información legal" className="flex flex-col gap-2">
          {legal.map(([name, href]) => <Link key={href} href={href}>{name}</Link>)}
        </nav>
      </div>
    </footer>
  );
}
