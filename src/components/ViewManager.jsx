// src/components/ViewManager.jsx
import React from 'react';
import EnhancedPlayerPortfolio from './EnhancedPlayerPortfolio';
import TemplatePortfolioCreator from './TemplatePortfolioCreator';
import EnhancedUniversityDetails from './EnhancedUniversityDetails';
import CompareView from './CompareView';
import MyCareerPlan from './MyCareerPlan';
import SimpleRecommendationWizard from './SimpleRecommendationWizard';
import HomeView from './HomeView';
import AgentView from './AgentView'; // 新しいAgentViewをインポート

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
          onShowRecommendation={() => handlers.changeView('recommendation')}
          onShowFavorites={() => handlers.changeView('favorites')}
          onShowCompare={() => handlers.changeView('compare')}
          onEditWithTemplate={() => handlers.changeView('templatePortfolio')}
          userProfile={data.playerProfileData}
        />
      );
      
    case 'templatePortfolio':
      return (
        <TemplatePortfolioCreator
          onBack={() => handlers.changeView('list')}
          userProfile={data.playerProfileData}
          onSaveProfile={handlers.handleSaveProfile}
          favoriteUniversities={data.favoriteUniversities}
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
      
    case 'recommendation':
      return (
        <SimpleRecommendationWizard
          universities={data.universities}
          onViewDetails={handlers.viewUniversityDetails}
        />
      );
    
    // 新規追加: エージェント(代理人)ビュー
    case 'agent':
      return (
        <AgentView
          userProfile={data.playerProfileData}
          universities={data.universities}
          favoriteUniversities={data.favoriteUniversities}
          onViewDetails={handlers.viewUniversityDetails}
          onAddToFavorites={handlers.addToFavorites}
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
          showWizard={data.showWizard}
          onViewDetails={handlers.viewUniversityDetails}
          onAddToCompare={handlers.addToCompare}
          onRemoveFromCompare={handlers.removeFromCompare}
          onAddToFavorites={handlers.addToFavorites}
          onRemoveFromFavorites={handlers.removeFromFavorites}
          onToggleWizard={handlers.toggleWizard}
          onShowTemplatePortfolio={() => handlers.changeView('templatePortfolio')}
          onShowRecommendation={() => handlers.changeView('recommendation')}
          onShowAgent={() => handlers.changeView('agent')} // エージェントビューへの遷移
        />
      );
  }
};

export default ViewManager;