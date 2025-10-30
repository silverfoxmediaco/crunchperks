import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ApplicationSubmitted = () => {
  const [applicationId, setApplicationId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem('applicationId');
    if (storedId) {
      setApplicationId(storedId);
    }
  }, []);

  return (
    <div className="min-h-screen bg-light-gray py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="card text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <h1 className="text-4xl font-heading text-burgundy mb-4">
            APPLICATION SUBMITTED!
          </h1>

          <p className="text-xl text-dark-gray mb-6">
            Thank you for applying to become a Crunch Perks Partner
          </p>

          {/* Application ID Display */}
          {applicationId && (
            <div className="bg-orange/10 border-2 border-orange rounded-brand p-4 mb-6 inline-block">
              <p className="text-sm text-dark-gray mb-1">Your Application ID</p>
              <p className="text-2xl font-heading text-orange tracking-wider">
                {applicationId}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Please save this ID for your records
              </p>
            </div>
          )}

          <div className="bg-light-gray rounded-brand p-6 mb-6">
            <h2 className="font-heading text-2xl text-burgundy mb-4">
              WHAT HAPPENS NEXT?
            </h2>

            <div className="text-left space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold mr-3">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-dark-gray mb-1">Review Process</h3>
                  <p className="text-sm text-gray-600">
                    Our team will review your application within 24-48 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold mr-3">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-dark-gray mb-1">Approval Notification</h3>
                  <p className="text-sm text-gray-600">
                    You'll receive an email with your approval status and next steps
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold mr-3">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-dark-gray mb-1">Account Activation</h3>
                  <p className="text-sm text-gray-600">
                    Once approved, you'll get access to create your first ad campaign
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold mr-3">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-dark-gray mb-1">Start Advertising</h3>
                  <p className="text-sm text-gray-600">
                    Launch your TV ads and start reaching Crunch members immediately
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Already Approved CTA */}
          <div className="bg-green-50 border-2 border-green-500 rounded-brand p-6 mb-6">
            <div className="text-center">
              <h3 className="text-xl font-heading text-green-700 mb-2">
                ALREADY APPROVED?
              </h3>
              <p className="text-dark-gray mb-4">
                If your application has been approved, you can create your partner account and start advertising immediately!
              </p>
              <Link
                to="/partner/create-account"
                className="btn-cta inline-block"
              >
                Create Partner Account
              </Link>
              <p className="text-xs text-gray-600 mt-3">
                You'll need your Application ID to create your account
              </p>
            </div>
          </div>

          <div className="bg-burgundy/10 border border-burgundy rounded-brand p-4 mb-6">
            <p className="text-sm text-dark-gray">
              <strong>Important:</strong> We'll send confirmation and updates to the email address you provided.
              Please check your spam folder if you don't see our email within 48 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary">
              Return Home
            </Link>
            <a href="mailto:support@crunchperks.com" className="btn-secondary">
              Contact Support
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-300">
            <p className="text-sm text-gray-600">
              Questions? Call us at <strong>1-800-CRUNCH-1</strong> or email{' '}
              <a href="mailto:support@crunchperks.com" className="text-burgundy underline">
                support@crunchperks.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSubmitted;
