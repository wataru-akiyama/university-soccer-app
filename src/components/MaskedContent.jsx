// src/components/MaskedContent.jsx - マスクコンテンツコンポーネント
import React from 'react';
import { Lock, Crown } from 'lucide-react';

/**
 * プレミアム限定コンテンツをマスクするコンポーネント
 */
const MaskedContent = ({ 
  children, 
  reason = '詳細情報',
  onUpgradeClick,
  showUpgradeButton = true,
  className = ''
}) => {
  const handleUpgradeClick = () => {
    if (onUpgradeClick) {
      onUpgradeClick();
    } else {
      // デフォルトのアップグレード処理
      console.log('プレミアムプランへのアップグレードが要求されました');
      // 実際のアプリではモーダルを表示やページ遷移など
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* マスクされたコンテンツ */}
      <div className="filter blur-sm opacity-40 pointer-events-none select-none">
        {children}
      </div>
      
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-orange-50 bg-opacity-95 flex items-center justify-center rounded-lg border-2 border-dashed border-yellow-300">
        <div className="text-center px-4 py-2">
          {/* ロックアイコン */}
          <div className="flex justify-center mb-2">
            <div className="relative">
              <Lock size={24} className="text-yellow-600" />
              <Crown size={12} className="text-orange-500 absolute -top-1 -right-1" />
            </div>
          </div>
          
          {/* メッセージ */}
          <p className="text-sm font-medium text-yellow-800 mb-1">
            {reason}はプレミアム限定
          </p>
          <p className="text-xs text-yellow-700 mb-3">
            詳細情報を確認するにはプレミアムプランが必要です
          </p>
          
          {/* アップグレードボタン */}
          {showUpgradeButton && (
            <button 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
              onClick={handleUpgradeClick}
            >
              <Crown size={12} className="inline mr-1" />
              プレミアムプランを見る
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * より簡単なバナー形式のマスク
 */
export const MaskedBanner = ({ 
  title = 'プレミアム限定機能',
  description = 'この機能はプレミアムプランでご利用いただけます。',
  onUpgradeClick,
  className = ''
}) => {
  const handleUpgradeClick = () => {
    if (onUpgradeClick) {
      onUpgradeClick();
    }
  };

  return (
    <div className={`bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-4 rounded-lg ${className}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Lock size={20} className="text-yellow-600" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="font-semibold text-yellow-800">{title}</h3>
          <p className="text-sm text-yellow-700 mt-1">{description}</p>
        </div>
        <div className="ml-4">
          <button 
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            onClick={handleUpgradeClick}
          >
            プレミアムプランを見る
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaskedContent;