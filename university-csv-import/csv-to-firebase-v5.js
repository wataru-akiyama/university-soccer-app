// csv-to-firebase-v5.js
// 費用情報をテキスト型として扱う版

const admin = require('firebase-admin');
const fs = require('fs');
const Papa = require('papaparse');

// Firebase初期化
if (admin.apps.length === 0) {
  const serviceAccount = require('./serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// エリア自動補完機能
function estimateAreaFromAddress(address) {
  if (!address) return '';
  
  if (address.includes('北海道')) return '北海道';
  if (address.match(/青森|岩手|宮城|秋田|山形|福島/)) return '東北';
  if (address.match(/茨城|栃木|群馬|埼玉|千葉|東京|神奈川/)) return '関東';
  if (address.match(/新潟|富山|石川|福井|山梨|長野/)) return '北信越';
  if (address.match(/岐阜|静岡|愛知|三重/)) return '東海';
  if (address.match(/滋賀|京都|大阪|兵庫|奈良|和歌山/)) return '関西';
  if (address.match(/鳥取|島根|岡山|広島|山口/)) return '中国';
  if (address.match(/徳島|香川|愛媛|高知/)) return '四国';
  if (address.match(/福岡|佐賀|長崎|熊本|大分|宮崎|鹿児島|沖縄/)) return '九州';
  
  return '';
}

function estimateAreaFromUniversityName(universityName) {
  if (!universityName) return '';
  
  const areaKeywords = {
    '北海道': ['北海道', '札幌', '小樽', '旭川', '室蘭', '函館', '釧路', '帯広', '北見', '星槎道都', '北翔', '北星学園', '北海学園'],
    '東北': ['青森', '弘前', '岩手', '盛岡', '宮城', '東北', '仙台', '秋田', '山形', '福島', '郡山', 'ノースアジア'],
    '関東': ['茨城', '栃木', '群馬', '埼玉', '千葉', '東京', '神奈川', '横浜', '川崎', '相模女子', '関東学院', '神奈川工科'],
    '北信越': ['新潟', '富山', '石川', '金沢', '福井', '山梨', '長野', '信州', '上越'],
    '東海': ['岐阜', '静岡', '愛知', '名古屋', '三重', '四日市', '常葉'],
    '関西': ['滋賀', '京都', '大阪', '兵庫', '神戸', '奈良', '和歌山', '立命館', '関西', '近畿', '阪南'],
    '中国': ['鳥取', '島根', '岡山', '広島', '山口', '下関', '尾道', '福山', '周南'],
    '四国': ['徳島', '香川', '愛媛', '松山', '高知', '高松'],
    '九州': ['福岡', '佐賀', '長崎', '熊本', '大分', '宮崎', '鹿児島', '沖縄', '九州', '久留米', '西南学院', '名桜', '鎮西学院']
  };
  
  for (const [area, keywords] of Object.entries(areaKeywords)) {
    for (const keyword of keywords) {
      if (universityName.includes(keyword)) {
        return area;
      }
    }
  }
  
  return '';
}

// CSV行をFirebase形式に変換（費用をテキスト型として扱う）
function convertCSVToFirebaseFormatV5(csvRow, index) {
  // Boolean値の変換ヘルパー
  const toBool = (value) => {
    if (typeof value === 'string') {
      return value === '有' || value === '可' || value === 'あり' || value === '○' || value.toLowerCase() === 'true';
    }
    return Boolean(value);
  };

  // 数値の変換ヘルパー（費用以外の数値用）
  const toNumber = (value) => {
    if (value === null || value === undefined || value === '') return 0;
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  // 文字列の安全な変換
  const toString = (value) => {
    if (value === null || value === undefined) return '';
    return String(value).trim();
  };

  // 配列の処理
  const processArray = (value) => {
    if (!value) return [];
    return value.split(/[、,]/).map(item => item.trim()).filter(item => item.length > 0);
  };

  // J内定者数の合計計算
  const jLeague2022 = toNumber(csvRow['22J内定']);
  const jLeague2023 = toNumber(csvRow['23J内定']);
  const jLeague2024 = toNumber(csvRow['24J内定']);
  const jLeagueTotal = jLeague2022 + jLeague2023 + jLeague2024;

  // 志向性の処理
  const genres = [];
  if (csvRow['ジャンル➀'] && csvRow['ジャンル➀'].trim()) {
    genres.push(csvRow['ジャンル➀'].trim());
  }
  if (csvRow['ジャンル②'] && csvRow['ジャンル②'].trim()) {
    genres.push(csvRow['ジャンル②'].trim());
  }

  // エリア情報の処理（自動補完対応）
  const universityName = toString(csvRow['大学名']);
  const groundAddress = toString(csvRow['グラウンド住所']);
  let area = toString(csvRow['エリア']);
  
  // エリアが未入力の場合、自動推定
  if (!area) {
    area = estimateAreaFromAddress(groundAddress) || 
           estimateAreaFromUniversityName(universityName) || 
           '';
    
    if (area) {
      console.log(`  🗾 ${universityName} のエリアを自動推定: ${area}`);
    }
  }

  // 推薦基準の処理
  const recommendCriteria = csvRow['スポーツ推薦基準評定'] ? 
    `評定${csvRow['スポーツ推薦基準評定']}以上` : '';

  // 寮詳細情報の処理
  const soccerClubDorm = toString(csvRow['サッカー部寮']);
  const dormDetails = toString(csvRow['寮詳細']);

  // 現在のFirebase構造に完全対応（費用はテキスト型）
  return {
    // 基本情報
    id: index + 1,
    university_name: universityName,
    homepage_url: toString(csvRow['HP']),
    area: area,
    academic_rank: toString(csvRow['学力ランク']),
    genres: genres,
    main_faculties: processArray(csvRow['学部']),

    // サッカー部情報
    soccer_club: {
      league: toString(csvRow['リーグ']),
      all_categories: processArray(csvRow['所属リーグ（Bチーム以下）']),
      coach_name: toString(csvRow['監督']),
      total_members: toNumber(csvRow['部員数']),
      members_by_year: {
        fourth_year: toNumber(csvRow['新４年人数']),
        third_year: toNumber(csvRow['新３年人数']),
        second_year: toNumber(csvRow['新２年人数']),
        first_year: toNumber(csvRow['新１年人数'])
      },
      j_league_nominees_2022: jLeague2022,
      j_league_nominees_2023: jLeague2023,
      j_league_nominees_2024: jLeague2024,
      j_league_nominees_2022_24: jLeagueTotal,
      denso_cup_2024: toNumber(csvRow['24デンソー出場']),
      denso_cup_2024_25: toNumber(csvRow['25デンソー出場']),
      soccer_field_count: toNumber(csvRow['面数']),
      dorm_details: {
        soccer_club_dorm: soccerClubDorm,
        university_dorm: false,
        general_dorm: false,
        dorm_notes: dormDetails
      }
    },

    // 入部条件
    entry_conditions: {
      sports_recommend: toBool(csvRow['スポーツ推薦有無']),
      recommend_people_count: toString(csvRow['サッカー部スポーツ推薦受入人数']),
      recommend_criteria: recommendCriteria,
      recommend_criteria_detail: toString(csvRow['スポーツ推薦条件']),
      selection: toBool(csvRow['セレクション有無']),
      selection_period: toString(csvRow['セレクション時期']),
      general_admission: toString(csvRow['一般入部可否']),
      general_conditions: toString(csvRow['入部条件']),
      scholarship_available: toBool(csvRow['特待生制度有無']),
      scholarship_details: toString(csvRow['特待生詳細'])
    },

    // 費用情報（すべてテキスト型として保存）
    costs: {
      university_costs: {
        annual_tuition: toString(csvRow['授業料']),      // テキスト型
        entrance_fee: toString(csvRow['入学金']),        // テキスト型
        facility_fee: toString(csvRow['施設費'])         // テキスト型
      },
      soccer_club_costs: {
        monthly_club_fee: toString(csvRow['部費']),      // テキスト型
        equipment_cost: toString(csvRow['チームウェア代']), // テキスト型
        camp_cost: toString(csvRow['合宿・遠征費'])      // テキスト型
      }
    },

    // 施設情報
    facilities: {
      ground_name: toString(csvRow['グラウンド名']),
      ground_address: groundAddress,
      ground_notes: toString(csvRow['グラウンド特記事項']),
      soccer_field_count: toNumber(csvRow['面数'])
    },

    // 進路情報
    career_info: {
      university_career_paths: toString(csvRow['大学卒業後進路']),
      soccer_club_career_paths: toString(csvRow['サッカー部卒業後進路']),
      possible_careers: processArray(csvRow['職業'])
    },

    // 拡張データ
    extended_data: {
      playmaker_comment: toString(csvRow['PLAYMAKERコメント']),
      last_updated: new Date().toISOString(),
      data_version: 'v5_text_costs'  // バージョンを更新
    },

    // メタデータ
    status: 'active',
    data_source: 'csv_import_v5_text',
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  };
}

// CSVインポート関数（v5テキスト費用対応版）
async function importCSVToFirebaseV5(csvFilePath) {
  try {
    console.log('🚀 v5テキスト費用対応CSVファイル読み込み開始...');
    
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    
    const parsed = Papa.parse(csvContent, {
      header: true,
      dynamicTyping: false,  // すべてを文字列として扱う
      skipEmptyLines: true,
      delimiter: ',',
      encoding: 'utf8'
    });
    
    if (parsed.errors.length > 0) {
      console.warn('⚠️  CSV解析警告:', parsed.errors);
    }
    
    console.log(`📊 ${parsed.data.length}行のデータを読み込みました`);
    console.log(`📋 列数: ${parsed.meta.fields.length}列`);
    console.log(`💰 費用情報はテキスト型として処理します`);
    
    // 重要項目の確認
    const hasAreaColumn = parsed.meta.fields.includes('エリア');
    const hasDormDetails = parsed.meta.fields.includes('寮詳細');
    console.log(`🗾 エリア列: ${hasAreaColumn ? '✅ 存在' : '❌ 不在'}`);
    console.log(`🏠 寮詳細列: ${hasDormDetails ? '✅ 存在' : '❌ 不在'}`);
    
    // Firestore batch処理の準備
    const batch = db.batch();
    const universities = [];
    let areaCompletedCount = 0;
    let dormDetailsCount = 0;
    
    // 各行をFirebase形式に変換
    parsed.data.forEach((row, index) => {
      if (row['大学名'] && row['大学名'].trim()) {
        try {
          const originalArea = row['エリア'];
          const dormDetails = row['寮詳細'];
          
          let universityData = convertCSVToFirebaseFormatV5(row, index);
          
          // エリア自動補完をカウント
          if (!originalArea && universityData.area) {
            areaCompletedCount++;
          }
          
          // 寮詳細をカウント
          if (dormDetails && dormDetails.trim()) {
            dormDetailsCount++;
          }
          
          universities.push(universityData);
          
          const docRef = db.collection('universities').doc(`university-${universityData.id}`);
          batch.set(docRef, universityData);
          
          console.log(`  ✓ ${universityData.university_name} を変換 (${universityData.area || '不明'} / ${universityData.soccer_club.league})`);
        } catch (error) {
          console.error(`❌ ${row['大学名']} の変換でエラー:`, error.message);
        }
      }
    });
    
    console.log(`\n📝 ${universities.length}校のデータを準備完了`);
    console.log(`🗾 エリア自動補完: ${areaCompletedCount}校`);
    console.log(`🏠 寮詳細情報: ${dormDetailsCount}校`);
    console.log(`🔥 Firebase投入を開始...`);
    
    await batch.commit();
    console.log(`✅ ${universities.length}校のデータをFirebaseに投入完了！`);
    
    // 投入後の統計
    console.log('\n=== v5テキスト費用対応データ統計 ===');
    const areaStats = new Map();
    const stats = {
      withGroundName: 0,
      withCareerPaths: 0,
      withScholarship: 0,
      withAllCategories: 0,
      withArea: 0,
      withDormDetails: 0,
      withTextCosts: 0  // テキスト費用情報を持つ大学数
    };
    
    universities.forEach(uni => {
      if (uni.area) {
        areaStats.set(uni.area, (areaStats.get(uni.area) || 0) + 1);
        stats.withArea++;
      }
      if (uni.facilities.ground_name) stats.withGroundName++;
      if (uni.career_info.possible_careers.length > 0) stats.withCareerPaths++;
      if (uni.entry_conditions.scholarship_available) stats.withScholarship++;
      if (uni.soccer_club.all_categories.length > 0) stats.withAllCategories++;
      if (uni.soccer_club.dorm_details.dorm_notes) stats.withDormDetails++;
      // テキスト費用情報をカウント
      if (uni.costs.university_costs.annual_tuition || 
          uni.costs.soccer_club_costs.monthly_club_fee) {
        stats.withTextCosts++;
      }
    });
    
    console.log('🗾 エリア分布:');
    [...areaStats.entries()].sort((a, b) => b[1] - a[1]).forEach(([area, count]) => {
      console.log(`  ${area}: ${count}校`);
    });
    
    console.log(`\n📊 データ品質統計:`);
    console.log(`エリア情報あり: ${stats.withArea}校 (${Math.round(stats.withArea/universities.length*100)}%)`);
    console.log(`グラウンド名あり: ${stats.withGroundName}校`);
    console.log(`目指せる職業あり: ${stats.withCareerPaths}校`);
    console.log(`特待生制度あり: ${stats.withScholarship}校`);
    console.log(`全カテゴリー情報あり: ${stats.withAllCategories}校`);
    console.log(`🏠 寮詳細情報あり: ${stats.withDormDetails}校`);
    console.log(`💰 テキスト費用情報あり: ${stats.withTextCosts}校`);
    console.log(`🆕 データ形式: v5_text_costs`);
    
    return universities.length;
    
  } catch (error) {
    console.error('❌ CSVインポートエラー:', error);
    throw error;
  }
}

// スクリプト実行
if (require.main === module) {
  const csvFilePath = process.argv[2] || './oshinagaki_data5.csv';
  
  console.log('📋 v5テキスト費用対応 CSV→Firebase インポートツール');
  console.log('💰 費用情報をテキスト型として処理');
  console.log(`📄 CSVファイル: ${csvFilePath}`);
  console.log('');
  
  importCSVToFirebaseV5(csvFilePath)
    .then((count) => {
      console.log(`\n🎉 ${count}校のv5データ投入が完了しました！`);
      console.log('💰 費用情報はテキスト型として保存されました！');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ 投入に失敗しました:', error.message);
      process.exit(1);
    });
}

module.exports = {
  importCSVToFirebaseV5,
  convertCSVToFirebaseFormatV5,
  estimateAreaFromAddress,
  estimateAreaFromUniversityName
};