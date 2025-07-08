// src/hooks/useAppState.js - URLナビゲーション対応版

import { useState, useEffect } from 'react';
import useUniversitySearch from './useUniversitySearch';
import useFirebaseData from './useFirebaseData';
import { userProfile } from '../data';

/**
 * アプリケーション全体の状態管理フック（URLナビゲーション対応版）
 */
export const useAppState = () => {
  // Firebaseからデータを取得
  const { 
    universities, 
    loading: universitiesLoading, 
    error: universitiesError,
    refetch: refetchUniversities 
  } = useFirebaseData();
  
  // 検索関連の状態（Firebaseデータを使用）
  const searchState = useUniversitySearch(universities);
  
  // 主要な表示状態
  const [currentView, setCurrentView] = useState('list');
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [favoriteUniversities, setFavoriteUniversities] = useState([]);
  const [playerProfileData, setPlayerProfileData] = useState(userProfile);

  // ===== URLパラメータ監視・制御 =====
  useEffect(() => {
    const handleUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page');
      const universityId = urlParams.get('id');
      
      // 大学詳細ページ（既存機能）
      if (universityId && universities.length > 0) {
        const university = universities.find(uni => uni.id === parseInt(universityId));
        if (university) {
          setSelectedUniversity(university);
          setCurrentView('details');
          return;
        } else {
          // 指定されたIDの大学が見つからない場合はリストページに戻る
          setCurrentView('list');
          updateURL('search');
          return;
        }
      }
      
      // ページパラメータによる画面切り替え
      if (pageParam) {
        switch (pageParam) {
          case 'search':
            setCurrentView('list');
            break;
          case 'portfolio':
            setCurrentView('portfolio');
            break;
          case 'compare':
            setCurrentView('compare');
            break;
          default:
            // 無効なページパラメータの場合は検索ページにリダイレクト
            setCurrentView('list');
            updateURL('search');
            break;
        }
      } else if (!universityId) {
        // パラメータがない場合はデフォルトで検索ページ
        setCurrentView('list');
        updateURL('search');
      }
    };

    // 大学データが読み込まれてから実行
    if (!universitiesLoading) {
      handleUrlParams();
    }
    
    // ブラウザの戻る/進むボタン対応
    window.addEventListener('popstate', handleUrlParams);
    
    return () => {
      window.removeEventListener('popstate', handleUrlParams);
    };
  }, [universities, universitiesLoading]);

  // ローカルストレージからお気に入りを読み込む
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteUniversities');
    if (savedFavorites && universities.length > 0) {
      try {
        const favoriteIds = JSON.parse(savedFavorites);
        const favUniversities = favoriteIds.map(id => 
          universities.find(uni => uni.id === id)
        ).filter(Boolean);
        setFavoriteUniversities(favUniversities);
      } catch (e) {
        console.error('お気に入りデータの読み込みに失敗しました:', e);
      }
    }

    // プロフィールデータの読み込み
    const savedProfile = localStorage.getItem('playerProfile');
    if (savedProfile) {
      try {
        const profileData = JSON.parse(savedProfile);
        setPlayerProfileData(profileData);
      } catch (e) {
        console.error('プロフィールデータの読み込みに失敗しました:', e);
      }
    }
  }, [universities]);

  // お気に入りをローカルストレージに保存
  useEffect(() => {
    if (favoriteUniversities.length > 0) {
      const favoriteIds = favoriteUniversities.map(uni => uni.id);
      localStorage.setItem('favoriteUniversities', JSON.stringify(favoriteIds));
    }
  }, [favoriteUniversities]);

  // ===== URL更新関数 =====
  
  /**
   * URLを更新する（ブラウザ履歴に追加）
   * @param {string} page - ページ識別子 ('search', 'portfolio', 'compare')
   * @param {number} universityId - 大学ID（詳細ページの場合）
   */
  const updateURL = (page, universityId = null) => {
    const url = new URL(window.location);
    
    // パラメータをクリア
    url.searchParams.delete('page');
    url.searchParams.delete('id');
    
    if (universityId) {
      // 大学詳細ページの場合
      url.searchParams.set('id', universityId);
    } else if (page) {
      // 通常ページの場合
      url.searchParams.set('page', page);
    }
    
    // ブラウザ履歴に追加
    window.history.pushState({}, '', url);
  };

  /**
   * URL上書き（ブラウザ履歴に追加しない）
   * @param {string} page - ページ識別子
   * @param {number} universityId - 大学ID
   */
  const replaceURL = (page, universityId = null) => {
    const url = new URL(window.location);
    
    url.searchParams.delete('page');
    url.searchParams.delete('id');
    
    if (universityId) {
      url.searchParams.set('id', universityId);
    } else if (page) {
      url.searchParams.set('page', page);
    }
    
    // ブラウザ履歴を置き換え
    window.history.replaceState({}, '', url);
  };

  // ===== アクション関数 =====
  
  /**
   * ビュー切り替え（URL更新付き）
   */
  const changeView = (viewName) => {
    setCurrentView(viewName);
    
    // URLパラメータマッピング
    const pageMap = {
      'list': 'search',
      'portfolio': 'portfolio',
      'compare': 'compare',
      'details': null // 詳細ページは別途処理
    };
    
    const pageParam = pageMap[viewName];
    if (pageParam) {
      updateURL(pageParam);
    }
  };

  /**
   * 大学詳細表示（URL更新付き）
   */
  const viewUniversityDetails = (university) => {
    setSelectedUniversity(university);
    setCurrentView('details');
    updateURL(null, university.id);
  };

  /**
   * 大学詳細表示（ID指定版・URL更新付き）
   */
  const viewUniversityDetailsById = (universityId) => {
    const university = universities.find(uni => uni.id === parseInt(universityId));
    if (university) {
      viewUniversityDetails(university);
    }
  };

  /**
   * 比較リストに追加
   */
  const addToCompare = (university) => {
    if (!compareList.some(uni => uni.id === university.id)) {
      if (compareList.length < 3) {
        setCompareList([...compareList, university]);
      } else {
        alert("比較は最大3校までです。");
      }
    }
  };

  /**
   * 比較リストから削除
   */
  const removeFromCompare = (universityId) => {
    setCompareList(compareList.filter(uni => uni.id !== universityId));
  };

  /**
   * お気に入りに追加
   */
  const addToFavorites = (university) => {
    if (!favoriteUniversities.some(uni => uni.id === university.id)) {
      setFavoriteUniversities([...favoriteUniversities, university]);
    }
  };

  /**
   * お気に入りから削除
   */
  const removeFromFavorites = (universityId) => {
    setFavoriteUniversities(favoriteUniversities.filter(uni => uni.id !== universityId));
  };

  /**
   * お気に入りの順序変更
   */
  const reorderFavorites = (startIndex, endIndex) => {
    const result = Array.from(favoriteUniversities);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setFavoriteUniversities(result);
  };

  /**
   * 検索ページに戻る（URL更新付き）
   */
  const goToSearch = () => {
    changeView('list');
  };

  /**
   * 進路ページに移動（URL更新付き）
   */
  const goToPortfolio = () => {
    changeView('portfolio');
  };

  /**
   * 比較ページに移動（URL更新付き）
   */
  const goToCompare = () => {
    changeView('compare');
  };

  // ===== 戻り値の構造化 =====
  
  // アクション関数をまとめたオブジェクト
  const actions = {
    changeView,
    viewUniversityDetails,
    viewUniversityDetailsById,
    addToCompare,
    removeFromCompare,
    addToFavorites,
    removeFromFavorites,
    reorderFavorites,
    refetchUniversities,
    // URL操作関数を追加
    updateURL,
    replaceURL,
    goToSearch,
    goToPortfolio,
    goToCompare
  };

  // 状態をまとめたオブジェクト（ViewManagerとの互換性を保つ）
  const state = {
    currentView,
    selectedUniversity,
    compareList,
    favoriteUniversities,
    playerProfileData,
    searchState,
    filteredUniversities: searchState.filteredUniversities,
    universitiesLoading,
    universitiesError
  };

  // データをまとめたオブジェクト（ViewManagerとの互換性を保つ）
  const data = {
    universities,
    selectedUniversity,
    compareList,
    favoriteUniversities,
    playerProfileData,
    searchState,
    filteredUniversities: searchState.filteredUniversities,
    universitiesLoading,
    universitiesError
  };

  return {
    // 基本状態
    currentView,
    selectedUniversity,
    compareList,
    favoriteUniversities,
    playerProfileData,
    searchState,
    
    // Firebase関連の状態
    universitiesLoading,
    universitiesError,
    
    // 計算済み状態
    filteredUniversities: searchState.filteredUniversities,
    
    // アクション関数
    actions,
    
    // 構造化された戻り値（ViewManagerとの互換性のため）
    state,
    data,
    
    // 基本データ
    universities
  };
};

export default useAppState;