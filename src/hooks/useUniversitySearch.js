// src/hooks/useUniversitySearch.js
import { useState, useEffect, useMemo } from 'react';

/**
 * 大学検索機能を提供するカスタムフック - リファクタリング版
 * 
 * @param {Array} universities 大学データの配列
 * @returns {Object} 検索状態と結果
 */
const useUniversitySearch = (universities) => {
  // ==========================================
  // 状態変数の定義（変更なし）
  // ==========================================

  // 基本検索条件
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedQualifications, setSelectedQualifications] = useState([]);
  const [sportsRecommend, setSportsRecommend] = useState(false);
  const [selectionAvailable, setSelectionAvailable] = useState(false);
  const [dormAvailable, setDormAvailable] = useState(false);
  const [generalAdmissionAvailable, setGeneralAdmissionAvailable] = useState(false);
  
  // 国公立・私立フィルター
  const [publicUniversity, setPublicUniversity] = useState(false);
  const [privateUniversity, setPrivateUniversity] = useState(false);
  
  // 詳細検索条件
  const [jLeagueMinimum, setJLeagueMinimum] = useState(0);
  const [yearlyJLeagueFilter, setYearlyJLeagueFilter] = useState({
    year2022: 0,
    year2023: 0,
    year2024: 0
  });
  const [memberSizeCategory, setMemberSizeCategory] = useState('');
  const [newMemberSizeCategory, setNewMemberSizeCategory] = useState('');
  const [maxGradeRequirement, setMaxGradeRequirement] = useState(0);
  const [coachBackgroundFilter, setCoachBackgroundFilter] = useState('');
  const [densoCupMinimum, setDensoCupMinimum] = useState(0);
  
  // ソートオプション
  const [sortOption, setSortOption] = useState('');
  const [sortDirection, setSortDirection] = useState('desc'); // 'desc' = 降順, 'asc' = 昇順

  // ==========================================
  // ヘルパー関数
  // ==========================================

  /**
   * 大学が国公立大学かどうかを判定
   */
  const isPublicUniversity = (university) => {
    if (!university || !university.university_name) return false;
    
    const name = university.university_name;
    
    // 明らかな国公立大学の判定
    if (
      name.includes('国立') || 
      name.includes('県立') || 
      name.includes('市立') || 
      name === '筑波大学' || 
      name === '北海道大学' || 
      name === '名古屋大学'
    ) {
      return true;
    }
    
    return false;
  };
  
  /**
   * 評定値を文字列から抽出する
   */
  const extractGradeValue = (criteriaString) => {
    if (!criteriaString) return null;
    
    // "評定3.5以上" のようなフォーマットから数値を抽出
    const match = criteriaString.match(/評定([0-9.]+)/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }
    return null;
  };

  /**
   * 監督キャリアをチェック
   */
  const checkCoachBackground = (university, filter) => {
    if (!filter || !university?.soccer_club?.coach_name) return true;
    
    const coachName = university.soccer_club.coach_name.toLowerCase();
    
    // 拡張データに監督情報があれば利用
    if (university.soccer_club.coach_background) {
      const background = university.soccer_club.coach_background.toLowerCase();
      
      switch(filter) {
        case 'jleaguer':
          return background.includes('jリーガー') || background.includes('jリーグ');
        case 'national':
          return background.includes('日本代表');
        case 'student':
          return background.includes('学生') || background.includes('大学出身');
        default:
          return true;
      }
    }
    
    // 拡張データがなければ、監督名から有名人かを推測
    const famousCoaches = {
      '北澤豪': 'national',
      '中山雅史': 'national',
      '遠藤保仁': 'jleaguer',
      '李忠成': 'jleaguer',
      '中村俊輔': 'national',
      '宮本恒靖': 'national'
    };
    
    // 有名監督が見つかった場合
    for (const [name, type] of Object.entries(famousCoaches)) {
      if (coachName.includes(name)) {
        return type === filter;
      }
    }
    
    // 情報不足の場合はデフォルトでtrue
    return true;
  };

  /**
   * 新入部員数をカテゴリに応じてチェック
   */
  const checkNewMemberSize = (university, category) => {
    if (!category || !university) return true;
    
    // 1年生の部員数を取得
    const firstYearCount = university.soccer_club?.members_by_grade 
      ? (university.soccer_club.members_by_grade["1年"] || 0) 
      : 0;
    
    // newMembers2024フィールドがあれば優先
    const newMemberCount = university.newMembers2024 || firstYearCount;
    
    switch(category) {
      case 'small': // 少数選抜 (〜15名)
        return newMemberCount <= 15;
      case 'medium': // 中規模 (16〜25名)
        return newMemberCount >= 16 && newMemberCount <= 25;
      case 'large': // 多数受入 (26名以上)
        return newMemberCount >= 26;
      default:
        return true;
    }
  };

  /**
   * 地域が含まれるかチェック
   */
  const checkRegionMatch = (university, region) => {
    if (!university || !region) return false;
    
    // 直接regionフィールドがある場合
    if (university.region && university.region === region) {
      return true;
    }
    
    // 学部名から判断
    if (university.main_faculties && university.main_faculties.some(faculty => faculty.includes(region))) {
      return true;
    }
    
    // リーグ名から判断
    if (university.soccer_club?.league && university.soccer_club.league.includes(region)) {
      return true;
    }
    
    // 首都圏の大学は多くが「関東」に含まれると想定
    if (region === '関東' && university.university_name && 
        (university.university_name.includes('東京') || 
         university.university_name.includes('神奈川') || 
         university.university_name.includes('千葉') || 
         university.university_name.includes('埼玉'))) {
      return true;
    }
    
    return false;
  };

  // ==========================================
  // フィルタ関数ファクトリー
  // ==========================================
  
  /**
   * テキスト検索フィルタを作成
   */
  const createTextFilter = (query) => {
    if (!query || !query.trim()) return null;
    
    const queryLower = query.toLowerCase().trim();
    return (university) => {
      if (!university) return false;
      
      // 大学名でのマッチング
      if (university.university_name?.toLowerCase().includes(queryLower)) {
        return true;
      }
      
      // 学部名でのマッチング
      if (university.main_faculties?.some(faculty => 
        faculty.toLowerCase().includes(queryLower)
      )) {
        return true;
      }
      
      // リーグ名でのマッチング
      if (university.soccer_club?.league?.toLowerCase().includes(queryLower)) {
        return true;
      }
      
      return false;
    };
  };
  
  /**
   * 国公立/私立フィルタを作成
   */
  const createUniversityTypeFilter = (isPublic, isPrivate) => {
    if (!isPublic && !isPrivate) return null;
    
    return (university) => {
      const isPublicUni = isPublicUniversity(university);
      
      if (isPublic && !isPrivate) return isPublicUni;
      if (!isPublic && isPrivate) return !isPublicUni;
      
      // 両方オンの場合はすべて表示
      return true;
    };
  };
  
  /**
   * 地域フィルタを作成
   */
  const createRegionFilter = (regions) => {
    if (!regions || !regions.length) return null;
    
    return (university) => {
      return regions.some(region => checkRegionMatch(university, region));
    };
  };
  
  /**
   * リーグフィルタを作成
   */
  const createLeagueFilter = (leagues) => {
    if (!leagues || !leagues.length) return null;
    
    return (university) => {
      if (!university.soccer_club?.league) return false;
      return leagues.some(league => university.soccer_club.league.includes(league));
    };
  };
  
  /**
   * 資格フィルタを作成
   */
  const createQualificationFilter = (qualifications) => {
    if (!qualifications || !qualifications.length) return null;
    
    return (university) => {
      if (!university.soccer_club?.qualifications?.length) return false;
      
      return university.soccer_club.qualifications.some(q => 
        qualifications.some(selected => q.includes(selected))
      );
    };
  };
  
  /**
   * チェックボックス条件のフィルタを作成
   */
  const createCheckboxFilter = (sportsRec, selection, dorm, generalAdm) => {
    if (!sportsRec && !selection && !dorm && !generalAdm) return null;
    
    return (university) => {
      if (!university.entry_conditions || !university.soccer_club) return false;
      
      if (sportsRec && !university.entry_conditions.sports_recommend) return false;
      if (selection && !university.entry_conditions.selection) return false;
      if (dorm && !university.soccer_club.dorm_available) return false;
      if (generalAdm && !university.entry_conditions.general_admission) return false;
      
      return true;
    };
  };
  
  /**
   * Jリーグ内定者数フィルタを作成
   */
  const createJLeagueMinimumFilter = (minimum) => {
    if (!minimum || minimum <= 0) return null;
    
    return (university) => {
      if (!university.soccer_club) return false;
      
      // j_league_nominees_2022_24 フィールドがある場合はそれを使用
      if (university.soccer_club.j_league_nominees_2022_24 !== undefined) {
        return university.soccer_club.j_league_nominees_2022_24 >= minimum;
      }
      
      // 各年度の合計を計算
      const totalNominees = 
        (university.soccer_club.j_league_nominees_2022 || 0) + 
        (university.soccer_club.j_league_nominees_2023 || 0) + 
        (university.soccer_club.j_league_nominees_2024 || 0);
      
      return totalNominees >= minimum;
    };
  };
  
  /**
   * 年度別Jリーグ内定者数フィルタを作成
   */
  const createYearlyJLeagueNomineesFilter = (yearFilters) => {
    // yearFiltersはオブジェクト {year2022: 0, year2023: 0, year2024: 0} 形式
    if (!yearFilters) return null;
    
    const activeFilters = Object.entries(yearFilters).filter(([_, value]) => value > 0);
    if (activeFilters.length === 0) return null;
    
    return (university) => {
      if (!university.soccer_club) return false;
      
      for (const [year, minimum] of activeFilters) {
        const yearNumber = year.replace('year', '');
        const nominees = university.soccer_club[`j_league_nominees_${yearNumber}`] || 0;
        
        if (nominees < minimum) return false;
      }
      
      return true;
    };
  };
  
  /**
   * 部員数カテゴリフィルタを作成
   */
  const createMemberSizeFilter = (category) => {
    if (!category) return null;
    
    return (university) => {
      if (!university.soccer_club?.total_members) return false;
      
      const memberCount = university.soccer_club.total_members;
      
      switch(category) {
        case 'small': // 小規模（〜49名）
          return memberCount <= 49;
        case 'medium': // 中規模（50〜79名）
          return memberCount >= 50 && memberCount <= 79;
        case 'large': // 大規模（80名以上）
          return memberCount >= 80;
        default:
          return true;
      }
    };
  };
  
  /**
   * 新入部員数カテゴリフィルタを作成
   */
  const createNewMemberSizeFilter = (category) => {
    if (!category) return null;
    
    return (university) => checkNewMemberSize(university, category);
  };
  
  /**
   * 監督キャリアフィルタを作成
   */
  const createCoachBackgroundFilter = (background) => {
    if (!background) return null;
    
    return (university) => checkCoachBackground(university, background);
  };
  
  /**
   * 評定条件フィルタを作成
   */
  const createGradeRequirementFilter = (maxGrade) => {
    if (!maxGrade || maxGrade <= 0) return null;
    
    return (university) => {
      if (!university.entry_conditions?.sports_recommend) return true;
      
      // 推薦条件から評定値を抽出
      const gradeValue = extractGradeValue(university.entry_conditions.recommend_criteria);
      
      // 評定値がない場合は通過させる
      if (gradeValue === null) return true;
      
      // 評定値が指定の最大値以下かチェック
      return gradeValue <= maxGrade;
    };
  };
  
  /**
   * デンソーカップ出場者数フィルタを作成
   */
  const createDensoCupFilter = (minimum) => {
    if (!minimum || minimum <= 0) return null;
    
    return (university) => {
      return (university.soccer_club?.denso_cup_2024_25 || 0) >= minimum;
    };
  };
  
  /**
   * ソート関数を作成
   */
  const createSorter = (option, direction) => {
    if (!option) return null;
    
    const multiplier = direction === 'asc' ? 1 : -1;
    
    return (a, b) => {
      try {
        switch(option) {
          case 'j_league': {
            // Jリーグ内定者数順
            const getJLeagueCount = (uni) => {
              if (uni.soccer_club?.j_league_nominees_2022_24 !== undefined) {
                return uni.soccer_club.j_league_nominees_2022_24;
              }
              return (
                (uni.soccer_club?.j_league_nominees_2022 || 0) + 
                (uni.soccer_club?.j_league_nominees_2023 || 0) + 
                (uni.soccer_club?.j_league_nominees_2024 || 0)
              );
            };
            return multiplier * (getJLeagueCount(a) - getJLeagueCount(b));
          }
            
          case 'members':
            // 部員数順
            return multiplier * ((a.soccer_club?.total_members || 0) - (b.soccer_club?.total_members || 0));
            
          case 'grade_requirement': {
            // 評定基準順
            const aGrade = extractGradeValue(a.entry_conditions?.recommend_criteria);
            const bGrade = extractGradeValue(b.entry_conditions?.recommend_criteria);
            
            if (!aGrade && !bGrade) return 0;
            if (!aGrade) return multiplier;
            if (!bGrade) return -multiplier;
            return multiplier * (aGrade - bGrade);
          }
            
          case 'denso_cup':
            // デンソーカップ出場者数順
            return multiplier * ((a.soccer_club?.denso_cup_2024_25 || 0) - (b.soccer_club?.denso_cup_2024_25 || 0));
            
          default:
            return 0;
        }
      } catch (error) {
        console.error('ソート中にエラーが発生しました:', error);
        return 0;
      }
    };
  };

  // ==========================================
  // メインのフィルタリングロジック
  // ==========================================
  
  const filteredUniversities = useMemo(() => {
    // 大学データが無い場合は空配列を返す
    if (!universities || universities.length === 0) return [];
    
    try {
      // アクティブなフィルタ関数のコレクション
      const activeFilters = [];
      
      // 各フィルタを生成し、nullでなければ追加
      const filters = [
        createTextFilter(searchQuery),
        createUniversityTypeFilter(publicUniversity, privateUniversity),
        createRegionFilter(selectedRegions),
        createLeagueFilter(selectedLeagues),
        createQualificationFilter(selectedQualifications),
        createCheckboxFilter(
          sportsRecommend, 
          selectionAvailable, 
          dormAvailable, 
          generalAdmissionAvailable
        ),
        createJLeagueMinimumFilter(jLeagueMinimum),
        createYearlyJLeagueNomineesFilter(yearlyJLeagueFilter),
        createMemberSizeFilter(memberSizeCategory),
        createNewMemberSizeFilter(newMemberSizeCategory),
        createCoachBackgroundFilter(coachBackgroundFilter),
        createGradeRequirementFilter(maxGradeRequirement),
        createDensoCupFilter(densoCupMinimum)
      ];
      
      // nullでないフィルタだけを追加
      filters.forEach(filter => {
        if (filter !== null) {
          activeFilters.push(filter);
        }
      });
      
      // すべてのフィルタを適用
      let result = universities.filter(university => {
        // 基本的な構造チェック
        if (!university || !university.soccer_club || !university.entry_conditions) {
          return false;
        }
        
        // すべてのアクティブフィルタを適用（AND条件）
        return activeFilters.every(filter => filter(university));
      });
      
      // ソート適用
      const sorter = createSorter(sortOption, sortDirection);
      if (sorter) {
        result = [...result].sort(sorter);
      }
      
      return result;
      
    } catch (error) {
      console.error('フィルタリング処理でエラーが発生しました:', error);
      return [];
    }
  }, [
    universities,
    searchQuery,
    selectedRegions,
    selectedLeagues,
    selectedQualifications,
    sportsRecommend,
    selectionAvailable,
    dormAvailable,
    generalAdmissionAvailable,
    publicUniversity,
    privateUniversity,
    jLeagueMinimum,
    yearlyJLeagueFilter,
    memberSizeCategory,
    newMemberSizeCategory,
    coachBackgroundFilter,
    maxGradeRequirement,
    densoCupMinimum,
    sortOption,
    sortDirection
  ]);
  
  // 検索関連の状態と結果を返す
  return {
    // 基本検索条件
    searchQuery,
    setSearchQuery,
    selectedRegions,
    setSelectedRegions,
    selectedLeagues,
    setSelectedLeagues,
    selectedQualifications,
    setSelectedQualifications,
    sportsRecommend,
    setSportsRecommend,
    selectionAvailable,
    setSelectionAvailable,
    dormAvailable,
    setDormAvailable,
    generalAdmissionAvailable,
    setGeneralAdmissionAvailable,
    
    // 国公立・私立フィルター
    publicUniversity,
    setPublicUniversity,
    privateUniversity,
    setPrivateUniversity,
    
    // 詳細検索条件
    jLeagueMinimum,
    setJLeagueMinimum,
    yearlyJLeagueFilter,
    setYearlyJLeagueFilter,
    memberSizeCategory,
    setMemberSizeCategory,
    newMemberSizeCategory,
    setNewMemberSizeCategory,
    maxGradeRequirement,
    setMaxGradeRequirement,
    coachBackgroundFilter,
    setCoachBackgroundFilter,
    densoCupMinimum,
    setDensoCupMinimum,
    
    // ソートオプション
    sortOption,
    setSortOption,
    sortDirection,
    setSortDirection,
    
    // 検索結果
    filteredUniversities
  };
};

export default useUniversitySearch;