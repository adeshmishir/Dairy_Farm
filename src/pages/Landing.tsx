import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: '🥛',
    title: 'Pure Fresh Milk',
    desc: 'Farm-to-table dairy delivered fresh every morning directly from our healthy, happy cows.',
  },
  {
    icon: '🌿',
    title: 'Organic & Natural',
    desc: 'No preservatives, no artificial additives — just pure, natural goodness from our green pastures.',
  },
  {
    icon: '🐄',
    title: 'Ethically Raised',
    desc: 'Our cows graze freely on lush meadows with world-class care, ensuring premium quality produce.',
  },
  {
    icon: '🚚',
    title: 'Daily Home Delivery',
    desc: 'Subscribe to our doorstep delivery service and never run out of fresh dairy again.',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Animate elements once mounted
    const els = document.querySelectorAll<HTMLElement>('.land-anim');
    els.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(32px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + i * 120);
    });
  }, []);

  const handleExplore = () => {
    localStorage.setItem('hasVisited', 'true');
    navigate('/');
  };

  return (
    <div 
      onClick={handleExplore}
      className="min-h-screen bg-[#02110b] flex flex-col overflow-x-hidden relative selection:bg-green-500/30 cursor-pointer"
    >
      {/* ── BACKGROUND LAYER ── */}
      <div 
        className="fixed inset-0 z-0 scale-105"
        style={{
          backgroundImage: 'url(/landing-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'slowZoom 40s infinite alternate ease-in-out'
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#02110b]/90 via-[#02110b]/40 to-[#02110b] pointer-events-none" />
      
      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
      `}</style>

      {/* ── CONTENT LAYER ── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ── HERO ── */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 flex-1 overflow-hidden">
          {/* Background glow blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-green-500/20 blur-[120px] pointer-events-none opacity-50" />
          
          {/* Logo */}
          <div 
            className="land-anim relative mb-10 group/logo"
          >
            <div className="w-40 h-40 mx-auto transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:rotate-3 flex items-center justify-center rounded-full overflow-hidden">
              <img
                src="/logo.png"
                alt="Mishra Dairy Farm"
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]"
              />
            </div>
            {/* Animated rings */}
            <span className="absolute inset-0 rounded-full border border-green-400/20 animate-[ping_3s_infinite] scale-150" />
          </div>

          {/* Name & Explore */}
          <div className="land-anim flex flex-col items-center">
            <div 
              className="group select-none relative mb-12"
            >
              <h1 className="text-6xl sm:text-8xl md:text-[11rem] font-black tracking-tighter transition-all duration-1000 flex flex-col items-center">
                <span className="block leading-none -mb-6 text-[#fdfcf0]/50 group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:-translate-y-4 transition-all duration-1000 ease-out italic font-serif mix-blend-overlay filter brightness-110">
                  Mishra
                </span>
                <span className="block leading-none text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-green-600 via-emerald-200 to-green-600 animate-gradient-slow group-hover:tracking-tight transition-all duration-1000 drop-shadow-[0_0_40px_rgba(74,222,128,0.4)] group-hover:drop-shadow-[0_0_60px_rgba(74,222,128,0.8)] filter brightness-125">
                  Dairy Farm
                </span>
              </h1>
              
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-4 group-hover:translate-y-0">
                <span className="text-green-400/60 text-xs font-black tracking-[0.6em] uppercase">
                  Ancient Traditions • Modern Purity
                </span>
              </div>
            </div>

            {/* Click Anywhere Prompt */}
            <div className="animate-pulse flex items-center gap-3 text-green-400/60 font-black tracking-[0.2em] uppercase text-xs mt-8">
              <span className="w-8 h-[1px] bg-green-400/20"></span>
              Click anywhere to enter
              <span className="w-8 h-[1px] bg-green-400/20"></span>
            </div>
          </div>

          <style>{`
            @keyframes gradient-slow {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-gradient-slow {
              animation: gradient-slow 8s infinite linear;
            }
          `}</style>

          {/* Scroll indicator */}
          <div className="land-anim mt-20 flex flex-col items-center gap-3 text-green-400 opacity-60">
            <span className="text-xs font-bold tracking-[0.3em] uppercase">Scroll to discover</span>
            <div className="w-6 h-10 border-2 border-green-400/30 rounded-full flex justify-center p-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="px-6 pb-32 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="land-anim group p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:bg-green-500/10 hover:border-green-500/30 transition-all duration-500 backdrop-blur-xl shadow-2xl"
              >
                <div className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-500 group-hover:rotate-6 drop-shadow-lg">{f.icon}</div>
                <h3 className="text-white font-black text-xl mb-3 tracking-tight">{f.title}</h3>
                <p className="text-green-50/50 text-base leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS BANNER ── */}
        <section className="land-anim mx-6 mb-20">
          <div className="max-w-6xl mx-auto rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-2xl py-12 px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
            {[
              { value: '15+', label: 'Years of Trust' },
              { value: '500+', label: 'Happy Families' },
              { value: '100%', label: 'Purity Promise' },
              { value: '24/7', label: 'Support' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-300">{s.value}</span>
                <span className="text-green-50/40 text-xs font-bold uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER STRIP ── */}
        <div className="land-anim py-10 text-center text-white/20 text-sm font-bold tracking-widest uppercase">
          © {new Date().getFullYear()} Mishra Dairy Farm · Premium Quality Since 2010
        </div>
      </div>
    </div>
  );
}
