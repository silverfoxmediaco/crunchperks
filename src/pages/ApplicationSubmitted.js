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

          {/* Auto-Approved - Create Account CTA */}
          <div className="bg-green-50 border-2 border-green-500 rounded-brand p-6 mb-6">
            <div className="text-center">
              <h3 className="text-2xl font-heading text-green-700 mb-3">
                🎉 CONGRATULATIONS! YOUR APPLICATION HAS BEEN APPROVED!
              </h3>
              <p className="text-dark-gray mb-4 text-lg">
                Your application was automatically approved for testing. Continue setting up your Partner Account to start advertising!
              </p>
              <Link
                to="/partner/create-account"
                className="btn-cta inline-block text-lg px-8 py-3"
              >
                Create Partner Account
              </Link>
              <p className="text-sm text-gray-700 mt-4 font-medium">
                You'll need your Application ID shown above to create your account
              </p>
            </div>
          </div>

          <div className="bg-light-gray rounded-brand p-6 mb-6">
            <h2 className="font-heading text-2xl text-burgundy mb-4">
              NEXT STEPS
            </h2>

            <div className="text-left space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold mr-3">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-dark-gray mb-1">Create Your Partner Account</h3>
                  <p className="text-sm text-gray-600">
                    Click the button above and use your Application ID to set up your account with a secure password
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold mr-3">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-dark-gray mb-1">Access Your Dashboard</h3>
                  <p className="text-sm text-gray-600">
                    Once your account is created, you'll be automatically logged in to your partner dashboard
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-bold mr-3">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-dark-gray mb-1">Create Your First Ad</h3>
                  <p className="text-sm text-gray-600">
                    Design and upload your TV ad with our easy-to-use ad creator tool
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
                    Your ads will start displaying on TV screens at Crunch locations and reaching thousands of gym members
                  </p>
                </div>
              </div>
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
