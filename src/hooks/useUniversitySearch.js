// src/hooks/useUniversitySearch.js - CSVデータ対応修正版

import { useState, useMemo } from 'react';
import { searchHelpers } from '../data';

const useUniversitySearch = (universities) => {
  // 既存の検索状態
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedQualifications, setSelectedQualifications] = useState([]);
  
  // 新しい検索状態（CSVデータ対応）
  const [selectedAcademicRanks, setSelectedAcademicRanks] = useState([]);
  const [selectedPlayerAspirations, setSelectedPlayerAspirations] = useState([]);
  
  // 既存のチェックボックスフィルター
  const [sportsRecommend, setSportsRecommend] = useState(false);
  const [selectionAvailable, setSelectionAvailable] = useState(false);
  const [dormAvailable, setDormAvailable] = useState(false);
  const [generalAdmissionAvailable, setGeneralAdmissionAvailable] = useState(false);
  const [publicUniversity, setPublicUniversity] = useState(false);
  const [privateUniversity, setPrivateUniversity] = useState(false);
  
  // ソート設定
  const [sortOption, setSortOption] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');

  const filteredUniversities = useMemo(() => {
    if (!universities || universities.length === 0) return [];
    
    try {
      let result = universities.filter(university => {
        if (!university) {
          console.warn('⚠️ 無効な大学データをスキップ:', university);
          return false;
        }
        
        // デバッグログ（開発環境のみ）
        if (process.env.NODE_ENV === 'development') {
          console.log(`🔍 フィルタリング中: ${university.university_name || university['大学名']}`);
        }
        
        // ===== 1. テキスト検索 =====
        if (searchQuery && searchQuery.trim()) {
          const queryLower = searchQuery.toLowerCase().trim();
          const universityName = university.university_name || university['大学名'] || '';
          const league = university.soccer_club?.league || university['カテゴリ'] || '';
          const faculties = university.main_faculties || university['部員主な学部'] || '';
          
          const matchesText = 
            universityName.toLowerCase().includes(queryLower) ||
            league.toLowerCase().includes(queryLower) ||
            (typeof faculties === 'string' ? faculties.toLowerCase().includes(queryLower) : false) ||
            (Array.isArray(faculties) ? faculties.some(f => f.toLowerCase().includes(queryLower)) : false);
          
          if (!matchesText) {
            if (process.env.NODE_ENV === 'development') {
              console.log(`❌ テキスト検索で除外: ${universityName}`);
            }
            return false;
          }
        }
        
        // ===== 2. 地域フィルター（CSVの「エリア」対応） =====
        if (selectedRegions.length > 0) {
          const universityArea = university.location || university['エリア'] || '';
          const matchesRegion = selectedRegions.some(region => {
            // 直接比較
            if (universityArea === region) return true;
            
            // searchHelpersを使用（互換性のため）
            return searchHelpers.isUniversityInRegion(university, region);
          });
          
          if (!matchesRegion) {
            if (process.env.NODE_ENV === 'development') {
              console.log(`❌ 地域フィルターで除外: ${university.university_name} - ${universityArea}`);
            }
            return false;
          }
        }
        
        // ===== 3. リーグフィルター（CSVの「カテゴリ」対応） =====
        if (selectedLeagues.length > 0) {
          const universityLeague = (university.soccer_club?.league || university['カテゴリ'] || '').trim();
          const matchesLeague = selectedLeagues.some(league => 
            universityLeague === league.trim()
          );
          
          if (!matchesLeague) {
            if (process.env.NODE_ENV === 'development') {
              console.log(`❌ リーグフィルターで除外: ${university.university_name} - ${universityLeague}`);
            }
            return false;
          }
        }
        
        // ===== 4. 学部フィルター =====
        if (selectedQualifications.length > 0) {
          const universityFaculties = university.main_faculties || university['部員主な学部'] || '';
          let facultiesArray = [];
          
          if (typeof universityFaculties === 'string') {
            facultiesArray = universityFaculties.split(/[、,]/).map(f => f.trim());
          } else if (Array.isArray(universityFaculties)) {
            facultiesArray = universityFaculties;
          }
          
          const matchesFaculty = selectedQualifications.some(qualification => 
            facultiesArray.some(faculty => 
              faculty.includes(qualification) || qualification.includes(faculty)
            )
          );
          
          if (!matchesFaculty) {
            if (process.env.NODE_ENV === 'development') {
              console.log(`❌ 学部フィルターで除外: ${university.university_name}`);
            }
            return false;
          }
        }
        
        // ===== 5. 学力ランクフィルター（新規：CSVの「学力ランク」対応） =====
        if (selectedAcademicRanks.length > 0) {
          const universityRank = university.academic_rank || university['学力ランク'] || '';
          const matchesRank = selectedAcademicRanks.includes(universityRank);
          
          if (!matchesRank) {
            if (process.env.NODE_ENV === 'development') {
              console.log(`❌ 学力ランクフィルターで除外: ${university.university_name} - ${universityRank}`);
            }
            return false;
          }
        }
        
        // ===== 6. 志向性フィルター（新規：CSVの「ジャンル①②」対応） =====
        if (selectedPlayerAspirations.length > 0) {
          const genre1 = university.genre1 || university['ジャンル➀'] || '';
          const genre2 = university.genre2 || university['ジャンル②'] || '';
          
          const matchesAspiration = selectedPlayerAspirations.some(aspiration => 
            genre1 === aspiration || genre2 === aspiration
          );
          
          if (!matchesAspiration) {
            if (process.env.NODE_ENV === 'development') {
              console.log(`❌ 志向性フィルターで除外: ${university.university_name}`);
            }
            return false;
          }
        }
        
        // ===== 7. 国公立・私立フィルター（学力ランクベース） =====
        let isPublic = false;
        const academicRank = university.academic_rank || university['学力ランク'] || '';
        
        if (academicRank === 'F：国公立') {
          isPublic = true;
        } else {
          // フォールバック：従来の判定方法
          isPublic = searchHelpers.isPublicUniversity(university);
        }
        
        if (publicUniversity && !isPublic) {
          if (process.env.NODE_ENV === 'development') {
            console.log(`❌ 国公立フィルターで除外: ${university.university_name}`);
          }
          return false;
        }
        
        if (privateUniversity && isPublic) {
          if (process.env.NODE_ENV === 'development') {
            console.log(`❌ 私立フィルターで除外: ${university.university_name}`);
          }
          return false;
        }
        
        // ===== 8. その他のフィルター（CSVフィールド名対応） =====
        
        // スポーツ推薦
        if (sportsRecommend) {
          const hasRecommend = university.entry_conditions?.sports_recommend || 
                              university['スポーツ推薦有無'] === '有';
          if (!hasRecommend) return false;
        }
        
        // セレクション
        if (selectionAvailable) {
          const hasSelection = university.entry_conditions?.selection || 
                              university['セレクション有無'] === '有';
          if (!hasSelection) return false;
        }
        
        // 寮
        if (dormAvailable) {
          const hasDorm = university.soccer_club?.dorm_available || 
                         university['部員寮'] === 'あり';
          if (!hasDorm) return false;
        }
        
        // 一般入部
        if (generalAdmissionAvailable) {
          const allowsGeneral = university.entry_conditions?.general_admission || 
                               university['一般入部可否'] === '可';
          if (!allowsGeneral) return false;
        }
        
        return true;
      });
      
      // ===== 9. ソート処理 =====
      if (sortOption) {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        
        result = [...result].sort((a, b) => {
          try {
            switch(sortOption) {
              case 'j_league': {
                const getJLeagueCount = (uni) => {
                  // CSVフィールド名対応
                  const count2022 = parseInt(uni['22J内定'] || uni.soccer_club?.j_league_nominees_2022 || 0);
                  const count2023 = parseInt(uni['23J内定'] || uni.soccer_club?.j_league_nominees_2023 || 0);
                  const count2024 = parseInt(uni['24J内定'] || uni.soccer_club?.j_league_nominees_2024 || 0);
                  
                  return count2022 + count2023 + count2024;
                };
                return multiplier * (getJLeagueCount(a) - getJLeagueCount(b));
              }
              
              case 'members': {
                const getMemberCount = (uni) => {
                  return parseInt(uni['部員数'] || uni.soccer_club?.total_members || 0);
                };
                return multiplier * (getMemberCount(a) - getMemberCount(b));
              }
              
              case 'name': {
                const nameA = a.university_name || a['大学名'] || '';
                const nameB = b.university_name || b['大学名'] || '';
                return multiplier * nameA.localeCompare(nameB);
              }
              
              case 'academic_rank': {
                // 学力ランクでソート（A→B→C→D→E→F順）
                const rankOrder = { 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6 };
                const getRankOrder = (uni) => {
                  const rank = uni.academic_rank || uni['学力ランク'] || '';
                  const rankLetter = rank.split('：')[0];
                  return rankOrder[rankLetter] || 999;
                };
                return multiplier * (getRankOrder(a) - getRankOrder(b));
              }
              
              default:
                return 0;
            }
          } catch (error) {
            console.error('ソート中にエラーが発生しました:', error);
            return 0;
          }
        });
      }
      
      // デバッグログ（開発環境のみ）
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ フィルタリング完了: ${result.length}校`);
        if (result.length > 0) {
          console.log('フィルタリング結果（最初の3校）:', 
            result.slice(0, 3).map(u => u.university_name || u['大学名'])
          );
        }
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
    selectedAcademicRanks,
    selectedPlayerAspirations,
    sportsRecommend,
    selectionAvailable,
    dormAvailable,
    generalAdmissionAvailable,
    publicUniversity,
    privateUniversity,
    sortOption,
    sortDirection
  ]);
  
  return {
    // 基本検索
    searchQuery,
    setSearchQuery,
    selectedRegions,
    setSelectedRegions,
    selectedLeagues,
    setSelectedLeagues,
    selectedQualifications,
    setSelectedQualifications,
    
    // 新規フィルター（CSVデータ対応）
    selectedAcademicRanks,
    setSelectedAcademicRanks,
    selectedPlayerAspirations,
    setSelectedPlayerAspirations,
    
    // チェックボックスフィルター
    sportsRecommend,
    setSportsRecommend,
    selectionAvailable,
    setSelectionAvailable,
    dormAvailable,
    setDormAvailable,
    generalAdmissionAvailable,
    setGeneralAdmissionAvailable,
    publicUniversity,
    setPublicUniversity,
    privateUniversity,
    setPrivateUniversity,
    
    // ソート
    sortOption,
    setSortOption,
    sortDirection,
    setSortDirection,
    
    // フィルタリング結果
    filteredUniversities
  };
};

export default useUniversitySearch;