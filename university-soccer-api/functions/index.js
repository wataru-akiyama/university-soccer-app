// functions/index.js
// 大学サッカー部データベース API

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const express = require('express');

// Firebase Admin 初期化
admin.initializeApp();
const db = admin.firestore();

// Express アプリ作成
const app = express();
app.use(cors);
app.use(express.json());

// === API エンドポイント ===

// 1. ヘルスチェック
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '大学サッカー部API is healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 2. 全大学取得
app.get('/universities', async (req, res) => {
  try {
    console.log('📚 全大学データを取得中...');
    
    const snapshot = await db.collection('universities')
      //.where('status', '==', 'active')
      .orderBy('id')
      .get();
    
    const universities = [];
    snapshot.forEach(doc => {
      universities.push({ docId: doc.id, ...doc.data() });
    });
    
    console.log(`✅ ${universities.length}校のデータを返却`);
    
    res.status(200).json({
      success: true,
      data: universities,
      count: universities.length,
      message: `${universities.length}校の大学データを取得しました`
    });
    
  } catch (error) {
    console.error('❌ 大学データ取得エラー:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch universities',
      message: '大学データの取得に失敗しました'
    });
  }
});

// 3. 特定大学取得
app.get('/universities/:id', async (req, res) => {
  try {
    const universityId = parseInt(req.params.id);
    console.log(`🏫 大学ID ${universityId} のデータを取得中...`);
    
    const snapshot = await db.collection('universities')
      .where('id', '==', universityId)
      .where('status', '==', 'active')
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      console.log(`❌ 大学ID ${universityId} が見つかりません`);
      return res.status(404).json({
        success: false,
        error: 'University not found',
        message: `ID ${universityId} の大学が見つかりませんでした`
      });
    }
    
    const universityData = snapshot.docs[0].data();
    
    // アクセス解析記録
    try {
      await db.collection('analytics').add({
        type: 'university_view',
        university_id: universityId,
        university_name: universityData.university_name,
        source: req.headers['user-agent']?.includes('GAS') ? 'line_bot' : 'web',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        ip_address: req.ip,
        user_agent: req.headers['user-agent'] || 'unknown'
      });
    } catch (analyticsError) {
      console.warn('⚠️ アナリティクス記録に失敗:', analyticsError);
    }
    
    console.log(`✅ ${universityData.university_name} のデータを返却`);
    
    res.status(200).json({
      success: true,
      data: universityData,
      message: `${universityData.university_name}のデータを取得しました`
    });
    
  } catch (error) {
    console.error('❌ 特定大学取得エラー:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch university',
      message: '大学データの取得に失敗しました'
    });
  }
});

// 4. 大学検索（フィルタリング）
app.post('/universities/search', async (req, res) => {
  try {
    console.log('🔍 大学検索リクエスト:', req.body);
    
    const {
      searchQuery,
      regions,
      leagues,
      qualifications,
      sportsRecommend,
      selectionAvailable,
      dormAvailable,
      generalAdmissionAvailable,
      publicUniversity,
      privateUniversity,
      sortBy,
      sortDirection = 'desc',
      limit = 50
    } = req.body;
    
    // 基本クエリ
    let query = db.collection('universities')
      .where('status', '==', 'active');
    
    // リーグフィルター（Firestoreで実行可能）
    if (leagues && leagues.length > 0) {
      query = query.where('soccer_club.league', 'in', leagues);
    }
    
    const snapshot = await query.get();
    
    let universities = [];
    snapshot.forEach(doc => {
      universities.push({ docId: doc.id, ...doc.data() });
    });
    
    console.log(`📊 Firestoreクエリ結果: ${universities.length}校`);
    
    // JavaScriptでさらにフィルタリング
    universities = universities.filter(university => {
      // テキスト検索
      if (searchQuery && searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesText = 
          university.university_name?.toLowerCase().includes(query) ||
          university.main_faculties?.some(faculty => 
            faculty.toLowerCase().includes(query)
          ) ||
          university.soccer_club?.coach_name?.toLowerCase().includes(query);
        if (!matchesText) return false;
      }
      
      // 地域フィルター
      if (regions && regions.length > 0) {
        const matchesRegion = regions.some(region => {
          if (region === '関東') {
            return ['東京', '神奈川', '埼玉', '千葉', '茨城'].some(pref => 
              university.location?.includes(pref)
            );
          }
          if (region === '関西') {
            return ['大阪', '京都', '兵庫', '奈良', '滋賀'].some(pref => 
              university.location?.includes(pref)
            );
          }
          if (region === '九州・沖縄') {
            return university.location?.includes('福岡');
          }
          if (region === '中部') {
            return university.location?.includes('愛知');
          }
          return false;
        });
        if (!matchesRegion) return false;
      }
      
      // 学部フィルター
      if (qualifications && qualifications.length > 0) {
        const matchesFaculty = qualifications.some(qual => 
          university.main_faculties?.some(faculty => 
            faculty.includes(qual) || qual.includes(faculty)
          )
        );
        if (!matchesFaculty) return false;
      }
      
      // ブール値フィルター
      if (sportsRecommend && !university.entry_conditions?.sports_recommend) return false;
      if (selectionAvailable && !university.entry_conditions?.selection) return false;
      if (dormAvailable && !university.soccer_club?.dorm_available) return false;
      if (generalAdmissionAvailable && !university.entry_conditions?.general_admission) return false;
      
      // 国公立・私立フィルター
      const isPublic = ['筑波大学', '名古屋大学'].includes(university.university_name);
      if (publicUniversity && !isPublic) return false;
      if (privateUniversity && isPublic) return false;
      
      return true;
    });
    
    console.log(`🎯 フィルタリング後: ${universities.length}校`);
    
    // ソート
    if (sortBy) {
      universities.sort((a, b) => {
        let valueA, valueB;
        
        switch (sortBy) {
          case 'j_league':
            valueA = a.soccer_club?.j_league_nominees_2022_24 || 0;
            valueB = b.soccer_club?.j_league_nominees_2022_24 || 0;
            break;
          case 'members':
            valueA = a.soccer_club?.total_members || 0;
            valueB = b.soccer_club?.total_members || 0;
            break;
          case 'name':
            valueA = a.university_name || '';
            valueB = b.university_name || '';
            break;
          case 'cost':
            valueA = a.costs?.total_annual_cost || 0;
            valueB = b.costs?.total_annual_cost || 0;
            break;
          default:
            return 0;
        }
        
        if (sortBy === 'name') {
          return sortDirection === 'asc' 
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else {
          return sortDirection === 'asc' 
            ? valueA - valueB 
            : valueB - valueA;
        }
      });
    }
    
    // 制限
    const limitedUniversities = universities.slice(0, limit);
    
    console.log(`✅ 最終結果: ${limitedUniversities.length}校を返却`);
    
    res.status(200).json({
      success: true,
      data: limitedUniversities,
      count: limitedUniversities.length,
      total_found: universities.length,
      filters_applied: {
        searchQuery,
        regions,
        leagues,
        qualifications,
        sportsRecommend,
        selectionAvailable,
        dormAvailable,
        generalAdmissionAvailable,
        publicUniversity,
        privateUniversity,
        sortBy,
        sortDirection
      },
      message: `${limitedUniversities.length}校の検索結果を取得しました`
    });
    
  } catch (error) {
    console.error('❌ 大学検索エラー:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search universities',
      message: '大学検索に失敗しました'
    });
  }
});

// 5. 設定データ取得
app.get('/configurations/:type', async (req, res) => {
  try {
    const configType = req.params.type;
    console.log(`⚙️ 設定データ取得: ${configType}`);
    
    const doc = await db.collection('configurations').doc(configType).get();
    
    if (!doc.exists) {
      console.log(`❌ 設定データが見つかりません: ${configType}`);
      return res.status(404).json({
        success: false,
        error: 'Configuration not found',
        message: `設定データ '${configType}' が見つかりませんでした`
      });
    }
    
    const configData = doc.data();
    console.log(`✅ 設定データを返却: ${configType}`);
    
    res.status(200).json({
      success: true,
      data: configData,
      message: `設定データ '${configType}' を取得しました`
    });
    
  } catch (error) {
    console.error('❌ 設定データ取得エラー:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch configuration',
      message: '設定データの取得に失敗しました'
    });
  }
});

// 6. アナリティクス取得（管理者用）
app.get('/admin/analytics', async (req, res) => {
  try {
    console.log('📊 アナリティクスデータを取得中...');
    
    const snapshot = await db.collection('analytics')
      .orderBy('timestamp', 'desc')
      .limit(100)
      .get();
    
    const analytics = [];
    snapshot.forEach(doc => {
      analytics.push({ id: doc.id, ...doc.data() });
    });
    
    console.log(`✅ ${analytics.length}件のアナリティクスデータを返却`);
    
    res.status(200).json({
      success: true,
      data: analytics,
      count: analytics.length,
      message: `${analytics.length}件のアナリティクスデータを取得しました`
    });
    
  } catch (error) {
    console.error('❌ アナリティクス取得エラー:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics',
      message: 'アナリティクスデータの取得に失敗しました'
    });
  }
});

// Express アプリをCloud Functionsにエクスポート（regionを削除）
exports.api = functions.https.onRequest(app);

// ログ出力用の関数（regionを削除）
exports.healthCheck = functions.https.onRequest((req, res) => {
  console.log('🏥 Health check requested');
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});