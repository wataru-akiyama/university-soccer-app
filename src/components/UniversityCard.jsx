import React from 'react';
import { Award, User, ChevronRight, Check, PlusCircle } from 'lucide-react';

const UniversityCard = ({ university, onViewDetails, onAddToCompare, isInCompareList, onRemoveFromCompare }) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-blue-50 p-4">
        <h3 className="text-lg font-semibold">{university.university_name}</h3>
        <p className="text-sm text-gray-600">{university.soccer_club.league}</p>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <div className="flex items-center">
            <Award className="text-yellow-500 mr-2" size={18} />
            <span>Jリーグ内定: {university.soccer_club.j_league_nominees_2022_24}名</span>
          </div>
        </div>
        
        <div className="flex justify-between mb-2">
          <div className="flex items-center">
            <User className="text-blue-500 mr-2" size={18} />
            <span>部員数: {university.soccer_club.total_members}名</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3 mb-4">
          {university.entry_conditions.sports_recommend && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              スポーツ推薦あり
            </span>
          )}
          
          {university.entry_conditions.selection && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              セレクションあり
            </span>
          )}
          
          {university.soccer_club.dorm_available && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
              寮あり
            </span>
          )}
        </div>
        
        <div className="flex justify-between">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
            onClick={() => onViewDetails(university)}
          >
            詳細を見る
            <ChevronRight size={16} className="ml-1" />
          </button>
          
          <button 
            className={`px-3 py-2 rounded border flex items-center ${
              isInCompareList
                ? "bg-gray-200 text-gray-700 border-gray-300"
                : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
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