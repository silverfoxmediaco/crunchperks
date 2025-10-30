import React, { useState } from 'react';

const AdAnalytics = ({ adId }) => {
  // Mock data - will be replaced with real API data
  const [timeRange, setTimeRange] = useState('7days');

  const mockData = {
    totalImpressions: 12458,
    rotationsPerDay: 24,
    averageViewTime: '8.5s',
    topLocations: [
      { name: 'Crunch Dallas - Uptown', impressions: 3245, percentage: 26 },
      { name: 'Crunch Fort Worth - Downtown', impressions: 2876, percentage: 23 },
      { name: 'Crunch Plano - Legacy', impressions: 2134, percentage: 17 },
      { name: 'Crunch Arlington', impressions: 1987, percentage: 16 },
      { name: 'Other Locations', impressions: 2216, percentage: 18 }
    ],
    dailyImpressions: [
      { date: 'Mon', count: 1784 },
      { date: 'Tue', count: 1923 },
      { date: 'Wed', count: 1656 },
      { date: 'Thu', count: 2012 },
      { date: 'Fri', count: 2134 },
      { date: 'Sat', count: 1987 },
      { date: 'Sun', count: 962 }
    ]
  };

  const maxDailyImpressions = Math.max(...mockData.dailyImpressions.map(d => d.count));

  return (
    <div className="space-y-6">
      {/* Header with Time Range Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-2xl font-heading text-burgundy">
          AD PERFORMANCE
        </h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="input-field py-2"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-light-gray">
          <div className="text-sm text-gray-600 mb-2">Total Impressions</div>
          <div className="text-4xl font-heading text-burgundy">
            {mockData.totalImpressions.toLocaleString()}
          </div>
          <div className="text-sm text-green-600 mt-2">+12% vs last period</div>
        </div>

        <div className="card bg-light-gray">
          <div className="text-sm text-gray-600 mb-2">Rotations Per Day</div>
          <div className="text-4xl font-heading text-orange">
            {mockData.rotationsPerDay}
          </div>
          <div className="text-sm text-gray-600 mt-2">Per location average</div>
        </div>

        <div className="card bg-light-gray">
          <div className="text-sm text-gray-600 mb-2">Avg. View Time</div>
          <div className="text-4xl font-heading text-deep-red">
            {mockData.averageViewTime}
          </div>
          <div className="text-sm text-gray-600 mt-2">On screen duration</div>
        </div>
      </div>

      {/* Daily Impressions Chart */}
      <div className="card">
        <h4 className="text-xl font-heading text-burgundy mb-4">
          DAILY IMPRESSIONS
        </h4>
        <div className="space-y-3">
          {mockData.dailyImpressions.map((day, index) => (
            <div key={index} className="flex items-center">
              <div className="w-12 text-sm font-semibold text-dark-gray">
                {day.date}
              </div>
              <div className="flex-1 ml-4">
                <div className="bg-gray-200 rounded-full h-8 overflow-hidden">
                  <div
                    className="bg-burgundy h-full flex items-center justify-end pr-3 transition-all duration-500"
                    style={{ width: `${(day.count / maxDailyImpressions) * 100}%` }}
                  >
                    <span className="text-white text-sm font-semibold">
                      {day.count.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Locations */}
      <div className="card">
        <h4 className="text-xl font-heading text-burgundy mb-4">
          TOP PERFORMING LOCATIONS
        </h4>
        <div className="space-y-4">
          {mockData.topLocations.map((location, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-dark-gray">
                  {location.name}
                </div>
                <div className="text-sm text-gray-600">
                  {location.impressions.toLocaleString()} impressions ({location.percentage}%)
                </div>
              </div>
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-orange h-full transition-all duration-500"
                  style={{ width: `${location.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export/Download Options */}
      <div className="card bg-light-gray">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-dark-gray mb-1">
              Export Analytics Report
            </h4>
            <p className="text-sm text-gray-600">
              Download detailed performance data for your records
            </p>
          </div>
          <button className="btn-secondary text-sm whitespace-nowrap">
            <svg
              className="w-4 h-4 inline-block mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdAnalytics;
