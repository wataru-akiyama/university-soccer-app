// src/components/MultiSelectSearchForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, ChevronUp, X, Check, SlidersHorizontal, Users, Trophy, Medal, BookOpen, Calendar, Zap, Bookmark } from 'lucide-react';
import regions from '../data/regions';
import leagues from '../data/leagues';
import availableQualifications from '../data/qualifications';

// マルチセレクトドロップダウンコンポーネント
const MultiSelectDropdown = ({ 
  options, 
  selectedValues, 
  onChange, 
  placeholder 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // ドロップダウン外のクリックを検知して閉じる
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // チェックボックスの変更ハンドラー
  const handleCheckboxChange = (value) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    
    onChange(updatedValues);
  };
  
  // 表示テキストの生成
  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) return selectedValues[0];
    return `${selectedValues.length}件選択中`;
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="w-full p-3 border rounded-md flex justify-between items-center bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${selectedValues.length === 0 ? 'text-gray-500' : 'text-gray-800'}`}>
          {getDisplayText()}
        </span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2">
            {options.map((option, index) => (
              <div 
                key={index} 
                className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => handleCheckboxChange(option)}
              >
                <input
                  type="checkbox"
                  id={`option-${option}`}
                  checked={selectedValues.includes(option)}
                  onChange={() => {}}
                  className="mr-2 h-4 w-4"
                />
                <label 
                  htmlFor={`option-${option}`} 
                  className="cursor-pointer flex-grow"
                >
                  {option}
                </label>
                {selectedValues.includes(option) && (
                  <Check size={16} className="text-green-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// タグコンポーネント
const Tag = ({ label, onRemove }) => (
  <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">
    {label}
    <button 
      onClick={onRemove} 
      className="ml-1 text-green-600 hover:text-green-800 focus:outline-none"
    >
      <X size={14} />
    </button>
  </span>
);

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
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [savedSearches] = useState([
    { id: 1, name: 'Jリーグ内定者多数の関東圏大学' },
    { id: 2, name: '寮ありの関西の大学' }
  ]);
  
  // スライダーの値の状態管理
  const [sliderValue, setSliderValue] = useState(jLeagueMinimum || 0);
  
  // スライダーの値が変更されたときのハンドラー
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSliderValue(value);
    
    // スライダー値をJリーグ内定者数フィルターに反映
    setJLeagueMinimum(value);
  };
  
  // 部員数カテゴリーが変更されたときのハンドラー
  const handleMemberSizeChange = (e) => {
    const value = e.target.value;
    setMemberSizeCategory(value);
  };
  
  // 新入部員数カテゴリーが変更されたときのハンドラー
  const handleNewMemberSizeChange = (e) => {
    const value = e.target.value;
    setNewMemberSizeCategory(value);
  };
  
  // 監督キャリアが変更されたときのハンドラー
  const handleCoachBackgroundChange = (e) => {
    const value = e.target.value;
    setCoachBackgroundFilter(value);
  };
  
  // 年度別Jリーグ内定者数が変更されたときのハンドラー
  const handleYearlyJLeagueChange = (year, value) => {
    const numValue = value === "" ? 0 : parseInt(value, 10);
    
    setYearlyJLeagueFilter(prev => ({
      ...prev,
      [`year${year}`]: numValue
    }));
  };
  
  // デンソーカップ出場者数が変更されたときのハンドラー
  const handleDensoCupChange = (e) => {
    const value = e.target.value;
    const numValue = value === "" ? 0 : parseInt(value.replace(/[^0-9]/g, ''), 10);
    setDensoCupMinimum(numValue);
  };
  
  // 評定基準が変更されたときのハンドラー
  const handleGradeChange = (e) => {
    const value = e.target.value;
    let gradeValue = 0;
    
    // 評定値を抽出 (例: "3.5以上必要" → 3.5)
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
  
  // タグの生成（現在の選択条件）
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
    
    return tags;
  };
  
  // タグを削除する処理
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
      default:
        break;
    }
  };
  
  // 現在の検索条件をクリアする関数
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedRegions([]);
    setSelectedLeagues([]);
    setSelectedQualifications([]);
    setSportsRecommend(false);
    setSelectionAvailable(false);
    setDormAvailable(false);
    setGeneralAdmissionAvailable(false);
    
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
  };
  
  // 現在選択されているタグのリスト
  const tags = createTags();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">大学サッカー部を探す</h2>
        <p className="text-sm text-gray-500">地域・カテゴリ・学部は複数選択できます</p>
        
        {/* 保存された検索条件 */}
        <div className="relative group">
          <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <Bookmark size={18} className="mr-1" />
            <span>保存した検索条件</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
          
          <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-2 hidden group-hover:block z-10">
            <ul className="space-y-1">
              {savedSearches.map(search => (
                <li key={search.id} className="hover:bg-blue-50 rounded p-2 cursor-pointer">
                  {search.name}
                </li>
              ))}
              <li className="border-t pt-1 mt-1">
                <button className="text-green-600 hover:text-green-700 text-sm w-full text-left p-2">
                  + 現在の検索条件を保存
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 基本検索フォーム */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* キーワード検索 */}
        <div className="relative">
          <input
            type="text"
            placeholder="大学名・キーワードで検索"
            className="w-full p-3 border rounded-md pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
        
        {/* 地域選択（複数選択） */}
        <div>
          <MultiSelectDropdown 
            options={regions}
            selectedValues={selectedRegions}
            onChange={setSelectedRegions}
            placeholder="地域を選択（複数可）"
          />
        </div>
        
        {/* リーグ選択（複数選択） */}
        <div>
          <MultiSelectDropdown 
            options={leagues}
            selectedValues={selectedLeagues}
            onChange={setSelectedLeagues}
            placeholder="カテゴリを選択（複数可）"
          />
        </div>
        
        {/* 資格選択（複数選択） */}
        <div>
          <MultiSelectDropdown 
            options={availableQualifications}
            selectedValues={selectedQualifications}
            onChange={setSelectedQualifications}
            placeholder="学部で選択（複数可）"
          />
        </div>
      </div>
      
      {/* フィルターチップ - 現在の検索条件 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 bg-gray-50 p-3 rounded-lg">
          <span className="text-sm text-gray-500 mr-1">現在の検索条件:</span>
          
          {tags.map(tag => (
            <Tag 
              key={tag.id} 
              label={tag.label} 
              onRemove={() => handleRemoveTag(tag)} 
            />
          ))}
          
          <button 
            className="text-red-500 text-xs hover:underline ml-auto"
            onClick={clearAllFilters}
          >
            すべてクリア
          </button>
        </div>
      )}
      
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
      </div>
      
      {/* 詳細検索トグル */}
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
              value={maxGradeRequirement || ""}
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
        </div>
      )}
      
      {/* 人気の検索条件ボタン */}
      <div className="flex flex-wrap gap-2">
        <button 
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
          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200"
          onClick={() => {
            setDormAvailable(true);
          }}
        >
          寮がある大学
        </button>
        <button 
          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200"
          onClick={() => {
            setSelectedQualifications(["JFA公認コーチングライセンス"]);
          }}
        >
          コーチングライセンス取得可能
        </button>
        <button 
          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200"
          onClick={() => {
            setSelectedQualifications(["教員免許（保健体育）"]);
          }}
        >
          教員免許取得可能
        </button>
      </div>
      
      {/* 検索ボタン */}
      <div className="flex justify-center mt-4">
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors shadow-sm">
          検索する
        </button>
      </div>
    </div>
  );
};

export default MultiSelectSearchForm;