// src/hooks/useFirebaseData.js - ESLint警告修正済み完全版
import { useState, useEffect, useCallback } from 'react';

/**
 * Firebaseから大学データを取得するカスタムフック
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

      // データの正規化処理
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
          total_annual_cost: parseInt(uni.costs?.total_annual_cost || 0),
          university_costs: {
            ...uni.costs?.university_costs,
            annual_tuition: parseInt(uni.costs?.university_costs?.annual_tuition || 0),
            entrance_fee: parseInt(uni.costs?.university_costs?.entrance_fee || 0),
            facility_fee: parseInt(uni.costs?.university_costs?.facility_fee || 0),
          },
          soccer_club_costs: {
            ...uni.costs?.soccer_club_costs,
            monthly_club_fee: parseInt(uni.costs?.soccer_club_costs?.monthly_club_fee || 0),
            equipment_cost: parseInt(uni.costs?.soccer_club_costs?.equipment_cost || 0),
            camp_cost: parseInt(uni.costs?.soccer_club_costs?.camp_cost || 0),
            travel_cost: parseInt(uni.costs?.soccer_club_costs?.travel_cost || 0),
          },
          living_costs: {
            ...uni.costs?.living_costs,
            dorm_fee: parseInt(uni.costs?.living_costs?.dorm_fee || 0),
            meal_cost: parseInt(uni.costs?.living_costs?.meal_cost || 0),
            commute_cost: parseInt(uni.costs?.living_costs?.commute_cost || 0),
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