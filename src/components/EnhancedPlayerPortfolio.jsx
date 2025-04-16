import React, { useState } from 'react';
import { 
    UserCircle, 
    ChevronLeft, 
    Edit, 
    Trophy, 
    Star, 
    Camera,
    MessageSquare, 
    Video, 
    BookOpen, 
    User, 
    Save, 
    Clock, 
    CheckCircle, 
    X, 
    Plus, 
    Download, 
    Share2, 
    Twitter,
    Facebook, 
    Instagram, 
    Linkedin, 
    Link,
    FileEdit,
    Heart,
    Upload,
    ChevronUp,
    ChevronDown
} from 'lucide-react';

// メインコンポーネント
const EnhancedPlayerPortfolio = ({ 
  onBack, 
  favoriteUniversities,
  onShowRecommendation,
  onShowFavorites,
  onShowCompare,
  onEditWithTemplate, // 新しいプロップスを追加
  userProfile // プロフィールデータを追加
}) => {
  const [activeTab, setActiveTab] = useState('playerCard');
  const [editMode, setEditMode] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // ダミーデータ
  const playerProfile = {
    personalInfo: {
      name: "佐藤 翔太",
      highSchool: "青山高等学校",
      height: 178,
      weight: 70,
      position: "MF",
      subPosition: "CMF",
      footedness: "右足",
      graduationYear: 2026,
      playStyle: "インサイドレシーバー",
      appeal: "小学2年生からサッカーを始め、中学・高校と県選抜に選ばれました。テクニックと戦術理解に自信があり、チームプレーを大切にしています。大学ではより高いレベルでプレーし、将来はJリーガーを目指しています。球際の強さとフィジカル面の向上が今後の課題です。"
    },
    metrics: {
      overall: 76,
      passing: 82,
      shooting: 75,
      dribbling: 79,
      defense: 68,
      physical: 72,
      speed: 76,
      vision: 84,
      // 特殊能力
      specialAbilities: ["パスマスター", "守備意識", "チームプレイヤー", "コーナーキック"]
    },
    aspirations: {
      type: "A：プロを目指してやりたい",
      interests: ["コーチング・指導法", "スポーツマネジメント", "トレーニング科学"]
    },
    favoriteUniversities: [
      { id: 1, name: "早稲田大学", league: "関東大学サッカーリーグ1部", reason: "練習環境が整っており、Jリーグへの輩出実績が高いため" },
      { id: 2, name: "筑波大学", league: "関東大学サッカーリーグ1部", reason: "教員免許の取得も目指しており、指導者としての知識も学びたい" },
      { id: 3, name: "明治大学", league: "関東大学サッカーリーグ1部", reason: "OBとの繋がりがあり、チームの戦術が自分のプレースタイルに合っている" }
    ],
    achievements: [
      { title: "全国高校サッカー選手権大会", result: "ベスト16", year: "2023" },
      { title: "高校総体（インターハイ）", result: "県大会優勝", year: "2024" },
      { title: "U-18県選抜", result: "選出", year: "2023" }
    ],
    activities: [
      {
        id: 1,
        type: "practice",
        title: "早稲田大学サッカー部練習参加",
        date: "2024-08-15T13:00:00Z",
        details: "夏季練習会に参加。監督やコーチから技術面での評価をいただきました。"
      },
      {
        id: 2,
        type: "message",
        title: "筑波大学から連絡",
        date: "2024-07-20T10:30:00Z",
        details: "入部に関する追加情報を受け取りました。"
      },
      {
        id: 3,
        type: "video",
        title: "新規ハイライト動画をアップロード",
        date: "2024-07-15T09:00:00Z",
        details: "最新の試合映像をポートフォリオに追加しました。"
      },
      {
        id: 4,
        type: "practice",
        title: "筑波大学サッカー部セレクション参加",
        date: "2024-07-05T09:00:00Z",
        details: "夏季セレクションに参加。実戦形式のゲームでプレー。"
      }
    ]
  };
  
  // タブ切り替え
  const tabClass = (tabName) => 
    `px-5 py-3 font-medium text-base transition-colors ${
      activeTab === tabName 
        ? 'border-b-2 border-green-600 text-green-700' 
        : 'text-gray-500 hover:text-green-700'
    }`;
    
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-sm">
        {/* ヘッダー - 緑系のグラデーションに変更 */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-5 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button className="mr-3 bg-white/10 p-2 rounded-full" onClick={onBack}>
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-medium">マイポートフォリオ</h2>
            </div>
            <div className="flex space-x-2">
              {/* テンプレートで編集するボタンを追加 */}
              <button 
                className="bg-blue-500 text-white hover:bg-blue-400 px-3 py-1.5 rounded-md flex items-center text-sm transition-colors"
                onClick={onEditWithTemplate}
              >
                <FileEdit size={16} className="mr-1.5" />
                テンプレートで編集
              </button>
              <button 
                className="bg-white text-green-600 hover:bg-green-50 hover:text-green-700 px-3 py-1.5 rounded-md flex items-center text-sm transition-colors"
                onClick={() => setEditMode(!editMode)}
              >
                <Edit size={16} className="mr-1.5" />
                {editMode ? "編集終了" : "編集する"}
              </button>
              <button 
                className="bg-green-500 hover:bg-green-400 text-white px-3 py-1.5 rounded-md flex items-center text-sm transition-colors"
                onClick={() => setShowShareModal(true)}
              >
                <Share2 size={16} className="mr-1.5" />
                共有
              </button>
            </div>
          </div>
        </div>
        
        {/* タブナビゲーション */}
        <div className="flex border-b bg-white">
          <button 
            className={tabClass('playerCard')}
            onClick={() => setActiveTab('playerCard')}
          >
            <div className="flex items-center">
              <User size={18} className={activeTab === 'playerCard' ? "text-green-600 mr-2" : "text-gray-500 mr-2"} />
              選手カード
            </div>
          </button>
          <button 
            className={tabClass('universities')}
            onClick={() => setActiveTab('universities')}
          >
            <div className="flex items-center">
              <Heart size={18} className={activeTab === 'universities' ? "text-green-600 mr-2" : "text-gray-500 mr-2"} />
              志望大学
            </div>
          </button>
        </div>
        
        {/* タブコンテンツ */}
        <div className="p-6">
          {activeTab === 'playerCard' ? (
            <PlayerCardTab player={playerProfile} editMode={editMode} />
          ) : (
            <UniversitiesTab 
              universities={
                favoriteUniversities && favoriteUniversities.length > 0 
                  ? favoriteUniversities.map(uni => ({
                    id: uni.id, 
                    name: uni.university_name, 
                    league: uni.soccer_club.league,
                    reason: "興味があるため" // デフォルト理由
                  }))
                  : playerProfile.favoriteUniversities
              } 
              editMode={editMode} 
              // 追加：お気に入り表示機能を直接使えるようにする
              onShowFavorites={onShowFavorites}
            />
          )}

          {/* テンプレート編集へのリンクバナーを追加 - 特に編集モードでない場合に表示 */}
          {!editMode && (
            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FileEdit size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-blue-800">テンプレートでもっと簡単に編集！</h3>
                  <p className="text-sm text-blue-600">簡単なステップで効果的なポートフォリオが作れるテンプレートエディタが利用できます。</p>
                </div>
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm ml-3"
                  onClick={onEditWithTemplate}
                >
                  テンプレートで編集
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 共有モーダル */}
      {showShareModal && (
        <ShareModal 
          onClose={() => setShowShareModal(false)} 
          player={playerProfile} // playerProfile 全体を渡す
        />
      )}
    </div>
  );
};

// 共有モーダルコンポーネント
const ShareModal = ({ onClose, player }) => {
  const [shareOption, setShareOption] = useState('card');
  const [copySuccess, setCopySuccess] = useState(false);
  
  const handleCopyLink = () => {
    // 実際にはポートフォリオへのURLをコピーする処理
    navigator.clipboard.writeText(`https://university-soccer.example.com/portfolio/${player.personalInfo.name}`);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-5 max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">ポートフォリオを共有</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        {/* 共有オプション選択 */}
        <div className="flex border-b mb-4">
          <button 
            className={`px-4 py-2 font-medium ${shareOption === 'card' ? 'border-b-2 border-green-600 text-green-700' : 'text-gray-500'}`}
            onClick={() => setShareOption('card')}
          >
            選手カード
          </button>
          <button 
            className={`px-4 py-2 font-medium ${shareOption === 'full' ? 'border-b-2 border-green-600 text-green-700' : 'text-gray-500'}`}
            onClick={() => setShareOption('full')}
          >
            全体
          </button>
        </div>
        
        {/* 共有先アイコン */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          <div className="flex flex-col items-center">
            <button className="w-12 h-12 bg-[#1DA1F2] text-white rounded-full flex items-center justify-center">
              <Twitter size={24} />
            </button>
            <span className="text-xs mt-1 text-gray-600">Twitter</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="w-12 h-12 bg-[#4267B2] text-white rounded-full flex items-center justify-center">
              <Facebook size={24} />
            </button>
            <span className="text-xs mt-1 text-gray-600">Facebook</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="w-12 h-12 bg-gradient-to-tr from-[#FEDA75] via-[#FA7E1E] to-[#D62976] text-white rounded-full flex items-center justify-center">
              <Instagram size={24} />
            </button>
            <span className="text-xs mt-1 text-gray-600">Instagram</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="w-12 h-12 bg-[#0077B5] text-white rounded-full flex items-center justify-center">
              <Linkedin size={24} />
            </button>
            <span className="text-xs mt-1 text-gray-600">LinkedIn</span>
          </div>
        </div>
        
        {/* リンク共有 */}
        <div className="border rounded-md flex overflow-hidden">
          <div className="bg-gray-50 p-3 flex-grow text-gray-500 text-sm truncate">
            https://university-soccer.example.com/portfolio/{player.personalInfo.name}
          </div>
          <button 
            className="bg-green-600 text-white px-3 flex items-center"
            onClick={handleCopyLink}
          >
            {copySuccess ? <CheckCircle size={18} /> : <Link size={18} />}
          </button>
        </div>
        
        {/* プレビュー */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 mb-3">共有すると{shareOption === 'card' ? '選手カードのみ' : 'ポートフォリオ全体'}が表示されます</p>
          <div className="bg-gray-100 p-3 rounded-md">
            {shareOption === 'card' ? (
              <div className="bg-white p-4 rounded border border-gray-200 inline-block shadow-sm mx-auto">
                <div className="flex items-center mb-2">
                  <div className="bg-green-600 text-white font-bold text-xl w-8 h-8 rounded-full flex items-center justify-center mr-2">
                    {player.metrics.overall}
                  </div>
                    <span className="text-gray-800">
                        {player.personalInfo.name} | {player.personalInfo.position}
                    </span>
                </div>
                <div className="flex justify-center space-x-1 mt-1">
                  {player.metrics.specialAbilities.slice(0, 2).map((ability, index) => (
                    <div key={index} className="bg-green-50 text-green-600 text-xs px-1.5 py-0.5 rounded text-center">
                      {ability}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-20">
                <User size={24} className="text-gray-400 mr-2" />
                <div className="text-left">
                  <p className="font-medium">{player.personalInfo.name}のポートフォリオ</p>
                  <p className="text-xs text-gray-500">プロフィール・実績・志望大学などすべての情報</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// レーダーチャートコンポーネント
const StatsRadarChart = ({ stats }) => {
  // SVG用の計算
  const centerX = 100;
  const centerY = 100;
  const radius = 80;
  
  // 能力値の正規化 (0-100) -> (0-1)
  const normalized = {
    passing: stats.passing / 100,
    shooting: stats.shooting / 100,
    dribbling: stats.dribbling / 100,
    defense: stats.defense / 100,
    physical: stats.physical / 100,
    speed: stats.speed / 100
  };
  
  // 頂点の計算
  const angle = Math.PI * 2 / 6; // 6つの能力値
  const points = [
    { x: centerX, y: centerY - radius * normalized.passing }, // 上（パス）
    { x: centerX + radius * normalized.shooting * Math.sin(angle), y: centerY - radius * normalized.shooting * Math.cos(angle) }, // 右上（シュート）
    { x: centerX + radius * normalized.dribbling * Math.sin(2 * angle), y: centerY - radius * normalized.dribbling * Math.cos(2 * angle) }, // 右下（ドリブル）
    { x: centerX, y: centerY + radius * normalized.defense }, // 下（守備）
    { x: centerX - radius * normalized.physical * Math.sin(2 * angle), y: centerY - radius * normalized.physical * Math.cos(2 * angle) }, // 左下（フィジカル）
    { x: centerX - radius * normalized.speed * Math.sin(angle), y: centerY - radius * normalized.speed * Math.cos(angle) } // 左上（スピード）
  ];
  
  // ポリゴンの頂点を文字列に変換
  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');
  
  return (
    <div className="flex justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200">
        {/* 背景の六角形（レーダーチャートの枠） */}
        <polygon 
          points={`${centerX},${centerY-radius} ${centerX+radius*Math.sin(angle)},${centerY-radius*Math.cos(angle)} ${centerX+radius*Math.sin(2*angle)},${centerY-radius*Math.cos(2*angle)} ${centerX},${centerY+radius} ${centerX-radius*Math.sin(2*angle)},${centerY-radius*Math.cos(2*angle)} ${centerX-radius*Math.sin(angle)},${centerY-radius*Math.cos(angle)}`} 
          fill="none" 
          stroke="#e5e7eb" 
          strokeWidth="1" 
        />
        
        {/* 70%ライン */}
        <polygon 
          points={`${centerX},${centerY-radius*0.7} ${centerX+radius*0.7*Math.sin(angle)},${centerY-radius*0.7*Math.cos(angle)} ${centerX+radius*0.7*Math.sin(2*angle)},${centerY-radius*0.7*Math.cos(2*angle)} ${centerX},${centerY+radius*0.7} ${centerX-radius*0.7*Math.sin(2*angle)},${centerY-radius*0.7*Math.cos(2*angle)} ${centerX-radius*0.7*Math.sin(angle)},${centerY-radius*0.7*Math.cos(angle)}`} 
          fill="none" 
          stroke="#e5e7eb" 
          strokeWidth="1" 
        />
        
        {/* 40%ライン */}
        <polygon 
          points={`${centerX},${centerY-radius*0.4} ${centerX+radius*0.4*Math.sin(angle)},${centerY-radius*0.4*Math.cos(angle)} ${centerX+radius*0.4*Math.sin(2*angle)},${centerY-radius*0.4*Math.cos(2*angle)} ${centerX},${centerY+radius*0.4} ${centerX-radius*0.4*Math.sin(2*angle)},${centerY-radius*0.4*Math.cos(2*angle)} ${centerX-radius*0.4*Math.sin(angle)},${centerY-radius*0.4*Math.cos(angle)}`} 
          fill="none" 
          stroke="#e5e7eb" 
          strokeWidth="1" 
        />
        
        {/* 基準線 */}
        <line x1={centerX} y1={centerY-radius} x2={centerX} y2={centerY+radius} stroke="#e5e7eb" strokeWidth="1" />
        <line x1={centerX+radius*Math.sin(angle)} y1={centerY-radius*Math.cos(angle)} x2={centerX-radius*Math.sin(angle)} y2={centerY+radius*Math.cos(angle)} stroke="#e5e7eb" strokeWidth="1" />
        <line x1={centerX+radius*Math.sin(2*angle)} y1={centerY-radius*Math.cos(2*angle)} x2={centerX-radius*Math.sin(2*angle)} y2={centerY+radius*Math.cos(2*angle)} stroke="#e5e7eb" strokeWidth="1" />
        
        {/* 能力値ポリゴン - 緑色に変更 */}
        <polygon 
          points={polygonPoints}
          fill="rgba(22, 163, 74, 0.2)" 
          stroke="#16a34a" 
          strokeWidth="1.5" 
        />
        
        {/* 能力値のラベル */}
        <text x={centerX} y={centerY-radius-10} textAnchor="middle" fontSize="11" fill="#6b7280">パス</text>
        <text x={centerX+radius*Math.sin(angle)+10} y={centerY-radius*Math.cos(angle)} textAnchor="start" fontSize="11" fill="#6b7280">シュート</text>
        <text x={centerX+radius*Math.sin(2*angle)+10} y={centerY-radius*Math.cos(2*angle)} textAnchor="start" fontSize="11" fill="#6b7280">ドリブル</text>
        <text x={centerX} y={centerY+radius+15} textAnchor="middle" fontSize="11" fill="#6b7280">守備</text>
        <text x={centerX-radius*Math.sin(2*angle)-10} y={centerY-radius*Math.cos(2*angle)} textAnchor="end" fontSize="11" fill="#6b7280">フィジカル</text>
        <text x={centerX-radius*Math.sin(angle)-10} y={centerY-radius*Math.cos(angle)} textAnchor="end" fontSize="11" fill="#6b7280">スピード</text>
      </svg>
    </div>
  );
};

// 選手カードタブのコンテンツ
const PlayerCardTab = ({ player, editMode }) => {
  // 数値編集用のステート - 実際の実装では各能力値ごとに作成
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState(0);
  
  // 日付をフォーマットする関数
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // 数値編集関数
  const startEditing = (stat, value) => {
    if (!editMode) return;
    setEditing(stat);
    setEditValue(value);
  };
  
  const saveEdit = () => {
    // 実際の実装では値を更新する処理
    setEditing(null);
  };
  
  // フォーカスが外れたときに保存
  const handleBlur = () => {
    saveEdit();
  };
  
  // Enterキーで保存
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    }
  };
  
  return (
    <div className="space-y-8">
      {/* プレー動画セクション */}
        <div className="group relative bg-black rounded-lg overflow-hidden" style={{ paddingTop: '56.25%' }}>
            <div className="absolute inset-0">
                {/* 実際のビデオ要素 */}
                <video 
                className="w-full h-full object-cover"
                controls
                poster="/assets/images/video-thumbnail.jpg" // サムネイル画像（オプション）
                >
                <source src="/assets/videos/sample-play.mp4" type="video/mp4" />
                あなたのブラウザは動画再生をサポートしていません
                </video>
                
                {/* 編集モード時のオーバーレイ */}
                {editMode && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center text-sm">
                    <Upload size={14} className="mr-2" />
                    動画を変更
                    </button>
                </div>
                )}
            </div>
        </div>
      
      {/* 選手基本情報カード - 白背景に変更 */}
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              {/* ポジションと総合評価 */}
              <div className="flex items-center mb-3">
                <div className="bg-green-600 text-white font-bold text-3xl w-12 h-12 rounded-full flex items-center justify-center mr-3">
                  {editMode && editing === 'overall' ? (
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={handleBlur}
                      onKeyDown={handleKeyDown}
                      className="bg-green-700 w-10 text-center outline-none border border-green-500"
                      autoFocus
                    />
                  ) : (
                    <span onClick={() => startEditing('overall', player.metrics.overall)}>
                      {player.metrics.overall}
                    </span>
                  )}
                </div>
                <div className="border border-green-600 text-green-600 font-medium rounded px-3 py-1 text-sm">
                  {player.personalInfo.position}
                </div>
              </div>
              
              {/* 名前とプレースタイル */}
              <h3 className="text-xl font-medium mb-1 text-gray-800">{player.personalInfo.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{player.personalInfo.playStyle}</p>
              
              {/* 志向タイプ */}
              <div className="inline-block bg-green-50 rounded px-3 py-1.5 text-sm">
                <span className="text-gray-500 mr-2">志向:</span>
                <span className="text-green-600 font-medium">{player.aspirations.type}</span>
              </div>
            </div>
            
            {/* プロフィール写真スペース */}
            <div className="relative">
                <div className="w-20 h-20 bg-gray-100 rounded-full border border-gray-200 overflow-hidden">
                    <img 
                    src="/assets/images/profile-photo.jpg"
                    alt="プロフィール写真"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        // 画像読み込みエラー時にフォールバックとしてアイコンを表示
                        e.target.style.display = 'none';
                        e.currentTarget.parentNode.innerHTML += `
                        <div class="w-full h-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        `;
                    }}
                    />
                </div>
                {editMode && (
                    <button className="absolute bottom-0 right-0 bg-green-600 rounded-full p-1 border border-green-700">
                    <Camera size={14} className="text-white" />
                    </button>
                )}
                </div>
          </div>
          
          {/* 基本情報のバッジ */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
            <div className="rounded bg-gray-50 px-2.5 py-1 text-xs">
              <span className="text-gray-500">高校:</span> {player.personalInfo.highSchool}
            </div>
            <div className="rounded bg-gray-50 px-2.5 py-1 text-xs">
              <span className="text-gray-500">身長:</span> {player.personalInfo.height} cm
            </div>
            <div className="rounded bg-gray-50 px-2.5 py-1 text-xs">
              <span className="text-gray-500">体重:</span> {player.personalInfo.weight} kg
            </div>
            <div className="rounded bg-gray-50 px-2.5 py-1 text-xs">
              <span className="text-gray-500">利き足:</span> {player.personalInfo.footedness}
            </div>
          </div>
        </div>
        
        {/* 特殊能力アイコン */}
        <div className="bg-green-50 px-4 py-2.5 flex flex-wrap gap-2">
          {player.metrics.specialAbilities.map((ability, index) => (
            <div key={index} className="bg-white text-green-600 text-xs px-2 py-0.5 rounded border border-green-200">
              {ability}
            </div>
          ))}
          {editMode && (
            <button className="bg-white text-green-600 text-xs px-2 py-0.5 rounded border border-green-200 flex items-center">
              <Plus size={10} className="mr-1" />
              追加
            </button>
          )}
        </div>
      </div>
      
      {/* 能力値グリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* レーダーチャート */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-600 rounded-full inline-block mr-2"></span>
            能力レーダーチャート
          </h3>
          <StatsRadarChart stats={player.metrics} />
        </div>
        
        {/* 詳細能力値 */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-600 rounded-full inline-block mr-2"></span>
            詳細能力値
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">パス</span>
                {editMode && editing === 'passing' ? (
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="w-12 text-right bg-gray-100 border border-green-200 rounded px-1 text-green-600 font-medium"
                    autoFocus
                  />
                ) : (
                  <span 
                    className="text-green-600 font-medium cursor-pointer"
                    onClick={() => startEditing('passing', player.metrics.passing)}
                  >
                    {player.metrics.passing}
                  </span>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-green-600 h-1.5 rounded-full" 
                  style={{ width: `${player.metrics.passing}%` }}
                ></div>
              </div>
              {editMode && (
                <input
                  type="range"
                  min="0"
                  max="99"
                  value={editing === 'passing' ? editValue : player.metrics.passing}
                  onChange={(e) => {
                    if (editing === 'passing') {
                      setEditValue(e.target.value);
                    } else {
                      startEditing('passing', e.target.value);
                    }
                  }}
                  className="w-full mt-1 accent-green-600"
                />
              )}
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">シュート</span>
                <span className="text-green-600 font-medium">{player.metrics.shooting}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-green-600 h-1.5 rounded-full" 
                  style={{ width: `${player.metrics.shooting}%` }}
                ></div>
              </div>
              {editMode && (
                <input
                  type="range"
                  min="0"
                  max="99"
                  value={player.metrics.shooting}
                  className="w-full mt-1 accent-green-600"
                />
              )}
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">ドリブル</span>
                <span className="text-green-600 font-medium">{player.metrics.dribbling}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-green-600 h-1.5 rounded-full" 
                  style={{ width: `${player.metrics.dribbling}%` }}
                ></div>
              </div>
              {editMode && (
                <input
                  type="range"
                  min="0"
                  max="99"
                  value={player.metrics.dribbling}
                  className="w-full mt-1 accent-green-600"
                />
              )}
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">守備</span>
                <span className="text-green-600 font-medium">{player.metrics.defense}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-green-600 h-1.5 rounded-full" 
                  style={{ width: `${player.metrics.defense}%` }}
                ></div>
              </div>
              {editMode && (
                <input
                  type="range"
                  min="0"
                  max="99"
                  value={player.metrics.defense}
                  className="w-full mt-1 accent-green-600"
                />
              )}
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">フィジカル</span>
                <span className="text-green-600 font-medium">{player.metrics.physical}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-green-600 h-1.5 rounded-full" 
                  style={{ width: `${player.metrics.physical}%` }}
                ></div>
              </div>
              {editMode && (
                <input
                  type="range"
                  min="0"
                  max="99"
                  value={player.metrics.physical}
                  className="w-full mt-1 accent-green-600"
                />
              )}
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">スピード</span>
                <span className="text-green-600 font-medium">{player.metrics.speed}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-green-600 h-1.5 rounded-full" 
                  style={{ width: `${player.metrics.speed}%` }}
                ></div>
              </div>
              {editMode && (
                <input
                  type="range"
                  min="0"
                  max="99"
                  value={player.metrics.speed}
                  className="w-full mt-1 accent-green-600"
                />
              )}
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">ビジョン</span>
                <span className="text-green-600 font-medium">{player.metrics.vision}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-green-600 h-1.5 rounded-full" 
                  style={{ width: `${player.metrics.vision}%` }}
                ></div>
              </div>
              {editMode && (
                <input
                  type="range"
                  min="0"
                  max="99"
                  value={player.metrics.vision}
                  className="w-full mt-1 accent-green-600"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* 学びたいこと */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
          <BookOpen size={18} className="text-green-600 mr-2" />
          学びたいこと
        </h3>
        <div className="flex flex-wrap gap-2">
          {player.aspirations.interests.map((interest, index) => (
            <div key={index} className="bg-green-50 text-green-700 px-3 py-1.5 rounded border border-green-100">
              {interest}
            </div>
          ))}
          {editMode && (
            <button className="bg-white text-green-600 px-3 py-1.5 rounded border border-green-300 flex items-center">
              <Plus size={14} className="mr-1" />
              追加
            </button>
          )}
        </div>
      </div>
      
      {/* 実績 */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <Trophy size={18} className="text-green-600 mr-2" />
            実績
          </h3>
          {editMode && (
            <button className="text-green-600 text-sm flex items-center">
              <Edit size={14} className="mr-1" />
              実績を追加
            </button>
          )}
        </div>
        <div className="space-y-3">
          {player.achievements.map((achievement, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded border border-gray-100">
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                <span className="text-gray-500 text-sm">{achievement.year}</span>
              </div>
              <p className="text-green-600 mt-1">{achievement.result}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* 自己PR */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <MessageSquare size={18} className="text-green-600 mr-2" />
            自己PR
          </h3>
          {editMode && (
            <button className="text-green-600 text-sm flex items-center">
              <Edit size={14} className="mr-1" />
              編集
            </button>
          )}
        </div>
        <p className="text-gray-600 leading-relaxed">{player.personalInfo.appeal}</p>
      </div>
      
      {/* 活動実績 - 一番下に追加 */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <Clock size={18} className="text-green-600 mr-2" />
            活動実績
          </h3>
          {editMode && (
            <button className="text-green-600 text-sm flex items-center">
              <Edit size={14} className="mr-1" />
              活動を追加
            </button>
          )}
        </div>
        <div className="space-y-4">
          {player.activities.map((activity) => (
            <div key={activity.id} className="flex items-start p-3 bg-gray-50 rounded border border-gray-100">
              <div className="mr-3 flex-shrink-0">
                {activity.type === 'practice' ? (
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                ) : activity.type === 'message' ? (
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <MessageSquare size={16} className="text-green-600" />
                  </div>
                ) : activity.type === 'video' ? (
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <Video size={16} className="text-green-600" />
                  </div>
                ) : (
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <Download size={16} className="text-green-600" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-800">{activity.title}</h4>
                  <span className="text-gray-500 text-xs">{formatDate(activity.date)}</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{activity.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 編集時の保存ボタン */}
      {editMode && (
        <div className="flex justify-end">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center text-sm transition-colors">
            <Save size={16} className="mr-2" />
            変更を保存
          </button>
        </div>
      )}
    </div>
  );
};

// 志望大学タブのコンテンツ
const UniversitiesTab = ({ 
  universities = [], 
  editMode = false, 
  onShowFavorites 
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <Heart size={18} className="text-green-600 mr-2" />
        志望大学リスト
      </h3>
      
      {universities.map((university, index) => (
        <div key={university.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
          <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-sm flex-shrink-0">
                <span className="font-bold">{index + 1}</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{university.name}</h4>
                <p className="text-sm text-gray-500">{university.league}</p>
              </div>
            </div>
            
            {editMode && (
              <div className="flex space-x-1">
                <button className="p-1.5 text-green-600 hover:bg-green-50 rounded">
                  <ChevronUp size={16} />
                </button>
                <button className="p-1.5 text-green-600 hover:bg-green-50 rounded">
                  <ChevronDown size={16} />
                </button>
                <button className="p-1.5 text-red-500 hover:bg-red-50 rounded">
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-start">
              <Star size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-1">志望理由</h5>
                <p className="text-gray-600 text-sm">{university.reason}</p>
              </div>
            </div>
            
            {editMode && (
              <div className="flex justify-end mt-2">
                <button className="text-green-600 text-xs flex items-center">
                  <Edit size={12} className="mr-1" />
                  志望理由を編集
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      
      {editMode && (
        <button className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded flex items-center justify-center text-sm transition-colors">
          <Plus size={16} className="mr-1" />
          志望大学を追加
        </button>
      )}
      
      {/* 「私の進路プラン」に移動するためのボタン */}
      <div className="mt-6">
        <button 
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded flex items-center justify-center transition-colors"
          onClick={onShowFavorites}
        >
          <Heart size={18} className="mr-2" />
          「私の進路プラン」ページで詳細を管理する
        </button>
      </div>
    </div>
  );
};

export default EnhancedPlayerPortfolio;