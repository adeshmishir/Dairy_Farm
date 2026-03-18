import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, LogOut, User as UserIcon, Settings, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useAuth } from '../lib/auth';

const navLinks = [
  { name: 'Home', path: '/' },
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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-[#02110b]/95 backdrop-blur-sm shadow-lg sticky top-3 z-50 mx-4 rounded-2xl border border-white/10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group z-50">
            <div className="h-14 w-14 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 rounded-full overflow-hidden">
              <img src="/logo.png" alt="Mishra Dairy Farm Logo" className="h-full w-full object-contain filter drop-shadow-md" />
            </div>
            <div>
            <h1 className="text-lg md:text-xl font-bold text-white group-hover:text-green-400 transition-colors">Mishra Dairy Farm</h1>
              <p className="text-[10px] md:text-xs font-semibold text-green-500 tracking-wider uppercase">Pure. Fresh. Always.</p>
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
                    : 'text-green-100/70 hover:bg-green-800/50 hover:text-green-300'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user?.isAdmin && (
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive('/admin')
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-purple-300 hover:bg-purple-900/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Settings size={16} />
                  Admin
                </div>
              </Link>
            )}

            {/* Authentication Dropdown */}
            <div className="relative group ml-4">
              <div className="flex items-center gap-2 cursor-pointer py-2">
                {user ? (
                  <div className="flex items-center gap-3 px-4 py-2 bg-green-900/50 border border-green-700/50 rounded-2xl group-hover:bg-green-800/50 transition-all">
                    <div className="h-7 w-7 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm font-black text-green-300">{user.name}</span>
                  </div>
                ) : (
                  <div className="h-9 w-9 bg-green-900/50 rounded-full flex items-center justify-center text-green-400 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm border border-green-700/30">
                    <UserIcon size={18} />
                  </div>
                )}
              </div>

              {/* Hover Dropdown Menu */}
              <div className="absolute right-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-[60]">
                <div className="w-56 bg-[#0a2318] border border-white/10 rounded-[1.5rem] shadow-2xl p-2 overflow-hidden">
                  {user ? (
                    <div className="space-y-1">
                      <div className="px-4 py-3 border-b border-white/5 mb-1">
                        <p className="text-[10px] font-black text-green-400/70 uppercase tracking-widest">Account</p>
                        <p className="text-sm font-bold text-white truncate">{user.email}</p>
                      </div>
                      <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/30 rounded-xl transition-colors font-bold text-sm"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="px-4 py-2 text-[10px] font-black text-green-400/50 uppercase tracking-widest">Welcome</p>
                      <Link 
                        to="/auth" 
                        className="flex items-center gap-3 px-4 py-3 text-green-100/70 hover:bg-green-800/50 hover:text-green-300 rounded-xl transition-colors font-bold text-sm"
                      >
                        <LogIn size={18} className="text-green-500" />
                        Sign In
                      </Link>
                      <Link 
                        to="/auth?tab=signup" 
                        className="flex items-center gap-3 px-4 py-3 text-green-100/70 hover:bg-green-800/50 hover:text-green-300 rounded-xl transition-colors font-bold text-sm"
                      >
                        <UserPlus size={18} className="text-green-500" />
                        Create Account
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Mobile: Sheet Sidebar */}
          <div className="md:hidden flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-7 w-7" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 flex flex-col bg-[#02110b] border-l border-white/10 p-0 overflow-hidden">
                <div className="p-6 flex flex-col h-full">
                <SheetHeader className="mb-8 p-0 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full overflow-hidden">
                      <img src="/logo.png" alt="Logo" className="h-full w-full object-contain filter drop-shadow-sm" />
                    </div>
                    <div>
                      <SheetTitle className="text-white text-lg font-bold">Mishra Dairy Farm</SheetTitle>
                      <p className="text-[10px] text-green-500 font-bold tracking-widest uppercase">Pure. Fresh. Always.</p>
                    </div>
                  </div>
                </SheetHeader>

                <div className="flex flex-col space-y-2 flex-1">
                  {user && (
                    <div className="px-4 py-3 bg-green-500/10 rounded-xl border border-green-500/10 mb-4">
                      <div className="flex items-center gap-3">
                        <UserIcon size={18} className="text-green-400" />
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-[10px] text-green-500/40 font-black uppercase tracking-widest">Signed in as</span>
                          <span className="text-sm font-bold text-white truncate">{user.name}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.path}>
                      <Link
                        to={link.path}
                        className={`flex items-center px-5 py-4 rounded-xl font-bold text-base transition-all duration-200 ${
                          isActive(link.path)
                            ? 'bg-green-600 text-white shadow-lg'
                            : 'text-green-100/60 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}

                  {user?.isAdmin && (
                    <SheetClose asChild>
                      <Link
                        to="/admin"
                        className={`flex items-center px-5 py-4 rounded-xl font-bold text-base transition-all duration-200 mt-2 ${
                          isActive('/admin')
                            ? 'bg-purple-600 text-white shadow-lg'
                            : 'text-purple-300 hover:bg-purple-900/30'
                        }`}
                      >
                        <Settings size={20} className="mr-3" />
                        Admin Panel
                      </Link>
                    </SheetClose>
                  )}

                  {!user && (
                    <SheetClose asChild>
                      <Link
                        to="/auth"
                        className="flex items-center px-5 py-4 rounded-xl font-bold bg-green-900/30 text-green-400 border border-green-700/30 mt-4"
                      >
                        <LogIn size={20} className="mr-3" />
                        Sign In / Sign Up
                      </Link>
                    </SheetClose>
                  )}
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  {user && (
                    <Button variant="outline" className="w-full text-red-400 border-red-900/30 hover:bg-red-900/20 rounded-2xl py-6 font-bold" onClick={() => { handleLogout(); setOpen(false); }}>
                      <LogOut size={20} className="mr-3" />
                      Sign Out
                    </Button>
                  )}
                  <Button variant="whatsapp" className="w-full flex items-center justify-center gap-3 rounded-2xl py-6 shadow-xl h-auto" asChild>
                    <a href="https://wa.me/918953280445" target="_blank" rel="noopener noreferrer">
                      <WhatsAppSVG />
                      <span className="font-bold">Chat on WhatsApp</span>
                    </a>
                  </Button>
                </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
