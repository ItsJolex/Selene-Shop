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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface-container transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="animate-pulse flex flex-col items-center">
        <img
          src="/selene-store/logo.png"
          alt="Cargando Selene Makeup"
          className="h-24 md:h-32 w-auto object-contain mb-4"
        />
        <div className="w-12 h-1 bg-rose-gold/20 rounded overflow-hidden">
          <div className="w-full h-full bg-rose-gold animate-progress"></div>
        </div>
      </div>
    </div>
  );
}
