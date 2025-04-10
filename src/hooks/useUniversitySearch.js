// src/hooks/useUniversitySearch.js
import { useState, useEffect, useMemo } from 'react';

/**
 * 大学検索機能を提供するカスタムフック
 * 
 * @param {Array} universities 大学データの配列
 * @returns {Object} 検索状態と結果
 */
const useUniversitySearch = (universities) => {
  // 基本検索条件 - 複数選択対応に変更
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedQualifications, setSelectedQualifications] = useState([]);
  const [sportsRecommend, setSportsRecommend] = useState(false);
  const [selectionAvailable, setSelectionAvailable] = useState(false);
  const [dormAvailable, setDormAvailable] = useState(false);
  const [generalAdmissionAvailable, setGeneralAdmissionAvailable] = useState(false);
  
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
  
  // 評定値を文字列から抽出する関数
  const extractGradeValue = (criteriaString) => {
    if (!criteriaString) return null;
    
    // "評定3.5以上" のようなフォーマットから数値を抽出
    const match = criteriaString.match(/評定([0-9.]+)/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }
    return null;
  };

  // 監督キャリアをチェックする関数
  const checkCoachBackground = (university, filter) => {
    if (!filter || !university.soccer_club.coach_name) return true;
    
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
    // (このロジックは必要に応じて調整)
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
    
    // 情報不足の場合はデフォルトでtrue（フィルタリングしない）を返す
    return true;
  };

  // 新入部員数をチェックする関数
  const checkNewMemberSize = (university, category) => {
    if (!category) return true;
    
    // 1年生の部員数を取得
    const firstYearCount = university.soccer_club.members_by_grade 
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

  // 地域が含まれるかチェックする関数
  const checkRegionMatch = (university, region) => {
    // 直接regionフィールドがある場合
    if (university.region && university.region === region) {
      return true;
    }
    
    // 学部名から判断
    if (university.main_faculties && university.main_faculties.some(faculty => faculty.includes(region))) {
      return true;
    }
    
    // リーグ名から判断
    if (university.soccer_club && university.soccer_club.league && university.soccer_club.league.includes(region)) {
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
  
  // フィルタリング処理 - 複数選択対応に修正
  const filteredUniversities = useMemo(() => {
    if (!universities || universities.length === 0) return [];
    
    return universities.filter(university => {
      try {
        // 基本的なnullチェック
        if (!university || !university.soccer_club || !university.entry_conditions) {
          console.warn('不完全な大学データがフィルタリングされました:', university?.university_name || 'unknown');
          return false;
        }
        
        // テキスト検索 - 大学名、学部名、リーグ名で検索
        if (searchQuery && searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase().trim();
          const universityNameMatch = university.university_name.toLowerCase().includes(query);
          const facultiesMatch = university.main_faculties && university.main_faculties.some(faculty => 
            faculty.toLowerCase().includes(query)
          );
          const leagueMatch = university.soccer_club.league && university.soccer_club.league.toLowerCase().includes(query);
          
          if (!universityNameMatch && !facultiesMatch && !leagueMatch) {
            return false;
          }
        }
        
        // 地域フィルター（複数選択対応）
        if (selectedRegions.length > 0) {
          // いずれかの選択された地域に一致するかチェック
          const matchesAnyRegion = selectedRegions.some(region => 
            checkRegionMatch(university, region)
          );
          if (!matchesAnyRegion) {
            return false;
          }
        }
        
        // リーグフィルター（複数選択対応）
        if (selectedLeagues.length > 0) {
          if (!university.soccer_club.league || 
              !selectedLeagues.some(league => university.soccer_club.league.includes(league))) {
            return false;
          }
        }
        
        // 取得可能資格フィルター（複数選択対応）
        if (selectedQualifications.length > 0) {
          if (!university.soccer_club.qualifications || 
              !university.soccer_club.qualifications.some(q => 
                selectedQualifications.some(selected => q.includes(selected))
              )) {
            return false;
          }
        }
        
        // スポーツ推薦フィルター
        if (sportsRecommend && !university.entry_conditions.sports_recommend) {
          return false;
        }
        
        // セレクションフィルター
        if (selectionAvailable && !university.entry_conditions.selection) {
          return false;
        }
        
        // 寮フィルター
        if (dormAvailable && !university.soccer_club.dorm_available) {
          return false;
        }
        
        // 一般入部フィルター
        if (generalAdmissionAvailable && !university.entry_conditions.general_admission) {
          return false;
        }
        
        // 詳細検索条件のフィルター
        
        // Jリーグ内定者数（過去3年間の合計）
        if (jLeagueMinimum > 0) {
          // j_league_nominees_2022_24 フィールドがある場合はそれを使用
          if (university.soccer_club.j_league_nominees_2022_24 !== undefined) {
            if (university.soccer_club.j_league_nominees_2022_24 < jLeagueMinimum) {
              return false;
            }
          } else {
            // 各年度の合計を計算
            const totalNominees = 
              (university.soccer_club.j_league_nominees_2022 || 0) + 
              (university.soccer_club.j_league_nominees_2023 || 0) + 
              (university.soccer_club.j_league_nominees_2024 || 0);
            
            if (totalNominees < jLeagueMinimum) {
              return false;
            }
          }
        }
        
        // 年度別Jリーグ内定者数
        if (yearlyJLeagueFilter.year2022 > 0 && 
            (university.soccer_club.j_league_nominees_2022 || 0) < yearlyJLeagueFilter.year2022) {
          return false;
        }
        
        if (yearlyJLeagueFilter.year2023 > 0 && 
            (university.soccer_club.j_league_nominees_2023 || 0) < yearlyJLeagueFilter.year2023) {
          return false;
        }
        
        if (yearlyJLeagueFilter.year2024 > 0 && 
            (university.soccer_club.j_league_nominees_2024 || 0) < yearlyJLeagueFilter.year2024) {
          return false;
        }
        
        // 部員数カテゴリ
        if (memberSizeCategory && memberSizeCategory !== '') {
          const memberCount = university.soccer_club.total_members || 0;
          
          switch(memberSizeCategory) {
            case 'small': // 小規模（〜49名）
              if (memberCount > 49) return false;
              break;
            case 'medium': // 中規模（50〜79名）
              if (memberCount < 50 || memberCount > 79) return false;
              break;
            case 'large': // 大規模（80名以上）
              if (memberCount < 80) return false;
              break;
            default:
              break;
          }
        }
        
        // 新入部員数カテゴリ
        if (newMemberSizeCategory && newMemberSizeCategory !== '') {
          if (!checkNewMemberSize(university, newMemberSizeCategory)) {
            return false;
          }
        }
        
        // 監督キャリアフィルター
        if (coachBackgroundFilter && coachBackgroundFilter !== '') {
          if (!checkCoachBackground(university, coachBackgroundFilter)) {
            return false;
          }
        }
        
        // 評定条件 - 修正：文字列から評定値を抽出
        if (maxGradeRequirement > 0 && university.entry_conditions.sports_recommend) {
          // 推薦条件から評定値を抽出
          const gradeValue = extractGradeValue(university.entry_conditions.recommend_criteria);
          
          // 評定値がある場合のみ比較
          if (gradeValue !== null) {
            // 評定値が指定の最大値より大きい場合は除外
            if (gradeValue > maxGradeRequirement) {
              return false;
            }
          }
        }
        
        // デンソーカップ出場者数
        if (densoCupMinimum > 0 && 
            (university.soccer_club.denso_cup_2024_25 || 0) < densoCupMinimum) {
          return false;
        }
        
        return true;
      } catch (error) {
        console.error('フィルタリング中にエラーが発生しました:', error, university);
        return false;
      }
    }).sort((a, b) => {
      // ソート処理
      if (!sortOption) return 0;
      
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      try {
        switch(sortOption) {
          case 'j_league':
            // Jリーグ内定者数順（j_league_nominees_2022_24 フィールドがある場合はそれを使用）
            if (a.soccer_club.j_league_nominees_2022_24 !== undefined && 
                b.soccer_club.j_league_nominees_2022_24 !== undefined) {
              return direction * (a.soccer_club.j_league_nominees_2022_24 - b.soccer_club.j_league_nominees_2022_24);
            }
            
            // 各年度の合計を計算
            const aNominees = 
              (a.soccer_club.j_league_nominees_2022 || 0) + 
              (a.soccer_club.j_league_nominees_2023 || 0) + 
              (a.soccer_club.j_league_nominees_2024 || 0);
            const bNominees = 
              (b.soccer_club.j_league_nominees_2022 || 0) + 
              (b.soccer_club.j_league_nominees_2023 || 0) + 
              (b.soccer_club.j_league_nominees_2024 || 0);
            return direction * (aNominees - bNominees);
            
          case 'members':
            // 部員数順
            return direction * ((a.soccer_club.total_members || 0) - (b.soccer_club.total_members || 0));
            
          case 'grade_requirement':
            // 評定基準順（評定がない場合は最後）
            const aGrade = extractGradeValue(a.entry_conditions?.recommend_criteria);
            const bGrade = extractGradeValue(b.entry_conditions?.recommend_criteria);
            
            if (!aGrade && !bGrade) return 0;
            if (!aGrade) return direction;
            if (!bGrade) return -direction;
            return direction * (aGrade - bGrade);
            
          case 'denso_cup':
            // デンソーカップ出場者数順
            return direction * ((a.soccer_club.denso_cup_2024_25 || 0) - (b.soccer_club.denso_cup_2024_25 || 0));
            
          default:
            return 0;
        }
      } catch (error) {
        console.error('ソート中にエラーが発生しました:', error);
        return 0;
      }
    });
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