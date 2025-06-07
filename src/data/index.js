// src/data/index.js - 全データを統合

// 1. 地域データ（元 regions.js）
export const regions = [
  "北海道・東北",
  "関東", 
  "中部",
  "関西",
  "中国・四国",
  "九州・沖縄"
];

// 2. リーグデータ（元 leagues.js）
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
  "北信越大学サッカーリーグ2部"
];

// 3. 学部データ（修正: 実際の学部名に変更）
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
  "児童スポーツ教育学部",
  "スポーツ文化学部"
];

// 4. 取得可能資格データ（新規追加）
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

// 5. ユーザープロフィール（元 userProfile.js）
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

// 6. 大学データ（元 universities.js + universityExtendedData.js を統合）
export const universities = [
  {
      id: 1,
      university_name: "早稲田大学",
      homepage_url: "https://www.waseda.jp/",
      main_faculties: ["スポーツ科学部", "商学部", "政治経済学部"],
      location: "東京都新宿区",
      soccer_club: {
        league: "関東大学サッカーリーグ1部",
        coach_name: "李忠成",
        total_members: 95,
        members_by_grade: { "1年": 30, "2年": 25, "3年": 20, "4年": 20 },
        j_league_nominees_2022_24: 12,
        j_league_nominees_2022: 3,
        j_league_nominees_2023: 4,
        j_league_nominees_2024: 5,
        denso_cup_2024_25: 5,
        soccer_field_count: 3,
        dorm_available: true,
        facility_note: "人工芝2面、天然芝1面、ナイター設備あり",
        practice_location: "東伏見キャンパスグラウンド",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "スポーツトレーナー資格", "審判資格"],
        qualification_note: "JFA公認コーチングライセンス取得サポート、学内トレーニング施設での実習あり",
        highlight: "Jリーグ内定者多数"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.5以上、受入人数20名程度",
        selection: true,
        selection_period: "12月上旬・2月下旬",
        general_admission: true,
        general_conditions: "オープン練習参加後、部内テスト実施"
      },
      extended_data: {
        high_school_trend: "全国の強豪校出身者が多く、特に関東圏の強豪校からの入部者が目立ちます。高校サッカー選手権出場校の出身者も多数在籍しています。",
        tournament_results: [
          { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2023", achievement: "準優勝" },
          { tournament: "関東大学サッカーリーグ戦", year: "2023", achievement: "3位" },
          { tournament: "全日本大学サッカー選手権", year: "2022", achievement: "ベスト8" }
        ],
        j_league_teams: ["FC東京", "川崎フロンターレ", "浦和レッズ", "柏レイソル", "横浜F・マリノス"],
        career_paths: [
          { category: "Jリーグ関連", percentage: 15 },
          { category: "指導者・教員", percentage: 30 },
          { category: "一般企業", percentage: 55 }
        ],
        famous_alumni: [
          { name: "中村憲剛", initials: "NK", career: "元日本代表、川崎フロンターレ" },
          { name: "長友佑都", initials: "YN", career: "元日本代表、インテル" },
          { name: "高原直泰", initials: "NT", career: "元日本代表、ハンブルガーSV" }
        ],
        playmaker_comment: "早稲田大学サッカー部は、首都圏でトップクラスの実績を持ち、多くのJリーガーを輩出している名門です。特に技術的な面での評価が高く、ボールポゼッションを重視したスタイルが特徴です。李忠成監督のもと、戦術理解度の高い選手の育成に力を入れており、プロ志向の選手にとって理想的な環境が整っています。スポーツ推薦制度も充実しており、高校時代の実績があれば進学のチャンスがあります。また、学業面でも商学部や政治経済学部といった文系学部と、スポーツ科学部のような専門的な学びの場があり、進路の選択肢が広いのが魅力です。施設面では複数のグラウンドを有し、トレーニング環境も整備されています。キャンパスライフとサッカーを両立させたい学生にも、プロを目指す学生にも対応できる体制が魅力です。"
      },
      // 概要タブ用データ
      key_features: [
        "Jリーグ内定者12名（過去3年）",
        "専用寮あり・充実設備", 
        "スポーツ推薦20名募集",
        "年間費用約250万円"
      ],
      team_philosophy: "技術と戦術理解を重視したポゼッション型サッカー。李忠成監督のもと、個人の技術向上とチーム戦術の両立を図る。",
      suitable_players: [
        "プロサッカー選手を目指している選手",
        "戦術理解を深めたい技術系選手", 
        "チームプレーを重視する選手",
        "学業とサッカーを高いレベルで両立したい選手"
      ],
      // 費用情報
      costs: {
        university_costs: {
          annual_tuition: 1200000,    // 年間授業料: 120万円
          entrance_fee: 300000,       // 入学金: 30万円  
          facility_fee: 150000        // 施設費: 15万円
        },
        soccer_club_costs: {
          monthly_club_fee: 15000,    // 月額部費: 1.5万円
          equipment_cost: 80000,      // 用具代: 8万円（年間）
          camp_cost: 200000,          // 合宿費: 20万円（年間）
          travel_cost: 100000         // 遠征費: 10万円（年間）
        },
        living_costs: {
          dorm_fee: 45000,           // 寮費: 4.5万円（月額）
          meal_cost: 25000,          // 食費: 2.5万円（月額）
          commute_cost: 8000         // 通学費: 0.8万円（月額）
        },
        total_annual_cost: 2500000   // 約250万円
      },
      // 口コミ・評判
      reviews: {
        student_reviews: [
          {
            grade: "3年生",
            position: "MF", 
            review: "李監督の指導は本当に的確で、戦術理解が深まりました。寮生活でチームメイトとの絆も深まり、人間的にも成長できています。練習は厳しいですが、その分上達を実感できます。",
            rating: 4.5
          },
          {
            grade: "2年生",
            position: "DF",
            review: "設備が本当に充実していて、プロと同じような環境で練習できます。勉強との両立は大変ですが、サポート体制がしっかりしているので安心です。",
            rating: 4.0
          },
          {
            grade: "4年生", 
            position: "FW",
            review: "高校時代とは比べ物にならないレベルの高い環境です。毎日が刺激的で、技術面だけでなく精神面でも大きく成長できました。就職活動でもサッカー部での経験が評価されました。",
            rating: 4.8
          }
        ],
        parent_reviews: [
          {
            review: "費用は決して安くありませんが、子供の成長を見ていると納得できます。監督やコーチの方々も親身に相談に乗ってくれて、とても信頼しています。親としても安心して任せられる環境です。",
            rating: 4.2
          },
          {
            review: "寮生活を通じて自立心が育ち、人間的に大きく成長しました。サッカーだけでなく、将来に向けた人格形成もしっかりしていただいています。費用対効果を考えると満足しています。",
            rating: 4.5
          },
          {
            review: "最初は費用面で悩みましたが、奨学金制度もあり、何より子供が生き生きとサッカーに取り組んでいる姿を見ると、この選択は正しかったと思います。",
            rating: 4.0
          }
        ],
        graduate_reviews: [
          {
            graduation_year: 2023,
            current_status: "Jリーガー",
            review: "4年間で技術面、精神面ともに大きく成長できました。プロになった今でも、早稲田で学んだ戦術理解やチームワークが役立っています。後輩たちにも自信を持って勧められる環境です。"
          },
          {
            graduation_year: 2022,
            current_status: "商社勤務",
            review: "サッカーでプロにはなれませんでしたが、4年間で得た経験は就職活動でも社会人になってからも大いに役立っています。チームワーク、リーダーシップ、目標達成への執念など、すべてが財産です。"
          },
          {
            graduation_year: 2024,
            current_status: "指導者",
            review: "現在は高校でサッカーの指導をしています。早稲田で学んだ指導法や戦術知識、そして何より教育者としてのマインドが今の仕事に直結しています。素晴らしい4年間でした。"
          }
        ]
      }
    },
    {
      id: 2,
      university_name: "筑波大学",
      homepage_url: "https://www.tsukuba.ac.jp/",
      main_faculties: ["体育専門学群", "人文社会系", "理工学群"],
      location: "茨城県つくば市",
      soccer_club: {
        league: "関東大学サッカーリーグ1部",
        coach_name: "中山雅史",
        total_members: 80,
        members_by_grade: { "1年": 25, "2年": 20, "3年": 18, "4年": 17 },
        j_league_nominees_2022_24: 10,
        j_league_nominees_2022: 2,
        j_league_nominees_2023: 4,
        j_league_nominees_2024: 4,
        denso_cup_2024_25: 4,
        soccer_field_count: 2,
        dorm_available: true,
        facility_note: "人工芝1面、天然芝1面、室内練習場あり",
        practice_location: "筑波大学第一グラウンド",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "教員免許（保健体育）", "スポーツ医科学関連資格", "審判資格"],
        qualification_note: "教員免許（保健体育）取得可能、JFA公認コーチングライセンス講習会を定期開催",
        highlight: "教員免許取得に強み"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.2以上、受入人数15名程度",
        selection: true,
        selection_period: "11月中旬・1月下旬",
        general_admission: true,
        general_conditions: "一般入試合格者は選考あり"
      },
      extended_data: {
        high_school_trend: "全国各地の強豪校出身者がバランスよく在籍しています。北関東地域からの入部者が比較的多い傾向にあります。",
        tournament_results: [
          { tournament: "関東大学サッカーリーグ戦", year: "2023", achievement: "優勝" },
          { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "優勝" },
          { tournament: "全日本大学サッカー選手権", year: "2022", achievement: "準優勝" }
        ],
        j_league_teams: ["鹿島アントラーズ", "水戸ホーリーホック", "横浜FC", "湘南ベルマーレ"],
        career_paths: [
          { category: "Jリーグ関連", percentage: 12 },
          { category: "指導者・教員", percentage: 45 },
          { category: "一般企業", percentage: 43 }
        ],
        famous_alumni: [
          { name: "大迫勇也", initials: "YO", career: "日本代表、ヴィッセル神戸" },
          { name: "鈴木優磨", initials: "YS", career: "日本代表、鹿島アントラーズ" }
        ],
        playmaker_comment: "筑波大学サッカー部は、「体育専門学群」という特色ある教育環境の下、高いレベルの競技と学業の両立を実現している大学です。中山雅史監督の指導のもと、戦術的に洗練されたプレースタイルが特徴で、関東リーグでも常に上位の成績を収めています。Jリーグへの内定者も安定して輩出しており、特に鹿島アントラーズをはじめとする関東のクラブへの進路が目立ちます。体育教員を目指す選手も多く在籍しており、競技だけでなく指導者としてのキャリアパスも充実しています。施設面では茨城県つくば市の広大なキャンパス内に複数のグラウンドを有し、寮も完備されているため、地方からの入学者も安心して競技に打ち込める環境が整っています。スポーツ科学の研究も盛んで、最新のトレーニング方法や栄養管理を取り入れた科学的アプローチも特徴です。"
      }
    },
    {
      id: 3,
      university_name: "明治大学",
      homepage_url: "https://www.meiji.ac.jp/",
      main_faculties: ["商学部", "政治経済学部", "文学部"],
      location: "東京都千代田区",
      soccer_club: {
        league: "関東大学サッカーリーグ1部",
        coach_name: "浜野征哉",
        total_members: 90,
        members_by_grade: { "1年": 28, "2年": 22, "3年": 21, "4年": 19 },
        j_league_nominees_2022_24: 8,
        j_league_nominees_2022: 2,
        j_league_nominees_2023: 3,
        j_league_nominees_2024: 3,
        denso_cup_2024_25: 3,
        soccer_field_count: 2,
        dorm_available: true,
        facility_note: "人工芝2面、ナイター設備あり",
        practice_location: "和泉キャンパスグラウンド",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "スポーツビジネス関連資格", "審判資格"],
        qualification_note: "JFA公認コーチングライセンス取得サポート、スポーツビジネス講座開催",
        highlight: "専用寮完備"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.3以上、受入人数18名程度",
        selection: true,
        selection_period: "12月中旬・2月中旬",
        general_admission: true,
        general_conditions: "入学後のセレクションあり"
      },
      extended_data: {
        field_type: "人工芝2面",
        night_training: "あり（全面ナイター設備）",
        other_facilities: "ウェイトトレーニングルーム、分析ルーム",
        dorm_type: "サッカー部専用寮",
        dorm_fee: "月額5万円程度（食事込み）",
        dorm_features: "大学から徒歩15分の場所に位置し、全室個室。食堂完備で栄養管理された食事を提供。",
        training_facilities: "最新のウェイトトレーニング機器を備えたトレーニングルーム、ビデオ分析ルームあり。理学療法士による定期的なケアも実施。",
        high_school_trend: "関東圏の強豪校出身者が中心で、特に神奈川県と埼玉県からの入部者が多い傾向にあります。",
        recommend_ratio: "約70%",
        selection_details: "12月と2月に実施。約50名の参加者から15名程度を選抜。実戦形式のゲームとポジション別のスキルテストを実施。",
        scholarship_details: "成績優秀者には授業料の全額または一部免除の制度あり。J内定者には特別奨励金制度も。",
        tournament_results: [
          { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2023", achievement: "ベスト4" },
          { tournament: "関東大学サッカーリーグ戦", year: "2022", achievement: "2位" }
        ],
        j_league_teams: ["FC東京", "大宮アルディージャ", "横浜FC"],
        career_paths: [
          { category: "Jリーグ関連", percentage: 10 },
          { category: "指導者・教員", percentage: 25 },
          { category: "一般企業", percentage: 65 }
        ],
        famous_alumni: [
          { name: "中村俊輔", initials: "SN", career: "元日本代表、横浜FCなど" },
          { name: "川島永嗣", initials: "EK", career: "元日本代表、ストラスブールなど" }
        ],
        playmaker_comment: "明治大学サッカー部は東京都心に位置し、関東リーグの強豪として知られています。浜野征哉監督の下、攻撃的なサッカーを志向し、テクニカルな選手が多く所属しています。施設面でも充実しており、専用寮を完備していることから全国各地から優秀な選手が集まってきます。特に神奈川県や埼玉県の強豪高校出身者が多く、高いレベルでの競争環境が整っています。スポーツ推薦制度も充実しており、競技と学業の両立がしやすい環境です。OB会の支援も厚く、Jリーグへの進路だけでなく、一般企業への就職サポートも手厚いのが特徴です。"
      }
    },
    {
      id: 4,
      university_name: "法政大学",
      homepage_url: "https://www.hosei.ac.jp/",
      main_faculties: ["スポーツ健康学部", "経済学部", "社会学部"],
      location: "東京都千代田区",
      soccer_club: {
        league: "関東大学サッカーリーグ1部",
        coach_name: "山口素弘",
        total_members: 85,
        members_by_grade: { "1年": 26, "2年": 21, "3年": 20, "4年": 18 },
        j_league_nominees_2022_24: 7,
        j_league_nominees_2022: 1,
        j_league_nominees_2023: 3,
        j_league_nominees_2024: 3,
        denso_cup_2024_25: 2,
        soccer_field_count: 1,
        dorm_available: false,
        facility_note: "人工芝1面、ナイター設備あり",
        practice_location: "多摩キャンパスグラウンド",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "スポーツトレーナー資格", "教員免許（保健体育）"],
        qualification_note: "JFA公認コーチングライセンス取得可能、学部と連携した実践的なトレーナー実習あり",
        highlight: "コーチングライセンス取得可"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.4以上、受入人数15名程度",
        selection: true,
        selection_period: "11月下旬・2月上旬",
        general_admission: false,
        general_conditions: "一般入試合格者は技術テストあり"
      },
      extended_data: {
        field_type: "人工芝1面",
        night_training: "あり（ナイター設備完備）",
        other_facilities: "フィットネスセンター、リカバリールーム",
        dorm_type: "一般学生寮（サッカー部枠あり）",
        dorm_fee: "月額4.5万円程度",
        dorm_features: "キャンパスから電車で15分の場所に位置。2人部屋が基本で、食堂は平日のみ営業。",
        training_facilities: "フィットネスセンターは最新設備を完備。スポーツ健康学部の施設も利用可能。",
        high_school_trend: "関東圏と東海地方の強豪校出身者が中心。特に神奈川県からの入部者が多い。",
        recommend_ratio: "約65%",
        selection_details: "11月と2月に実施。約60名の参加者から20名程度を選抜。グループでの実戦形式とポジション別テストあり。",
        scholarship_details: "成績優秀者には学費免除制度あり。競技成績による特別奨学金制度も存在。",
        tournament_results: [
          { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2023", achievement: "ベスト8" },
          { tournament: "関東大学サッカーリーグ戦", year: "2022", achievement: "4位" }
        ],
        j_league_teams: ["川崎フロンターレ", "サガン鳥栖", "ジュビロ磐田"],
        career_paths: [
          { category: "Jリーグ関連", percentage: 8 },
          { category: "指導者・教員", percentage: 35 },
          { category: "一般企業", percentage: 57 }
        ],
        famous_alumni: [
          { name: "遠藤航", initials: "WE", career: "日本代表、シュツットガルト" },
          { name: "久保建英", initials: "TK", career: "日本代表、レアル・ソシエダ" }
        ],
        playmaker_comment: "法政大学サッカー部はスポーツ健康学部を中心に、高いレベルの選手が集まる強豪校です。山口素弘監督のもと、規律あるサッカーと個人技術の向上に力を入れており、特にディフェンス組織力には定評があります。スポーツ健康学部との連携により、科学的なアプローチでのトレーニングも実施。教員免許取得を目指す選手も多く、指導者としてのキャリアパスも充実しています。都心に位置するため、練習環境は少し制約がありますが、効率的なトレーニングプログラムにより質の高い練習を実現しています。"
      }
    },
    {
      id: 5,
      university_name: "東海大学",
      homepage_url: "https://www.u-tokai.ac.jp/",
      main_faculties: ["体育学部", "文学部", "工学部"],
      location: "神奈川県平塚市",
      soccer_club: {
        league: "関東大学サッカーリーグ1部",
        coach_name: "藤田俊哉",
        total_members: 75,
        members_by_grade: { "1年": 22, "2年": 19, "3年": 18, "4年": 16 },
        j_league_nominees_2022_24: 6,
        j_league_nominees_2022: 2,
        j_league_nominees_2023: 2,
        j_league_nominees_2024: 2,
        denso_cup_2024_25: 2,
        soccer_field_count: 2,
        dorm_available: true,
        facility_note: "人工芝1面、天然芝1面",
        practice_location: "湘南キャンパスグラウンド",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "スポーツ栄養士", "教員免許（保健体育）", "審判資格"],
        qualification_note: "JFA公認コーチングライセンス取得サポート、体育学部と連携した栄養管理プログラムあり",
        highlight: "スポーツ科学に強み"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.0以上、受入人数20名程度",
        selection: true,
        selection_period: "12月上旬・1月下旬",
        general_admission: true,
        general_conditions: "一般入試合格後、技術テストあり"
      },
      extended_data: {
        field_type: "人工芝1面、天然芝1面",
        night_training: "あり（一部エリアのみ）",
        other_facilities: "室内練習場、ウェイトトレーニングルーム",
        dorm_type: "体育会専用寮",
        dorm_fee: "月額4万円程度（食事込み）",
        dorm_features: "キャンパス内に位置し、移動が便利。基本的に相部屋で、食事は栄養管理されたメニューを提供。",
        training_facilities: "最新の測定機器を備えたトレーニングルーム、リハビリ施設あり。",
        high_school_trend: "神奈川県と静岡県の強豪校出身者が多く、関東全域から幅広く選手が集まっています。",
        recommend_ratio: "約75%",
        selection_details: "12月と1月に実施。約40名の参加者から15名程度を選抜。実戦形式のゲームに加え、フィジカルテストも実施。",
        scholarship_details: "体育会特別奨学金制度あり。競技成績による学費免除制度も。",
        tournament_results: [
          { tournament: "関東大学サッカーリーグ戦", year: "2023", achievement: "5位" },
          { tournament: "全日本大学サッカー選手権", year: "2022", achievement: "ベスト16" }
        ],
        j_league_teams: ["湘南ベルマーレ", "清水エスパルス", "松本山雅FC"],
        career_paths: [
          { category: "Jリーグ関連", percentage: 7 },
          { category: "指導者・教員", percentage: 40 },
          { category: "一般企業", percentage: 53 }
        ],
        famous_alumni: [
          { name: "三浦知良", initials: "KM", career: "元日本代表、横浜FC" },
          { name: "金崎夢生", initials: "MK", career: "元日本代表、鹿島アントラーズ" }
        ],
        playmaker_comment: "東海大学サッカー部は体育学部を中心とした強豪チームで、神奈川県平塚市の広大なキャンパスを拠点としています。藤田俊哉監督の下、フィジカルの強さと組織力を重視したサッカーが特徴です。天然芝と人工芝のグラウンドを有し、トレーニング環境も充実。体育会専用寮も完備され、全国各地から選手が集まっています。特に教員養成に力を入れており、卒業生の多くが体育教員として活躍しています。スポーツ科学の研究も盛んで、最新のトレーニング理論を取り入れた科学的なアプローチも魅力です。"
      }
    },
    {
      id: 6,
      university_name: "順天堂大学",
      homepage_url: "https://www.juntendo.ac.jp/",
      main_faculties: ["スポーツ健康科学部", "医学部", "保健医療学部"],
      location: "千葉県印西市（さくらキャンパス）",
      soccer_club: {
        league: "関東大学サッカーリーグ1部",
        coach_name: "伊藤彰",
        total_members: 70,
        members_by_grade: { "1年": 20, "2年": 18, "3年": 17, "4年": 15 },
        j_league_nominees_2022_24: 5,
        j_league_nominees_2022: 1,
        j_league_nominees_2023: 2,
        j_league_nominees_2024: 2,
        denso_cup_2024_25: 1,
        soccer_field_count: 1,
        dorm_available: false,
        facility_note: "人工芝1面、ナイター設備あり",
        practice_location: "さくらキャンパスグラウンド",
        sports_scholarship: true,
        qualifications: ["アスレティックトレーナー資格", "スポーツ医科学関連資格", "スポーツ栄養士"],
        qualification_note: "アスレティックトレーナー資格取得サポート、医学部との連携プログラムあり",
        highlight: "医学部連携のトレーニング"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.5以上、受入人数12名程度",
        selection: true,
        selection_period: "11月中旬・1月中旬",
        general_admission: false,
        general_conditions: "推薦・AO入試のみ"
      },
      extended_data: {
        field_type: "人工芝1面",
        night_training: "あり（ナイター設備完備）",
        other_facilities: "医学部附属のリハビリ施設、栄養指導室",
        dorm_type: "なし",
        dorm_fee: "-",
        dorm_features: "-",
        training_facilities: "医学部と連携した最新のスポーツ医科学施設、パフォーマンス分析ラボ",
        high_school_trend: "関東全域の強豪校出身者が中心。医学部志望の選手も多い。",
        recommend_ratio: "約60%",
        selection_details: "11月と1月に実施。厳しい選考基準があり、学力も重視。医学的検査も含む総合的な評価を実施。",
        scholarship_details: "スポーツ健康科学部特別奨学金制度あり。成績優秀者には学費減免制度も。",
        tournament_results: [
          { tournament: "関東大学サッカーリーグ戦", year: "2023", achievement: "6位" },
          { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "ベスト8" }
        ],
        j_league_teams: ["柏レイソル", "ジェフユナイテッド千葉", "FC東京"],
        career_paths: [
          { category: "Jリーグ関連", percentage: 6 },
          { category: "医療関連・指導者", percentage: 50 },
          { category: "一般企業", percentage: 44 }
        ],
        famous_alumni: [
          { name: "中山雅史", initials: "MY", career: "元日本代表、ジュビロ磐田" },
          { name: "佐藤寿人", initials: "TS", career: "元日本代表、広島" }
        ],
        playmaker_comment: "順天堂大学サッカー部は医学部を擁する大学としての特色を活かし、スポーツ医科学に基づいた科学的アプローチが最大の強みです。伊藤彰監督の下、戦術的な理解と個人技術の向上に重点を置いています。医学部との連携により、選手のコンディショニングやリハビリテーションには特に力を入れており、怪我の予防と早期復帰に関するサポート体制は他大学と比較しても群を抜いています。寮はありませんが、キャンパス周辺に部員向けの賃貸物件があり、チームメイト同士で生活する文化があります。スポーツトレーナーや理学療法士を目指す選手も多く、競技と専門知識の習得を両立できる環境が整っています。"
      }
    },
    {
      id: 7,
      university_name: "関西学院大学",
      homepage_url: "https://www.kwansei.ac.jp/",
      main_faculties: ["総合政策学部", "商学部", "人間福祉学部"],
      location: "兵庫県西宮市",
      soccer_club: {
        league: "関西学生サッカーリーグ1部",
        coach_name: "井上一徳",
        total_members: 85,
        members_by_grade: { "1年": 25, "2年": 22, "3年": 20, "4年": 18 },
        j_league_nominees_2022_24: 7,
        j_league_nominees_2022: 2,
        j_league_nominees_2023: 2,
        j_league_nominees_2024: 3,
        denso_cup_2024_25: 3,
        soccer_field_count: 2,
        dorm_available: true,
        facility_note: "人工芝1面、天然芝1面、ナイター設備あり",
        practice_location: "西宮上ケ原キャンパスグラウンド",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "教員免許（保健体育）", "スポーツビジネス関連資格", "審判資格"],
        qualification_note: "JFA公認コーチングライセンス取得サポート、人間福祉学部と連携したカリキュラムあり",
        highlight: "関西トップクラスの充実設備"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.3以上、受入人数15名程度",
        selection: true,
        selection_period: "12月中旬・2月上旬",
        general_admission: true,
        general_conditions: "一般入試合格者は技術テストあり"
      },
      extended_data: {
        field_type: "人工芝1面、天然芝1面",
        night_training: "あり（全面ナイター設備）",
        other_facilities: "専用クラブハウス、ビデオ分析ルーム、リカバリープール",
        dorm_type: "サッカー部専用寮",
        dorm_fee: "月額4.5万円程度（食事込み）",
        dorm_features: "キャンパスから徒歩10分の場所に位置。全室個室で、食堂完備。管理人常駐で生活指導も行う。",
        training_facilities: "最新設備を備えたトレーニングジム、室内練習場あり。スポーツ栄養士による食事指導も実施。",
        high_school_trend: "関西圏の強豪校出身者が中心。特に兵庫県と大阪府からの入部者が多い。",
        recommend_ratio: "約70%",
        selection_details: "12月と2月に実施。約50名の参加者から15名程度を選抜。実戦形式のゲームとチーム適応性を重視。",
        scholarship_details: "スポーツ特別奨学金制度あり。競技成績による学費全額免除制度も存在。",
        tournament_results: [
          { tournament: "関西学生サッカーリーグ戦", year: "2023", achievement: "優勝" },
          { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "準優勝" }
        ],
        j_league_teams: ["ヴィッセル神戸", "ガンバ大阪", "セレッソ大阪", "京都サンガF.C."],
        career_paths: [
          { category: "Jリーグ関連", percentage: 9 },
          { category: "指導者・教員", percentage: 25 },
          { category: "一般企業", percentage: 66 }
        ],
        famous_alumni: [
          { name: "家長昭博", initials: "AI", career: "元日本代表、ガンバ大阪" },
          { name: "藤田俊哉", initials: "TF", career: "元日本代表、名古屋グランパス" }
        ],
        playmaker_comment: "関西学院大学サッカー部は関西学生リーグの強豪として知られ、井上一徳監督の下、戦術的理解度の高いサッカーを展開しています。関西地区でトップクラスの施設を誇り、人工芝と天然芝の両方のグラウンドを所有。専用寮も完備されており、チームの結束力を高める環境が整っています。伝統的に関西圏の強豪高校から多くの選手が入部し、Jリーグへの輩出実績も豊富です。商学部や経済学部など文系学部が充実しており、就職実績も良好。OB会のサポートも厚く、競技と学業の両立、そして将来のキャリア構築まで見据えた環境が整っているのが特徴です。"
      }
    },
    {
      id: 8,
      university_name: "福岡大学",
      homepage_url: "https://www.fukuoka-u.ac.jp/",
      main_faculties: ["スポーツ科学部", "商学部", "経済学部"],
      location: "福岡県福岡市",
      soccer_club: {
        league: "九州大学サッカーリーグ1部",
        coach_name: "田中佑一",
        total_members: 65,
        members_by_grade: { "1年": 18, "2年": 17, "3年": 16, "4年": 14 },
        j_league_nominees_2022_24: 4,
        j_league_nominees_2022: 1,
        j_league_nominees_2023: 1,
        j_league_nominees_2024: 2,
        denso_cup_2024_25: 1,
        soccer_field_count: 1,
        dorm_available: true,
        facility_note: "人工芝1面",
        practice_location: "七隈キャンパスグラウンド",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "スポーツトレーナー資格", "教員免許（保健体育）"],
        qualification_note: "JFA公認指導者ライセンス取得可能、スポーツ科学部との連携プログラムあり",
        highlight: "九州地区からJリーグ輩出多数"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.2以上、受入人数10名程度",
        selection: true,
        selection_period: "11月下旬・1月下旬",
        general_admission: true,
        general_conditions: "入学後のセレクションあり"
      },
      extended_data: {
        field_type: "人工芝1面",
        night_training: "あり（部分的にナイター設備）",
        other_facilities: "体育学部施設、フィットネスセンター",
        dorm_type: "体育会系サークル寮",
        dorm_fee: "月額3.5万円程度",
        dorm_features: "キャンパスから徒歩15分の場所に位置。基本的に2人部屋で、自炊中心の生活。",
        training_facilities: "スポーツ科学部と連携した体力測定施設、リハビリ室あり。",
        high_school_trend: "九州各県の強豪校出身者が中心。特に福岡県と熊本県からの入部者が多い。",
        recommend_ratio: "約65%",
        selection_details: "11月と1月に実施。地方開催の選考会も実施。約40名から15名程度を選抜。",
        scholarship_details: "スポーツ特待生制度あり。成績に応じた学費減免制度も。",
        tournament_results: [
          { tournament: "九州大学サッカーリーグ戦", year: "2023", achievement: "優勝" },
          { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "ベスト16" }
        ],
        j_league_teams: ["アビスパ福岡", "サガン鳥栖", "V・ファーレン長崎"],
        career_paths: [
          { category: "Jリーグ関連", percentage: 5 },
          { category: "指導者・教員", percentage: 35 },
          { category: "一般企業", percentage: 60 }
        ],
        famous_alumni: [
          { name: "金崎夢生", initials: "MK", career: "元日本代表、鹿島アントラーズ" },
          { name: "高橋祐治", initials: "YT", career: "元Jリーガー、アビスパ福岡" }
        ],
        playmaker_comment: "福岡大学サッカー部は九州地区の大学サッカーの中心的存在で、田中佑一監督の下、フィジカルを活かした力強いサッカーが持ち味です。九州リーグでは常に上位の成績を収め、全国大会でも一定の実績を残しています。スポーツ科学部を中心に、科学的なアプローチでのトレーニングも取り入れており、個々の選手の能力向上に力を入れています。九州各県の強豪高校から選手が集まり、特に福岡県と熊本県からの入部者が多いのが特徴。Jリーグへの輩出実績も一定数あり、特に九州地区のJクラブへの進路が目立ちます。地域密着型の活動も盛んで、地元サッカークラブでの指導経験を積む機会も提供しています。"
      }
    },
    {
      id: 9,
      university_name: "立命館大学",
      homepage_url: "https://www.ritsumei.ac.jp/",
      main_faculties: ["スポーツ健康科学部", "経済学部", "国際関係学部"],
      location: "滋賀県草津市（びわこ・くさつキャンパス）",
      soccer_club: {
        league: "関西学生サッカーリーグ1部",
        coach_name: "高橋義和",
        total_members: 80,
        members_by_grade: { "1年": 23, "2年": 21, "3年": 19, "4年": 17 },
        j_league_nominees_2022_24: 4,
        j_league_nominees_2022: 1,
        j_league_nominees_2023: 2,
        j_league_nominees_2024: 1,
        denso_cup_2024_25: 1,
        soccer_field_count: 1,
        dorm_available: false,
        facility_note: "人工芝1面、ナイター設備あり",
        practice_location: "びわこ・くさつキャンパス（BKC）グラウンド",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "教員免許（保健体育）", "スポーツマネジメント関連資格"],
        qualification_note: "国際交流プログラムあり、スポーツ科学の先進的研究環境",
        highlight: "国際経験が積める環境"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.2以上、受入人数15名程度",
        selection: false,
        selection_period: "",
        general_admission: true,
        general_conditions: "一般入試合格者は練習参加可"
      },
      extended_data: {
        field_type: "人工芝1面",
        night_training: "あり（ナイター設備完備）",
        other_facilities: "スポーツ健康科学部施設、国際交流施設",
        dorm_type: "なし",
        dorm_fee: "-",
        dorm_features: "-",
        training_facilities: "最新の映像分析設備、スポーツ科学研究施設",
        high_school_trend: "関西圏を中心に、全国各地の強豪校出身者が在籍。海外留学経験者も数名在籍。",
        recommend_ratio: "約60%",
        selection_details: "12月に実施。海外での遠征・合宿にも参加できる選手を重視した選考を実施。",
        scholarship_details: "グローバルアスリート制度あり。成績優秀者には学費減免制度も。",
        tournament_results: [
          { tournament: "関西学生サッカーリーグ戦", year: "2023", achievement: "3位" },
          { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "ベスト16" }
        ],
        j_league_teams: ["京都サンガF.C.", "ガンバ大阪", "セレッソ大阪"],
        career_paths: [
          { category: "Jリーグ関連", percentage: 5 },
          { category: "指導者・教員", percentage: 25 },
          { category: "一般企業・国際関連", percentage: 70 }
        ],
        famous_alumni: [
          { name: "柿谷曜一朗", initials: "YK", career: "元日本代表、セレッソ大阪" },
          { name: "宮吉拓実", initials: "TM", career: "京都サンガF.C." }
        ],
        playmaker_comment: "立命館大学サッカー部は、国際交流プログラムを特色とした特徴的なチームです。高橋義和監督の下、戦術的なサッカーと個人の技術向上に重点を置いています。毎年、海外チームとの交流試合や合宿を実施し、国際的な視野を持った選手の育成に力を入れているのが特徴です。スポーツ健康科学部を中心に、科学的なアプローチでのトレーニングも導入しています。施設面では人工芝のグラウンドを完備し、ナイター設備も整っています。寮はありませんが、キャンパス周辺に部員が集まって住む文化があり、チームの結束力を高めています。就職実績も良好で、特にグローバル企業への就職者が多いのも特徴です。"
      }
    },
    {
      id: 10,
      university_name: "青山学院大学",
      homepage_url: "https://www.aoyama.ac.jp/",
      main_faculties: ["教育人間科学部", "経営学部", "文学部"],
      location: "東京都世田谷区",
      soccer_club: {
        league: "関東大学サッカーリーグ2部",
        coach_name: "松本二郎",
        total_members: 65,
        members_by_grade: { "1年": 19, "2年": 17, "3年": 16, "4年": 13 },
        j_league_nominees_2022_24: 2,
        j_league_nominees_2022: 0,
        j_league_nominees_2023: 1,
        j_league_nominees_2024: 1,
        denso_cup_2024_25: 0,
        soccer_field_count: 1,
        dorm_available: false,
        facility_note: "人工芝1面（共用）",
        practice_location: "相模原キャンパスグラウンド",
        sports_scholarship: true,
        qualifications: ["教員免許（保健体育）", "スポーツビジネス関連資格"],
        qualification_note: "キャリア教育に力を入れており、進路決定率が高い",
        highlight: "文武両道の伝統校"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.5以上、受入人数8名程度",
        selection: true,
        selection_period: "12月上旬",
        general_admission: true,
        general_conditions: "一般入試合格者は練習参加後に審査"
      },
      extended_data: {
        field_type: "人工芝1面（共用）",
        night_training: "あり（一部のみ）",
        other_facilities: "大学体育館、フィットネスルーム",
        dorm_type: "なし",
        dorm_fee: "-",
        dorm_features: "-",
        training_facilities: "一般学生と共用のトレーニング施設、ビデオ分析室",
        high_school_trend: "関東圏の進学校出身者が中心。特に東京都と神奈川県からの入部者が多い。",
        recommend_ratio: "約50%",
        selection_details: "12月に実施。学力も重視した総合評価で選考。約30名から8名程度を選抜。",
        scholarship_details: "スポーツ推薦入学者向け奨学金制度あり。成績優秀者には学費減免も。",
        tournament_results: [
          { tournament: "関東大学サッカーリーグ2部", year: "2023", achievement: "3位" },
          { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "出場" }
        ],
        j_league_teams: ["横浜F・マリノス", "川崎フロンターレ"],
        career_paths: [
          { category: "Jリーグ関連", percentage: 2 },
          { category: "指導者・教員", percentage: 30 },
          { category: "一般企業", percentage: 68 }
        ],
        famous_alumni: [
          { name: "林陵平", initials: "RH", career: "元Jリーガー、水戸ホーリーホック" },
          { name: "小野剛", initials: "GO", career: "元サッカー日本代表コーチ" }
        ],
        playmaker_comment: "青山学院大学サッカー部は「文武両道」を掲げる伝統校で、松本二郎監督の下、技術と知性を重視したサッカーを展開しています。関東2部リーグに所属し、1部昇格を目指して日々練習に励んでいます。練習環境は一般学生との共用施設が中心ですが、効率的なトレーニングプログラムにより質の高い練習を実現。特に教育学部の選手が多く、将来教員を目指す学生にとって理想的な環境を提供しています。就職実績も非常に高く、競技と学業の両立を重視する文化があります。サッカーを通じた人間形成に重点を置き、リーダーシップやコミュニケーション能力の向上も図っています。Jリーガーの輩出は少ないものの、社会で活躍する人材を多数輩出している点が特徴です。"
      }
    },
    {
      id: 11,
      university_name: "名古屋大学",
      homepage_url: "https://www.nagoya-u.ac.jp/",
      main_faculties: ["教育学部", "経済学部", "情報学部"],
      location: "愛知県名古屋市",
      soccer_club: {
        league: "東海学生サッカーリーグ1部",
        coach_name: "佐藤健一",
        total_members: 60,
        members_by_grade: { "1年": 17, "2年": 16, "3年": 15, "4年": 12 },
        j_league_nominees_2022_24: 2,
        j_league_nominees_2022: 0,
        j_league_nominees_2023: 1,
        j_league_nominees_2024: 1,
        denso_cup_2024_25: 0,
        soccer_field_count: 1,
        dorm_available: false,
        facility_note: "人工芝1面（共用）",
        practice_location: "東山キャンパスグラウンド",
        sports_scholarship: false,
        qualifications: ["教員免許（保健体育）", "審判資格"],
        qualification_note: "地域連携活動が盛んで、指導者としての経験を積める",
        highlight: "中部地区トップレベル"
      },
      entry_conditions: {
        sports_recommend: false,
        recommend_criteria: "",
        selection: true,
        selection_period: "4月上旬（入学後）",
        general_admission: true,
        general_conditions: "入学後の技術テストあり"
      },
      extended_data: {
        field_type: "人工芝1面（共用）",
        night_training: "あり（限定的）",
        other_facilities: "大学体育館、研究用運動分析室",
        dorm_type: "なし",
        dorm_fee: "-",
        dorm_features: "-",
        training_facilities: "一般学生と共用の体育施設、地域連携トレーニングセンター",
        high_school_trend: "中部地方の進学校出身者中心。愛知県と岐阜県からの入部者が多い。",
        recommend_ratio: "約20%",
        selection_details: "4月入学後に実施。技術テストと体力測定、面接による総合評価。",
        scholarship_details: "特別な奨学金制度はないが、一般の大学奨学金制度を利用可能。",
        tournament_results: [
          { tournament: "東海学生サッカーリーグ1部", year: "2023", achievement: "4位" },
          { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "東海地区予選敗退" }
        ],
        j_league_teams: ["名古屋グランパス", "清水エスパルス"],
        career_paths: [
          { category: "Jリーグ関連", percentage: 2 },
          { category: "指導者・教員", percentage: 35 },
          { category: "一般企業・研究職", percentage: 63 }
        ],
        famous_alumni: [
          { name: "中野洋司", initials: "HN", career: "元Jリーガー、名古屋グランパス" },
          { name: "山田隆裕", initials: "TY", career: "日本サッカー協会技術委員" }
        ],
        playmaker_comment: "名古屋大学サッカー部は、国立大学としての学術的特色と競技の両立を重視するチームです。佐藤健一監督の下、戦術的理解と個々の技術向上に焦点を当てています。東海リーグ1部に所属し、中部地区では国立大学としてトップレベルの成績を維持しています。スポーツ推薦制度はありませんが、入学後のセレクションによって優秀な選手を発掘する取り組みを行っています。練習環境は一般学生との共用施設が中心ですが、効率的なトレーニング計画により質の高い練習を実施。教育学部を中心に、将来教員を目指す学生が多く所属しており、地域のサッカークラブでの指導経験を積む機会も提供しています。学業成績を重視する文化があり、卒業後は教育者や研究者として活躍する選手も多いのが特徴です。"
      }
    },
    {
      id: 12,
      university_name: "中央大学",
      homepage_url: "https://www.chuo-u.ac.jp/",
      main_faculties: ["法学部", "経済学部", "商学部"],
      location: "東京都八王子市",
      soccer_club: {
        league: "関東大学サッカーリーグ1部",
        coach_name: "斎藤隆",
        total_members: 75,
        members_by_grade: { "1年": 22, "2年": 20, "3年": 18, "4年": 15 },
        j_league_nominees_2022_24: 4,
        j_league_nominees_2022: 1,
        j_league_nominees_2023: 1,
        j_league_nominees_2024: 2,
        denso_cup_2024_25: 1,
        soccer_field_count: 1,
        dorm_available: true,
        facility_note: "人工芝1面、トレーニングルーム完備",
        practice_location: "多摩キャンパスグラウンド",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "審判資格"],
        qualification_note: "OB会のネットワークが強く、キャリア支援が充実",
        highlight: "伝統ある強豪校"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.3以上、受入人数12名程度",
        selection: true,
        selection_period: "11月中旬・1月中旬",
        general_admission: true,
        general_conditions: "入学後のセレクションあり"
      },
      extended_data: {
        field_type: "人工芝1面",
        night_training: "あり（全面ナイター設備）",
        other_facilities: "トレーニングルーム、分析室、リカバリールーム",
        dorm_type: "体育会専用寮",
        dorm_fee: "月額4.8万円程度（食事込み）",
        dorm_features: "キャンパスから徒歩10分の場所に位置。2人部屋が基本で、食堂完備。",
        training_facilities: "専用トレーニングルーム、映像分析設備、メディカルルームあり。",
        high_school_trend: "関東圏の強豪校出身者が中心。特に東京都と千葉県からの入部者が多い。",
        recommend_ratio: "約65%",
        selection_details: "11月と1月に実施。約45名の参加者から15名程度を選抜。実戦形式の選考と個人技術テスト。",
        scholarship_details: "体育会特別奨学金制度あり。成績優秀者には学費減免制度も。",
        tournament_results: [
          { tournament: "関東大学サッカーリーグ戦", year: "2023", achievement: "4位" },
          { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "ベスト8" }
        ],
        j_league_teams: ["FC東京", "川崎フロンターレ", "柏レイソル", "横浜FC"],
        career_paths: [
          { category: "Jリーグ関連", percentage: 5 },
          { category: "指導者・教員", percentage: 20 },
          { category: "一般企業・法曹界", percentage: 75 }
        ],
        famous_alumni: [
          { name: "柴崎岳", initials: "GS", career: "日本代表、レガネス" },
          { name: "遠藤保仁", initials: "YE", career: "元日本代表、ガンバ大阪" }
        ],
        playmaker_comment: "中央大学サッカー部は、関東リーグの強豪として知られる伝統校です。斎藤隆監督の下、組織的な守備と素早い攻撃切り替えに定評があります。法学部や経済学部など文系学部が強いという大学の特色から、将来のビジネスマンとしての素養も育む環境が整っています。練習施設も充実しており、人工芝のグラウンドやナイター設備、専用トレーニングルームを完備。体育会専用寮も用意されており、チームの結束力を高める環境が整っています。OB会のサポートも厚く、Jリーグへの輩出だけでなく、一般企業や法曹界への就職サポートも手厚いのが特徴です。競技と学業の両立を重視し、社会で活躍できる人材の育成に力を入れています。"
      }
    },
    {
      id: 13,
      university_name: "慶應義塾大学",
      homepage_url: "https://www.keio.ac.jp/",
      main_faculties: ["体育研究所", "経済学部", "理工学部"],
      location: "神奈川県横浜市（日吉キャンパス）",
      soccer_club: {
        league: "関東大学サッカーリーグ2部",
        coach_name: "木村和司",
        total_members: 70,
        members_by_grade: { "1年": 20, "2年": 18, "3年": 17, "4年": 15 },
        j_league_nominees_2022_24: 3,
        j_league_nominees_2022: 1,
        j_league_nominees_2023: 1,
        j_league_nominees_2024: 1,
        denso_cup_2024_25: 1,
        soccer_field_count: 1,
        dorm_available: false,
        facility_note: "人工芝1面（共用）、日吉キャンパス内に位置",
        practice_location: "日吉キャンパスグラウンド",
        sports_scholarship: false,
        qualifications: ["スポーツビジネス関連資格", "審判資格"],
        qualification_note: "OB会のネットワークが強く、ビジネス界への進路が多い",
        highlight: "進学校としての文武両道"
      },
      entry_conditions: {
        sports_recommend: false,
        recommend_criteria: "",
        selection: true,
        selection_period: "4月上旬（入学後）",
        general_admission: true,
        general_conditions: "入学後の技術テストで選抜"
      },
      extended_data: {
        field_type: "人工芝1面（共用）",
        night_training: "あり（限定的）",
        other_facilities: "体育研究所施設、フィットネスルーム",
        dorm_type: "なし",
        dorm_fee: "-",
        dorm_features: "-",
        training_facilities: "一般学生と共用の体育施設、映像分析室",
        high_school_trend: "全国の進学校出身者が中心。関東圏と関西圏からの入部者が多い。",
        recommend_ratio: "約20%",
        selection_details: "4月入学後に実施。技術テストと体力測定、面接による総合評価。",
        scholarship_details: "特別な体育奨学金制度はないが、成績優秀者には一般奨学金制度あり。",
        tournament_results: [
          { tournament: "関東大学サッカーリーグ2部", year: "2023", achievement: "4位" },
          { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "出場" }
        ],
        j_league_teams: ["横浜F・マリノス", "川崎フロンターレ"],
        career_paths: [
          { category: "Jリーグ関連", percentage: 2 },
          { category: "指導者・教員", percentage: 15 },
          { category: "一般企業・金融界", percentage: 83 }
        ],
        famous_alumni: [
          { name: "中西哲生", initials: "TN", career: "元Jリーガー、サッカー解説者" },
          { name: "北澤豪", initials: "TK", career: "元日本代表、ヴェルディ川崎" }
        ],
        playmaker_comment: "慶應義塾大学サッカー部は「文武両道」の精神を重んじ、学業とサッカーの高いレベルでの両立を目指しています。木村和司監督の下、知性を活かした戦術的なサッカーが特徴です。関東2部リーグに所属し、1部復帰を目標に日々練習に励んでいます。スポーツ推薦制度はなく、一般入試で入学した学生が中心となって活動しています。練習環境は他の強豪大学と比べると制約がありますが、効率的なトレーニングにより質の高い練習を実現。特に経済学部や法学部の学生が多く、卒業後は一流企業や金融機関への就職実績が非常に高いのが特徴です。OB会のネットワークも充実しており、キャリアサポートも手厚く行われています。Jリーガーの輩出は少ないものの、ビジネス界で活躍する人材を数多く輩出している名門です。"
      }
    },
    {
      id: 14,
      university_name: "同志社大学",
      homepage_url: "https://www.doshisha.ac.jp/",
      main_faculties: ["スポーツ健康科学部", "商学部", "経済学部"],
      location: "京都府京田辺市",
      soccer_club: {
        league: "関西学生サッカーリーグ1部",
        coach_name: "松井清隆",
        total_members: 75,
        members_by_grade: { "1年": 22, "2年": 20, "3年": 18, "4年": 15 },
        j_league_nominees_2022_24: 5,
        j_league_nominees_2022: 1,
        j_league_nominees_2023: 2,
        j_league_nominees_2024: 2,
        denso_cup_2024_25: 2,
        soccer_field_count: 1,
        dorm_available: true,
        facility_note: "人工芝1面、京田辺キャンパス内に位置",
        practice_location: "京田辺キャンパスグラウンド",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "教員免許（保健体育）", "スポーツビジネス関連資格"],
        qualification_note: "関西圏で指導者を目指す学生向けのカリキュラムが充実",
        highlight: "関西の名門私学"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.2以上、受入人数15名程度",
        selection: true,
        selection_period: "12月中旬・1月中旬",
        general_admission: true,
        general_conditions: "一般入試合格者は練習参加後に審査"
      },
      extended_data: {
        field_type: "人工芝1面",
        night_training: "あり（ナイター設備完備）",
        other_facilities: "スポーツ健康科学部施設、クラブハウス",
        dorm_type: "サッカー部専用寮",
        dorm_fee: "月額4.5万円程度（食事込み）",
        dorm_features: "キャンパスから徒歩15分の場所に位置。2〜4人部屋制で、食堂完備。",
        training_facilities: "専用ウェイトトレーニングルーム、分析設備、リカバリールームあり。",
        high_school_trend: "関西圏の強豪校出身者が中心。特に京都府と大阪府からの入部者が多い。",
        recommend_ratio: "約65%",
        selection_details: "12月と1月に実施。約45名の参加者から15名程度を選抜。実戦形式のゲームとチーム適応性を重視。",
        scholarship_details: "スポーツ特別奨学金制度あり。成績に応じた学費減免制度も。",
        tournament_results: [
          { tournament: "関西学生サッカーリーグ戦", year: "2023", achievement: "2位" },
          { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "ベスト16" }
        ],
        j_league_teams: ["京都サンガF.C.", "ガンバ大阪", "セレッソ大阪"],
        career_paths: [
          { category: "Jリーグ関連", percentage: 6 },
          { category: "指導者・教員", percentage: 30 },
          { category: "一般企業", percentage: 64 }
        ],
        famous_alumni: [
          { name: "宮本恒靖", initials: "TM", career: "元日本代表、ガンバ大阪" },
          { name: "東口順昭", initials: "YH", career: "日本代表、ガンバ大阪" }
        ],
        playmaker_comment: "同志社大学サッカー部は関西学生リーグの強豪として知られ、松井清隆監督の下、技術と組織力を重視したサッカーを展開しています。「スポーツと知性の調和」を理念に掲げ、競技と学業の両立を重視するカルチャーが根付いています。京田辺キャンパス内の人工芝グラウンドを拠点とし、ナイター設備も完備。サッカー部専用寮もあり、チームの結束力を高める環境が整っています。関西圏の強豪高校から多くの選手が入部し、京都サンガF.C.をはじめとする関西のJクラブへの輩出実績も豊富です。スポーツ健康科学部を中心に、将来指導者や教員を目指す学生も多く、教員採用率も高いのが特徴。OB会のサポートも手厚く、就職実績も良好で、競技力と人間力の両方を高める教育環境が魅力です。"
      }
    },
    {
      id: 15,
      university_name: "日本体育大学",
      homepage_url: "https://www.nittai.ac.jp/",
      main_faculties: ["体育学部", "スポーツ文化学部", "児童スポーツ教育学部"],
      location: "神奈川県横浜市",
      soccer_club: {
        league: "関東大学サッカーリーグ1部",
        coach_name: "北澤豪",
        total_members: 85,
        members_by_grade: { "1年": 25, "2年": 22, "3年": 20, "4年": 18 },
        j_league_nominees_2022_24: 7,
        j_league_nominees_2022: 2,
        j_league_nominees_2023: 2,
        j_league_nominees_2024: 3,
        denso_cup_2024_25: 3,
        soccer_field_count: 2,
        dorm_available: true,
        facility_note: "人工芝1面、天然芝1面、専用トレーニング施設あり",
        practice_location: "横浜・健志台キャンパスグラウンド",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "教員免許（保健体育）", "アスレティックトレーナー資格"],
        qualification_note: "指導者育成に特化したカリキュラム、実践的な指導経験を積める環境",
        highlight: "体育系最高峰の設備"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.0以上、受入人数25名程度",
        selection: true,
        selection_period: "11月中旬・1月中旬・2月下旬",
        general_admission: false,
        general_conditions: "推薦入試中心"
      },
      extended_data: {
        field_type: "人工芝1面、天然芝1面",
        night_training: "あり（全面ナイター設備）",
        other_facilities: "室内練習場、専用トレーニングルーム、リカバリー施設",
        dorm_type: "サッカー部専用寮",
        dorm_fee: "月額4万円程度（食事込み）",
        dorm_features: "キャンパスから徒歩5分の場所に位置。2人部屋制で、栄養管理された食事を提供。",
        training_facilities: "最新設備を備えたトレーニングジム、パフォーマンス分析ラボ、リハビリ施設あり。",
        high_school_trend: "全国の強豪校出身者がバランスよく在籍。特に関東圏と東北地方からの入部者が多い。",
        recommend_ratio: "約80%",
        selection_details: "11月、1月、2月に実施。全国各地で選考会を開催。約100名の参加者から25名程度を選抜。",
        scholarship_details: "充実したスポーツ特待生制度あり。競技成績による全額免除から半額免除まで。",
        tournament_results: [
          { tournament: "関東大学サッカーリーグ戦", year: "2023", achievement: "2位" },
          { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "優勝" },
          { tournament: "全日本大学サッカー選手権", year: "2022", achievement: "優勝" }
        ],
        j_league_teams: ["横浜F・マリノス", "川崎フロンターレ", "FC東京", "浦和レッズ", "柏レイソル"],
        career_paths: [
          { category: "Jリーグ関連", percentage: 10 },
          { category: "指導者・教員", percentage: 60 },
          { category: "一般企業・スポーツ関連", percentage: 30 }
        ],
        famous_alumni: [
          { name: "三浦知良", initials: "KM", career: "元日本代表、横浜FC" },
          { name: "遠藤彰弘", initials: "AE", career: "元日本代表、ガンバ大阪" },
          { name: "槙野智章", initials: "TM", career: "元日本代表、浦和レッズ" }
        ],
        playmaker_comment: "日本体育大学サッカー部は、体育系大学の最高峰として知られ、北澤豪監督の下、実績と伝統を誇るチームです。全国から集まったトップレベルの選手たちにより、高い技術と強靭なフィジカルを兼ね備えたサッカーを展開しています。施設環境は国内トップクラスで、人工芝と天然芝の両方のグラウンド、専用トレーニングルーム、最新の分析設備を完備。専用寮も用意されており、サッカーに集中できる環境が整っています。Jリーグへの選手輩出実績も豊富ですが、特に指導者養成に力を入れており、卒業生の多くが全国各地の学校やクラブチームで指導者として活躍しています。教員免許取得率も非常に高く、競技キャリア後の進路も安定しているのが特徴です。体育・スポーツ科学の専門教育と実践的な指導経験を積むことができ、将来の指導者を目指す学生にとって理想的な環境です。"
      }
    },
    {
      id: 16,
      university_name: "大阪体育大学",
      homepage_url: "https://www.ouhs.ac.jp/",
      main_faculties: ["体育学部", "教育学部", "スポーツ健康学部"],
      location: "大阪府泉南郡",
      soccer_club: {
        league: "関西学生サッカーリーグ1部",
        coach_name: "西谷和弘",
        total_members: 80,
        members_by_grade: { "1年": 24, "2年": 21, "3年": 19, "4年": 16 },
        j_league_nominees_2022_24: 6,
        j_league_nominees_2022: 2,
        j_league_nominees_2023: 2,
        j_league_nominees_2024: 2,
        denso_cup_2024_25: 2,
        soccer_field_count: 2,
        dorm_available: true,
        facility_note: "人工芝1面、天然芝1面、最新トレーニング設備完備",
        practice_location: "熊取キャンパスグラウンド",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "教員免許（保健体育）", "スポーツトレーナー資格"],
        qualification_note: "関西圏での教員採用実績が高く、指導者育成に強み",
        highlight: "関西屈指の体育系大学"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.0以上、受入人数20名程度",
        selection: true,
        selection_period: "11月下旬・1月中旬",
        general_admission: true,
        general_conditions: "技術・体力テストあり"
      },
      extended_data: {
        field_type: "人工芝1面、天然芝1面",
        night_training: "あり（全面ナイター設備）",
        other_facilities: "専用クラブハウス、体力測定室、リカバリープール",
        dorm_type: "体育会専用寮",
        dorm_fee: "月額4.2万円程度（食事込み）",
        dorm_features: "キャンパス内に位置し、移動が便利。2人部屋制で、栄養管理された食事を提供。",
        training_facilities: "最新設備を備えたトレーニングジム、スポーツ科学研究施設と連携したパフォーマンス分析。",
        high_school_trend: "関西圏を中心に全国の強豪校出身者が在籍。特に大阪府と兵庫県からの入部者が多い。",
        recommend_ratio: "約75%",
        selection_details: "11月と1月に実施。関西圏を中心に選考会を開催。約80名の参加者から20名程度を選抜。",
        scholarship_details: "スポーツ特待生制度あり。競技成績による学費全額から半額免除まで。",
        tournament_results: [
          { tournament: "関西学生サッカーリーグ戦", year: "2023", achievement: "3位" },
          { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "ベスト8" }
        ],
        j_league_teams: ["ガンバ大阪", "セレッソ大阪", "ヴィッセル神戸", "京都サンガF.C."],
        career_paths: [
          { category: "Jリーグ関連", percentage: 8 },
          { category: "指導者・教員", percentage: 55 },
          { category: "一般企業・スポーツ関連", percentage: 37 }
        ],
        famous_alumni: [
          { name: "宮本恒靖", initials: "TM", career: "元日本代表、ガンバ大阪" },
          { name: "山口螢", initials: "HY", career: "元日本代表、セレッソ大阪" }
        ],
        playmaker_comment: "大阪体育大学サッカー部は関西圏の体育系大学の雄として、西谷和弘監督の下、実践的な指導と最新のスポーツ科学を融合させたトレーニングを展開しています。関西学生リーグの強豪として、常に上位の成績を収めており、ガンバ大阪やセレッソ大阪といった関西のJクラブへの選手輩出も安定しています。施設面では人工芝と天然芝の両方のグラウンドを完備し、専用クラブハウスやトレーニング施設も充実。体育会専用寮も完備されており、サッカーに集中できる環境が整っています。特に教員養成に力を入れており、体育教員採用率は全国でもトップクラス。将来指導者を目指す学生にとって理想的な環境が整っています。スポーツ科学の研究施設と連携したデータ分析も導入しており、科学的アプローチによる選手育成も魅力の一つです。"
      }
    },
];

// 7. 便利な検索ヘルパー関数
export const searchHelpers = {
  // 地域判定の簡素化
  regionMapping: {
    "関東": ["早稲田", "慶應", "明治", "法政", "中央", "青山", "東海", "筑波", "専修", "日本体育", "流通経済"],
    "関西": ["関西学院", "同志社", "立命館", "大阪体育"],
    "中部": ["名古屋"],
    "九州・沖縄": ["福岡", "九州産業"], 
    "北海道・東北": ["北海道"]
  },
  
  // 大学が指定地域に含まれるかチェック
  isUniversityInRegion: (university, region) => {
    if (!university || !region) return false;
    
    const keywords = searchHelpers.regionMapping[region] || [];
    return keywords.some(keyword => university.university_name.includes(keyword));
  },
  
  // 国公立大学の判定
  isPublicUniversity: (university) => {
    if (!university?.university_name) return false;
    
    const name = university.university_name;
    return (
      name.includes('国立') || 
      name.includes('県立') || 
      name.includes('市立') || 
      name === '筑波大学' || 
      name === '北海道大学' || 
      name === '名古屋大学'
    );
  }
};

// 8. 検索オプションをまとめたオブジェクト
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

// 9. デフォルトエクスポート（後方互換性のため）
export default {
  regions,
  leagues,
  availableQualifications,
  availableCertifications,
  userProfile,
  universities,
  searchOptions,
  searchHelpers
};