import React from 'react';
import { Search } from 'lucide-react';
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
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">大学サッカー部を探す</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* キーワード検索 */}
        <div className="relative">
          <input
            type="text"
            placeholder="大学名で検索"
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
            <option value="">リーグを選択</option>
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
            <option value="">取得可能資格で探す</option>
            {availableQualifications.map((qualification, index) => (
              <option key={index} value={qualification}>{qualification}</option>
            ))}
          </select>
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
      </div>
      
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