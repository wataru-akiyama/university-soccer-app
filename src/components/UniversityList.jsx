// src/components/UniversityList.jsx (並べ替えを検索結果エリア右上に配置)
import React, { useState, useMemo } from 'react';
import SimpleUniversityCard from './SimpleUniversityCard';
import { ChevronLeft, ChevronRight, ArrowDown, ArrowUp } from 'lucide-react';

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
  onRemoveFromFavorites
}) => {
  // ページング状態管理
  const [currentPage, setCurrentPage] = useState(1);
  const universitiesPerPage = 10;

  // ページネーション用の計算
  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = filteredUniversities.slice(indexOfFirstUniversity, indexOfLastUniversity);
  const totalPages = Math.ceil(filteredUniversities.length / universitiesPerPage);
  
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* ヘッダー部分 - 並べ替え機能付き */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">検索結果</h2>
            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full ml-3">
              {allUniversities ? `${allUniversities.length}件中${filteredUniversities.length}件表示` : `${filteredUniversities.length}件`}
            </span>
          </div>
          
          {/* 並べ替えセクション - 右上に配置 */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700 font-medium">並べ替え:</span>
            <select 
              className="p-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">デフォルト</option>
              <option value="j_league">Jリーグ内定者数順</option>
              <option value="members">部員数順</option>
              <option value="name">大学名順</option>
            </select>
            
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