'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id, productName }: { id: string, productName: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`¿Estás seguro que deseas eliminar "${productName}"? Esta acción no se puede deshacer.`);
    
    if (!confirmDelete) return;

    setIsDeleting(true);
    
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Error al eliminar el producto');
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Hubo un error al intentar eliminar el producto.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-on-surface-variant hover:text-error transition-colors p-2 inline-flex disabled:opacity-50 disabled:cursor-not-allowed"
      title="Eliminar producto"
    >
      <span className="material-symbols-outlined text-[18px]">
        {isDeleting ? 'hourglass_empty' : 'delete'}
      </span>
    </button>
  );
}
