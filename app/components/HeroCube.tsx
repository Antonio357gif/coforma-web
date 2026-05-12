'use client';

export default function HeroCube() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-[28px] bg-transparent sm:h-[340px] lg:h-[390px]">
      <div className="hero-perspective absolute inset-0 flex items-center justify-center bg-transparent">
        <img
          src="/hero/hero-apples.jpg"
          alt="Coforma - Plataforma integral de gestión formativa"
          className="hero-apples-image h-auto w-[94%] max-w-[650px] select-none rounded-[22px] object-contain"
          draggable={false}
        />
      </div>

      <style jsx>{`
        .hero-perspective {
          perspective: 1200px;
          perspective-origin: center center;
        }

        .hero-apples-image {
          animation: heroSpin 12s linear infinite;
          transform-origin: center center;
          transform-style: preserve-3d;
          filter: drop-shadow(0 22px 34px rgba(15, 23, 42, 0.16));
          will-change: transform;
        }

        @keyframes heroSpin {
          0% {
            transform: rotateY(0deg) rotateX(0deg) translateY(0px) scale(1);
          }

          25% {
            transform: rotateY(90deg) rotateX(1deg) translateY(-5px) scale(1.01);
          }

          50% {
            transform: rotateY(180deg) rotateX(0deg) translateY(-8px) scale(1);
          }

          75% {
            transform: rotateY(270deg) rotateX(-1deg) translateY(-5px) scale(1.01);
          }

          100% {
            transform: rotateY(360deg) rotateX(0deg) translateY(0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
}