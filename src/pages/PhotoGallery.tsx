import { useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';

const galleryImages = [
  {
    url: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684244/mishra_dairy_farm/gallery-7.jpg",
    title: "Our Dedicated Team",
    category: "Farm Life"
  },
  {
    url: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684236/mishra_dairy_farm/gallery-1.png",
    title: "Nourishing Our Calves",
    category: "Care"
  },
  {
    url: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684238/mishra_dairy_farm/gallery-2.jpg",
    title: "Gentle Hands, Trusting Calves",
    category: "Bonding"
  },
  {
    url: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684239/mishra_dairy_farm/gallery-3.jpg",
    title: "Healthy & Happy Herd",
    category: "Farm Life"
  },
  {
    url: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684240/mishra_dairy_farm/gallery-4.png",
    title: "Pure, Fresh Milking",
    category: "Fresh Milk"
  },
  {
    url: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684241/mishra_dairy_farm/gallery-5.jpg",
    title: "Innocence & Bonding",
    category: "Bonding"
  },
  {
    url: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684243/mishra_dairy_farm/gallery-6.jpg",
    title: "Irrigation & Greenery",
    category: "Nature"
  },
];

function GalleryCard({ image, index }: { image: typeof galleryImages[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
        transition: `opacity 0.6s ease-out ${index * 80}ms, transform 0.6s ease-out ${index * 80}ms`
      }}
      className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 bg-white cursor-pointer aspect-square"
    >
      <img
        src={image.url}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-2">
          {image.category}
        </span>
        <h3 className="text-xl font-bold text-white">{image.title}</h3>
      </div>
    </div>
  );
}

export default function PhotoGallery() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            <Camera className="h-8 w-8 mr-3" />
            <span className="text-xl font-semibold tracking-wide uppercase">Farm Life</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">Our Photo Gallery</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-light">
            A glimpse into the daily life at Mishra Dairy Farm. Happy animals, pure milk, and green pastures.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <GalleryCard key={index} image={image} index={index} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block bg-green-100 rounded-full px-8 py-3">
            <p className="text-green-800 font-semibold text-lg">
              Follow us on social media for more daily updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
