// src/hooks/useFirebaseData.js
import { useState, useEffect } from 'react';

/**
 * Firebaseからデータを取得するカスタムフック
 */
export const useFirebaseData = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const FIREBASE_API_URL = process.env.REACT_APP_FIREBASE_API_URL;

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Firebaseから大学データを取得中...');

      if (!FIREBASE_API_URL) {
        throw new Error('Firebase API URLが設定されていません。環境変数REACT_APP_FIREBASE_API_URLを確認してください。');
      }

      const response = await fetch(`${FIREBASE_API_URL}/universities`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Firebase API エラー: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success || !data.data) {
        throw new Error('Firebase APIレスポンス形式エラー');
      }

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
      console.log('✅ Firebase大学データ取得成功:', universitiesData.length, '校');

      const hokkaido = universitiesData.find(uni => uni.university_name === '北海道大学');
      if (hokkaido) {
        console.log('🎉 北海道大学のデータが確認できました:', hokkaido.university_name);
      }

    } catch (err) {
      console.error('❌ Firebase大学データ取得エラー:', err);
      setError(err.message);
      try {
        console.log('📋 フォールバック: ローカルデータを使用');
        const { universities: localUniversities } = await import('../data');
        setUniversities(localUniversities || []);
      } catch (localErr) {
        console.error('❌ ローカルデータ取得エラー:', localErr);
        setUniversities([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, [FIREBASE_API_URL]);

  return {
    universities,
    loading,
    error,
    refetch: () => {
      setError(null);
      fetchUniversities();
    }
  };
};

export default useFirebaseData;
