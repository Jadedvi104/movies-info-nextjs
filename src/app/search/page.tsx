"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  // Add other movie properties as needed
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/search?q=${query}`);
        const data = await response.json();
        setResults(data);
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
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Search Results for: {query}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {results.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl text-white">{movie.title}</h2>
            {/* Add more movie details here */}
          </div>
        ))}
      </div>
    </div>
  );
}