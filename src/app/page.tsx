import prisma from '@/lib/prisma';
import StoreFront, { Brand, Category } from '@/components/StoreFront';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const dbProducts = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // Map Prisma products to the interface StoreFront expects
  const mappedProducts = dbProducts.map((p) => ({
    id: p.slug || p.id,
    brand: p.brand as Brand,
    name: p.name,
    category: (p.category.charAt(0).toUpperCase() + p.category.slice(1)) as Category,
    shades: p.shades,
    stock: p.stock,
    note: p.note || undefined,
    image: p.imageUrl || undefined,
    price: p.discountPrice ?? p.price,
  }));

  return <StoreFront initialProducts={mappedProducts} />;
}
