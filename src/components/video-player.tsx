"use client";

import { useRef, useState } from "react";

/**
 * Player de vídeo com carregamento sob demanda.
 * Sem JS ou com movimento reduzido: mostra o poster e um link direto.
 */
export function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const poster =
    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23151110'/%3E%3Cstop offset='55%25' stop-color='%235b1a2b'/%3E%3Cstop offset='100%25' stop-color='%230d0a09'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1280' height='720' fill='url(%23g)'/%3E%3Ctext x='640' y='300' text-anchor='middle' font-family='serif' font-size='52' fill='%23c9a227' letter-spacing='12'%3ETRIMINOX%3C/text%3E%3Ctext x='640' y='368' text-anchor='middle' font-family='serif' font-size='26' fill='%23c4b7a2' letter-spacing='4'%3ECOMO SE JOGA%3C/text%3E%3C/svg%3E";

  const onPlay = () => {
    setPlaying(true);
    videoRef.current?.play().catch(() => setPlaying(false));
  };

  return (
    <div className="relative overflow-hidden rounded-lg border border-travertine-300/14 bg-ink-900">
      <div className="relative aspect-video w-full">
        {playing ? (
          <video
            ref={videoRef}
            className="size-full object-cover"
            controls
            autoPlay
            playsInline
            preload="metadata"
            // Substitua pelo seu arquivo real, ex.: /video/como-jogar.mp4
            src="/video/como-jogar.mp4"
            poster={poster}
          >
            <track
              kind="captions"
              srcLang="pt-BR"
              label="Português"
              src="/video/como-jogar.vtt"
            />
            Seu navegador não suporta vídeo.{" "}
            <a href="/video/como-jogar.mp4" className="underline">
              Baixe o arquivo
            </a>
            .
          </video>
        ) : (
          <button
            type="button"
            onClick={onPlay}
            className="group relative size-full bg-ink-900 bg-cover bg-center"
            style={{ backgroundImage: `url("${poster}")` }}
            aria-label="Reproduzir vídeo: como se joga Triminox"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-ink-950/25 transition-colors duration-300 group-hover:bg-ink-950/10"
            />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <span
                aria-hidden="true"
                className="flex size-20 items-center justify-center rounded-full border-2 border-aureum-400/70 bg-ink-950/50 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-aureum-500 group-hover:border-aureum-300"
              >
                <svg viewBox="0 0 24 24" className="ml-1 size-9 text-aureum-400">
                  <path
                    d="M8 5.5v13l11-6.5-11-6.5z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span
                aria-hidden="true"
                className="font-display text-sm uppercase tracking-[0.24em] text-travertine-100"
              >
                Como se joga · 4 min
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-travertine-300/12 px-6 py-4">
        <p className="text-sm text-travertine-400">
          Vídeo com narração e legendas em português.
        </p>
        <a
          href="/video/como-jogar.mp4"
          className="inline-flex min-h-11 items-center rounded text-sm text-aureum-300 underline underline-offset-4 hover:text-aureum-200"
        >
          Baixar o vídeo
        </a>
      </div>
    </div>
  );
}