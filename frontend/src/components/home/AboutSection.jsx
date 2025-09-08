import React from 'react';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide world-class education and practical skills that empower students to achieve their career goals.',
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of real-world experience and proven track records.',
    },
    {
      icon: Award,
      title: 'Certified Programs',
      description: 'Earn recognized certificates that validate your skills and enhance your professional credibility.',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Our comprehensive programs are designed to accelerate your career advancement and success.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About BMS Academy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            For over a decade, BMS Academy has been at the forefront of professional education, 
            transforming lives through quality offline courses and hands-on learning experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Empowering Students Since 2010
            </h3>
            <p className="text-gray-600 mb-6">
              BMS Academy was founded with a simple yet powerful vision: to bridge the gap between 
              academic learning and industry requirements. We believe in the power of offline, 
              face-to-face education that fosters real connections and deep understanding.
            </p>
            <p className="text-gray-600 mb-8">
              Our state-of-the-art facilities, experienced faculty, and industry-aligned curriculum 
              ensure that our students are not just job-ready, but career-ready. We've successfully 
              placed thousands of students in leading companies across various industries.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-600">10+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-600">Placement Rate</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="BMS Academy classroom"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-blue-600 rounded-full mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Team Highlight */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Meet Our Leadership Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Johnson',
                role: 'Founder & CEO',
                image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
              },
              {
                name: 'Prof. Michael Chen',
                role: 'Academic Director',
                image: 'https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=400',
              },
              {
                name: 'Ms. Emily Rodriguez',
                role: 'Head of Student Affairs',
                image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;