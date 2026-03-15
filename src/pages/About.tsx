import { Globe, PackageOpen, Beef, CheckCircle } from 'lucide-react';

export default function About() {
  return (
    <div>
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

        <div className="bg-[#FAF8F5] rounded-[3rem] p-10 lg:p-16 shadow-xl mb-20 relative overflow-hidden flex flex-col lg:flex-row gap-8 lg:gap-16 items-center border border-gray-100">
          
          {/* Decorative background circle on the left */}
          <div className="absolute top-[-10%] bottom-[-10%] left-0 w-3/4 lg:w-1/2 bg-[#F3EFE9] rounded-r-full -translate-x-1/4 pointer-events-none hidden md:block"></div>

          {/* Left Side Feature */}
          <div className="lg:w-1/3 flex flex-col items-center justify-center text-center relative z-10 w-full mb-10 lg:mb-0">
            <div className="relative w-72 h-72 mb-8 flex justify-center items-center">
              {/* Abstract shape representing the yellow/blue hugging characters */}
              <div className="absolute inset-4 bg-[#FFDB29] rounded-tl-[40%] rounded-tr-[55%] rounded-br-[45%] rounded-bl-[60%] shadow-sm transition-transform hover:scale-105 duration-500">
                 {/* Face markings for yellow blob */}
                 <div className="flex space-x-8 absolute top-[35%] left-1/2 -translate-x-1/2 opacity-70">
                   <div className="w-5 h-2 border-b-[3px] border-black rounded-full rotate-[15deg] opacity-80"></div>
                   <div className="w-5 h-2 border-b-[3px] border-black rounded-full -rotate-[15deg] opacity-80"></div>
                 </div>
                 {/* Blue baby blob */}
                 <div className="bg-[#BCE3DD] w-36 h-36 rounded-tl-[55%] rounded-tr-[45%] rounded-br-[50%] rounded-bl-[45%] absolute bottom-4 left-1/2 transform -translate-x-1/2 shadow-inner flex items-center justify-center">
                    {/* Face markings for blue blob */}
                    <div className="flex space-x-6 absolute top-12 opacity-60">
                      <div className="w-3 h-1 border-b-2 border-black rounded-full -rotate-12"></div>
                      <div className="w-3 h-1 border-b-2 border-black rounded-full rotate-12"></div>
                    </div>
                 </div>
                 {/* Cute little yellow hands wrapping around blue */}
                 <div className="absolute bg-[#FFDB29] w-8 h-4 rounded-full bottom-20 right-10 rotate-45 shadow-sm"></div>
                 <div className="absolute bg-[#FFDB29] w-8 h-4 rounded-full bottom-10 left-10 -rotate-45 shadow-sm"></div>
              </div>
            </div>
            <h3 className="text-6xl font-extrabold text-gray-900 tracking-tight">Our Story</h3>
          </div>

          {/* Right Side Timeline */}
          <div className="lg:w-2/3 relative w-full z-10 md:py-8">
            {/* Vertical line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gray-300 transform -translate-x-1/2 opacity-50 pointer-events-none"></div>

            <div className="space-y-12 md:space-y-8 lg:space-y-12">
              {[
                {
                  number: "1",
                  color: "bg-[#FFE8A1] text-yellow-900 border-[#FFDB29]",
                  text: "It began with a simple belief — milk should be pure, and farmers should be trusted."
                },
                {
                  number: "2",
                  color: "bg-[#BCE3DD] text-teal-900 border-[#8BC3BC]",
                  text: "Like many families, we once struggled to find fresh and honest dairy products."
                },
                {
                  number: "3",
                  color: "bg-[#C4E5B8] text-green-900 border-[#A3D193]",
                  text: "That moment made us realize something important: if pure milk was hard to find, we had to create it ourselves."
                },
                {
                  number: "4",
                  color: "bg-[#EBDCC5] text-amber-900 border-[#D4C3A6]",
                  text: "With a few cattle, hard work, and a commitment to our animals, we started our dairy farm."
                },
                {
                  number: "5",
                  color: "bg-[#FFB5A7] text-red-900 border-[#E59A8D]",
                  text: "Soon we understood that healthy cattle need the right nutrition, which led us to provide quality animal feed for farmers as well."
                },
                {
                  number: "6",
                  color: "bg-[#D6A2E8] text-purple-900 border-[#BC85D1]",
                  text: "Today, our farm is more than a business. It is a promise — to care for our animals, support farmers, and deliver milk that families can truly trust. Every drop carries that promise. 🐄🌾"
                }
              ].map((step, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div key={index} className="flex flex-col md:flex-row items-center justify-center w-full relative z-10 group">
                    
                    {/* Left half text */}
                    <div className={`w-full md:w-1/2 order-2 md:order-1 ${isLeft ? 'md:pr-10 md:text-right text-center' : 'hidden md:block'}`}>
                      {isLeft && (
                        <p className="text-gray-800 font-medium leading-relaxed text-[17px] md:text-lg">
                          {step.text}
                        </p>
                      )}
                    </div>

                    {/* Center Circle */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 mx-auto md:mx-0 shadow-sm border-2 ${step.color} order-1 md:order-2 mb-4 md:mb-0 group-hover:scale-110 transition-transform duration-300`}>
                      {step.number}
                    </div>

                    {/* Right half text */}
                    <div className={`w-full md:w-1/2 order-3 md:order-3 ${!isLeft ? 'md:pl-10 md:text-left text-center' : 'hidden md:block'}`}>
                      {!isLeft && (
                        <p className="text-gray-800 font-medium leading-relaxed text-[17px] md:text-lg">
                          {step.text}
                        </p>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
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

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-xl overflow-hidden border-2 border-green-100 mb-20">
          <div className="grid lg:grid-cols-5">
            <div className="lg:col-span-2 bg-[url('https://images.pexels.com/photos/10141619/pexels-photo-10141619.jpeg?auto=compress&cs=tinysrgb&w=800')] bg-cover bg-center min-h-[400px]">
              <div className="h-full w-full bg-gradient-to-r from-green-900/80 to-green-800/80 p-12 flex flex-col justify-center">
                <h3 className="text-4xl font-bold text-white mb-6">Why Choose<br/>Our Farm?</h3>
                <p className="text-green-50 text-lg leading-relaxed opacity-90">
                  We don't just sell milk; we provide peace of mind. Here is why thousands of families and local farmers trust Mishra Dairy Farm every single day.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-3 p-12 lg:p-16 flex flex-col justify-center bg-white">
              <div className="space-y-6">
                {[
                  { title: "Fresh milk directly from farm", desc: "Straight from our udders to your chilled bottles within hours." },
                  { title: "High nutrition animal feed", desc: "Scientifically balanced feed ensuring optimal cattle health." },
                  { title: "Trusted by local farmers", desc: "A community pillar for over a decade serving regional needs." },
                  { title: "Hygienic milk production", desc: "Zero human touch and rigorous lab testing for every batch." },
                  { title: "Affordable prices", desc: "Premium quality without the premium price tag." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group p-4 rounded-2xl hover:bg-green-50 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-8 w-8 text-green-500 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
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
