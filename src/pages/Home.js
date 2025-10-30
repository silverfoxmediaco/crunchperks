import React from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import ValueCalculator from '../components/landing/ValueCalculator';
import HowItWorks from '../components/landing/HowItWorks';

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <ValueCalculator />
      <HowItWorks />
    </div>
  );
};

export default Home;
