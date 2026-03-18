import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Home, Users, Image, Briefcase, Milk, Star } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a2318] text-green-50 pt-12 pb-8 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 text-center sm:text-left">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start space-y-4">
            <Link to="/" className="flex items-center space-x-3 text-white mb-2 sm:mb-6 group">
              <div className="bg-green-500/10 rounded-full p-1 overflow-hidden h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center border border-green-500/20 shadow-sm backdrop-blur-sm">
                <img src="/logo.png" alt="Mishra Dairy Farm Logo" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-xl sm:text-2xl tracking-tight leading-tight group-hover:text-green-300 transition-colors">Mishra</span>
                <span className="font-bold text-base sm:text-lg tracking-tight leading-none text-green-400 group-hover:text-green-200 transition-colors">Dairy Farm</span>
              </div>
            </Link>
            <p className="hidden sm:block text-green-200 leading-relaxed text-sm">
              Providing farm-fresh, unadulterated dairy products and premium animal feed. Quality you can taste, purity you can trust.
            </p>
            <div className="flex space-x-4 pt-2 sm:pt-4 justify-center sm:justify-start">
              <a href="#" className="text-green-200 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-green-600 transition-all">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-green-600 transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-green-600 transition-all">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h3 className="text-white font-black text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest opacity-50">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/" className="text-green-200 hover:text-white transition-all text-xs sm:text-sm flex items-center gap-2 sm:gap-3 group"><Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 group-hover:scale-110" /> Home</Link></li>
              <li><Link to="/about" className="text-green-200 hover:text-white transition-all text-xs sm:text-sm flex items-center gap-2 sm:gap-3 group"><Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 group-hover:scale-110" /> About Us</Link></li>
              <li><Link to="/gallery" className="text-green-200 hover:text-white transition-all text-xs sm:text-sm flex items-center gap-2 sm:gap-3 group"><Image className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 group-hover:scale-110" /> Gallery</Link></li>
              <li><Link to="#" className="text-green-200 hover:text-white transition-all text-xs sm:text-sm flex items-center gap-2 sm:gap-3 group"><Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 group-hover:scale-110" /> Careers</Link></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="text-left">
            <h3 className="text-white font-black text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest opacity-50">Our Products</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/?tab=milk&item=fresh-milk" className="text-green-200 hover:text-white transition-all text-xs sm:text-sm flex items-center gap-2 sm:gap-3 group"><Milk className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 group-hover:scale-110" /> Milk</Link></li>
              <li><Link to="/?tab=feed&item=lal-feed" className="text-green-200 hover:text-white transition-all text-xs sm:text-sm flex items-center gap-2 sm:gap-3 group"><Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 group-hover:scale-110" /> Lal Feed</Link></li>
              <li><Link to="/?tab=feed&item=green-feed" className="text-green-200 hover:text-white transition-all text-xs sm:text-sm flex items-center gap-2 sm:gap-3 group"><Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 group-hover:scale-110" /> Green Feed</Link></li>
              <li><Link to="/?tab=feed&item=blue-feed" className="text-green-200 hover:text-white transition-all text-xs sm:text-sm flex items-center gap-2 sm:gap-3 group"><Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 group-hover:scale-110" /> Blue Feed</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 lg:col-span-1 text-left pt-6 sm:pt-0 border-t sm:border-t-0 border-white/5">
            <h3 className="text-white font-black text-xs sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest opacity-50">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start space-x-3 text-xs sm:text-sm text-green-200 group">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-green-400 group-hover:animate-bounce" />
                <span>Near Chauka Mod, Janghai-Wari Road,<br />Prayagraj, Uttar Pradesh</span>
              </li>
              <li className="flex items-start space-x-3 text-xs sm:text-sm text-green-200 group">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-green-400 group-hover:rotate-12 transition-transform" />
                <div className="flex flex-col">
                  <span>8953280445</span>
                  <span>9322423649</span>
                </div>
              </li>
              <li className="flex items-center space-x-3 text-xs sm:text-sm text-green-200 group">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="truncate">mishradairyfarm4@gmail.com</span>
              </li>
            </ul>
            <div className="mt-6 sm:mt-8 flex justify-center sm:justify-start">
              <a 
                href="https://wa.me/918953280445" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 font-bold text-xs sm:text-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Chat with us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-green-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-green-300 text-[10px] sm:text-xs text-center md:text-left">
            © {new Date().getFullYear()} Dairy Farm. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-green-300">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="hidden sm:inline opacity-30">•</span>
            <Link to="#" className="hover:text-white transition-colors">Terms of Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
