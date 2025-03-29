import soccerLogo from './assets/soccer-logo.svg';
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import universities from './data/universities';
import SearchForm from './components/SearchForm';
import UniversityList from './components/UniversityList';
import UniversityDetails from './components/UniversityDetails';
import CompareView from './components/CompareView';
import useUniversitySearch from './hooks/useUniversitySearch';

const App = () => {
  // カスタムフックを使用して検索ロジックを実装
  const {
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
    sortOption,
    setSortOption,
    filteredUniversities
  } = useUniversitySearch(universities);

  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  // 大学の詳細表示
  const viewUniversityDetails = (university) => {
    setSelectedUniversity(university);
  };

  // トップページに戻る
  const backToList = () => {
    setSelectedUniversity(null);
    setShowCompare(false);
  };

  // 比較リストに追加
  const addToCompare = (university) => {
    if (!compareList.some(uni => uni.id === university.id)) {
      if (compareList.length < 3) {
        setCompareList([...compareList, university]);
      } else {
        alert("比較は最大3校までです。");
      }
    }
  };

  // 比較リストから削除
  const removeFromCompare = (universityId) => {
    setCompareList(compareList.filter(uni => uni.id !== universityId));
  };

  // 比較画面の表示
  const showCompareView = () => {
    if (compareList.length > 0) {
      setShowCompare(true);
      setSelectedUniversity(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-green-700 text-white p-4 shadow-md">
  <div className="container mx-auto flex justify-between items-center">
    <div className="flex items-center cursor-pointer" onClick={backToList}>
      <img 
        src={soccerLogo} 
        alt="大学サッカー部お品書き" 
        className="h-10 mr-3" 
      />
      <h1 className="text-2xl font-bold hidden sm:block">大学サッカー部お品書き</h1>
    </div>
    {compareList.length > 0 && (
      <button 
        className="bg-white text-green-700 px-4 py-2 rounded-md flex items-center"
        onClick={showCompareView}
      >
        <span className="mr-2">比較リスト ({compareList.length})</span>
        <ChevronRight size={16} />
      </button>
    )}
  </div>
</header>

      {/* メインコンテンツ */}
      <main className="container mx-auto p-4">
        {/* 大学詳細表示 */}
        {selectedUniversity ? (
          <UniversityDetails 
            university={selectedUniversity} 
            onBack={backToList} 
            onAddToCompare={addToCompare}
            isInCompareList={compareList.some(uni => uni.id === selectedUniversity.id)}
          />
        ) 
        /* 比較画面 */
        : showCompare ? (
          <CompareView 
            universities={compareList} 
            onBack={backToList} 
            onRemove={removeFromCompare} 
          />
        ) 
        /* トップページ・検索結果表示 */
        : (
          <>
            <SearchForm
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedLeague={selectedLeague}
              setSelectedLeague={setSelectedLeague}
              selectedQualification={selectedQualification}
              setSelectedQualification={setSelectedQualification}
              sportsRecommend={sportsRecommend}
              setSportsRecommend={setSportsRecommend}
              selectionAvailable={selectionAvailable}
              setSelectionAvailable={setSelectionAvailable}
              dormAvailable={dormAvailable}
              setDormAvailable={setDormAvailable}
              setSortOption={setSortOption}
            />
            
            <UniversityList
              filteredUniversities={filteredUniversities}
              sortOption={sortOption}
              setSortOption={setSortOption}
              onViewDetails={viewUniversityDetails}
              compareList={compareList}
              onAddToCompare={addToCompare}
              onRemoveFromCompare={removeFromCompare}
            />
          </>
        )}
      </main>
      
      {/* フッター */}
      <footer className="bg-gray-800 text-white p-6 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2025 大学サッカー部お品書き</p>
          <p className="text-sm mt-2">このサイトは大学進学を検討する高校生やサッカー部関係者向けの情報提供を目的としています。</p>
        </div>
      </footer>
    </div>
  );
};

export default App;