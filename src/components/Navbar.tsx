export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white py-4 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">MovieInfo</div>
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