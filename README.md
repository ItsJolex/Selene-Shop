# Selene Makeup Store

Un catálogo digital optimizado para Selene Makeup, construido con Next.js 14, React y Tailwind CSS. Exportado como sitio estático sin necesidad de base de datos activa.

## Características

- 🛒 Carrito de compras persistente (guardado en el navegador).
- 🏷️ Control de stock: Validación para evitar pedidos de productos agotados o más de lo disponible.
- 📱 Experiencia optimizada para móviles con menú inferior y modal de vista rápida.
- 💬 Checkout directo hacia WhatsApp, incluyendo los detalles del pedido, precio total y cálculo automático.
- ⚡ Imágenes optimizadas en formato WebP para tiempos de carga ultrarrápidos (ideal para conexiones lentas).
- 🔍 SEO y Open Graph configurados para compartir enlaces bonitos en redes.

## Desarrollo Local

Para correr el proyecto en tu máquina y hacer cambios:

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Cómo modificar el catálogo

Actualmente, el catálogo se administra editando el arreglo `ALL_PRODUCTS` en el archivo `src/app/page.tsx`.

Para agregar o modificar un producto:
1. Abre `src/app/page.tsx` y busca la constante `ALL_PRODUCTS`.
2. Añade un objeto respetando los campos: `id`, `image`, `brand`, `name`, `category`, `stock` y `price`.
3. Para las imágenes nuevas, colócalas en la carpeta `public/products/`. Asegúrate de que sean de formato ligero (idealmente `.webp`). Puedes usar el script `scripts/optimize.py` para convertir fotos nuevas.

## Scripts de Utilidad

Dentro de la carpeta `scripts/` encontrarás herramientas usadas previamente:
- `optimize.py`: Transforma de JPG a WebP comprimido.
- `convert.py`, `download_images.py`, `create_excel.js`: Utilidades antiguas de extracción.

## Despliegue

La aplicación está configurada para **Exportación Estática** (`output: "export"` en `next.config.mjs`).

Puedes desplegarla en [Vercel](https://vercel.com) conectando este repositorio de GitHub. No requiere configuración adicional, ya que Vercel detecta Next.js automáticamente y manejará la generación de la carpeta `.next`.
