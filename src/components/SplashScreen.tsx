"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // El temporizador asegura que la pantalla se desvanezca suavemente 
    // después de que el DOM inicial haya cargado.
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1200); // 1.2 segundos de duración

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-transparent transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100 backdrop-blur-sm" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/selene-store/logo.png"
          alt="Cargando Selene Makeup"
          className="h-28 md:h-40 w-auto object-contain animate-logo-pulse drop-shadow-md"
        />
      </div>
    </div>
  );
}
