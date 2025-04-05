"use client";

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import CheckoutModal from '@/components/CheckoutModal';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number | undefined) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price || 1);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 1), 0);
  };

  const calculateDiscount = () => {
    const itemCount = cartItems.length;
    const subtotal = calculateTotal();

    if (itemCount >= 5) {
      return subtotal * 0.20; // 20% discount
    } else if (itemCount >= 3) {
      return subtotal * 0.10; // 10% discount
    }
    return 0;
  };

  const calculateFinalTotal = () => {
    const subtotal = calculateTotal();
    const discount = calculateDiscount();
    const tax = (subtotal - discount) * 0.1;
    return subtotal - discount + tax;
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCheckout = () => {
    alert('Thank you for your purchase!');
    setIsModalOpen(false);
  };

  if (!mounted) {
    return null; // or a loading skeleton
  }

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
                  Release Date: {mounted ? formatDate(movie.releaseDate) : ''}
                </p>
                <p className="text-gray-400">Rating: {movie.rating}</p>
                <p className="text-white mt-4">Price: {formatPrice(movie.price)}</p>
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
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-black">Subtotal:</span>
                <span className="text-black">{formatPrice(calculateTotal())}</span>
              </div>

              {cartItems.length >= 3 && (
                <div className="flex justify-between items-center text-green-500">
                  <span>Discount ({cartItems.length >= 5 ? '20%' : '10%'}):</span>
                  <span>-{formatPrice(calculateDiscount())}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-black">Tax (10%):</span>
                <span className="text-black">
                  {formatPrice((calculateTotal() - calculateDiscount()) * 0.1)}
                </span>
              </div>

              <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-gray-700">
                <span className="text-black">Total:</span>
                <span className="text-black">{formatPrice(calculateFinalTotal())}</span>
              </div>

              {cartItems.length < 3 && (
                <p className="text-sm text-yellow-500 mt-2">
                  Add {3 - cartItems.length} more items for a 10% discount!
                </p>
              )}
              {cartItems.length >= 3 && cartItems.length < 5 && (
                <p className="text-sm text-yellow-500 mt-2">
                  Add {5 - cartItems.length} more items to increase your discount to 20%!
                </p>
              )}

              <button 
                onClick={handleCheckout}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmCheckout}
        cartItems={cartItems}
        calculateTotal={calculateTotal}
        calculateDiscount={calculateDiscount}
        calculateFinalTotal={calculateFinalTotal}
        formatPrice={formatPrice}
      />
    </div>
  );
}