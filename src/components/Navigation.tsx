import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'We Care', path: '/we-care' },
  { name: 'About Us', path: '/about' },
  { name: 'Gallery', path: '/gallery' }
];

const WhatsAppSVG = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Navigation() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group z-50">
            <div className="bg-white rounded-full p-1 overflow-hidden h-14 w-14 flex items-center justify-center border-2 border-green-100 group-hover:border-green-300 transition-all duration-300 shadow-sm">
              <img src="/logo.png" alt="Mishra Dairy Farm Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">Mishra Dairy Farm</h1>
              <p className="text-[10px] md:text-xs font-semibold text-green-600 tracking-wider uppercase">Pure. Fresh. Always.</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* Desktop WhatsApp button */}
            <Button variant="whatsapp" size="sm" className="ml-4 flex items-center gap-2 rounded-lg shadow-md font-bold" asChild>
              <a href="https://wa.me/918435704159" target="_blank" rel="noopener noreferrer">
                <WhatsAppSVG />
                <span>WhatsApp</span>
              </a>
            </Button>
          </div>

          {/* Mobile: Sheet Sidebar */}
          <div className="md:hidden flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <Menu className="h-7 w-7" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 flex flex-col">
                <SheetHeader className="mb-6">
                  <div className="flex items-center space-x-3">
                    <img src="/logo.png" alt="Logo" className="h-12 w-12 rounded-full border-2 border-green-100" />
                    <div>
                      <SheetTitle className="text-gray-900 text-lg">Mishra Dairy Farm</SheetTitle>
                      <p className="text-xs text-green-600 font-semibold tracking-wider uppercase">Pure. Fresh. Always.</p>
                    </div>
                  </div>
                </SheetHeader>

                <div className="flex flex-col space-y-2 flex-1">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.path}>
                      <Link
                        to={link.path}
                        className={`flex items-center px-4 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 ${
                          isActive(link.path)
                            ? 'bg-green-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                {/* WhatsApp in Mobile Sidebar */}
                <div className="pt-4 border-t border-gray-100 mt-4">
                  <Button variant="whatsapp" className="w-full flex items-center gap-2 rounded-xl py-5 text-base font-bold shadow-lg" asChild>
                    <a href="https://wa.me/918435704159" target="_blank" rel="noopener noreferrer">
                      <WhatsAppSVG />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
