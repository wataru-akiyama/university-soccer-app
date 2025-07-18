// src/data/index.js - 職業データ追加版

// 1. 地域データ
export const regions = [
  "北海道",
  "東北", 
  "関東",
  "北信越",
  "東海",
  "関西",
  "中国",
  "四国",
  "九州"
];

// 地域グループ化
export const regionGroups = {
  "北海道・東北": ["北海道", "東北"],
  "関東": ["関東"],
  "中部": ["北信越", "東海"],
  "関西": ["関西"],
  "中国・四国": ["中国", "四国"],
  "九州・沖縄": ["九州"]
};

// 2. リーグデータ（削除されたが互換性のため残す）
export const leagues = [
  // 関東
  "関東1部",
  "関東2部", 
  "関東3部",
  
  // 関西
  "関西1部",
  "関西2部",
  "関西3部",
  
  // その他主要リーグ
  "東海1部",
  "東海2部",
  "九州1部",
  "九州2部"
];

// リーグ地域マッピング（削除されたが互換性のため残す）
export const leagueRegionMapping = {
  "関東1部": "関東",
  "関東2部": "関東",
  "関東3部": "関東",
  "関西1部": "関西",
  "関西2部": "関西",
  "関西3部": "関西",
  "東海1部": "東海",
  "東海2部": "東海",
  "九州1部": "九州",
  "九州2部": "九州"
};

// 3. 学力ランク
export const academicRanks = [
  "A：難関私大",
  "B：上位私大",
  "C：中堅私大",
  "D：それ以外の私大",
  "E：スポーツ系私大",
  "F：国公立"
];

// 4. 志向性ジャンル
export const playerAspirations = [
  "A：大学経由でプロを目指したい",
  "B：自分がどこまで上を目指せるか挑戦したい",
  "C：チームと一緒にカテゴリー・地域内での立ち位置を上げていきたい",
  "D：学生主体の活動でいろんな経験をしたい",
  "E：楽しく本気でサッカーをしたい",
  "F：選手以外の形でサッカーと関わりたい"
];

// 5. 職業データ（新規追加）
export const careers = [
  "一般企業（営業・企画等）",
  "教員（保健体育）",
  "コーチ・指導者",
  "スポーツ関連企業",
  "公務員",
  "大学院進学",
  "プロサッカー選手",
  "金融・商社",
  "IT・技術系",
  "医療・福祉",
  "その他"
];

// 職業と大学の関連性マッピング（ダミーデータ）
export const careerMapping = {
  "一般企業（営業・企画等）": {
    academicRanks: ["A：難関私大", "B：上位私大", "C：中堅私大", "F：国公立"],
    likelihood: "高"
  },
  "教員（保健体育）": {
    academicRanks: ["B：上位私大", "C：中堅私大", "E：スポーツ系私大", "F：国公立"],
    likelihood: "高"
  },
  "コーチ・指導者": {
    academicRanks: ["B：上位私大", "C：中堅私大", "E：スポーツ系私大"],
    likelihood: "高"
  },
  "スポーツ関連企業": {
    academicRanks: ["B：上位私大", "C：中堅私大", "E：スポーツ系私大"],
    likelihood: "中"
  },
  "公務員": {
    academicRanks: ["A：難関私大", "B：上位私大", "F：国公立"],
    likelihood: "高"
  },
  "大学院進学": {
    academicRanks: ["A：難関私大", "F：国公立"],
    likelihood: "中"
  },
  "プロサッカー選手": {
    academicRanks: ["A：難関私大", "B：上位私大", "E：スポーツ系私大"],
    likelihood: "低"
  },
  "金融・商社": {
    academicRanks: ["A：難関私大", "F：国公立"],
    likelihood: "高"
  },
  "IT・技術系": {
    academicRanks: ["A：難関私大", "B：上位私大", "F：国公立"],
    likelihood: "中"
  },
  "医療・福祉": {
    academicRanks: ["A：難関私大", "F：国公立"],
    likelihood: "中"
  },
  "その他": {
    academicRanks: ["A：難関私大", "B：上位私大", "C：中堅私大", "D：それ以外の私大", "E：スポーツ系私大", "F：国公立"],
    likelihood: "中"
  }
};

// 6. 取得可能資格データ
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

// 7. ユーザープロフィール
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
    type: "A：大学経由でプロを目指したい",
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

// 8. 検索ヘルパー
export const searchHelpers = {
  // 地域と大学名のマッピング
  regionMapping: {
    "関東": ["早稲田", "慶應", "明治", "法政", "青山", "筑波", "順天堂", "日本体育"],
    "関西": ["関西学院", "立命館", "関西", "大阪体育"],
    "東海": ["名古屋"],
    "九州": ["福岡"],
    "北海道": ["北海道"]
  },
  
  // 地域による大学フィルタリング（Firebase新形式対応）
  isUniversityInRegion: (university, region) => {
    if (!university || !region) return false;
    
    // Firebase新形式: area と location での直接マッチング
    if (university.area === region || university.location === region) {
      return true;
    }
    
    // リーグから地域を判定（Firebase新形式対応）
    const league = university.soccer_club?.league;
    if (league && leagueRegionMapping[league] === region) {
      return true;
    }
    
    // 地域グループでの判定
    for (const [groupName, regions] of Object.entries(regionGroups)) {
      if (groupName === region && regions.includes(university.area)) {
        return true;
      }
    }
    
    return false;
  },
  
  // 学力ランクによる大学フィルタリング（Firebase新形式対応）
  isUniversityInAcademicRank: (university, rank) => {
    if (!university || !rank) return false;
    return university.academic_rank === rank;
  },
  
  // 志向性による大学フィルタリング（Firebase新形式対応）
  hasPlayerAspiration: (university, aspiration) => {
    if (!university || !aspiration) return false;
    
    // Firebase新形式: genres配列をチェック
    if (university.genres && Array.isArray(university.genres)) {
      return university.genres.includes(aspiration);
    }
    
    // 旧形式フォールバック
    return university.genre1 === aspiration || university.genre2 === aspiration;
  },
  
  // 職業による大学フィルタリング（新規追加）
  hasCareerPath: (university, career) => {
    if (!university || !career) return false;
    
    // 学力ランクに基づく職業適性判定
    const universityRank = university.academic_rank || '';
    const careerInfo = careerMapping[career];
    
    if (!careerInfo) return true; // マッピングがない場合は制限しない
    
    return careerInfo.academicRanks.includes(universityRank);
  },
  
  // 国公立大学の判定（Firebase新形式対応）
  isPublicUniversity: (university) => {
    if (!university) return false;
    
    // Firebase新形式: academic_rankでの判定を優先
    if (university.academic_rank === 'F：国公立') {
      return true;
    }
    
    const name = university.university_name || '';
    
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
    
    if (nationalUniversities.includes(name)) {
      return true;
    }
    
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

// 9. 検索オプション
export const searchOptions = {
  regions,
  regionGroups,
  leagues,
  leagueRegionMapping,
  academicRanks,
  playerAspirations,
  careers, // 新規追加
  careerMapping, // 新規追加
  certifications: availableCertifications,
  sortOptions: [
    { value: '', label: '並び替えなし' },
    { value: 'j_league', label: 'Jリーグ内定者数順' },
    { value: 'members', label: '部員数順' },
    { value: 'name', label: '大学名順' },
    { value: 'academic_rank', label: '学力ランク順' }
  ]
};

// デフォルトエクスポート
export default {
  regions,
  regionGroups,
  leagues,
  leagueRegionMapping,
  academicRanks,
  playerAspirations,
  careers, // 新規追加
  careerMapping, // 新規追加
  availableCertifications,
  userProfile,
  searchHelpers,
  searchOptions
};