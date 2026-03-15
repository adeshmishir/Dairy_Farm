import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 text-white mb-6 group">
              <div className="bg-white rounded-full p-1 overflow-hidden h-14 w-14 flex items-center justify-center">
                <img src="/logo.png" alt="Mishra Dairy Farm Logo" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl tracking-tight leading-tight group-hover:text-green-300 transition-colors">Mishra</span>
                <span className="font-bold text-lg tracking-tight leading-none text-green-400 group-hover:text-green-200 transition-colors">Dairy Farm</span>
              </div>
            </Link>
            <p className="text-green-200 leading-relaxed text-sm">
              Providing farm-fresh, unadulterated dairy products and premium animal feed. Quality you can taste, purity you can trust.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-green-200 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link to="/products" className="text-green-200 hover:text-white transition-colors text-sm">Products</Link></li>
              <li><Link to="/about" className="text-green-200 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/gallery" className="text-green-200 hover:text-white transition-colors text-sm">Photo Gallery</Link></li>
              <li><Link to="/we-care" className="text-green-200 hover:text-white transition-colors text-sm">We Care</Link></li>
              <li><Link to="#" className="text-green-200 hover:text-white transition-colors text-sm">Careers</Link></li>
              <li><Link to="#" className="text-green-200 hover:text-white transition-colors text-sm">Manufacturing Units</Link></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Our Products</h3>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-green-200 hover:text-white transition-colors text-sm">Fresh Milk</Link></li>
              <li><Link to="/products" className="text-green-200 hover:text-white transition-colors text-sm">Pure Ghee</Link></li>
              <li><Link to="/products" className="text-green-200 hover:text-white transition-colors text-sm">Farm Curd</Link></li>
              <li><Link to="/products" className="text-green-200 hover:text-white transition-colors text-sm">Soft Paneer</Link></li>
              <li><Link to="/products" className="text-green-200 hover:text-white transition-colors text-sm">White Butter</Link></li>
              <li><Link to="/products" className="text-green-200 hover:text-white transition-colors text-sm">Animal Feed</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-green-200">
                <MapPin className="h-5 w-5 flex-shrink-0 text-green-400" />
                <span>Chauka Mod, Janghai<br />Vari Road<br />Prayagraj, Uttar Pradesh</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-green-200">
                <Phone className="h-5 w-5 flex-shrink-0 text-green-400" />
                <div className="flex flex-col">
                  <span>8435704159</span>
                  <span>9322423649</span>
                </div>
              </li>
              <li className="flex items-center space-x-3 text-sm text-green-200">
                <Mail className="h-5 w-5 flex-shrink-0 text-green-400" />
                <span>random@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-green-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-green-300 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Dairy Farm. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-green-300">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="hidden sm:inline">•</span>
            <Link to="#" className="hover:text-white transition-colors">Terms of Conditions</Link>
            <span className="hidden sm:inline">•</span>
            <Link to="#" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
