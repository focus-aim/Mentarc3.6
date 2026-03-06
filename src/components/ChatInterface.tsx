import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Sparkles, Paperclip, Bot, User, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { useApp } from '../context/AppContext';
import ReactMarkdown from 'react-markdown';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'analysis' | 'content';
}

export default function ChatInterface() {
  const { userProfile, initialChatPrompt, setInitialChatPrompt } = useApp();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-3-flash-preview');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = useCallback(async (overrideInput?: string) => {
    const messageText = overrideInput || input;
    if (!messageText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!overrideInput) setInput('');
    setIsLoading(true);

    // Specific response for the requested prompt
    if (messageText.trim() === '分析巴西及智利市场健身器材趋势并提供拓展建议') {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate thinking
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `以下是基于您提供的分析内容，为您生成的巴西及智利市场健身器材趋势简报：

📅 **分析周期：** 2025年12月 - 2026年2月
🌎 **核心洞察：** 市场受“新年决心”驱动在1月达到峰值，用户需求正从“基础入门”转向**“家庭健身房升级”**。

📊 **关键品类趋势：**

🔥 **飙升爆品：**
- **走步机 (Walking Pad)：** 受社媒传播及远程办公常态化影响，需求持续霸榜。
- **可调节哑铃 & 普拉提核心床：** 顺应“节省空间”需求及居家普拉提潮流。
- **负重背心：** 户外徒步 (Rucking) 概念兴起，带动装备增长。

📈 **稳健增长：** 智能健身设备 (AI/数据追踪)、阻力带 (入门首选)。

✨ **新兴蓝海：** 恢复类科技 (桑拿毯、筋膜枪) 与 混合赛事装备 (Hyrox相关)。

📉 **存量回落：** 健身车 (市场趋于饱和)、瑜伽垫 (节后季节性回落)。

💡 **拓展建议：**
选品与营销应重点突出 “Space-saving (节省空间)” 和 “Smart/Connected (智能互联)” 两大属性。短期主攻走步机与普拉提，长期布局运动恢复类产品。`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
      return;
    }

    try {
      const systemPrompt = `
        You are Mentarc, an advanced AI assistant for foreign trade professionals.
        User Profile:
        - Website: ${userProfile.website}
        - Preferences: ${userProfile.preferences.join(', ')}
        
        Your persona: Professional, insightful, proactive, and slightly witty. You are a "digital twin" helping them succeed in global business.
        
        If the user asks for market analysis, provide data-driven insights.
        If the user asks for content generation, provide high-converting copy.
        Always keep the tone modern and encouraging.
      `;

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: [
          { role: 'user', parts: [{ text: systemPrompt + "\n\nUser Query: " + messageText }] }
        ]
      });

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "Sorry, I couldn't generate a response.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Gemini Error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I encountered an error connecting to my brain. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [input, userProfile, selectedModel, setInitialChatPrompt]);

  useEffect(() => {
    if (initialChatPrompt) {
      handleSend(initialChatPrompt);
      setInitialChatPrompt('');
    }
  }, [initialChatPrompt, handleSend, setInitialChatPrompt]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
            <Bot size={64} className="mb-4 text-indigo-200" />
            <p className="text-lg">准备好开始工作了吗？</p>
            <p className="text-sm">试着问我：“分析一下目前的欧美消费电子趋势”</p>
          </div>
        )}
        
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-indigo-100' : 'bg-gradient-to-br from-indigo-500 to-purple-600'
              }`}>
                {msg.role === 'user' ? <User size={20} className="text-indigo-600" /> : <Bot size={20} className="text-white" />}
              </div>
              
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-white text-gray-800 border border-gray-100 rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}>
                <div className="markdown-body text-sm leading-relaxed">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <span className="text-[10px] text-gray-300 mt-2 block text-right">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot size={20} className="text-white" />
             </div>
             <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
             </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          {/* Model Selector & Tools */}
          <div className="flex items-center gap-3 mb-3 px-2">
            <select 
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg border-none outline-none cursor-pointer hover:bg-gray-200 transition-colors"
            >
              <option value="gemini-3-flash-preview">Gemini Flash (Fast)</option>
              <option value="gemini-3.1-pro-preview">Gemini Pro (Reasoning)</option>
            </select>
            
            <div className="h-4 w-px bg-gray-200 mx-1"></div>
            
            <button 
              onClick={() => setInput('请分析当前目标市场的竞争格局，重点关注价格策略和营销渠道。')}
              className="text-xs font-medium text-gray-500 hover:text-indigo-600 flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-50 transition-colors"
            >
              <Sparkles size={12} /> 市场分析
            </button>
            <button 
              onClick={() => setInput('帮我写一封针对潜在客户的冷开发邮件，强调我们的产品优势和定制化服务。')}
              className="text-xs font-medium text-gray-500 hover:text-indigo-600 flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-50 transition-colors"
            >
              <Paperclip size={12} /> 内容生成
            </button>
          </div>

          <div className="relative flex items-end gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all shadow-sm">
            <button className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all">
              <Paperclip size={20} />
            </button>
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入任务指令，例如：帮我写一封给德国客户的开发信..."
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 max-h-32 text-gray-700 placeholder-gray-400"
              rows={1}
              style={{ minHeight: '44px' }}
            />
            
            <div className="flex gap-1">
               <button className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all">
                <Mic size={20} />
              </button>
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200 transition-all"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
          <div className="text-center mt-2">
             <p className="text-[10px] text-gray-400">Mentarc AI may display inaccurate info, please double check.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
