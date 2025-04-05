"use client";

import { useState } from "react";
import Image from "next/image";
import { MovieList } from "@/types/movie";
import { useCart } from "@/context/CartContext";

interface FeaturedListsProps {
  lists: MovieList[];
}

export default function FeaturedLists({ lists }: FeaturedListsProps) {
  const { addToCart, updatePrice } = useCart();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState<string>("");

  const formatPrice = (price: number | undefined) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price || 1);
  };

  const handlePriceEdit = (list: MovieList) => {
    setEditingId(list.id);
    setEditPrice(String(list.price || 1));
  };

  const handlePriceSave = (list: MovieList) => {
    const newPrice = parseFloat(editPrice);
    if (!isNaN(newPrice) && newPrice > 0) {
      list.price = newPrice;
      updatePrice(list.id, newPrice); // Update price in cart if item exists
    }
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Featured Lists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.length > 0 &&
          lists.map((list) => (
            <div key={list.id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-[400px]">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${list.posterPath}`}
                  alt={list.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white line-clamp-1">
                  {list.name}
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  {new Date(list.releaseDate).toLocaleDateString()}
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-white ml-1">
                      {Number(list.rating).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    {editingId === list.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-20 px-2 py-1 bg-gray-700 text-white rounded-md"
                          autoFocus
                        />
                        <button
                          onClick={() => handlePriceSave(list)}
                          className="text-green-500 hover:text-green-400"
                        >
                          ✓
                        </button>
                      </div>
                    ) : (
                      <span
                        className="text-green-500 font-semibold cursor-pointer hover:text-green-400"
                        onClick={() => handlePriceEdit(list)}
                      >
                        {formatPrice(list.price)}
                      </span>
                    )}
                    <button
                      onClick={() => addToCart(list)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {lists.length === 0 && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-xl text-gray-400">Loading movies...</div>
        </div>
      )}
    </div>
  );
}
