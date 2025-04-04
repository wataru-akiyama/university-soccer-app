import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
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
  //BookOpen, 
  //Star
} from 'lucide-react';
import universityExtendedData from '../data/universityExtendedData';

const EnhancedUniversityDetails = ({ 
  university, 
  onBack, 
  onAddToCompare, 
  onAddToFavorites, 
  isInCompareList,
  isInFavorites 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [extendedData, setExtendedData] = useState(null);
  
  // 拡張データをロード
  useEffect(() => {
    if (university && university.id) {
      const extData = universityExtendedData[university.id] || {};
      setExtendedData(extData);
    }
  }, [university]);
  
  // 年度別のJリーグ内定者の合計
  const totalJLeagueNominees = 
    (university?.soccer_club?.j_league_nominees_2022 || 0) + 
    (university?.soccer_club?.j_league_nominees_2023 || 0) + 
    (university?.soccer_club?.j_league_nominees_2024 || 0);
  
  if (!university) return null;
  
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
      
      {/* PLAYMAKERコメント - ヘッダー直下に配置 */}
      {(extendedData?.playmakerComment || university.playmakerComment) && (
        <div className="bg-blue-50 p-4 border-b border-blue-200">
          <div className="flex items-start max-w-4xl mx-auto">
            <MessageSquare size={20} className="text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm font-medium text-blue-800 mb-1">PLAYMAKERからのコメント</p>
              <p className="text-sm text-blue-700">
                {(extendedData?.playmakerComment || university.playmakerComment).length > 150 
                  ? `${(extendedData?.playmakerComment || university.playmakerComment).substring(0, 150)}...` 
                  : (extendedData?.playmakerComment || university.playmakerComment)}
                {(extendedData?.playmakerComment || university.playmakerComment).length > 150 && (
                  <button 
                    className="ml-1 text-blue-600 font-medium hover:underline"
                    onClick={() => setActiveTab('playmaker')}
                  >
                    続きを読む
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* タブメニュー */}
      <div className="flex border-b overflow-x-auto bg-white shadow-sm sticky top-0 z-10">
        <button 
          className={`px-4 py-3 text-center whitespace-nowrap font-medium transition-colors rounded-t-lg ${
            activeTab === 'overview' 
              ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
              : 'text-gray-600 hover:bg-green-50'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          <div className="flex items-center">
            <Info size={18} className="mr-1 md:mr-2" />
            <span>概要</span>
          </div>
        </button>
        
        <button 
          className={`px-4 py-3 text-center whitespace-nowrap font-medium transition-colors rounded-t-lg ${
            activeTab === 'members' 
              ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
              : 'text-gray-600 hover:bg-green-50'
          }`}
          onClick={() => setActiveTab('members')}
        >
          <div className="flex items-center">
            <Users size={18} className="mr-1 md:mr-2" />
            <span>部員</span>
          </div>
        </button>
        
        <button 
          className={`px-4 py-3 text-center whitespace-nowrap font-medium transition-colors rounded-t-lg ${
            activeTab === 'achievements' 
              ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
              : 'text-gray-600 hover:bg-green-50'
          }`}
          onClick={() => setActiveTab('achievements')}
        >
          <div className="flex items-center">
            <Medal size={18} className="mr-1 md:mr-2" />
            <span>実績</span>
          </div>
        </button>
        
        <button 
          className={`px-4 py-3 text-center whitespace-nowrap font-medium transition-colors rounded-t-lg ${
            activeTab === 'facilities' 
              ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
              : 'text-gray-600 hover:bg-green-50'
          }`}
          onClick={() => setActiveTab('facilities')}
        >
          <div className="flex items-center">
            <Home size={18} className="mr-1 md:mr-2" />
            <span>施設</span>
          </div>
        </button>
        
        <button 
          className={`px-4 py-3 text-center whitespace-nowrap font-medium transition-colors rounded-t-lg ${
            activeTab === 'careers' 
              ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
              : 'text-gray-600 hover:bg-green-50'
          }`}
          onClick={() => setActiveTab('careers')}
        >
          <div className="flex items-center">
            <Briefcase size={18} className="mr-1 md:mr-2" />
            <span>進路</span>
          </div>
        </button>
        
        <button 
          className={`px-4 py-3 text-center whitespace-nowrap font-medium transition-colors rounded-t-lg ${
            activeTab === 'entry' 
              ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
              : 'text-gray-600 hover:bg-green-50'
          }`}
          onClick={() => setActiveTab('entry')}
        >
          <div className="flex items-center">
            <FileText size={18} className="mr-1 md:mr-2" />
            <span>入部条件</span>
          </div>
        </button>
        
        {/* 完全版PLAYMAKERコメントタブ - 隠しタブとして実装 */}
        {(extendedData?.playmakerComment || university.playmakerComment) && (
          <button 
            className={`px-4 py-3 text-center whitespace-nowrap font-medium transition-colors rounded-t-lg ${
              activeTab === 'playmaker' 
                ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
                : 'text-gray-600 hover:bg-green-50'
            }`}
            onClick={() => setActiveTab('playmaker')}
          >
            <div className="flex items-center">
              <MessageSquare size={18} className="mr-1 md:mr-2" />
              <span>詳細解説</span>
            </div>
          </button>
        )}
      </div>
      
      {/* タブコンテンツ */}
      <div className="p-6">
        {/* 概要タブ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
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
                      <th className="py-3 text-left text-gray-600">所在地</th>
                      <td className="py-3">{extendedData?.location || "情報なし"}</td>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ハイライト機能 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-3 px-5 border-b">
                  <h3 className="text-lg font-semibold text-blue-800">ハイライト</h3>
                </div>
                <div className="p-5 space-y-4">
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
                    
                    {totalJLeagueNominees > 5 && (
                      <div className="flex items-center rounded-lg px-4 py-3 bg-yellow-50 border border-yellow-200 shadow-sm">
                        <Award size={18} className="text-yellow-700 mr-2" />
                        <span className="font-medium text-yellow-800">Jリーグ内定者多数</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* 取得可能資格 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-green-100 py-3 px-5 border-b">
                  <h3 className="text-lg font-semibold text-green-800">取得可能資格</h3>
                </div>
                <div className="p-5">
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
        
        {/* 部員タブ */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-green-100 py-3 px-5 border-b">
                <h3 className="text-lg font-semibold text-green-800">学年別部員数</h3>
              </div>
              <div className="p-5">
                <div className="h-64 flex items-end justify-around bg-gray-50 p-4 rounded-lg">
                  {Object.entries(university.soccer_club.members_by_grade).map(([grade, count]) => {
                    const maxCount = Math.max(...Object.values(university.soccer_club.members_by_grade));
                    const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
                    
                    return (
                      <div key={grade} className="flex flex-col items-center">
                        <div className="font-medium text-gray-800 mb-2">{count}名</div>
                        <div 
                          className="w-16 bg-gradient-to-t from-green-600 to-green-400 rounded-t"
                          style={{ height: `${height}%` }}
                        >
                          <div className="bg-green-700 h-1"></div>
                        </div>
                        <div className="mt-2 text-sm">
                          <div className="font-semibold">{grade}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 新入部員情報 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-3 px-5 border-b">
                  <h3 className="text-lg font-semibold text-blue-800">新入部員情報</h3>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="text-sm text-gray-600 mb-1">2024年度新入部員</h4>
                      <p className="text-lg font-semibold text-blue-800">
                        {university.soccer_club.members_by_grade["1年"] || "情報なし"}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="text-sm text-gray-600 mb-1">推薦入部率</h4>
                      <p className="text-lg font-semibold text-blue-800">
                        {extendedData?.recommend_ratio || "情報なし"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 出身高校 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-green-100 py-3 px-5 border-b">
                  <h3 className="text-lg font-semibold text-green-800">出身高校傾向</h3>
                </div>
                <div className="p-5">
                  <p className="text-gray-700">
                    {extendedData?.high_school_trend || "現在、出身高校の詳細情報はありません。"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 実績タブ */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            {/* Jリーグ内定者数 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-3 px-5 border-b">
                <h3 className="text-lg font-semibold text-yellow-800">Jリーグ内定実績</h3>
              </div>
              <div className="p-5">
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Medal className="text-yellow-600 mr-2" size={18} />
                    Jリーグ内定者数 (過去3年間)
                  </h4>
                  <div className="text-3xl font-bold text-center text-yellow-700 mb-2">
                    {totalJLeagueNominees}名
                  </div>
                  
                  {/* 年度別表示 */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-yellow-50 p-2 rounded-md">
                      <div className="text-xs text-gray-500">2022年</div>
                      <div className="font-bold text-yellow-600">{university.soccer_club.j_league_nominees_2022 || 0}名</div>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded-md">
                      <div className="text-xs text-gray-500">2023年</div>
                      <div className="font-bold text-yellow-600">{university.soccer_club.j_league_nominees_2023 || 0}名</div>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded-md">
                      <div className="text-xs text-gray-500">2024年</div>
                      <div className="font-bold text-yellow-600">{university.soccer_club.j_league_nominees_2024 || 0}名</div>
                    </div>
                  </div>
                </div>
                
                {/* グラフ表示 */}
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
            
            {/* デンソーカップ */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-3 px-5 border-b">
                <h3 className="text-lg font-semibold text-blue-800">デンソーカップ出場者数</h3>
              </div>
              <div className="p-5">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold mb-2">デンソーカップ出場選手数 (2024-2025)</h4>
                  <div className="text-3xl font-bold text-center text-blue-700">
                    {university.soccer_club.denso_cup_2024_25 || 0}名
                  </div>
                </div>
              </div>
            </div>
            
            {/* 大会成績 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-green-100 py-3 px-5 border-b">
                <h3 className="text-lg font-semibold text-green-800">主な大会成績</h3>
              </div>
              <div className="p-5">
                <div className="space-y-3">
                  {extendedData?.tournament_results ? (
                    extendedData.tournament_results.map((result, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between">
                          <div className="font-medium">{result.tournament}</div>
                          <div className="text-sm text-gray-500">{result.year}</div>
                        </div>
                        <div className="text-green-700 font-medium">{result.achievement}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">大会成績の詳細情報はありません</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 施設タブ */}
        {activeTab === 'facilities' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 py-3 px-5 border-b">
                <h3 className="text-lg font-semibold text-purple-800">施設情報</h3>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <th className="py-2 text-left text-gray-600 w-1/3">サッカーコート数</th>
                          <td className="py-2">{university.soccer_club.soccer_field_count}面</td>
                        </tr>
                        <tr className="border-b">
                          <th className="py-2 text-left text-gray-600">コート種類</th>
                          <td className="py-2">{extendedData?.field_type || "人工芝/天然芝"}</td>
                        </tr>
                        <tr className="border-b">
                          <th className="py-2 text-left text-gray-600">ナイター設備</th>
                          <td className="py-2">{extendedData?.night_training || "情報なし"}</td>
                        </tr>
                        <tr>
                          <th className="py-2 text-left text-gray-600">その他設備</th>
                          <td className="py-2">{extendedData?.other_facilities || "情報なし"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-800 mb-2">特記事項</h4>
                      <p className="text-sm text-gray-700">{university.soccer_club.facility_note || "特記事項はありません"}</p>
                    </div>
                    
                    {extendedData?.field_images && (
                      <div className="flex overflow-x-auto space-x-2 py-2">
                        {/* フィールド画像があれば表示 */}
                        {extendedData.field_images.map((image, index) => (
                          <div key={index} className="flex-shrink-0 w-32 h-24 rounded-md overflow-hidden">
                            <img 
                              src={image} 
                              alt={`フィールド ${index+1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 寮情報 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-3 px-5 border-b">
                <h3 className="text-lg font-semibold text-blue-800">寮情報</h3>
              </div>
              <div className="p-5">
                {university.soccer_club.dorm_available ? (
                  <div className="space-y-4">
                    <div className="flex items-center text-green-700 mb-4">
                      <Check size={20} className="mr-2" />
                      <span className="font-medium">寮あり</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="text-sm text-gray-600 mb-1">寮の種類</h4>
                        <p className="font-medium text-blue-800">
                          {extendedData?.dorm_type || "専用寮/一般寮"}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="text-sm text-gray-600 mb-1">寮費</h4>
                        <p className="font-medium text-blue-800">
                          {extendedData?.dorm_fee || "情報なし"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm text-gray-600 mb-1">寮の特徴</h4>
                      <p className="text-gray-700">
                        {extendedData?.dorm_features || "詳細情報はありません"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <X size={20} className="mr-2" />
                    <span className="font-medium">寮なし</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* トレーニング環境 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-green-100 py-3 px-5 border-b">
                <h3 className="text-lg font-semibold text-green-800">トレーニング環境</h3>
              </div>
              <div className="p-5">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-sm text-gray-600 mb-1">トレーニング施設</h4>
                  <p className="text-gray-700">
                    {extendedData?.training_facilities || "詳細情報はありません"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 進路タブ */}
        {activeTab === 'careers' && (
          <div className="space-y-6">
            {/* Jリーグ内定実績 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-3 px-5 border-b">
                <h3 className="text-lg font-semibold text-yellow-800">プロ契約実績</h3>
              </div>
              <div className="p-5">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Medal className="text-yellow-600 mr-2" size={18} />
                    Jリーグ内定者数 (過去3年間)
                  </h4>
                  <div className="text-3xl font-bold text-center text-yellow-700 mb-2">
                    {totalJLeagueNominees}名
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">主な内定先</h4>
                  <div className="flex flex-wrap gap-2">
                    {extendedData?.j_league_teams ? (
                      extendedData.j_league_teams.map((team, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {team}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">詳細情報はありません</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 卒業後の進路 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-3 px-5 border-b">
                <h3 className="text-lg font-semibold text-blue-800">卒業後の主な進路</h3>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  {extendedData?.career_paths ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {extendedData.career_paths.map((path, index) => (
                        <div key={index} className="bg-blue-50 p-3 rounded-lg">
                          <h4 className="text-sm text-gray-600 mb-1">{path.category}</h4>
                          <p className="font-medium text-blue-800">{path.percentage || "-"}%</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-center text-gray-500">詳細情報はありません</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* 有名OB */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-green-100 py-3 px-5 border-b">
                <h3 className="text-lg font-semibold text-green-800">有名OB</h3>
              </div>
              <div className="p-5">
                <div className="space-y-3">
                  {extendedData?.famous_alumni ? (
                    extendedData.famous_alumni.map((alumni, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-800 font-medium">{alumni.initials || "OB"}</span>
                        </div>
                        <div>
                          <div className="font-medium">{alumni.name}</div>
                          <div className="text-sm text-gray-500">{alumni.career}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">有名OB情報はありません</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 入部条件タブ */}
        {activeTab === 'entry' && (
          <div className="space-y-6">
            {/* スポーツ推薦 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-green-100 py-3 px-5 border-b">
                <h3 className="text-lg font-semibold text-green-800">スポーツ推薦</h3>
              </div>
              <div className="p-5">
                {university.entry_conditions.sports_recommend ? (
                  <>
                    <div className="flex items-center text-green-700 mb-4">
                      <Check size={20} className="mr-2" />
                      <span className="font-medium">スポーツ推薦あり</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                    <X size={20} className="mr-2" />
                    <span className="font-medium">スポーツ推薦なし</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* セレクション */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-3 px-5 border-b">
                <h3 className="text-lg font-semibold text-blue-800">セレクション</h3>
              </div>
              <div className="p-5">
                {university.entry_conditions.selection ? (
                  <>
                    <div className="flex items-center text-green-700 mb-4">
                      <Check size={20} className="mr-2" />
                      <span className="font-medium">セレクションあり</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      <h4 className="text-sm text-gray-600 mb-1">実施時期</h4>
                      <p className="font-medium text-blue-800">{university.entry_conditions.selection_period}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm text-gray-600 mb-1">セレクション内容</h4>
                      <p className="text-gray-700">{extendedData?.selection_details || "詳細は大学にお問い合わせください"}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center text-red-600">
                    <X size={20} className="mr-2" />
                    <span className="font-medium">セレクションなし</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* 一般入部 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 py-3 px-5 border-b">
                <h3 className="text-lg font-semibold text-purple-800">一般入部</h3>
              </div>
              <div className="p-5">
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
                    <X size={20} className="mr-2" />
                    <span className="font-medium">一般入部不可</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* 奨学金情報 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-3 px-5 border-b">
                <h3 className="text-lg font-semibold text-yellow-800">奨学金情報</h3>
              </div>
              <div className="p-5">
                {university.soccer_club.sports_scholarship ? (
                  <>
                    <div className="flex items-center text-green-700 mb-4">
                      <Check size={20} className="mr-2" />
                      <span className="font-medium">奨学金制度あり</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm text-gray-600 mb-1">奨学金内容</h4>
                      <p className="text-gray-700">{extendedData?.scholarship_details || "詳細は大学にお問い合わせください"}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center text-red-600">
                    <X size={20} className="mr-2" />
                    <span className="font-medium">奨学金なし</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* PLAYMAKER詳細解説タブ */}
        {activeTab === 'playmaker' && (extendedData?.playmakerComment || university.playmakerComment) && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-green-700 flex items-center">
              <MessageSquare size={24} className="mr-2" />
              PLAYMAKERによる詳細解説
            </h3>
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
              <div className="text-gray-700 prose max-w-none">
                {extendedData?.playmakerComment || university.playmakerComment}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* フッターアクション */}
      <div className="border-t p-4 bg-gray-50">
        <div className="flex justify-between items-center">
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors hover:bg-green-700"
            onClick={onBack}
          >
            <ChevronRight className="transform rotate-180 mr-2" size={16} />
            一覧に戻る
          </button>
          
          <button 
            className={`px-4 py-2 rounded-lg border flex items-center transition-colors ${
              isInCompareList
                ? "bg-gray-200 text-gray-700 border-gray-300"
                : "bg-white text-green-600 border-green-300 hover:bg-green-50"
            }`}
            onClick={() => !isInCompareList && onAddToCompare(university)}
            disabled={isInCompareList}
          >
            {isInCompareList ? (
              <span className="flex items-center">
                <Check size={16} className="mr-2" />
                比較リストに追加済み
              </span>
            ) : (
              <span className="flex items-center">
                <Plus size={16} className="mr-2" />
                比較リストに追加
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedUniversityDetails;