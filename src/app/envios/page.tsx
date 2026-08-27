import Link from "next/link";

export default function EnviosPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen pt-[80px] pb-24">
      <div className="max-w-3xl mx-auto px-6 sm:px-12">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-rose-gold transition-colors">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Volver a la tienda
          </Link>
        </div>

        <h1 className="font-['Libre_Caslon_Text'] text-3xl md:text-4xl text-on-surface mb-8">Envíos y Entregas</h1>
        
        <div className="prose prose-sm md:prose-base prose-headings:font-['Libre_Caslon_Text'] prose-headings:font-normal prose-p:text-on-surface/80 max-w-none space-y-6">
          <p>
            Queremos que tus productos lleguen de manera rápida y segura. A continuación, detallamos nuestras políticas de envío para pedidos dentro de Venezuela.
          </p>

          <h2 className="text-xl text-on-surface mt-8 mb-4">1. Procesamiento de Pedidos</h2>
          <p>
            Los pedidos se procesan y despachan en un plazo de 24 a 48 horas hábiles tras la confirmación efectiva del pago. Los pedidos realizados los fines de semana o días feriados se procesarán el siguiente día hábil.
          </p>

          <h2 className="text-xl text-on-surface mt-8 mb-4">2. Agencias y Costos de Envío</h2>
          <p>
            Realizamos envíos a nivel nacional a través de las principales agencias de encomiendas del país (ej. MRW, Zoom, Tealca). 
          </p>
          <p>
            Todos los envíos nacionales se realizan bajo la modalidad de <strong>cobro a destino (COD)</strong>, lo que significa que el costo del envío deberá ser cancelado por el cliente al momento de retirar su paquete en la agencia seleccionada.
          </p>

          <h2 className="text-xl text-on-surface mt-8 mb-4">3. Entregas Locales</h2>
          <p>
            Si ofreces entregas locales o pick-up, puedes detallarlo por WhatsApp al momento de concretar la compra.
          </p>

          <h2 className="text-xl text-on-surface mt-8 mb-4">4. Responsabilidad sobre el Envío</h2>
          <p>
            Una vez que el paquete ha sido entregado a la agencia de encomiendas y se ha proporcionado el número de guía al cliente, <strong>Selene Makeup no se hace responsable</strong> por retrasos, extravíos, robos o daños sufridos durante el traslado.
          </p>
          <p>
            Recomendamos solicitar el envío asegurado (si la agencia lo permite) para proteger tu inversión. Cualquier reclamo por pérdida o daño durante el tránsito deberá realizarse directamente a la agencia de envíos correspondiente.
          </p>
        </div>
      </div>
    </div>
  );
}
