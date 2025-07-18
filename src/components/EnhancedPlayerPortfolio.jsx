// src/components/EnhancedPlayerPortfolio.jsx - お気に入り大学ページ（大学詳細ページ統一版）
import React, { useState, useMemo } from 'react';
import { 
    ChevronLeft, 
    Heart,
    ArrowDown, 
    ArrowUp
} from 'lucide-react';
import SimpleUniversityCard from './SimpleUniversityCard';

// メインコンポーネント - お気に入り大学ページ
const EnhancedPlayerPortfolio = ({ 
  onBack, 
  favoriteUniversities,
  onRemoveFromFavorites,
  onReorderFavorites,
  onViewDetails,
  isPremium
}) => {
  // 並び替え機能の状態
  const [sortOption, setSortOption] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // 並び替えオプション
  const getSortOptions = () => {
    return [
      { value: '', label: 'お気に入り順' },
      { value: 'j_league', label: 'Jリーグ内定者数順' },
      { value: 'members', label: '部員数順' },
      { value: 'university_cost', label: '大学費用順' },
      { value: 'soccer_club_cost', label: 'サッカー部費用順' }
    ];
  };

  // 並び替え処理
  const sortedUniversities = useMemo(() => {
    if (!favoriteUniversities || favoriteUniversities.length === 0) return [];
    
    if (!sortOption) {
      // デフォルト（お気に入り順）の場合はそのまま返す
      return favoriteUniversities;
    }
    
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    
    return [...favoriteUniversities].sort((a, b) => {
      try {
        switch(sortOption) {
          case 'j_league': {
            const getJLeagueCount = (uni) => {
              if (uni.soccer_club?.j_league_nominees_2022_24) {
                return parseInt(uni.soccer_club.j_league_nominees_2022_24);
              }
              
              const count2022 = parseInt(uni.soccer_club?.j_league_nominees_2022 || 0);
              const count2023 = parseInt(uni.soccer_club?.j_league_nominees_2023 || 0);
              const count2024 = parseInt(uni.soccer_club?.j_league_nominees_2024 || 0);
              
              return count2022 + count2023 + count2024;
            };
            return multiplier * (getJLeagueCount(a) - getJLeagueCount(b));
          }
          
          case 'members': {
            const getMemberCount = (uni) => {
              return parseInt(uni.soccer_club?.total_members || 0);
            };
            return multiplier * (getMemberCount(a) - getMemberCount(b));
          }
          
          case 'university_cost': {
            const getUniversityCost = (uni) => {
              if (uni.costs?.total_annual_cost) {
                return parseInt(uni.costs.total_annual_cost);
              }
              
              const tuition = parseInt(uni.costs?.university_costs?.annual_tuition || 0);
              const facility = parseInt(uni.costs?.university_costs?.facility_fee || 0);
              
              return tuition + facility;
            };
            return multiplier * (getUniversityCost(a) - getUniversityCost(b));
          }
          
          case 'soccer_club_cost': {
            const getSoccerClubCost = (uni) => {
              const monthlyFee = parseInt(uni.costs?.soccer_club_costs?.monthly_club_fee || 0);
              const equipment = parseInt(uni.costs?.soccer_club_costs?.equipment_cost || 0);
              const camp = parseInt(uni.costs?.soccer_club_costs?.camp_cost || 0);
              const travel = parseInt(uni.costs?.soccer_club_costs?.travel_cost || 0);
              
              return (monthlyFee * 12) + equipment + camp + travel;
            };
            return multiplier * (getSoccerClubCost(a) - getSoccerClubCost(b));
          }
          
          default:
            return 0;
        }
      } catch (error) {
        console.error('ソート中にエラーが発生しました:', error);
        return 0;
      }
    });
  }, [favoriteUniversities, sortOption, sortDirection]);

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
    <div className="bg-gray-50 min-h-screen">
      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* ナビゲーションと タイトル */}
        <div className="flex justify-between items-center mb-6 lg:mb-8">
          <button 
            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            onClick={onBack}
          >
            <ChevronLeft size={20} className="mr-2" />
            <span className="hidden sm:inline">一覧に戻る</span>
            <span className="sm:hidden">戻る</span>
          </button>
        </div>

        {/* メインコンテンツエリア */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* ヘッダー部分 */}
          <div className="p-6 lg:p-8 border-b border-gray-200">
            {/* デスクトップ版 - 横並び */}
            <div className="hidden md:flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Heart size={24} className="text-red-500 mr-3" />
                  お気に入り大学
                </h1>
                <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full ml-4">
                  {favoriteUniversities.length}校登録中
                </span>
              </div>
              
              {/* 並べ替えセクション */}
              {favoriteUniversities.length > 1 && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700 font-medium">並べ替え:</span>
                  <div className="relative">
                    <select 
                      className="p-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      {getSortOptions().map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* 並び替え順序ボタン */}
                  {sortOption && (
                    <button 
                      className="bg-gray-100 hover:bg-gray-200 p-2 rounded border text-gray-700 transition-colors"
                      onClick={() => setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')}
                      title={sortDirection === 'desc' ? '降順（大→小）' : '昇順（小→大）'}
                    >
                      {sortDirection === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* モバイル版 - 縦並び */}
            <div className="md:hidden space-y-4">
              {/* タイトルと件数 */}
              <div className="flex flex-col space-y-2">
                <h1 className="text-xl font-bold text-gray-900 flex items-center">
                  <Heart size={20} className="text-red-500 mr-2" />
                  お気に入り大学
                </h1>
                <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full inline-block w-fit">
                  {favoriteUniversities.length}校登録中
                </span>
              </div>
              
              {/* 並べ替えセクション */}
              {favoriteUniversities.length > 1 && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <select 
                      className="w-full p-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      {getSortOptions().map(option => (
                        <option key={option.value} value={option.value}>
                          {`並び替え: ${option.label}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* 並び替え順序ボタン */}
                  {sortOption && (
                    <button 
                      className="bg-gray-100 hover:bg-gray-200 p-2 rounded border text-gray-700 transition-colors flex-shrink-0"
                      onClick={() => setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')}
                      title={sortDirection === 'desc' ? '降順（大→小）' : '昇順（小→大）'}
                    >
                      {sortDirection === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* 大学カード一覧 */}
          <div className="p-6 lg:p-8">
            {sortedUniversities.length > 0 ? (
              <div className="space-y-4">
                {sortedUniversities.map((university, index) => {
                  // 並び替え時は順序変更機能を無効化
                  const isDefaultOrder = !sortOption;
                  const originalIndex = isDefaultOrder ? index : favoriteUniversities.findIndex(u => u.id === university.id);
                  
                  return (
                    <SimpleUniversityCard
                      key={university.id}
                      university={university}
                      onViewDetails={onViewDetails}
                      isInFavorites={true}
                      // 進路プラン用のprops
                      isPortfolioMode={true}
                      portfolioRank={index + 1}
                      onMoveUp={isDefaultOrder ? () => moveUp(originalIndex) : undefined}
                      onMoveDown={isDefaultOrder ? () => moveDown(originalIndex) : undefined}
                      canMoveUp={isDefaultOrder && originalIndex > 0}
                      canMoveDown={isDefaultOrder && originalIndex < favoriteUniversities.length - 1}
                      onRemoveFromPortfolio={onRemoveFromFavorites}
                      // 使用しないpropsは無効化
                      onAddToCompare={() => {}}
                      onRemoveFromCompare={() => {}}
                      isInCompareList={false}
                      onAddToFavorites={() => {}}
                      onRemoveFromFavorites={() => {}}
                      isPremium={isPremium}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-xl p-8 shadow-inner">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center opacity-50">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21L10.55 19.7C5.4 15.1 2 12.1 2 8.5C2 5.5 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 8.5 22 8.5C22 12.1 18.6 15.1 13.45 19.7L12 21Z" fill="#6B7280"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-700">お気に入り大学がまだ登録されていません</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    大学の詳細ページから「お気に入りに追加」ボタンをクリックして登録できます
                  </p>
                </div>
              </div>
            )}
            
            {/* 並び替え時の注意文 */}
            {sortOption && favoriteUniversities.length > 1 && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>お知らせ:</strong> 並び替え中は順序変更機能（上下移動）が無効になります。
                  お気に入り順に戻すと順序変更が可能になります。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPlayerPortfolio;