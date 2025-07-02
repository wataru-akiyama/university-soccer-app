// src/components/MultiSelectSearchForm.jsx - 完全修正版
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, X, Filter, Trophy, BookOpen, School, ChevronUp } from 'lucide-react';
import MultiSelectDropdown from './MultiSelectDropdown';
import { regions, leagues, availableQualifications } from '../data';

const MultiSelectSearchForm = ({
  searchQuery,
  setSearchQuery,
  selectedRegions,
  setSelectedRegions,
  selectedLeagues,
  setSelectedLeagues,
  selectedQualifications,
  setSelectedQualifications,
  sportsRecommend,
  setSportsRecommend,
  selectionAvailable,
  setSelectionAvailable,
  dormAvailable,
  setDormAvailable,
  generalAdmissionAvailable,
  setGeneralAdmissionAvailable,
  publicUniversity,
  setPublicUniversity,
  privateUniversity,
  setPrivateUniversity
}) => {
  
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  
  // デバッグ用：regions の内容を確認
  useEffect(() => {
    console.log('🗾 地域選択肢:', regions);
    console.log('🏟️ リーグ選択肢:', leagues);
  }, []);
  
  // 全条件クリアハンドラー
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedRegions([]);
    setSelectedLeagues([]);
    setSelectedQualifications([]);
    setSportsRecommend(false);
    setSelectionAvailable(false);
    setDormAvailable(false);
    setGeneralAdmissionAvailable(false);
    setPublicUniversity(false);
    setPrivateUniversity(false);
  };
  
  // 選択中のフィルター数を計算
  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchQuery) count++;
    count += selectedRegions.length;
    count += selectedLeagues.length;
    count += selectedQualifications.length;
    if (sportsRecommend) count++;
    if (selectionAvailable) count++;
    if (dormAvailable) count++;
    if (generalAdmissionAvailable) count++;
    if (publicUniversity) count++;
    if (privateUniversity) count++;
    return count;
  };
  
  // 条件タグ生成関数
  const createTags = () => {
    const tags = [];
    
    selectedRegions.forEach(region => {
      tags.push({
        id: `region-${region}`,
        label: region,
        type: 'region',
        value: region
      });
    });
    
    selectedLeagues.forEach(league => {
      tags.push({
        id: `league-${league}`,
        label: league.includes('関東') ? '関東' + (league.includes('1部') ? '1部' : '2部') : league,
        type: 'league',
        value: league
      });
    });
    
    selectedQualifications.forEach(qual => {
      tags.push({
        id: `qual-${qual}`,
        label: qual,
        type: 'qualification',
        value: qual
      });
    });
    
    if (sportsRecommend) {
      tags.push({
        id: 'sports-recommend',
        label: 'スポーツ推薦あり',
        type: 'sportsRecommend'
      });
    }
    
    if (selectionAvailable) {
      tags.push({
        id: 'selection-available',
        label: 'セレクションあり',
        type: 'selectionAvailable'
      });
    }
    
    if (dormAvailable) {
      tags.push({
        id: 'dorm-available',
        label: '寮あり',
        type: 'dormAvailable'
      });
    }
    
    if (generalAdmissionAvailable) {
      tags.push({
        id: 'general-admission',
        label: '一般入部可',
        type: 'generalAdmissionAvailable'
      });
    }
    
    if (publicUniversity) {
      tags.push({
        id: 'public-university',
        label: '国公立大学',
        type: 'publicUniversity'
      });
    }
    
    if (privateUniversity) {
      tags.push({
        id: 'private-university',
        label: '私立大学',
        type: 'privateUniversity'
      });
    }
    
    return tags;
  };
  
  // タグ削除ハンドラー
  const handleRemoveTag = (tag) => {
    switch(tag.type) {
      case 'region':
        setSelectedRegions(selectedRegions.filter(r => r !== tag.value));
        break;
      case 'league':
        setSelectedLeagues(selectedLeagues.filter(l => l !== tag.value));
        break;
      case 'qualification':
        setSelectedQualifications(selectedQualifications.filter(q => q !== tag.value));
        break;
      case 'sportsRecommend':
        setSportsRecommend(false);
        break;
      case 'selectionAvailable':
        setSelectionAvailable(false);
        break;
      case 'dormAvailable':
        setDormAvailable(false);
        break;
      case 'generalAdmissionAvailable':
        setGeneralAdmissionAvailable(false);
        break;
      case 'publicUniversity':
        setPublicUniversity(false);
        break;
      case 'privateUniversity':
        setPrivateUniversity(false);
        break;
      default:
        break;
    }
  };
  
  const tags = createTags();
  const activeFiltersCount = getActiveFiltersCount();
  const maxVisibleTags = 3; // 小画面で表示するタグの最大数
  
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">大学サッカー部を探す</h2>
        {/* フィルター開閉ボタン（小画面のみ） */}
        <button 
          className="md:hidden flex items-center text-green-600 text-sm"
          onClick={() => setShowAllFilters(!showAllFilters)}
        >
          <Filter size={16} className="mr-1" />
          詳細フィルター
          {showAllFilters ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
        </button>
      </div>
      
      {/* キーワード検索ボックス */}
      <div className="relative mb-4 sm:mb-6">
        <input
          type="text"
          placeholder="大学名で検索"
          className="w-full p-3 pl-10 border rounded-md text-sm sm:text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
      </div>
      
      {/* ドロップダウンフィルター（小画面では折りたたみ可能） */}
      <div className={`${showAllFilters ? 'block' : 'hidden'} md:block mb-4`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
          {/* 地域選択 */}
          <MultiSelectDropdown
            label="地域を選択"
            icon={<Filter className="text-green-600" size={16} />}
            options={regions}
            selectedValues={selectedRegions}
            onChange={setSelectedRegions}
          />
          
          {/* リーグ選択 */}
          <MultiSelectDropdown
            label="リーグを選択"
            icon={<Trophy className="text-green-600" size={16} />}
            options={leagues}
            selectedValues={selectedLeagues}
            onChange={setSelectedLeagues}
          />
          
          {/* 学部選択 */}
          <MultiSelectDropdown
            label="学部を選択"
            icon={<BookOpen className="text-green-600" size={16} />}
            options={availableQualifications}
            selectedValues={selectedQualifications}
            onChange={setSelectedQualifications}
          />
        </div>
        
        {/* チェックボックスフィルター */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
              checked={sportsRecommend}
              onChange={() => setSportsRecommend(!sportsRecommend)}
            />
            <span className="text-sm sm:text-base">スポーツ推薦あり</span>
          </label>
          
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
              checked={selectionAvailable}
              onChange={() => setSelectionAvailable(!selectionAvailable)}
            />
            <span className="text-sm sm:text-base">セレクションあり</span>
          </label>
          
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
              checked={dormAvailable}
              onChange={() => setDormAvailable(!dormAvailable)}
            />
            <span className="text-sm sm:text-base">寮あり</span>
          </label>
          
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
              checked={generalAdmissionAvailable}
              onChange={() => setGeneralAdmissionAvailable(!generalAdmissionAvailable)}
            />
            <span className="text-sm sm:text-base">一般入部可</span>
          </label>

          {/* 国公立・私立大学チェックボックス */}
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
              checked={publicUniversity}
              onChange={() => setPublicUniversity(!publicUniversity)}
            />
            <div className="flex items-center">
              <School size={16} className="mr-1 text-blue-600" />
              <span className="text-sm sm:text-base">国公立大学</span>
            </div>
          </label>
          
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
              checked={privateUniversity}
              onChange={() => setPrivateUniversity(!privateUniversity)}
            />
            <div className="flex items-center">
              <School size={16} className="mr-1 text-red-600" />
              <span className="text-sm sm:text-base">私立大学</span>
            </div>
          </label>
        </div>
      </div>
      
      {/* 選択中のタグ表示（レスポンシブ対応） */}
      {tags.length > 0 && (
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <span className="text-sm text-gray-500 mb-2 block">現在の検索条件:</span>
          
          <div className="flex flex-wrap gap-2">
            {/* 小画面では一部のタグのみ表示 */}
            {(showAllTags ? tags : tags.slice(0, maxVisibleTags)).map(tag => (
              <span 
                key={tag.id} 
                className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
              >
                {tag.label}
                <button 
                  onClick={() => handleRemoveTag(tag)} 
                  className="ml-1 text-green-600 hover:text-green-800 focus:outline-none"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            
            {/* 追加のタグがある場合の表示切り替えボタン */}
            {tags.length > maxVisibleTags && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="text-xs text-green-600 hover:text-green-800 px-2 py-1 rounded-full border border-green-200"
              >
                {showAllTags ? '閉じる' : `+${tags.length - maxVisibleTags}個`}
              </button>
            )}
          </div>
          
          <div className="flex justify-end mt-2">
            <button 
              className="text-red-500 text-xs hover:underline"
              onClick={clearAllFilters}
            >
              すべてクリア
            </button>
          </div>
        </div>
      )}
      
      {/* 検索ボタン */}
      <div className="flex justify-center">
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 sm:px-6 rounded-md transition-colors shadow-sm text-sm sm:text-base">
          検索する {activeFiltersCount > 0 && `(${activeFiltersCount}件の条件)`}
        </button>
      </div>
    </div>
  );
};

export default MultiSelectSearchForm;