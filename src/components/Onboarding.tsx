import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GoogleGenAI } from "@google/genai";

export default function Onboarding() {
  const { setUserProfile } = useApp();
  const [step, setStep] = useState(1);
  const [website, setWebsite] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!website) return;
    setIsAnalyzing(true);
    
    // Simulate analysis delay for effect
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, we would actually parse the site here.
    // For now, we just move to the next step.
    setIsAnalyzing(false);
    setStep(2);
  };

  const handleComplete = () => {
    setUserProfile({
      website,
      preferences,
      isOnboarded: true
    });
  };

  const togglePreference = (pref: string) => {
    if (preferences.includes(pref)) {
      setPreferences(preferences.filter(p => p !== pref));
    } else {
      setPreferences([...preferences, pref]);
    }
  };

  const prefOptions = [
    "消费电子", "家居用品", "机械设备", "纺织服装", 
    "欧美市场", "东南亚市场", "中东市场",
    "LinkedIn开发", "邮件营销", "社媒运营"
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl shadow-indigo-200">
          <Sparkles className="text-white w-12 h-12" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Hi, 我是 Mentarc
        </h1>
        <p className="text-xl text-gray-500">
          你的外贸最强数字分身。让我了解你的业务，<br/>为你打造专属的增长引擎。
        </p>
      </motion.div>

      <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
          <motion.div 
            className="h-full bg-indigo-600"
            initial={{ width: "0%" }}
            animate={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>

        <div className="p-8 min-h-[300px] flex flex-col justify-center">
          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold text-gray-800">首先，请告诉我你的企业独立站</h2>
              <p className="text-gray-500">我会深度解析你的产品特点和品牌调性，存入我的“记忆库”。</p>
              
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="www.yourcompany.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-lg transition-all"
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!website || isAnalyzing}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    正在解析业务基因...
                  </>
                ) : (
                  <>
                    开始解析 <ArrowRight size={20} />
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold text-gray-800">你的关注偏好是什么？</h2>
              <p className="text-gray-500">选择你感兴趣的领域，我将为你生成每日专属情报。</p>
              
              <div className="flex flex-wrap gap-3">
                {prefOptions.map((pref) => (
                  <button
                    key={pref}
                    onClick={() => togglePreference(pref)}
                    className={`px-4 py-2 rounded-full border transition-all ${
                      preferences.includes(pref)
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>

              <button
                onClick={handleComplete}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-8"
              >
                生成我的数字分身 <Sparkles size={20} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
