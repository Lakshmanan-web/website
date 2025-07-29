import React from 'react';
import './RollingBanner.css';

const offers = [
  "3 km free delivery! Catch it soon!",
  "Buy 2 cases, get 1 free!",
  "Flat 20% off on all Samsung cases!",
  "New arrivals: iPhone 15 Pro designer cases!"
];

const RollingBanner = () => {
  return (
    <div className="bg-yellow-100 h-12 flex items-center overflow-hidden w-full rounded-md shadow-md">
      <div className="w-full relative flex items-center h-full">
        <div className="absolute whitespace-nowrap animate-rolling-banner font-bold text-gray-900 text-base md:text-lg">
          {offers.join('  •  ')}
        </div>
      </div>
    </div>
  );
};

export default RollingBanner; 