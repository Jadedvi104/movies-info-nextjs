export default function FeaturedLists() {
  const featuredMovies = [
    { id: 1, title: "Movie 1", image: "/movie1.jpg" },
    { id: 2, title: "Movie 2", image: "/movie2.jpg" },
    { id: 3, title: "Movie 3", image: "/movie3.jpg" },
    { id: 4, title: "Movie 4", image: "/movie4.jpg" }
  ];

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6">Featured Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featuredMovies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}