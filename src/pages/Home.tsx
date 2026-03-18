import { useState, useEffect, useRef } from 'react';
import { ClipboardCheck, Heart, Star, Milk, Leaf, Handshake, ArrowRight, X, MessageSquare, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../lib/auth';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';

const API = 'https://dairy-farm-n2sj.onrender.com/api';

const MainStyles = () => (
  <style>{`
    @keyframes shine {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    .animate-shine {
      animation: shine 1.5s infinite;
    }
  `}</style>
);





const AnimatedCounter = ({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percentage = Math.min(progress / duration, 1);
      // Easing function (easeOutExpo)
      const easePercentage = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(end * easePercentage));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return (
    <span ref={countRef}>
      {count}{suffix}
    </span>
  );
};

export default function Home() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'milk' | 'feed'>('milk');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewsVisible, setIsReviewsVisible] = useState(false);
  const productSectionRef = useRef<HTMLDivElement>(null);

  // DB products
  const [milkProducts, setMilkProducts] = useState<any[]>([]);
  const [feedProducts, setFeedProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const tab = searchParams.get('tab') as 'milk' | 'feed';
    if (tab && (tab === 'milk' || tab === 'feed')) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!loadingProducts) {
      const item = searchParams.get('item');
      if (item) {
        const p = [...milkProducts, ...feedProducts].find(x => 
          x.name.toLowerCase().replace(/\s+/g, '-') === item
        );
        if (p) setSelectedProduct(p);
      }

      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const timer = setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
        return () => clearTimeout(timer);
      } else if (searchParams.get('tab')) {
        const timer = setTimeout(() => {
          productSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [loadingProducts, searchParams, milkProducts, feedProducts]);

  // Reviews
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ name: user?.name || '', rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all products from API, split by category
  useEffect(() => {
    fetch(`${API}/products`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMilkProducts(data.filter((p: any) => p.category === 'milk'));
          setFeedProducts(data.filter((p: any) => p.category === 'feed'));
        }
      })
      .catch(() => {})
      .finally(() => setLoadingProducts(false));
  }, []);

  // Fetch reviews from backend on mount
  useEffect(() => {
    fetch(`${API}/reviews`)
      .then(r => r.json())
      .then(data => setReviews(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(newReview),
      });
      if (!res.ok) throw new Error((await res.json()).message);
      const saved = await res.json();
      setReviews(prev => [saved, ...prev]);
      setNewReview({ name: user?.name || '', rating: 5, comment: '' });
      setIsReviewModalOpen(false);
      toast.success('Thank you for your feedback! ❤️');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [heroImage, setHeroImage] = useState('https://res.cloudinary.com/dfect5qyk/image/upload/v1773771949/mishra_dairy/hero/homepage_hero_2024.jpg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch Hero Image from Settings
  useEffect(() => {
    fetch(`${API}/settings/homepage_hero`)
      .then(r => r.json())
      .then(data => {
        if (data && data.value) setHeroImage(data.value);
      })
      .catch(() => {});
  }, []);

  const handleHeroChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const t = toast.loading('Uploading new hero image...');
    try {
      const res = await fetch(`${API}/settings/homepage_hero`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setHeroImage(data.value);
      toast.success('Hero image updated!', { id: t });
    } catch (err) {
      toast.error('Failed to update image', { id: t });
    }
  };

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProduct]);

  return (
    <div className="min-h-screen bg-[#02110b] text-green-50/90 font-sans selection:bg-green-500/30">
      <MainStyles />
      <div className="pt-6"></div> {/* Spacer for floating nav */}
      {/* ── Hero Section (Redesigned for Mobile Focus) ── */}
      <div className="relative bg-gradient-to-br from-green-600 to-green-900 overflow-hidden border-b border-white/5 pt-10 lg:pt-0">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Fresh Milk"
            className="w-full h-full object-cover opacity-20 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#02110b]/40 via-transparent to-[#02110b]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-20 lg:pt-32 lg:pb-32">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Upper Text Content */}
            <div className="text-center lg:text-left space-y-6 lg:space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                Fresh milk from <br className="hidden lg:block"/>our farm
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 block mt-2">to your home.</span>
              </h1>
              <p className="text-lg sm:text-xl text-green-100/60 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                Healthy cattle produce better milk. That's why we provide high-nutrition animal feed for our cows, and pure, safe milk for your family.
              </p>
              {/* Desktop Only Button Placement */}
              <div className="hidden lg:flex flex-row justify-start gap-4">
                <button 
                  onClick={scrollToProducts}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center transform hover:scale-105 active:scale-95"
                >
                  Explore Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Visual Focus: Hero Image */}
            <div className="w-full max-w-[500px] lg:max-w-none mx-auto lg:mx-0 order-2 lg:order-none relative group/hero">
              <div className="absolute inset-0 bg-green-500 rounded-[2rem] sm:rounded-[3rem] rotate-3 opacity-20 blur-xl group-hover:rotate-6 transition-transform duration-700"></div>
              <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-4 border-white/20 transition-transform duration-500 group-hover:-translate-y-2">
                <img 
                  src={heroImage}
                  alt="Fresh Milk Pouring"
                  className="w-full h-[300px] sm:h-[450px] lg:h-[550px] object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                {user?.isAdmin && (
                  <>
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleHeroChange} 
                      accept="image/*"
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute top-6 right-6 z-20 bg-black/60 hover:bg-black/80 backdrop-blur-md p-4 rounded-full text-white opacity-0 group-hover/hero:opacity-100 transition-all duration-300 shadow-2xl border border-white/10"
                    >
                      <Camera className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Only Button Placement (Under Image) */}
            <div className="flex lg:hidden order-3 w-full justify-center">
              <button 
                onClick={scrollToProducts}
                className="w-full max-w-sm bg-green-600 hover:bg-green-700 text-white font-black py-5 rounded-2xl shadow-2xl shadow-green-900/40 flex items-center justify-center transform active:scale-95"
              >
                Explore Products
                <ArrowRight className="ml-2 w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">

        {/* ── Products Section (Integrated) ── */}
        <div ref={productSectionRef} className="py-8 sm:py-16 scroll-mt-24">
           <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4">Our Premium Offerings</h2>
              <p className="text-lg sm:text-xl text-green-100/60 max-w-2xl mx-auto px-4">Crafted with care for health and purity.</p>
              <div className="h-1.5 w-16 sm:w-24 bg-green-500 mx-auto mt-4 sm:mt-6 rounded-full"></div>
           </div>

           {/* Modern Toggle Bar */}
           <div className="flex justify-center mb-16">
            <div className="bg-[#0a2318] p-2 rounded-full shadow-2xl border border-white/5 inline-flex flex-col sm:flex-row relative z-10 w-full sm:w-auto overflow-hidden sm:overflow-visible backdrop-blur-sm">
              <div
                className={`hidden sm:block absolute top-2 bottom-2 rounded-full transition-all duration-300 ease-out shadow-sm w-[49%] ${
                  activeTab === 'milk'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 left-2'
                    : 'bg-gradient-to-r from-orange-500 to-amber-600 right-2'
                }`}
              ></div>

              <button
                onClick={() => setActiveTab('milk')}
                className={`relative z-20 flex flex-1 items-center justify-center px-8 py-4 rounded-full sm:rounded-l-full sm:rounded-r-none text-lg font-semibold transition-all duration-300 ${
                  activeTab === 'milk' 
                    ? 'text-white bg-gradient-to-r from-green-500 to-emerald-600 sm:bg-none sm:text-white shadow-md sm:shadow-none' 
                    : 'text-green-100/70 hover:bg-green-500/10 sm:hover:bg-transparent sm:hover:text-green-400 bg-transparent'
                }`}
              >
                <Milk className="mr-2 h-6 w-6" />
                Milk Products
              </button>
              <button
                onClick={() => setActiveTab('feed')}
                className={`relative z-20 flex flex-1 items-center justify-center px-8 py-4 mt-2 sm:mt-0 rounded-full sm:rounded-r-full sm:rounded-l-none text-lg font-semibold transition-all duration-300 ${
                  activeTab === 'feed' 
                    ? 'text-white bg-gradient-to-r from-orange-500 to-amber-600 sm:bg-none sm:text-white shadow-md sm:shadow-none' 
                    : 'text-green-100/70 hover:bg-orange-500/10 sm:hover:bg-transparent sm:hover:text-orange-400 bg-transparent'
                }`}
              >
                <Leaf className="mr-2 h-6 w-6" />
                Animal Feed
              </button>
            </div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {activeTab === 'milk' ? (
              loadingProducts ? (
                <div className="col-span-3 flex justify-center py-24">
                  <div className="h-10 w-10 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
                </div>
              ) : milkProducts.length === 0 ? (
                <div className="col-span-3 text-center py-24">
                  <p className="text-green-100/30 text-xl font-black uppercase tracking-widest">No products added yet</p>
                  <p className="text-green-100/20 text-sm mt-2">Admin can add products from the dashboard</p>
                </div>
              ) : (
                milkProducts.map((product: any) => (
                  <div 
                    key={product._id} 
                    id={product.name.toLowerCase().replace(/\s+/g, '-')}
                    className="group relative flex flex-col bg-[#041a11]/40 backdrop-blur-md rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/5 hover:border-green-500/20 transition-all duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden cursor-default hover:-translate-y-2 scroll-mt-32"
                  >
                    {/* Image Container */}
                    <div className="relative h-40 sm:h-56 md:h-72 w-full overflow-hidden">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        />
                      ) : (
                        <div className="w-full h-full bg-green-900/10 flex items-center justify-center">
                          <Milk className="h-20 w-20 text-green-500/20" />
                        </div>
                      )}
                      {/* Gradient Overlay for Title Clarity */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#041a11] via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-3 sm:p-5 md:p-8 pt-4 sm:pt-6">
                      <div className="flex items-start justify-between gap-2 mb-2 sm:mb-4">
                        <h3 className="text-sm sm:text-xl md:text-2xl font-black text-white group-hover:text-green-400 transition-colors leading-tight">
                          {product.price && (
                            <span className="inline-block mr-1 sm:mr-3 px-1.5 py-0.5 rounded-lg sm:rounded-xl bg-green-500/10 text-green-400 text-[10px] sm:text-sm font-black border border-green-500/20">
                              {product.price}
                            </span>
                          )}
                          <span className="block sm:inline mt-1 sm:mt-0">{product.name}</span>
                        </h3>
                      </div>

                      <p className="text-green-50/40 text-[10px] sm:text-sm leading-relaxed mb-4 sm:mb-8 flex-1 font-medium line-clamp-2 sm:line-clamp-none">
                        {product.description}
                      </p>

                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="w-full py-2.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-[10px] sm:text-sm tracking-wider uppercase flex items-center justify-center gap-1 sm:gap-2 hover:bg-green-600 hover:border-green-500 transition-all duration-300 group/btn"
                      >
                        Details
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-2" />
                      </button>
                    </div>

                    {/* Subtle Shine Effect on hover */}
                    <div className="absolute -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white opacity-5 group-hover:animate-shine pointer-events-none" />
                  </div>
                ))
              )
            ) : (
              feedProducts.map((product: any, index) => (
                <div 
                  key={index} 
                  id={product.name.toLowerCase().replace(/\s+/g, '-')}
                  className="group relative flex flex-col bg-[#041a11]/40 backdrop-blur-md rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/5 hover:border-orange-500/20 transition-all duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden cursor-default hover:-translate-y-2 scroll-mt-32"
                >
                  {/* Image Container */}
                  <div className="relative h-40 sm:h-56 md:h-72 w-full overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    {/* Gradient Overlay for Title Clarity */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041a11] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-3 sm:p-5 md:p-8 pt-4 sm:pt-6">
                    <div className="flex items-start justify-between gap-2 mb-2 sm:mb-4">
                      <h3 className="text-sm sm:text-xl md:text-2xl font-black text-white group-hover:text-orange-400 transition-colors leading-tight">
                        {product.price && (
                          <span className="inline-block mr-1 sm:mr-3 px-1.5 py-0.5 rounded-lg sm:rounded-xl bg-orange-500/10 text-orange-400 text-[10px] sm:text-sm font-black border border-orange-500/20">
                            {product.price}
                          </span>
                        )}
                        <span className="block sm:inline mt-1 sm:mt-0">{product.name}</span>
                      </h3>
                    </div>

                    <p className="text-green-50/40 text-[10px] sm:text-sm leading-relaxed mb-4 sm:mb-8 flex-1 font-medium line-clamp-2 sm:line-clamp-none">
                      {product.description}
                    </p>

                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="w-full py-2.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-[10px] sm:text-sm tracking-wider uppercase flex items-center justify-center gap-1 sm:gap-2 hover:bg-orange-600 hover:border-orange-500 transition-all duration-300 group/btn"
                    >
                      Details
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-2" />
                    </button>
                  </div>

                  {/* Subtle Shine Effect on hover */}
                  <div className="absolute -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white opacity-5 group-hover:animate-shine pointer-events-none" />
                </div>
              ))
            )}
           </div>
        </div>


        {/* ── Social Proof Stats Section ── */}
        <div className="bg-[#0a2318] rounded-[1.5rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-2xl border border-white/5 mb-16 sm:mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 divide-x divide-transparent md:divide-white/5">
            <div className="text-center px-1 sm:px-4">
              <div className="bg-green-500/10 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-green-500/10">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
              </div>
              <h4 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-1 sm:mb-2">
                <AnimatedCounter end={50} suffix="+" />
              </h4>
              <p className="text-green-400 font-bold tracking-widest uppercase text-[10px] sm:text-xs">Healthy Cattle</p>
            </div>
            <div className="text-center px-1 sm:px-4">
              <div className="bg-[#041a11] w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-[1.5rem] flex items-center justify-center mx-auto mb-3 sm:mb-6 shadow-xl border border-white/5 transform -rotate-3 hover:rotate-0 transition-transform">
                <Milk className="h-6 w-6 sm:h-10 sm:w-10 text-green-400" />
              </div>
              <h4 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-1 sm:mb-2">
                <AnimatedCounter end={200} suffix="+" />
              </h4>
              <p className="text-green-400 font-bold tracking-widest uppercase text-[10px] sm:text-xs">Litres Daily</p>
            </div>
            <div className="text-center px-1 sm:px-4">
              <div className="bg-[#041a11] w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-[1.5rem] flex items-center justify-center mx-auto mb-3 sm:mb-6 shadow-xl border border-white/5 transform rotate-3 hover:rotate-0 transition-transform">
                <Leaf className="h-6 w-6 sm:h-10 sm:w-10 text-green-400" />
              </div>
              <h4 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-1 sm:mb-2">
                <AnimatedCounter end={10} suffix="+" />
              </h4>
              <p className="text-green-400 font-bold tracking-widest uppercase text-[10px] sm:text-xs">Feed Products</p>
            </div>
            <div className="text-center px-1 sm:px-4">
              <div className="bg-[#041a11] w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-[1.5rem] flex items-center justify-center mx-auto mb-3 sm:mb-6 shadow-xl border border-white/5 transform -rotate-3 hover:rotate-0 transition-transform">
                <Handshake className="h-6 w-6 sm:h-10 sm:w-10 text-green-400" />
              </div>
              <h4 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-1 sm:mb-2">
                <AnimatedCounter end={100} suffix="+" />
              </h4>
              <p className="text-green-400 font-bold tracking-widest uppercase text-[10px] sm:text-xs">Happy Farmers</p>
            </div>
          </div>
        </div>
        {/* ── Testing Focus Section ── */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-900 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 text-white mb-20 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
            <ClipboardCheck className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl sm:text-4xl font-black mb-6 leading-tight">Why All The Fuss About Testing?</h2>
            <p className="text-xl sm:text-2xl mb-4 font-bold text-green-400">The simple answer is because 'We Care'</p>
            <div className="h-1 w-20 sm:w-24 bg-white mx-auto my-6 sm:my-8 opacity-20"></div>
            <p className="text-lg sm:text-xl leading-relaxed text-green-50/80">
              We don't just say it, <span className="font-black text-white underline decoration-green-400 underline-offset-8">We prove it.</span>
              <br className="mt-4" /> Every batch tested. Every packet pure.
            </p>
            <p className="text-base sm:text-lg mt-6 opacity-60 font-black uppercase tracking-widest">
              Check your daily milk report.
            </p>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20 sm:mt-32 mb-12 sm:mb-20 text-center px-4">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4">What Our Customers Say</h2>
            <p className="text-lg sm:text-xl text-green-100/60 max-w-2xl mx-auto text-center px-4">Your feedback keeps us growing and improving every day.</p>
            <div className="h-1.5 w-16 sm:w-24 bg-green-600 mx-auto mt-4 sm:mt-6 rounded-full"></div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            <Button 
              onClick={() => setIsReviewsVisible(!isReviewsVisible)}
              variant="outline"
              className={`min-w-[200px] h-14 rounded-2xl font-bold text-lg border-2 shadow-xl transition-all flex items-center gap-2 ${
                isReviewsVisible 
                ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                : 'bg-[#0a2318] border-white/5 text-green-100/50 hover:border-green-500/20 hover:text-green-400'
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              {isReviewsVisible ? 'Hide Reviews' : 'Show Reviews'}
              <span className="ml-1 bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full border border-green-500/10">
                {reviews.length}
              </span>
            </Button>

            {user ? (
              <Button 
                onClick={() => {
                  setNewReview(prev => ({ ...prev, name: user.name }));
                  setIsReviewModalOpen(true);
                }}
                className="min-w-[200px] h-14 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl text-lg shadow-2xl shadow-green-900/20 flex items-center gap-2"
              >
                <Heart className="h-5 w-5" />
                Leave a Review
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/auth')}
                className="min-w-[200px] h-14 bg-white text-[#02110b] hover:bg-green-50 font-black rounded-2xl text-lg shadow-2xl flex items-center gap-2"
              >
                Login to Review
              </Button>
            )}
          </div>

          {isReviewsVisible && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500 max-w-4xl mx-auto">
              <div className="space-y-6 text-left">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-[#0a2318] rounded-[2rem] p-8 shadow-2xl border border-white/5 hover:border-green-500/20 transition-all duration-300 backdrop-blur-md">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 font-black text-xl uppercase border border-green-500/10">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-white">{review.name}</h4>
                            <p className="text-sm text-green-100/30 font-bold tracking-tight">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex text-yellow-500 bg-yellow-500/5 px-3 py-1.5 rounded-full border border-yellow-500/10">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-white/5'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-green-50/80 leading-relaxed text-lg font-medium italic">"{review.comment}"</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-24 bg-[#0a2318] rounded-[3rem] border-2 border-dashed border-white/5">
                    <MessageSquare className="mx-auto h-16 w-16 text-white/5 mb-6" />
                    <p className="text-green-100/20 text-xl font-black uppercase tracking-widest">No reviews yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedProduct(null)}>
          <div className="bg-[#0a2318] rounded-[1.5rem] sm:rounded-[2.5rem] max-w-2xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl animate-in zoom-in-95 duration-300 border border-white/10" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 z-10 p-2 text-green-100/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            {/* Product Image */}
            {selectedProduct.image && (
              <div className="relative h-64 rounded-t-[2.5rem] overflow-hidden">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2318] to-transparent" />
                {selectedProduct.price && (
                  <div className="absolute bottom-4 left-6 bg-green-600 text-white font-black px-4 py-1.5 rounded-full text-sm">
                    {selectedProduct.price}
                  </div>
                )}
              </div>
            )}

            <div className="p-8">
              <h2 className="text-3xl font-black text-white mb-3">{selectedProduct.name}</h2>
              <p className="text-green-100/60 leading-relaxed mb-6">{selectedProduct.description}</p>

              {/* Feed product details */}
              {selectedProduct.detailedDescription && (
                <div className="space-y-6">
                  {selectedProduct.detailedDescription.keyFeatures && (
                    <div>
                      <h3 className="text-lg font-black text-green-400 mb-3 uppercase tracking-wider text-sm">Key Features</h3>
                      <ul className="space-y-2">
                        {selectedProduct.detailedDescription.keyFeatures.map((f: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-green-100/70 text-sm">
                            <span className="text-green-500 mt-1 flex-shrink-0">✓</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedProduct.detailedDescription.detailedBenefits && (
                    <div>
                      <h3 className="text-lg font-black text-green-400 mb-3 uppercase tracking-wider text-sm">Benefits</h3>
                      <ul className="space-y-2">
                        {selectedProduct.detailedDescription.detailedBenefits.map((b: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-green-100/70 text-sm">
                            <span className="text-orange-400 mt-1 flex-shrink-0">•</span> {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedProduct.detailedDescription.whyFeed && (
                    <div className="bg-green-900/30 border border-green-500/10 rounded-2xl p-5">
                      <h3 className="text-sm font-black text-green-400 uppercase tracking-wider mb-2">{selectedProduct.detailedDescription.whyFeedTitle}</h3>
                      <p className="text-green-100/60 text-sm leading-relaxed">{selectedProduct.detailedDescription.whyFeed}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Milk product — simple card */}
              {!selectedProduct.detailedDescription && (
                <div className="bg-green-900/20 border border-green-500/10 rounded-2xl p-5">
                  <p className="text-green-100/50 text-sm">🐄 Farm fresh product from Mishra Dairy Farm. Contact us for bulk pricing and availability.</p>
                </div>
              )}

              <Button
                onClick={() => setSelectedProduct(null)}
                className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-2xl h-auto"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#0a2318] rounded-[1.5rem] sm:rounded-[2.5rem] max-w-lg w-full p-6 sm:p-10 relative shadow-2xl animate-in zoom-in-95 duration-300 border border-white/10">
            <button 
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-green-100/50 hover:text-white bg-white/5 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-3xl font-black text-white mb-2">Leave your review</h2>
            <p className="text-green-100/40 mb-8">Tell us what you think about our products!</p>
            
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-green-100/60 mb-2">Your Name</label>
                <input 
                  type="text" 
                  disabled
                  value={newReview.name}
                  className="w-full px-5 py-4 rounded-2xl border border-white/5 bg-black/20 text-green-100/40 font-bold cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-green-100/60 mb-2">Rating</label>
                <div className="flex space-x-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      type="button" 
                      onClick={() => setNewReview({...newReview, rating: star})} 
                      className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star className={`h-10 w-10 ${star <= newReview.rating ? 'text-yellow-500 fill-current' : 'text-white/10'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-green-100/60 mb-2">Your Experience</label>
                <textarea 
                  required 
                  rows={4} 
                  value={newReview.comment} 
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})} 
                  className="w-full px-5 py-4 rounded-2xl border border-white/5 bg-black/20 text-white focus:ring-2 focus:ring-green-500 outline-none transition-all resize-none shadow-sm placeholder:text-white/10"
                  placeholder="Share your experience with our products..."
                ></textarea>
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-5 rounded-2xl shadow-xl transition-all h-auto disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : 'Post Review'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
