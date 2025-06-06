// src/components/ResponsiveHeader.jsx（コンパクト版）
import React from 'react';
import soccerLogo from '../assets/soccer-logo.svg';
import useScrollDirection from '../hooks/useScrollDirection';

const ResponsiveHeader = ({ 
  currentView,
  onChangeView
}) => {
  // スクロール方向を検知
  const { isVisible } = useScrollDirection(10);

  return (
    <header 
      className={`bg-green-700 text-white py-2 px-4 shadow-md fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          {/* ロゴとタイトル */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onChangeView('list')}
          >
            <img 
              src={soccerLogo} 
              alt="大学サッカー部お品書き" 
              className="h-8 mr-2" 
            />
            <h1 className="text-lg font-bold">大学サッカー部お品書き</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ResponsiveHeader;