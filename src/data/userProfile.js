// デフォルトのユーザープロフィール構造（デモデータ）
const userProfile = {
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
    photos: {
      profile: "/images/demo/profile.png",
      action: [
        "/images/demo/action1.jpg",
        "/images/demo/action2.jpg",
        "/images/demo/action3.jpg"
      ]
    },
    videos: [
      {
        id: 1,
        url: "/videos/demo/highlight.mp4",
        thumbnail: "/images/demo/video-thumbnail.jpg",
        title: "プレーハイライト 2024年前半戦",
        updatedAt: "2024-07-15T09:00:00Z"
      }
    ],
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
      },
      {
        id: 3,
        title: "U-18県選抜",
        result: "選出",
        year: "2023",
        description: "県代表として全国都道府県選抜大会に出場。"
      }
    ],
    reviews: [
      {
        id: 1,
        reviewer: "山田 健太郎",
        organization: "青山高校サッカー部監督",
        rating: 5,
        text: "非常に優れたゲームビジョンと戦術理解を持っています。チームの中心選手として3年間活躍し、リーダーシップも優れています。フィジカル面の強化ができれば、大学でもさらなる活躍が期待できるでしょう。"
      },
      {
        id: 2,
        reviewer: "鈴木 拓也",
        organization: "県U-18選抜コーチ",
        rating: 4,
        text: "技術的に非常に高いレベルを持ち、特にパスの質と判断力は印象的です。さらに体の強さが加われば、より高いレベルでプレーできるポテンシャルがあります。"
      }
    ],
    universityMessages: "私は大学サッカー部に入部し、より高いレベルで自分を成長させたいと考えています。技術面では特にパスとゲームメイクに自信がありますが、フィジカル面の強化が課題だと認識しています。大学ではその点を改善しながら、チームの勝利に貢献できる選手になりたいです。また、プロを目指しながらも、専門的な知識を身につけるために学業も真剣に取り組む予定です。体験練習や入部に関するご指導をいただければ幸いです。",
    activities: [
      {
        id: 1,
        type: "practice",
        title: "早稲田大学サッカー部練習参加",
        date: "2024-08-15T13:00:00Z",
        details: "夏季練習会に参加。監督やコーチから技術面での評価をいただきました。"
      },
      {
        id: 2,
        type: "message",
        title: "筑波大学から連絡",
        date: "2024-07-20T10:30:00Z",
        details: "入部に関する追加情報を受け取りました。"
      },
      {
        id: 3,
        type: "video",
        title: "新規ハイライト動画をアップロード",
        date: "2024-07-15T09:00:00Z",
        details: "最新の試合映像をポートフォリオに追加しました。"
      }
    ]
  };
  
  export default userProfile;