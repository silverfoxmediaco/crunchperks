import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BUSINESS_CATEGORIES, LOCATION_COUNT_OPTIONS, TIER_OPTIONS, US_STATES } from '../../utils/constants';
import { validateEmail, validateRequired, validatePhone } from '../../utils/validation';
import { apiClient } from '../../utils/api';

const MultiStepSignup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Business Type
    businessCategory: '',

    // Step 2: Business Info
    legalBusinessName: '',
    ein: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',

    // Step 3: Contact Info
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    contactTitle: '',

    // Step 4: Location Count
    locationCount: '',

    // Step 5: Tier Selection
    tier: 'dfw',

    // Agreement
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const totalSteps = 6;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.businessCategory) {
          newErrors.businessCategory = 'Please select a business category';
        }
        break;

      case 2:
        if (!validateRequired(formData.legalBusinessName)) {
          newErrors.legalBusinessName = 'Legal business name is required';
        }
        if (!validateRequired(formData.ein) || !/^\d{2}-?\d{7}$/.test(formData.ein)) {
          newErrors.ein = 'Valid EIN/TIN is required (XX-XXXXXXX)';
        }
        if (!validateRequired(formData.street)) {
          newErrors.street = 'Street address is required';
        }
        if (!validateRequired(formData.city)) {
          newErrors.city = 'City is required';
        }
        if (!formData.state) {
          newErrors.state = 'State is required';
        }
        if (!validateRequired(formData.zipCode) || !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
          newErrors.zipCode = 'Valid ZIP code is required';
        }
        break;

      case 3:
        if (!validateRequired(formData.contactFirstName)) {
          newErrors.contactFirstName = 'First name is required';
        }
        if (!validateRequired(formData.contactLastName)) {
          newErrors.contactLastName = 'Last name is required';
        }
        if (!validateEmail(formData.contactEmail)) {
          newErrors.contactEmail = 'Valid email is required';
        }
        if (!validatePhone(formData.contactPhone)) {
          newErrors.contactPhone = 'Valid phone number is required';
        }
        if (!validateRequired(formData.contactTitle)) {
          newErrors.contactTitle = 'Job title is required';
        }
        break;

      case 4:
        if (!formData.locationCount) {
          newErrors.locationCount = 'Please select your location count';
        }
        break;

      case 5:
        if (!formData.tier) {
          newErrors.tier = 'Please select a tier';
        }
        break;

      case 6:
        if (!formData.agreeToTerms) {
          newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    if (submitting) {
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const response = await apiClient.post('/applications/submit', {
        businessCategory: formData.businessCategory,
        legalBusinessName: formData.legalBusinessName,
        ein: formData.ein,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        contactFirstName: formData.contactFirstName,
        contactLastName: formData.contactLastName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        contactTitle: formData.contactTitle,
        locationCount: formData.locationCount,
        tier: formData.tier,
        agreeToTerms: formData.agreeToTerms
      });

      // Store application ID for the confirmation page
      if (response.data && response.data.applicationId) {
        localStorage.setItem('applicationId', response.data.applicationId);
      }

      // Navigate to confirmation page
      navigate('/application-submitted');
    } catch (error) {
      // Handle validation errors from backend
      if (error.errors && Array.isArray(error.errors)) {
        const backendErrors = {};
        error.errors.forEach(err => {
          backendErrors[err.field || 'form'] = err.message;
        });
        setErrors(backendErrors);
      } else {
        setErrors({
          form: error.message || 'Failed to submit application. Please try again.'
        });
      }

      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold text-dark-gray">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-burgundy rounded-full h-3 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          {/* Error Display */}
          {errors.form && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-brand">
              <p className="text-red-700 font-semibold">Error</p>
              <p className="text-red-600 text-sm mt-1">{errors.form}</p>
            </div>
          )}

          {/* Step 1: Business Category */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-3xl font-heading text-burgundy mb-2">
                SELECT YOUR BUSINESS TYPE
              </h2>
              <p className="text-gray-600 mb-6">
                Choose the category that best describes your business
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BUSINESS_CATEGORIES.map((category) => (
                  <label
                    key={category.value}
                    className={`block bg-white p-6 rounded-brand shadow-md cursor-pointer border-2 transition-all hover:shadow-lg ${
                      formData.businessCategory === category.value
                        ? 'border-burgundy bg-burgundy/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="businessCategory"
                      value={category.value}
                      checked={formData.businessCategory === category.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-start">
                      <span className="text-3xl mr-3">{category.icon}</span>
                      <div>
                        <div className="font-semibold text-dark-gray mb-1">
                          {category.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {category.description}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.businessCategory && (
                <p className="text-red-500 text-sm mt-2">{errors.businessCategory}</p>
              )}
            </div>
          )}

          {/* Step 2: Business Information */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-3xl font-heading text-burgundy mb-2">
                BUSINESS INFORMATION
              </h2>
              <p className="text-gray-600 mb-6">
                Provide your official business details
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-dark-gray font-semibold mb-2">
                    Legal Business Name
                  </label>
                  <input
                    type="text"
                    name="legalBusinessName"
                    value={formData.legalBusinessName}
                    onChange={handleChange}
                    className={`input-field ${errors.legalBusinessName ? 'border-red-500' : ''}`}
                    placeholder="Enter legal business name"
                  />
                  {errors.legalBusinessName && (
                    <p className="text-red-500 text-sm mt-1">{errors.legalBusinessName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-dark-gray font-semibold mb-2">
                    EIN/TIN (Tax ID Number)
                  </label>
                  <input
                    type="text"
                    name="ein"
                    value={formData.ein}
                    onChange={handleChange}
                    className={`input-field ${errors.ein ? 'border-red-500' : ''}`}
                    placeholder="XX-XXXXXXX"
                  />
                  {errors.ein && (
                    <p className="text-red-500 text-sm mt-1">{errors.ein}</p>
                  )}
                </div>

                <div>
                  <label className="block text-dark-gray font-semibold mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className={`input-field ${errors.street ? 'border-red-500' : ''}`}
                    placeholder="123 Main Street"
                  />
                  {errors.street && (
                    <p className="text-red-500 text-sm mt-1">{errors.street}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-dark-gray font-semibold mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`input-field ${errors.city ? 'border-red-500' : ''}`}
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-dark-gray font-semibold mb-2">
                      State
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`input-field ${errors.state ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select State</option>
                      {US_STATES.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-dark-gray font-semibold mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`input-field ${errors.zipCode ? 'border-red-500' : ''}`}
                      placeholder="12345"
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-3xl font-heading text-burgundy mb-2">
                CONTACT INFORMATION
              </h2>
              <p className="text-gray-600 mb-6">
                Who should we contact about this partnership?
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-dark-gray font-semibold mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="contactFirstName"
                      value={formData.contactFirstName}
                      onChange={handleChange}
                      className={`input-field ${errors.contactFirstName ? 'border-red-500' : ''}`}
                      placeholder="John"
                    />
                    {errors.contactFirstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.contactFirstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-dark-gray font-semibold mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="contactLastName"
                      value={formData.contactLastName}
                      onChange={handleChange}
                      className={`input-field ${errors.contactLastName ? 'border-red-500' : ''}`}
                      placeholder="Doe"
                    />
                    {errors.contactLastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.contactLastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-dark-gray font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className={`input-field ${errors.contactEmail ? 'border-red-500' : ''}`}
                    placeholder="john@example.com"
                  />
                  {errors.contactEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-dark-gray font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className={`input-field ${errors.contactPhone ? 'border-red-500' : ''}`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.contactPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-dark-gray font-semibold mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="contactTitle"
                    value={formData.contactTitle}
                    onChange={handleChange}
                    className={`input-field ${errors.contactTitle ? 'border-red-500' : ''}`}
                    placeholder="Owner, Manager, Marketing Director, etc."
                  />
                  {errors.contactTitle && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactTitle}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Location Count */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-3xl font-heading text-burgundy mb-2">
                HOW MANY LOCATIONS?
              </h2>
              <p className="text-gray-600 mb-6">
                This helps us route your application to the right team
              </p>

              <div className="space-y-4">
                {LOCATION_COUNT_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className={`block bg-white p-6 rounded-brand shadow-md cursor-pointer border-2 transition-all hover:shadow-lg ${
                      formData.locationCount === option.value
                        ? 'border-burgundy bg-burgundy/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="locationCount"
                      value={option.value}
                      checked={formData.locationCount === option.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-heading text-burgundy mb-1">
                          {option.label}
                        </div>
                        <div className="text-gray-600">{option.description}</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Routes to: {option.routesTo}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.locationCount && (
                <p className="text-red-500 text-sm mt-2">{errors.locationCount}</p>
              )}
            </div>
          )}

          {/* Step 5: Tier Selection */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-3xl font-heading text-burgundy mb-2">
                SELECT YOUR TIER
              </h2>
              <p className="text-gray-600 mb-6">
                Choose your advertising reach
              </p>

              <div className="space-y-4">
                {TIER_OPTIONS.map((tier) => (
                  <label
                    key={tier.value}
                    className={`block bg-white p-6 rounded-brand shadow-md cursor-pointer border-2 transition-all ${
                      tier.comingSoon
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:shadow-lg'
                    } ${
                      formData.tier === tier.value
                        ? 'border-burgundy bg-burgundy/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tier"
                      value={tier.value}
                      checked={formData.tier === tier.value}
                      onChange={handleChange}
                      disabled={tier.comingSoon}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="text-2xl font-heading text-burgundy">
                            {tier.label}
                          </div>
                          {tier.comingSoon && (
                            <span className="ml-3 px-3 py-1 bg-orange text-white text-xs font-semibold rounded-full">
                              COMING SOON
                            </span>
                          )}
                        </div>
                        <div className="text-gray-600 mb-1">{tier.description}</div>
                        <div className="text-sm text-gray-500">{tier.locations}</div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-3xl font-heading text-orange">
                          {typeof tier.price === 'number' ? `$${tier.price}` : tier.price}
                        </div>
                        <div className="text-sm text-gray-600">per month</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.tier && (
                <p className="text-red-500 text-sm mt-2">{errors.tier}</p>
              )}
            </div>
          )}

          {/* Step 6: Review & Submit */}
          {currentStep === 6 && (
            <div>
              <h2 className="text-3xl font-heading text-burgundy mb-2">
                REVIEW & SUBMIT
              </h2>
              <p className="text-gray-600 mb-6">
                Please review your information before submitting
              </p>

              <div className="space-y-6">
                {/* Business Info Summary */}
                <div className="bg-light-gray rounded-brand p-4">
                  <h3 className="font-heading text-lg text-burgundy mb-3">Business Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">Category:</span> {BUSINESS_CATEGORIES.find(c => c.value === formData.businessCategory)?.label}</div>
                    <div><span className="font-semibold">Legal Name:</span> {formData.legalBusinessName}</div>
                    <div><span className="font-semibold">EIN:</span> {formData.ein}</div>
                    <div><span className="font-semibold">Address:</span> {formData.street}, {formData.city}, {formData.state} {formData.zipCode}</div>
                  </div>
                </div>

                {/* Contact Info Summary */}
                <div className="bg-light-gray rounded-brand p-4">
                  <h3 className="font-heading text-lg text-burgundy mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">Name:</span> {formData.contactFirstName} {formData.contactLastName}</div>
                    <div><span className="font-semibold">Email:</span> {formData.contactEmail}</div>
                    <div><span className="font-semibold">Phone:</span> {formData.contactPhone}</div>
                    <div><span className="font-semibold">Title:</span> {formData.contactTitle}</div>
                  </div>
                </div>

                {/* Location & Tier Summary */}
                <div className="bg-light-gray rounded-brand p-4">
                  <h3 className="font-heading text-lg text-burgundy mb-3">Partnership Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">Locations:</span> {LOCATION_COUNT_OPTIONS.find(l => l.value === formData.locationCount)?.label}</div>
                    <div><span className="font-semibold">Tier:</span> {TIER_OPTIONS.find(t => t.value === formData.tier)?.label}</div>
                    <div><span className="font-semibold">Monthly Cost:</span> ${TIER_OPTIONS.find(t => t.value === formData.tier)?.price}/month</div>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="border-2 border-gray-300 rounded-brand p-4">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-1 mr-3 w-5 h-5 text-burgundy border-gray-300 rounded focus:ring-burgundy"
                    />
                    <span className="text-sm text-dark-gray">
                      I agree to the Crunch Perks <a href="/terms" className="text-burgundy underline">Terms & Conditions</a> and authorize Crunch Fitness to charge my payment method $160/month after my application is approved. I understand that no charges will be made until my application is reviewed and accepted.
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="text-red-500 text-sm mt-2">{errors.agreeToTerms}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="btn-cta disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepSignup;
