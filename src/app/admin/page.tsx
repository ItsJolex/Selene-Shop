import Link from 'next/link';
import prisma from '@/lib/prisma';
import DeleteButton from './DeleteButton';
import { sortProductsByBrand } from '@/lib/utils';
import { Product } from '@/components/StoreFront';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let products: Product[] = [];
  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    const sorted = sortProductsByBrand(dbProducts);
    products = sorted.map((p) => ({
      id: p.id,
      brand: p.brand as Product['brand'],
      name: p.name,
      category: (p.category.charAt(0).toUpperCase() + p.category.slice(1)) as Product['category'],
      shades: p.shades,
      stock: p.stock,
      note: p.note || undefined,
      image: p.imageUrl || undefined,
      price: p.discountPrice ?? p.price,
    }));
  } catch (error) {
    console.error('Error fetching admin products from database:', error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="font-['Libre_Caslon_Text'] text-3xl text-on-surface">Inventario de Productos</h1>
        <Link 
          href="/admin/nuevo" 
          className="bg-primary text-on-primary px-5 py-2.5 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Agregar Producto
        </Link>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Producto</th>
                <th className="p-4 font-medium">Marca</th>
                <th className="p-4 font-medium">Categoría</th>
                <th className="p-4 font-medium">Precio</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-sm">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-on-surface-variant">
                    No hay productos registrados. ¡Agrega el primero!
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="p-4 font-medium text-on-surface">
                      <div className="flex items-center gap-3">
                        {product.image ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-md border border-outline-variant/30" />
                        ) : (
                          <div className="w-10 h-10 bg-surface-container rounded-md flex items-center justify-center text-on-surface-variant border border-outline-variant/30">
                            <span className="material-symbols-outlined text-[18px]">image</span>
                          </div>
                        )}
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant">{product.brand}</td>
                    <td className="p-4 text-on-surface-variant capitalize">{product.category}</td>
                    <td className="p-4 text-on-surface">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-error/10 text-error'}`}>
                        {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link href={`/admin/editar/${product.id}`} className="text-on-surface-variant hover:text-primary transition-colors p-2 inline-flex">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </Link>
                      <DeleteButton id={product.id} productName={product.name} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
