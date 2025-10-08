// update-all-data-v5.js
// テキスト型費用対応版：既存データを削除して新しいCSVデータで全更新

const admin = require('firebase-admin');
const { importCSVToFirebaseV5 } = require('./csv-to-firebase-v5');

// Firebase初期化
if (admin.apps.length === 0) {
  const serviceAccount = require('./serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// 既存の全大学データを削除
async function deleteAllUniversities() {
  console.log('🗑️ 既存データの削除を開始...');
  
  try {
    const snapshot = await db.collection('universities').get();
    
    if (snapshot.empty) {
      console.log('📭 削除対象のデータはありません');
      return 0;
    }
    
    const batch = db.batch();
    let deleteCount = 0;
    
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
      deleteCount++;
    });
    
    await batch.commit();
    console.log(`✅ ${deleteCount}件のデータを削除しました`);
    return deleteCount;
    
  } catch (error) {
    console.error('❌ データ削除エラー:', error);
    throw error;
  }
}

// バックアップ作成
async function createBackup() {
  try {
    console.log('💾 既存データのバックアップを作成中...');
    
    const snapshot = await db.collection('universities').get();
    const backupData = [];
    
    snapshot.docs.forEach(doc => {
      backupData.push({
        id: doc.id,
        data: doc.data()
      });
    });
    
    if (backupData.length > 0) {
      const backupFileName = `backup_v5_text_costs_${new Date().toISOString().split('T')[0]}_${Date.now()}.json`;
      require('fs').writeFileSync(backupFileName, JSON.stringify(backupData, null, 2));
      console.log(`📂 バックアップファイル作成: ${backupFileName}`);
    }
    
    return backupData.length;
  } catch (error) {
    console.error('⚠️ バックアップ作成エラー:', error);
    return 0;
  }
}

// CSV機能の事前チェック（費用データのテキスト確認追加）
function checkCSVFeatures(csvFilePath) {
  try {
    const fs = require('fs');
    const Papa = require('papaparse');
    
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    const parsed = Papa.parse(csvContent, { 
      header: true, 
      skipEmptyLines: true,
      dynamicTyping: false  // すべてテキストとして扱う
    });
    
    const csvFeatures = {
      hasAreaColumn: parsed.meta.fields.includes('エリア'),
      hasDormDetails: parsed.meta.fields.includes('寮詳細'),
      hasCostColumns: {
        tuition: parsed.meta.fields.includes('授業料'),
        entranceFee: parsed.meta.fields.includes('入学金'),
        facilityFee: parsed.meta.fields.includes('施設費'),
        clubFee: parsed.meta.fields.includes('部費'),
        equipment: parsed.meta.fields.includes('チームウェア代'),
        camp: parsed.meta.fields.includes('合宿・遠征費')
      },
      totalColumns: parsed.meta.fields.length,
      totalRows: parsed.data.length
    };
    
    let emptyAreaCount = 0;
    let dormDetailsCount = 0;
    let textCostSamples = [];
    const areaStats = new Map();
    
    parsed.data.forEach((row, index) => {
      const area = row['エリア'];
      const dormDetails = row['寮詳細'];
      
      if (!area || area.trim() === '') {
        emptyAreaCount++;
      } else {
        const cleanArea = area.trim();
        areaStats.set(cleanArea, (areaStats.get(cleanArea) || 0) + 1);
      }
      
      if (dormDetails && dormDetails.trim()) {
        dormDetailsCount++;
      }
      
      // 費用データのサンプルを収集（最初の3件）
      if (index < 3 && row['授業料']) {
        textCostSamples.push({
          university: row['大学名'],
          tuition: row['授業料'],
          clubFee: row['部費']
        });
      }
    });
    
    console.log('\n🔍 CSVファイル事前チェック:');
    console.log(`総列数: ${csvFeatures.totalColumns}列`);
    console.log(`総データ数: ${csvFeatures.totalRows}校`);
    console.log(`エリア列: ${csvFeatures.hasAreaColumn ? '✅ あり' : '❌ なし'}`);
    console.log(`寮詳細列: ${csvFeatures.hasDormDetails ? '✅ あり' : '❌ なし'}`);
    console.log(`エリア入力済み: ${csvFeatures.totalRows - emptyAreaCount}校`);
    console.log(`エリア未入力: ${emptyAreaCount}校`);
    console.log(`寮詳細入力済み: ${dormDetailsCount}校`);
    
    // 費用列の存在確認
    console.log('\n💰 費用データ列の確認:');
    console.log(`授業料: ${csvFeatures.hasCostColumns.tuition ? '✅' : '❌'}`);
    console.log(`入学金: ${csvFeatures.hasCostColumns.entranceFee ? '✅' : '❌'}`);
    console.log(`施設費: ${csvFeatures.hasCostColumns.facilityFee ? '✅' : '❌'}`);
    console.log(`部費: ${csvFeatures.hasCostColumns.clubFee ? '✅' : '❌'}`);
    console.log(`チームウェア代: ${csvFeatures.hasCostColumns.equipment ? '✅' : '❌'}`);
    console.log(`合宿・遠征費: ${csvFeatures.hasCostColumns.camp ? '✅' : '❌'}`);
    
    // 費用データのサンプル表示
    if (textCostSamples.length > 0) {
      console.log('\n💰 費用データサンプル（テキスト形式）:');
      textCostSamples.forEach(sample => {
        console.log(`  ${sample.university}:`);
        console.log(`    授業料: "${sample.tuition}"`);
        console.log(`    部費: "${sample.clubFee}"`);
      });
    }
    
    if (areaStats.size > 0) {
      console.log('\n🗾 現在のエリア分布:');
      [...areaStats.entries()].sort((a, b) => b[1] - a[1]).forEach(([area, count]) => {
        console.log(`  ${area}: ${count}校`);
      });
    }
    
    return {
      ...csvFeatures,
      emptyAreaCount,
      dormDetailsCount,
      areaStats: Object.fromEntries(areaStats),
      textCostSamples
    };
    
  } catch (error) {
    console.error('⚠️ CSV機能チェックエラー:', error);
    return { 
      hasAreaColumn: false, 
      hasDormDetails: false, 
      hasCostColumns: {},
      totalColumns: 0, 
      totalRows: 0, 
      emptyAreaCount: 0, 
      dormDetailsCount: 0, 
      areaStats: {},
      textCostSamples: []
    };
  }
}

// v5テキスト費用対応データ全更新の実行
async function updateAllDataV5(csvFilePath) {
  try {
    console.log('🔄 v5テキスト費用対応データ全更新を開始します');
    console.log(`📄 CSVファイル: ${csvFilePath}`);
    console.log('💰 費用情報をテキスト型として処理');
    console.log('🎯 現在のFirebase構造に完全対応版');
    
    // CSVファイルの存在確認
    const fs = require('fs');
    if (!fs.existsSync(csvFilePath)) {
      throw new Error(`CSVファイルが見つかりません: ${csvFilePath}`);
    }
    
    // CSV機能の事前チェック
    const csvCheck = checkCSVFeatures(csvFilePath);
    
    if (csvCheck.emptyAreaCount > 0) {
      console.log(`\n🔧 ${csvCheck.emptyAreaCount}校のエリア情報を自動補完します`);
    }
    
    if (csvCheck.hasDormDetails) {
      console.log(`🏠 ${csvCheck.dormDetailsCount}校の寮詳細情報を処理します`);
    }
    
    // 必要項目確認
    const requiredColumns = [
      '大学名', 'エリア', 'リーグ', 'ジャンル➀', '学力ランク', 'PLAYMAKERコメント',
      '部員数', '監督', 'スポーツ推薦有無', '授業料', 'グラウンド名', 'グラウンド住所',
      'サッカー部寮'
    ];
    
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    const Papa = require('papaparse');
    const parsed = Papa.parse(csvContent, { 
      header: true, 
      skipEmptyLines: true,
      dynamicTyping: false  // すべてテキストとして扱う
    });
    
    const missingColumns = requiredColumns.filter(col => !parsed.meta.fields.includes(col));
    
    if (missingColumns.length > 0) {
      console.log('⚠️ 以下の必要項目が見つかりません:');
      missingColumns.forEach(col => console.log(`  - ${col}`));
    } else {
      console.log('✅ 必要項目が確認できました');
    }
    
    console.log(`\n📊 CSVファイル確認:`);
    console.log(`  行数: ${parsed.data.length}行`);
    console.log(`  列数: ${parsed.meta.fields.length}列`);
    console.log(`  💰 費用データ: テキスト形式で処理`);
    
    // 1. バックアップ作成
    const backupCount = await createBackup();
    console.log(`📂 ${backupCount}件のデータをバックアップしました`);
    
    // 2. 既存データを削除
    const deletedCount = await deleteAllUniversities();
    
    // 3. 新しいv5データを投入
    console.log('\n🚀 v5テキスト費用対応データの投入を開始...');
    const addedCount = await importCSVToFirebaseV5(csvFilePath);
    
    // 4. 更新後の確認
    const newSnapshot = await db.collection('universities').get();
    console.log(`\n✅ v5テキスト費用対応データ全更新完了！`);
    console.log(`📊 削除: ${deletedCount}件`);
    console.log(`📊 追加: ${addedCount}件`);
    console.log(`📊 現在の総数: ${newSnapshot.size}件`);
    console.log(`🎯 データ形式: v5_text_costs`);
    
    // 5. データ品質の確認
    console.log('\n🔍 データ品質確認...');
    let areaCount = 0;
    let facilitiesCount = 0;
    let careerCount = 0;
    let scholarshipCount = 0;
    let dormDetailsCount = 0;
    let textCostsCount = 0;
    const finalAreaStats = new Map();
    const costSamples = [];
    
    newSnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      if (data.area) {
        areaCount++;
        finalAreaStats.set(data.area, (finalAreaStats.get(data.area) || 0) + 1);
      }
      if (data.facilities && data.facilities.ground_name) facilitiesCount++;
      if (data.career_info && data.career_info.possible_careers && data.career_info.possible_careers.length > 0) careerCount++;
      if (data.entry_conditions && data.entry_conditions.scholarship_available) scholarshipCount++;
      if (data.soccer_club && data.soccer_club.dorm_details && data.soccer_club.dorm_details.dorm_notes) dormDetailsCount++;
      
      // テキスト費用データの確認
      if (data.costs && (data.costs.university_costs?.annual_tuition || data.costs.soccer_club_costs?.monthly_club_fee)) {
        textCostsCount++;
        
        // 最初の3件のサンプルを収集
        if (index < 3) {
          costSamples.push({
            name: data.university_name,
            tuition: data.costs.university_costs?.annual_tuition,
            clubFee: data.costs.soccer_club_costs?.monthly_club_fee
          });
        }
      }
    });
    
    console.log(`🗾 エリア情報カバー率: ${areaCount}/${newSnapshot.size}校 (${Math.round(areaCount/newSnapshot.size*100)}%)`);
    console.log(`📍 グラウンド詳細情報: ${facilitiesCount}校`);
    console.log(`💼 目指せる職業情報: ${careerCount}校`);
    console.log(`🎓 特待生制度情報: ${scholarshipCount}校`);
    console.log(`🏠 寮詳細情報: ${dormDetailsCount}校`);
    console.log(`💰 テキスト費用情報: ${textCostsCount}校`);
    
    // 費用データサンプル表示
    if (costSamples.length > 0) {
      console.log('\n💰 保存された費用データサンプル（テキスト形式）:');
      costSamples.forEach(sample => {
        console.log(`  ${sample.name}:`);
        console.log(`    授業料: "${sample.tuition || '未設定'}"`);
        console.log(`    部費: "${sample.clubFee || '未設定'}"`);
      });
    }
    
    console.log('\n🗾 最終エリア分布:');
    [...finalAreaStats.entries()].sort((a, b) => b[1] - a[1]).forEach(([area, count]) => {
      console.log(`  ${area}: ${count}校`);
    });
    
    return {
      deleted: deletedCount,
      added: addedCount,
      total: newSnapshot.size,
      areaStats: Object.fromEntries(finalAreaStats),
      dormDetailsCount,
      textCostsCount
    };
    
  } catch (error) {
    console.error('❌ v5テキスト費用対応データ全更新エラー:', error);
    throw error;
  }
}

// 確認なしで実行する関数
async function updateAllDataV5Directly(csvFilePath) {
  return await updateAllDataV5(csvFilePath);
}

// コマンドライン実行
if (require.main === module) {
  const csvFilePath = process.argv[2] || './oshinagaki_data5.csv';
  const skipConfirmation = process.argv[3] === '--yes' || process.argv[3] === '-y';
  
  console.log('🔄 v5テキスト費用対応大学データ全更新ツール');
  console.log('💰 費用情報をテキスト型として処理');
  console.log('🎯 現在のFirebase構造に完全対応版');
  console.log('⚠️  既存の全データが削除され、新しいCSVで置き換えられます');
  console.log('💾 実行前に自動バックアップが作成されます');
  console.log('🗾 エリア情報の自動補完機能付き');
  console.log('🏠 寮詳細情報の処理対応');
  console.log('');
  
  if (skipConfirmation) {
    console.log('⚡ 確認をスキップして実行します...');
    updateAllDataV5(csvFilePath)
      .then((result) => {
        console.log('\n🎉 v5テキスト費用対応データ更新が完了しました！');
        console.log(`📊 結果: 削除${result.deleted}件、追加${result.added}件、現在${result.total}件`);
        console.log(`🗾 エリア分布: ${Object.keys(result.areaStats).length}エリア`);
        console.log(`🏠 寮詳細情報: ${result.dormDetailsCount}校`);
        console.log(`💰 テキスト費用情報: ${result.textCostsCount}校`);
        console.log('📱 React アプリで新しいデータをご確認ください');
        process.exit(0);
      })
      .catch((error) => {
        console.error('\n❌ 更新に失敗しました:', error.message);
        process.exit(1);
      });
  } else {
    console.log('続行しますか？ (y/n)');
    process.stdin.setEncoding('utf8');
    process.stdin.once('data', (input) => {
      if (input.trim().toLowerCase() === 'y') {
        updateAllDataV5(csvFilePath)
          .then((result) => {
            console.log('\n🎉 v5テキスト費用対応データ更新が完了しました！');
            console.log(`📊 結果: 削除${result.deleted}件、追加${result.added}件、現在${result.total}件`);
            console.log(`🗾 エリア分布: ${Object.keys(result.areaStats).length}エリア`);
            console.log(`🏠 寮詳細情報: ${result.dormDetailsCount}校`);
            console.log(`💰 テキスト費用情報: ${result.textCostsCount}校`);
            console.log('📱 React アプリで新しいデータをご確認ください');
            process.exit(0);
          })
          .catch((error) => {
            console.error('\n❌ 更新に失敗しました:', error.message);
            process.exit(1);
          });
      } else {
        console.log('❌ 更新をキャンセルしました');
        process.exit(0);
      }
    });
  }
}

module.exports = { 
  updateAllDataV5, 
  updateAllDataV5Directly,
  deleteAllUniversities, 
  createBackup, 
  checkCSVFeatures 
};