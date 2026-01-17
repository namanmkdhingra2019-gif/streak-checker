import Link from 'next/link';

const PRODUCTS = [
  { id: 'premium-persian', name: 'Premium Persian Silk Rug', price: 2499, image: 'https://placehold.co/400x400?text=Persian+Rug' },
  { id: 'modern-abstract', name: 'Modern Abstract Wool Rug', price: 1299, image: 'https://placehold.co/400x400?text=Abstract+Rug' },
  { id: 'vintage-tribal', name: 'Vintage Tribal Rug', price: 1899, image: 'https://placehold.co/400x400?text=Tribal+Rug' },
  { id: 'minimalist-jute', name: 'Minimalist Jute Rug', price: 499, image: 'https://placehold.co/400x400?text=Jute+Rug' },
];

export default function CategoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center font-bold text-xl" href="/">CarpetViz</Link>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8">All Collections</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map(product => (
            <Link key={product.id} href={`/products/${product.id}`} className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-500">${product.price}.00</p>
                <div className="mt-4 text-sm font-medium text-stone-900 group-hover:underline">View in Room →</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
