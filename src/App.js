import soccerLogo from './assets/soccer-logo.svg';
import React, { useState, useEffect } from 'react';  // useEffect を追加
import { ChevronRight, Heart } from 'lucide-react';  // Heart を追加
import universities from './data/universities';
import SearchForm from './components/SearchForm';
import UniversityList from './components/UniversityList';
import UniversityDetails from './components/UniversityDetails';
import CompareView from './components/CompareView';
import MyCareerPlan from './components/MyCareerPlan';  // 新コンポーネント
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
  const [favoriteUniversities, setFavoriteUniversities] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // ローカルストレージからお気に入りを読み込む
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteUniversities');
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      const favUniversities = favoriteIds.map(id => 
        universities.find(uni => uni.id === id)
      ).filter(Boolean);
      setFavoriteUniversities(favUniversities);
    }
  }, []);

  // お気に入りをローカルストレージに保存
  useEffect(() => {
    if (favoriteUniversities.length > 0) {
      const favoriteIds = favoriteUniversities.map(uni => uni.id);
      localStorage.setItem('favoriteUniversities', JSON.stringify(favoriteIds));
    }
  }, [favoriteUniversities]);

  // 大学の詳細表示
  const viewUniversityDetails = (university) => {
    setSelectedUniversity(university);
  };

  // トップページに戻る
  const backToList = () => {
    setSelectedUniversity(null);
    setShowCompare(false);
    setShowFavorites(false);  // 追加
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
      setShowFavorites(false);  // 追加
    }
  };

  // お気に入りに追加
  const addToFavorites = (university) => {
    if (!favoriteUniversities.some(uni => uni.id === university.id)) {
      setFavoriteUniversities([...favoriteUniversities, university]);
    }
  };

  // お気に入りから削除
  const removeFromFavorites = (universityId) => {
    setFavoriteUniversities(favoriteUniversities.filter(uni => uni.id !== universityId));
  };

  // お気に入り画面の表示
  const showFavoritesView = () => {
    setShowFavorites(true);
    setSelectedUniversity(null);
    setShowCompare(false);
  };

  // お気に入りの順序変更
  const reorderFavorites = (startIndex, endIndex) => {
    const result = Array.from(favoriteUniversities);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setFavoriteUniversities(result);
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
          <div className="flex gap-2">
            {favoriteUniversities.length > 0 && (
              <button 
                className="bg-white text-blue-600 px-4 py-2 rounded-md flex items-center mr-2"
                onClick={showFavoritesView}
              >
                <Heart size={16} className="mr-2" />
                <span>私の進路プラン ({favoriteUniversities.length})</span>
              </button>
            )}
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
            onAddToFavorites={addToFavorites}  // 追加
            isInCompareList={compareList.some(uni => uni.id === selectedUniversity.id)}
            isInFavorites={favoriteUniversities.some(uni => uni.id === selectedUniversity.id)}  // 追加
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
        /* お気に入り画面 - 追加 */
        : showFavorites ? (
          <MyCareerPlan 
            favoriteUniversities={favoriteUniversities}
            onBack={backToList}
            onRemoveFromFavorites={removeFromFavorites}
            onReorderFavorites={reorderFavorites}
            onViewDetails={viewUniversityDetails}
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
              favoriteUniversities={favoriteUniversities}  // 追加
              onAddToFavorites={addToFavorites}  // 追加
              onRemoveFromFavorites={removeFromFavorites}  // 追加
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