"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
  photos: { url: string; thumbUrl: string; alt: string }[];
  name: string;
}

export default function PhotoGallery({ photos, name }: Props) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!photos.length) {
    return (
      <div className="flex h-[50vh] items-center justify-center bg-[#111111]">
        <span className="text-[#888888]">Photo bientôt disponible</span>
      </div>
    );
  }

  const side = photos.slice(1, 5);

  return (
    <>
      {/* Grid galerie */}
      <div className="grid gap-1 h-[55vh]" style={{ gridTemplateColumns: side.length ? "2fr 1fr" : "1fr" }}>
        {/* Image principale */}
        <div className="relative overflow-hidden cursor-pointer" onClick={() => setLightbox(true)}>
          <Image
            src={photos[current].url}
            alt={photos[current].alt}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
            quality={90}
            priority
          />
        </div>

        {/* Grille latérale */}
        {side.length > 0 && (
          <div className="grid gap-1" style={{ gridTemplateRows: `repeat(${Math.min(side.length, 4)}, 1fr)` }}>
            {side.map((photo, i) => (
              <div
                key={i}
                className="relative overflow-hidden cursor-pointer"
                onClick={() => { setCurrent(i + 1); setLightbox(true); }}
              >
                <Image
                  src={photo.url}
                  alt={`${name} ${i + 2}`}
                  fill
                  sizes="33vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Overlay "voir tout" sur la dernière vignette */}
                {i === side.length - 1 && photos.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-sm tracking-widest">+{photos.length - 5}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl"
            onClick={() => setLightbox(false)}
          >
            ✕
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center border border-white/20 bg-white/10 text-white hover:bg-white/20 text-xl"
            onClick={(e) => { e.stopPropagation(); setCurrent((i) => (i - 1 + photos.length) % photos.length); }}
          >
            ‹
          </button>
          <div className="relative w-full max-w-5xl h-[80vh] mx-16" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[current].url}
              alt={photos[current].alt}
              fill
              sizes="90vw"
              className="object-contain"
              quality={90}
            />
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center border border-white/20 bg-white/10 text-white hover:bg-white/20 text-xl"
            onClick={(e) => { e.stopPropagation(); setCurrent((i) => (i + 1) % photos.length); }}
          >
            ›
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`h-1 transition-all ${i === current ? "w-6 bg-[#C9A84C]" : "w-1.5 bg-white/30 hover:bg-white/60"}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
