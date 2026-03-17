import { useEffect, useRef, useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Photo {
  _id: string;
  url: string;
  caption?: string;
  category: string;
}

function GalleryCard({ image, index }: { image: Photo; index: number }) {
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
        transition: `opacity 0.6s ease-out ${index % 10 * 80}ms, transform 0.6s ease-out ${index % 10 * 80}ms`
      }}
      className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-[#0a2318] border border-white/5 cursor-pointer aspect-square"
    >
      <img
        src={image.url}
        alt={image.caption || 'Dairy Farm Photo'}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-2">
          {image.category || 'Farm Life'}
        </span>
        <h3 className="text-xl font-bold text-white">{image.caption}</h3>
      </div>
    </div>
  );
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/photos');
        if (!response.ok) throw new Error('Failed to fetch photos');
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        toast.error('Could not load gallery images');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-[#02110b] text-green-50/90">
      <div className="bg-gradient-to-r from-green-800 to-[#0a2318] text-white py-20 relative overflow-hidden">
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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-12 w-12 text-green-500 animate-spin mb-4" />
            <p className="text-green-100/50 font-bold tracking-widest uppercase">Loading Gallery...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-24">
            <Camera className="h-16 w-16 text-green-500/20 mx-auto mb-4" />
            <p className="text-green-100/30 text-xl font-black uppercase tracking-widest">No photos found in gallery</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo, index) => (
              <GalleryCard key={photo._id} image={photo} index={index} />
            ))}
          </div>
        )}

        <div className="mt-20 text-center">
          <div className="inline-block bg-green-500/10 border border-green-500/10 backdrop-blur-sm rounded-full px-8 py-3">
            <p className="text-green-400 font-bold text-lg">
              Follow us on social media for more daily updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
