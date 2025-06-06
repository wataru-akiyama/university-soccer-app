import React, { useState } from 'react';
import { ChevronRight, X, ChevronDown, ChevronUp } from 'lucide-react';

// 比較ビューコンポーネント
const CompareView = ({ universities, onBack, onRemove }) => {
  // 小画面用のアコーディオン状態（各大学ごとに管理）
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // 小画面用のカード表示コンポーネント
  const MobileCompareCards = () => (
    <div className="md:hidden space-y-6">
      {universities.map((university) => {
        const basicKey = `basic-${university.id}`;
        const performanceKey = `performance-${university.id}`;
        const facilitiesKey = `facilities-${university.id}`;
        const admissionKey = `admission-${university.id}`;

        return (
          <div key={university.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* ヘッダー */}
            <div className="relative p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
              <button 
                className="absolute top-2 right-2 text-red-500 p-1 hover:bg-red-50 rounded-full"
                onClick={() => onRemove(university.id)}
              >
                <X size={16} />
              </button>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white rounded-full p-2 shadow-sm mr-3">
                  <img 
                    src={`/images/logos/${university.id}.png`}
                    alt={`${university.university_name} ロゴ`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${process.env.PUBLIC_URL}/images/default-logo.png`;
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{university.university_name}</h3>
                  <p className="text-sm text-gray-600">{university.soccer_club.league}</p>
                </div>
              </div>
            </div>

            {/* アコーディオンセクション */}
            <div className="divide-y divide-gray-200">
              {/* 基本情報 */}
              <div>
                <button
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleSection(basicKey)}
                >
                  <span className="font-medium text-gray-900">基本情報</span>
                  {expandedSections[basicKey] ? 
                    <ChevronUp size={20} className="text-gray-500" /> : 
                    <ChevronDown size={20} className="text-gray-500" />}
                </button>
                {expandedSections[basicKey] && (
                  <div className="px-4 pb-4 space-y-3 bg-gray-50">
                    <div className="flex justify-between">
                      <span className="text-gray-600">リーグ</span>
                      <span className="font-medium">{university.soccer_club.league}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">監督</span>
                      <span className="font-medium">{university.soccer_club.coach_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">部員数</span>
                      <span className="font-medium">{university.soccer_club.total_members}名</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 実績 */}
              <div>
                <button
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleSection(performanceKey)}
                >
                  <span className="font-medium text-gray-900">実績</span>
                  {expandedSections[performanceKey] ? 
                    <ChevronUp size={20} className="text-gray-500" /> : 
                    <ChevronDown size={20} className="text-gray-500" />}
                </button>
                {expandedSections[performanceKey] && (
                  <div className="px-4 pb-4 space-y-3 bg-gray-50">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jリーグ内定者数</span>
                      <span className="font-medium text-yellow-600">{university.soccer_club.j_league_nominees_2022_24 || 0}名</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">デンソーカップ</span>
                      <span className="font-medium text-green-600">{university.soccer_club.denso_cup_2024_25 || 0}名</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 施設・環境 */}
              <div>
                <button
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleSection(facilitiesKey)}
                >
                  <span className="font-medium text-gray-900">施設・環境</span>
                  {expandedSections[facilitiesKey] ? 
                    <ChevronUp size={20} className="text-gray-500" /> : 
                    <ChevronDown size={20} className="text-gray-500" />}
                </button>
                {expandedSections[facilitiesKey] && (
                  <div className="px-4 pb-4 space-y-3 bg-gray-50">
                    <div className="flex justify-between">
                      <span className="text-gray-600">コート数</span>
                      <span className="font-medium">{university.soccer_club.soccer_field_count}面</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">寮</span>
                      <span className={`font-medium ${university.soccer_club.dorm_available ? 'text-green-600' : 'text-red-500'}`}>
                        {university.soccer_club.dorm_available ? 'あり' : 'なし'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">奨学金</span>
                      <span className={`font-medium ${university.soccer_club.sports_scholarship ? 'text-green-600' : 'text-red-500'}`}>
                        {university.soccer_club.sports_scholarship ? 'あり' : 'なし'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* 入部条件 */}
              <div>
                <button
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleSection(admissionKey)}
                >
                  <span className="font-medium text-gray-900">入部条件</span>
                  {expandedSections[admissionKey] ? 
                    <ChevronUp size={20} className="text-gray-500" /> : 
                    <ChevronDown size={20} className="text-gray-500" />}
                </button>
                {expandedSections[admissionKey] && (
                  <div className="px-4 pb-4 space-y-3 bg-gray-50">
                    <div className="flex justify-between">
                      <span className="text-gray-600">スポーツ推薦</span>
                      <span className={`font-medium ${university.entry_conditions.sports_recommend ? 'text-green-600' : 'text-red-500'}`}>
                        {university.entry_conditions.sports_recommend ? 'あり' : 'なし'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">セレクション</span>
                      <span className={`font-medium ${university.entry_conditions.selection ? 'text-green-600' : 'text-red-500'}`}>
                        {university.entry_conditions.selection ? 'あり' : 'なし'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">一般入部</span>
                      <span className={`font-medium ${university.entry_conditions.general_admission ? 'text-green-600' : 'text-red-500'}`}>
                        {university.entry_conditions.general_admission ? '可能' : '不可'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // テーブルのレイアウトを学校数に応じて動的に調整
  const getTableLayout = () => {
    const universityCount = universities.length;
    
    if (universityCount <= 2) {
      // 1-2校の場合：全幅表示、横スクロールなし
      return {
        containerClass: "w-full",
        tableStyle: { width: '100%' },
        leftColumnWidth: universityCount === 1 ? '200px' : '180px',
        universityColumnWidth: universityCount === 1 ? 'auto' : '50%',
        needsScroll: false
      };
    } else {
      // 3校以上の場合：横スクロール対応
      const tableMinWidth = universityCount * 280 + 200;
      return {
        containerClass: "overflow-x-auto",
        tableStyle: { 
          minWidth: `${tableMinWidth}px`,
          width: `${tableMinWidth}px` 
        },
        leftColumnWidth: '200px',
        universityColumnWidth: '280px',
        needsScroll: true
      };
    }
  };

  const layout = getTableLayout();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 sm:p-6">
        <button 
          className="bg-white text-green-700 px-3 py-1 rounded-lg mb-4 flex items-center text-sm shadow-sm hover:bg-gray-100 transition-colors"
          onClick={onBack}
        >
          <ChevronRight className="transform rotate-180 mr-1" size={16} />
          一覧に戻る
        </button>
        <h2 className="text-xl sm:text-2xl font-bold">大学サッカー部比較</h2>
        <p className="text-sm sm:text-base opacity-90 mt-1">{universities.length}校を比較中</p>
      </div>
      
      <div className="p-4 sm:p-6">
        {/* 小画面用のカード表示 */}
        <MobileCompareCards />
        
        {/* 大画面用のテーブル表示 */}
        <div className="hidden md:block">
          {/* テーブルコンテナ（学校数に応じて動的調整） */}
          <div 
            className={`${layout.containerClass} border border-gray-200 rounded-lg shadow-sm`}
          >
            <table 
              className="bg-white"
              style={layout.tableStyle}
            >
              <thead>
                <tr>
                  <th 
                    className={`p-3 text-left bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} rounded-tl-lg border-r border-gray-200`}
                    style={{ 
                      minWidth: layout.leftColumnWidth, 
                      width: layout.leftColumnWidth 
                    }}
                  ></th>
                  {universities.map((university, index) => (
                    <th 
                      key={university.id} 
                      className={`p-3 bg-white ${index === universities.length - 1 ? 'rounded-tr-lg' : ''}`}
                      style={{ 
                        minWidth: layout.universityColumnWidth, 
                        width: layout.universityColumnWidth 
                      }}
                    >
                      <div className="relative">
                        {/* 背景ロゴ */}
                        <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center opacity-10">
                          <img 
                            src={`/images/logos/${university.id}.png`}
                            alt=""
                            className="h-24 w-24 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex justify-between items-center">
                            <button 
                              className="text-red-500 p-1 hover:bg-red-50 rounded-full absolute -top-2 -right-2"
                              onClick={() => onRemove(university.id)}
                            >
                              <X size={16} />
                            </button>
                          </div>
                          
                          <div className="flex flex-col items-center mb-2 pt-3">
                            <div className="bg-white rounded-full p-2 shadow-sm mb-2">
                              <img 
                                src={`/images/logos/${university.id}.png`}
                                alt={`${university.university_name} ロゴ`}
                                className="w-12 h-12 object-contain"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `${process.env.PUBLIC_URL}/images/default-logo.png`;
                                }}
                              />
                            </div>
                            <h3 className="font-bold text-center text-sm leading-tight">{university.university_name}</h3>
                            <p className="text-xs text-gray-600 mt-1">{university.soccer_club.league}</p>
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
                    className={`p-3 text-left font-semibold text-green-800 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} border-t border-b border-green-200`}
                  >
                    基本情報
                  </th>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td 
                    className={`p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}
                    style={{ 
                      minWidth: layout.leftColumnWidth, 
                      width: layout.leftColumnWidth 
                    }}
                  >
                    リーグ
                  </td>
                  {universities.map(university => (
                    <td key={university.id} className="p-3 text-center" style={{ 
                      minWidth: layout.universityColumnWidth, 
                      width: layout.universityColumnWidth 
                    }}>
                      <span className="bg-green-50 text-green-800 px-3 py-1 rounded-lg inline-block text-xs">
                        {university.soccer_club.league}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className={`p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>監督</td>
                  {universities.map(university => (
                    <td key={university.id} className="p-3 text-center text-sm">{university.soccer_club.coach_name}</td>
                  ))}
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className={`p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>部員数</td>
                  {universities.map(university => (
                    <td key={university.id} className="p-3 text-center font-medium">{university.soccer_club.total_members}名</td>
                  ))}
                </tr>
                
                {/* 実績 */}
                <tr className="bg-yellow-50">
                  <th colSpan={universities.length + 1} className={`p-3 text-left font-semibold text-green-800 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} border-t border-b border-green-200`}>
                    実績
                  </th>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className={`p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>Jリーグ内定者数</td>
                  {universities.map(university => (
                    <td key={university.id} className="p-3 text-center">
                      <div className="rounded-full bg-yellow-100 text-yellow-800 font-bold py-1 mx-auto w-16 text-sm">
                        {university.soccer_club.j_league_nominees_2022_24 || 0}名
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className={`p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>デンソーカップ出場者数</td>
                  {universities.map(university => (
                    <td key={university.id} className="p-3 text-center">
                      <div className="rounded-full bg-green-100 text-green-800 font-bold py-1 mx-auto w-16 text-sm">
                        {university.soccer_club.denso_cup_2024_25 || 0}名
                      </div>
                    </td>
                  ))}
                </tr>
                
                {/* 施設 */}
                <tr className="bg-green-50">
                  <th colSpan={universities.length + 1} className={`p-3 text-left font-semibold text-green-800 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} border-t border-b border-green-200`}>
                    施設・環境
                  </th>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className={`p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>サッカーコート数</td>
                  {universities.map(university => (
                    <td key={university.id} className="p-3 text-center">{university.soccer_club.soccer_field_count}面</td>
                  ))}
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className={`p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>寮</td>
                  {universities.map(university => (
                    <td key={university.id} className="p-3 text-center">
                      {university.soccer_club.dorm_available ? (
                        <span className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full inline-block text-xs">あり</span>
                      ) : (
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full inline-block text-xs">なし</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className={`p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>奨学金</td>
                  {universities.map(university => (
                    <td key={university.id} className="p-3 text-center">
                      {university.soccer_club.sports_scholarship ? (
                        <span className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full inline-block text-xs">あり</span>
                      ) : (
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full inline-block text-xs">なし</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className={`p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>取得可能資格</td>
                  {universities.map(university => (
                    <td key={university.id} className="p-3">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {layout.needsScroll ? (
                          // 3校以上の場合：省略表示
                          <>
                            {university.soccer_club.qualifications?.slice(0, 2).map((qualification, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mb-1">
                                {qualification.length > 8 ? qualification.substring(0, 8) + '...' : qualification}
                              </span>
                            ))}
                            {university.soccer_club.qualifications?.length > 2 && (
                              <span className="text-xs text-gray-500">+{university.soccer_club.qualifications.length - 2}件</span>
                            )}
                          </>
                        ) : (
                          // 1-2校の場合：全表示
                          university.soccer_club.qualifications?.map((qualification, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mb-1">
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
                  <th colSpan={universities.length + 1} className={`p-3 text-left font-semibold text-green-800 ${layout.needsScroll ? 'sticky left-0 z-20' : ''} border-t border-b border-green-200`}>
                    入部条件
                  </th>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className={`p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>スポーツ推薦</td>
                  {universities.map(university => (
                    <td key={university.id} className="p-3">
                      {university.entry_conditions.sports_recommend ? (
                        <div className="text-center">
                          <span className="bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full inline-block mb-2 text-xs">あり</span>
                          <p className="text-xs text-gray-600">{university.entry_conditions.recommend_criteria}</p>
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
                  <td className={`p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>セレクション</td>
                  {universities.map(university => (
                    <td key={university.id} className="p-3">
                      {university.entry_conditions.selection ? (
                        <div className="text-center">
                          <span className="bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full inline-block mb-2 text-xs">あり</span>
                          <p className="text-xs text-gray-600">時期: {university.entry_conditions.selection_period}</p>
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
                  <td className={`p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>一般入部</td>
                  {universities.map(university => (
                    <td key={university.id} className="p-3">
                      {university.entry_conditions.general_admission ? (
                        <div className="text-center">
                          <span className="bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full inline-block mb-2 text-xs">可能</span>
                          <p className="text-xs text-gray-600">{university.entry_conditions.general_conditions}</p>
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
        </div>
      </div>
    </div>
  );
};

export default CompareView;