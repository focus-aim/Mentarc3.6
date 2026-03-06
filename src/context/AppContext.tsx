import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  website: string;
  preferences: string[];
  isOnboarded: boolean;
  mainProducts?: string;
  businessStage?: string;
  targetMarket?: string;
  businessGoals?: string;
  avatarUrl?: string;
  persona?: string;
  timeline?: { date: string; content: string; type: string }[];
}

interface AppState {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  automationTab: 'trend' | 'social';
  setAutomationTab: (tab: 'trend' | 'social') => void;
  chatHistory: any[];
  setChatHistory: (history: any[]) => void;
  isEditingProfile: boolean;
  setIsEditingProfile: (isEditing: boolean) => void;
  startInEditMode: boolean;
  setStartInEditMode: (editMode: boolean) => void;
  initialChatPrompt: string;
  setInitialChatPrompt: (prompt: string) => void;
  resetApp: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultProfile: UserProfile = { 
    website: '', 
    preferences: [], 
    isOnboarded: false,
    mainProducts: '',
    businessStage: 'startup',
    targetMarket: '',
    businessGoals: '',
    avatarUrl: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Aria&backgroundColor=c7d2fe',
    persona: 'growth',
    timeline: []
  };

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mentarc_user_profile_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user profile', e);
      }
    }
    return defaultProfile;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [automationTab, setAutomationTab] = useState<'trend' | 'social'>('trend');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [startInEditMode, setStartInEditMode] = useState(false);
  const [initialChatPrompt, setInitialChatPrompt] = useState('');

  useEffect(() => {
    localStorage.setItem('mentarc_user_profile_v2', JSON.stringify(userProfile));
  }, [userProfile]);

  const resetApp = () => {
    localStorage.removeItem('mentarc_user_profile_v2');
    setUserProfile(defaultProfile);
    setActiveTab('dashboard');
    setAutomationTab('trend');
    setChatHistory([]);
    setIsEditingProfile(false);
    setInitialChatPrompt('');
  };

  return (
    <AppContext.Provider value={{ 
      userProfile, setUserProfile, 
      activeTab, setActiveTab, 
      automationTab, setAutomationTab,
      chatHistory, setChatHistory,
      isEditingProfile, setIsEditingProfile,
      startInEditMode, setStartInEditMode,
      initialChatPrompt, setInitialChatPrompt,
      resetApp
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
