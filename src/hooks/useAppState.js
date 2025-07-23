// src/hooks/useAppState.js - プレミアムプラン対応版（最大5校比較対応）

import { useState, useEffect } from 'react';
import useUniversitySearch from './useUniversitySearch';
import useFirebaseData from './useFirebaseData';
import usePremiumPlan from './usePremiumPlan';
import { userProfile } from '../data';

/**
 * アプリケーション全体の状態管理フック（プレミアムプラン対応版・最大5校比較対応）
 */
export const useAppState = () => {
  // Firebaseからデータを取得
  const { 
    universities, 
    loading: universitiesLoading, 
    error: universitiesError,
    refetch: refetchUniversities 
  } = useFirebaseData();
  
  // プレミアムプランの状態管理
  const {
    isPremium,
    isLoading: planLoading,
    togglePlan,
    upgradeToPremium,
    downgradeToFree,
    canUsePremiumFeature,
    shouldShowContent,
    trackPremiumAttempt
  } = usePremiumPlan();
  
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
            // 比較ページはプレミアム限定
            if (canUsePremiumFeature('comparison')) {
              setCurrentView('compare');
            } else {
              trackPremiumAttempt('comparison', 'blocked_url_access');
              setCurrentView('list');
              updateURL('search');
            }
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
    if (!universitiesLoading && !planLoading) {
      handleUrlParams();
    }
    
    // ブラウザの戻る/進むボタン対応
    window.addEventListener('popstate', handleUrlParams);
    
    return () => {
      window.removeEventListener('popstate', handleUrlParams);
    };
  }, [universities, universitiesLoading, planLoading, canUsePremiumFeature, trackPremiumAttempt]);

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

  // ===== プレミアム制限付きアクション関数 =====
  
  /**
   * ビュー切り替え（プレミアム制限付き）
   */
  const changeView = (viewName) => {
    // 比較ページはプレミアム限定
    if (viewName === 'compare' && !canUsePremiumFeature('comparison')) {
      trackPremiumAttempt('comparison', 'blocked_navigation');
      return false;
    }

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
    
    return true;
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
   * 比較リストに追加（プレミアム制限付き・最大5校対応）
   */
  const addToCompare = (university) => {
    if (!canUsePremiumFeature('comparison')) {
      trackPremiumAttempt('comparison', 'blocked_add_to_compare');
      return false;
    }

    if (!compareList.some(uni => uni.id === university.id)) {
      if (compareList.length < 5) { // 3から5に変更
        setCompareList([...compareList, university]);
        return true;
      } else {
        alert("比較は最大5校までです。"); // メッセージも更新
        return false;
      }
    }
    return false;
  };

  /**
   * 比較リストから削除
   */
  const removeFromCompare = (universityId) => {
    setCompareList(compareList.filter(uni => uni.id !== universityId));
  };

  /**
   * 練習体験申し込み（プレミアム制限付き）
   */
  const applyForPractice = (university) => {
    if (!canUsePremiumFeature('practice_application')) {
      trackPremiumAttempt('practice_application', 'blocked_application');
      return false;
    }

    // 実際の申し込み処理
    console.log(`${university.university_name}の練習体験に申し込みます`);
    return true;
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
   * プレミアムプランへのアップグレード処理
   */
  const handleUpgradeToPremium = () => {
    // 実際のアプリでは決済処理など
    upgradeToPremium();
    trackPremiumAttempt('upgrade', 'completed');
  };

  // ===== 戻り値の構造化 =====
  
  // アクション関数をまとめたオブジェクト
  const actions = {
    // 既存のアクション
    changeView,
    viewUniversityDetails,
    addToCompare,
    removeFromCompare,
    addToFavorites,
    removeFromFavorites,
    reorderFavorites,
    refetchUniversities,
    updateURL,
    replaceURL,
    
    // プレミアム関連のアクション
    applyForPractice,
    togglePlan,
    upgradeToPremium: handleUpgradeToPremium,
    downgradeToFree,
    trackPremiumAttempt
  };

  // 状態をまとめたオブジェクト
  const state = {
    currentView,
    selectedUniversity,
    compareList,
    favoriteUniversities,
    playerProfileData,
    searchState,
    filteredUniversities: searchState.filteredUniversities,
    universitiesLoading,
    universitiesError,
    
    // プレミアム関連の状態
    isPremium,
    planLoading
  };

  // データをまとめたオブジェクト
  const data = {
    universities,
    selectedUniversity,
    compareList,
    favoriteUniversities,
    playerProfileData,
    searchState,
    filteredUniversities: searchState.filteredUniversities,
    universitiesLoading,
    universitiesError,
    
    // プレミアム関連のデータ
    isPremium,
    planLoading
  };

  // プレミアムユーティリティ
  const premiumUtils = {
    canUsePremiumFeature,
    shouldShowContent,
    trackPremiumAttempt
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
    universities,
    
    // プレミアム関連の状態
    isPremium,
    planLoading,
    
    // 計算済み状態
    filteredUniversities: searchState.filteredUniversities,
    
    // アクション関数
    actions,
    
    // 構造化された戻り値（ViewManagerとの互換性のため）
    state,
    data,
    
    // プレミアムユーティリティ
    premiumUtils
  };
};

export default useAppState;