import React, { createContext, useContext, useState, useEffect } from 'react';
import { Scenario, UserChoice, ActionType, BehaviourMetrics, InformationProfile } from '../types';
import { SCENARIOS, DEMO_SCENARIO_IDS } from '../data/scenarios';
import { calculateMetrics, generateInformationProfile } from '../engine/scoringEngine';

export type PageStep = 
  | 'landing' 
  | 'how_it_works' 
  | 'challenge' 
  | 'verification' 
  | 'profile' 
  | 'feed' 
  | 'final';

interface GameContextType {
  step: PageStep;
  setStep: (step: PageStep) => void;
  isDemoMode: boolean;
  setIsDemoMode: (demo: boolean) => void;
  scenarios: Scenario[];
  currentIndex: number;
  currentScenario: Scenario;
  userChoices: UserChoice[];
  recordChoice: (action: ActionType) => void;
  recordReason: (scenarioId: string, reason: string) => void;
  showReasonModal: boolean;
  pendingReasonScenario: Scenario | null;
  submitReason: (reason: string) => void;
  skipReason: () => void;
  showVerificationPanel: boolean;
  activeVerificationScenario: Scenario | null;
  openVerification: (scenario?: Scenario) => void;
  closeVerification: () => void;
  metrics: BehaviourMetrics;
  profile: InformationProfile;
  resetExperience: () => void;
  restartFromBeginning: () => void;
  progressPercent: number;
}

const STORAGE_KEY = 'trust_me_feed_me_session_v1';

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<PageStep>('landing');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userChoices, setUserChoices] = useState<UserChoice[]>([]);
  
  // Modals state
  const [pendingReasonScenario, setPendingReasonScenario] = useState<Scenario | null>(null);
  const [showReasonModal, setShowReasonModal] = useState<boolean>(false);
  
  const [activeVerificationScenario, setActiveVerificationScenario] = useState<Scenario | null>(null);
  const [showVerificationPanel, setShowVerificationPanel] = useState<boolean>(false);

  // Filter scenarios depending on Demo Mode
  const activeScenariosList = isDemoMode
    ? SCENARIOS.filter((s) => DEMO_SCENARIO_IDS.includes(s.id))
    : SCENARIOS;

  const currentScenario = activeScenariosList[currentIndex] || activeScenariosList[0];

  // Load persisted session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.userChoices && Array.isArray(parsed.userChoices)) {
          setUserChoices(parsed.userChoices);
        }
        if (parsed.isDemoMode !== undefined) {
          setIsDemoMode(parsed.isDemoMode);
        }
        if (parsed.step) {
          setStep(parsed.step);
        }
        if (parsed.currentIndex !== undefined) {
          setCurrentIndex(parsed.currentIndex);
        }
      }
    } catch (e) {
      console.warn('Failed to restore session from localStorage', e);
    }
  }, []);

  // Save session state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          step,
          isDemoMode,
          currentIndex,
          userChoices,
        })
      );
    } catch (e) {
      console.warn('Failed to persist session to localStorage', e);
    }
  }, [step, isDemoMode, currentIndex, userChoices]);

  const recordChoice = (action: ActionType) => {
    const newChoice: UserChoice = {
      scenarioId: currentScenario.id,
      action,
      timestamp: Date.now(),
    };

    const updatedChoices = [
      ...userChoices.filter((c) => c.scenarioId !== currentScenario.id),
      newChoice,
    ];
    setUserChoices(updatedChoices);

    if (action === 'VERIFY') {
      // Open verification panel for deep learning
      setActiveVerificationScenario(currentScenario);
      setShowVerificationPanel(true);
    } else if (currentScenario.askReason) {
      // Prompt for "Why did you choose this?"
      setPendingReasonScenario(currentScenario);
      setShowReasonModal(true);
    } else {
      advanceScenario();
    }
  };

  const submitReason = (reason: string) => {
    if (pendingReasonScenario) {
      recordReason(pendingReasonScenario.id, reason);
    }
    setShowReasonModal(false);
    setPendingReasonScenario(null);
    advanceScenario();
  };

  const skipReason = () => {
    setShowReasonModal(false);
    setPendingReasonScenario(null);
    advanceScenario();
  };

  const recordReason = (scenarioId: string, reason: string) => {
    setUserChoices((prev) =>
      prev.map((c) => (c.scenarioId === scenarioId ? { ...c, reason } : c))
    );
  };

  const openVerification = (scenario?: Scenario) => {
    setActiveVerificationScenario(scenario || currentScenario);
    setShowVerificationPanel(true);
  };

  const closeVerification = () => {
    setShowVerificationPanel(false);
    // If currently in scenario flow, ask reason or advance
    if (step === 'challenge') {
      if (currentScenario.askReason) {
        setPendingReasonScenario(currentScenario);
        setShowReasonModal(true);
      } else {
        advanceScenario();
      }
    }
  };

  const advanceScenario = () => {
    if (currentIndex < activeScenariosList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Scenario journey complete -> Go to Information Profile
      setStep('profile');
    }
  };

  const resetExperience = () => {
    setUserChoices([]);
    setCurrentIndex(0);
    setStep('landing');
    setShowReasonModal(false);
    setShowVerificationPanel(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const restartFromBeginning = () => {
    setUserChoices([]);
    setCurrentIndex(0);
    setStep('challenge');
    setShowReasonModal(false);
    setShowVerificationPanel(false);
  };

  const metrics = calculateMetrics(userChoices, activeScenariosList);
  const profile = generateInformationProfile(metrics);
  const progressPercent = Math.round(((currentIndex + 1) / activeScenariosList.length) * 100);

  return (
    <GameContext.Provider
      value={{
        step,
        setStep,
        isDemoMode,
        setIsDemoMode,
        scenarios: activeScenariosList,
        currentIndex,
        currentScenario,
        userChoices,
        recordChoice,
        recordReason,
        showReasonModal,
        pendingReasonScenario,
        submitReason,
        skipReason,
        showVerificationPanel,
        activeVerificationScenario,
        openVerification,
        closeVerification,
        metrics,
        profile,
        resetExperience,
        restartFromBeginning,
        progressPercent,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return ctx;
};
