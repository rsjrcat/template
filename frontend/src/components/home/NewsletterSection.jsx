import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setLoading(false);
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stay Updated with BMS Academy
          </h2>
          
          <p className="text-xl text-blue-100 mb-8">
            Get the latest updates on new courses, special offers, industry insights, 
            and success stories delivered straight to your inbox.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="spinner mr-2"></div>
                      Subscribing...
                    </div>
                  ) : (
                    'Subscribe Now'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="max-w-md mx-auto bg-white bg-opacity-20 rounded-lg p-6">
              <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Thank You for Subscribing!
              </h3>
              <p className="text-blue-100">
                You'll receive our latest updates and exclusive offers soon.
              </p>
            </div>
          )}

          <div className="mt-8 text-sm text-blue-100">
            <p>
              Join 25,000+ students and professionals who trust BMS Academy for their career growth.
            </p>
            <p className="mt-2">
              No spam, unsubscribe at any time. Read our{' '}
              <a href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-2">Course Updates</h4>
              <p className="text-blue-100 text-sm">
                Be the first to know about new courses and curriculum updates
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-2">Exclusive Offers</h4>
              <p className="text-blue-100 text-sm">
                Get access to special discounts and early bird pricing
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-2">Industry Insights</h4>
              <p className="text-blue-100 text-sm">
                Receive valuable tips and trends from industry experts
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;