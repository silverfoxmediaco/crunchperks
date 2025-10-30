import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-light-gray py-12 px-4">
      <div className="container mx-auto flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
