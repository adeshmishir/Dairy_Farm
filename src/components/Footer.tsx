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
            <div className="mt-8">
              <a 
                href="https://wa.me/918435704159" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
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
