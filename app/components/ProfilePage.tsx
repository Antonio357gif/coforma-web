import Link from 'next/link';
import ContentPage, { cardClass, DemoLink } from './ContentPage';
import type { profiles } from '../data/profiles';

export default function ProfilePage({ profile }: { profile: (typeof profiles)[number] }) {
  return (
    <ContentPage title={profile.title} intro={profile.intro}>
      <section className="mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold">Qué puedes gestionar</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">{profile.tasks.map((task) => <li key={task}>{task}</li>)}</ul>
      </section>
      {profile.example && (
        <section className="mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold">{profile.example.title}</h2>
          <p className="mt-3 leading-7 text-slate-700">{profile.example.body}</p>
          <Link href={profile.example.video.path} className="mt-3 inline-flex min-h-11 items-center font-semibold text-emerald-800 underline">
            {profile.example.video.label}
          </Link>
        </section>
      )}
      <section className="mt-8">
        <h2 className="text-xl font-bold">Funciones relacionadas</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {profile.modules.map(([title, path]) => <Link key={path} href={path} className={cardClass}>{title} →</Link>)}
        </div>
      </section>
      <div className="mt-8"><DemoLink /></div>
    </ContentPage>
  );
}
