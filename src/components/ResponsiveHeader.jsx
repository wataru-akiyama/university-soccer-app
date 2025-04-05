import React, { useState } from 'react';
import { Menu, X, UserCircle, Zap, Heart, BarChart2 } from 'lucide-react';
import soccerLogo from '../assets/soccer-logo.svg'; // パスを適切に調整してください

const ResponsiveHeader = ({ 
  favoriteUniversities, 
  compareList, 
  onShowPortfolio, 
  onShowRecommendation, 
  onShowFavorites, 
  onShowCompare,
  onBackToList
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // ナビゲーション項目のクリック処理
  const handleNavClick = (handler) => {
    setIsMenuOpen(false); // メニューを閉じる
    if (handler) handler();
  };

  return (
    <header className="bg-green-700 text-white p-4 shadow-md">
      <div className="container mx-auto">
        {/* デスクトップとモバイルビューの両方を含むフレックスコンテナ */}
        <div className="flex justify-between items-center">
          {/* ロゴとタイトル */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick(onBackToList)}>
            <img 
              src={soccerLogo} 
              alt="大学サッカー部お品書き" 
              className="h-10 mr-3" 
            />
            <h1 className="text-xl font-bold hidden md:block">大学サッカー部お品書き</h1>
          </div>
          
          {/* デスクトップビュー: メインナビゲーション */}
          <div className="hidden md:flex items-center space-x-3">
            <button 
              className="px-4 py-2 rounded-lg flex items-center bg-white text-green-700 shadow-sm hover:bg-green-50 transition-colors"
              onClick={() => handleNavClick(onShowPortfolio)}
            >
              <UserCircle size={18} className="mr-2" />
              <span>マイポートフォリオ</span>
            </button>
            
            <button 
              className="px-4 py-2 rounded-lg flex items-center bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
              onClick={() => handleNavClick(onShowRecommendation)}
            >
              <Zap size={18} className="mr-2" />
              <span>あなたにぴったりの大学</span>
            </button>
            
            {favoriteUniversities.length > 0 && (
              <button 
                className="px-4 py-2 rounded-lg flex items-center bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
                onClick={() => handleNavClick(onShowFavorites)}
              >
                <Heart size={18} className="mr-2" />
                <span>私の進路プラン</span>
                <div className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteUniversities.length}
                </div>
              </button>
            )}
            
            {compareList.length > 0 && (
              <button 
                className="px-4 py-2 rounded-lg flex items-center bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
                onClick={() => handleNavClick(onShowCompare)}
              >
                <BarChart2 size={18} className="mr-2" />
                <span>比較リスト</span>
                <div className="ml-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {compareList.length}
                </div>
              </button>
            )}
          </div>
          
          {/* モバイルビュー: アクションボタン */}
          <div className="flex md:hidden items-center space-x-2">
            {/* お気に入りと比較のカウンターを常に表示 */}
            {favoriteUniversities.length > 0 && (
              <button 
                className="p-2 relative"
                onClick={() => handleNavClick(onShowFavorites)}
              >
                <Heart size={24} />
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteUniversities.length}
                </div>
              </button>
            )}
            
            {compareList.length > 0 && (
              <button 
                className="p-2 relative"
                onClick={() => handleNavClick(onShowCompare)}
              >
                <BarChart2 size={24} />
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {compareList.length}
                </div>
              </button>
            )}
            
            {/* ハンバーガーメニュー */}
            <button 
              className="p-2 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* モバイルメニュー (展開時のみ表示) */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-3 px-2 bg-green-600 rounded-lg">
            <div className="space-y-2">
              <button 
                className="w-full px-3 py-3 rounded-md flex items-center hover:bg-green-700 transition-colors"
                onClick={() => handleNavClick(onShowPortfolio)}
              >
                <UserCircle size={20} className="mr-3" />
                <span className="font-medium">マイポートフォリオ</span>
              </button>
              
              <button 
                className="w-full px-3 py-3 rounded-md flex items-center hover:bg-green-700 transition-colors"
                onClick={() => handleNavClick(onShowRecommendation)}
              >
                <Zap size={20} className="mr-3" />
                <span className="font-medium">あなたにぴったりの大学</span>
              </button>
              
              <button 
                className="w-full px-3 py-3 rounded-md flex items-center hover:bg-green-700 transition-colors"
                onClick={() => handleNavClick(onShowFavorites)}
              >
                <Heart size={20} className="mr-3" />
                <span className="font-medium">私の進路プラン</span>
                {favoriteUniversities.length > 0 && (
                  <div className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favoriteUniversities.length}
                  </div>
                )}
              </button>
              
              <button 
                className="w-full px-3 py-3 rounded-md flex items-center hover:bg-green-700 transition-colors"
                onClick={() => handleNavClick(onShowCompare)}
              >
                <BarChart2 size={20} className="mr-3" />
                <span className="font-medium">比較リスト</span>
                {compareList.length > 0 && (
                  <div className="ml-auto bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {compareList.length}
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ResponsiveHeader;