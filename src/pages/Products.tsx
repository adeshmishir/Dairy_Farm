import { Milk, Droplets, Package, Leaf, Zap, Check } from 'lucide-react';

export default function Products() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Products</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Premium quality dairy products and animal feed crafted with care and tested for purity
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <Milk className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900">Milk & Dairy</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Fresh, pure milk delivered daily with zero additives, hormones, or antibiotics. Every batch undergoes rigorous testing to guarantee the highest quality for your family.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-lg p-2 mt-1">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Fresh Whole Milk</h4>
                  <p className="text-gray-600">Rich in nutrients, delivered fresh every morning</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-lg p-2 mt-1">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Curd & Yogurt</h4>
                  <p className="text-gray-600">Naturally cultured, probiotic-rich dairy delight</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-lg p-2 mt-1">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Paneer</h4>
                  <p className="text-gray-600">Fresh, soft paneer made from pure milk daily</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-lg p-2 mt-1">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Ghee</h4>
                  <p className="text-gray-600">Pure, clarified butter with authentic taste</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-lg p-2 mt-1">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Daily Testing Certificate</h4>
                  <p className="text-gray-600">Every batch comes with certified purity report</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
              <p className="text-green-900 font-semibold text-lg">
                "Quality you can taste, purity you can trust"
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <img
              src="https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Fresh milk bottles"
              className="rounded-3xl w-full h-80 object-cover shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
            <img
              src="https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Dairy products"
              className="rounded-3xl w-full h-80 object-cover shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        </div>

        <div className="border-t-4 border-green-200 pt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 order-last md:order-first">
              <img
                src="https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Premium animal feed"
                className="rounded-3xl w-full h-96 object-cover shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-orange-100 rounded-full p-3">
                  <Leaf className="h-8 w-8 text-orange-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Premium Animal Feed</h2>
              </div>

              <div className="mb-8">
                <p className="text-2xl font-bold text-orange-600 mb-2">
                  "To feed your animals as if they were our own"
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our specially formulated animal feed is designed with the nutritional needs of livestock in mind. Crafted from premium ingredients, it ensures optimal health, growth, and productivity.
                </p>
              </div>

              <div className="space-y-5 mb-10">
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200">
                  <div className="flex items-start space-x-3">
                    <Zap className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Nutrient-Rich Formula</h4>
                      <p className="text-gray-700">Balanced blend of proteins, minerals, and vitamins for complete animal nutrition</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200">
                  <div className="flex items-start space-x-3">
                    <Package className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Quality Ingredients</h4>
                      <p className="text-gray-700">Sourced from trusted suppliers, carefully selected for maximum nutritional value</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200">
                  <div className="flex items-start space-x-3">
                    <Droplets className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Enhanced Digestion</h4>
                      <p className="text-gray-700">Formulated for easy digestion and better nutrient absorption in livestock</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200">
                  <div className="flex items-start space-x-3">
                    <Check className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Proven Results</h4>
                      <p className="text-gray-700">Used by local farmers, delivering visible improvements in animal health and productivity</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-600 text-white rounded-2xl p-8">
                <p className="text-lg leading-relaxed">
                  Our commitment to quality extends beyond milk. We care for your animals' health because healthy animals produce better milk. It's all interconnected in our ecosystem of care.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Milk className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Dairy Range</h3>
            <p className="text-gray-600 text-lg">Complete portfolio of milk and milk products for your family's nutrition</p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-10 w-10 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Animal Feed</h3>
            <p className="text-gray-600 text-lg">Premium formulated feed for cattle, buffalo, and other livestock</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Tested & Pure</h3>
            <p className="text-gray-600 text-lg">Every product undergoes rigorous quality testing and certification</p>
          </div>
        </div>
      </div>
    </div>
  );
}
