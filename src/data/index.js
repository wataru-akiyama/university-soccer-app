// src/data/index.js - 完全版修正

// 1. 地域データ
export const regions = [
  "北海道・東北",
  "関東", 
  "中部",
  "関西",
  "中国・四国",
  "九州・沖縄"
];

// 2. リーグデータ
export const leagues = [
  "関東大学サッカーリーグ1部",
  "関東大学サッカーリーグ2部", 
  "関西学生サッカーリーグ1部",
  "関西学生サッカーリーグ2部",
  "東海学生サッカーリーグ1部",
  "東海学生サッカーリーグ2部",
  "九州大学サッカーリーグ1部",
  "九州大学サッカーリーグ2部",
  "北信越大学サッカーリーグ1部",
  "北信越大学サッカーリーグ2部",
  "北海道学生サッカーリーグ1部",
  "北海道学生サッカーリーグ2部"
];

// 3. 学部データ
export const availableQualifications = [
  "スポーツ科学部",
  "スポーツ健康科学部", 
  "体育学部",
  "体育専門学群",
  "商学部",
  "経済学部",
  "経営学部",
  "政治経済学部",
  "法学部",
  "文学部",
  "教育学部",
  "教育人間科学部",
  "人文社会系",
  "理工学群",
  "情報学部",
  "工学部",
  "医学部",
  "保健医療学部",
  "人間福祉学部",
  "総合政策学部",
  "国際関係学部",
  "児童スポーツ教育学部"
];

// 4. 取得可能資格データ
export const availableCertifications = [
  "JFA公認コーチングライセンス",
  "教員免許（保健体育）",
  "スポーツトレーナー資格", 
  "アスレティックトレーナー資格",
  "スポーツ栄養士",
  "スポーツ医科学関連資格",
  "審判資格",
  "スポーツビジネス関連資格"
];

// 5. ユーザープロフィール
export const userProfile = {
  personalInfo: {
    name: "佐藤 翔太",
    highSchool: "青山高等学校", 
    height: 178,
    weight: 70,
    position: "MF",
    footedness: "右足",
    graduationYear: 2026,
    playStyle: "中盤でゲームをコントロールするタイプ。視野が広く、正確なパスが得意。",
    appeal: "小学2年生からサッカーを始め、中学・高校と県選抜に選ばれました。テクニックと戦術理解に自信があり、チームプレーを大切にしています。大学ではより高いレベルでプレーし、将来はJリーガーを目指しています。球際の強さとフィジカル面の向上が今後の課題です。"
  },
  aspirations: {
    type: "A：プロを目指してやりたい",
    interests: ["コーチング・指導法", "スポーツマネジメント", "トレーニング科学"]
  },
  achievements: [
    {
      id: 1,
      title: "全国高校サッカー選手権大会",
      result: "ベスト16", 
      year: "2023",
      description: "チームのキャプテンとして出場。2回戦では決勝ゴールを決める。"
    },
    {
      id: 2,
      title: "高校総体（インターハイ）",
      result: "県大会優勝",
      year: "2024", 
      description: "全試合フル出場し、準決勝ではPKを決めて勝利に貢献。"
    }
  ],
  activities: [
    {
      id: 1,
      type: "practice",
      title: "早稲田大学サッカー部練習参加",
      date: "2024-08-15T13:00:00Z",
      details: "夏季練習会に参加。監督やコーチから技術面での評価をいただきました。"
    }
  ]
};

// 6. 検索ヘルパー
export const searchHelpers = {
  // 地域と大学名のマッピング
  regionMapping: {
    "関東": ["早稲田", "慶應", "明治", "法政", "青山", "筑波", "順天堂", "日本体育"],
    "関西": ["関西学院", "立命館"],
    "中部": ["名古屋"],
    "九州・沖縄": ["福岡"],
    "北海道・東北": ["北海道"]
  },
  
  // 地域による大学フィルタリング
  isUniversityInRegion: (university, region) => {
    if (!university || !region) return false;
    
    switch(region) {
      case "北海道・東北":
        return university.location?.includes('北海道') || 
               university.location?.includes('青森') || 
               university.location?.includes('岩手') || 
               university.location?.includes('宮城') || 
               university.location?.includes('秋田') || 
               university.location?.includes('山形') || 
               university.location?.includes('福島') ||
               university.university_name?.includes('北海道');
               
      case "関東":
        return university.location?.includes('東京') || 
               university.location?.includes('神奈川') || 
               university.location?.includes('埼玉') || 
               university.location?.includes('千葉') || 
               university.location?.includes('茨城') || 
               university.location?.includes('栃木') || 
               university.location?.includes('群馬') ||
               ['早稲田', '慶應', '明治', '法政', '青山', '筑波', '順天堂', '日本体育'].some(keyword => 
                 university.university_name?.includes(keyword));
                 
      case "関西":
        return university.location?.includes('大阪') || 
               university.location?.includes('京都') || 
               university.location?.includes('兵庫') || 
               university.location?.includes('奈良') || 
               university.location?.includes('滋賀') || 
               university.location?.includes('和歌山') ||
               ['関西学院', '立命館'].some(keyword => 
                 university.university_name?.includes(keyword));
                 
      case "中部":
        return university.location?.includes('愛知') || 
               university.location?.includes('岐阜') || 
               university.location?.includes('静岡') || 
               university.location?.includes('三重') ||
               university.university_name?.includes('名古屋');
               
      case "九州・沖縄":
        return university.location?.includes('福岡') || 
               university.location?.includes('佐賀') || 
               university.location?.includes('長崎') || 
               university.location?.includes('熊本') || 
               university.location?.includes('大分') || 
               university.location?.includes('宮崎') || 
               university.location?.includes('鹿児島') || 
               university.location?.includes('沖縄') ||
               university.university_name?.includes('福岡');
               
      case "中国・四国":
        return university.location?.includes('鳥取') || 
               university.location?.includes('島根') || 
               university.location?.includes('岡山') || 
               university.location?.includes('広島') || 
               university.location?.includes('山口') || 
               university.location?.includes('徳島') || 
               university.location?.includes('香川') || 
               university.location?.includes('愛媛') || 
               university.location?.includes('高知');
               
      default:
        return false;
    }
  },
  
  // 国公立大学の判定
  isPublicUniversity: (university) => {
    if (!university?.university_name) return false;
    
    const name = university.university_name;
    
    // 明示的な国立大学リスト
    const nationalUniversities = [
      '筑波大学',
      '名古屋大学', 
      '北海道大学',
      '東京大学',
      '京都大学',
      '大阪大学',
      '九州大学',
      '東北大学',
      '神戸大学',
      '千葉大学',
      '横浜国立大学'
    ];
    
    // 明示的リストでチェック
    if (nationalUniversities.includes(name)) {
      return true;
    }
    
    // パターンマッチングでチェック
    return (
      name.includes('国立') || 
      name.includes('県立') || 
      name.includes('市立') || 
      name.includes('都立') || 
      name.includes('道立') || 
      name.includes('府立')
    );
  }
};

// 7. 検索オプション
export const searchOptions = {
  regions,
  leagues, 
  qualifications: availableQualifications,
  certifications: availableCertifications,
  sortOptions: [
    { value: '', label: '並び替えなし' },
    { value: 'j_league', label: 'Jリーグ内定者数順' },
    { value: 'members', label: '部員数順' },
    { value: 'name', label: '大学名順' }
  ]
};

// 8. デフォルトエクスポート（後方互換性のため）
export default {
  regions,
  leagues,
  availableQualifications,
  availableCertifications,
  userProfile,
  searchHelpers,
  searchOptions
};