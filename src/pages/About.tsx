import { useEffect, useRef } from 'react';
import { Globe, PackageOpen, Beef, CheckCircle } from 'lucide-react';

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

export default function About() {
  return (
    <>
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
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Page Title */}
        <AnimatedSection className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We're here to create a world{' '}
            <span className="inline-flex items-center">
              <Globe className="h-9 w-9 text-green-600 mx-2" />
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6">
            where safe food is a norm, not an exception
          </h2>
          <div className="h-1 w-24 bg-green-600 mx-auto rounded-full"></div>
        </AnimatedSection>

        {/* ── Meet Our Owner (NOW FIRST) ── */}
        <AnimatedSection className="mb-14" delay={100}>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 md:p-12 shadow-xl text-white overflow-hidden">
            <h3 className="text-3xl font-bold mb-8 text-center md:text-left">Meet Our Owner</h3>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0">
                <img
                  src="https://res.cloudinary.com/dfect5qyk/image/upload/v1773684235/mishra_dairy_farm/founder.png"
                  alt="Suneel Mishra - Founder"
                  className="w-full h-full object-cover rounded-2xl shadow-lg border-4 border-green-500/30"
                />
              </div>
              <div className="space-y-3 flex-1 text-center md:text-left">
                <div>
                  <h4 className="text-2xl font-bold opacity-95">Suneel Mishra</h4>
                  <p className="text-lg opacity-75 font-medium">Founder &amp; Owner</p>
                </div>
                <div className="h-px bg-white/20 w-full"></div>
                <p className="text-lg leading-relaxed opacity-90">
                  With a vision to transform the dairy industry and a passion for sustainable farming, Suneel Mishra established Mishra Dairy Farm to bring safe, pure milk to every household.
                </p>
                <p className="text-lg leading-relaxed opacity-90">
                  His commitment to quality, transparency, and animal welfare has made our farm a trusted name in the community.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Our Story (COMPACT VERSION, NOW SECOND) ── */}
        <AnimatedSection className="mb-14" delay={100}>
          <div className="bg-[#FAF8F5] rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 relative overflow-hidden">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { number: "1", color: "bg-[#FFE8A1] text-yellow-900 border-[#FFDB29]", text: "It began with a simple belief — milk should be pure, and farmers should be trusted." },
                { number: "2", color: "bg-[#BCE3DD] text-teal-900 border-[#8BC3BC]", text: "Like many families, we once struggled to find fresh and honest dairy products." },
                { number: "3", color: "bg-[#C4E5B8] text-green-900 border-[#A3D193]", text: "That moment made us realize: if pure milk was hard to find, we had to create it ourselves." },
                { number: "4", color: "bg-[#EBDCC5] text-amber-900 border-[#D4C3A6]", text: "With a few cattle, hard work, and commitment, we started our dairy farm." },
                { number: "5", color: "bg-[#FFB5A7] text-red-900 border-[#E59A8D]", text: "Healthy cattle need the right nutrition — so we also provide quality animal feed for farmers." },
                { number: "6", color: "bg-[#D6A2E8] text-purple-900 border-[#BC85D1]", text: "Today, our farm is a promise — to care for animals, support farmers, and deliver milk families trust. 🐄🌾" },
              ].map((step, i) => (
                <div key={i} className={`rounded-2xl p-5 border-2 flex gap-4 items-start ${step.color}`}>
                  <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-base border-2 ${step.color}`}>{step.number}</span>
                  <p className="text-sm md:text-base font-medium leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ── Mission ── */}
        <AnimatedSection className="mb-14" delay={100}>
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-green-100">
            <div className="bg-green-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
              <PackageOpen className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              At Mishra Dairy Farm, we believe that everyone deserves access to pure, safe, and nutritious food. We're committed to raising the bar for dairy quality and animal care.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Every day, we work tirelessly to ensure our milk and milk products meet the highest standards of purity and safety. Our rigorous testing protocols and commitment to transparency set us apart.
            </p>
          </div>
        </AnimatedSection>

        {/* ── Why Choose Us ── */}
        <AnimatedSection className="mb-14" delay={100}>
          <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-xl overflow-hidden border-2 border-green-100">
            <div className="grid lg:grid-cols-5">
              <div className="lg:col-span-2 bg-[url('https://images.pexels.com/photos/10141619/pexels-photo-10141619.jpeg?auto=compress&cs=tinysrgb&w=800')] bg-cover bg-center min-h-[280px]">
                <div className="h-full w-full bg-gradient-to-r from-green-900/80 to-green-800/80 p-10 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-white mb-4">Why Choose<br/>Our Farm?</h3>
                  <p className="text-green-50 text-base leading-relaxed opacity-90">
                    We don't just sell milk; we provide peace of mind. Here is why thousands of families and local farmers trust us.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-3 p-8 md:p-12 flex flex-col justify-center bg-white">
                <div className="space-y-4">
                  {[
                    { title: "Fresh milk directly from farm", desc: "Straight from our farm to your chilled bottles within hours." },
                    { title: "High nutrition animal feed", desc: "Scientifically balanced feed ensuring optimal cattle health." },
                    { title: "Trusted by local farmers", desc: "A community pillar serving regional needs for over a decade." },
                    { title: "Hygienic milk production", desc: "Zero human touch with rigorous lab testing for every batch." },
                    { title: "Affordable prices", desc: "Premium quality without the premium price tag." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-4 group p-3 rounded-xl hover:bg-green-50 transition-colors">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Our Products ── */}
        <AnimatedSection className="mb-14" delay={100}>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-green-100">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-5">
              <h3 className="text-2xl font-bold text-white">Our Products</h3>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-xl p-3 mt-1 flex-shrink-0">
                    <PackageOpen className="h-7 w-7 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Milk &amp; Milk Products</h4>
                    <p className="text-gray-700 leading-relaxed">Premium quality milk, fresh daily. We also offer curd, paneer, ghee, and more — each rigorously quality tested.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-xl p-3 mt-1 flex-shrink-0">
                    <Beef className="h-7 w-7 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Animal Feed</h4>
                    <p className="text-gray-700 leading-relaxed"><span className="font-semibold text-orange-600">"To feed your animals as if they were our own."</span><br />Premium quality feed formulated for optimal nutrition and health.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Tagline ── */}
        <AnimatedSection className="text-center" delay={100}>
          <div className="inline-block bg-gradient-to-r from-green-600 to-green-700 rounded-full px-10 py-4 shadow-lg">
            <p className="text-white font-bold text-xl">Mishra Dairy Farm — Pure. Safe. Tested.</p>
          </div>
        </AnimatedSection>

      </div>
    </>
  );
}
