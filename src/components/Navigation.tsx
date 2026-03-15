import { Link, useLocation } from 'react-router-dom';
import { Milk } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-green-600 p-2 rounded-lg group-hover:bg-green-700 transition-colors">
              <Milk className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mishra Dairy Farm</h1>
              <p className="text-xs text-green-600">Pure. Safe. Tested.</p>
            </div>
          </Link>

          <div className="flex space-x-1">
            <Link
              to="/"
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                isActive('/')
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                isActive('/products')
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
              }`}
            >
              Products
            </Link>
            <Link
              to="/we-care"
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                isActive('/we-care')
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
              }`}
            >
              We Care
            </Link>
            <Link
              to="/about"
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                isActive('/about')
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
              }`}
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
