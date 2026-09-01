"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";

export type Brand = "Dolce Bella" | "Salomé" | "Ushas" | "Max Glow" | "Beauty Creations" | "Kevin & Coco" | "Dici" | "Trendy" | "Sin Marca";
export type Category = "Labios" | "Ojos" | "Rostro" | "Accesorios" | "Skincare";

export interface Product {
  id: string;
  brand: Brand;
  name: string;
  category: Category;
  shades?: string[];
  stock: number;
  note?: string;
  image?: string;
  price: number;
}

const WaPath = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

interface CartItem {
  product: Product;
  shade?: string;
  qty: number;
}



const ALL_BRANDS: (Brand | "Todas")[] = ["Todas", "Dolce Bella", "Salomé", "Ushas", "Max Glow", "Beauty Creations", "Kevin & Coco", "Dici", "Trendy", "Sin Marca"];
const ALL_CATEGORIES: (Category | "Todas")[] = ["Todas", "Labios", "Rostro", "Ojos", "Accesorios", "Skincare"];

/* ─── ProductCard ─────────────────────────────────────────────────────────── */
function ProductCard({ product, onAddToCart, onQuickView, index }: {
  product: Product;
  onAddToCart: (p: Product, shade?: string) => void;
  onQuickView: (p: Product) => void;
  index?: number;
}) {
  const [selectedShade, setSelectedShade] = useState<string | undefined>(product.shades?.[0]);
  const delay = index !== undefined ? `${Math.min(index % 8, 7) * 0.07}s` : "0s";
  const isOOS = product.stock === 0;

  return (
    <div
      onClick={() => onQuickView(product)}
      className={`product-card group cursor-pointer flex flex-col animate-fade-up ${isOOS ? "opacity-55" : ""}`}
      style={{ animationDelay: delay }}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-low rounded">
        {product.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
              loading="lazy"
            />
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-container">
            <span className="material-symbols-outlined text-4xl text-rose-gold/50">auto_awesome</span>
          </div>
        )}

        {/* Out of stock overlay */}
        {isOOS && (
          <div className="absolute inset-0 flex items-end justify-center pb-4 bg-white/10">
            <span className="bg-white/95 text-on-surface text-[9px] font-semibold uppercase tracking-widest px-3 py-1 rounded-sm">
              Agotado
            </span>
          </div>
        )}

        {/* Quick add button (bottom-right, appears on hover) */}
        {!isOOS && (
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product, selectedShade); }}
            className="absolute bottom-2.5 right-2.5 w-9 h-9 bg-white/95 rounded-full flex items-center justify-center text-on-surface shadow-sm z-10
                       md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0
                       hover:bg-white hover:shadow-[0_0_14px_rgba(197,151,137,0.45),0_0_5px_rgba(212,163,115,0.25)] hover:border hover:border-rose-gold/30
                       transition-all duration-250 ease-out"
            aria-label={`Agregar ${product.name}`}
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
          </button>
        )}
      </div>

      {/* Info */}
      <div className="product-card-info flex flex-col flex-1">
        {/* Brand */}
        <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-rose-gold mb-1 truncate">
          {product.brand}
        </p>

        {/* Name + Price row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-['Libre_Caslon_Text'] text-[11px] sm:text-[12px] text-on-surface leading-snug line-clamp-2 flex-1">
            {product.name}
          </h3>
          <span className="text-[11px] font-semibold text-primary shrink-0 mt-0.5">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Note */}
        {product.note && (
          <p className="text-[9px] text-secondary/60 italic mb-2 truncate">{product.note}</p>
        )}

        {/* Shades */}
        {product.shades && product.shades.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.shades.map((shade) => (
              <button
                key={shade}
                onClick={(e) => { e.stopPropagation(); setSelectedShade(shade); }}
                className={`px-2 py-0.5 border text-[8px] uppercase tracking-wide transition-all duration-150 rounded-full ${
                  selectedShade === shade
                    ? "bg-deep-charcoal text-white border-deep-charcoal"
                    : "bg-transparent text-secondary/70 border-outline-variant/50 hover:border-secondary/60 hover:bg-surface-container-low"
                }`}
              >
                {shade}
              </button>
            ))}
          </div>
        )}

        {/* Footer: category + add */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-outline-variant/20 gap-2">
          <span className="text-[9px] text-on-surface-variant/40 uppercase tracking-wider truncate">
            {product.category}
          </span>
          {!isOOS ? (
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart(product, selectedShade); }}
              className="text-[9px] uppercase tracking-widest font-medium text-on-surface/50 hover:text-rose-gold transition-colors duration-200 flex items-center gap-1 shrink-0 py-1"
            >
              <span className="material-symbols-outlined text-[13px]">add_shopping_cart</span>
              Agregar
            </button>
          ) : (
            <span className="text-[9px] uppercase tracking-widest text-error/50 shrink-0">Agotado</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── QuickViewModal ──────────────────────────────────────────────────────── */
function QuickViewModal({ product, onClose, onAddToCart }: {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product, shade?: string) => void;
}) {
  const [selectedShade, setSelectedShade] = useState<string | undefined>(product.shades?.[0]);
  const isOOS = product.stock === 0;

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-deep-charcoal/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-paper-white shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scale-pop max-h-[88vh] rounded-lg border border-outline-variant/20">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/95 backdrop-blur-md rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface hover:border-rose-gold/50 hover:text-rose-gold transition-all duration-200"
          aria-label="Cerrar"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Image */}
        <div className="md:w-[45%] relative aspect-square md:aspect-auto bg-surface-container-low shrink-0 md:border-r md:border-outline-variant/20">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-rose-gold/40">auto_awesome</span>
            </div>
          )}
          {isOOS && (
            <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
              <span className="bg-white text-on-surface text-xs font-semibold uppercase tracking-widest px-4 py-2">Agotado</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-rose-gold mb-2">{product.brand}</p>
          <h2 className="font-['Libre_Caslon_Text'] text-2xl sm:text-3xl text-on-surface leading-tight mb-3">
            {product.name}
          </h2>

          {product.note && (
            <p className="text-xs italic text-secondary/70 mb-4 leading-relaxed">{product.note}</p>
          )}

          {/* Price + Stock */}
          <div className="flex items-center gap-4 mb-6 pb-5 border-b border-outline-variant/20">
            <span className="font-['Libre_Caslon_Text'] text-2xl text-primary">${product.price.toFixed(2)}</span>
            <span className={`text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-sm ${
              isOOS ? "bg-error/10 text-error" : "bg-surface-container text-on-surface-variant"
            }`}>
              {isOOS ? "Agotado" : `${product.stock} disponibles`}
            </span>
          </div>

          {/* Shades */}
          {product.shades && product.shades.length > 0 && (
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-widest font-medium text-on-surface-variant mb-3">Tono</p>
              <div className="flex flex-wrap gap-2">
                {product.shades.map((shade) => (
                  <button
                    key={shade}
                    onClick={() => setSelectedShade(shade)}
                    className={`px-4 py-1.5 border text-[11px] font-medium transition-all duration-200 rounded-full ${
                      selectedShade === shade
                        ? "bg-deep-charcoal text-white border-deep-charcoal"
                        : "bg-transparent text-secondary border-outline-variant hover:border-rose-gold/60 hover:bg-surface-container-low"
                    }`}
                  >
                    {shade}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto space-y-3">
            <button
              onClick={() => { if (!isOOS) { onAddToCart(product, selectedShade); onClose(); } }}
              disabled={isOOS}
              className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CartDrawer ──────────────────────────────────────────────────────────── */
function CartDrawer({ items, onClose, onRemove, onQtyChange }: {
  items: CartItem[];
  onClose: () => void;
  onRemove: (id: string, shade?: string) => void;
  onQtyChange: (id: string, shade: string | undefined, delta: number) => void;
}) {
  const totalQty = items.reduce((acc, i) => acc + i.qty, 0);
  const totalPrice = items.reduce((acc, i) => acc + i.qty * i.product.price, 0);
  const waItems = items.map((i) => `• ${i.product.name}${i.shade ? ` (${i.shade})` : ""} x${i.qty} ($${(i.product.price * i.qty).toFixed(2)})`).join("%0A");
  const waMsg = `Hola! Me interesa pedir:%0A${waItems}%0A%0ATotal: ${totalQty} producto(s)%0ATotal a pagar: $${totalPrice.toFixed(2)}`;
  const waUrl = `https://wa.me/584244162454?text=${waMsg}`;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-deep-charcoal/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full sm:max-w-sm bg-paper-white shadow-2xl flex flex-col h-full animate-slide-in-right">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/25">
          <div>
            <h2 className="font-['Libre_Caslon_Text'] text-xl text-on-surface">Mi selección</h2>
            {totalQty > 0 && (
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mt-0.5">{totalQty} producto{totalQty !== 1 ? "s" : ""}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all duration-200"
            aria-label="Cerrar"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <span className="material-symbols-outlined text-5xl text-outline-variant/60">shopping_bag</span>
              <p className="text-sm text-on-surface-variant">Tu selección está vacía.</p>
              <button onClick={onClose} className="text-[10px] uppercase tracking-widest text-rose-gold font-medium hover:underline">
                Explorar catálogo
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.shade}`} className="flex items-start gap-3 pb-5 border-b border-outline-variant/15 last:border-0">
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-sm bg-surface-container-low overflow-hidden shrink-0">
                  {item.product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-xl text-rose-gold/50">auto_awesome</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[9px] uppercase tracking-widest text-on-surface-variant/60 mb-0.5 truncate">{item.product.brand}</p>
                  <p className="text-sm text-on-surface leading-tight line-clamp-2 font-medium mb-1">{item.product.name}</p>
                  {item.shade && <p className="text-[9px] text-rose-gold mb-1.5">{item.shade}</p>}

                  <div className="flex items-center justify-between">
                    {/* Qty controls */}
                    <div className="flex items-center gap-2">
                      <button onClick={() => onQtyChange(item.product.id, item.shade, -1)} className="qty-btn" aria-label="Reducir">
                        <span className="material-symbols-outlined text-[13px]">remove</span>
                      </button>
                      <span className="text-sm font-medium w-4 text-center tabular-nums">{item.qty}</span>
                      <button onClick={() => onQtyChange(item.product.id, item.shade, 1)} className="qty-btn" aria-label="Aumentar">
                        <span className="material-symbols-outlined text-[13px]">add</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-primary">${(item.product.price * item.qty).toFixed(2)}</span>
                      <button
                        onClick={() => onRemove(item.product.id, item.shade)}
                        className="text-on-surface-variant/30 hover:text-error transition-colors duration-200"
                        aria-label="Eliminar"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-outline-variant/25 space-y-4 bg-surface-container-low/50">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">Total</span>
              <span className="font-['Libre_Caslon_Text'] text-2xl text-on-surface">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-[9px] text-center text-on-surface-variant/70 italic pb-1">
              Al realizar tu pedido, aceptas nuestros <a href="/terminos" target="_blank" className="underline hover:text-rose-gold">Términos</a> y <a href="/envios" target="_blank" className="underline hover:text-rose-gold">Políticas de Envío</a>.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border border-[#25D366]/40 bg-[#25D366]/5 hover:bg-[#25D366]/15 text-on-surface text-[10px] font-medium uppercase tracking-[0.15em] py-2.5 rounded-sm transition-all duration-300"
            >
              <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24"><path d={WaPath} /></svg>
              Pedir por WhatsApp
            </a>
            <button
              onClick={onClose}
              className="w-full text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors py-2"
            >
              Seguir explorando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── StoreFront ────────────────────────────────────────────────────────────────── */
export default function StoreFront({ initialProducts }: { initialProducts: Product[] }) {
  const [activeBrand, setActiveBrand] = useState<Brand | "Todas">("Todas");
  const [activeCategory, setActiveCategory] = useState<Category | "Todas">("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; key: number } | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => { setVisibleCount(16); }, [activeBrand, activeCategory, searchQuery]);

  // Persist cart
  useEffect(() => {
    const saved = localStorage.getItem("selene_cart");
    if (saved) { try { setCartItems(JSON.parse(saved)); } catch { } }
    setCartLoaded(true);
  }, []);
  useEffect(() => {
    if (cartLoaded) localStorage.setItem("selene_cart", JSON.stringify(cartItems));
  }, [cartItems, cartLoaded]);

  const filteredProducts = useMemo(() => initialProducts.filter((p) => {
    const matchBrand = activeBrand === "Todas" || p.brand === activeBrand;
    const matchCat = activeCategory === "Todas" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.shades?.some((s) => s.toLowerCase().includes(q));
    return matchBrand && matchCat && matchSearch;
  }), [initialProducts, activeBrand, activeCategory, searchQuery]);

  const cartCount = cartItems.reduce((a, b) => a + b.qty, 0);

  function showToast(msg: string) {
    setToast({ msg, key: Date.now() });
    setTimeout(() => setToast(null), 2200);
  }

  function addToCart(product: Product, shade?: string) {
    if (product.stock <= 0) return;
    let didAdd = true;
    setCartItems((prev) => {
      const ex = prev.find((i) => i.product.id === product.id && i.shade === shade);
      if (ex) {
        if (ex.qty >= product.stock) { didAdd = false; showToast(`Solo hay ${product.stock} disponibles`); return prev; }
        return prev.map((i) => i.product.id === product.id && i.shade === shade ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { product, shade, qty: 1 }];
    });
    if (didAdd) showToast(`${product.name}${shade ? ` · ${shade}` : ""} — agregado`);
  }

  function removeFromCart(id: string, shade?: string) {
    setCartItems((prev) => prev.filter((i) => !(i.product.id === id && i.shade === shade)));
  }

  function changeQty(id: string, shade: string | undefined, delta: number) {
    setCartItems((prev) => prev.map((i) => {
      if (i.product.id === id && i.shade === shade) {
        const newQty = i.qty + delta;
        if (newQty > i.product.stock) { showToast(`Solo hay ${i.product.stock} disponibles`); return { ...i, qty: i.product.stock }; }
        return { ...i, qty: newQty };
      }
      return i;
    }).filter((i) => i.qty > 0));
  }

  const scrollToCatalog = () => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-surface text-on-surface min-h-screen relative overflow-hidden">

      {/* ── Ambient Global Background ───────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden opacity-40 mix-blend-multiply" aria-hidden="true">
        {/* Soft blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-rose-gold/20 blur-[100px] animate-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-warm-nude/30 blur-[120px] animate-blob animation-delay-4000" />
        <div className="absolute top-[40%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-surface-tint/10 blur-[90px] animate-blob animation-delay-2000" />
      </div>
      {/* Subtle noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-noise opacity-[0.04] mix-blend-overlay" aria-hidden="true" />
      
      {/* ── Content Wrapper ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col min-h-screen">
      {/* Toast */}
      {toast && (
        <div
          key={toast.key}
          className="toast fixed top-5 left-1/2 -translate-x-1/2 z-[200] animate-scale-pop max-w-[85vw] text-center"
        >
          {toast.msg}
        </div>
      )}

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center px-4 md:px-12 py-0 h-[60px] md:h-[72px] backdrop-blur-xl bg-paper-white/92 border-b border-outline-variant/20">

        {/* Left: mobile menu+search / desktop nav */}
        <div className="flex-1 flex items-center gap-1">
          {/* Mobile */}
          <button className="md:hidden w-10 h-10 flex items-center justify-center text-on-surface/70 hover:text-on-surface transition-colors" onClick={() => setMobileMenuOpen((v) => !v)} aria-label="Menú">
            <span className="material-symbols-outlined text-[22px]">{mobileMenuOpen ? "close" : "menu"}</span>
          </button>
          <button className="md:hidden w-10 h-10 flex items-center justify-center text-on-surface/70 hover:text-on-surface transition-colors" onClick={() => setSearchOpen((v) => !v)} aria-label="Buscar">
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {ALL_CATEGORIES.filter((c) => c !== "Todas").map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat as Category); scrollToCatalog(); }}
                className={`text-[11px] uppercase tracking-[0.12em] font-medium pb-0.5 border-b transition-all duration-200 ${
                  activeCategory === cat
                    ? "text-on-surface border-rose-gold"
                    : "text-on-surface/50 border-transparent hover:text-on-surface hover:border-on-surface/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        {/* Center: Logo */}
        <div className="flex items-center justify-center shrink-0">
          <button
            onClick={() => { setActiveBrand("Todas"); setActiveCategory("Todas"); setSearchQuery(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center"
            aria-label="Inicio"
          >
            <Image
              alt="Selene"
              src="/logo.png"
              width={120}
              height={48}
              priority
              className="h-9 md:h-12 w-auto object-contain"
            />
          </button>
        </div>

        {/* Right: search, whatsapp, cart */}
        <div className="flex-1 flex items-center justify-end gap-1 md:gap-2">
          <div className="hidden md:flex relative items-center group">
            <input
              className="bg-transparent border-0 border-b border-on-surface/20 px-0 pr-6 py-1 text-[12px] w-28 group-hover:w-48 focus:w-48 outline-none group-hover:border-rose-gold focus:border-rose-gold transition-all duration-300 ease-out placeholder:text-on-surface/30"
              placeholder="Buscar..."
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); scrollToCatalog(); }}
            />
            <span className="material-symbols-outlined absolute right-0 text-[16px] text-on-surface/30 group-hover:text-rose-gold transition-colors duration-300">search</span>
          </div>
          <a
            href="https://wa.me/584244162454"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center text-on-surface/60 hover:text-on-surface transition-colors"
            aria-label="WhatsApp"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
          </a>
          <button
            onClick={() => setCartOpen(true)}
            className="relative w-10 h-10 flex items-center justify-center text-on-surface/60 hover:text-on-surface transition-colors"
            aria-label="Carrito"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1 bg-rose-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-scale-pop leading-none">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="fixed top-[60px] left-0 w-full z-40 px-4 py-3 bg-paper-white/98 backdrop-blur-xl border-b border-outline-variant/20 animate-slide-in-down">
          <input
            autoFocus
            className="w-full bg-surface-container rounded-none border-b border-outline-variant/40 focus:border-primary px-3 py-2.5 text-sm outline-none"
            placeholder="Buscar productos..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Mobile side menu */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 z-[39] bg-black/20" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-[60px] left-0 w-4/5 max-w-xs z-40 bg-paper-white shadow-2xl flex flex-col h-[calc(100vh-60px)] animate-slide-in-left">
            <div className="px-6 py-5 border-b border-outline-variant/15">
              <p className="text-[9px] uppercase tracking-widest text-on-surface-variant/50 mb-4">Categorías</p>
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat as Category | "Todas"); setMobileMenuOpen(false); scrollToCatalog(); }}
                  className={`flex items-center w-full text-left text-sm py-3 border-b border-outline-variant/10 last:border-0 gap-3 min-h-[44px] transition-colors ${
                    activeCategory === cat ? "text-on-surface font-medium" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="px-6 py-4">
              <p className="text-[9px] uppercase tracking-widest text-on-surface-variant/50 mb-4">Marcas</p>
              {ALL_BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => { setActiveBrand(brand as Brand | "Todas"); setMobileMenuOpen(false); scrollToCatalog(); }}
                  className={`w-full text-left text-sm py-2.5 border-b border-outline-variant/10 last:border-0 min-h-[44px] transition-colors ${
                    activeBrand === brand ? "text-on-surface font-semibold" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <main className="pt-[60px] md:pt-[72px]">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="hero-section relative px-5 md:px-16 lg:px-24 pt-16 md:pt-24 pb-16 md:pb-20 border-b border-outline-variant/15 overflow-hidden">

          {/* ── Animated rising background shapes ── */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {/* Large soft orb — rose gold, drifts up-right */}
            <div className="hero-orb hero-orb-1" />
            {/* Medium orb — warm nude, drifts up-left */}
            <div className="hero-orb hero-orb-2" />
            {/* Small crisp circle — linen, rises fast */}
            <div className="hero-orb hero-orb-3" />
            {/* Thin vertical shimmer line */}
            <div className="hero-line hero-line-1" />
            {/* Second thin line */}
            <div className="hero-line hero-line-2" />
            {/* Floating petal/ellipse — bottom center */}
            <div className="hero-petal" />
          </div>

          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end relative z-10">

            {/* Main text block */}
            <div>
              {/* Eyebrow — small, tasteful, not the "subtitle above title" cliché */}
              <div className="flex items-center gap-3 mb-8 animate-fade-up stagger-1">
                <span className="ornament-line"></span>
                <p className="text-[10px] uppercase tracking-[0.22em] text-on-surface/40">Venezuela · Makeup Curado</p>
              </div>

              {/* Hero title — massive, editorial, just the name */}
              <h1 className="font-['Libre_Caslon_Text'] leading-[0.9] tracking-tight mb-8 animate-fade-up stagger-2">
                <span className="block text-[clamp(4rem,12vw,9rem)] italic font-normal text-on-surface/15 select-none" aria-hidden="true">Selene</span>
                <span className="block text-[clamp(2.5rem,8vw,6.5rem)] font-normal text-on-surface -mt-3 md:-mt-5">
                  The&nbsp;<em className="text-shimmer not-italic">Art</em>&nbsp;of&nbsp;Makeup.
                </span>
              </h1>

              {/* One-liner — short and confident */}
              <p className="text-sm md:text-base text-on-surface/50 max-w-sm leading-relaxed mb-10 animate-fade-up stagger-3">
                Cosméticos de calidad premium, seleccionados para ti. Disponibles en Venezuela.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 animate-fade-up stagger-4">
                <button onClick={scrollToCatalog} className="btn-primary">
                  Ver colección
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
                <a
                  href="https://wa.me/584244162454"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Consultar
                </a>
              </div>
            </div>

            {/* Right: stats / editorial info block */}
            <div className="hidden md:flex flex-col gap-6 items-end text-right animate-fade-up stagger-4 pb-2">
              <div>
                <p className="font-['Libre_Caslon_Text'] text-5xl text-on-surface/10 leading-none">{initialProducts.length}</p>
                <p className="text-[9px] uppercase tracking-widest text-on-surface/35 mt-1">Productos</p>
              </div>
              <div className="w-px h-12 bg-outline-variant/30 self-end mr-2"></div>
              <div>
                <p className="font-['Libre_Caslon_Text'] text-5xl text-on-surface/10 leading-none">{ALL_BRANDS.length - 1}</p>
                <p className="text-[9px] uppercase tracking-widest text-on-surface/35 mt-1">Marcas</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Catalog ───────────────────────────────────────────────────────── */}
        <section id="catalog" className="px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1280px] mx-auto pt-14 pb-28 md:pb-16">

          {/* Catalog header */}
          <div className="mb-10 md:mb-12">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-['Libre_Caslon_Text'] text-2xl md:text-3xl text-on-surface">La Colección</h2>
              <span className="text-[10px] uppercase tracking-widest text-on-surface/35">
                {filteredProducts.length} {filteredProducts.length !== 1 ? "productos" : "producto"}
              </span>
            </div>

            {/* Category tabs */}
            <div className="w-full border-b border-outline-variant/20 mb-5">
              <div className="w-full overflow-x-auto hide-scrollbar -mx-1 px-1 -my-2 py-2">
                <div className="flex gap-6 md:gap-8 min-w-max px-0 pb-0">
                  {ALL_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat as Category | "Todas")}
                      className={`filter-tab whitespace-nowrap ${activeCategory === cat ? "active text-on-surface" : "text-on-surface/40 hover:text-on-surface"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Brand filters */}
            <div className="w-full overflow-x-auto hide-scrollbar -mx-2 px-2 -my-4 py-4">
              <div className="flex gap-2 min-w-max">
                {ALL_BRANDS.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setActiveBrand(brand as Brand | "Todas")}
                    className={`brand-pill ${activeBrand === brand ? "active" : "text-on-surface/50"}`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
                {filteredProducts.slice(0, visibleCount).map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onQuickView={setQuickViewProduct}
                    index={i}
                  />
                ))}
              </div>
              {visibleCount < filteredProducts.length && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => setVisibleCount((v) => v + 16)}
                    className="btn-ghost"
                  >
                    Cargar más
                    <span className="material-symbols-outlined text-[15px]">expand_more</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <span className="material-symbols-outlined text-5xl text-outline-variant/40">search_off</span>
              <p className="text-sm text-on-surface-variant">No encontramos lo que buscas.</p>
              <button
                onClick={() => { setActiveBrand("Todas"); setActiveCategory("Todas"); setSearchQuery(""); }}
                className="btn-ghost py-2 px-6 text-[10px]"
              >
                Ver todo
              </button>
            </div>
          )}
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-outline-variant/20 bg-surface-container-low/60">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Image src="/logo.png" alt="Selene" width={80} height={32} className="h-8 w-auto mb-4 opacity-70" />
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-xs">
              Cosméticos curados con criterio. Belleza premium accesible en Venezuela.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[9px] uppercase tracking-widest text-on-surface/30 mb-1">Atención</p>
            <span className="text-sm text-on-surface-variant">Envíos a toda Venezuela</span>
            <a href="https://wa.me/584244162454" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px]">chat</span>
              Consultar por WhatsApp
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[9px] uppercase tracking-widest text-on-surface/30 mb-1">Redes</p>
            <a
              href="https://instagram.com/selenemakeup1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[15px]">photo_camera</span>
              @selenemakeup1
            </a>
          </div>
        </div>
        <div className="border-t border-outline-variant/15 px-5 md:px-12 py-4">
          <p className="text-[10px] text-on-surface/25">© 2025 Selene Makeup Store</p>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        className="wa-float fixed bottom-6 right-5 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg z-50 flex items-center justify-center"
        href="https://wa.me/584244162454"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d={WaPath} /></svg>
      </a>

      {/* Overlays */}
      {cartOpen && (
        <CartDrawer
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onQtyChange={changeQty}
        />
      )}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={addToCart}
        />
      )}
      </div>
    </div>
  );
}
