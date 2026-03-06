import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Users, 
  Target, 
  Image as ImageIcon, 
  MessageSquare, 
  ChevronRight, 
  Search, 
  Clock, 
  Filter,
  MoreHorizontal,
  Download,
  Eye,
  Trash2,
  ExternalLink,
  History,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AssetCategory {
  id: string;
  title: string;
  icon: any;
  count: number;
  description: string;
  color: string;
  bg: string;
}

interface HistoryTask {
  id: string;
  title: string;
  type: string;
  time: string;
  status: 'completed' | 'processing';
}

const Assets: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'business' | 'history'>('business');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories: AssetCategory[] = [
    { 
      id: 'buyer', 
      title: '买家分析报告', 
      icon: Users, 
      count: 12, 
      description: '深度买家画像与背景调查报告',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    { 
      id: 'competitor', 
      title: '同行分析报告', 
      icon: Target, 
      count: 8, 
      description: '竞品动态追踪与策略对比分析',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    { 
      id: 'opportunity', 
      title: '机会分析报告', 
      icon: Search, 
      count: 15, 
      description: '全球市场趋势与增长信号分析',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    { 
      id: 'media', 
      title: '图像视频', 
      icon: ImageIcon, 
      count: 42, 
      description: 'AI 生成的产品推广图与短视频',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    { 
      id: 'copy', 
      title: '社媒文案', 
      icon: MessageSquare, 
      count: 128, 
      description: '多平台适配的营销文案与贴文',
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  const historyTasks: HistoryTask[] = [
    { id: '1', title: '分析巴西健身器材市场趋势', type: '机会分析', time: '2024-03-20 14:30', status: 'completed' },
    { id: '2', title: '背调买家 Fitness Global Ltd', type: '买家背调', time: '2024-03-19 10:15', status: 'completed' },
    { id: '3', title: '生成 LinkedIn 推广文案 (可折叠跑步机)', type: '内容生成', time: '2024-03-18 16:45', status: 'completed' },
    { id: '4', title: '竞品网站流量与关键词分析', type: '同行分析', time: '2024-03-17 09:20', status: 'completed' },
    { id: '5', title: '生成产品展示视频 - 智能动感单车', type: '图像视频', time: '2024-03-16 11:00', status: 'completed' },
    { id: '6', title: '智利市场准入政策调研', type: '机会分析', time: '2024-03-15 15:30', status: 'completed' },
    { id: '7', title: '分析 Reddit #HomeGym 讨论热点', type: '社媒分析', time: '2024-03-14 13:10', status: 'completed' },
  ];

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">任务结果</h1>
          <p className="text-sm text-gray-500 mt-1">管理你的业务资产与历史运行记录</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveTab('business')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'business' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Briefcase size={16} />
            业务资产
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'history' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <History size={16} />
            历史任务
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'business' ? (
            <motion.div
              key="business-assets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full overflow-y-auto custom-scrollbar pr-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                  <motion.div
                    key={cat.id}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center shadow-inner`}>
                        <cat.icon size={28} />
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black text-gray-900 leading-none">{cat.count}</span>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">项结果</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{cat.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed mb-6">{cat.description}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">查看详情</span>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="history-tasks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full flex flex-col bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Filter Bar */}
              <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="搜索历史任务..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all text-sm outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-3 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-colors">
                    <Filter size={18} />
                  </button>
                  <button className="p-3 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              </div>

              {/* Tasks Table */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">任务标题</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">任务类型</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">生成时间</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyTasks.map((task) => (
                      <tr key={task.id} className="group hover:bg-gray-50/80 transition-colors border-b border-gray-50/50">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                              <FileText size={16} />
                            </div>
                            <span className="text-sm font-bold text-gray-900">{task.title}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold">
                            {task.type}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                            <Clock size={14} />
                            {task.time}
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                              <Eye size={18} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                              <MoreHorizontal size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Assets;
