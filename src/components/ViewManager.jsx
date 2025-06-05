// src/components/ViewManager.jsx（簡素化・統合版）
import React from 'react';
import EnhancedPlayerPortfolio from './EnhancedPlayerPortfolio';
import EnhancedUniversityDetails from './EnhancedUniversityDetails';
import CompareView from './CompareView';
import HomeView from './HomeView';

/**
 * ViewManager - アプリケーションの現在のビューを管理するコンポーネント（統合版）
 */
const ViewManager = ({
  currentView,
  data,
  handlers
}) => {
  // 現在のビューに基づいてコンポーネントを返す
  switch (currentView) {
    case 'portfolio':
      return (
        <EnhancedPlayerPortfolio 
          onBack={() => handlers.changeView('list')}
          favoriteUniversities={data.favoriteUniversities}
          onShowCompare={() => handlers.changeView('compare')}
          userProfile={data.playerProfileData}
          // 進路プラン管理機能を統合
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
      
    // 'favorites' ケースを削除 - ポートフォリオに統合されたため
    
    case 'list':
    default:
      return (
        <HomeView 
          searchState={data.searchState}
          filteredUniversities={data.filteredUniversities}
          allUniversities={data.universities}
          compareList={data.compareList}
          favoriteUniversities={data.favoriteUniversities}
          onViewDetails={handlers.viewUniversityDetails}
          onAddToCompare={handlers.addToCompare}
          onRemoveFromCompare={handlers.removeFromCompare}
          onAddToFavorites={handlers.addToFavorites}
          onRemoveFromFavorites={handlers.removeFromFavorites}
        />
      );
  }
};

export default ViewManager;