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
  Calendar,
  Crown
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

  // PLAYMAKERコメントの取得とマスク処理（60文字制限）
  const getPlaymakerComment = () => {
    if (!university) return "大学データが読み込み中です。";
    
    const fullComment = university.extended_data?.playmaker_comment || 
                       "この大学の詳細な評価情報は準備中です。";
    
    if (!isPremium && fullComment.length > 60) {
      // フリープランでは60文字で切り詰め
      return fullComment.substring(0, 60) + "...";
    }
    
    return fullComment;
  };

  // プレミアム限定情報かどうかの判定（60文字制限）
  const isPremiumContent = () => {
    if (!university) return false;
    
    const comment = university.extended_data?.playmaker_comment || "";
    return !isPremium && comment.length > 60;
  };

  // バッジ色分け関数
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

  // 志向性の取得
  const getGenres = () => {
    if (university.genres && Array.isArray(university.genres) && university.genres.length > 0) {
      return university.genres.filter(genre => genre && genre.trim() !== '');
    }
    
    const genres = [];
    if (university.genre1 && university.genre1.trim()) genres.push(university.genre1);
    if (university.genre2 && university.genre2.trim()) genres.push(university.genre2);
    
    return genres;
  };

  // 練習場所の取得（SimpleUniversityCardと統一）
  const getPracticeLocationWithArea = () => {
    if (!university) return '';
    
    // グラウンド住所から都道府県+市を抽出（正しいパス）
    const groundAddress = university.facilities?.ground_address || '';
    
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
    } else {
      onAddToCompare(university);
    }
  };

  // データ取得
  const genres = getGenres();
  const academicRank = university?.academic_rank || '';
  const practiceLocationWithArea = getPracticeLocationWithArea();
  const league = university.soccer_club?.league || '';
  const playmakerComment = getPlaymakerComment();
  const hasPremiumContent = isPremiumContent();

  return (
    <div className="bg-white min-h-screen">
      {/* ヒーローセクション */}
      <div className="relative bg-white border-b border-gray-200">
        {/* コンテンツ */}
        <div className="relative px-4 py-8 lg:py-12">
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
              
              {/* バッジエリア */}
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
                  {league && (
                    <div className="flex">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getLeagueColor(league)}`}>
                        {league}
                      </span>
                    </div>
                  )}
                  
                  {practiceLocationWithArea && (
                    <div className="flex">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200">
                        <MapPin size={14} className="mr-1" />
                        {practiceLocationWithArea}
                      </span>
                    </div>
                  )}

                  {genres.length > 0 && (
                    <div className="flex">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getGenreColor(genres[0])}`}>
                        <Target size={14} className="mr-1" />
                        {genres[0]}
                      </span>
                    </div>
                  )}
                  
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
            <div className="border border-green-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                PLAYMAKERコメント
                {hasPremiumContent && <PremiumBadge className="ml-2" />}
              </h2>
              
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  {playmakerComment}
                </p>
                
                {hasPremiumContent && (
                  <div className="relative">
                    <MaskedContent 
                      reason="コメント全文はプレミアム限定"
                      onUpgradeClick={onUpgradeToPremium}
                    >
                      <p className="text-gray-700 leading-relaxed">
                        {university.extended_data.playmaker_comment}
                      </p>
                    </MaskedContent>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 比較機能バナー（フリープランのみ） */}
      {!isPremium && (
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-4">
            <MaskedBanner 
              title="比較機能はプレミアム限定"
              description="複数の大学を詳細に比較検討できる機能は、プレミアムプランでご利用いただけます。"
              onUpgradeClick={onUpgradeToPremium}
              className=""
            />
          </div>
        </div>
      )}

      {/* ナビゲーションタブ - フルワイド版 */}
      <div className="border-b border-gray-200">
        <div className="relative">
          <div 
            ref={tabContainerRef}
            className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide px-4"
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
      </div>

      {/* タブコンテンツエリア - フルワイド版 */}
      <div className="border-b border-gray-200">
        <div className="px-4 py-8 lg:py-12">
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

      {/* アクションエリア - フルワイド版 */}
      <div className="border-b border-gray-200">
        <div className="px-4 py-6">
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
  );
};


// 概要タブコンポーネント
const OverviewTab = ({ university, isPremium, onUpgradeToPremium }) => {
  const getBasicData = () => {
    const soccerClub = university.soccer_club || {};
    
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
        value: soccerClub.soccer_field_count || 0, // 修正: facilitiesから削除
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
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {basicData.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index}>
                  <div className="flex items-center mb-2">
                    <Icon size={20} className={`${metric.iconColor} mr-2`} />
                    <span className="text-sm text-gray-600">{metric.label}</span>
                  </div>
                  <div className="flex items-baseline space-x-1 mb-1">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <span className="text-sm text-gray-600">{metric.unit}</span>
                  </div>
                  {metric.subtitle && <p className="text-xs text-gray-500">{metric.subtitle}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 監督名 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User size={18} className="text-green-600 mr-2" />
          監督名
        </h3>
        
        <div className="border border-gray-200 p-6 rounded-lg">
          <div>
            <p className="text-sm text-gray-600 mb-1">監督</p>
            <p className="font-medium text-gray-900 text-xl">
              {university.soccer_club?.coach_name || "現在準備中"}
            </p>
          </div>
        </div>
      </div>

      {/* 所属リーグ（全カテゴリー） - 修正版 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Trophy size={18} className="text-indigo-600 mr-2" />
          所属リーグ（全カテゴリー）
          {!isPremium && <PremiumBadge className="ml-2" />}
        </h3>
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="space-y-4">
            {/* トップチーム - 常に表示 */}
            <div>
              <p className="text-sm text-gray-600 mb-1">トップチーム</p>
              <p className="font-medium text-gray-900 text-lg">
                {university.soccer_club?.league || "現在準備中"}
              </p>
            </div>
            
            {/* その他のカテゴリー - プレミアム限定 */}
            {isPremium ? (
              <div>
                <p className="text-sm text-gray-600 mb-2">その他のカテゴリー</p>
                {university.soccer_club?.all_categories && university.soccer_club.all_categories.length > 0 ? (
                  <div className="space-y-2">
                    {university.soccer_club.all_categories.map((category, index) => (
                      <div key={index} className="flex items-center py-1">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">{category}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-medium text-gray-900 text-lg">現在準備中</p>
                )}
              </div>
            ) : (
              <MaskedContent 
                reason="その他のカテゴリー情報"
                onUpgradeClick={onUpgradeToPremium}
                showPreview={false}
              >
                <div>
                  <p className="text-sm text-gray-600 mb-2">その他のカテゴリー</p>
                  <div className="space-y-2">
                    <div className="flex items-center py-1">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 font-medium">セカンドチーム○○リーグ</span>
                    </div>
                    <div className="flex items-center py-1">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 font-medium">フレッシュマンリーグ</span>
                    </div>
                  </div>
                </div>
              </MaskedContent>
            )}
          </div>
        </div>
      </div>

      {/* 部員の主な所属学部 - 修正版 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen size={18} className="text-purple-600 mr-2" />
          部員の主な所属学部
          {!isPremium && <PremiumBadge className="ml-2" />}
        </h3>
        
        {isPremium ? (
          <div className="border border-gray-200 p-6 rounded-lg">
            {university.main_faculties && university.main_faculties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {university.main_faculties.map((faculty, index) => (
                  <div key={index} className="flex items-center py-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{faculty}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">現在準備中</p>
              </div>
            )}
          </div>
        ) : (
          <MaskedContent 
            reason="部員の主な所属学部情報"
            onUpgradeClick={onUpgradeToPremium}
          >
            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center py-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">スポーツ科学部</span>
                </div>
                <div className="flex items-center py-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">商学部</span>
                </div>
                <div className="flex items-center py-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">法学部</span>
                </div>
              </div>
            </div>
          </MaskedContent>
        )}
      </div>

      {/* 目指せる職業 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Briefcase size={18} className="text-orange-600 mr-2" />
          目指せる職業
        </h3>
        
        <div className="border border-gray-200 p-6 rounded-lg">
          {university.career_info?.possible_careers && university.career_info.possible_careers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {university.career_info.possible_careers.map((career, index) => (
                <div key={index} className="flex items-center py-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">{career}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">現在準備中</p>
            </div>
          )}
        </div>
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
        <div className="border border-gray-200 p-6 rounded-lg">
          {university.entry_conditions?.sports_recommend ? (
            <div className="space-y-4">
              <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center">
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">利用可能</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">受入人数</p>
                  <p className="font-medium text-gray-900 text-lg">
                    {university.entry_conditions?.recommend_people_count || "現在準備中"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">基準評定</p>
                  <p className="font-medium text-gray-900 text-lg">
                    {university.entry_conditions?.recommend_criteria || "現在準備中"}
                  </p>
                </div>
              </div>

              {university.entry_conditions?.recommend_criteria_detail && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">詳細な推薦基準</p>
                  <p className="text-gray-700 leading-relaxed">
                    {university.entry_conditions.recommend_criteria_detail}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center">
              <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">利用不可</span>
              <p className="text-gray-600 sm:ml-3">スポーツ推薦制度はありません</p>
            </div>
          )}
        </div>
      ) : (
        <MaskedContent 
          reason="スポーツ推薦の詳細情報"
          onUpgradeClick={onUpgradeToPremium}
          showPreview={false}
        >
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="space-y-4">
              <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center">
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {university.entry_conditions?.sports_recommend ? "利用可能" : "利用不可"}
                </span>
              </div>
              <div className="text-gray-600">
                スポーツ推薦の詳細情報はプレミアム限定です
              </div>
            </div>
          </div>
        </MaskedContent>
      )}
    </div>

    {/* セレクションセクション - プレミアム限定（修正版） */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Calendar size={18} className="text-blue-600 mr-2" />
        セレクション
        {!isPremium && <PremiumBadge className="ml-2" />}
      </h3>
      
      {isPremium ? (
        <div className="border border-gray-200 p-6 rounded-lg">
          {university.entry_conditions?.selection ? (
            <div className="space-y-4">
              <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">実施あり</span>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">実施時期</p>
                <p className="font-medium text-gray-900 text-lg">
                  {university.entry_conditions?.selection_period || "現在準備中"}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center">
              <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">実施なし</span>
              <p className="text-gray-600 sm:ml-3">セレクションは実施していません</p>
            </div>
          )}
        </div>
      ) : (
        <MaskedContent 
          reason="セレクションの詳細情報"
          onUpgradeClick={onUpgradeToPremium}
          showPreview={false}
        >
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="space-y-4">
              <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {university.entry_conditions?.selection ? "実施あり" : "実施なし"}
                </span>
              </div>
              <div className="text-gray-600">
                セレクションの詳細情報はプレミアム限定です
              </div>
            </div>
          </div>
        </MaskedContent>
      )}
    </div>

    {/* 一般入部セクション - プレミアム限定（修正版：入部条件コメントを常に表示） */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <GraduationCap size={18} className="text-purple-600 mr-2" />
        一般入部
        {!isPremium && <PremiumBadge className="ml-2" />}
      </h3>
      
      {isPremium ? (
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="space-y-4">
            <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                university.entry_conditions?.general_admission
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {university.entry_conditions?.general_admission ? "入部可能" : "入部不可"}
              </span>
              {!university.entry_conditions?.general_admission && (
                <p className="text-gray-600 sm:ml-3">一般入部は受け付けていません</p>
              )}
            </div>
            
            {/* 修正: 入部条件コメントを常に表示 */}
            {university.entry_conditions?.general_conditions && (
              <div>
                <p className="text-sm text-gray-600 mb-2">入部条件</p>
                <p className="text-gray-700 leading-relaxed">
                  {university.entry_conditions.general_conditions}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <MaskedContent 
          reason="一般入部の詳細情報"
          onUpgradeClick={onUpgradeToPremium}
          showPreview={false}
        >
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="space-y-4">
              <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  university.entry_conditions?.general_admission
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {university.entry_conditions?.general_admission ? "入部可能" : "入部不可"}
                </span>
              </div>
              <div className="text-gray-600">
                一般入部の詳細情報はプレミアム限定です
              </div>
            </div>
          </div>
        </MaskedContent>
      )}
    </div>

    {/* 注意事項 */}
    <div className="border border-blue-200 border-l-4 p-4 rounded">
      <h4 className="font-semibold text-gray-900 mb-2">ご注意</h4>
      <ul className="text-sm text-gray-700 space-y-1">
        <li>• 入部条件は年度により変更される場合があります</li>
        <li>• 詳細な条件や手続きについては、必ず大学に直接お問い合わせください</li>
        <li>• 推薦やセレクションの実施時期は前年度を参考にしています</li>
        <li>• 入部条件の詳細情報はプレミアムプランでご確認いただけます</li>
      </ul>
    </div>
  </div>
);

// 費用・お金タブコンポーネント - プレミアム制限対応版
const CostsTab = ({ university, isPremium, onUpgradeToPremium }) => {
  const costs = university.costs || {};
  
  return (
    <div className="space-y-8">
      {/* 大学費用（授業料・入学金・施設費） - 基本情報は無料 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <GraduationCap size={18} className="text-blue-600 mr-2" />
          大学費用
        </h3>
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">授業料</div>
              <div className="text-2xl font-bold text-gray-900">
                {costs.university_costs?.annual_tuition 
                  ? `${((costs.university_costs.annual_tuition) / 10000).toFixed(0)}万円`
                  : "現在準備中"
                }
              </div>
              <div className="text-xs text-gray-500 mt-1">年額</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">入学金</div>
              <div className="text-2xl font-bold text-gray-900">
                {costs.university_costs?.entrance_fee 
                  ? `${((costs.university_costs.entrance_fee) / 10000).toFixed(0)}万円`
                  : "現在準備中"
                }
              </div>
              <div className="text-xs text-gray-500 mt-1">入学時のみ</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">施設費</div>
              <div className="text-2xl font-bold text-gray-900">
                {costs.university_costs?.facility_fee 
                  ? `${((costs.university_costs.facility_fee) / 10000).toFixed(0)}万円`
                  : "現在準備中"
                }
              </div>
              <div className="text-xs text-gray-500 mt-1">年額</div>
            </div>
          </div>
        </div>
      </div>

      {/* サッカー部費用 - プレミアム限定 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users size={18} className="text-green-600 mr-2" />
          サッカー部費用
          {!isPremium && <PremiumBadge className="ml-2" />}
        </h3>
        
        {isPremium ? (
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">部費</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {costs.soccer_club_costs?.monthly_club_fee 
                      ? `月額${((costs.soccer_club_costs.monthly_club_fee) / 10000).toFixed(1)}万円`
                      : "現在準備中"
                    }
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {costs.soccer_club_costs?.monthly_club_fee 
                      ? `年額約${(((costs.soccer_club_costs.monthly_club_fee) * 12) / 10000).toFixed(0)}万円`
                      : ""
                    }
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">チームウェア代</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {costs.soccer_club_costs?.equipment_cost 
                      ? `年${((costs.soccer_club_costs.equipment_cost) / 10000).toFixed(0)}万円`
                      : "現在準備中"
                    }
                  </div>
                  <div className="text-xs text-gray-500 mt-1">ユニフォーム・練習着等</div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="mb-3">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    合宿・遠征費
                    <span className="ml-2 text-base font-semibold text-purple-700">
                      {costs.soccer_club_costs?.camp_cost 
                        ? `年約${((costs.soccer_club_costs.camp_cost) / 10000).toFixed(0)}万円`
                        : "現在準備中"
                      }
                    </span>
                  </h4>
                  {/* 修正: 存在しないcamp_travel_descriptionを削除し、一般的な説明に変更 */}
                  <p className="text-gray-700 leading-relaxed">
                    夏季・春季合宿、リーグ戦遠征、各種大会参加費等が含まれます。詳細は大学にお問い合わせください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <MaskedContent 
            reason="サッカー部の詳細な費用情報"
            onUpgradeClick={onUpgradeToPremium}
            showPreview={false}
          >
            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="space-y-4">
                <div className="text-gray-600 mb-3">
                  月額部費、チームウェア代、合宿・遠征費の詳細はプレミアム限定情報です
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-gray-200 p-3 rounded">
                    <div className="text-sm text-gray-500">部費・ウェア代</div>
                    <div className="text-lg font-semibold text-gray-400">●●万円</div>
                  </div>
                  <div className="border border-gray-200 p-3 rounded">
                    <div className="text-sm text-gray-500">合宿・遠征費</div>
                    <div className="text-lg font-semibold text-gray-400">●●万円</div>
                  </div>
                </div>
              </div>
            </div>
          </MaskedContent>
        )}
      </div>

      {/* 特待生制度 - プレミアム限定（修正版） */}
      {university.entry_conditions?.scholarship_available ? (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Star size={18} className="text-yellow-600 mr-2" />
            特待生制度
            {!isPremium && <PremiumBadge className="ml-2" />}
          </h3>
          
          {isPremium ? (
            <div className="border border-yellow-200 p-6 rounded-lg">
              <div className="flex items-start">
                <Star size={20} className="text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">スポーツ特待生制度あり</h4>
                  <p className="text-yellow-700 leading-relaxed">
                    {university.entry_conditions?.scholarship_details || 
                     "詳細については大学にお問い合わせください。"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <MaskedContent 
              reason="特待生制度の詳細情報"
              onUpgradeClick={onUpgradeToPremium}
              showPreview={false}
            >
              <div className="border border-yellow-200 p-6 rounded-lg">
                <div className="flex items-start">
                  <Star size={20} className="text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-2">スポーツ特待生制度あり</h4>
                    <div className="text-gray-600">
                      特待生制度の詳細情報はプレミアム限定です
                    </div>
                  </div>
                </div>
              </div>
            </MaskedContent>
          )}
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Star size={18} className="text-yellow-600 mr-2" />
            特待生制度
            {!isPremium && <PremiumBadge className="ml-2" />}
          </h3>
          
          {isPremium ? (
            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="flex items-start">
                <X size={20} className="text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">特待生制度なし</h4>
                  <p className="text-gray-600 leading-relaxed">
                    この大学ではスポーツ特待生制度は実施されていません。
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <MaskedContent 
              reason="特待生制度の詳細情報"
              onUpgradeClick={onUpgradeToPremium}
              showPreview={false}
            >
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="flex items-start">
                  <Star size={20} className="text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">特待生制度</h4>
                    <div className="text-gray-600">
                      特待生制度の詳細情報はプレミアム限定です
                    </div>
                  </div>
                </div>
              </div>
            </MaskedContent>
          )}
        </div>
      )}

      {/* 注意事項 */}
      <div className="border border-blue-200 border-l-4 p-4 rounded">
        <h4 className="font-semibold text-gray-900 mb-2">ご注意</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 上記は概算金額です。正確な費用は大学にお問い合わせください</li>
          <li>• 特待生制度により実質負担額が軽減される場合があります</li>
          <li>• 遠征や合宿の回数により年間費用は変動します</li>
          <li>• 教材費や保険料等は含まれていません</li>
          <li>• チームウェア代には練習着・試合用ユニフォーム・トレーニングシューズ等が含まれます</li>
          <li>• サッカー部費用と特待生制度の詳細はプレミアムプランでご確認いただけます</li>
        </ul>
      </div>
    </div>
  );
};


// 施設タブコンポーネント
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
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="space-y-4">
            {/* 基本情報（無料） */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">グラウンド名</p>
                <p className="font-medium text-gray-900 flex items-center text-lg">
                  <MapPin size={16} className="text-blue-600 mr-2" />
                  {facilities.ground_name || "現在準備中"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">サッカーコート数</p>
                <p className="font-medium text-gray-900 text-lg">
                  {/* 修正: facilitiesから削除 */}
                  {soccerClub.soccer_field_count || "現在準備中"}
                  {soccerClub.soccer_field_count && "面"}
                </p>
              </div>
            </div>
            
            {/* 詳細情報 - プレミアム限定 */}
            {(facilities.ground_address || facilities.ground_notes) && (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center mb-4">
                  <h4 className="text-sm font-semibold text-gray-900">詳細情報</h4>
                  {!isPremium && <PremiumBadge className="ml-2" size="xs" />}
                </div>
                
                {isPremium ? (
                  <div className="space-y-4">
                    {facilities.ground_address && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">グラウンド住所</p>
                        <p className="text-gray-700 leading-relaxed">
                          {facilities.ground_address}
                        </p>
                      </div>
                    )}
                    
                    {facilities.ground_notes && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">グラウンド特記事項</p>
                        <p className="text-gray-700 leading-relaxed">
                          {facilities.ground_notes}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <MaskedContent 
                    reason="グラウンドの詳細情報"
                    onUpgradeClick={onUpgradeToPremium}
                    showPreview={true}
                  >
                    <div className="space-y-4">
                      {facilities.ground_address && (
                        <div>
                          <p className="text-sm text-gray-600 mb-1">グラウンド住所</p>
                          <p className="text-gray-700 leading-relaxed">
                            {facilities.ground_address}
                          </p>
                        </div>
                      )}
                      
                      {facilities.ground_notes && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">グラウンド特記事項</p>
                          <p className="text-gray-700 leading-relaxed">
                            {facilities.ground_notes}
                          </p>
                        </div>
                      )}
                      
                      {!facilities.ground_address && !facilities.ground_notes && (
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">グラウンド住所</p>
                            <p className="text-gray-700">〒XXX-XXXX 都道府県○○市...</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-2">グラウンド特記事項</p>
                            <p className="text-gray-700">詳細情報...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </MaskedContent>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* サッカー部寮 - 簡素化版 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Home size={18} className="text-purple-600 mr-2" />
          サッカー部寮
          {!isPremium && <PremiumBadge className="ml-2" />}
        </h3>
        
        {isPremium ? (
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="space-y-4">
              {(() => {
                // 修正: 簡素化された寮情報表示
                const dormStatus = soccerClub.dorm_details?.soccer_club_dorm || "なし";
                
                return (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      {dormStatus === "なし" ? (
                        <>
                          <X size={20} className="text-red-500" />
                          <span className="text-gray-900 font-medium text-lg">サッカー部寮なし</span>
                        </>
                      ) : (
                        <>
                          <Check size={20} className="text-green-600" />
                          <span className="text-gray-900 font-medium text-lg">
                            サッカー部寮{dormStatus}
                          </span>
                        </>
                      )}
                    </div>
                    
                    {dormStatus === "なし" ? (
                      <div className="border border-blue-200 p-4 rounded-lg">
                        <p className="text-blue-800 text-sm font-medium mb-1">住環境について</p>
                        <p className="text-blue-700 text-sm leading-relaxed">
                          部員寮はありませんが、大学近辺には学生向けアパートや下宿が充実しています。
                        </p>
                      </div>
                    ) : (
                      <div className="border border-green-200 p-4 rounded-lg">
                        <p className="text-green-800 text-sm font-medium mb-1">寮について</p>
                        <p className="text-green-700 text-sm leading-relaxed">
                          {dormStatus === "あり（全寮制）" 
                            ? "全部員が寮生活を送る全寮制となっています。"
                            : "サッカー部専用の寮があります。"
                          }
                          詳細については大学サッカー部にお問い合わせください。
                        </p>
                      </div>
                    )}
                    
                    {soccerClub.dorm_details?.dorm_notes && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">寮に関する詳細</p>
                        <p className="text-gray-700 leading-relaxed">
                          {soccerClub.dorm_details.dorm_notes}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        ) : (
          <MaskedContent 
            reason="サッカー部寮の詳細情報"
            onUpgradeClick={onUpgradeToPremium}
            showPreview={true}
          >
            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  {soccerClub.dorm_details?.soccer_club_dorm === "なし" ? (
                    <>
                      <X size={20} className="text-red-500" />
                      <span className="text-gray-900 font-medium text-lg">サッカー部寮なし</span>
                    </>
                  ) : (
                    <>
                      <Check size={20} className="text-green-600" />
                      <span className="text-gray-900 font-medium text-lg">
                        サッカー部寮{soccerClub.dorm_details?.soccer_club_dorm || "あり"}
                      </span>
                    </>
                  )}
                </div>
                <div className="text-gray-600">
                  寮の詳細情報はプレミアム限定です
                </div>
              </div>
            </div>
          </MaskedContent>
        )}
      </div>

      {/* 注意事項 */}
      <div className="border border-blue-200 border-l-4 p-4 rounded">
        <h4 className="font-semibold text-gray-900 mb-2">ご注意</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 施設の利用時間や利用条件は変更される場合があります</li>
          <li>• 寮の入居条件や費用については直接お問い合わせください</li>
          <li>• 練習施設の詳細や見学については事前にご連絡ください</li>
          <li>• 天候等により練習場所が変更される場合があります</li>
          <li>• グラウンドの詳細情報と寮の情報はプレミアムプランでご確認いただけます</li>
        </ul>
      </div>
    </div>
  );
};


// 進路タブコンポーネント
const CareersTab = ({ university, isPremium, onUpgradeToPremium }) => {
  const careerInfo = university.career_info || {};
  
  return (
    <div className="space-y-8">
      {/* 大学全体の卒業後の進路 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <GraduationCap size={18} className="text-blue-600 mr-2" />
          大学全体の卒業後の進路
        </h3>
        <div className="border border-gray-200 p-6 rounded-lg">
          <div>
            <p className="text-sm text-gray-600 mb-2">主な進路先</p>
            <p className="text-gray-700 leading-relaxed">
              {careerInfo.university_career_paths || "現在準備中"}
            </p>
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
          <div className="border border-gray-200 p-6 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 mb-2">主な進路先</p>
              <p className="text-gray-700 leading-relaxed">
                {careerInfo.soccer_club_career_paths || "現在準備中"}
              </p>
            </div>
          </div>
        ) : (
          <MaskedContent 
            reason="サッカー部の詳細な進路情報"
            onUpgradeClick={onUpgradeToPremium}
          >
            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">主な進路先</p>
                  <div className="text-sm text-gray-600 mb-4">
                    サッカー部の詳細な進路情報はプレミアム限定です
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 opacity-50">
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
                        <span className="text-gray-400">{path}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </MaskedContent>
        )}
      </div>

      {/* 注意事項 */}
      <div className="border border-blue-200 border-l-4 p-4 rounded">
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
      {/* 現役部員の声 - コメント部分のみプレミアム限定 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MessageSquare size={18} className="text-blue-600 mr-2" />
          現役部員の声
          {!isPremium && <PremiumBadge className="ml-2" />}
        </h3>
        
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="space-y-6">
            {reviews.student_reviews && reviews.student_reviews.length > 0 ? (
              reviews.student_reviews.map((review, index) => (
                <div key={index} className={`${reviews.student_reviews.length > 1 ? 'pb-6 border-b border-gray-200 last:border-b-0 last:pb-0' : ''}`}>
                  {/* 記入者情報とサブタイトル - 常に表示 */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-blue-800">{review.grade || "現役部員"}</span>
                      <span className="text-sm text-blue-600">{review.position || ""}</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {review.category || "練習環境について"}
                    </span>
                  </div>
                  
                  {/* コメント部分 - プレミアム制限 */}
                  {isPremium ? (
                    <p className="text-gray-700 leading-relaxed">
                      {review.review || "現在準備中"}
                    </p>
                  ) : (
                    <div className="relative">
                      <MaskedContent 
                        reason="口コミの詳細内容"
                        onUpgradeClick={onUpgradeToPremium}
                        showPreview={true}
                      >
                        <p className="text-gray-700 leading-relaxed">
                          {review.review || "現在準備中"}
                        </p>
                      </MaskedContent>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="pb-6 border-b border-gray-200">
                  {/* サンプル1 */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-blue-800">3年生</span>
                      <span className="text-sm text-blue-600">MF</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      練習環境について
                    </span>
                  </div>
                  
                  {isPremium ? (
                    <p className="text-gray-700 leading-relaxed">監督やコーチの指導が丁寧で、技術面だけでなく人間性も重視してくれます。練習は厳しいですが、仲間との絆も深まり充実した大学生活を送れています。</p>
                  ) : (
                    <MaskedContent 
                      reason="口コミの詳細内容"
                      onUpgradeClick={onUpgradeToPremium}
                      showPreview={true}
                    >
                      <p className="text-gray-700 leading-relaxed">監督やコーチの指導が丁寧で、技術面だけでなく人間性も重視してくれます。練習は厳しいですが、仲間との絆も深まり充実した大学生活を送れています。</p>
                    </MaskedContent>
                  )}
                </div>
                
                <div>
                  {/* サンプル2 */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-blue-800">2年生</span>
                      <span className="text-sm text-blue-600">DF</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      寮生活について
                    </span>
                  </div>
                  
                  {isPremium ? (
                    <p className="text-gray-700 leading-relaxed">寮生活では先輩後輩の縦の関係だけでなく、同期との横のつながりも強くなりました。共同生活で規律も身につき、サッカー以外の面でも成長できる環境です。</p>
                  ) : (
                    <MaskedContent 
                      reason="口コミの詳細内容"
                      onUpgradeClick={onUpgradeToPremium}
                      showPreview={true}
                    >
                      <p className="text-gray-700 leading-relaxed">寮生活では先輩後輩の縦の関係だけでなく、同期との横のつながりも強くなりました。共同生活で規律も身につき、サッカー以外の面でも成長できる環境です。</p>
                    </MaskedContent>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 保護者の声 - コメント部分のみプレミアム限定 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users size={18} className="text-green-600 mr-2" />
          保護者の声
          {!isPremium && <PremiumBadge className="ml-2" />}
        </h3>
        
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="space-y-6">
            {reviews.parent_reviews && reviews.parent_reviews.length > 0 ? (
              reviews.parent_reviews.map((review, index) => (
                <div key={index} className={`${reviews.parent_reviews.length > 1 ? 'pb-6 border-b border-gray-200 last:border-b-0 last:pb-0' : ''}`}>
                  {/* 記入者情報とサブタイトル - 常に表示 */}
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-green-800">保護者</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {review.category || "費用について"}
                    </span>
                  </div>
                  
                  {/* コメント部分 - プレミアム制限 */}
                  {isPremium ? (
                    <p className="text-gray-700 leading-relaxed">
                      {review.review || "現在準備中"}
                    </p>
                  ) : (
                    <MaskedContent 
                      reason="口コミの詳細内容"
                      onUpgradeClick={onUpgradeToPremium}
                      showPreview={true}
                    >
                      <p className="text-gray-700 leading-relaxed">
                        {review.review || "現在準備中"}
                      </p>
                    </MaskedContent>
                  )}
                </div>
              ))
            ) : (
              <div>
                {/* サンプル保護者の声 */}
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-green-800">保護者</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    費用について
                  </span>
                </div>
                
                {isPremium ? (
                  <p className="text-gray-700 leading-relaxed">費用は決して安くありませんが、息子の成長を見ていると価値のある投資だと感じています。指導者の方々も親身に相談に乗ってくれて、安心して任せられます。</p>
                ) : (
                  <MaskedContent 
                    reason="口コミの詳細内容"
                    onUpgradeClick={onUpgradeToPremium}
                    showPreview={true}
                  >
                    <p className="text-gray-700 leading-relaxed">費用は決して安くありませんが、息子の成長を見ていると価値のある投資だと感じています。指導者の方々も親身に相談に乗ってくれて、安心して任せられます。</p>
                  </MaskedContent>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 卒業生の声 - コメント部分のみプレミアム限定 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <GraduationCap size={18} className="text-purple-600 mr-2" />
          卒業生の声
          {!isPremium && <PremiumBadge className="ml-2" />}
        </h3>
        
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="space-y-6">
            {reviews.graduate_reviews && reviews.graduate_reviews.length > 0 ? (
              reviews.graduate_reviews.map((review, index) => (
                <div key={index} className={`${reviews.graduate_reviews.length > 1 ? 'pb-6 border-b border-gray-200 last:border-b-0 last:pb-0' : ''}`}>
                  {/* 記入者情報とサブタイトル - 常に表示 */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-purple-800">
                        {review.graduation_year || "卒業生"}
                      </span>
                      <span className="text-sm text-purple-600">
                        {review.current_status || ""}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {review.category || "進路について"}
                    </span>
                  </div>
                  
                  {/* コメント部分 - プレミアム制限 */}
                  {isPremium ? (
                    <p className="text-gray-700 leading-relaxed">
                      {review.review || "現在準備中"}
                    </p>
                  ) : (
                    <MaskedContent 
                      reason="口コミの詳細内容"
                      onUpgradeClick={onUpgradeToPremium}
                      showPreview={true}
                    >
                      <p className="text-gray-700 leading-relaxed">
                        {review.review || "現在準備中"}
                      </p>
                    </MaskedContent>
                  )}
                </div>
              ))
            ) : (
              <div>
                {/* サンプル卒業生の声 */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-purple-800">卒業生</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    進路について
                  </span>
                </div>
                
                {isPremium ? (
                  <p className="text-gray-700 leading-relaxed">4年間サッカー部で学んだチームワークや責任感は、社会人になった今でも非常に役立っています。厳しい環境でしたが、人間的に大きく成長できました。</p>
                ) : (
                  <MaskedContent 
                    reason="口コミの詳細内容"
                    onUpgradeClick={onUpgradeToPremium}
                    showPreview={true}
                  >
                    <p className="text-gray-700 leading-relaxed">4年間サッカー部で学んだチームワークや責任感は、社会人になった今でも非常に役立っています。厳しい環境でしたが、人間的に大きく成長できました。</p>
                  </MaskedContent>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 注意事項 */}
      <div className="border border-blue-200 border-l-4 p-4 rounded">
        <h4 className="font-semibold text-gray-900 mb-2">ご注意</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 口コミは個人の感想・体験談であり、大学の公式見解ではありません</li>
          <li>• 投稿内容の真偽について当サイトでは責任を負いかねます</li>
          <li>• 最新の情報については直接大学にお問い合わせください</li>
          <li>• 不適切な投稿は予告なく削除する場合があります</li>
          <li>• 口コミの詳細内容はプレミアムプランでご確認いただけます</li>
        </ul>
      </div>
    </div>
  );
};

export default EnhancedUniversityDetails;