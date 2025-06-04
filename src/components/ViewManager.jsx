// src/components/ViewManager.jsx（シンプル版）
import React from 'react';
import EnhancedPlayerPortfolio from './EnhancedPlayerPortfolio';
import EnhancedUniversityDetails from './EnhancedUniversityDetails';
import CompareView from './CompareView';
import MyCareerPlan from './MyCareerPlan';
import HomeView from './HomeView';

/**
 * ViewManager - アプリケーションの現在のビューを管理するコンポーネント
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
          onShowFavorites={() => handlers.changeView('favorites')}
          onShowCompare={() => handlers.changeView('compare')}
          userProfile={data.playerProfileData}
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
      
    case 'favorites':
      return (
        <MyCareerPlan 
          favoriteUniversities={data.favoriteUniversities}
          onBack={() => handlers.changeView('list')}
          onRemoveFromFavorites={handlers.removeFromFavorites}
          onReorderFavorites={handlers.reorderFavorites}
          onViewDetails={handlers.viewUniversityDetails}
          onShowPortfolio={() => handlers.changeView('portfolio')}
        />
      );
      
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