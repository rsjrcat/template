import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle
} from 'lucide-react';
import { contactAPI } from '../utils/api';
import Breadcrumb from '../components/common/Breadcrumb';
import toast from 'react-hot-toast';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string(),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
  inquiryType: yup.string().required('Please select inquiry type'),
});

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await contactAPI.sendMessage(data);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Contact Us' }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Education Street', 'Learning City, LC 12345', 'United States'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543', 'Mon-Fri: 9AM-6PM'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@bmsacademy.com', 'admissions@bmsacademy.com', 'support@bmsacademy.com'],
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed'],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'text-blue-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Get in touch with us for any questions, support, or admissions inquiries
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                We're here to help you with any questions about our courses, admissions, 
                or general inquiries. Reach out to us through any of the following channels.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className="p-3 bg-primary-100 rounded-lg mr-4">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        className={`p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors ${social.color}`}
                        aria-label={social.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Live Chat */}
              <div className="mt-8 p-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg text-white">
                <div className="flex items-center mb-2">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <h3 className="font-semibold">Need Immediate Help?</h3>
                </div>
                <p className="text-blue-100 text-sm mb-3">
                  Chat with our support team for instant assistance
                </p>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                  Start Live Chat
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Full Name *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Phone and Inquiry Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="form-input"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="form-label">
                      Inquiry Type *
                    </label>
                    <select
                      {...register('inquiryType')}
                      className={`form-input ${errors.inquiryType ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select inquiry type</option>
                      <option value="general">General Information</option>
                      <option value="admissions">Admissions</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                    {errors.inquiryType && (
                      <p className="mt-1 text-sm text-red-600">{errors.inquiryType.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="form-label">
                    Subject *
                  </label>
                  <input
                    {...register('subject')}
                    type="text"
                    className={`form-input ${errors.subject ? 'border-red-500' : ''}`}
                    placeholder="Enter the subject of your message"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    className={`form-input ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Enter your message here..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full md:w-auto px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="spinner mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Us</h2>
              <p className="text-gray-600">
                Visit our campus to experience our state-of-the-art facilities and meet our team
              </p>
            </div>
            
            {/* Map Placeholder */}
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Interactive Map</h3>
                <p className="text-gray-500">
                  123 Education Street, Learning City, LC 12345
                </p>
                <button className="mt-4 btn-primary">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What are your admission requirements?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Our admission requirements vary by course. Generally, we require a high school diploma 
                  or equivalent, and some courses may have specific prerequisites.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do you offer financial aid?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Yes, we offer various financial aid options including scholarships, payment plans, 
                  and student loans. Contact our admissions team for more information.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What is your refund policy?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  We offer a full refund within the first week of classes. After that, 
                  refunds are prorated based on the remaining course duration.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Are certificates recognized by employers?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Yes, our certificates are widely recognized by employers and industry partners. 
                  We maintain strong relationships with leading companies in various sectors.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Can't find what you're looking for?
              </p>
              <Link to="/faq" className="btn-outline">
                View All FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;