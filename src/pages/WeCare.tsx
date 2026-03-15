import { Calendar, MapPin, Clock, Users } from 'lucide-react';

export default function WeCare() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">We Care</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Our commitment extends beyond milk. We care for our planet, our farmers, and our community.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-10 mb-24">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-10 hover:shadow-2xl transition-all duration-300 border border-green-100 flex flex-col items-center text-center">
            <div className="w-56 h-56 mb-8 overflow-hidden flex items-center justify-center mix-blend-multiply">
              <img src="/images/wecare/recycle.png" alt="Closing the Plastic Loop" className="max-w-full max-h-full object-contain" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Closing the Plastic Loop
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              We're committed to reducing plastic waste through innovative recycling programs and sustainable packaging solutions. Every bottle returned helps create a cleaner future.
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-10 hover:shadow-2xl transition-all duration-300 border border-orange-100 flex flex-col items-center text-center">
            <div className="w-56 h-56 mb-8 overflow-hidden flex items-center justify-center mix-blend-multiply">
              <img src="/images/wecare/farmer.png" alt="Putting Farmers First" className="max-w-full max-h-full object-contain" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Putting Farmers First
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our farmers are our partners. We ensure fair prices, provide training, and support their families. When they thrive, everyone benefits.
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-10 hover:shadow-2xl transition-all duration-300 border border-emerald-100 flex flex-col items-center text-center">
            <div className="w-56 h-56 mb-8 overflow-hidden flex items-center justify-center mix-blend-multiply">
              <img src="/images/wecare/ecosystem.png" alt="Building a Better Milk Ecosystem" className="max-w-full max-h-full object-contain" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Building a Better Milk Ecosystem
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              From sustainable farming practices to animal welfare, we're creating an ecosystem where quality, ethics, and care come together.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-12 flex flex-col justify-center">
              <Calendar className="h-14 w-14 text-white mb-6 opacity-90" />
              <h2 className="text-4xl font-bold text-white mb-6">
                Come Over and See How We Do It
              </h2>
              <p className="text-2xl text-white mb-8 font-medium">
                It's Fun, Learning and Memories. Packed into a day
              </p>
              <p className="text-lg text-white opacity-90 leading-relaxed mb-8">
                Experience farm life firsthand! Join us for an educational tour where you'll see our daily operations, meet our animals, learn about sustainable farming, and understand what makes our milk truly special.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-white bg-opacity-20 rounded-lg p-2">
                    <Clock className="h-5 w-5" />
                  </div>
                  <span className="text-lg">Full day experience</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-white bg-opacity-20 rounded-lg p-2">
                    <Users className="h-5 w-5" />
                  </div>
                  <span className="text-lg">Perfect for families and schools</span>
                </div>
                <div className="flex items-center space-x-3 text-white">
                  <div className="bg-white bg-opacity-20 rounded-lg p-2">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-lg">Hands-on learning activities</span>
                </div>
              </div>
            </div>

            <div className="relative h-full min-h-[500px]">
              <img
                src="https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Dairy farm visit"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-40"></div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block bg-green-100 rounded-full px-8 py-3 mb-6">
            <p className="text-green-800 font-semibold text-lg">
              Every action we take is guided by one principle: care
            </p>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            From the moment our cows wake up to when your milk reaches your table, every decision is made with care for animals, people, and the planet. This isn't just business, it's our responsibility.
          </p>
        </div>
      </div>
    </div>
  );
}
