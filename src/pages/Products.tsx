import { useState, useEffect } from 'react';
import { Milk, Droplets, Leaf, Zap, Check, ChevronRight, X } from 'lucide-react';

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
    name: "LAL FEEDS MY-9000+ (Milk Booster)",
    description: "Designed for young calves to support their initial growth and development.",
    benefits: "Promotes rapid growth, healthy development, and strong immune function in young calves.",
    nutrition: "High in essential nutrients, including protein, vitamins and minerals.",
    price: "₹1500 / 50kg bag",
    image: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684245/mishra_dairy_farm/feed-red.png",
    detailedDescription: {
      purpose: "Designed for young calves to support their initial growth and development.",
      keyFeatures: [
        "High in essential nutrients, including protein, vitamins and minerals",
        "Easily digestible ingredients to support early digestive health",
        "Promotes healthy weight gain and strong immune function"
      ],
      detailedBenefits: [
        "Provides essential nutrients that promote rapid growth and healthy development in young calves",
        "Formulated with easily digestible ingredients that support the development of the calf's digestive system",
        "Contains vitamins and minerals that boost the immune system, helping calves resist diseases and infections",
        "Optimized for efficient weight gain, ensuring calves reach their target weights faster",
        "Rich in calcium and phosphorus to ensure strong bone development and muscle growth",
        "Facilitates a smoother transition from milk to solid feeds, reducing stress and digestive issues"
      ],
      whyFeedTitle: "Why Feed Calf Starter?",
      whyFeed: "Feeding Calf Starter feed helps young calves grow strong and healthy. This specialized feed gives them the right nutrients, supports their immune system, and helps their stomachs get used to solid food. It makes sure calves grow well and stay healthy."
    }
  },
  {
    name: "LAL FEEDS MY-5000+ (Super Power)",
    description: "Formulated for growing cattle to ensure continuous development and weight gain.",
    benefits: "Ensures steady and healthy weight gain, supporting strong muscle and bone growth.",
    nutrition: "Balanced ratio of proteins, carbohydrates and fats. Fortified with vitamins and minerals.",
    price: "₹1400 / 50kg bag",
    image: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684246/mishra_dairy_farm/feed-green.png",
    detailedDescription: {
      purpose: "Formulated for growing cattle to ensure continuous development and weight gain.",
      keyFeatures: [
        "Balanced ratio of proteins, carbohydrates and fats",
        "Fortified with vitamins and minerals to support bone and muscle growth",
        "Optimized for efficient feed conversion and growth rates"
      ],
      detailedBenefits: [
        "Provides balanced nutrients that support continuous and efficient growth in developing cattle",
        "Ensures steady and healthy weight gain, helping cattle reach their growth milestones efficiently",
        "Supports strong muscle and bone growth, crucial for overall health and productivity in cattle",
        "Comprehensive nutrient profile supports the overall health and well-being of the cattle, reducing the risk of health issues"
      ],
      whyFeedTitle: "Why Feed Calf Grower?",
      whyFeed: "Calf Grower feed supports steady growth and development in young cattle. This specialized feed provides the right nutrients for strong muscles and bones, boosts their immune system, and ensures healthy weight gain. It helps calves grow into strong, healthy adult cattle."
    }
  },
  {
    name: "LAL FEEDS MY-7000+ (High Protein & Fat)",
    description: "Tailored for cattle nearing market weight to maximize muscle mass and overall body condition.",
    benefits: "Promotes rapid weight gain in animals nearing market readiness, enhancing meat quality.",
    nutrition: "High-energy content and specific nutrients to improve meat quality and feed-to-gain ratios.",
    price: "₹1600 / 50kg bag",
    image: "https://res.cloudinary.com/dfect5qyk/image/upload/v1773684247/mishra_dairy_farm/feed-blue.png",
    detailedDescription: {
      purpose: "Tailored for cattle nearing market weight to maximize muscle mass and overall body condition.",
      keyFeatures: [
        "High-energy content to promote rapid weight gain",
        "Enhanced with specific nutrients to improve meat quality",
        "Formulated for efficient feed-to-gain ratios"
      ],
      detailedBenefits: [
        "Promotes rapid weight gain in animals nearing market readiness",
        "Helps achieve desired market weight and condition efficiently",
        "Provides balanced nutrition to support muscle development",
        "Enhances overall carcass quality and meat yield",
        "Contains optimal levels of protein and energy for efficient growth",
        "Supports uniformity in size and maturity of animals"
      ],
      whyFeedTitle: "Why Feed Finisher?",
      whyFeed: "Feeding finisher feed is essential for preparing cattle for market. This special feed is high in energy to promote rapid weight gain and muscle growth. It provides the right nutrients to enhance meat quality and ensures cattle reach their optimal size and condition efficiently, resulting in better market readiness and profitability."
    }
  },
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
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

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
                      <p className="text-gray-700 text-sm mt-1 line-clamp-2">{product.benefits}</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setSelectedProduct(product)}
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

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black/60 p-4 md:p-8 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 md:p-10 relative flex flex-col my-auto h-fit shadow-2xl animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex flex-col md:flex-row gap-10 mt-4">
              <div className="w-full md:w-5/12">
                 <img 
                   src={selectedProduct.image} 
                   alt={selectedProduct.name} 
                   className={`w-full h-auto max-h-[500px] rounded-2xl object-cover shadow-lg border-4 ${
                     activeTab === 'milk' ? 'border-green-100' : 'border-orange-100'
                   }`}
                 />
                 {selectedProduct.price && (
                   <div className={`mt-6 p-4 rounded-xl text-center shadow-sm font-bold text-xl ${
                     activeTab === 'milk' ? 'bg-green-50 text-green-800 border-2 border-green-200' : 'bg-orange-50 text-orange-800 border-2 border-orange-200'
                   }`}>
                     Price: {selectedProduct.price}
                   </div>
                 )}
              </div>
              <div className="w-full md:w-7/12 space-y-6">
                 <div>
                   <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{selectedProduct.name}</h2>
                   <p className="text-gray-600 text-lg md:text-xl leading-relaxed">{selectedProduct.description}</p>
                 </div>
                 
                 {selectedProduct.detailedDescription ? (
                   <div className="space-y-8 mt-8 border-t border-gray-100 pt-8">
                      <div>
                         <h3 className="text-xl font-bold flex items-center text-orange-700 mb-3">
                           <Zap className="h-5 w-5 mr-2" /> Purpose
                         </h3>
                         <p className="text-gray-700 leading-relaxed text-lg bg-orange-50 p-4 rounded-xl">{selectedProduct.detailedDescription.purpose}</p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                           <h3 className="text-xl font-bold flex items-center text-gray-900 mb-3">
                             <Check className="h-5 w-5 mr-2 text-green-600" /> Key Features
                           </h3>
                           <ul className="space-y-3">
                             {selectedProduct.detailedDescription.keyFeatures.map((f: string, i: number) => (
                               <li key={i} className="flex items-start">
                                 <span className="h-2 w-2 mt-2 mr-2 bg-green-500 rounded-full flex-shrink-0"></span>
                                 <span className="text-gray-700">{f}</span>
                               </li>
                             ))}
                           </ul>
                        </div>
                        <div>
                           <h3 className="text-xl font-bold flex items-center text-gray-900 mb-3">
                             <Leaf className="h-5 w-5 mr-2 text-green-600" /> Benefits
                           </h3>
                           <ul className="space-y-3">
                             {selectedProduct.detailedDescription.detailedBenefits.map((b: string, i: number) => (
                               <li key={i} className="flex items-start">
                                 <span className="h-2 w-2 mt-2 mr-2 bg-green-500 rounded-full flex-shrink-0"></span>
                                 <span className="text-gray-700">{b}</span>
                               </li>
                             ))}
                           </ul>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                         <h3 className="text-xl font-bold text-gray-900 mb-3">{selectedProduct.detailedDescription.whyFeedTitle}</h3>
                         <p className="text-gray-700 leading-relaxed italic">"{selectedProduct.detailedDescription.whyFeed}"</p>
                      </div>
                   </div>
                 ) : (selectedProduct.benefits || selectedProduct.nutrition) ? (
                   <div className="space-y-6 mt-8 border-t border-gray-100 pt-8">
                      {selectedProduct.benefits && (
                        <div>
                          <h3 className="text-xl font-bold flex items-center text-gray-900 mb-3">
                             <Leaf className="h-5 w-5 mr-2 text-green-600" /> Benefits
                           </h3>
                          <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">{selectedProduct.benefits}</p>
                        </div>
                      )}
                      {selectedProduct.nutrition && (
                        <div>
                           <h3 className="text-xl font-bold flex items-center text-gray-900 mb-3">
                             <Check className="h-5 w-5 mr-2 text-green-600" /> Nutrition
                           </h3>
                          <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">{selectedProduct.nutrition}</p>
                        </div>
                      )}
                   </div>
                 ) : null}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
