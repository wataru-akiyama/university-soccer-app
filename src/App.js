// src/App.js（ボトムナビ対応版）
import React from 'react';
import ViewManager from './components/ViewManager';
import ResponsiveHeader from './components/ResponsiveHeader';
import BottomNavigation from './components/BottomNavigation';
import { useAppState } from './hooks/useAppState';

const App = () => {
  // 全ての状態とロジックをuseAppStateフックから取得
  const appState = useAppState();
  const {
    // 基本状態
    currentView,
    compareList,
    favoriteUniversities,
    
    // アクション関数
    actions,
    
    // ViewManager用の構造化データ
    state,
    data
  } = appState;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー（シンプル版） */}
      <ResponsiveHeader 
        currentView={currentView}
        onChangeView={actions.changeView}
      />

      {/* メインコンテンツ（ボトムナビ分の余白を追加） */}
      <main className="container mx-auto p-4 pb-20">
        <ViewManager 
          currentView={currentView}
          data={data}
          handlers={actions}
        />
      </main>
      
      {/* ボトムナビゲーション */}
      <BottomNavigation 
        currentView={currentView}
        onChangeView={actions.changeView}
        favoriteUniversities={favoriteUniversities}
        compareList={compareList}
      />
      
      {/* フッター */}
      <footer className="bg-gray-800 text-white p-6 mt-8 mb-16">
        <div className="container mx-auto text-center">
          <p>© 2025 大学サッカー部お品書き</p>
          <p className="text-sm mt-2">このサイトは大学進学を検討する高校生やサッカー部関係者向けの情報提供を目的としています。</p>
        </div>
      </footer>
    </div>
  );
};

export default App;