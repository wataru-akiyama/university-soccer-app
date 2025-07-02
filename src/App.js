// src/App.js（ボトムナビ対応版）
import React from 'react';
import ViewManager from './components/ViewManager';
import ResponsiveHeader from './components/ResponsiveHeader';
import BottomNavigation from './components/BottomNavigation';
import { useAppState } from './hooks/useAppState';
import APITestPanel from './components/APITestPanel';

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

  // デバッグモード判定（新規追加）
  const isDebugMode = process.env.REACT_APP_DEBUG_MODE === 'true';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー（既存） */}
      <ResponsiveHeader 
        currentView={currentView}
        onChangeView={actions.changeView}
      />

      {/* 🔧 開発用APIテストパネル（新規追加・既存機能に影響なし） */}
      {isDebugMode && (
        <div className="container mx-auto p-4 pt-16">
          <APITestPanel />
        </div>
      )}

      {/* メインコンテンツ（既存・変更なし） */}
      <main className="container mx-auto p-4 pt-16 pb-20">
        <ViewManager 
          currentView={currentView}
          data={data}
          handlers={actions}
        />
      </main>
      
      {/* ボトムナビゲーション（既存・変更なし） */}
      <BottomNavigation 
        currentView={currentView}
        onChangeView={actions.changeView}
        favoriteUniversities={favoriteUniversities}
        compareList={compareList}
      />
      
      {/* フッター（既存・変更なし） */}
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