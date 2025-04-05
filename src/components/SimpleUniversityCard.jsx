import React from 'react';
import { Award, Users, Star, Heart, Plus, Check } from 'lucide-react';

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
  // Jリーグ内定者の3年間合計を計算
  const totalJLeagueNominees = 
    (university.soccer_club.j_league_nominees_2022 || 0) + 
    (university.soccer_club.j_league_nominees_2023 || 0) + 
    (university.soccer_club.j_league_nominees_2024 || 0);
  
  // Jリーグ内定数に基づく星評価（レーティング）を取得
  const getRating = (nominees) => {
    if (nominees >= 8) return 5;
    if (nominees >= 6) return 4;
    if (nominees >= 4) return 3;
    if (nominees >= 2) return 2;
    return 1;
  };
  
  const jLeagueRating = getRating(totalJLeagueNominees);
  
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
            
            {/* リーグバッジ */}
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${getLeagueColor(university.soccer_club.league)}`}>
              {university.soccer_club.league}
            </span>
          </div>
        </div>
        
        {/* ハイライト情報 - もし存在すれば表示 */}
        {university.soccer_club.highlight && (
          <div className="mt-3 bg-yellow-50 rounded-lg p-2 border border-yellow-100">
            <div className="flex items-center">
              <Star className="text-yellow-500 w-4 h-4 mr-1 flex-shrink-0" />
              <p className="text-sm text-yellow-700">{university.soccer_club.highlight}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* カード本体 */}
      <div className="p-4">
        <div className="flex justify-between mb-4">
          {/* Jリーグ内定者数 */}
          <div className="flex-1">
            <div className="flex items-center">
              <Award className="text-yellow-500 mr-1 w-4 h-4" />
              <span className="text-sm font-medium">Jリーグ内定</span>
            </div>
            <div className="mt-1 flex items-center">
              <span className="text-lg font-bold text-yellow-700">{totalJLeagueNominees}名</span>
              <div className="ml-2 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < jLeagueRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* 部員数 */}
          <div className="flex-1 text-right">
            <div className="flex items-center justify-end">
              <Users className="text-green-500 mr-1 w-4 h-4" />
              <span className="text-sm font-medium">部員数</span>
            </div>
            <p className="text-lg font-bold text-green-700 mt-1">
              {university.soccer_club.total_members}名
            </p>
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