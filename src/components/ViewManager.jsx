// src/components/ViewManager.jsx - プレミアム対応版
import React from 'react';
import EnhancedPlayerPortfolio from './EnhancedPlayerPortfolio';
import EnhancedUniversityDetails from './EnhancedUniversityDetails';
import CompareView from './CompareView';
import MultiSelectSearchForm from './MultiSelectSearchForm';
import UniversityList from './UniversityList';

/**
 * ViewManager - アプリケーションの現在のビューを管理するコンポーネント（プレミアム対応版）
 */
const ViewManager = ({
  currentView,
  data,
  handlers,
  isPremium = false
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
          selectedAcademicRanks={data.searchState.selectedAcademicRanks}
          setSelectedAcademicRanks={data.searchState.setSelectedAcademicRanks}
          selectedPlayerAspirations={data.searchState.selectedPlayerAspirations}
          setSelectedPlayerAspirations={data.searchState.setSelectedPlayerAspirations}
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
          isPremium={isPremium}
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
          isPremium={isPremium}
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
          isPremium={isPremium}
        />
      );
      
    case 'compare':
      return (
        <CompareView 
          universities={data.compareList} 
          onBack={() => handlers.changeView('list')} 
          onRemove={handlers.removeFromCompare}
          isPremium={isPremium}
        />
      );
      
    case 'list':
    default:
      return renderHomeView();
  }
};

export default ViewManager;