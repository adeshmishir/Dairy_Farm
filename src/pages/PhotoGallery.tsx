import { Camera } from 'lucide-react';

const galleryImages = [
  {
    url: "https://images.pexels.com/photos/10141619/pexels-photo-10141619.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Healthy Herd",
    category: "Cows"
  },
  {
    url: "https://images.pexels.com/photos/11124976/pexels-photo-11124976.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Morning Grazing",
    category: "Buffaloes"
  },
  {
    url: "https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Our Green Pastures",
    category: "Farm"
  },
  {
    url: "https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Fresh Milk Daily",
    category: "Milk"
  },
  {
    url: "https://images.pexels.com/photos/20853588/pexels-photo-20853588.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Happy Cows",
    category: "Cows"
  },
  {
    url: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=compress&cs=tinysrgb&w=800",
    title: "Calm Surroundings",
    category: "Buffaloes"
  }
];

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
            <div 
              key={index} 
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-white cursor-pointer aspect-square"
            >
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                  {image.category}
                </span>
                <h3 className="text-2xl font-bold text-white">{image.title}</h3>
              </div>
            </div>
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
