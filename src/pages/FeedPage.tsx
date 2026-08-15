import React from 'react';
import { SimulatedFeed } from '../components/feed/SimulatedFeed';

export const FeedPage: React.FC = () => {
  return (
    <div className="w-full py-6 px-4">
      <SimulatedFeed />
    </div>
  );
};
