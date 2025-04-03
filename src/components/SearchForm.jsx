// src/components/SearchForm.jsx
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Bookmark, SlidersHorizontal, Users, Trophy, Medal, BookOpen, Calendar, Zap } from 'lucide-react';
import regions from '../data/regions';
import leagues from '../data/leagues';
import availableQualifications from '../data/qualifications';

const SearchForm = ({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  selectedLeague,
  setSelectedLeague,
  selectedQualification,
  setSelectedQualification,
  sportsRecommend,
  setSportsRecommend,
  selectionAvailable,
  setSelectionAvailable,
  dormAvailable,
  setDormAvailable,
  setSortOption
}) => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [savedSearches] = useState([
    { id: 1, name: 'Jリーグ内定者多数の関東圏大学' },
    { id: 2, name: '寮ありの関西の大学' }
  ]);
  
  // 現在の検索条件をクリアする関数
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedRegion('');
    setSelectedLeague('');
    setSelectedQualification('');
    setSportsRecommend(false);
    setSelectionAvailable(false);
    setDormAvailable(false);
  };
  
  // 個別のフィルターをクリアする関数
  const clearFilter = (filterType) => {
    switch(filterType) {
      case 'region':
        setSelectedRegion('');
        break;
      case 'sportsRecommend':
        setSportsRecommend(false);
        break;
      case 'dormAvailable':
        setDormAvailable(false);
        break;
      case 'selectionAvailable':
        setSelectionAvailable(false);
        break;
      case 'league':
        setSelectedLeague('');
        break;
      case 'qualification':
        setSelectedQualification('');
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">大学サッカー部を探す</h2>
        
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
        
        {/* 地域選択 */}
        <div>
          <select 
            className="w-full p-3 border rounded-md"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">地域を選択</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>
        </div>
        
        {/* リーグ選択 */}
        <div>
          <select 
            className="w-full p-3 border rounded-md"
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
          >
            <option value="">カテゴリを選択</option>
            {leagues.map((league, index) => (
              <option key={index} value={league}>{league}</option>
            ))}
          </select>
        </div>
        
        {/* 資格選択 */}
        <div>
          <select 
            className="w-full p-3 border rounded-md"
            value={selectedQualification}
            onChange={(e) => setSelectedQualification(e.target.value)}
          >
            <option value="">学部で選択</option>
            {availableQualifications.map((qualification, index) => (
              <option key={index} value={qualification}>{qualification}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* フィルターチップ - 現在の検索条件 */}
      {(selectedRegion || sportsRecommend || dormAvailable || selectionAvailable || selectedLeague || selectedQualification) && (
        <div className="flex flex-wrap gap-2 mb-4 bg-gray-50 p-3 rounded-lg">
          <span className="text-sm text-gray-500 mr-1">現在の検索条件:</span>
          
          {selectedRegion && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
              {selectedRegion}
              <button 
                className="ml-1 text-blue-500 hover:text-blue-700"
                onClick={() => clearFilter('region')}
              >
                ×
              </button>
            </span>
          )}
          
          {sportsRecommend && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
              スポーツ推薦あり
              <button 
                className="ml-1 text-green-500 hover:text-green-700"
                onClick={() => clearFilter('sportsRecommend')}
              >
                ×
              </button>
            </span>
          )}
          
          {dormAvailable && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
              寮あり
              <button 
                className="ml-1 text-purple-500 hover:text-purple-700"
                onClick={() => clearFilter('dormAvailable')}
              >
                ×
              </button>
            </span>
          )}
          
          {selectionAvailable && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
              セレクションあり
              <button 
                className="ml-1 text-yellow-500 hover:text-yellow-700"
                onClick={() => clearFilter('selectionAvailable')}
              >
                ×
              </button>
            </span>
          )}
          
          {selectedLeague && (
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full flex items-center">
              {selectedLeague}
              <button 
                className="ml-1 text-indigo-500 hover:text-indigo-700"
                onClick={() => clearFilter('league')}
              >
                ×
              </button>
            </span>
          )}
          
          {selectedQualification && (
            <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full flex items-center">
              {selectedQualification}
              <button 
                className="ml-1 text-pink-500 hover:text-pink-700"
                onClick={() => clearFilter('qualification')}
              >
                ×
              </button>
            </span>
          )}
          
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
          />
          一般入部可
        </label>
      </div>
      
      {/* 詳細検索トグル */}
      <button 
        className="flex items-center text-green-600 hover:text-green-700 transition-colors mb-4"
        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
      >
        {showAdvancedOptions ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
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
                defaultValue="0"
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
              <select className="p-2 border rounded-md text-sm">
                <option value="">2022年</option>
                <option>1名以上</option>
                <option>3名以上</option>
                <option>5名以上</option>
              </select>
              <select className="p-2 border rounded-md text-sm">
                <option value="">2023年</option>
                <option>1名以上</option>
                <option>3名以上</option>
                <option>5名以上</option>
              </select>
              <select className="p-2 border rounded-md text-sm">
                <option value="">2024年</option>
                <option>1名以上</option>
                <option>3名以上</option>
                <option>5名以上</option>
              </select>
            </div>
          </div>
          
          {/* 部員数フィルター */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Users size={16} className="mr-1 text-green-600" />
              部員数
            </label>
            <select className="w-full p-2 border rounded-md">
              <option value="">指定なし</option>
              <option>少数精鋭 (〜49名)</option>
              <option>中規模 (50〜79名)</option>
              <option>大規模 (80名以上)</option>
            </select>
          </div>
          
          {/* 新入部員受入数 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <BookOpen size={16} className="mr-1 text-purple-600" />
              新入部員数
            </label>
            <select className="w-full p-2 border rounded-md">
              <option value="">指定なし</option>
              <option>少数選抜 (〜15名)</option>
              <option>中規模 (16〜25名)</option>
              <option>多数受入 (26名以上)</option>
            </select>
          </div>
          
          {/* 評定範囲指定 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <BookOpen size={16} className="mr-1 text-orange-600" />
              評定基準
            </label>
            <select className="w-full p-2 border rounded-md">
              <option value="">指定なし</option>
              <option>3.5以上必要</option>
              <option>3.0以上必要</option>
              <option>2.7以上必要</option>
              <option>2.5以上必要</option>
            </select>
          </div>
          
          {/* 監督キャリア検索 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Trophy size={16} className="mr-1 text-yellow-600" />
              監督キャリア
            </label>
            <select className="w-full p-2 border rounded-md">
              <option value="">指定なし</option>
              <option>元Jリーガー</option>
              <option>元日本代表</option>
              <option>学生出身</option>
            </select>
          </div>
          
          {/* デンソーカップ出場者数 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Zap size={16} className="mr-1 text-blue-600" />
              デンソーカップ出場
            </label>
            <select className="w-full p-2 border rounded-md">
              <option value="">指定なし</option>
              <option>出場者あり</option>
              <option>2名以上</option>
              <option>3名以上</option>
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
            setSelectedQualification("JFA公認コーチングライセンス");
          }}
        >
          コーチングライセンス取得可能
        </button>
        <button 
          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200"
          onClick={() => {
            setSelectedQualification("教員免許（保健体育）");
          }}
        >
          教員免許取得可能
        </button>
      </div>
    </div>
  );
};

export default SearchForm;