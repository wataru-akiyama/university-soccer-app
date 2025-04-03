import React, { useState, useEffect } from 'react';
import { 
    ChevronRight, 
    Upload, 
    Edit, 
    PlusCircle, 
    Save, 
    Camera, 
    Trophy, 
    UserCircle, 
    Share,
    FileText,
    Star,
    Heart,
    Clock,
    Video,
    Info,
    CheckCircle,
    MessageCircle
} from 'lucide-react';
import defaultUserProfile from '../data/userProfile';

const MyPortfolio = ({ onBack, favoriteUniversities }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(defaultUserProfile);
  
  // LocalStorageからプロフィールを読み込む
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);
  
  // プロフィールをLocalStorageに保存
  const saveProfile = (updatedProfile) => {
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setUserProfile(updatedProfile);
  };
  
  // 編集用関数
  const handleProfileUpdate = (field, value) => {
    const updatedProfile = { ...userProfile };
    
    if (field.includes('.')) {
      const [section, key] = field.split('.');
      updatedProfile[section][key] = value;
    } else {
      updatedProfile[field] = value;
    }
    
    saveProfile(updatedProfile);
  };
  
  // 実績追加関数
  const addAchievement = (achievement) => {
    const newId = userProfile.achievements.length > 0 
      ? Math.max(...userProfile.achievements.map(a => a.id)) + 1 
      : 1;
    
    const newAchievement = {
      id: newId,
      ...achievement
    };
    
    const updatedProfile = {
      ...userProfile,
      achievements: [...userProfile.achievements, newAchievement]
    };
    
    saveProfile(updatedProfile);
  };
  
  // 評価追加関数
  const addReview = (review) => {
    const newId = userProfile.reviews.length > 0 
      ? Math.max(...userProfile.reviews.map(r => r.id)) + 1 
      : 1;
    
    const newReview = {
      id: newId,
      ...review
    };
    
    const updatedProfile = {
      ...userProfile,
      reviews: [...userProfile.reviews, newReview]
    };
    
    saveProfile(updatedProfile);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* ヘッダー部分 */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
        <div className="flex justify-between items-center">
          <button 
            className="bg-white text-green-700 px-3 py-1 rounded-lg flex items-center text-sm shadow-sm hover:bg-gray-100 transition-colors"
            onClick={onBack}
          >
            <ChevronRight className="transform rotate-180 mr-1" size={16} />
            戻る
          </button>
          
          <div className="flex items-center space-x-2">
            <button 
              className="bg-white text-green-700 px-3 py-1 rounded-lg flex items-center text-sm shadow-sm hover:bg-gray-100 transition-colors"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit size={16} className="mr-1" />
              {isEditing ? "編集終了" : "編集する"}
            </button>
            
            <button 
              className="bg-white text-blue-600 px-3 py-1 rounded-lg flex items-center text-sm shadow-sm hover:bg-gray-100 transition-colors"
            >
              <Share size={16} className="mr-1" />
              共有
            </button>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mt-4">私のサッカーポートフォリオ</h2>
        <p className="text-green-100">大学サッカー部へのアピール資料として活用できます</p>
      </div>
      
      {/* メインコンテンツ */}
      <div className="p-6">
        {/* 動画アップロードセクション */}
        <div className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-green-700">
            <Video className="mr-2" size={20} />
            プレー動画
          </h3>
          
          {isEditing ? (
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="text-center">
                <Upload size={36} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600 font-medium">クリックして動画をアップロード</p>
                <p className="text-gray-500 text-sm">またはドラッグ&ドロップ（最大3分間まで）</p>
                <p className="mt-2 text-xs text-gray-400">推奨: 試合やスキルのハイライト</p>
              </div>
            </div>
          ) : (
            <div className="relative h-64 bg-black rounded-lg overflow-hidden">
              {userProfile.videos && userProfile.videos.length > 0 ? (
                <video 
                  className="w-full h-full object-contain" 
                  controls
                  src={userProfile.videos[0].url}
                  poster={userProfile.videos[0].thumbnail}
                >
                  お使いのブラウザは動画再生に対応していません
                </video>
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-900">
                  <div className="text-center text-gray-400">
                    <Video size={48} className="mx-auto mb-2 opacity-50" />
                    <p>動画が登録されていません</p>
                  </div>
                </div>
              )}
              
              {isEditing && (
                <div className="absolute bottom-4 right-4">
                  <button className="bg-green-600 text-white p-2 rounded-full shadow-md hover:bg-green-700 transition-colors">
                    <PlusCircle size={20} />
                  </button>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-3 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {userProfile.videos && userProfile.videos.length > 0 
                ? `最終更新: ${new Date(userProfile.videos[0].updatedAt).toLocaleDateString()}` 
                : "動画はまだアップロードされていません"}
            </p>
            {userProfile.videos && userProfile.videos.length > 0 && (
              <div className="flex space-x-2">
                <button className="text-blue-600 text-sm hover:text-blue-800 transition-colors">動画の管理</button>
                <button className="text-blue-600 text-sm hover:text-blue-800 transition-colors">別の動画をアップロード</button>
              </div>
            )}
          </div>
        </div>
        
        {/* プロフィール写真と基本プロフィールを横並びに */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* 左側 - 写真 (1/3幅) */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-full">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-green-700">
                <Camera className="mr-2" size={20} />
                プロフィール写真
              </h3>
              
              <div className="space-y-4">
                <div className="relative">
                  {userProfile.photos && userProfile.photos.profile ? (
                    <img 
                      src={userProfile.photos.profile}
                      alt="プロフィール写真" 
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <UserCircle size={64} className="text-gray-400" />
                    </div>
                  )}
                  
                  {isEditing && (
                    <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <Edit size={16} />
                    </button>
                  )}
                </div>
                
                {isEditing && (
                  <button className="w-full py-2 bg-blue-600 text-white rounded-md flex items-center justify-center">
                    <PlusCircle size={16} className="mr-2" />
                    写真を追加
                  </button>
                )}
                
                <div className="flex overflow-x-auto py-2 space-x-2">
                  {userProfile.photos && userProfile.photos.action && userProfile.photos.action.map((photo, index) => (
                    <div key={index} className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                      <img 
                        src={photo} 
                        alt={`アクション写真 ${index+1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  
                  {(!userProfile.photos || !userProfile.photos.action || userProfile.photos.action.length === 0) && (
                    <div className="flex-shrink-0 w-16 h-16 rounded-md bg-gray-200 flex items-center justify-center">
                      <Camera size={16} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* 右側 - プロフィール情報 (2/3幅) */}
          <div className="lg:w-2/3">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-full">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-green-700">
                <UserCircle className="mr-2" size={20} />
                基本プロフィール
              </h3>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">名前</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        defaultValue={userProfile.personalInfo.name}
                        onChange={(e) => handleProfileUpdate('personalInfo.name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">所属高校</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        defaultValue={userProfile.personalInfo.highSchool}
                        onChange={(e) => handleProfileUpdate('personalInfo.highSchool', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">身長</label>
                      <input 
                        type="number" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        defaultValue={userProfile.personalInfo.height}
                        onChange={(e) => handleProfileUpdate('personalInfo.height', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">体重</label>
                      <input 
                        type="number" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        defaultValue={userProfile.personalInfo.weight}
                        onChange={(e) => handleProfileUpdate('personalInfo.weight', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">卒業予定年</label>
                      <input 
                        type="number" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        defaultValue={userProfile.personalInfo.graduationYear}
                        onChange={(e) => handleProfileUpdate('personalInfo.graduationYear', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ポジション</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        defaultValue={userProfile.personalInfo.position}
                        onChange={(e) => handleProfileUpdate('personalInfo.position', e.target.value)}
                      >
                        <option value="">選択してください</option>
                        <option value="GK">GK</option>
                        <option value="DF">DF</option>
                        <option value="MF">MF</option>
                        <option value="FW">FW</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">利き足</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        defaultValue={userProfile.personalInfo.footedness}
                        onChange={(e) => handleProfileUpdate('personalInfo.footedness', e.target.value)}
                      >
                        <option value="">選択してください</option>
                        <option value="右足">右足</option>
                        <option value="左足">左足</option>
                        <option value="両足">両足</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">プレースタイル</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue={userProfile.personalInfo.playStyle}
                      onChange={(e) => handleProfileUpdate('personalInfo.playStyle', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">自己アピール</label>
                    <textarea 
                      className="w-full p-2 border border-gray-300 rounded-md h-24"
                      defaultValue={userProfile.personalInfo.appeal}
                      onChange={(e) => handleProfileUpdate('personalInfo.appeal', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
                      onClick={() => setIsEditing(false)}
                    >
                      <Save size={16} className="mr-2" />
                      保存する
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold">
                      {userProfile.personalInfo.name || "名前未設定"}
                    </h4>
                    {userProfile.personalInfo.highSchool && (
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {userProfile.personalInfo.highSchool}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                      <p className="text-xs text-gray-500">身長</p>
                      <p className="font-semibold">
                        {userProfile.personalInfo.height ? `${userProfile.personalInfo.height} cm` : "-"}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                      <p className="text-xs text-gray-500">体重</p>
                      <p className="font-semibold">
                        {userProfile.personalInfo.weight ? `${userProfile.personalInfo.weight} kg` : "-"}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                      <p className="text-xs text-gray-500">ポジション</p>
                      <p className="font-semibold">
                        {userProfile.personalInfo.position || "-"}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                      <p className="text-xs text-gray-500">利き足</p>
                      <p className="font-semibold">
                        {userProfile.personalInfo.footedness || "-"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h5 className="font-medium mb-2">プレースタイル</h5>
                    <p className="text-gray-700">
                      {userProfile.personalInfo.playStyle || "未設定"}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h5 className="font-medium mb-2">自己アピール</h5>
                    <p className="text-gray-700">
                      {userProfile.personalInfo.appeal || "未設定"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 競技実績 */}
        <div className="mb-8">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center text-green-700">
                <Trophy className="mr-2" size={20} />
                競技実績
              </h3>
              
              {isEditing && (
                <button 
                  className="bg-green-600 text-white px-3 py-1 rounded-md flex items-center text-sm"
                  onClick={() => {
                    // 実績追加モーダルを表示する処理（実装省略）
                    const newAchievement = {
                      title: "新しい実績",
                      result: "結果",
                      year: new Date().getFullYear().toString(),
                      description: "説明を入力してください"
                    };
                    addAchievement(newAchievement);
                  }}
                >
                  <PlusCircle size={16} className="mr-1" />
                  実績を追加
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {userProfile.achievements && userProfile.achievements.length > 0 ? (
                userProfile.achievements.map(achievement => (
                  <div key={achievement.id} className="relative p-4 bg-white rounded-lg border border-gray-200">
                    {isEditing && (
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={16} />
                        </button>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{achievement.title}</h4>
                      <span className="text-gray-500 text-sm">{achievement.year}年</span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        {achievement.result}
                      </span>
                    </div>
                    
                    <p className="text-gray-700">{achievement.description}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-white rounded-lg border border-gray-200">
                  <Trophy size={32} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">競技実績が登録されていません</p>
                  {isEditing && (
                    <button 
                      className="mt-2 text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        // 実績追加モーダルを表示する処理（実装省略）
                        const newAchievement = {
                          title: "新しい実績",
                          result: "結果",
                          year: new Date().getFullYear().toString(),
                          description: "説明を入力してください"
                        };
                        addAchievement(newAchievement);
                      }}
                    >
                      実績を追加する
                    </button>
                  )}
                </div>
              )}
              
              {userProfile.achievements && userProfile.achievements.length > 3 && (
                <button className="w-full py-2 text-center text-blue-600 hover:text-blue-800 transition-colors">
                  すべての実績を見る（{userProfile.achievements.length}件）
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* 指導者評価 */}
        <div className="mb-8">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center text-green-700">
                <FileText className="mr-2" size={20} />
                指導者からの評価
              </h3>
              
              {isEditing && (
                <button 
                  className="bg-green-600 text-white px-3 py-1 rounded-md flex items-center text-sm"
                  onClick={() => {
                    // 評価追加モーダルを表示する処理（実装省略）
                    const newReview = {
                      reviewer: "監督名",
                      organization: "所属チーム/学校",
                      rating: 4,
                      text: "評価コメントを入力してください"
                    };
                    addReview(newReview);
                  }}
                >
                  <PlusCircle size={16} className="mr-1" />
                  評価を追加
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {userProfile.reviews && userProfile.reviews.length > 0 ? (
                userProfile.reviews.map(review => (
                  <div key={review.id} className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{review.reviewer}</h4>
                        <p className="text-sm text-gray-500">{review.organization}</p>
                      </div>
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < review.rating ? "currentColor" : "none"} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-white rounded-lg border border-gray-200">
                  <FileText size={32} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">指導者からの評価が登録されていません</p>
                  {isEditing && (
                    <button 
                      className="mt-2 text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        // 評価追加モーダルを表示する処理（実装省略）
                        const newReview = {
                          reviewer: "監督名",
                          organization: "所属チーム/学校",
                          rating: 4,
                          text: "評価コメントを入力してください"
                        };
                        addReview(newReview);
                      }}
                    >
                      評価を追加する
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 志望校リストとメッセージ */}
        <div className="mb-8">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold flex items-center text-green-700 mb-4">
              <Heart className="mr-2" size={20} />
              志望大学へのメッセージ
            </h3>
            
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">志望大学を選択</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">すべての志望大学に表示</option>
                      {favoriteUniversities.map(university => (
                        <option key={university.id} value={university.id}>
                          {university.university_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">メッセージ</label>
                    <textarea 
                      className="w-full p-2 border border-gray-300 rounded-md h-24"
                      placeholder="大学サッカー部へのメッセージを入力してください"
                      defaultValue={userProfile.universityMessages}
                      onChange={(e) => handleProfileUpdate('universityMessages', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
                      onClick={() => setIsEditing(false)}
                    >
                      <Save size={16} className="mr-2" />
                      保存する
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                    <Info size={18} className="text-blue-500 mr-2" />
                    <p className="text-sm text-blue-600">このメッセージは「私の進路プラン」に登録した大学に表示されます</p>
                  </div>
                  
                  {userProfile.universityMessages ? (
                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                      <p className="text-gray-700">{userProfile.universityMessages}</p>
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-white rounded-lg border border-gray-200">
                      <p className="text-gray-500">メッセージが設定されていません</p>
                      {isEditing && (
                        <button className="mt-2 text-blue-600 hover:text-blue-800">
                          メッセージを入力する
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* 活動記録 */}
        <div>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center text-green-700">
                <Clock className="mr-2" size={20} />
                活動記録
              </h3>
            </div>
            
            <div className="space-y-4">
              {userProfile.activities && userProfile.activities.length > 0 ? (
                userProfile.activities.map(activity => (
                  <div key={activity.id} className="p-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`${
                        activity.type === 'practice' ? 'bg-green-100' : 
                        activity.type === 'message' ? 'bg-blue-100' : 
                        'bg-purple-100'
                      } p-2 rounded-full mr-3`}>
                        {activity.type === 'practice' ? (
                          <CheckCircle size={16} className="text-green-600" />
                        ) : activity.type === 'message' ? (
                          <MessageCircle size={16} className="text-blue-600" />
                        ) : (
                          <Video size={16} className="text-purple-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">詳細</button>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-white rounded-lg border border-gray-200">
                  <Clock size={32} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">活動記録がありません</p>
                  <p className="text-sm text-gray-400 mt-1">
                    練習参加やメッセージ受信などの活動が記録されます
                  </p>
                </div>
              )}
              
              {userProfile.activities && userProfile.activities.length > 3 && (
                <button className="w-full py-2 text-center text-blue-600 hover:text-blue-800 transition-colors">
                  すべての活動を見る
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MyPortfolio;