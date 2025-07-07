// src/hooks/useUniversitySearch.js - Firebase新形式対応版

import { useState, useMemo } from 'react';
import { searchHelpers } from '../data';

const useUniversitySearch = (universities) => {
  // 検索状態
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedAcademicRanks, setSelectedAcademicRanks] = useState([]);
  const [selectedPlayerAspirations, setSelectedPlayerAspirations] = useState([]);
  
  // チェックボックスフィルター
  const [sportsRecommend, setSportsRecommend] = useState(false);
  const [selectionAvailable, setSelectionAvailable] = useState(false);
  const [dormAvailable, setDormAvailable] = useState(false);
  const [generalAdmissionAvailable, setGeneralAdmissionAvailable] = useState(false);
  const [publicUniversity, setPublicUniversity] = useState(false);
  const [privateUniversity, setPrivateUniversity] = useState(false);
  
  // ソート設定
  const [sortOption, setSortOption] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');

  const filteredUniversities = useMemo(() => {
    if (!universities || universities.length === 0) return [];
    
    try {
      let result = universities.filter(university => {
        if (!university) return false;
        
        // テキスト検索（Firebase新形式対応）
        if (searchQuery && searchQuery.trim()) {
          const queryLower = searchQuery.toLowerCase().trim();
          const universityName = university.university_name || '';
          const league = university.soccer_club?.league || '';
          
          const matchesText = 
            universityName.toLowerCase().includes(queryLower) ||
            league.toLowerCase().includes(queryLower);
          
          if (!matchesText) return false;
        }
        
        // 地域フィルター（Firebase新形式対応）
        if (selectedRegions.length > 0) {
          const universityArea = university.area || ''; // Firebase形式
          const universityLocation = university.location || ''; // Firebase形式
          
          const matchesRegion = selectedRegions.some(region => {
            // 直接一致チェック
            if (universityArea === region || universityLocation === region) return true;
            
            // ヘルパー関数を使った地域判定
            return searchHelpers.isUniversityInRegion(university, region);
          });
          
          if (!matchesRegion) return false;
        }
        
        // リーグフィルター（Firebase新形式対応）
        if (selectedLeagues.length > 0) {
          const universityLeague = (university.soccer_club?.league || '').trim(); // Firebase形式のみ
          const matchesLeague = selectedLeagues.some(league => 
            universityLeague === league.trim()
          );
          
          if (!matchesLeague) return false;
        }
        
        // 学力ランクフィルター（Firebase新形式対応）
        if (selectedAcademicRanks.length > 0) {
          const universityRank = university.academic_rank || ''; // Firebase形式のみ
          const matchesRank = selectedAcademicRanks.includes(universityRank);
          
          if (!matchesRank) return false;
        }
        
        // 志向性フィルター（Firebase新形式対応）
        if (selectedPlayerAspirations.length > 0) {
          // Firebase新形式: genres配列をチェック
          const genres = university.genres || [];
          
          // 旧形式フォールバック（互換性のため）
          const genre1 = university.genre1 || '';
          const genre2 = university.genre2 || '';
          const legacyGenres = [genre1, genre2].filter(g => g);
          
          // 新形式と旧形式を統合
          const allGenres = [...genres, ...legacyGenres];
          
          const matchesAspiration = selectedPlayerAspirations.some(aspiration => 
            allGenres.includes(aspiration)
          );
          
          if (!matchesAspiration) return false;
        }
        
        // 国公立・私立フィルター（Firebase新形式対応）
        let isPublic = false;
        const academicRank = university.academic_rank || ''; // Firebase形式のみ
        
        if (academicRank === 'F：国公立') {
          isPublic = true;
        } else {
          isPublic = searchHelpers.isPublicUniversity(university);
        }
        
        if (publicUniversity && !isPublic) return false;
        if (privateUniversity && isPublic) return false;
        
        // スポーツ推薦フィルター（Firebase新形式対応）
        if (sportsRecommend) {
          const hasRecommend = university.entry_conditions?.sports_recommend; // Firebase形式のみ
          if (!hasRecommend) return false;
        }
        
        // セレクションフィルター（Firebase新形式対応）
        if (selectionAvailable) {
          const hasSelection = university.entry_conditions?.selection; // Firebase形式のみ
          if (!hasSelection) return false;
        }
        
        // 寮フィルター（Firebase新形式対応）
        if (dormAvailable) {
          const hasDorm = university.soccer_club?.dorm_available; // Firebase形式のみ
          if (!hasDorm) return false;
        }
        
        // 一般入部フィルター（Firebase新形式対応）
        if (generalAdmissionAvailable) {
          const allowsGeneral = university.entry_conditions?.general_admission; // Firebase形式のみ
          if (!allowsGeneral) return false;
        }
        
        return true;
      });
      
      // ソート処理（Firebase新形式対応）
      if (sortOption) {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        
        result = [...result].sort((a, b) => {
          try {
            switch(sortOption) {
              case 'j_league': {
                // Firebase新形式のJ内定者数（過去3年合計）
                const getJLeagueCount = (uni) => {
                  // 新形式: j_league_nominees_2022_24（合計値）
                  if (uni.soccer_club?.j_league_nominees_2022_24) {
                    return parseInt(uni.soccer_club.j_league_nominees_2022_24);
                  }
                  
                  // フォールバック: 個別年度の合計
                  const count2022 = parseInt(uni.soccer_club?.j_league_nominees_2022 || 0);
                  const count2023 = parseInt(uni.soccer_club?.j_league_nominees_2023 || 0);
                  const count2024 = parseInt(uni.soccer_club?.j_league_nominees_2024 || 0);
                  
                  return count2022 + count2023 + count2024;
                };
                return multiplier * (getJLeagueCount(a) - getJLeagueCount(b));
              }
              
              case 'members': {
                // Firebase新形式の部員数
                const getMemberCount = (uni) => {
                  return parseInt(uni.soccer_club?.total_members || 0);
                };
                return multiplier * (getMemberCount(a) - getMemberCount(b));
              }
              
              case 'name': {
                // Firebase新形式の大学名
                const nameA = a.university_name || '';
                const nameB = b.university_name || '';
                return multiplier * nameA.localeCompare(nameB);
              }
              
              case 'academic_rank': {
                // Firebase新形式の学力ランク
                const rankOrder = { 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6 };
                const getRankOrder = (uni) => {
                  const rank = uni.academic_rank || '';
                  const rankLetter = rank.split('：')[0];
                  return rankOrder[rankLetter] || 999;
                };
                return multiplier * (getRankOrder(a) - getRankOrder(b));
              }
              
              default:
                return 0;
            }
          } catch (error) {
            console.error('ソート中にエラーが発生しました:', error);
            return 0;
          }
        });
      }
      
      return result;
      
    } catch (error) {
      console.error('フィルタリング処理でエラーが発生しました:', error);
      return [];
    }
  }, [
    universities,
    searchQuery,
    selectedRegions,
    selectedLeagues,
    selectedAcademicRanks,
    selectedPlayerAspirations,
    sportsRecommend,
    selectionAvailable,
    dormAvailable,
    generalAdmissionAvailable,
    publicUniversity,
    privateUniversity,
    sortOption,
    sortDirection
  ]);
  
  return {
    // 基本検索
    searchQuery,
    setSearchQuery,
    selectedRegions,
    setSelectedRegions,
    selectedLeagues,
    setSelectedLeagues,
    selectedAcademicRanks,
    setSelectedAcademicRanks,
    selectedPlayerAspirations,
    setSelectedPlayerAspirations,
    
    // チェックボックスフィルター
    sportsRecommend,
    setSportsRecommend,
    selectionAvailable,
    setSelectionAvailable,
    dormAvailable,
    setDormAvailable,
    generalAdmissionAvailable,
    setGeneralAdmissionAvailable,
    publicUniversity,
    setPublicUniversity,
    privateUniversity,
    setPrivateUniversity,
    
    // ソート
    sortOption,
    setSortOption,
    sortDirection,
    setSortDirection,
    
    // フィルタリング結果
    filteredUniversities
  };
};

export default useUniversitySearch;