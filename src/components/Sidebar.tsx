import { LayoutDashboard, Zap, Settings, UserCog, Sparkles, Activity, Database, ChevronRight, Bot, Layers, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';

export default function Sidebar() {
  const { activeTab, setActiveTab, userProfile, setIsEditingProfile, resetApp } = useApp();

  return (
    <div className="w-80 h-screen bg-white flex flex-col border-r border-gray-50 z-20">
      
      {/* 1. AI决策分身 (Integrated) */}
      <div className="p-6 pb-2 h-[40%]">
          <div className="relative h-full flex flex-col rounded-3xl overflow-hidden group cursor-pointer shadow-lg shadow-indigo-100/50 bg-white border border-gray-100" onClick={() => { setActiveTab('dashboard'); setIsEditingProfile(true); }}>
            
            {/* Avatar Area (Top) */}
            <div className="relative flex-1 min-h-0 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
                <img 
                  src={userProfile.avatarUrl || "https://api.dicebear.com/9.x/lorelei/svg?seed=Aria&backgroundColor=c7d2fe"} 
                  alt="AI Cartoon Avatar" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                
                {/* Online Status Badge */}
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm flex items-center gap-1.5 border border-white/50">
                   <div className={`w-1.5 h-1.5 rounded-full ${userProfile.isOnboarded ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                   <span className="text-[10px] font-bold text-gray-600 tracking-wide">
                     {userProfile.isOnboarded ? 'ONLINE' : 'PENDING'}
                   </span>
                </div>

                {userProfile.isOnboarded ? (
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="bg-white/90 px-3 py-1.5 rounded-full shadow-sm border border-white/50 flex items-center gap-2">
                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                       <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">已训练</span>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[2px]">
                    <div className="bg-white/90 px-3 py-1.5 rounded-full shadow-sm border border-white/50 flex items-center gap-2">
                       <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                       <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">待培训</span>
                    </div>
                  </div>
                )}

                {/* Edit Button */}
                <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-white/50 opacity-0 group-hover:opacity-100 transition-opacity hover:text-indigo-600">
                   <UserCog size={14} />
                </div>
            </div>

            {/* Content Area (Bottom) */}
            <div className="px-5 pb-5 pt-1 relative">
               {/* Name */}
               <div className="flex items-center justify-between mb-4">
                   <div>
                     <h2 className="text-gray-900 font-bold text-xl flex items-center gap-2">
                       Mentarc
                       <Sparkles size={16} className="text-indigo-500 fill-indigo-500" />
                     </h2>
                     <p className="text-xs text-gray-400 font-medium mt-0.5">AI决策分身</p>
                   </div>
               </div>

               {/* Integrated Stats */}
               <div className="space-y-3 bg-gray-50/80 rounded-2xl p-3.5 border border-gray-100/50">
                  {!userProfile.isOnboarded ? (
                    <div className="py-2 flex flex-col items-center justify-center gap-2">
                       <div className="flex items-center gap-1.5 text-gray-400">
                         <Activity size={14} />
                         <span className="text-[10px] font-bold uppercase tracking-wider">等待初始化训练</span>
                       </div>
                       <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                         <div className="h-full w-1/4 bg-gray-300 rounded-full"></div>
                       </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] items-center">
                          <span className="text-gray-500 font-medium">业务理解力</span>
                          <span className="text-indigo-600 font-bold">78%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-200/60 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '78%' }} className="h-full bg-indigo-500 rounded-full" />
                        </div>
                        <p className="text-[9px] text-gray-400 font-medium leading-tight">已掌握核心业务信息，持续学习中</p>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] items-center">
                          <span className="text-gray-500 font-medium">任务执行力</span>
                          <span className="text-purple-600 font-bold">运行中</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-200/60 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full bg-purple-500 rounded-full" />
                        </div>
                        <p className="text-[9px] text-gray-400 font-medium leading-tight">已持续运行12天，提出36项行动建议</p>
                      </div>
                    </>
                  )}
               </div>
            </div>
          </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-50 mx-6 mb-2"></div>

      {/* 2. Work Dashboard Section */}
      <div className="flex-1 px-4 flex flex-col overflow-hidden">
        <div className="px-4 mb-3 mt-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">工作看板</span>
        </div>

        <div className="space-y-1 flex-1 overflow-y-auto custom-scrollbar">
          {/* Workbench */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full px-4 py-3.5 rounded-xl transition-all group flex items-center justify-between ${
              activeTab === 'dashboard'
                ? 'bg-indigo-50 text-indigo-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
             <div className="flex items-center gap-3">
               <LayoutDashboard size={20} className={activeTab === 'dashboard' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'} />
               <span className="font-bold text-sm">发起任务</span>
             </div>
             {activeTab === 'dashboard' && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>}
          </button>

          {/* Automation */}
          <button
            onClick={() => setActiveTab('automation')}
            className={`w-full px-4 py-3.5 rounded-xl transition-all group flex items-center justify-between ${
              activeTab === 'automation'
                ? 'bg-purple-50 text-purple-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
             <div className="flex items-center gap-3">
               <Bot size={20} className={activeTab === 'automation' ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-600'} />
               <div className="flex flex-col items-start">
                 <span className="font-bold text-sm">自动运行</span>
               </div>
             </div>
             {activeTab === 'automation' && <Activity size={14} className="text-purple-500 animate-pulse" />}
          </button>

          {/* Assets */}
          <button
            onClick={() => setActiveTab('assets')}
            className={`w-full px-4 py-3.5 rounded-xl transition-all group flex items-center justify-between ${
              activeTab === 'assets'
                ? 'bg-blue-50 text-blue-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
             <div className="flex items-center gap-3">
               <Database size={20} className={activeTab === 'assets' ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'} />
               <span className="font-bold text-sm">任务结果</span>
             </div>
          </button>
        </div>
      </div>

      {/* 3. Settings */}
      <div className="p-4 border-t border-gray-50 space-y-1">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            resetApp();
          }}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-red-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <RefreshCw size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-red-600 transition-colors">初始化</span>
          </div>
        </button>
        <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors group">
          <div className="flex items-center gap-3">
            <Settings size={18} className="text-gray-400 group-hover:text-gray-600" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">账户设置</span>
          </div>
          <span className="text-[10px] font-bold text-gray-300 group-hover:text-indigo-500 transition-colors">PRO</span>
        </button>
      </div>

    </div>
  );
}
