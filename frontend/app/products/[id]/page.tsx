"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [roomImage, setRoomImage] = useState<string | null>(null);
  const [renderedImage, setRenderedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setRoomImage(URL.createObjectURL(file));
    setIsUploading(true);

    const formData = new FormData();
    formData.append('room_image', file);
    formData.append('rug_id', 'premium-persian-rug');

    try {
      const response = await fetch('http://localhost:8000/api/v1/visualize', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.status === 'success') {
        // Construct full URL for the rendered image
        const fullUrl = data.result_url.startsWith('http')
          ? data.result_url
          : `http://localhost:8000${data.result_url}`;
        setRenderedImage(fullUrl);
      }
    } catch (error) {
      console.error('Error visualizing rug:', error);
      // Fallback for demo purposes if backend isn't running
      setRenderedImage("https://placehold.co/600x400?text=Mock+Visualization+Active");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center font-bold text-xl" href="/">
          CarpetViz
        </Link>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              <img
                src={renderedImage || "https://placehold.co/600x600?text=Premium+Persian+Rug"}
                alt="Product Image"
                className="w-full h-full object-cover"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                  AI is processing...
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Premium Persian Silk Rug</h1>
              <p className="text-xl text-gray-500 mt-2">$2,499.00</p>
            </div>
            <p className="text-gray-600">
              Hand-woven by master artisans, this silk rug features intricate geometric patterns
              and a rich color palette that adds elegance to any room.
            </p>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                ⭐ Try it in your room
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload room photo</span>
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG (MAX. 800x400px)</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                </label>
              </div>
            </div>

            <button className="w-full bg-stone-900 text-white py-3 rounded-md font-medium hover:bg-stone-800 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
