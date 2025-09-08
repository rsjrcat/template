import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'https://bms-2-te1h.onrender.com';

// Create axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors and network issues
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints based on backend routes
export const authAPI = {
  login: (credentials) => api.post('/admin/login', credentials),
  register: (userData) => api.post('/admin/register', userData),
  getProfile: () => api.get('/admin/profile'),
};

export const coursesAPI = {
  getAllCourses: () => api.get('/courses'),
  getCourseByCode: (courseCode) => api.get(`/courses/${courseCode}`),
  createCourse: (courseData) => api.post('/courses', courseData),
  updateCourse: (courseCode, courseData) => api.put(`/courses/${courseCode}`, courseData),
  deleteCourse: (courseCode) => api.delete(`/courses/${courseCode}`),
  uploadImage: (formData) => api.post('/courses/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const testimonialsAPI = {
  getAllTestimonials: () => api.get('/testimonials'),
  createTestimonial: (testimonialData) => api.post('/testimonials', testimonialData),
  updateTestimonial: (id, testimonialData) => api.put(`/testimonials/${id}`, testimonialData),
  deleteTestimonial: (id) => api.delete(`/testimonials/${id}`),
};

export const contactAPI = {
  sendMessage: (messageData) => api.post('/contact', messageData),
};

// Health check endpoint
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;