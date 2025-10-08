// validate-data-v2.js
// 新形式45列CSVデータの品質をチェックするスクリプト

const fs = require('fs');
const Papa = require('papaparse');

function validateCSVData(csvFilePath) {
  try {
    console.log('🔍 新形式CSVデータ品質チェック開始... (45列対応)');
    
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    const parsed = Papa.parse(csvContent, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      delimiter: ',',
      encoding: 'utf8'
    });
    
    const data = parsed.data;
    const issues = [];
    const stats = {
      total: 0,
      valid: 0,
      missingUniversityName: 0,
      missingCoachName: 0,
      missingArea: 0,
      missingLeague: 0, // 「カテゴリ」→「リーグ」に変更
      invalidMemberCount: 0,
      missingPLAYMAKERComment: 0,
      duplicateNames: new Set(),
      areas: new Map(),
      leagues: new Map(), // 「categories」→「leagues」に変更
      memberCounts: [],
      jLeagueCounts: [],
      // 新形式項目の統計
      withGroundName: 0,
      withGroundAddress: 0,
      withUniversityDorm: 0,
      withSoccerClubDorm: 0,
      withTuitionInfo: 0,
      withQualifications: 0,
      withCareerInfo: 0,
      withCampTravelInfo: 0
    };
    
    // 新形式の必須列をチェック
    const requiredNewColumns = [
      'リーグ', 'グラウンド名', 'グラウンド住所', 'グラウンド特記事項',
      '大学寮', 'サッカー部寮', '寮特記事項',
      '授業料', '入学金', '施設費', '部費', 'チームウェア代', '合宿・遠征費',
      '取得可能資格', '大学卒業後進路', 'サッカー部卒業後進路'
    ];
    
    console.log('\n📋 新形式項目の存在確認:');
    const missingColumns = [];
    requiredNewColumns.forEach(col => {
      if (parsed.meta.fields.includes(col)) {
        console.log(`  ✅ ${col}`);
      } else {
        console.log(`  ❌ ${col} (見つかりません)`);
        missingColumns.push(col);
      }
    });
    
    if (missingColumns.length > 0) {
      console.log(`\n⚠️ ${missingColumns.length}個の新形式項目が不足しています`);
    }
    
    // 各行をチェック
    data.forEach((row, index) => {
      const rowNum = index + 2; // ヘッダー行を考慮
      
      if (!row['大学名'] || !row['大学名'].trim()) {
        stats.missingUniversityName++;
        issues.push(`行${rowNum}: 大学名が空です`);
        return;
      }
      
      stats.total++;
      const universityName = row['大学名'].trim();
      
      // 重複チェック
      if (stats.duplicateNames.has(universityName)) {
        issues.push(`行${rowNum}: 重複した大学名「${universityName}」`);
      } else {
        stats.duplicateNames.add(universityName);
      }
      
      // 必須フィールドのチェック（新形式対応）
      if (!row['監督氏名'] || !row['監督氏名'].trim()) {
        stats.missingCoachName++;
        issues.push(`行${rowNum}: ${universityName} - 監督氏名が空です`);
      }
      
      if (!row['エリア'] || !row['エリア'].trim()) {
        stats.missingArea++;
        issues.push(`行${rowNum}: ${universityName} - エリアが空です`);
      } else {
        const area = row['エリア'].trim();
        stats.areas.set(area, (stats.areas.get(area) || 0) + 1);
      }
      
      // 「カテゴリ」→「リーグ」に変更
      if (!row['リーグ'] || !row['リーグ'].trim()) {
        stats.missingLeague++;
        issues.push(`行${rowNum}: ${universityName} - リーグが空です`);
      } else {
        const league = row['リーグ'].trim();
        stats.leagues.set(league, (stats.leagues.get(league) || 0) + 1);
      }
      
      // 部員数のチェック
      const memberCount = parseInt(row['部員数']);
      if (isNaN(memberCount) || memberCount <= 0) {
        stats.invalidMemberCount++;
        issues.push(`行${rowNum}: ${universityName} - 部員数が無効です (${row['部員数']})`);
      } else {
        stats.memberCounts.push(memberCount);
      }
      
      // PLAYMAKERコメントのチェック
      if (!row['PLAYMAKERコメント'] || !row['PLAYMAKERコメント'].trim()) {
        stats.missingPLAYMAKERComment++;
        issues.push(`行${rowNum}: ${universityName} - PLAYMAKERコメントが空です`);
      }
      
      // J内定数の合計計算
      const j22 = parseInt(row['22J内定']) || 0;
      const j23 = parseInt(row['23J内定']) || 0;
      const j24 = parseInt(row['24J内定']) || 0;
      const jTotal = j22 + j23 + j24;
      stats.jLeagueCounts.push(jTotal);
      
      // 新形式項目の統計
      if (row['グラウンド名'] && row['グラウンド名'].trim()) stats.withGroundName++;
      if (row['グラウンド住所'] && row['グラウンド住所'].trim()) stats.withGroundAddress++;
      if (row['大学寮'] && (row['大学寮'] === 'あり' || row['大学寮'] === '有')) stats.withUniversityDorm++;
      if (row['サッカー部寮'] && (row['サッカー部寮'] === 'あり' || row['サッカー部寮'] === '有')) stats.withSoccerClubDorm++;
      if (row['授業料'] && row['授業料'].trim()) stats.withTuitionInfo++;
      if (row['取得可能資格'] && row['取得可能資格'].trim()) stats.withQualifications++;
      if ((row['大学卒業後進路'] && row['大学卒業後進路'].trim()) || 
          (row['サッカー部卒業後進路'] && row['サッカー部卒業後進路'].trim())) stats.withCareerInfo++;
      if (row['合宿・遠征費'] && row['合宿・遠征費'].trim()) stats.withCampTravelInfo++;
      
      // データの一貫性チェック
      const membersByYear = [
        parseInt(row['新４年人数']) || 0,
        parseInt(row['新３年人数']) || 0,
        parseInt(row['新２年人数']) || 0,
        parseInt(row['新１年人数']) || 0
      ];
      const yearTotal = membersByYear.reduce((sum, count) => sum + count, 0);
      
      if (Math.abs(yearTotal - memberCount) > 10 && memberCount > 0) {
        issues.push(`行${rowNum}: ${universityName} - 学年別人数合計(${yearTotal})と部員数(${memberCount})に大きな差があります`);
      }
      
      stats.valid++;
    });
    
    // 統計計算
    const memberStats = {
      min: stats.memberCounts.length > 0 ? Math.min(...stats.memberCounts) : 0,
      max: stats.memberCounts.length > 0 ? Math.max(...stats.memberCounts) : 0,
      avg: stats.memberCounts.length > 0 ? Math.round(stats.memberCounts.reduce((sum, count) => sum + count, 0) / stats.memberCounts.length) : 0
    };
    
    const jLeagueStats = {
      min: stats.jLeagueCounts.length > 0 ? Math.min(...stats.jLeagueCounts) : 0,
      max: stats.jLeagueCounts.length > 0 ? Math.max(...stats.jLeagueCounts) : 0,
      avg: stats.jLeagueCounts.length > 0 ? Math.round(stats.jLeagueCounts.reduce((sum, count) => sum + count, 0) / stats.jLeagueCounts.length * 10) / 10 : 0
    };
    
    // 結果出力
    console.log('\n=== 新形式データ品質チェック結果 ===');
    console.log(`総行数: ${data.length}行`);
    console.log(`有効大学数: ${stats.valid}校`);
    console.log(`品質スコア: ${Math.round((stats.valid - issues.length) / stats.valid * 100)}%`);
    
    console.log('\n=== エラー・警告 ===');
    if (issues.length === 0) {
      console.log('✅ エラーはありません！');
    } else {
      console.log(`⚠️  ${issues.length}件の問題が見つかりました：`);
      issues.slice(0, 20).forEach(issue => console.log(`  - ${issue}`));
      if (issues.length > 20) {
        console.log(`  ... 他${issues.length - 20}件`);
      }
    }
    
    console.log('\n=== データ統計（基本項目） ===');
    console.log(`大学名欠損: ${stats.missingUniversityName}校`);
    console.log(`監督名欠損: ${stats.missingCoachName}校`);
    console.log(`エリア欠損: ${stats.missingArea}校`);
    console.log(`リーグ欠損: ${stats.missingLeague}校`); // 「カテゴリ」→「リーグ」
    console.log(`部員数無効: ${stats.invalidMemberCount}校`);
    console.log(`コメント欠損: ${stats.missingPLAYMAKERComment}校`);
    
    console.log('\n=== 新形式項目統計 ===');
    console.log(`グラウンド名あり: ${stats.withGroundName}校 (${Math.round(stats.withGroundName/stats.total*100)}%)`);
    console.log(`グラウンド住所あり: ${stats.withGroundAddress}校 (${Math.round(stats.withGroundAddress/stats.total*100)}%)`);
    console.log(`大学寮あり: ${stats.withUniversityDorm}校 (${Math.round(stats.withUniversityDorm/stats.total*100)}%)`);
    console.log(`サッカー部寮あり: ${stats.withSoccerClubDorm}校 (${Math.round(stats.withSoccerClubDorm/stats.total*100)}%)`);
    console.log(`授業料情報あり: ${stats.withTuitionInfo}校 (${Math.round(stats.withTuitionInfo/stats.total*100)}%)`);
    console.log(`取得可能資格あり: ${stats.withQualifications}校 (${Math.round(stats.withQualifications/stats.total*100)}%)`);
    console.log(`進路情報あり: ${stats.withCareerInfo}校 (${Math.round(stats.withCareerInfo/stats.total*100)}%)`);
    console.log(`合宿・遠征情報あり: ${stats.withCampTravelInfo}校 (${Math.round(stats.withCampTravelInfo/stats.total*100)}%)`);
    
    console.log('\n=== 地域分布 ===');
    [...stats.areas.entries()].sort((a, b) => b[1] - a[1]).forEach(([area, count]) => {
      console.log(`  ${area}: ${count}校`);
    });
    
    console.log('\n=== リーグ分布 ===');
    if (stats.leagues.size > 0) {
      [...stats.leagues.entries()].sort((a, b) => b[1] - a[1]).forEach(([league, count]) => {
        console.log(`  ${league}: ${count}校`);
      });
    } else {
      console.log('  ⚠️ リーグ情報がありません');
    }
    
    console.log('\n=== 部員数統計 ===');
    console.log(`最小: ${memberStats.min}名`);
    console.log(`最大: ${memberStats.max}名`);
    console.log(`平均: ${memberStats.avg}名`);
    
    console.log('\n=== J内定者統計（過去3年合計） ===');
    console.log(`最小: ${jLeagueStats.min}名`);
    console.log(`最大: ${jLeagueStats.max}名`);
    console.log(`平均: ${jLeagueStats.avg}名`);
    console.log(`実績あり: ${stats.jLeagueCounts.filter(count => count > 0).length}校`);
    
    // 推奨事項
    console.log('\n=== 推奨事項 ===');
    if (missingColumns.length > 0) {
      console.log('🔧 新形式の必須項目が不足しています。CSVファイルを確認してください');
    }
    if (stats.missingLeague > 0) {
      console.log('🏟️ リーグ情報が不足している大学があります');
    }
    if (stats.missingPLAYMAKERComment > 0) {
      console.log('📝 PLAYMAKERコメントが不足している大学があります');
    }
    if (stats.missingCoachName > 0) {
      console.log('👨‍🏫 監督名が不足している大学があります');
    }
    if (issues.length > 50) {
      console.log('🔧 問題が多数あります。重要な問題から順次修正することをお勧めします');
    } else if (issues.length > 0) {
      console.log('🔧 上記の問題を修正してから投入することを推奨します');
    }
    
    // 品質レポートファイル出力
    const report = {
      timestamp: new Date().toISOString(),
      data_format: 'v2_45columns',
      summary: {
        totalRows: data.length,
        validUniversities: stats.valid,
        qualityScore: Math.round((stats.valid - issues.length) / stats.valid * 100),
        issueCount: issues.length,
        missingColumns: missingColumns
      },
      issues: issues,
      statistics: {
        areas: Object.fromEntries(stats.areas),
        leagues: Object.fromEntries(stats.leagues),
        memberStats,
        jLeagueStats,
        newFormatStats: {
          withGroundName: stats.withGroundName,
          withGroundAddress: stats.withGroundAddress,
          withUniversityDorm: stats.withUniversityDorm,
          withSoccerClubDorm: stats.withSoccerClubDorm,
          withTuitionInfo: stats.withTuitionInfo,
          withQualifications: stats.withQualifications,
          withCareerInfo: stats.withCareerInfo,
          withCampTravelInfo: stats.withCampTravelInfo
        }
      }
    };
    
    fs.writeFileSync('./data-quality-report-v2.json', JSON.stringify(report, null, 2));
    console.log('\n💾 詳細レポートを data-quality-report-v2.json に出力しました');
    
    // 総合判定
    const qualityScore = Math.round((stats.valid - issues.length) / stats.valid * 100);
    
    if (qualityScore >= 85 && missingColumns.length === 0) {
      console.log('\n✅ 新形式データ品質は良好です。Firebase投入を推奨します。');
    } else if (qualityScore >= 60 && missingColumns.length <= 3) {
      console.log('\n⚠️  新形式データ品質は普通です。重要な問題を修正後の投入を推奨します。');
    } else {
      console.log('\n❌ 新形式データ品質に問題があります。修正が必要です。');
    }
    
    return {
      isValid: issues.length === 0 && missingColumns.length === 0,
      issueCount: issues.length,
      validCount: stats.valid,
      qualityScore: qualityScore,
      missingColumns: missingColumns
    };
    
  } catch (error) {
    console.error('❌ バリデーションエラー:', error);
    return { isValid: false, error: error.message };
  }
}

// スクリプト実行
if (require.main === module) {
  const csvFilePath = process.argv[2] || './oshinagaki_data2.csv';
  
  console.log('🔍 新形式CSVデータ品質チェックツール v2');
  console.log('🆕 45列対応版');
  console.log(`📄 CSVファイル: ${csvFilePath}`);
  console.log('');
  
  const result = validateCSVData(csvFilePath);
  
  if (result.qualityScore >= 85) {
    console.log('\n🎉 新形式データの準備完了！次のステップに進んでください。');
  } else if (result.qualityScore >= 60) {
    console.log('\n⚡ データ品質は実用レベルです。このまま投入も可能です。');
  } else {
    console.log('\n🔧 データ品質の改善が推奨されます。');
  }
}

module.exports = { validateCSVData };