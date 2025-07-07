// src/data/index.js - 本番向けクリーン版

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

// 2. リーグデータ
export const leagues = [
  // 北海道
  "北海道1部",
  "北海道2部",
  "北海道3部",

  // 東北
  "東北1部",
  "東北2部北リーグ",
  "東北2部南リーグA",
  "東北2部南リーグB",
  
  // 関東
  "関東1部",
  "関東2部", 
  "関東3部",
  "千葉1部",
  "千葉2部",
  "東京・神奈川1部",
  "東京・神奈川2部",
  "東京・神奈川3部",
  "東京・神奈川チャレンジ",
  
  // Norte
  "Norte1部",
  "Norte2部",

  // 北信越
  "北信越1部",
  "北信越2部",

  // 東海
  "東海1部",
  "東海2部",

  // 関西
  "関西1部",
  "関西2部",
  "関西3部",
  "関西4部Aブロック",
  "関西4部Bブロック",
  
  // 中国
  "中国1部",
  "中国2部",
  
  // 四国
  "四国1部",
  "四国2部",
  
  // 九州
  "九州1部",
  "九州2部",
  "九州3部"
];

// リーグ地域マッピング
export const leagueRegionMapping = {
  // 北海道
  "北海道1部": "北海道",
  "北海道2部": "北海道",
  "北海道3部": "北海道",
  
  // 東北
  "東北1部": "東北",
  "東北2部南リーグA": "東北",
  "東北2部南リーグB": "東北",
  "東北2部北リーグ": "東北",
  
  // 関東
  "関東1部": "関東",
  "関東2部": "関東",
  "関東3部": "関東",
  "千葉1部": "関東",
  "千葉2部": "関東",
  "東京・神奈川1部": "関東",
  "東京・神奈川2部": "関東",
  "東京・神奈川3部": "関東",
  "東京・神奈川チャレンジ": "関東",
  "Norte1部": "関東",
  "Norte2部": "関東",

  // 北信越
  "北信越1部": "北信越",
  "北信越2部": "北信越",

  // 東海
  "東海1部": "東海",
  "東海2部": "東海",

  // 関西
  "関西1部": "関西",
  "関西2部": "関西",
  "関西3部": "関西",
  "関西4部Aブロック": "関西",
  "関西4部Bブロック": "関西",
  
  // 中国
  "中国1部": "中国",
  "中国2部": "中国",

  // 四国
  "四国1部": "四国",
  "四国2部": "四国",

  // 九州
  "九州1部": "九州",
  "九州2部": "九州",
  "九州3部": "九州"
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

// 5. 取得可能資格データ
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

// 6. ユーザープロフィール
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

// 7. 検索ヘルパー
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
    const league = university.soccer_club?.league; // categoryは使用しない
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
  
  // リーグによる大学フィルタリング（Firebase新形式対応）
  isUniversityInLeague: (university, league) => {
    if (!university || !league) return false;
    
    const universityLeague = (university.soccer_club?.league || '').trim(); // categoryは使用しない
    return universityLeague === league.trim();
  },
  
  // 学力ランクによる大学フィルタリング（Firebase新形式対応）
  isUniversityInAcademicRank: (university, rank) => {
    if (!university || !rank) return false;
    return university.academic_rank === rank; // 新形式のみ
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

// 8. 検索オプション
export const searchOptions = {
  regions,
  regionGroups,
  leagues,
  leagueRegionMapping,
  academicRanks,
  playerAspirations,
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
  availableCertifications,
  userProfile,
  searchHelpers,
  searchOptions
};