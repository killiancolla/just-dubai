"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import sanityLoader from "@/lib/sanityLoader";

interface Props {
  photos: { url: string; thumbUrl: string; alt: string }[];
  name: string;
}

export default function PhotoGallery({ photos, name }: Props) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const t = useTranslations("common");

  // Navigation clavier (flèches gauche/droite)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrent((i) => (i - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") setCurrent((i) => (i + 1) % photos.length);
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [photos.length]);

  // Précharge les images adjacentes à chaque changement de photo
  useEffect(() => {
    const toPreload = [
      photos[(current + 1) % photos.length],
      photos[(current - 1 + photos.length) % photos.length],
    ];
    toPreload.forEach((photo) => {
      if (!photo) return;
      const img = new window.Image();
      img.src = photo.url;
    });
  }, [current, photos]);

  if (!photos.length) {
    return (
      <div className="flex h-[50vh] items-center justify-center bg-[#111111]">
        <span className="text-[#888888]">{t("photo_soon")}</span>
      </div>
    );
  }

  const side = photos.slice(1, 5);

  return (
    <>
      <div className="h-[50vh] sm:h-[55vh]">
        <div className="relative h-full sm:hidden cursor-pointer bg-[#1a1a1a]" onClick={() => setLightbox(true)}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#222222] to-[#111111] animate-pulse" />
          <Image
            loader={sanityLoader}
            src={photos[current].url}
            alt={photos[current].alt}
            fill
            sizes="(max-width: 640px) 100vw, 66vw"
            className="object-cover"
            quality={75}
            loading="eager"
            priority
          />
          {photos.length > 1 && (
            <>
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-black/50 text-white text-xl"
                onClick={(e) => { e.stopPropagation(); setCurrent((i) => (i - 1 + photos.length) % photos.length); }}
              >
                ‹
              </button>
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-black/50 text-white text-xl"
                onClick={(e) => { e.stopPropagation(); setCurrent((i) => (i + 1) % photos.length); }}
              >
                ›
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                    className={`h-1 transition-all ${i === current ? "w-6 bg-[#C9A84C]" : "w-1.5 bg-white/50"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Desktop : grille 2 colonnes */}
        <div className="hidden sm:grid gap-1 h-full" style={{ gridTemplateColumns: side.length ? "2fr 1fr" : "1fr" }}>
          <div className="relative overflow-hidden cursor-pointer bg-[#1a1a1a]" onClick={() => setLightbox(true)}>
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#222222] to-[#111111] animate-pulse" />
            <Image
              loader={sanityLoader}
              src={photos[current].url}
              alt={photos[current].alt}
              fill
              sizes="(max-width: 640px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
              quality={75}
              loading="eager"
              priority
            />
          </div>
          {side.length > 0 && (
            <div className="grid gap-1" style={{ gridTemplateRows: `repeat(${Math.min(side.length, 4)}, 1fr)` }}>
              {side.map((photo, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden cursor-pointer bg-[#1a1a1a]"
                  onClick={() => { setCurrent(i + 1); setLightbox(true); }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#222222] to-[#111111] animate-pulse" />
                  <Image
                    loader={sanityLoader}
                    src={photo.url}
                    alt={`${name} ${i + 2}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    quality={75}
                  />
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
          <div className="relative w-full max-w-5xl h-[80vh] mx-4 sm:mx-16" onClick={(e) => e.stopPropagation()}>
            <Image
              loader={sanityLoader}
              src={photos[current].url}
              alt={photos[current].alt}
              fill
              sizes="90vw"
              className="object-contain"
              quality={85}
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
