import { Shield, Droplet, Sparkles, ClipboardCheck, Award, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="bg-green-100 text-green-800 px-6 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
              Our Milk Takes Daily Exams!
            </span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            No Additives
            <br />
            <span className="text-green-600">Truly Safe Milk</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Every batch tested. Every packet pure.
            <br />
            Check your daily milk report.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-100 hover:border-green-300">
            <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Antibiotics</h3>
            <p className="text-gray-600 leading-relaxed">
              Our cows are raised naturally without antibiotics, ensuring the purest milk for your family.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-100 hover:border-green-300">
            <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Droplet className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Hormones</h3>
            <p className="text-gray-600 leading-relaxed">
              We believe in natural farming. Our animals are never given growth hormones.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-100 hover:border-green-300">
            <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Additives</h3>
            <p className="text-gray-600 leading-relaxed">
              Pure milk, just as nature intended. Nothing added, nothing removed.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-white mb-20 shadow-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <ClipboardCheck className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-6">
              Why All The Fuss About Testing?
            </h2>
            <p className="text-2xl mb-4 font-medium">
              The simple answer is because 'We Care'
            </p>
            <div className="h-1 w-24 bg-white mx-auto my-8 opacity-50"></div>
            <p className="text-xl leading-relaxed opacity-90">
              We don't just say it, <span className="font-bold">We prove it.</span>
              <br />
              Every batch tested. Every packet pure.
              <br />
              Check your daily milk report.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Award className="h-12 w-12 text-green-600 mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Quality You Can Trust
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              At Mishra Dairy Farm, we don't compromise on quality. Our commitment to daily testing and transparent reporting ensures that every drop of milk meets the highest standards of purity and safety.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-2 mt-1">
                  <Heart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Daily Quality Checks</h4>
                  <p className="text-gray-600">Every batch undergoes rigorous testing before reaching you</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-2 mt-1">
                  <Heart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Complete Transparency</h4>
                  <p className="text-gray-600">Access your daily milk report and see the difference</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-2 mt-1">
                  <Heart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Natural & Pure</h4>
                  <p className="text-gray-600">No shortcuts, no compromises on your health</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-1">
              <div className="bg-white rounded-3xl p-8">
                <img
                  src="https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Fresh milk"
                  className="rounded-2xl w-full h-96 object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
