// src/components/SimpleUniversityCard.jsx - 統一スタイル版（PLAYMAKERコメント60文字制限）

import React from 'react';
import { Heart, Plus, Check, MapPin, ChevronUp, ChevronDown, X, Info, Star, Target, Lock } from 'lucide-react';
import UniversityLogo from './UniversityLogo';
import PremiumBadge from './PremiumBadge';

const SimpleUniversityCard = ({ 
  university, 
  onViewDetails,
  onAddToCompare,
  onRemoveFromCompare,
  isInCompareList,
  onAddToFavorites,
  onRemoveFromFavorites,
  isInFavorites,
  // 進路プラン用のprops
  isPortfolioMode = false,
  portfolioRank = null,
  onMoveUp = null,
  onMoveDown = null,
  canMoveUp = true,
  canMoveDown = true,
  onRemoveFromPortfolio = null,
  // プレミアム関連のprops
  isPremium = false
}) => {
  // 早期リターン: universityがnullまたはundefinedの場合
  if (!university) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <div className="text-center py-8">
          <p className="text-gray-500">大学データを読み込み中...</p>
        </div>
      </div>
    );
  }

  // リーグバッジの色分け
  const getLeagueColor = (league) => {
    if (league?.includes('1部')) return 'bg-green-100 text-green-800 border-green-200';
    if (league?.includes('2部')) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // 学力ランクバッジの色分け
  const getAcademicRankColor = (rank) => {
    if (!rank) return 'bg-gray-100 text-gray-800 border-gray-200';
    
    if (rank.startsWith('A：')) return 'bg-red-100 text-red-800 border-red-200';
    if (rank.startsWith('B：')) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (rank.startsWith('C：')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (rank.startsWith('D：')) return 'bg-green-100 text-green-800 border-green-200';
    if (rank.startsWith('E：')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (rank.startsWith('F：')) return 'bg-purple-100 text-purple-800 border-purple-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // 志向性バッジの色分け
  const getGenreColor = (genre) => {
    if (!genre) return 'bg-gray-50 text-gray-700 border-gray-200';
    
    if (genre.startsWith('A：')) return 'bg-red-50 text-red-700 border-red-200';
    if (genre.startsWith('B：')) return 'bg-orange-50 text-orange-700 border-orange-200';
    if (genre.startsWith('C：')) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    if (genre.startsWith('D：')) return 'bg-green-50 text-green-700 border-green-200';
    if (genre.startsWith('E：')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (genre.startsWith('F：')) return 'bg-purple-50 text-purple-700 border-purple-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  // PLAYMAKERコメントの取得とマスク処理（120文字→60文字に変更）
  const getPlaymakerComment = () => {
    if (!university) return "大学データが読み込み中です。";
    
    const fullComment = university.extended_data?.playmaker_comment || 
                       "この大学の詳細な評価情報は準備中です。";
    
    if (!isPremium && fullComment.length > 60) {
      // フリープランでは60文字で切り詰め
      return fullComment.substring(0, 60) + "...";
    }
    
    return fullComment;
  };

  // プレミアム限定情報かどうかの判定（120文字→60文字に変更）
  const isPremiumContent = () => {
    if (!university) return false;
    
    const comment = university.extended_data?.playmaker_comment || "";
    return !isPremium && comment.length > 60;
  };

  // 志向性の取得（Firebase新形式対応）
  const getGenres = () => {
    if (!university) return [];
    
    if (university.genres && Array.isArray(university.genres) && university.genres.length > 0) {
      return university.genres.filter(genre => genre && genre.trim() !== '');
    }
    
    const genres = [];
    if (university.genre1 && university.genre1.trim()) genres.push(university.genre1);
    if (university.genre2 && university.genre2.trim()) genres.push(university.genre2);
    
    return genres;
  };

  // 練習場所の取得（グラウンド住所から都道府県+市を抽出）
  const getPracticeLocationWithArea = () => {
    if (!university) return '';
    
    // グラウンド住所から都道府県+市を抽出
    const groundAddress = university.facilities?.ground_address || 
                         university.soccer_club?.ground_address || 
                         university.facilities?.address || '';
    
    if (groundAddress) {
      // 住所から都道府県+市を抽出する正規表現
      const addressMatch = groundAddress.match(/^(.*?[都道府県])(.*?[市区町村])/);
      
      if (addressMatch) {
        const prefecture = addressMatch[1]; // 都道府県
        const city = addressMatch[2]; // 市区町村
        return `${prefecture}${city}`;
      }
      
      // 正規表現でマッチしない場合は、住所の最初の部分を返す
      const addressParts = groundAddress.split(/\s+/);
      if (addressParts.length > 0) {
        return addressParts[0];
      }
    }
    
    // グラウンド住所がない場合は、大学の所在地情報をフォールバック
    const universityArea = university.area || university.location || '';
    
    // 大学所在地も都道府県+市形式に変換
    if (universityArea) {
      const areaMatch = universityArea.match(/^(.*?[都道府県])(.*?[市区町村])/);
      if (areaMatch) {
        return `${areaMatch[1]}${areaMatch[2]}`;
      }
      return universityArea;
    }
    
    return '';
  };
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isInFavorites) {
      onRemoveFromFavorites(university.id);
    } else {
      onAddToFavorites(university);
    }
  };
  
  const handleCompareClick = (e) => {
    e.stopPropagation();
    
    if (!isPremium) {
      // フリープランでは比較機能を制限
      alert('比較機能はプレミアムプラン限定です。プレミアムプランにアップグレードしてください。');
      return;
    }
    
    if (isInCompareList) {
      onRemoveFromCompare(university.id);
    } else {
      onAddToCompare(university);
    }
  };

  const handleMoveUp = (e) => {
    e.stopPropagation();
    onMoveUp && onMoveUp();
  };

  const handleMoveDown = (e) => {
    e.stopPropagation();
    onMoveDown && onMoveDown();
  };

  const handleRemoveFromPortfolio = (e) => {
    e.stopPropagation();
    onRemoveFromPortfolio && onRemoveFromPortfolio(university.id);
  };

  // データ取得
  const genres = getGenres();
  const academicRank = university?.academic_rank || '';
  const practiceLocationWithArea = getPracticeLocationWithArea();
  const playmakerComment = getPlaymakerComment();
  const hasPremiumContent = isPremiumContent();
  const league = university.soccer_club?.league || '';
  
  return (
    <div 
      className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden relative"
      onClick={() => onViewDetails(university)}
    >
      {/* 進路プラン用の順位番号 - コンパクトなデザイン */}
      {isPortfolioMode && portfolioRank && (
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg font-bold text-sm">
            {portfolioRank}
          </div>
        </div>
      )}

      {/* 右上のボタンエリア */}
      <div className="absolute top-3 right-3 flex space-x-1 z-10">
        {/* 進路プラン用の順序変更ボタン */}
        {isPortfolioMode && (
          <div className="flex flex-col">
            <button
              onClick={handleMoveUp}
              disabled={!canMoveUp}
              className={`p-1 rounded-full ${!canMoveUp ? 'text-gray-300' : 'text-green-500 hover:bg-green-50'} bg-white bg-opacity-90 shadow-sm transition-colors`}
              title="上に移動"
            >
              <ChevronUp size={14} />
            </button>
            <button
              onClick={handleMoveDown}
              disabled={!canMoveDown}
              className={`p-1 rounded-full ${!canMoveDown ? 'text-gray-300' : 'text-green-500 hover:bg-green-50'} bg-white bg-opacity-90 shadow-sm transition-colors`}
              title="下に移動"
            >
              <ChevronDown size={14} />
            </button>
          </div>
        )}

        {/* 進路プラン用の削除ボタン または お気に入りボタン */}
        {isPortfolioMode ? (
          <button
            className="p-2 rounded-full bg-white bg-opacity-90 text-red-500 hover:text-red-700 shadow-sm transition-colors"
            onClick={handleRemoveFromPortfolio}
            title="お気に入りから削除"
          >
            <X size={16} />
          </button>
        ) : (
          <button
            className={`p-2 rounded-full z-10 ${
              isInFavorites 
                ? 'bg-white bg-opacity-90 text-red-500' 
                : 'bg-white bg-opacity-90 text-gray-400 hover:text-red-500'
            } shadow-sm transition-colors`}
            onClick={handleFavoriteClick}
            title={isInFavorites ? "お気に入りから削除" : "お気に入りに追加"}
          >
            <Heart size={18} fill={isInFavorites ? "currentColor" : "none"} />
          </button>
        )}
      </div>
      
      {/* カードヘッダー - 大学名とバッジ */}
      <div className={`pb-4 border-b border-gray-100 ${isPortfolioMode ? 'pt-12' : ''}`}>
        <div className="flex">
          {/* 大学ロゴ */}
          <UniversityLogo 
            university={university}
            size="md"
            className="mr-3 shadow-sm"
            showFallback={true}
          />
          
          <div className="flex-1 min-w-0 pr-16 space-y-2">
            {/* 大学名 */}
            <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">
              {university.university_name || '大学名不明'}
            </h3>
            
            {/* バッジエリア - スマホは縦並び、PC以上は2行横並び */}
            <div className="space-y-1">
              {/* デスクトップ表示（2行横並び） */}
              <div className="hidden sm:block space-y-1">
                {/* 第1行: リーグバッジ + 練習場所バッジ */}
                <div className="flex flex-wrap gap-1">
                  {league && (
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs border ${getLeagueColor(league)}`}>
                      {league}
                    </span>
                  )}
                  
                  {practiceLocationWithArea && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200">
                      <MapPin size={10} className="mr-1" />
                      {practiceLocationWithArea}
                    </span>
                  )}
                </div>

                {/* 第2行: 志向性バッジ + 学力ランクバッジ（順序変更） */}
                <div className="flex flex-wrap gap-1">
                  {genres.length > 0 && (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${getGenreColor(genres[0])}`}>
                      <Target size={10} className="mr-1" />
                      {genres[0]}
                    </span>
                  )}
                  
                  {academicRank && (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${getAcademicRankColor(academicRank)}`}>
                      <Star size={10} className="mr-1" />
                      {academicRank}
                    </span>
                  )}
                </div>
              </div>

              {/* モバイル表示（縦並び） */}
              <div className="sm:hidden space-y-1">
                {/* リーグバッジ */}
                {league && (
                  <div className="flex">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs border ${getLeagueColor(league)}`}>
                      {league}
                    </span>
                  </div>
                )}
                
                {/* 練習場所バッジ */}
                {practiceLocationWithArea && (
                  <div className="flex">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200">
                      <MapPin size={10} className="mr-1" />
                      {practiceLocationWithArea}
                    </span>
                  </div>
                )}

                {/* 志向性バッジ */}
                {genres.length > 0 && (
                  <div className="flex">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${getGenreColor(genres[0])}`}>
                      <Target size={10} className="mr-1" />
                      {genres[0]}
                    </span>
                  </div>
                )}
                
                {/* 学力ランクバッジ */}
                {academicRank && (
                  <div className="flex">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${getAcademicRankColor(academicRank)}`}>
                      <Star size={10} className="mr-1" />
                      {academicRank}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* カード本体 */}
      <div className="pt-4">
        {/* PLAYMAKERコメント（プレミアム制限付き、60文字制限） */}
        <div className="mb-4">
          <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-800">PLAYMAKERコメント</span>
              {hasPremiumContent && <PremiumBadge />}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
              {playmakerComment}
            </p>
            {hasPremiumContent && (
              <div className="mt-2 flex items-center text-xs text-orange-600">
                <Lock size={12} className="mr-1" />
                <span>続きはプレミアムプランで</span>
              </div>
            )}
          </div>
        </div>
        
        {/* 特徴タグ */}
        <div className="flex flex-wrap gap-1 mb-4">
          {university.entry_conditions?.sports_recommend && (
            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-100">
              スポーツ推薦あり
            </span>
          )}
          
          {(university.entry_conditions?.general_admission || !university.entry_conditions?.sports_recommend) && (
            <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-100">
              一般入部可
            </span>
          )}
        </div>
        
        {/* ボトムアクションエリア */}
        <div className="flex justify-between items-center">
          {/* 進路プラン用の詳細表示ボタン */}
          {isPortfolioMode && (
            <button 
              className="text-green-600 font-medium text-sm flex items-center hover:text-green-700 transition-colors" 
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(university);
              }}
            >
              <Info size={14} className="mr-1" />
              詳細を見る
            </button>
          )}

          {/* 比較リストに追加ボタン（プレミアム制限付き） */}
          {!isPortfolioMode && (
            <div className="flex justify-end w-full">
              <button 
                className={`${
                  !isPremium 
                    ? 'bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed' 
                    : isInCompareList 
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                      : 'text-green-600 border border-green-200 hover:bg-green-50'
                } px-3 py-1.5 rounded-lg text-sm font-medium flex items-center transition-colors`}
                onClick={handleCompareClick}
                disabled={!isPremium || isInCompareList}
              >
                {!isPremium ? (
                  <>
                    <Lock size={16} className="mr-1" />
                    <span className="hidden xs:inline">比較機能</span>
                    <span className="xs:hidden">比較</span>
                  </>
                ) : isInCompareList ? (
                  <>
                    <Check size={16} className="mr-1" />
                    <span className="hidden xs:inline">比較中</span>
                    <span className="xs:hidden">比較中</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} className="mr-1" />
                    <span className="hidden xs:inline">比較リストに追加</span>
                    <span className="xs:hidden">比較追加</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* line-clamp-3 用のスタイル */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default SimpleUniversityCard;