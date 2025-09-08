import React, { useState } from 'react';
import { Clock, Tag, Users, Star, Gift, Percent, Calendar, CheckCircle } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';

const Offers = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Offers', count: 8 },
    { id: 'discount', name: 'Discounted Courses', count: 4 },
    { id: 'bundle', name: 'Bundle Offers', count: 2 },
    { id: 'referral', name: 'Referral Bonuses', count: 1 },
    { id: 'seasonal', name: 'Seasonal Deals', count: 1 },
  ];

  const offers = [
    {
      id: 1,
      title: 'New Year Special - 50% Off All Courses',
      description: 'Start your learning journey with our biggest discount of the year. Valid on all courses.',
      originalPrice: 'Rs. 20,000',
      discountedPrice: 'Rs. 10,000',
      discount: '50%',
      category: 'seasonal',
      validUntil: '2024-01-31',
      coursesIncluded: ['Web Development', 'Data Science', 'Digital Marketing'],
      features: ['Lifetime Access', 'Certificate Included', 'Job Assistance'],
      enrolled: 245,
      maxEnrollments: 500,
      featured: true,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 2,
      title: 'Full Stack Developer Bundle',
      description: 'Complete package for aspiring full-stack developers. Includes 3 comprehensive courses.',
      originalPrice: 'Rs. 45,000',
      discountedPrice: 'Rs. 25,000',
      discount: '44%',
      category: 'bundle',
      validUntil: '2024-02-15',
      coursesIncluded: ['Frontend Development', 'Backend Development', 'Database Management'],
      features: ['3 Courses Included', '6 Months Duration', 'Industry Projects'],
      enrolled: 89,
      maxEnrollments: 150,
      featured: true,
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 3,
      title: 'Early Bird Discount - AI & ML Course',
      description: 'Get 30% off on our popular AI & Machine Learning course. Limited time offer.',
      originalPrice: 'Rs. 15,000',
      discountedPrice: 'Rs. 10,500',
      discount: '30%',
      category: 'discount',
      validUntil: '2024-01-25',
      coursesIncluded: ['Artificial Intelligence & Machine Learning'],
      features: ['Hands-on Projects', 'Industry Mentorship', 'Job Placement Support'],
      enrolled: 156,
      maxEnrollments: 200,
      featured: false,
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 4,
      title: 'Refer a Friend - Get Rs. 2,000 Credit',
      description: 'Refer your friends and earn credits for future courses. Both you and your friend benefit!',
      originalPrice: 'N/A',
      discountedPrice: 'Rs. 2,000 Credit',
      discount: 'Bonus',
      category: 'referral',
      validUntil: '2024-12-31',
      coursesIncluded: ['Any Course'],
      features: ['Instant Credit', 'No Limit on Referrals', 'Stackable with Other Offers'],
      enrolled: 78,
      maxEnrollments: 1000,
      featured: false,
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 5,
      title: 'Student Discount - 25% Off',
      description: 'Special discount for students. Show your student ID and save on any course.',
      originalPrice: 'Varies',
      discountedPrice: '25% Off',
      discount: '25%',
      category: 'discount',
      validUntil: '2024-06-30',
      coursesIncluded: ['All Courses'],
      features: ['Valid Student ID Required', 'Cannot combine with other offers'],
      enrolled: 234,
      maxEnrollments: 300,
      featured: false,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 6,
      title: 'Digital Marketing Mastery Bundle',
      description: 'Complete digital marketing package with SEO, Social Media, and PPC courses.',
      originalPrice: 'Rs. 30,000',
      discountedPrice: 'Rs. 18,000',
      discount: '40%',
      category: 'bundle',
      validUntil: '2024-02-28',
      coursesIncluded: ['SEO Fundamentals', 'Social Media Marketing', 'Google Ads'],
      features: ['3 Courses', 'Live Projects', 'Google Certification Prep'],
      enrolled: 67,
      maxEnrollments: 100,
      featured: false,
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  const filteredOffers = selectedCategory === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === selectedCategory);

  const breadcrumbItems = [
    { label: 'Special Offers' }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      discount: 'bg-blue-100 text-blue-800',
      bundle: 'bg-green-100 text-green-800',
      referral: 'bg-purple-100 text-purple-800',
      seasonal: 'bg-red-100 text-red-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getTimeRemaining = (validUntil) => {
    const now = new Date();
    const endDate = new Date(validUntil);
    const timeDiff = endDate - now;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysRemaining <= 0) return 'Expired';
    if (daysRemaining === 1) return '1 day left';
    return `${daysRemaining} days left`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb items={breadcrumbItems} />
          <div className="text-center mt-8">
            <h1 className="text-4xl font-bold mb-4">Special Offers & Deals</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Don't miss out on our exclusive offers! Save big on our premium courses 
              and accelerate your career growth.
            </p>
          </div>
        </div>
      </div>

      {/* Current Offers Banner */}
      <div className="bg-yellow-400 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center text-center">
            <Gift className="w-6 h-6 mr-2" />
            <span className="font-semibold">
              🎉 Limited Time: Up to 50% OFF on all courses! Offer ends January 31st
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Offer Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary-100 text-primary-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-500">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-4 text-white">
                <h3 className="font-semibold mb-2">Never Miss a Deal!</h3>
                <p className="text-blue-100 text-sm mb-3">
                  Subscribe to get notified about exclusive offers
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm"
                  />
                  <button className="w-full bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-300 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {filteredOffers.length} offers available
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Sort by Discount</option>
                    <option>Sort by Expiry Date</option>
                    <option>Sort by Popularity</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredOffers.map((offer) => (
                <div
                  key={offer.id}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${
                    offer.featured ? 'ring-2 ring-yellow-400' : ''
                  }`}
                >
                  {/* Offer Image */}
                  <div className="relative h-48">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                    {offer.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                          Featured Deal
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(offer.category)}`}>
                        {offer.category.charAt(0).toUpperCase() + offer.category.slice(1)}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                      <span className="text-sm font-bold">{offer.discount} OFF</span>
                    </div>
                  </div>

                  {/* Offer Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {offer.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {offer.description}
                    </p>

                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">
                            {offer.discountedPrice}
                          </span>
                          {offer.originalPrice !== 'N/A' && offer.originalPrice !== 'Varies' && (
                            <span className="text-lg text-gray-500 line-through">
                              {offer.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-red-600 font-medium">
                            {getTimeRemaining(offer.validUntil)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Courses Included */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Courses Included:</h4>
                      <div className="flex flex-wrap gap-2">
                        {offer.coursesIncluded.map((course, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">What's Included:</h4>
                      <ul className="space-y-1">
                        {offer.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Enrollments</span>
                        <span>{offer.enrolled}/{offer.maxEnrollments}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(offer.enrolled / offer.maxEnrollments) * 100}%`
                          }}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full btn-primary py-3 text-lg font-semibold">
                      Claim This Offer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Terms & Conditions */}
            <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms & Conditions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">General Terms</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Offers are valid for a limited time only</li>
                    <li>• Discounts cannot be combined with other offers unless specified</li>
                    <li>• Prices are subject to change without notice</li>
                    <li>• Refund policy applies as per our standard terms</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Eligibility</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Valid for new enrollments only unless specified</li>
                    <li>• Student discounts require valid student ID</li>
                    <li>• Referral bonuses apply to both referrer and referee</li>
                    <li>• Bundle offers include all mentioned courses</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> For any questions about our offers or to clarify terms, 
                  please contact our admissions team at{' '}
                  <a href="mailto:offers@bmsacademy.com" className="text-blue-600 hover:underline">
                    offers@bmsacademy.com
                  </a>{' '}
                  or call us at +1 (555) 123-4567.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;