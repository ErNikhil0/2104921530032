import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Social Analytics</Link>
          <div className="flex space-x-4">
            <Link to="/top-users" className="px-3 py-2 rounded hover:bg-indigo-700 transition">Top Users</Link>
            <Link to="/trending-posts" className="px-3 py-2 rounded hover:bg-indigo-700 transition">Trending Posts</Link>
            <Link to="/feed" className="px-3 py-2 rounded hover:bg-indigo-700 transition">Feed</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};