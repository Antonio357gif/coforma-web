import Link from "next/link";

export const dynamic = "force-dynamic";

type TarifaPublica = {
  id: number;
  tipo: "tarifa" | "oferta";
  titulo: string;
  descripcion: string;
  modalidad: "mensual" | "anual" | "unico" | "consultar";
  moneda: string;
  importe: number | null;
  importe_anterior: number | null;
  condicion_fiscal: string;
  orden: number;
};

async function consultarCatalogo(): Promise<{ items: TarifaPublica[]; disponible: boolean }> {
  // Punto único de conexión con la Consola: ningún precio se define aquí.
  const base = process.env.COFORMA_CATALOGO_API_URL ??
    "https://app.coforma.es/api/publico/catalogo-comercial";
  try {
    const respuesta = await fetch(base, { cache: "no-store" });
    if (!respuesta.ok) return { items: [], disponible: false };
    const datos: unknown = await respuesta.json();
    if (!datos || typeof datos !== "object" || !("items" in datos) ||
        !Array.isArray((datos as { items: unknown }).items)) return { items: [], disponible: false };
    return { items: (datos as { items: TarifaPublica[] }).items, disponible: true };
  } catch {
    return { items: [], disponible: false };
  }
}
const formatearImporte = (value: number, moneda: string) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: moneda }).format(value);
const modalidadEtiqueta: Record<TarifaPublica["modalidad"], string> = {
  mensual: "/ mes", anual: "/ año", unico: "pago único", consultar: "condiciones a consultar",
};

export default async function TarifasPage() {
  const { items, disponible } = await consultarCatalogo();
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-6">
        <Link href="/" className="text-2xl font-black"><span className="text-emerald-600">Co</span>forma</Link>
        <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-950">Volver a la web</Link>
      </header>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-10">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Coforma SaaS</p>
        <h1 className="mt-2 text-3xl font-black md:text-4xl">Tarifas y ofertas</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Las condiciones publicadas aquí se gestionan desde la Consola Coforma y pueden actualizarse sin modificar esta web.
        </p>
        {!disponible && <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          El catálogo comercial no está disponible en este momento. Puedes contactar para recibir una propuesta.
        </p>}
        {disponible && items.length === 0 && <p className="mt-8 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
          Actualmente no hay tarifas u ofertas públicas. Solicita una propuesta adaptada a tu empresa o grupo.
        </p>}
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">{item.tipo}</p>
              <h2 className="mt-2 text-xl font-bold">{item.titulo}</h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">{item.descripcion}</p>
              <div className="mt-6">
                {item.importe_anterior != null && item.importe != null && item.importe_anterior > item.importe &&
                  <p className="text-sm text-slate-500 line-through">{formatearImporte(item.importe_anterior,item.moneda)}</p>}
                <p className="text-2xl font-black">
                  {item.importe === null ? "Consultar condiciones" : formatearImporte(item.importe,item.moneda)}
                </p>
                <p className="mt-1 text-xs text-slate-500">{modalidadEtiqueta[item.modalidad]} · {item.condicion_fiscal}</p>
              </div>
              <a href="mailto:admin@coforma.es?subject=Consulta%20comercial%20Coforma"
                className="mt-6 inline-block rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white">
                Solicitar propuesta
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
