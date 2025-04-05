"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/images/superman-2025.png", 
      title: "Latest Movies",
      description: "Watch the latest blockbusters"
    },
    {
      id: 2,
      image: "/images/nightmare.png",
      title: "Popular Shows",
      description: "Trending TV series"
    },
    {
      id: 3,
      image: "/images/tangerin.png",
      title: "Coming Soon",
      description: "Upcoming releases"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-8 z-10">
              <h2 className="text-4xl text-white font-bold">{slide.title}</h2>
              <p className="text-white mt-2">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}