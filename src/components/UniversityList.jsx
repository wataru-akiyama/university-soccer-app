import React from 'react';
import UniversityCard from './UniversityCard';
import FilterOptions from './FilterOptions';

const UniversityList = ({
  filteredUniversities,
  sortOption,
  setSortOption,
  onViewDetails,
  compareList,
  onAddToCompare,
  onRemoveFromCompare,
  favoriteUniversities,
  onAddToFavorites,
  onRemoveFromFavorites
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <FilterOptions 
        filteredCount={filteredUniversities.length}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      
      {/* 大学リスト */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
};

export default UniversityList;