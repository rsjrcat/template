import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, ArrowRight, BookOpen } from 'lucide-react';
import { coursesAPI } from '../../utils/api';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../common/LoadingSpinner';

const FeaturedCourses = () => {
  const { data: coursesData, loading, error } = useApi(() => coursesAPI.getAllCourses());

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular courses designed to help you master in-demand skills 
              and advance your career.
            </p>
          </div>
          <LoadingSpinner size="lg" text="Loading courses..." className="py-20" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600">Failed to load courses. Please try again later.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Get first 6 courses from all categories
  const allCourses = coursesData ? coursesData.flatMap(category => 
    category.courses.map(course => ({
      ...course,
      category: category.category
    }))
  ) : [];
  
  const featuredCourses = allCourses.slice(0, 6);

  if (featuredCourses.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-gray-600">No courses available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular courses designed to help you master in-demand skills 
            and advance your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCourses.map((course) => (
            <div
              key={course.courseCode}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Course Image */}
              <div className="relative h-48 bg-gradient-to-r from-primary-500 to-primary-600">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.courseName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="flex items-center justify-center h-full" style={{ display: course.image ? 'none' : 'flex' }}>
                  <BookOpen className="w-12 h-12 text-white mb-2" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    {course.category}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.courseName}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {course.description || course.subtitle || 'Learn essential skills with hands-on projects and expert guidance.'}
                </p>

                {/* Course Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{course.duration || '8 weeks'}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{course.students || 0}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>{course.rating || 4.5}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600">
                    {course.fees?.currency || 'Rs.'} {course.fees?.discounted || course.fees?.original || 'Free'}
                    {course.fees?.original && course.fees?.discounted && course.fees.original !== course.fees.discounted && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {course.fees.currency} {course.fees.original}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/courses/${course.courseCode}`}
                    className="btn-primary text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Courses Button */}
        <div className="text-center">
          <Link
            to="/courses"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            View All Courses
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;