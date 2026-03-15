import { useState } from 'react';
import { Milk, Droplets, Leaf, Zap, Check, ChevronRight } from 'lucide-react';

const milkProducts = [
  {
    name: "Fresh Whole Milk",
    description: "Rich in nutrients, delivered fresh every morning",
    image: "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Farm Fresh Yogurt",
    description: "Naturally cultured, probiotic-rich dairy delight",
    image: "https://images.unsplash.com/photo-1599388107955-4424dba413bd?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Soft Paneer",
    description: "Fresh, soft paneer made from pure milk daily",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc3?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Pure Desi Ghee",
    description: "Pure, clarified butter with authentic taste",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Fresh White Butter",
    description: "Creamy, naturally churned fresh white butter",
    image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Flavored Milk",
    description: "Delicious and nutritious milk drink for all ages",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=compress&cs=tinysrgb&w=800"
  }
];

const feedProducts = [
  {
    name: "Cattle Feed",
    description: "High-yield balanced formula for lactating cows and buffaloes.",
    benefits: "Increases milk production and maintains cattle health.",
    nutrition: "Rich in proteins, calcium, and essential vitamins.",
    price: "₹1200 / 50kg bag",
    image: "https://images.unsplash.com/photo-1605333396914-239618b76df4?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Mineral Mixture",
    description: "Essential mineral powder supplement for livestock.",
    benefits: "Improves fertility, immunity, and overall growth.",
    nutrition: "Fortified with Calcium, Phosphorus, Zinc, and Copper.",
    price: "₹180 / 1kg pack",
    image: "https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Chuni / Chokar",
    description: "Premium quality wheat bran / pulse husks.",
    benefits: "Highly digestible energy source, perfect for daily feeding.",
    nutrition: "High fiber content and easily digestible carbohydrates.",
    price: "₹950 / 40kg bag",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Khal (Oil Cake)",
    description: "Pure mustard or cottonseed oil cake residue.",
    benefits: "Exceptional for boosting milk fat percentage and richness.",
    nutrition: "Very high bypass protein and essential fats.",
    price: "₹1850 / 50kg bag",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09af1e0?auto=compress&cs=tinysrgb&w=800"
  }
];

export default function Products() {
  const [activeTab, setActiveTab] = useState<'milk' | 'feed'>('milk');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/244355/pexels-photo-244355.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">Our Premium Products</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-light">
            Quality dairy and specially formulated animal feed, crafted with care for health and purity.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Modern Toggle Bar */}
        <div className="flex justify-center mb-16">
          <div className="bg-white p-2 rounded-full shadow-lg border border-gray-100 inline-flex flex-col sm:flex-row relative z-10 w-full sm:w-auto overflow-hidden sm:overflow-visible">
            {/* Sliding Background indicator (absolute positioning inside relative parent) */}
            <div
              className={`hidden sm:block absolute top-2 bottom-2 rounded-full transition-all duration-300 ease-out shadow-sm w-[49%] ${
                activeTab === 'milk'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 left-2'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 right-2'
              }`}
            ></div>

            <button
              onClick={() => setActiveTab('milk')}
              className={`relative z-20 flex flex-1 items-center justify-center px-8 py-4 rounded-full sm:rounded-l-full sm:rounded-r-none text-lg font-semibold transition-all duration-300 ${
                activeTab === 'milk' 
                  ? 'text-white bg-gradient-to-r from-green-500 to-green-600 sm:bg-none sm:text-white shadow-md sm:shadow-none' 
                  : 'text-gray-600 hover:bg-green-50 sm:hover:bg-transparent sm:hover:text-green-600 bg-transparent'
              }`}
            >
              <Milk className="mr-2 h-6 w-6" />
              Milk Products
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className={`relative z-20 flex flex-1 items-center justify-center px-8 py-4 mt-2 sm:mt-0 rounded-full sm:rounded-r-full sm:rounded-l-none text-lg font-semibold transition-all duration-300 ${
                activeTab === 'feed' 
                  ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 sm:bg-none sm:text-white shadow-md sm:shadow-none' 
                  : 'text-gray-600 hover:bg-orange-50 sm:hover:bg-transparent sm:hover:text-orange-600 bg-transparent'
              }`}
            >
              <Leaf className="mr-2 h-6 w-6" />
              Animal Feed
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {(activeTab === 'milk' ? milkProducts : feedProducts).map((product: any, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group border border-gray-100 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute top-4 right-4 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg ${activeTab === 'milk' ? 'bg-green-600/80 border border-green-500' : 'bg-orange-600/80 border border-orange-500'}`}>
                  {activeTab === 'milk' ? 'Farm Fresh' : 'Premium Quality'}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className={`text-2xl font-bold transition-colors ${activeTab === 'milk' ? 'group-hover:text-green-600 text-gray-900' : 'group-hover:text-orange-600 text-gray-900'}`}>
                    {product.name}
                  </h3>
                  {product.price && (
                    <span className="font-bold text-lg text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                      {product.price.split(' / ')[0]}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6 flex-1">
                  {product.description}
                </p>

                {activeTab === 'feed' && (
                  <div className="space-y-4 mb-8 bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                    <div>
                      <span className="text-xs uppercase font-bold text-orange-600 tracking-wider">Benefits</span>
                      <p className="text-gray-700 text-sm mt-1">{product.benefits}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-orange-600 tracking-wider">Nutrition</span>
                      <p className="text-gray-700 text-sm mt-1">{product.nutrition}</p>
                    </div>
                  </div>
                )}

                <button
                  className={`w-full py-3.5 mt-auto rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 border-2 ${
                    activeTab === 'milk'
                      ? 'bg-green-50/50 text-green-700 border-green-100 hover:bg-green-600 hover:text-white hover:border-green-600'
                      : 'bg-orange-50/50 text-orange-700 border-orange-100 hover:bg-orange-600 hover:text-white hover:border-orange-600'
                  }`}
                >
                  View Details
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Trust Banner */}
        <div className={`mt-24 p-12 rounded-[2rem] text-white transform transition-all duration-700 shadow-xl overflow-hidden relative ${
          activeTab === 'milk' 
            ? 'bg-gradient-to-br from-green-600 to-teal-800' 
            : 'bg-gradient-to-br from-orange-600 to-red-800'
        }`}>
          {/* Decorative background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
            <div className="flex-1 md:pr-10 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                {activeTab === 'milk' ? '100% Purity Guaranteed' : 'Scientifically Formulated'}
              </h2>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed font-light">
                {activeTab === 'milk' 
                  ? 'Every batch of our dairy products undergoes rigorous testing in our labs before reaching your home. Zero adulteration, completely natural.'
                  : 'Our animal feed goes through strict quality control to ensure exact nutritional values are met, giving livestock the perfect balance they need.'}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className={`rounded-full p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl ${activeTab === 'milk' ? 'shadow-green-900/50' : 'shadow-orange-900/50'}`}>
                {activeTab === 'milk' ? <Droplets className="h-20 w-20 text-green-100" /> : <Zap className="h-20 w-20 text-orange-100" />}
              </div>
            </div>
          </div>
        </div>

        {/* Features Footer Section */}
        <div className="mt-28 grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="text-center group">
            <div className="bg-green-100/50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
              <Milk className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">Complete Range</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Portfolio of milk and milk products for your family's daily nutrition</p>
          </div>

          <div className="text-center group">
            <div className="bg-orange-100/50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors duration-300">
              <Leaf className="h-10 w-10 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">Premium Feed</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Specially formulated organic feed for cattle and livestock</p>
          </div>

          <div className="text-center group">
            <div className="bg-blue-100/50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
              <Check className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Lab Tested</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Every product undergoes extensive quality testing and certification</p>
          </div>
        </div>

      </div>
    </div>
  );
}
