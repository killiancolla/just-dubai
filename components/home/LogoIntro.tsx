"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";


export default function LogoIntro() {
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");

  useEffect(() => {
    // Phase 1 : logo visible pendant 1.6s
    const t1 = setTimeout(() => setPhase("reveal"), 1600);
    // Phase 2 : overlay disparaît, page visible
    const t2 = setTimeout(() => setPhase("done"), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => {}}>
      {phase !== "done" && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "reveal" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#0A0A0A]"
          style={{ pointerEvents: phase === "reveal" ? "none" : "all" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <Image
              src="/logo.png"
              alt="JustDubai"
              width={200}
              height={200}
              className="h-32 w-auto object-contain md:h-44"
              priority
              sizes="(max-width: 768px) 128px, 176px"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
