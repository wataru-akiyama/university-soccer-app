// src/hooks/useUniversitySearch.js
import { useState, useEffect, useMemo } from 'react';
import { filterBySize, filterByJLeagueNominees, filterByYearJLeagueNominees, filterByGradeRequirement } from '../utils/csvMapping';

/**
 * 大学検索機能を提供するカスタムフック
 * 
 * @param {Array} universities 大学データの配列
 * @returns {Object} 検索状態と結果
 */
const useUniversitySearch = (universities) => {
  // 基本検索条件
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedQualification, setSelectedQualification] = useState('');
  const [sportsRecommend, setSportsRecommend] = useState(false);
  const [selectionAvailable, setSelectionAvailable] = useState(false);
  const [dormAvailable, setDormAvailable] = useState(false);
  const [generalAdmissionAvailable, setGeneralAdmissionAvailable] = useState(false);
  
  // 詳細検索条件
  const [jLeagueMinimum, setJLeagueMinimum] = useState(0);
  const [yearlyJLeagueFilter, setYearlyJLeagueFilter] = useState({
    year2022: 0,
    year2023: 0,
    year2024: 0
  });
  const [memberSizeCategory, setMemberSizeCategory] = useState('');
  const [newMemberSizeCategory, setNewMemberSizeCategory] = useState('');
  const [maxGradeRequirement, setMaxGradeRequirement] = useState(0);
  const [coachBackgroundFilter, setCoachBackgroundFilter] = useState('');
  const [densoCupMinimum, setDensoCupMinimum] = useState(0);
  
  // ソートオプション
  const [sortOption, setSortOption] = useState('');
  const [sortDirection, setSortDirection] = useState('desc'); // 'desc' = 降順, 'asc' = 昇順
  
  // フィルタリング処理
  const filteredUniversities = useMemo(() => {
    if (!universities || universities.length === 0) return [];
    
    return universities.filter(university => {
      // テキスト検索
      if (searchQuery && !university.university_name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // 地域フィルター
      if (selectedRegion && !university.main_faculties.some(faculty => faculty.includes(selectedRegion))) {
        return false;
      }
      
      // リーグフィルター
      if (selectedLeague && university.soccer_club.league !== selectedLeague) {
        return false;
      }
      
      // 取得可能資格フィルター
      if (selectedQualification && !university.soccer_club.qualifications.includes(selectedQualification)) {
        return false;
      }
      
      // スポーツ推薦フィルター
      if (sportsRecommend && !university.entry_conditions.sports_recommend) {
        return false;
      }
      
      // セレクションフィルター
      if (selectionAvailable && !university.entry_conditions.selection) {
        return false;
      }
      
      // 寮フィルター
      if (dormAvailable && !university.soccer_club.dorm_available) {
        return false;
      }
      
      // 一般入部フィルター
      if (generalAdmissionAvailable && !university.entry_conditions.general_admission) {
        return false;
      }
      
      // 詳細検索条件のフィルター
      
      // Jリーグ内定者数
      if (jLeagueMinimum > 0) {
        const totalNominees = 
          (university.soccer_club.j_league_nominees_2022 || 0) + 
          (university.soccer_club.j_league_nominees_2023 || 0) + 
          (university.soccer_club.j_league_nominees_2024 || 0);
        
        if (totalNominees < jLeagueMinimum) {
          return false;
        }
      }
      
      // 年度別Jリーグ内定者数
      if (yearlyJLeagueFilter.year2022 > 0 && 
          (university.soccer_club.j_league_nominees_2022 || 0) < yearlyJLeagueFilter.year2022) {
        return false;
      }
      
      if (yearlyJLeagueFilter.year2023 > 0 && 
          (university.soccer_club.j_league_nominees_2023 || 0) < yearlyJLeagueFilter.year2023) {
        return false;
      }
      
      if (yearlyJLeagueFilter.year2024 > 0 && 
          (university.soccer_club.j_league_nominees_2024 || 0) < yearlyJLeagueFilter.year2024) {
        return false;
      }
      
      // 部員数カテゴリ
      if (memberSizeCategory) {
        const memberCount = university.soccer_club.total_members;
        
        switch(memberSizeCategory) {
          case 'small': // 小規模（〜49名）
            if (memberCount > 49) return false;
            break;
          case 'medium': // 中規模（50〜79名）
            if (memberCount < 50 || memberCount > 79) return false;
            break;
          case 'large': // 大規模（80名以上）
            if (memberCount < 80) return false;
            break;
          default:
            break;
        }
      }
      
      // 評定条件
      if (maxGradeRequirement > 0) {
        // 評定基準がある場合のみ比較（ない場合はフィルタしない）
        if (university.evaluationGrade && university.evaluationGrade > maxGradeRequirement) {
          return false;
        }
      }
      
      // デンソーカップ出場者数
      if (densoCupMinimum > 0 && 
          (university.soccer_club.denso_cup_2024_25 || 0) < densoCupMinimum) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // ソート処理
      if (!sortOption) return 0;
      
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      switch(sortOption) {
        case 'j_league':
          // Jリーグ内定者数順（総数）
          const aNominees = 
            (a.soccer_club.j_league_nominees_2022 || 0) + 
            (a.soccer_club.j_league_nominees_2023 || 0) + 
            (a.soccer_club.j_league_nominees_2024 || 0);
          const bNominees = 
            (b.soccer_club.j_league_nominees_2022 || 0) + 
            (b.soccer_club.j_league_nominees_2023 || 0) + 
            (b.soccer_club.j_league_nominees_2024 || 0);
          return direction * (aNominees - bNominees);
          
        case 'members':
          // 部員数順
          return direction * (a.soccer_club.total_members - b.soccer_club.total_members);
          
        case 'grade_requirement':
          // 評定基準順（評定がない場合は最後）
          if (!a.evaluationGrade && !b.evaluationGrade) return 0;
          if (!a.evaluationGrade) return direction;
          if (!b.evaluationGrade) return -direction;
          return direction * (a.evaluationGrade - b.evaluationGrade);
          
        case 'denso_cup':
          // デンソーカップ出場者数順
          return direction * ((a.soccer_club.denso_cup_2024_25 || 0) - (b.soccer_club.denso_cup_2024_25 || 0));
          
        default:
          return 0;
      }
    });
  }, [
    universities,
    searchQuery,
    selectedRegion,
    selectedLeague,
    selectedQualification,
    sportsRecommend,
    selectionAvailable,
    dormAvailable,
    generalAdmissionAvailable,
    jLeagueMinimum,
    yearlyJLeagueFilter,
    memberSizeCategory,
    maxGradeRequirement,
    densoCupMinimum,
    sortOption,
    sortDirection
  ]);
  
  // 検索関連の状態と結果を返す
  return {
    // 基本検索条件
    searchQuery,
    setSearchQuery,
    selectedRegion,
    setSelectedRegion,
    selectedLeague,
    setSelectedLeague,
    selectedQualification,
    setSelectedQualification,
    sportsRecommend,
    setSportsRecommend,
    selectionAvailable,
    setSelectionAvailable,
    dormAvailable,
    setDormAvailable,
    generalAdmissionAvailable,
    setGeneralAdmissionAvailable,
    
    // 詳細検索条件
    jLeagueMinimum,
    setJLeagueMinimum,
    yearlyJLeagueFilter,
    setYearlyJLeagueFilter,
    memberSizeCategory,
    setMemberSizeCategory,
    newMemberSizeCategory,
    setNewMemberSizeCategory,
    maxGradeRequirement,
    setMaxGradeRequirement,
    coachBackgroundFilter,
    setCoachBackgroundFilter,
    densoCupMinimum,
    setDensoCupMinimum,
    
    // ソートオプション
    sortOption,
    setSortOption,
    sortDirection,
    setSortDirection,
    
    // 検索結果
    filteredUniversities
  };
};

export default useUniversitySearch;