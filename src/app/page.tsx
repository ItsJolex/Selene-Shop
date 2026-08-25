import Image from 'next/image';

export default function Home() {
  const products = [
    { name: 'Glow Tint', brand: 'Dolce Bella', price: '$5.99' },
    { name: 'Hydratint Concealer', brand: 'Salomé', price: '$5.99' },
    { name: 'Lip Oil Fruity Gloss', brand: 'Max Glow', price: '$5.99' },
    { name: 'Sweet Lip Balm', brand: 'Ushas', price: '$5.99' },
  ];

  return (
    <div className="min-h-screen bg-selene-nude text-selene-dark font-sans flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 border-b border-selene-dark/10 flex flex-col items-center">
        <Image src="/logo.png" alt="Selene Make Up Store" width={250} height={80} priority className="mb-4" />
        <nav className="flex space-x-6 text-sm uppercase tracking-widest font-semibold">
          <a href="#" className="hover:text-selene-rosegold transition-colors">Maquillaje</a>
          <a href="#" className="hover:text-selene-rosegold transition-colors">Skincare</a>
          <a href="#" className="hover:text-selene-rosegold transition-colors">Accesorios</a>
        </nav>
      </header>

      {/* Hero Section (Minimalist) */}
      <main className="flex-grow">
        <section className="py-24 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-selene-dark">Effortless Glow</h1>
          <p className="max-w-xl mx-auto text-lg text-selene-dark/80 mb-10">
            The Art of Makeup. Curated luxury for your everyday beauty routine.
          </p>
          <button className="bg-selene-dark text-selene-nude px-8 py-3 rounded-full hover:bg-selene-rosegold hover:text-white transition-all text-sm uppercase tracking-wider font-semibold">
            Ver Catálogo
          </button>
        </section>

        {/* Brand Filters */}
        <section className="py-8 border-t border-b border-selene-dark/10 flex justify-center space-x-4 overflow-x-auto px-4">
          {['Todas', 'Dolce Bella', 'Salomé', 'Ushas', 'Max Glow'].map((brand) => (
            <button key={brand} className="px-4 py-2 border border-selene-dark/20 rounded-full hover:border-selene-rosegold hover:text-selene-rosegold transition-colors whitespace-nowrap">
              {brand}
            </button>
          ))}
        </section>

        {/* Product Grid */}
        <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
          <h2 className="text-2xl font-serif text-center mb-12">Nuestros Favoritos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-white rounded-lg mb-4 flex items-center justify-center text-selene-dark/20 group-hover:shadow-xl transition-all border border-transparent group-hover:border-selene-rosegold">
                  <span className="text-sm">Imagen de {product.name}</span>
                </div>
                <div className="text-center">
                  <p className="text-xs text-selene-dark/60 uppercase tracking-wider mb-1">{product.brand}</p>
                  <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                  <p className="text-selene-rosegold font-semibold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 px-4 text-center border-t border-selene-dark/10">
        <p className="mb-4">Envíos a toda Venezuela 🇻🇪</p>
        <a href="https://instagram.com/selenemakeup1" target="_blank" className="font-bold hover:text-selene-rosegold transition-colors">@selenemakeup1</a>
      </footer>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/1234567890" className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      </a>
    </div>
  );
}
