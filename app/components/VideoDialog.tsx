'use client';

import { useRef } from 'react';

type VideoDialogProps = {
  id: string;
  title: string;
  label: string;
  src: string;
};

export default function VideoDialog({ id, title, label, src }: VideoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  function openVideo() {
    const dialog = dialogRef.current;
    const video = videoRef.current;
    if (!dialog || !video) return;

    dialog.showModal();
    video.src = src;
    void video.play().catch(() => {
      // The native play control remains available if the browser blocks playback.
    });
  }

  function stopVideo() {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.removeAttribute('src');
    video.load();
  }

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-controls={id}
        onClick={openVideo}
        className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-900 transition hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M8 5v14l11-7z" />
        </svg>
        {label}
      </button>
      <dialog
        ref={dialogRef}
        id={id}
        aria-labelledby={`${id}-title`}
        onClose={stopVideo}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-5xl overflow-auto overscroll-contain rounded-2xl border border-slate-200 bg-white p-0 shadow-2xl backdrop:bg-slate-950/70"
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
          <h2 id={`${id}-title`} className="font-extrabold text-slate-950">
            {title}
          </h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="rounded-lg px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-emerald-700"
          >
            Cerrar
          </button>
        </div>
        <video
          ref={videoRef}
          aria-labelledby={`${id}-title`}
          className="aspect-video max-h-[calc(100dvh-6rem)] w-full bg-slate-950 object-contain"
          controls
          playsInline
          preload="none"
        />
      </dialog>
    </>
  );
}
