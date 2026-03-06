import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  TrendingUp, 
  Zap, 
  ArrowRight, 
  Send, 
  Paperclip, 
  Sparkles, 
  Globe, 
  CheckCircle2,
  PenTool,
  BarChart2,
  Clock,
  MoreHorizontal,
  Target,
  Users,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function Dashboard() {
  const { 
    userProfile, 
    setUserProfile, 
    isEditingProfile, 
    setIsEditingProfile, 
    setActiveTab,
    setAutomationTab 
  } = useApp();
  const [websiteInput, setWebsiteInput] = useState(userProfile.website || '');
  const [mainProductsInput, setMainProductsInput] = useState(userProfile.mainProducts || '');
  const [targetMarketInput, setTargetMarketInput] = useState(userProfile.targetMarket || '');
  const [businessGoalsInput, setBusinessGoalsInput] = useState(userProfile.businessGoals || '');
  const [businessStageInput, setBusinessStageInput] = useState(userProfile.businessStage || 'startup');
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [showChatOverlay, setShowChatOverlay] = useState(false);
  
  // Onboarding Modal State
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [tempAvatarSeed, setTempAvatarSeed] = useState('Aria');
  const [tempPrefs, setTempPrefs] = useState<string[]>(userProfile.preferences || []);

  const preferenceOptions = ['健身器材', '智能健身', '南美市场', '北美市场', '欧洲市场', '跨境电商', '品牌出海', '社媒营销', '独立站运营'];

  const [isTraining, setIsTraining] = useState(false);

  const calculateCompleteness = () => {
    let score = 0;
    if (userProfile.website) score += 1;
    if (userProfile.mainProducts) score += 1;
    if (userProfile.targetMarket) score += 1;
    if (userProfile.businessGoals) score += 1;
    if (userProfile.businessStage) score += 1;
    if (userProfile.preferences && userProfile.preferences.length > 0) score += 1;
    return Math.round((score / 6) * 100);
  };
  const completeness = calculateCompleteness();

  const handleStartTraining = async () => {
    setIsTraining(true);
    
    // Simulate AI "understanding" and "extracting" brand genes
    await new Promise(resolve => setTimeout(resolve, 2000));

    setUserProfile({
      ...userProfile,
      website: websiteInput,
      mainProducts: mainProductsInput,
      targetMarket: targetMarketInput,
      businessGoals: businessGoalsInput,
      businessStage: businessStageInput,
      preferences: tempPrefs,
      avatarUrl: `https://api.dicebear.com/9.x/lorelei/svg?seed=${tempAvatarSeed}&backgroundColor=c7d2fe`,
      isOnboarded: true
    });
    
    setIsTraining(false);
    setShowOnboarding(false);
    setIsEditingProfile(true); // Open the AI Decision Avatar modal after training
  };

  const togglePref = (pref: string) => {
    setTempPrefs(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  // Mock data for the dashboard
  const insights = [
    {
      id: 1,
      icon: Search,
      title: '趋势监测',
      content: '巴西及智利市场对“家用智能健身器材”检索热度激增 45%',
      action: 'automation',
      tab: 'trend',
      suggestion: '分析巴西及智利市场健身器材趋势并提供拓展建议',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      id: 2,
      icon: TrendingUp,
      title: '社媒热点',
      content: '#HomeGym 话题互动率提升，用户关注“可折叠跑步机”',
      action: 'automation',
      tab: 'social',
      suggestion: '分析 #HomeGym 话题下的产品机会并提供复刻方案',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    setIsChatLoading(true);
    setShowChatOverlay(true);
    setChatResponse(null);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `
          Role: Mentarc AI Trade Assistant.
          Context: User website is ${userProfile.website}. Main Products: ${userProfile.mainProducts}. Business Stage: ${userProfile.businessStage}. Preferences: ${userProfile.preferences.join(',')}.
          Task: ${chatInput}
          Output: Provide a structured, professional response in Markdown.
        `,
      });
      setChatResponse(response.text || "No response received.");
    } catch (error) {
      setChatResponse("Sorry, I encountered an error. Please try again.");
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col relative max-w-4xl mx-auto w-full">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Mentarc，<span className="text-indigo-600">懂你业务的专属拍档</span>
        </h1>
      </div>

      {/* Unified AI Monitor Module */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-12 relative overflow-hidden">
        
        {/* Module Header: AI Monitor Status */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 overflow-hidden flex items-center justify-center">
                        <img src={userProfile.avatarUrl || "https://api.dicebear.com/9.x/lorelei/svg?seed=Aria&backgroundColor=c7d2fe"} alt="AI" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${userProfile.isOnboarded ? 'bg-green-500' : 'bg-gray-400'}`}>
                        {userProfile.isOnboarded && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        {userProfile.isOnboarded ? '机会发现' : '👉 只要30s，训练Mentarc'}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                            {!userProfile.isOnboarded ? (
                              <span className="text-indigo-600/80 font-medium">让它立即替你思考、判断，并推进增长动作</span>
                            ) : (
                              <span className="text-indigo-600 font-bold">1个决策建议待评估</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {!userProfile.isOnboarded && (
              <button 
                onClick={() => setIsEditingProfile(true)}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
              >
                开始训练
                <ArrowRight size={18} />
              </button>
            )}
            {userProfile.isOnboarded && (
              <button 
                onClick={() => setActiveTab('automation')}
                className="text-indigo-600 px-4 py-2 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-1.5 text-sm"
              >
                详情
                <ArrowRight size={16} />
              </button>
            )}
        </div>

        {/* Onboarding Card for New Users - Removed redundant card as text is now in header */}

        {/* Module Content: Growth Actions */}
        <div className={!userProfile.isOnboarded ? 'opacity-80' : ''}>
            <div className="mb-2">
              <h3 className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles size={12} className="text-indigo-500" />
                我将为你提供行动建议：
              </h3>
            </div>
            <div className="space-y-1.5">
                {insights.map((item) => (
                    <motion.div 
                      key={item.id}
                      whileHover={{ x: 4 }}
                      onClick={() => {
                        if (!userProfile.isOnboarded) {
                          setIsEditingProfile(true);
                        } else {
                          setChatInput((item as any).suggestion || '');
                        }
                      }}
                      className="bg-gray-50/50 p-2.5 rounded-xl border border-gray-100/50 hover:bg-white hover:shadow-sm hover:border-indigo-100 transition-all group flex flex-col md:flex-row items-start md:items-center justify-between gap-3 cursor-pointer"
                    >
                        <div className="flex items-center gap-3 flex-1">
                           <div className={`w-8 h-8 rounded-lg ${item.bg} ${item.color} flex items-center justify-center flex-shrink-0`}>
                             <item.icon size={16} />
                           </div>
                           <div className="flex-1">
                             <h3 className="font-bold text-gray-900 text-xs mb-0.5">{item.title}</h3>
                             <p className="text-[11px] text-gray-500 leading-tight line-clamp-1">
                               {!userProfile.isOnboarded ? (
                                 item.id === 1 ? '持续追踪与你行业相关的全球市场变化与增长信号' :
                                 item.id === 2 ? '筛选与你产品匹配的热门话题与内容机会' :
                                 '获取买家深度报告，个性化开发'
                               ) : item.content}
                             </p>
                           </div>
                        </div>
                        
                        {userProfile.isOnboarded && (
                          <div className="flex items-center">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setChatInput((item as any).suggestion || '');
                              }}
                              className="w-full md:w-auto px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all bg-white border border-gray-100 text-gray-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 shadow-sm flex items-center justify-center gap-1.5"
                            >
                              <span>{item.action === 'automation' ? '立即分析' : '立即背调'}</span>
                              <ArrowRight size={12} />
                            </button>
                          </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>

      </div>

      {/* Onboarding Modal */}
      <AnimatePresence>
        {showOnboarding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOnboarding(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-8 pt-8 pb-4 border-b border-gray-50">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">训练 Mentarc</h2>
                  <button onClick={() => setShowOnboarding(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreHorizontal size={20} className="text-gray-400" />
                  </button>
                </div>

                {/* Stepper */}
                <div className="flex items-center justify-between relative px-4">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        onboardingStep >= step ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white border-2 border-gray-100 text-gray-400'
                      }`}>
                        {step}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${onboardingStep >= step ? 'text-indigo-600' : 'text-gray-400'}`}>
                        {step === 1 ? '形象设置' : step === 2 ? '偏好设置' : '业务培训'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
                {isTraining && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-20 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="relative mb-8">
                      <div className="w-24 h-24 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">正在深度训练...</h3>
                    <p className="text-gray-500 max-w-xs">Mentarc 正在自动理解您的业务，提取品牌基因并存入您的 AI 决策分身</p>
                  </motion.div>
                )}

                {onboardingStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-50 border-4 border-white shadow-xl mx-auto overflow-hidden mb-6">
                        <img src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${tempAvatarSeed}&backgroundColor=c7d2fe`} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">设置 AI 形象</h3>
                      <p className="text-gray-500 text-sm">选择一个你喜欢的 AI 拍档形象</p>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {['Aria', 'Felix', 'Bear', 'Luna', 'Max', 'Zoe', 'Leo', 'Milo'].map((seed) => (
                        <button 
                          key={seed}
                          onClick={() => setTempAvatarSeed(seed)}
                          className={`aspect-square rounded-2xl border-2 transition-all overflow-hidden ${
                            tempAvatarSeed === seed ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-gray-100 hover:border-indigo-200'
                          }`}
                        >
                          <img src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}&backgroundColor=c7d2fe`} alt={seed} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {onboardingStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">偏好设置</h3>
                      <p className="text-gray-500 text-sm">引导选择你的目标偏好，让 AI 更懂你的关注点</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {preferenceOptions.map((pref) => (
                        <button 
                          key={pref}
                          onClick={() => togglePref(pref)}
                          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                            tempPrefs.includes(pref) 
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100' 
                              : 'bg-white text-gray-600 border-gray-100 hover:border-indigo-200'
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {onboardingStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">业务培训</h3>
                      <p className="text-gray-500 text-sm">输入企业信息，AI 将自动理解并提取品牌基因</p>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">企业网址</label>
                          <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              type="text" 
                              value={websiteInput}
                              onChange={(e) => setWebsiteInput(e.target.value)}
                              placeholder="www.yourcompany.com"
                              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">主营产品</label>
                          <input 
                            type="text" 
                            value={mainProductsInput}
                            onChange={(e) => setMainProductsInput(e.target.value)}
                            placeholder="例如：智能跑步机"
                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">目标市场</label>
                          <input 
                            type="text" 
                            value={targetMarketInput}
                            onChange={(e) => setTargetMarketInput(e.target.value)}
                            placeholder="例如：南美, 欧洲"
                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">业务目标</label>
                          <input 
                            type="text" 
                            value={businessGoalsInput}
                            onChange={(e) => setBusinessGoalsInput(e.target.value)}
                            placeholder="例如：品牌出海, 获客增长"
                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">业务阶段</label>
                        <div className="grid grid-cols-3 gap-3">
                          {['startup', 'growth', 'mature'].map((stage) => (
                            <button 
                              key={stage}
                              onClick={() => setBusinessStageInput(stage)}
                              className={`py-3 rounded-2xl text-xs font-bold capitalize transition-all border ${
                                businessStageInput === stage 
                                  ? 'bg-indigo-600 text-white border-indigo-600' 
                                  : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-indigo-200'
                              }`}
                            >
                              {stage === 'startup' ? '初创期' : stage === 'growth' ? '成长期' : '成熟期'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
                <button 
                  onClick={() => onboardingStep > 1 && setOnboardingStep(onboardingStep - 1)}
                  className={`text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors ${onboardingStep === 1 ? 'invisible' : ''}`}
                >
                  上一步
                </button>
                <div className="flex items-center gap-3">
                  {onboardingStep < 3 ? (
                    <button 
                      onClick={() => setOnboardingStep(onboardingStep + 1)}
                      className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                      下一步
                    </button>
                  ) : (
                    <button 
                      onClick={handleStartTraining}
                      disabled={isTraining}
                      className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isTraining ? '训练中...' : '立即训练'}
                      {!isTraining && <Sparkles size={18} />}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Chat Overlay (Results) */}
      <AnimatePresence>
        {showChatOverlay && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-28 left-0 right-0 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 max-h-[60vh] overflow-y-auto z-20 mx-4"
          >
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
               <h3 className="font-bold text-gray-900 flex items-center gap-2">
                 <Sparkles size={18} className="text-indigo-600" />
                 AI 分析结果
               </h3>
               <button onClick={() => setShowChatOverlay(false)} className="text-gray-400 hover:text-gray-600">
                 关闭
               </button>
            </div>
            
            {isChatLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-2 text-indigo-600 font-medium">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></span>
                  正在深度思考中...
                </div>
              </div>
            ) : (
              <div className="markdown-body text-sm text-gray-700 leading-relaxed">
                <ReactMarkdown>{chatResponse || ''}</ReactMarkdown>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unified Input Area (Fixed Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc] to-transparent z-10">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-indigo-100/50 border border-white p-2 flex flex-col gap-2">
          <div className="relative flex items-center">
             <div className="pl-4 text-gray-400">
               <Sparkles size={20} />
             </div>
             <input 
               type="text"
               value={chatInput}
               onChange={(e) => setChatInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
               placeholder="帮我分析「健身器材」在 Twitter/Reddit/LinkedIn 等平台的讨论热点和市场机会"
               className="w-full py-4 px-4 bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400 text-base"
             />
             <div className="flex items-center gap-2 pr-2">
               <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                 <Paperclip size={20} />
               </button>
               <button 
                 onClick={handleSendMessage}
                 className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-200"
               >
                 发送 <Send size={16} />
               </button>
             </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex justify-center gap-3 mt-4">
          <button 
            onClick={() => setChatInput('机会分析')}
            className="bg-white px-4 py-2 rounded-xl text-xs font-medium text-gray-600 shadow-sm border border-white hover:border-indigo-100 hover:text-indigo-600 transition-all flex items-center gap-2"
          >
            <TrendingUp size={14} /> 机会分析
          </button>
          <button 
            onClick={() => setChatInput('买家跟进')}
            className="bg-white px-4 py-2 rounded-xl text-xs font-medium text-gray-600 shadow-sm border border-white hover:border-indigo-100 hover:text-indigo-600 transition-all flex items-center gap-2"
          >
            <Users size={14} /> 买家跟进
          </button>
          <button 
            onClick={() => setChatInput('内容生成')}
            className="bg-white px-4 py-2 rounded-xl text-xs font-medium text-gray-600 shadow-sm border border-white hover:border-indigo-100 hover:text-indigo-600 transition-all flex items-center gap-2"
          >
            <PenTool size={14} /> 内容生成
          </button>
        </div>
      </div>
    </div>
  );
}
