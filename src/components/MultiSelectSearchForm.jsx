// src/components/MultiSelectSearchForm.jsx (並べ替え機能削除版)
import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, X, Filter, Trophy, BookOpen, School } from 'lucide-react';
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
    
    // 地域タグ
    selectedRegions.forEach(region => {
      tags.push({
        id: `region-${region}`,
        label: region,
        type: 'region',
        value: region
      });
    });
    
    // リーグタグ
    selectedLeagues.forEach(league => {
      tags.push({
        id: `league-${league}`,
        label: league,
        type: 'league',
        value: league
      });
    });
    
    // 学部タグ
    selectedQualifications.forEach(qual => {
      tags.push({
        id: `qual-${qual}`,
        label: qual,
        type: 'qualification',
        value: qual
      });
    });
    
    // チェックボックス条件のタグ
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
    
    // 国公立・私立タグ
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
  
  // タグリスト
  const tags = createTags();
  const activeFiltersCount = getActiveFiltersCount();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">大学サッカー部を探す</h2>
      </div>
      
      {/* キーワード検索ボックス */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="大学名・キーワードで検索"
          className="w-full p-3 pl-10 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
      </div>
      
      {/* ドロップダウンフィルター */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
      <div className="flex flex-wrap gap-4 mb-4">
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="mr-2 h-5 w-5"
            checked={sportsRecommend}
            onChange={() => setSportsRecommend(!sportsRecommend)}
          />
          スポーツ推薦あり
        </label>
        
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="mr-2 h-5 w-5"
            checked={selectionAvailable}
            onChange={() => setSelectionAvailable(!selectionAvailable)}
          />
          セレクションあり
        </label>
        
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="mr-2 h-5 w-5"
            checked={dormAvailable}
            onChange={() => setDormAvailable(!dormAvailable)}
          />
          寮あり
        </label>
        
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="mr-2 h-5 w-5"
            checked={generalAdmissionAvailable}
            onChange={() => setGeneralAdmissionAvailable(!generalAdmissionAvailable)}
          />
          一般入部可
        </label>

        {/* 国公立・私立大学チェックボックス */}
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="mr-2 h-5 w-5"
            checked={publicUniversity}
            onChange={() => setPublicUniversity(!publicUniversity)}
          />
          <School size={16} className="mr-1 text-blue-600" />
          国公立大学
        </label>
        
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="mr-2 h-5 w-5"
            checked={privateUniversity}
            onChange={() => setPrivateUniversity(!privateUniversity)}
          />
          <School size={16} className="mr-1 text-red-600" />
          私立大学
        </label>
      </div>
      
      {/* 選択中のタグ表示 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 bg-gray-50 p-3 rounded-lg">
          <span className="text-sm text-gray-500 mr-1">現在の検索条件:</span>
          
          {tags.map(tag => (
            <span 
              key={tag.id} 
              className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
            >
              {tag.label}
              <button 
                onClick={() => handleRemoveTag(tag)} 
                className="ml-1 text-green-600 hover:text-green-800 focus:outline-none"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          
          <div className="flex ml-auto space-x-2">
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
      <div className="flex justify-center mt-4">
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors shadow-sm">
          検索する {activeFiltersCount > 0 && `(${activeFiltersCount}件の条件)`}
        </button>
      </div>
    </div>
  );
};

export default MultiSelectSearchForm;