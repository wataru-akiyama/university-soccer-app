import React from 'react';
import { ChevronRight } from 'lucide-react';

// 比較ビューコンポーネント
const CompareView = ({ universities, onBack, onRemove }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-700 text-white p-6">
        <button 
          className="bg-white text-blue-700 px-3 py-1 rounded mb-4 flex items-center text-sm"
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
            <tr className="border-b-2 border-gray-200">
              <th className="p-3 text-left bg-gray-50 sticky left-0 z-10">項目</th>
              {universities.map(university => (
                <th key={university.id} className="p-3 min-w-60">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{university.university_name}</span>
                    <button 
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => onRemove(university.id)}
                    >
                      ×
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* 基本情報 */}
            <tr className="bg-blue-50">
              <th colSpan={universities.length + 1} className="p-2 text-left font-semibold text-blue-800 sticky left-0 z-10">
                基本情報
              </th>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">リーグ</td>
              {universities.map(university => (
                <td key={university.id} className="p-3">{university.soccer_club.league}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">監督</td>
              {universities.map(university => (
                <td key={university.id} className="p-3">{university.soccer_club.coach_name}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">部員数</td>
              {universities.map(university => (
                <td key={university.id} className="p-3">{university.soccer_club.total_members}名</td>
              ))}
            </tr>
            
            {/* 実績 */}
            <tr className="bg-yellow-50">
              <th colSpan={universities.length + 1} className="p-2 text-left font-semibold text-yellow-800 sticky left-0 z-10">
                実績
              </th>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">Jリーグ内定者数</td>
              {universities.map(university => (
                <td key={university.id} className="p-3 font-semibold">
                  {university.soccer_club.j_league_nominees_2022_24}名
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">デンソーカップ出場者数</td>
              {universities.map(university => (
                <td key={university.id} className="p-3">
                  {university.soccer_club.denso_cup_2024_25}名
                </td>
              ))}
            </tr>
            
            {/* 施設 */}
            <tr className="bg-green-50">
              <th colSpan={universities.length + 1} className="p-2 text-left font-semibold text-green-800 sticky left-0 z-10">
                施設・環境
              </th>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">サッカーコート数</td>
              {universities.map(university => (
                <td key={university.id} className="p-3">{university.soccer_club.soccer_field_count}面</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">寮</td>
              {universities.map(university => (
                <td key={university.id} className="p-3">
                  {university.soccer_club.dorm_available ? (
                    <span className="text-green-600 font-medium">あり</span>
                  ) : (
                    <span className="text-red-600">なし</span>
                  )}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">奨学金</td>
              {universities.map(university => (
                <td key={university.id} className="p-3">
                  {university.soccer_club.sports_scholarship ? (
                    <span className="text-green-600 font-medium">あり</span>
                  ) : (
                    <span className="text-red-600">なし</span>
                  )}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">取得可能資格</td>
              {universities.map(university => (
                <td key={university.id} className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {university.soccer_club.qualifications.map((qualification, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-1 py-0.5 rounded text-xs mb-1">
                        {qualification}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            
            {/* 入部条件 */}
            <tr className="bg-purple-50">
              <th colSpan={universities.length + 1} className="p-2 text-left font-semibold text-purple-800 sticky left-0 z-10">
                入部条件
              </th>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">スポーツ推薦</td>
              {universities.map(university => (
                <td key={university.id} className="p-3">
                  {university.entry_conditions.sports_recommend ? (
                    <div>
                      <span className="text-green-600 font-medium">あり</span>
                      <p className="text-sm mt-1">{university.entry_conditions.recommend_criteria}</p>
                    </div>
                  ) : (
                    <span className="text-red-600">なし</span>
                  )}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">セレクション</td>
              {universities.map(university => (
                <td key={university.id} className="p-3">
                  {university.entry_conditions.selection ? (
                    <div>
                      <span className="text-green-600 font-medium">あり</span>
                      <p className="text-sm mt-1">時期: {university.entry_conditions.selection_period}</p>
                    </div>
                  ) : (
                    <span className="text-red-600">なし</span>
                  )}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium bg-gray-50 sticky left-0 z-10">一般入部</td>
              {universities.map(university => (
                <td key={university.id} className="p-3">
                  {university.entry_conditions.general_admission ? (
                    <div>
                      <span className="text-green-600 font-medium">可能</span>
                      <p className="text-sm mt-1">{university.entry_conditions.general_conditions}</p>
                    </div>
                  ) : (
                    <span className="text-red-600">不可</span>
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