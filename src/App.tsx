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
    <main className="flex-1 flex flex-col items-center justify-start w-full relative z-10">
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
      <div className="min-h-screen flex flex-col bg-[#090D16] text-[#F8FAFC] selection:bg-sky-500/20 selection:text-sky-200 relative overflow-hidden font-sans">
        
        {/* Subtle Ambient Background Gradients */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-sky-950/15 via-blue-950/10 to-transparent pointer-events-none blur-3xl z-0" />
        <div className="fixed -top-40 right-10 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="fixed -bottom-40 left-10 w-96 h-96 bg-sky-900/10 rounded-full blur-3xl pointer-events-none z-0" />

        <Navbar />
        <MainContent />
        <Footer />
      </div>
    </GameProvider>
  );
}

export default App;
