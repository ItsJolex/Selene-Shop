'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-surface-container-low text-on-surface flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface border-b md:border-r border-outline-variant/20 flex flex-col">
        <div className="p-6 border-b border-outline-variant/20">
          <Link href="/" className="font-['Libre_Caslon_Text'] text-2xl text-on-surface">Selene Admin</Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${pathname === '/admin' ? 'bg-primary/10 text-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
          >
            <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            Productos
          </Link>
          <Link 
            href="/admin/nuevo" 
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${pathname === '/admin/nuevo' ? 'bg-primary/10 text-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Nuevo Producto
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
