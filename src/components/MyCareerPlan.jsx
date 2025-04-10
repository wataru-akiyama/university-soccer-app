import React from 'react';
import { ChevronRight, X, ChevronUp, ChevronDown, Info, UserCircle } from 'lucide-react';

const MyCareerPlan = ({
  favoriteUniversities,
  onBack,
  onRemoveFromFavorites,
  onReorderFavorites,
  onViewDetails,
  onShowPortfolio
}) => {
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
            <button 
                className="bg-white text-green-700 px-3 py-1 rounded-lg mb-4 flex items-center text-sm shadow-sm hover:bg-gray-100 transition-colors"
                onClick={onBack}
            >
                <ChevronRight className="transform rotate-180 mr-1" size={16} />
                一覧に戻る
            </button>
            <h2 className="text-2xl font-bold">私の進路プラン</h2>
            <p className="mt-2 text-green-100">お気に入りの大学を志望順に並べ替えて管理できます</p>
        </div>
      
      <div className="p-6">
        {/* ポートフォリオバナーを上部に追加 */}
        <div className="bg-blue-50 p-4 rounded-xl mb-6">
          <div className="flex items-center">
            <UserCircle size={20} className="text-blue-600 mr-2" />
            <div>
              <p className="text-blue-800 font-medium">ポートフォリオで自己PR！</p>
              <p className="text-blue-600 text-sm">大学サッカー部にアピールし、練習参加につなげよう</p>
            </div>
            <button 
              className="ml-auto bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
              onClick={onShowPortfolio} // PlayerPortfolioを表示する関数を呼び出し
            >
              ポートフォリオを編集
            </button>
          </div>
        </div>

        {favoriteUniversities.length > 0 ? (
          <div className="space-y-4">
            {favoriteUniversities.map((university, index) => (
                <div
                    key={university.id}
                    className="border rounded-xl p-5 flex justify-between bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                <div className="flex">
                    <div className="flex flex-col items-center justify-center mr-4">
                        <button 
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className={`p-2 rounded-full ${index === 0 ? 'text-gray-300' : 'text-green-500 hover:bg-green-50'}`}
                        title="上に移動"
                        >
                        <ChevronUp size={16} />
                        </button>
                        <div className="h-4"></div>
                        <button 
                        onClick={() => moveDown(index)}
                        disabled={index === favoriteUniversities.length - 1}
                        className={`p-2 rounded-full ${index === favoriteUniversities.length - 1 ? 'text-gray-300' : 'text-green-500 hover:bg-green-50'}`}
                        title="下に移動"
                        >
                        <ChevronDown size={16} />
                        </button>
                    </div>
                    
                    <div className="mr-4 relative">
                        {/* 大学イメージ */}
                        <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-lg overflow-hidden shadow-md relative">
                        <img 
                            src={`/images/universities/${university.id}.jpg`}
                            alt=""
                            className="w-full h-full object-cover opacity-80"
                            onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${process.env.PUBLIC_URL}/images/university-default.jpg`;
                            }}
                        />
                        {/* ロゴオーバーレイ */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white p-2 rounded-full shadow-sm">
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
                        </div>
                        </div>
                        
                        {/* 志望順位バッジ */}
                        <div className="absolute -top-2 -left-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md font-bold">
                        {index + 1}
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{university.university_name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{university.soccer_club.league}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                        {university.entry_conditions.sports_recommend && (
                            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full inline-block">
                            スポーツ推薦あり
                            </span>
                        )}
                        {university.soccer_club.dorm_available && (
                            <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full inline-block">
                            寮あり
                            </span>
                        )}
                        </div>
                        
                        <button 
                        className="text-green-600 font-medium text-sm flex items-center hover:text-green-700 transition-colors" 
                        onClick={() => onViewDetails(university)}
                        >
                        <Info size={14} className="mr-1" />
                        詳細を見る
                        </button>
                    </div>
                </div>
                <div>
                    <button
                        className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
                        onClick={() => onRemoveFromFavorites(university.id)}
                    >
                        <X size={18} />
                    </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
            <div className="text-center py-10">
            <div className="bg-gray-50 rounded-xl p-8 shadow-inner">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center opacity-50">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21L10.55 19.7C5.4 15.1 2 12.1 2 8.5C2 5.5 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.5 22 8.5C22 12.1 18.6 15.1 13.45 19.7L12 21Z" fill="#6B7280"/>
                </svg>
              </div>
              <p className="text-lg font-medium mb-2 text-gray-700">お気に入りの大学がまだ登録されていません</p>
              <p className="text-gray-500">大学の詳細ページから「お気に入りに追加」ボタンをクリックして登録できます</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCareerPlan;