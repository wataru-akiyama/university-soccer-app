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
      ]
    }
  };
  
  export default universityExtendedData;