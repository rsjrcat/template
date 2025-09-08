import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import FeaturedCourses from '../components/home/FeaturedCourses';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PartnersSection from '../components/home/PartnersSection';
import NewsletterSection from '../components/home/NewsletterSection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <TestimonialsSection />
      <PartnersSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;