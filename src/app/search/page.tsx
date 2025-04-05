"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MovieList } from '@/types/movie';
import { useCart } from '@/context/CartContext';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<MovieList[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const formatPrice = (price: number | undefined) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price || 1);
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${query}`);
        const data = await response.json();
        
        // Map the API response to match MovieList type
        const mappedData = data.map((movie: any) => ({
          id: movie.id,
          name: movie.title,
          posterPath: movie.poster_path,
          releaseDate: movie.release_date,
          rating: movie.vote_average,
          overview: movie.overview,
          price: movie.price || 1,
          genre: movie.genre_ids?.join(', ') || ''
        }));
        
        setResults(mappedData);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Search Results for: {query}</h1>
      
      {results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No results found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-[400px]">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                  alt={movie.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white line-clamp-1">
                  {movie.name}
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-white ml-1">
                      {Number(movie.rating).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-500 font-semibold">
                      {formatPrice(movie.price)}
                    </span>
                    <button
                      onClick={() => addToCart(movie)}
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
      )}
    </div>
  );
}