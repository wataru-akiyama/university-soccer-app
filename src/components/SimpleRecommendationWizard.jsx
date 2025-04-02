import React, { useState } from 'react';
import { RotateCcw, ChevronDown, ChevronRight } from 'lucide-react';
import universityAspirations from '../data/universityAspirations';

// サッカー志向のオプション
const aspirationOptions = [
  { value: '', label: '志向を選択してください' },
  { value: 'pro', label: 'A：プロを目指してやりたい' },
  { value: 'improve', label: 'B：とにかくどこまで上手くなれるか試したい' },
  { value: 'experience', label: 'C：学生主体でサッカーを通して経験したい' },
  { value: 'support', label: 'D：選手以外の形でサッカーと関わりたい' },
  { value: 'none', label: 'E：サッカーはもうしばらくやる予定はない' },
  { value: 'other', label: 'F：その他' }
];

// 学びたいことのオプション
const learningOptions = [
  { value: '', label: '学びたいことを選択してください' },
  { value: 'coaching', label: 'コーチング・指導法' },
  { value: 'sports_management', label: 'スポーツマネジメント' },
  { value: 'training_science', label: 'トレーニング科学' },
  { value: 'sports_medicine', label: 'スポーツ医学' },
  { value: 'sports_nutrition', label: 'スポーツ栄養学' },
  { value: 'sports_psychology', label: 'スポーツ心理学' },
  { value: 'sports_business', label: 'スポーツビジネス' },
  { value: 'teaching_license', label: '教員養成（保健体育）' }
];

// 地域のオプション
const regionOptions = [
  { value: '', label: '地域を選択' },
  { value: '北海道・東北', label: '北海道・東北' },
  { value: '関東', label: '関東' },
  { value: '中部', label: '中部' },
  { value: '関西', label: '関西' },
  { value: '中国・四国', label: '中国・四国' },
  { value: '九州・沖縄', label: '九州・沖縄' }
];

// リーグのオプション
const leagueOptions = [
  { value: '', label: 'リーグを選択' },
  { value: '関東大学サッカーリーグ1部', label: '関東大学サッカーリーグ1部' },
  { value: '関東大学サッカーリーグ2部', label: '関東大学サッカーリーグ2部' },
  { value: '関西学生サッカーリーグ1部', label: '関西学生サッカーリーグ1部' },
  { value: '関西学生サッカーリーグ2部', label: '関西学生サッカーリーグ2部' },
  { value: '東海学生サッカーリーグ1部', label: '東海学生サッカーリーグ1部' },
  { value: '東海学生サッカーリーグ2部', label: '東海学生サッカーリーグ2部' },
  { value: '九州大学サッカーリーグ1部', label: '九州大学サッカーリーグ1部' },
  { value: '九州大学サッカーリーグ2部', label: '九州大学サッカーリーグ2部' },
  { value: '北信越大学サッカーリーグ1部', label: '北信越大学サッカーリーグ1部' },
  { value: '北信越大学サッカーリーグ2部', label: '北信越大学サッカーリーグ2部' }
];

const SimpleRecommendationWizard = ({ universities, onViewDetails }) => {
  // 状態管理
  const [selectedAspiration, setSelectedAspiration] = useState('');
  const [selectedLearning, setSelectedLearning] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [recommendedUniversities, setRecommendedUniversities] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  // 状態をリセットする関数
  const resetForm = () => {
    setSelectedAspiration('');
    setSelectedLearning('');
    setSelectedRegion('');
    setSelectedLeague('');
    setRecommendedUniversities([]);
    setIsSearched(false);
  };

  // 検索実行関数
  const searchUniversities = () => {
    if (!selectedAspiration) {
      alert('サッカーに対する志向を選択してください');
      return;
    }

    // 条件に合う大学をフィルタリング
    const filtered = universities.filter(university => {
      const aspirationData = universityAspirations[university.id];
      
      // 志向が一致しない場合はスキップ
      if (!aspirationData || !aspirationData.aspirations.includes(selectedAspiration)) {
        return false;
      }
      
      // 学びたいことの選択に基づくフィルタ
      if (selectedLearning) {
        let learningMatched = false;
        
        // コーチング・指導法
        if (selectedLearning === 'coaching' && 
            aspirationData.studyRecommendations.some(rec => rec.includes('コーチング') || rec.includes('指導法'))) {
          learningMatched = true;
        }
        // スポーツマネジメント
        else if (selectedLearning === 'sports_management' && 
            aspirationData.studyRecommendations.some(rec => rec.includes('マネジメント'))) {
          learningMatched = true;
        }
        // トレーニング科学
        else if (selectedLearning === 'training_science' && 
            aspirationData.studyRecommendations.some(rec => rec.includes('トレーニング'))) {
          learningMatched = true;
        }
        // スポーツ医学
        else if (selectedLearning === 'sports_medicine' && 
            aspirationData.studyRecommendations.some(rec => rec.includes('医学'))) {
          learningMatched = true;
        }
        // スポーツ栄養学
        else if (selectedLearning === 'sports_nutrition' && 
            aspirationData.studyRecommendations.some(rec => rec.includes('栄養'))) {
          learningMatched = true;
        }
        // スポーツ心理学
        else if (selectedLearning === 'sports_psychology' && 
            aspirationData.studyRecommendations.some(rec => rec.includes('心理'))) {
          learningMatched = true;
        }
        // スポーツビジネス
        else if (selectedLearning === 'sports_business' && 
            aspirationData.studyRecommendations.some(rec => rec.includes('ビジネス'))) {
          learningMatched = true;
        }
        // 教員養成（保健体育）
        else if (selectedLearning === 'teaching_license' && 
            aspirationData.studyRecommendations.some(rec => rec.includes('教員'))) {
          learningMatched = true;
        }
        
        if (!learningMatched) return false;
      }
      
      // 地域フィルター（選択されている場合）
      if (selectedRegion && !university.main_faculties.includes(selectedRegion)) {
        // 地域情報がない場合は関東と仮定
        const universityRegion = university.region || '関東';
        if (universityRegion !== selectedRegion) {
          return false;
        }
      }
      
      // リーグフィルター（選択されている場合）
      if (selectedLeague && university.soccer_club.league !== selectedLeague) {
        return false;
      }
      
      return true;
    });
    
    // 結果を志向の関連度でソート
    const sortedResults = filtered.sort((a, b) => {
      // Jリーグ内定者数が多い順（プロ志向の場合）
      if (selectedAspiration === 'pro') {
        return b.soccer_club.j_league_nominees_2022_24 - a.soccer_club.j_league_nominees_2022_24;
      }
      return 0;
    });
    
    setRecommendedUniversities(sortedResults);
    setIsSearched(true);
  };

  // プルダウンコンポーネント
  const DropdownSelect = ({ options, value, onChange, label }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <select
          className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="text-gray-400" size={18} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-700">あなたにぴったりの大学サッカー部</h2>
        
        <button
          className="text-gray-500 flex items-center hover:text-gray-700 transition-colors"
          onClick={resetForm}
        >
          <RotateCcw size={16} className="mr-1" />
          リセット
        </button>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
        <p className="text-sm text-green-800">
          プルダウンメニューから希望条件を選ぶだけで、あなたにぴったりの大学サッカー部をご提案します。
        </p>
      </div>
      
      {/* サッカー志向選択 */}
      <DropdownSelect
        options={aspirationOptions}
        value={selectedAspiration}
        onChange={setSelectedAspiration}
        label="あなたのサッカーを続けたい『志向の種類』"
      />
      
      {/* 学びたいこと選択 */}
      <DropdownSelect
        options={learningOptions}
        value={selectedLearning}
        onChange={setSelectedLearning}
        label="学びたいことを選択"
      />
      
      {/* 追加条件 */}
      <p className="text-sm font-medium text-gray-700 mb-2">追加条件（任意）</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <DropdownSelect
          options={regionOptions}
          value={selectedRegion}
          onChange={setSelectedRegion}
          label=""
        />
        
        <DropdownSelect
          options={leagueOptions}
          value={selectedLeague}
          onChange={setSelectedLeague}
          label=""
        />
      </div>
      
      {/* 検索ボタン */}
      <button
        className="w-full py-3 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition-colors font-medium mb-8"
        onClick={searchUniversities}
      >
        大学を探す
      </button>
      
      {/* 検索結果 */}
      {isSearched && (
        <div>
          <h3 className="text-xl font-bold text-green-700 mb-4">あなたにおすすめの大学</h3>
          
          {recommendedUniversities.length > 0 ? (
            <div className="space-y-4">
              {recommendedUniversities.map((university) => {
                const aspirationData = universityAspirations[university.id];
                const aspirationDesc = selectedAspiration && aspirationData?.aspirationDescription[selectedAspiration];
                
                return (
                  <div
                    key={university.id}
                    className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                        <img 
                          src={`/images/logos/${university.id}.png`}
                          alt={`${university.university_name} ロゴ`}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${process.env.PUBLIC_URL}/images/default-logo.png`;
                          }}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-bold">{university.university_name}</h4>
                        <p className="text-sm text-gray-600">{university.soccer_club.league}</p>
                      </div>
                      
                      <button 
                        className="text-green-600 hover:text-green-700 transition-colors"
                        onClick={() => onViewDetails(university)}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                    
                    {aspirationDesc && (
                      <p className="mt-2 text-sm text-gray-700 pl-16">{aspirationDesc}</p>
                    )}
                    
                    <div className="mt-2 pl-16 flex flex-wrap gap-2">
                      {university.soccer_club.j_league_nominees_2022_24 > 5 && (
                        <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                          Jリーグ内定多数
                        </span>
                      )}
                      
                      {university.soccer_club.dorm_available && (
                        <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                          寮あり
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500">条件に一致する大学が見つかりませんでした。</p>
              <p className="text-gray-500">条件を変更して再度お試しください。</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleRecommendationWizard;