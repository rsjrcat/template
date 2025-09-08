import React from 'react';

const PartnersSection = () => {
  const partners = [
    {
      name: 'Google',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    },
    {
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    },
    {
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    },
    {
      name: 'IBM',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    },
    {
      name: 'Oracle',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
    },
    {
      name: 'Salesforce',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
    },
  ];

  const certifications = [
    {
      name: 'AWS Certified',
      logo: 'https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Solutions-Architect-Associate_badge.3419559c682629072f1eb968d59dea0741772c0f.png',
    },
    {
      name: 'Google Cloud',
      logo: 'https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png',
    },
    {
      name: 'Microsoft Azure',
      logo: 'https://swimburger.net/media/ppnn3pcl/azure.png',
    },
    {
      name: 'Cisco',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partners Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Industry Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with leading companies to ensure our curriculum stays 
            current and our students get the best career opportunities.
          </p>
        </div>

        {/* Partners Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center mb-20">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 grayscale hover:grayscale-0"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Industry Certifications
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our courses prepare you for globally recognized certifications 
            that validate your skills and enhance your career prospects.
          </p>
        </div>

        {/* Certification Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center mb-16">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-300"
            >
              <img
                src={cert.logo}
                alt={cert.name}
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Partner Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Placement Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Industry Certifications</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Successful Graduates</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Join Our Success Network?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with industry leaders and take your career to the next level 
            with our comprehensive training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 text-lg">
              View All Courses
            </button>
            <button className="btn-outline px-8 py-4 text-lg">
              Schedule Campus Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;