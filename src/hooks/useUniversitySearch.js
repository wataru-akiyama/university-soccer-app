import { useState, useEffect } from 'react';

const useUniversitySearch = (universities) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedQualification, setSelectedQualification] = useState('');
  const [sportsRecommend, setSportsRecommend] = useState(false);
  const [selectionAvailable, setSelectionAvailable] = useState(false);
  const [dormAvailable, setDormAvailable] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState(universities);

  // 検索フィルタリング
  useEffect(() => {
    let results = universities;
    
    // 検索キーワードでフィルタリング
    if (searchQuery) {
      results = results.filter(uni => 
        uni.university_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // 地域でフィルタリング（実際はもっと詳細な実装が必要）
    if (selectedRegion) {
      // サンプルなのでスキップ
    }
    
    // リーグでフィルタリング
    if (selectedLeague) {
      results = results.filter(uni => 
        uni.soccer_club.league === selectedLeague
      );
    }
    
    // 資格でフィルタリング
    if (selectedQualification) {
      results = results.filter(uni => 
        uni.soccer_club.qualifications.includes(selectedQualification)
      );
    }
    
    // スポーツ推薦の有無でフィルタリング
    if (sportsRecommend) {
      results = results.filter(uni => 
        uni.entry_conditions.sports_recommend === true
      );
    }
    
    // セレクションの有無でフィルタリング
    if (selectionAvailable) {
      results = results.filter(uni => 
        uni.entry_conditions.selection === true
      );
    }
    
    // 寮の有無でフィルタリング
    if (dormAvailable) {
      results = results.filter(uni => 
        uni.soccer_club.dorm_available === true
      );
    }
    
    // ソート
    if (sortOption === "j_league") {
      results = [...results].sort((a, b) => 
        b.soccer_club.j_league_nominees_2022_24 - a.soccer_club.j_league_nominees_2022_24
      );
    } else if (sortOption === "denso_cup") {
      results = [...results].sort((a, b) => 
        b.soccer_club.denso_cup_2024_25 - a.soccer_club.denso_cup_2024_25
      );
    } else if (sortOption === "members") {
      results = [...results].sort((a, b) => 
        b.soccer_club.total_members - a.soccer_club.total_members
      );
    }
    
    setFilteredUniversities(results);
  }, [
    universities,
    searchQuery,
    selectedRegion,
    selectedLeague,
    selectedQualification,
    sportsRecommend,
    selectionAvailable,
    dormAvailable,
    sortOption
  ]);

  return {
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
    sortOption,
    setSortOption,
    filteredUniversities
  };
};

export default useUniversitySearch;