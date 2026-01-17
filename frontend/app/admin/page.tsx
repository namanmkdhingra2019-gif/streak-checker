import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-stone-900 text-white">
        <Link className="flex items-center justify-center font-bold text-xl" href="/">CarpetViz Admin</Link>
        <nav className="ml-auto flex gap-4 text-sm font-medium">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/orders">Orders</Link>
        </nav>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
            <p className="text-2xl font-bold">124</p>
          </div>
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">AI Visualizations</h3>
            <p className="text-2xl font-bold">3,892</p>
          </div>
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
            <p className="text-2xl font-bold">$142,500</p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Product Catalog</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-medium text-sm">Product</th>
                  <th className="p-4 font-medium text-sm">Dimensions</th>
                  <th className="p-4 font-medium text-sm">Price</th>
                  <th className="p-4 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4 text-sm font-medium">Premium Persian Silk Rug</td>
                  <td className="p-4 text-sm text-gray-500">8' x 10'</td>
                  <td className="p-4 text-sm text-gray-500">$2,499.00</td>
                  <td className="p-4 text-sm text-stone-900 underline">Edit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
