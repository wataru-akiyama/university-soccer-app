// src/components/SimpleUniversityCard.jsx (コメント削除版)
import React from 'react';
import { Heart, Plus, Check, MapPin } from 'lucide-react';

const SimpleUniversityCard = ({ 
  university, 
  onViewDetails,
  onAddToCompare,
  onRemoveFromCompare,
  isInCompareList,
  onAddToFavorites,
  onRemoveFromFavorites,
  isInFavorites
}) => {
  // リーグに基づく色を取得
  const getLeagueColor = (league) => {
    if (league.includes('1部')) return 'bg-green-100 text-green-800';
    if (league.includes('2部')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };
  
  // お気に入りボタン用のハンドラー
  const handleFavoriteClick = (e) => {
    // イベント伝播を停止して、カード全体のクリックを防ぐ
    e.stopPropagation();
    
    if (isInFavorites) {
      onRemoveFromFavorites(university.id);
    } else {
      onAddToFavorites(university);
    }
  };
  
  // 比較ボタン用のハンドラー
  const handleCompareClick = (e) => {
    e.stopPropagation();
    if (isInCompareList) {
      onRemoveFromCompare(university.id);
    } else {
      onAddToCompare(university);
    }
  };
  
  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-200 cursor-pointer overflow-hidden relative"
      onClick={() => onViewDetails(university)}
    >
      {/* お気に入りボタン - 右上に固定 */}
      <button
        className={`absolute top-3 right-3 p-2 rounded-full z-10 ${
          isInFavorites 
            ? 'bg-white bg-opacity-90 text-red-500' 
            : 'bg-white bg-opacity-90 text-gray-400 hover:text-red-500'
        } shadow-sm transition-colors`}
        onClick={handleFavoriteClick}
        title={isInFavorites ? "私の進路プランから削除" : "私の進路プランに追加"}
      >
        <Heart size={18} fill={isInFavorites ? "currentColor" : "none"} />
      </button>
      
      {/* カードヘッダー - 大学名とハイライト */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex">
          {/* 大学ロゴ */}
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mr-3 overflow-hidden border border-gray-200 shadow-sm">
            <img 
              src={`/images/logos/${university.id}.png`}
              alt={`${university.university_name} ロゴ`}
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${process.env.PUBLIC_URL}/images/default-logo.png`;
              }}
            />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800 mb-1">{university.university_name}</h3>
            
            {/* タグエリア - リーグと練習場所を表示 */}
            <div className="flex flex-wrap gap-1">
                {/* リーグバッジ */}
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${getLeagueColor(university.soccer_club.league)}`}>
                    {university.soccer_club.league}
                </span>
                
                {/* 練習場所情報 - 存在する場合のみ表示 */}
                {university.soccer_club.practice_location && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">
                    <MapPin size={10} className="mr-1" />
                    {university.soccer_club.practice_location}
                    </span>
                )}
            </div>
          </div>
        </div>
      </div>
      
      {/* カード本体 */}
      <div className="p-4">
        {/* 基本情報 */}
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">部員数:</span>
              <span className="font-medium">{university.soccer_club.total_members}名</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">監督:</span>
              <span className="font-medium">{university.soccer_club.coach_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Jリーグ内定:</span>
              <span className="font-medium text-yellow-600">{university.soccer_club.j_league_nominees_2022_24 || 0}名</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">コート数:</span>
              <span className="font-medium">{university.soccer_club.soccer_field_count}面</span>
            </div>
          </div>
        </div>
        
        {/* 特徴タグ */}
        <div className="flex flex-wrap gap-1 mb-4">
          {university.entry_conditions.sports_recommend && (
            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-100">
              スポーツ推薦
            </span>
          )}
          
          {university.soccer_club.dorm_available && (
            <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full border border-purple-100">
              寮あり
            </span>
          )}
          
          {university.entry_conditions.selection && (
            <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-100">
              セレクション
            </span>
          )}
          
          {university.soccer_club.sports_scholarship && (
            <span className="bg-yellow-50 text-yellow-700 text-xs px-2 py-1 rounded-full border border-yellow-100">
              奨学金あり
            </span>
          )}
        </div>
        
        {/* 比較リストに追加ボタン */}
        <div className="flex justify-end">
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
                比較中
              </>
            ) : (
              <>
                <Plus size={16} className="mr-1" />
                比較リストに追加
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleUniversityCard;