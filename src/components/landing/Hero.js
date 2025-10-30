import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://dj7w0h47bhjwk.cloudfront.net/assets/homepage--hero-05-c8fea97010140137132136583a92485d836965197dec845d4a7860306bc5b866.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading text-white mb-6 leading-tight">
            GROW YOUR BUSINESS WHILE REWARDING YOUR TEAM
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl md:text-3xl text-white mb-10 font-semibold">
            $185 in Gym Memberships + Advertising + Monthly Events = $160/month
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/signup"
              className="btn-cta text-lg px-8 py-4 text-center"
            >
              Become a Partner
            </Link>
            <Link
              to="/login"
              className="btn-secondary text-lg px-8 py-4 bg-white text-center"
            >
              Partner Login
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-brand p-6 border border-white/20">
              <div className="text-4xl md:text-5xl font-heading text-orange mb-2">3 Million</div>
              <div className="text-base md:text-lg text-white">Active Gym Members</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-brand p-6 border border-white/20">
              <div className="text-4xl md:text-5xl font-heading text-orange mb-2">$160</div>
              <div className="text-base md:text-lg text-white">Monthly Investment</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-brand p-6 border border-white/20">
              <div className="text-4xl md:text-5xl font-heading text-orange mb-2">24/7</div>
              <div className="text-base md:text-lg text-white">Self-Service Platform</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator (Optional) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white opacity-75"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
