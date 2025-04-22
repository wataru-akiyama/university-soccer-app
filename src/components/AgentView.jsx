// src/components/AgentView.jsx
import React, { useState, useEffect } from 'react';
import { 
  Star, 
  ChevronRight, 
  Trophy, 
  Calendar, 
  Bell, 
  MessageSquare, 
  School,
  User, 
  Target,
  Zap
} from 'lucide-react';

const AgentView = ({ 
  userProfile,
  universities,
  favoriteUniversities,
  onViewDetails 
}) => {
  const [matchedUniversities, setMatchedUniversities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('recommendations');
  
  // プロフィールに基づいて大学のマッチングをシミュレート
  useEffect(() => {
    if (!userProfile || !universities) return;
    
    // 簡易マッチングロジック
    const matched = universities
      .filter(uni => {
        // 何らかのマッチング条件（例：ポジションの需要がある、などの簡易条件）
        return true; // プロトタイプではすべての大学を表示
      })
      .map(uni => {
        // 各大学にマッチスコアを計算
        // プロトタイプでは仮のスコアを割り当て
        const matchScore = Math.floor(Math.random() * 20) + 80; // 80-99の範囲
        return {
          ...uni,
          matchScore,
          matchReasons: [
            "あなたのプレースタイルと合っています",
            "あなたのポジションの選手を求めています",
            "あなたの志望進路と学部が一致します"
          ].slice(0, Math.floor(Math.random() * 3) + 1) // ランダムに1-3個の理由を表示
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5); // 上位5件のみ表示
    
    setMatchedUniversities(matched);
    
    // サンプル通知
    setNotifications([
      {
        id: 1,
        type: 'deadline',
        title: "早稲田大学 スポーツ推薦締切まで3週間",
        date: "2025-07-15T00:00:00Z",
        description: "早稲田大学のスポーツ推薦応募締切が近づいています。必要書類を準備しましょう。",
        university_id: 1
      },
      {
        id: 2,
        type: 'event',
        title: "筑波大学 夏季練習会参加申込開始",
        date: "2025-06-01T00:00:00Z",
        description: "筑波大学の夏季練習会の参加申込が始まりました。早めに申し込みましょう。",
        university_id: 2
      }
    ]);
  }, [userProfile, universities]);
  
  // タブ切り替え
  const tabClass = (tabName) => 
    `px-4 py-3 font-medium text-base transition-colors rounded-t-lg ${
      activeTab === tabName 
        ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
        : 'text-gray-600 hover:bg-green-50'
    }`;
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* ヘッダー部分 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">マイエージェント</h2>
        <p className="text-blue-100">
          あなたの強みと希望に合った大学をご紹介します
        </p>
      </div>
      
      {/* エージェント挨拶メッセージ */}
      <div className="bg-blue-50 p-4 border-b border-blue-100">
        <div className="flex items-start max-w-4xl mx-auto">
          <div className="bg-white p-2 rounded-full mr-3">
            <Zap size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-blue-800">
              <span className="font-bold">こんにちは、{userProfile?.personalInfo?.name || 'プレーヤー'}さん！</span>
            </p>
            <p className="text-sm text-blue-700 mt-1">
              あなたのポートフォリオ情報に基づいて、あなたに合った大学を分析しました。
              最適な進路選択をサポートします。
            </p>
          </div>
        </div>
      </div>
      
      {/* タブナビゲーション */}
      <div className="border-b bg-white flex overflow-x-auto">
        <button 
          className={tabClass('recommendations')}
          onClick={() => setActiveTab('recommendations')}
        >
          <div className="flex items-center">
            <Star size={18} className={activeTab === 'recommendations' ? "text-green-600 mr-2" : "text-gray-500 mr-2"} />
            <span>おすすめ大学</span>
          </div>
        </button>
        
        <button 
          className={tabClass('timeline')}
          onClick={() => setActiveTab('timeline')}
        >
          <div className="flex items-center">
            <Calendar size={18} className={activeTab === 'timeline' ? "text-green-600 mr-2" : "text-gray-500 mr-2"} />
            <span>活動タイムライン</span>
          </div>
        </button>
        
        <button 
          className={tabClass('notifications')}
          onClick={() => setActiveTab('notifications')}
        >
          <div className="flex items-center">
            <Bell size={18} className={activeTab === 'notifications' ? "text-green-600 mr-2" : "text-gray-500 mr-2"} />
            <span>通知</span>
            <div className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </div>
          </div>
        </button>
      </div>
      
      {/* タブコンテンツ */}
      <div className="p-5">
        {/* おすすめ大学タブ */}
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              あなたにぴったりの大学
            </h3>
            
            {matchedUniversities.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {matchedUniversities.map((university) => (
                  <div key={university.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        {/* 大学情報 */}
                        <div className="flex items-center">
                          <div className="bg-blue-50 p-3 rounded-full mr-4 relative">
                            <img 
                              src={`/images/logos/${university.id}.png`}
                              alt={`${university.university_name} ロゴ`}
                              className="w-12 h-12 object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `/images/default-logo.png`;
                              }}
                            />
                            <div className="absolute -bottom-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-white">
                              {university.matchScore}%
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-semibold">{university.university_name}</h4>
                            <p className="text-sm text-gray-600">{university.soccer_club.league}</p>
                            
                            {/* マッチング理由 */}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {university.matchReasons.map((reason, idx) => (
                                <span key={idx} className="inline-flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  <Target size={12} className="mr-1" />
                                  {reason}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* 詳細ボタン */}
                        <button 
                          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition-colors"
                          onClick={() => onViewDetails(university)}
                        >
                          詳細を見る
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>
                      
                      {/* Jリーグ内定者やその他のハイライト情報 */}
                      <div className="mt-4 border-t pt-3 flex flex-wrap gap-3">
                        <div className="bg-yellow-50 text-yellow-800 px-3 py-1 rounded-lg text-sm flex items-center">
                          <Trophy size={14} className="mr-1" /> 
                          Jリーグ内定者: {university.soccer_club.j_league_nominees_2022_24}名
                        </div>
                        
                        {university.soccer_club.dorm_available && (
                          <div className="bg-purple-50 text-purple-800 px-3 py-1 rounded-lg text-sm">
                            寮あり
                          </div>
                        )}
                        
                        {university.entry_conditions.sports_recommend && (
                          <div className="bg-green-50 text-green-800 px-3 py-1 rounded-lg text-sm">
                            スポーツ推薦あり
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>マッチする大学が見つかりませんでした。ポートフォリオ情報を更新してください。</p>
              </div>
            )}
          </div>
        )}
        
        {/* 活動タイムラインタブ */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              進路活動タイムライン
            </h3>
            
            <div className="relative pl-8 before:content-[''] before:absolute before:left-4 before:top-2 before:h-full before:w-0.5 before:bg-gray-200">
              {/* 現在地点 */}
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <User size={18} />
              </div>
              
              {/* タイムラインアイテム */}
              <div className="mb-10">
                <div className="absolute left-0 top-14 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <School size={18} />
                </div>
                <div className="ml-6 mb-8">
                  <h4 className="font-medium text-blue-600">2025年6月: スポーツ推薦の情報収集</h4>
                  <div className="mt-2 bg-green-50 p-3 rounded-lg border border-green-100">
                    <p className="text-green-800 text-sm">
                      各大学のスポーツ推薦の情報を集め、条件を確認しましょう。推薦を受けるためには高校の実績や評定が重要です。
                    </p>
                    <div className="mt-2 flex gap-2">
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        早稲田大学: 評定3.5以上
                      </span>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        筑波大学: 評定3.2以上
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-0 top-40 w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                  <MessageSquare size={18} />
                </div>
                <div className="ml-6 mb-8">
                  <h4 className="font-medium text-blue-600">2025年7月-8月: 夏季練習会・セレクション</h4>
                  <div className="mt-2 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                    <p className="text-yellow-800 text-sm">
                      各大学の夏季練習会やセレクションに参加し、実際にプレーして自分との相性を確認しましょう。
                    </p>
                    <div className="mt-2 flex gap-2">
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                        早稲田大学: 7月15日
                      </span>
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                        筑波大学: 8月5日
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-0 top-64 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Calendar size={18} />
                </div>
                <div className="ml-6">
                  <h4 className="font-medium text-blue-600">2025年9月-10月: 出願・推薦</h4>
                  <div className="mt-2 bg-purple-50 p-3 rounded-lg border border-purple-100">
                    <p className="text-purple-800 text-sm">
                      スポーツ推薦の出願時期です。必要書類を揃え、高校の先生と連携して準備しましょう。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 通知タブ */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              最新通知
            </h3>
            
            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div key={notification.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex">
                      {notification.type === 'deadline' ? (
                        <div className="bg-red-100 p-2 rounded-full text-red-600 mr-3">
                          <Calendar size={20} />
                        </div>
                      ) : (
                        <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
                          <Bell size={20} />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{notification.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                        
                        <div className="flex justify-between items-center mt-3">
                          <div className="text-xs text-gray-500">
                            {new Date(notification.date).toLocaleDateString('ja-JP')}
                          </div>
                          
                          <button 
                            className="text-blue-600 text-sm hover:text-blue-700"
                            onClick={() => {
                              // 該当する大学の詳細を表示する処理
                              const university = universities.find(uni => uni.id === notification.university_id);
                              if (university) {
                                onViewDetails(university);
                              }
                            }}
                          >
                            詳細を見る
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>新しい通知はありません</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentView;