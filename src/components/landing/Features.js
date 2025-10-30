import React from 'react';

const Features = () => {
  const crunchismFeatures = [
    {
      title: 'Things to Lift',
      description: 'Reach members who value strength training and quality equipment. Your perfect audience for fitness gear, supplements, and wellness products.',
      image: '/assets/things-to-lift.jpg',
      stat: '3 Million'
    },
    {
      title: 'Miles of Cardio',
      description: 'Connect with cardio enthusiasts and endurance athletes. Ideal for sports apparel, nutrition services, and recovery products.',
      image: '/assets/cardio.jpg',
      stat: '24/7'
    },
    {
      title: 'Group Fitness Studios',
      description: 'Advertise to community-focused members who love group classes. Perfect for local restaurants, entertainment venues, and services.',
      image: '/assets/group-fitness.jpg',
      stat: 'Daily'
    },
    {
      title: 'Sparkling Clean',
      description: 'Members who value cleanliness and quality. Target health-conscious consumers for premium products and professional services.',
      image: '/assets/sparkling-clean.jpg',
      stat: 'Always'
    },
    {
      title: 'People Who Care',
      description: 'Engage with caring, community-minded members. Great for family businesses, local services, and community-focused brands.',
      image: '/assets/people-who-care.jpg',
      stat: 'Every Day'
    }
  ];

  const platformFeatures = [
    {
      title: 'Self-Service Platform',
      description: 'Create, launch, and manage your campaigns in minutes. No sales calls or complicated processes required.',
      icon: '⚡'
    },
    {
      title: 'Real-Time Analytics',
      description: 'Track impressions, rotation frequency, and performance with detailed analytics. Optimize your campaigns on the fly.',
      icon: '📊'
    },
    {
      title: 'Local Focus',
      description: 'Target specific Crunch Fitness locations near your business to maximize foot traffic and local awareness.',
      icon: '📍'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading text-burgundy mb-4">
            REACH THE RIGHT AUDIENCE
          </h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Advertise to health-conscious Crunch members who value quality and community
          </p>
        </div>

        {/* Crunchism Features with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {crunchismFeatures.slice(0, 3).map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-brand shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Stat Badge */}
                <div className="absolute top-4 right-4 bg-orange text-white px-4 py-2 rounded-brand font-heading text-xl">
                  {feature.stat}
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-heading mb-2">
                  {feature.title.toUpperCase()}
                </h3>
                <p className="text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Two Images - Full Width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {crunchismFeatures.slice(3, 5).map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-brand shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Stat Badge */}
                <div className="absolute top-4 right-4 bg-orange text-white px-4 py-2 rounded-brand font-heading text-xl">
                  {feature.stat}
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-heading mb-2">
                  {feature.title.toUpperCase()}
                </h3>
                <p className="text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Features */}
        <div className="bg-light-gray rounded-brand p-8 md:p-12">
          <h3 className="text-3xl font-heading text-burgundy mb-8 text-center">
            POWERFUL PLATFORM FEATURES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-heading text-burgundy mb-3">
                  {feature.title}
                </h4>
                <p className="text-dark-gray leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
