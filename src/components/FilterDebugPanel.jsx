// src/components/FilterDebugPanel.jsx - 新規作成
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Bug } from 'lucide-react';
import { searchHelpers } from '../data';

const FilterDebugPanel = ({ universities }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [testRegion, setTestRegion] = useState('北海道・東北');
  
  // 開発環境でのみ表示
  if (process.env.NODE_ENV !== 'development') return null;
  
  // 地域フィルターのテスト
  const testRegionFilter = () => {
    console.log('🧪 地域フィルターテスト開始');
    
    universities.forEach(uni => {
      const isMatch = searchHelpers.isUniversityInRegion(uni, testRegion);
      console.log(`${isMatch ? '✅' : '❌'} ${uni.university_name} - ${uni.location} - ${testRegion}`);
    });
  };
  
  // 国立大学フィルターのテスト
  const testPublicFilter = () => {
    console.log('🧪 国立大学フィルターテスト開始');
    
    universities.forEach(uni => {
      const isPublic = searchHelpers.isPublicUniversity(uni);
      console.log(`${isPublic ? '🏛️' : '🏢'} ${uni.university_name} - 国立: ${isPublic}`);
    });
  };
  
  // データ構造の表示
  const showDataStructure = () => {
    console.log('📊 大学データ構造確認');
    const hokkaido = universities.find(uni => uni.university_name.includes('北海道'));
    if (hokkaido) {
      console.log('北海道大学のデータ:', {
        id: hokkaido.id,
        university_name: hokkaido.university_name,
        location: hokkaido.location,
        soccer_club: {
          league: hokkaido.soccer_club?.league,
          total_members: hokkaido.soccer_club?.total_members
        }
      });
    } else {
      console.log('❌ 北海道大学が見つかりません');
    }
  };
  
  return (
    <div className="fixed bottom-20 left-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 flex items-center justify-between text-left bg-purple-50 rounded-t-lg"
      >
        <div className="flex items-center space-x-2">
          <Bug size={16} className="text-purple-600" />
          <span className="text-sm font-medium text-purple-800">フィルターデバッグ</span>
        </div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isOpen && (
        <div className="p-3 space-y-3">
          <div>
            <p className="text-xs text-gray-600 mb-2">総大学数: {universities.length}校</p>
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-1">テスト地域:</label>
            <select 
              value={testRegion} 
              onChange={(e) => setTestRegion(e.target.value)}
              className="w-full text-xs border rounded px-2 py-1"
            >
              <option value="北海道・東北">北海道・東北</option>
              <option value="関東">関東</option>
              <option value="関西">関西</option>
              <option value="中部">中部</option>
              <option value="九州・沖縄">九州・沖縄</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <button
              onClick={testRegionFilter}
              className="w-full bg-blue-500 text-white text-xs py-1 px-2 rounded hover:bg-blue-600"
            >
              地域フィルターテスト
            </button>
            
            <button
              onClick={testPublicFilter}
              className="w-full bg-green-500 text-white text-xs py-1 px-2 rounded hover:bg-green-600"
            >
              国立大学フィルターテスト
            </button>
            
            <button
              onClick={showDataStructure}
              className="w-full bg-purple-500 text-white text-xs py-1 px-2 rounded hover:bg-purple-600"
            >
              データ構造確認
            </button>
          </div>
          
          <div className="text-xs text-gray-500 border-t pt-2">
            <p>コンソールログを確認してください</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDebugPanel;