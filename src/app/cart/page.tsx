"use client";

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400 mb-4">Your cart is empty</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {cartItems.map((movie) => (
            <div 
              key={movie.id} 
              className="flex bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="relative w-48 h-72">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                  alt={movie.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-6">
                <h2 className="text-xl font-semibold text-white">{movie.name}</h2>
                <p className="text-gray-400 mt-2">
                  Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
                </p>
                <p className="text-gray-400">Rating: {movie.rating}</p>
                <p className="text-white mt-4">${movie.price}</p>
                <button
                  onClick={() => removeFromCart(movie.id)}
                  className="mt-4 text-red-500 hover:text-red-600"
                >
                  Remove from cart
                </button>
              </div>
            </div>
          ))}
          
          <div className="mt-8 border-t border-gray-700 pt-8">
            <div className="flex justify-between items-center">
              <span className="text-xl text-white">Total:</span>
              <span className="text-2xl font-bold text-white">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}