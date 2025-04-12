// src/components/StepSearchWizard.jsx
import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Trophy, 
  BookOpen, 
  MapPin, 
  Home, 
  CheckCircle, 
  Search, 
  Zap, 
  Info,
  X,
  BarChart2
} from 'lucide-react';

const StepSearchWizard = ({ 
  onViewDetails,
  universities,
  setSearchQuery,
  setSelectedRegions,
  setSelectedLeagues,
  setSelectedQualifications,
  setSportsRecommend,
  setSelectionAvailable,
  setDormAvailable,
  setJLeagueMinimum,
  useUniversitySearchInstance
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardActive, setWizardActive] = useState(true);
  const [selections, setSelections] = useState({
    goal: '',
    study: '',
    region: '',
    options: []
  });
  const [recommendedUniversities, setRecommendedUniversities] = useState([]);
  
  // 次のステップへ進む
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      
      // ステップ4の後は結果を計算
      if (currentStep === 4) {
        calculateResults();
      }
    }
  };
  
  // 前のステップへ戻る
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // 選択を更新する
  const updateSelection = (category, value) => {
    setSelections({
      ...selections,
      [category]: value
    });
  };
  
  // オプションの選択を切り替える（複数選択可能）
  const toggleOption = (option) => {
    if (selections.options.includes(option)) {
      setSelections({
        ...selections,
        options: selections.options.filter(item => item !== option)
      });
    } else {
      setSelections({
        ...selections,
        options: [...selections.options, option]
      });
    }
  };

  // 目標に基づいた大学のマッチ度を計算
  const calculateMatchScore = (university) => {
    let score = 0;
    const maxScore = 100;
    
    // 目標に基づくスコアリング
    if (selections.goal === 'pro') {
      // プロ志向の場合はJリーグ内定者数を重視
      const jLeagueNominees = university.soccer_club.j_league_nominees_2022_24 || 0;
      if (jLeagueNominees > 10) score += 40;
      else if (jLeagueNominees > 5) score += 30;
      else if (jLeagueNominees > 2) score += 20;
      else score += 10;
      
      // 強豪リーグも評価
      if (university.soccer_club.league.includes('1部')) score += 20;
      else if (university.soccer_club.league.includes('2部')) score += 10;
    } 
    else if (selections.goal === 'improve') {
      // 競技力向上志向の場合は設備や部員数を重視
      if (university.soccer_club.soccer_field_count > 1) score += 25;
      else score += 15;
      
      // 部員数 - 競争環境
      if (university.soccer_club.total_members > 80) score += 20;
      else if (university.soccer_club.total_members > 60) score += 15;
      else score += 10;
      
      // リーグ
      if (university.soccer_club.league.includes('1部')) score += 15;
      else if (university.soccer_club.league.includes('2部')) score += 10;
    } 
    else if (selections.goal === 'coach') {
      // 指導者志向の場合は資格取得や教員免許を重視
      const hasCoachingQualification = university.soccer_club.qualifications.some(
        q => q.includes('コーチング') || q.includes('指導') || q.includes('教員免許')
      );
      
      if (hasCoachingQualification) score += 40;
      else score += 10;
    } 
    else if (selections.goal === 'balance') {
      // 文武両道の場合は大学ブランドや総合力を重視
      // 大学名に基づく簡易評価（実際はもっと複雑な評価が必要）
      const prestigiousUniversities = [
        '早稲田', '慶應', '明治', '立教', '中央', '法政', '筑波', '東京', '京都', '大阪'
      ];
      
      const isPrestigious = prestigiousUniversities.some(name => 
        university.university_name.includes(name)
      );
      
      if (isPrestigious) score += 30;
      else score += 15;
    }

    // 学びたいことに基づくスコアリング
    if (selections.study) {
      const studyMapping = {
        'coaching': ['コーチング', '指導', '教員'],
        'sports_mgmt': ['マネジメント', 'ビジネス', '経営'],
        'training': ['トレーニング', '科学', 'フィットネス'],
        'sports_med': ['医学', '医療', 'リハビリ'],
        'nutrition': ['栄養', '食事', '健康'],
        'teaching': ['教員', '教師', '体育']
      };
      
      const keywords = studyMapping[selections.study] || [];
      const hasRelatedQualification = university.soccer_club.qualifications.some(
        q => keywords.some(keyword => q.includes(keyword))
      );
      
      if (hasRelatedQualification) score += 20;
    }
    
    // 地域に基づくスコアリング
    if (selections.region) {
      if (university.region === selections.region || 
          (university.soccer_club.league && university.soccer_club.league.includes(selections.region))) {
        score += 20;
      }
    }
    
    // その他オプションに基づくスコアリング
    if (selections.options.includes('dorm') && university.soccer_club.dorm_available) {
      score += 10;
    }
    
    if (selections.options.includes('sports_recommend') && university.entry_conditions.sports_recommend) {
      score += 10;
    }
    
    if (selections.options.includes('selection') && university.entry_conditions.selection) {
      score += 10;
    }
    
    if (selections.options.includes('j_league') && university.soccer_club.j_league_nominees_2022_24 > 3) {
      score += 10;
    }
    
    // スコアを0-100で正規化
    return Math.min(Math.max(Math.round(score), 60), 100);
  };

  // 検索結果の計算
  const calculateResults = () => {
    if (!universities) return;

    // マッチ度の計算と並べ替え
    const results = universities.map(university => ({
      ...university,
      matchScore: calculateMatchScore(university)
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5); // 上位5件を取得
    
    setRecommendedUniversities(results);
    
    // 検索条件を検索フォームに反映
    if (selections.region) {
      setSelectedRegions([selections.region]);
    }
    
    if (selections.options.includes('sports_recommend')) {
      setSportsRecommend(true);
    }
    
    if (selections.options.includes('selection')) {
      setSelectionAvailable(true);
    }
    
    if (selections.options.includes('dorm')) {
      setDormAvailable(true);
    }
    
    if (selections.options.includes('j_league')) {
      setJLeagueMinimum(3); // 3人以上を条件に
    }
    
    // 目標に応じた検索クエリの設定
    const goalToQualificationMap = {
      'coach': ['教員免許', 'コーチングライセンス'],
      'balance': ['文武両道', '総合大学']
    };
    
    // 学びに応じた検索クエリ
    const studyToQualificationMap = {
      'coaching': ['JFA公認コーチングライセンス'],
      'sports_mgmt': ['スポーツビジネス関連資格'],
      'sports_med': ['スポーツ医科学関連資格'],
      'nutrition': ['スポーツ栄養士'],
      'teaching': ['教員免許（保健体育）']
    };
    
    if (selections.goal && goalToQualificationMap[selections.goal]) {
      setSelectedQualifications(goalToQualificationMap[selections.goal]);
    }
    
    if (selections.study && studyToQualificationMap[selections.study]) {
      setSelectedQualifications(studyToQualificationMap[selections.study]);
    }
  };
  
  // 詳細検索フォームを表示する
  const showAdvancedSearch = () => {
    setWizardActive(false);
  };
  
  // 進捗バーのレンダリング
  const renderProgressBar = () => {
    return (
      <div className="mb-6">
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5].map(step => (
            <div 
              key={step} 
              className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                step <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
              } font-medium text-sm z-10`}
            >
              {step}
              {step < 5 && (
                <div className={`absolute top-1/2 left-full w-full h-1 -translate-y-1/2 ${
                  step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs mt-1 px-1 text-gray-500">
          <span>目標</span>
          <span>学び</span>
          <span>地域</span>
          <span>条件</span>
          <span>結果</span>
        </div>
      </div>
    );
  };
  
  // ステップ1: サッカーの目標
  const renderStep1 = () => {
    const goals = [
      { id: 'pro', label: 'プロを目指してやりたい', icon: <Trophy size={24} className="text-yellow-500" />, description: 'Jリーグ内定者を多く輩出している大学がおすすめです' },
      { id: 'improve', label: 'どこまで上手くなれるか試したい', icon: <Zap size={24} className="text-blue-500" />, description: '高いレベルの練習環境がある大学がおすすめです' },
      { id: 'coach', label: '将来は指導者になりたい', icon: <BookOpen size={24} className="text-green-500" />, description: '教員免許やコーチング資格が取れる大学がおすすめです' },
      { id: 'balance', label: 'サッカーと勉強を両立したい', icon: <CheckCircle size={24} className="text-purple-500" />, description: '文武両道の校風がある大学がおすすめです' }
    ];
    
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">あなたのサッカーの目標は？</h3>
        <p className="text-gray-600">目標に合った大学をご提案します</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {goals.map(goal => (
            <div
              key={goal.id}
              className={`border rounded-xl p-4 cursor-pointer transition-all ${
                selections.goal === goal.id 
                  ? 'border-green-500 bg-green-50 shadow-md' 
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
              onClick={() => updateSelection('goal', goal.id)}
            >
              <div className="flex items-start">
                <div className="p-2 bg-white rounded-full shadow-sm mr-3">
                  {goal.icon}
                </div>
                <div>
                  <h4 className="font-medium text-lg">{goal.label}</h4>
                  <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // ステップ2: 学びたいこと
  const renderStep2 = () => {
    const studies = [
      { id: 'coaching', label: 'コーチング・指導法', icon: <BookOpen size={24} className="text-blue-500" /> },
      { id: 'sports_mgmt', label: 'スポーツマネジメント', icon: <BookOpen size={24} className="text-green-500" /> },
      { id: 'training', label: 'トレーニング科学', icon: <BookOpen size={24} className="text-red-500" /> },
      { id: 'sports_med', label: 'スポーツ医学', icon: <BookOpen size={24} className="text-purple-500" /> },
      { id: 'nutrition', label: 'スポーツ栄養学', icon: <BookOpen size={24} className="text-yellow-500" /> },
      { id: 'teaching', label: '教員養成（保健体育）', icon: <BookOpen size={24} className="text-indigo-500" /> }
    ];
    
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">学びたいことは？</h3>
        <p className="text-gray-600">興味のある学問や取得したい資格を選択してください</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {studies.map(study => (
            <div
              key={study.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selections.study === study.id 
                  ? 'border-green-500 bg-green-50 shadow-md' 
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
              onClick={() => updateSelection('study', study.id)}
            >
              <div className="flex items-center">
                <div className="p-2 bg-white rounded-full shadow-sm mr-3">
                  {study.icon}
                </div>
                <h4 className="font-medium">{study.label}</h4>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800 flex items-start">
            <Info size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            任意項目です。選択しない場合は「次へ」をクリックしてください。
          </p>
        </div>
      </div>
    );
  };
  
  // ステップ3: 地域
  const renderStep3 = () => {
    const regions = [
      { id: '北海道・東北', label: '北海道・東北' },
      { id: '関東', label: '関東' },
      { id: '中部', label: '中部' },
      { id: '関西', label: '関西' },
      { id: '中国・四国', label: '中国・四国' },
      { id: '九州・沖縄', label: '九州・沖縄' }
    ];
    
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">希望の地域は？</h3>
        <p className="text-gray-600">進学を考えている地域を選択してください</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {regions.map(region => (
            <div
              key={region.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selections.region === region.id 
                  ? 'border-green-500 bg-green-50 shadow-md' 
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
              onClick={() => updateSelection('region', region.id)}
            >
              <div className="flex items-center">
                <MapPin size={20} className="text-green-600 mr-2" />
                <h4 className="font-medium">{region.label}</h4>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800 flex items-start">
            <Info size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            地域はあとで変更することもできます。「どこでも良い」場合は選択せずに次へ進んでください。
          </p>
        </div>
      </div>
    );
  };
  
  // ステップ4: その他条件
  const renderStep4 = () => {
    const options = [
      { id: 'dorm', label: '寮がある', icon: <Home size={20} className="text-purple-600" /> },
      { id: 'sports_recommend', label: 'スポーツ推薦がある', icon: <CheckCircle size={20} className="text-green-600" /> },
      { id: 'selection', label: 'セレクションがある', icon: <CheckCircle size={20} className="text-blue-600" /> },
      { id: 'j_league', label: 'Jリーグ内定者が多い', icon: <Trophy size={20} className="text-yellow-600" /> }
    ];
    
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">その他の希望条件は？</h3>
        <p className="text-gray-600">複数選択できます（任意）</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {options.map(option => (
            <div
              key={option.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selections.options.includes(option.id) 
                  ? 'border-green-500 bg-green-50 shadow-md' 
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
              onClick={() => toggleOption(option.id)}
            >
              <div className="flex items-center">
                <div className="mr-2">
                  {option.icon}
                </div>
                <h4 className="font-medium">{option.label}</h4>
                {selections.options.includes(option.id) && (
                  <div className="ml-auto bg-green-500 text-white rounded-full p-1">
                    <CheckCircle size={16} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // ステップ5: 結果表示
  const renderStep5 = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">あなたにぴったりの大学</h3>
        <p className="text-gray-600">
          {selections.goal && getGoalLabel(selections.goal)}
          {selections.study && `・${getStudyLabel(selections.study)}`}
          {selections.region && `・${selections.region}`}
          を条件に検索した結果です
        </p>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
          <p className="text-green-800 flex items-center">
            <CheckCircle size={20} className="text-green-600 mr-2" />
            マッチ度の高い大学を{recommendedUniversities.length}校ご紹介します
          </p>
        </div>
        
        <div className="space-y-3">
          {recommendedUniversities.map((university) => (
            <div key={university.id} className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center p-4">
                <div className="bg-green-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  {university.matchScore}%
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{university.university_name}</h4>
                  <p className="text-sm text-gray-600">{university.soccer_club.league}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {university.soccer_club.dorm_available && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                        寮あり
                      </span>
                    )}
                    {university.entry_conditions.sports_recommend && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                        スポーツ推薦
                      </span>
                    )}
                    {university.soccer_club.j_league_nominees_2022_24 > 5 && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                        Jリーグ内定多数
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center ml-2"
                  onClick={() => onViewDetails(university)}
                >
                  詳細
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center shadow-md"
            onClick={showAdvancedSearch}
          >
            <Search size={20} className="mr-2" />
            詳細な検索条件で絞り込む
          </button>
        </div>
      </div>
    );
  };
  
  // 目標のラベルを取得
  const getGoalLabel = (goalId) => {
    const goals = {
      'pro': 'プロを目指す',
      'improve': '競技力向上',
      'coach': '指導者志向',
      'balance': '文武両道'
    };
    return goals[goalId] || '';
  };
  
  // 学びのラベルを取得
  const getStudyLabel = (studyId) => {
    const studies = {
      'coaching': 'コーチング・指導法',
      'sports_mgmt': 'スポーツマネジメント',
      'training': 'トレーニング科学',
      'sports_med': 'スポーツ医学',
      'nutrition': 'スポーツ栄養学',
      'teaching': '教員養成（保健体育）'
    };
    return studies[studyId] || '';
  };
  
  // 現在のステップに応じたコンテンツをレンダリング
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return null;
    }
  };
  
  // 次へボタンの表示制御
  const showNextButton = () => {
    if (currentStep === 5) return false;
    
    switch (currentStep) {
      case 1:
        return !!selections.goal;
      case 2:
        return true; // 学びは任意選択可
      case 3:
        return true; // 地域も任意選択可
      case 4:
        return true; // その他条件も任意選択可
      default:
        return false;
    }
  };

  if (!wizardActive) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto mb-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-start mb-6">
        <div className="text-center flex-1">
          <h2 className="text-2xl font-bold text-green-700">あなたにぴったりの大学サッカー部を見つけましょう</h2>
          <p className="text-gray-600 mt-2">簡単な質問に答えるだけで、あなたの希望に合った大学をご紹介します</p>
        </div>
        <button 
          className="text-gray-500 hover:text-gray-700 p-1"
          onClick={() => setWizardActive(false)}
        >
          <X size={24} />
        </button>
      </div>
      
      {/* 進捗バー */}
      {renderProgressBar()}
      
      {/* ステップコンテンツ */}
      <div className="min-h-80">
        {renderStepContent()}
      </div>
      
      {/* ナビゲーションボタン */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 ? (
          <button 
            className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
            onClick={prevStep}
          >
            <ChevronLeft size={20} className="mr-1" />
            戻る
          </button>
        ) : (
          <div></div> // 空のdivで位置を保持
        )}
        
        {showNextButton() && (
          <button 
            className="flex items-center bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 shadow-sm"
            onClick={nextStep}
          >
            次へ
            <ChevronRight size={20} className="ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StepSearchWizard;