import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      title: 'Create Your Account',
      description: 'Sign up in minutes with your business information. No credit card required to get started.'
    },
    {
      number: '2',
      title: 'Design Your Campaign',
      description: 'Upload your creative assets, set your budget, and choose your target locations and audience.'
    },
    {
      number: '3',
      title: 'Launch & Monitor',
      description: 'Go live instantly and track performance in real-time with our comprehensive analytics dashboard.'
    },
    {
      number: '4',
      title: 'Optimize & Grow',
      description: 'Use insights to refine your campaigns and maximize ROI. Scale up when you see results.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-burgundy text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">
            HOW IT WORKS
          </h2>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Get your business in front of gym members in four simple steps
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange rounded-full text-3xl font-heading mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-heading mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-100 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/signup" className="btn-cta inline-block">
              Start Your Campaign Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
