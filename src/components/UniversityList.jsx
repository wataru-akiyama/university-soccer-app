// src/components/UniversityList.jsx
import React, { useMemo } from 'react';
import UniversityCard from './UniversityCard';
import FilterOptions from './FilterOptions';

const UniversityList = ({
  filteredUniversities,
  allUniversities,
  sortOption,
  setSortOption,
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <FilterOptions 
        filteredCount={filteredUniversities.length}
        totalCount={allUniversities ? allUniversities.length : null}
        sortOption={sortOption}
        setSortOption={setSortOption}
        activeFilters={activeFilters}
      />
      
      {/* 大学リスト */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map(university => (
          <UniversityCard
            key={university.id}
            university={university}
            onViewDetails={onViewDetails}
            onAddToCompare={onAddToCompare}
            isInCompareList={compareList.some(uni => uni.id === university.id)}
            onRemoveFromCompare={onRemoveFromCompare}
            onAddToFavorites={onAddToFavorites}
            onRemoveFromFavorites={onRemoveFromFavorites}
            isInFavorites={favoriteUniversities.some(uni => uni.id === university.id)}
          />
        ))}
      </div>
      
      {filteredUniversities.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>検索条件に一致する大学が見つかりませんでした。</p>
          <p>条件を変更して再度検索してください。</p>
        </div>
      )}
      
      {/* ページネーション（検索結果が多い場合） */}
      {filteredUniversities.length > 12 && (
        <div className="mt-6 flex justify-center">
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 rounded border hover:bg-gray-100">&lt;</button>
            <button className="px-3 py-1 rounded bg-green-600 text-white">1</button>
            <button className="px-3 py-1 rounded border hover:bg-gray-100">2</button>
            <button className="px-3 py-1 rounded border hover:bg-gray-100">3</button>
            {filteredUniversities.length > 36 && <span className="px-2">...</span>}
            {filteredUniversities.length > 36 && (
              <button className="px-3 py-1 rounded border hover:bg-gray-100">
                {Math.ceil(filteredUniversities.length / 12)}
              </button>
            )}
            <button className="px-3 py-1 rounded border hover:bg-gray-100">&gt;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityList;