import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Heart, ChevronDown, ChevronUp, Users, Sprout, Recycle, Calendar, MapPin, Clock, ArrowRight, CheckCircle, Camera, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../lib/auth';
import { toast } from 'sonner';

const API = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api';

// Custom hook for scroll-triggered animations
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`scroll-section ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const AccordionItem = ({ title, icon: Icon, children, isOpen, onClick }: any) => (
  <div className="border border-white/5 rounded-3xl overflow-hidden mb-4 bg-[#0a2318] shadow-sm hover:shadow-xl transition-all duration-300">
    <button
      onClick={onClick}
      className={`w-full px-8 py-6 flex items-center justify-between text-left transition-colors ${isOpen ? 'bg-green-500/10' : 'hover:bg-white/5'}`}
    >
      <div className="flex items-center gap-4">
        <div className="bg-green-500/10 p-3 rounded-2xl">
          <Icon className="h-6 w-6 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      {isOpen ? <ChevronUp className="text-green-400" /> : <ChevronDown className="text-green-700" />}
    </button>
    {isOpen && (
      <div className="px-8 pb-8 pt-2 animate-in slide-in-from-top-4 duration-300">
        <div className="h-px bg-white/5 mb-6 w-full"></div>
        {children}
      </div>
    )}
  </div>
);

export default function About() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [founderImage, setFounderImage] = useState('https://res.cloudinary.com/dfect5qyk/image/upload/v1773684235/mishra_dairy_farm/founder.png');
  const [founderName, setFounderName] = useState('Mr Suneel Mishra');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Fetch image
    fetch(`${API}/settings/founder_image`)
      .then(res => res.json())
      .then(data => {
        if (data.value) setFounderImage(data.value);
      })
      .catch(() => {});

    // Fetch name
    fetch(`${API}/settings/founder_name`)
      .then(res => res.json())
      .then(data => {
        if (data.value) setFounderName(data.value);
      })
      .catch(() => {});
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${API}/settings/founder_image`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setFounderImage(data.value);
      toast.success('Founder image updated! 📸');
    } catch (err: any) {
      toast.error('Failed to update image: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleNameEdit = async () => {
    const newName = prompt('Enter new Founder name:', founderName);
    if (!newName || newName === founderName || !token) return;

    try {
      const res = await fetch(`${API}/settings/founder_name`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ value: newName })
      });

      if (!res.ok) throw new Error('Failed to update');
      setFounderName(newName);
      toast.success('Founder name updated! ✨');
    } catch (err) {
      toast.error('Could not update name');
    }
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-[#02110b] text-green-50/90 font-sans selection:bg-green-500/30">
      <div className="pt-6"></div> {/* Added spacer for floating nav */}
      <style>{`
        .scroll-section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .scroll-section.animate-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 pt-20 pb-40 sm:pt-24 sm:pb-48 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://res.cloudinary.com/dfect5qyk/image/upload/v1773772540/mishra_dairy/about/about_hero_background.jpg')] bg-cover bg-center transition-opacity duration-700"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">Our Legacy & Care</h1>
            <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-light leading-relaxed">
              Mishra Dairy Farm isn't just a business; it's a commitment to purity, farmers, and the health of our community.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-24 relative z-20">
        
        {/* ── Founder Spotlight (MAIN FOCUS) ── */}
        <AnimatedSection className="mb-12 shadow-2xl">
          <div className="bg-[#0a2318] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 opacity-50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-center relative z-10">
              <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0 relative">
                <div className="absolute inset-0 bg-green-600 rounded-[2rem] sm:rounded-[2.5rem] rotate-6 group-hover:rotate-3 transition-transform duration-500"></div>
                <div className="relative w-full h-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl z-10 border-4 border-white transition-transform duration-500 group-hover:-translate-y-2">
                  <img
                    src={founderImage}
                    alt="Suneel Mishra - Founder"
                    className={`w-full h-full object-cover transition-all duration-500 ${isUploading ? 'blur-sm grayscale' : ''}`}
                  />
                  {user?.isAdmin && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-green-600 p-4 rounded-full text-white shadow-xl transform active:scale-95 transition-transform"
                        disabled={isUploading}
                      >
                        <Camera size={32} />
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={handleImageChange} 
                        accept="image/*"
                      />
                    </div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block bg-green-500/10 text-green-400 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-green-500/10">
                  Visionary Behind the Farm
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-end gap-4 mb-2">
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">{founderName}</h2>
                  {user?.isAdmin && (
                    <button 
                      onClick={handleNameEdit}
                      className="p-2 mb-1.5 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-lg shadow-green-900/10"
                    >
                      <Edit3 size={18} />
                    </button>
                  )}
                </div>
                <p className="text-xl text-green-400 font-bold mb-6">Founder & Managing Director</p>
                <div className="h-1 w-20 bg-green-500/20 mb-8 mx-auto md:mx-0"></div>
                
                <div className="space-y-4 text-green-100/60 text-lg leading-relaxed font-medium">
                  <p>
                    "With a vision to transform the dairy industry and a passion for sustainable farming, I established Mishra Dairy Farm to bring safe, pure milk to every household."
                  </p>
                  <p>
                    My commitment to quality, transparency, and animal welfare is the cornerstone of everything we do. We don't just sell products; we deliver a promise of health and honesty.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Refined Info Accordions ── */}
        <div className="space-y-4">
          <AnimatedSection delay={100}>
            <AccordionItem 
              title="Our Story" 
              icon={Globe} 
              isOpen={openSection === 'story'} 
              onClick={() => toggleSection('story')}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-green-100/70 text-lg leading-relaxed">
                  <p>It began with a simple belief — milk should be pure, and farmers should be trusted. Like many families, we once struggled to find fresh and honest dairy products.</p>
                  <p>That moment made us realize: if pure milk was hard to find, we had to create it ourselves. With a few cattle, hard work, and commitment, we started our dairy farm.</p>
                  <p className="font-bold text-green-400 italic">"Today, our farm is a promise — to care for animals, support farmers, and deliver milk families trust."</p>
                </div>
                <div className="bg-green-900/20 p-6 rounded-[2rem] border border-green-500/10 flex flex-col justify-center text-center">
                  <div className="grid grid-cols-2 gap-4">
                     {[
                       { label: 'Started with', val: '5 Cows' },
                       { label: 'Founded in', val: '2010' },
                       { label: 'Communities', val: '20+' },
                       { label: 'Happy Families', val: '1000+' }
                     ].map((stat, i) => (
                       <div key={i} className="bg-[#02110b] p-4 rounded-2xl shadow-sm border border-white/5">
                         <p className="text-green-500/30 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                         <p className="text-xl font-black text-green-400">{stat.val}</p>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            </AccordionItem>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <AccordionItem 
              title="Our Mission" 
              icon={Sprout} 
              isOpen={openSection === 'mission'} 
              onClick={() => toggleSection('mission')}
            >
              <div className="space-y-6">
                <div className="bg-green-900/30 p-6 rounded-2xl border-l-4 border-green-500">
                  <p className="text-green-100 text-xl font-medium leading-relaxed italic">
                    "To create a world where safe food is a norm, not an exception, through transparent farming and uncompromising quality."
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-5 bg-[#02110b] border border-white/5 rounded-2xl">
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                       Purity Above All
                    </h4>
                    <p className="text-green-100/40 text-sm">We maintain zero-human-touch production lines and rigorous testing protocols for every batch.</p>
                  </div>
                  <div className="p-5 bg-[#02110b] border border-white/5 rounded-2xl">
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                       Animal Welfare
                    </h4>
                    <p className="text-green-100/40 text-sm">Healthy cattle produce better milk. We focus on ethical treatment, high-nutrition feed, and stress-free environments.</p>
                  </div>
                </div>
              </div>
            </AccordionItem>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <AccordionItem 
              title="Why Choose Our Farm?" 
              icon={CheckCircle} 
              isOpen={openSection === 'why'} 
              onClick={() => toggleSection('why')}
            >
              <div className="grid md:grid-cols-3 gap-6">
                 {[
                   { title: "Direct Farm Fresh", desc: "Straight from farm to chilled bottles within hours." },
                   { title: "Scientifically Balanced", desc: "Our MY-9000+ feed ensures optimal nutrition." },
                   { title: "Lab Certified", desc: "Rigorous laboratory testing for every single batch." },
                   { title: "Hygienic Process", desc: "Fully automated zero-touch milking systems." },
                   { title: "No Harmful Additives", desc: "Zero hormones, zero antibiotics, 100% natural." },
                   { title: "Affordable Premium", desc: "Superior quality at honest, fair market prices." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 items-start p-4 hover:bg-green-900/20 rounded-2xl transition-colors group">
                      <div className="bg-green-500/10 p-2 rounded-lg text-green-400 group-hover:bg-green-600 group-hover:text-white transition-all">
                        <CheckCircle size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                        <p className="text-green-100/40 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </AccordionItem>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <AccordionItem 
              title="We Care: Beyond the Milk" 
              icon={Heart} 
              isOpen={openSection === 'we-care'} 
              onClick={() => toggleSection('we-care')}
            >
              <div className="space-y-12">
                {/* We Care Pillars */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-[#02110b] p-6 rounded-[2rem] border border-white/5 text-center transition-transform hover:scale-105">
                    <Recycle className="h-10 w-10 text-green-500 mx-auto mb-4" />
                    <h4 className="font-bold text-white mb-2">Plastic Loop</h4>
                    <p className="text-green-100/40 text-sm">Reducing waste through recycled packaging and return programs.</p>
                  </div>
                  <div className="bg-[#02110b] p-6 rounded-[2rem] border border-white/5 text-center transition-transform hover:scale-105">
                    <Users className="h-10 w-10 text-orange-400 mx-auto mb-4" />
                    <h4 className="font-bold text-white mb-2">Farmers First</h4>
                    <p className="text-green-100/40 text-sm">Ensuring fair prices and constant support for our partner farmers.</p>
                  </div>
                  <div className="bg-[#02110b] p-6 rounded-[2rem] border border-white/5 text-center transition-transform hover:scale-105">
                    <Sprout className="h-10 w-10 text-blue-400 mx-auto mb-4" />
                    <h4 className="font-bold text-white mb-2">Pure Ecosystem</h4>
                    <p className="text-green-100/40 text-sm">From quality feed to ethical farming — we care for the whole chain.</p>
                  </div>
                </div>

                {/* Come and See Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl overflow-hidden relative">
                   <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-10 skew-x-12 translate-x-1/2"></div>
                   <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
                      <div className="flex-1">
                        <Calendar className="h-12 w-12 mb-6 opacity-90" />
                        <h3 className="text-3xl font-black mb-4">Visit Our Farm</h3>
                        <p className="text-xl mb-6 font-medium text-blue-50 leading-relaxed">
                          Experience farm life firsthand! Join us for a day of learning, memories, and fresh air.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm font-bold bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
                            <Clock size={16} /> Full Day Experience
                          </div>
                          <div className="flex items-center gap-3 text-sm font-bold bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
                            <Users size={16} /> Families & Schools Welcome
                          </div>
                          <div className="flex items-center gap-3 text-sm font-bold bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
                            <MapPin size={16} /> Hands-on Learning
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3 h-64 rounded-3xl overflow-hidden shadow-2xl">
                         <img 
                          src="https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=800" 
                          alt="Farm Visit" 
                          className="w-full h-full object-cover"
                         />
                      </div>
                   </div>
                </div>
              </div>
            </AccordionItem>
          </AnimatedSection>
        </div>

        {/* ── Sub-Tagline ── */}
        <AnimatedSection className="text-center mt-20 flex flex-col items-center gap-8" delay={500}>
          <div className="inline-block p-1 bg-gradient-to-r from-green-300 via-green-500 to-green-300 rounded-full">
            <div className="bg-white rounded-full px-10 py-3">
              <p className="text-green-700 font-black text-lg tracking-wide">Mishra Dairy Farm — Where Quality Meets Care</p>
            </div>
          </div>
          
          <Button 
            onClick={() => navigate('/')} 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white rounded-[2rem] px-12 h-16 text-xl font-black shadow-2xl shadow-green-200 flex items-center gap-3 transform hover:scale-105 transition-all"
          >
            Explore Our Products
            <ArrowRight className="h-6 w-6" />
          </Button>
        </AnimatedSection>

      </div>
    </div>
  );
}
