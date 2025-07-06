import React, { useState, useEffect } from 'react';
import { 
    ChevronLeft, 
    Edit, 
    Trophy, 
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
    Heart,
    Send,
    Users
} from 'lucide-react';
import SimpleUniversityCard from './SimpleUniversityCard';

// メインコンポーネント - 統合版
const EnhancedPlayerPortfolio = ({ 
  onBack, 
  favoriteUniversities,
  onShowCompare,
  onRemoveFromFavorites,
  onReorderFavorites,
  onViewDetails,
  userProfile
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
    `px-3 sm:px-5 py-3 font-medium text-sm sm:text-base transition-colors ${
      activeTab === tabName 
        ? 'border-b-2 border-green-600 text-green-700' 
        : 'text-gray-500 hover:text-green-700'
    }`;
    
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-sm">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 sm:p-5 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center min-w-0 flex-1">
              <button className="mr-2 sm:mr-3 bg-white/10 p-1.5 sm:p-2 rounded-full flex-shrink-0" onClick={onBack}>
                <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
              </button>
              <h2 className="text-lg sm:text-xl font-medium truncate">マイポートフォリオ</h2>
            </div>
            <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
              <button 
                className="bg-white text-green-600 hover:bg-green-50 hover:text-green-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md flex items-center text-xs sm:text-sm transition-colors"
                onClick={() => setEditMode(!editMode)}
              >
                <Edit size={14} className="sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
                <span className="hidden sm:inline">{editMode ? "編集終了" : "編集する"}</span>
                <span className="sm:hidden">編集</span>
              </button>
              <button 
                className="bg-green-500 hover:bg-green-400 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md flex items-center text-xs sm:text-sm transition-colors"
                onClick={() => setShowShareModal(true)}
              >
                <Send size={14} className="sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
                <span className="hidden sm:inline">大学紹介依頼</span>
                <span className="sm:hidden">紹介依頼</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* タブナビゲーション */}
        <div className="flex border-b bg-white overflow-x-auto">
          <button 
            className={tabClass('playerCard')}
            onClick={() => setActiveTab('playerCard')}
          >
            <div className="flex items-center whitespace-nowrap">
              <User size={16} className={`${activeTab === 'playerCard' ? "text-green-600" : "text-gray-500"} mr-1 sm:mr-2`} />
              <span>選手カード</span>
            </div>
          </button>
          <button 
            className={tabClass('universities')}
            onClick={() => setActiveTab('universities')}
          >
            <div className="flex items-center whitespace-nowrap">
              <Heart size={16} className={`${activeTab === 'universities' ? "text-green-600" : "text-gray-500"} mr-1 sm:mr-2`} />
              <span>進路プラン</span>
              {favoriteUniversities.length > 0 && (
                <div className="ml-1 sm:ml-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {favoriteUniversities.length}
                </div>
              )}
            </div>
          </button>
        </div>
        
        {/* タブコンテンツ */}
        <div className="p-4 sm:p-6">
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
      
      {/* 紹介依頼モーダル */}
      {showShareModal && (
        <ShareModal 
          onClose={() => setShowShareModal(false)} 
          player={playerData}
          favoriteUniversities={favoriteUniversities}
        />
      )}
    </div>
  );
};

// 統合された志望大学タブコンポーネント（統一カード使用版）
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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
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
            <SimpleUniversityCard
              key={university.id}
              university={university}
              onViewDetails={onViewDetails}
              isInFavorites={true}
              // 進路プラン用のprops
              isPortfolioMode={true}
              portfolioRank={index + 1}
              onMoveUp={() => moveUp(index)}
              onMoveDown={() => moveDown(index)}
              canMoveUp={index > 0}
              canMoveDown={index < universities.length - 1}
              onRemoveFromPortfolio={onRemoveFromFavorites}
              // 使用しないpropsは無効化
              onAddToCompare={() => {}}
              onRemoveFromCompare={() => {}}
              isInCompareList={false}
              onAddToFavorites={() => {}}
              onRemoveFromFavorites={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-10">
          <div className="bg-gray-50 rounded-xl p-6 sm:p-8 shadow-inner">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center opacity-50">
              <svg width="48" height="48" className="sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21L10.55 19.7C5.4 15.1 2 12.1 2 8.5C2 5.5 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 8.5 22 8.5C22 12.1 18.6 15.1 13.45 19.7L12 21Z" fill="#6B7280"/>
              </svg>
            </div>
            <p className="text-base sm:text-lg font-medium mb-2 text-gray-700">志望大学がまだ登録されていません</p>
            <p className="text-sm sm:text-base text-gray-500">大学の詳細ページから「お気に入りに追加」ボタンをクリックして登録できます</p>
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

// 選手カードタブのコンテンツ（スマホ対応修正版）
const PlayerCardTab = ({ player, editMode }) => {
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
    <div className="space-y-6 sm:space-y-8">
      {/* 選手基本情報カード - 白背景 */}
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <div className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
            <div className="flex-1 min-w-0">
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
            <div className="relative flex-shrink-0 self-center sm:self-start">
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
          
          {/* 基本情報のバッジ - スマホ対応 */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 mt-4 pt-4 border-t border-gray-100">
            <div className="rounded bg-gray-50 px-2 sm:px-2.5 py-1 text-xs">
              <span className="text-gray-500">高校:</span> 
              <span className="block sm:inline sm:ml-1 font-medium">{player.personalInfo.highSchool}</span>
            </div>
            <div className="rounded bg-gray-50 px-2 sm:px-2.5 py-1 text-xs">
              <span className="text-gray-500">身長:</span> {player.personalInfo.height} cm
            </div>
            <div className="rounded bg-gray-50 px-2 sm:px-2.5 py-1 text-xs">
              <span className="text-gray-500">体重:</span> {player.personalInfo.weight} kg
            </div>
            <div className="rounded bg-gray-50 px-2 sm:px-2.5 py-1 text-xs">
              <span className="text-gray-500">利き足:</span> {player.personalInfo.footedness}
            </div>
          </div>
        </div>
      </div>
      
      {/* 学びたいこと（aspirationsがある場合のみ表示） */}
      {player.aspirations?.interests && (
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <BookOpen size={18} className="text-green-600 mr-2" />
            学びたいこと
          </h3>
          <div className="flex flex-wrap gap-2">
            {player.aspirations.interests.map((interest, index) => (
              <div key={index} className="bg-green-50 text-green-700 px-3 py-1.5 rounded border border-green-100 text-sm">
                {interest}
              </div>
            ))}
            {editMode && (
              <button className="bg-white text-green-600 px-3 py-1.5 rounded border border-green-300 flex items-center text-sm">
                <Plus size={14} className="mr-1" />
                追加
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* 実績 */}
      {player.achievements && player.achievements.length > 0 && (
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              <Trophy size={18} className="text-green-600 mr-2" />
              実績
            </h3>
            {editMode && (
              <button className="text-green-600 text-sm flex items-center self-start sm:self-auto">
                <Edit size={14} className="mr-1" />
                実績を追加
              </button>
            )}
          </div>
          <div className="space-y-3">
            {player.achievements.map((achievement, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                  <span className="text-gray-500 text-sm mt-1 sm:mt-0">{achievement.year}</span>
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
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <MessageSquare size={18} className="text-green-600 mr-2" />
            自己PR
          </h3>
          {editMode && (
            <button className="text-green-600 text-sm flex items-center self-start sm:self-auto">
              <Edit size={14} className="mr-1" />
              編集
            </button>
          )}
        </div>
        <p className="text-gray-600 leading-relaxed">{player.personalInfo.appeal}</p>
      </div>
      
      {/* 大学へのメッセージ（userProfileに含まれている場合） */}
      {player.universityMessages && (
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              <MessageSquare size={18} className="text-green-600 mr-2" />
              大学へのメッセージ
            </h3>
            {editMode && (
              <button className="text-green-600 text-sm flex items-center self-start sm:self-auto">
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
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              <Clock size={18} className="text-green-600 mr-2" />
              活動実績
            </h3>
            {editMode && (
              <button className="text-green-600 text-sm flex items-center self-start sm:self-auto">
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
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h4 className="font-medium text-gray-800">{activity.title}</h4>
                    <span className="text-gray-500 text-xs mt-1 sm:mt-0 sm:ml-2 flex-shrink-0">{formatDate(activity.date)}</span>
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

// 紹介依頼モーダル（PLAYMAKER専用）
const ShareModal = ({ onClose, player, favoriteUniversities = [] }) => {
  const [referralData, setReferralData] = useState({
    selectedUniversities: [],
    message: '',
    urgency: 'normal' // 'normal', 'urgent'
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle', 'sending', 'sent'

  // モーダル表示時に背面のスクロールを無効化
  useEffect(() => {
    // モーダルが開いた時に背面のスクロールを無効化
    document.body.style.overflow = 'hidden';
    
    // クリーンアップ関数でスクロールを復元
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleReferralSubmit = async () => {
    setSubmitStatus('sending');
    
    try {
      // PLAYMAKERに紹介依頼を送信
      await submitReferralRequest({
        player: player,
        universities: referralData.selectedUniversities,
        message: referralData.message,
        urgency: referralData.urgency
      });
      
      setSubmitStatus('sent');
      
      // 3秒後にモーダルを閉じる
      setTimeout(() => {
        onClose();
      }, 3000);
      
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  const toggleUniversitySelection = (university) => {
    setReferralData(prev => ({
      ...prev,
      selectedUniversities: prev.selectedUniversities.some(u => u.id === university.id)
        ? prev.selectedUniversities.filter(u => u.id !== university.id)
        : [...prev.selectedUniversities, university]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg p-4 sm:p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">大学紹介依頼</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* 送信完了状態 */}
        {submitStatus === 'sent' && (
          <div className="text-center py-6">
            <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-green-800 mb-2">紹介依頼を送信しました！</h4>
            <p className="text-green-600 text-sm">
              PLAYMAKERが内容を確認後、<br/>
              選択された大学に紹介いたします。
            </p>
            <div className="mt-4 p-3 bg-green-50 rounded-lg text-xs text-green-700">
              📧 確認メールをお送りしました<br/>
              ⏰ 通常1-2営業日で大学に連絡します<br/>
              📱 進捗や大学からの返事はPLAYMAKERからお知らせします
            </div>
          </div>
        )}

        {/* 入力フォーム */}
        {submitStatus !== 'sent' && (
          <div className="space-y-5">
            {/* サービス説明 */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-start">
                <Users size={20} className="text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">PLAYMAKERが大学に紹介します</h4>
                  <p className="text-sm text-green-700">
                    あなたのポートフォリオを確認後、選択された大学のサッカー部に紹介いたします。
                    大学からの返事もPLAYMAKERを通じてお知らせします。
                  </p>
                </div>
              </div>
            </div>

            {/* 希望大学選択 */}
            <div>
              <label className="block text-sm font-semibold mb-3">紹介希望大学（最大3校）</label>
              
              {/* お気に入り大学がある場合 */}
              {favoriteUniversities.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-2">あなたの進路プランから選択:</p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {favoriteUniversities.map(university => (
                      <label key={university.id} className="flex items-center p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={referralData.selectedUniversities.some(u => u.id === university.id)}
                          onChange={() => toggleUniversitySelection(university)}
                          disabled={!referralData.selectedUniversities.some(u => u.id === university.id) && referralData.selectedUniversities.length >= 3}
                          className="mr-3"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{university.university_name}</div>
                          <div className="text-xs text-gray-500">{university.soccer_club.league}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* その他の大学 */}
              <button 
                className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                disabled={referralData.selectedUniversities.length >= 3}
              >
                + その他の大学を追加
              </button>

              <p className="text-xs text-gray-500 mt-2">
                選択済み: {referralData.selectedUniversities.length}/3校
              </p>
            </div>

            {/* メッセージ */}
            <div>
              <label className="block text-sm font-semibold mb-2">紹介時に伝えたいメッセージ</label>
              <textarea
                className="w-full p-3 border rounded-lg resize-none text-sm"
                rows={4}
                placeholder="志望動機、特に伝えたいポイント、質問などがあれば記入してください。（任意）"
                value={referralData.message}
                onChange={(e) => setReferralData(prev => ({...prev, message: e.target.value}))}
                maxLength={500}
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {referralData.message.length}/500文字
              </div>
            </div>

            {/* 送信ボタン */}
            <button
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
                submitStatus === 'sending' || referralData.selectedUniversities.length === 0
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
              onClick={handleReferralSubmit}
              disabled={submitStatus === 'sending' || referralData.selectedUniversities.length === 0}
            >
              {submitStatus === 'sending' ? (
                <>
                  <Clock size={16} className="mr-2 animate-spin" />
                  送信中...
                </>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  PLAYMAKERに紹介を依頼する
                </>
              )}
            </button>

            {/* 注意事項 */}
            <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
              ⚠️ 紹介依頼は無料ですが、PLAYMAKERでの内容確認後に送信されます。<br/>
              📝 ポートフォリオの内容に不備がある場合は、修正をお願いすることがあります。<br/>
              🕐 通常1-2営業日で大学に紹介いたします。<br/>
              💬 大学からの返事はPLAYMAKERを通じてお知らせします。
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// API関数（模擬）
const submitReferralRequest = async (data) => {
  // 実際にはバックエンドAPIに送信
  console.log('紹介依頼データ:', data);
  
  return new Promise((resolve) => {
    setTimeout(resolve, 2000); // 2秒の送信シミュレーション
  });
};

export default EnhancedPlayerPortfolio;