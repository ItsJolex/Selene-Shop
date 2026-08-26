"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [stage, setStage] = useState<"center" | "moving" | "done">("center");

  useEffect(() => {
    document.body.classList.add("splash-active");

    const moveTimer = setTimeout(() => {
      setStage("moving");
    }, 600);

    const doneTimer = setTimeout(() => {
      setStage("done");
      document.body.classList.remove("splash-active");
    }, 1600);

    return () => {
      clearTimeout(moveTimer);
      clearTimeout(doneTimer);
      document.body.classList.remove("splash-active");
    };
  }, []);

  if (stage === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] pointer-events-none transition-colors duration-1000 ease-in-out ${
        stage === "center" ? "bg-surface-container" : "bg-transparent"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Cargando Selene Makeup"
        className={`fixed left-1/2 object-contain drop-shadow-md transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          stage === "center"
            ? "top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[2.5] md:scale-[3]"
            : "top-[12px] md:top-[16px] -translate-x-1/2 translate-y-0 scale-100"
        } h-10 md:h-16 w-auto`}
      />
    </div>
  );
}
