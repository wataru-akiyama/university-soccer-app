import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Heart, 
  Users, 
  Award, 
  Home, 
  Medal, 
  Calendar, 
  ArrowUpRight, 
  FileText, 
  Check, 
  Info,
  Briefcase,
  MessageSquare,
  X,
  Plus,
  Trophy,
  BookOpen,
  Star,
  TrendingUp,
  Building,
  MapPin,
  User,
  GraduationCap,
  Zap
} from 'lucide-react';

const EnhancedUniversityDetails = ({ 
  university, 
  onBack, 
  onAddToCompare, 
  onAddToFavorites, 
  isInCompareList,
  isInFavorites 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!university) return null;
  
  // パフォーマンス指標の計算
  const performanceMetrics = [
    {
      label: "Jリーグ内定者数",
      value: university.soccer_club?.j_league_nominees_2022_24 || 
             ((university.soccer_club?.j_league_nominees_2022 || 0) + 
              (university.soccer_club?.j_league_nominees_2023 || 0) + 
              (university.soccer_club?.j_league_nominees_2024 || 0)),
      unit: "名",
      subtitle: "過去3年間",
      trend: university.soccer_club?.j_league_nominees_2022_24 > 5 ? "+25%" : "安定",
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      label: "部員数",
      value: university.soccer_club?.total_members || 0,
      unit: "名",
      subtitle: "2024年度",
      trend: "安定",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      label: "デンソーカップ",
      value: university.soccer_club?.denso_cup_2024_25 || 0,
      unit: "名",
      subtitle: "2024-25選出",
      trend: university.soccer_club?.denso_cup_2024_25 > 2 ? "増加" : "",
      icon: Medal,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      label: "サッカーコート",
      value: university.soccer_club?.soccer_field_count || 0,
      unit: "面",
      subtitle: "専用施設",
      trend: "",
      icon: Home,
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  const tabs = [
    { id: 'overview', label: '概要', icon: Info },
    { id: 'performance', label: '実績', icon: TrendingUp },
    { id: 'facilities', label: '施設', icon: Building },
    { id: 'admission', label: '入部', icon: GraduationCap },
    { id: 'members', label: '部員', icon: Users },
    { id: 'careers', label: '進路', icon: Briefcase }
  ];

  // 大学名から短縮名を生成
  const getShortName = (name) => {
    return name?.charAt(0) || 'U';
  };

  // 練習体験申し込みハンドラー
  const handlePracticeApplication = () => {
    alert(`${university.university_name}サッカー部の練習体験に申し込みます。`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ヒーローセクション */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* 背景パターン */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* コンテンツ */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* ナビゲーション */}
          <div className="flex justify-between items-center mb-6 lg:mb-8">
            <button 
              className="flex items-center text-white hover:text-gray-300 transition-colors"
              onClick={onBack}
            >
              <ChevronLeft size={20} className="mr-2" />
              <span className="hidden sm:inline">一覧に戻る</span>
              <span className="sm:hidden">戻る</span>
            </button>
            
            <div className="flex space-x-3">
              <button 
                className={`p-3 rounded-full transition-all duration-200 ${
                  isInFavorites
                  ? "bg-red-500 text-white shadow-lg scale-105"
                  : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                }`}
                onClick={() => onAddToFavorites(university)}
                title={isInFavorites ? "進路プランから削除" : "進路プランに追加"}
              >
                <Heart size={20} fill={isInFavorites ? "currentColor" : "none"} />
              </button>
              
              {university.homepage_url && (
                <a 
                  href={university.homepage_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-colors"
                  title="公式サイトを開く"
                >
                  <ArrowUpRight size={20} />
                </a>
              )}
            </div>
          </div>
          
          {/* メイン情報 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 lg:mb-8">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-2xl p-3 lg:p-4 shadow-xl flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg lg:text-xl">
                {getShortName(university.university_name)}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white truncate">
                  {university.university_name}
                </h1>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium inline-block">
                  {university.soccer_club?.league}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-300 mb-4">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1 flex-shrink-0" />
                  <span className="truncate">{university.location}</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-1 flex-shrink-0" />
                  <span className="truncate">監督: {university.soccer_club?.coach_name}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {university.main_faculties?.slice(0, 3).map((faculty, index) => (
                  <span key={index} className="bg-white/10 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {faculty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* パフォーマンス指標 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 lg:-mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div className={`p-2 lg:p-3 rounded-lg ${metric.bgColor}`}>
                    <Icon size={20} className={`lg:w-6 lg:h-6 ${metric.color}`} />
                  </div>
                  {metric.trend && (
                    <span className="text-xs lg:text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {metric.trend}
                    </span>
                  )}
                </div>
                
                <div className="mb-2">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl lg:text-3xl font-bold text-gray-900">{metric.value}</span>
                    <span className="text-sm lg:text-lg text-gray-600">{metric.unit}</span>
                  </div>
                  <p className="text-xs lg:text-sm text-gray-500">{metric.subtitle}</p>
                </div>
                
                <h3 className="text-xs lg:text-sm font-medium text-gray-700">{metric.label}</h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12">
        <div className="space-y-6 lg:space-y-8">
          {/* ナビゲーションタブ */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
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
                    {tab.label}
                  </button>
                );
              })}
            </div>
            
            <div className="p-6 lg:p-8">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">チームについて</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {university.extended_data?.playmaker_comment || 
                       `${university.university_name}サッカー部は、${university.soccer_club?.league}に所属し、監督の${university.soccer_club?.coach_name}氏のもとで活動しています。`}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">取得可能資格</h3>
                    <div className="flex flex-wrap gap-2">
                      {university.soccer_club?.qualifications?.map((qualification, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm border border-blue-200">
                          {qualification}
                        </span>
                      )) || (
                        <span className="text-gray-500">情報なし</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'performance' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">主な内定先</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {university.extended_data?.j_league_teams?.map((team, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
                          <span className="font-medium text-gray-900">{team}</span>
                        </div>
                      )) || (
                        <div className="col-span-2 text-center text-gray-500 py-4">
                          内定先情報はありません
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">有名OB</h3>
                    <div className="space-y-3">
                      {university.extended_data?.famous_alumni?.map((alumni, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Star size={16} className="text-green-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 truncate">{alumni.name}</div>
                            <div className="text-sm text-gray-500 truncate">{alumni.career}</div>
                          </div>
                        </div>
                      )) || (
                        <div className="text-center text-gray-500 py-4">
                          有名OB情報はありません
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'facilities' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">練習施設</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        {university.soccer_club?.facility_note || "施設情報はありません"}
                      </p>
                      {university.soccer_club?.practice_location && (
                        <p className="text-sm text-gray-500 mt-2">
                          場所: {university.soccer_club.practice_location}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">寮について</h3>
                    <div className="flex items-center space-x-3">
                      {university.soccer_club?.dorm_available ? (
                        <>
                          <Check size={20} className="text-green-600" />
                          <span className="text-gray-700">寮あり</span>
                        </>
                      ) : (
                        <>
                          <X size={20} className="text-red-500" />
                          <span className="text-gray-700">寮なし</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'admission' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Zap size={18} className="text-green-600" />
                        <h4 className="font-semibold text-gray-900">スポーツ推薦</h4>
                      </div>
                      {university.entry_conditions?.sports_recommend ? (
                        <div>
                          <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm mb-2">利用可能</span>
                          <p className="text-sm text-gray-700">{university.entry_conditions.recommend_criteria}</p>
                        </div>
                      ) : (
                        <span className="text-gray-500">利用不可</span>
                      )}
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Calendar size={18} className="text-blue-600" />
                        <h4 className="font-semibold text-gray-900">セレクション</h4>
                      </div>
                      {university.entry_conditions?.selection ? (
                        <div>
                          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mb-2">実施あり</span>
                          <p className="text-sm text-gray-700">時期: {university.entry_conditions.selection_period}</p>
                        </div>
                      ) : (
                        <span className="text-gray-500">実施なし</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'members' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">学年別部員数</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {university.soccer_club?.members_by_grade ? 
                        Object.entries(university.soccer_club.members_by_grade).map(([grade, count]) => (
                          <div key={grade} className="bg-gray-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-1">{count}名</div>
                            <div className="text-sm text-gray-600">{grade}</div>
                          </div>
                        )) : (
                          <div className="col-span-full text-center text-gray-500 py-4">
                            部員数情報はありません
                          </div>
                        )
                      }
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">部員構成</h3>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-700">総部員数</span>
                        <span className="text-2xl font-bold text-gray-900">{university.soccer_club?.total_members || 0}名</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">関東リーグ平均と比較: 上位25%</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'careers' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">卒業後の進路</h3>
                    <div className="space-y-4">
                      {university.extended_data?.career_paths?.map((path, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="font-medium text-gray-900">{path.category}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="text-2xl font-bold text-gray-900">{path.percentage}%</div>
                          </div>
                        </div>
                      )) || (
                        <div className="text-center text-gray-500 py-4">
                          進路情報はありません
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">進路サポート</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Jリーグ関連</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• スカウト向け映像制作</li>
                          <li>• Jクラブとのパイプ</li>
                          <li>• セレクション情報提供</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">一般企業</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• OB・OGネットワーク</li>
                          <li>• 就職活動サポート</li>
                          <li>• インターンシップ紹介</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* アクションエリア */}
          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">アクション</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button 
                className={`flex items-center justify-center px-4 lg:px-6 py-3 rounded-lg font-medium transition-colors ${
                  isInCompareList
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                disabled={isInCompareList}
                onClick={() => !isInCompareList && onAddToCompare(university)}
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
              
              <button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 lg:px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center sm:col-span-2 lg:col-span-1"
                onClick={handlePracticeApplication}
              >
                <Calendar size={18} className="mr-2" />
                <span className="hidden sm:inline">練習体験に申し込む</span>
                <span className="sm:hidden">練習体験</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedUniversityDetails;