// src/App.js（デバッグコード削除版）
import React from 'react';
import ViewManager from './components/ViewManager';
import ResponsiveHeader from './components/ResponsiveHeader';
import BottomNavigation from './components/BottomNavigation';
import DataSourceIndicator from './components/DataSourceIndicator';
import { useAppState } from './hooks/useAppState';

const App = () => {
  // 全ての状態とロジックをuseAppStateフックから取得
  const appState = useAppState();
  const {
    // 基本状態
    currentView,
    compareList,
    favoriteUniversities,
    
    // Firebase関連の状態
    universitiesLoading,
    universitiesError,
    universities,
    
    // アクション関数
    actions,
    
    // ViewManager用の構造化データ
    state,
    data
  } = appState;

  // Firebase エラー時の表示
  if (universitiesError && universities.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-4">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">データ取得エラー</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Firebase からデータを取得できませんでした。
            </p>
            <div className="bg-gray-100 p-3 rounded-lg mb-4 text-xs text-left">
              <p className="font-semibold mb-1">エラー詳細:</p>
              <p className="text-red-600">{universitiesError}</p>
            </div>
            <div className="space-y-2">
              <button 
                onClick={() => window.location.reload()}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                再読み込み
              </button>
              <button 
                onClick={actions.refetchUniversities}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                データ再取得
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Firebase データローディング中の表示
  if (universitiesLoading && universities.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-4">
          <div className="text-center">
            <div className="text-green-600 mb-4">
              <svg className="w-16 h-16 mx-auto animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">データ読み込み中</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Firebase から大学データを取得しています...
            </p>
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-green-600 h-full rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <ResponsiveHeader 
        currentView={currentView}
        onChangeView={actions.changeView}
      />

      {/* データソース表示（エラー時のみ） */}
      {universitiesError && (
        <DataSourceIndicator 
          universities={universities}
          loading={universitiesLoading}
          error={universitiesError}
          onRefresh={actions.refetchUniversities}
          showDetails={false}
        />
      )}

      {/* メインコンテンツ */}
      <main className="container mx-auto p-4 pt-16 pb-20">
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