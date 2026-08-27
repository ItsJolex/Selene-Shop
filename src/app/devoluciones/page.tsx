import Link from "next/link";

export default function DevolucionesPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen pt-[80px] pb-24">
      <div className="max-w-3xl mx-auto px-6 sm:px-12">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-rose-gold transition-colors">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Volver a la tienda
          </Link>
        </div>

        <h1 className="font-['Libre_Caslon_Text'] text-3xl md:text-4xl text-on-surface mb-8">Devoluciones y Cambios</h1>
        
        <div className="prose prose-sm md:prose-base prose-headings:font-['Libre_Caslon_Text'] prose-headings:font-normal prose-p:text-on-surface/80 max-w-none space-y-6">
          <p>
            En <strong>Selene Makeup</strong>, nuestra prioridad es garantizar la higiene y calidad de todos los productos que entregamos. Por ello, mantenemos una estricta política de devoluciones.
          </p>

          <h2 className="text-xl text-on-surface mt-8 mb-4">1. Política General de No Devolución</h2>
          <p>
            Debido a normas sanitarias y de salubridad, <strong>no aceptamos cambios ni devoluciones</strong> en cosméticos, maquillaje, productos de cuidado de la piel (skincare) ni herramientas de belleza (brochas, esponjas, etc.) una vez que el producto ha sido despachado y entregado.
          </p>

          <h2 className="text-xl text-on-surface mt-8 mb-4">2. Productos Defectuosos de Fábrica</h2>
          <p>
            Hacemos una revisión exhaustiva de todos nuestros productos antes de enviarlos. Sin embargo, en el raro caso de que recibas un producto con un defecto evidente de fábrica, debes notificarlo en un plazo máximo de <strong>24 horas</strong> a partir del momento en que la agencia de encomiendas marca el paquete como &quot;Entregado&quot;.
          </p>
          <p>
            Para proceder con un reclamo por defecto de fábrica, es <strong>obligatorio proporcionar un video continuo y sin cortes del desembalaje (unboxing)</strong> donde se observe claramente cómo se abre el empaque de envío y se descubre el defecto del producto. Sin esta prueba, no podremos procesar el reclamo.
          </p>

          <h2 className="text-xl text-on-surface mt-8 mb-4">3. Daños por Envío</h2>
          <p>
            Como se indica en nuestra política de envíos, no nos hacemos responsables por mercancía dañada, rota o maltratada por la empresa de encomiendas durante su traslado. En estos casos, el cliente debe presentar el reclamo directamente a la empresa transportista.
          </p>
        </div>
      </div>
    </div>
  );
}
