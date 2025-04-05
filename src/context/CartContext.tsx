"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MovieList } from '@/types/movie';

interface CartContextType {
  cartItems: MovieList[];
  addToCart: (movie: MovieList) => void;
  removeFromCart: (movieId: number) => void;
  updatePrice: (movieId: number, newPrice: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<MovieList[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (movie: MovieList) => {
    setCartItems((prev) => [...prev, movie]);
  };

  const removeFromCart = (movieId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== movieId));
  };

  const updatePrice = (movieId: number, newPrice: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === movieId ? { ...item, price: newPrice } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updatePrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}