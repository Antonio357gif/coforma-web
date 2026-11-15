'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { startHeroCube } from './hero-cube-renderer';

export default function HeroCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<ReturnType<typeof startHeroCube>>(undefined);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const animation = startHeroCube(canvasRef.current, () => setReady(true), setPaused);
    animationRef.current = animation;
    return () => animation?.dispose();
  }, []);

  return (
    <figure
      className="relative m-0 h-[clamp(250px,53vw,360px)] overflow-hidden rounded-[29px] bg-[#030507] lg:h-[clamp(310px,34vw,422px)]"
      aria-label="Cubo de Coforma"
    >
      {!ready && (
        <Image
          src="/hero/cubo-portada.webp"
          fill
          sizes="(max-width: 1023px) 90vw, 540px"
          alt="Cubo tridimensional con el isotipo de Coforma en una de sus caras"
          className="object-contain"
        />
      )}
      <canvas
        ref={canvasRef}
        role="img"
        aria-hidden={!ready}
        aria-label="Cubo tridimensional que muestra el isotipo y el nombre de Coforma en caras distintas, se mezcla y repite el ciclo"
        className={`relative block h-full w-full ${ready ? '' : 'invisible'}`}
      />
      {ready && (
        <div className="absolute bottom-2 right-2 flex gap-1.5">
          <button
            type="button"
            onClick={() => animationRef.current?.replay()}
            className="min-h-11 rounded-full border border-[#415553] bg-[#080f0f] px-3 text-xs font-medium text-emerald-50 hover:bg-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            Repetir
          </button>
          <button
            type="button"
            onClick={() => animationRef.current?.togglePause()}
            className="min-h-11 rounded-full border border-[#415553] bg-[#080f0f] px-3 text-xs font-medium text-emerald-50 hover:bg-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            {paused ? 'Continuar' : 'Pausar'}
          </button>
        </div>
      )}
    </figure>
  );
}
