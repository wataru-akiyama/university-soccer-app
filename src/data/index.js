// src/data/index.js - 全データを統合（12校版）

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
  "北信越大学サッカーリーグ2部"
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

// 6. 大学データ（12校版）
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
      j_league_nominees_2022_24: 12,
      denso_cup_2024_25: 5,
      soccer_field_count: 3,
      dorm_available: true,
      facility_note: "人工芝2面、天然芝1面、ナイター設備あり",
      practice_location: "東伏見キャンパスグラウンド",
      sports_scholarship: true,
      qualifications: ["JFA公認コーチングライセンス", "スポーツトレーナー資格", "審判資格"]
    },
    
    entry_conditions: {
      sports_recommend: true,
      recommend_criteria: "評定3.5以上、受入人数20名程度",
      selection: true,
      selection_period: "12月上旬・2月下旬",
      general_admission: true,
      general_conditions: "オープン練習参加後、部内テスト実施"
    },
    
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
  
    costs: {
      university_costs: {
        annual_tuition: 1200000,
        entrance_fee: 300000,
        facility_fee: 150000
      },
      soccer_club_costs: {
        monthly_club_fee: 15000,
        equipment_cost: 80000,
        camp_cost: 200000,
        travel_cost: 100000
      },
      living_costs: {
        dorm_fee: 45000,
        meal_cost: 25000,
        commute_cost: 8000
      },
      total_annual_cost: 2500000
    },
  
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
        }
      ],
      graduate_reviews: [
        {
          graduation_year: 2023,
          current_status: "Jリーガー",
          review: "4年間で技術面、精神面ともに大きく成長できました。プロになった今でも、早稲田で学んだ戦術理解やチームワークが役立っています。後輩たちにも自信を持って勧められる環境です。"
        }
      ]
    },
  
    extended_data: {
      recommend_ratio: "約70%",
      selection_details: "12月と2月に実施。約50名の参加者から15名程度を選抜。実戦形式のゲームとポジション別のスキルテストを実施。",
      scholarship_details: "成績優秀者には授業料の全額または一部免除の制度あり。J内定者には特別奨励金制度も。",
      dorm_features: "キャンパスから徒歩10分の場所に位置。全室個室で、食堂完備。管理人常駐で生活指導も行う。",
      training_facilities: "最新設備を備えたトレーニングジム、室内練習場あり。スポーツ栄養士による食事指導も実施。",
      career_paths: [
        { category: "Jリーグ関連", percentage: 15 },
        { category: "指導者・教員", percentage: 30 },
        { category: "一般企業", percentage: 55 }
      ],
      playmaker_comment: "早稲田大学サッカー部は、首都圏でトップクラスの実績を持ち、多くのJリーガーを輩出している名門です。特に技術的な面での評価が高く、ボールポゼッションを重視したスタイルが特徴です。李忠成監督のもと、戦術理解度の高い選手の育成に力を入れており、プロ志向の選手にとって理想的な環境が整っています。"
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
      j_league_nominees_2022_24: 10,
      denso_cup_2024_25: 4,
      soccer_field_count: 2,
      dorm_available: true,
      facility_note: "人工芝1面、天然芝1面、室内練習場あり",
      practice_location: "筑波大学第一グラウンド",
      sports_scholarship: true,
      qualifications: ["JFA公認コーチングライセンス", "教員免許（保健体育）", "スポーツ医科学関連資格", "審判資格"]
    },
    
    entry_conditions: {
      sports_recommend: true,
      recommend_criteria: "評定3.2以上、受入人数15名程度",
      selection: true,
      selection_period: "11月中旬・1月下旬",
      general_admission: true,
      general_conditions: "一般入試合格者は選考あり"
    },
    
    key_features: [
      "国立大学トップクラス実績",
      "教員免許取得率90%以上", 
      "スポーツ科学研究環境",
      "年間費用約150万円"
    ],
    
    team_philosophy: "科学的根拠に基づいたトレーニングと戦術。中山雅史監督のもと、フィジカルとテクニックのバランスを重視したサッカーを展開。",
    
    suitable_players: [
      "体育教員を目指している選手",
      "スポーツ科学に興味がある選手", 
      "国立大学での学業を重視する選手",
      "科学的アプローチに興味がある選手"
    ],
  
    costs: {
      university_costs: {
        annual_tuition: 535800,
        entrance_fee: 282000,
        facility_fee: 0
      },
      soccer_club_costs: {
        monthly_club_fee: 10000,
        equipment_cost: 60000,
        camp_cost: 150000,
        travel_cost: 80000
      },
      living_costs: {
        dorm_fee: 35000,
        meal_cost: 20000,
        commute_cost: 5000
      },
      total_annual_cost: 1500000
    },
  
    reviews: {
      student_reviews: [
        {
          grade: "4年生",
          position: "DF", 
          review: "中山監督の指導は理論に基づいていて、なぜそうするのかを明確に教えてくれます。教員を目指しているので、指導法も同時に学べるのが魅力です。学費も安く、家計に優しいです。",
          rating: 4.4
        },
        {
          grade: "3年生",
          position: "MF",
          review: "スポーツ科学の最新知識を学びながらサッカーができる環境は最高です。研究室でのデータ分析なども面白く、将来の進路の幅が広がりました。",
          rating: 4.6
        }
      ],
      parent_reviews: [
        {
          review: "国立大学なので学費が安く、それでいて高いレベルの指導を受けられるのは本当にありがたいです。教員志望なので、教育実習のサポートも手厚く安心しています。",
          rating: 4.7
        }
      ],
      graduate_reviews: [
        {
          graduation_year: 2023,
          current_status: "中学校教員",
          review: "現在は中学校で体育教員をしています。筑波で学んだ指導法や理論が現場で非常に役立っています。サッカー部の顧問として県大会上位を目指しています。"
        }
      ]
    },
  
    extended_data: {
      recommend_ratio: "約60%",
      selection_details: "11月と1月に実施。学力も重視した総合評価。体育専門学群への進学意志を確認。",
      scholarship_details: "国立大学独自の奨学金制度あり。スポーツ特待生制度も存在。",
      dorm_features: "キャンパス内の学生宿舎。2人部屋制で、食堂は平日のみ営業。研究環境にも近い。",
      training_facilities: "最新のスポーツ科学研究施設と連携。バイオメカニクス分析、栄養指導なども実施。",
      career_paths: [
        { category: "Jリーグ関連", percentage: 12 },
        { category: "指導者・教員", percentage: 55 },
        { category: "一般企業・研究職", percentage: 33 }
      ],
      playmaker_comment: "筑波大学サッカー部は、「体育専門学群」という特色ある教育環境の下、高いレベルの競技と学業の両立を実現している大学です。国立大学ならではの学費の安さと、最新のスポーツ科学研究環境が大きな魅力。特に教員を目指す選手にとって理想的な環境が整っています。"
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
      j_league_nominees_2022_24: 8,
      denso_cup_2024_25: 3,
      soccer_field_count: 2,
      dorm_available: true,
      facility_note: "人工芝2面、ナイター設備あり",
      practice_location: "和泉キャンパスグラウンド",
      sports_scholarship: true,
      qualifications: ["JFA公認コーチングライセンス", "スポーツビジネス関連資格", "審判資格"]
    },
    
    entry_conditions: {
      sports_recommend: true,
      recommend_criteria: "評定3.3以上、受入人数18名程度",
      selection: true,
      selection_period: "12月中旬・2月中旬",
      general_admission: true,
      general_conditions: "入学後のセレクションあり"
    },
    
    key_features: [
      "伝統ある強豪校",
      "OBネットワーク充実", 
      "都心アクセス良好",
      "年間費用約220万円"
    ],
    
    team_philosophy: "攻撃的でテクニカルなサッカー。浜野征哉監督のもと、個人技術を活かした魅力的なプレースタイルを追求。",
    
    suitable_players: [
      "テクニカルなプレーを得意とする選手",
      "一般企業への就職を考えている選手", 
      "都心でキャンパスライフを送りたい選手",
      "伝統校でプレーしたい選手"
    ],
  
    costs: {
      university_costs: {
        annual_tuition: 1100000,
        entrance_fee: 280000,
        facility_fee: 120000
      },
      soccer_club_costs: {
        monthly_club_fee: 12000,
        equipment_cost: 70000,
        camp_cost: 180000,
        travel_cost: 90000
      },
      living_costs: {
        dorm_fee: 50000,
        meal_cost: 30000,
        commute_cost: 10000
      },
      total_annual_cost: 2200000
    },
  
    reviews: {
      student_reviews: [
        {
          grade: "2年生",
          position: "FW", 
          review: "浜野監督の攻撃的な戦術が面白く、自分の技術を存分に発揮できます。都心のキャンパスなので就職活動にも便利で、OBの方々のサポートも手厚いです。",
          rating: 4.3
        },
        {
          grade: "4年生",
          position: "MF",
          review: "明治のブランドは就職活動で本当に有利です。サッカーで培った経験と大学のネームバリューで、希望する企業に内定をいただけました。",
          rating: 4.2
        }
      ],
      parent_reviews: [
        {
          review: "伝統ある大学で、OBの方々の支援も厚く、安心して子供を任せられます。就職実績も良く、将来への不安がありません。",
          rating: 4.4
        }
      ],
      graduate_reviews: [
        {
          graduation_year: 2022,
          current_status: "総合商社勤務",
          review: "明治のサッカー部で学んだチームワークと努力する習慣が、社会人になってからも大いに役立っています。同期のつながりも強く、人生の財産です。"
        }
      ]
    },
  
    extended_data: {
      recommend_ratio: "約70%",
      selection_details: "12月と2月に実施。技術テストと面接による総合評価。約50名から18名程度を選抜。",
      scholarship_details: "スポーツ特別奨学金制度あり。成績優秀者には学費減免制度も。",
      dorm_features: "大学から徒歩15分の場所に位置。全室個室で、食堂は平日のみ営業。",
      training_facilities: "ウェイトトレーニングルーム、分析ルーム完備。理学療法士による定期ケアも実施。",
      career_paths: [
        { category: "Jリーグ関連", percentage: 10 },
        { category: "指導者・教員", percentage: 25 },
        { category: "一般企業", percentage: 65 }
      ],
      playmaker_comment: "明治大学サッカー部は東京都心に位置し、関東リーグの強豪として知られています。特に攻撃的でテクニカルなサッカーが特徴で、個人技術に長けた選手が多く所属。OB会の支援も厚く、一般企業への就職サポートも手厚いのが魅力です。"
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
      j_league_nominees_2022_24: 7,
      denso_cup_2024_25: 2,
      soccer_field_count: 1,
      dorm_available: false,
      facility_note: "人工芝1面、ナイター設備あり",
      practice_location: "多摩キャンパスグラウンド",
      sports_scholarship: true,
      qualifications: ["JFA公認コーチングライセンス", "スポーツトレーナー資格", "教員免許（保健体育）"]
    },
    
    entry_conditions: {
      sports_recommend: true,
      recommend_criteria: "評定3.4以上、受入人数15名程度",
      selection: true,
      selection_period: "11月下旬・2月上旬",
      general_admission: false,
      general_conditions: "一般入試合格者は技術テストあり"
    },
    
    key_features: [
      "コーチングライセンス取得可",
      "スポーツ科学的アプローチ", 
      "指導者育成に強み",
      "年間費用約200万円"
    ],
    
    team_philosophy: "規律あるサッカーと個人技術の向上。山口素弘監督のもと、組織力と個の力を両立したバランスの良いチーム作り。",
    
    suitable_players: [
      "将来指導者を目指している選手",
      "スポーツトレーナーに興味がある選手", 
      "組織的なサッカーを学びたい選手",
      "規律を重んじる選手"
    ],
  
    costs: {
      university_costs: {
        annual_tuition: 1050000,
        entrance_fee: 260000,
        facility_fee: 110000
      },
      soccer_club_costs: {
        monthly_club_fee: 11000,
        equipment_cost: 65000,
        camp_cost: 170000,
        travel_cost: 85000
      },
      living_costs: {
        dorm_fee: 0,
        meal_cost: 35000,
        commute_cost: 12000
      },
      total_annual_cost: 2000000
    },
  
    reviews: {
      student_reviews: [
        {
          grade: "3年生",
          position: "DF", 
          review: "山口監督の指導は規律がしっかりしていて、人間的にも成長できます。スポーツ健康学部で学ぶ内容とサッカーがリンクしていて、とても勉強になります。",
          rating: 4.1
        },
        {
          grade: "4年生",
          position: "GK",
          review: "コーチングライセンスの取得サポートが充実していて、将来の指導者としての準備ができています。実際に地域のクラブで指導経験も積めました。",
          rating: 4.4
        }
      ],
      parent_reviews: [
        {
          review: "規律正しい指導で、生活面でも成長が見られます。将来の指導者としての道筋も明確で、安心して任せられます。",
          rating: 4.2
        }
      ],
      graduate_reviews: [
        {
          graduation_year: 2023,
          current_status: "高校教員・サッカー部顧問",
          review: "現在は高校で体育教員をしながら、サッカー部の顧問をしています。法政で学んだ指導法が現場で本当に役立っています。"
        }
      ]
    },
  
    extended_data: {
      recommend_ratio: "約65%",
      selection_details: "11月と2月に実施。指導者志向の選手を重視した選考。約60名から15名程度を選抜。",
      scholarship_details: "スポーツ健康学部特別奨学金制度あり。競技成績による特別奨学金制度も存在。",
      dorm_features: "一般学生寮にサッカー部枠あり。2人部屋が基本で、食堂は平日のみ営業。",
      training_facilities: "スポーツ健康学部の最新施設も利用可能。フィットネスセンター、リカバリールーム完備。",
      career_paths: [
        { category: "Jリーグ関連", percentage: 8 },
        { category: "指導者・教員", percentage: 45 },
        { category: "一般企業", percentage: 47 }
      ],
      playmaker_comment: "法政大学サッカー部はスポーツ健康学部を中心に、高いレベルの選手が集まる強豪校です。特に指導者育成に力を入れており、コーチングライセンス取得サポートが充実。規律あるサッカーと科学的アプローチが特徴です。"
    }
  },
  {
    id: 5,
    university_name: "順天堂大学",
    homepage_url: "https://www.juntendo.ac.jp/",
    main_faculties: ["スポーツ健康科学部", "医学部", "保健医療学部"],
    location: "千葉県印西市（さくらキャンパス）",
    
    soccer_club: {
      league: "関東大学サッカーリーグ1部",
      coach_name: "伊藤彰",
      total_members: 70,
      j_league_nominees_2022_24: 5,
      denso_cup_2024_25: 1,
      soccer_field_count: 1,
      dorm_available: false,
      facility_note: "人工芝1面、ナイター設備あり",
      practice_location: "さくらキャンパスグラウンド",
      sports_scholarship: true,
      qualifications: ["アスレティックトレーナー資格", "スポーツ医科学関連資格", "スポーツ栄養士"]
    },
    
    entry_conditions: {
      sports_recommend: true,
      recommend_criteria: "評定3.5以上、受入人数12名程度",
      selection: true,
      selection_period: "11月中旬・1月中旬",
      general_admission: false,
      general_conditions: "推薦・AO入試のみ"
    },
    
    key_features: [
      "医学部連携トレーニング",
      "スポーツ医科学特化", 
      "怪我予防・リハビリ充実",
      "年間費用約250万円"
    ],
    
    team_philosophy: "スポーツ医科学に基づいた科学的アプローチ。伊藤彰監督のもと、怪我予防とパフォーマンス向上を科学的に追求。",
    
    suitable_players: [
      "スポーツ医科学に興味がある選手",
      "アスレティックトレーナーを目指す選手", 
      "怪我に悩んでいる選手",
      "科学的トレーニングを学びたい選手"
    ],
  
    costs: {
      university_costs: {
        annual_tuition: 1300000,
        entrance_fee: 300000,
        facility_fee: 140000
      },
      soccer_club_costs: {
        monthly_club_fee: 13000,
        equipment_cost: 75000,
        camp_cost: 160000,
        travel_cost: 70000
      },
      living_costs: {
        dorm_fee: 0,
        meal_cost: 40000,
        commute_cost: 15000
      },
      total_annual_cost: 2500000
    },
  
    reviews: {
      student_reviews: [
        {
          grade: "3年生",
          position: "MF", 
          review: "医学部との連携で、怪我の予防やリハビリについて深く学べます。高校時代の古傷も完全に治り、パフォーマンスが格段に向上しました。",
          rating: 4.6
        },
        {
          grade: "2年生",
          position: "FW",
          review: "最新のスポーツ科学を学びながらサッカーができる環境は他にはありません。将来はアスレティックトレーナーとして活動したいです。",
          rating: 4.5
        }
      ],
      parent_reviews: [
        {
          review: "医学部と連携した環境で、安心して子供を任せられます。科学的なアプローチで怪我も予防でき、将来性のある分野を学べるのが魅力です。",
          rating: 4.5
        }
      ],
      graduate_reviews: [
        {
          graduation_year: 2023,
          current_status: "Jリーグ・アスレティックトレーナー",
          review: "現在はJリーグのクラブでアスレティックトレーナーとして働いています。順天堂で学んだ知識と経験が直接仕事に活かされています。"
        }
      ]
    },
  
    extended_data: {
      recommend_ratio: "約60%",
      selection_details: "11月と1月に実施。医学的検査も含む総合的な評価。学力も重視される厳しい選考。",
      scholarship_details: "スポーツ健康科学部特別奨学金制度あり。成績優秀者には学費減免制度も。",
      dorm_features: "キャンパス周辺に部員向けの賃貸物件あり。チームメイト同士で生活する文化。",
      training_facilities: "医学部附属のリハビリ施設、最新のスポーツ医科学施設、パフォーマンス分析ラボ完備。",
      career_paths: [
        { category: "Jリーグ関連", percentage: 6 },
        { category: "医療関連・指導者", percentage: 60 },
        { category: "一般企業", percentage: 34 }
      ],
      playmaker_comment: "順天堂大学サッカー部は医学部を擁する大学としての特色を活かし、スポーツ医科学に基づいた科学的アプローチが最大の強みです。怪我の予防と早期復帰、パフォーマンス向上を科学的に追求できる唯一無二の環境が魅力です。"
    }
  },
  {
    id: 6,
    university_name: "関西学院大学",
    homepage_url: "https://www.kwansei.ac.jp/",
    main_faculties: ["総合政策学部", "商学部", "人間福祉学部"],
    location: "兵庫県西宮市",
    
    soccer_club: {
      league: "関西学生サッカーリーグ1部",
      coach_name: "井上一徳",
      total_members: 85,
      j_league_nominees_2022_24: 7,
      denso_cup_2024_25: 3,
      soccer_field_count: 2,
      dorm_available: true,
      facility_note: "人工芝1面、天然芝1面、ナイター設備あり",
      practice_location: "西宮上ケ原キャンパスグラウンド",
      sports_scholarship: true,
      qualifications: ["JFA公認コーチングライセンス", "教員免許（保健体育）", "スポーツビジネス関連資格", "審判資格"]
    },
    
    entry_conditions: {
      sports_recommend: true,
      recommend_criteria: "評定3.3以上、受入人数15名程度",
      selection: true,
      selection_period: "12月中旬・2月上旬",
      general_admission: true,
      general_conditions: "一般入試合格者は技術テストあり"
    },
    
    key_features: [
      "関西トップクラス充実設備",
      "関西の名門私学", 
      "優秀な就職実績",
      "年間費用約230万円"
    ],
    
    team_philosophy: "戦術的理解度の高いサッカー。井上一徳監督のもと、個人の技術向上とチーム戦術の融合を目指す。",
    
    suitable_players: [
      "関西でプレーしたい選手",
      "戦術理解を深めたい選手", 
      "一流企業への就職を考えている選手",
      "名門私学でのキャンパスライフを送りたい選手"
    ],
  
    costs: {
      university_costs: {
        annual_tuition: 1150000,
        entrance_fee: 290000,
        facility_fee: 130000
      },
      soccer_club_costs: {
        monthly_club_fee: 13000,
        equipment_cost: 70000,
        camp_cost: 180000,
        travel_cost: 95000
      },
      living_costs: {
        dorm_fee: 45000,
        meal_cost: 25000,
        commute_cost: 8000
      },
      total_annual_cost: 2300000
    },
  
    reviews: {
      student_reviews: [
        {
          grade: "4年生",
          position: "MF", 
          review: "井上監督の戦術指導は非常に論理的で、サッカーIQが格段に向上しました。関西の名門ということで就職活動でも評価していただけました。",
          rating: 4.3
        },
        {
          grade: "3年生",
          position: "DF",
          review: "設備が本当に充実していて、関西では最高レベルの環境だと思います。寮生活でチームの結束も強く、一生の仲間ができました。",
          rating: 4.4
        }
      ],
      parent_reviews: [
        {
          review: "関西の名門私学で、教育レベルも高く安心です。就職実績も良く、将来への不安がありません。設備も充実していて満足しています。",
          rating: 4.5
        }
      ],
      graduate_reviews: [
        {
          graduation_year: 2022,
          current_status: "関西大手企業勤務",
          review: "関学のブランドと4年間のサッカー部での経験が就職活動で大いに評価されました。現在は関西の大手企業で営業として活動しています。"
        }
      ]
    },
  
    extended_data: {
      recommend_ratio: "約70%",
      selection_details: "12月と2月に実施。関西圏を中心に選考会を開催。約50名から15名程度を選抜。",
      scholarship_details: "スポーツ特別奨学金制度あり。競技成績による学費全額免除制度も存在。",
      dorm_features: "キャンパスから徒歩10分の場所に位置。全室個室で、食堂完備。管理人常駐。",
      training_facilities: "最新設備を備えたトレーニングジム、室内練習場、ビデオ分析ルーム、リカバリープール完備。",
      career_paths: [
        { category: "Jリーグ関連", percentage: 9 },
        { category: "指導者・教員", percentage: 25 },
        { category: "一般企業", percentage: 66 }
      ],
      playmaker_comment: "関西学院大学サッカー部は関西学生リーグの強豪として知られ、関西地区でトップクラスの施設を誇ります。戦術的理解度の高いサッカーと、関西の名門私学としての就職実績の良さが大きな魅力です。"
    }
  },
  {
    id: 7,
    university_name: "福岡大学",
    homepage_url: "https://www.fukuoka-u.ac.jp/",
    main_faculties: ["スポーツ科学部", "商学部", "経済学部"],
    location: "福岡県福岡市",
    
    soccer_club: {
      league: "九州大学サッカーリーグ1部",
      coach_name: "田中佑一",
      total_members: 65,
      j_league_nominees_2022_24: 4,
      denso_cup_2024_25: 1,
      soccer_field_count: 1,
      dorm_available: true,
      facility_note: "人工芝1面",
      practice_location: "七隈キャンパスグラウンド",
      sports_scholarship: true,
      qualifications: ["JFA公認コーチングライセンス", "スポーツトレーナー資格", "教員免許（保健体育）"]
    },
    
    entry_conditions: {
      sports_recommend: true,
      recommend_criteria: "評定3.2以上、受入人数10名程度",
      selection: true,
      selection_period: "11月下旬・1月下旬",
      general_admission: true,
      general_conditions: "入学後のセレクションあり"
    },
    
    key_features: [
      "九州地区からJリーグ輩出多数",
      "地域密着型活動", 
      "スポーツ科学研究環境",
      "年間費用約170万円"
    ],
    
    team_philosophy: "フィジカルを活かした力強いサッカー。田中佑一監督のもと、九州らしいパワフルなプレースタイルを展開。",
    
    suitable_players: [
      "九州でプレーしたい選手",
      "フィジカルの強さを活かしたい選手", 
      "地域の指導者を目指している選手",
      "費用を抑えて大学サッカーをしたい選手"
    ],
  
    costs: {
      university_costs: {
        annual_tuition: 900000,
        entrance_fee: 250000,
        facility_fee: 100000
      },
      soccer_club_costs: {
        monthly_club_fee: 10000,
        equipment_cost: 55000,
        camp_cost: 140000,
        travel_cost: 60000
      },
      living_costs: {
        dorm_fee: 35000,
        meal_cost: 20000,
        commute_cost: 6000
      },
      total_annual_cost: 1700000
    },
  
    reviews: {
      student_reviews: [
        {
          grade: "4年生",
          position: "FW", 
          review: "田中監督の指導でフィジカルが格段に向上しました。九州のサッカー環境は本当に良く、地域の方々に愛されているのを感じます。将来は地元で指導者になりたいです。",
          rating: 4.2
        },
        {
          grade: "2年生",
          position: "DF",
          review: "関東や関西に比べて費用が安く、家族の負担も少ないのが助かります。それでいて質の高い指導を受けられ、九州のJクラブからもスカウトが来ます。",
          rating: 4.0
        }
      ],
      parent_reviews: [
        {
          review: "費用が抑えられ、それでいて質の高い教育とサッカー指導を受けられるのは本当にありがたいです。地域に根ざした活動で人間性も育ててもらっています。",
          rating: 4.3
        }
      ],
      graduate_reviews: [
        {
          graduation_year: 2023,
          current_status: "地元高校教員",
          review: "現在は福岡の高校で体育教員をしながら、サッカー部の指導をしています。大学で学んだ指導法が現場で活かされています。"
        }
      ]
    },
  
    extended_data: {
      recommend_ratio: "約65%",
      selection_details: "11月と1月に実施。九州各県で地方開催の選考会も実施。約40名から10名程度を選抜。",
      scholarship_details: "スポーツ特待生制度あり。九州地区の学生には特別な減免制度も。",
      dorm_features: "キャンパスから徒歩15分の場所に位置。基本的に2人部屋で、自炊中心の生活。",
      training_facilities: "スポーツ科学部と連携した体力測定施設、リハビリ室あり。",
      career_paths: [
        { category: "Jリーグ関連", percentage: 5 },
        { category: "指導者・教員", percentage: 45 },
        { category: "一般企業", percentage: 50 }
      ],
      playmaker_comment: "福岡大学サッカー部は九州地区の大学サッカーの中心的存在で、費用面でも関東・関西の大学より抑えられているのが魅力。地域密着型の活動も盛んで、将来九州で指導者を目指す選手に最適な環境です。"
    }
  },
  {
    id: 8,
    university_name: "立命館大学",
    homepage_url: "https://www.ritsumei.ac.jp/",
    main_faculties: ["スポーツ健康科学部", "経済学部", "国際関係学部"],
    location: "滋賀県草津市（びわこ・くさつキャンパス）",
    
    soccer_club: {
      league: "関西学生サッカーリーグ1部",
      coach_name: "高橋義和",
      total_members: 80,
      j_league_nominees_2022_24: 4,
      denso_cup_2024_25: 1,
      soccer_field_count: 1,
      dorm_available: false,
      facility_note: "人工芝1面、ナイター設備あり",
      practice_location: "びわこ・くさつキャンパス（BKC）グラウンド",
      sports_scholarship: true,
      qualifications: ["JFA公認コーチングライセンス", "教員免許（保健体育）", "スポーツマネジメント関連資格"]
    },
    
    entry_conditions: {
      sports_recommend: true,
      recommend_criteria: "評定3.2以上、受入人数15名程度",
      selection: false,
      selection_period: "",
      general_admission: true,
      general_conditions: "一般入試合格者は練習参加可"
    },
    
    key_features: [
      "国際経験が積める環境",
      "海外遠征・交流試合", 
      "グローバル人材育成",
      "年間費用約210万円"
    ],
    
    team_philosophy: "戦術的なサッカーと国際的視野の育成。高橋義和監督のもと、海外チームとの交流を通じた幅広い経験を重視。",
    
    suitable_players: [
      "国際的な経験を積みたい選手",
      "語学力を伸ばしたい選手", 
      "海外でのプレーに興味がある選手",
      "グローバル企業への就職を考えている選手"
    ],
  
    costs: {
      university_costs: {
        annual_tuition: 1080000,
        entrance_fee: 270000,
        facility_fee: 120000
      },
      soccer_club_costs: {
        monthly_club_fee: 12000,
        equipment_cost: 65000,
        camp_cost: 200000,
        travel_cost: 120000
      },
      living_costs: {
        dorm_fee: 0,
        meal_cost: 35000,
        commute_cost: 10000
      },
      total_annual_cost: 2100000
    },
  
    reviews: {
      student_reviews: [
        {
          grade: "3年生",
          position: "MF", 
          review: "海外チームとの交流試合や遠征は本当に貴重な経験です。英語も上達し、国際的な視野が広がりました。将来は海外で働きたいです。",
          rating: 4.4
        },
        {
          grade: "4年生",
          position: "DF",
          review: "立命館の国際的な環境で学べたことが就職活動で評価されました。グローバル企業からも内定をいただけました。",
          rating: 4.2
        }
      ],
      parent_reviews: [
        {
          review: "国際的な経験を積める環境で、語学力も向上し、将来への選択肢が広がりました。グローバル社会で活躍できる人材に育ってくれています。",
          rating: 4.4
        }
      ],
      graduate_reviews: [
        {
          graduation_year: 2023,
          current_status: "外資系企業勤務",
          review: "現在は外資系企業で海外との調整業務を担当しています。立命館で培った国際感覚と語学力が直接仕事に活かされています。"
        }
      ]
    },
  
    extended_data: {
      recommend_ratio: "約60%",
      selection_details: "12月に実施。海外での遠征・合宿にも参加できる選手を重視した選考。",
      scholarship_details: "グローバルアスリート制度あり。成績優秀者には学費減免制度も。",
      dorm_features: "キャンパス周辺に部員が集まって住む文化あり。国際寮との交流も盛ん。",
      training_facilities: "最新の映像分析設備、スポーツ科学研究施設、国際交流施設完備。",
      career_paths: [
        { category: "Jリーグ関連", percentage: 5 },
        { category: "指導者・教員", percentage: 25 },
        { category: "一般企業・国際関連", percentage: 70 }
      ],
      playmaker_comment: "立命館大学サッカー部は、国際交流プログラムを特色とした特徴的なチームです。海外チームとの交流試合や合宿を通じて国際的な視野を持った選手の育成に力を入れており、グローバル社会で活躍したい選手に最適な環境です。"
    }
  },
  {
    id: 9,
    university_name: "青山学院大学",
    homepage_url: "https://www.aoyama.ac.jp/",
    main_faculties: ["教育人間科学部", "経営学部", "文学部"],
    location: "東京都世田谷区",
    
    soccer_club: {
      league: "関東大学サッカーリーグ2部",
      coach_name: "松本二郎",
      total_members: 65,
      j_league_nominees_2022_24: 2,
      denso_cup_2024_25: 0,
      soccer_field_count: 1,
      dorm_available: false,
      facility_note: "人工芝1面（共用）",
      practice_location: "相模原キャンパスグラウンド",
      sports_scholarship: true,
      qualifications: ["教員免許（保健体育）", "スポーツビジネス関連資格"]
    },
    
    entry_conditions: {
      sports_recommend: true,
      recommend_criteria: "評定3.5以上、受入人数8名程度",
      selection: true,
      selection_period: "12月上旬",
      general_admission: true,
      general_conditions: "一般入試合格者は練習参加後に審査"
    },
    
    key_features: [
      "文武両道の伝統校",
      "優秀な就職実績", 
      "おしゃれなキャンパスライフ",
      "年間費用約190万円"
    ],
    
    team_philosophy: "文武両道を重視した人間形成。松本二郎監督のもと、技術と知性を融合させたインテリジェントなサッカーを展開。",
    
    suitable_players: [
      "文武両道を目指している選手",
      "一流企業への就職を考えている選手", 
      "東京でのキャンパスライフを楽しみたい選手",
      "人間的成長を重視する選手"
    ],
  
    costs: {
      university_costs: {
        annual_tuition: 1000000,
        entrance_fee: 250000,
        facility_fee: 100000
      },
      soccer_club_costs: {
        monthly_club_fee: 10000,
        equipment_cost: 60000,
        camp_cost: 120000,
        travel_cost: 70000
      },
      living_costs: {
        dorm_fee: 0,
        meal_cost: 40000,
        commute_cost: 15000
      },
      total_annual_cost: 1900000
    },
  
    reviews: {
      student_reviews: [
        {
          grade: "4年生",
          position: "MF", 
          review: "松本監督の指導は人間性を重視していて、サッカーを通じて本当に成長できました。就職活動でも青学ブランドと部活動の経験が評価されました。",
          rating: 4.3
        },
        {
          grade: "3年生",
          position: "DF",
          review: "2部リーグですが、だからこそ一人一人が大切にされ、しっかりと指導してもらえます。勉強との両立もしやすい環境です。",
          rating: 4.1
        }
      ],
      parent_reviews: [
        {
          review: "文武両道の校風で、人間的にも大きく成長してくれています。就職実績も良く、将来への安心感があります。",
          rating: 4.4
        }
      ],
      graduate_reviews: [
        {
          graduation_year: 2023,
          current_status: "大手商社勤務",
          review: "現在は商社で海外営業を担当しています。青学で学んだコミュニケーション能力とリーダーシップが仕事で活かされています。"
        }
      ]
    },
  
    extended_data: {
      recommend_ratio: "約50%",
      selection_details: "12月に実施。学力も重視した総合評価で選考。約30名から8名程度を選抜。",
      scholarship_details: "スポーツ推薦入学者向け奨学金制度あり。成績優秀者には学費減免も。",
      dorm_features: "一般学生向けの学生寮あり。キャンパス周辺にアパートも豊富。",
      training_facilities: "一般学生と共用のトレーニング施設、ビデオ分析室あり。",
      career_paths: [
        { category: "Jリーグ関連", percentage: 2 },
        { category: "指導者・教員", percentage: 30 },
        { category: "一般企業", percentage: 68 }
      ],
      playmaker_comment: "青山学院大学サッカー部は「文武両道」を掲げる伝統校で、技術と知性を重視したサッカーを展開しています。2部リーグですが、だからこそ一人一人が大切にされ、人間的成長と高い就職実績が魅力です。"
    }
  },
  {
    id: 10,
    university_name: "名古屋大学",
    homepage_url: "https://www.nagoya-u.ac.jp/",
    main_faculties: ["教育学部", "経済学部", "情報学部"],
    location: "愛知県名古屋市",
    
    soccer_club: {
      league: "東海学生サッカーリーグ1部",
      coach_name: "佐藤健一",
      total_members: 60,
      j_league_nominees_2022_24: 2,
      denso_cup_2024_25: 0,
      soccer_field_count: 1,
      dorm_available: false,
      facility_note: "人工芝1面（共用）",
      practice_location: "東山キャンパスグラウンド",
      sports_scholarship: false,
      qualifications: ["教員免許（保健体育）", "審判資格"]
    },
    
    entry_conditions: {
      sports_recommend: false,
      recommend_criteria: "",
      selection: true,
      selection_period: "4月上旬（入学後）",
      general_admission: true,
      general_conditions: "入学後の技術テストあり"
    },
    
    key_features: [
      "国立大学・学費安い",
      "中部地区トップレベル", 
      "研究・学業重視",
      "年間費用約100万円"
    ],
    
    team_philosophy: "学業と競技の両立を重視した文武両道。佐藤健一監督のもと、限られた時間で効率的な成長を目指す。",
    
    suitable_players: [
      "学費を抑えたい選手",
      "研究職・公務員を目指している選手", 
      "中部地区でプレーしたい選手",
      "学業を最優先にしたい選手"
    ],
  
    costs: {
      university_costs: {
        annual_tuition: 535800,
        entrance_fee: 282000,
        facility_fee: 0
      },
      soccer_club_costs: {
        monthly_club_fee: 8000,
        equipment_cost: 50000,
        camp_cost: 100000,
        travel_cost: 50000
      },
      living_costs: {
        dorm_fee: 0,
        meal_cost: 30000,
        commute_cost: 8000
      },
      total_annual_cost: 1000000
    },
  
    reviews: {
      student_reviews: [
        {
          grade: "4年生",
          position: "MF", 
          review: "国立大学なので学費が安く、家計の負担が少ないのが助かります。佐藤監督の指導は効率的で、限られた時間でも成長できました。大学院進学も考えています。",
          rating: 4.0
        },
        {
          grade: "3年生",
          position: "DF",
          review: "一般入試で入学しましたが、技術テストで部に入れました。学業とサッカーの両立は大変ですが、やりがいがあります。",
          rating: 3.9
        }
      ],
      parent_reviews: [
        {
          review: "国立大学で学費が安く、それでいて質の高い教育を受けられるのは本当にありがたいです。サッカー部も文武両道で安心して任せられます。",
          rating: 4.2
        }
      ],
      graduate_reviews: [
        {
          graduation_year: 2023,
          current_status: "中学校教員",
          review: "現在は名古屋市内の中学校で数学教員をしながら、サッカー部の顧問をしています。大学での経験が現場で活かされています。"
        }
      ]
    },
  
    extended_data: {
      recommend_ratio: "約20%",
      selection_details: "4月入学後に実施。技術テストと体力測定、面接による総合評価。学力も重視。",
      scholarship_details: "特別な奨学金制度はないが、一般の大学奨学金制度を利用可能。",
      dorm_features: "一般学生向けの学生寮あり。キャンパス周辺にアパートも多数。",
      training_facilities: "一般学生と共用の体育施設、地域連携トレーニングセンターあり。",
      career_paths: [
        { category: "Jリーグ関連", percentage: 2 },
        { category: "指導者・教員", percentage: 45 },
        { category: "一般企業・研究職", percentage: 53 }
      ],
      playmaker_comment: "名古屋大学サッカー部は、国立大学としての学術的特色と競技の両立を重視するチームです。学費の安さと、中部地区では国立大学としてトップレベルの成績が魅力。特に教員や研究職を目指す学生に最適な環境です。"
    }
  },
  {
    id: 11,
    university_name: "慶應義塾大学",
    homepage_url: "https://www.keio.ac.jp/",
    main_faculties: ["体育研究所", "経済学部", "理工学部"],
    location: "神奈川県横浜市（日吉キャンパス）",
    
    soccer_club: {
      league: "関東大学サッカーリーグ2部",
      coach_name: "木村和司",
      total_members: 70,
      j_league_nominees_2022_24: 3,
      denso_cup_2024_25: 1,
      soccer_field_count: 1,
      dorm_available: false,
      facility_note: "人工芝1面（共用）、日吉キャンパス内に位置",
      practice_location: "日吉キャンパスグラウンド",
      sports_scholarship: false,
      qualifications: ["スポーツビジネス関連資格", "審判資格"]
    },
    
    entry_conditions: {
      sports_recommend: false,
      recommend_criteria: "",
      selection: true,
      selection_period: "4月上旬（入学後）",
      general_admission: true,
      general_conditions: "入学後の技術テストで選抜"
    },
    
    key_features: [
      "進学校としての文武両道",
      "最高レベルの就職実績", 
      "エリートネットワーク",
      "年間費用約200万円"
    ],
    
    team_philosophy: "知性を活かした戦術的サッカー。木村和司監督のもと、限られた環境で最大の成果を追求する効率的なトレーニング。",
    
    suitable_players: [
      "一流企業・金融機関への就職を考えている選手",
      "学業を最優先にしたい選手", 
      "エリートネットワークを築きたい選手",
      "知的なサッカーを学びたい選手"
    ],
  
    costs: {
      university_costs: {
        annual_tuition: 1100000,
        entrance_fee: 280000,
        facility_fee: 110000
      },
      soccer_club_costs: {
        monthly_club_fee: 8000,
        equipment_cost: 55000,
        camp_cost: 100000,
        travel_cost: 60000
      },
      living_costs: {
        dorm_fee: 0,
        meal_cost: 40000,
        commute_cost: 12000
      },
      total_annual_cost: 2000000
    },
  
    reviews: {
      student_reviews: [
        {
          grade: "4年生",
          position: "MF", 
          review: "木村監督の戦術指導は非常に論理的で、知的なサッカーを学べました。就職活動では慶應のブランドとサッカー部での経験が高く評価されました。",
          rating: 4.5
        },
        {
          grade: "3年生",
          position: "DF",
          review: "一般入試で入学後、技術テストでサッカー部に入りました。レベルの高い仲間と切磋琢磨でき、人間的にも成長できています。",
          rating: 4.2
        }
      ],
      parent_reviews: [
        {
          review: "慶應のブランドと文武両道の教育で、将来への安心感があります。就職実績は抜群で、一流企業への道筋が見えています。",
          rating: 4.6
        }
      ],
      graduate_reviews: [
        {
          graduation_year: 2022,
          current_status: "大手銀行勤務",
          review: "現在は大手銀行で法人営業を担当しています。慶應のOBネットワークとサッカー部での経験が仕事で大いに活かされています。"
        }
      ]
    },
  
    extended_data: {
      recommend_ratio: "約20%",
      selection_details: "4月入学後に実施。技術テストと体力測定、面接による総合評価。学力が最重要。",
      scholarship_details: "特別な体育奨学金制度はないが、成績優秀者には一般奨学金制度あり。",
      dorm_features: "一般学生向けの学生寮あり。キャンパス周辺は住環境良好。",
      training_facilities: "一般学生と共用の体育施設、映像分析室あり。",
      career_paths: [
        { category: "Jリーグ関連", percentage: 2 },
        { category: "指導者・教員", percentage: 15 },
        { category: "一般企業・金融界", percentage: 83 }
      ],
      playmaker_comment: "慶應義塾大学サッカー部は「文武両道」の精神を重んじ、学業とサッカーの高いレベルでの両立を目指しています。2部リーグですが、最高レベルの就職実績とエリートネットワークが最大の魅力です。"
    }
  },
  {
    id: 12,
    university_name: "日本体育大学",
    homepage_url: "https://www.nittai.ac.jp/",
    main_faculties: ["体育学部", "児童スポーツ教育学部"],
    location: "神奈川県横浜市",
    
    soccer_club: {
      league: "関東大学サッカーリーグ1部",
      coach_name: "北澤豪",
      total_members: 85,
      j_league_nominees_2022_24: 7,
      denso_cup_2024_25: 3,
      soccer_field_count: 2,
      dorm_available: true,
      facility_note: "人工芝1面、天然芝1面、専用トレーニング施設あり",
      practice_location: "横浜・健志台キャンパスグラウンド",
      sports_scholarship: true,
      qualifications: ["JFA公認コーチングライセンス", "教員免許（保健体育）", "アスレティックトレーナー資格"]
    },
    
    entry_conditions: {
      sports_recommend: true,
      recommend_criteria: "評定3.0以上、受入人数25名程度",
      selection: true,
      selection_period: "11月中旬・1月中旬・2月下旬",
      general_admission: false,
      general_conditions: "推薦入試中心"
    },
    
    key_features: [
      "体育系最高峰の設備",
      "指導者育成に特化", 
      "Jリーグ輩出実績豊富",
      "年間費用約200万円"
    ],
    
    team_philosophy: "体育・スポーツの専門性を活かした総合的な選手育成。北澤豪監督のもと、競技力向上と指導者としての資質を同時に育成。",
    
    suitable_players: [
      "将来指導者を目指している選手",
      "体育教員になりたい選手", 
      "最高峰の体育系環境でプレーしたい選手",
      "Jリーグを目指している選手"
    ],
  
    costs: {
      university_costs: {
        annual_tuition: 1000000,
        entrance_fee: 250000,
        facility_fee: 120000
      },
      soccer_club_costs: {
        monthly_club_fee: 12000,
        equipment_cost: 70000,
        camp_cost: 160000,
        travel_cost: 80000
      },
      living_costs: {
        dorm_fee: 40000,
        meal_cost: 22000,
        commute_cost: 5000
      },
      total_annual_cost: 2000000
    },
  
    reviews: {
      student_reviews: [
        {
          grade: "4年生",
          position: "FW", 
          review: "北澤監督の指導は本当に熱く、プロを目指すには最高の環境です。同時に指導者としての勉強もでき、将来への準備も万全です。",
          rating: 4.7
        },
        {
          grade: "2年生",
          position: "MF",
          review: "体育系大学の最高峰だけあって、設備も指導も素晴らしいです。教員免許取得のサポートも手厚く、将来への不安がありません。",
          rating: 4.5
        }
      ],
      parent_reviews: [
        {
          review: "体育・スポーツの専門教育を受けながら、高いレベルでサッカーができる環境は他にありません。指導者としての道筋も明確で安心です。",
          rating: 4.6
        }
      ],
      graduate_reviews: [
        {
          graduation_year: 2023,
          current_status: "高校教員・サッカー部監督",
          review: "現在は高校で体育教員をしながら、サッカー部の監督をしています。日体大で学んだ指導法と専門知識が現場で直接活かされています。"
        }
      ]
    },
  
    extended_data: {
      recommend_ratio: "約80%",
      selection_details: "11月、1月、2月に実施。全国各地で選考会を開催。約100名の参加者から25名程度を選抜。",
      scholarship_details: "充実したスポーツ特待生制度あり。競技成績による全額免除から半額免除まで。",
      dorm_features: "キャンパスから徒歩5分の場所に位置。2人部屋制で、栄養管理された食事を提供。",
      training_facilities: "最新設備を備えたトレーニングジム、パフォーマンス分析ラボ、リハビリ施設あり。",
      career_paths: [
        { category: "Jリーグ関連", percentage: 10 },
        { category: "指導者・教員", percentage: 70 },
        { category: "一般企業・スポーツ関連", percentage: 20 }
      ],
      playmaker_comment: "日本体育大学サッカー部は、体育系大学の最高峰として知られ、競技力向上と指導者育成を両立した唯一無二の環境です。最新の設備と専門的な指導により、Jリーガーと指導者の両方を輩出し続けています。"
    }
  }
];

// 7. 便利な検索ヘルパー関数
export const searchHelpers = {
  // 地域判定の簡素化
  regionMapping: {
    "関東": ["早稲田", "慶應", "明治", "法政", "青山", "筑波", "順天堂", "日本体育"],
    "関西": ["関西学院", "立命館"],
    "中部": ["名古屋"],
    "九州・沖縄": ["福岡"]
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