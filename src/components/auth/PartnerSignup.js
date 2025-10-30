import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validateRequired } from '../../utils/validation';

const PartnerSignup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    applicationId: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validateRequired(formData.applicationId)) {
      newErrors.applicationId = 'Application ID is required';
    }

    if (!validateRequired(formData.password)) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await signup(
        formData.email,
        formData.password,
        formData.applicationId
      );

      if (result.success) {
        setSuccess(true);
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setErrors({ form: result.error || 'Account creation failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ form: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-green-600"
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

          <h2 className="text-3xl font-heading text-burgundy mb-4">
            ACCOUNT CREATED!
          </h2>

          <p className="text-dark-gray mb-4">
            Your partner account has been successfully created. Redirecting to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="card">
        <h2 className="text-3xl font-heading text-burgundy mb-2 text-center">
          CREATE YOUR ACCOUNT
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Your application has been approved! Create your partner account to get started.
        </p>

        {errors.form && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-brand mb-4">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Application ID Field */}
          <div>
            <label htmlFor="applicationId" className="block text-dark-gray font-semibold mb-2">
              Application ID
            </label>
            <input
              type="text"
              id="applicationId"
              name="applicationId"
              value={formData.applicationId}
              onChange={handleChange}
              className={`input-field ${errors.applicationId ? 'border-red-500' : ''}`}
              placeholder="Enter your application ID"
            />
            {errors.applicationId && (
              <p className="text-red-500 text-sm mt-1">{errors.applicationId}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Find this in your approval email
            </p>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-dark-gray font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'border-red-500' : ''}`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Use the same email from your application
            </p>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-dark-gray font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Create a password (min 8 characters)"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-dark-gray font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input-field ${errors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-cta w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-dark-gray">
          Already have an account?{' '}
          <Link to="/login" className="text-burgundy font-semibold hover:text-deep-red">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerSignup;
