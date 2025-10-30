import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../utils/api';
import { getThumbnailUrl, getFullSizeUrl } from '../../utils/cloudinary';
import AdCreator from './AdCreator';
import AdAnalytics from './AdAnalytics';

const DashboardOverview = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [ads, setAds] = useState([]);
  const [currentAd, setCurrentAd] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch ads on component mount
  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/ads');

      if (response.data && response.data.ads) {
        setAds(response.data.ads);

        // Set the first active ad as current
        const activeAd = response.data.ads.find(ad => ad.status === 'active');
        if (activeAd) {
          setCurrentAd(activeAd);
        } else if (response.data.ads.length > 0) {
          setCurrentAd(response.data.ads[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching ads:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Active Campaigns', value: currentAd ? '1' : '0', color: 'text-burgundy' },
    { label: 'Total Impressions', value: currentAd?.impressions || '0', color: 'text-orange' },
    { label: 'Rotations/Day', value: currentAd?.rotationsPerDay || '0', color: 'text-deep-red' },
    { label: 'Ad Status', value: currentAd?.status || 'No Ad', color: 'text-burgundy' }
  ];

  const handleSaveAd = (adData) => {
    // Refresh ads list after saving
    fetchAds();
    setActiveTab('overview');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'create-ad', label: 'Create Ad', icon: '✨' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-burgundy to-deep-red text-white rounded-brand p-6">
        <h1 className="text-3xl font-heading mb-2">
          WELCOME BACK, {user?.businessName?.toUpperCase() || 'PARTNER'}
        </h1>
        <p className="text-gray-100">
          Manage your Crunch Perks advertising campaigns and track performance
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-brand shadow-md overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-fit px-6 py-4 font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-burgundy text-white border-b-2 border-burgundy'
                  : 'text-dark-gray hover:bg-light-gray'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="card bg-light-gray">
                    <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                    <div className={`text-3xl font-heading ${stat.color}`}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Current Ad Status */}
              {currentAd ? (
                <div className="card">
                  <h2 className="text-2xl font-heading text-burgundy mb-4">
                    YOUR CURRENT AD
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      {currentAd.imageUrl && (
                        <img
                          src={getThumbnailUrl(currentAd.imageUrl)}
                          alt="Current ad"
                          className="w-full rounded-brand mb-4"
                        />
                      )}
                      <div className="space-y-2">
                        <div>
                          <span className="font-semibold">Title:</span> {currentAd.title}
                        </div>
                        <div>
                          <span className="font-semibold">Catchphrase:</span> {currentAd.catchphrase}
                        </div>
                        <div>
                          <span className="font-semibold">Status:</span>{' '}
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              currentAd.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : currentAd.status === 'pending_review'
                                ? 'bg-orange/20 text-orange'
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {currentAd.status.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <button
                        onClick={() => setActiveTab('create-ad')}
                        className="btn-secondary w-full"
                      >
                        Edit Ad
                      </button>
                      <button
                        onClick={() => setActiveTab('analytics')}
                        className="btn-primary w-full"
                      >
                        View Analytics
                      </button>
                      <button className="btn-secondary w-full text-red-600 border-red-600 hover:bg-red-600">
                        Pause Campaign
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card bg-light-gray text-center py-12">
                  <div className="text-6xl mb-4">📺</div>
                  <h2 className="text-2xl font-heading text-burgundy mb-2">
                    NO ACTIVE CAMPAIGNS
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Create your first ad to start reaching Crunch members
                  </p>
                  <button
                    onClick={() => setActiveTab('create-ad')}
                    className="btn-cta"
                  >
                    Create Your First Ad
                  </button>
                </div>
              )}

              {/* Getting Started Guide */}
              <div className="card bg-light-gray">
                <h2 className="text-2xl font-heading text-burgundy mb-4">
                  GETTING STARTED
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">📸</div>
                    <h3 className="font-semibold text-dark-gray mb-2">1. Upload Image</h3>
                    <p className="text-sm text-gray-600">
                      1920x1080 pixels, high quality
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-3">✍️</div>
                    <h3 className="font-semibold text-dark-gray mb-2">2. Add Copy</h3>
                    <p className="text-sm text-gray-600">
                      Title and catchphrase
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-3">🚀</div>
                    <h3 className="font-semibold text-dark-gray mb-2">3. Submit</h3>
                    <p className="text-sm text-gray-600">
                      Goes live after approval
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Create Ad Tab */}
          {activeTab === 'create-ad' && (
            <AdCreator onSave={handleSaveAd} existingAd={currentAd} />
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            currentAd ? (
              <AdAnalytics adId={currentAd?.id} />
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h2 className="text-2xl font-heading text-burgundy mb-2">
                  NO DATA AVAILABLE
                </h2>
                <p className="text-gray-600">
                  Create and launch an ad to see analytics
                </p>
              </div>
            )
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-heading text-burgundy mb-4">
                ACCOUNT SETTINGS
              </h2>

              <div className="card bg-light-gray">
                <h3 className="font-heading text-lg text-burgundy mb-3">Business Information</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-semibold">Business Name:</span> {user?.businessName || 'Your Business'}</div>
                  <div><span className="font-semibold">Email:</span> {user?.email || 'your@email.com'}</div>
                  <div><span className="font-semibold">Tier:</span> DFW Metro</div>
                  <div><span className="font-semibold">Monthly Cost:</span> $160</div>
                </div>
                <button className="btn-secondary mt-4">
                  Update Information
                </button>
              </div>

              <div className="card bg-light-gray">
                <h3 className="font-heading text-lg text-burgundy mb-3">Billing</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Manage your payment method and view billing history
                </p>
                <button className="btn-secondary">
                  Manage Billing
                </button>
              </div>

              <div className="card border-2 border-red-300 bg-red-50">
                <h3 className="font-heading text-lg text-red-700 mb-3">Cancel Partnership</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Cancel your Crunch Perks partnership with 30 days notice
                </p>
                <button className="btn-secondary text-red-600 border-red-600 hover:bg-red-600">
                  Request Cancellation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
