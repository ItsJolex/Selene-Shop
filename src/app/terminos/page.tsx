import Link from "next/link";

export default function TerminosPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen pt-[80px] pb-24">
      <div className="max-w-3xl mx-auto px-6 sm:px-12">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-rose-gold transition-colors">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Volver a la tienda
          </Link>
        </div>

        <h1 className="font-['Libre_Caslon_Text'] text-3xl md:text-4xl text-on-surface mb-8">Términos y Condiciones</h1>
        
        <div className="prose prose-sm md:prose-base prose-headings:font-['Libre_Caslon_Text'] prose-headings:font-normal prose-p:text-on-surface/80 max-w-none space-y-6">
          <p>
            Bienvenido a <strong>Selene Makeup</strong>. Al acceder y utilizar nuestro sitio web para realizar compras, aceptas estar sujeto a los siguientes Términos y Condiciones.
          </p>

          <h2 className="text-xl text-on-surface mt-8 mb-4">1. Disponibilidad de Inventario</h2>
          <p>
            Todos los pedidos están sujetos a la disponibilidad de inventario. Debido a la naturaleza dinámica de nuestro stock, es posible que un producto agregado al carrito ya no esté disponible al momento de concretar el pago. En tal caso, te informaremos a la brevedad.
          </p>

          <h2 className="text-xl text-on-surface mt-8 mb-4">2. Precios y Pagos</h2>
          <p>
            Los precios publicados están en dólares estadounidenses (USD) y pueden estar sujetos a cambios sin previo aviso. Los métodos de pago aceptados se confirmarán al momento de enviar el pedido por WhatsApp. El pedido solo se procesará una vez que el pago haya sido verificado.
          </p>

          <h2 className="text-xl text-on-surface mt-8 mb-4">3. Derecho de Admisión y Cancelación</h2>
          <p>
            Nos reservamos el derecho de cancelar cualquier pedido que consideremos sospechoso de fraude, que contenga errores tipográficos evidentes en el precio, o por razones de fuerza mayor. Si el pago ya fue procesado, se realizará el reembolso correspondiente.
          </p>

          <h2 className="text-xl text-on-surface mt-8 mb-4">4. Errores Tipográficos</h2>
          <p>
            En el caso de que un producto se muestre con un precio incorrecto debido a un error tipográfico o error del sistema, nos reservamos el derecho de rechazar o cancelar cualquier pedido realizado para el producto enumerado al precio incorrecto.
          </p>

          <h2 className="text-xl text-on-surface mt-8 mb-4">5. Propiedad Intelectual</h2>
          <p>
            Todo el contenido de este sitio (textos, gráficos, logotipos, imágenes) es propiedad de Selene Makeup o está utilizado con permiso, y está protegido por las leyes de propiedad intelectual correspondientes.
          </p>
        </div>
      </div>
    </div>
  );
}
