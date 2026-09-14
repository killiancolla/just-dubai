"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringWrapperRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);

    let ringX = -100, ringY = -100;
    let mouseX = -100, mouseY = -100;
    let isHovering = false;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px)`;
      }
      if (ringWrapperRef.current) {
        ringWrapperRef.current.style.transform = `translate(${ringX - 12}px, ${ringY - 12}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    const setHover = (val: boolean) => {
      if (isHovering === val) return;
      isHovering = val;
      const ring = ringRef.current;
      if (!ring) return;
      if (val) {
        ring.style.backgroundColor = "rgba(201,168,76,0.25)";
        ring.style.borderColor = "#C9A84C";
        ring.style.scale = "1.6";
      } else {
        ring.style.backgroundColor = "transparent";
        ring.style.borderColor = "rgba(201,168,76,0.6)";
        ring.style.scale = "1";
      }
    };

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const isClickable = !!target.closest("a, button, [role='button']");
      setHover(isClickable);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] top-0 left-0 h-1 w-1 rounded-full bg-[#C9A84C]"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringWrapperRef}
        className="pointer-events-none fixed z-[9998] top-0 left-0"
        style={{ willChange: "transform" }}
      >
        <div
          ref={ringRef}
          className="h-6 w-6 rounded-full border border-[#C9A84C]/60"
          style={{
            transition: "background-color 0.25s ease, border-color 0.25s ease, scale 0.25s ease",
          }}
        />
      </div>
    </>
  );
}
