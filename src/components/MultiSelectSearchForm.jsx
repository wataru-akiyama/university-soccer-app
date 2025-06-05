// src/components/MultiSelectSearchForm.jsx (簡潔版)
import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, X, Filter, Trophy, Home, BookOpen, Save, Bookmark, Trash, School, ArrowDown, ArrowUp } from 'lucide-react';
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
  setPrivateUniversity,
  sortOption,
  setSortOption,
  sortDirection,
  setSortDirection
}) => {
  // 保存済み検索条件の表示状態
  const [savedSearches, setSavedSearches] = useState([]);
  const [showSavedSearchesDropdown, setShowSavedSearchesDropdown] = useState(false);
  
  // 検索条件保存モーダル
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [newSearchName, setNewSearchName] = useState('');
  
  // ドロップダウンの外側クリックを検知するためのref
  const savedSearchesRef = useRef(null);
  const saveModalRef = useRef(null);
  
  // ローカルストレージから保存済み検索条件を読み込む
  useEffect(() => {
    const savedSearchesData = localStorage.getItem('soccerUniversitySavedSearches');
    if (savedSearchesData) {
      try {
        setSavedSearches(JSON.parse(savedSearchesData));
      } catch (e) {
        console.error('保存済み検索条件の読み込みに失敗しました', e);
        setSavedSearches([]);
      }
    }
  }, []);
  
  // 保存済み検索ドロップダウン外のクリックを検知して閉じる
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (savedSearchesRef.current && !savedSearchesRef.current.contains(event.target)) {
        setShowSavedSearchesDropdown(false);
      }
      
      if (saveModalRef.current && !saveModalRef.current.contains(event.target)) {
        setShowSaveModal(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
    setSortOption('');
    setSortDirection('desc');
  };
  
  // 現在の検索条件を取得
  const getCurrentSearchConditions = () => {
    return {
      searchQuery,
      selectedRegions,
      selectedLeagues,
      selectedQualifications,
      sportsRecommend,
      selectionAvailable,
      dormAvailable,
      generalAdmissionAvailable,
      publicUniversity,
      privateUniversity,
      sortOption,
      sortDirection
    };
  };
  
  // 検索条件を保存するハンドラー
  const handleSaveSearch = () => {
    if (!newSearchName.trim()) {
      alert('検索条件の名前を入力してください');
      return;
    }
    
    const currentConditions = getCurrentSearchConditions();
    const newSavedSearch = {
      id: Date.now().toString(),
      name: newSearchName.trim(),
      conditions: currentConditions
    };
    
    const updatedSavedSearches = [...savedSearches, newSavedSearch];
    setSavedSearches(updatedSavedSearches);
    
    // ローカルストレージに保存
    localStorage.setItem('soccerUniversitySavedSearches', JSON.stringify(updatedSavedSearches));
    
    // モーダルを閉じて入力をクリア
    setShowSaveModal(false);
    setNewSearchName('');
    
    // 成功メッセージ
    alert(`「${newSearchName.trim()}」として検索条件を保存しました`);
  };
  
  // 保存済み検索条件を適用するハンドラー
  const applySavedSearch = (savedSearch) => {
    const conditions = savedSearch.conditions;
    
    // 各条件を適用
    setSearchQuery(conditions.searchQuery || '');
    setSelectedRegions(conditions.selectedRegions || []);
    setSelectedLeagues(conditions.selectedLeagues || []);
    setSelectedQualifications(conditions.selectedQualifications || []);
    setSportsRecommend(conditions.sportsRecommend || false);
    setSelectionAvailable(conditions.selectionAvailable || false);
    setDormAvailable(conditions.dormAvailable || false);
    setGeneralAdmissionAvailable(conditions.generalAdmissionAvailable || false);
    setPublicUniversity(conditions.publicUniversity || false);
    setPrivateUniversity(conditions.privateUniversity || false);
    setSortOption(conditions.sortOption || '');
    setSortDirection(conditions.sortDirection || 'desc');
    
    // ドロップダウンを閉じる
    setShowSavedSearchesDropdown(false);
  };
  
  // 保存済み検索条件を削除するハンドラー
  const deleteSavedSearch = (e, id) => {
    e.stopPropagation();
    
    if (window.confirm('この保存済み検索条件を削除しますか？')) {
      const updatedSavedSearches = savedSearches.filter(search => search.id !== id);
      setSavedSearches(updatedSavedSearches);
      
      // ローカルストレージを更新
      localStorage.setItem('soccerUniversitySavedSearches', JSON.stringify(updatedSavedSearches));
    }
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
    
    // 資格タグ
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
        
        {/* 保存済み検索条件ドロップダウン */}
        <div className="relative" ref={savedSearchesRef}>
          <button 
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            onClick={() => setShowSavedSearchesDropdown(!showSavedSearchesDropdown)}
          >
            <Bookmark size={18} className="mr-1" />
            <span>保存した検索条件</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
          
          {showSavedSearchesDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-2 z-30">
              <div className="max-h-60 overflow-y-auto">
                {savedSearches.length > 0 ? (
                  <ul className="space-y-1">
                    {savedSearches.map(search => (
                      <li 
                        key={search.id} 
                        className="hover:bg-blue-50 rounded p-2 cursor-pointer flex items-center justify-between"
                        onClick={() => applySavedSearch(search)}
                      >
                        <span className="truncate flex-1">{search.name}</span>
                        <button 
                          className="text-gray-500 hover:text-red-500 p-1"
                          onClick={(e) => deleteSavedSearch(e, search.id)}
                        >
                          <Trash size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 p-2">保存された検索条件はありません</p>
                )}
              </div>
              <div className="border-t pt-1 mt-1">
                <button 
                  className="text-green-600 hover:text-green-700 text-sm w-full text-left p-2 flex items-center"
                  onClick={() => {
                    setShowSaveModal(true);
                    setShowSavedSearchesDropdown(false);
                  }}
                >
                  <Save size={14} className="mr-2" />
                  現在の検索条件を保存
                </button>
              </div>
            </div>
          )}
        </div>
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
          label="カテゴリを選択"
          icon={<Trophy className="text-green-600" size={16} />}
          options={leagues}
          selectedValues={selectedLeagues}
          onChange={setSelectedLeagues}
        />
        
        {/* 資格・学部選択 */}
        <MultiSelectDropdown
          label="学部で選択"
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
      
      {/* 簡単なソートオプション */}
      <div className="bg-gray-50 p-3 rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700 font-medium">並べ替え:</span>
            <select 
              className="p-2 border rounded-md text-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">並び替えなし</option>
              <option value="j_league">Jリーグ内定者数順</option>
              <option value="members">部員数順</option>
              <option value="name">大学名順</option>
            </select>
          </div>
          
          {/* 並び替え順序ボタン */}
          <button 
            className="bg-gray-200 p-1 rounded text-gray-700 hover:bg-gray-300"
            onClick={() => setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')}
            title={sortDirection === 'desc' ? '降順' : '昇順'}
          >
            {sortDirection === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
          </button>
        </div>
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
              className="text-blue-600 text-xs hover:underline flex items-center"
              onClick={() => setShowSaveModal(true)}
            >
              <Save size={14} className="mr-1" />
              保存
            </button>
            <button 
              className="text-red-500 text-xs hover:underline"
              onClick={clearAllFilters}
            >
              すべてクリア
            </button>
          </div>
        </div>
      )}
      
      {/* 人気の検索条件ボタン（簡潔版） */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          type="button"
          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200"
          onClick={() => {
            setSportsRecommend(true);
          }}
        >
          スポーツ推薦がある大学
        </button>
        <button 
          type="button"
          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200"
          onClick={() => {
            setSortOption("j_league");
          }}
        >
          Jリーグ内定者数が多い大学
        </button>
        <button 
          type="button"
          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200"
          onClick={() => {
            setDormAvailable(true);
          }}
        >
          寮がある大学
        </button>
        <button 
          type="button"
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200"
          onClick={() => {
            setPublicUniversity(true);
            setPrivateUniversity(false);
          }}
        >
          国公立大学のみ
        </button>
        <button 
          type="button"
          className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm hover:bg-red-200"
          onClick={() => {
            setPrivateUniversity(true);
            setPublicUniversity(false);
          }}
        >
          私立大学のみ
        </button>
      </div>
      
      {/* 検索ボタン */}
      <div className="flex justify-center mt-4">
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors shadow-sm">
          検索する {activeFiltersCount > 0 && `(${activeFiltersCount}件の条件)`}
        </button>
      </div>
      
      {/* 検索条件保存モーダル */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div 
            ref={saveModalRef}
            className="bg-white rounded-lg p-5 max-w-md w-full shadow-xl"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">検索条件を保存</h3>
            <p className="text-gray-600 mb-4">
              この検索条件に名前をつけて保存すると、後で簡単に呼び出すことができます。
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                検索条件の名前
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={newSearchName}
                onChange={(e) => setNewSearchName(e.target.value)}
                placeholder="例：Jリーグ内定者多数の関東圏大学"
                autoFocus
              />
            </div>
            <div className="flex space-x-2 justify-end">
              <button
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setShowSaveModal(false)}
              >
                キャンセル
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={handleSaveSearch}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectSearchForm;