// src/components/PremiumBadge.jsx - プレミアムバッジコンポーネント
import React from 'react';
import { Crown } from 'lucide-react';

/**
 * プレミアム限定コンテンツに表示するバッジ
 */
const PremiumBadge = ({ 
  size = 'sm', 
  className = '',
  showIcon = true,
  text = 'PREMIUM'
}) => {
  const sizeClasses = {
    xs: 'text-xs px-1 py-0.5',
    sm: 'text-xs px-2 py-1', 
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  const iconSizes = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16
  };

  return (
    <div className={`
      inline-flex items-center rounded-full font-medium
      bg-gradient-to-r from-yellow-400 to-orange-500 
      text-white shadow-sm
      ${sizeClasses[size]} 
      ${className}
    `}>
      {showIcon && (
        <Crown size={iconSizes[size]} className="mr-1" />
      )}
      {text}
    </div>
  );
};

export default PremiumBadge;