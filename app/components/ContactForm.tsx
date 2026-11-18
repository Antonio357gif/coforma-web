'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

const inputClass = 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-emerald-700';
const fields = [
  { label: 'Empresa o academia', name: 'company', type: 'text', autocomplete: 'organization', required: true },
  { label: 'Nombre', name: 'name', type: 'text', autocomplete: 'name', required: true },
  { label: 'Correo electrónico', name: 'email', type: 'email', autocomplete: 'email', required: true },
  { label: 'Teléfono (opcional)', name: 'phone', type: 'tel', autocomplete: 'tel', required: false },
];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok || !(await response.json()).ok) throw new Error('Solicitud no enviada');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4" aria-busy={status === 'sending'}>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="block text-sm font-semibold">
            {field.label}
            <input name={field.name} type={field.type} autoComplete={field.autocomplete} required={field.required} maxLength={254} className={inputClass} />
          </label>
        ))}
      </div>
      <label className="block text-sm font-semibold">¿Qué te gustaría ver? (opcional)
        <textarea name="notes" rows={4} maxLength={2000} className={inputClass} />
      </label>
      <p className="text-sm leading-6 text-slate-600">Usaremos estos datos para responder a tu solicitud. Consulta la <Link href="/legal/privacidad" className="font-semibold text-emerald-800 underline">política de privacidad</Link>.</p>
      <button type="submit" disabled={status === 'sending'} className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800 disabled:opacity-60">
        {status === 'sending' ? 'Enviando…' : 'Enviar solicitud de demo'}
      </button>
      {status === 'sent' && <p role="status" className="font-semibold text-emerald-800">Solicitud enviada. Te contactaremos para acordar la demo.</p>}
      {status === 'failed' && <p role="alert" className="font-semibold text-rose-800">No se pudo enviar la solicitud. Comprueba los datos y vuelve a intentarlo.</p>}
    </form>
  );
}
