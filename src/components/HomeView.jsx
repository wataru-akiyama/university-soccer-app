// Modified HomeView.jsx - Update the imports and add banner
import React from 'react';
import { ChevronRight, X, Zap, Trophy, BookOpen } from 'lucide-react';
import PortfolioBanner from './PortfolioBanner';
import AgentPromoBanner from './AgentPromoBanner'; // 新規追加
import MultiSelectSearchForm from './MultiSelectSearchForm';
import UniversityList from './UniversityList';
import StepSearchWizard from './StepSearchWizard';

/**
 * HomeView - ホーム画面（大学リスト表示）コンポーネント
 */
const HomeView = ({
  searchState,
  filteredUniversities,
  allUniversities,
  compareList,
  favoriteUniversities,
  showWizard,
  onViewDetails,
  onAddToCompare,
  onRemoveFromCompare,
  onAddToFavorites,
  onRemoveFromFavorites,
  onToggleWizard,
  onShowTemplatePortfolio,
  onShowRecommendation,
  onShowAgent // 新規追加
}) => {
  return (
    <>
      {/* 1. ポートフォリオバナー */}
      <PortfolioBanner
        onShowPortfolio={onShowTemplatePortfolio}
        showTemplateVersion={true}
      />
      
      {/* 1.5 エージェントプロモバナー（新規追加） */}
      <AgentPromoBanner
        onShowAgent={onShowAgent}
      />
      
      {/* 2. 推薦ウィザードバナー */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-md overflow-hidden mb-6">
        <div className="relative p-5">
          {/* 背景装飾 */}
          <div className="absolute right-0 top-0 bottom-0 opacity-10">
            <div className="h-full w-64 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* アイコン部分 */}
            <div className="bg-white rounded-full p-3 shadow-md mb-4 md:mb-0 md:mr-5">
              <Zap size={32} className="text-orange-600" />
            </div>
            
            {/* テキスト部分 */}
            <div className="text-center md:text-left md:flex-1">
              <h3 className="text-xl font-bold text-white mb-1">あなたにぴったりの大学サッカー部を見つけよう！</h3>
              <p className="text-yellow-100 mb-4">サッカーに対する志向と学びたいことから最適な大学を提案します</p>
              
              {/* 特徴ポイント */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-3">
                <div className="flex items-center text-white text-sm">
                  <Trophy size={16} className="mr-1" />
                  <span>実績に基づく大学提案</span>
                </div>
                <div className="flex items-center text-white text-sm">
                  <BookOpen size={16} className="mr-1" />
                  <span>学びたいことから診断</span>
                </div>
              </div>
            </div>
            
            {/* ボタン - z-indexを高くして最前面に表示 */}
            <div className="mt-4 md:mt-0 md:ml-5 relative z-10">
              <button 
                className="bg-white text-orange-600 px-5 py-3 rounded-lg font-bold shadow-md hover:bg-orange-50 transition-colors flex items-center cursor-pointer"
                onClick={onShowRecommendation}
                type="button"
                style={{ position: 'relative', zIndex: 20 }}
              >
                診断してみる
                <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ステップ式検索ウィザード - show状態の時のみ表示 */}
      {showWizard && (
        <StepSearchWizard
          onViewDetails={onViewDetails}
          universities={allUniversities}
          setSearchQuery={searchState.setSearchQuery}
          setSelectedRegions={searchState.setSelectedRegions}
          setSelectedLeagues={searchState.setSelectedLeagues}
          setSelectedQualifications={searchState.setSelectedQualifications}
          setSportsRecommend={searchState.setSportsRecommend}
          setSelectionAvailable={searchState.setSelectionAvailable}
          setDormAvailable={searchState.setDormAvailable}
          setJLeagueMinimum={searchState.setJLeagueMinimum}
          useUniversitySearchInstance={{
            searchQuery: searchState.searchQuery,
            selectedRegions: searchState.selectedRegions,
            selectedLeagues: searchState.selectedLeagues,
            selectedQualifications: searchState.selectedQualifications,
            sportsRecommend: searchState.sportsRecommend,
            selectionAvailable: searchState.selectionAvailable,
            dormAvailable: searchState.dormAvailable,
            generalAdmissionAvailable: searchState.generalAdmissionAvailable,
            jLeagueMinimum: searchState.jLeagueMinimum,
            yearlyJLeagueFilter: searchState.yearlyJLeagueFilter,
            memberSizeCategory: searchState.memberSizeCategory,
            newMemberSizeCategory: searchState.newMemberSizeCategory,
            maxGradeRequirement: searchState.maxGradeRequirement,
            coachBackgroundFilter: searchState.coachBackgroundFilter,
            densoCupMinimum: searchState.densoCupMinimum,
            sortOption: searchState.sortOption,
            sortDirection: searchState.sortDirection
          }}
        />
      )}

      {/* 検索フォームの上に小さなボタンを追加して、ウィザードをトグルできるようにする */}
      <div className="flex justify-center mb-4">
        <button
          className={`flex items-center ${showWizard ? 'bg-gray-200 text-gray-700' : 'bg-green-600 text-white'} px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition-colors shadow-sm`}
          onClick={onToggleWizard}
        >
          {showWizard ? (
            <>
              <X size={16} className="mr-1" />
              ウィザードを閉じる
            </>
          ) : (
            <>
              <Zap size={16} className="mr-1" />
              かんたん検索ウィザード
            </>
          )}
        </button>
      </div>

      {/* 3. 検索フォーム */}
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
      
      {/* 4. 大学リスト */}
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