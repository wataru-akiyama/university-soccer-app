// src/components/BottomNavigation.jsx
import React from 'react';
import { Search, UserCircle, BarChart2 } from 'lucide-react';

const BottomNavigation = ({ 
  currentView,
  onChangeView,
  favoriteUniversities, 
  compareList
}) => {
  // ナビゲーション項目のクリック処理
  const handleNavClick = (viewName) => {
    onChangeView(viewName);
  };

  // タブの設定
  const tabs = [
    {
      id: 'list',
      icon: Search,
      label: '大学検索',
      badge: null,
      activeViews: ['list', 'details'] // detailsビューも検索タブとして扱う
    },
    {
      id: 'portfolio',
      icon: UserCircle,
      label: 'ポートフォリオ',
      badge: favoriteUniversities.length > 0 ? favoriteUniversities.length : null,
      badgeColor: 'bg-red-500',
      activeViews: ['portfolio']
    },
    {
      id: 'compare',
      icon: BarChart2,
      label: '比較リスト',
      badge: compareList.length > 0 ? compareList.length : null,
      badgeColor: 'bg-green-500',
      activeViews: ['compare']
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center py-1 px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.activeViews.includes(currentView);
          
          return (
            <button
              key={tab.id}
              onClick={() => handleNavClick(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors relative min-w-0 flex-1 ${
                isActive 
                  ? 'text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {/* アイコンとバッジ */}
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {tab.badge && (
                  <div className={`absolute -top-1 -right-1 ${tab.badgeColor} text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium`}>
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </div>
                )}
              </div>
              
              {/* ラベル */}
              <span className={`text-xs mt-0.5 font-medium truncate w-full text-center leading-tight ${
                isActive ? 'text-green-600' : 'text-gray-500'
              }`}>
                {tab.label}
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