import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { testimonialsAPI } from '../../utils/api';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../common/LoadingSpinner';

const TestimonialsSection = () => {
  const { data: testimonials, loading, error } = useApi(() => testimonialsAPI.getAllTestimonials());
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    if (testimonials && testimonials.length > 0) {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevTestimonial = () => {
    if (testimonials && testimonials.length > 0) {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    }
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

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
          </div>
          <LoadingSpinner size="lg" text="Loading testimonials..." className="py-20" />
        </div>
      </section>
    );
  }

  if (error || !testimonials || testimonials.length === 0) {
    // Fallback testimonials if API fails
    const fallbackTestimonials = [
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
    ];

    const displayTestimonials = testimonials || fallbackTestimonials;
    const currentTestimonial = displayTestimonials[currentIndex] || displayTestimonials[0];

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
                  "{currentTestimonial?.text}"
                </blockquote>
                
                <div className="flex justify-center mb-4">
                  {renderStars(currentTestimonial?.rating || 5)}
                </div>
                
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {currentTestimonial?.name}
                  </h4>
                  <p className="text-gray-600">
                    {currentTestimonial?.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            {displayTestimonials.length > 1 && (
              <>
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
                  {displayTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Testimonial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTestimonials.slice(0, 3).map((testimonial, index) => (
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
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

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
                "{currentTestimonial?.text}"
              </blockquote>
              
              <div className="flex justify-center mb-4">
                {renderStars(currentTestimonial?.rating || 5)}
              </div>
              
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900">
                  {currentTestimonial?.name}
                </h4>
                <p className="text-gray-600">
                  {currentTestimonial?.role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          {testimonials.length > 1 && (
            <>
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
            </>
          )}
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
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
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;