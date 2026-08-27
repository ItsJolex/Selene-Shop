'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Product } from '@prisma/client';

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price.toString(),
    discountPrice: product.discountPrice ? product.discountPrice.toString() : '',
    stock: product.stock.toString(),
    shades: product.shades.join(', '),
    note: product.note || '',
    imageUrl: product.imageUrl || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
        stock: parseInt(formData.stock, 10),
        shades: formData.shades ? formData.shades.split(',').map(s => s.trim()) : []
      };

      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Error al actualizar el producto');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin" className="p-2 text-on-surface-variant hover:text-on-surface bg-surface-container rounded-full transition-colors flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </Link>
        <h1 className="font-['Libre_Caslon_Text'] text-3xl text-on-surface">Editar Producto</h1>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant/30 p-6 md:p-8">
        {error && (
          <div className="mb-6 p-4 bg-error/10 text-error rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-on-surface">Nombre del Producto *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Ej. Base Líquida Matte" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-on-surface">Marca *</label>
              <input required type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Ej. Salome, Dolce Bella..." />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-on-surface">Categoría *</label>
              <select required name="category" value={formData.category} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                <option value="rostro">Rostro</option>
                <option value="ojos">Ojos</option>
                <option value="labios">Labios</option>
                <option value="skincare">Skincare</option>
                <option value="herramientas">Herramientas</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-on-surface">Precio ($) *</label>
              <input required type="number" step="0.01" min="0" name="price" value={formData.price} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-on-surface">Precio Descuento ($)</label>
              <input type="number" step="0.01" min="0" name="discountPrice" value={formData.discountPrice} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Opcional" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-on-surface">Stock disponible *</label>
              <input required type="number" min="0" name="stock" value={formData.stock} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-on-surface">URL de Imagen</label>
              <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="https://ejemplo.com/imagen.jpg o /products/imagen.webp" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-on-surface">Tonos (Separados por coma)</label>
            <input type="text" name="shades" value={formData.shades} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Ej. 01 Light, 02 Medium, 03 Dark" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-on-surface">Nota o Descripción Adicional</label>
            <textarea name="note" value={formData.note} onChange={handleChange} rows={3} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Opcional"></textarea>
          </div>

          <div className="pt-4 border-t border-outline-variant/20 flex justify-end gap-4">
            <Link href="/admin" className="px-6 py-3 rounded-full text-sm font-medium text-on-surface hover:bg-surface-container transition-colors">
              Cancelar
            </Link>
            <button disabled={loading} type="submit" className="bg-primary text-on-primary px-8 py-3 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
