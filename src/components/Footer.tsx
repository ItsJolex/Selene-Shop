import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-outline-variant/15 py-10 md:py-16 mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
            <Image
              alt="Selene"
              src="/logo.png"
              width={100}
              height={40}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60">
            © {new Date().getFullYear()} Selene Makeup.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link href="/terminos" className="text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-rose-gold transition-colors">
            Términos y Condiciones
          </Link>
          <Link href="/privacidad" className="text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-rose-gold transition-colors">
            Privacidad
          </Link>
          <Link href="/envios" className="text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-rose-gold transition-colors">
            Envíos
          </Link>
          <Link href="/devoluciones" className="text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-rose-gold transition-colors">
            Devoluciones
          </Link>
        </div>

      </div>
    </footer>
  );
}
