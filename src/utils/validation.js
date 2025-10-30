export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateBusinessForm = (formData) => {
  const errors = {};

  if (!validateRequired(formData.businessName)) {
    errors.businessName = 'Business name is required';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Valid email is required';
  }

  if (!validatePassword(formData.password)) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Valid phone number is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
