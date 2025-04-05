import { movieLists } from "@/data/movieLists";
import Image from "next/image";
import { MovieList } from "@/types/movie";

interface FeaturedListsProps {
  lists: MovieList[];
}

export default function FeaturedLists({ lists }: FeaturedListsProps) {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Featured Lists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {lists.length > 0 &&
          lists.map((list) => (
            <section key={list.id} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{list.name}</h2>
              <div
                key={list.id}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <div className="relative h-[300px]">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${list.posterPath}`}
                    alt={list.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {list.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    {list.releaseDate}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-400">★</span>
                    <span className="text-white ml-1">{list.rating}</span>
                  </div>
                </div>
              </div>
            </section>
          ))}
      </div>

      {lists.length === 0 && (
        <>
          {" "}
          <h1>Loading...</h1>{" "}
        </>
      )}
    </div>
  );
}
