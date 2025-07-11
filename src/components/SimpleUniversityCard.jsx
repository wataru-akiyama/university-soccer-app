// src/components/SimpleUniversityCard.jsx - Firebase新形式対応版（志向性表示部分の修正）

import React from 'react';
import { Heart, Plus, Check, MapPin, ChevronUp, ChevronDown, X, Info, Star, Target } from 'lucide-react';
import UniversityLogo from './UniversityLogo';

const SimpleUniversityCard = ({ 
  university, 
  onViewDetails,
  onAddToCompare,
  onRemoveFromCompare,
  isInCompareList,
  onAddToFavorites,
  onRemoveFromFavorites,
  isInFavorites,
  // 進路プラン用の新しいprops
  isPortfolioMode = false,
  portfolioRank = null,
  onMoveUp = null,
  onMoveDown = null,
  canMoveUp = true,
  canMoveDown = true,
  onRemoveFromPortfolio = null
}) => {
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

  // 志向性テキストの短縮
  const getShortGenre = (genre) => {
    if (!genre) return '';
    
    const parts = genre.split('：');
    if (parts.length > 1) {
      const type = parts[0];
      const description = parts[1];
      if (description.length > 15) {
        return `${type}：${description.substring(0, 15)}...`;
      }
    }
    return genre;
  };

  // 学力ランクテキストの短縮
  const getShortAcademicRank = (rank) => {
    if (!rank) return '';
    return rank.split('：')[0]; // 「A」「B」などの部分のみ
  };

  // PLAYMAKERコメントの取得
  const getPlaymakerComment = () => {
    return university.extended_data?.playmaker_comment || 
           "この大学の詳細な評価情報は準備中です。";
  };

  // 志向性の取得（Firebase新形式対応）
  const getGenres = () => {
    // Firebase新形式: genres配列を優先
    if (university.genres && Array.isArray(university.genres) && university.genres.length > 0) {
      return university.genres.filter(genre => genre && genre.trim() !== '');
    }
    
    // 旧形式フォールバック（互換性のため）
    const genres = [];
    if (university.genre1 && university.genre1.trim()) genres.push(university.genre1);
    if (university.genre2 && university.genre2.trim()) genres.push(university.genre2);
    
    return genres;
  };

  // 練習場所の取得（Firebase新形式対応）
  const getPracticeLocation = () => {
    // Firebase新形式: facilities.ground_name を優先
    if (university.facilities?.ground_name) {
      return university.facilities.ground_name;
    }
    
    // フォールバック
    return university.soccer_club?.practice_location || '';
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
  const academicRank = university.academic_rank || '';
  const practiceLocation = getPracticeLocation();
  const playmakerComment = getPlaymakerComment();
  
  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-200 cursor-pointer overflow-hidden relative"
      onClick={() => onViewDetails(university)}
    >
      {/* 進路プラン用の志望順位バッジ */}
      {isPortfolioMode && portfolioRank && (
        <div className="absolute top-3 left-3 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md font-bold text-sm z-10">
          {portfolioRank}
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
            title="進路プランから削除"
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
            title={isInFavorites ? "私の進路プランから削除" : "私の進路プランに追加"}
          >
            <Heart size={18} fill={isInFavorites ? "currentColor" : "none"} />
          </button>
        )}
      </div>
      
      {/* カードヘッダー - 大学名とバッジ */}
      <div className="p-3 sm:p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
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
            
            {/* 第1行: リーグバッジ + 練習場所バッジ */}
            <div className="flex flex-wrap gap-1">
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs border ${getLeagueColor(university.soccer_club?.league || '')}`}>
                <span className="hidden sm:inline">{university.soccer_club?.league || 'リーグ不明'}</span>
                <span className="sm:hidden">
                  {(university.soccer_club?.league || '').includes('1部') ? '1部' : 
                   (university.soccer_club?.league || '').includes('2部') ? '2部' : '他'}
                </span>
              </span>
              
              {practiceLocation && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200">
                  <MapPin size={10} className="mr-1" />
                  <span className="hidden sm:inline">{practiceLocation}</span>
                  <span className="sm:hidden">{practiceLocation.length > 8 ? practiceLocation.substring(0, 8) + '...' : practiceLocation}</span>
                </span>
              )}
            </div>

            {/* 第2行: 学力ランクバッジ + 志向性バッジ */}
            <div className="flex flex-wrap gap-1">
              {academicRank && (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${getAcademicRankColor(academicRank)}`}>
                  <Star size={10} className="mr-1" />
                  <span className="hidden sm:inline">{academicRank}</span>
                  <span className="sm:hidden">{getShortAcademicRank(academicRank)}</span>
                </span>
              )}
              
              {genres.length > 0 && (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${getGenreColor(genres[0])}`}>
                  <Target size={10} className="mr-1" />
                  <span className="hidden sm:inline">{getShortGenre(genres[0])}</span>
                  <span className="sm:hidden">{genres[0].split('：')[0]}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* カード本体 */}
      <div className="p-3 sm:p-4">
        {/* PLAYMAKERコメント */}
        <div className="mb-3 sm:mb-4">
          <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
              {playmakerComment}
            </p>
          </div>
        </div>
        
        {/* 特徴タグ - Firebase新形式対応 */}
        <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
          {university.entry_conditions?.sports_recommend && (
            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-100">
              <span className="hidden sm:inline">スポーツ推薦</span>
              <span className="sm:hidden">推薦</span>
            </span>
          )}
          
          {university.soccer_club?.dorm_available && (
            <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full border border-purple-100">
              寮あり
            </span>
          )}
          
          {university.entry_conditions?.selection && (
            <span className="hidden sm:inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-100">
              セレクション
            </span>
          )}
          
          {university.soccer_club?.sports_scholarship && (
            <span className="hidden sm:inline-block bg-yellow-50 text-yellow-700 text-xs px-2 py-1 rounded-full border border-yellow-100">
              奨学金あり
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

          {/* 比較リストに追加ボタン */}
          {!isPortfolioMode && (
            <div className="flex justify-end w-full">
              <button 
                className={`${isInCompareList 
                  ? 'bg-gray-100 text-gray-500' 
                  : 'text-green-600 border border-green-200 hover:bg-green-50'
                } px-3 py-1.5 rounded-lg text-sm font-medium flex items-center transition-colors`}
                onClick={handleCompareClick}
              >
                {isInCompareList ? (
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