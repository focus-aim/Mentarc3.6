import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  TrendingUp, 
  MessageSquare, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  History, 
  Settings, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  Search,
  Database,
  Signal,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  Calendar,
  Bell,
  Brain
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Opportunity {
  id: string;
  type: 'trend' | 'social' | 'composite';
  title: string;
  strength: 'high' | 'medium' | 'low' | 'extreme';
  strengthValue: number;
  aiJudgment: string;
  suggestedAction: string;
  actionLabel: string;
  details: {
    keywordChange: string;
    interactions: string;
    platforms: string[];
    summary: string;
  };
}

const Automation: React.FC = () => {
  const { setActiveTab, automationTab, setAutomationTab, setIsEditingProfile, setStartInEditMode } = useApp();
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [monitoringCycle, setMonitoringCycle] = useState<'daily' | 'weekly'>('weekly');
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');

  const trendSignals = [
    { keyword: 'Smart Solar Flood Light', status: '飙升 ↑43%', strength: '极高', judgment: 'AI判断：户外安装需求增长明显' },
    { keyword: 'Commercial LED Retrofit', status: '稳定', strength: '高', judgment: 'AI判断：适合长期布局SEO' },
    { keyword: 'Motion Sensor Wall Light', status: '飙升 ↑28%', strength: '极高', judgment: 'AI判断：安防需求带动感应灯具热度' },
    { keyword: 'Industrial High Bay LED', status: '稳定', strength: '高', judgment: 'AI判断：仓储物流扩张维持工业照明需求' },
    { keyword: 'Portable Work Light', status: '蓝海', strength: '中', judgment: 'AI判断：便携式照明细分市场潜力大' },
    { keyword: 'Smart Dimmer Switch', status: '蓝海', strength: '中', judgment: 'AI判断：智能家居配套产品竞争尚不激烈' },
    { keyword: 'RGB Garden Spike', status: '回落', strength: '低', judgment: 'AI判断：季节性需求进入淡季' }
  ];

  const socialSignals = [
    { 
      platform: 'Reddit', 
      topic: 'Anyone here using solar flood lights for commercial yards? Need durability advice.', 
      tags: ['Durability', 'Solar Lighting'],
      subreddit: 'r/lighting',
      upvotes: 14,
      comments: 32,
      timeAgo: '3d ago',
      judgment: 'AI判断：耐用性与商业场景适配度是核心痛点' 
    },
    { 
      platform: 'Reddit', 
      topic: 'What are practical ways to install motion sensor LEDs without heavy wiring?', 
      tags: ['Installation', 'Smart Home'],
      subreddit: 'r/DIY',
      upvotes: 8,
      comments: 17,
      timeAgo: '5d ago',
      judgment: 'AI判断：简易安装是感应灯具的高频搜索词' 
    },
    { 
      platform: 'Reddit', 
      topic: 'How do you actually source reliable LED suppliers? It\'s getting hard to find quality.', 
      tags: ['Sourcing', 'Quality Control'],
      subreddit: 'r/procurement',
      upvotes: 25,
      comments: 42,
      timeAgo: '1w ago',
      judgment: 'AI判断：品质背书与供应链透明度需求激增' 
    }
  ];

  const historyData = [
    { week: '第1周', index: 65, change: 0, opportunities: 12, actions: 8, summary: '系统初始化完成，识别基础市场信号。' },
    { week: '第2周', index: 72, change: 7, opportunities: 15, actions: 10, summary: '信号捕获精度提升，识别出太阳能照明增长点。' },
    { week: '第3周', index: 82, change: 10, opportunities: 18, actions: 12, summary: '多维度信号复合，确定耐用性为当前核心突破口。' }
  ];

  return (
    <div className="h-full flex flex-col space-y-6 max-w-5xl mx-auto px-4 py-6 overflow-y-auto relative">
      {/* Debug Marker */}
      <div className="hidden">v2-data-visible</div>

      {/* Page Header Actions */}
      <div className="flex justify-end">
        <button 
          onClick={() => setShowHistory(true)}
          className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-indigo-600 hover:bg-white bg-white/50 backdrop-blur-sm rounded-xl transition-all flex items-center gap-2 shadow-sm border border-gray-100"
        >
          <History size={14} />
          查看历史
        </button>
      </div>

      {/* Layer 1: Task Overview & AI Suggestion */}
      <section className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden flex-shrink-0">
        {/* Header Bar */}
        <div className="p-6 flex items-center justify-between border-b border-gray-50">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400"
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-lg font-bold text-gray-900">机会发现 · 运行中</h1>
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                <span>已运行 <span className="text-gray-900">12</span> 天</span>
                <span className="text-gray-200">｜</span>
                <span>本周新增 <span className="text-indigo-600 font-bold">3</span> 个机会</span>
                <span className="text-gray-200">｜</span>
                <span>累计信号 <span className="text-gray-900">28</span> 条</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setStartInEditMode(true);
                setIsEditingProfile(true);
              }}
              className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all flex items-center gap-2"
            >
              <Settings size={14} />
              调整设置
            </button>
            <button 
              onClick={() => setShowSettings(true)}
              className="px-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all flex items-center gap-2"
            >
              <Bell size={14} />
              接收提醒
            </button>
          </div>
        </div>

        {/* AI Decision Suggestion (Integrated) */}
        <div className="p-6 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Brain size={100} className="text-indigo-600" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md">
                <Zap className="text-white" size={12} />
              </div>
              <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">AI 决策建议</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <p className="text-sm font-medium text-gray-800 leading-relaxed mb-3">
                  🧠 监测发现：德国市场趋于饱和，周边需求激增。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      波兰、荷兰对 <span className="text-indigo-600 font-bold">LED Strip Light</span> 询盘增长 <span className="text-green-600 font-bold">18%</span>，且竞争更低。
                    </p>
                  </div>
                  <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 flex items-center">
                    <p className="text-xs font-bold text-gray-900">
                      建议拓展东欧机会：<span className="font-normal text-gray-600">将波兰纳入次级目标市场。</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-4 flex flex-col gap-2">
                <button className="w-full py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                  加入目标市场
                </button>
                <button className="w-full py-2 text-gray-400 text-[10px] font-bold hover:text-gray-600 transition-all">
                  暂不调整
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 2: Opportunity Signals */}
      <section className="flex-shrink-0 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-gray-900">本周期机会信号</h2>
          <div className="flex bg-gray-50 p-1 rounded-xl">
            <button
              onClick={() => setAutomationTab('trend')}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                automationTab === 'trend' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              趋势监测
            </button>
            <button
              onClick={() => setAutomationTab('social')}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                automationTab === 'social' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              社媒热点
            </button>
          </div>
        </div>
        <div className="space-y-0 border-t border-gray-100">
          {automationTab === 'trend' ? (
            trendSignals.map((signal, i) => (
              <div key={`trend-${i}`} className="flex items-center justify-between p-5 border-b border-gray-100 hover:bg-gray-50/50 transition-all">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-gray-900">{signal.keyword}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-md">{signal.judgment}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">状态</p>
                    <span className={`text-xs font-black ${signal.status.includes('飙升') ? 'text-red-500' : 'text-green-600'}`}>{signal.status}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">强度</p>
                    <span className="text-xs font-black text-gray-900">{signal.strength}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            socialSignals.map((signal, i) => (
              <div key={`social-${i}`} className="p-6 border-b border-gray-100 hover:bg-gray-50/50 transition-all group">
                <div className="flex items-start gap-3 mb-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-[#FF4500] flex items-center justify-center">
                      <MessageSquare size={12} className="text-white fill-white" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-indigo-600 transition-colors">
                    {signal.topic}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4 ml-8">
                  {signal.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-500 text-[11px] font-medium rounded-full border border-gray-100">
                      {tag}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[11px] font-bold rounded-full border border-indigo-100">
                    {signal.judgment}
                  </span>
                </div>

                <div className="flex items-center justify-between ml-8">
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                    <span className="hover:text-gray-600 cursor-pointer">{signal.subreddit}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <div className="flex items-center gap-1">
                      <ArrowUpRight size={12} />
                      {signal.upvotes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={12} />
                      {signal.comments}
                    </div>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{signal.timeAgo}</span>
                  </div>
                  <div className="text-gray-300">
                    <AlertTriangle size={14} className="rotate-180" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* History Trajectory Modal */}
      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <History size={24} className="text-indigo-600" />
                  历史运行轨迹
                </h2>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronDown size={24} className="text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                  {historyData.map((item, i) => (
                    <div key={i} className="relative pl-12">
                      <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center z-10 shadow-sm">
                        <span className="text-[10px] font-black text-indigo-600">{i + 1}</span>
                      </div>
                      <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-gray-900">{item.week}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">机会指数</span>
                            <span className="text-xl font-black text-indigo-600">{item.index}</span>
                            {item.change > 0 && (
                              <span className="text-xs font-bold text-green-500 flex items-center">
                                <ArrowUpRight size={14} />
                                {item.change}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-white rounded-xl p-3 border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">新增机会</p>
                            <p className="text-sm font-bold text-gray-900">{item.opportunities}个</p>
                          </div>
                          <div className="bg-white rounded-xl p-3 border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">已执行任务</p>
                            <p className="text-sm font-bold text-gray-900">{item.actions}项</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          <span className="font-bold text-gray-900 mr-2">变化说明:</span>
                          {item.summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Settings size={24} className="text-indigo-600" />
                  监测设置
                </h2>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronDown size={24} className="text-gray-400" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Monitoring Cycle */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <Calendar size={18} className="text-indigo-500" />
                    监测周期
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setMonitoringCycle('daily')}
                      className={`py-3 rounded-2xl border-2 transition-all font-bold text-sm ${
                        monitoringCycle === 'daily' 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                        : 'border-gray-100 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      每天
                    </button>
                    <button 
                      onClick={() => setMonitoringCycle('weekly')}
                      className={`py-3 rounded-2xl border-2 transition-all font-bold text-sm ${
                        monitoringCycle === 'weekly' 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                        : 'border-gray-100 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      每周
                    </button>
                  </div>
                </div>

                {/* Email Notification */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Bell size={18} className="text-indigo-500" />
                      邮件提醒
                    </div>
                    <button 
                      onClick={() => setEmailEnabled(!emailEnabled)}
                      className={`w-12 h-6 rounded-full transition-all relative ${
                        emailEnabled ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                        emailEnabled ? 'left-7' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {emailEnabled && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Mail size={16} />
                          </div>
                          <input 
                            type="email"
                            placeholder="输入您的邮箱地址"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button 
                  onClick={() => setShowSettings(false)}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-100"
                >
                  保存设置
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Automation;
