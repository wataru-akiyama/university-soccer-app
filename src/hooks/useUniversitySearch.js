// src/hooks/useUniversitySearch.js - 職業フィルター対応版

import { useState, useMemo } from 'react';
import { searchHelpers } from '../data';

const useUniversitySearch = (universities) => {
  // 検索状態
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedAcademicRanks, setSelectedAcademicRanks] = useState([]);
  const [selectedPlayerAspirations, setSelectedPlayerAspirations] = useState([]);
  const [selectedCareers, setSelectedCareers] = useState([]); // 新規追加
  
  // チェックボックスフィルター - 削除: selectionAvailable, dormAvailable
  const [publicUniversity, setPublicUniversity] = useState(false);
  const [privateUniversity, setPrivateUniversity] = useState(false);
  const [sportsRecommend, setSportsRecommend] = useState(false);
  const [generalAdmissionAvailable, setGeneralAdmissionAvailable] = useState(false);
  
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
          const universityArea = university.area || '';
          const universityLocation = university.location || '';
          
          const matchesRegion = selectedRegions.some(region => {
            // 直接一致チェック
            if (universityArea === region || universityLocation === region) return true;
            
            // ヘルパー関数を使った地域判定
            return searchHelpers.isUniversityInRegion(university, region);
          });
          
          if (!matchesRegion) return false;
        }
        
        // 学力ランクフィルター（Firebase新形式対応）
        if (selectedAcademicRanks.length > 0) {
          const universityRank = university.academic_rank || '';
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
        
        // 職業フィルター（新規追加）
        if (selectedCareers.length > 0) {
          const matchesCareer = selectedCareers.some(career => 
            searchHelpers.hasCareerPath(university, career)
          );
          
          if (!matchesCareer) return false;
        }
        
        // 国公立・私立フィルター（Firebase新形式対応）
        let isPublic = false;
        const academicRank = university.academic_rank || '';
        
        if (academicRank === 'F：国公立') {
          isPublic = true;
        } else {
          isPublic = searchHelpers.isPublicUniversity(university);
        }
        
        if (publicUniversity && !isPublic) return false;
        if (privateUniversity && isPublic) return false;
        
        // スポーツ推薦フィルター（Firebase新形式対応）
        if (sportsRecommend) {
          const hasRecommend = university.entry_conditions?.sports_recommend;
          if (!hasRecommend) return false;
        }
        
        // 一般入部フィルター（Firebase新形式対応）
        if (generalAdmissionAvailable) {
          const allowsGeneral = university.entry_conditions?.general_admission;
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
              
              case 'university_cost': {
                // Firebase新形式の大学費用（年額合計）
                const getUniversityCost = (uni) => {
                  // total_annual_costがある場合はそれを使用
                  if (uni.costs?.total_annual_cost) {
                    return parseInt(uni.costs.total_annual_cost);
                  }
                  
                  // ない場合は主要費用を合計
                  const tuition = parseInt(uni.costs?.university_costs?.annual_tuition || 0);
                  const entrance = parseInt(uni.costs?.university_costs?.entrance_fee || 0);
                  const facility = parseInt(uni.costs?.university_costs?.facility_fee || 0);
                  
                  return tuition + facility; // 入学金は年額ではないので除外
                };
                return multiplier * (getUniversityCost(a) - getUniversityCost(b));
              }
              
              case 'soccer_club_cost': {
                // Firebase新形式のサッカー部費用（年額合計）
                const getSoccerClubCost = (uni) => {
                  const monthlyFee = parseInt(uni.costs?.soccer_club_costs?.monthly_club_fee || 0);
                  const equipment = parseInt(uni.costs?.soccer_club_costs?.equipment_cost || 0);
                  const camp = parseInt(uni.costs?.soccer_club_costs?.camp_cost || 0);
                  const travel = parseInt(uni.costs?.soccer_club_costs?.travel_cost || 0);
                  
                  return (monthlyFee * 12) + equipment + camp + travel;
                };
                return multiplier * (getSoccerClubCost(a) - getSoccerClubCost(b));
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
    selectedAcademicRanks,
    selectedPlayerAspirations,
    selectedCareers, // 新規追加
    publicUniversity,
    privateUniversity,
    sportsRecommend,
    generalAdmissionAvailable,
    sortOption,
    sortDirection
    // 削除: selectedLeagues, selectionAvailable, dormAvailable
  ]);
  
  return {
    // 基本検索
    searchQuery,
    setSearchQuery,
    selectedRegions,
    setSelectedRegions,
    selectedAcademicRanks,
    setSelectedAcademicRanks,
    selectedPlayerAspirations,
    setSelectedPlayerAspirations,
    selectedCareers, // 新規追加
    setSelectedCareers, // 新規追加
    
    // チェックボックスフィルター
    publicUniversity,
    setPublicUniversity,
    privateUniversity,
    setPrivateUniversity,
    sportsRecommend,
    setSportsRecommend,
    generalAdmissionAvailable,
    setGeneralAdmissionAvailable,
    // 削除: selectionAvailable, setSelectionAvailable, dormAvailable, setDormAvailable
    
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