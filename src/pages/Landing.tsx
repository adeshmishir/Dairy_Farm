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
    <div className="min-h-screen bg-[#02110b] flex flex-col overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 flex-1 overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-green-700/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="land-anim relative mb-8">
          <div className="w-36 h-36 mx-auto rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center shadow-2xl shadow-green-900/40 backdrop-blur-sm p-2">
            <img
              src="/logo.png"
              alt="Mishra Dairy Farm"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
          {/* Animated ring */}
          <span className="absolute inset-0 rounded-full border-2 border-green-400/20 animate-ping" style={{ animationDuration: '2.5s' }} />
        </div>

        {/* Headline */}
        <h1 className="land-anim text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-3xl">
          Welcome to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
            Mishra Dairy Farm
          </span>
        </h1>

        <p className="land-anim mt-5 text-base sm:text-lg md:text-xl text-green-100/60 max-w-2xl leading-relaxed">
          A legacy of purity since generations. From our lush green fields to your breakfast table — we bring you the freshest dairy products, nurtured with love and tradition.
        </p>

        {/* Tagline badge */}
        <div className="land-anim mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-800/40 border border-green-600/30 text-green-300 text-sm font-semibold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Pure · Fresh · Always
        </div>

        {/* CTA Button */}
        <div className="land-anim mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleExplore}
            className="group relative px-10 py-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white font-extrabold text-lg shadow-xl shadow-green-900/50 hover:shadow-green-700/60 hover:scale-105 active:scale-95 transition-all duration-200 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            {/* shimmer */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </button>

          <a
            href="https://wa.me/918953280445"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-bold text-base hover:bg-[#25D366]/20 transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Contact Us
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="land-anim mt-16 flex flex-col items-center gap-2 text-green-400/40 animate-bounce">
          <span className="text-xs font-semibold tracking-widest uppercase">Scroll to discover</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-6 pb-20 max-w-6xl mx-auto w-full">
        <h2 className="land-anim text-2xl sm:text-3xl font-bold text-white text-center mb-12">
          Why Choose <span className="text-green-400">Mishra Dairy Farm?</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="land-anim group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-green-900/30 hover:border-green-500/30 transition-all duration-300 cursor-default"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
              <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
              <p className="text-green-100/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="land-anim bg-gradient-to-r from-green-900/40 via-emerald-900/30 to-green-900/40 border-t border-b border-white/5 py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '15+', label: 'Years of Excellence' },
            { value: '500+', label: 'Happy Families' },
            { value: '100%', label: 'Pure & Natural' },
            { value: '365', label: 'Days a Year' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-green-400">{s.value}</span>
              <span className="text-green-100/50 text-sm font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <div className="land-anim py-6 text-center text-green-400/30 text-xs font-medium tracking-wide">
        © {new Date().getFullYear()} Mishra Dairy Farm · Prayagraj, India
      </div>
    </div>
  );
}
