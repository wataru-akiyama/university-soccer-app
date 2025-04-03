// src/components/UniversityCard.jsx
import React from 'react';
import { Award, Users, GraduationCap, Calendar, Zap, MapPin, Heart, TrendingUp, TrendingDown, Minus, ChevronRight, Check, PlusCircle } from 'lucide-react';

const UniversityCard = ({ 
  university, 
  onViewDetails, 
  onAddToCompare, 
  isInCompareList, 
  onRemoveFromCompare,
  onAddToFavorites,
  onRemoveFromFavorites,
  isInFavorites
}) => {
  // Jリーグ内定者のトレンド表示用関数
  const getTrendIcon = () => {
    const jLeagueThis = university.soccer_club.j_league_nominees_2024 || 0;
    const jLeaguePrev = university.soccer_club.j_league_nominees_2023 || 0;
    
    if (jLeagueThis > jLeaguePrev) {
      return <TrendingUp size={16} className="text-green-600" />;
    } else if (jLeagueThis < jLeaguePrev) {
      return <TrendingDown size={16} className="text-red-600" />;
    } else {
      return <Minus size={16} className="text-gray-600" />;
    }
  };
  
  // Jリーグ内定者の3年間合計
  const totalJLeagueNominees = 
    (university.soccer_club.j_league_nominees_2022 || 0) + 
    (university.soccer_club.j_league_nominees_2023 || 0) + 
    (university.soccer_club.j_league_nominees_2024 || 0);
  
  // デンソーカップ出場者の合計
  const totalDensoCup = 
    (university.soccer_club.denso_cup_2024_25 || 0);
  
  return (
    <div className="rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-white shadow-md border border-gray-100 flex flex-col h-full">
      {/* ヘッダー部分 - 大学イメージ */}
      <div className="h-48 bg-gradient-to-r from-green-500 to-green-600 relative">
        {/* 背景画像 */}
        <img 
          src={`/images/universities/${university.id}.jpg`} 
          alt={university.university_name}
          className="w-full h-full object-cover opacity-80"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `${process.env.PUBLIC_URL}/images/university-default.jpg`;
          }}
        />
        
        {/* お気に入りボタン */}
        <button
          className={`absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-90 shadow-md ${isInFavorites ? 'text-red-500' : 'text-gray-400'} hover:text-red-600 transition-colors`}
          onClick={() => {
            if (isInFavorites) {
              onRemoveFromFavorites(university.id);
            } else {
              onAddToFavorites(university);
            }
          }}
          title={isInFavorites ? "お気に入りから削除" : "お気に入りに追加"}
        >
          <Heart size={20} fill={isInFavorites ? "currentColor" : "none"} />
        </button>
        
        {/* カテゴリバッジ */}
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
          {university.soccer_club.league}
        </span>
        
        {/* ロゴと大学名オーバーレイ */}
        <div className="absolute left-0 bottom-0 right-0 bg-white bg-opacity-90 p-4">
          <div className="flex items-center">
            {/* 大学ロゴ */}
            <div className="bg-white rounded-full p-2 mr-3 shadow-md w-12 h-12 flex items-center justify-center">
              <img 
                src={`/images/logos/${university.id}.png`}
                alt={`${university.university_name} ロゴ`}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${process.env.PUBLIC_URL}/images/default-logo.png`;
                }}
              />
            </div>
            
            {/* 大学名と監督名 */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{university.university_name}</h3>
              <p className="text-sm text-gray-600 flex items-center">
                <GraduationCap size={14} className="mr-1" />
                <span>{university.soccer_club.coach_name}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* カード本体 */}
      <div className="p-5 flex flex-col flex-grow">
        {/* 特徴タグ */}
        <div className="flex flex-wrap gap-2 mb-4">
          {university.entry_conditions.sports_recommend && (
            <span className="bg-green-100 text-green-800 text-xs px-3 py-1.5 rounded-full font-medium">
              スポーツ推薦あり
            </span>
          )}
          
          {university.entry_conditions.selection && (
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full font-medium">
              セレクションあり
            </span>
          )}
          
          {university.soccer_club.dorm_available && (
            <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1.5 rounded-full font-medium">
              寮あり
            </span>
          )}
          
          {/* 評定基準バッジ */}
          {university.entry_conditions.sports_recommend && university.entry_conditions.recommend_criteria && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1.5 rounded-full font-medium">
              {university.entry_conditions.recommend_criteria.includes('評定') 
                ? university.entry_conditions.recommend_criteria.match(/評定([0-9.]+)/)?.[0] || '評定あり'
                : '評定あり'}
            </span>
          )}
        </div>
        
        {/* 実績グリッド */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Jリーグ内定実績 */}
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Award className="text-yellow-500 mr-2" size={18} />
                <span className="text-sm font-medium text-yellow-700">Jリーグ内定</span>
              </div>
              <div className="flex items-center">
                {getTrendIcon()}
              </div>
            </div>
            <p className="text-xl font-bold text-center text-yellow-800">
              {totalJLeagueNominees}名
            </p>
            
            {/* 年度別内訳（小さく） */}
            <div className="flex justify-center mt-1 text-xs text-gray-500 space-x-2">
              <span>22年:{university.soccer_club.j_league_nominees_2022 || 0}名</span>
              <span>23年:{university.soccer_club.j_league_nominees_2023 || 0}名</span>
              <span>24年:{university.soccer_club.j_league_nominees_2024 || 0}名</span>
            </div>
          </div>
          
          {/* 部員数 */}
          <div className="bg-green-50 p-3 rounded-lg border border-green-100 shadow-sm">
            <div className="flex items-center mb-1">
              <Users className="text-green-500 mr-2" size={18} />
              <span className="text-sm font-medium text-green-700">部員数</span>
            </div>
            <p className="text-xl font-bold text-center text-green-800">{university.soccer_club.total_members}名</p>
          </div>
        </div>
        
        {/* 学部情報 */}
        <div className="mb-4 text-sm text-gray-700 flex items-start">
          <MapPin size={16} className="mr-1 mt-0.5 flex-shrink-0" />
          <p className="line-clamp-2">{university.main_faculties.join('、')}</p>
        </div>
        
        {/* デンソーカップ情報 */}
        {totalDensoCup > 0 && (
          <div className="mb-4 text-sm text-gray-700 flex items-center">
            <Zap size={16} className="mr-1 text-blue-500" />
            <span>デンソーカップ出場: {totalDensoCup}名</span>
          </div>
        )}
        
        {/* 新入部員数 - 入手できる場合 */}
        {university.newMembers2024 && (
          <div className="mb-4 text-sm text-gray-700 flex items-center">
            <Calendar size={16} className="mr-1 text-green-600" />
            <span>新入部員: {university.newMembers2024}</span>
          </div>
        )}
        
        <div className="mt-auto flex justify-between">
          {/* 詳細ボタン */}
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center shadow-sm transition-colors"
            onClick={() => onViewDetails(university)}
          >
            詳細を見る
            <ChevronRight size={16} className="ml-1" />
          </button>
          
          {/* 比較ボタン */}
          <button 
            className={`px-3 py-2 rounded-lg border flex items-center shadow-sm transition-colors ${
              isInCompareList
                ? "bg-gray-200 text-gray-700 border-gray-300"
                : "bg-white text-green-600 border-green-300 hover:bg-green-50"
            }`}
            onClick={() => {
              if (isInCompareList) {
                onRemoveFromCompare(university.id);
              } else {
                onAddToCompare(university);
              }
            }}
          >
            {isInCompareList ? (
              <>
                <Check size={16} className="mr-1" />
                比較中
              </>
            ) : (
              <>
                <PlusCircle size={16} className="mr-1" />
                比較に追加
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniversityCard;