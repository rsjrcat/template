import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  Star, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  Play,
  Share2,
  BookOpen,
  Award,
  User,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { coursesAPI } from '../utils/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Breadcrumb from '../components/common/Breadcrumb';
import Modal from '../components/common/Modal';
import toast from 'react-hot-toast';

const CourseDetail = () => {
  const { courseCode } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await coursesAPI.getCourseByCode(courseCode);
        setCourse(response.data);
        
        // Fetch related courses
        const allCoursesResponse = await coursesAPI.getAllCourses();
        const allCourses = allCoursesResponse.data.flatMap(category => 
          category.courses.map(course => ({
            ...course,
            category: category.category
          }))
        );
        
        // Filter related courses by category, excluding current course
        const related = allCourses
          .filter(c => c.category === response.data.category && c.courseCode !== courseCode)
          .slice(0, 3);
        setRelatedCourses(related);
      } catch (error) {
        console.error('Error fetching course:', error);
        toast.error('Course not found');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseCode]);

  const handleEnroll = () => {
    setShowEnrollModal(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.courseName,
        text: course.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Course link copied to clipboard!');
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="lg" className="py-20" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link to="/courses" className="btn-primary">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Courses', href: '/courses' },
    { label: course.courseName }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {course.courseName}
              </h1>
              
              <p className="text-xl text-blue-100 mb-6">
                {course.subtitle || course.description}
              </p>

              {/* Course Meta */}
              <div className="flex flex-wrap items-center gap-6 text-blue-100">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{course.duration || '8 weeks'}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{course.students || 0} students</span>
                </div>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(course.rating || 4.5)}
                  </div>
                  <span>{course.rating || 4.5} ({course.reviews || 0} reviews)</span>
                </div>
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>{course.instructor || 'Expert Instructor'}</span>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-xl p-6 sticky top-24">
                {/* Course Image/Video */}
                <div className="relative mb-6">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.courseName}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white" />
                    </div>
                  )}
                  
                  {course.preview && (
                    <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg hover:bg-opacity-60 transition-all">
                      <Play className="w-16 h-16 text-white" />
                    </button>
                  )}
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600">
                    {course.fees?.currency || 'Rs.'} {course.fees?.discounted || course.fees?.original || 'Free'}
                  </div>
                  {course.fees?.original && course.fees?.discounted && course.fees.original !== course.fees.discounted && (
                    <div className="text-lg text-gray-500 line-through">
                      {course.fees.currency} {course.fees.original}
                    </div>
                  )}
                </div>

                {/* Enroll Button */}
                <button
                  onClick={handleEnroll}
                  className="w-full btn-primary text-lg py-4 mb-4"
                >
                  Enroll Now
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="w-full btn-outline flex items-center justify-center"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Course
                </button>

                {/* Course Details */}
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">Next Monday</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration || '8 weeks'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">BMS Academy Campus</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Certificate:</span>
                    <span className="font-medium">Yes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                {course.details || course.description || 'This comprehensive course is designed to provide you with practical skills and knowledge that are directly applicable in the industry. You will learn from experienced professionals and work on real-world projects.'}
              </p>
            </div>

            {/* What You'll Learn */}
            {course.skills && course.skills.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.skills.map((skill, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Syllabus */}
            {course.syllabus && course.syllabus.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Syllabus</h2>
                <div className="space-y-4">
                  {course.syllabus.map((module, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Module {index + 1}: {module.module}
                          </h3>
                          {module.duration && (
                            <p className="text-sm text-gray-600 mt-1">
                              Duration: {module.duration}
                            </p>
                          )}
                        </div>
                        {expandedModule === index ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      
                      {expandedModule === index && module.topics && (
                        <div className="px-4 pb-4">
                          <ul className="space-y-2">
                            {module.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-start">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-gray-700">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prerequisites */}
            {course.eligibility && course.eligibility.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Prerequisites</h2>
                <ul className="space-y-3">
                  {course.eligibility.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {course.benefits && course.benefits.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <Award className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Instructor */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Instructor</h3>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {course.instructor || 'Expert Instructor'}
                  </h4>
                  <p className="text-sm text-gray-600">Senior Industry Professional</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Learn from industry experts with years of practical experience and proven track records.
              </p>
            </div>

            {/* Features */}
            {course.features && course.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Features</h3>
                <ul className="space-y-3">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Certificate */}
            {course.certificate && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate</h3>
                {course.certificate.image && (
                  <img
                    src={course.certificate.image}
                    alt="Certificate"
                    className="w-full rounded-lg mb-4"
                  />
                )}
                <p className="text-sm text-gray-700 mb-4">
                  Earn a recognized certificate upon successful completion of the course.
                </p>
                {course.certificate.criteria && course.certificate.criteria.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Certification Criteria:</h4>
                    <ul className="space-y-1">
                      {course.certificate.criteria.map((criterion, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((relatedCourse) => (
                <div
                  key={relatedCourse.courseCode}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-r from-primary-500 to-primary-600 relative">
                    {relatedCourse.image ? (
                      <img
                        src={relatedCourse.image}
                        alt={relatedCourse.courseName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-white text-lg font-semibold text-center px-4">
                          {relatedCourse.courseName}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedCourse.courseName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedCourse.description || relatedCourse.subtitle}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-blue-600">
                        {relatedCourse.fees?.currency || 'Rs.'} {relatedCourse.fees?.discounted || relatedCourse.fees?.original || 'Free'}
                      </div>
                      <Link
                        to={`/courses/${relatedCourse.courseCode}`}
                        className="btn-primary text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enrollment Modal */}
      <Modal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        title="Enroll in Course"
        size="md"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Ready to Enroll?
          </h3>
          <p className="text-gray-600 mb-6">
            Contact our admissions team to complete your enrollment for {course.courseName}.
          </p>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Course:</span>
                <span className="font-medium">{course.courseName}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{course.duration || '8 weeks'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Fee:</span>
                <span className="font-medium text-blue-600">
                  {course.fees?.currency || 'Rs.'} {course.fees?.discounted || course.fees?.original || 'Free'}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="flex-1 btn-primary"
                onClick={() => setShowEnrollModal(false)}
              >
                Contact Admissions
              </Link>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="flex-1 btn-secondary"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CourseDetail;