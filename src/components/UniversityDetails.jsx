// src/components/UniversityDetails.jsx
import React, { useState } from 'react';
import { ChevronRight, Heart, BarChart2, Users, Award, BookOpen, Home, Medal, Calendar, Info, ArrowUpRight, FileText, Check } from 'lucide-react';

const UniversityDetails = ({ 
  university, 
  onBack, 
  onAddToCompare, 
  onAddToFavorites, 
  isInCompareList,
  isInFavorites 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // 年度別のJリーグ内定者の合計
  const totalJLeagueNominees = 
    (university.soccer_club.j_league_nominees_2022 || 0) + 
    (university.soccer_club.j_league_nominees_2023 || 0) + 
    (university.soccer_club.j_league_nominees_2024 || 0);
  
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
              
              {university.homepage_url && (
                <a 
                  href={university.homepage_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-3 bg-blue-600 text-white shadow-md hover:bg-blue-500 transition-colors"
                  title="公式サイトを開く"
                >
                  <ArrowUpRight size={24} />
                </a>
              )}
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
          <div className="flex items-center">
            <Info size={18} className="mr-2" />
            概要
          </div>
        </button>
        <button 
          className={`px-6 py-4 text-center font-medium transition-colors rounded-t-lg ${
            activeTab === 'members' 
              ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
              : 'text-gray-600 hover:bg-green-50'
          }`}
          onClick={() => setActiveTab('members')}
        >
          <div className="flex items-center">
            <Users size={18} className="mr-2" />
            部員・実績
          </div>
        </button>
        <button 
          className={`px-6 py-4 text-center font-medium transition-colors rounded-t-lg ${
            activeTab === 'facilities' 
              ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
              : 'text-gray-600 hover:bg-green-50'
          }`}
          onClick={() => setActiveTab('facilities')}
        >
          <div className="flex items-center">
            <Home size={18} className="mr-2" />
            施設・環境
          </div>
        </button>
        <button 
          className={`px-6 py-4 text-center font-medium transition-colors rounded-t-lg ${
            activeTab === 'entry' 
              ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
              : 'text-gray-600 hover:bg-green-50'
          }`}
          onClick={() => setActiveTab('entry')}
        >
          <div className="flex items-center">
            <FileText size={18} className="mr-2" />
            入部条件
          </div>
        </button>
        
        {/* PLAYMAKERコメントがある場合は解説タブを表示 */}
        {university.playmakerComment && (
          <button 
            className={`px-6 py-4 text-center font-medium transition-colors rounded-t-lg ${
              activeTab === 'playmaker' 
                ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
                : 'text-gray-600 hover:bg-green-50'
            }`}
            onClick={() => setActiveTab('playmaker')}
          >
            <div className="flex items-center">
              <BookOpen size={18} className="mr-2" />
              解説
            </div>
          </button>
        )}
      </div>
      
      {/* タブコンテンツ */}
      <div className="p-6">
        {/* 概要タブ */}
        {activeTab === 'overview' && (
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
                    <tr className="border-b">
                      <th className="py-3 text-left text-gray-600">学部情報</th>
                      <td className="py-3">{university.main_faculties.join('、')}</td>
                    </tr>
                    <tr>
                      <th className="py-3 text-left text-gray-600">公式サイト</th>
                      <td className="py-3">
                        {university.homepage_url ? (
                          <a 
                            href={university.homepage_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 hover:underline flex items-center"
                          >
                            公式サイトを見る
                            <ArrowUpRight size={14} className="ml-1" />
                          </a>
                        ) : "非公開"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* 実績ハイライト */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-3 px-5 border-b">
                  <h3 className="text-lg font-semibold text-yellow-800">実績ハイライト</h3>
                </div>
                <div className="p-5">
                  {/* Jリーグ内定カード */}
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Medal className="text-yellow-600 mr-2" size={18} />
                      Jリーグ内定者数 (過去3年間)
                    </h4>
                    <div className="text-3xl font-bold text-center text-yellow-700 mb-2">
                      {totalJLeagueNominees}名
                    </div>
                    
                    {/* 年度別表示 */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-white p-2 rounded-md">
                        <div className="text-xs text-gray-500">2022年</div>
                        <div className="font-bold text-yellow-600">{university.soccer_club.j_league_nominees_2022 || 0}名</div>
                      </div>
                      <div className="bg-white p-2 rounded-md">
                        <div className="text-xs text-gray-500">2023年</div>
                        <div className="font-bold text-yellow-600">{university.soccer_club.j_league_nominees_2023 || 0}名</div>
                      </div>
                      <div className="bg-white p-2 rounded-md">
                        <div className="text-xs text-gray-500">2024年</div>
                        <div className="font-bold text-yellow-600">{university.soccer_club.j_league_nominees_2024 || 0}名</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* デンソーカップ出場 */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Award className="text-blue-600 mr-2" size={18} />
                      デンソーカップ出場選手数
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-white p-2 rounded-md">
                        <div className="text-xs text-gray-500">2024年</div>
                        <div className="font-bold text-blue-600">{university.soccer_club.denso_cup_2024_25 || 0}名</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 入部条件ハイライト */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-green-100 py-3 px-5 border-b">
                  <h3 className="text-lg font-semibold text-green-800">入部条件ハイライト</h3>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-3">
                    {university.soccer_club.dorm_available && (
                      <div className="flex items-center rounded-lg px-4 py-3 bg-purple-50 border border-purple-200 shadow-sm">
                        <Home size={18} className="text-purple-700 mr-2" />
                        <span className="font-medium text-purple-800">寮あり</span>
                      </div>
                    )}
                    
                    {university.entry_conditions.sports_recommend && (
                      <div className="flex items-center rounded-lg px-4 py-3 bg-green-50 border border-green-200 shadow-sm">
                        <FileText size={18} className="text-green-700 mr-2" />
                        <span className="font-medium text-green-800">スポーツ推薦あり</span>
                      </div>
                    )}
                    
                    {university.entry_conditions.selection && (
                      <div className="flex items-center rounded-lg px-4 py-3 bg-blue-50 border border-blue-200 shadow-sm">
                        <Calendar size={18} className="text-blue-700 mr-2" />
                        <span className="font-medium text-blue-800">セレクションあり</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 部員・実績タブ */}
        {activeTab === 'members' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Users size={20} className="mr-2 text-green-600" />
                  学年別部員数
                </h3>
                <div className="h-64 flex items-end justify-around bg-gray-50 p-4 rounded-lg">
                  {Object.entries(university.soccer_club.members_by_grade).map(([grade, count]) => {
                    const maxCount = Math.max(...Object.values(university.soccer_club.members_by_grade));
                    const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
                    
                    return (
                      <div key={grade} className="flex flex-col items-center">
                        <div 
                          className="w-16 bg-gradient-to-t from-green-600 to-green-400 rounded-t"
                          style={{ height: `${height}%` }}
                        >
                          <div className="bg-green-700 h-1"></div>
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
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Medal size={20} className="mr-2 text-yellow-600" />
                  Jリーグ内定実績
                </h3>
                <div className="bg-white rounded-lg shadow-md p-5">
                  {/* Jリーグ内定グラフ（バー） */}
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      <BarChart2 className="text-yellow-600 mr-2" size={18} />
                      <span className="font-medium">年度別推移</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        { year: '2022', count: university.soccer_club.j_league_nominees_2022 || 0 },
                        { year: '2023', count: university.soccer_club.j_league_nominees_2023 || 0 },
                        { year: '2024', count: university.soccer_club.j_league_nominees_2024 || 0 }
                      ].map(({ year, count }) => {
                        const maxCount = Math.max(
                          university.soccer_club.j_league_nominees_2022 || 0,
                          university.soccer_club.j_league_nominees_2023 || 0,
                          university.soccer_club.j_league_nominees_2024 || 0
                        );
                        const width = maxCount > 0 ? `${(count / maxCount) * 100}%` : '0%';
                        
                        return (
                          <div key={year} className="flex items-center">
                            <div className="w-10 text-sm text-right mr-2">{year}</div>
                            <div className="flex-grow bg-gray-200 rounded-full h-6 overflow-hidden">
                              <div 
                                className="h-full bg-yellow-500 rounded-full relative"
                                style={{ width }}
                              >
                                {count > 0 && (
                                  <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                                    {count}名
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-3 flex items-center">
                  <Award size={20} className="mr-2 text-blue-600" />
                  デンソーカップ出場者数
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold mb-2">デンソーカップ出場選手数 (2024-2025)</h4>
                  <div className="text-3xl font-bold text-center text-blue-700">
                    {university.soccer_club.denso_cup_2024_25 || 0}名
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
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Home size={20} className="mr-2 text-purple-600" />
                  施設情報
                </h3>
                <div className="bg-white rounded-lg shadow-md p-5">
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
                        <td className="py-2">{university.soccer_club.facility_note || '-'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <BookOpen size={20} className="mr-2 text-blue-600" />
                  取得できる資格
                </h3>
                <div className="bg-white rounded-lg shadow-md p-5">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {university.soccer_club.qualifications.map((qualification, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm">
                        {qualification}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">{university.soccer_club.qualification_note || '詳細情報はありません'}</p>
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
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Medal size={20} className="mr-2 text-green-600" />
                  スポーツ推薦
                </h3>
                <div className="bg-white rounded-lg shadow-md p-5">
                  {university.entry_conditions.sports_recommend ? (
                    <>
                      <div className="flex items-center text-green-700 mb-4">
                        <Check size={20} className="mr-2" />
                        <span className="font-medium">スポーツ推薦あり</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h4 className="text-sm text-gray-600 mb-1">評定基準</h4>
                          <p className="text-lg font-semibold text-green-800">
                            {university.entry_conditions.recommend_criteria.includes('評定') 
                              ? university.entry_conditions.recommend_criteria.match(/評定([0-9.]+)/)?.[1] + '以上' 
                              : '要確認'}
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h4 className="text-sm text-gray-600 mb-1">受入人数</h4>
                          <p className="text-lg font-semibold text-green-800">
                            {university.entry_conditions.recommend_criteria.includes('受入') 
                              ? university.entry_conditions.recommend_criteria.match(/受入人数([0-9]+)/)?.[1] + '名程度' 
                              : '要確認'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="text-sm text-gray-600 mb-1">推薦条件など</h4>
                        <p className="text-gray-700">{university.entry_conditions.recommend_criteria}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">スポーツ推薦なし</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-3 flex items-center">
                  <Calendar size={20} className="mr-2 text-blue-600" />
                  セレクション
                </h3>
                <div className="bg-white rounded-lg shadow-md p-5">
                  {university.entry_conditions.selection ? (
                    <>
                      <div className="flex items-center text-green-700 mb-4">
                        <Check size={20} className="mr-2" />
                        <span className="font-medium">セレクションあり</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="text-sm text-gray-600 mb-1">実施時期</h4>
                        <p className="font-medium text-blue-800">{university.entry_conditions.selection_period}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">セレクションなし</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Users size={20} className="mr-2 text-purple-600" />
                  一般入部
                </h3>
                <div className="bg-white rounded-lg shadow-md p-5">
                  {university.entry_conditions.general_admission ? (
                    <>
                      <div className="flex items-center text-green-700 mb-4">
                        <Check size={20} className="mr-2" />
                        <span className="font-medium">一般入部可能</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="text-sm text-gray-600 mb-1">条件</h4>
                        <p className="text-gray-700">{university.entry_conditions.general_conditions}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">一般入部不可</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-3 flex items-center">
                  <Info size={20} className="mr-2 text-gray-600" />
                  注意事項
                </h3>
                <div className="bg-white rounded-lg shadow-md p-5">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                      <li>入部条件や推薦基準は年度によって変更される場合があります</li>
                      <li>最新情報は必ず大学公式サイトや説明会でご確認ください</li>
                      <li>セレクションの詳細な日程・場所は各大学にお問い合わせください</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* PLAYMAKERコメントタブ - PLAYMAKERコメントフィールドがある場合のみ表示 */}
        {activeTab === 'playmaker' && university.playmakerComment && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-green-700 flex items-center">
              <BookOpen size={24} className="mr-2" />
              PLAYMAKERによる解説
            </h3>
            <div className="bg-green-50 p-5 rounded-lg border border-green-200">
              <div className="text-gray-700 prose max-w-none">
                {university.playmakerComment}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityDetails;