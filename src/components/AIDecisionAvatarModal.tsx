import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, TrendingUp, Activity, Target, Brain, History, ChevronRight, MessageSquare, Globe, Zap, Bot, CheckCircle2, Shield, Rocket, Palette, BarChart3, Plus } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

interface AIDecisionAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIDecisionAvatarModal({ isOpen, onClose }: AIDecisionAvatarModalProps) {
  const { userProfile, setUserProfile, setActiveTab, startInEditMode, setStartInEditMode } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Onboarding State
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isOpen && startInEditMode) {
      setIsEditing(true);
      // Reset the flag so it doesn't persist
      setStartInEditMode(false);
    }
  }, [isOpen, startInEditMode, setStartInEditMode]);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [productInput, setProductInput] = useState('');
  const [products, setProducts] = useState<string[]>([]);
  const [marketInput, setMarketInput] = useState('');
  const [markets, setMarkets] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Personas
  const personas = [
    { id: 'professional', name: '专业稳重型', icon: <Shield size={20} />, color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { id: 'growth', name: '增长进攻型', icon: <Rocket size={20} />, color: 'bg-orange-50 text-orange-600 border-orange-100' },
    { id: 'brand', name: '品牌打造型', icon: <Palette size={20} />, color: 'bg-purple-50 text-purple-600 border-purple-100' },
    { id: 'data', name: '数据分析型', icon: <BarChart3 size={20} />, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  ];

  const handleAddProduct = () => {
    if (productInput.trim() && !products.includes(productInput.trim())) {
      setProducts([...products, productInput.trim()]);
      setProductInput('');
    }
  };

  const handleAddMarket = () => {
    if (marketInput.trim() && !markets.includes(marketInput.trim())) {
      setMarkets([...markets, marketInput.trim()]);
      setMarketInput('');
    }
  };

  const handleCompleteOnboarding = () => {
    if (!selectedPersona) return;

    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}`;
    
    const productsStr = products.length > 0 ? products.join('/') : '未设定';
    const marketsStr = markets.length > 0 ? markets.join('/') : '未设定';

    setUserProfile({
      ...userProfile,
      isOnboarded: true,
      mainProducts: products.join(', '),
      targetMarket: markets.join(', '),
      persona: selectedPersona,
      timeline: [
        ...(userProfile.timeline || []),
        { 
          date: dateStr, 
          content: `完成初始化训练：主营 ${productsStr}，市场 ${marketsStr}`, 
          type: 'onboarding' 
        }
      ]
    });

    // Reset local onboarding state
    setProducts([]);
    setMarkets([]);
    setSelectedPersona(null);
    setOnboardingStep(1);

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const getCognitionSummary = () => {
    return `你主营 ${userProfile.mainProducts || 'LED Strip Light'}，\n重点市场为 ${userProfile.targetMarket || 'Germany'}，\n当前目标是拓展分销商。`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-gray-100"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100">
                  <Bot className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    AI 决策分身
                    <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-bold rounded-full uppercase tracking-wider">Beta</span>
                  </h2>
                  <p className="text-gray-400 text-[10px] font-medium">通过对话训练，让 AI 成为你的业务专家</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 flex overflow-hidden">
              
              {/* Main Content */}
              <div className="w-full flex flex-col bg-gray-50/30 overflow-y-auto custom-scrollbar">
                
                {!userProfile.isOnboarded ? (
                  <div className="flex-1 flex flex-col p-8">
                    {/* Onboarding Header */}
                    <div className="mb-8">
                      <p className="text-gray-500 text-sm leading-relaxed">
                        设定数字形象 + 主营产品 + 目标市场。
                      </p>
                    </div>

                    {/* Step 1: Persona */}
                    {onboardingStep === 1 && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">Step 1</span>
                          <h4 className="text-sm font-bold text-gray-900">设定数字形象</h4>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {personas.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => {
                                setSelectedPersona(p.id);
                                setTimeout(() => setOnboardingStep(2), 500);
                              }}
                              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-3 ${
                                selectedPersona === p.id 
                                  ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100' 
                                  : 'border-gray-100 bg-white hover:border-indigo-200'
                              }`}
                            >
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${p.color} border`}>
                                {p.icon}
                              </div>
                              <span className="text-xs font-bold text-gray-900">{p.name}</span>
                            </button>
                          ))}
                        </div>
                        <p className="text-[11px] text-gray-400 text-center">这将影响我与你的协作风格与建议偏好。</p>
                      </motion.div>
                    )}

                    {/* Step 2: Business Info */}
                    {onboardingStep === 2 && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">Step 2</span>
                          <h4 className="text-sm font-bold text-gray-900">业务核心信息</h4>
                        </div>

                        {/* Products */}
                        <div className="space-y-3">
                          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">1、主营产品（标签输入）</label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {products.map((p, i) => (
                              <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg border border-indigo-100 flex items-center gap-1">
                                {p}
                                <button onClick={() => setProducts(products.filter((_, idx) => idx !== i))}><X size={10} /></button>
                              </span>
                            ))}
                          </div>
                          <div className="relative">
                            <input 
                              type="text"
                              value={productInput}
                              onChange={(e) => setProductInput(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleAddProduct()}
                              placeholder="如：LED Strip Light / Ceramic Tableware"
                              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                            <button onClick={handleAddProduct} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gray-50 rounded-lg text-gray-400 hover:text-indigo-600">
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Markets */}
                        <div className="space-y-3">
                          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">2、目标市场（国家标签）</label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {markets.map((m, i) => (
                              <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100 flex items-center gap-1">
                                {m}
                                <button onClick={() => setMarkets(markets.filter((_, idx) => idx !== i))}><X size={10} /></button>
                              </span>
                            ))}
                          </div>
                          <div className="relative">
                            <input 
                              type="text"
                              value={marketInput}
                              onChange={(e) => setMarketInput(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleAddMarket()}
                              placeholder="输入国家名称，按回车添加"
                              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                            <button onClick={handleAddMarket} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gray-50 rounded-lg text-gray-400 hover:text-indigo-600">
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={handleCompleteOnboarding}
                          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 disabled:shadow-none mt-4"
                        >
                          完成启动
                        </button>
                      </motion.div>
                    )}

                    {/* Success Overlay */}
                    <AnimatePresence>
                      {showSuccess && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-8 text-center"
                        >
                          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                            <CheckCircle2 className="text-green-600" size={40} />
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">✅ 基础业务认知已建立</h4>
                          <p className="text-gray-500 text-sm">完成度 45%</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex-1 p-6 space-y-8">
                    {/* Section 1: Business Cognition */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          <Brain size={18} className="text-indigo-600" />
                          当前业务认知
                        </h3>
                        {!isEditing && (
                          <button 
                            onClick={() => {
                              // Sync local state with profile
                              setProducts(userProfile.mainProducts?.split(', ') || []);
                              setMarkets(userProfile.targetMarket?.split(', ') || []);
                              setSelectedPersona(userProfile.persona || 'growth');
                              setIsEditing(true);
                            }}
                            className="px-3 py-1.5 bg-white text-indigo-600 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors border border-indigo-100 flex items-center gap-1.5"
                          >
                            调整设定
                          </button>
                        )}
                      </div>
                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line font-medium">
                          {getCognitionSummary()}
                        </p>
                      </div>
                    </div>

                    {/* Section 2: Manual Modification (Expanded) */}
                    {isEditing && (
                      <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          结构化编辑
                        </h3>
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-2xl p-6 border border-gray-200 space-y-6"
                        >
                          {/* Persona Selection */}
                          <div className="space-y-3">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">数字形象</label>
                            <div className="grid grid-cols-2 gap-2">
                              {personas.map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() => {
                                    setSelectedPersona(p.id);
                                    setUserProfile({ ...userProfile, persona: p.id });
                                  }}
                                  className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
                                    (selectedPersona || userProfile.persona) === p.id 
                                      ? 'border-indigo-600 bg-indigo-50' 
                                      : 'border-gray-100 hover:border-indigo-100'
                                  }`}
                                >
                                  <div className={`w-6 h-6 rounded flex items-center justify-center ${p.color} scale-75`}>
                                    {p.icon}
                                  </div>
                                  <span className="text-[10px] font-bold text-gray-900">{p.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Products Tag Editor */}
                          <div className="space-y-3">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">主营产品</label>
                            <div className="flex flex-wrap gap-2">
                              {(userProfile.mainProducts?.split(', ') || []).map((p, i) => (
                                <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg border border-indigo-100 flex items-center gap-1">
                                  {p}
                                  <button onClick={() => {
                                    const newProducts = (userProfile.mainProducts?.split(', ') || []).filter((_, idx) => idx !== i);
                                    setUserProfile({ ...userProfile, mainProducts: newProducts.join(', ') });
                                  }}><X size={10} /></button>
                                </span>
                              ))}
                              <div className="relative flex-1 min-w-[120px]">
                                <input 
                                  type="text"
                                  value={productInput}
                                  onChange={(e) => setProductInput(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && productInput.trim()) {
                                      const current = userProfile.mainProducts?.split(', ') || [];
                                      if (!current.includes(productInput.trim())) {
                                        setUserProfile({ ...userProfile, mainProducts: [...current, productInput.trim()].join(', ') });
                                        setProductInput('');
                                      }
                                    }
                                  }}
                                  placeholder="添加产品..."
                                  className="w-full bg-gray-50 border-none rounded-lg px-2 py-1 text-[10px] focus:ring-1 focus:ring-indigo-500"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Markets Tag Editor */}
                          <div className="space-y-3">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">目标市场</label>
                            <div className="flex flex-wrap gap-2">
                              {(userProfile.targetMarket?.split(', ') || []).map((m, i) => (
                                <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg border border-emerald-100 flex items-center gap-1">
                                  {m}
                                  <button onClick={() => {
                                    const newMarkets = (userProfile.targetMarket?.split(', ') || []).filter((_, idx) => idx !== i);
                                    setUserProfile({ ...userProfile, targetMarket: newMarkets.join(', ') });
                                  }}><X size={10} /></button>
                                </span>
                              ))}
                              <div className="relative flex-1 min-w-[120px]">
                                <input 
                                  type="text"
                                  value={marketInput}
                                  onChange={(e) => setMarketInput(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && marketInput.trim()) {
                                      const current = userProfile.targetMarket?.split(', ') || [];
                                      if (!current.includes(marketInput.trim())) {
                                        setUserProfile({ ...userProfile, targetMarket: [...current, marketInput.trim()].join(', ') });
                                        setMarketInput('');
                                      }
                                    }
                                  }}
                                  placeholder="添加市场..."
                                  className="w-full bg-gray-50 border-none rounded-lg px-2 py-1 text-[10px] focus:ring-1 focus:ring-indigo-500"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button 
                              onClick={() => setIsEditing(false)}
                              className="w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors"
                            >
                              完成修改
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {/* Section 3: AI Cognitive Suggestions */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        AI 认知建议
                      </h3>
                      
                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                            <Sparkles size={14} />
                            2个待跟进的建议
                          </div>
                        </div>

                        <div className="space-y-6">
                          {/* Suggestion 1: Data Completion */}
                          <div className="flex items-center justify-between gap-6">
                            <div className="flex-1 space-y-1.5">
                              <div className="flex items-center gap-2 text-gray-900 font-bold text-[11px]">
                                <Brain size={14} className="text-indigo-600" />
                                认知可进一步完善
                              </div>
                              <p className="text-gray-500 text-[11px] leading-relaxed">
                                提供企业官网或产品资料，我可以自动分析并补齐产品结构与市场定位。
                              </p>
                            </div>
                            <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[11px] font-bold hover:bg-indigo-100 transition-colors border border-indigo-100 whitespace-nowrap">
                              立即补充
                            </button>
                          </div>

                          <div className="h-px bg-gray-50 w-full" />

                          {/* Suggestion 2: Behavior Shift */}
                          <div className="flex items-center justify-between gap-6">
                            <div className="flex-1 space-y-1.5">
                              <div className="flex items-center gap-2 text-gray-900 font-bold text-[11px]">
                                <Brain size={14} className="text-orange-600" />
                                认知变化提醒
                              </div>
                              <p className="text-gray-500 text-[11px] leading-relaxed">
                                过去 14 天你频繁关注东南亚市场。是否设为重点区域？
                              </p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button className="px-4 py-2 bg-orange-50 text-orange-600 rounded-xl text-[11px] font-bold hover:bg-orange-100 transition-colors border border-orange-100 whitespace-nowrap">
                                设为重点
                              </button>
                              <button className="px-4 py-2 bg-gray-50 text-gray-400 rounded-xl text-[11px] font-bold hover:bg-gray-100 transition-colors whitespace-nowrap">
                                忽略
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer - Removed Initialize Button as per request */}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


