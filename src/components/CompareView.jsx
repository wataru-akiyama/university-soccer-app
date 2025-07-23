// src/components/CompareView.jsx - 最大5校対応・詳細比較機能強化版
import React from 'react';
import { ChevronRight, X, Crown, Lock, MapPin, Users, Trophy, Home, GraduationCap, Calendar, DollarSign, Target, Clock } from 'lucide-react';
import UniversityLogo from './UniversityLogo';

// プレミアム限定の比較ビューコンポーネント
const CompareView = ({ 
  universities, 
  onBack, 
  onRemove,
  // プレミアム関連のprops
  isPremium = false,
  onUpgradeToPremium,
  premiumUtils
}) => {
  // プレミアムユーティリティのデフォルト値
  const { 
    trackPremiumAttempt = () => {}
  } = premiumUtils || {};

  // プレミアムでない場合は制限画面を表示
  if (!isPremium) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 sm:p-6">
          <button 
            className="bg-white text-green-700 px-3 py-1 rounded-lg mb-4 flex items-center text-sm shadow-sm hover:bg-gray-100 transition-colors"
            onClick={onBack}
          >
            <ChevronRight className="transform rotate-180 mr-1" size={16} />
            一覧に戻る
          </button>
          <h2 className="text-lg sm:text-2xl font-bold flex items-center">
            <Lock size={24} className="mr-3" />
            大学サッカー部比較
          </h2>
          <p className="text-sm sm:text-base opacity-90 mt-1">プレミアム限定機能</p>
        </div>
        
        <div className="p-6 sm:p-8">
          {/* プレミアム限定機能の説明 */}
          <div className="text-center py-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center">
              <Crown size={48} className="text-yellow-600" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              比較機能はプレミアム限定です
            </h3>
            
            <p className="text-gray-600 mb-6 leading-relaxed max-w-md mx-auto">
              最大5校まで詳細に比較検討できる機能です。費用、入部条件、施設、進路情報などを
              一覧で比較して、最適な進路選択をサポートします。
            </p>
            
            {/* 比較機能の特徴 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
              {[
                {
                  title: "最大5校まで比較",
                  description: "充実した情報で効率的な比較検討"
                },
                {
                  title: "詳細比較テーブル",
                  description: "費用、入部条件、施設を一覧で比較"
                },
                {
                  title: "レスポンシブ対応",
                  description: "PC・スマホどちらでも快適に比較可能"
                },
                {
                  title: "プリント対応",
                  description: "比較表を印刷して保存可能"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium text-gray-800 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
            
            {/* アップグレードボタン */}
            <button 
              onClick={() => {
                trackPremiumAttempt('comparison', 'upgrade_from_compare_page');
                if (onUpgradeToPremium) {
                  onUpgradeToPremium();
                }
              }}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 rounded-lg font-medium text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Crown size={20} className="inline mr-2" />
              プレミアムプランにアップグレード
            </button>
            
            <p className="text-xs text-gray-500 mt-3">
              今すぐ全機能をお試しいただけます
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ユーティリティ関数
  const formatCurrency = (amount) => {
    if (!amount) return '情報なし';
    return `${(amount / 10000).toFixed(0)}万円`;
  };

  const getDormTypes = (dormDetails) => {
    if (!dormDetails) return ['情報なし'];
    
    const types = [];
    if (dormDetails.university_dorm) types.push("大学寮");
    if (dormDetails.soccer_club_dorm) types.push("部寮");
    if (dormDetails.general_dorm) types.push("部員寮");
    return types.length > 0 ? types : ['なし'];
  };

  const getTrainingIntensityColor = (intensity) => {
    switch (intensity) {
      case '高':
        return 'bg-red-100 text-red-800';
      case '中':
        return 'bg-yellow-100 text-yellow-800';
      case '低':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUniversityTypeColor = (type) => {
    return type === '国立' || type === '国公立' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-purple-100 text-purple-800';
  };

  // プレミアムユーザー向けの通常の比較機能
  // テーブルのレイアウトを学校数に応じて動的に調整（1-5校対応）
  const getTableLayout = () => {
    const universityCount = universities.length;
    
    if (universityCount === 1) {
      return {
        containerClass: "w-full",
        tableStyle: { width: '100%' },
        leftColumnWidth: '200px',
        universityColumnWidth: 'auto',
        needsScroll: false
      };
    } else if (universityCount === 2) {
      return {
        containerClass: "w-full",
        tableStyle: { width: '100%' },
        leftColumnWidth: '150px',
        universityColumnWidth: '42.5%',
        needsScroll: false
      };
    } else if (universityCount === 3) {
      return {
        containerClass: "w-full",
        tableStyle: { width: '100%' },
        leftColumnWidth: '120px',
        universityColumnWidth: '29.3%',
        needsScroll: false
      };
    } else if (universityCount === 4) {
      return {
        containerClass: "w-full",
        tableStyle: { width: '100%' },
        leftColumnWidth: '100px',
        universityColumnWidth: '22.5%',
        needsScroll: false
      };
    } else if (universityCount === 5) {
      return {
        containerClass: "w-full",
        tableStyle: { width: '100%' },
        leftColumnWidth: '100px',
        universityColumnWidth: '18%',
        needsScroll: false
      };
    } else {
      // 6校以上の場合は横スクロール（将来の拡張用）
      const tableMinWidth = universityCount * 200 + 120;
      return {
        containerClass: "overflow-x-auto",
        tableStyle: { 
          minWidth: `${tableMinWidth}px`,
          width: `${tableMinWidth}px` 
        },
        leftColumnWidth: '120px',
        universityColumnWidth: '200px',
        needsScroll: true
      };
    }
  };

  const layout = getTableLayout();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 sm:p-6">
        <button 
          className="bg-white text-green-700 px-3 py-1 rounded-lg mb-4 flex items-center text-sm shadow-sm hover:bg-gray-100 transition-colors"
          onClick={onBack}
        >
          <ChevronRight className="transform rotate-180 mr-1" size={16} />
          一覧に戻る
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold flex items-center">
              <Crown size={24} className="mr-3 text-yellow-300" />
              大学サッカー部比較
            </h2>
            <p className="text-sm sm:text-base opacity-90 mt-1">{universities.length}校を比較中（最大5校まで）</p>
          </div>
          <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-medium">
            PREMIUM
          </div>
        </div>
      </div>
      
      <div className="p-3 sm:p-6">
        {/* 全画面対応テーブル表示 */}
        <div 
          className={`${layout.containerClass} border border-gray-200 rounded-lg shadow-sm`}
        >
          <table 
            className="bg-white text-xs sm:text-sm"
            style={layout.tableStyle}
          >
            <thead>
              <tr>
                <th 
                  className={`p-2 sm:p-3 text-left bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} rounded-tl-lg border-r border-gray-200`}
                  style={{ 
                    minWidth: layout.leftColumnWidth, 
                    width: layout.leftColumnWidth 
                  }}
                ></th>
                {universities.map((university, index) => (
                  <th 
                    key={university.id} 
                    className={`p-2 sm:p-3 bg-white ${index === universities.length - 1 ? 'rounded-tr-lg' : ''}`}
                    style={{ 
                      minWidth: layout.universityColumnWidth, 
                      width: layout.universityColumnWidth 
                    }}
                  >
                    <div className="relative">
                      {/* 背景ロゴ */}
                      <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center opacity-10">
                        <UniversityLogo 
                          university={university}
                          size="lg"
                          showFallback={false}
                        />
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-center">
                          <button 
                            className="text-red-500 p-1 hover:bg-red-50 rounded-full absolute -top-1 -right-1 sm:-top-2 sm:-right-2"
                            onClick={() => onRemove(university.id)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                        
                        <div className="flex flex-col items-center mb-2 pt-2 sm:pt-3">
                          <UniversityLogo 
                            university={university}
                            size="sm"
                            className="mb-1 sm:mb-2 shadow-sm"
                            showFallback={true}
                          />
                          <h3 className="font-bold text-center text-xs sm:text-sm leading-tight px-1">{university.university_name}</h3>
                          <p className="text-xs text-gray-600 mt-1 text-center">{university.soccer_club?.league}</p>
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* 基本情報セクション */}
              <tr className="bg-green-50">
                <th 
                  colSpan={universities.length + 1} 
                  className={`p-2 sm:p-3 text-left font-semibold text-green-800 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} border-t border-b border-green-200`}
                >
                  <Users className="inline mr-2" size={16} />
                  基本情報
                </th>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td 
                  className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}
                  style={{ 
                    minWidth: layout.leftColumnWidth, 
                    width: layout.leftColumnWidth 
                  }}
                >
                  大学種別
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center" style={{ 
                    minWidth: layout.universityColumnWidth, 
                    width: layout.universityColumnWidth 
                  }}>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getUniversityTypeColor(university.university_type || (
                        university.academic_rank?.includes('国公立') ? '国立' : '私立'
                      ))
                    }`}>
                      {university.university_type || (
                        university.academic_rank?.includes('国公立') ? '国立' : '私立'
                      )}
                    </span>
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>学力ランク</td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center">
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
                      {university.academic_rank?.split('：')[0] || '情報なし'}
                    </span>
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  リーグ
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center">
                    <span className="bg-green-50 text-green-800 px-2 py-1 rounded-lg inline-block text-xs">
                      <span className="sm:hidden">
                        {university.soccer_club?.league?.includes('1部') ? '1部' : 
                         university.soccer_club?.league?.includes('2部') ? '2部' : '他'}
                      </span>
                      <span className="hidden sm:inline">{university.soccer_club?.league || '情報なし'}</span>
                    </span>
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>監督</td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center text-xs sm:text-sm truncate">
                    {university.soccer_club?.coach_name || '情報なし'}
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>部員数</td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center font-medium">
                    {university.soccer_club?.total_members ? `${university.soccer_club.total_members}名` : '情報なし'}
                  </td>
                ))}
              </tr>

              {/* 練習・指導方針セクション */}
              <tr className="bg-blue-50">
                <th colSpan={universities.length + 1} className={`p-2 sm:p-3 text-left font-semibold text-green-800 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} border-t border-b border-green-200`}>
                  <Calendar className="inline mr-2" size={16} />
                  練習・指導方針
                </th>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <Clock className="inline mr-1" size={14} />
                  練習時間
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center text-xs">
                    {university.soccer_club?.practice_schedule || university.soccer_club?.practice_time || '情報なし'}
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <Target className="inline mr-1" size={14} />
                  練習強度
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getTrainingIntensityColor(university.soccer_club?.training_intensity)
                    }`}>
                      {university.soccer_club?.training_intensity || '情報なし'}
                    </span>
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>指導方針</td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center text-xs">
                    {university.soccer_club?.club_philosophy || university.soccer_club?.coaching_philosophy || '情報なし'}
                  </td>
                ))}
              </tr>

              {/* 実績セクション */}
              <tr className="bg-yellow-50">
                <th colSpan={universities.length + 1} className={`p-2 sm:p-3 text-left font-semibold text-green-800 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} border-t border-b border-green-200`}>
                  <Trophy className="inline mr-2" size={16} />
                  実績
                </th>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <span className="hidden sm:inline">Jリーグ内定者数</span>
                  <span className="sm:hidden">J内定</span>
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center">
                    <div className="rounded-full bg-yellow-100 text-yellow-800 font-bold py-1 mx-auto w-12 sm:w-16 text-xs sm:text-sm">
                      {university.soccer_club?.j_league_nominees_2022_24 || 0}名
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <span className="hidden sm:inline">デンソーカップ出場者数</span>
                  <span className="sm:hidden">デンソー</span>
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center">
                    <div className="rounded-full bg-green-100 text-green-800 font-bold py-1 mx-auto w-12 sm:w-16 text-xs sm:text-sm">
                      {university.soccer_club?.denso_cup_2024_25 || 0}名
                    </div>
                  </td>
                ))}
              </tr>

              {/* 施設・環境セクション */}
              <tr className="bg-green-50">
                <th colSpan={universities.length + 1} className={`p-2 sm:p-3 text-left font-semibold text-green-800 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} border-t border-b border-green-200`}>
                  <Home className="inline mr-2" size={16} />
                  施設・環境
                </th>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <MapPin className="inline mr-1" size={14} />
                  アクセス
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center text-xs">
                    {university.access_info || university.location || '情報なし'}
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <span className="hidden sm:inline">グラウンド名</span>
                  <span className="sm:hidden">グラウンド</span>
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                    <div className="truncate max-w-[120px] sm:max-w-none">
                      {university.facilities?.ground_name || 
                      university.soccer_club?.practice_location || 
                      'グラウンド情報なし'}
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <span className="hidden sm:inline">サッカーコート数</span>
                  <span className="sm:hidden">コート</span>
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center">
                    {university.facilities?.soccer_field_count || university.soccer_club?.soccer_field_count || 0}面
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>練習施設</td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3">
                    <div className="space-y-1">
                      {university.facilities?.training_facilities?.slice(0, layout.needsScroll ? 1 : 2).map((facility, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-1 py-0.5 rounded text-xs block text-center">
                          {facility}
                        </span>
                      )) || <span className="text-xs text-gray-500">情報なし</span>}
                      {university.facilities?.training_facilities?.length > (layout.needsScroll ? 1 : 2) && (
                        <span className="text-xs text-gray-500 text-center block">
                          +{university.facilities.training_facilities.length - (layout.needsScroll ? 1 : 2)}
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>寮</td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center">
                    <div className="space-y-1">
                      {getDormTypes(university.soccer_club?.dorm_details).slice(0, layout.needsScroll ? 1 : 3).map((dormType, index) => (
                        <span key={index} className={`px-2 py-1 rounded-full inline-block text-xs font-medium ${
                          dormType === 'なし' || dormType === '情報なし'
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {dormType}
                        </span>
                      ))}
                      {getDormTypes(university.soccer_club?.dorm_details).length > (layout.needsScroll ? 1 : 3) && (
                        <span className="text-xs text-gray-500">+他</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>奨学金</td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      university.soccer_club?.sports_scholarship 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {university.soccer_club?.sports_scholarship ? 'あり' : 'なし'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* 費用セクション（プレミアム限定） */}
              <tr className="bg-purple-50">
                <th colSpan={universities.length + 1} className={`p-2 sm:p-3 text-left font-semibold text-green-800 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} border-t border-b border-green-200`}>
                  <DollarSign className="inline mr-2" size={16} />
                  費用情報（プレミアム限定）
                </th>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <span className="hidden sm:inline">大学年間費用</span>
                  <span className="sm:hidden">大学費用</span>
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center font-medium text-red-600">
                    {formatCurrency(university.costs?.university_cost)}
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <span className="hidden sm:inline">サッカー部年間費用</span>
                  <span className="sm:hidden">部費用</span>
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center font-medium text-orange-600">
                    {formatCurrency(university.costs?.soccer_club_cost)}
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <span className="hidden sm:inline">年間総費用</span>
                  <span className="sm:hidden">総費用</span>
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center font-bold text-red-700">
                    {university.costs?.university_cost && university.costs?.soccer_club_cost
                      ? formatCurrency(university.costs.university_cost + university.costs.soccer_club_cost)
                      : '情報なし'
                    }
                  </td>
                ))}
              </tr>

              {/* 進路・資格セクション */}
              <tr className="bg-indigo-50">
                <th colSpan={universities.length + 1} className={`p-2 sm:p-3 text-left font-semibold text-green-800 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} border-t border-b border-green-200`}>
                  <GraduationCap className="inline mr-2" size={16} />
                  進路・資格
                </th>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <span className="hidden sm:inline">主な進路</span>
                  <span className="sm:hidden">進路</span>
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3">
                    <div className="space-y-1">
                      {university.soccer_club?.graduate_career_paths?.slice(0, layout.needsScroll ? 1 : 2).map((career, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-xs block text-center">
                          {career}
                        </span>
                      )) || <span className="text-xs text-gray-500 text-center block">情報なし</span>}
                      {university.soccer_club?.graduate_career_paths?.length > (layout.needsScroll ? 1 : 2) && (
                        <span className="text-xs text-gray-500 text-center block">
                          +{university.soccer_club.graduate_career_paths.length - (layout.needsScroll ? 1 : 2)}
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <span className="hidden sm:inline">取得可能資格</span>
                  <span className="sm:hidden">資格</span>
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {layout.needsScroll ? (
                        <>
                          {university.soccer_club?.qualifications?.slice(0, 1).map((qualification, index) => (
                            <span key={index} className="bg-orange-100 text-orange-800 px-1 py-1 rounded-full text-xs mb-1 block text-center">
                              {qualification.length > 6 ? qualification.substring(0, 6) + '...' : qualification}
                            </span>
                          )) || <span className="text-xs text-gray-500">情報なし</span>}
                          {university.soccer_club?.qualifications?.length > 1 && (
                            <span className="text-xs text-gray-500">+{university.soccer_club.qualifications.length - 1}</span>
                          )}
                        </>
                      ) : (
                        university.soccer_club?.qualifications?.slice(0, 2).map((qualification, index) => (
                          <span key={index} className="bg-orange-100 text-orange-800 px-1 py-1 rounded-full text-xs mb-1 block text-center">
                            {qualification.length > 8 ? qualification.substring(0, 8) + '...' : qualification}
                          </span>
                        )) || <span className="text-xs text-gray-500">情報なし</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
              
              {/* 入部条件セクション */}
              <tr className="bg-orange-50">
                <th colSpan={universities.length + 1} className={`p-2 sm:p-3 text-left font-semibold text-green-800 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} border-t border-b border-green-200`}>
                  入部条件
                </th>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <span className="hidden sm:inline">スポーツ推薦</span>
                  <span className="sm:hidden">推薦</span>
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3">
                    {university.entry_conditions?.sports_recommend ? (
                      <div className="text-center">
                        <span className="bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full inline-block mb-1 text-xs">あり</span>
                        <p className="text-xs text-gray-600 hidden sm:block">{university.entry_conditions.recommend_criteria}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full inline-block text-xs">なし</span>
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <span className="hidden sm:inline">セレクション</span>
                  <span className="sm:hidden">選考</span>
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3">
                    {university.entry_conditions?.selection ? (
                      <div className="text-center">
                        <span className="bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full inline-block mb-1 text-xs">あり</span>
                        <p className="text-xs text-gray-600 hidden sm:block">時期: {university.entry_conditions.selection_period}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full inline-block text-xs">なし</span>
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <span className="hidden sm:inline">一般入部</span>
                  <span className="sm:hidden">一般</span>
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3">
                    {university.entry_conditions?.general_admission ? (
                      <div className="text-center">
                        <span className="bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full inline-block mb-1 text-xs">可能</span>
                        <p className="text-xs text-gray-600 hidden sm:block">{university.entry_conditions.general_conditions}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full inline-block text-xs">不可</span>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* スマホでの操作ヒント */}
        {layout.needsScroll && (
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500 sm:hidden">← 横にスクロールできます →</p>
          </div>
        )}

        {/* デバッグ情報（開発時のみ表示） */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs text-gray-600">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div><strong>表示校数:</strong> {universities.length}</div>
              <div><strong>左カラム幅:</strong> {layout.leftColumnWidth}</div>
              <div><strong>各校カラム幅:</strong> {layout.universityColumnWidth}</div>
              <div><strong>スクロール:</strong> {layout.needsScroll ? 'あり' : 'なし'}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareView;