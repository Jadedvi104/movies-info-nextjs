"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FeaturedLists from '@/components/FeaturedLists';
import BannerSlider from '@/components/BannerSlider';
import Footer from '@/components/Footer';
import { MovieList } from '@/types/movie';
import { movieLists } from '@/data/movieLists';


export default function Home() {
  const [movieLists, setMovieLists] = useState<MovieList[]>([]);

  const fetchMovieLists = async () => {
    const response = await fetch('/api/movies');
    const data = await response.json();
    console.log("data", data);

    //mapping the data to match the MovieList type
    const mappedData = data.map((list: any) => ({
      id: list.id,
      name: list.title,
      posterPath: list.poster_path,
      releaseDate: list.release_date,
      rating: list.vote_average,
    }));
    console.log("mappedData", mappedData);
    setMovieLists(mappedData);
  };

  useEffect(() => {
    // Fetch movie lists when the component mounts
    fetchMovieLists();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <BannerSlider />
        <FeaturedLists lists={movieLists} />
      </main>
      <Footer />
    </div>
  );
}
