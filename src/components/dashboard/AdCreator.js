import React, { useState, useRef } from 'react';
import { apiClient, API_BASE_URL } from '../../utils/api';

const AdCreator = ({ onSave, existingAd = null }) => {
  const [adData, setAdData] = useState({
    image: existingAd?.image || null,
    imagePreview: existingAd?.imagePreview || null,
    title: existingAd?.title || '',
    catchphrase: existingAd?.catchphrase || '',
    status: existingAd?.status || 'draft'
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset errors
    const newErrors = { ...errors };
    delete newErrors.image;

    // Validate file type
    if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.type)) {
      newErrors.image = 'Only PNG, JPG, and WebP files are allowed';
      setErrors(newErrors);
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      newErrors.image = 'File size must be less than 5MB';
      setErrors(newErrors);
      return;
    }

    // Validate dimensions
    const img = new Image();
    img.onload = () => {
      if (img.width !== 1920 || img.height !== 1080) {
        newErrors.image = 'Image must be exactly 1920x1080 pixels';
        setErrors(newErrors);
        URL.revokeObjectURL(img.src);
      } else {
        // Image is valid
        const reader = new FileReader();
        reader.onloadend = () => {
          setAdData(prev => ({
            ...prev,
            image: file,
            imagePreview: reader.result
          }));
          setErrors(newErrors);
        };
        reader.readAsDataURL(file);
      }
    };

    img.onerror = () => {
      newErrors.image = 'Failed to load image';
      setErrors(newErrors);
    };

    img.src = URL.createObjectURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validateAd = () => {
    const newErrors = {};

    if (!adData.imagePreview) {
      newErrors.image = 'Please upload an image';
    }

    if (!adData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (adData.title.length > 50) {
      newErrors.title = 'Title must be 50 characters or less';
    }

    if (!adData.catchphrase.trim()) {
      newErrors.catchphrase = 'Catchphrase is required';
    } else if (adData.catchphrase.length > 75) {
      newErrors.catchphrase = 'Catchphrase must be 75 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (status = 'draft') => {
    if (!validateAd()) {
      return;
    }

    setSaving(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', adData.image);
      formData.append('title', adData.title);
      formData.append('catchphrase', adData.catchphrase);

      // Make API call to create ad
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/ads/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create ad');
      }

      // Update status if needed (submit for review)
      if (status === 'pending_review' && data.data.ad.id) {
        await apiClient.post(`/ads/${data.data.ad.id}/submit`, {});
      }

      // Call the onSave callback if provided
      if (onSave) {
        onSave(data.data.ad);
      }

      // Reset form after successful save
      setAdData({
        image: null,
        imagePreview: null,
        title: '',
        catchphrase: '',
        status: 'draft'
      });

      // Show success message
      alert(status === 'pending_review'
        ? 'Ad submitted for review successfully!'
        : 'Ad saved as draft successfully!');

    } catch (error) {
      console.error('Save ad error:', error);
      setErrors({
        form: error.message || 'Failed to save ad. Please try again.'
      });
    } finally {
      setSaving(false);
    }
  };

  const remainingTitleChars = 50 - adData.title.length;
  const remainingCatchphraseChars = 75 - adData.catchphrase.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Ad Editor */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-heading text-burgundy mb-4">
            CREATE YOUR AD
          </h3>

          {errors.form && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-brand mb-4">
              {errors.form}
            </div>
          )}

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-dark-gray font-semibold mb-2">
              Background Image
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Required: 1920x1080 pixels, PNG/JPG/WebP, max 5MB
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-brand p-6 text-center">
              {adData.imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={adData.imagePreview}
                    alt="Ad background"
                    className="w-full h-auto rounded-brand"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-secondary text-sm"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-3"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-cta text-sm"
                  >
                    Upload Image
                  </button>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />

            {errors.image && (
              <p className="text-red-500 text-sm mt-2">{errors.image}</p>
            )}
          </div>

          {/* Title Input */}
          <div className="mb-6">
            <label className="block text-dark-gray font-semibold mb-2">
              Ad Title
            </label>
            <p className="text-sm text-gray-600 mb-2">
              Max 50 characters • Large, bold text
            </p>
            <input
              type="text"
              name="title"
              value={adData.title}
              onChange={handleChange}
              maxLength={50}
              className={`input-field ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Your Business Name or Main Message"
            />
            <div className="flex justify-between items-center mt-1">
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
              <p className={`text-sm ml-auto ${remainingTitleChars < 10 ? 'text-orange' : 'text-gray-500'}`}>
                {remainingTitleChars} characters remaining
              </p>
            </div>
          </div>

          {/* Catchphrase Input */}
          <div className="mb-6">
            <label className="block text-dark-gray font-semibold mb-2">
              Catchphrase
            </label>
            <p className="text-sm text-gray-600 mb-2">
              Max 75 characters • Your offer or tagline
            </p>
            <input
              type="text"
              name="catchphrase"
              value={adData.catchphrase}
              onChange={handleChange}
              maxLength={75}
              className={`input-field ${errors.catchphrase ? 'border-red-500' : ''}`}
              placeholder="e.g., 20% Off For All Crunch Members!"
            />
            <div className="flex justify-between items-center mt-1">
              {errors.catchphrase && (
                <p className="text-red-500 text-sm">{errors.catchphrase}</p>
              )}
              <p className={`text-sm ml-auto ${remainingCatchphraseChars < 10 ? 'text-orange' : 'text-gray-500'}`}>
                {remainingCatchphraseChars} characters remaining
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleSave('draft')}
              disabled={saving}
              className="btn-secondary flex-1 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="button"
              onClick={() => handleSave('pending')}
              disabled={saving}
              className="btn-cta flex-1 disabled:opacity-50"
            >
              {saving ? 'Submitting...' : 'Submit for Review'}
            </button>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="sticky top-24">
        <h3 className="text-2xl font-heading text-burgundy mb-4">
          LIVE PREVIEW
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          This is how your ad will appear on TV screens
        </p>

        <div className="bg-dark-gray rounded-brand p-4">
          <div
            className="relative bg-gray-800 rounded-brand overflow-hidden"
            style={{
              aspectRatio: '16/9',
              backgroundImage: adData.imagePreview ? `url(${adData.imagePreview})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {!adData.imagePreview && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <span className="text-lg">Upload an image to see preview</span>
              </div>
            )}

            {/* Title Overlay */}
            {adData.title && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-8">
                <h1
                  className="font-heading text-white"
                  style={{
                    fontSize: 'clamp(24px, 4vw, 60px)',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    lineHeight: '1.2'
                  }}
                >
                  {adData.title}
                </h1>
              </div>
            )}

            {/* Catchphrase Overlay */}
            {adData.catchphrase && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p
                  className="font-body text-white font-semibold"
                  style={{
                    fontSize: 'clamp(16px, 3vw, 40px)',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    lineHeight: '1.3'
                  }}
                >
                  {adData.catchphrase}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 bg-orange/10 border border-orange rounded-brand p-4">
          <p className="text-sm text-dark-gray">
            <strong>Note:</strong> Your ad will be reviewed by our team to ensure it meets quality standards
            and is appropriate for gym members. You'll receive an email notification once it's approved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdCreator;
