// src/components/FilterOptions.jsx
import React, { useState } from 'react';
import { Filter, Save, ArrowDown, ArrowUp } from 'lucide-react';

const FilterOptions = ({ filteredCount, totalCount, sortOption, setSortOption, activeFilters }) => {
  const [sortDirection, setSortDirection] = useState('desc'); // desc = 降順, asc = 昇順
  
  // ソート順切り替え
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
  };
  
  // ソートオプションの設定
  const handleSortChange = (option) => {
    if (sortOption === option) {
      // 同じオプションがクリックされたら方向を切り替え
      toggleSortDirection();
    } else {
      // 新しいオプションがクリックされたら、そのオプションをセットして降順に
      setSortOption(option);
      setSortDirection('desc');
    }
  };
  
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
      
      {/* ソートオプション */}
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <div className="text-sm text-gray-500 flex items-center flex-wrap gap-2">
          <span className="text-gray-700 font-medium">並べ替え:</span> 
          <button 
            className={`px-3 py-1 rounded-lg flex items-center ${
              sortOption === 'j_league' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-200'
            }`}
            onClick={() => handleSortChange('j_league')}
          >
            Jリーグ内定者数順
          </button>
          <button 
            className={`px-3 py-1 rounded-lg ${
              sortOption === 'members' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-200'
            }`}
            onClick={() => handleSortChange('members')}
          >
            部員数順
          </button>
          <button 
            className={`px-3 py-1 rounded-lg ${
              sortOption === 'grade_requirement' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-200'
            }`}
            onClick={() => handleSortChange('grade_requirement')}
          >
            評定基準順
          </button>
          <button 
            className={`px-3 py-1 rounded-lg ${
              sortOption === 'denso_cup' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-200'
            }`}
            onClick={() => handleSortChange('denso_cup')}
          >
            デンソーカップ出場者順
          </button>
        </div>
        
        {/* 並び替え順序ボタン */}
        <button 
          className="bg-gray-200 p-1 rounded text-gray-700 hover:bg-gray-300"
          onClick={toggleSortDirection}
          title={sortDirection === 'desc' ? '降順' : '昇順'}
        >
          {sortDirection === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
        </button>
      </div>
    </div>
  );
};

export default FilterOptions;