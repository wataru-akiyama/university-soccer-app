// src/hooks/useUniversitySearch.js - フィルター修正版

import { useState, useMemo } from 'react';
import { searchHelpers } from '../data';

const useUniversitySearch = (universities) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedQualifications, setSelectedQualifications] = useState([]);
  const [sportsRecommend, setSportsRecommend] = useState(false);
  const [selectionAvailable, setSelectionAvailable] = useState(false);
  const [dormAvailable, setDormAvailable] = useState(false);
  const [generalAdmissionAvailable, setGeneralAdmissionAvailable] = useState(false);
  const [publicUniversity, setPublicUniversity] = useState(false);
  const [privateUniversity, setPrivateUniversity] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');

  const filteredUniversities = useMemo(() => {
    if (!universities || universities.length === 0) return [];
    
    try {
      let result = universities.filter(university => {
        if (!university || !university.soccer_club || !university.entry_conditions) {
          return false;
        }
        
        // デバッグログ（開発環境のみ）
        if (process.env.NODE_ENV === 'development') {
          console.log(`🔍 フィルタリング中: ${university.university_name}`);
          console.log(`📍 所在地: ${university.location}`);
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
        
        // 地域フィルター（詳細ログ付き）
        if (selectedRegions.length > 0) {
          const matchesRegion = selectedRegions.some(region => {
            const isMatch = searchHelpers.isUniversityInRegion(university, region);
            
            // デバッグログ（開発環境のみ）
            if (process.env.NODE_ENV === 'development') {
              console.log(`🌏 地域チェック: ${university.university_name} - ${region} = ${isMatch}`);
            }
            
            return isMatch;
          });
          
          if (!matchesRegion) {
            if (process.env.NODE_ENV === 'development') {
              console.log(`❌ 地域フィルターで除外: ${university.university_name}`);
            }
            return false;
          }
        }
        
        // リーグフィルター
        if (selectedLeagues.length > 0) {
          const matchesLeague = selectedLeagues.some(league => 
            university.soccer_club?.league === league
          );
          if (!matchesLeague) return false;
        }
        
        // 学部フィルター
        if (selectedQualifications.length > 0) {
          const matchesFaculty = selectedQualifications.some(faculty => 
            university.main_faculties?.some(uniFaculty => 
              uniFaculty.includes(faculty) || faculty.includes(uniFaculty)
            )
          );
          if (!matchesFaculty) return false;
        }
        
        // 国公立・私立フィルター（詳細ログ付き）
        const isPublic = searchHelpers.isPublicUniversity(university);
        
        // デバッグログ（開発環境のみ）
        if (process.env.NODE_ENV === 'development' && (publicUniversity || privateUniversity)) {
          console.log(`🏛️ 大学種別チェック: ${university.university_name} - 国公立=${isPublic}`);
        }
        
        if (publicUniversity && !isPublic) {
          if (process.env.NODE_ENV === 'development') {
            console.log(`❌ 国公立フィルターで除外: ${university.university_name}`);
          }
          return false;
        }
        
        if (privateUniversity && isPublic) {
          if (process.env.NODE_ENV === 'development') {
            console.log(`❌ 私立フィルターで除外: ${university.university_name}`);
          }
          return false;
        }
        
        // その他のフィルター
        if (sportsRecommend && !university.entry_conditions.sports_recommend) return false;
        if (selectionAvailable && !university.entry_conditions.selection) return false;
        if (dormAvailable && !university.soccer_club.dorm_available) return false;
        if (generalAdmissionAvailable && !university.entry_conditions.general_admission) return false;
        
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
      
      // デバッグログ（開発環境のみ）
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ フィルタリング完了: ${result.length}校`);
        console.log('フィルタリング結果:', result.map(u => u.university_name));
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
    publicUniversity,
    setPublicUniversity,
    privateUniversity,
    setPrivateUniversity,
    sortOption,
    setSortOption,
    sortDirection,
    setSortDirection,
    filteredUniversities
  };
};

export default useUniversitySearch;