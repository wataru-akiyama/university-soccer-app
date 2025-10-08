// cleanup-unused-fields.js
// お品書きサイト用の不要フィールド削除スクリプト

const admin = require('firebase-admin');
const fs = require('fs');

// Firebase初期化
if (admin.apps.length === 0) {
  const serviceAccount = require('./serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// ネストしたフィールドの存在チェック
function hasField(obj, path) {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined || !(key in current)) {
      return false;
    }
    current = current[key];
  }
  
  return true;
}

// バックアップ作成
async function createBackup() {
  console.log('💾 バックアップ作成中...');
  
  try {
    const snapshot = await db.collection('universities').get();
    const backupData = [];
    
    snapshot.docs.forEach(doc => {
      backupData.push({
        id: doc.id,
        data: doc.data()
      });
    });
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `backup_before_cleanup_${timestamp}.json`;
    
    fs.writeFileSync(backupFileName, JSON.stringify(backupData, null, 2));
    
    console.log(`📂 バックアップ作成完了: ${backupFileName}`);
    console.log(`📊 バックアップ件数: ${backupData.length}件`);
    
    return backupFileName;
    
  } catch (error) {
    console.error('⚠️ バックアップ作成エラー:', error);
    throw error;
  }
}

// 複数フィールドを同時に削除
async function deleteMultipleFields(fieldsToDelete) {
  console.log('🧹 複数フィールドの一括削除開始...');
  console.log('削除対象フィールド:', fieldsToDelete);
  
  try {
    const snapshot = await db.collection('universities').get();
    
    if (snapshot.empty) {
      console.log('📭 対象ドキュメントがありません');
      return 0;
    }
    
    const batchSize = 500;
    let totalUpdated = 0;
    let currentBatch = db.batch();
    let batchCount = 0;
    
    console.log(`📊 処理対象: ${snapshot.docs.length}件のドキュメント`);
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const updates = {};
      let hasUpdates = false;
      
      // 削除対象のフィールドをチェック
      for (const fieldPath of fieldsToDelete) {
        if (hasField(data, fieldPath)) {
          updates[fieldPath] = admin.firestore.FieldValue.delete();
          hasUpdates = true;
        }
      }
      
      // 更新が必要な場合のみバッチに追加
      if (hasUpdates) {
        currentBatch.update(doc.ref, updates);
        batchCount++;
        totalUpdated++;
        
        if (batchCount >= batchSize) {
          await currentBatch.commit();
          console.log(`✅ ${batchCount}件処理完了 (累計: ${totalUpdated}件)`);
          
          currentBatch = db.batch();
          batchCount = 0;
          
          // レート制限を避けるための待機
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }
    
    // 残りのバッチをコミット
    if (batchCount > 0) {
      await currentBatch.commit();
      console.log(`✅ ${batchCount}件処理完了 (累計: ${totalUpdated}件)`);
    }
    
    console.log(`🎉 完了: ${totalUpdated}件のドキュメントから複数フィールドを削除`);
    return totalUpdated;
    
  } catch (error) {
    console.error('❌ 複数フィールド削除エラー:', error);
    throw error;
  }
}

// 削除前の分析
async function analyzeFieldsToDelete(fieldsToDelete) {
  console.log('🔍 削除対象フィールドの分析開始...');
  
  try {
    const snapshot = await db.collection('universities').get();
    const analysis = {};
    
    // 各フィールドの存在状況を調査
    for (const fieldPath of fieldsToDelete) {
      analysis[fieldPath] = {
        exists: 0,
        total: snapshot.docs.length,
        examples: []
      };
      
      for (const doc of snapshot.docs) {
        const data = doc.data();
        if (hasField(data, fieldPath)) {
          analysis[fieldPath].exists++;
          
          // サンプル値を取得（最大3件）
          if (analysis[fieldPath].examples.length < 3) {
            const value = getFieldValue(data, fieldPath);
            analysis[fieldPath].examples.push({
              docId: doc.id,
              universityName: data.university_name,
              value: typeof value === 'object' ? '[Object]' : value
            });
          }
        }
      }
    }
    
    // 分析結果を表示
    console.log('\n📊 削除対象フィールドの分析結果:');
    console.log('='.repeat(60));
    
    for (const [fieldPath, info] of Object.entries(analysis)) {
      console.log(`\n🔸 ${fieldPath}`);
      console.log(`   存在件数: ${info.exists}/${info.total}件 (${Math.round(info.exists/info.total*100)}%)`);
      
      if (info.examples.length > 0) {
        console.log('   サンプル値:');
        info.examples.forEach((example, index) => {
          console.log(`     ${index + 1}. ${example.universityName}: ${example.value}`);
        });
      }
    }
    
    console.log('='.repeat(60));
    
    return analysis;
    
  } catch (error) {
    console.error('❌ 分析エラー:', error);
    throw error;
  }
}

// フィールド値を取得
function getFieldValue(obj, path) {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined || !(key in current)) {
      return undefined;
    }
    current = current[key];
  }
  
  return current;
}

// メイン処理
async function cleanupUnusedFields(skipAnalysis = false, skipBackup = false) {
  console.log('🧹 お品書きサイト用の不要フィールド削除開始...');
  console.log(`⚙️  分析スキップ: ${skipAnalysis ? 'はい' : 'いいえ'}`);
  console.log(`⚙️  バックアップスキップ: ${skipBackup ? 'はい' : 'いいえ'}`);
  
  // 削除対象フィールド一覧
  const fieldsToDelete = [
    // 重複フィールド
    'location', // areaで統一
    'facilities.facility_note', // ground_notesで統一
    'soccer_club.dorm_available', // dorm_detailsで統一
    
    // 使用されていないフィールド
    'key_features',
    'costs.total_annual_cost',
    'costs.living_costs',
    'costs.soccer_club_costs.travel_cost',
    
    // 使用されていない進路情報
    'career_info.career_paths'
  ];
  
  try {
    // 1. 削除前の分析
    if (!skipAnalysis) {
      const analysis = await analyzeFieldsToDelete(fieldsToDelete);
      
      console.log('\n⚠️  この分析結果を確認してから削除を実行してください。');
      console.log('💡 削除を実行する場合は、--execute オプションを付けて再実行してください。');
      
      return analysis;
    }
    
    // 2. バックアップ作成
    if (!skipBackup) {
      const backupFile = await createBackup();
      console.log(`💾 バックアップファイル: ${backupFile}`);
    }
    
    // 3. フィールド削除実行
    const deletedCount = await deleteMultipleFields(fieldsToDelete);
    
    console.log(`\n🎉 クリーンアップ完了!`);
    console.log(`📊 更新されたドキュメント数: ${deletedCount}件`);
    console.log(`🗑️  削除されたフィールド数: ${fieldsToDelete.length}種類`);
    
    return { deletedCount, fieldsToDelete };
    
  } catch (error) {
    console.error('❌ クリーンアップエラー:', error);
    throw error;
  }
}

// コマンドライン実行
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  const executeFlag = args.includes('--execute');
  const skipBackup = args.includes('--skip-backup');
  
  console.log('🧹 お品書きサイト - Firebaseフィールドクリーンアップツール');
  console.log('');
  
  if (command === 'analyze') {
    // 分析のみ実行
    cleanupUnusedFields(false, true)
      .then(() => {
        console.log('\n✅ 分析完了');
        process.exit(0);
      })
      .catch((error) => {
        console.error('❌ 分析に失敗しました:', error);
        process.exit(1);
      });
      
  } else if (command === 'cleanup') {
    if (!executeFlag) {
      // 分析のみ実行（安全のため）
      console.log('🔍 まず削除対象フィールドを分析します...');
      cleanupUnusedFields(false, true)
        .then(() => {
          console.log('\n💡 実際に削除を実行する場合は以下のコマンドを実行してください:');
          console.log('   node cleanup-unused-fields.js cleanup --execute');
          console.log('\n⚠️  バックアップなしで実行する場合（推奨しません）:');
          console.log('   node cleanup-unused-fields.js cleanup --execute --skip-backup');
          process.exit(0);
        })
        .catch((error) => {
          console.error('❌ 分析に失敗しました:', error);
          process.exit(1);
        });
    } else {
      // 実際の削除を実行
      console.log('⚠️  実際にフィールドを削除します...');
      console.log('');
      
      cleanupUnusedFields(true, skipBackup)
        .then((result) => {
          console.log('\n✅ 全ての不要フィールドを削除しました');
          console.log('📱 React アプリを再起動して変更を確認してください');
          process.exit(0);
        })
        .catch((error) => {
          console.error('❌ 削除に失敗しました:', error);
          process.exit(1);
        });
    }
    
  } else {
    console.log('使用方法:');
    console.log('  node cleanup-unused-fields.js analyze                    # 削除対象を分析');
    console.log('  node cleanup-unused-fields.js cleanup                   # 分析のみ（安全）');
    console.log('  node cleanup-unused-fields.js cleanup --execute         # 実際に削除実行');
    console.log('  node cleanup-unused-fields.js cleanup --execute --skip-backup  # バックアップなしで削除');
    console.log('');
    console.log('⚠️  --execute フラグを付けない限り、実際の削除は行われません（安全機能）');
  }
}

module.exports = { 
  cleanupUnusedFields, 
  deleteMultipleFields, 
  createBackup, 
  analyzeFieldsToDelete 
};