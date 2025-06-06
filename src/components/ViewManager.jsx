// src/components/ViewManager.jsx（統合版）
import React from 'react';
import EnhancedPlayerPortfolio from './EnhancedPlayerPortfolio';
import EnhancedUniversityDetails from './EnhancedUniversityDetails';
import CompareView from './CompareView';
import MultiSelectSearchForm from './MultiSelectSearchForm';
import UniversityList from './UniversityList';

/**
 * ViewManager - アプリケーションの現在のビューを管理するコンポーネント（統合版）
 */
const ViewManager = ({
  currentView,
  data,
  handlers
}) => {
  // ===== HomeView の内容を直接統合 =====
  const renderHomeView = () => {
    return (
      <>
        {/* 検索フォーム */}
        <MultiSelectSearchForm
          searchQuery={data.searchState.searchQuery}
          setSearchQuery={data.searchState.setSearchQuery}
          selectedRegions={data.searchState.selectedRegions}
          setSelectedRegions={data.searchState.setSelectedRegions}
          selectedLeagues={data.searchState.selectedLeagues}
          setSelectedLeagues={data.searchState.setSelectedLeagues}
          selectedQualifications={data.searchState.selectedQualifications}
          setSelectedQualifications={data.searchState.setSelectedQualifications}
          sportsRecommend={data.searchState.sportsRecommend}
          setSportsRecommend={data.searchState.setSportsRecommend}
          selectionAvailable={data.searchState.selectionAvailable}
          setSelectionAvailable={data.searchState.setSelectionAvailable}
          dormAvailable={data.searchState.dormAvailable}
          setDormAvailable={data.searchState.setDormAvailable}
          generalAdmissionAvailable={data.searchState.generalAdmissionAvailable}
          setGeneralAdmissionAvailable={data.searchState.setGeneralAdmissionAvailable}
          publicUniversity={data.searchState.publicUniversity}
          setPublicUniversity={data.searchState.setPublicUniversity}
          privateUniversity={data.searchState.privateUniversity}
          setPrivateUniversity={data.searchState.setPrivateUniversity}
          sortOption={data.searchState.sortOption}
          setSortOption={data.searchState.setSortOption}
          sortDirection={data.searchState.sortDirection}
          setSortDirection={data.searchState.setSortDirection}
        />
        
        {/* 大学リスト */}
        <UniversityList
          filteredUniversities={data.filteredUniversities}
          allUniversities={data.universities}
          sortOption={data.searchState.sortOption}
          setSortOption={data.searchState.setSortOption}
          sortDirection={data.searchState.sortDirection}
          setSortDirection={data.searchState.setSortDirection}
          onViewDetails={handlers.viewUniversityDetails}
          compareList={data.compareList}
          onAddToCompare={handlers.addToCompare}
          onRemoveFromCompare={handlers.removeFromCompare}
          favoriteUniversities={data.favoriteUniversities}
          onAddToFavorites={handlers.addToFavorites}
          onRemoveFromFavorites={handlers.removeFromFavorites}
          selectedRegion={data.searchState.selectedRegions}
          sportsRecommend={data.searchState.sportsRecommend}
          dormAvailable={data.searchState.dormAvailable}
          selectionAvailable={data.searchState.selectionAvailable}
          selectedLeague={data.searchState.selectedLeagues}
          selectedQualification={data.searchState.selectedQualifications}
        />
      </>
    );
  };
  // ===== HomeView 統合終了 =====
  
  // 現在のビューに基づいてコンポーネントを返す
  switch (currentView) {
    case 'portfolio':
      return (
        <EnhancedPlayerPortfolio 
          onBack={() => handlers.changeView('list')}
          favoriteUniversities={data.favoriteUniversities}
          onShowCompare={() => handlers.changeView('compare')}
          userProfile={data.playerProfileData}
          onRemoveFromFavorites={handlers.removeFromFavorites}
          onReorderFavorites={handlers.reorderFavorites}
          onViewDetails={handlers.viewUniversityDetails}
        />
      );
      
    case 'details':
      return (
        <EnhancedUniversityDetails 
          university={data.selectedUniversity} 
          onBack={() => handlers.changeView('list')} 
          onAddToCompare={handlers.addToCompare}
          onAddToFavorites={handlers.addToFavorites}
          isInCompareList={data.compareList.some(uni => 
            uni && data.selectedUniversity && uni.id === data.selectedUniversity.id
          )}
          isInFavorites={data.favoriteUniversities.some(uni => 
            uni && data.selectedUniversity && uni.id === data.selectedUniversity.id
          )}
        />
      );
      
    case 'compare':
      return (
        <CompareView 
          universities={data.compareList} 
          onBack={() => handlers.changeView('list')} 
          onRemove={handlers.removeFromCompare} 
        />
      );
      
    case 'list':
    default:
      return renderHomeView(); // 統合されたHomeViewロジック
  }
};

export default ViewManager;