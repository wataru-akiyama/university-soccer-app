// src/hooks/useUniversitySearch.js (簡潔版)
import { useState, useMemo } from 'react';

/**
 * 大学検索機能を提供するカスタムフック - 簡潔版
 * 
 * @param {Array} universities 大学データの配列
 * @returns {Object} 検索状態と結果
 */
const useUniversitySearch = (universities) => {
  // 基本検索条件
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedQualifications, setSelectedQualifications] = useState([]);
  const [sportsRecommend, setSportsRecommend] = useState(false);
  const [selectionAvailable, setSelectionAvailable] = useState(false);
  const [dormAvailable, setDormAvailable] = useState(false);
  const [generalAdmissionAvailable, setGeneralAdmissionAvailable] = useState(false);
  
  // 国公立・私立フィルター
  const [publicUniversity, setPublicUniversity] = useState(false);
  const [privateUniversity, setPrivateUniversity] = useState(false);
  
  // ソートオプション
  const [sortOption, setSortOption] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');

  /**
   * 大学が国公立大学かどうかを判定
   */
  const isPublicUniversity = (university) => {
    if (!university || !university.university_name) return false;
    
    const name = university.university_name;
    return (
      name.includes('国立') || 
      name.includes('県立') || 
      name.includes('市立') || 
      name === '筑波大学' || 
      name === '北海道大学' || 
      name === '名古屋大学'
    );
  };

  /**
   * 地域が含まれるかチェック
   */
  const checkRegionMatch = (university, region) => {
    if (!university || !region) return false;
    
    // リーグ名から判断
    if (university.soccer_club?.league && university.soccer_club.league.includes(region)) {
      return true;
    }
    
    // 首都圏の大学は多くが「関東」に含まれると想定
    if (region === '関東') {
      const name = university.university_name;
      return name.includes('東京') || name.includes('神奈川') || 
             name.includes('千葉') || name.includes('埼玉') ||
             name.includes('早稲田') || name.includes('慶應') ||
             name.includes('明治') || name.includes('法政') ||
             name.includes('中央') || name.includes('青山') ||
             name.includes('専修') || name.includes('東海');
    }
    
    // 関西の判定
    if (region === '関西') {
      const name = university.university_name;
      return name.includes('大阪') || name.includes('京都') || 
             name.includes('兵庫') || name.includes('関西') ||
             name.includes('同志社') || name.includes('立命館') ||
             name.includes('関西学院');
    }
    
    // 中部の判定
    if (region === '中部') {
      const name = university.university_name;
      return name.includes('愛知') || name.includes('名古屋') ||
             name.includes('静岡') || name.includes('東海');
    }
    
    // 九州の判定
    if (region === '九州・沖縄') {
      const name = university.university_name;
      return name.includes('福岡') || name.includes('九州') ||
             name.includes('熊本') || name.includes('沖縄');
    }
    
    // 北海道・東北の判定
    if (region === '北海道・東北') {
      const name = university.university_name;
      return name.includes('北海道') || name.includes('東北') ||
             name.includes('仙台') || name.includes('秋田');
    }
    
    return false;
  };

  // フィルタリングとソートロジック
  const filteredUniversities = useMemo(() => {
    if (!universities || universities.length === 0) return [];
    
    try {
      let result = universities.filter(university => {
        if (!university || !university.soccer_club || !university.entry_conditions) {
          return false;
        }
        
        // テキスト検索
        if (searchQuery && searchQuery.trim()) {
          const queryLower = searchQuery.toLowerCase().trim();
          const matchesText = 
            university.university_name?.toLowerCase().includes(queryLower) ||
            university.main_faculties?.some(faculty => 
              faculty.toLowerCase().includes(queryLower)
            ) ||
            university.soccer_club?.league?.toLowerCase().includes(queryLower);
          
          if (!matchesText) return false;
        }
        
        // 地域フィルター
        if (selectedRegions.length > 0) {
          const matchesRegion = selectedRegions.some(region => 
            checkRegionMatch(university, region)
          );
          if (!matchesRegion) return false;
        }
        
        // リーグフィルター
        if (selectedLeagues.length > 0) {
          const matchesLeague = selectedLeagues.some(league => 
            university.soccer_club.league?.includes(league)
          );
          if (!matchesLeague) return false;
        }
        
        // 資格フィルター
        if (selectedQualifications.length > 0) {
          const matchesQualification = university.soccer_club.qualifications?.some(q => 
            selectedQualifications.some(selected => q.includes(selected))
          );
          if (!matchesQualification) return false;
        }
        
        // チェックボックス条件
        if (sportsRecommend && !university.entry_conditions.sports_recommend) return false;
        if (selectionAvailable && !university.entry_conditions.selection) return false;
        if (dormAvailable && !university.soccer_club.dorm_available) return false;
        if (generalAdmissionAvailable && !university.entry_conditions.general_admission) return false;
        
        // 国公立・私立フィルター
        const isPublic = isPublicUniversity(university);
        if (publicUniversity && !isPublic) return false;
        if (privateUniversity && isPublic) return false;
        
        return true;
      });
      
      // ソート適用
      if (sortOption) {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        
        result = [...result].sort((a, b) => {
          try {
            switch(sortOption) {
              case 'j_league': {
                const getJLeagueCount = (uni) => {
                  if (uni.soccer_club?.j_league_nominees_2022_24 !== undefined) {
                    return uni.soccer_club.j_league_nominees_2022_24;
                  }
                  return (
                    (uni.soccer_club?.j_league_nominees_2022 || 0) + 
                    (uni.soccer_club?.j_league_nominees_2023 || 0) + 
                    (uni.soccer_club?.j_league_nominees_2024 || 0)
                  );
                };
                return multiplier * (getJLeagueCount(a) - getJLeagueCount(b));
              }
              case 'members':
                return multiplier * ((a.soccer_club?.total_members || 0) - (b.soccer_club?.total_members || 0));
              case 'name':
                return multiplier * a.university_name.localeCompare(b.university_name);
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
    selectedQualifications,
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
    // 基本検索条件
    searchQuery,
    setSearchQuery,
    selectedRegions,
    setSelectedRegions,
    selectedLeagues,
    setSelectedLeagues,
    selectedQualifications,
    setSelectedQualifications,
    sportsRecommend,
    setSportsRecommend,
    selectionAvailable,
    setSelectionAvailable,
    dormAvailable,
    setDormAvailable,
    generalAdmissionAvailable,
    setGeneralAdmissionAvailable,
    
    // 国公立・私立フィルター
    publicUniversity,
    setPublicUniversity,
    privateUniversity,
    setPrivateUniversity,
    
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