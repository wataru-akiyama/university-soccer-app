// src/data/universityExtendedData.js
// 大学詳細ページで使用する拡張データ

const universityExtendedData = {
    1: { // 早稲田大学
      location: "東京都新宿区",
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
      playmakerComment: "早稲田大学サッカー部は、首都圏でトップクラスの実績を持ち、多くのJリーガーを輩出している名門です。特に技術的な面での評価が高く、ボールポゼッションを重視したスタイルが特徴です。李忠成監督のもと、戦術理解度の高い選手の育成に力を入れており、プロ志向の選手にとって理想的な環境が整っています。スポーツ推薦制度も充実しており、高校時代の実績があれば進学のチャンスがあります。また、学業面でも商学部や政治経済学部といった文系学部と、スポーツ科学部のような専門的な学びの場があり、進路の選択肢が広いのが魅力です。施設面では複数のグラウンドを有し、トレーニング環境も整備されています。キャンパスライフとサッカーを両立させたい学生にも、プロを目指す学生にも対応できる体制が魅力です。"
    },
    2: { // 筑波大学
      location: "茨城県つくば市",
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
      playmakerComment: "筑波大学サッカー部は、「体育専門学群」という特色ある教育環境の下、高いレベルの競技と学業の両立を実現している大学です。中山雅史監督の指導のもと、戦術的に洗練されたプレースタイルが特徴で、関東リーグでも常に上位の成績を収めています。Jリーグへの内定者も安定して輩出しており、特に鹿島アントラーズをはじめとする関東のクラブへの進路が目立ちます。体育教員を目指す選手も多く在籍しており、競技だけでなく指導者としてのキャリアパスも充実しています。施設面では茨城県つくば市の広大なキャンパス内に複数のグラウンドを有し、寮も完備されているため、地方からの入学者も安心して競技に打ち込める環境が整っています。スポーツ科学の研究も盛んで、最新のトレーニング方法や栄養管理を取り入れた科学的アプローチも特徴です。"
    },
    3: { // 明治大学
      location: "東京都千代田区",
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
      playmakerComment: "明治大学サッカー部は東京都心に位置し、関東リーグの強豪として知られています。浜野征哉監督の下、攻撃的なサッカーを志向し、テクニカルな選手が多く所属しています。施設面でも充実しており、専用寮を完備していることから全国各地から優秀な選手が集まってきます。特に神奈川県や埼玉県の強豪高校出身者が多く、高いレベルでの競争環境が整っています。スポーツ推薦制度も充実しており、競技と学業の両立がしやすい環境です。OB会の支援も厚く、Jリーグへの進路だけでなく、一般企業への就職サポートも手厚いのが特徴です。"
    },
    4: { // 法政大学
      location: "東京都千代田区",
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
      playmakerComment: "法政大学サッカー部はスポーツ健康学部を中心に、高いレベルの選手が集まる強豪校です。山口素弘監督のもと、規律あるサッカーと個人技術の向上に力を入れており、特にディフェンス組織力には定評があります。スポーツ健康学部との連携により、科学的なアプローチでのトレーニングも実施。教員免許取得を目指す選手も多く、指導者としてのキャリアパスも充実しています。都心に位置するため、練習環境は少し制約がありますが、効率的なトレーニングプログラムにより質の高い練習を実現しています。"
    },
    5: { // 東海大学
      location: "神奈川県平塚市",
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
      playmakerComment: "東海大学サッカー部は体育学部を中心とした強豪チームで、神奈川県平塚市の広大なキャンパスを拠点としています。藤田俊哉監督の下、フィジカルの強さと組織力を重視したサッカーが特徴です。天然芝と人工芝のグラウンドを有し、トレーニング環境も充実。体育会専用寮も完備され、全国各地から選手が集まっています。特に教員養成に力を入れており、卒業生の多くが体育教員として活躍しています。スポーツ科学の研究も盛んで、最新のトレーニング理論を取り入れた科学的なアプローチも魅力です。"
    },
    6: { // 順天堂大学
      location: "千葉県印西市（さくらキャンパス）",
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
      playmakerComment: "順天堂大学サッカー部は医学部を擁する大学としての特色を活かし、スポーツ医科学に基づいた科学的アプローチが最大の強みです。伊藤彰監督の下、戦術的な理解と個人技術の向上に重点を置いています。医学部との連携により、選手のコンディショニングやリハビリテーションには特に力を入れており、怪我の予防と早期復帰に関するサポート体制は他大学と比較しても群を抜いています。寮はありませんが、キャンパス周辺に部員向けの賃貸物件があり、チームメイト同士で生活する文化があります。スポーツトレーナーや理学療法士を目指す選手も多く、競技と専門知識の習得を両立できる環境が整っています。"
    },
    7: { // 関西学院大学
      location: "兵庫県西宮市",
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
      playmakerComment: "関西学院大学サッカー部は関西学生リーグの強豪として知られ、井上一徳監督の下、戦術的理解度の高いサッカーを展開しています。関西地区でトップクラスの施設を誇り、人工芝と天然芝の両方のグラウンドを所有。専用寮も完備されており、チームの結束力を高める環境が整っています。伝統的に関西圏の強豪高校から多くの選手が入部し、Jリーグへの輩出実績も豊富です。商学部や経済学部など文系学部が充実しており、就職実績も良好。OB会のサポートも厚く、競技と学業の両立、そして将来のキャリア構築まで見据えた環境が整っているのが特徴です。"
    },
    8: { // 福岡大学
      location: "福岡県福岡市",
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
      playmakerComment: "福岡大学サッカー部は九州地区の大学サッカーの中心的存在で、田中佑一監督の下、フィジカルを活かした力強いサッカーが持ち味です。九州リーグでは常に上位の成績を収め、全国大会でも一定の実績を残しています。スポーツ科学部を中心に、科学的なアプローチでのトレーニングも取り入れており、個々の選手の能力向上に力を入れています。九州各県の強豪高校から選手が集まり、特に福岡県と熊本県からの入部者が多いのが特徴。Jリーグへの輩出実績も一定数あり、特に九州地区のJクラブへの進路が目立ちます。地域密着型の活動も盛んで、地元サッカークラブでの指導経験を積む機会も提供しています。"
    },
    9: { // 立命館大学
      location: "滋賀県草津市（びわこ・くさつキャンパス）",
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
      playmakerComment: "立命館大学サッカー部は、国際交流プログラムを特色とした特徴的なチームです。高橋義和監督の下、戦術的なサッカーと個人の技術向上に重点を置いています。毎年、海外チームとの交流試合や合宿を実施し、国際的な視野を持った選手の育成に力を入れているのが特徴です。スポーツ健康科学部を中心に、科学的なアプローチでのトレーニングも導入しています。施設面では人工芝のグラウンドを完備し、ナイター設備も整っています。寮はありませんが、キャンパス周辺に部員が集まって住む文化があり、チームの結束力を高めています。就職実績も良好で、特にグローバル企業への就職者が多いのも特徴です。"
    },
    10: { // 青山学院大学
      location: "東京都世田谷区",
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
      playmakerComment: "青山学院大学サッカー部は「文武両道」を掲げる伝統校で、松本二郎監督の下、技術と知性を重視したサッカーを展開しています。関東2部リーグに所属し、1部昇格を目指して日々練習に励んでいます。練習環境は一般学生との共用施設が中心ですが、効率的なトレーニングプログラムにより質の高い練習を実現。特に教育学部の選手が多く、将来教員を目指す学生にとって理想的な環境を提供しています。就職実績も非常に高く、競技と学業の両立を重視する文化があります。サッカーを通じた人間形成に重点を置き、リーダーシップやコミュニケーション能力の向上も図っています。Jリーガーの輩出は少ないものの、社会で活躍する人材を多数輩出している点が特徴です。"
    },
    11: { // 名古屋大学
      location: "愛知県名古屋市",
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
      playmakerComment: "名古屋大学サッカー部は、国立大学としての学術的特色と競技の両立を重視するチームです。佐藤健一監督の下、戦術的理解と個々の技術向上に焦点を当てています。東海リーグ1部に所属し、中部地区では国立大学としてトップレベルの成績を維持しています。スポーツ推薦制度はありませんが、入学後のセレクションによって優秀な選手を発掘する取り組みを行っています。練習環境は一般学生との共用施設が中心ですが、効率的なトレーニング計画により質の高い練習を実施。教育学部を中心に、将来教員を目指す学生が多く所属しており、地域のサッカークラブでの指導経験を積む機会も提供しています。学業成績を重視する文化があり、卒業後は教育者や研究者として活躍する選手も多いのが特徴です。"
    },
    12: { // 中央大学
      location: "東京都八王子市",
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
      playmakerComment: "中央大学サッカー部は、関東リーグの強豪として知られる伝統校です。斎藤隆監督の下、組織的な守備と素早い攻撃切り替えに定評があります。法学部や経済学部など文系学部が強いという大学の特色から、将来のビジネスマンとしての素養も育む環境が整っています。練習施設も充実しており、人工芝のグラウンドやナイター設備、専用トレーニングルームを完備。体育会専用寮も用意されており、チームの結束力を高める環境が整っています。OB会のサポートも厚く、Jリーグへの輩出だけでなく、一般企業や法曹界への就職サポートも手厚いのが特徴です。競技と学業の両立を重視し、社会で活躍できる人材の育成に力を入れています。"
    },
    13: { // 慶應義塾大学
      location: "神奈川県横浜市（日吉キャンパス）",
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
      playmakerComment: "慶應義塾大学サッカー部は「文武両道」の精神を重んじ、学業とサッカーの高いレベルでの両立を目指しています。木村和司監督の下、知性を活かした戦術的なサッカーが特徴です。関東2部リーグに所属し、1部復帰を目標に日々練習に励んでいます。スポーツ推薦制度はなく、一般入試で入学した学生が中心となって活動しています。練習環境は他の強豪大学と比べると制約がありますが、効率的なトレーニングにより質の高い練習を実現。特に経済学部や法学部の学生が多く、卒業後は一流企業や金融機関への就職実績が非常に高いのが特徴です。OB会のネットワークも充実しており、キャリアサポートも手厚く行われています。Jリーガーの輩出は少ないものの、ビジネス界で活躍する人材を数多く輩出している名門です。"
    },
    14: { // 同志社大学
      location: "京都府京田辺市",
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
      playmakerComment: "同志社大学サッカー部は関西学生リーグの強豪として知られ、松井清隆監督の下、技術と組織力を重視したサッカーを展開しています。「スポーツと知性の調和」を理念に掲げ、競技と学業の両立を重視するカルチャーが根付いています。京田辺キャンパス内の人工芝グラウンドを拠点とし、ナイター設備も完備。サッカー部専用寮もあり、チームの結束力を高める環境が整っています。関西圏の強豪高校から多くの選手が入部し、京都サンガF.C.をはじめとする関西のJクラブへの輩出実績も豊富です。スポーツ健康科学部を中心に、将来指導者や教員を目指す学生も多く、教員採用率も高いのが特徴。OB会のサポートも手厚く、就職実績も良好で、競技力と人間力の両方を高める教育環境が魅力です。"
    },
    15: { // 日本体育大学
      location: "神奈川県横浜市",
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
      playmakerComment: "日本体育大学サッカー部は、体育系大学の最高峰として知られ、北澤豪監督の下、実績と伝統を誇るチームです。全国から集まったトップレベルの選手たちにより、高い技術と強靭なフィジカルを兼ね備えたサッカーを展開しています。施設環境は国内トップクラスで、人工芝と天然芝の両方のグラウンド、専用トレーニングルーム、最新の分析設備を完備。専用寮も用意されており、サッカーに集中できる環境が整っています。Jリーグへの選手輩出実績も豊富ですが、特に指導者養成に力を入れており、卒業生の多くが全国各地の学校やクラブチームで指導者として活躍しています。教員免許取得率も非常に高く、競技キャリア後の進路も安定しているのが特徴です。体育・スポーツ科学の専門教育と実践的な指導経験を積むことができ、将来の指導者を目指す学生にとって理想的な環境です。"
    },
    16: { // 大阪体育大学
      location: "大阪府泉南郡",
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
      playmakerComment: "大阪体育大学サッカー部は関西圏の体育系大学の雄として、西谷和弘監督の下、実践的な指導と最新のスポーツ科学を融合させたトレーニングを展開しています。関西学生リーグの強豪として、常に上位の成績を収めており、ガンバ大阪やセレッソ大阪といった関西のJクラブへの選手輩出も安定しています。施設面では人工芝と天然芝の両方のグラウンドを完備し、専用クラブハウスやトレーニング施設も充実。体育会専用寮も完備されており、サッカーに集中できる環境が整っています。特に教員養成に力を入れており、体育教員採用率は全国でもトップクラス。将来指導者を目指す学生にとって理想的な環境が整っています。スポーツ科学の研究施設と連携したデータ分析も導入しており、科学的アプローチによる選手育成も魅力の一つです。"
    },
    17: { // 流通経済大学
      location: "茨城県龍ケ崎市",
      field_type: "人工芝1面",
      night_training: "あり（ナイター設備完備）",
      other_facilities: "専用クラブハウス、映像分析室、リカバリー施設",
      dorm_type: "サッカー部専用寮",
      dorm_fee: "月額4.3万円程度（食事込み）",
      dorm_features: "キャンパスから徒歩10分の場所に位置。主に相部屋で、食堂完備。",
      training_facilities: "専用トレーニングルーム、鹿島アントラーズとの共同施設利用も可能。",
      high_school_trend: "関東圏と東北地方の強豪校出身者が中心。特に茨城県と宮城県からの入部者が多い。",
      recommend_ratio: "約70%",
      selection_details: "12月と2月に実施。約60名の参加者から18名程度を選抜。鹿島アントラーズスカウトも参加。",
      scholarship_details: "スポーツ特待生制度あり。競技成績による学費全額から半額免除まで。",
      tournament_results: [
        { tournament: "関東大学サッカーリーグ戦", year: "2023", achievement: "5位" },
        { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "ベスト16" }
      ],
      j_league_teams: ["鹿島アントラーズ", "水戸ホーリーホック", "柏レイソル"],
      career_paths: [
        { category: "Jリーグ関連", percentage: 7 },
        { category: "指導者・教員", percentage: 30 },
        { category: "一般企業", percentage: 63 }
      ],
      famous_alumni: [
        { name: "植田直通", initials: "NU", career: "日本代表、シャルケ04" },
        { name: "西大伍", initials: "DN", career: "元日本代表、鹿島アントラーズ" }
      ],
      playmakerComment: "流通経済大学サッカー部は、Jリーグクラブ・鹿島アントラーズとの強い連携関係を特徴とする大学です。岩政大樹監督の下、プロを目指す選手の育成に力を入れており、鹿島アントラーズへの選手供給も安定しています。茨城県龍ケ崎市に位置し、専用の人工芝グラウンドとナイター設備を完備。サッカー部専用寮も用意されており、サッカーに集中できる環境が整っています。鹿島アントラーズの練習施設を利用できる機会もあり、プロの環境に触れられるのも大きな魅力です。スポーツ健康科学部を中心に、競技力向上と並行してスポーツ指導者としての専門知識も習得可能。スポーツ推薦制度も充実しており、高校時代の実績があれば進学のチャンスがあります。特にフィジカルの強さと組織力のあるサッカーが特徴で、東日本の強豪校からの入部者が多いのも特徴です。"
    },
    18: { // 専修大学
      location: "神奈川県川崎市",
      field_type: "人工芝1面（共用）",
      night_training: "あり（限定的）",
      other_facilities: "大学体育館、映像分析室",
      dorm_type: "なし",
      dorm_fee: "-",
      dorm_features: "-",
      training_facilities: "一般学生と共用の体育施設、経営学部との連携によるデータ分析プログラム",
      high_school_trend: "関東圏の進学校出身者が中心。特に神奈川県と東京都からの入部者が多い。",
      recommend_ratio: "約55%",
      selection_details: "11月と1月に実施。約40名の参加者から12名程度を選抜。学力も考慮した総合評価。",
      scholarship_details: "スポーツ推薦入学者向け奨学金制度あり。成績優秀者には学費減免も。",
      tournament_results: [
        { tournament: "関東大学サッカーリーグ2部", year: "2023", achievement: "2位" },
        { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "関東予選敗退" }
      ],
      j_league_teams: ["川崎フロンターレ", "横浜FC"],
      career_paths: [
        { category: "Jリーグ関連", percentage: 3 },
        { category: "指導者・教員", percentage: 20 },
        { category: "一般企業・ビジネス界", percentage: 77 }
      ],
      famous_alumni: [
        { name: "田中隼磨", initials: "HT", career: "元Jリーガー、サガン鳥栖" },
        { name: "永井謙佑", initials: "KN", career: "元日本代表、FC東京" }
      ],
      playmakerComment: "専修大学サッカー部は「文武両道」を理念に掲げ、前田浩文監督の下、戦術理解と技術向上を重視したサッカーを展開しています。関東2部リーグに所属し、1部昇格を目指して日々練習に励んでいます。神奈川県川崎市に位置し、人工芝のグラウンドでの練習が中心ですが、一般学生との共用施設のため、時間的制約の中で効率的な練習を行っています。特に経営学部や商学部の学生が多く、ビジネス教育との両立を重視するカルチャーが根付いています。就職実績も非常に高く、OB会のネットワークを活かした就職サポートも充実。Jリーガーの輩出は少ないものの、ビジネス界で活躍する人材を多数輩出しているのが特徴です。経営学部との連携によるスポーツビジネス研究も行われており、将来スポーツ業界でのキャリアを目指す学生にも適した環境を提供しています。"
    },
    19: { // 北海道大学
      location: "北海道札幌市",
      field_type: "天然芝1面（共用）",
      night_training: "あり（限定的）",
      other_facilities: "室内練習場（冬季用）、大学体育館",
      dorm_type: "なし",
      dorm_fee: "-",
      dorm_features: "-",
      training_facilities: "一般学生と共用の体育施設、冬季用の室内練習場",
      high_school_trend: "北海道内の進学校出身者が中心。道内各地からバランスよく入部者がいる。",
      recommend_ratio: "約10%",
      selection_details: "4月入学後に実施。技術テストと体力測定、面接による総合評価。",
      scholarship_details: "特別な奨学金制度はないが、一般の大学奨学金制度を利用可能。",
      tournament_results: [
        { tournament: "北海道大学サッカーリーグ1部", year: "2023", achievement: "優勝" },
        { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "北海道予選優勝" }
      ],
      j_league_teams: ["北海道コンサドーレ札幌"],
      career_paths: [
        { category: "Jリーグ関連", percentage: 1 },
        { category: "指導者・教員", percentage: 30 },
        { category: "一般企業・研究職", percentage: 69 }
      ],
      famous_alumni: [
        { name: "伊藤翔", initials: "SI", career: "元Jリーガー、北海道コンサドーレ札幌" },
        { name: "宮坂政勝", initials: "MM", career: "北海道サッカー協会理事" }
      ],
      playmakerComment: "北海道大学サッカー部は、北海道を代表する国立大学として、斉藤嘉彦監督の下、学業と競技の高いレベルでの両立を目指しています。北海道大学サッカーリーグでは常に上位の成績を収め、総理大臣杯の北海道代表として全国大会にも出場しています。札幌市内のキャンパスを拠点とし、天然芝のグラウンドでの練習が中心ですが、冬季は積雪のため室内練習場での活動となります。この厳しい環境が、逆に創意工夫と効率的なトレーニングプログラムを生み出す原動力となっています。スポーツ推薦制度はなく、一般入試で入学した学生が中心となって活動。教育学部を中心に将来教員を目指す学生が多く、道内での教員採用率も高いのが特徴です。学業を重視するカルチャーがあり、卒業後は教育者や研究者、公務員として北海道内で活躍する選手が多いのも特徴的です。"
    },
    20: { // 九州産業大学
      location: "福岡県福岡市",
      field_type: "人工芝1面",
      night_training: "あり（ナイター設備完備）",
      other_facilities: "トレーニングルーム、分析室、リカバリールーム",
      dorm_type: "サッカー部専用寮",
      dorm_fee: "月額3.8万円程度（食事込み）",
      dorm_features: "キャンパスから徒歩15分の場所に位置。2人部屋が基本で、食堂完備。",
      training_facilities: "専用トレーニングルーム、地元Jクラブの施設利用も可能。",
      high_school_trend: "九州各県の強豪校出身者が中心。特に福岡県と熊本県からの入部者が多い。",
      recommend_ratio: "約65%",
      selection_details: "11月と2月に実施。九州各地で選考会も開催。約50名の参加者から15名程度を選抜。",
      scholarship_details: "スポーツ特待生制度あり。競技成績による学費全額から半額免除まで。",
      tournament_results: [
        { tournament: "九州大学サッカーリーグ戦", year: "2023", achievement: "2位" },
        { tournament: "総理大臣杯全日本大学サッカートーナメント", year: "2022", achievement: "九州代表" }
      ],
      j_league_teams: ["アビスパ福岡", "サガン鳥栖", "ギラヴァンツ北九州"],
      career_paths: [
        { category: "Jリーグ関連", percentage: 4 },
        { category: "指導者・教員", percentage: 35 },
        { category: "一般企業", percentage: 61 }
      ],
      famous_alumni: [
        { name: "永井雄一郎", initials: "YN", career: "元Jリーガー、アビスパ福岡" },
        { name: "藤本憲明", initials: "NF", career: "元Jリーガー、サガン鳥栖" }
      ],
      playmakerComment: "九州産業大学サッカー部は九州地区の私立大学では最高峰の実績を持つチームで、高原直泰監督の下、フィジカルとテクニックを兼ね備えたダイナミックなサッカーを展開しています。九州大学リーグでは常に上位の成績を収め、全国大会でも九州代表として活躍。福岡市内に位置し、人工芝のグラウンドとナイター設備を完備しています。サッカー部専用寮も用意されており、チームの結束力を高める環境が整っています。地元のJクラブであるアビスパ福岡との連携も強く、練習施設の共同利用やコーチングスタッフの交流も行われています。スポーツ健康科学部を中心に、競技力向上と並行して指導者としての専門知識も習得可能。スポーツ推薦制度も充実しており、九州地区を中心に全国から選手が集まっています。就職実績も良好で、特に九州地区での教員採用率が高いのも特徴です。"
    }
};
  
export default universityExtendedData;