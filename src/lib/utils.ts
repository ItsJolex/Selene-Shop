export const BRAND_ORDER = [
  "Dolce Bella",
  "Salomé",
  "Ushas",
  "Max Glow",
  "Beauty Creations",
  "Kevin & Coco",
  "Dici",
  "Trendy",
  "Sin Marca"
];

export function sortProductsByBrand<T extends { brand: string; createdAt?: Date }>(products: T[]): T[] {
  return [...products].sort((a, b) => {
    const indexA = BRAND_ORDER.indexOf(a.brand);
    const indexB = BRAND_ORDER.indexOf(b.brand);

    if (indexA !== -1 && indexB !== -1) {
      if (indexA !== indexB) return indexA - indexB;
    }
    if (indexA !== -1 && indexB === -1) return -1;
    if (indexA === -1 && indexB !== -1) return 1;

    if (a.createdAt && b.createdAt) {
      const timeDiff = b.createdAt.getTime() - a.createdAt.getTime();
      if (timeDiff !== 0) return timeDiff;
    }
    
    // Si tienen la misma fecha de creación (como los productos del seed original), desempatar por nombre (alfabético)
    // para que el orden sea 100% determinista y no se muevan al ser actualizados en la base de datos.
    if ('name' in a && 'name' in b) {
       return (a as { name: string }).name.localeCompare((b as { name: string }).name);
    }
    
    return 0;
  });
}
