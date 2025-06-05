// src/components/FilterOptions.jsx (簡潔版)
import React from 'react';
import { Filter, Save } from 'lucide-react';

const FilterOptions = ({ filteredCount, totalCount, activeFilters }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">検索結果</h2>
          <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full ml-3">
            {totalCount ? `${totalCount}件中${filteredCount}件表示` : `${filteredCount}件`}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {activeFilters && activeFilters.length > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <Filter size={16} className="mr-1" />
              <span>絞り込み条件: </span>
              <span className="font-medium ml-1">{activeFilters.join(' / ')}</span>
            </div>
          )}
          
          <button className="text-blue-600 flex items-center text-sm">
            <Save size={16} className="mr-1" />
            <span>保存</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;