"use client";

import Navbar from '@/components/Navbar';
import FeaturedLists from '@/components/FeaturedLists';
import BannerSlider from '@/components/BannerSlider';
import Footer from '@/components/Footer';



export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <BannerSlider />
        <FeaturedLists />
      </main>
      <Footer />
    </div>
  );
}
