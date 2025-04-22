// src/components/EnhancedAgentView.jsx
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
  Zap,
  CheckCircle,
  X,
  Info,
  BookOpen,
  MapPin,
  Award,
  BarChart2,
  ArrowRight,
  Heart,
  Users,
  Home
} from 'lucide-react';

// 代理人の画像をインポート（実際のアプリでは適切なパスを使用）
import agentAvatar from '../assets/agent-avatar.svg';

const EnhancedAgentView = ({ 
  userProfile,
  universities,
  favoriteUniversities,
  onViewDetails,
  onAddToFavorites
}) => {
  // 状態変数
  const [matchedUniversities, setMatchedUniversities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activeTab, setActiveTab] = useState('recommendations');
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [conversationHistory, setConversationHistory] = useState([
    {
      sender: 'agent',
      message: `こんにちは${userProfile?.personalInfo?.name ? `, ${userProfile.personalInfo.name}さん` : ''}！私はあなたの進路サポートエージェントです。大学選びをお手伝いします。`,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  
  // プロフィールに基づいて大学のマッチングをシミュレート
  useEffect(() => {
    if (!userProfile || !universities) return;
    
    // ローディング表示のためのシミュレーション
    setLoadingRecommendations(true);
    
    // 少し遅延させて「AI処理」のように見せる
    const timer = setTimeout(() => {
      // マッチング処理
      const matched = matchUniversitiesWithProfile(universities, userProfile);
      setMatchedUniversities(matched);
      setLoadingRecommendations(false);
      
      // 初回マッチング後、会話を追加
      if (matched.length > 0) {
        addAgentMessage(`マッチング分析が完了しました！あなたのプロフィールと${matched.length}校の大学を比較し、相性の良い大学をピックアップしました。特に${matched[0].university_name}はあなたのプロフィールと非常に相性が良いようです。`);
      } else {
        addAgentMessage('マッチング分析を行いましたが、条件に合う大学が見つかりませんでした。ポートフォリオの情報をさらに充実させると、より良いマッチングが可能になります。');
      }
    }, 1500);
    
    // サンプル通知を生成
    generateSampleNotifications();
    
    // サンプル活動を生成
    generateSampleActivities();
    
    return () => clearTimeout(timer);
  }, [userProfile, universities]);
  
  // 大学データとプロフィールのマッチング処理
  const matchUniversitiesWithProfile = (universities, profile) => {
    if (!universities || !profile) return [];
    
    // 簡易マッチングロジック
    const matched = universities
      .filter(uni => {
        // すべての大学を対象とする（実際にはここでフィルタリング）
        return true;
      })
      .map(uni => {
        // マッチングスコアと理由を計算
        const { score, reasons } = calculateMatchScore(uni, profile);
        
        return {
          ...uni,
          matchScore: score,
          matchReasons: reasons
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5); // 上位5件のみ返す
    
    return matched;
  };
  
  // マッチングスコアと理由を計算する関数
  const calculateMatchScore = (university, profile) => {
    let score = 0;
    const reasons = [];
    
    // 基本点（ランダム要素を含む）
    const baseScore = Math.floor(Math.random() * 10) + 70; // 70-79のベーススコア
    score += baseScore;
    
    // ポジションマッチング
    if (profile.personalInfo?.position && university.soccer_club) {
      // FWの場合、Jリーガー輩出実績が高い大学が有利
      if (profile.personalInfo.position === 'FW' && university.soccer_club.j_league_nominees_2022_24 > 5) {
        score += 5;
        reasons.push(`あなたの${profile.personalInfo.position}というポジションと大学の特徴が合っています`);
      }
      
      // MFの場合、チーム規模が大きい大学が有利
      if (profile.personalInfo.position === 'MF' && university.soccer_club.total_members > 80) {
        score += 4;
        reasons.push(`${profile.personalInfo.position}としての活躍の場があります`);
      }
      
      // DFの場合、実績のある監督がいる大学が有利
      if (profile.personalInfo.position === 'DF' && university.soccer_club.coach_name) {
        score += 3;
        reasons.push(`守備指導に定評のある監督がいます`);
      }
    }
    
    // 志望タイプによるマッチング
    if (profile.aspirations?.type && university.soccer_club) {
      // プロ志向の場合
      if (profile.aspirations.type.includes('プロ') && university.soccer_club.j_league_nominees_2022_24 > 3) {
        score += 8;
        reasons.push(`あなたのプロ志向と大学のJリーグ輩出実績が合致しています`);
      }
      
      // 指導者志向の場合
      if (profile.aspirations.type.includes('指導者') || profile.aspirations.type.includes('選手以外')) {
        const hasCoachingQualification = university.soccer_club.qualifications?.some(
          q => q.includes('コーチング') || q.includes('教員免許')
        );
        
        if (hasCoachingQualification) {
          score += 7;
          reasons.push(`将来の指導者に必要な資格が取得できます`);
        }
      }
      
      // 経験志向の場合
      if (profile.aspirations.type.includes('経験') && university.soccer_club.total_members > 60) {
        score += 6;
        reasons.push(`充実したチーム環境で様々な経験が積めます`);
      }
    }
    
    // 学びたいことによるマッチング
    if (profile.aspirations?.interests && profile.aspirations.interests.length > 0 && university.soccer_club?.qualifications) {
      const matchingInterests = profile.aspirations.interests.filter(interest => 
        university.soccer_club.qualifications.some(qual => qual.includes(interest))
      );
      
      if (matchingInterests.length > 0) {
        score += matchingInterests.length * 3;
        reasons.push(`あなたの学びたい${matchingInterests[0]}を学べる環境があります`);
      }
    }
    
    // 寮に関する条件
    if (profile.personalInfo?.appeal && profile.personalInfo.appeal.includes('地方') && university.soccer_club?.dorm_available) {
      score += 5;
      reasons.push(`寮があり、地方からの進学でも安心です`);
    }
    
    // 特別能力マッチング
    if (profile.metrics?.specialAbilities && profile.metrics.specialAbilities.length > 0) {
      // パスマスター能力を持つ選手はMFが多い大学が有利
      if (profile.metrics.specialAbilities.includes('パスマスター')) {
        score += 4;
        reasons.push(`あなたのパススキルを活かせるチーム戦術です`);
      }
      
      // ドリブラー能力を持つ選手は攻撃的なチームが有利
      if (profile.metrics.specialAbilities.includes('ドリブラー') || profile.metrics.specialAbilities.includes('スピードスター')) {
        score += 4;
        reasons.push(`あなたのドリブル力を活かせる戦術を採用しています`);
      }
    }
    
    // お気に入り登録されている場合はボーナス
    if (favoriteUniversities && favoriteUniversities.some(fav => fav.id === university.id)) {
      score += 3;
      reasons.push(`あなたのお気に入りに登録されています`);
    }
    
    // スコアの上限は99
    score = Math.min(Math.max(Math.round(score), 70), 99);
    
    // 理由が少ない場合は追加
    if (reasons.length === 0) {
      reasons.push('あなたのプロフィールと大学の特徴から算出しました');
    }
    
    // 理由は最大3つまで
    return { score, reasons: reasons.slice(0, 3) };
  };
  
  // サンプル通知の生成
  const generateSampleNotifications = () => {
    const now = new Date();
    const in3days = new Date(now);
    in3days.setDate(now.getDate() + 3);
    
    const in1week = new Date(now);
    in1week.setDate(now.getDate() + 7);
    
    const in2weeks = new Date(now);
    in2weeks.setDate(now.getDate() + 14);
    
    setNotifications([
      {
        id: 1,
        type: 'deadline',
        title: "早稲田大学 スポーツ推薦締切まで3週間",
        date: in2weeks.toISOString(),
        description: "早稲田大学のスポーツ推薦応募締切が近づいています。必要書類を準備しましょう。",
        university_id: 1,
        isNew: true
      },
      {
        id: 2,
        type: 'event',
        title: "筑波大学 夏季練習会参加申込開始",
        date: in3days.toISOString(),
        description: "筑波大学の夏季練習会の参加申込が始まりました。早めに申し込みましょう。",
        university_id: 2,
        isNew: true
      },
      {
        id: 3,
        type: 'alert',
        title: "あなたの能力と理想的にマッチする大学が見つかりました",
        date: now.toISOString(),
        description: "新たなマッチング結果を確認しましょう。あなたのポートフォリオ情報をもとに、相性の良い大学を見つけました。",
        isNew: true
      }
    ]);
  };
  
  // サンプル活動タイムラインの生成
  const generateSampleActivities = () => {
    const now = new Date();
    
    // 過去の活動
    const pastDate1 = new Date(now);
    pastDate1.setDate(now.getDate() - 10);
    
    const pastDate2 = new Date(now);
    pastDate2.setDate(now.getDate() - 25);
    
    // 未来の活動
    const futureDate1 = new Date(now);
    futureDate1.setDate(now.getDate() + 15);
    
    const futureDate2 = new Date(now);
    futureDate2.setDate(now.getDate() + 30);
    
    const futureDate3 = new Date(now);
    futureDate3.setDate(now.getDate() + 45);
    
    const futureDate4 = new Date(now);
    futureDate4.setDate(now.getDate() + 60);
    
    setActivities([
      {
        id: 1,
        type: 'milestone',
        title: "現在地点",
        date: now.toISOString(),
        status: 'current',
        description: "進路活動中"
      },
      {
        id: 2,
        type: 'future',
        title: "スポーツ推薦情報の収集",
        date: futureDate1.toISOString(),
        status: 'pending',
        description: "各大学のスポーツ推薦条件を確認し、必要な書類を準備する時期です。"
      },
      {
        id: 3,
        type: 'future',
        title: "夏季練習会・セレクション",
        date: futureDate2.toISOString(),
        status: 'pending',
        description: "各大学の夏季練習会やセレクションに参加する時期です。"
      },
      {
        id: 4,
        type: 'future',
        title: "出願・推薦",
        date: futureDate3.toISOString(),
        status: 'pending',
        description: "志望校の出願を行う時期です。スポーツ推薦を受ける場合は高校の先生と連携して準備しましょう。"
      },
      {
        id: 5,
        type: 'future',
        title: "大学入試",
        date: futureDate4.toISOString(),
        status: 'pending',
        description: "一般入試を受験する時期です。推薦が決まっていない場合は対策をしっかり行いましょう。"
      },
      {
        id: 6,
        type: 'past',
        title: "ポートフォリオ作成",
        date: pastDate1.toISOString(),
        status: 'completed',
        description: "サッカー選手としてのポートフォリオを作成し、アピールポイントをまとめました。"
      },
      {
        id: 7,
        type: 'past',
        title: "進路相談",
        date: pastDate2.toISOString(),
        status: 'completed',
        description: "高校の先生と進路について相談し、大学のリストアップを始めました。"
      }
    ]);
  };
  
  // 会話にエージェントメッセージを追加
  const addAgentMessage = (message) => {
    setIsTyping(true);
    
    // タイピングアニメーション効果のためのタイマー
    setTimeout(() => {
      setConversationHistory(prev => [
        ...prev, 
        {
          sender: 'agent',
          message,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };
  
  // ユーザーメッセージ送信ハンドラ
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    // ユーザーメッセージを追加
    setConversationHistory(prev => [
      ...prev, 
      {
        sender: 'user',
        message: userInput,
        timestamp: new Date()
      }
    ]);
    
    const message = userInput;
    setUserInput('');
    
    // エージェントの応答を生成（簡易ルールベース）
    setTimeout(() => {
      if (message.toLowerCase().includes('推薦') || message.toLowerCase().includes('推薦入試')) {
        addAgentMessage('スポーツ推薦は大学ごとに条件が異なります。多くの場合、評定平均が3.0〜3.5以上必要です。また、競技実績も重要な要素になります。具体的な大学の推薦条件はマッチング結果から確認できますよ。');
      } else if (message.toLowerCase().includes('寮') || message.toLowerCase().includes('下宿')) {
        addAgentMessage('多くの大学サッカー部では専用寮を完備しています。寮費は月4〜5万円程度が一般的で、食事付きの場合が多いです。寮があるかどうかは各大学の詳細ページで確認できます。');
      } else if (message.toLowerCase().includes('jリーグ') || message.toLowerCase().includes('プロ')) {
        addAgentMessage('Jリーグ入りを目指すなら、Jリーグクラブとの連携が強い大学や、内定実績の多い大学がおすすめです。早稲田大学、筑波大学、明治大学などが特に実績が高いですね。マッチング結果の上位にそうした大学が表示されていると思います。');
      } else if (message.toLowerCase().includes('コーチ') || message.toLowerCase().includes('指導者')) {
        addAgentMessage('将来指導者を目指すなら、教員免許（保健体育）やJFA公認コーチングライセンスが取得できる大学がおすすめです。筑波大学や日本体育大学、大阪体育大学などが教員養成に強みを持っています。');
      } else if (message.toLowerCase().includes('おすすめ') || message.toLowerCase().includes('お勧め')) {
        if (matchedUniversities.length > 0) {
          addAgentMessage(`あなたのプロフィールから特におすすめなのは${matchedUniversities[0].university_name}です。${matchedUniversities[0].matchReasons[0]}という点で相性が良いようです。他にも${matchedUniversities.length - 1}校の候補がありますので、「おすすめ大学」タブで詳細を確認してみてください。`);
        } else {
          addAgentMessage('まだマッチング結果が出ていないようです。ポートフォリオ情報をさらに充実させると、より適切なおすすめができるようになります。');
        }
      } else {
        addAgentMessage('なるほど、理解しました。大学サッカー部の選び方でわからないことがあれば、いつでも質問してください。「推薦入試について」「寮について」「Jリーグを目指すには」などの質問に答えられます。');
      }
    }, 500);
  };
  
  // タブ切り替え
  const tabClass = (tabName) => 
    `px-4 py-3 font-medium text-base transition-colors rounded-t-lg ${
      activeTab === tabName 
        ? 'border-b-2 border-green-600 text-green-700 bg-green-50' 
        : 'text-gray-600 hover:bg-green-50'
    }`;

  // 日付をフォーマットする関数
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* ヘッダー部分 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          <Zap size={24} className="mr-2" />
          マイエージェント
        </h2>
        <p className="text-blue-100">
          あなたの強みと希望に合った大学をご紹介します
        </p>
      </div>
      
      {/* エージェント挨拶メッセージ */}
      <div className="bg-blue-50 p-4 border-b border-blue-100">
        <div className="flex items-start max-w-4xl mx-auto">
          <div className="w-10 h-10 bg-white p-2 rounded-full mr-3 flex items-center justify-center">
            <Zap size={18} className="text-blue-600" />
          </div>
          <div>
            <p className="text-blue-800">
              <span className="font-bold">こんにちは、{userProfile?.personalInfo?.name || 'プレーヤー'}さん！</span>
            </p>
            <p className="text-sm text-blue-700 mt-1">
              あなたのポートフォリオ情報に基づいて、あなたに合った大学を分析しました。
              最適な進路選択をサポートします。
            </p>
            <p className="text-sm text-blue-700 mt-1">
              <Bell size={14} className="inline mr-1" /> 
              通知タブに{notifications.filter(n => n.isNew).length}件の新着情報があります
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
          className={tabClass('chat')}
          onClick={() => setActiveTab('chat')}
        >
          <div className="flex items-center">
            <MessageSquare size={18} className={activeTab === 'chat' ? "text-green-600 mr-2" : "text-gray-500 mr-2"} />
            <span>相談チャット</span>
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
            
            {loadingRecommendations ? (
              // ローディング表示
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-pulse flex space-x-4 mb-4">
                  <div className="rounded-full bg-green-200 h-10 w-10"></div>
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-2 bg-green-200 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-green-200 rounded col-span-2"></div>
                        <div className="h-2 bg-green-200 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-green-200 rounded"></div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500">あなたのプロフィールにマッチする大学を分析中...</p>
              </div>
            ) : matchedUniversities.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {matchedUniversities.map((university) => (
                  <div 
                    key={university.id} 
                    className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
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
                        <div className="flex space-x-2">
                          <button
                            className="bg-pink-100 text-pink-600 p-2 rounded-full hover:bg-pink-200 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToFavorites(university);
                            }}
                            title="お気に入りに追加"
                          >
                            <Heart size={18} />
                          </button>
                          <button 
                            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition-colors"
                            onClick={() => onViewDetails(university)}
                          >
                            詳細を見る
                            <ChevronRight size={16} className="ml-1" />
                          </button>
                        </div>
                      </div>
                      
                      {/* 特徴とマッチングデータのビジュアル表示 */}
                      <div className="mt-4 pt-4 border-t">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {/* Jリーグ内定者数 */}
                          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-yellow-700">Jリーグ内定者</div>
                              <Trophy size={16} className="text-yellow-500" />
                            </div>
                            <div className="mt-1 font-bold text-lg text-yellow-800">
                              {university.soccer_club.j_league_nominees_2022_24}名
                            </div>
                            <div className="mt-1 h-1.5 bg-yellow-200 rounded-full">
                              <div 
                                className="h-1.5 bg-yellow-500 rounded-full" 
                                style={{ width: `${Math.min(university.soccer_club.j_league_nominees_2022_24 * 10, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* デンソーカップ出場者数 */}
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-blue-700">デンソーカップ出場</div>
                              <Award size={16} className="text-blue-500" />
                            </div>
                            <div className="mt-1 font-bold text-lg text-blue-800">
                              {university.soccer_club.denso_cup_2024_25 || 0}名
                            </div>
                            <div className="mt-1 h-1.5 bg-blue-200 rounded-full">
                              <div 
                                className="h-1.5 bg-blue-500 rounded-full" 
                                style={{ width: `${Math.min((university.soccer_club.denso_cup_2024_25 || 0) * 20, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* 部員数 */}
                          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-green-700">部員数</div>
                              <Users size={16} className="text-green-500" />
                            </div>
                            <div className="mt-1 font-bold text-lg text-green-800">
                              {university.soccer_club.total_members}名
                            </div>
                            <div className="mt-1 h-1.5 bg-green-200 rounded-full">
                              <div 
                                className="h-1.5 bg-green-500 rounded-full" 
                                style={{ width: `${Math.min(university.soccer_club.total_members / 100 * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* ポジションマッチ度 - ユーザーのポジションとチームの相性 */}
                          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-purple-700">ポジション相性</div>
                              <Target size={16} className="text-purple-500" />
                            </div>
                            <div className="mt-1 font-bold text-lg text-purple-800">
                              {/* ポジション相性のスコアをランダムで算出 */}
                              {Math.floor(Math.random() * 20) + 80}%
                            </div>
                            <div className="mt-1 h-1.5 bg-purple-200 rounded-full">
                              <div 
                                className="h-1.5 bg-purple-500 rounded-full" 
                                style={{ width: `${Math.floor(Math.random() * 20) + 80}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* チームの特徴 */}
                      <div className="mt-4 flex flex-wrap gap-3">
                        {university.soccer_club.dorm_available && (
                          <div className="bg-purple-50 text-purple-800 px-3 py-1 rounded-lg text-sm flex items-center">
                            <Home size={14} className="mr-1" /> 
                            寮あり
                          </div>
                        )}
                        
                        {university.entry_conditions.sports_recommend && (
                          <div className="bg-green-50 text-green-800 px-3 py-1 rounded-lg text-sm flex items-center">
                            <CheckCircle size={14} className="mr-1" />
                            スポーツ推薦あり
                          </div>
                        )}
                        
                        {university.soccer_club.j_league_nominees_2022_24 > 5 && (
                          <div className="bg-yellow-50 text-yellow-800 px-3 py-1 rounded-lg text-sm flex items-center">
                            <Trophy size={14} className="mr-1" /> 
                            Jリーグ内定者多数
                          </div>
                        )}
                        
                        {university.entry_conditions.selection && (
                          <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-lg text-sm flex items-center">
                            <Calendar size={14} className="mr-1" />
                            セレクションあり
                          </div>
                        )}
                        
                        {university.main_faculties.some(faculty => faculty.includes('体育') || faculty.includes('スポーツ')) && (
                          <div className="bg-indigo-50 text-indigo-800 px-3 py-1 rounded-lg text-sm flex items-center">
                            <BookOpen size={14} className="mr-1" />
                            スポーツ系学部あり
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
            
            {/* マッチングについての説明 */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                <Info size={18} className="text-gray-500 mr-2" />
                マッチング分析について
              </h4>
              <p className="text-sm text-gray-600">
                マッチングスコアはあなたのプロフィール情報と各大学の特徴を分析して算出しています。
                ポジション、プレースタイル、志望進路などの要素から最適な大学をご提案しています。
                詳細な情報は各大学の詳細ページでご確認ください。
              </p>
            </div>
          </div>
        )}
        
        {/* チャットタブ */}
        {activeTab === 'chat' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              進路相談チャット
            </h3>
            
            {/* チャット履歴 */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-80 overflow-y-auto">
              {conversationHistory.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-4 flex ${msg.sender === 'agent' ? 'justify-start' : 'justify-end'}`}
                >
                  {msg.sender === 'agent' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <Zap size={16} className="text-blue-600" />
                    </div>
                  )}
                  <div 
                    className={`max-w-3/4 rounded-lg px-4 py-2 ${
                      msg.sender === 'agent' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {msg.timestamp.toLocaleTimeString('ja-JP', {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center ml-2 flex-shrink-0">
                      <User size={16} className="text-green-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* タイピングインジケーター */}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <Zap size={16} className="text-blue-600" />
                  </div>
                  <div className="bg-blue-100 text-blue-800 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* メッセージ入力 */}
            <div className="flex mt-4">
              <input
                type="text"
                className="flex-grow border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="大学サッカー部について質問してください..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
                onClick={handleSendMessage}
              >
                送信
              </button>
            </div>
            
            {/* 質問サジェスト */}
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">おすすめの質問：</p>
              <div className="flex flex-wrap gap-2">
                <button 
                  className="bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 transition-colors"
                  onClick={() => {
                    setUserInput('スポーツ推薦について教えてください');
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                >
                  スポーツ推薦について教えて
                </button>
                <button 
                  className="bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 transition-colors"
                  onClick={() => {
                    setUserInput('寮のある大学を知りたいです');
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                >
                  寮のある大学を知りたい
                </button>
                <button 
                  className="bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 transition-colors"
                  onClick={() => {
                    setUserInput('Jリーグを目指すにはどの大学がいいですか？');
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                >
                  Jリーグを目指すには？
                </button>
                <button 
                  className="bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 transition-colors"
                  onClick={() => {
                    setUserInput('コーチになるための進路を教えてください');
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                >
                  コーチになる進路は？
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* 活動タイムラインタブ */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              進路活動タイムライン
            </h3>
            
            <div className="relative pl-8 before:content-[''] before:absolute before:left-4 before:top-2 before:h-full before:w-0.5 before:bg-gray-200">
              {activities.map((activity) => {
                // アクティビティの種類に応じたアイコンとスタイルを設定
                let iconComponent;
                let iconBgColor = 'bg-gray-100';
                let iconTextColor = 'text-gray-600';
                
                if (activity.status === 'current') {
                  iconComponent = <User size={18} />;
                  iconBgColor = 'bg-blue-600';
                  iconTextColor = 'text-white';
                } else if (activity.type === 'milestone') {
                  iconComponent = <Flag size={18} />;
                  iconBgColor = 'bg-purple-100';
                  iconTextColor = 'text-purple-600';
                } else if (activity.status === 'completed') {
                  iconComponent = <CheckCircle size={18} />;
                  iconBgColor = 'bg-green-100';
                  iconTextColor = 'text-green-600';
                } else {
                  iconComponent = <Calendar size={18} />;
                  iconBgColor = 'bg-blue-100';
                  iconTextColor = 'text-blue-600';
                }
                
                return (
                  <div key={activity.id} className="mb-8 relative">
                    <div className={`absolute left-0 top-0 w-8 h-8 rounded-full ${iconBgColor} ${iconTextColor} flex items-center justify-center z-10`}>
                      {iconComponent}
                    </div>
                    <div className="ml-6">
                      <div className="flex items-center">
                        <h4 className="font-medium text-blue-600">{activity.title}</h4>
                        <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {formatDate(activity.date)}
                        </span>
                      </div>
                      <div className="mt-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-700">{activity.description}</p>
                        
                        {/* 現在地点の場合は進捗状況も表示 */}
                        {activity.status === 'current' && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500 mb-1">現在の進捗状況</p>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '25%' }}></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>情報収集</span>
                              <span>セレクション</span>
                              <span>出願</span>
                              <span>合格</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* タイムラインの説明 */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <Info size={18} className="mr-2" />
                進路計画のポイント
              </h4>
              <p className="text-sm text-blue-700">
                大学サッカー部への進路は計画的に進めることが大切です。セレクションや推薦出願の時期を確認し、
                余裕を持って準備しましょう。特にスポーツ推薦を希望する場合は、高校の先生と早めに相談することをおすすめします。
              </p>
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
                      ) : notification.type === 'alert' ? (
                        <div className="bg-purple-100 p-2 rounded-full text-purple-600 mr-3">
                          <Info size={20} />
                        </div>
                      ) : (
                        <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
                          <Bell size={20} />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-start">
                          <h4 className="font-medium text-gray-800">{notification.title}</h4>
                          {notification.isNew && (
                            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">新着</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                        
                        <div className="flex justify-between items-center mt-3">
                          <div className="text-xs text-gray-500">
                            {formatDate(notification.date)}
                          </div>
                          
                          {notification.university_id && (
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
                          )}
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
            
            {/* 通知の説明 */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                <Info size={18} className="text-gray-500 mr-2" />
                通知について
              </h4>
              <p className="text-sm text-gray-600">
                このタブでは大学からの重要なお知らせやセレクション日程、出願締切などの重要な情報をお知らせします。
                定期的にチェックして、進路活動に役立ててください。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Flag アイコンコンポーネント（Lucide Reactに含まれていない場合の代替）
const Flag = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
    <line x1="4" y1="22" x2="4" y2="15"></line>
  </svg>
);

export default EnhancedAgentView;