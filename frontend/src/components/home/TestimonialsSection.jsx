import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsAPI } from '../../utils/api';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialsAPI.getAllTestimonials();
        setTestimonials(response.data.slice(0, 6)); // Show first 6 testimonials
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback testimonials
        setTestimonials([
          {
            _id: '1',
            name: 'Sarah Johnson',
            role: 'Software Developer at Google',
            text: 'BMS Academy transformed my career completely. The hands-on approach and expert instructors helped me land my dream job at Google.',
            rating: 5,
          },
          {
            _id: '2',
            name: 'Michael Chen',
            role: 'Data Scientist at Microsoft',
            text: 'The practical projects and real-world case studies at BMS Academy gave me the confidence to excel in my field.',
            rating: 5,
          },
          {
            _id: '3',
            name: 'Emily Rodriguez',
            role: 'UX Designer at Apple',
            text: 'Amazing learning experience! The offline classes provided the perfect environment for networking and collaborative learning.',
            rating: 5,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our successful graduates 
            have to say about their experience at BMS Academy.
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 max-w-4xl mx-auto">
            <div className="text-center">
              <Quote className="w-12 h-12 text-primary-200 mx-auto mb-6" />
              
              <blockquote className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
                "{testimonials[currentIndex]?.text}"
              </blockquote>
              
              <div className="flex justify-center mb-4">
                {renderStars(testimonials[currentIndex]?.rating || 5)}
              </div>
              
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900">
                  {testimonials[currentIndex]?.name}
                </h4>
                <p className="text-gray-600">
                  {testimonials[currentIndex]?.role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial._id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
                <Quote className="w-6 h-6 text-primary-200" />
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-4">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonials Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Video Testimonials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="relative bg-gray-200 rounded-xl overflow-hidden aspect-video hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              >
                <img
                  src={`https://images.pexels.com/photos/376076${index}/pexels-photo-376076${index}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                  alt={`Video testimonial ${index}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-8 border-l-primary-600 border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;