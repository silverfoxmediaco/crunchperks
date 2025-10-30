import React from 'react';
import { Link } from 'react-router-dom';

const ValueCalculator = () => {
  const benefits = [
    {
      title: '5 Gym Memberships',
      value: '$185',
      description: 'For your employees and their families',
      icon: '💪'
    },
    {
      title: 'TV Advertising',
      value: 'Included',
      description: 'Your ads rotating across Crunch locations',
      icon: '📺'
    },
    {
      title: 'Monthly Vendor Events',
      value: 'Included',
      description: 'Sell products directly to members',
      icon: '🎪'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading text-burgundy mb-4">
              THE CRUNCH PERKS VALUE
            </h2>
            <p className="text-xl text-dark-gray">
              Everything your business needs to connect with health-conscious customers
            </p>
          </div>

          {/* Value Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="card bg-light-gray text-center hover:shadow-lg transition-shadow">
                
                <h3 className="text-2xl font-heading text-burgundy mb-2">
                  {benefit.title}
                </h3>
                <div className="text-3xl font-bold text-orange mb-3">
                  {benefit.value}
                </div>
                <p className="text-dark-gray">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Total Value Card */}
          <div className="card bg-gradient-to-br from-burgundy to-deep-red text-white text-center">
            <div className="max-w-3xl mx-auto">
              <p className="text-2xl mb-4">Total Value Package Worth</p>
              <div className="text-6xl md:text-7xl font-heading mb-4">
                $185+
              </div>
              <div className="text-xl mb-6 text-gray-100">
                Plus TV advertising and monthly vendor events
              </div>

              <div className="border-t-2 border-white/30 my-8"></div>

              <p className="text-2xl mb-4">You Pay Only</p>
              <div className="text-6xl md:text-7xl font-heading text-orange mb-4">
                $160
              </div>
              <p className="text-xl mb-8">per month</p>

              <Link to="/signup" className="btn-cta inline-block text-lg">
                Become a Perks Partner Today
              </Link>

              <p className="text-sm text-gray-200 mt-6">
                Month-to-month commitment • Cancel with 30-day notice
              </p>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 text-dark-gray">
              <svg className="w-6 h-6 text-orange" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Real-time analytics dashboard</span>
            </div>
            <div className="inline-flex items-center space-x-2 text-dark-gray ml-8">
              <svg className="w-6 h-6 text-orange" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Self-service ad creation</span>
            </div>
            <div className="inline-flex items-center space-x-2 text-dark-gray ml-8">
              <svg className="w-6 h-6 text-orange" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">No long-term contracts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueCalculator;
