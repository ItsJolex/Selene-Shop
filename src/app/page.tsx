import prisma from '@/lib/prisma';
import StoreFront, { Brand, Category } from '@/components/StoreFront';
import { sortProductsByBrand } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let mappedProducts: any[] = [];

  try {
    let dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });

    dbProducts = sortProductsByBrand(dbProducts);

    // Map Prisma products to the interface StoreFront expects
    mappedProducts = dbProducts.map((p) => ({
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
  } catch (error) {
    console.error('Error loading products from Prisma database:', error);
  }

  return <StoreFront initialProducts={mappedProducts} />;
}
