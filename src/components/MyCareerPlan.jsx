import React from 'react';
import { ChevronRight, X, ChevronUp, ChevronDown, Info } from 'lucide-react';

const MyCareerPlan = ({ favoriteUniversities, onBack, onRemoveFromFavorites, onReorderFavorites, onViewDetails }) => {
  // 上に移動
  const moveUp = (index) => {
    if (index > 0) {
      onReorderFavorites(index, index - 1);
    }
  };

  // 下に移動
  const moveDown = (index) => {
    if (index < favoriteUniversities.length - 1) {
      onReorderFavorites(index, index + 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-green-700 text-white p-6">
        <button 
          className="bg-white text-green-700 px-3 py-1 rounded mb-4 flex items-center text-sm"
          onClick={onBack}
        >
          <ChevronRight className="transform rotate-180 mr-1" size={16} />
          一覧に戻る
        </button>
        <h2 className="text-2xl font-bold">私の進路プラン</h2>
        <p className="mt-2">お気に入りの大学を志望順に並べ替えて管理できます</p>
      </div>
      
      <div className="p-6">
        {favoriteUniversities.length > 0 ? (
          <div className="space-y-4">
            {favoriteUniversities.map((university, index) => (
              <div
                key={university.id}
                className="border rounded-lg p-4 flex justify-between bg-white"
              >
                <div className="flex items-center">
                  <div className="flex flex-col items-center justify-center mr-4">
                    <button 
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className={`p-1 rounded-full ${index === 0 ? 'text-gray-300' : 'text-green-500 hover:bg-green-50'}`}
                      title="上に移動"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button 
                      onClick={() => moveDown(index)}
                      disabled={index === favoriteUniversities.length - 1}
                      className={`p-1 rounded-full ${index === favoriteUniversities.length - 1 ? 'text-gray-300' : 'text-green-500 hover:bg-green-50'}`}
                      title="下に移動"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                  <div>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mb-2 inline-block">
                      志望 {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold">{university.university_name}</h3>
                    <p className="text-sm text-gray-600">{university.soccer_club.league}</p>
                    {university.entry_conditions.sports_recommend && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1 inline-block mr-1">
                        スポーツ推薦あり
                      </span>
                    )}
                    {university.soccer_club.dorm_available && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mt-1 inline-block">
                        寮あり
                      </span>
                    )}
                    <button 
                      className="text-green-600 underline text-sm mt-2 flex items-center" 
                      onClick={() => onViewDetails(university)}
                    >
                      <Info size={14} className="mr-1" />
                      詳細を見る
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    className="text-red-500 p-1 hover:bg-red-50 rounded"
                    onClick={() => onRemoveFromFavorites(university.id)}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p className="mb-2">お気に入りの大学がまだ登録されていません</p>
            <p>大学の詳細ページから「お気に入りに追加」ボタンをクリックして登録できます</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCareerPlan;