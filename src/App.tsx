import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ScenarioPage } from './pages/ScenarioPage';
import { ProfilePage } from './pages/ProfilePage';
import { FeedPage } from './pages/FeedPage';
import { FinalPage } from './pages/FinalPage';

const MainContent: React.FC = () => {
  const { step } = useGame();

  return (
    <main className="flex-1 flex flex-col items-center justify-start w-full">
      {step === 'landing' && <LandingPage />}
      {step === 'how_it_works' && <HowItWorksPage />}
      {step === 'challenge' && <ScenarioPage />}
      {step === 'profile' && <ProfilePage />}
      {step === 'feed' && <FeedPage />}
      {step === 'final' && <FinalPage />}
    </main>
  );
};

export function App() {
  return (
    <GameProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#172033] selection:bg-[#5B8DEF]/20 selection:text-[#172033]">
        <Navbar />
        <MainContent />
        <Footer />
      </div>
    </GameProvider>
  );
}

export default App;
