import axios from 'axios';

const API_BASE_URL = 'https://backend-bms-production.up.railway.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
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

export default api;