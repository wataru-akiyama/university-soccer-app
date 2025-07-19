// src/components/EnhancedUniversityDetails.jsx - 修正版
import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  Heart, 
  Check, 
  Info,
  Briefcase,
  MessageSquare,
  Plus,
  BookOpen,
  Star,
  Building,
  MapPin,
  GraduationCap,
  DollarSign,
  Target,
  Zap,
  X,
  Users, 
  Trophy, 
  Home, 
  User,
  TrendingUp,
  Lock,
  Globe,
  Calendar
} from 'lucide-react';
import UniversityLogo from './UniversityLogo';
import PremiumBadge from './PremiumBadge';
import MaskedContent, { MaskedBanner } from './MaskedContent';

const EnhancedUniversityDetails = ({ 
  university, 
  onBack, 
  onAddToCompare, 
  onAddToFavorites, 
  isInCompareList,
  isInFavorites,
  // プレミアム関連のprops
  isPremium = false,
  onUpgradeToPremium,
  premiumUtils
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showScrollHint, setShowScrollHint] = useState(false);
  const tabContainerRef = useRef(null);

  // プレミアムユーティリティのデフォルト値
  const { 
    canUsePremiumFeature = () => isPremium,
    shouldShowContent = () => true,
    trackPremiumAttempt = () => {}
  } = premiumUtils || {};

  // バッジ色分け関数（SimpleUniversityCardと同じ）
  const getLeagueColor = (league) => {
    if (league?.includes('1部')) return 'bg-green-100 text-green-800 border-green-200';
    if (league?.includes('2部')) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getAcademicRankColor = (rank) => {
    if (!rank) return 'bg-gray-100 text-gray-800 border-gray-200';
    
    if (rank.startsWith('A：')) return 'bg-red-100 text-red-800 border-red-200';
    if (rank.startsWith('B：')) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (rank.startsWith('C：')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (rank.startsWith('D：')) return 'bg-green-100 text-green-800 border-green-200';
    if (rank.startsWith('E：')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (rank.startsWith('F：')) return 'bg-purple-100 text-purple-800 border-purple-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getGenreColor = (genre) => {
    if (!genre) return 'bg-gray-50 text-gray-700 border-gray-200';
    
    if (genre.startsWith('A：')) return 'bg-red-50 text-red-700 border-red-200';
    if (genre.startsWith('B：')) return 'bg-orange-50 text-orange-700 border-orange-200';
    if (genre.startsWith('C：')) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    if (genre.startsWith('D：')) return 'bg-green-50 text-green-700 border-green-200';
    if (genre.startsWith('E：')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (genre.startsWith('F：')) return 'bg-purple-50 text-purple-700 border-purple-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  // 志向性の取得（SimpleUniversityCardと同じ）
  const getGenres = () => {
    if (university.genres && Array.isArray(university.genres) && university.genres.length > 0) {
      return university.genres.filter(genre => genre && genre.trim() !== '');
    }
    
    const genres = [];
    if (university.genre1 && university.genre1.trim()) genres.push(university.genre1);
    if (university.genre2 && university.genre2.trim()) genres.push(university.genre2);
    
    return genres;
  };

  // 練習場所の取得（SimpleUniversityCardと同じロジック）
  const getPracticeLocationWithArea = () => {
    if (!university) return '';
    
    // グラウンド住所から都道府県+市を抽出
    const groundAddress = university.facilities?.ground_address || 
                         university.soccer_club?.ground_address || 
                         university.facilities?.address || '';
    
    if (groundAddress) {
      // 住所から都道府県+市を抽出する正規表現
      const addressMatch = groundAddress.match(/^(.*?[都道府県])(.*?[市区町村])/);
      
      if (addressMatch) {
        const prefecture = addressMatch[1]; // 都道府県
        const city = addressMatch[2]; // 市区町村
        return `${prefecture}${city}`;
      }
      
      // 正規表現でマッチしない場合は、住所の最初の部分を返す
      const addressParts = groundAddress.split(/\s+/);
      if (addressParts.length > 0) {
        return addressParts[0];
      }
    }
    
    // グラウンド住所がない場合は、大学の所在地情報をフォールバック
    const universityArea = university.area || university.location || '';
    
    // 大学所在地も都道府県+市形式に変換
    if (universityArea) {
      const areaMatch = universityArea.match(/^(.*?[都道府県])(.*?[市区町村])/);
      if (areaMatch) {
        return `${areaMatch[1]}${areaMatch[2]}`;
      }
      return universityArea;
    }
    
    return '';
  };

  // スクロール状態を監視
  useEffect(() => {
    const container = tabContainerRef.current;
    if (!container) return;

    const checkScrollable = () => {
      const isScrollable = container.scrollWidth > container.clientWidth;
      const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 5;
      setShowScrollHint(isScrollable && !isAtEnd);
    };

    checkScrollable();
    container.addEventListener('scroll', checkScrollable);
    window.addEventListener('resize', checkScrollable);

    return () => {
      container.removeEventListener('scroll', checkScrollable);
      window.removeEventListener('resize', checkScrollable);
    };
  }, []);
  
  if (!university) return null;

  // タブ構成
  const tabs = [
    { id: 'overview', label: '概要', icon: Info },
    { id: 'admission', label: '入部', icon: GraduationCap },
    { id: 'costs', label: '費用', icon: DollarSign },
    { id: 'facilities', label: '施設', icon: Building },
    { id: 'careers', label: '進路', icon: Briefcase },
    { id: 'reviews', label: '口コミ', icon: MessageSquare }
  ];

  // プレミアム制限付きアクションハンドラー
  const handleCompareClick = () => {
    if (!canUsePremiumFeature('comparison')) {
      trackPremiumAttempt('comparison', 'blocked_compare_button');
      return;
    }
    
    if (isInCompareList) {
      // 既に比較リストにある場合は削除
      // 実際の削除処理は親コンポーネントで行う
    } else {
      onAddToCompare(university);
    }
  };

  // データ取得
  const genres = getGenres();
  const academicRank = university?.academic_rank || '';
  const practiceLocationWithArea = getPracticeLocationWithArea();
  const league = university.soccer_club?.league || '';

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ヒーローセクション */}
      <div className="relative bg-gradient-to-br from-gray-50 to-white">
        {/* 背景パターン */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* コンテンツ */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* ナビゲーション */}
          <div className="flex justify-between items-center mb-6 lg:mb-8">
            <button 
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
              onClick={onBack}
            >
              <ChevronLeft size={20} className="mr-2" />
              <span className="hidden sm:inline">一覧に戻る</span>
              <span className="sm:hidden">戻る</span>
            </button>
            
            <div className="flex space-x-3">
              <button 
                className={`p-3 rounded-full transition-all duration-200 shadow-md ${
                  isInFavorites
                  ? "bg-red-500 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:text-red-500 hover:shadow-lg border border-gray-200"
                }`}
                onClick={() => onAddToFavorites(university)}
                title={isInFavorites ? "進路プランから削除" : "進路プランに追加"}
              >
                <Heart size={20} fill={isInFavorites ? "currentColor" : "none"} />
              </button>
              
              {/* ホームページボタン */}
              {university.homepage_url && (
                <a 
                  href={university.homepage_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md flex items-center space-x-2"
                  title="大学公式サイトを開く"
                >
                  <Globe size={18} />
                  <span className="hidden sm:inline text-sm font-medium">公式サイト</span>
                </a>
              )}
            </div>
          </div>
          
          {/* メイン情報 */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8 mb-8">
            <UniversityLogo 
              university={university}
              size="xl"
              className="shadow-xl border border-gray-100"
              showFallback={true}
            />
            
            <div className="flex-1 min-w-0 space-y-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                {university.university_name}
              </h1>
              
              {/* バッジエリア - SimpleUniversityCardと同じレイアウト */}
              <div className="space-y-2">
                {/* デスクトップ表示（2行横並び） */}
                <div className="hidden sm:block space-y-2">
                  {/* 第1行: リーグバッジ + 練習場所バッジ */}
                  <div className="flex flex-wrap gap-2">
                    {league && (
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getLeagueColor(league)}`}>
                        {league}
                      </span>
                    )}
                    
                    {practiceLocationWithArea && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200">
                        <MapPin size={14} className="mr-1" />
                        {practiceLocationWithArea}
                      </span>
                    )}
                  </div>

                  {/* 第2行: 志向性バッジ + 学力ランクバッジ */}
                  <div className="flex flex-wrap gap-2">
                    {genres.length > 0 && (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getGenreColor(genres[0])}`}>
                        <Target size={14} className="mr-1" />
                        {genres[0]}
                      </span>
                    )}
                    
                    {academicRank && (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getAcademicRankColor(academicRank)}`}>
                        <Star size={14} className="mr-1" />
                        {academicRank}
                      </span>
                    )}
                  </div>
                </div>

                {/* モバイル表示（縦並び） */}
                <div className="sm:hidden space-y-2">
                  {/* リーグバッジ */}
                  {league && (
                    <div className="flex">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getLeagueColor(league)}`}>
                        {league}
                      </span>
                    </div>
                  )}
                  
                  {/* 練習場所バッジ */}
                  {practiceLocationWithArea && (
                    <div className="flex">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200">
                        <MapPin size={14} className="mr-1" />
                        {practiceLocationWithArea}
                      </span>
                    </div>
                  )}

                  {/* 志向性バッジ */}
                  {genres.length > 0 && (
                    <div className="flex">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getGenreColor(genres[0])}`}>
                        <Target size={14} className="mr-1" />
                        {genres[0]}
                      </span>
                    </div>
                  )}
                  
                  {/* 学力ランクバッジ */}
                  {academicRank && (
                    <div className="flex">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getAcademicRankColor(academicRank)}`}>
                        <Star size={14} className="mr-1" />
                        {academicRank}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* PLAYMAKERコメント */}
          {university.extended_data?.playmaker_comment && (
            <div className="bg-green-50 rounded-xl p-6 border border-green-200 shadow-sm">
              <h2 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                PLAYMAKERコメント
                {!isPremium && <PremiumBadge className="ml-2" />}
              </h2>
              
              {isPremium ? (
                <p className="text-gray-700 leading-relaxed">
                  {university.extended_data.playmaker_comment}
                </p>
              ) : (
                <div className="space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    {university.extended_data.playmaker_comment.split('。')[0]}。
                  </p>
                  <MaskedContent 
                    reason="より詳細な専門評価"
                    onUpgradeClick={onUpgradeToPremium}
                  >
                    <p className="text-gray-700 leading-relaxed">
                      {university.extended_data.playmaker_comment}
                    </p>
                  </MaskedContent>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 比較機能バナー（フリープランのみ） */}
      {!isPremium && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MaskedBanner 
            title="比較機能はプレミアム限定"
            description="複数の大学を詳細に比較検討できる機能は、プレミアムプランでご利用いただけます。"
            onUpgradeClick={onUpgradeToPremium}
            className="mb-6"
          />
        </div>
      )}

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="space-y-6 lg:space-y-8">
          {/* ナビゲーションタブ */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative">
              <div 
                ref={tabContainerRef}
                className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      className={`flex-shrink-0 flex items-center justify-center px-4 lg:px-6 py-3 lg:py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon size={18} className="mr-2" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              
              {showScrollHint && (
                <>
                  <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
                  <div className="absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none z-20">
                    <div className="flex items-center text-xs text-gray-400">
                      <span className="mr-1">→</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="p-6 lg:p-8">
              {activeTab === 'overview' && (
                <OverviewTab 
                  university={university} 
                  isPremium={isPremium} 
                  onUpgradeToPremium={onUpgradeToPremium}
                />
              )}
              {activeTab === 'admission' && (
                <AdmissionTab 
                  university={university} 
                  isPremium={isPremium} 
                  onUpgradeToPremium={onUpgradeToPremium}
                />
              )}
              {activeTab === 'costs' && (
                <CostsTab 
                  university={university} 
                  isPremium={isPremium} 
                  onUpgradeToPremium={onUpgradeToPremium}
                />
              )}
              {activeTab === 'facilities' && (
                <FacilitiesTab 
                  university={university} 
                  isPremium={isPremium} 
                  onUpgradeToPremium={onUpgradeToPremium}
                />
              )}
              {activeTab === 'careers' && (
                <CareersTab 
                  university={university} 
                  isPremium={isPremium} 
                  onUpgradeToPremium={onUpgradeToPremium}
                />
              )}
              {activeTab === 'reviews' && (
                <ReviewsTab 
                  university={university} 
                  isPremium={isPremium} 
                  onUpgradeToPremium={onUpgradeToPremium}
                />
              )}
            </div>
          </div>
          
          {/* アクションエリア */}
          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                className={`flex items-center justify-center px-4 lg:px-6 py-3 rounded-lg font-medium transition-colors ${
                  isInFavorites
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
                onClick={() => onAddToFavorites(university)}
              >
                <Heart size={18} className="mr-2" fill={isInFavorites ? "currentColor" : "none"} />
                <span className="hidden sm:inline">
                  {isInFavorites ? '進路プランに追加済み' : '進路プランに追加'}
                </span>
                <span className="sm:hidden">
                  {isInFavorites ? '追加済み' : '進路追加'}
                </span>
              </button>
              
              {isPremium ? (
                <button 
                  className={`flex items-center justify-center px-4 lg:px-6 py-3 rounded-lg font-medium transition-colors ${
                    isInCompareList
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                  disabled={isInCompareList}
                  onClick={handleCompareClick}
                >
                  {isInCompareList ? (
                    <>
                      <Check size={18} className="mr-2" />
                      <span className="hidden sm:inline">比較リストに追加済み</span>
                      <span className="sm:hidden">追加済み</span>
                    </>
                  ) : (
                    <>
                      <Plus size={18} className="mr-2" />
                      <span className="hidden sm:inline">比較リストに追加</span>
                      <span className="sm:hidden">比較追加</span>
                    </>
                  )}
                </button>
              ) : (
                <button 
                  className="bg-gray-100 text-gray-500 cursor-not-allowed px-4 lg:px-6 py-3 rounded-lg font-medium flex items-center justify-center"
                  disabled
                  onClick={() => trackPremiumAttempt('comparison', 'blocked_compare_button')}
                >
                  <Lock size={18} className="mr-2" />
                  <span className="hidden sm:inline">比較リストに追加</span>
                  <span className="sm:hidden">比較追加</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 概要タブコンポーネント
const OverviewTab = ({ university, isPremium, onUpgradeToPremium }) => {
  const getBasicData = () => {
    const soccerClub = university.soccer_club || {};
    const facilities = university.facilities || {};
    
    return [
      {
        icon: Users,
        label: "部員数",
        value: soccerClub.total_members || 0,
        unit: "名",
        iconColor: "text-blue-600"
      },
      {
        icon: Trophy,
        label: "J内定者",
        value: soccerClub.j_league_nominees_2022_24 || 
               ((soccerClub.j_league_nominees_2022 || 0) + 
                (soccerClub.j_league_nominees_2023 || 0) + 
                (soccerClub.j_league_nominees_2024 || 0)),
        unit: "名",
        subtitle: "過去3年",
        iconColor: "text-yellow-600"
      },
      {
        icon: Home,
        label: "コート数",
        value: facilities.soccer_field_count || soccerClub.soccer_field_count || 0,
        unit: "面",
        iconColor: "text-purple-600"
      }
    ];
  };

  const basicData = getBasicData();

  return (
    <div className="space-y-8">
      {/* 基本データ */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp size={18} className="text-blue-600 mr-2" />
          基本データ
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {basicData.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <Icon size={20} className={metric.iconColor} />
                </div>
                <div className="flex items-baseline space-x-1 mb-1">
                  <span className="text-xl font-bold text-gray-900">{metric.value}</span>
                  <span className="text-sm text-gray-600">{metric.unit}</span>
                </div>
                <p className="text-xs text-gray-500">{metric.label}</p>
                {metric.subtitle && <p className="text-xs text-gray-400">{metric.subtitle}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* 監督・指導体制 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User size={18} className="text-green-600 mr-2" />
          監督・指導体制
          {!isPremium && <PremiumBadge className="ml-2" />}
        </h3>
        
        {isPremium ? (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div>
              <p className="text-sm text-gray-600">監督</p>
              <p className="font-medium text-gray-900 text-lg">
                {university.soccer_club?.coach_name || "情報なし"}
              </p>
            </div>
          </div>
        ) : (
          <MaskedContent 
            reason="監督情報と指導体制の詳細"
            onUpgradeClick={onUpgradeToPremium}
          >
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm text-gray-600">監督</p>
                <p className="font-medium text-gray-900 text-lg">
                  {university.soccer_club?.coach_name || "情報なし"}
                </p>
              </div>
            </div>
          </MaskedContent>
        )}
      </div>

      {/* 施設情報 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building size={18} className="text-indigo-600 mr-2" />
          施設情報
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">グラウンド名</p>
              <p className="font-medium text-gray-900">
                {university.facilities?.ground_name || 
                 university.soccer_club?.practice_location || "情報なし"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">コート数</p>
              <p className="font-medium text-gray-900">
                {university.facilities?.soccer_field_count || 
                 university.soccer_club?.soccer_field_count || 0}面
              </p>
            </div>
          </div>
          
          {!isPremium && university.facilities?.ground_address && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <MaskedContent 
                reason="グラウンドの詳細住所"
                onUpgradeClick={onUpgradeToPremium}
                showPreview={false}
              >
                <div>
                  <p className="text-sm text-gray-600 mb-1">所在地</p>
                  <p className="text-gray-700 text-sm">{university.facilities.ground_address}</p>
                </div>
              </MaskedContent>
            </div>
          )}
          
          {isPremium && university.facilities?.ground_address && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-1">所在地</p>
              <p className="text-gray-700 text-sm">{university.facilities.ground_address}</p>
            </div>
          )}
        </div>
      </div>

      {/* 寮情報 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Home size={18} className="text-purple-600 mr-2" />
          寮情報
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          {university.soccer_club?.dorm_details ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center space-x-2">
                  {university.soccer_club.dorm_details.university_dorm ? (
                    <>
                      <Check size={16} className="text-green-600" />
                      <span className="text-gray-700 text-sm">大学寮</span>
                    </>
                  ) : (
                    <>
                      <X size={16} className="text-red-500" />
                      <span className="text-gray-500 text-sm">大学寮なし</span>
                    </>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {university.soccer_club.dorm_details.soccer_club_dorm ? (
                    <>
                      <Check size={16} className="text-green-600" />
                      <span className="text-gray-700 text-sm">サッカー部寮</span>
                    </>
                  ) : (
                    <>
                      <X size={16} className="text-red-500" />
                      <span className="text-gray-500 text-sm">サッカー部寮なし</span>
                    </>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {university.soccer_club.dorm_details.general_dorm ? (
                    <>
                      <Check size={16} className="text-green-600" />
                      <span className="text-gray-700 text-sm">部員寮</span>
                    </>
                  ) : (
                    <>
                      <X size={16} className="text-red-500" />
                      <span className="text-gray-500 text-sm">部員寮なし</span>
                    </>
                  )}
                </div>
              </div>
              
              {university.soccer_club.dorm_details.dorm_notes && (
                isPremium ? (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">寮について</p>
                    <p className="text-gray-700 text-sm">{university.soccer_club.dorm_details.dorm_notes}</p>
                  </div>
                ) : (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <MaskedContent 
                      reason="寮の詳細情報"
                      onUpgradeClick={onUpgradeToPremium}
                      showPreview={false}
                    >
                      <div>
                        <p className="text-sm text-gray-600 mb-1">寮について</p>
                        <p className="text-gray-700 text-sm">{university.soccer_club.dorm_details.dorm_notes}</p>
                      </div>
                    </MaskedContent>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              {university.soccer_club?.dorm_available ? (
                <>
                  <Check size={20} className="text-green-600" />
                  <span className="text-gray-700 font-medium">寮あり</span>
                </>
              ) : (
                <>
                  <X size={20} className="text-red-500" />
                  <span className="text-gray-700 font-medium">寮なし</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 取得可能資格 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen size={18} className="text-indigo-600 mr-2" />
          取得可能資格
          {!isPremium && <PremiumBadge className="ml-2" />}
        </h3>
        
        {isPremium ? (
          <div className="flex flex-wrap gap-2">
            {university.soccer_club?.qualifications && university.soccer_club.qualifications.length > 0 ? (
              university.soccer_club.qualifications.map((qualification, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm border border-gray-200">
                  {qualification}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm">資格情報は大学にお問い合わせください</span>
            )}
          </div>
        ) : (
          <MaskedContent 
            reason="取得可能な資格一覧"
            onUpgradeClick={onUpgradeToPremium}
          >
            <div className="flex flex-wrap gap-2">
              {university.soccer_club?.qualifications && university.soccer_club.qualifications.length > 0 ? (
                university.soccer_club.qualifications.map((qualification, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm border border-gray-200">
                    {qualification}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-sm">資格情報は大学にお問い合わせください</span>
              )}
            </div>
          </MaskedContent>
        )}
      </div>
    </div>
  );
};

// 入部タブコンポーネント
const AdmissionTab = ({ university, isPremium, onUpgradeToPremium }) => (
  <div className="space-y-8">
    {/* スポーツ推薦セクション - プレミアム限定 */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Zap size={18} className="text-green-600 mr-2" />
        スポーツ推薦
        {!isPremium && <PremiumBadge className="ml-2" />}
      </h3>
      
      {isPremium ? (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          {university.entry_conditions?.sports_recommend ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">利用可能</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">推薦率</p>
                  <p className="font-medium text-gray-900">
                    {university.extended_data?.recommend_ratio || "約70%"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">受入人数</p>
                  <p className="font-medium text-gray-900">
                    {university.entry_conditions?.recommend_people_count || "お問い合わせください"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">基準</p>
                  <p className="font-medium text-gray-900">
                    {university.entry_conditions?.recommend_criteria || "実力・実績による"}
                  </p>
                </div>
              </div>

              {university.entry_conditions?.recommend_criteria_detail && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">詳細な推薦基準</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {university.entry_conditions.recommend_criteria_detail}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">利用不可</span>
              <p className="text-gray-600 text-sm ml-3">スポーツ推薦制度はありません</p>
            </div>
          )}
        </div>
      ) : (
        <MaskedContent 
          reason="スポーツ推薦の詳細条件"
          onUpgradeClick={onUpgradeToPremium}
        >
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {university.entry_conditions?.sports_recommend ? "利用可能" : "利用不可"}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                スポーツ推薦の詳細条件はプレミアム限定情報です
              </div>
            </div>
          </div>
        </MaskedContent>
      )}
    </div>

    {/* セレクションセクション */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Calendar size={18} className="text-blue-600 mr-2" />
        セレクション
      </h3>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        {university.entry_conditions?.selection ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">実施あり</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">実施時期</p>
                <p className="font-medium text-gray-900">
                  {university.entry_conditions?.selection_period || "お問い合わせください"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">募集方法</p>
                <p className="font-medium text-gray-900">公募制</p>
              </div>
            </div>

            {!isPremium && university.extended_data?.selection_details && (
              <MaskedContent 
                reason="セレクションの詳細情報"
                onUpgradeClick={onUpgradeToPremium}
                showPreview={false}
              >
                <div>
                  <p className="text-sm text-gray-600 mb-2">セレクション詳細</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {university.extended_data.selection_details}
                  </p>
                </div>
              </MaskedContent>
            )}
            
            {isPremium && university.extended_data?.selection_details && (
              <div>
                <p className="text-sm text-gray-600 mb-2">セレクション詳細</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {university.extended_data.selection_details}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center">
            <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">実施なし</span>
            <p className="text-gray-600 text-sm ml-3">一般的なセレクションは実施していません</p>
          </div>
        )}
      </div>
    </div>

    {/* 一般入部セクション */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <GraduationCap size={18} className="text-purple-600 mr-2" />
        一般入部
      </h3>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        {university.entry_conditions?.general_admission ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">入部可能</span>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">入部条件</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {university.entry_conditions?.general_conditions || "大学入学後に入部希望届を提出し、体力テスト・面接を経て入部決定"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">入部不可</span>
            <p className="text-gray-600 text-sm ml-3">一般入部は受け付けていません</p>
          </div>
        )}
      </div>
    </div>

    {/* 奨学金制度セクション - プレミアム限定 */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <DollarSign size={18} className="text-yellow-600 mr-2" />
        奨学金制度
        {!isPremium && <PremiumBadge className="ml-2" />}
      </h3>
      
      {isPremium ? (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          {university.soccer_club?.sports_scholarship ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">制度あり</span>
              </div>
              
              {university.extended_data?.scholarship_details ? (
                <div>
                  <p className="text-sm text-gray-600 mb-2">制度詳細</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {university.extended_data.scholarship_details}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    スポーツ奨学金制度を設けています。詳細については大学へお問い合わせください。
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">制度なし</span>
              <p className="text-gray-600 text-sm ml-3">スポーツ特有の奨学金制度はありません</p>
            </div>
          )}
        </div>
      ) : (
        <MaskedContent 
          reason="奨学金制度の詳細"
          onUpgradeClick={onUpgradeToPremium}
        >
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  {university.soccer_club?.sports_scholarship ? "制度あり" : "制度なし"}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                奨学金制度の詳細はプレミアム限定情報です
              </div>
            </div>
          </div>
        </MaskedContent>
      )}
    </div>

    {/* 注意事項 */}
    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
      <h4 className="font-semibold text-gray-900 mb-2">ご注意</h4>
      <ul className="text-sm text-gray-700 space-y-1">
        <li>• 入部条件は年度により変更される場合があります</li>
        <li>• 詳細な条件や手続きについては、必ず大学に直接お問い合わせください</li>
        <li>• 推薦やセレクションの実施時期は前年度を参考にしています</li>
        <li>• 奨学金制度の詳細は大学の学生課またはサッカー部にお問い合わせください</li>
      </ul>
    </div>
  </div>
);

// 費用・お金タブコンポーネント - プレミアム制限対応版
const CostsTab = ({ university, isPremium, onUpgradeToPremium }) => {
  const costs = university.costs || {};
  
  return (
    <div className="space-y-8">
      {/* 大学費用（年額） - 基本情報は無料 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <GraduationCap size={18} className="text-blue-600 mr-2" />
          大学費用（年額）
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">授業料</div>
              <div className="text-lg font-semibold text-gray-900">
                {((costs.university_costs?.annual_tuition || 1200000) / 10000).toFixed(0)}万円
              </div>
              <div className="text-xs text-gray-500 mt-1">年額</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">入学金</div>
              <div className="text-lg font-semibold text-gray-900">
                {((costs.university_costs?.entrance_fee || 300000) / 10000).toFixed(0)}万円
              </div>
              <div className="text-xs text-gray-500 mt-1">入学時のみ</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">施設費</div>
              <div className="text-lg font-semibold text-gray-900">
                {((costs.university_costs?.facility_fee || 150000) / 10000).toFixed(0)}万円
              </div>
              <div className="text-xs text-gray-500 mt-1">年額</div>
            </div>
          </div>
        </div>
      </div>

      {/* サッカー部費用（年額） - プレミアム限定 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users size={18} className="text-green-600 mr-2" />
          サッカー部費用（年額）
          {!isPremium && <PremiumBadge className="ml-2" />}
        </h3>
        
        {isPremium ? (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">部費</div>
                  <div className="text-lg font-semibold text-gray-900">
                    月額{((costs.soccer_club_costs?.monthly_club_fee || 15000) / 10000).toFixed(1)}万円
                  </div>
                  <div className="text-xs text-gray-500 mt-1">年額約{(((costs.soccer_club_costs?.monthly_club_fee || 15000) * 12) / 10000).toFixed(0)}万円</div>
                </div>
                <div className="flex items-start">
                  <Target size={16} className="text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-sm text-gray-600 mb-1">チームウェア代</div>
                    <div className="text-lg font-semibold text-gray-900">
                      年{((costs.soccer_club_costs?.equipment_cost || 80000) / 10000).toFixed(0)}万円
                    </div>
                    <div className="text-xs text-gray-500 mt-1">ユニフォーム・練習着等</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-start mb-3">
                  <MapPin size={16} className="text-purple-600 mr-3 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      合宿・遠征費
                      <span className="ml-2 text-base font-semibold text-purple-700">
                        年約{((costs.soccer_club_costs?.camp_cost || 200000) / 10000).toFixed(0)}万円
                      </span>
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {costs.soccer_club_costs?.camp_travel_description || 
                       "年3回の合宿（春季・夏季・冬季）と関東リーグ戦での遠征があります。合宿費用は1回あたり約8-10万円、遠征費は月2-3回程度で交通費・宿泊費込みで年間約15万円程度を想定してください。"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <MaskedContent 
            reason="サッカー部の詳細な費用情報"
            onUpgradeClick={onUpgradeToPremium}
          >
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  月額部費、チームウェア代、合宿・遠征費の詳細はプレミアム限定情報です
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-500">部費・ウェア代</div>
                    <div className="text-lg font-semibold text-gray-400">●●万円</div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-500">合宿・遠征費</div>
                    <div className="text-lg font-semibold text-gray-400">●●万円</div>
                  </div>
                </div>
              </div>
            </div>
          </MaskedContent>
        )}
      </div>

      {/* 奨学金・支援制度 */}
      {university.soccer_club?.sports_scholarship && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Star size={18} className="text-yellow-600 mr-2" />
            奨学金・支援制度
          </h3>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-start">
              <Star size={20} className="text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800 mb-2">スポーツ奨学金制度あり</h4>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  {university.extended_data?.scholarship_details || 
                   "スポーツ奨学金制度を設けています。詳細については大学へお問い合わせください。実力や実績に応じて、授業料の一部または全額免除の可能性があります。"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 注意事項 */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-semibold text-gray-900 mb-2">ご注意</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 上記は概算金額です。正確な費用は大学にお問い合わせください</li>
          <li>• 奨学金制度により実質負担額が軽減される場合があります</li>
          <li>• 遠征や合宿の回数により年間費用は変動します</li>
          <li>• 教材費や保険料等は含まれていません</li>
          <li>• チームウェア代には練習着・試合用ユニフォーム・トレーニングシューズ等が含まれます</li>
        </ul>
      </div>
    </div>
  );
};

// 施設・環境タブコンポーネント - プレミアム制限対応版
const FacilitiesTab = ({ university, isPremium, onUpgradeToPremium }) => {
  const facilities = university.facilities || {};
  const soccerClub = university.soccer_club || {};
  
  return (
    <div className="space-y-8">
      {/* グラウンド・練習施設 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building size={18} className="text-green-600 mr-2" />
          グラウンド・練習施設
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">グラウンド名</p>
                <p className="font-medium text-gray-900 flex items-center">
                  <MapPin size={16} className="text-blue-600 mr-2" />
                  {facilities.ground_name || soccerClub.practice_location || "情報なし"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">サッカーコート数</p>
                <p className="font-medium text-gray-900">
                  {facilities.soccer_field_count || soccerClub.soccer_field_count || 0}面
                </p>
              </div>
            </div>
            
            {/* グラウンド住所 - プレミアム限定 */}
            {facilities.ground_address && (
              isPremium ? (
                <div>
                  <p className="text-sm text-gray-600 mb-1">グラウンド住所</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {facilities.ground_address}
                  </p>
                </div>
              ) : (
                <MaskedContent 
                  reason="グラウンドの詳細住所"
                  onUpgradeClick={onUpgradeToPremium}
                  showPreview={false}
                >
                  <div>
                    <p className="text-sm text-gray-600 mb-1">グラウンド住所</p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {facilities.ground_address}
                    </p>
                  </div>
                </MaskedContent>
              )
            )}
            
            {/* グラウンド特記事項 - プレミアム限定 */}
            {facilities.ground_notes && (
              isPremium ? (
                <div>
                  <p className="text-sm text-gray-600 mb-2">グラウンド特記事項</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {facilities.ground_notes}
                  </p>
                </div>
              ) : (
                <MaskedContent 
                  reason="グラウンドの詳細情報"
                  onUpgradeClick={onUpgradeToPremium}
                  showPreview={false}
                >
                  <div>
                    <p className="text-sm text-gray-600 mb-2">グラウンド特記事項</p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {facilities.ground_notes}
                    </p>
                  </div>
                </MaskedContent>
              )
            )}
          </div>
        </div>
      </div>

      {/* 寮について */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Home size={18} className="text-purple-600 mr-2" />
          寮について
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="space-y-3">
              {soccerClub.dorm_details ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center space-x-2">
                      {soccerClub.dorm_details.university_dorm ? (
                        <>
                          <Check size={16} className="text-green-600" />
                          <span className="text-gray-700 text-sm font-medium">大学寮あり</span>
                        </>
                      ) : (
                        <>
                          <X size={16} className="text-red-500" />
                          <span className="text-gray-500 text-sm">大学寮なし</span>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {soccerClub.dorm_details.soccer_club_dorm ? (
                        <>
                          <Check size={16} className="text-green-600" />
                          <span className="text-gray-700 text-sm font-medium">サッカー部寮あり</span>
                        </>
                      ) : (
                        <>
                          <X size={16} className="text-red-500" />
                          <span className="text-gray-500 text-sm">サッカー部寮なし</span>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {soccerClub.dorm_details.general_dorm ? (
                        <>
                          <Check size={16} className="text-green-600" />
                          <span className="text-gray-700 text-sm font-medium">部員寮あり</span>
                        </>
                      ) : (
                        <>
                          <X size={16} className="text-red-500" />
                          <span className="text-gray-500 text-sm">部員寮なし</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* 寮特記事項 - プレミアム限定 */}
                  {soccerClub.dorm_details.dorm_notes && (
                    isPremium ? (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">寮特記事項</p>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {soccerClub.dorm_details.dorm_notes}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <MaskedContent 
                          reason="寮の詳細情報"
                          onUpgradeClick={onUpgradeToPremium}
                          showPreview={false}
                        >
                          <div>
                            <p className="text-sm text-gray-600 mb-2">寮特記事項</p>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {soccerClub.dorm_details.dorm_notes}
                            </p>
                          </div>
                        </MaskedContent>
                      </div>
                    )
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  {soccerClub.dorm_available ? (
                    <>
                      <Check size={20} className="text-green-600" />
                      <span className="text-gray-700 font-medium">寮あり</span>
                    </>
                  ) : (
                    <>
                      <X size={20} className="text-red-500" />
                      <span className="text-gray-700 font-medium">寮なし</span>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {!soccerClub.dorm_available && !soccerClub.dorm_details?.university_dorm && 
             !soccerClub.dorm_details?.soccer_club_dorm && !soccerClub.dorm_details?.general_dorm && (
              <div>
                <p className="text-gray-600 text-sm">
                  部員寮はありませんが、大学近辺には学生向けアパートや下宿が充実しています。
                  住環境についてはサッカー部または学生課にお問い合わせください。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* その他の施設情報 - プレミアム限定 */}
      {(facilities.ground_name || facilities.ground_address || facilities.ground_notes) && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Info size={18} className="text-blue-600 mr-2" />
            アクセス・その他
            {!isPremium && <PremiumBadge className="ml-2" />}
          </h3>
          
          {isPremium ? (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="space-y-3">
                {facilities.ground_address && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">アクセス</p>
                    <p className="text-gray-700 text-sm">
                      最寄り駅や交通アクセスについては、大学公式サイトまたはサッカー部にお問い合わせください。
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <MaskedContent 
              reason="詳細なアクセス情報"
              onUpgradeClick={onUpgradeToPremium}
            >
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">アクセス</p>
                    <p className="text-gray-700 text-sm">
                      最寄り駅や交通アクセスについては、大学公式サイトまたはサッカー部にお問い合わせください。
                    </p>
                  </div>
                </div>
              </div>
            </MaskedContent>
          )}
        </div>
      )}

      {/* 注意事項 */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-semibold text-gray-900 mb-2">ご注意</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 施設の利用時間や利用条件は変更される場合があります</li>
          <li>• 寮の入居条件や費用については直接お問い合わせください</li>
          <li>• 練習施設の詳細や見学については事前にご連絡ください</li>
          <li>• 天候等により練習場所が変更される場合があります</li>
          <li>• グラウンドの住所や詳細なアクセス方法は大学またはサッカー部にお問い合わせください</li>
        </ul>
      </div>
    </div>
  );
};

// 進路・将来性タブコンポーネント - プレミアム制限対応版
const CareersTab = ({ university, isPremium, onUpgradeToPremium }) => {
  const careerInfo = university.career_info || {};
  const careerSupport = university.career_support || {};
  
  return (
    <div className="space-y-8">
      {/* 大学全体の卒業後の進路 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <GraduationCap size={18} className="text-blue-600 mr-2" />
          大学全体の卒業後の進路
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-3">主な進路先</p>
            
            {careerInfo.university_career_paths ? (
              <div className="mb-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {careerInfo.university_career_paths}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "一般企業（金融・商社・メーカー等）",
                  "公務員（国家・地方）",
                  "教員（中学・高校）",
                  "大学院進学",
                  "起業・独立",
                  "その他"
                ].map((path, index) => (
                  <div key={index} className="flex items-center py-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{path}</span>
                  </div>
                ))}
              </div>
            )}
            
            {careerSupport.university_support && (
              isPremium ? (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">キャリアサポート</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {careerSupport.university_support}
                  </p>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <MaskedContent 
                    reason="キャリアサポートの詳細"
                    onUpgradeClick={onUpgradeToPremium}
                    showPreview={false}
                  >
                    <div>
                      <p className="text-sm text-gray-600 mb-2">キャリアサポート</p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {careerSupport.university_support}
                      </p>
                    </div>
                  </MaskedContent>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* サッカー部の卒業後の進路 - プレミアム限定 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users size={18} className="text-green-600 mr-2" />
          サッカー部の卒業後の進路
          {!isPremium && <PremiumBadge className="ml-2" />}
        </h3>
        
        {isPremium ? (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-3">主な進路先</p>
              
              {careerInfo.soccer_club_career_paths ? (
                <div className="mb-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {careerInfo.soccer_club_career_paths}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "指導者（コーチ・監督）",
                    "教員（保健体育）",
                    "一般企業（営業・企画等）",
                    "Jリーグ関連（クラブ職員・審判等）",
                    "社会人チーム",
                    "スポーツ関連企業",
                    "その他"
                  ].map((path, index) => (
                    <div key={index} className="flex items-center py-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{path}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {careerSupport.soccer_club_support && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">部独自のサポート</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {careerSupport.soccer_club_support}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <MaskedContent 
            reason="サッカー部の詳細な進路情報"
            onUpgradeClick={onUpgradeToPremium}
          >
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-3">主な進路先</p>
                <div className="text-sm text-gray-600">
                  サッカー部の詳細な進路情報はプレミアム限定です
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 opacity-50">
                  {[
                    "指導者（コーチ・監督）",
                    "教員（保健体育）",
                    "一般企業（営業・企画等）",
                    "Jリーグ関連",
                    "社会人チーム",
                    "その他"
                  ].map((path, index) => (
                    <div key={index} className="flex items-center py-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-400 text-sm">{path}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MaskedContent>
        )}
      </div>

      {/* 進路統計 - プレミアム限定 */}
      {careerInfo.career_paths && Array.isArray(careerInfo.career_paths) && careerInfo.career_paths.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp size={18} className="text-purple-600 mr-2" />
            進路統計
            {!isPremium && <PremiumBadge className="ml-2" />}
          </h3>
          
          {isPremium ? (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-3">進路別の割合</p>
                <div className="space-y-3">
                  {careerInfo.career_paths.map((path, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700 text-sm font-medium">{path.category}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${path.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-900 font-medium text-sm min-w-[40px] text-right">
                          {path.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <MaskedContent 
              reason="詳細な進路統計データ"
              onUpgradeClick={onUpgradeToPremium}
            >
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-3">進路別の割合</p>
                  <div className="text-sm text-gray-600">
                    詳細な進路統計はプレミアム限定情報です
                  </div>
                  <div className="space-y-3 opacity-50">
                    {["一般企業", "指導者", "教員", "その他"].map((category, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm font-medium">{category}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-gray-400 h-2 rounded-full w-1/2"></div>
                          </div>
                          <span className="text-gray-400 font-medium text-sm min-w-[40px] text-right">
                            ●●%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MaskedContent>
          )}
        </div>
      )}

      {/* J内定実績と進路の関連性 */}
      {university.soccer_club?.j_league_nominees_2022_24 > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Trophy size={18} className="text-yellow-600 mr-2" />
            プロ志向者向け情報
          </h3>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 mb-3">
                <Trophy size={20} className="text-yellow-600" />
                <span className="font-semibold text-yellow-800">
                  過去3年でJリーグ内定者 {university.soccer_club.j_league_nominees_2022_24}名
                </span>
              </div>
              
              <div className="text-sm text-yellow-700 space-y-2">
                <p>• この大学はプロ選手輩出の実績があります</p>
                <p>• プロを目指す環境やサポート体制が期待できます</p>
                <p>• OB・OGのネットワークがプロ志向者に有利に働く可能性があります</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 注意事項 */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-semibold text-gray-900 mb-2">ご注意</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 進路情報は過去の実績に基づく参考情報です</li>
          <li>• 年度により進路先の傾向は変動する可能性があります</li>
          <li>• 詳細な進路状況は大学キャリアセンターにお問い合わせください</li>
          <li>• サッカー部独自の進路支援については部へ直接お問い合わせください</li>
          <li>• 個別の進路相談については、大学説明会やオープンキャンパスをご利用ください</li>
        </ul>
      </div>
    </div>
  );
};

// 口コミ・評判タブコンポーネント - プレミアム制限対応版
const ReviewsTab = ({ university, isPremium, onUpgradeToPremium }) => {
  const reviews = university.reviews || {};
  
  return (
    <div className="space-y-8">
      {/* 現役部員の声 - プレミアム限定 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MessageSquare size={18} className="text-blue-600 mr-2" />
          現役部員の声
          {!isPremium && <PremiumBadge className="ml-2" />}
        </h3>
        
        {isPremium ? (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="space-y-4">
              {reviews.student_reviews?.map((review, index) => (
                <div key={index} className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-blue-800">{review.grade}</span>
                      <span className="text-sm text-blue-600">{review.position}</span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.review}</p>
                </div>
              )) || (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-blue-800">3年生</span>
                      <span className="text-sm text-blue-600">MF</span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < 4 ? "text-yellow-500 fill-current" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">監督の指導が的確で技術的に成長できました。寮生活でチームワークも向上し、人間的にも大きく成長できています。</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <MaskedContent 
            reason="現役部員の詳細な口コミ"
            onUpgradeClick={onUpgradeToPremium}
          >
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-3">
                  現役部員からの詳細な評価や体験談はプレミアム限定です
                </div>
                <div className="pb-4 border-b border-gray-200 opacity-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-400">●年生</span>
                      <span className="text-sm text-gray-400">●●</span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-gray-300" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400">実際の部員からの生の声をお聞きいただけます...</p>
                </div>
              </div>
            </div>
          </MaskedContent>
        )}
      </div>

      {/* 保護者の声 - プレミアム限定 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users size={18} className="text-green-600 mr-2" />
          保護者の声
          {!isPremium && <PremiumBadge className="ml-2" />}
        </h3>
        
        {isPremium ? (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="space-y-4">
              {reviews.parent_reviews?.map((review, index) => (
                <div key={index} className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-green-800">保護者</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.review}</p>
                </div>
              )) || (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-green-800">保護者</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < 4 ? "text-yellow-500 fill-current" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">費用は決して安くありませんが、子供の成長を考えると納得できます。コーチの方々も親身に相談に乗ってくれて、とても信頼しています。</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <MaskedContent 
            reason="保護者からの詳細な評価"
            onUpgradeClick={onUpgradeToPremium}
          >
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-3">
                  保護者からの詳細な評価はプレミアム限定です
                </div>
                <div className="pb-4 border-b border-gray-200 opacity-50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-400">保護者</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-gray-300" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400">保護者目線での大学評価をご確認いただけます...</p>
                </div>
              </div>
            </div>
          </MaskedContent>
        )}
      </div>

      {/* 卒業生の声 - プレミアム限定 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <GraduationCap size={18} className="text-purple-600 mr-2" />
          卒業生の声
          {!isPremium && <PremiumBadge className="ml-2" />}
        </h3>
        
        {isPremium ? (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="space-y-4">
              {reviews.graduate_reviews?.map((review, index) => (
                <div key={index} className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-purple-800">{review.graduation_year}年卒</span>
                    <span className="text-sm text-purple-600">{review.current_status}</span>
                  </div>
                  <p className="text-gray-700">{review.review}</p>
                </div>
              )) || (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-purple-800">2023年卒</span>
                    <span className="text-sm text-purple-600">社会人チーム所属</span>
                  </div>
                  <p className="text-gray-700">4年間で人間的にも競技的にも大きく成長できました。社会人になった今でも、大学で学んだチームワークや規律が役立っています。</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <MaskedContent 
            reason="卒業生の体験談"
            onUpgradeClick={onUpgradeToPremium}
          >
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-3">
                  卒業生の体験談はプレミアム限定です
                </div>
                <div className="pb-4 border-b border-gray-200 opacity-50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-400">●●年卒</span>
                    <span className="text-sm text-gray-400">●●●</span>
                  </div>
                  <p className="text-gray-400">卒業後の進路や大学生活の振り返りをお聞きいただけます...</p>
                </div>
              </div>
            </div>
          </MaskedContent>
        )}
      </div>

      {/* 口コミ投稿の案内 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Plus size={18} className="text-orange-600 mr-2" />
          口コミを投稿する
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-3">あなたの体験談もお聞かせください</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            口コミを投稿する
          </button>
        </div>
      </div>

      {/* 注意事項 */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-semibold text-gray-900 mb-2">ご注意</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 口コミは個人の感想・体験談であり、大学の公式見解ではありません</li>
          <li>• 投稿内容の真偽について当サイトでは責任を負いかねます</li>
          <li>• 最新の情報については直接大学にお問い合わせください</li>
          <li>• 不適切な投稿は予告なく削除する場合があります</li>
        </ul>
      </div>
    </div>
  );
};

export default EnhancedUniversityDetails;