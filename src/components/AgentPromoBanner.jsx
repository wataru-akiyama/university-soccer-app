// Add this new component to src/components/AgentPromoBanner.jsx
import React from 'react';
import { Zap, ChevronRight, MessageSquare, Target } from 'lucide-react';

const AgentPromoBanner = ({ onShowAgent }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md overflow-hidden mb-6">
      <div className="relative p-5">
        {/* 背景装飾 */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10">
          <div className="h-full w-64 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* アイコン部分 */}
          <div className="bg-white rounded-full p-3 shadow-md mb-4 md:mb-0 md:mr-5">
            <Zap size={32} className="text-purple-600" />
          </div>
          
          {/* テキスト部分 */}
          <div className="text-center md:text-left md:flex-1">
            <h3 className="text-xl font-bold text-white mb-1">新機能！サッカー代理人AI</h3>
            <p className="text-purple-100 mb-4">
              あなただけの専属エージェントがぴったりの大学を紹介。進路相談もサポートします。
            </p>
            
            {/* 特徴ポイント */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-3">
              <div className="flex items-center text-white text-sm">
                <Target size={16} className="mr-1" />
                <span>パーソナライズされた提案</span>
              </div>
              <div className="flex items-center text-white text-sm">
                <MessageSquare size={16} className="mr-1" />
                <span>進路相談チャット</span>
              </div>
            </div>
          </div>
          
          {/* ボタン - z-indexを高くして最前面に表示 */}
          <div className="mt-4 md:mt-0 md:ml-5 relative z-10">
            <button 
              className="bg-white text-purple-600 px-5 py-3 rounded-lg font-bold shadow-md hover:bg-purple-50 transition-colors flex items-center cursor-pointer"
              onClick={onShowAgent}
              type="button"
              style={{ position: 'relative', zIndex: 20 }}
            >
              代理人に相談する
              <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPromoBanner;