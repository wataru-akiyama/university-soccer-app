import React from 'react';
import { Award, User, ChevronRight, Check, PlusCircle, Heart } from 'lucide-react';

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
  return (
    <div className="rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-white shadow-md border border-gray-100">
      {/* 大学イメージ部分 */}
      <div className="h-48 bg-gradient-to-r from-green-500 to-green-600 relative">
        <img 
          src={`/images/universities/${university.id}.jpg`} 
          alt={university.university_name}
          className="w-full h-full object-cover opacity-80"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `${process.env.PUBLIC_URL}/images/university-default.jpg`;
          }}
        />
        <div className="absolute top-3 right-3">
          <button
            className={`p-2 rounded-full bg-white bg-opacity-90 shadow-md ${isInFavorites ? 'text-red-500' : 'text-gray-400'} hover:text-red-600 transition-colors`}
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
        </div>
  
        {/* ロゴと大学名オーバーレイ */}
        <div className="absolute left-0 bottom-0 right-0 bg-white bg-opacity-90 p-4">
          <div className="flex items-center">
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
            <div>
              <h3 className="text-lg font-bold text-gray-800">{university.university_name}</h3>
              <p className="text-sm text-gray-600">{university.soccer_club.league}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5">
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
        </div>
        
        {/* 実績ポイント */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 shadow-sm">
            <div className="flex items-center mb-1">
              <Award className="text-yellow-500 mr-2" size={18} />
              <span className="text-sm font-medium text-yellow-700">Jリーグ内定</span>
            </div>
            <p className="text-xl font-bold text-center text-yellow-800">{university.soccer_club.j_league_nominees_2022_24}名</p>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg border border-green-100 shadow-sm">
            <div className="flex items-center mb-1">
              <User className="text-green-500 mr-2" size={18} />
              <span className="text-sm font-medium text-green-700">部員数</span>
            </div>
            <p className="text-xl font-bold text-center text-green-800">{university.soccer_club.total_members}名</p>
          </div>
        </div>
        
        <div className="flex justify-between">
        <button 
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center shadow-sm transition-colors"
          onClick={() => onViewDetails(university)}
        >
          詳細を見る
          <ChevronRight size={16} className="ml-1" />
        </button>
        
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