// src/components/ResponsiveHeader.jsx（ボトムナビ対応版）
import React from 'react';
import soccerLogo from '../assets/soccer-logo.svg';

const ResponsiveHeader = ({ 
  currentView,
  onChangeView
}) => {
  return (
    <header className="bg-green-700 text-white p-4 shadow-md sticky top-0 z-40">
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
              className="h-10 mr-3" 
            />
            <h1 className="text-xl font-bold">大学サッカー部お品書き</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ResponsiveHeader;