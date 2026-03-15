import { useState } from 'react';
import { Shield, Droplet, Sparkles, ClipboardCheck, Award, Heart, Star, Milk, Leaf, Handshake } from 'lucide-react';

export default function Home() {
  const [reviews, setReviews] = useState([
    { id: 1, name: "Rahul Sharma", rating: 5, comment: "The milk quality is outstanding. Reminds me of the pure milk we used to get in villages.", date: "2 days ago" },
    { id: 2, name: "Priya Singh", rating: 4, comment: "Very happy with the daily delivery and the paneer is incredibly soft. Highly recommend!", date: "1 week ago" },
    { id: 3, name: "Amit Patel", rating: 5, comment: "I've visited their farm. The hygiene standards are impeccable. Trust them completely.", date: "2 weeks ago" }
  ]);

  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setReviews([{
        id: Date.now(),
        ...newReview,
        date: "Just now"
      }, ...reviews]);
      setNewReview({ name: '', rating: 5, comment: '' });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="bg-green-100 text-green-800 px-6 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
              Tested fresh every morning!
            </span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Fresh milk from our farm
            <br />
            <span className="text-green-600">to your home</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Healthy cattle produce better milk. That's why we provide high-nutrition animal feed for our cows, and pure, safe milk for your family.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-100 hover:border-green-300 text-center md:text-left">
            <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Happy, Healthy Cows</h3>
            <p className="text-gray-600 leading-relaxed">
              We care for our cattle like family. No antibiotics, just natural grazing and lots of love.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-100 hover:border-green-300 text-center md:text-left">
            <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
              <Droplet className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Pure Goodness</h3>
            <p className="text-gray-600 leading-relaxed">
              We don't mess with nature. Zero hormones and no artificial boosters in our milk.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-100 hover:border-green-300 text-center md:text-left">
            <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
              <Sparkles className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Nothing Added</h3>
            <p className="text-gray-600 leading-relaxed">
              Straight from the udder to your bottle. We test every batch so you can trust every drop.
            </p>
          </div>
        </div>

        {/* Social Proof Numbers Section */}
        <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-green-100 mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-transparent md:divide-gray-100">
            <div className="text-center md:px-4">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-4xl font-extrabold text-gray-900 mb-2">50+</h4>
              <p className="text-green-700 font-semibold tracking-wide">Healthy Cattle</p>
            </div>
            <div className="text-center md:px-4">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                <Milk className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-4xl font-extrabold text-gray-900 mb-2">200+</h4>
              <p className="text-green-700 font-semibold tracking-wide">Litres Milk Daily</p>
            </div>
            <div className="text-center md:px-4">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-4xl font-extrabold text-gray-900 mb-2">10+</h4>
              <p className="text-green-700 font-semibold tracking-wide">Feed Products</p>
            </div>
            <div className="text-center md:px-4">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                <Handshake className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-4xl font-extrabold text-gray-900 mb-2">100+</h4>
              <p className="text-green-700 font-semibold tracking-wide">Happy Farmers</p>
            </div>
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

        {/* Customer Reviews Section */}
        <div className="mt-32 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real stories from our extended family.</p>
            <div className="h-1 w-24 bg-green-600 mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Display Reviews */}
            <div className="lg:col-span-2 space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">"{review.comment}"</p>
                </div>
              ))}
            </div>

            {/* Leave a Review Form */}
            <div className="lg:col-span-1">
              <div className="bg-green-50 rounded-3xl p-8 border border-green-100 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Leave a Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: star})}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star className={`h-8 w-8 ${star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Experience</label>
                    <textarea 
                      required
                      rows={4}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us what you loved..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
