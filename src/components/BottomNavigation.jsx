// src/components/BottomNavigation.jsx - 動画タブ追加版
import React from 'react';
import { Search, UserCircle, BarChart2, Lock, Play } from 'lucide-react';

const BottomNavigation = ({ 
  currentView,
  onChangeView,
  favoriteUniversities, 
  compareList,
  isPremium = false,
  onUpgradeToPremium
}) => {
  const handleNavClick = (viewName) => {
    // 比較機能はプレミアム限定
    if (viewName === 'compare' && !isPremium) {
      if (onUpgradeToPremium) {
        onUpgradeToPremium();
      } else {
        alert('比較機能はプレミアムプラン限定です。');
      }
      return;
    }
    
    onChangeView(viewName);
  };

  const tabs = [
    {
      id: 'videos',
      icon: Play,
      label: '動画ライブラリ',
      shortLabel: '動画',
      badge: null,
      badgeColor: 'bg-blue-500',
      activeViews: ['videos'],
      disabled: false
    },
    {
      id: 'list',
      icon: Search,
      label: '大学検索',
      shortLabel: '検索',
      badge: null,
      activeViews: ['list', 'details'],
      disabled: false
    },
    {
      id: 'portfolio',
      icon: UserCircle,
      label: 'ポートフォリオ',
      shortLabel: '進路',
      badge: favoriteUniversities.length > 0 ? favoriteUniversities.length : null,
      badgeColor: 'bg-red-500',
      activeViews: ['portfolio'],
      disabled: false
    },
    {
      id: 'compare',
      icon: isPremium ? BarChart2 : Lock,
      label: isPremium ? '比較リスト' : '比較機能',
      shortLabel: isPremium ? '比較' : '比較',
      badge: compareList.length > 0 && isPremium ? compareList.length : null,
      badgeColor: 'bg-green-500',
      activeViews: ['compare'],
      disabled: !isPremium
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center py-2 px-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.activeViews.includes(currentView);
          
          return (
            <button
              key={tab.id}
              onClick={() => handleNavClick(tab.id)}
              disabled={tab.disabled}
              className={`flex flex-col items-center justify-center py-1.5 px-1.5 rounded-lg transition-colors relative min-w-0 flex-1 ${
                isActive 
                  ? 'text-green-600' 
                  : tab.disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {/* アイコンとバッジ */}
              <div className="relative mb-1">
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {tab.badge && !tab.disabled && (
                  <div className={`absolute -top-2 -right-2 ${tab.badgeColor} text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center font-medium px-1`}>
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </div>
                )}
              </div>
              
              {/* レスポンシブラベル */}
              <span className={`text-xs font-medium truncate w-full text-center leading-tight ${
                isActive 
                  ? 'text-green-600' 
                  : tab.disabled
                    ? 'text-gray-400'
                    : 'text-gray-500'
              }`}>
                {/* 小画面では短いラベル、大画面では通常のラベル */}
                <span className="hidden xs:inline">{tab.label}</span>
                <span className="xs:hidden">{tab.shortLabel}</span>
              </span>
              
              {/* プレミアム制限の比較機能の場合の追加表示 */}
              {tab.id === 'compare' && !isPremium && (
                <div className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                  <Lock size={8} />
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* セーフエリア対応（iPhone等） */}
      <div className="h-safe-area-inset-bottom bg-white"></div>
    </nav>
  );
};

export default BottomNavigation;