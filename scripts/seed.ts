import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ALL_PRODUCTS = [
  { id: "db-glotint", image: "/products/db-glotint.webp", brand: "Dolce Bella", name: "Glow Tint", category: "Rostro", shades: ["Sand", "Vainilla", "Brown"], stock: 3, price: 5, },
  { id: "db-corrector", image: "/products/db-corrector.webp", brand: "Dolce Bella", name: "Corrector Líquido", category: "Rostro", shades: ["Carmel", "Honey", "Tan"], stock: 6, note: "Tan sin caja", price: 5, },
  { id: "db-blush", image: "/products/db-blush.webp", brand: "Dolce Bella", name: "Blush en Polvo / Rubor Individual", category: "Rostro", shades: ["05", "11"], stock: 3, price: 5, },
  { id: "db-mascara", image: "/products/db-mascara.webp", brand: "Dolce Bella", name: "Máscara Volumen & Definition", category: "Ojos", stock: 1, price: 5, },
  { id: "db-pencil", image: "/products/db-pencil.webp", brand: "Dolce Bella", name: "Makeup Pencil", category: "Ojos", shades: ["Dark Brown 803", "Medium Brown 808"], stock: 4, price: 5, },
  { id: "db-lipgloss-tubo", image: "/products/db-lipgloss-tubo.webp", brand: "Dolce Bella", name: "Lip Gloss Tubo", category: "Labios", shades: ["D6", "07", "D5", "04"], stock: 7, price: 5, },
  { id: "db-lipgloss-aplicador", image: "/products/db-lipgloss-aplicador.webp", brand: "Dolce Bella", name: "Lip Gloss Aplicador", category: "Labios", shades: ["03", "01", "05"], stock: 5, price: 5, },
  { id: "db-grace-marble", image: "/products/db-grace-marble.webp", brand: "Dolce Bella", name: "Grace Marble", category: "Labios", shades: ["Dusty Rose"], stock: 3, price: 5, },
  { id: "db-glossy-lipbalm", image: "/products/db-glossy-lipbalm.webp", brand: "Dolce Bella", name: "Glossy Lip Balm", category: "Labios", shades: ["Grace", "Smile"], stock: 2, price: 5, },
  { id: "db-vinyl-lip", image: "/products/db-vinyl-lip.webp", brand: "Dolce Bella", name: "Vinyl Lasting Lip Stain", category: "Labios", shades: ["Sweet Tart"], stock: 1, price: 5, },
  { id: "sa-concealer", image: "/products/sa-concealer.webp", brand: "Salomé", name: "Hydratint Concealer", category: "Rostro", shades: ["01", "03"], stock: 5, price: 5, },
  { id: "sa-lipstick", image: "/products/sa-lipstick.webp", brand: "Salomé", name: "Vegan Smooth Creamy Lipstick", category: "Labios", shades: ["01", "04"], stock: 2, price: 5, },
  { id: "sa-sacapuntas", image: "/products/sa-sacapuntas.webp", brand: "Salomé", name: "Sacapuntas 2 en 1", category: "Accesorios", stock: 4, price: 5, },
  { id: "papel-absorbente", image: "/products/papel-absorbente.webp", brand: "Sin Marca", name: "Papel Absorbente Animalitos", category: "Skincare", stock: 9, price: 5, },
  { id: "us-lipbalm", image: "/products/us-lipbalm.webp", brand: "Ushas", name: "Sweet Lip Balm", category: "Labios", shades: ["05", "06"], stock: 2, price: 5, },
  { id: "us-lipink", image: "/products/us-lipink.webp", brand: "Ushas", name: "Lip Ink", category: "Labios", shades: ["Watermelon 02"], stock: 1, price: 5, },
  { id: "mg-matelips", image: "/products/mg-matelips.webp", brand: "Max Glow", name: "Mate Lips Liquid", category: "Labios", shades: ["Raspberry Rose", "Deep Rose"], stock: 2, price: 5, },
  { id: "mg-lipoil", image: "/products/mg-lipoil.webp", brand: "Max Glow", name: "Lip Oil Fruity Gloss", category: "Labios", shades: ["02", "04"], stock: 3, price: 5, },
  { id: "bc-lipoil", image: "/products/bc-lipoil.webp", brand: "Beauty Creations", name: "Sweet Dose Lip Oil", category: "Labios", shades: ["Water Melon"], stock: 1, price: 5, },
  { id: "bc-pencil", image: "/products/bc-pencil.webp", brand: "Beauty Creations", name: "Wooden Lip Pencil", category: "Labios", shades: ["Ur Cherry Sweet", "U Had Me At Expresso", "Wine About It"], stock: 3, price: 5, },
  { id: "kc-blusher", image: "/products/kc-blusher.webp", brand: "Kevin & Coco", name: "Blusher Lotion", category: "Rostro", shades: ["Thus", "Be Mine"], stock: 2, price: 5, },
  { id: "dici-paso1", image: "/products/dici-paso1.webp", brand: "Dici", name: "Paso 1", category: "Skincare", stock: 1, price: 5, },
  { id: "trendy-espejo", image: "/products/trendy-espejo.webp", brand: "Trendy", name: "Espejo Plegable", category: "Accesorios", stock: 1, price: 5, },
  { id: "sm-sacapuntas", image: "/products/sm-sacapuntas.webp", brand: "Sin Marca", name: "Sacapuntas 2 en 1 (Morado)", category: "Accesorios", stock: 1, price: 5, },
  { id: "sm-borlas-grandes", image: "/products/sm-borlas-grandes.webp", brand: "Sin Marca", name: "Borlas Grandes", category: "Accesorios", stock: 2, price: 5, },
  { id: "sm-borlas-pequenas", image: "/products/sm-borlas-pequenas.webp", brand: "Sin Marca", name: "Borlas Pequeñas", category: "Accesorios", stock: 4, price: 5, },
  { id: "sm-esponja", image: "/products/sm-esponja.webp", brand: "Sin Marca", name: "Esponja Beauty Blender", category: "Accesorios", stock: 1, price: 5, },
  { id: "sm-sadoer-lip", image: "/products/sm-sadoer-lip.webp", brand: "Sin Marca", name: "Sadoer Repair Lip Mask", category: "Skincare", stock: 1, price: 5, },
  { id: "sm-kaberline-lip", image: "/products/sm-kaberline-lip.webp", brand: "Sin Marca", name: "Kaberline Lip Mask", category: "Skincare", stock: 1, price: 5, },
  { id: "sm-sadoer-face", image: "/products/sm-sadoer-face.webp", brand: "Sin Marca", name: "Sadoer Rose Facial Mask", category: "Skincare", stock: 2, price: 5, },
  { id: "sm-grippies", image: "/products/sm-grippies.webp", brand: "Sin Marca", name: "Grippies", category: "Accesorios", stock: 2, price: 5, },
  { id: "sm-chokers", image: "/products/sm-chokers.webp", brand: "Sin Marca", name: "Chokers Negros", category: "Accesorios", stock: 2, price: 5, },
];

async function main() {
  console.log('Iniciando migración de datos (seed)...');

  // Limpiar datos existentes (opcional pero recomendado en el primer seed)
  await prisma.product.deleteMany({});
  console.log('Productos existentes eliminados.');

  const productsToInsert = ALL_PRODUCTS.map((prod) => ({
    slug: prod.id,
    brand: prod.brand,
    name: prod.name,
    category: prod.category.toLowerCase(), // In the new API, we use lowercase categories usually, but let's keep it as is or match schema
    shades: prod.shades || [],
    stock: prod.stock,
    note: prod.note || null,
    imageUrl: prod.image || null,
    price: prod.price,
  }));

  const result = await prisma.product.createMany({
    data: productsToInsert,
    skipDuplicates: true,
  });

  console.log(`¡Éxito! Se insertaron ${result.count} productos.`);
}

main()
  .catch((e) => {
    console.error('Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
