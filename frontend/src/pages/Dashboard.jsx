import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  Award, 
  User, 
  Bell, 
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  Download,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { coursesAPI } from '../utils/api';
import Breadcrumb from '../components/common/Breadcrumb';

const Dashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setEnrolledCourses([
      {
        id: 1,
        name: 'Web Development Bootcamp',
        progress: 75,
        nextClass: '2024-01-15T10:00:00',
        instructor: 'John Doe',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      {
        id: 2,
        name: 'Data Science Fundamentals',
        progress: 45,
        nextClass: '2024-01-16T14:00:00',
        instructor: 'Jane Smith',
        image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
    ]);

    setUpcomingClasses([
      {
        id: 1,
        course: 'Web Development Bootcamp',
        date: '2024-01-15T10:00:00',
        duration: '2 hours',
        location: 'Room A-101',
        type: 'Lecture',
      },
      {
        id: 2,
        course: 'Data Science Fundamentals',
        date: '2024-01-16T14:00:00',
        duration: '1.5 hours',
        location: 'Lab B-205',
        type: 'Practical',
      },
    ]);

    setAchievements([
      {
        id: 1,
        title: 'First Course Completed',
        description: 'Completed your first course at BMS Academy',
        date: '2024-01-10',
        badge: 'beginner',
      },
      {
        id: 2,
        title: 'Perfect Attendance',
        description: 'Attended all classes for a month',
        date: '2024-01-05',
        badge: 'attendance',
      },
    ]);

    setNotifications([
      {
        id: 1,
        title: 'New Assignment Posted',
        message: 'Web Development Bootcamp - Assignment 5 is now available',
        time: '2 hours ago',
        type: 'assignment',
      },
      {
        id: 2,
        title: 'Class Reminder',
        message: 'Your Data Science class starts in 1 hour',
        time: '1 hour ago',
        type: 'reminder',
      },
    ]);
  }, []);

  const breadcrumbItems = [
    { label: 'Dashboard' }
  ];

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'beginner':
        return <Star className="w-6 h-6" />;
      case 'attendance':
        return <CheckCircle className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-lg text-gray-600">
            Continue your learning journey and track your progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Certificates</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Progress</p>
                <p className="text-2xl font-bold text-gray-900">60%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Courses */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                <Link to="/courses" className="text-blue-600 hover:text-primary-700 font-medium">
                  Browse More
                </Link>
              </div>

              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <img
                        src={course.image}
                        alt={course.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{course.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">Instructor: {course.instructor}</p>
                        
                        {/* Progress Bar */}
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
                        </div>
                      </div>
                      <button className="btn-primary text-sm">
                        Continue Learning
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Classes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Classes</h2>
              
              <div className="space-y-4">
                {upcomingClasses.map((class_) => (
                  <div key={class_.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{class_.course}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(class_.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(class_.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <span>{class_.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium mb-2">
                          {class_.type}
                        </span>
                        <p className="text-sm text-gray-600">{class_.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{user?.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{user?.email}</p>
                <button className="btn-outline w-full">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      {getBadgeIcon(achievement.badge)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-600 hover:text-primary-700 text-sm font-medium">
                View All Achievements
              </button>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <Bell className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="border-l-4 border-blue-500 pl-3">
                    <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-xs text-gray-600 mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-600 hover:text-primary-700 text-sm font-medium">
                View All Notifications
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download Certificates</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">Contact Support</span>
                </button>
                <Link
                  to="/courses"
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">Explore Courses</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;