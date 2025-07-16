// src/components/UniversityList.jsx - プレミアム対応版
import React, { useState, useMemo } from 'react';
import SimpleUniversityCard from './SimpleUniversityCard';
import { ChevronLeft, ChevronRight, ArrowDown, ArrowUp, Lock } from 'lucide-react';

const UniversityList = ({
  filteredUniversities,
  allUniversities,
  sortOption,
  setSortOption,
  sortDirection,
  setSortDirection,
  onViewDetails,
  compareList,
  onAddToCompare,
  onRemoveFromCompare,
  favoriteUniversities,
  onAddToFavorites,
  onRemoveFromFavorites,
  isPremium = false
}) => {
  // ページング状態管理
  const [currentPage, setCurrentPage] = useState(1);
  
  // フリープランでの表示制限
  const getUniversitiesPerPage = () => {
    return isPremium ? 10 : 5; // フリープランでは1ページあたり5件に制限
  };
  
  const universitiesPerPage = getUniversitiesPerPage();

  // フリープランでの結果表示制限
  const getLimitedUniversities = () => {
    if (isPremium) {
      return filteredUniversities;
    }
    // フリープランでは最大20件まで表示
    return filteredUniversities.slice(0, 20);
  };
  
  const limitedUniversities = getLimitedUniversities();

  // ページネーション用の計算
  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = limitedUniversities.slice(indexOfFirstUniversity, indexOfLastUniversity);
  const totalPages = Math.ceil(limitedUniversities.length / universitiesPerPage);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };
  
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  // フリープラン制限バナー
  const FreePlanLimitBanner = () => {
    if (isPremium || filteredUniversities.length <= 20) return null;
    
    return (
      <div className="mb-4 bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-4 rounded-lg">
        <div className="flex items-center">
          <Lock size={20} className="text-yellow-600 mr-3" />
          <div>
            <h3 className="font-semibold text-yellow-800">検索結果の表示制限</h3>
            <p className="text-sm text-yellow-700 mt-1">
              フリープランでは検索結果を20件まで表示しています。
              全{filteredUniversities.length}件の結果を見るにはプレミアムプランにアップグレードしてください。
            </p>
            <button className="mt-2 bg-yellow-600 text-white px-4 py-1 rounded text-sm hover:bg-yellow-700">
              プレミアムプランを見る
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 高度なソート機能の制限
  const getSortOptions = () => {
    const basicOptions = [
      { value: '', label: 'デフォルト' },
      { value: 'name', label: '大学名順' }
    ];
    
    const premiumOptions = [
      { value: 'j_league', label: 'Jリーグ内定者数順' },
      { value: 'members', label: '部員数順' },
      { value: 'academic_rank', label: '学力ランク順' }
    ];
    
    if (isPremium) {
      return [...basicOptions, ...premiumOptions];
    }
    
    return basicOptions;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* フリープラン制限バナー */}
      <FreePlanLimitBanner />
      
      {/* ヘッダー部分 - レスポンシブ対応 */}
      <div className="mb-6">
        {/* デスクトップ版 - 横並び */}
        <div className="hidden md:flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">検索結果</h2>
            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full ml-3">
              {isPremium ? (
                allUniversities ? `${allUniversities.length}件中${filteredUniversities.length}件表示` : `${filteredUniversities.length}件`
              ) : (
                `${limitedUniversities.length}件表示${filteredUniversities.length > 20 ? ' (制限中)' : ''}`
              )}
            </span>
          </div>
          
          {/* 並べ替えセクション - 右上に配置 */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700 font-medium">並べ替え:</span>
            <div className="relative">
              <select 
                className={`p-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  !isPremium ? 'pr-8' : ''
                }`}
                value={sortOption}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (!isPremium && ['j_league', 'members', 'academic_rank'].includes(newValue)) {
                    alert('高度なソート機能はプレミアムプラン限定です。');
                    return;
                  }
                  setSortOption(newValue);
                }}
              >
                {getSortOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
                {!isPremium && (
                  <>
                    <option disabled>── プレミアム限定 ──</option>
                    <option disabled>Jリーグ内定者数順</option>
                    <option disabled>部員数順</option>
                    <option disabled>学力ランク順</option>
                  </>
                )}
              </select>
              {!isPremium && (
                <Lock size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              )}
            </div>
            
            {/* 並び替え順序ボタン - ソートオプションが選択されている時のみ表示 */}
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
        </div>

        {/* モバイル版 - 縦並び */}
        <div className="md:hidden space-y-3 mb-4">
          {/* タイトルと件数 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold mb-2 sm:mb-0">検索結果</h2>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full inline-block w-fit">
              {/* スマホでは短縮表示 */}
              <span className="sm:hidden">
                {isPremium ? `${limitedUniversities.length}件` : `${limitedUniversities.length}件${filteredUniversities.length > 20 ? ' (制限)' : ''}`}
              </span>
              <span className="hidden sm:inline">
                {isPremium ? (
                  allUniversities ? `${allUniversities.length}件中${filteredUniversities.length}件` : `${filteredUniversities.length}件`
                ) : (
                  `${limitedUniversities.length}件表示${filteredUniversities.length > 20 ? ' (制限中)' : ''}`
                )}
              </span>
            </span>
          </div>
          
          {/* 並べ替えセクション */}
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <select 
                className={`w-full p-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  !isPremium ? 'pr-8' : ''
                }`}
                value={sortOption}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (!isPremium && ['j_league', 'members', 'academic_rank'].includes(newValue)) {
                    alert('高度なソート機能はプレミアムプラン限定です。');
                    return;
                  }
                  setSortOption(newValue);
                }}
              >
                {getSortOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {`並び替え: ${option.label}`}
                  </option>
                ))}
                {!isPremium && (
                  <>
                    <option disabled>── プレミアム限定 ──</option>
                    <option disabled>Jリーグ内定者数順</option>
                    <option disabled>部員数順</option>
                    <option disabled>学力ランク順</option>
                  </>
                )}
              </select>
              {!isPremium && (
                <Lock size={14} className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400" />
              )}
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
        </div>
      </div>
      
      {/* 大学リスト - レスポンシブ2列表示 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {currentUniversities.map(university => (
          <SimpleUniversityCard
            key={university.id}
            university={university}
            onViewDetails={onViewDetails}
            onAddToCompare={onAddToCompare}
            onRemoveFromCompare={onRemoveFromCompare}
            isInCompareList={compareList.some(uni => uni.id === university.id)}
            onAddToFavorites={onAddToFavorites}
            onRemoveFromFavorites={onRemoveFromFavorites}
            isInFavorites={favoriteUniversities.some(uni => uni.id === university.id)}
            isPremium={isPremium}
          />
        ))}
      </div>
      
      {/* 結果がない場合 */}
      {limitedUniversities.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>検索条件に一致する大学が見つかりませんでした。</p>
          <p>条件を変更して再度検索してください。</p>
        </div>
      )}
      
      {/* ページネーションコントロール */}
      {limitedUniversities.length > universitiesPerPage && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-1">
            <button 
              className="px-3 py-2 rounded border text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            
            {getPageNumbers().map(number => (
              <button
                key={number}
                className={`w-10 h-10 flex items-center justify-center rounded ${
                  currentPage === number 
                    ? 'bg-green-600 text-white' 
                    : 'border text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            ))}
            
            <button
              className="px-3 py-2 rounded border text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </nav>
        </div>
      )}
      
      {/* ページ情報 */}
      {limitedUniversities.length > universitiesPerPage && (
        <div className="text-center mt-2 text-sm text-gray-500">
          {indexOfFirstUniversity + 1}-{Math.min(indexOfLastUniversity, limitedUniversities.length)} / {limitedUniversities.length}件
          {!isPremium && filteredUniversities.length > 20 && (
            <span className="text-yellow-600 ml-2">
              (全{filteredUniversities.length}件中の表示制限)
            </span>
          )}
        </div>
      )}
      
      {/* フリープラン向けアップグレード促進バナー */}
      {!isPremium && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-4 rounded-lg text-center">
          <h3 className="font-semibold text-gray-800 mb-2">より詳細な検索をお求めですか？</h3>
          <p className="text-sm text-gray-600 mb-3">
            プレミアムプランで全ての検索結果表示、高度なソート機能、比較機能をご利用いただけます。
          </p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            プレミアムプランを見る
          </button>
        </div>
      )}
    </div>
  );
};

export default UniversityList;