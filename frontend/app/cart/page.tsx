import Link from 'next/link';

export default function CartPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center font-bold text-xl" href="/">CarpetViz</Link>
      </header>
      <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="border rounded-lg p-6 space-y-4">
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
              <img src="https://placehold.co/400x400?text=Persian+Rug" alt="Product" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Premium Persian Silk Rug</h3>
              <p className="text-sm text-gray-500">Size: 8' x 10'</p>
              <p className="mt-2 font-medium">$2,499.00</p>
            </div>
          </div>
          <div className="pt-4 border-t flex justify-between items-center">
            <span className="text-lg font-bold">Total</span>
            <span className="text-xl font-bold">$2,499.00</span>
          </div>
          <Link href="/checkout" className="block w-full text-center bg-stone-900 text-white py-3 rounded-md font-medium hover:bg-stone-800 transition-colors">
            Proceed to Checkout
          </Link>
        </div>
      </main>
    </div>
  );
}
