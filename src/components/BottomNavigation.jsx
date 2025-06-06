// src/components/BottomNavigation.jsx - レスポンシブ改善版
import React from 'react';
import { Search, UserCircle, BarChart2 } from 'lucide-react';

const BottomNavigation = ({ 
  currentView,
  onChangeView,
  favoriteUniversities, 
  compareList
}) => {
  const handleNavClick = (viewName) => {
    onChangeView(viewName);
  };

  const tabs = [
    {
      id: 'list',
      icon: Search,
      label: '大学検索',
      shortLabel: '検索', // 小画面用の短いラベル
      badge: null,
      activeViews: ['list', 'details']
    },
    {
      id: 'portfolio',
      icon: UserCircle,
      label: 'ポートフォリオ',
      shortLabel: '進路',
      badge: favoriteUniversities.length > 0 ? favoriteUniversities.length : null,
      badgeColor: 'bg-red-500',
      activeViews: ['portfolio']
    },
    {
      id: 'compare',
      icon: BarChart2,
      label: '比較リスト',
      shortLabel: '比較',
      badge: compareList.length > 0 ? compareList.length : null,
      badgeColor: 'bg-green-500',
      activeViews: ['compare']
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center py-2 px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.activeViews.includes(currentView);
          
          return (
            <button
              key={tab.id}
              onClick={() => handleNavClick(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-colors relative min-w-0 flex-1 ${
                isActive 
                  ? 'text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {/* アイコンとバッジ */}
              <div className="relative mb-1">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {tab.badge && (
                  <div className={`absolute -top-2 -right-2 ${tab.badgeColor} text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center font-medium px-1`}>
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </div>
                )}
              </div>
              
              {/* レスポンシブラベル */}
              <span className={`text-xs font-medium truncate w-full text-center leading-tight ${
                isActive ? 'text-green-600' : 'text-gray-500'
              }`}>
                {/* 小画面では短いラベル、大画面では通常のラベル */}
                <span className="hidden xs:inline">{tab.label}</span>
                <span className="xs:hidden">{tab.shortLabel}</span>
              </span>
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