// src/utils/csvMapping.js
import Papa from 'papaparse';
/**
 * CSVデータから一意のIDを生成
 * 
 * @param {string} universityName 大学名
 * @returns {string} 一意のID
 */
export const generateId = (universityName) => {
    // undefined または空文字列のチェック
    if (!universityName) {
        console.warn('大学名が未定義です。一時IDを生成します。');
        return `temp-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    
    // 大学名からシンプルなIDを生成（スペースや記号を除去）
    return universityName
      .replace(/[^a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '')
      .toLowerCase();
  };
  
  /**
   * CSVデータを大学オブジェクトに変換
   * 
   * @param {Object} csvRow CSVデータの1行
   * @returns {Object} 大学データオブジェクト
   */
  export const mapCsvToUniversity = (csvRow) => {
    // nullチェックを追加
    if (!csvRow) {
        console.warn('CSVの行データがnullまたはundefinedです');
        return null;
    }
    
    console.log('処理中のCSV行:', csvRow);
    
    // 大学名のフォールバック
    const universityName = csvRow['大学名'] || '不明大学';
    const id = generateId(universityName);
    
    // 評定基準と受入人数を抽出（テキストから数値を抽出）
    const recommendCriteria = csvRow['スポーツ推薦基準評定'] ? parseFloat(csvRow['スポーツ推薦基準評定']) : null;
    const acceptanceCount = csvRow['スポーツ推薦受入人数'] ? parseInt(csvRow['スポーツ推薦受入人数']) : null;
    
    // Jリーグ内定者トレンド計算
    const jLeagueTrend = calculateJLeagueTrend(
      csvRow['22J内定'] ? parseFloat(csvRow['22J内定']) : 0,
      csvRow['23J内定'] ? parseFloat(csvRow['23J内定']) : 0,
      csvRow['24J内定'] ? parseFloat(csvRow['24J内定']) : 0
    );
    
    return {
      id,
      university_name: csvRow['大学名'] || '',
      homepage_url: csvRow['HP'] || '',
      main_faculties: parseFaculties(csvRow['部員主な学部']),
      soccer_club: {
        league: csvRow['カテゴリ'] || '',
        coach_name: csvRow['監督氏名'] || '',
        total_members: parseInt(csvRow['部員数']) || 0,
        members_by_grade: {
          "1年": parseFloat(csvRow['新１年人数']) || 0,
          "2年": parseFloat(csvRow['新２年人数']) || 0,
          "3年": parseFloat(csvRow['新３年人数']) || 0,
          "4年": parseFloat(csvRow['新４年人数']) || 0
        },
        j_league_nominees_2022: parseFloat(csvRow['22J内定']) || 0,
        j_league_nominees_2023: parseFloat(csvRow['23J内定']) || 0,
        j_league_nominees_2024: parseFloat(csvRow['24J内定']) || 0,
        denso_cup_2024_25: parseFloat(csvRow['24デンソー出場']) || 0,
        soccer_field_count: parseFloat(csvRow['面数']) || 0,
        dorm_available: csvRow['部員寮'] === 'あり',
        facility_note: csvRow['施設特記事項'] || '',
        sports_scholarship: false, // CSVにデータがないためデフォルトはfalse
        qualifications: parseQualifications(csvRow['部員主な学部']),
        qualification_note: ''
      },
      entry_conditions: {
        sports_recommend: csvRow['スポーツ推薦有無'] === 'あり',
        recommend_criteria: csvRow['スポーツ推薦基準評定'] ? `評定${csvRow['スポーツ推薦基準評定']}以上、受入人数${csvRow['スポーツ推薦受入人数']}名程度` : '',
        selection: csvRow['セレクション有無'] === 'あり',
        selection_period: csvRow['セレクション時期'] || '',
        general_admission: csvRow['一般入部可否'] === 'あり',
        general_conditions: csvRow['入部条件'] || ''
      },
      // 追加データ
      newMembers2024: csvRow['24新入部員'] || '',
      newMembers2025: csvRow['25新入部員'] || '',
      jLeagueTrend,
      evaluationGrade: recommendCriteria,
      acceptanceCount: acceptanceCount,
      playmakerComment: csvRow['PLAYMAKERコメント'] || ''
    };
  };
  
  /**
   * 学部情報を配列に変換
   * 
   * @param {string} facultiesStr 学部情報文字列
   * @returns {Array} 学部情報配列
   */
  function parseFaculties(facultiesStr) {
    if (!facultiesStr) return [];
    
    // コンマや、で分割して配列に変換
    return facultiesStr.split(/[、,・]/).map(f => f.trim()).filter(Boolean);
  }
  
  /**
   * 学部情報から想定される取得可能資格を抽出
   * 
   * @param {string} facultiesStr 学部情報文字列
   * @returns {Array} 取得可能な資格の配列
   */
  function parseQualifications(facultiesStr) {
    if (!facultiesStr) return [];
    
    const qualifications = [];
    
    // 体育学部、スポーツ科学部などが含まれていれば教員免許を追加
    if (/(体育|スポーツ科学|体育)/.test(facultiesStr)) {
      qualifications.push("教員免許（保健体育）");
      qualifications.push("JFA公認コーチングライセンス");
    }
    
    // 医学、健康科学、保健などが含まれていればスポーツトレーナー資格を追加
    if (/(医学|健康|保健|栄養)/.test(facultiesStr)) {
      qualifications.push("スポーツトレーナー資格");
    }
    
    // 経営学部、経済学部などが含まれていればスポーツビジネス資格を追加
    if (/(経営|経済|商)/.test(facultiesStr)) {
      qualifications.push("スポーツビジネス関連資格");
    }
    
    // デフォルトで審判資格を追加
    qualifications.push("審判資格");
    
    return qualifications;
  }
  
  /**
   * Jリーグ内定者数のトレンドを計算
   * 
   * @param {number} year2022 2022年の内定者数
   * @param {number} year2023 2023年の内定者数
   * @param {number} year2024 2024年の内定者数
   * @returns {string} トレンド ('up'|'down'|'same')
   */
  function calculateJLeagueTrend(year2022, year2023, year2024) {
    // 最新年と前年を比較
    if (year2024 > year2023) {
      return 'up';
    } else if (year2024 < year2023) {
      return 'down';
    } else {
      return 'same';
    }
  }
  
  /**
   * CSVデータを読み込み、大学オブジェクトの配列に変換
   * 
   * @param {string} csvContent CSVの内容
   * @returns {Array} 大学オブジェクトの配列
   */
  export const parseCsvToUniversities = (csvContent) => {
    // PapaParseを使ってCSVをパース
    const parsed = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true
    });
    
    // 各行を大学オブジェクトに変換
    return parsed.data.map(row => mapCsvToUniversity(row));
  };
  
  /**
   * 部員数でフィルタリングするための条件関数
   * 
   * @param {string} sizeCategory サイズカテゴリ ('small'|'medium'|'large')
   * @returns {Function} フィルタリング関数
   */
  export const filterBySize = (sizeCategory) => {
    return (university) => {
      const memberCount = university.soccer_club.total_members;
      
      switch(sizeCategory) {
        case 'small':
          return memberCount <= 49;
        case 'medium':
          return memberCount >= 50 && memberCount <= 79;
        case 'large':
          return memberCount >= 80;
        default:
          return true;
      }
    };
  };
  
  /**
   * Jリーグ内定者数でフィルタリングするための条件関数
   * 
   * @param {number} minCount 最小内定者数
   * @returns {Function} フィルタリング関数
   */
  export const filterByJLeagueNominees = (minCount) => {
    return (university) => {
      const totalNominees = 
        (university.soccer_club.j_league_nominees_2022 || 0) + 
        (university.soccer_club.j_league_nominees_2023 || 0) + 
        (university.soccer_club.j_league_nominees_2024 || 0);
      
      return totalNominees >= minCount;
    };
  };
  
  /**
   * 年度別Jリーグ内定者数でフィルタリングするための条件関数
   * 
   * @param {number} year 年度 (2022|2023|2024)
   * @param {number} minCount 最小内定者数
   * @returns {Function} フィルタリング関数
   */
  export const filterByYearJLeagueNominees = (year, minCount) => {
    return (university) => {
      let count = 0;
      
      switch(year) {
        case 2022:
          count = university.soccer_club.j_league_nominees_2022 || 0;
          break;
        case 2023:
          count = university.soccer_club.j_league_nominees_2023 || 0;
          break;
        case 2024:
          count = university.soccer_club.j_league_nominees_2024 || 0;
          break;
        default:
          return true;
      }
      
      return count >= minCount;
    };
  };
  
  /**
   * 評定基準でフィルタリングするための条件関数
   * 
   * @param {number} maxGrade 最大評定値
   * @returns {Function} フィルタリング関数
   */
  export const filterByGradeRequirement = (maxGrade) => {
    return (university) => {
      // 評定基準がない場合は除外
      if (!university.evaluationGrade) return false;
      
      return university.evaluationGrade <= maxGrade;
    };
  };