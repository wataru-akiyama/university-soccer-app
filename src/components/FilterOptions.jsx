import React from 'react';
import { ArrowUpDown } from 'lucide-react';

const FilterOptions = ({ filteredCount, sortOption, setSortOption }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">検索結果（{filteredCount}件）</h2>
      
      {/* ソートオプション */}
      <div className="relative">
        <select 
          className="p-2 border rounded-md pr-10"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">並び替え</option>
          <option value="j_league">Jリーグ内定者数順</option>
          <option value="denso_cup">デンソーカップ出場者数順</option>
          <option value="members">部員数順</option>
        </select>
        <ArrowUpDown className="absolute right-3 top-2 text-gray-400" size={16} />
      </div>
    </div>
  );
};

export default FilterOptions;