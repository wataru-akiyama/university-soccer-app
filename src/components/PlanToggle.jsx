// src/components/PlanToggle.jsx - プラン切り替えスイッチコンポーネント
import React from 'react';
import { Crown } from 'lucide-react';

/**
 * フリー/プレミアムプランの切り替えスイッチ
 */
const PlanToggle = ({ 
  isPremium, 
  onToggle, 
  position = 'fixed',
  className = '' 
}) => {
  const positionClasses = {
    fixed: 'fixed top-4 right-4 z-50',
    static: 'relative',
    sticky: 'sticky top-4'
  };

  return (
    <div className={`${positionClasses[position]} ${className}`}>
      <div className="bg-white rounded-lg shadow-lg p-3 border">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700">プラン:</span>
          
          <div className="flex items-center space-x-2">
            {/* フリープランラベル */}
            <span className={`text-sm transition-colors ${
              !isPremium 
                ? 'font-bold text-gray-900' 
                : 'text-gray-500'
            }`}>
              フリー
            </span>
            
            {/* トグルスイッチ */}
            <button
              onClick={onToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
                isPremium 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                  : 'bg-gray-200'
              }`}
              aria-label="プランを切り替える"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isPremium ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            
            {/* プレミアムプランラベル */}
            <span className={`text-sm transition-colors flex items-center ${
              isPremium 
                ? 'font-bold text-orange-600' 
                : 'text-gray-500'
            }`}>
              {isPremium && <Crown size={14} className="mr-1" />}
              プレミアム
            </span>
          </div>
        </div>
        
        {/* プラン説明 */}
        <div className="mt-2 text-xs text-gray-500">
          {isPremium ? (
            <span className="text-orange-600 font-medium">
              全機能が利用可能です
            </span>
          ) : (
            <span>
              基本機能のみ利用可能
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * よりコンパクトなバージョン
 */
export const CompactPlanToggle = ({ isPremium, onToggle, className = '' }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className={`text-xs ${!isPremium ? 'font-medium' : 'text-gray-500'}`}>
        フリー
      </span>
      
      <button
        onClick={onToggle}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          isPremium 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
            : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
            isPremium ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </button>
      
      <span className={`text-xs flex items-center ${
        isPremium ? 'font-medium text-orange-600' : 'text-gray-500'
      }`}>
        {isPremium && <Crown size={10} className="mr-0.5" />}
        プレミアム
      </span>
    </div>
  );
};

export default PlanToggle;