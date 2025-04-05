import React, { useState, useMemo } from 'react';
import SimpleUniversityCard from './SimpleUniversityCard';
import FilterOptions from './FilterOptions';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  selectedRegion,
  sportsRecommend,
  dormAvailable,
  selectionAvailable,
  selectedLeague,
  selectedQualification
}) => {
  // ページング状態管理
  const [currentPage, setCurrentPage] = useState(1);
  const universitiesPerPage = 10; // 1ページあたり10件表示
  
  // 現在のフィルター条件を文字列配列として生成
  const activeFilters = useMemo(() => {
    const filters = [];
    if (selectedRegion) filters.push(selectedRegion);
    if (sportsRecommend) filters.push('スポーツ推薦あり');
    if (dormAvailable) filters.push('寮あり');
    if (selectionAvailable) filters.push('セレクションあり');
    if (selectedLeague) filters.push(selectedLeague);
    if (selectedQualification) filters.push(selectedQualification);
    return filters;
  }, [selectedRegion, sportsRecommend, dormAvailable, selectionAvailable, selectedLeague, selectedQualification]);

  // ページネーション用の計算
  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = filteredUniversities.slice(indexOfFirstUniversity, indexOfLastUniversity);
  const totalPages = Math.ceil(filteredUniversities.length / universitiesPerPage);
  
  // ページ変更ハンドラー
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // ページトップへスクロール
    window.scrollTo(0, 0);
  };
  
  // ページ番号の表示範囲を計算
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <FilterOptions 
        filteredCount={filteredUniversities.length}
        totalCount={allUniversities ? allUniversities.length : null}
        sortOption={sortOption}
        setSortOption={setSortOption}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        activeFilters={activeFilters}
      />
      
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
        />
        ))}
      </div>
      
      {/* 結果がない場合 */}
      {filteredUniversities.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>検索条件に一致する大学が見つかりませんでした。</p>
          <p>条件を変更して再度検索してください。</p>
        </div>
      )}
      
      {/* ページネーションコントロール */}
      {filteredUniversities.length > universitiesPerPage && (
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
      {filteredUniversities.length > universitiesPerPage && (
        <div className="text-center mt-2 text-sm text-gray-500">
          {indexOfFirstUniversity + 1}-{Math.min(indexOfLastUniversity, filteredUniversities.length)} / {filteredUniversities.length}件
        </div>
      )}
    </div>
  );
};

export default UniversityList;