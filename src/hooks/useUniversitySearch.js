// src/hooks/useUniversitySearch.js - 本番向けクリーン版

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
        
        // テキスト検索
        if (searchQuery && searchQuery.trim()) {
          const queryLower = searchQuery.toLowerCase().trim();
          const universityName = university.university_name || university['大学名'] || '';
          const league = university.soccer_club?.league || university['カテゴリ'] || '';
          
          const matchesText = 
            universityName.toLowerCase().includes(queryLower) ||
            league.toLowerCase().includes(queryLower);
          
          if (!matchesText) return false;
        }
        
        // 地域フィルター
        if (selectedRegions.length > 0) {
          const universityArea = university.location || university['エリア'] || '';
          const matchesRegion = selectedRegions.some(region => {
            if (universityArea === region) return true;
            return searchHelpers.isUniversityInRegion(university, region);
          });
          
          if (!matchesRegion) return false;
        }
        
        // リーグフィルター
        if (selectedLeagues.length > 0) {
          const universityLeague = (university.soccer_club?.league || university['カテゴリ'] || '').trim();
          const matchesLeague = selectedLeagues.some(league => 
            universityLeague === league.trim()
          );
          
          if (!matchesLeague) return false;
        }
        
        // 学力ランクフィルター
        if (selectedAcademicRanks.length > 0) {
          const universityRank = university.academic_rank || university['学力ランク'] || '';
          const matchesRank = selectedAcademicRanks.includes(universityRank);
          
          if (!matchesRank) return false;
        }
        
        // 志向性フィルター
        if (selectedPlayerAspirations.length > 0) {
          const genre1 = university.genre1 || university['ジャンル➀'] || '';
          const genre2 = university.genre2 || university['ジャンル②'] || '';
          
          const matchesAspiration = selectedPlayerAspirations.some(aspiration => 
            genre1 === aspiration || genre2 === aspiration
          );
          
          if (!matchesAspiration) return false;
        }
        
        // 国公立・私立フィルター
        let isPublic = false;
        const academicRank = university.academic_rank || university['学力ランク'] || '';
        
        if (academicRank === 'F：国公立') {
          isPublic = true;
        } else {
          isPublic = searchHelpers.isPublicUniversity(university);
        }
        
        if (publicUniversity && !isPublic) return false;
        if (privateUniversity && isPublic) return false;
        
        // その他のフィルター
        if (sportsRecommend) {
          const hasRecommend = university.entry_conditions?.sports_recommend || 
                              university['スポーツ推薦有無'] === '有';
          if (!hasRecommend) return false;
        }
        
        if (selectionAvailable) {
          const hasSelection = university.entry_conditions?.selection || 
                              university['セレクション有無'] === '有';
          if (!hasSelection) return false;
        }
        
        if (dormAvailable) {
          const hasDorm = university.soccer_club?.dorm_available || 
                         university['部員寮'] === 'あり';
          if (!hasDorm) return false;
        }
        
        if (generalAdmissionAvailable) {
          const allowsGeneral = university.entry_conditions?.general_admission || 
                               university['一般入部可否'] === '可';
          if (!allowsGeneral) return false;
        }
        
        return true;
      });
      
      // ソート処理
      if (sortOption) {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        
        result = [...result].sort((a, b) => {
          try {
            switch(sortOption) {
              case 'j_league': {
                const getJLeagueCount = (uni) => {
                  const count2022 = parseInt(uni['22J内定'] || uni.soccer_club?.j_league_nominees_2022 || 0);
                  const count2023 = parseInt(uni['23J内定'] || uni.soccer_club?.j_league_nominees_2023 || 0);
                  const count2024 = parseInt(uni['24J内定'] || uni.soccer_club?.j_league_nominees_2024 || 0);
                  
                  return count2022 + count2023 + count2024;
                };
                return multiplier * (getJLeagueCount(a) - getJLeagueCount(b));
              }
              
              case 'members': {
                const getMemberCount = (uni) => {
                  return parseInt(uni['部員数'] || uni.soccer_club?.total_members || 0);
                };
                return multiplier * (getMemberCount(a) - getMemberCount(b));
              }
              
              case 'name': {
                const nameA = a.university_name || a['大学名'] || '';
                const nameB = b.university_name || b['大学名'] || '';
                return multiplier * nameA.localeCompare(nameB);
              }
              
              case 'academic_rank': {
                const rankOrder = { 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6 };
                const getRankOrder = (uni) => {
                  const rank = uni.academic_rank || uni['学力ランク'] || '';
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