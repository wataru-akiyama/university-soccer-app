import React, { useState } from 'react';
import { 
    UserCircle, 
    ChevronLeft, 
    Edit, 
    Trophy, 
    Star, 
    Camera,
    MessageSquare, 
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
    Heart,
    Upload,
    ChevronUp,
    ChevronDown,
    Info
} from 'lucide-react';

// メインコンポーネント - 統合版
const EnhancedPlayerPortfolio = ({ 
  onBack, 
  favoriteUniversities,
  onShowCompare,
  onRemoveFromFavorites, // 追加
  onReorderFavorites,    // 追加
  onViewDetails,         // 追加
  userProfile            // userProfile.jsからのデータを使用
}) => {
  const [activeTab, setActiveTab] = useState('playerCard');
  const [editMode, setEditMode] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // userProfileがない場合のデフォルト値
  const playerData = userProfile || {
    personalInfo: {
      name: "名前未設定",
      highSchool: "高校名未設定",
      height: 0,
      weight: 0,
      position: "未設定",
      footedness: "未設定",
      graduationYear: new Date().getFullYear(),
      playStyle: "プレースタイル未設定",
      appeal: "自己PR未設定"
    },
    achievements: [],
    activities: []
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
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-5 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button className="mr-3 bg-white/10 p-2 rounded-full" onClick={onBack}>
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-medium">マイポートフォリオ</h2>
            </div>
            <div className="flex space-x-2">
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
              <span>選手カード</span>
            </div>
          </button>
          <button 
            className={tabClass('universities')}
            onClick={() => setActiveTab('universities')}
          >
            <div className="flex items-center">
              <Heart size={18} className={activeTab === 'universities' ? "text-green-600 mr-2" : "text-gray-500 mr-2"} />
              <span>進路プラン</span>
              {favoriteUniversities.length > 0 && (
                <div className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteUniversities.length}
                </div>
              )}
            </div>
          </button>
        </div>
        
        {/* タブコンテンツ */}
        <div className="p-6">
          {activeTab === 'playerCard' ? (
            <PlayerCardTab player={playerData} editMode={editMode} />
          ) : (
            <IntegratedUniversitiesTab 
              universities={favoriteUniversities}
              editMode={editMode} 
              onRemoveFromFavorites={onRemoveFromFavorites}
              onReorderFavorites={onReorderFavorites}
              onViewDetails={onViewDetails}
            />
          )}
        </div>
      </div>
      
      {/* 共有モーダル */}
      {showShareModal && (
        <ShareModal 
          onClose={() => setShowShareModal(false)} 
          player={playerData}
        />
      )}
    </div>
  );
};

// 統合された志望大学タブコンポーネント
const IntegratedUniversitiesTab = ({ 
  universities = [], 
  editMode = false,
  onRemoveFromFavorites,
  onReorderFavorites,
  onViewDetails
}) => {
  // 上に移動
  const moveUp = (index) => {
    if (index > 0) {
      onReorderFavorites(index, index - 1);
    }
  };

  // 下に移動
  const moveDown = (index) => {
    if (index < universities.length - 1) {
      onReorderFavorites(index, index + 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800 flex items-center">
          <Heart size={18} className="text-green-600 mr-2" />
          私の進路プラン
        </h3>
        <div className="text-sm text-gray-500">
          {universities.length > 0 && `${universities.length}校登録中`}
        </div>
      </div>
      
      {universities.length > 0 ? (
        <div className="space-y-4">
          {universities.map((university, index) => (
            <div
              key={university.id}
              className="border rounded-xl p-5 flex justify-between bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex">
                {/* 順序変更ボタン */}
                <div className="flex flex-col items-center justify-center mr-4">
                  <button 
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className={`p-2 rounded-full ${index === 0 ? 'text-gray-300' : 'text-green-500 hover:bg-green-50'}`}
                    title="上に移動"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <div className="h-4"></div>
                  <button 
                    onClick={() => moveDown(index)}
                    disabled={index === universities.length - 1}
                    className={`p-2 rounded-full ${index === universities.length - 1 ? 'text-gray-300' : 'text-green-500 hover:bg-green-50'}`}
                    title="下に移動"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>
                
                <div className="mr-4 relative">
                  {/* 大学イメージ */}
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-lg overflow-hidden shadow-md relative">
                    <img 
                      src={`/images/universities/${university.id}.jpg`}
                      alt=""
                      className="w-full h-full object-cover opacity-80"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${process.env.PUBLIC_URL}/images/university-default.jpg`;
                      }}
                    />
                    {/* ロゴオーバーレイ */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white p-2 rounded-full shadow-sm">
                        <img 
                          src={`/images/logos/${university.id}.png`}
                          alt={`${university.university_name} ロゴ`}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${process.env.PUBLIC_URL}/images/default-logo.png`;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* 志望順位バッジ */}
                  <div className="absolute -top-2 -left-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md font-bold">
                    {index + 1}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{university.university_name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{university.soccer_club.league}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {university.entry_conditions.sports_recommend && (
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full inline-block">
                        スポーツ推薦あり
                      </span>
                    )}
                    {university.soccer_club.dorm_available && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full inline-block">
                        寮あり
                      </span>
                    )}
                  </div>
                  
                  <button 
                    className="text-green-600 font-medium text-sm flex items-center hover:text-green-700 transition-colors" 
                    onClick={() => onViewDetails(university)}
                  >
                    <Info size={14} className="mr-1" />
                    詳細を見る
                  </button>
                </div>
              </div>
              
              <div>
                <button
                  className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
                  onClick={() => onRemoveFromFavorites(university.id)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="bg-gray-50 rounded-xl p-8 shadow-inner">
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center opacity-50">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21L10.55 19.7C5.4 15.1 2 12.1 2 8.5C2 5.5 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.5 22 8.5C22 12.1 18.6 15.1 13.45 19.7L12 21Z" fill="#6B7280"/>
              </svg>
            </div>
            <p className="text-lg font-medium mb-2 text-gray-700">志望大学がまだ登録されていません</p>
            <p className="text-gray-500">大学の詳細ページから「お気に入りに追加」ボタンをクリックして登録できます</p>
          </div>
        </div>
      )}
      
      {/* 編集時の保存ボタン */}
      {editMode && universities.length > 0 && (
        <div className="flex justify-end">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center text-sm transition-colors">
            <Save size={16} className="mr-2" />
            順序を保存
          </button>
        </div>
      )}
    </div>
  );
};

// 選手カードタブのコンテンツ（userProfileを使用するように修正）
const PlayerCardTab = ({ player, editMode }) => {
  // 数値編集用のステート
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
  
  return (
    <div className="space-y-8">
      {/* 選手基本情報カード - 白背景 */}
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              {/* ポジション表示 */}
              <div className="flex items-center mb-3">
                <div className="border border-green-600 text-green-600 font-medium rounded px-3 py-1 text-sm">
                  {player.personalInfo.position}
                </div>
              </div>
              
              {/* 名前とプレースタイル */}
              <h3 className="text-xl font-medium mb-1 text-gray-800">{player.personalInfo.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{player.personalInfo.playStyle}</p>
              
              {/* 志向タイプ（userProfileには含まれていないので条件付きで表示） */}
              {player.aspirations?.type && (
                <div className="inline-block bg-green-50 rounded px-3 py-1.5 text-sm">
                  <span className="text-gray-500 mr-2">志向:</span>
                  <span className="text-green-600 font-medium">{player.aspirations.type}</span>
                </div>
              )}
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
      </div>
      
      {/* 学びたいこと（aspirationsがある場合のみ表示） */}
      {player.aspirations?.interests && (
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
      )}
      
      {/* 実績 */}
      {player.achievements && player.achievements.length > 0 && (
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
                {achievement.description && (
                  <p className="text-gray-600 text-sm mt-1">{achievement.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
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
      
      {/* 大学へのメッセージ（userProfileに含まれている場合） */}
      {player.universityMessages && (
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              <MessageSquare size={18} className="text-green-600 mr-2" />
              大学へのメッセージ
            </h3>
            {editMode && (
              <button className="text-green-600 text-sm flex items-center">
                <Edit size={14} className="mr-1" />
                編集
              </button>
            )}
          </div>
          <p className="text-gray-600 leading-relaxed">{player.universityMessages}</p>
        </div>
      )}
      
      {/* 活動実績 */}
      {player.activities && player.activities.length > 0 && (
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
      )}
      
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
                  <div className="border border-green-600 text-green-600 font-medium rounded px-2 py-1 text-xs mr-2">
                    {player.personalInfo.position}
                  </div>
                  <span className="text-gray-800 text-sm">
                    {player.personalInfo.name}
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  {player.personalInfo.playStyle}
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

export default EnhancedPlayerPortfolio;