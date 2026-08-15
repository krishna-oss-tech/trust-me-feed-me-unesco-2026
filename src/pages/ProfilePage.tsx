import React from 'react';
import { useGame } from '../context/GameContext';
import { ProfileCard } from '../components/profile/ProfileCard';

export const ProfilePage: React.FC = () => {
  const { profile, setStep } = useGame();

  return (
    <div className="w-full py-6 px-4">
      <ProfileCard profile={profile} onNext={() => setStep('feed')} />
    </div>
  );
};
