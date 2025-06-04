// Modified HomeView.jsx - シンプル版（バナーとウィザードを削除）
import React from 'react';
import MultiSelectSearchForm from './MultiSelectSearchForm';
import UniversityList from './UniversityList';

/**
 * HomeView - ホーム画面（大学リスト表示）コンポーネント
 */
const HomeView = ({
  searchState,
  filteredUniversities,
  allUniversities,
  compareList,
  favoriteUniversities,
  onViewDetails,
  onAddToCompare,
  onRemoveFromCompare,
  onAddToFavorites,
  onRemoveFromFavorites
}) => {
  return (
    <>
      {/* 検索フォーム */}
      <MultiSelectSearchForm
        searchQuery={searchState.searchQuery}
        setSearchQuery={searchState.setSearchQuery}
        selectedRegions={searchState.selectedRegions}
        setSelectedRegions={searchState.setSelectedRegions}
        selectedLeagues={searchState.selectedLeagues}
        setSelectedLeagues={searchState.setSelectedLeagues}
        selectedQualifications={searchState.selectedQualifications}
        setSelectedQualifications={searchState.setSelectedQualifications}
        sportsRecommend={searchState.sportsRecommend}
        setSportsRecommend={searchState.setSportsRecommend}
        selectionAvailable={searchState.selectionAvailable}
        setSelectionAvailable={searchState.setSelectionAvailable}
        dormAvailable={searchState.dormAvailable}
        setDormAvailable={searchState.setDormAvailable}
        generalAdmissionAvailable={searchState.generalAdmissionAvailable}
        setGeneralAdmissionAvailable={searchState.setGeneralAdmissionAvailable}
        publicUniversity={searchState.publicUniversity}
        setPublicUniversity={searchState.setPublicUniversity}
        privateUniversity={searchState.privateUniversity}
        setPrivateUniversity={searchState.setPrivateUniversity}
        jLeagueMinimum={searchState.jLeagueMinimum}
        setJLeagueMinimum={searchState.setJLeagueMinimum}
        yearlyJLeagueFilter={searchState.yearlyJLeagueFilter}
        setYearlyJLeagueFilter={searchState.setYearlyJLeagueFilter}
        memberSizeCategory={searchState.memberSizeCategory}
        setMemberSizeCategory={searchState.setMemberSizeCategory}
        newMemberSizeCategory={searchState.newMemberSizeCategory}
        setNewMemberSizeCategory={searchState.setNewMemberSizeCategory}
        maxGradeRequirement={searchState.maxGradeRequirement}
        setMaxGradeRequirement={searchState.setMaxGradeRequirement}
        coachBackgroundFilter={searchState.coachBackgroundFilter}
        setCoachBackgroundFilter={searchState.setCoachBackgroundFilter}
        densoCupMinimum={searchState.densoCupMinimum}
        setDensoCupMinimum={searchState.setDensoCupMinimum}
        sortOption={searchState.sortOption}
        setSortOption={searchState.setSortOption}
        sortDirection={searchState.sortDirection}
        setSortDirection={searchState.setSortDirection}
      />
      
      {/* 大学リスト */}
      <UniversityList
        filteredUniversities={filteredUniversities}
        allUniversities={allUniversities}
        sortOption={searchState.sortOption}
        setSortOption={searchState.setSortOption}
        sortDirection={searchState.sortDirection}
        setSortDirection={searchState.setSortDirection}
        onViewDetails={onViewDetails}
        compareList={compareList}
        onAddToCompare={onAddToCompare}
        onRemoveFromCompare={onRemoveFromCompare}
        favoriteUniversities={favoriteUniversities}
        onAddToFavorites={onAddToFavorites}
        onRemoveFromFavorites={onRemoveFromFavorites}
        selectedRegion={searchState.selectedRegions}
        sportsRecommend={searchState.sportsRecommend}
        dormAvailable={searchState.dormAvailable}
        selectionAvailable={searchState.selectionAvailable}
        selectedLeague={searchState.selectedLeagues}
        selectedQualification={searchState.selectedQualifications}
      />
    </>
  );
};

export default HomeView;