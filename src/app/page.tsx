"use client";

import Image from "next/image";
import { useState, useMemo } from "react";

type Brand = "Dolce Bella" | "Salomé" | "Ushas" | "Max Glow" | "Beauty Creations" | "Kevin & Coco" | "Dici" | "Trendy" | "Sin Marca";
type Category = "Labios" | "Ojos" | "Rostro" | "Accesorios" | "Skincare";

interface Product {
  id: string;
  brand: Brand;
  name: string;
  category: Category;
  shades?: string[];
  stock: number;
  note?: string;
}

interface CartItem {
  product: Product;
  shade?: string;
  qty: number;
}

const ALL_PRODUCTS: Product[] = [
  { id: "db-glotint", brand: "Dolce Bella", name: "Glow Tint", category: "Rostro", shades: ["Sand", "Vainilla", "Brown"], stock: 3 },
  { id: "db-corrector", brand: "Dolce Bella", name: "Corrector Líquido", category: "Rostro", shades: ["Carmel", "Honey", "Tan"], stock: 6, note: "Tan sin caja" },
  { id: "db-blush", brand: "Dolce Bella", name: "Blush en Polvo / Rubor Individual", category: "Rostro", shades: ["05", "11"], stock: 3 },
  { id: "db-mascara", brand: "Dolce Bella", name: "Máscara Volumen & Definition", category: "Ojos", stock: 1 },
  { id: "db-pencil", brand: "Dolce Bella", name: "Makeup Pencil", category: "Ojos", shades: ["Dark Brown 803", "Medium Brown 808"], stock: 4 },
  { id: "db-lipgloss-tubo", brand: "Dolce Bella", name: "Lip Gloss (Tubo)", category: "Labios", shades: ["D6", "07", "D5", "04"], stock: 7 },
  { id: "db-lipgloss-aplicador", brand: "Dolce Bella", name: "Lip Gloss (Con Aplicador)", category: "Labios", shades: ["03", "01", "05"], stock: 5 },
  { id: "db-grace-marble", brand: "Dolce Bella", name: "Grace Marble", category: "Labios", shades: ["Dusty Rose"], stock: 3 },
  { id: "db-glossy-lipbalm", brand: "Dolce Bella", name: "Glossy Lip Balm", category: "Labios", shades: ["Grace", "Smile"], stock: 2 },
  { id: "db-vinyl-lip", brand: "Dolce Bella", name: "Vinyl Lasting Lip Stain", category: "Labios", shades: ["Sweet Tart"], stock: 1 },
  { id: "sa-concealer", brand: "Salomé", name: "Hydratint Concealer", category: "Rostro", shades: ["01", "03"], stock: 5 },
  { id: "sa-lipstick", brand: "Salomé", name: "Vegan Smooth Creamy Lipstick", category: "Labios", shades: ["01", "04"], stock: 2 },
  { id: "sa-sacapuntas", brand: "Salomé", name: "Sacapuntas 2 en 1", category: "Accesorios", stock: 4 },
  { id: "papel-absorbente", brand: "Sin Marca", name: "Papel Absorbente de Grasa – Presentación Animalitos", category: "Skincare", stock: 9 },
  { id: "us-lipbalm", brand: "Ushas", name: "Sweet Lip Balm", category: "Labios", shades: ["05", "06"], stock: 2 },
  { id: "us-lipink", brand: "Ushas", name: "Lip Ink", category: "Labios", shades: ["Watermelon 02"], stock: 1 },
  { id: "mg-matelips", brand: "Max Glow", name: "Mate Lips Lip Color Liquid", category: "Labios", shades: ["Raspberry Rose", "Deep Rose"], stock: 2 },
  { id: "mg-lipoil", brand: "Max Glow", name: "Lip Oil Fruity Gloss Plumping Lips", category: "Labios", shades: ["02", "04"], stock: 3 },
  { id: "bc-lipoil", brand: "Beauty Creations", name: "Sweet Dose Lip Oil", category: "Labios", shades: ["Water Melon"], stock: 1 },
  { id: "bc-pencil", brand: "Beauty Creations", name: "Wooden Lip Pencil", category: "Labios", shades: ["Ur Cherry Sweet", "U Had Me At Expresso", "Wine About It"], stock: 3 },
  { id: "kc-blusher", brand: "Kevin & Coco", name: "Blusher Lotion", category: "Rostro", shades: ["Thus", "Be Mine"], stock: 2 },
  { id: "dici-paso1", brand: "Dici", name: "Paso 1", category: "Skincare", stock: 1 },
  { id: "trendy-espejo", brand: "Trendy", name: "Espejo Plegable", category: "Accesorios", stock: 1 },
  { id: "sm-sacapuntas", brand: "Sin Marca", name: "Sacapuntas 2 en 1 Sin Depósito (Morado)", category: "Accesorios", stock: 1 },
  { id: "sm-borlas-grandes", brand: "Sin Marca", name: "Borlas Grandes", category: "Accesorios", stock: 2 },
  { id: "sm-borlas-pequenas", brand: "Sin Marca", name: "Borlas Pequeñas", category: "Accesorios", stock: 4 },
  { id: "sm-esponja", brand: "Sin Marca", name: "Esponja Beauty Blender Amarilla", category: "Accesorios", stock: 1 },
  { id: "sm-sadoer-lip", brand: "Sin Marca", name: "Sadoer Repair Lip Mask", category: "Skincare", stock: 1 },
  { id: "sm-kaberline-lip", brand: "Sin Marca", name: "Kaberline Lip Mask", category: "Skincare", stock: 1 },
  { id: "sm-sadoer-face", brand: "Sin Marca", name: "Sadoer Real Rose Moisturizing Facial Mask", category: "Skincare", stock: 2 },
  { id: "sm-grippies", brand: "Sin Marca", name: "Grippies", category: "Accesorios", stock: 2 },
  { id: "sm-chokers", brand: "Sin Marca", name: "Chokers Negros", category: "Accesorios", stock: 2 },
];

const ALL_BRANDS: (Brand | "Todas")[] = ["Todas", "Dolce Bella", "Salomé", "Ushas", "Max Glow", "Beauty Creations", "Kevin & Coco", "Dici", "Trendy", "Sin Marca"];
const ALL_CATEGORIES: (Category | "Todas")[] = ["Todas", "Labios", "Rostro", "Ojos", "Accesorios", "Skincare"];

const categoryIcon: Record<Category, string> = {
  Labios: "favorite",
  Rostro: "face",
  Ojos: "visibility",
  Accesorios: "diamond",
  Skincare: "spa",
};

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product, shade?: string) => void }) {
  const [selectedShade, setSelectedShade] = useState<string | undefined>(product.shades?.[0]);
  return (
    <div className="group cursor-pointer flex flex-col">
      <div className="relative aspect-[3/4] mb-stack-md overflow-hidden rounded-lg bg-surface-container flex flex-col items-center justify-center gap-3 border border-outline-variant/30">
        <div className="absolute inset-0 bg-gradient-to-br from-linen-base/60 to-warm-nude/40" />
        <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
          <span className="material-symbols-outlined text-5xl text-rose-gold/60">{categoryIcon[product.category]}</span>
          <p className="font-label-sm text-[10px] text-on-surface-variant/70 uppercase tracking-wider leading-tight">{product.name}</p>
        </div>
        <span className="absolute top-3 left-3 bg-surface-container-low/90 backdrop-blur-sm text-on-surface-variant font-label-sm text-[10px] px-2 py-0.5 rounded-full border border-outline-variant/40 z-10">
          Stock: {product.stock}
        </span>
        <button onClick={() => onAddToCart(product, selectedShade)}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 text-deep-charcoal hover:bg-rose-gold hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 shadow-md z-10"
          aria-label={`Agregar ${product.name}`}>
          <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
        </button>
      </div>
      <div className="flex flex-col flex-1">
        <p className="font-label-sm text-[10px] text-on-surface-variant mb-1 uppercase tracking-widest">{product.brand}</p>
        <h3 className="font-headline-sm text-sm text-deep-charcoal leading-tight mb-2">{product.name}</h3>
        {product.note && <p className="font-label-sm text-[10px] text-secondary italic mb-1">{product.note}</p>}
        {product.shades && product.shades.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.shades.map((shade) => (
              <button key={shade} onClick={() => setSelectedShade(shade)}
                className={`px-2 py-0.5 rounded-full border font-label-sm text-[10px] transition-all duration-200 ${selectedShade === shade ? "bg-deep-charcoal text-white border-deep-charcoal" : "bg-transparent text-secondary border-outline-variant hover:border-secondary"}`}>
                {shade}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="font-label-sm text-[10px] text-on-surface-variant/60">{product.category}</span>
          <button onClick={() => onAddToCart(product, selectedShade)} className="flex items-center gap-1 text-xs font-label-sm text-primary hover:text-surface-tint transition-colors">
            <span className="material-symbols-outlined text-sm">add_shopping_cart</span>Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ items, onClose, onRemove, onQtyChange }: { items: CartItem[]; onClose: () => void; onRemove: (id: string, shade?: string) => void; onQtyChange: (id: string, shade: string | undefined, delta: number) => void }) {
  const total = items.reduce((acc, i) => acc + i.qty, 0);
  const whatsappItems = items.map((i) => `• ${i.product.name}${i.shade ? ` (${i.shade})` : ""} x${i.qty}`).join("%0A");
  const whatsappMsg = `Hola! Me interesa pedir:%0A${whatsappItems}%0A%0ATotal: ${total} producto(s)`;
  const whatsappUrl = `https://wa.me/?text=${whatsappMsg}`;
  const WaPath = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-paper-white shadow-2xl flex flex-col h-full">
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/30">
          <h2 className="font-headline-sm text-xl text-deep-charcoal">Mi Carrito</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-deep-charcoal"><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="material-symbols-outlined text-6xl text-outline-variant">shopping_bag</span>
              <p className="font-body-md text-body-md text-on-surface-variant">Tu carrito está vacío.</p>
            </div>
          ) : items.map((item) => (
            <div key={`${item.product.id}-${item.shade}`} className="flex items-center gap-4 pb-4 border-b border-outline-variant/20 last:border-0">
              <div className="w-14 h-14 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl text-rose-gold/70">{categoryIcon[item.product.category]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest mb-0.5">{item.product.brand}</p>
                <p className="font-headline-sm text-sm text-deep-charcoal leading-tight truncate">{item.product.name}</p>
                {item.shade && <p className="font-label-sm text-[10px] text-secondary mt-0.5">{item.shade}</p>}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => onQtyChange(item.product.id, item.shade, -1)} className="w-6 h-6 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container"><span className="material-symbols-outlined text-xs">remove</span></button>
                <span className="font-label-md text-sm w-5 text-center">{item.qty}</span>
                <button onClick={() => onQtyChange(item.product.id, item.shade, 1)} className="w-6 h-6 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container"><span className="material-symbols-outlined text-xs">add</span></button>
                <button onClick={() => onRemove(item.product.id, item.shade)} className="ml-1 text-error/60 hover:text-error"><span className="material-symbols-outlined text-sm">delete</span></button>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-outline-variant/30 space-y-3">
            <div className="flex justify-between font-label-md text-label-md text-deep-charcoal"><span>Total productos:</span><span>{total}</span></div>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-label-md text-label-md py-3 rounded-lg hover:opacity-90">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d={WaPath} /></svg>
              Pedir por WhatsApp
            </a>
            <button onClick={onClose} className="w-full border border-outline-variant text-on-surface-variant font-label-md text-label-md py-3 rounded-lg hover:bg-surface-container">Seguir comprando</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeBrand, setActiveBrand] = useState<Brand | "Todas">("Todas");
  const [activeCategory, setActiveCategory] = useState<Category | "Todas">("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const filteredProducts = useMemo(() => ALL_PRODUCTS.filter((p) => {
    const matchBrand = activeBrand === "Todas" || p.brand === activeBrand;
    const matchCat = activeCategory === "Todas" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.shades?.some((s) => s.toLowerCase().includes(q));
    return matchBrand && matchCat && matchSearch;
  }), [activeBrand, activeCategory, searchQuery]);

  const cartCount = cartItems.reduce((a, b) => a + b.qty, 0);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 2500); }

  function addToCart(product: Product, shade?: string) {
    setCartItems((prev) => {
      const ex = prev.find((i) => i.product.id === product.id && i.shade === shade);
      if (ex) return prev.map((i) => i.product.id === product.id && i.shade === shade ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, shade, qty: 1 }];
    });
    showToast(`✓ ${product.name}${shade ? ` · ${shade}` : ""} agregado`);
  }

  function removeFromCart(id: string, shade?: string) { setCartItems((prev) => prev.filter((i) => !(i.product.id === id && i.shade === shade))); }
  function changeQty(id: string, shade: string | undefined, delta: number) { setCartItems((prev) => prev.map((i) => i.product.id === id && i.shade === shade ? { ...i, qty: i.qty + delta } : i).filter((i) => i.qty > 0)); }
  const scrollToCatalog = () => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });

  const WaPath = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] bg-deep-charcoal text-white font-label-md text-label-md px-5 py-3 rounded-full shadow-lg whitespace-nowrap">{toast}</div>
      )}

      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 backdrop-blur-xl bg-paper-white/90 border-b border-outline-variant/30 text-deep-charcoal">
        <nav className="hidden md:flex items-center gap-stack-lg flex-1">
          {ALL_CATEGORIES.filter((c) => c !== "Todas").map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat as Category); scrollToCatalog(); }}
              className={`font-label-md text-label-md transition-colors border-b-2 pb-1 ${activeCategory === cat ? "text-primary border-primary" : "text-on-surface-variant border-transparent hover:text-primary"}`}>{cat}</button>
          ))}
        </nav>
        <div className="flex flex-col items-center justify-center flex-1">
          <button onClick={() => { setActiveBrand("Todas"); setActiveCategory("Todas"); setSearchQuery(""); scrollToCatalog(); }} className="flex flex-col items-center gap-1">
            <Image alt="Selene Logo" className="h-14 md:h-20 w-auto object-contain" src="/logo.png" width={80} height={80} priority />
            <span className="font-label-sm text-[10px] tracking-[0.2em] uppercase text-deep-charcoal text-center">Selene MAKE UP STORE</span>
          </button>
        </div>
        <div className="flex items-center justify-end gap-stack-md flex-1">
          <div className="hidden md:flex relative">
            <input className="bg-transparent border-0 border-b border-deep-charcoal px-0 py-1 text-sm w-48 outline-none focus:border-rose-gold transition-colors"
              placeholder="Buscar..." type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); scrollToCatalog(); }} />
            <span className="material-symbols-outlined absolute right-0 top-1 text-[18px]">search</span>
          </div>
          <button className="md:hidden" onClick={() => setSearchOpen((v) => !v)}><span className="material-symbols-outlined">search</span></button>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"><span className="material-symbols-outlined">chat</span></a>
          <button onClick={() => setCartOpen(true)} className="relative">
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-rose-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
          </button>
          <button className="md:hidden" onClick={() => setMobileMenuOpen((v) => !v)}><span className="material-symbols-outlined">{mobileMenuOpen ? "close" : "menu"}</span></button>
        </div>
      </header>

      {searchOpen && (
        <div className="fixed top-[72px] left-0 w-full z-40 px-margin-mobile py-3 bg-paper-white/95 backdrop-blur-xl border-b border-outline-variant/30">
          <input autoFocus className="w-full bg-surface-container rounded-lg px-4 py-2 text-sm outline-none border border-outline-variant/40 focus:border-primary"
            placeholder="Buscar productos..." type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      )}
      {mobileMenuOpen && (
        <div className="fixed top-[72px] left-0 w-full z-40 bg-paper-white/97 backdrop-blur-xl border-b border-outline-variant/20 px-margin-mobile py-5 flex flex-col gap-3 shadow-md">
          {ALL_CATEGORIES.filter((c) => c !== "Todas").map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat as Category); setMobileMenuOpen(false); scrollToCatalog(); }}
              className={`text-left font-label-md text-label-md py-2 border-b border-outline-variant/20 ${activeCategory === cat ? "text-primary" : "text-on-surface-variant"}`}>{cat}</button>
          ))}
        </div>
      )}

      <main className="pt-[120px] md:pt-[140px] pb-section-gap">
        <section className="px-margin-mobile md:px-margin-desktop mb-section-gap flex flex-col items-center text-center justify-center min-h-[45vh] bg-gradient-to-b from-surface to-linen-base/40">
          <div className="max-w-3xl mx-auto px-4">
            <p className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-rose-gold mb-stack-md">Tu tienda de makeup en Venezuela</p>
            <h1 className="font-headline-md md:font-display-lg text-headline-md md:text-display-lg text-deep-charcoal mb-stack-lg leading-tight tracking-tight">
              Selene.<br /><span className="text-surface-tint">The Art of Makeup.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl mx-auto">Descubre Glow Tint, Hydratint Concealer, Lip Oils y mucho más. Calidad premium, directo a ti.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={scrollToCatalog} className="bg-deep-charcoal text-white font-label-md text-label-md px-10 py-4 rounded-full hover:bg-surface-tint transition-colors">Ver Catálogo</button>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="border border-outline-variant text-on-surface-variant font-label-md text-label-md px-10 py-4 rounded-full hover:border-primary hover:text-primary transition-colors inline-flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">chat</span>Consultar
              </a>
            </div>
          </div>
        </section>

        <section id="catalog" className="px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto mb-section-gap">
          <div className="flex flex-col items-center mb-8">
            <h2 className="font-headline-md text-headline-md text-deep-charcoal mb-2 text-center">Catálogo Completo</h2>
            <p className="font-body-md text-body-md text-on-surface-variant text-center mb-6">{filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} disponible{filteredProducts.length !== 1 ? "s" : ""}</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {ALL_CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat as Category | "Todas")}
                  className={`px-5 py-2 rounded-full font-label-sm text-label-sm border transition-all duration-200 ${activeCategory === cat ? "bg-deep-charcoal text-white border-deep-charcoal" : "bg-transparent text-secondary border-outline-variant hover:border-secondary"}`}>{cat}</button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {ALL_BRANDS.map((brand) => (
                <button key={brand} onClick={() => setActiveBrand(brand as Brand | "Todas")}
                  className={`px-4 py-1.5 rounded-full font-label-sm text-[11px] border transition-all duration-200 ${activeBrand === brand ? "bg-rose-gold text-white border-rose-gold" : "bg-transparent text-on-surface-variant border-outline-variant/60 hover:border-rose-gold/60 hover:text-rose-gold"}`}>{brand}</button>
              ))}
            </div>
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-gutter">
              {filteredProducts.map((product) => <ProductCard key={product.id} product={product} onAddToCart={addToCart} />)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <span className="material-symbols-outlined text-6xl text-outline-variant">search_off</span>
              <p className="font-headline-sm text-headline-sm text-on-surface-variant">No encontramos productos</p>
              <button onClick={() => { setActiveBrand("Todas"); setActiveCategory("Todas"); setSearchQuery(""); }}
                className="mt-2 border border-outline-variant text-secondary font-label-md text-label-md px-6 py-2 rounded-full hover:bg-surface-container">Ver todo</button>
            </div>
          )}
        </section>
      </main>

      <footer className="w-full py-section-gap px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter bg-surface-container text-on-surface">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-deep-charcoal mb-stack-md">Selene Makeup</h3>
          <p className="font-body-md text-body-md mb-4 text-on-surface-variant max-w-sm">Elevando tu belleza natural con cosméticos curados y de calidad premium.</p>
        </div>
        <div className="md:col-span-2 flex flex-col md:flex-row justify-between gap-stack-lg">
          <div className="flex flex-col gap-stack-sm">
            <h4 className="font-label-md text-label-md uppercase tracking-wider mb-2">Atención al Cliente</h4>
            <span className="font-body-md text-body-md text-secondary italic">Envíos a toda Venezuela</span>
          </div>
          <div className="flex flex-col gap-stack-sm">
            <h4 className="font-label-md text-label-md uppercase tracking-wider mb-2">Síguenos</h4>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary flex items-center gap-2" href="https://instagram.com/selenemakeup1" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined text-sm">photo_camera</span>@selenemakeup1
            </a>
          </div>
        </div>
        <div className="md:col-span-3 border-t border-outline-variant/30 mt-stack-lg pt-stack-md">
          <p className="font-body-md text-body-md text-on-surface-variant">&copy; 2024 Selene Makeup. Todos los derechos reservados.</p>
        </div>
      </footer>

      <a className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50 flex items-center justify-center"
        href="https://wa.me/" target="_blank" rel="noopener noreferrer">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d={WaPath} /></svg>
      </a>

      {cartOpen && <CartDrawer items={cartItems} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onQtyChange={changeQty} />}
    </div>
  );
}
