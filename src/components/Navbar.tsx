export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white py-4 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">MovieInfo</div>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies, TV shows..."
              className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <ul className="flex space-x-6">
          <li><a href="/" className="hover:text-gray-300">Home</a></li>
          <li><a href="/movies" className="hover:text-gray-300">Movies</a></li>
          <li><a href="/tv-shows" className="hover:text-gray-300">TV Shows</a></li>
          <li><a href="/about" className="hover:text-gray-300">About</a></li>
        </ul>
      </div>
    </nav>
  );
}