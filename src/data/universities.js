// 大学のサンプルデータ
const universities = [
    {
      id: 1,
      university_name: "早稲田大学",
      homepage_url: "https://www.waseda.jp/",
      main_faculties: ["スポーツ科学部", "商学部", "政治経済学部"],
      soccer_club: {
        league: "関東大学サッカーリーグ1部",
        coach_name: "李忠成",
        total_members: 95,
        members_by_grade: { "1年": 30, "2年": 25, "3年": 20, "4年": 20 },
        j_league_nominees_2022_24: 12,
        denso_cup_2024_25: 5,
        soccer_field_count: 3,
        dorm_available: true,
        facility_note: "人工芝2面、天然芝1面、ナイター設備あり",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "スポーツトレーナー資格", "審判資格"],
        qualification_note: "JFA公認コーチングライセンス取得サポート、学内トレーニング施設での実習あり"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.5以上、受入人数20名程度",
        selection: true,
        selection_period: "12月上旬・2月下旬",
        general_admission: true,
        general_conditions: "オープン練習参加後、部内テスト実施"
      }
    },
    {
      id: 2,
      university_name: "筑波大学",
      homepage_url: "https://www.tsukuba.ac.jp/",
      main_faculties: ["体育専門学群", "人文社会系", "理工学群"],
      soccer_club: {
        league: "関東大学サッカーリーグ1部",
        coach_name: "中山雅史",
        total_members: 80,
        members_by_grade: { "1年": 25, "2年": 20, "3年": 18, "4年": 17 },
        j_league_nominees_2022_24: 10,
        denso_cup_2024_25: 4,
        soccer_field_count: 2,
        dorm_available: true,
        facility_note: "人工芝1面、天然芝1面、室内練習場あり",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "教員免許（保健体育）", "スポーツ医科学関連資格", "審判資格"],
        qualification_note: "教員免許（保健体育）取得可能、JFA公認コーチングライセンス講習会を定期開催"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.2以上、受入人数15名程度",
        selection: true,
        selection_period: "11月中旬・1月下旬",
        general_admission: true,
        general_conditions: "一般入試合格者は選考あり"
      }
    },
    {
      id: 3,
      university_name: "明治大学",
      homepage_url: "https://www.meiji.ac.jp/",
      main_faculties: ["商学部", "政治経済学部", "文学部"],
      soccer_club: {
        league: "関東大学サッカーリーグ1部",
        coach_name: "浜野征哉",
        total_members: 90,
        members_by_grade: { "1年": 28, "2年": 22, "3年": 21, "4年": 19 },
        j_league_nominees_2022_24: 8,
        denso_cup_2024_25: 3,
        soccer_field_count: 2,
        dorm_available: true,
        facility_note: "人工芝2面、ナイター設備あり",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "スポーツビジネス関連資格", "審判資格"],
        qualification_note: "JFA公認コーチングライセンス取得サポート、スポーツビジネス講座開催"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.3以上、受入人数18名程度",
        selection: true,
        selection_period: "12月中旬・2月中旬",
        general_admission: true,
        general_conditions: "入学後のセレクションあり"
      }
    },
    {
      id: 4,
      university_name: "法政大学",
      homepage_url: "https://www.hosei.ac.jp/",
      main_faculties: ["スポーツ健康学部", "経済学部", "社会学部"],
      soccer_club: {
        league: "関東大学サッカーリーグ1部",
        coach_name: "山口素弘",
        total_members: 85,
        members_by_grade: { "1年": 26, "2年": 21, "3年": 20, "4年": 18 },
        j_league_nominees_2022_24: 7,
        denso_cup_2024_25: 2,
        soccer_field_count: 1,
        dorm_available: false,
        facility_note: "人工芝1面、ナイター設備あり",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "スポーツトレーナー資格", "教員免許（保健体育）"],
        qualification_note: "JFA公認コーチングライセンス取得可能、学部と連携した実践的なトレーナー実習あり"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.4以上、受入人数15名程度",
        selection: true,
        selection_period: "11月下旬・2月上旬",
        general_admission: false,
        general_conditions: "一般入試合格者は技術テストあり"
      }
    },
    {
      id: 5,
      university_name: "東海大学",
      homepage_url: "https://www.u-tokai.ac.jp/",
      main_faculties: ["体育学部", "文学部", "工学部"],
      soccer_club: {
        league: "関東大学サッカーリーグ1部",
        coach_name: "藤田俊哉",
        total_members: 75,
        members_by_grade: { "1年": 22, "2年": 19, "3年": 18, "4年": 16 },
        j_league_nominees_2022_24: 6,
        denso_cup_2024_25: 2,
        soccer_field_count: 2,
        dorm_available: true,
        facility_note: "人工芝1面、天然芝1面",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "スポーツ栄養士", "教員免許（保健体育）", "審判資格"],
        qualification_note: "JFA公認コーチングライセンス取得サポート、体育学部と連携した栄養管理プログラムあり"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.0以上、受入人数20名程度",
        selection: true,
        selection_period: "12月上旬・1月下旬",
        general_admission: true,
        general_conditions: "一般入試合格後、技術テストあり"
      }
    },
    {
      id: 6,
      university_name: "順天堂大学",
      homepage_url: "https://www.juntendo.ac.jp/",
      main_faculties: ["スポーツ健康科学部", "医学部", "保健医療学部"],
      soccer_club: {
        league: "関東大学サッカーリーグ1部",
        coach_name: "伊藤彰",
        total_members: 70,
        members_by_grade: { "1年": 20, "2年": 18, "3年": 17, "4年": 15 },
        j_league_nominees_2022_24: 5,
        denso_cup_2024_25: 1,
        soccer_field_count: 1,
        dorm_available: false,
        facility_note: "人工芝1面、ナイター設備あり",
        sports_scholarship: true,
        qualifications: ["アスレティックトレーナー資格", "スポーツ医科学関連資格", "スポーツ栄養士"],
        qualification_note: "アスレティックトレーナー資格取得サポート、医学部との連携プログラムあり"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.5以上、受入人数12名程度",
        selection: true,
        selection_period: "11月中旬・1月中旬",
        general_admission: false,
        general_conditions: "推薦・AO入試のみ"
      }
    },
    {
      id: 7,
      university_name: "関西学院大学",
      homepage_url: "https://www.kwansei.ac.jp/",
      main_faculties: ["総合政策学部", "商学部", "人間福祉学部"],
      soccer_club: {
        league: "関西学生サッカーリーグ1部",
        coach_name: "井上一徳",
        total_members: 85,
        members_by_grade: { "1年": 25, "2年": 22, "3年": 20, "4年": 18 },
        j_league_nominees_2022_24: 7,
        denso_cup_2024_25: 3,
        soccer_field_count: 2,
        dorm_available: true,
        facility_note: "人工芝1面、天然芝1面、ナイター設備あり",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "教員免許（保健体育）", "スポーツビジネス関連資格", "審判資格"],
        qualification_note: "JFA公認コーチングライセンス取得サポート、人間福祉学部と連携したカリキュラムあり"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.3以上、受入人数15名程度",
        selection: true,
        selection_period: "12月中旬・2月上旬",
        general_admission: true,
        general_conditions: "一般入試合格者は技術テストあり"
      }
    },
    {
      id: 8,
      university_name: "福岡大学",
      homepage_url: "https://www.fukuoka-u.ac.jp/",
      main_faculties: ["スポーツ科学部", "商学部", "経済学部"],
      soccer_club: {
        league: "九州大学サッカーリーグ1部",
        coach_name: "田中佑一",
        total_members: 65,
        members_by_grade: { "1年": 18, "2年": 17, "3年": 16, "4年": 14 },
        j_league_nominees_2022_24: 4,
        denso_cup_2024_25: 1,
        soccer_field_count: 1,
        dorm_available: true,
        facility_note: "人工芝1面",
        sports_scholarship: true,
        qualifications: ["JFA公認コーチングライセンス", "スポーツトレーナー資格", "教員免許（保健体育）"],
        qualification_note: "JFA公認指導者ライセンス取得可能、スポーツ科学部との連携プログラムあり"
      },
      entry_conditions: {
        sports_recommend: true,
        recommend_criteria: "評定3.2以上、受入人数10名程度",
        selection: true,
        selection_period: "11月下旬・1月下旬",
        general_admission: true,
        general_conditions: "入学後のセレクションあり"
      }
    }
  ];
  
  export default universities;