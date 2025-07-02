// src/hooks/useAppState.js - Firebase対応版に修正

import { useState, useEffect } from 'react';
import useUniversitySearch from './useUniversitySearch';
import useFirebaseData from './useFirebaseData'; // 新しく追加
import { userProfile } from '../data'; // userProfileのみローカルから取得

/**
 * アプリケーション全体の状態管理フック（Firebase対応版）
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

  // ===== URLパラメータ監視 =====
  useEffect(() => {
    const handleUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const universityId = urlParams.get('id');
      
      if (universityId && universities.length > 0) {
        // URLパラメータで大学IDが指定された場合
        const university = universities.find(uni => uni.id === parseInt(universityId));
        if (university) {
          setSelectedUniversity(university);
          setCurrentView('details');
        } else {
          // 指定されたIDの大学が見つからない場合はリストページに戻る
          setCurrentView('list');
        }
      }
    };

    // 大学データが読み込まれてから実行
    if (!universitiesLoading && universities.length > 0) {
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

  // ===== アクション関数 =====
  
  /**
   * ビュー切り替え
   */
  const changeView = (viewName) => {
    setCurrentView(viewName);
  };

  /**
   * 大学詳細表示
   */
  const viewUniversityDetails = (university) => {
    setSelectedUniversity(university);
    changeView('details');
  };

  /**
   * 大学詳細表示（ID指定版）
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
    refetchUniversities // Firebase再取得機能を追加
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
    // Firebase関連の状態を追加
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
    // Firebase関連の状態を追加
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