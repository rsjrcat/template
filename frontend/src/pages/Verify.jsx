import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Shield, 
  Search, 
  CheckCircle, 
  XCircle, 
  Award,
  Calendar,
  User,
  BookOpen,
  Download,
  AlertCircle
} from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import toast from 'react-hot-toast';

const schema = yup.object({
  certificateId: yup.string().required('Certificate ID is required'),
});

const Verify = () => {
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setVerificationResult(null);

    // Simulate API call
    setTimeout(() => {
      // Mock verification logic
      const isValid = data.certificateId.toLowerCase().includes('bms');
      
      if (isValid) {
        setVerificationResult({
          valid: true,
          certificate: {
            id: data.certificateId,
            studentName: 'John Doe',
            courseName: 'Full Stack Web Development',
            issueDate: '2024-01-15',
            completionDate: '2024-01-10',
            duration: '6 months',
            grade: 'A+',
            instructor: 'Jane Smith',
            skills: ['React', 'Node.js', 'MongoDB', 'Express.js'],
          }
        });
        toast.success('Certificate verified successfully!');
      } else {
        setVerificationResult({
          valid: false,
          message: 'Certificate not found or invalid. Please check the certificate ID and try again.'
        });
        toast.error('Certificate verification failed');
      }
      
      setLoading(false);
    }, 2000);
  };

  const breadcrumbItems = [
    { label: 'Verify Certificate' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Certificate Verification</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Verify the authenticity of BMS Academy certificates. Enter the certificate ID 
              to check if a certificate is genuine and view its details.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Verification Form */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Enter Certificate Details
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <div className="mb-6">
              <label htmlFor="certificateId" className="form-label">
                Certificate ID *
              </label>
              <div className="relative">
                <input
                  {...register('certificateId')}
                  type="text"
                  className={`form-input pl-10 ${errors.certificateId ? 'border-red-500' : ''}`}
                  placeholder="Enter certificate ID (e.g., BMS-2024-001234)"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              {errors.certificateId && (
                <p className="mt-1 text-sm text-red-600">{errors.certificateId.message}</p>
              )}
              <p className="mt-2 text-sm text-gray-600">
                The certificate ID can be found on your certificate document
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner mr-2"></div>
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Verify Certificate
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Verification Result */}
        {verificationResult && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            {verificationResult.valid ? (
              <div>
                {/* Success Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">
                    Certificate Verified ✓
                  </h3>
                  <p className="text-gray-600">
                    This certificate is authentic and issued by BMS Academy
                  </p>
                </div>

                {/* Certificate Details */}
                <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Student Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <User className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Student Name</p>
                            <p className="font-medium text-gray-900">
                              {verificationResult.certificate.studentName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Award className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Certificate ID</p>
                            <p className="font-medium text-gray-900">
                              {verificationResult.certificate.id}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Course Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Course Name</p>
                            <p className="font-medium text-gray-900">
                              {verificationResult.certificate.courseName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Issue Date</p>
                            <p className="font-medium text-gray-900">
                              {new Date(verificationResult.certificate.issueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-green-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-medium text-gray-900">
                          {verificationResult.certificate.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Grade</p>
                        <p className="font-medium text-gray-900">
                          {verificationResult.certificate.grade}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Instructor</p>
                        <p className="font-medium text-gray-900">
                          {verificationResult.certificate.instructor}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-6 pt-6 border-t border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Skills Acquired</h4>
                    <div className="flex flex-wrap gap-2">
                      {verificationResult.certificate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-6 border-t border-green-200 flex flex-col sm:flex-row gap-3">
                    <button className="btn-primary flex items-center justify-center">
                      <Download className="w-5 h-5 mr-2" />
                      Download Verification Report
                    </button>
                    <button 
                      onClick={() => {
                        setVerificationResult(null);
                        reset();
                      }}
                      className="btn-outline flex items-center justify-center"
                    >
                      Verify Another Certificate
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {/* Error Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-600 mb-2">
                    Certificate Not Found
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    {verificationResult.message}
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">
                        Possible Reasons:
                      </h4>
                      <ul className="text-red-700 text-sm space-y-1">
                        <li>• The certificate ID was entered incorrectly</li>
                        <li>• The certificate may be fraudulent</li>
                        <li>• The certificate is not issued by BMS Academy</li>
                        <li>• There may be a system error</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    onClick={() => {
                      setVerificationResult(null);
                      reset();
                    }}
                    className="btn-primary"
                  >
                    Try Again
                  </button>
                  <a href="/contact" className="btn-outline">
                    Contact Support
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* How to Verify Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Verify a Certificate</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Locate Certificate ID</h3>
              <p className="text-gray-600 text-sm">
                Find the unique certificate ID on the certificate document. 
                It usually starts with "BMS-" followed by year and numbers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Enter Certificate ID</h3>
              <p className="text-gray-600 text-sm">
                Type the certificate ID exactly as it appears on the certificate 
                in the verification form above.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">View Results</h3>
              <p className="text-gray-600 text-sm">
                Get instant verification results with complete certificate details 
                and download a verification report if needed.
              </p>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help with Verification?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            If you're having trouble verifying a certificate or have questions about 
            the verification process, our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:verify@bmsacademy.com"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Email: verify@bmsacademy.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;