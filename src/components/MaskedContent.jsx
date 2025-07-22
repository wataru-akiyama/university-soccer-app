// src/components/MaskedContent.jsx - レスポンシブ対応版
import React from 'react';
import { Lock, Crown } from 'lucide-react';

/**
 * プレミアム限定コンテンツをマスクするコンポーネント（レスポンシブ対応版）
 */
const MaskedContent = ({ 
  children, 
  reason = '詳細情報',
  onUpgradeClick,
  showUpgradeButton = true,
  showPreview = true,
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
    <div className={`relative min-h-[200px] ${className}`}>
      {/* マスクされたコンテンツ */}
      {showPreview && (
        <div className="filter blur-sm opacity-15 pointer-events-none select-none">
          {children}
        </div>
      )}
      
      {/* モザイク風オーバーレイ */}
      <div 
        className="absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden min-h-[200px] p-4"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              rgba(229, 231, 235, 0.8) 0px,
              rgba(229, 231, 235, 0.8) 8px,
              rgba(209, 213, 219, 0.8) 8px,
              rgba(209, 213, 219, 0.8) 16px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(243, 244, 246, 0.8) 0px,
              rgba(243, 244, 246, 0.8) 8px,
              rgba(229, 231, 235, 0.8) 8px,
              rgba(229, 231, 235, 0.8) 16px
            ),
            rgba(249, 250, 251, 0.9)
          `,
          backgroundSize: '16px 16px, 16px 16px, 100% 100%'
        }}
      >
        <div className="text-center w-full max-w-xs sm:max-w-sm mx-auto px-4 sm:px-6 py-6 bg-white/95 rounded-lg shadow-lg border border-gray-200 backdrop-blur-sm">
          {/* メッセージ */}
          <p className="text-gray-700 font-medium mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
            コンテンツを閲覧するには
          </p>
          
          {/* アップグレードボタン */}
          {showUpgradeButton && (
            <button 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors shadow-sm text-sm sm:text-base"
              onClick={handleUpgradeClick}
            >
              プレミアムプランに登録
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * より簡単なバナー形式のマスク（レスポンシブ対応版）
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
      {/* デスクトップ表示 */}
      <div className="hidden sm:flex sm:items-center">
        <div className="flex-shrink-0">
          <Lock size={20} className="text-yellow-600" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="font-semibold text-yellow-800">{title}</h3>
          <p className="text-sm text-yellow-700 mt-1">{description}</p>
        </div>
        <div className="ml-4">
          <button 
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap"
            onClick={handleUpgradeClick}
          >
            プレミアムプランに登録
          </button>
        </div>
      </div>

      {/* モバイル表示 */}
      <div className="sm:hidden">
        <div className="flex items-start mb-3">
          <div className="flex-shrink-0">
            <Lock size={20} className="text-yellow-600" />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="font-semibold text-yellow-800">{title}</h3>
            <p className="text-sm text-yellow-700 mt-1">{description}</p>
          </div>
        </div>
        <div className="mt-3">
          <button 
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2.5 rounded text-sm font-medium transition-colors"
            onClick={handleUpgradeClick}
          >
            プレミアムプランに登録
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaskedContent;