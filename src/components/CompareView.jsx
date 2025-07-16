// src/components/CompareView.jsx - プレミアム限定化対応版
import React from 'react';
import { ChevronRight, X, Crown, Lock } from 'lucide-react';
import UniversityLogo from './UniversityLogo';
import { MaskedBanner } from './MaskedContent';

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
              複数の大学を詳細に比較検討できる機能です。費用、入部条件、施設、進路情報などを
              一覧で比較して、最適な進路選択をサポートします。
            </p>
            
            {/* 比較機能の特徴 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
              {[
                {
                  title: "詳細比較テーブル",
                  description: "費用、入部条件、施設を一覧で比較"
                },
                {
                  title: "スマホ対応",
                  description: "横スクロールで快適に比較可能"
                },
                {
                  title: "最大3校まで",
                  description: "効率的な比較検討をサポート"
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
          
          {/* 比較のプレビュー（ブラー付き） */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              比較機能のプレビュー
            </h4>
            
            <div className="relative">
              {/* ブラー効果付きのプレビューテーブル */}
              <div className="filter blur-sm opacity-50 pointer-events-none">
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full bg-white text-sm">
                    <thead>
                      <tr>
                        <th className="p-3 text-left bg-gray-50 border-r border-gray-200"></th>
                        <th className="p-3 bg-white min-w-[200px]">早稲田大学</th>
                        <th className="p-3 bg-white min-w-[200px]">明治大学</th>
                        <th className="p-3 bg-white min-w-[200px]">法政大学</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 font-medium bg-gray-50 border-r">リーグ</td>
                        <td className="p-3 text-center">関東1部</td>
                        <td className="p-3 text-center">関東1部</td>
                        <td className="p-3 text-center">関東1部</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium bg-gray-50 border-r">部員数</td>
                        <td className="p-3 text-center">78名</td>
                        <td className="p-3 text-center">65名</td>
                        <td className="p-3 text-center">72名</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium bg-gray-50 border-r">J内定者</td>
                        <td className="p-3 text-center">12名</td>
                        <td className="p-3 text-center">8名</td>
                        <td className="p-3 text-center">6名</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium bg-gray-50 border-r">年間費用</td>
                        <td className="p-3 text-center">約220万円</td>
                        <td className="p-3 text-center">約200万円</td>
                        <td className="p-3 text-center">約190万円</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* オーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-orange-50 bg-opacity-90 flex items-center justify-center rounded-lg border-2 border-dashed border-yellow-300">
                <div className="text-center">
                  <Lock size={32} className="text-yellow-600 mx-auto mb-3" />
                  <p className="font-medium text-yellow-800">プレミアムプランで表示</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // プレミアムユーザー向けの通常の比較機能
  // テーブルのレイアウトを学校数に応じて動的に調整
  const getTableLayout = () => {
    const universityCount = universities.length;
    
    if (universityCount <= 2) {
      return {
        containerClass: "w-full",
        tableStyle: { width: '100%' },
        leftColumnWidth: universityCount === 1 ? '120px' : '100px',
        universityColumnWidth: universityCount === 1 ? 'auto' : '50%',
        needsScroll: false
      };
    } else {
      const tableMinWidth = universityCount * 220 + 120;
      return {
        containerClass: "overflow-x-auto",
        tableStyle: { 
          minWidth: `${tableMinWidth}px`,
          width: `${tableMinWidth}px` 
        },
        leftColumnWidth: '120px',
        universityColumnWidth: '220px',
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
            <p className="text-sm sm:text-base opacity-90 mt-1">{universities.length}校を比較中</p>
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
                          <p className="text-xs text-gray-600 mt-1 text-center">{university.soccer_club.league}</p>
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* 基本情報 */}
              <tr className="bg-green-50">
                <th 
                  colSpan={universities.length + 1} 
                  className={`p-2 sm:p-3 text-left font-semibold text-green-800 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} border-t border-b border-green-200`}
                >
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
                  リーグ
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center" style={{ 
                    minWidth: layout.universityColumnWidth, 
                    width: layout.universityColumnWidth 
                  }}>
                    <span className="bg-green-50 text-green-800 px-2 py-1 rounded-lg inline-block text-xs">
                      <span className="sm:hidden">
                        {university.soccer_club.league.includes('1部') ? '1部' : 
                         university.soccer_club.league.includes('2部') ? '2部' : '他'}
                      </span>
                      <span className="hidden sm:inline">{university.soccer_club.league}</span>
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>監督</td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center text-xs sm:text-sm truncate">{university.soccer_club.coach_name}</td>
                ))}
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>部員数</td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center font-medium">{university.soccer_club.total_members}名</td>
                ))}
              </tr>
              
              {/* 実績 */}
              <tr className="bg-yellow-50">
                <th colSpan={universities.length + 1} className={`p-2 sm:p-3 text-left font-semibold text-green-800 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} border-t border-b border-green-200`}>
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
                      {university.soccer_club.j_league_nominees_2022_24 || 0}名
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
                      {university.soccer_club.denso_cup_2024_25 || 0}名
                    </div>
                  </td>
                ))}
              </tr>
              
              {/* 施設 */}
              <tr className="bg-green-50">
                <th colSpan={universities.length + 1} className={`p-2 sm:p-3 text-left font-semibold text-green-800 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} border-t border-b border-green-200`}>
                  施設・環境
                </th>
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
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>寮</td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center">
                    {university.soccer_club?.dorm_details ? (
                      <div className="space-y-1">
                        {university.soccer_club.dorm_details.university_dorm && (
                          <span className="bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full inline-block text-xs">大学寮</span>
                        )}
                        {university.soccer_club.dorm_details.soccer_club_dorm && (
                          <span className="bg-blue-100 text-blue-700 font-medium px-2 py-1 rounded-full inline-block text-xs">部寮</span>
                        )}
                        {university.soccer_club.dorm_details.general_dorm && (
                          <span className="bg-purple-100 text-purple-700 font-medium px-2 py-1 rounded-full inline-block text-xs">部員寮</span>
                        )}
                        {!university.soccer_club.dorm_details.university_dorm && 
                        !university.soccer_club.dorm_details.soccer_club_dorm && 
                        !university.soccer_club.dorm_details.general_dorm && (
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full inline-block text-xs">なし</span>
                        )}
                      </div>
                    ) : (
                      university.soccer_club?.dorm_available ? (
                        <span className="bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full inline-block text-xs">あり</span>
                      ) : (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full inline-block text-xs">なし</span>
                      )
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>奨学金</td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center">
                    {university.soccer_club.sports_scholarship ? (
                      <span className="bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full inline-block text-xs">あり</span>
                    ) : (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full inline-block text-xs">なし</span>
                    )}
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
                          {university.soccer_club.qualifications?.slice(0, 1).map((qualification, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-1 py-1 rounded-full text-xs mb-1 block text-center">
                              {qualification.length > 6 ? qualification.substring(0, 6) + '...' : qualification}
                            </span>
                          ))}
                          {university.soccer_club.qualifications?.length > 1 && (
                            <span className="text-xs text-gray-500">+{university.soccer_club.qualifications.length - 1}</span>
                          )}
                        </>
                      ) : (
                        university.soccer_club.qualifications?.slice(0, 3).map((qualification, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-1 py-1 rounded-full text-xs mb-1 block text-center">
                            {qualification}
                          </span>
                        ))
                      )}
                      {(!university.soccer_club.qualifications || university.soccer_club.qualifications.length === 0) && (
                        <span className="text-gray-500 text-xs">情報なし</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
              
              {/* 入部条件 */}
              <tr className="bg-purple-50">
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
                    {university.entry_conditions.sports_recommend ? (
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
                    {university.entry_conditions.selection ? (
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
              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>
                  <span className="hidden sm:inline">一般入部</span>
                  <span className="sm:hidden">一般</span>
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3">
                    {university.entry_conditions.general_admission ? (
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
      </div>
    </div>
  );
};

export default CompareView;