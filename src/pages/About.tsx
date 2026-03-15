import { Globe, MapPin, Phone, Mail, PackageOpen, Beef } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            We're here to create a{' '}
            <span className="inline-flex items-center">
              <Globe className="h-12 w-12 text-green-600 mx-2" />
            </span>
          </h1>
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            where safe food is a norm, not an exception
          </h2>
          <div className="h-1 w-32 bg-green-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-green-100">
            <div className="mb-8">
              <div className="bg-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <PackageOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                At Mishra Dairy Farm, we believe that everyone deserves access to pure, safe, and nutritious food. We're committed to raising the bar for dairy quality and animal care.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Every day, we work tirelessly to ensure that our milk and milk products meet the highest standards of purity and safety. Our rigorous testing protocols and commitment to transparency set us apart.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-10 shadow-xl text-white">
            <h3 className="text-3xl font-bold mb-6">Meet Our Owner</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-2 opacity-90">Suneel Mishra</h4>
                <p className="text-lg opacity-80">Founder & Owner</p>
              </div>
              <div className="h-px bg-white opacity-20"></div>
              <p className="text-lg leading-relaxed opacity-90">
                With a vision to transform the dairy industry and a passion for sustainable farming, Suneel Mishra established Mishra Dairy Farm to bring safe, pure milk to every household.
              </p>
              <p className="text-lg leading-relaxed opacity-90">
                His commitment to quality, transparency, and animal welfare has made our farm a trusted name in the community.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-green-100 mb-20">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-10 py-6">
            <h3 className="text-3xl font-bold text-white">Our Products</h3>
          </div>
          <div className="p-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-xl p-3 mt-1">
                  <PackageOpen className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">Milk & Milk Products</h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Premium quality milk, fresh daily. We also offer a range of dairy products including curd, paneer, ghee, and more. Every product undergoes rigorous quality testing.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 rounded-xl p-3 mt-1">
                  <Beef className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">Animal Feed</h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-semibold text-orange-600">
                      "To feed your animals as if they were our own."
                    </span>
                    <br />
                    Premium quality animal feed formulated for optimal nutrition and health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-10 py-6 bg-green-600">
            <h3 className="text-3xl font-bold text-white">Get in Touch</h3>
          </div>
          <div className="p-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 rounded-lg p-3 mt-1">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Address</h4>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Chauka Mod, Janghai<br />
                      Vari Road<br />
                      Prayagraj, Uttar Pradesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 rounded-lg p-3 mt-1">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Phone</h4>
                    <p className="text-gray-300 text-lg">8435704159</p>
                    <p className="text-gray-300 text-lg">9322423649</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 rounded-lg p-3 mt-1">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Email</h4>
                    <p className="text-gray-300 text-lg">random@gmail.com</p>
                  </div>
                </div>

                <div className="bg-green-600 bg-opacity-10 rounded-2xl p-6 border border-green-600 border-opacity-30">
                  <p className="text-white text-lg leading-relaxed">
                    Have questions about our products or want to schedule a farm visit? We'd love to hear from you!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-green-600 to-green-700 rounded-full px-10 py-4 shadow-lg">
            <p className="text-white font-bold text-xl">
              Mishra Dairy Farm - Pure. Safe. Tested.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
