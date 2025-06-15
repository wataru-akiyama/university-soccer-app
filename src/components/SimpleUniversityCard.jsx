// src/components/SimpleUniversityCard.jsx - 進路プラン対応版
import React from 'react';
import { Heart, Plus, Check, MapPin, ChevronUp, ChevronDown, X, Info } from 'lucide-react';

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
  const getLeagueColor = (league) => {
    if (league.includes('1部')) return 'bg-green-100 text-green-800';
    if (league.includes('2部')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
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
      
      {/* カードヘッダー - 大学名とハイライト */}
      <div className="p-3 sm:p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex">
          {/* 大学ロゴ */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center mr-3 overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
            <img 
              src={`/images/logos/${university.id}.png`}
              alt={`${university.university_name} ロゴ`}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${process.env.PUBLIC_URL}/images/default-logo.png`;
              }}
            />
          </div>
          
          <div className="flex-1 min-w-0 pr-16"> {/* 右のボタンスペース確保 */}
            <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1 truncate">{university.university_name}</h3>
            
            {/* タグエリア - リーグと練習場所を表示 */}
            <div className="flex flex-wrap gap-1">
              {/* リーグバッジ */}
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${getLeagueColor(university.soccer_club.league)}`}>
                {/* 小画面では短縮表示 */}
                <span className="hidden sm:inline">{university.soccer_club.league}</span>
                <span className="sm:hidden">
                  {university.soccer_club.league.includes('1部') ? '1部' : 
                   university.soccer_club.league.includes('2部') ? '2部' : '他'}
                </span>
              </span>
              
              {/* 練習場所情報 - 大画面のみ表示 */}
              {university.soccer_club.practice_location && (
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">
                  <MapPin size={10} className="mr-1" />
                  {university.soccer_club.practice_location}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* カード本体 */}
      <div className="p-3 sm:p-4">
        {/* 基本情報 - レスポンシブグリッド */}
        <div className="mb-3 sm:mb-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">部員数:</span>
              <span className="font-medium">{university.soccer_club.total_members}名</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 truncate">監督:</span>
              <span className="font-medium truncate ml-1">{university.soccer_club.coach_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">J内定:</span>
              <span className="font-medium text-yellow-600">{university.soccer_club.j_league_nominees_2022_24 || 0}名</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">コート:</span>
              <span className="font-medium">{university.soccer_club.soccer_field_count}面</span>
            </div>
          </div>
        </div>
        
        {/* 特徴タグ - 小画面では重要なもののみ表示 */}
        <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
          {university.entry_conditions.sports_recommend && (
            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-100">
              <span className="hidden sm:inline">スポーツ推薦</span>
              <span className="sm:hidden">推薦</span>
            </span>
          )}
          
          {university.soccer_club.dorm_available && (
            <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full border border-purple-100">
              寮あり
            </span>
          )}
          
          {/* 小画面では最大2つまで表示 */}
          {university.entry_conditions.selection && (
            <span className="hidden sm:inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-100">
              セレクション
            </span>
          )}
          
          {university.soccer_club.sports_scholarship && (
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
    </div>
  );
};

export default SimpleUniversityCard;