// src/components/TemplatePortfolioCreator.jsx
import React, { useState, useEffect } from 'react';
import { 
  UserCircle, 
  ChevronLeft, 
  ChevronRight,
  Edit, 
  Trophy, 
  Star, 
  Camera, 
  MessageSquare, 
  Save, 
  Clock, 
  CheckCircle, 
  X, 
  Plus, 
  BookOpen,
  FileText,
  Zap,
  BarChart2,
  Check,
  Info,
  Users,
  Medal,
  Share2
} from 'lucide-react';
import TemplateSelectionModal from './modals/TemplateSelectionModal';

// テンプレート式ポートフォリオ作成機能のメインコンポーネント
const TemplatePortfolioCreator = ({ 
  onBack, 
  userProfile, 
  onSaveProfile,
  favoriteUniversities 
}) => {
  // 状態管理
  const [activeTab, setActiveTab] = useState('templateSelect');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplateModal, setShowTemplateModal] = useState(true);
  const [portfolioData, setPortfolioData] = useState({
    personalInfo: {
      name: userProfile?.personalInfo?.name || "",
      highSchool: userProfile?.personalInfo?.highSchool || "",
      height: userProfile?.personalInfo?.height || "",
      weight: userProfile?.personalInfo?.weight || "",
      position: userProfile?.personalInfo?.position || "",
      subPosition: userProfile?.personalInfo?.subPosition || "",
      footedness: userProfile?.personalInfo?.footedness || "",
      graduationYear: userProfile?.personalInfo?.graduationYear || 2026,
      playStyle: userProfile?.personalInfo?.playStyle || "",
      appeal: userProfile?.personalInfo?.appeal || ""
    },
    metrics: {
      passing: userProfile?.metrics?.passing || 65,
      shooting: userProfile?.metrics?.shooting || 65,
      dribbling: userProfile?.metrics?.dribbling || 65,
      defense: userProfile?.metrics?.defense || 65,
      physical: userProfile?.metrics?.physical || 65,
      speed: userProfile?.metrics?.speed || 65,
      vision: userProfile?.metrics?.vision || 65,
      specialAbilities: userProfile?.metrics?.specialAbilities || []
    },
    aspirations: {
      type: userProfile?.aspirations?.type || "",
      interests: userProfile?.aspirations?.interests || []
    },
    achievements: userProfile?.achievements || []
  });
  const [progress, setProgress] = useState(0);
  const [recommendedUniversities, setRecommendedUniversities] = useState([]);
  const [isDirty, setIsDirty] = useState(false); // 変更があったかどうか
  
  // 初回レンダリング時にテンプレート選択モーダルを表示
  useEffect(() => {
    // 既存のプロフィールデータがある場合はテンプレート選択をスキップ
    if (userProfile && userProfile.personalInfo && userProfile.personalInfo.name) {
      setShowTemplateModal(false);
      detectTemplateType();
      setActiveTab('playerCard');
    } else {
      setShowTemplateModal(true);
    }
  }, [userProfile]);

  // テンプレート選択モーダルに既存データがある場合のヘッダーを追加
{showTemplateModal && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-5 max-w-2xl w-full shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {userProfile && userProfile.personalInfo && userProfile.personalInfo.name 
              ? "ポートフォリオの編集スタイルを選択" 
              : "目的に合ったテンプレートを選択"}
          </h3>
        </div>
        
        {userProfile && userProfile.personalInfo && userProfile.personalInfo.name && (
          <div className="bg-blue-50 p-3 rounded-lg mb-4 border border-blue-200">
            <p className="text-blue-800 text-sm">
              既存のポートフォリオデータがあります。テンプレートに沿って編集するか、
              <button 
                className="text-blue-600 underline ml-1"
                onClick={onBack}
              >
                通常の編集画面に戻る
              </button>
              こともできます。
            </p>
          </div>
        )}
        
        <p className="text-gray-600 mb-6">
          あなたの目標に合ったテンプレートを選ぶと、ポートフォリオの作成がスムーズになります。
          大学サッカー部の志望先にもマッチした情報を入力できます。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div 
            className="border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md hover:border-green-500"
            onClick={() => selectTemplate('pro')}
          >
            <div className="bg-green-100 text-green-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
              <Trophy size={24} />
            </div>
            <h4 className="font-bold text-center text-gray-800 mb-2">プロ志向</h4>
            <p className="text-sm text-gray-600 text-center">
              Jリーグを目指し、高いレベルでプレーしたい選手向け
            </p>
          </div>
          
          <div 
            className="border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md hover:border-green-500"
            onClick={() => selectTemplate('coach')}
          >
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
              <Users size={24} />
            </div>
            <h4 className="font-bold text-center text-gray-800 mb-2">指導者志向</h4>
            <p className="text-sm text-gray-600 text-center">
              将来コーチや教員を目指す選手向け
            </p>
          </div>
          
          <div 
            className="border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md hover:border-green-500"
            onClick={() => selectTemplate('balance')}
          >
            <div className="bg-purple-100 text-purple-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
              <BookOpen size={24} />
            </div>
            <h4 className="font-bold text-center text-gray-800 mb-2">文武両道型</h4>
            <p className="text-sm text-gray-600 text-center">
              学業とサッカーの両立を目指す選手向け
            </p>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 italic">
          ※テンプレートはいつでも変更できます。最も近いものを選んでください。
        </p>
      </div>
    </div>
  )}
  
  // 既存データからテンプレートタイプを推定
  const detectTemplateType = () => {
    if (!userProfile || !userProfile.aspirations || !userProfile.aspirations.type) {
      return;
    }
    
    const aspirationType = userProfile.aspirations.type;
    
    if (aspirationType.includes('プロを目指')) {
      setSelectedTemplate('pro');
    } else if (aspirationType.includes('選手以外') || userProfile.aspirations.interests.some(i => i.includes('指導') || i.includes('コーチング'))) {
      setSelectedTemplate('coach');
    } else if (aspirationType.includes('学生主体') || aspirationType.includes('経験')) {
      setSelectedTemplate('balance');
    }
  };
  
  // ポートフォリオの進捗状況を計算
  useEffect(() => {
    calculateProgress();
    updateRecommendations();
    setIsDirty(true);
  }, [portfolioData]);
  
  // プログレスの計算
  const calculateProgress = () => {
    const requiredFields = [
      portfolioData.personalInfo.name,
      portfolioData.personalInfo.highSchool,
      portfolioData.personalInfo.position,
      portfolioData.personalInfo.appeal,
      portfolioData.aspirations.type
    ];
    
    const bonusFields = [
      portfolioData.personalInfo.playStyle,
      portfolioData.personalInfo.subPosition,
      portfolioData.personalInfo.footedness,
      portfolioData.metrics.specialAbilities.length > 0,
      portfolioData.aspirations.interests.length > 0,
      portfolioData.achievements.length > 0
    ];
    
    const requiredProgress = requiredFields.filter(Boolean).length / requiredFields.length * 70;
    const bonusProgress = bonusFields.filter(Boolean).length / bonusFields.length * 30;
    
    setProgress(Math.round(requiredProgress + bonusProgress));
  };
  
  // おすすめ大学を更新
  const updateRecommendations = () => {
    // 実際の実装では大学データから選手データに基づいて適切な大学をフィルタリング
    // この例では便宜上、お気に入り大学をおすすめとして表示
    
    if (favoriteUniversities && favoriteUniversities.length > 0) {
      const recommendations = favoriteUniversities.map(uni => ({
        id: uni.id,
        name: uni.university_name,
        league: uni.soccer_club.league,
        match: Math.floor(Math.random() * 20) + 80 // ダミーのマッチスコア（80-99%）
      }));
      
      setRecommendedUniversities(recommendations);
    } else {
      // ダミーデータ
      setRecommendedUniversities([
        { id: 1, name: "早稲田大学", league: "関東大学サッカーリーグ1部", match: 92 },
        { id: 2, name: "筑波大学", league: "関東大学サッカーリーグ1部", match: 85 },
        { id: 3, name: "明治大学", league: "関東大学サッカーリーグ1部", match: 79 }
      ]);
    }
  };
  
  // テンプレートを選択する関数
  const selectTemplate = (template) => {
    setSelectedTemplate(template);
    
    // テンプレートに基づいてデフォルト値をセット
    const baseData = { ...portfolioData };
    
    if (template === 'pro') {
      baseData.aspirations.type = "A：プロを目指してやりたい";
      baseData.aspirations.interests = ["トレーニング科学", "スポーツマネジメント"];
    } else if (template === 'coach') {
      baseData.aspirations.type = "D：選手以外の形でサッカーと関わりたい";
      baseData.aspirations.interests = ["コーチング・指導法", "教員養成（保健体育）"];
    } else if (template === 'balance') {
      baseData.aspirations.type = "C：学生主体でサッカーを通して経験したい";
      baseData.aspirations.interests = ["スポーツビジネス", "スポーツマネジメント"];
    }
    
    setPortfolioData(baseData);
    setShowTemplateModal(false);
    setActiveTab('playerCard');
  };
  
  // テンプレート変更関数
  const changeTemplate = () => {
    setShowTemplateModal(true);
  };
  
  // フォームフィールド変更ハンドラ
  const handleInputChange = (section, field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  
  // 能力値変更ハンドラ
  const handleMetricChange = (metric, value) => {
    setPortfolioData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metric]: parseInt(value)
      }
    }));
  };
  
  // 特殊能力追加ハンドラ
  const addSpecialAbility = (ability) => {
    if (!portfolioData.metrics.specialAbilities.includes(ability)) {
      setPortfolioData(prev => ({
        ...prev,
        metrics: {
          ...prev.metrics,
          specialAbilities: [...prev.metrics.specialAbilities, ability]
        }
      }));
    }
  };
  
  // 特殊能力削除ハンドラ
  const removeSpecialAbility = (ability) => {
    setPortfolioData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        specialAbilities: prev.metrics.specialAbilities.filter(a => a !== ability)
      }
    }));
  };
  
  // 実績追加ハンドラ
  const addAchievement = (achievement) => {
    setPortfolioData(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievement]
    }));
  };
  
  // 実績削除ハンドラ
  const removeAchievement = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };
  
  // 興味・関心追加ハンドラ
  const addInterest = (interest) => {
    if (!portfolioData.aspirations.interests.includes(interest)) {
      setPortfolioData(prev => ({
        ...prev,
        aspirations: {
          ...prev.aspirations,
          interests: [...prev.aspirations.interests, interest]
        }
      }));
    }
  };
  
  // 興味・関心削除ハンドラ
  const removeInterest = (interest) => {
    setPortfolioData(prev => ({
      ...prev,
      aspirations: {
        ...prev.aspirations,
        interests: prev.aspirations.interests.filter(i => i !== interest)
      }
    }));
  };
  
  // ポートフォリオの保存
  const savePortfolio = () => {
    if (onSaveProfile && isDirty) {
      onSaveProfile(portfolioData);
      setIsDirty(false);
      // 保存成功メッセージを表示するなどの処理
      alert("ポートフォリオが保存されました！");
    }
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
              <button 
                className="mr-3 bg-white/10 p-2 rounded-full"
                onClick={onBack}
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-medium">マイポートフォリオ作成</h2>
            </div>
            <div className="flex space-x-2">
              <button 
                className="bg-white text-green-600 hover:bg-green-50 hover:text-green-700 px-3 py-1.5 rounded-md flex items-center text-sm transition-colors"
                onClick={changeTemplate}
              >
                <Edit size={16} className="mr-1.5" />
                テンプレート変更
              </button>
              <button 
                className="bg-green-500 hover:bg-green-400 text-white px-3 py-1.5 rounded-md flex items-center text-sm transition-colors"
                onClick={savePortfolio}
                disabled={!isDirty}
              >
                <Save size={16} className="mr-1.5" />
                保存
              </button>
            </div>
          </div>
          
          {/* プログレスバー */}
          <div className="mt-4 bg-white/10 rounded-full h-2.5 w-full">
            <div 
              className="bg-white h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-white/80">
            <span>ポートフォリオ完成度</span>
            <span>{progress}%</span>
          </div>
        </div>
        
        {/* タブナビゲーション */}
        <div className="flex border-b bg-white">
          <button 
            className={tabClass('playerCard')}
            onClick={() => setActiveTab('playerCard')}
          >
            <div className="flex items-center">
              <UserCircle size={18} className={activeTab === 'playerCard' ? "text-green-600 mr-2" : "text-gray-500 mr-2"} />
              選手カード
            </div>
          </button>
          <button 
            className={tabClass('achievements')}
            onClick={() => setActiveTab('achievements')}
          >
            <div className="flex items-center">
              <Trophy size={18} className={activeTab === 'achievements' ? "text-green-600 mr-2" : "text-gray-500 mr-2"} />
              実績
            </div>
          </button>
          <button 
            className={tabClass('aspirations')}
            onClick={() => setActiveTab('aspirations')}
          >
            <div className="flex items-center">
              <Star size={18} className={activeTab === 'aspirations' ? "text-green-600 mr-2" : "text-gray-500 mr-2"} />
              志望
            </div>
          </button>
          <button 
            className={tabClass('preview')}
            onClick={() => setActiveTab('preview')}
          >
            <div className="flex items-center">
              <Eye size={18} className={activeTab === 'preview' ? "text-green-600 mr-2" : "text-gray-500 mr-2"} />
              プレビュー
            </div>
          </button>
        </div>
        
        {/* タブコンテンツ */}
        <div className="p-6">
          {activeTab === 'playerCard' && (
            <PlayerCardForm 
              data={portfolioData} 
              onInputChange={handleInputChange}
              onMetricChange={handleMetricChange}
              onAddSpecialAbility={addSpecialAbility}
              onRemoveSpecialAbility={removeSpecialAbility}
              selectedTemplate={selectedTemplate}
              setActiveTab={setActiveTab}
            />
          )}
          
          {activeTab === 'achievements' && (
            <AchievementsForm 
              achievements={portfolioData.achievements}
              onAddAchievement={addAchievement}
              onRemoveAchievement={removeAchievement}
              selectedTemplate={selectedTemplate}
              setActiveTab={setActiveTab}
            />
          )}
          
          {activeTab === 'aspirations' && (
            <AspirationsForm 
              aspirations={portfolioData.aspirations}
              onInputChange={handleInputChange}
              onAddInterest={addInterest}
              onRemoveInterest={removeInterest}
              selectedTemplate={selectedTemplate}
              setActiveTab={setActiveTab}
            />
          )}
          
          {activeTab === 'preview' && (
            <PortfolioPreview 
              data={portfolioData} 
              setActiveTab={setActiveTab}
              onSave={savePortfolio}
            />
          )}
        </div>
      </div>
      
      {/* おすすめ大学サイドパネル */}
      <div className="fixed right-4 top-32 w-64 bg-white rounded-lg shadow-lg p-4 border border-green-100">
        <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
          <Zap size={18} className="text-green-600 mr-2" />
          あなたにおすすめの大学
        </h3>
        <div className="space-y-3">
          {recommendedUniversities.map(uni => (
            <div key={uni.id} className="p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{uni.name}</h4>
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">{uni.match}%</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{uni.league}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="text-green-600 text-sm font-medium hover:text-green-700">
            もっと見る
          </button>
        </div>
      </div>
      
      {/* テンプレート選択モーダル - 抽出したコンポーネントに置き換え */}
      <TemplateSelectionModal
        isOpen={showTemplateModal}
        onClose={onBack}
        onSelectTemplate={selectTemplate}
        hasExistingData={Boolean(userProfile?.personalInfo?.name)}
      />
    </div>
  );
};

// 選手カードフォーム
const PlayerCardForm = ({ data, onInputChange, onMetricChange, onAddSpecialAbility, onRemoveSpecialAbility, selectedTemplate, setActiveTab }) => {
  // テンプレート別の記入ガイドを取得
  const getTemplateGuide = (field) => {
    const guides = {
      pro: {
        playStyle: "（例：ゴール前での決定力が武器のストライカー。高い身体能力を活かしたポストプレーも得意。）",
        appeal: "（例：高校時代は県大会得点王を2回獲得。フィジカルの強さを活かしたポストプレーと決定力には自信があります。大学ではより高いレベルで競い合い、Jリーグを目指したいです。）"
      },
      coach: {
        playStyle: "（例：視野の広さと戦術理解が強み。チームメイトの特徴を理解し、適切な判断ができる。）",
        appeal: "（例：キャプテンとしてチームをまとめた経験から、コミュニケーション能力に自信があります。戦術理解にも努め、監督の意図を理解し実行できる選手です。将来は指導者を目指しています。）"
      },
      balance: {
        playStyle: "（例：献身的な守備と正確なパスが持ち味。チームのバランスを整える役割を担える。）",
        appeal: "（例：高校では文武両道で取り組み、学業でも上位の成績を収めてきました。サッカーでは守備的MFとしてチームに貢献してきました。大学でもサッカーと学業を両立させていきたいです。）"
      }
    };
    
    return guides[selectedTemplate]?.[field] || "";
  };
  
  // 特殊能力候補
  const availableAbilities = [
    "シュート", "パスマスター", "ドリブラー", "守備意識", "フィジカル", "スピードスター", 
    "リーダーシップ", "視野の広さ", "決定力", "1対1", "クロス", "ヘディング", "フリーキック"
  ];
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <UserCircle size={24} className="text-green-600 mr-2" />
        基本プロフィール
        <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">必須項目</span>
      </h3>
      
      {/* フォームフィールド */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            氏名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={data.personalInfo.name}
            onChange={(e) => onInputChange('personalInfo', 'name', e.target.value)}
            placeholder="例：山田 太郎"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            高校名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={data.personalInfo.highSchool}
            onChange={(e) => onInputChange('personalInfo', 'highSchool', e.target.value)}
            placeholder="例：○○高等学校"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            身長 (cm)
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={data.personalInfo.height}
            onChange={(e) => onInputChange('personalInfo', 'height', e.target.value)}
            placeholder="例：175"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            体重 (kg)
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={data.personalInfo.weight}
            onChange={(e) => onInputChange('personalInfo', 'weight', e.target.value)}
            placeholder="例：65"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ポジション <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 border rounded-md"
            value={data.personalInfo.position}
            onChange={(e) => onInputChange('personalInfo', 'position', e.target.value)}
          >
            <option value="">選択してください</option>
            <option value="GK">GK</option>
            <option value="DF">DF</option>
            <option value="MF">MF</option>
            <option value="FW">FW</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            サブポジション
          </label>
          <select
            className="w-full p-2 border rounded-md"
            value={data.personalInfo.subPosition}
            onChange={(e) => onInputChange('personalInfo', 'subPosition', e.target.value)}
          >
            <option value="">選択してください</option>
            <option value="CB">CB</option>
            <option value="SB">SB</option>
            <option value="DMF">DMF</option>
            <option value="CMF">CMF</option>
            <option value="AMF">AMF</option>
            <option value="WG">WG</option>
            <option value="ST">ST</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            利き足
          </label>
          <select
            className="w-full p-2 border rounded-md"
            value={data.personalInfo.footedness}
            onChange={(e) => onInputChange('personalInfo', 'footedness', e.target.value)}
          >
            <option value="">選択してください</option>
            <option value="右足">右足</option>
            <option value="左足">左足</option>
            <option value="両足">両足</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            卒業予定年
          </label>
          <select
            className="w-full p-2 border rounded-md"
            value={data.personalInfo.graduationYear}
            onChange={(e) => onInputChange('personalInfo', 'graduationYear', e.target.value)}
          >
            <option value="2025">2025年</option>
            <option value="2026">2026年</option>
            <option value="2027">2027年</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          プレースタイル
          <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">推奨項目</span>
        </label>
        <div className="relative">
          <textarea
            className="w-full p-2 border rounded-md"
            rows="2"
            value={data.personalInfo.playStyle}
            onChange={(e) => onInputChange('personalInfo', 'playStyle', e.target.value)}
            placeholder={getTemplateGuide('playStyle')}
          ></textarea>
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {data.personalInfo.playStyle.length}/100文字
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          自己PR <span className="text-red-500">*</span>
          <span className="ml-2 text-xs text-gray-500">大学サッカー部にアピールしたい内容を書きましょう</span>
        </label>
        <div className="relative">
          <textarea
            className="w-full p-2 border rounded-md"
            rows="4"
            value={data.personalInfo.appeal}
            onChange={(e) => onInputChange('personalInfo', 'appeal', e.target.value)}
            placeholder={getTemplateGuide('appeal')}
          ></textarea>
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {data.personalInfo.appeal.length}/300文字
          </div>
          <div className="mt-1 text-xs text-gray-500">
            ※高校での実績、あなたの強み、大学でやりたいことなどを具体的に書くのがおすすめです
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <BarChart2 size={24} className="text-green-600 mr-2" />
          能力値
          <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">推奨項目</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">パス</span>
                <span className="text-green-600 font-medium">{data.metrics.passing}</span>
              </div>
              <input
                type="range"
                min="0"
                max="99"
                value={data.metrics.passing}
                onChange={(e) => onMetricChange('passing', e.target.value)}
                className="w-full accent-green-600"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">シュート</span>
                <span className="text-green-600 font-medium">{data.metrics.shooting}</span>
              </div>
              <input
                type="range"
                min="0"
                max="99"
                value={data.metrics.shooting}
                onChange={(e) => onMetricChange('shooting', e.target.value)}
                className="w-full accent-green-600"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">ドリブル</span>
                <span className="text-green-600 font-medium">{data.metrics.dribbling}</span>
              </div>
              <input
                type="range"
                min="0"
                max="99"
                value={data.metrics.dribbling}
                onChange={(e) => onMetricChange('dribbling', e.target.value)}
                className="w-full accent-green-600"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">守備</span>
                <span className="text-green-600 font-medium">{data.metrics.defense}</span>
              </div>
              <input
                type="range"
                min="0"
                max="99"
                value={data.metrics.defense}
                onChange={(e) => onMetricChange('defense', e.target.value)}
                className="w-full accent-green-600"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">フィジカル</span>
                <span className="text-green-600 font-medium">{data.metrics.physical}</span>
              </div>
              <input
                type="range"
                min="0"
                max="99"
                value={data.metrics.physical}
                onChange={(e) => onMetricChange('physical', e.target.value)}
                className="w-full accent-green-600"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">スピード</span>
                <span className="text-green-600 font-medium">{data.metrics.speed}</span>
              </div>
              <input
                type="range"
                min="0"
                max="99"
                value={data.metrics.speed}
                onChange={(e) => onMetricChange('speed', e.target.value)}
                className="w-full accent-green-600"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">ビジョン</span>
                <span className="text-green-600 font-medium">{data.metrics.vision}</span>
              </div>
              <input
                type="range"
                min="0"
                max="99"
                value={data.metrics.vision}
                onChange={(e) => onMetricChange('vision', e.target.value)}
                className="w-full accent-green-600"
              />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">特徴・特殊能力</h4>
            <p className="text-sm text-gray-600 mb-3">
              あなたの特徴や特殊能力を選びましょう (最大4つ)
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {data.metrics.specialAbilities.map((ability, index) => (
                <div key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded flex items-center">
                  {ability}
                  <button 
                    className="ml-1 text-green-700 hover:text-green-900"
                    onClick={() => onRemoveSpecialAbility(ability)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="border rounded-md p-3 overflow-y-auto max-h-60">
              <div className="flex flex-wrap gap-2">
                {availableAbilities.map((ability, index) => (
                  <button
                    key={index}
                    className={`px-2 py-1 rounded text-sm ${
                      data.metrics.specialAbilities.includes(ability)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => onAddSpecialAbility(ability)}
                    disabled={data.metrics.specialAbilities.includes(ability) || data.metrics.specialAbilities.length >= 4}
                  >
                    {ability}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
            onClick={() => setActiveTab('achievements')}
          >
            次へ：実績を入力
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

// 実績フォーム
const AchievementsForm = ({ achievements, onAddAchievement, onRemoveAchievement, selectedTemplate, setActiveTab }) => {
  // 新規実績のステート
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    result: "",
    year: "",
    description: ""
  });
  
  // テンプレート別の入力サンプル
  const getTemplateExample = () => {
    const examples = {
      pro: [
        { title: "全国高校サッカー選手権大会", result: "出場", year: "2023", description: "全国大会でゴールを決める" },
        { title: "県U-18選抜", result: "選出", year: "2023", description: "県代表として全国都道府県選抜大会に出場" }
      ],
      coach: [
        { title: "サッカースクールコーチ", result: "小学生指導", year: "2023", description: "地元のクラブで小学生の指導経験あり" },
        { title: "キャプテン経験", result: "高校2〜3年", year: "2022-2023", description: "チームを統率し県ベスト8に導く" }
      ],
      balance: [
        { title: "高校総体（インターハイ）", result: "県大会出場", year: "2024", description: "レギュラーとして出場" },
        { title: "校内成績", result: "学年10位以内", year: "2022-2024", description: "サッカーと学業を両立" }
      ]
    };
    
    return examples[selectedTemplate] || [];
  };
  
  // 入力例
  const examples = getTemplateExample();
  
  // フォーム送信ハンドラ
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAchievement.title && newAchievement.result) {
      onAddAchievement({
        id: Date.now(),
        ...newAchievement
      });
      setNewAchievement({
        title: "",
        result: "",
        year: "",
        description: ""
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Trophy size={24} className="text-green-600 mr-2" />
        実績
        <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">推奨項目</span>
      </h3>
      
      {/* 実績リスト */}
      <div className="space-y-3">
        {achievements.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500">実績をまだ登録していません</p>
            <p className="text-gray-500 text-sm">下記フォームから実績を追加しましょう</p>
          </div>
        ) : (
          achievements.map((achievement, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm mr-2">{achievement.year}</span>
                  <button 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onRemoveAchievement(index)}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <p className="text-green-600 mt-1">{achievement.result}</p>
              {achievement.description && (
                <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* 実績入力フォーム */}
      <form onSubmit={handleSubmit} className="border rounded-lg p-4 bg-gray-50">
        <h4 className="font-medium text-gray-800 mb-3">実績を追加</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              タイトル <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={newAchievement.title}
              onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
              placeholder="例：全国高校サッカー選手権大会"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              結果 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={newAchievement.result}
              onChange={(e) => setNewAchievement({...newAchievement, result: e.target.value})}
              placeholder="例：ベスト16"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              年度
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={newAchievement.year}
              onChange={(e) => setNewAchievement({...newAchievement, year: e.target.value})}
              placeholder="例：2023"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              詳細
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={newAchievement.description}
              onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
              placeholder="例：全試合スタメンで出場し、2ゴールを決める"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded flex items-center text-sm"
          >
            <Plus size={16} className="mr-1" />
            実績を追加
          </button>
        </div>
      </form>
      
      {/* 入力例 */}
      {examples.length > 0 && (
        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50 mt-4">
          <h4 className="font-medium text-blue-800 mb-2 flex items-center">
            <Info size={16} className="mr-1" />
            入力例
          </h4>
          <div className="space-y-2">
            {examples.map((example, index) => (
              <div key={index} className="bg-white p-2 rounded border border-blue-100">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">{example.title}</span>
                  <span className="text-gray-500 text-sm">{example.year}</span>
                </div>
                <p className="text-green-600 text-sm">{example.result}</p>
                <p className="text-xs text-gray-600">{example.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <button 
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded flex items-center"
          onClick={() => setActiveTab('playerCard')}
        >
          <ChevronLeft size={16} className="mr-1" />
          戻る
        </button>
        
        <button 
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
          onClick={() => setActiveTab('aspirations')}
        >
          次へ：志望を入力
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

// 志望フォーム
const AspirationsForm = ({ aspirations, onInputChange, onAddInterest, onRemoveInterest, selectedTemplate, setActiveTab }) => {
  // 志望タイプの選択肢
  const aspirationTypes = [
    { value: "A：プロを目指してやりたい", label: "A：プロを目指してやりたい" },
    { value: "B：とにかくどこまで上手くなれるか試したい", label: "B：とにかくどこまで上手くなれるか試したい" },
    { value: "C：学生主体でサッカーを通して経験したい", label: "C：学生主体でサッカーを通して経験したい" },
    { value: "D：選手以外の形でサッカーと関わりたい", label: "D：選手以外の形でサッカーと関わりたい" }
  ];
  
  // 学びたいこと（興味・関心）の選択肢
  const interestOptions = [
    "コーチング・指導法",
    "スポーツマネジメント",
    "トレーニング科学",
    "スポーツ医学",
    "スポーツ栄養学",
    "スポーツ心理学",
    "スポーツビジネス",
    "教員養成（保健体育）"
  ];
  
  // お勧めのテンプレート説明
  const getTemplateDescription = () => {
    const descriptions = {
      pro: "プロを目指す選手は、最高峰のリーグに所属し、Jリーグ輩出実績の高い大学がおすすめです。",
      coach: "指導者を目指す場合は、教員免許取得可能な大学や、コーチングを学べる環境が整った大学がおすすめです。",
      balance: "文武両道を目指す場合は、就職実績の良い大学で、なおかつサッカー環境も充実している大学がおすすめです。"
    };
    
    return descriptions[selectedTemplate] || "";
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Star size={24} className="text-green-600 mr-2" />
        サッカーの志向と学びたいこと
        <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">必須項目</span>
      </h3>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-amber-800 text-sm">
          <Info size={16} className="inline mr-1" />
          {getTemplateDescription()}
        </p>
      </div>
      
      {/* 志望タイプ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          サッカーに対する志向 <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full p-2 border rounded-md"
          value={aspirations.type}
          onChange={(e) => onInputChange('aspirations', 'type', e.target.value)}
        >
          <option value="">選択してください</option>
          {aspirationTypes.map((type, index) => (
            <option key={index} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>
      
      {/* 学びたいこと */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          学びたいこと
          <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">推奨項目</span>
        </label>
        <p className="text-sm text-gray-600 mb-3">
          大学で学びたい分野を選択してください（複数選択可）
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {aspirations.interests.map((interest, index) => (
            <div key={index} className="bg-green-100 text-green-700 px-3 py-1.5 rounded flex items-center">
              {interest}
              <button 
                className="ml-2 text-green-700 hover:text-green-900"
                onClick={() => onRemoveInterest(interest)}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="border rounded-md p-3 grid grid-cols-2 md:grid-cols-4 gap-2">
          {interestOptions.map((option, index) => (
            <button
              key={index}
              className={`px-3 py-1.5 rounded text-sm ${
                aspirations.interests.includes(option)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => !aspirations.interests.includes(option) && onAddInterest(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <button 
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded flex items-center"
          onClick={() => setActiveTab('achievements')}
        >
          <ChevronLeft size={16} className="mr-1" />
          戻る
        </button>
        
        <button 
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
          onClick={() => setActiveTab('preview')}
        >
          次へ：プレビュー
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

// プレビュー
const PortfolioPreview = ({ data, setActiveTab, onSave }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Eye size={24} className="text-green-600 mr-2" />
        ポートフォリオのプレビュー
      </h3>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-amber-800 text-sm">
          <Info size={16} className="inline mr-1" />
          これがあなたのポートフォリオの表示イメージです。大学サッカー部の監督やコーチがこの情報を見てあなたを評価します。
        </p>
      </div>
      
      {/* 選手カードプレビュー */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="p-5 border-b bg-gradient-to-r from-gray-50 to-white">
          <div className="flex">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4">
              {data.personalInfo.position || "?"}
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800">{data.personalInfo.name || "名前未設定"}</h3>
              <p className="text-gray-600">{data.personalInfo.highSchool || "高校未設定"}</p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {data.personalInfo.height && (
                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-sm">
                    {data.personalInfo.height}cm
                  </span>
                )}
                {data.personalInfo.weight && (
                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-sm">
                    {data.personalInfo.weight}kg
                  </span>
                )}
                {data.personalInfo.footedness && (
                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-sm">
                    {data.personalInfo.footedness}
                  </span>
                )}
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-sm">
                  {data.personalInfo.graduationYear}年卒業予定
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-5 border-b">
          <h4 className="font-semibold text-gray-800 mb-2">プレースタイル</h4>
          <p className="text-gray-700">
            {data.personalInfo.playStyle || "プレースタイルが未設定です"}
          </p>
        </div>
        
        <div className="p-5 border-b">
          <h4 className="font-semibold text-gray-800 mb-2">自己PR</h4>
          <p className="text-gray-700">
            {data.personalInfo.appeal || "自己PRが未設定です"}
          </p>
        </div>
        
        <div className="p-5 border-b bg-gray-50">
          <h4 className="font-semibold text-gray-800 mb-3">能力値</h4>
          
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-2 bg-white rounded shadow-sm">
              <div className="font-bold text-2xl text-green-600">{data.metrics.passing}</div>
              <div className="text-xs text-gray-500">パス</div>
            </div>
            
            <div className="text-center p-2 bg-white rounded shadow-sm">
              <div className="font-bold text-2xl text-green-600">{data.metrics.shooting}</div>
              <div className="text-xs text-gray-500">シュート</div>
            </div>
            
            <div className="text-center p-2 bg-white rounded shadow-sm">
              <div className="font-bold text-2xl text-green-600">{data.metrics.dribbling}</div>
              <div className="text-xs text-gray-500">ドリブル</div>
            </div>
            
            <div className="text-center p-2 bg-white rounded shadow-sm">
              <div className="font-bold text-2xl text-green-600">{data.metrics.defense}</div>
              <div className="text-xs text-gray-500">守備</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {data.metrics.specialAbilities.map((ability, index) => (
              <span key={index} className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm">
                {ability}
              </span>
            ))}
            {data.metrics.specialAbilities.length === 0 && (
              <span className="text-gray-500 text-sm">特殊能力が設定されていません</span>
            )}
          </div>
        </div>
        
        <div className="p-5 border-b">
          <h4 className="font-semibold text-gray-800 mb-3">実績</h4>
          
          {data.achievements.length > 0 ? (
            <div className="space-y-3">
              {data.achievements.map((achievement, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between">
                    <h5 className="font-medium">{achievement.title}</h5>
                    <span className="text-gray-500 text-sm">{achievement.year}</span>
                  </div>
                  <p className="text-green-600">{achievement.result}</p>
                  {achievement.description && (
                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">実績が登録されていません</p>
          )}
        </div>
        
        <div className="p-5">
          <h4 className="font-semibold text-gray-800 mb-3">サッカーの志向と学びたいこと</h4>
          
          <div className="bg-green-50 p-3 rounded-lg border border-green-100 mb-3">
            <p className="font-medium text-green-800">{data.aspirations.type || "志向タイプが未設定です"}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {data.aspirations.interests.map((interest, index) => (
              <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded">
                {interest}
              </span>
            ))}
            {data.aspirations.interests.length === 0 && (
              <span className="text-gray-500">学びたいことが設定されていません</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <button 
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded flex items-center"
          onClick={() => setActiveTab('aspirations')}
        >
          <ChevronLeft size={16} className="mr-1" />
          戻る
        </button>
        
        <button 
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
          onClick={onSave}
        >
          <Save size={16} className="mr-1" />
          ポートフォリオを保存
        </button>
      </div>
    </div>
  );
};

// 目のアイコン
const Eye = ({ size, className }) => (
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
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default TemplatePortfolioCreator;