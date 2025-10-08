// test-conversion-v2.js
// 新形式45列CSVデータ変換をテストするスクリプト（Firebase接続なし）

const fs = require('fs');
const Papa = require('papaparse');

// 変換関数をインポート
const { convertCSVToFirebaseFormat } = require('./csv-to-firebase-v2');

// テスト実行
function testConversion(csvFilePath) {
  try {
    console.log('🧪 新形式CSVデータ変換テスト開始... (45列対応)');
    
    // CSVファイル読み込み
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    
    // CSVパース
    const parsed = Papa.parse(csvContent, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      delimiter: ',',
      encoding: 'utf8'
    });
    
    console.log(`📊 ${parsed.data.length}行のデータを読み込みました`);
    console.log(`📋 列数: ${parsed.meta.fields.length}列`);
    
    // 新規項目の確認
    const newColumns = [
      'リーグ', 'グラウンド名', 'グラウンド住所', 'グラウンド特記事項',
      '大学寮', 'サッカー部寮', '寮特記事項',
      '授業料', '入学金', '施設費', '部費', 'チームウェア代', '合宿・遠征費',
      '取得可能資格', '大学卒業後進路', 'サッカー部卒業後進路'
    ];
    
    console.log('\n📋 新規項目の存在確認:');
    const foundColumns = [];
    const missingColumns = [];
    
    newColumns.forEach(col => {
      if (parsed.meta.fields.includes(col)) {
        foundColumns.push(col);
        console.log(`  ✅ ${col}`);
      } else {
        missingColumns.push(col);
        console.log(`  ❌ ${col} (見つかりません)`);
      }
    });
    
    // 最初の5行をテスト変換
    const testRows = parsed.data.slice(0, 5).filter(row => row['大学名'] && row['大学名'].trim());
    
    console.log('\n=== 変換テスト結果 ===');
    
    testRows.forEach((row, index) => {
      try {
        const converted = convertCSVToFirebaseFormat(row, index);
        
        console.log(`\n${index + 1}. ${converted.university_name}`);
        console.log(`   エリア: ${converted.area}`);
        console.log(`   リーグ: ${converted.soccer_club.league}`);
        console.log(`   部員数: ${converted.soccer_club.total_members}名`);
        console.log(`   J内定総数: ${converted.soccer_club.j_league_nominees_2022_24}名`);
        
        // 新規項目の確認
        console.log(`   グラウンド: ${converted.facilities.ground_name || '情報なし'}`);
        console.log(`   大学寮: ${converted.soccer_club.dorm_details.university_dorm ? 'あり' : 'なし'}`);
        console.log(`   サッカー部寮: ${converted.soccer_club.dorm_details.soccer_club_dorm ? 'あり' : 'なし'}`);
        console.log(`   年間授業料: ${converted.costs.university_costs.annual_tuition.toLocaleString()}円`);
        console.log(`   合宿・遠征: ${converted.costs.soccer_club_costs.camp_travel_info || '情報なし'}`);
        console.log(`   年間総費用: ${converted.costs.total_annual_cost.toLocaleString()}円`);
        console.log(`   取得可能資格: ${converted.soccer_club.qualifications.length}件`);
        
        // PLAYMAKERコメントの長さ確認
        if (converted.extended_data.playmaker_comment) {
          console.log(`   コメント: ${converted.extended_data.playmaker_comment.length}文字`);
        }
        
      } catch (error) {
        console.error(`❌ ${row['大学名']} の変換エラー:`, error.message);
      }
    });
    
    // 統計情報
    console.log('\n=== 変換統計（新形式項目中心） ===');
    const stats = {
      total: 0,
      withDorm: 0,
      withUniversityDorm: 0,
      withSoccerClubDorm: 0,
      withSportsRecommend: 0,
      withGroundName: 0,
      withTuitionInfo: 0,
      withQualifications: 0,
      withCareerInfo: 0,
      areas: new Set(),
      leagues: new Set(),
      costs: []
    };
    
    parsed.data.forEach((row, index) => {
      if (row['大学名'] && row['大学名'].trim()) {
        try {
          const converted = convertCSVToFirebaseFormat(row, index);
          stats.total++;
          
          if (converted.soccer_club.dorm_available) stats.withDorm++;
          if (converted.soccer_club.dorm_details.university_dorm) stats.withUniversityDorm++;
          if (converted.soccer_club.dorm_details.soccer_club_dorm) stats.withSoccerClubDorm++;
          if (converted.entry_conditions.sports_recommend) stats.withSportsRecommend++;
          if (converted.facilities.ground_name) stats.withGroundName++;
          if (converted.costs.university_costs.annual_tuition > 0) stats.withTuitionInfo++;
          if (converted.soccer_club.qualifications.length > 0) stats.withQualifications++;
          if (converted.career_info.university_career_paths || converted.career_info.soccer_club_career_paths) stats.withCareerInfo++;
          
          stats.areas.add(converted.area);
          stats.leagues.add(converted.soccer_club.league);
          stats.costs.push(converted.costs.total_annual_cost);
          
        } catch (error) {
          console.error(`統計処理エラー: ${row['大学名']}`);
        }
      }
    });
    
    // 費用統計
    const validCosts = stats.costs.filter(cost => cost > 0);
    const avgCost = validCosts.length > 0 ? Math.round(validCosts.reduce((sum, cost) => sum + cost, 0) / validCosts.length) : 0;
    const minCost = validCosts.length > 0 ? Math.min(...validCosts) : 0;
    const maxCost = validCosts.length > 0 ? Math.max(...validCosts) : 0;
    
    console.log(`総大学数: ${stats.total}校`);
    console.log(`何らかの寮あり: ${stats.withDorm}校 (${Math.round(stats.withDorm/stats.total*100)}%)`);
    console.log(`大学寮あり: ${stats.withUniversityDorm}校 (${Math.round(stats.withUniversityDorm/stats.total*100)}%)`);
    console.log(`サッカー部寮あり: ${stats.withSoccerClubDorm}校 (${Math.round(stats.withSoccerClubDorm/stats.total*100)}%)`);
    console.log(`スポーツ推薦あり: ${stats.withSportsRecommend}校 (${Math.round(stats.withSportsRecommend/stats.total*100)}%)`);
    console.log(`グラウンド名あり: ${stats.withGroundName}校 (${Math.round(stats.withGroundName/stats.total*100)}%)`);
    console.log(`授業料情報あり: ${stats.withTuitionInfo}校 (${Math.round(stats.withTuitionInfo/stats.total*100)}%)`);
    console.log(`取得可能資格あり: ${stats.withQualifications}校 (${Math.round(stats.withQualifications/stats.total*100)}%)`);
    console.log(`進路情報あり: ${stats.withCareerInfo}校 (${Math.round(stats.withCareerInfo/stats.total*100)}%)`);
    console.log(`地域数: ${stats.areas.size}地域`);
    console.log(`リーグ数: ${stats.leagues.size}リーグ`);
    
    console.log('\n=== 費用統計 ===');
    console.log(`平均年間総費用: ${avgCost.toLocaleString()}円`);
    console.log(`最低年間総費用: ${minCost.toLocaleString()}円`);
    console.log(`最高年間総費用: ${maxCost.toLocaleString()}円`);
    
    console.log('\n地域一覧:', Array.from(stats.areas).sort());
    console.log('\nリーグ一覧:', Array.from(stats.leagues).sort());
    
    // サンプルJSONファイル出力
    const sampleData = testRows.map((row, index) => convertCSVToFirebaseFormat(row, index));
    fs.writeFileSync('./sample-converted-data-v2.json', JSON.stringify(sampleData, null, 2));
    console.log('\n💾 サンプルデータを sample-converted-data-v2.json に出力しました');
    
    // 新規項目のサンプル表示
    if (sampleData.length > 0) {
      console.log('\n=== 新規項目サンプル表示 ===');
      const sample = sampleData[0];
      console.log('グラウンド情報:');
      console.log(`  名前: ${sample.facilities.ground_name}`);
      console.log(`  住所: ${sample.facilities.ground_address}`);
      console.log(`  特記事項: ${sample.facilities.ground_notes}`);
      
      console.log('寮情報:');
      console.log(`  大学寮: ${sample.soccer_club.dorm_details.university_dorm}`);
      console.log(`  サッカー部寮: ${sample.soccer_club.dorm_details.soccer_club_dorm}`);
      console.log(`  寮特記事項: ${sample.soccer_club.dorm_details.dorm_notes}`);
      
      console.log('費用情報:');
      console.log(`  授業料: ${sample.costs.university_costs.annual_tuition.toLocaleString()}円`);
      console.log(`  入学金: ${sample.costs.university_costs.entrance_fee.toLocaleString()}円`);
      console.log(`  合宿・遠征: ${sample.costs.soccer_club_costs.camp_travel_info || '情報なし'}`);
      console.log(`  年間総費用: ${sample.costs.total_annual_cost.toLocaleString()}円`);
      
      console.log('資格情報:');
      console.log(`  取得可能資格: ${sample.soccer_club.qualifications.join(', ') || '情報なし'}`);
    }
    
    console.log('\n✅ 新形式変換テスト完了！');
    
  } catch (error) {
    console.error('❌ テストエラー:', error);
  }
}

// スクリプト実行
if (require.main === module) {
  const csvFilePath = process.argv[2] || './oshinagaki_data2.csv';
  
  console.log('🧪 新形式CSVデータ変換テストツール v2');
  console.log('🆕 45列対応版');
  console.log(`📄 CSVファイル: ${csvFilePath}`);
  console.log('');
  
  testConversion(csvFilePath);
}

module.exports = { testConversion };