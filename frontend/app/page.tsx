import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center font-bold text-xl" href="#">
          CarpetViz
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/categories">
            Collections
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/cart">
            Cart
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/admin">
            Admin
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-stone-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Luxury Rugs, Visualized in Your Space
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Experience our premium collection using AI-powered room visualization.
                  See it, love it, buy it.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-11 items-center justify-center rounded-md bg-stone-900 px-8 py-2 text-sm font-medium text-stone-50 shadow transition-colors hover:bg-stone-900/90"
                  href="/products/premium-persian-rug"
                >
                  View Rugs in Your Room
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2025 CarpetViz Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
