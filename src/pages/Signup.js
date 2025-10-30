import React from 'react';
import MultiStepSignup from '../components/auth/MultiStepSignup';

const Signup = () => {
  return (
    <div className="min-h-screen bg-light-gray py-12 px-4">
      <div className="container mx-auto">
        <MultiStepSignup />
      </div>
    </div>
  );
};

export default Signup;
