import React from 'react';
import { 
  Users, 
  Award, 
  BookOpen, 
  Clock, 
  MapPin, 
  TrendingUp,
  CheckCircle,
  Lightbulb
} from 'lucide-react';

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with 10+ years of real-world experience.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: MapPin,
      title: 'Offline Learning',
      description: 'Face-to-face interaction for better understanding and networking opportunities.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Award,
      title: 'Industry Certifications',
      description: 'Earn recognized certificates that boost your professional credibility.',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: BookOpen,
      title: 'Practical Learning',
      description: 'Hands-on projects and real-world case studies for practical experience.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Clock,
      title: 'Flexible Schedules',
      description: 'Weekend and evening batches to fit your busy lifestyle.',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: TrendingUp,
      title: 'Career Support',
      description: '95% placement rate with dedicated career counseling and job assistance.',
      color: 'bg-indigo-100 text-indigo-600',
    },
  ];

  const features = [
    'Small batch sizes for personalized attention',
    'State-of-the-art labs and equipment',
    'Industry-relevant curriculum',
    'Regular assessments and feedback',
    'Alumni network of 10,000+ professionals',
    'Lifetime access to course materials',
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose BMS Academy?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing the best offline learning experience with 
            industry-focused curriculum and expert guidance.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${benefit.color} rounded-full mb-6`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center mb-6">
                <Lightbulb className="w-8 h-8 text-yellow-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">
                  What Makes Us Different
                </h3>
              </div>
              <p className="text-gray-600 mb-8">
                At BMS Academy, we believe in the power of offline education. Our unique approach 
                combines traditional classroom learning with modern teaching methodologies to 
                create an unparalleled learning experience.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students in classroom"
                className="rounded-xl shadow-lg"
              />
              
              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm opacity-90">Happy Students</div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-gray-900 p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm">Job Placement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Transform Your Career?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful graduates who have advanced their careers with BMS Academy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-300">
                Enroll Now
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-colors duration-300">
                Schedule a Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;