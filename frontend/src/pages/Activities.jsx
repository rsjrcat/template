import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Filter, Plus } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';

const Activities = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('upcoming');

  const categories = [
    { id: 'all', name: 'All Activities', count: 12 },
    { id: 'workshop', name: 'Workshops', count: 5 },
    { id: 'seminar', name: 'Seminars', count: 3 },
    { id: 'community', name: 'Community Events', count: 2 },
    { id: 'contest', name: 'Contests', count: 2 },
  ];

  const upcomingActivities = [
    {
      id: 1,
      title: 'Web Development Workshop',
      description: 'Learn modern web development techniques with React and Node.js',
      date: '2024-01-20',
      time: '10:00 AM - 4:00 PM',
      location: 'Main Campus - Lab A',
      category: 'workshop',
      participants: 25,
      maxParticipants: 30,
      instructor: 'John Doe',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 'Free',
      featured: true,
    },
    {
      id: 2,
      title: 'AI & Machine Learning Seminar',
      description: 'Explore the latest trends in artificial intelligence and machine learning',
      date: '2024-01-25',
      time: '2:00 PM - 5:00 PM',
      location: 'Auditorium B',
      category: 'seminar',
      participants: 45,
      maxParticipants: 100,
      instructor: 'Dr. Sarah Johnson',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 'Rs. 500',
      featured: false,
    },
    {
      id: 3,
      title: 'Student Networking Event',
      description: 'Connect with fellow students and industry professionals',
      date: '2024-01-30',
      time: '6:00 PM - 9:00 PM',
      location: 'Campus Cafeteria',
      category: 'community',
      participants: 80,
      maxParticipants: 150,
      instructor: 'BMS Academy Team',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 'Free',
      featured: false,
    },
    {
      id: 4,
      title: 'Coding Competition 2024',
      description: 'Test your programming skills in our annual coding contest',
      date: '2024-02-05',
      time: '9:00 AM - 6:00 PM',
      location: 'Computer Lab Complex',
      category: 'contest',
      participants: 35,
      maxParticipants: 50,
      instructor: 'Contest Committee',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 'Rs. 200',
      featured: true,
    },
  ];

  const pastActivities = [
    {
      id: 5,
      title: 'Digital Marketing Workshop',
      description: 'Comprehensive workshop on modern digital marketing strategies',
      date: '2024-01-10',
      time: '10:00 AM - 4:00 PM',
      location: 'Main Campus - Room 201',
      category: 'workshop',
      participants: 28,
      maxParticipants: 30,
      instructor: 'Marketing Expert',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 'Rs. 1000',
      featured: false,
    },
    {
      id: 6,
      title: 'Career Guidance Seminar',
      description: 'Expert advice on career planning and job search strategies',
      date: '2024-01-05',
      time: '2:00 PM - 5:00 PM',
      location: 'Auditorium A',
      category: 'seminar',
      participants: 95,
      maxParticipants: 100,
      instructor: 'Career Counselor',
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 'Free',
      featured: false,
    },
  ];

  const activities = viewMode === 'upcoming' ? upcomingActivities : pastActivities;
  const filteredActivities = selectedCategory === 'all' 
    ? activities 
    : activities.filter(activity => activity.category === selectedCategory);

  const breadcrumbItems = [
    { label: 'Activities' }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      workshop: 'bg-blue-100 text-blue-800',
      seminar: 'bg-green-100 text-green-800',
      community: 'bg-purple-100 text-purple-800',
      contest: 'bg-red-100 text-red-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Activities & Events</h1>
              <p className="text-lg text-gray-600">
                Join our workshops, seminars, and community events to enhance your learning experience
              </p>
            </div>
            <button className="mt-4 md:mt-0 btn-primary flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Suggest Activity
            </button>
          </div>
        </div>
      </div>

      {/* Announcements Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">🎉 Special Announcement</h2>
              <p className="text-blue-100">
                Registration is now open for our Annual Tech Conference 2024! 
                Early bird discount available until January 31st.
              </p>
            </div>
            <button className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              {/* View Toggle */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  View Activities
                </label>
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                  <button
                    onClick={() => setViewMode('upcoming')}
                    className={`flex-1 px-4 py-2 text-sm font-medium ${
                      viewMode === 'upcoming'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setViewMode('past')}
                    className={`flex-1 px-4 py-2 text-sm font-medium ${
                      viewMode === 'past'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Past Events
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories
                </label>
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

              {/* Volunteer Signup */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                <h3 className="font-semibold mb-2">Become a Volunteer</h3>
                <p className="text-green-100 text-sm mb-3">
                  Help organize events and gain valuable experience
                </p>
                <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {filteredActivities.length} activities found
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Sort by Date</option>
                    <option>Sort by Popularity</option>
                    <option>Sort by Price</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Activities Grid */}
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-600">Try adjusting your filters or check back later for new events</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${
                      activity.featured ? 'ring-2 ring-yellow-400' : ''
                    }`}
                  >
                    {/* Activity Image */}
                    <div className="relative h-48">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover"
                      />
                      {activity.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(activity.category)}`}>
                          {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Activity Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {activity.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {activity.description}
                      </p>

                      {/* Activity Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{new Date(activity.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{activity.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{activity.participants}/{activity.maxParticipants} participants</span>
                        </div>
                      </div>

                      {/* Instructor */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Instructor</p>
                          <p className="font-medium text-gray-900">{activity.instructor}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="font-bold text-blue-600">{activity.price}</p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${(activity.participants / activity.maxParticipants) * 100}%`
                            }}
                          />
                        </div>
                        <button
                          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                            viewMode === 'upcoming'
                              ? 'btn-primary'
                              : 'bg-gray-100 text-gray-600 cursor-not-allowed'
                          }`}
                          disabled={viewMode === 'past'}
                        >
                          {viewMode === 'upcoming' ? 'Register' : 'Completed'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredActivities.length > 0 && (
              <div className="text-center mt-8">
                <button className="btn-outline px-8 py-3">
                  Load More Activities
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;