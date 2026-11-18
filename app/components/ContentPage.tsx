import Link from 'next/link';
import type { ReactNode } from 'react';

export default function ContentPage({ title, intro, children }: { title: string; intro?: string; children?: ReactNode }) {
  return (
    <article className="mx-auto max-w-6xl px-5 pb-14 pt-6 sm:px-6">
      <header className="rounded-[30px] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm sm:p-9">
        <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">{intro}</p>}
      </header>
      {children}
    </article>
  );
}

export const cardClass = 'block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50';

export function DemoLink({ children = 'Solicitar demo' }: { children?: ReactNode }) {
  return <Link href="/contacto" className="inline-block rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800">{children}</Link>;
}
