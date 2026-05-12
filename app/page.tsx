'use client';

import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';

import Modal from './components/Modal';

type FlowModule = {
  number: string;
  title: string;
  body: string;
  image: string;
};

type PlatformCard = {
  title: string;
  image: string;
};

type OperationalControl = {
  title: string;
  body: string;
  badge: string;
  image: string;
};

type LegalModal = 'aviso' | 'privacidad' | 'cookies' | null;

type CookieChoice = 'accepted' | 'rejected' | 'configured' | null;

const platformCards: PlatformCard[] = [
  {
    title: 'Un flujo, no módulos aislados',
    image: '/cards/01-flujo-conectado.png',
  },
  {
    title: 'Pensada para FPE',
    image: '/cards/02-fpe-operativa.png',
  },
  {
    title: 'Escalable y multientidad',
    image: '/cards/03-red-multientidad.png',
  },
];

const flowModules: FlowModule[] = [
  {
    number: '01',
    title: 'Captación de personas',
    body: 'Registra solicitudes, oportunidades y primeros contactos desde una vista operativa.',
    image: '/slides/01-captacion-personas.png',
  },
  {
    number: '02',
    title: 'Personas en flujo formativo',
    body: 'Organiza el seguimiento de cada persona hasta su matrícula o derivación.',
    image: '/slides/02-personas-flujo-formativo.png',
  },
  {
    number: '03',
    title: 'Matrículas',
    body: 'Formaliza inscripciones vinculadas a acción formativa, convocatoria y academia.',
    image: '/slides/03-matriculas.png',
  },
  {
    number: '04',
    title: 'Alumnado',
    body: 'Centraliza la ficha, el estado y el histórico formativo de cada alumno.',
    image: '/slides/04-alumnado.png',
  },
  {
    number: '05',
    title: 'Oferta formativa',
    body: 'Gestiona acciones formativas, certificados profesionales y convocatorias.',
    image: '/slides/05-oferta-formativa.png',
  },
  {
    number: '06',
    title: 'Planificación',
    body: 'Coordina aulas, docentes, fechas, horarios y recursos desde una vista común.',
    image: '/slides/06-planificacion.png',
  },
  {
    number: '07',
    title: 'Cursos en ejecución',
    body: 'Sigue cursos activos, próximos arranques, finalizados y pendientes de planificar.',
    image: '/slides/07-cursos-ejecucion.png',
  },
  {
    number: '08',
    title: 'Comunicación interna',
    body: 'Conecta agenda, mensajería, llamadas, prioridades y actividad diaria del equipo.',
    image: '/slides/08-comunicacion-interna.png',
  },
  {
    number: '09',
    title: 'Panel de control',
    body: 'Consulta indicadores, listados y trazabilidad para tomar decisiones con información ordenada.',
    image: '/slides/09-panel-control.png',
  },
];

const operationalControls: OperationalControl[] = [
  {
    title: 'Antiduplicados en captación',
    body: 'Ayuda a evitar registros repetidos de la misma persona y mantiene unido el seguimiento desde el primer contacto.',
    badge: 'Captación',
    image: '/controles/01-antiduplicados-captacion.png',
  },
  {
    title: 'Control de llamadas repetidas',
    body: 'Reduce el riesgo de llamar varias veces a la misma persona desde la misma academia en un mismo día.',
    badge: 'Llamadas',
    image: '/controles/02-control-llamadas-repetidas.png',
  },
  {
    title: 'Alarmas de planificación',
    body: 'Detecta solapamientos de aulas, docentes, fechas y horarios antes de que afecten al arranque de una acción formativa.',
    badge: 'Planificación',
    image: '/controles/03-alarmas-planificacion.png',
  },
  {
    title: 'Mensajería interna',
    body: 'Permite coordinar al equipo dentro de la propia plataforma, sin depender de conversaciones dispersas.',
    badge: 'Equipo',
    image: '/controles/04-mensajeria-interna.png',
  },
  {
    title: 'Agenda operativa',
    body: 'Centraliza citas, tareas, llamadas y seguimiento diario para que cada usuario trabaje con prioridades claras.',
    badge: 'Agenda',
    image: '/controles/05-agenda-operativa.png',
  },
  {
    title: 'Trazabilidad de actividad',
    body: 'Registra navegación y acciones relevantes para saber qué se hizo, cuándo y desde qué módulo operativo.',
    badge: 'Control',
    image: '/controles/06-trazabilidad-actividad.png',
  },
];

function ContactForm({ onSent }: { onSent: () => void }) {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSending(true);
    setOk(null);

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Error enviando el formulario');
      }

      setOk(true);
      formEl.reset();
      onSent();
    } catch {
      setOk(false);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-[300px]">
      <p className="mb-3 text-[12px] leading-5 text-slate-600">
        Déjanos tus datos y te contactamos para enseñarte Coforma con calma.
      </p>

      <form onSubmit={onSubmit} className="space-y-2">
        <input
          name="company"
          type="text"
          required
          placeholder="Empresa"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[12px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-700"
        />

        <input
          name="name"
          type="text"
          required
          placeholder="Nombre"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[12px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-700"
        />

        <input
          name="phone"
          type="text"
          placeholder="Teléfono"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[12px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-700"
        />

        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[12px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-700"
        />

        <textarea
          name="notes"
          rows={3}
          placeholder="Observaciones"
          className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-[12px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-700"
        />

        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-lg bg-emerald-600 px-3 py-2 text-[12px] font-bold text-white transition hover:bg-emerald-700 disabled:opacity-60"
        >
          {sending ? 'Enviando…' : 'Enviar solicitud'}
        </button>

        {ok === false && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] font-semibold text-rose-800">
            No se pudo enviar ahora mismo. Prueba de nuevo.
          </div>
        )}
      </form>
    </div>
  );
}

function LegalContent({ type }: { type: LegalModal }) {
  if (type === 'aviso') {
    return (
      <div className="space-y-5 text-[13px] leading-6 text-slate-700">
        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">1. Titular del sitio web</h3>
          <p className="mt-2">
            En cumplimiento de la normativa aplicable en materia de servicios de la sociedad de
            la información, se informa de que el titular del sitio web https://coforma.es y de la
            marca comercial Coforma es:
          </p>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p><strong>Titular:</strong> Antonio Manuel Barragán Cabrera</p>
            <p><strong>NIF:</strong> 42884234K</p>
            <p><strong>Domicilio profesional:</strong> Avda. El Mirón, nº22 1º C, 35400 Arucas, Las Palmas, España</p>
            <p><strong>Correo electrónico:</strong> admin@coforma.es</p>
            <p><strong>Teléfono:</strong> +34 649 220 045</p>
            <p><strong>Nombre comercial:</strong> Coforma</p>
          </div>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">2. Actividad</h3>
          <p className="mt-2">
            Coforma ofrece servicios vinculados a la gestión de bases de datos, organización
            operativa y CRM integral en el ámbito de la Formación Profesional para el Empleo,
            orientado a academias, entidades de formación y estructuras vinculadas a la gestión
            formativa.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">3. Condiciones de uso</h3>
          <p className="mt-2">
            El acceso y uso de este sitio web atribuye la condición de usuario e implica la
            aceptación de este aviso legal. El usuario se compromete a utilizar la web, sus
            contenidos y servicios de forma lícita, diligente y conforme a la buena fe, absteniéndose
            de realizar cualquier actuación que pueda dañar, inutilizar, sobrecargar o deteriorar
            el sitio web o impedir su normal utilización.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">4. Propiedad intelectual e industrial</h3>
          <p className="mt-2">
            Los contenidos de este sitio web, incluyendo textos, estructura, diseño, elementos
            visuales, denominación comercial, imágenes, logotipos y materiales relacionados con
            Coforma, son titularidad de su responsable o se utilizan con autorización o licencia
            suficiente. Queda prohibida su reproducción, distribución, comunicación pública o
            transformación sin autorización expresa, salvo en los casos legalmente permitidos.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">5. Responsabilidad</h3>
          <p className="mt-2">
            El titular procura que la información disponible en la web sea clara, actualizada y
            correcta. No obstante, no se garantiza la inexistencia de errores puntuales, interrupciones
            técnicas o falta de disponibilidad temporal del sitio. Coforma no se hace responsable
            del uso indebido que los usuarios puedan realizar de los contenidos publicados.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">6. Enlaces externos</h3>
          <p className="mt-2">
            Este sitio puede incluir enlaces a sitios web de terceros. Coforma no controla ni asume
            responsabilidad sobre el contenido, políticas o prácticas de dichos sitios externos,
            correspondiendo al usuario revisar sus condiciones propias.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">7. Legislación aplicable</h3>
          <p className="mt-2">
            Este aviso legal se rige por la legislación española. Para cualquier controversia que
            pudiera derivarse del acceso o uso del sitio web, las partes se someterán a los juzgados
            y tribunales que resulten competentes conforme a la normativa aplicable.
          </p>
        </section>
      </div>
    );
  }

  if (type === 'privacidad') {
    return (
      <div className="space-y-5 text-[13px] leading-6 text-slate-700">
        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">1. Responsable del tratamiento</h3>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p><strong>Responsable:</strong> Antonio Manuel Barragán Cabrera</p>
            <p><strong>NIF:</strong> 42884234K</p>
            <p><strong>Domicilio:</strong> Avda. El Mirón, nº22 1º C, 35400 Arucas, Las Palmas, España</p>
            <p><strong>Email de contacto y derechos:</strong> admin@coforma.es</p>
            <p><strong>Marca comercial:</strong> Coforma</p>
          </div>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">2. Datos personales tratados</h3>
          <p className="mt-2">
            A través del formulario de solicitud de demo o contacto, Coforma puede tratar los
            siguientes datos: empresa, nombre, teléfono, dirección de correo electrónico y
            observaciones facilitadas voluntariamente por el usuario.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">3. Finalidades del tratamiento</h3>
          <p className="mt-2">Los datos se tratarán para las siguientes finalidades:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Atender solicitudes de información recibidas a través de la web.</li>
            <li>Contactar con la persona interesada para concertar o ampliar información sobre una demo.</li>
            <li>Gestionar comunicaciones precontractuales o comerciales solicitadas por el usuario.</li>
            <li>Responder consultas relacionadas con Coforma y sus servicios.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">4. Legitimación</h3>
          <p className="mt-2">
            La base jurídica para el tratamiento de los datos es el consentimiento del usuario al
            enviar el formulario y el interés precontractual o comercial derivado de la solicitud
            realizada. El usuario puede retirar su consentimiento en cualquier momento escribiendo
            a admin@coforma.es.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">5. Destinatarios y proveedores</h3>
          <p className="mt-2">
            Los datos no se cederán a terceros salvo obligación legal. Las solicitudes enviadas
            desde la web se reciben por correo electrónico y pueden ser gestionadas mediante
            servicios de correo como Outlook/Microsoft para responder a la persona interesada.
          </p>
          <p className="mt-2">
            La web y la aplicación asociada pueden apoyarse en proveedores tecnológicos necesarios
            para su funcionamiento, alojamiento, despliegue o mantenimiento técnico.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">6. Conservación</h3>
          <p className="mt-2">
            Los datos se conservarán durante el tiempo necesario para atender la solicitud,
            mantener la relación precontractual o comercial derivada de la misma y, posteriormente,
            durante los plazos necesarios para atender posibles responsabilidades legales.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">7. Derechos de las personas interesadas</h3>
          <p className="mt-2">
            Las personas interesadas pueden ejercer sus derechos de acceso, rectificación,
            supresión, oposición, limitación del tratamiento y portabilidad, cuando proceda,
            escribiendo a admin@coforma.es e indicando el derecho que desean ejercer.
          </p>
          <p className="mt-2">
            También podrán presentar una reclamación ante la Agencia Española de Protección de
            Datos si consideran que el tratamiento de sus datos no se ajusta a la normativa vigente.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">8. Seguridad</h3>
          <p className="mt-2">
            Coforma aplicará medidas técnicas y organizativas razonables para proteger los datos
            personales frente a pérdida, uso indebido, acceso no autorizado o divulgación indebida,
            teniendo en cuenta la naturaleza de los datos tratados y el contexto del tratamiento.
          </p>
        </section>
      </div>
    );
  }

  if (type === 'cookies') {
    return (
      <div className="space-y-5 text-[13px] leading-6 text-slate-700">
        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">1. Qué son las cookies</h3>
          <p className="mt-2">
            Las cookies son pequeños archivos que se almacenan en el dispositivo del usuario
            cuando visita un sitio web. Pueden utilizarse para permitir el funcionamiento técnico
            de la página, recordar preferencias o medir el uso del sitio, entre otras finalidades.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">2. Cookies utilizadas en Coforma</h3>
          <p className="mt-2">
            En esta fase, coforma.es utiliza una preferencia local necesaria para recordar la
            decisión del usuario sobre cookies. Esta preferencia evita mostrar de nuevo el aviso
            una vez que el usuario ha aceptado, rechazado o configurado su elección.
          </p>
          <p className="mt-2">
            La web puede incorporar próximamente herramientas de medición como Google Analytics
            y Vercel Analytics. En caso de activarse cookies o tecnologías analíticas sujetas a
            consentimiento, solo se utilizarán cuando el usuario haya aceptado o configurado
            favorablemente dicha categoría.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">3. Tipos de cookies o tecnologías previstas</h3>
          <div className="mt-3 space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-extrabold text-slate-950">Técnicas o necesarias</p>
              <p className="mt-1">
                Permiten el funcionamiento básico de la web y recordar la preferencia del usuario
                sobre cookies. No requieren consentimiento cuando son estrictamente necesarias.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-extrabold text-slate-950">Analíticas o de medición</p>
              <p className="mt-1">
                Permiten conocer de forma agregada cómo se utiliza la web para mejorar su contenido,
                rendimiento y experiencia de usuario. Podrán incluir herramientas como Google
                Analytics o Vercel Analytics si se activan posteriormente.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">4. Cómo gestionar las cookies</h3>
          <p className="mt-2">
            El usuario puede aceptar, rechazar o configurar las cookies desde el banner inicial.
            También puede borrar o bloquear cookies desde la configuración de su navegador.
          </p>
          <p className="mt-2">
            Si el usuario rechaza las cookies analíticas, la web seguirá funcionando con normalidad,
            aunque no se utilizarán mediciones no necesarias sujetas a consentimiento.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">5. Responsable</h3>
          <p className="mt-2">
            El responsable del sitio web es Antonio Manuel Barragán Cabrera, titular de la marca
            comercial Coforma. Para cualquier cuestión relacionada con esta política puede escribir
            a admin@coforma.es.
          </p>
        </section>
      </div>
    );
  }

  return null;
}

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);

  const [openContact, setOpenContact] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [legalModal, setLegalModal] = useState<LegalModal>(null);
  const [sentMsg, setSentMsg] = useState(false);
  const [selectedModule, setSelectedModule] = useState<FlowModule | null>(null);
  const [selectedPlatformCard, setSelectedPlatformCard] = useState<PlatformCard | null>(null);
  const [selectedControl, setSelectedControl] = useState<OperationalControl | null>(null);

  const [cookieChoice, setCookieChoice] = useState<CookieChoice>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [openCookieConfig, setOpenCookieConfig] = useState(false);
  const [analyticsCookies, setAnalyticsCookies] = useState(false);

  useEffect(() => {
    const storedChoice = window.localStorage.getItem('coforma_cookie_choice') as CookieChoice;
    const storedAnalytics = window.localStorage.getItem('coforma_cookie_analytics');

    if (storedChoice) {
      setCookieChoice(storedChoice);
      setAnalyticsCookies(storedAnalytics === 'true');
      setShowCookieBanner(false);
    } else {
      setShowCookieBanner(true);
    }
  }, []);

  const saveCookieChoice = (choice: Exclude<CookieChoice, null>, analytics: boolean) => {
    window.localStorage.setItem('coforma_cookie_choice', choice);
    window.localStorage.setItem('coforma_cookie_analytics', String(analytics));
    setCookieChoice(choice);
    setAnalyticsCookies(analytics);
    setShowCookieBanner(false);
    setOpenCookieConfig(false);
  };

  const openDemoRequest = () => {
    setSelectedModule(null);
    setSelectedPlatformCard(null);
    setSelectedControl(null);
    setOpenAbout(false);
    setLegalModal(null);
    setSentMsg(false);
    setOpenContact(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_48%_-8%,rgba(16,185,129,0.15),transparent_62%),radial-gradient(780px_420px_at_8%_18%,rgba(2,132,199,0.07),transparent_58%),radial-gradient(780px_420px_at_92%_20%,rgba(148,163,184,0.13),transparent_58%)]" />
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-6">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Ir al inicio">
          <div className="flex items-center gap-2">
            <Image
              src="/coforma-isotipo.png"
              alt="Coforma"
              width={38}
              height={38}
              className="h-9 w-9 object-contain"
              priority
            />
            <span className="text-[21px] font-extrabold tracking-tight">
              <span className="text-emerald-600">Co</span>
              <span className="text-slate-900">forma</span>
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-4 text-sm font-semibold text-slate-700 md:flex">
          <a
            href="https://app.coforma.es/login"
            className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100"
          >
            Área clientes
          </a>

          <a href="#plataforma" className="hover:text-slate-950">
            Plataforma
          </a>

          <a href="#flujo" className="hover:text-slate-950">
            Flujo formativo
          </a>

          <a href="#controles" className="hover:text-slate-950">
            Controles
          </a>

          <button
            type="button"
            onClick={openDemoRequest}
            className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
          >
            Contacto
          </button>
        </nav>
      </header>

      <main>
        <section id="inicio" className="mx-auto max-w-6xl px-5 pb-6 pt-3 sm:px-6">
          <div className="rounded-[30px] border border-slate-200 bg-white/72 p-6 shadow-[0_18px_58px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8">
            <div className="grid items-center gap-7 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="max-w-[590px]">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[13px] font-semibold text-emerald-900">
                  Gestión integral para <span className="font-extrabold">academias</span> →
                </div>

                <h1 className="mt-5 text-[25px] font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-[30px] lg:text-[34px]">
                  Todo el <span className="text-emerald-700">flujo formativo</span>, conectado y
                  bajo control.
                </h1>

                <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-700 sm:text-[16px]">
                  Coforma centraliza captación, matrículas, alumnado, planificación,
                  comunicación y control operativo en una sola plataforma para academias
                  y entidades de Formación Profesional para el Empleo.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={openDemoRequest}
                    className="rounded-2xl bg-emerald-600 px-6 py-3 text-[15px] font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition hover:bg-emerald-700"
                  >
                    Solicitar Demo
                  </button>

                  <a
                    href="#flujo"
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-[15px] font-extrabold text-slate-900 transition hover:bg-slate-50"
                  >
                    Ver flujo operativo
                  </a>
                </div>

                <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-3">
                  {[
                    ['Multientidad', 'Redes de academias y usuarios por roles.'],
                    ['Trazabilidad', 'Cada paso queda vinculado al flujo formativo.'],
                    ['Control operativo', 'Indicadores y tareas en un mismo entorno.'],
                  ].map(([title, body]) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3"
                    >
                      <div className="text-[12px] font-extrabold text-slate-950">{title}</div>
                      <div className="mt-1 text-[11px] leading-4 text-slate-600">{body}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-[36px] bg-[radial-gradient(460px_280px_at_52%_48%,rgba(16,185,129,0.12),transparent_66%)]" />
                <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.13)]">
                  <Image
                    src="/hero/coforma-hero-operaciones.png"
                    alt="Equipo coordinando la gestión formativa desde una plataforma integral"
                    width={1100}
                    height={690}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="plataforma" className="mx-auto max-w-6xl px-5 pb-6 sm:px-6">
          <div className="grid gap-4 lg:grid-cols-3">
            {platformCards.map((card) => (
              <button
                key={card.title}
                type="button"
                onClick={() => setSelectedPlatformCard(card)}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-[0_14px_42px_rgba(15,23,42,0.07)] backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_16px_46px_rgba(15,23,42,0.10)]"
                aria-label={`Ampliar imagen: ${card.title}`}
              >
                <div className="relative h-[255px] w-full overflow-hidden bg-white p-2">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain transition duration-300 group-hover:scale-[1.015]"
                  />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="flujo" className="mx-auto max-w-6xl px-5 pb-6 sm:px-6">
          <div className="rounded-[30px] border border-slate-200 bg-white/78 p-5 shadow-[0_16px_52px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-emerald-700">
                  Flujo formativo completo
                </div>
                <h2 className="mt-2 text-[23px] font-extrabold tracking-tight text-slate-950">
                  De la captación al panel de control.
                </h2>
              </div>

              <p className="max-w-[460px] text-[13px] leading-6 text-slate-600">
                Haz clic en cada módulo para ver una captura real de la aplicación.
              </p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {flowModules.map((module) => (
                <button
                  key={module.number}
                  type="button"
                  onClick={() => setSelectedModule(module)}
                  className="group rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-[0_14px_38px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[12px] font-extrabold text-emerald-800 ring-1 ring-emerald-100">
                      {module.number}
                    </div>

                    <div>
                      <h3 className="text-[15px] font-extrabold leading-5 text-slate-950">
                        {module.title}
                      </h3>

                      <p className="mt-2 text-[12px] leading-5 text-slate-600">
                        {module.body}
                      </p>

                      <div className="mt-3 inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[12px] font-extrabold text-emerald-700 transition group-hover:border-emerald-200 group-hover:bg-emerald-100">
                        Ver módulo →
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="controles" className="mx-auto max-w-6xl px-5 pb-6 sm:px-6">
          <div className="rounded-[30px] border border-slate-200 bg-white/78 p-5 shadow-[0_16px_52px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <div className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-emerald-700">
                  Controles operativos integrados
                </div>

                <h2 className="mt-2 text-[23px] font-extrabold tracking-tight text-slate-950">
                  Pequeños controles que evitan errores reales.
                </h2>

                <p className="mt-3 text-[14px] leading-7 text-slate-700">
                  Coforma no solo ordena pantallas: incorpora avisos, reglas y trazabilidad
                  para reducir duplicidades, mejorar la coordinación interna y anticipar
                  incidencias antes de que afecten al trabajo diario.
                </p>

                <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-[12px] font-semibold leading-5 text-emerald-900">
                  El valor no está solo en gestionar más datos, sino en evitar llamadas
                  repetidas, matrículas duplicadas, solapamientos y tareas invisibles.
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {operationalControls.map((control) => (
                  <article
                    key={control.title}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/25"
                  >
                    <div className="mb-2 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
                      {control.badge}
                    </div>

                    <h3 className="text-[14px] font-extrabold leading-5 text-slate-950">
                      {control.title}
                    </h3>

                    <p className="mt-2 text-[12px] leading-5 text-slate-600">
                      {control.body}
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelectedControl(control)}
                      className="mt-3 inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[12px] font-extrabold text-emerald-700 transition hover:border-emerald-200 hover:bg-emerald-100"
                    >
                      Ver más →
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="mx-auto max-w-6xl px-5 pb-10 sm:px-6">
          <div className="rounded-[30px] border border-emerald-200 bg-emerald-50/70 p-6 text-center shadow-[0_16px_48px_rgba(15,23,42,0.07)] sm:p-7">
            <h2 className="text-[22px] font-extrabold tracking-tight text-slate-950">
              ¿Quieres ver Coforma aplicado a tu academia?
            </h2>

            <p className="mx-auto mt-3 max-w-[620px] text-[14px] leading-6 text-slate-700">
              Solicita una demo y revisamos contigo cómo encaja la plataforma en tu flujo
              de captación, matrícula, planificación y seguimiento.
            </p>

            <button
              type="button"
              onClick={openDemoRequest}
              className="mt-5 rounded-2xl bg-emerald-600 px-6 py-3 text-[15px] font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.20)] transition hover:bg-emerald-700"
            >
              Solicitar Demo
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/78">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-7 text-[13px] text-slate-600 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/coforma-isotipo.png"
                alt="Coforma"
                width={34}
                height={34}
                className="h-8 w-8 object-contain"
              />
              <span className="text-[19px] font-extrabold tracking-tight">
                <span className="text-emerald-600">Co</span>
                <span className="text-slate-900">forma</span>
              </span>
            </div>

            <p className="mt-3 max-w-[320px] leading-6">
              Plataforma integral para la gestión del flujo formativo en academias
              y entidades de Formación Profesional para el Empleo.
            </p>
          </div>

          <div>
            <div className="font-extrabold text-slate-950">Producto</div>
            <div className="mt-3 space-y-2">
              <a href="#plataforma" className="block hover:text-slate-950">
                Plataforma
              </a>
              <a href="#flujo" className="block hover:text-slate-950">
                Flujo operativo
              </a>
              <a href="#controles" className="block hover:text-slate-950">
                Controles
              </a>
              <button
                type="button"
                onClick={() => setOpenAbout(true)}
                className="block text-left hover:text-slate-950"
              >
                Quiénes somos
              </button>
            </div>
          </div>

          <div>
            <div className="font-extrabold text-slate-950">Acceso</div>
            <div className="mt-3 space-y-2">
              <a
                href="https://app.coforma.es/login"
                className="block text-emerald-700 hover:text-emerald-800"
              >
                Área clientes
              </a>
              <button
                type="button"
                onClick={openDemoRequest}
                className="block text-left hover:text-slate-950"
              >
                Solicitar demo
              </button>
            </div>
          </div>

          <div>
            <div className="font-extrabold text-slate-950">Legal</div>
            <div className="mt-3 space-y-2">
              <button
                type="button"
                onClick={() => setLegalModal('aviso')}
                className="block text-left hover:text-slate-950"
              >
                Aviso legal
              </button>

              <button
                type="button"
                onClick={() => setLegalModal('privacidad')}
                className="block text-left hover:text-slate-950"
              >
                Política de privacidad
              </button>

              <button
                type="button"
                onClick={() => setLegalModal('cookies')}
                className="block text-left hover:text-slate-950"
              >
                Política de cookies
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-5 py-4 text-center text-[12px] font-semibold text-slate-500">
          © {year} Coforma · Todos los derechos reservados.
        </div>
      </footer>

      {showCookieBanner && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-4 shadow-[0_-14px_40px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-[14px] font-extrabold text-slate-950">Uso de cookies</div>
              <p className="mt-1 text-[12px] leading-5 text-slate-600">
                Utilizamos cookies técnicas necesarias para el funcionamiento de la web y,
                si lo aceptas, podremos usar cookies o tecnologías analíticas para medir el uso
                del sitio y mejorar Coforma.
              </p>
              <button
                type="button"
                onClick={() => setLegalModal('cookies')}
                className="mt-1 text-[12px] font-bold text-emerald-700 hover:text-emerald-800"
              >
                Ver política de cookies
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => saveCookieChoice('rejected', false)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-[12px] font-extrabold text-slate-800 transition hover:bg-slate-50"
              >
                Rechazar
              </button>

              <button
                type="button"
                onClick={() => setOpenCookieConfig(true)}
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-[12px] font-extrabold text-emerald-800 transition hover:bg-emerald-100"
              >
                Configurar
              </button>

              <button
                type="button"
                onClick={() => saveCookieChoice('accepted', true)}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-[12px] font-extrabold text-white transition hover:bg-emerald-700"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        open={Boolean(selectedPlatformCard)}
        title={selectedPlatformCard ? selectedPlatformCard.title : 'Coforma'}
        onClose={() => setSelectedPlatformCard(null)}
        maxWidthClass="max-w-6xl"
      >
        {selectedPlatformCard && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="relative h-[260px] w-full sm:h-[520px] lg:h-[660px]">
              <Image
                src={selectedPlatformCard.image}
                alt={selectedPlatformCard.title}
                fill
                sizes="95vw"
                className="object-contain"
              />
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={Boolean(selectedModule)}
        title={selectedModule ? selectedModule.title : 'Módulo Coforma'}
        onClose={() => setSelectedModule(null)}
        maxWidthClass="max-w-5xl"
      >
        {selectedModule && (
          <div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <div className="relative h-[260px] w-full sm:h-[420px] lg:h-[520px]">
                <Image
                  src={selectedModule.image}
                  alt={selectedModule.title}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <div className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                  Módulo {selectedModule.number}
                </div>
                <p className="mt-2 text-[14px] leading-6 text-slate-700">
                  {selectedModule.body}
                </p>
              </div>

              <button
                type="button"
                onClick={openDemoRequest}
                className="rounded-2xl bg-emerald-600 px-5 py-3 text-[14px] font-extrabold text-white shadow-[0_14px_30px_rgba(16,185,129,0.18)] transition hover:bg-emerald-700"
              >
                Solicitar Demo
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={Boolean(selectedControl)}
        title={selectedControl ? selectedControl.title : 'Control operativo'}
        onClose={() => setSelectedControl(null)}
        maxWidthClass="max-w-6xl"
      >
        {selectedControl && (
          <div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative h-[260px] w-full sm:h-[520px] lg:h-[660px]">
                <Image
                  src={selectedControl.image}
                  alt={selectedControl.title}
                  fill
                  sizes="95vw"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <div className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                  {selectedControl.badge}
                </div>
                <p className="mt-2 text-[14px] leading-6 text-slate-700">
                  {selectedControl.body}
                </p>
              </div>

              <button
                type="button"
                onClick={openDemoRequest}
                className="rounded-2xl bg-emerald-600 px-5 py-3 text-[14px] font-extrabold text-white shadow-[0_14px_30px_rgba(16,185,129,0.18)] transition hover:bg-emerald-700"
              >
                Solicitar Demo
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={openAbout}
        title="Quiénes somos"
        onClose={() => setOpenAbout(false)}
        maxWidthClass="max-w-2xl"
      >
        <div className="space-y-4 text-[14px] leading-7 text-slate-700">
          <p>
            Coforma nace para ordenar la gestión diaria de entidades de formación,
            academias y equipos que necesitan una visión completa del flujo formativo.
          </p>

          <p>
            La plataforma conecta captación, matrícula, alumnado, oferta formativa,
            planificación, comunicación interna y control operativo en un único entorno
            preparado para trabajar con trazabilidad y criterio de gestión real.
          </p>

          <p className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-[13px] font-semibold text-emerald-900">
            Nuestro objetivo es convertir procesos dispersos en un flujo operativo claro,
            conectado y preparado para crecer.
          </p>
        </div>
      </Modal>

      <Modal
        open={Boolean(legalModal)}
        title={
          legalModal === 'aviso'
            ? 'Aviso legal'
            : legalModal === 'privacidad'
              ? 'Política de privacidad'
              : legalModal === 'cookies'
                ? 'Política de cookies'
                : 'Información legal'
        }
        onClose={() => setLegalModal(null)}
        maxWidthClass="max-w-3xl"
      >
        <LegalContent type={legalModal} />
      </Modal>

      <Modal
        open={openCookieConfig}
        title="Configurar cookies"
        onClose={() => setOpenCookieConfig(false)}
        maxWidthClass="max-w-md"
      >
        <div className="space-y-4 text-[13px] leading-6 text-slate-700">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="font-extrabold text-slate-950">Cookies técnicas necesarias</div>
            <p className="mt-1">
              Son necesarias para el funcionamiento básico de la web y para recordar tu
              preferencia de cookies.
            </p>
            <div className="mt-2 text-[12px] font-extrabold text-slate-500">Siempre activas</div>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <input
              type="checkbox"
              checked={analyticsCookies}
              onChange={(e) => setAnalyticsCookies(e.target.checked)}
              className="mt-1 h-4 w-4 accent-emerald-600"
            />
            <span>
              <span className="block font-extrabold text-slate-950">Cookies analíticas</span>
              <span className="mt-1 block text-slate-600">
                Permiten medir el uso de la web para mejorar contenidos, rendimiento y experiencia.
                Podrán incluir Google Analytics o Vercel Analytics cuando se activen.
              </span>
            </span>
          </label>

          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => saveCookieChoice('rejected', false)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-[12px] font-extrabold text-slate-800 transition hover:bg-slate-50"
            >
              Rechazar
            </button>

            <button
              type="button"
              onClick={() => saveCookieChoice('configured', analyticsCookies)}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-[12px] font-extrabold text-white transition hover:bg-emerald-700"
            >
              Guardar configuración
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={openContact}
        title="Solicitar Demo"
        onClose={() => setOpenContact(false)}
        maxWidthClass="max-w-sm"
      >
        {sentMsg ? (
          <div className="mx-auto max-w-[300px] rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-3 text-[12px] font-bold text-emerald-800">
            Mensaje enviado. Te contactaremos lo antes posible.
          </div>
        ) : (
          <ContactForm onSent={() => setSentMsg(true)} />
        )}
      </Modal>
    </div>
  );
}