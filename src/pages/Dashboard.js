import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardOverview from '../components/dashboard/DashboardOverview';

const Dashboard = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-heading text-burgundy">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-light-gray py-8">
      <div className="container mx-auto px-4">
        {/* Partner Info Header */}
        <div className="bg-white rounded-brand shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-heading text-burgundy mb-2">
                {user?.businessName || 'Partner Dashboard'}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">Email:</span> {user?.email}
                </div>
                <div>
                  <span className="font-semibold">Tier:</span>{' '}
                  <span className="uppercase">{user?.tier || 'N/A'}</span>
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{' '}
                  <span className={`font-semibold ${
                    user?.status === 'active' ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {user?.status || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary mt-4 md:mt-0"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <DashboardOverview />
      </div>
    </div>
  );
};

export default Dashboard;
