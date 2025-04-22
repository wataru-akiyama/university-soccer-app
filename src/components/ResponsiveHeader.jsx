// src/components/ResponsiveHeader.jsx
import React, { useState } from 'react';
import { Menu, X, UserCircle, Zap, Heart, Search, BarChart2 } from 'lucide-react';
import soccerLogo from '../assets/soccer-logo.svg';

const ResponsiveHeader = ({ 
  currentView,
  onChangeView,
  favoriteUniversities, 
  compareList
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // ナビゲーション項目のクリック処理
  const handleNavClick = (viewName) => {
    setIsMenuOpen(false); // メニューを閉じる
    onChangeView(viewName);
  };

  return (
    <header className="bg-green-700 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto">
        {/* デスクトップとモバイルビューの両方を含むフレックスコンテナ */}
        <div className="flex justify-between items-center">
          {/* ロゴとタイトル */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => handleNavClick('list')}
          >
            <img 
              src={soccerLogo} 
              alt="大学サッカー部お品書き" 
              className="h-10 mr-3" 
            />
            <h1 className="text-xl font-bold hidden md:block">大学サッカー部お品書き</h1>
          </div>
          
          {/* デスクトップビュー: メインナビゲーション（新しいタブ構造） */}
          <div className="hidden md:flex items-center space-x-1">
            <button 
              className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                currentView === 'list' || currentView === 'details' ? 'bg-white text-green-700' : 'bg-white bg-opacity-10 hover:bg-opacity-20'
              }`}
              onClick={() => handleNavClick('list')}
            >
              <Search size={18} className="mr-2" />
              <span>大学検索</span>
            </button>
            
            <button 
              className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                currentView === 'portfolio' || currentView === 'templatePortfolio' ? 'bg-white text-green-700' : 'bg-white bg-opacity-10 hover:bg-opacity-20'
              }`}
              onClick={() => handleNavClick('portfolio')}
            >
              <UserCircle size={18} className="mr-2" />
              <span>ポートフォリオ</span>
            </button>
            
            <button 
              className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                currentView === 'agent' ? 'bg-white text-green-700' : 'bg-white bg-opacity-10 hover:bg-opacity-20'
              }`}
              onClick={() => handleNavClick('agent')}
            >
              <Zap size={18} className="mr-2" />
              <span>マイエージェント</span>
              {/* 新着情報を示す通知バッジ（仮の表示） */}
              <div className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </div>
            </button>
            
            {/* サブメニュー: お気に入り */}
            {favoriteUniversities.length > 0 && (
              <button 
                className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                  currentView === 'favorites' ? 'bg-white text-green-700' : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}
                onClick={() => handleNavClick('favorites')}
              >
                <Heart size={18} className="mr-2" />
                <span>進路プラン</span>
                <div className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteUniversities.length}
                </div>
              </button>
            )}
            
            {/* サブメニュー: 比較リスト */}
            {compareList.length > 0 && (
              <button 
                className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                  currentView === 'compare' ? 'bg-white text-green-700' : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}
                onClick={() => handleNavClick('compare')}
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
            {/* タブナビゲーション (モバイル用コンパクト表示) */}
            <button 
              className={`p-2 rounded-full ${currentView === 'list' || currentView === 'details' ? 'bg-white text-green-700' : ''}`}
              onClick={() => handleNavClick('list')}
            >
              <Search size={20} />
            </button>
            
            <button 
              className={`p-2 rounded-full ${currentView === 'portfolio' || currentView === 'templatePortfolio' ? 'bg-white text-green-700' : ''}`}
              onClick={() => handleNavClick('portfolio')}
            >
              <UserCircle size={20} />
            </button>
            
            <button 
              className={`p-2 rounded-full ${currentView === 'agent' ? 'bg-white text-green-700' : ''} relative`}
              onClick={() => handleNavClick('agent')}
            >
              <Zap size={20} />
              {/* 通知バッジ */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </button>
            
            {/* お気に入りと比較のカウンターを常に表示 */}
            {favoriteUniversities.length > 0 && (
              <button 
                className={`p-2 relative ${currentView === 'favorites' ? 'bg-white text-green-700 rounded-full' : ''}`}
                onClick={() => handleNavClick('favorites')}
              >
                <Heart size={20} />
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteUniversities.length}
                </div>
              </button>
            )}
            
            {compareList.length > 0 && (
              <button 
                className={`p-2 relative ${currentView === 'compare' ? 'bg-white text-green-700 rounded-full' : ''}`}
                onClick={() => handleNavClick('compare')}
              >
                <BarChart2 size={20} />
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
                onClick={() => handleNavClick('list')}
              >
                <Search size={20} className="mr-3" />
                <span className="font-medium">大学検索</span>
              </button>
              
              <button 
                className="w-full px-3 py-3 rounded-md flex items-center hover:bg-green-700 transition-colors"
                onClick={() => handleNavClick('portfolio')}
              >
                <UserCircle size={20} className="mr-3" />
                <span className="font-medium">ポートフォリオ</span>
              </button>
              
              <button 
                className="w-full px-3 py-3 rounded-md flex items-center hover:bg-green-700 transition-colors"
                onClick={() => handleNavClick('agent')}
              >
                <Zap size={20} className="mr-3" />
                <span className="font-medium">マイエージェント</span>
                <div className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </div>
              </button>
              
              <button 
                className="w-full px-3 py-3 rounded-md flex items-center hover:bg-green-700 transition-colors"
                onClick={() => handleNavClick('favorites')}
              >
                <Heart size={20} className="mr-3" />
                <span className="font-medium">進路プラン</span>
                {favoriteUniversities.length > 0 && (
                  <div className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favoriteUniversities.length}
                  </div>
                )}
              </button>
              
              <button 
                className="w-full px-3 py-3 rounded-md flex items-center hover:bg-green-700 transition-colors"
                onClick={() => handleNavClick('compare')}
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