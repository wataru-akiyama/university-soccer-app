// 大学とサッカー志向の対応データ
const universityAspirations = {
    1: { // 早稲田大学
      aspirations: ['pro', 'improve'],
      studyRecommendations: [
        'コーチング・指導法',
        'スポーツビジネス',
        'トレーニング科学'
      ],
      aspirationDescription: {
        pro: '過去のJリーグ内定者数が多く、プロを目指す選手に最適な環境があります。施設も充実しており、一流のコーチ陣から指導を受けられます。',
        improve: '高いレベルの練習環境と充実した設備で、競技力向上を目指す選手に最適です。'
      }
    },
    2: { // 筑波大学
      aspirations: ['pro', 'improve', 'support'],
      studyRecommendations: [
        '教員養成（保健体育）',
        'コーチング・指導法',
        'スポーツ医学'
      ],
      aspirationDescription: {
        pro: 'Jリーグへの内定実績が豊富で、国際大会に出場する選手も多数輩出しています。',
        improve: '体育専門学群と連携した科学的アプローチによる競技力向上を目指せます。',
        support: '体育教員や指導者を目指す学生にも最適な環境と学びを提供しています。'
      }
    },
    3: { // 明治大学
      aspirations: ['pro', 'improve', 'experience'],
      studyRecommendations: [
        'スポーツビジネス',
        'スポーツマネジメント'
      ],
      aspirationDescription: {
        pro: 'Jリーグ入りを果たした卒業生も多く、プロを目指す環境が整っています。',
        improve: '高いレベルのリーグで実践的な経験を積むことができます。',
        experience: '学生主体の活動も盛んで、サッカーを通じた多様な経験が可能です。'
      }
    },
    4: { // 法政大学
      aspirations: ['pro', 'improve', 'support'],
      studyRecommendations: [
        '教員養成（保健体育）',
        'トレーニング科学',
        'コーチング・指導法'
      ],
      aspirationDescription: {
        pro: '高い競技レベルと充実した環境でプロを目指せます。',
        improve: '専門的な指導とトレーニング環境で競技力向上が期待できます。',
        support: 'スポーツ健康学部との連携で、トレーナーやコーチといった支援者の道も開かれています。'
      }
    },
    5: { // 東海大学
      aspirations: ['pro', 'improve', 'support'],
      studyRecommendations: [
        '教員養成（保健体育）',
        'スポーツ栄養学',
        'スポーツ医学'
      ],
      aspirationDescription: {
        pro: 'プロを目指す選手のためのプログラムが充実しています。',
        improve: '体育学部と連携した科学的なアプローチで競技力向上が期待できます。',
        support: '教員免許取得サポートが充実しており、指導者を目指す学生にも適しています。'
      }
    },
    6: { // 順天堂大学
      aspirations: ['improve', 'support'],
      studyRecommendations: [
        'スポーツ医学',
        'スポーツ栄養学',
        'トレーニング科学'
      ],
      aspirationDescription: {
        improve: '医学的な観点からのスポーツ科学に基づいたトレーニング環境があります。',
        support: 'トレーナーや医療関係者を目指す学生に最適な環境と学びを提供しています。'
      }
    },
    7: { // 関西学院大学
      aspirations: ['pro', 'improve', 'experience'],
      studyRecommendations: [
        'スポーツビジネス',
        '教員養成（保健体育）'
      ],
      aspirationDescription: {
        pro: '関西圏でプロを目指す選手に適した環境と実績があります。',
        improve: '高いレベルの練習環境で競技力向上が期待できます。',
        experience: '学生主体の活動も盛んで、リーダーシップを発揮する機会があります。'
      }
    },
    8: { // 福岡大学
      aspirations: ['improve', 'experience', 'support'],
      studyRecommendations: [
        '教員養成（保健体育）',
        'コーチング・指導法'
      ],
      aspirationDescription: {
        improve: '九州地区でトップレベルの環境で競技力向上が期待できます。',
        experience: '地域に根ざした活動も盛んで、様々な経験ができます。',
        support: '指導者やトレーナーを目指す学生にも適した環境があります。'
      }
    }
  };
  
  export default universityAspirations;