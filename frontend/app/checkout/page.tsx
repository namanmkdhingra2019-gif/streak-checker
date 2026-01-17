import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center font-bold text-xl" href="/">CarpetViz</Link>
      </header>
      <main className="flex-1 p-4 md:p-8 max-w-2xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <form className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" />
            <input type="text" placeholder="Street Address" className="w-full border p-2 rounded" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="City" className="border p-2 rounded" />
              <input type="text" placeholder="Zip Code" className="border p-2 rounded" />
            </div>
          </div>
          <div className="space-y-4 pt-4 border-t">
            <h2 className="text-xl font-semibold">Payment</h2>
            <input type="text" placeholder="Card Number" className="w-full border p-2 rounded" />
          </div>
          <button type="button" className="w-full bg-stone-900 text-white py-3 rounded-md font-medium hover:bg-stone-800 transition-colors">
            Place Order ($2,499.00)
          </button>
        </form>
      </main>
    </div>
  );
}
