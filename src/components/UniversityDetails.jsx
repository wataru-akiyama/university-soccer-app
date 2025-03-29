import React, { useState } from 'react';
import { ChevronRight, Star, Home, ScrollText, FileText, Award, Check } from 'lucide-react';

// 大学詳細コンポーネント
const UniversityDetails = ({ university, onBack, onAddToCompare, isInCompareList }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* ヘッダー部分 */}
      <div className="bg-blue-700 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <button 
              className="bg-white text-blue-700 px-3 py-1 rounded mb-4 flex items-center text-sm"
              onClick={onBack}
            >
              <ChevronRight className="transform rotate-180 mr-1" size={16} />
              一覧に戻る
            </button>
            <h2 className="text-2xl font-bold mb-1">{university.university_name}</h2>
            <p className="text-lg">{university.soccer_club.league}</p>
          </div>
          
          <button 
            className={`rounded-full p-2 ${
              isInCompareList 
                ? "bg-white text-yellow-500" 
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
            onClick={() => onAddToCompare(university)}
            disabled={isInCompareList}
          >
            <Star size={24} />
          </button>
        </div>
      </div>
      
      {/* タブメニュー */}
      <div className="flex border-b overflow-x-auto">
        <button 
          className={`px-4 py-3 text-center flex-grow ${activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('overview')}
        >
          概要
        </button>
        <button 
          className={`px-4 py-3 text-center flex-grow ${activeTab === 'members' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('members')}
        >
          部員数・実績
        </button>
        <button 
          className={`px-4 py-3 text-center flex-grow ${activeTab === 'facilities' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('facilities')}
        >
          施設・環境
        </button>
        <button 
          className={`px-4 py-3 text-center flex-grow ${activeTab === 'entry' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('entry')}
        >
          入部条件
        </button>
      </div>
      
      {/* タブコンテンツ */}
      <div className="p-6">
        {/* 概要タブ */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">基本情報</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <th className="py-2 text-left text-gray-600 w-1/3">大学名</th>
                      <td className="py-2">{university.university_name}</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-2 text-left text-gray-600">リーグ</th>
                      <td className="py-2">{university.soccer_club.league}</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-2 text-left text-gray-600">監督</th>
                      <td className="py-2">{university.soccer_club.coach_name}</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-2 text-left text-gray-600">部員数</th>
                      <td className="py-2">{university.soccer_club.total_members}名</td>
                    </tr>
                    <tr>
                      <th className="py-2 text-left text-gray-600">公式サイト</th>
                      <td className="py-2">
                        <a 
                          href={university.homepage_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {university.homepage_url}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">主な学部・学科</h3>
                <ul className="list-disc list-inside space-y-1">
                  {university.main_faculties.map((faculty, index) => (
                    <li key={index} className="text-gray-700">{faculty}</li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">特徴</h3>
                <div className="flex flex-wrap gap-2">
                  {university.soccer_club.dorm_available && (
                    <div className="flex items-center border rounded px-3 py-1 bg-purple-50">
                      <Home size={16} className="text-purple-700 mr-2" />
                      <span>寮あり</span>
                    </div>
                  )}
                  
                  {university.soccer_club.sports_scholarship && (
                    <div className="flex items-center border rounded px-3 py-1 bg-green-50">
                      <ScrollText size={16} className="text-green-700 mr-2" />
                      <span>奨学金あり</span>
                    </div>
                  )}
                  
                  {university.entry_conditions.sports_recommend && (
                    <div className="flex items-center border rounded px-3 py-1 bg-blue-50">
                      <FileText size={16} className="text-blue-700 mr-2" />
                      <span>スポーツ推薦あり</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 部員数・実績タブ */}
        {activeTab === 'members' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">学年別部員数</h3>
                <div className="h-64 flex items-end justify-around bg-gray-50 p-4 rounded">
                  {Object.entries(university.soccer_club.members_by_grade).map(([grade, count]) => {
                    const maxCount = Math.max(...Object.values(university.soccer_club.members_by_grade));
                    const height = (count / maxCount) * 100;
                    
                    return (
                      <div key={grade} className="flex flex-col items-center">
                        <div 
                          className="w-16 bg-blue-500 rounded-t"
                          style={{ height: `${height}%` }}
                        >
                          <div className="bg-blue-600 h-1"></div>
                        </div>
                        <div className="mt-2 text-sm">
                          <div className="font-semibold">{grade}</div>
                          <div className="text-center">{count}名</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">実績</h3>
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Award className="text-yellow-600 mr-2" size={18} />
                      Jリーグ内定者数 (2022-2024)
                    </h4>
                    <div className="text-3xl font-bold text-center text-yellow-700">
                      {university.soccer_club.j_league_nominees_2022_24}名
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded border border-blue-200">
                    <h4 className="font-semibold mb-2">デンソーカップ出場選手数 (2024-2025)</h4>
                    <div className="text-3xl font-bold text-center text-blue-700">
                      {university.soccer_club.denso_cup_2024_25}名
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 施設・環境タブ */}
        {activeTab === 'facilities' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">施設情報</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <th className="py-2 text-left text-gray-600 w-1/3">サッカーコート数</th>
                      <td className="py-2">{university.soccer_club.soccer_field_count}面</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-2 text-left text-gray-600">部員寮</th>
                      <td className="py-2">{university.soccer_club.dorm_available ? 'あり' : 'なし'}</td>
                    </tr>
                    <tr>
                      <th className="py-2 text-left text-gray-600">特記事項</th>
                      <td className="py-2">{university.soccer_club.facility_note}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">取得できる資格</h3>
                <div className="bg-gray-50 p-3 rounded mb-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {university.soccer_club.qualifications.map((qualification, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {qualification}
                      </span>
                    ))}
                  </div>
                  <p>{university.soccer_club.qualification_note}</p>
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">奨学金</h3>
                <div className="bg-gray-50 p-3 rounded">
                  {university.soccer_club.sports_scholarship 
                    ? <p className="text-green-700">サッカー部奨学金あり</p>
                    : <p className="text-gray-500">サッカー部専用の奨学金はありません</p>
                  }
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 入部条件タブ */}
        {activeTab === 'entry' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">スポーツ推薦</h3>
                <div className="bg-gray-50 p-4 rounded">
                  {university.entry_conditions.sports_recommend ? (
                    <>
                      <div className="flex items-center text-green-700 mb-2">
                        <Check size={20} className="mr-2" />
                        <span className="font-medium">スポーツ推薦あり</span>
                      </div>
                      <p>{university.entry_conditions.recommend_criteria}</p>
                    </>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <span className="font-medium">スポーツ推薦なし</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">セレクション</h3>
                <div className="bg-gray-50 p-4 rounded">
                  {university.entry_conditions.selection ? (
                    <>
                      <div className="flex items-center text-green-700 mb-2">
                        <Check size={20} className="mr-2" />
                        <span className="font-medium">セレクションあり</span>
                      </div>
                      <p>実施時期: {university.entry_conditions.selection_period}</p>
                    </>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <span className="font-medium">セレクションなし</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">一般入部</h3>
                <div className="bg-gray-50 p-4 rounded">
                  {university.entry_conditions.general_admission ? (
                    <>
                      <div className="flex items-center text-green-700 mb-2">
                        <Check size={20} className="mr-2" />
                        <span className="font-medium">一般入部可能</span>
                      </div>
                      <p>条件: {university.entry_conditions.general_conditions}</p>
                    </>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <span className="font-medium">一般入部不可</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 bg-blue-50 p-4 rounded border border-blue-200">
                  <h3 className="text-lg font-semibold mb-2">入部に関する注意事項</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>入部条件や推薦基準は年度によって変更される場合があります</li>
                    <li>最新情報は必ず大学公式サイトや説明会でご確認ください</li>
                    <li>セレクションの詳細な日程・場所は各大学にお問い合わせください</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityDetails;