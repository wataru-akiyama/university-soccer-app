// src/components/UniversityLogo.jsx - 本番環境対応版
import React, { useState } from 'react';
import { useUniversityImage } from '../hooks/useUniversityImage';

/**
 * 大学ロゴを表示するコンポーネント（本番環境対応版）
 * @param {Object} props
 * @param {Object} props.university - 大学データオブジェクト
 * @param {string} props.size - ロゴサイズ ('xs'|'sm'|'md'|'lg'|'xl')
 * @param {string} props.className - 追加のCSSクラス
 * @param {boolean} props.showFallback - フォールバック表示するか
 * @param {function} props.onClick - クリック時のイベントハンドラ
 */
const UniversityLogo = ({ 
  university, 
  size = 'md', 
  className = '',
  showFallback = true,
  onClick,
  alt
}) => {
  const { imageUrl, isLoading, hasError, debugInfo } = useUniversityImage(university);
  const [imgError, setImgError] = useState(false);
  
  // サイズクラスの定義
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  // フォールバック文字の取得
  const getFallbackText = () => {
    if (!university?.university_name) return 'U';
    return university.university_name.charAt(0);
  };

  // ベースのコンテナクラス
  const containerClasses = `
    ${sizeClasses[size]} 
    ${className} 
    rounded-full 
    overflow-hidden 
    border 
    border-gray-200 
    bg-white 
    flex 
    items-center 
    justify-center 
    flex-shrink-0
    ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
  `.trim().replace(/\s+/g, ' ');

  // 画像エラーハンドラー
  const handleImageError = (e) => {
    console.log('🖼️ Image error in UniversityLogo:', {
      src: e.target.src,
      university: university?.university_name,
      debugInfo
    });
    setImgError(true);
  };

  // 画像ロードハンドラー
  const handleImageLoad = (e) => {
    console.log('🖼️ Image loaded in UniversityLogo:', {
      src: e.target.src,
      university: university?.university_name,
      naturalWidth: e.target.naturalWidth,
      naturalHeight: e.target.naturalHeight
    });
    setImgError(false);
  };

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className={containerClasses} onClick={onClick}>
        <div className="w-full h-full bg-gray-200 rounded-full animate-pulse flex items-center justify-center">
          <svg className="w-1/2 h-1/2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    );
  }

  // 画像が正常に読み込まれ、かつコンポーネント内でエラーが発生していない場合
  if (imageUrl && !hasError && !imgError) {
    return (
      <div className={containerClasses} onClick={onClick}>
        <img 
          src={imageUrl}
          alt={alt || `${university?.university_name || '大学'} ロゴ`}
          className="w-full h-full object-contain p-1"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      </div>
    );
  }

  // エラー時またはshowFallbackがtrueの場合のフォールバック表示
  if (showFallback) {
    return (
      <div className={containerClasses} onClick={onClick}>
        <div className="w-full h-full bg-green-100 text-green-600 font-bold flex items-center justify-center text-sm">
          {getFallbackText()}
        </div>
      </div>
    );
  }

  // フォールバックを表示しない場合は何も表示しない
  return null;
};

export default UniversityLogo;