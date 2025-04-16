// App.js
import React, { useState, useEffect } from 'react';
import { Trophy, BookOpen } from 'lucide-react';
import universities from './data/universities';
import ViewManager from './components/ViewManager';
import ResponsiveHeader from './components/ResponsiveHeader';
import useUniversitySearch from './hooks/useUniversitySearch';
import userProfile from './data/userProfile';

const App = () => {
  // カスタムフックを使用して検索ロジックを実装
  const searchState = useUniversitySearch(universities);
  
  // 主要な表示状態を一元管理
  const [currentView, setCurrentView] = useState('list');
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [favoriteUniversities, setFavoriteUniversities] = useState([]);
  const [showWizard, setShowWizard] = useState(false);
  const [playerProfileData, setPlayerProfileData] = useState(userProfile);

  // 統一されたビュー切り替え関数
  const changeView = (viewName) => {
    setCurrentView(viewName);
  };

  // 大学詳細表示ハンドラ
  const viewUniversityDetails = (university) => {
    setSelectedUniversity(university);
    changeView('details');
  };

  // ウィザード表示のトグル
  const toggleWizard = () => {
    setShowWizard(!showWizard);
  };

  // プロフィール保存ハンドラ
  const handleSaveProfile = (profileData) => {
    setPlayerProfileData(profileData);
    localStorage.setItem('playerProfile', JSON.stringify(profileData));
    changeView('portfolio');
    alert("ポートフォリオが保存されました！");
  };

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

    // プロフィールデータの読み込み
    const savedProfile = localStorage.getItem('playerProfile');
    if (savedProfile) {
      try {
        const profileData = JSON.parse(savedProfile);
        setPlayerProfileData(profileData);
      } catch (e) {
        console.error('プロフィールデータの読み込みに失敗しました');
      }
    }
  }, []);

  // お気に入りをローカルストレージに保存
  useEffect(() => {
    if (favoriteUniversities.length > 0) {
      const favoriteIds = favoriteUniversities.map(uni => uni.id);
      localStorage.setItem('favoriteUniversities', JSON.stringify(favoriteIds));
    }
  }, [favoriteUniversities]);

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

  // お気に入りの順序変更
  const reorderFavorites = (startIndex, endIndex) => {
    const result = Array.from(favoriteUniversities);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setFavoriteUniversities(result);
  };

  // イベントハンドラをまとめたオブジェクト
  const handlers = {
    changeView,
    viewUniversityDetails,
    toggleWizard,
    handleSaveProfile,
    addToCompare,
    removeFromCompare,
    addToFavorites,
    removeFromFavorites,
    reorderFavorites
  };

  // ViewManagerに渡すデータをまとめたオブジェクト
  const viewData = {
    universities,
    selectedUniversity,
    compareList,
    favoriteUniversities,
    playerProfileData,
    showWizard,
    searchState,
    filteredUniversities: searchState.filteredUniversities
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <ResponsiveHeader 
        favoriteUniversities={favoriteUniversities}
        compareList={compareList}
        onShowPortfolio={() => changeView('portfolio')}
        onShowRecommendation={() => changeView('recommendation')}
        onShowFavorites={() => changeView('favorites')}
        onShowCompare={() => changeView('compare')}
        onBackToList={() => changeView('list')}
      />

      {/* メインコンテンツ */}
      <main className="container mx-auto p-4">
        <ViewManager 
          currentView={currentView}
          data={viewData}
          handlers={handlers}
        />
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