import React from 'react';

const AdPreview = ({ ad, onClose }) => {
  if (!ad) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl font-bold"
        >
          ✕ Close Preview
        </button>

        {/* TV Frame */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-2xl">
          <div className="bg-black p-2 rounded">
            {/* 16:9 aspect ratio container (1920x1080) */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
                {/* Ad Image */}
                {ad.imagePreview && (
                  <div className="absolute inset-0">
                    <img
                      src={ad.imagePreview}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 p-8">
                  {/* Title */}
                  <h1 className="text-6xl md:text-8xl font-heading text-white mb-6 text-center drop-shadow-2xl">
                    {ad.title || 'Your Business Name'}
                  </h1>

                  {/* Catchphrase */}
                  <p className="text-3xl md:text-5xl text-orange font-semibold text-center drop-shadow-xl max-w-4xl">
                    {ad.catchphrase || 'Your amazing catchphrase here!'}
                  </p>
                </div>

                {/* Crunch Perks Branding (bottom corner) */}
                <div className="absolute bottom-4 right-4 bg-burgundy bg-opacity-90 px-6 py-3 rounded">
                  <p className="text-white font-heading text-2xl">CRUNCH PERKS</p>
                </div>
              </div>
            </div>
          </div>

          {/* TV Screen Label */}
          <div className="text-center mt-4 text-gray-400 text-sm">
            TV Display Preview (1920×1080)
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center text-white text-sm">
          <p>This is how your ad will appear on TV screens at Crunch Fitness locations</p>
        </div>
      </div>
    </div>
  );
};

export default AdPreview;
