import Link from "next/link";

export default function PrivacidadPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen pt-[80px] pb-24">
      <div className="max-w-3xl mx-auto px-6 sm:px-12">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-rose-gold transition-colors">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Volver a la tienda
          </Link>
        </div>

        <h1 className="font-['Libre_Caslon_Text'] text-3xl md:text-4xl text-on-surface mb-8">Política de Privacidad</h1>
        
        <div className="prose prose-sm md:prose-base prose-headings:font-['Libre_Caslon_Text'] prose-headings:font-normal prose-p:text-on-surface/80 max-w-none space-y-6">
          <p>
            En <strong>Selene Makeup</strong>, respetamos tu privacidad y estamos comprometidos a proteger tus datos personales.
          </p>

          <h2 className="text-xl text-on-surface mt-8 mb-4">1. Recopilación de Información</h2>
          <p>
            Recopilamos únicamente la información necesaria para procesar tus pedidos. Dado que nuestro proceso de compra finaliza a través de WhatsApp, obtendremos acceso a tu número de teléfono, nombre de perfil y cualquier dato de envío que nos proporciones directamente.
          </p>

          <h2 className="text-xl text-on-surface mt-8 mb-4">2. Uso de la Información</h2>
          <p>
            La información que nos proporcionas se utilizará exclusivamente para:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-on-surface/80">
            <li>Procesar, confirmar y enviar tu pedido.</li>
            <li>Contactarte en caso de inconvenientes con tu compra.</li>
            <li>Enviarte información relevante sobre tu envío (guías de rastreo).</li>
          </ul>

          <h2 className="text-xl text-on-surface mt-8 mb-4">3. Protección de Datos</h2>
          <p>
            Tus datos personales no serán vendidos, intercambiados, transferidos ni proporcionados a ninguna empresa externa sin tu consentimiento, excepto lo estrictamente necesario para cumplir con el envío de tu pedido (ej. proveer tus datos a la agencia de encomiendas).
          </p>

          <h2 className="text-xl text-on-surface mt-8 mb-4">4. Comunicaciones Promocionales</h2>
          <p>
            Solo te enviaremos mensajes promocionales o de marketing si nos has dado tu consentimiento previo para hacerlo. Puedes solicitar que dejemos de enviarte promociones en cualquier momento.
          </p>
        </div>
      </div>
    </div>
  );
}
