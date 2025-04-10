import React from 'react';
import { UserCircle, ChevronRight, Trophy, Camera } from 'lucide-react';

const PortfolioBanner = ({ onShowPortfolio }) => {
  // イベントハンドラを明示的に定義
  const handlePortfolioClick = (e) => {
    e.stopPropagation();
    onShowPortfolio(); // PlayerPortfolioを表示する関数を呼び出し
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md overflow-hidden mb-6">
      <div className="relative p-5">
        {/* 背景装飾 */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10">
          <div className="h-full w-64 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* アイコン部分 */}
          <div className="bg-white rounded-full p-3 shadow-md mb-4 md:mb-0 md:mr-5">
            <UserCircle size={32} className="text-blue-600" />
          </div>
          
          {/* テキスト部分 */}
          <div className="text-center md:text-left md:flex-1">
            <h3 className="text-xl font-bold text-white mb-1">あなたのサッカーキャリアをアピール！</h3>
            <p className="text-blue-100 mb-4">ポートフォリオを作成して大学サッカー部にアピール。プレー動画や実績をまとめて進路活動を有利に進めよう</p>
            
            {/* 特徴ポイント */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-3">
              <div className="flex items-center text-white text-sm">
                <Trophy size={16} className="mr-1" />
                <span>競技実績の登録</span>
              </div>
              <div className="flex items-center text-white text-sm">
                <Camera size={16} className="mr-1" />
                <span>プレー動画のアップロード</span>
              </div>
            </div>
          </div>
          
          {/* ボタン - z-indexを高くして最前面に表示 */}
          <div className="mt-4 md:mt-0 md:ml-5 relative z-10">
            <button 
              className="bg-white text-blue-600 px-5 py-3 rounded-lg font-bold shadow-md hover:bg-blue-50 transition-colors flex items-center cursor-pointer"
              onClick={handlePortfolioClick}
              type="button"
              style={{ position: 'relative', zIndex: 20 }} // インラインスタイルでも設定
            >
              ポートフォリオを作成
              <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBanner;