import { useState, useMemo } from 'react';
// 変更: 検索ヘルパーを統合データから取得
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
        
        // 地域フィルター（統合ヘルパー使用）
        if (selectedRegions.length > 0) {
          const matchesRegion = selectedRegions.some(region => 
            searchHelpers.isUniversityInRegion(university, region)
          );
          if (!matchesRegion) return false;
        }
        
        // リーグフィルター（追加）
        if (selectedLeagues.length > 0) {
          const matchesLeague = selectedLeagues.some(league => 
            university.soccer_club?.league === league
          );
          if (!matchesLeague) return false;
        }
        
        // 学部フィルター（追加）
        if (selectedQualifications.length > 0) {
          const matchesFaculty = selectedQualifications.some(faculty => 
            university.main_faculties?.some(uniFaculty => 
              uniFaculty.includes(faculty) || faculty.includes(uniFaculty)
            )
          );
          if (!matchesFaculty) return false;
        }
        
        // 国公立・私立フィルター（統合ヘルパー使用）
        const isPublic = searchHelpers.isPublicUniversity(university);
        if (publicUniversity && !isPublic) return false;
        if (privateUniversity && isPublic) return false;
        
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