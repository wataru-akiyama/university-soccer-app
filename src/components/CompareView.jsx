import React from 'react';
import { ChevronRight, X } from 'lucide-react';

// 比較ビューコンポーネント
const CompareView = ({ universities, onBack, onRemove }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
        <button 
          className="bg-white text-green-700 px-3 py-1 rounded-lg mb-4 flex items-center text-sm shadow-sm hover:bg-gray-100 transition-colors"
          onClick={onBack}
        >
          <ChevronRight className="transform rotate-180 mr-1" size={16} />
          一覧に戻る
        </button>
        <h2 className="text-2xl font-bold">大学サッカー部比較</h2>
      </div>
      
      <div className="p-6 overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr>
              <th className="p-3 text-left bg-gray-50 sticky left-0 z-10 rounded-tl-lg"></th>
              {universities.map((university, index) => (
                <th key={university.id} className={`p-3 min-w-60 ${index === universities.length - 1 ? 'rounded-tr-lg' : ''}`}>
                  <div className="relative">
                    {/* ロゴ背景 */}
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
                        <h3 className="font-bold text-center">{university.university_name}</h3>
                        <p className="text-sm text-gray-600">{university.soccer_club.league}</p>
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
            <th colSpan={universities.length + 1} className="p-3 text-left font-semibold text-green-800 sticky left-0 z-10 border-t border-b border-green-200">
                基本情報
              </th>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">リーグ</td>
              {universities.map(university => (
                <td key={university.id} className="p-3 text-center">
                  <span className="bg-green-50 text-green-800 px-3 py-1 rounded-lg inline-block">
                    {university.soccer_club.league}
                  </span>
                </td>
              ))}
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">監督</td>
              {universities.map(university => (
                <td key={university.id} className="p-3 text-center">{university.soccer_club.coach_name}</td>
              ))}
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">部員数</td>
              {universities.map(university => (
                <td key={university.id} className="p-3 text-center font-medium">{university.soccer_club.total_members}名</td>
              ))}
            </tr>
            
            {/* 実績 */}
            <tr className="bg-yellow-50">
            <th colSpan={universities.length + 1} className="p-3 text-left font-semibold text-green-800 sticky left-0 z-10 border-t border-b border-green-200">
                実績
              </th>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">Jリーグ内定者数</td>
              {universities.map(university => (
                <td key={university.id} className="p-3 text-center">
                  <div className="rounded-full bg-yellow-100 text-yellow-800 font-bold py-1 mx-auto w-16">
                    {university.soccer_club.j_league_nominees_2022_24}名
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">デンソーカップ出場者数</td>
              {universities.map(university => (
                <td key={university.id} className="p-3 text-center">
                  <div className="rounded-full bg-green-100 text-green-800 font-bold py-1 mx-auto w-16">
                    {university.soccer_club.denso_cup_2024_25}名
                  </div>
                </td>
              ))}
            </tr>
            
            {/* 施設 */}
            <tr className="bg-green-50">
            <th colSpan={universities.length + 1} className="p-3 text-left font-semibold text-green-800 sticky left-0 z-10 border-t border-b border-green-200">
                施設・環境
              </th>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">サッカーコート数</td>
              {universities.map(university => (
                <td key={university.id} className="p-3 text-center">{university.soccer_club.soccer_field_count}面</td>
              ))}
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">寮</td>
              {universities.map(university => (
                <td key={university.id} className="p-3 text-center">
                  {university.soccer_club.dorm_available ? (
                    <span className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full inline-block">あり</span>
                  ) : (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full inline-block">なし</span>
                  )}
                </td>
              ))}
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">奨学金</td>
              {universities.map(university => (
                <td key={university.id} className="p-3 text-center">
                  {university.soccer_club.sports_scholarship ? (
                    <span className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full inline-block">あり</span>
                  ) : (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full inline-block">なし</span>
                  )}
                </td>
              ))}
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">取得可能資格</td>
              {universities.map(university => (
                <td key={university.id} className="p-3">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {university.soccer_club.qualifications.map((qualification, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mb-1">
                        {qualification}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            
            {/* 入部条件 */}
            <tr className="bg-purple-50">
            <th colSpan={universities.length + 1} className="p-3 text-left font-semibold text-green-800 sticky left-0 z-10 border-t border-b border-green-200">
                入部条件
              </th>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">スポーツ推薦</td>
              {universities.map(university => (
                <td key={university.id} className="p-3">
                  {university.entry_conditions.sports_recommend ? (
                    <div className="text-center">
                      <span className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full inline-block mb-2">あり</span>
                      <p className="text-sm">{university.entry_conditions.recommend_criteria}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full inline-block">なし</span>
                    </div>
                  )}
                </td>
              ))}
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">セレクション</td>
              {universities.map(university => (
                <td key={university.id} className="p-3">
                  {university.entry_conditions.selection ? (
                    <div className="text-center">
                      <span className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full inline-block mb-2">あり</span>
                      <p className="text-sm">時期: {university.entry_conditions.selection_period}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full inline-block">なし</span>
                    </div>
                  )}
                </td>
              ))}
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">一般入部</td>
              {universities.map(university => (
                <td key={university.id} className="p-3">
                  {university.entry_conditions.general_admission ? (
                    <div className="text-center">
                      <span className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full inline-block mb-2">可能</span>
                      <p className="text-sm">{university.entry_conditions.general_conditions}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full inline-block">不可</span>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareView;