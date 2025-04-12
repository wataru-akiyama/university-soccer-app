import soccerLogo from './assets/soccer-logo.svg';
import React, { useState, useEffect } from 'react';
import { ChevronRight, Heart, Zap, UserCircle, Trophy, BookOpen, X } from 'lucide-react';
import universities from './data/universities';
import MultiSelectSearchForm from './components/MultiSelectSearchForm';
import UniversityList from './components/UniversityList';
import CompareView from './components/CompareView';
import MyCareerPlan from './components/MyCareerPlan';
import SimpleRecommendationWizard from './components/SimpleRecommendationWizard';
import useUniversitySearch from './hooks/useUniversitySearch';
import EnhancedPlayerPortfolio from './components/EnhancedPlayerPortfolio';
import EnhancedUniversityDetails from './components/EnhancedUniversityDetails';
import PortfolioBanner from './components/PortfolioBanner';
import ResponsiveHeader from './components/ResponsiveHeader';
import StepSearchWizard from './components/StepSearchWizard';

const App = () => {
  // カスタムフックを使用して検索ロジックを実装
  const {
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
    maxGradeRequirement,
    setMaxGradeRequirement,
    densoCupMinimum,
    setDensoCupMinimum,
    sortOption,
    setSortOption,
    sortDirection,
    setSortDirection,
    filteredUniversities,
    newMemberSizeCategory,
    setNewMemberSizeCategory,
    coachBackgroundFilter,
    setCoachBackgroundFilter,
  } = useUniversitySearch(universities);

  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [favoriteUniversities, setFavoriteUniversities] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showWizard, setShowWizard] = useState(false);// 最初は非表示にする
  // showPortfolioを削除（未使用）
  const [showPlayerPortfolio, setShowPlayerPortfolio] = useState(false);
  // 現在のビュー管理用のステートを追加
  const [currentView, setCurrentView] = useState('list'); // 'list', 'details', 'compare', 'favorites', 'recommendation', 'portfolio'

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
    setCurrentView('details');
  };

  // トップページに戻る
  const backToList = () => {
    setSelectedUniversity(null);
    setCurrentView('list');
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
    setCurrentView('compare');
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
    setCurrentView('favorites');
  };

  // お気に入りの順序変更
  const reorderFavorites = (startIndex, endIndex) => {
    const result = Array.from(favoriteUniversities);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setFavoriteUniversities(result);
  };

  // 推薦ウィザード表示のトグル
  const toggleRecommendation = () => {
    setCurrentView('recommendation');
  };

  // ウィザード表示のトグル関数
  const toggleWizard = () => {
    setShowWizard(!showWizard);
  };

  // ポートフォリオ表示関数
  const togglePlayerPortfolio = () => {
    setCurrentView('portfolio');
  };

  // 現在のビューに基づいて表示するコンポーネントを決定
  const renderCurrentView = () => {
    switch (currentView) {
      case 'portfolio':
        return (
          <EnhancedPlayerPortfolio 
            onBack={backToList}
            favoriteUniversities={favoriteUniversities}
            onShowRecommendation={toggleRecommendation}
            onShowFavorites={showFavoritesView}
            onShowCompare={showCompareView}
          />
        );
      case 'details':
        return (
          <EnhancedUniversityDetails 
            university={selectedUniversity} 
            onBack={backToList} 
            onAddToCompare={addToCompare}
            onAddToFavorites={addToFavorites}
            isInCompareList={compareList.some(uni => uni && selectedUniversity && uni.id === selectedUniversity.id)}
            isInFavorites={favoriteUniversities.some(uni => uni && selectedUniversity && uni.id === selectedUniversity.id)}
          />
        );
      case 'compare':
        return (
          <CompareView 
            universities={compareList} 
            onBack={backToList} 
            onRemove={removeFromCompare} 
          />
        );
      case 'favorites':
        return (
          <MyCareerPlan 
            favoriteUniversities={favoriteUniversities}
            onBack={backToList}
            onRemoveFromFavorites={removeFromFavorites}
            onReorderFavorites={reorderFavorites}
            onViewDetails={viewUniversityDetails}
            onShowPortfolio={togglePlayerPortfolio}
          />
        );
      case 'recommendation':
        return (
          <SimpleRecommendationWizard
            universities={universities}
            onViewDetails={viewUniversityDetails}
          />
        );
      case 'list':
      default:
        return (
          <>
            {/* 1. ポートフォリオバナー */}
            <PortfolioBanner onShowPortfolio={togglePlayerPortfolio} />
            
            {/* 2. 推薦ウィザードバナー */}
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-md overflow-hidden mb-6">
              <div className="relative p-5">
                {/* 背景装飾 */}
                <div className="absolute right-0 top-0 bottom-0 opacity-10">
                  <div className="h-full w-64 bg-white rounded-full blur-3xl"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  {/* アイコン部分 */}
                  <div className="bg-white rounded-full p-3 shadow-md mb-4 md:mb-0 md:mr-5">
                    <Zap size={32} className="text-orange-600" />
                  </div>
                  
                  {/* テキスト部分 */}
                  <div className="text-center md:text-left md:flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">あなたにぴったりの大学サッカー部を見つけよう！</h3>
                    <p className="text-yellow-100 mb-4">サッカーに対する志向と学びたいことから最適な大学を提案します</p>
                    
                    {/* 特徴ポイント */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-3">
                      <div className="flex items-center text-white text-sm">
                        <Trophy size={16} className="mr-1" />
                        <span>実績に基づく大学提案</span>
                      </div>
                      <div className="flex items-center text-white text-sm">
                        <BookOpen size={16} className="mr-1" />
                        <span>学びたいことから診断</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* ボタン - z-indexを高くして最前面に表示 */}
                  <div className="mt-4 md:mt-0 md:ml-5 relative z-10">
                    <button 
                      className="bg-white text-orange-600 px-5 py-3 rounded-lg font-bold shadow-md hover:bg-orange-50 transition-colors flex items-center cursor-pointer"
                      onClick={toggleRecommendation}
                      type="button"
                      style={{ position: 'relative', zIndex: 20 }}
                    >
                      診断してみる
                      <ChevronRight size={18} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ステップ式検索ウィザード - show状態の時のみ表示 */}
            {showWizard && (
              <StepSearchWizard
                onViewDetails={viewUniversityDetails}
                universities={universities}
                setSearchQuery={setSearchQuery}
                setSelectedRegions={setSelectedRegions}
                setSelectedLeagues={setSelectedLeagues}
                setSelectedQualifications={setSelectedQualifications}
                setSportsRecommend={setSportsRecommend}
                setSelectionAvailable={setSelectionAvailable}
                setDormAvailable={setDormAvailable}
                setJLeagueMinimum={setJLeagueMinimum}
                useUniversitySearchInstance={{
                  searchQuery,
                  selectedRegions,
                  selectedLeagues,
                  selectedQualifications,
                  sportsRecommend,
                  selectionAvailable,
                  dormAvailable,
                  generalAdmissionAvailable,
                  jLeagueMinimum,
                  yearlyJLeagueFilter,
                  memberSizeCategory,
                  newMemberSizeCategory,
                  maxGradeRequirement,
                  coachBackgroundFilter,
                  densoCupMinimum,
                  sortOption,
                  sortDirection
                }}
              />
            )}

            {/* 検索フォームの上に小さなボタンを追加して、ウィザードをトグルできるようにする */}
            <div className="flex justify-center mb-4">
              <button
                className={`flex items-center ${showWizard ? 'bg-gray-200 text-gray-700' : 'bg-green-600 text-white'} px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition-colors shadow-sm`}
                onClick={toggleWizard}
              >
                {showWizard ? (
                  <>
                    <X size={16} className="mr-1" />
                    ウィザードを閉じる
                  </>
                ) : (
                  <>
                    <Zap size={16} className="mr-1" />
                    かんたん検索ウィザード
                  </>
                )}
              </button>
            </div>

            {/* 3. 検索フォーム */}
            <MultiSelectSearchForm
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedRegions={selectedRegions}
              setSelectedRegions={setSelectedRegions}
              selectedLeagues={selectedLeagues}
              setSelectedLeagues={setSelectedLeagues}
              selectedQualifications={selectedQualifications}
              setSelectedQualifications={setSelectedQualifications}
              sportsRecommend={sportsRecommend}
              setSportsRecommend={setSportsRecommend}
              selectionAvailable={selectionAvailable}
              setSelectionAvailable={setSelectionAvailable}
              dormAvailable={dormAvailable}
              setDormAvailable={setDormAvailable}
              generalAdmissionAvailable={generalAdmissionAvailable}
              setGeneralAdmissionAvailable={setGeneralAdmissionAvailable}
              jLeagueMinimum={jLeagueMinimum}
              setJLeagueMinimum={setJLeagueMinimum}
              yearlyJLeagueFilter={yearlyJLeagueFilter}
              setYearlyJLeagueFilter={setYearlyJLeagueFilter}
              memberSizeCategory={memberSizeCategory}
              setMemberSizeCategory={setMemberSizeCategory}
              newMemberSizeCategory={newMemberSizeCategory}
              setNewMemberSizeCategory={setNewMemberSizeCategory}
              maxGradeRequirement={maxGradeRequirement}
              setMaxGradeRequirement={setMaxGradeRequirement}
              coachBackgroundFilter={coachBackgroundFilter}
              setCoachBackgroundFilter={setCoachBackgroundFilter}
              densoCupMinimum={densoCupMinimum}
              setDensoCupMinimum={setDensoCupMinimum}
              sortOption={sortOption}
              setSortOption={setSortOption}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
            />
            
            {/* 4. 大学リスト */}
            <UniversityList
              filteredUniversities={filteredUniversities}
              allUniversities={universities}
              sortOption={sortOption}
              setSortOption={setSortOption}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              onViewDetails={viewUniversityDetails}
              compareList={compareList}
              onAddToCompare={addToCompare}
              onRemoveFromCompare={removeFromCompare}
              favoriteUniversities={favoriteUniversities}
              onAddToFavorites={addToFavorites}
              onRemoveFromFavorites={removeFromFavorites}
              selectedRegion={selectedRegions}
              sportsRecommend={sportsRecommend}
              dormAvailable={dormAvailable}
              selectionAvailable={selectionAvailable}
              selectedLeague={selectedLeagues}
              selectedQualification={selectedQualifications}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <ResponsiveHeader 
        favoriteUniversities={favoriteUniversities}
        compareList={compareList}
        onShowPortfolio={togglePlayerPortfolio}
        onShowRecommendation={toggleRecommendation}
        onShowFavorites={showFavoritesView}
        onShowCompare={showCompareView}
        onBackToList={backToList}
      />

      {/* メインコンテンツ */}
      <main className="container mx-auto p-4">
        {renderCurrentView()}
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