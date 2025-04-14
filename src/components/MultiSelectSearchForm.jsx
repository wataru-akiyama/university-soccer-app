// src/components/MultiSelectSearchForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, ChevronUp, X, Check, Filter, Trophy, Home, Calendar, BookOpen, SlidersHorizontal, Medal, Users, Zap, Star, Save, Bookmark, Trash, School } from 'lucide-react';
import regions from '../data/regions';
import leagues from '../data/leagues';
import availableQualifications from '../data/qualifications';

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
  publicUniversity,  // 新規追加
  setPublicUniversity, // 新規追加
  privateUniversity,  // 新規追加
  setPrivateUniversity, // 新規追加
  jLeagueMinimum,
  setJLeagueMinimum,
  yearlyJLeagueFilter,
  setYearlyJLeagueFilter,
  memberSizeCategory,
  setMemberSizeCategory,
  newMemberSizeCategory,
  setNewMemberSizeCategory,
  maxGradeRequirement,
  setMaxGradeRequirement,
  coachBackgroundFilter,
  setCoachBackgroundFilter,
  densoCupMinimum,
  setDensoCupMinimum,
  sortOption,
  setSortOption,
  sortDirection,
  setSortDirection
}) => {
  // 詳細検索オプションの表示状態
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  
  // ドロップダウンの表示状態
  const [dropdowns, setDropdowns] = useState({
    region: false,
    league: false,
    qualification: false,
    savedSearches: false
  });
  
  // 保存済み検索条件の表示状態
  const [savedSearches, setSavedSearches] = useState([]);
  
  // 検索条件保存モーダル
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [newSearchName, setNewSearchName] = useState('');
  
  // スライダー表示用の値
  const [sliderValue, setSliderValue] = useState(jLeagueMinimum || 0);
  
  // ドロップダウンの外側クリックを検知するためのref
  const dropdownRef = useRef(null);
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
  
  // ドロップダウン外のクリックを検知して閉じる
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdowns({
          region: false,
          league: false,
          qualification: false,
          savedSearches: false
        });
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
  
  // コンポーネントマウント時にスライダー値を初期化
  useEffect(() => {
    setSliderValue(jLeagueMinimum || 0);
  }, [jLeagueMinimum]);
  
  // ドロップダウンのトグル
  const toggleDropdown = (dropdown) => {
    setDropdowns(prev => {
      const updated = Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === dropdown ? !prev[key] : false;
        return acc;
      }, {});
      return updated;
    });
  };
  
  // スライダーの値変更ハンドラー
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSliderValue(value);
    setJLeagueMinimum(value);
  };
  
  // 年度別Jリーグ内定者数フィルター変更ハンドラー
  const handleYearlyJLeagueChange = (year, value) => {
    const numValue = value === "" ? 0 : parseInt(value, 10);
    setYearlyJLeagueFilter(prev => ({
      ...prev,
      [`year${year}`]: numValue
    }));
  };
  
  // 部員数カテゴリー変更ハンドラー
  const handleMemberSizeChange = (e) => {
    setMemberSizeCategory(e.target.value);
  };
  
  // 新入部員数カテゴリー変更ハンドラー
  const handleNewMemberSizeChange = (e) => {
    setNewMemberSizeCategory(e.target.value);
  };
  
  // 監督キャリア変更ハンドラー
  const handleCoachBackgroundChange = (e) => {
    setCoachBackgroundFilter(e.target.value);
  };
  
  // 評定基準変更ハンドラー
  const handleGradeChange = (e) => {
    const value = e.target.value;
    let gradeValue = 0;
    
    // 評定値を設定
    if (value.includes('3.5')) {
      gradeValue = 3.5;
    } else if (value.includes('3.0')) {
      gradeValue = 3.0;
    } else if (value.includes('2.7')) {
      gradeValue = 2.7;
    } else if (value.includes('2.5')) {
      gradeValue = 2.5;
    }
    
    setMaxGradeRequirement(gradeValue);
  };
  
  // デンソーカップ出場者数変更ハンドラー
  const handleDensoCupChange = (e) => {
    const value = e.target.value;
    const numValue = value === "" ? 0 : parseInt(value.replace(/[^0-9]/g, ''), 10);
    setDensoCupMinimum(numValue);
  };
  
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
    setPublicUniversity(false); // 新規追加
    setPrivateUniversity(false); // 新規追加
    
    // 詳細検索条件もリセット
    setJLeagueMinimum(0);
    setSliderValue(0);
    setYearlyJLeagueFilter({
      year2022: 0,
      year2023: 0,
      year2024: 0
    });
    setMemberSizeCategory('');
    setNewMemberSizeCategory('');
    setCoachBackgroundFilter('');
    setMaxGradeRequirement(0);
    setDensoCupMinimum(0);
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
      publicUniversity, // 新規追加
      privateUniversity, // 新規追加
      jLeagueMinimum,
      yearlyJLeagueFilter,
      memberSizeCategory,
      newMemberSizeCategory,
      maxGradeRequirement,
      coachBackgroundFilter,
      densoCupMinimum,
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
    
    // 国公立・私立フィルター（新規追加）
    setPublicUniversity(conditions.publicUniversity || false);
    setPrivateUniversity(conditions.privateUniversity || false);
    
    // 詳細検索条件
    setJLeagueMinimum(conditions.jLeagueMinimum || 0);
    setSliderValue(conditions.jLeagueMinimum || 0);
    setYearlyJLeagueFilter(conditions.yearlyJLeagueFilter || {
      year2022: 0,
      year2023: 0,
      year2024: 0
    });
    setMemberSizeCategory(conditions.memberSizeCategory || '');
    setNewMemberSizeCategory(conditions.newMemberSizeCategory || '');
    setMaxGradeRequirement(conditions.maxGradeRequirement || 0);
    setCoachBackgroundFilter(conditions.coachBackgroundFilter || '');
    setDensoCupMinimum(conditions.densoCupMinimum || 0);
    setSortOption(conditions.sortOption || '');
    setSortDirection(conditions.sortDirection || 'desc');
    
    // ドロップダウンを閉じる
    setDropdowns(prev => ({...prev, savedSearches: false}));
  };
  
  // 保存済み検索条件を削除するハンドラー
  const deleteSavedSearch = (e, id) => {
    e.stopPropagation(); // クリックイベントの伝播を停止
    
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
    
    // 基本フィルター
    if (searchQuery) count++;
    count += selectedRegions.length;
    count += selectedLeagues.length;
    count += selectedQualifications.length;
    if (sportsRecommend) count++;
    if (selectionAvailable) count++;
    if (dormAvailable) count++;
    if (generalAdmissionAvailable) count++;
    if (publicUniversity) count++; // 新規追加
    if (privateUniversity) count++; // 新規追加
    
    // 詳細フィルター
    if (jLeagueMinimum > 0) count++;
    if (yearlyJLeagueFilter.year2022 > 0) count++;
    if (yearlyJLeagueFilter.year2023 > 0) count++;
    if (yearlyJLeagueFilter.year2024 > 0) count++;
    if (memberSizeCategory) count++;
    if (newMemberSizeCategory) count++;
    if (coachBackgroundFilter) count++;
    if (maxGradeRequirement > 0) count++;
    if (densoCupMinimum > 0) count++;
    
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
    
    // 国公立・私立タグ（新規追加）
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
    
    // その他の詳細条件
    if (jLeagueMinimum > 0) {
      tags.push({
        id: 'jleague-minimum',
        label: `Jリーグ内定${jLeagueMinimum}名以上`,
        type: 'jLeagueMinimum'
      });
    }
    
    if (memberSizeCategory) {
      const labelMap = {
        'small': '少数精鋭 (〜49名)',
        'medium': '中規模 (50〜79名)',
        'large': '大規模 (80名以上)'
      };
      tags.push({
        id: 'member-size',
        label: `部員数: ${labelMap[memberSizeCategory] || memberSizeCategory}`,
        type: 'memberSizeCategory'
      });
    }
    
    if (newMemberSizeCategory) {
      const labelMap = {
        'small': '少数選抜 (〜15名)',
        'medium': '中規模 (16〜25名)',
        'large': '多数受入 (26名以上)'
      };
      tags.push({
        id: 'new-member-size',
        label: `新入部員: ${labelMap[newMemberSizeCategory] || newMemberSizeCategory}`,
        type: 'newMemberSizeCategory'
      });
    }
    
    if (coachBackgroundFilter) {
      const labelMap = {
        'jleaguer': '元Jリーガー',
        'national': '元日本代表',
        'student': '学生出身'
      };
      tags.push({
        id: 'coach-background',
        label: `監督: ${labelMap[coachBackgroundFilter] || coachBackgroundFilter}`,
        type: 'coachBackgroundFilter'
      });
    }
    
    if (maxGradeRequirement > 0) {
      tags.push({
        id: 'grade-requirement',
        label: `評定${maxGradeRequirement}以上`,
        type: 'maxGradeRequirement'
      });
    }
    
    if (densoCupMinimum > 0) {
      tags.push({
        id: 'denso-cup-minimum',
        label: `デンソーカップ${densoCupMinimum}名以上`,
        type: 'densoCupMinimum'
      });
    }
    
    // 年度別Jリーグ内定者数
    Object.entries(yearlyJLeagueFilter).forEach(([key, value]) => {
      if (value > 0) {
        const year = key.replace('year', '');
        tags.push({
          id: `yearly-j-league-${year}`,
          label: `${year}年Jリーグ内定${value}名以上`,
          type: 'yearlyJLeagueFilter',
          year,
          value
        });
      }
    });
    
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
      case 'publicUniversity': // 新規追加
        setPublicUniversity(false);
        break;
      case 'privateUniversity': // 新規追加
        setPrivateUniversity(false);
        break;
      case 'jLeagueMinimum':
        setJLeagueMinimum(0);
        setSliderValue(0);
        break;
      case 'memberSizeCategory':
        setMemberSizeCategory('');
        break;
      case 'newMemberSizeCategory':
        setNewMemberSizeCategory('');
        break;
      case 'coachBackgroundFilter':
        setCoachBackgroundFilter('');
        break;
      case 'maxGradeRequirement':
        setMaxGradeRequirement(0);
        break;
      case 'densoCupMinimum':
        setDensoCupMinimum(0);
        break;
      case 'yearlyJLeagueFilter':
        setYearlyJLeagueFilter(prev => ({
          ...prev,
          [`year${tag.year}`]: 0
        }));
        break;
      default:
        break;
    }
  };
  
  // ドロップダウン選択オプションのレンダリング
  const renderDropdownOptions = (options, current, onChange) => {
    return (
      <div className="absolute z-30 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
        <div className="p-2">
          {options.map((option, index) => (
            <div 
              key={index} 
              className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
              onClick={() => {
                // 既に選択されている場合は削除、そうでなければ追加
                const newSelection = current.includes(option)
                  ? current.filter(item => item !== option)
                  : [...current, option];
                onChange(newSelection);
              }}
            >
              <input
                type="checkbox"
                checked={current.includes(option)}
                onChange={() => {}}
                className="mr-2 h-4 w-4"
              />
              <label className="cursor-pointer flex-grow">
                {option}
              </label>
              {current.includes(option) && (
                <Check size={16} className="text-green-600" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // タグリスト
  const tags = createTags();
  const activeFiltersCount = getActiveFiltersCount();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">大学サッカー部を探す</h2>
        
        {/* 保存済み検索条件ドロップダウン */}
        <div className="relative" ref={dropdownRef}>
          <button 
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            onClick={() => toggleDropdown('savedSearches')}
          >
            <Bookmark size={18} className="mr-1" />
            <span>保存した検索条件</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
          
          {dropdowns.savedSearches && (
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
                    setDropdowns(prev => ({...prev, savedSearches: false}));
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
        <div className="relative">
          <button
            type="button"
            className="w-full p-3 border rounded-md flex justify-between items-center bg-white"
            onClick={() => toggleDropdown('region')}
          >
            <span className="flex items-center text-gray-700">
              <Filter className="text-green-600 mr-2" size={16} />
              地域を選択 {selectedRegions.length > 0 && `(${selectedRegions.length})`}
            </span>
            <ChevronDown className="text-gray-400" size={16} />
          </button>
          {dropdowns.region && renderDropdownOptions(regions, selectedRegions, setSelectedRegions)}
        </div>
        
        {/* リーグ選択 */}
        <div className="relative">
          <button
            type="button"
            className="w-full p-3 border rounded-md flex justify-between items-center bg-white"
            onClick={() => toggleDropdown('league')}
          >
            <span className="flex items-center text-gray-700">
              <Trophy className="text-green-600 mr-2" size={16} />
              カテゴリを選択 {selectedLeagues.length > 0 && `(${selectedLeagues.length})`}
            </span>
            <ChevronDown className="text-gray-400" size={16} />
          </button>
          {dropdowns.league && renderDropdownOptions(leagues, selectedLeagues, setSelectedLeagues)}
        </div>
        
        {/* 資格・学部選択 */}
        <div className="relative">
          <button
            type="button"
            className="w-full p-3 border rounded-md flex justify-between items-center bg-white"
            onClick={() => toggleDropdown('qualification')}
          >
            <span className="flex items-center text-gray-700">
              <BookOpen className="text-green-600 mr-2" size={16} />
              学部で選択 {selectedQualifications.length > 0 && `(${selectedQualifications.length})`}
            </span>
            <ChevronDown className="text-gray-400" size={16} />
          </button>
          {dropdowns.qualification && renderDropdownOptions(availableQualifications, selectedQualifications, setSelectedQualifications)}
        </div>
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

        {/* 国公立・私立大学チェックボックス（新規追加） */}
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
      
      {/* 詳細検索オプショントグル */}
      <button 
        className="flex items-center text-green-600 hover:text-green-700 transition-colors mb-4"
        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
      >
        {showAdvancedOptions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        <span className="ml-1 font-medium">詳細検索オプション</span>
      </button>
      
      {/* 詳細検索オプション */}
      {showAdvancedOptions && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          {/* Jリーグ内定者数の範囲指定 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Medal size={16} className="mr-1 text-yellow-600" />
              Jリーグ内定者数
            </label>
            <div className="flex items-center">
              <SlidersHorizontal size={16} className="mr-2 text-gray-400" />
              <input 
                type="range" 
                min="0" 
                max="15" 
                step="1" 
                value={sliderValue}
                onChange={handleSliderChange}
                className="w-full h-2 bg-green-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>指定なし</span>
              <span>5名以上</span>
              <span>10名以上</span>
            </div>
            <div className="text-center text-sm font-medium text-green-600">
              {sliderValue > 0 ? `${sliderValue}名以上` : '指定なし'}
            </div>
          </div>
          
          {/* 年度別Jリーグ内定者検索 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Calendar size={16} className="mr-1 text-blue-600" />
              年度別内定者数
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select 
                className="p-2 border rounded-md text-sm"
                onChange={(e) => handleYearlyJLeagueChange('2022', e.target.value)}
                value={yearlyJLeagueFilter.year2022 || ""}
              >
                <option value="">2022年</option>
                <option value="1">1名以上</option>
                <option value="3">3名以上</option>
                <option value="5">5名以上</option>
              </select>
              <select 
                className="p-2 border rounded-md text-sm"
                onChange={(e) => handleYearlyJLeagueChange('2023', e.target.value)}
                value={yearlyJLeagueFilter.year2023 || ""}
              >
                <option value="">2023年</option>
                <option value="1">1名以上</option>
                <option value="3">3名以上</option>
                <option value="5">5名以上</option>
              </select>
              <select 
                className="p-2 border rounded-md text-sm"
                onChange={(e) => handleYearlyJLeagueChange('2024', e.target.value)}
                value={yearlyJLeagueFilter.year2024 || ""}
              >
                <option value="">2024年</option>
                <option value="1">1名以上</option>
                <option value="3">3名以上</option>
                <option value="5">5名以上</option>
              </select>
            </div>
          </div>
          
          {/* 部員数フィルター */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Users size={16} className="mr-1 text-green-600" />
              部員数
            </label>
            <select 
              className="w-full p-2 border rounded-md"
              value={memberSizeCategory}
              onChange={handleMemberSizeChange}
            >
              <option value="">指定なし</option>
              <option value="small">少数精鋭 (〜49名)</option>
              <option value="medium">中規模 (50〜79名)</option>
              <option value="large">大規模 (80名以上)</option>
            </select>
          </div>
          
          {/* 新入部員受入数 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <BookOpen size={16} className="mr-1 text-purple-600" />
              新入部員数
            </label>
            <select 
              className="w-full p-2 border rounded-md"
              value={newMemberSizeCategory}
              onChange={handleNewMemberSizeChange}
            >
              <option value="">指定なし</option>
              <option value="small">少数選抜 (〜15名)</option>
              <option value="medium">中規模 (16〜25名)</option>
              <option value="large">多数受入 (26名以上)</option>
            </select>
          </div>
          
          {/* 評定範囲指定 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <BookOpen size={16} className="mr-1 text-orange-600" />
              評定基準
            </label>
            <select 
              className="w-full p-2 border rounded-md"
              onChange={handleGradeChange}
              value={maxGradeRequirement ? String(maxGradeRequirement) : ""}
            >
              <option value="">指定なし</option>
              <option value="3.5">3.5以上必要</option>
              <option value="3.0">3.0以上必要</option>
              <option value="2.7">2.7以上必要</option>
              <option value="2.5">2.5以上必要</option>
            </select>
          </div>
          
          {/* 監督キャリア検索 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Trophy size={16} className="mr-1 text-yellow-600" />
              監督キャリア
            </label>
            <select 
              className="w-full p-2 border rounded-md"
              value={coachBackgroundFilter}
              onChange={handleCoachBackgroundChange}
            >
              <option value="">指定なし</option>
              <option value="jleaguer">元Jリーガー</option>
              <option value="national">元日本代表</option>
              <option value="student">学生出身</option>
            </select>
          </div>
          
          {/* デンソーカップ出場者数 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Zap size={16} className="mr-1 text-blue-600" />
              デンソーカップ出場
            </label>
            <select 
              className="w-full p-2 border rounded-md"
              onChange={handleDensoCupChange}
              value={densoCupMinimum || ""}
            >
              <option value="">指定なし</option>
              <option value="1">出場者あり</option>
              <option value="2">2名以上</option>
              <option value="3">3名以上</option>
            </select>
          </div>
          
          {/* ソートオプション */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Star size={16} className="mr-1 text-yellow-600" />
              並び替え
            </label>
            <div className="flex space-x-2">
              <select 
                className="flex-grow p-2 border rounded-md"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">指定なし</option>
                <option value="j_league">Jリーグ内定者数順</option>
                <option value="members">部員数順</option>
                <option value="grade_requirement">評定基準順</option>
                <option value="denso_cup">デンソーカップ出場者順</option>
              </select>
              <button
                className="bg-gray-200 p-2 rounded text-gray-700 hover:bg-gray-300"
                onClick={() => setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')}
                title={sortDirection === 'desc' ? '降順' : '昇順'}
              >
                {sortDirection === 'desc' ? '↓' : '↑'}
              </button>
            </div>
          </div>
        </div>
      )}
      
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
      
      {/* 人気の検索条件ボタン */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          type="button"
          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200"
          onClick={() => {
            setSportsRecommend(true);
            setSelectionAvailable(false);
            setDormAvailable(false);
          }}
        >
          スポーツ推薦がある大学
        </button>
        <button 
          type="button"
          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200"
          onClick={() => {
            setSortOption("j_league");
            setJLeagueMinimum(5); // 5名以上に設定
            setSliderValue(5);
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
          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200"
          onClick={() => {
            setSelectedQualifications(["JFA公認コーチングライセンス"]);
          }}
        >
          コーチングライセンス取得可能
        </button>
        <button 
          type="button"
          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200"
          onClick={() => {
            setSelectedQualifications(["教員免許（保健体育）"]);
          }}
        >
          教員免許取得可能
        </button>
        {/* 国公立・私立大学ボタン（新規追加） */}
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