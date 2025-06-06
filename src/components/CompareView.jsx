import React from 'react';
import { ChevronRight, X } from 'lucide-react';

// 比較ビューコンポーネント - スマホ対応テーブル版
const CompareView = ({ universities, onBack, onRemove }) => {
  // テーブルのレイアウトを学校数に応じて動的に調整
  const getTableLayout = () => {
    const universityCount = universities.length;
    
    if (universityCount <= 2) {
      // 1-2校の場合：全幅表示、横スクロールなし
      return {
        containerClass: "w-full",
        tableStyle: { width: '100%' },
        leftColumnWidth: universityCount === 1 ? '120px' : '100px',
        universityColumnWidth: universityCount === 1 ? 'auto' : '50%',
        needsScroll: false
      };
    } else {
      // 3校以上の場合：横スクロール対応
      const tableMinWidth = universityCount * 220 + 120; // スマホ用に幅を狭く
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
        <h2 className="text-lg sm:text-2xl font-bold">大学サッカー部比較</h2>
        <p className="text-sm sm:text-base opacity-90 mt-1">{universities.length}校を比較中</p>
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
                        <img 
                          src={`/images/logos/${university.id}.png`}
                          alt=""
                          className="h-12 sm:h-24 w-12 sm:w-24 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
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
                          <div className="bg-white rounded-full p-1 sm:p-2 shadow-sm mb-1 sm:mb-2">
                            <img 
                              src={`/images/logos/${university.id}.png`}
                              alt={`${university.university_name} ロゴ`}
                              className="w-6 h-6 sm:w-10 sm:h-10 object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `${process.env.PUBLIC_URL}/images/default-logo.png`;
                              }}
                            />
                          </div>
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
                      {/* スマホでは省略表示 */}
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
                  <span className="hidden sm:inline">サッカーコート数</span>
                  <span className="sm:hidden">コート</span>
                </td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center">{university.soccer_club.soccer_field_count}面</td>
                ))}
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className={`p-2 sm:p-3 font-medium bg-gray-50 ${layout.needsScroll ? 'sticky left-0 z-10' : ''} border-r border-gray-200`}>寮</td>
                {universities.map(university => (
                  <td key={university.id} className="p-2 sm:p-3 text-center">
                    {university.soccer_club.dorm_available ? (
                      <span className="bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full inline-block text-xs">あり</span>
                    ) : (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full inline-block text-xs">なし</span>
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
                        // 3校以上の場合：省略表示
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
                        // 1-2校の場合：全表示
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