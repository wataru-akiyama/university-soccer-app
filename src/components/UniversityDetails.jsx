import React, { useState } from 'react';
import { ChevronRight, Star, Heart, Home, ScrollText, FileText, Award, Check } from 'lucide-react';

// 大学詳細コンポーネント
const UniversityDetails = ({ 
  university, 
  onBack, 
  onAddToCompare, 
  onAddToFavorites, 
  isInCompareList,
  isInFavorites 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* ヘッダー部分 */}
      <div className="relative">
        {/* 背景イメージ */}
        <div className="h-48 overflow-hidden">
          <img 
            src={`/images/universities/${university.id}.jpg`}
            alt={university.university_name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${process.env.PUBLIC_URL}/images/university-default.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-green-700 to-green-700 opacity-70"></div>
        </div>
        
        {/* コンテンツオーバーレイ */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="flex justify-between">
            <button 
              className="bg-white text-green-700 px-3 py-1 rounded-lg flex items-center text-sm shadow-md hover:bg-gray-100 transition-colors"
              onClick={onBack}
            >
              <ChevronRight className="transform rotate-180 mr-1" size={16} />
              一覧に戻る
            </button>
            
            <div className="flex space-x-2">
              <button 
                className={`rounded-full p-3 shadow-md transition-colors ${
                  isInFavorites
                  ? "bg-white text-red-500"
                  : "bg-pink-600 text-white hover:bg-pink-500"
                }`}
                onClick={() => onAddToFavorites(university)}
                disabled={isInFavorites}
                title={isInFavorites ? "お気に入り登録済み" : "お気に入りに追加"}
              >
                <Heart size={24} />
              </button>
              
              <button 
                className={`rounded-full p-3 shadow-md transition-colors ${
                  isInCompareList 
                    ? "bg-white text-yellow-500" 
                    : "bg-green-600 text-white hover:bg-green-500"
                }`}
                onClick={() => onAddToCompare(university)}
                disabled={isInCompareList}
                title={isInCompareList ? "比較リスト追加済み" : "比較リストに追加"}
              >
                <Star size={24} />
              </button>
            </div>
          </div>
          
          <div className="mt-auto flex items-end">
            <div className="bg-white rounded-full p-3 mr-4 shadow-md">
              <img 
                src={`/images/logos/${university.id}.png`}
                alt={`${university.university_name} ロゴ`}
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${process.env.PUBLIC_URL}/images/default-logo.png`;
                }}
              />
            </div>
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-1">{university.university_name}</h2>
              <p className="text-xl font-medium text-green-100">{university.soccer_club.league}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* タブメニュー */}
      <div className="flex border-b overflow-x-auto bg-white shadow-sm sticky top-0 z-10">
        <button 
          className={`px-6 py-4 text-center font-medium transition-colors rounded-t-lg ${
            activeTab === 'overview' 
              ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
              : 'text-gray-600 hover:bg-green-50'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          概要
        </button>
        <button 
          className={`px-6 py-4 text-center font-medium transition-colors rounded-t-lg ${
            activeTab === 'members' 
              ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
              : 'text-gray-600 hover:bg-green-50'
          }`}
          onClick={() => setActiveTab('members')}
        >
          部員数・実績
        </button>
        <button 
          className={`px-6 py-4 text-center font-medium transition-colors rounded-t-lg ${
            activeTab === 'facilities' 
              ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
              : 'text-gray-600 hover:bg-green-50'
          }`}
          onClick={() => setActiveTab('facilities')}
        >
          施設・環境
        </button>
        <button 
          className={`px-6 py-4 text-center font-medium transition-colors rounded-t-lg ${
            activeTab === 'entry' 
              ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
              : 'text-gray-600 hover:bg-green-50'
          }`}
          onClick={() => setActiveTab('entry')}
        >
          入部条件
        </button>
      </div>
      
      {/* タブコンテンツ */}
      <div className="p-6">
        {/* 概要タブ */}
        {activeTab === 'overview' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-green-100 py-3 px-5 border-b">
                  <h3 className="text-lg font-semibold text-green-800">基本情報</h3>
                </div>
                <div className="p-5">
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <th className="py-3 text-left text-gray-600 w-1/3">大学名</th>
                        <td className="py-3">{university.university_name}</td>
                      </tr>
                      <tr className="border-b">
                        <th className="py-3 text-left text-gray-600">リーグ</th>
                        <td className="py-3">{university.soccer_club.league}</td>
                      </tr>
                      <tr className="border-b">
                        <th className="py-3 text-left text-gray-600">監督</th>
                        <td className="py-3">{university.soccer_club.coach_name}</td>
                      </tr>
                      <tr className="border-b">
                        <th className="py-3 text-left text-gray-600">部員数</th>
                        <td className="py-3">{university.soccer_club.total_members}名</td>
                      </tr>
                      <tr>
                        <th className="py-3 text-left text-gray-600">公式サイト</th>
                        <td className="py-3">
                          <a 
                            href={university.homepage_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 hover:underline"
                          >
                            {university.homepage_url}
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-3 px-5 border-b">
                    <h3 className="text-lg font-semibold text-blue-800">主な学部・学科</h3>
                  </div>
                  <div className="p-5">
                    <ul className="list-disc list-inside space-y-2">
                      {university.main_faculties.map((faculty, index) => (
                        <li key={index} className="text-gray-700">{faculty}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 py-3 px-5 border-b">
                    <h3 className="text-lg font-semibold text-purple-800">特徴</h3>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-3">
                      {university.soccer_club.dorm_available && (
                        <div className="flex items-center rounded-lg px-4 py-3 bg-purple-50 border border-purple-200 shadow-sm">
                          <Home size={18} className="text-purple-700 mr-2" />
                          <span className="font-medium text-purple-800">寮あり</span>
                        </div>
                      )}
                      
                      {university.soccer_club.sports_scholarship && (
                        <div className="flex items-center rounded-lg px-4 py-3 bg-blue-50 border border-blue-200 shadow-sm">
                          <ScrollText size={18} className="text-blue-700 mr-2" />
                          <span className="font-medium text-blue-800">奨学金あり</span>
                        </div>
                      )}
                      
                      {university.entry_conditions.sports_recommend && (
                        <div className="flex items-center rounded-lg px-4 py-3 bg-green-50 border border-green-200 shadow-sm">
                          <FileText size={18} className="text-green-700 mr-2" />
                          <span className="font-medium text-green-800">スポーツ推薦あり</span>
                        </div>
                      )}
                    </div>
                  </div>
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
                          className="w-16 bg-green-500 rounded-t"
                          style={{ height: `${height}%` }}
                        >
                          <div className="bg-green-600 h-1"></div>
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
                  
                  <div className="bg-green-50 p-4 rounded border border-green-200">
                    <h4 className="font-semibold mb-2">デンソーカップ出場選手数 (2024-2025)</h4>
                    <div className="text-3xl font-bold text-center text-green-700">
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
                
                <div className="mt-6 bg-green-50 p-4 rounded border border-green-200">
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