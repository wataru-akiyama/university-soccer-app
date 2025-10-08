// update-fields-bulk.js
// Firebaseフィールドの一括変更スクリプト（名称変更・型変更・内容変更）

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

// ユーティリティ関数：ネストしたフィールドの存在チェック
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

// ユーティリティ関数：ネストしたフィールド値の取得
function getFieldValue(obj, path) {
  if (!hasField(obj, path)) return undefined;
  
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    current = current[key];
  }
  
  return current;
}

// ユーティリティ関数：ネストしたフィールド値の設定
function setFieldValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
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
    const backupFileName = `backup_before_update_${timestamp}.json`;
    
    fs.writeFileSync(backupFileName, JSON.stringify(backupData, null, 2));
    
    console.log(`📂 バックアップ作成完了: ${backupFileName}`);
    console.log(`📊 バックアップ件数: ${backupData.length}件`);
    
    return backupFileName;
    
  } catch (error) {
    console.error('⚠️ バックアップ作成エラー:', error);
    throw error;
  }
}

// 1. フィールド名変更（リネーム）
async function renameFields(renameRules) {
  console.log('🔄 フィールド名変更開始...');
  console.log('変更ルール:', renameRules);
  
  try {
    const snapshot = await db.collection('universities').get();
    const batchSize = 500;
    let totalUpdated = 0;
    let currentBatch = db.batch();
    let batchCount = 0;
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const updates = {};
      let hasUpdates = false;
      
      for (const rule of renameRules) {
        const { oldPath, newPath } = rule;
        
        if (hasField(data, oldPath)) {
          const value = getFieldValue(data, oldPath);
          
          // 新しいフィールドに値を設定
          updates[newPath] = value;
          
          // 古いフィールドを削除
          updates[oldPath] = admin.firestore.FieldValue.delete();
          
          hasUpdates = true;
        }
      }
      
      if (hasUpdates) {
        currentBatch.update(doc.ref, updates);
        batchCount++;
        totalUpdated++;
        
        if (batchCount >= batchSize) {
          await currentBatch.commit();
          console.log(`✅ ${batchCount}件処理完了 (累計: ${totalUpdated}件)`);
          
          currentBatch = db.batch();
          batchCount = 0;
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }
    
    if (batchCount > 0) {
      await currentBatch.commit();
      console.log(`✅ ${batchCount}件処理完了 (累計: ${totalUpdated}件)`);
    }
    
    console.log(`🎉 フィールド名変更完了: ${totalUpdated}件のドキュメントを更新`);
    return totalUpdated;
    
  } catch (error) {
    console.error('❌ フィールド名変更エラー:', error);
    throw error;
  }
}

// 2. データ型変更
async function convertFieldTypes(typeRules) {
  console.log('🔀 データ型変更開始...');
  console.log('変換ルール:', typeRules);
  
  try {
    const snapshot = await db.collection('universities').get();
    const batchSize = 500;
    let totalUpdated = 0;
    let currentBatch = db.batch();
    let batchCount = 0;
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const updates = {};
      let hasUpdates = false;
      
      for (const rule of typeRules) {
        const { fieldPath, fromType, toType, converter } = rule;
        
        if (hasField(data, fieldPath)) {
          const currentValue = getFieldValue(data, fieldPath);
          const currentType = typeof currentValue;
          
          // 型チェック
          if (fromType === 'any' || currentType === fromType || 
              (fromType === 'array' && Array.isArray(currentValue)) ||
              (fromType === 'null' && currentValue === null)) {
            
            let convertedValue;
            
            if (converter && typeof converter === 'function') {
              // カスタム変換関数を使用
              convertedValue = converter(currentValue);
            } else {
              // デフォルト変換
              convertedValue = defaultTypeConverter(currentValue, toType);
            }
            
            if (convertedValue !== currentValue) {
              updates[fieldPath] = convertedValue;
              hasUpdates = true;
            }
          }
        }
      }
      
      if (hasUpdates) {
        currentBatch.update(doc.ref, updates);
        batchCount++;
        totalUpdated++;
        
        if (batchCount >= batchSize) {
          await currentBatch.commit();
          console.log(`✅ ${batchCount}件処理完了 (累計: ${totalUpdated}件)`);
          
          currentBatch = db.batch();
          batchCount = 0;
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }
    
    if (batchCount > 0) {
      await currentBatch.commit();
      console.log(`✅ ${batchCount}件処理完了 (累計: ${totalUpdated}件)`);
    }
    
    console.log(`🎉 データ型変更完了: ${totalUpdated}件のドキュメントを更新`);
    return totalUpdated;
    
  } catch (error) {
    console.error('❌ データ型変更エラー:', error);
    throw error;
  }
}

// 3. フィールド内容変更
async function updateFieldValues(updateRules) {
  console.log('📝 フィールド内容変更開始...');
  console.log('更新ルール:', updateRules);
  
  try {
    const snapshot = await db.collection('universities').get();
    const batchSize = 500;
    let totalUpdated = 0;
    let currentBatch = db.batch();
    let batchCount = 0;
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const updates = {};
      let hasUpdates = false;
      
      for (const rule of updateRules) {
        const { fieldPath, condition, newValue, transformer } = rule;
        
        if (hasField(data, fieldPath)) {
          const currentValue = getFieldValue(data, fieldPath);
          let shouldUpdate = false;
          let updatedValue = newValue;
          
          // 条件チェック
          if (typeof condition === 'function') {
            shouldUpdate = condition(currentValue, data);
          } else if (typeof condition === 'object' && condition !== null) {
            // 完全一致、部分一致、正規表現など
            shouldUpdate = checkCondition(currentValue, condition);
          } else if (condition === '*') {
            // 全ての値を対象
            shouldUpdate = true;
          }
          
          if (shouldUpdate) {
            // カスタム変換関数がある場合
            if (transformer && typeof transformer === 'function') {
              updatedValue = transformer(currentValue, data);
            }
            
            if (updatedValue !== currentValue) {
              updates[fieldPath] = updatedValue;
              hasUpdates = true;
            }
          }
        }
      }
      
      if (hasUpdates) {
        currentBatch.update(doc.ref, updates);
        batchCount++;
        totalUpdated++;
        
        if (batchCount >= batchSize) {
          await currentBatch.commit();
          console.log(`✅ ${batchCount}件処理完了 (累計: ${totalUpdated}件)`);
          
          currentBatch = db.batch();
          batchCount = 0;
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }
    
    if (batchCount > 0) {
      await currentBatch.commit();
      console.log(`✅ ${batchCount}件処理完了 (累計: ${totalUpdated}件)`);
    }
    
    console.log(`🎉 フィールド内容変更完了: ${totalUpdated}件のドキュメントを更新`);
    return totalUpdated;
    
  } catch (error) {
    console.error('❌ フィールド内容変更エラー:', error);
    throw error;
  }
}

// デフォルトの型変換関数
function defaultTypeConverter(value, toType) {
  switch (toType) {
    case 'string':
      return String(value);
    case 'number':
      const num = parseFloat(value);
      return isNaN(num) ? 0 : num;
    case 'boolean':
      if (typeof value === 'string') {
        return value === 'true' || value === '有' || value === 'あり' || value === '○';
      }
      return Boolean(value);
    case 'array':
      return Array.isArray(value) ? value : [value];
    case 'object':
      return typeof value === 'object' ? value : { value: value };
    default:
      return value;
  }
}

// 条件チェック関数
function checkCondition(value, condition) {
  if (condition.exact !== undefined) {
    return value === condition.exact;
  }
  if (condition.contains !== undefined) {
    return String(value).includes(condition.contains);
  }
  if (condition.regex !== undefined) {
    return new RegExp(condition.regex).test(String(value));
  }
  if (condition.in !== undefined) {
    return condition.in.includes(value);
  }
  return false;
}

// 変更前の分析
async function analyzeChanges(rules, operationType) {
  console.log(`🔍 ${operationType}の分析開始...`);
  
  try {
    const snapshot = await db.collection('universities').get();
    const analysis = {};
    
    for (const rule of rules) {
      const ruleKey = JSON.stringify(rule);
      analysis[ruleKey] = {
        affected: 0,
        total: snapshot.docs.length,
        examples: []
      };
      
      for (const doc of snapshot.docs) {
        const data = doc.data();
        let willBeAffected = false;
        
        if (operationType === 'rename') {
          willBeAffected = hasField(data, rule.oldPath);
        } else if (operationType === 'convert') {
          if (hasField(data, rule.fieldPath)) {
            const currentValue = getFieldValue(data, rule.fieldPath);
            const currentType = typeof currentValue;
            willBeAffected = rule.fromType === 'any' || currentType === rule.fromType;
          }
        } else if (operationType === 'update') {
          if (hasField(data, rule.fieldPath)) {
            const currentValue = getFieldValue(data, rule.fieldPath);
            if (typeof rule.condition === 'function') {
              willBeAffected = rule.condition(currentValue, data);
            } else if (typeof rule.condition === 'object') {
              willBeAffected = checkCondition(currentValue, rule.condition);
            } else if (rule.condition === '*') {
              willBeAffected = true;
            }
          }
        }
        
        if (willBeAffected) {
          analysis[ruleKey].affected++;
          
          if (analysis[ruleKey].examples.length < 3) {
            const exampleValue = operationType === 'rename' 
              ? getFieldValue(data, rule.oldPath)
              : getFieldValue(data, rule.fieldPath);
              
            analysis[ruleKey].examples.push({
              docId: doc.id,
              universityName: data.university_name,
              currentValue: typeof exampleValue === 'object' ? '[Object]' : exampleValue
            });
          }
        }
      }
    }
    
    // 分析結果を表示
    console.log(`\n📊 ${operationType}の分析結果:`);
    console.log('='.repeat(60));
    
    for (const [ruleKey, info] of Object.entries(analysis)) {
      const rule = JSON.parse(ruleKey);
      console.log(`\n🔸 ルール: ${JSON.stringify(rule, null, 2)}`);
      console.log(`   影響するドキュメント: ${info.affected}/${info.total}件 (${Math.round(info.affected/info.total*100)}%)`);
      
      if (info.examples.length > 0) {
        console.log('   サンプル値:');
        info.examples.forEach((example, index) => {
          console.log(`     ${index + 1}. ${example.universityName}: ${example.currentValue}`);
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

// メイン処理関数
async function bulkUpdateFields(operationType, rules, skipAnalysis = false, skipBackup = false) {
  console.log(`🚀 フィールド一括${operationType}開始...`);
  console.log(`⚙️  分析スキップ: ${skipAnalysis ? 'はい' : 'いいえ'}`);
  console.log(`⚙️  バックアップスキップ: ${skipBackup ? 'はい' : 'いいえ'}`);
  
  try {
    // 1. 変更前の分析
    if (!skipAnalysis) {
      const analysis = await analyzeChanges(rules, operationType);
      console.log('\n⚠️  この分析結果を確認してから変更を実行してください。');
      console.log('💡 変更を実行する場合は、--execute オプションを付けて再実行してください。');
      return analysis;
    }
    
    // 2. バックアップ作成
    if (!skipBackup) {
      await createBackup();
    }
    
    // 3. 実際の変更実行
    let result;
    switch (operationType) {
      case 'rename':
        result = await renameFields(rules);
        break;
      case 'convert':
        result = await convertFieldTypes(rules);
        break;
      case 'update':
        result = await updateFieldValues(rules);
        break;
      default:
        throw new Error(`未対応の操作タイプ: ${operationType}`);
    }
    
    console.log(`\n🎉 フィールド一括${operationType}完了!`);
    console.log(`📊 更新されたドキュメント数: ${result}件`);
    
    return result;
    
  } catch (error) {
    console.error(`❌ フィールド一括${operationType}エラー:`, error);
    throw error;
  }
}

// コマンドライン実行
if (require.main === module) {
  const args = process.argv.slice(2);
  const operation = args[0]; // rename, convert, update
  const executeFlag = args.includes('--execute');
  const skipBackup = args.includes('--skip-backup');
  
  console.log('🔧 Firebaseフィールド一括変更ツール');
  console.log('');
  
  // サンプルルール（実際の使用時は適宜変更）
  const sampleRules = {
    rename: [
      // フィールド名変更のサンプル（必要に応じて使用）
      // { oldPath: 'old_field_name', newPath: 'new_field_name' }
    ],
    convert: [
      // データ型変更のサンプル（必要に応じて使用）
      // { fieldPath: 'some_field', fromType: 'string', toType: 'number' }
    ],
    update: [
      // 🎯 entry_conditions.general_admissionをboolean→文字列に変換
      {
        fieldPath: 'entry_conditions.general_admission',
        condition: '*', // 全ての値を対象
        transformer: (currentValue, data) => {
          // 現在の値と条件を取得
          const generalAdmission = currentValue;
          const generalConditions = data.entry_conditions?.general_conditions;
          
          // 変換ロジック
          if (generalAdmission === true) {
            // trueの場合、条件の有無で判定
            if (generalConditions && generalConditions.trim()) {
              return '条件有';  // 条件記載あり
            } else {
              return '可';      // 条件記載なし
            }
          } else {
            // false, null, undefined の場合
            return '不可';
          }
        }
      }
    ]
  };
  
  if (!operation || !sampleRules[operation]) {
    console.log('使用方法:');
    console.log('  node update-fields-bulk.js rename                    # フィールド名変更（分析のみ）');
    console.log('  node update-fields-bulk.js rename --execute         # フィールド名変更実行');
    console.log('  node update-fields-bulk.js convert                  # データ型変更（分析のみ）');
    console.log('  node update-fields-bulk.js convert --execute        # データ型変更実行');
    console.log('  node update-fields-bulk.js update                   # フィールド内容変更（分析のみ）');
    console.log('  node update-fields-bulk.js update --execute         # フィールド内容変更実行');
    console.log('');
    console.log('⚠️  実際の変更ルールはスクリプト内のsampleRulesを編集してください');
    console.log('⚠️  --execute フラグを付けない限り、実際の変更は行われません（安全機能）');
    process.exit(0);
  }
  
  const rules = sampleRules[operation];
  
  if (!executeFlag) {
    // 分析のみ実行（安全のため）
    console.log(`🔍 ${operation}の分析を実行します...`);
    bulkUpdateFields(operation, rules, false, true)
      .then(() => {
        console.log(`\n💡 実際に${operation}を実行する場合は以下のコマンドを実行してください:`);
        console.log(`   node update-fields-bulk.js ${operation} --execute`);
        process.exit(0);
      })
      .catch((error) => {
        console.error('分析に失敗:', error);
        process.exit(1);
      });
  } else {
    // 実際の変更を実行
    console.log(`⚠️  実際に${operation}を実行します...`);
    
    bulkUpdateFields(operation, rules, true, skipBackup)
      .then((result) => {
        console.log(`\n✅ ${operation}が完了しました`);
        console.log('📱 React アプリを再起動して変更を確認してください');
        process.exit(0);
      })
      .catch((error) => {
        console.error(`${operation}に失敗:`, error);
        process.exit(1);
      });
  }
}

module.exports = { 
  bulkUpdateFields,
  renameFields,
  convertFieldTypes,
  updateFieldValues,
  analyzeChanges,
  createBackup
};