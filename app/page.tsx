'use client';

import { useState } from 'react';
import Image from 'next/image';

const slides = [
  '/demo/slide-01-login.png',
  '/demo/slide-02-dashboard.png',
  '/demo/slide-03-ejecutivo.png',
  '/demo/slide-04-ficha-alumno.png',
  '/demo/slide-05-listado-alumnos.png',
  '/demo/slide-06-registrar-llamada.png',
  '/demo/slide-07-acciones-formativas.png',
  '/demo/slide-08-auditoria.png',
  '/demo/slide-09-panel-control.png',
];

export default function Home() {
  const [showDemo, setShowDemo] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">

      {/* LOGO */}
      <Image
        src="/logo-coforma.png"
        alt="Coforma"
        width={220}
        height={80}
        priority
        className="mb-10"
      />

      {/* BOTONES */}
      <div className="flex gap-6 mb-16">
        <button
          onClick={() => setShowDemo(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow"
        >
          Ver DEMO
        </button>

        <button
          onClick={() => setShowContact(true)}
          className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-semibold shadow"
        >
          Concertar cita
        </button>
      </div>

      <footer className="text-sm text-gray-400">
        © 2026 coforma.es
      </footer>

      {/* ================= DEMO ================= */}
      {showDemo && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <button
            onClick={() => setShowDemo(false)}
            className="absolute top-6 right-6 text-2xl font-bold"
          >
            ✕
          </button>

          <div className="w-full max-w-5xl h-[70vh] bg-gray-100 rounded-xl shadow-lg flex flex-col">

            {/* SLIDE */}
            <div className="relative flex-1">
              <Image
                src={slides[current]}
                alt={`Slide ${current + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* CONTROLES */}
            <div className="flex justify-between items-center px-10 py-4 bg-white">
              <button onClick={prev} className="px-5 py-2 bg-gray-800 text-white rounded">
                ← Anterior
              </button>

              <span className="text-sm text-gray-600">
                {current + 1} / {slides.length}
              </span>

              <button onClick={next} className="px-5 py-2 bg-gray-800 text-white rounded">
                Siguiente →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONTACTO ================= */}
      {showContact && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowContact(false)}
              className="absolute top-4 right-4 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Concertar cita</h2>

            <form className="space-y-4">
              <input className="w-full border px-3 py-2 rounded" placeholder="Empresa" />
              <input className="w-full border px-3 py-2 rounded" placeholder="Nombre" />
              <input className="w-full border px-3 py-2 rounded" placeholder="Teléfono" />
              <input className="w-full border px-3 py-2 rounded" placeholder="Email" />
              <input className="w-full border px-5 py-5 rounded" placeholder="Observaciones" />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
              >
                Enviar solicitud
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
