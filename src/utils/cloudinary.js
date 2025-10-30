/**
 * Utility functions for Cloudinary image transformations
 */

/**
 * Extract the public ID and version from a Cloudinary URL
 * Example URL: https://res.cloudinary.com/demo/image/upload/v1234567890/folder/image.jpg
 */
const parseCloudinaryUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return null;
  }

  // Match Cloudinary URL pattern
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/);
  if (match && match[1]) {
    return match[1]; // Return the path after /upload/ (with or without version)
  }

  return null;
};

/**
 * Generate a Cloudinary URL with transformations
 * @param {string} imageUrl - Original Cloudinary URL
 * @param {string} transformations - Cloudinary transformation string (e.g., 'w_400,h_225,c_fill')
 * @returns {string} Transformed Cloudinary URL
 */
export const getCloudinaryUrl = (imageUrl, transformations = '') => {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return '';
  }

  // If it's already a transformed URL or not a Cloudinary URL, return as-is
  if (!imageUrl.includes('cloudinary.com')) {
    return imageUrl;
  }

  // Parse the URL to get the public ID
  const publicId = parseCloudinaryUrl(imageUrl);
  if (!publicId) {
    return imageUrl;
  }

  // Build the new URL with transformations
  const baseUrl = imageUrl.substring(0, imageUrl.indexOf('/upload/') + 8);
  const transformationStr = transformations ? `${transformations}/` : '';

  return `${baseUrl}${transformationStr}${publicId}`;
};

/**
 * Get thumbnail URL for ad list (400x225, auto quality, auto format)
 * @param {string} imageUrl - Original Cloudinary URL
 * @returns {string} Thumbnail URL
 */
export const getThumbnailUrl = (imageUrl) => {
  return getCloudinaryUrl(imageUrl, 'w_400,h_225,c_fill,q_auto,f_auto');
};

/**
 * Get optimized full-size URL (1920x1080, auto quality, auto format)
 * @param {string} imageUrl - Original Cloudinary URL
 * @returns {string} Optimized full-size URL
 */
export const getFullSizeUrl = (imageUrl) => {
  return getCloudinaryUrl(imageUrl, 'w_1920,h_1080,q_auto,f_auto');
};

/**
 * Get responsive URL based on viewport width
 * @param {string} imageUrl - Original Cloudinary URL
 * @param {number} width - Target width in pixels
 * @returns {string} Responsive URL
 */
export const getResponsiveUrl = (imageUrl, width) => {
  const height = Math.round(width * (9 / 16)); // Maintain 16:9 aspect ratio
  return getCloudinaryUrl(imageUrl, `w_${width},h_${height},c_fill,q_auto,f_auto`);
};
