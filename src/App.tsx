import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Automation from './components/Automation';
import Assets from './components/Assets';
import ChatInterface from './components/ChatInterface';
import AIDecisionAvatarModal from './components/AIDecisionAvatarModal';
import { motion, AnimatePresence } from 'motion/react';

function MainContent() {
  const { activeTab, isEditingProfile, setIsEditingProfile } = useApp();

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar />
      <main className="flex-1 p-4 h-full overflow-hidden relative">
        {/* Updated Background Gradient */}
        <div className="h-full bg-gradient-to-br from-[#eef2ff] to-[#f5f3ff] rounded-3xl p-8 shadow-sm border border-white/50 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <Dashboard />
              </motion.div>
            )}
            {activeTab === 'automation' && (
              <motion.div 
                key="automation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <Automation />
              </motion.div>
            )}
            {activeTab === 'assets' && (
              <motion.div 
                key="assets"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <Assets />
              </motion.div>
            )}
            {activeTab === 'chat' && (
              <motion.div 
                key="chat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <ChatInterface />
              </motion.div>
            )}
            {activeTab !== 'dashboard' && activeTab !== 'automation' && activeTab !== 'assets' && activeTab !== 'chat' && (
              <motion.div 
                key="other"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center text-gray-400"
              >
                <div className="text-center">
                  <p className="text-xl font-medium">功能开发中...</p>
                  <p className="text-sm">Coming Soon</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Global Modals */}
        <AIDecisionAvatarModal 
          isOpen={isEditingProfile} 
          onClose={() => setIsEditingProfile(false)} 
        />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
