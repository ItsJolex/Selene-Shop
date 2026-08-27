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
      return b.createdAt.getTime() - a.createdAt.getTime();
    }
    
    return 0;
  });
}
