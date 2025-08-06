// src/hooks/useFirebaseData.js - テキスト型費用対応版
import { useState, useEffect, useCallback } from 'react';

/**
 * Firebaseから大学データを取得するカスタムフック（費用をテキスト型として扱う）
 */
export const useFirebaseData = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Firebase API設定
  const FIREBASE_API_URL = process.env.REACT_APP_FIREBASE_API_URL;
  const USE_API = process.env.REACT_APP_USE_API === 'true';

  const fetchUniversities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!USE_API) {
        throw new Error('APIが無効化されています。');
      }

      if (!FIREBASE_API_URL) {
        throw new Error('Firebase API URLが設定されていません。');
      }

      const response = await fetch(`${FIREBASE_API_URL}/universities`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(30000)
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success || !data.data) {
        throw new Error('不正なAPIレスポンス形式です。');
      }

      // データの正規化処理（費用はテキスト型として扱う）
      const universitiesData = data.data.map(uni => ({
        ...uni,
        id: parseInt(uni.id),
        soccer_club: {
          ...uni.soccer_club,
          total_members: parseInt(uni.soccer_club?.total_members || 0),
          j_league_nominees_2022_24: parseInt(uni.soccer_club?.j_league_nominees_2022_24 || 0),
          denso_cup_2024_25: parseInt(uni.soccer_club?.denso_cup_2024_25 || 0),
          soccer_field_count: parseInt(uni.soccer_club?.soccer_field_count || 0),
        },
        costs: {
          ...uni.costs,
          // total_annual_costは削除（テキスト型では計算不可）
          university_costs: {
            ...uni.costs?.university_costs,
            // 費用はテキストのまま保持
            annual_tuition: uni.costs?.university_costs?.annual_tuition || '',
            entrance_fee: uni.costs?.university_costs?.entrance_fee || '',
            facility_fee: uni.costs?.university_costs?.facility_fee || '',
          },
          soccer_club_costs: {
            ...uni.costs?.soccer_club_costs,
            // 費用はテキストのまま保持
            monthly_club_fee: uni.costs?.soccer_club_costs?.monthly_club_fee || '',
            equipment_cost: uni.costs?.soccer_club_costs?.equipment_cost || '',
            camp_cost: uni.costs?.soccer_club_costs?.camp_cost || '',
            travel_cost: uni.costs?.soccer_club_costs?.travel_cost || '',
          },
          living_costs: {
            ...uni.costs?.living_costs,
            // 費用はテキストのまま保持
            dorm_fee: uni.costs?.living_costs?.dorm_fee || '',
            meal_cost: uni.costs?.living_costs?.meal_cost || '',
            commute_cost: uni.costs?.living_costs?.commute_cost || '',
          }
        }
      }));

      setUniversities(universitiesData);
      
    } catch (err) {
      setError(err.message);
      setUniversities([]);
    } finally {
      setLoading(false);
    }
  }, [FIREBASE_API_URL, USE_API]);

  useEffect(() => {
    fetchUniversities();
  }, [fetchUniversities]);

  return {
    universities,
    loading,
    error,
    refetch: fetchUniversities
  };
};

export default useFirebaseData;