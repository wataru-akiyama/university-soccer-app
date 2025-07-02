// src/hooks/useFirebaseData.js - Firebase専用版（ローカルフォールバック削除）
import { useState, useEffect } from 'react';

/**
 * Firebaseから大学データを取得するカスタムフック（大学データのみFirebase移行版）
 */
export const useFirebaseData = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Firebase API設定
  const FIREBASE_API_URL = process.env.REACT_APP_FIREBASE_API_URL;
  const USE_API = process.env.REACT_APP_USE_API === 'true';

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // API使用設定の確認
      if (!USE_API) {
        throw new Error('APIが無効化されています。.envファイルでREACT_APP_USE_API=trueに設定してください。');
      }

      if (!FIREBASE_API_URL) {
        throw new Error('Firebase API URLが設定されていません。環境変数REACT_APP_FIREBASE_API_URLを設定してください。');
      }

      console.log('🔄 Firebaseから大学データを取得中...');
      console.log('🌐 API URL:', FIREBASE_API_URL);

      const response = await fetch(`${FIREBASE_API_URL}/universities`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // タイムアウト設定
        signal: AbortSignal.timeout(30000) // 30秒タイムアウト
      });

      if (!response.ok) {
        throw new Error(`Firebase API エラー: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // レスポンス形式の検証
      if (!data.success || !data.data) {
        console.error('❌ Firebase APIレスポンス:', data);
        throw new Error('Firebase APIレスポンス形式エラー: data.success または data.data が見つかりません');
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
      console.log('✅ Firebase大学データ取得成功:', universitiesData.length, '校');

      // データ検証ログ
      const sampleUniversity = universitiesData[0];
      if (sampleUniversity) {
        console.log('📊 サンプルデータ:', {
          name: sampleUniversity.university_name,
          location: sampleUniversity.location,
          league: sampleUniversity.soccer_club?.league
        });
      }

    } catch (err) {
      console.error('❌ Firebase大学データ取得エラー:', err);
      setError(err.message);
      
      // ❌ 大学データのローカルフォールバック削除 - Firebase必須
      setUniversities([]);
      
      // エラー詳細をユーザーに表示するための情報
      console.error('🔧 大学データ取得エラー解決方法:');
      console.error('1. .envファイルでREACT_APP_USE_API=trueに設定されているか確認');
      console.error('2. REACT_APP_FIREBASE_API_URLが正しく設定されているか確認');
      console.error('3. Firebase APIサーバーが稼働しているか確認');
      console.error('4. ネットワーク接続を確認');
      console.warn('⚠️ 大学データはFirebaseからのみ取得されます。ローカルフォールバックはありません。');
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, [FIREBASE_API_URL, USE_API]);

  return {
    universities,
    loading,
    error,
    refetch: () => {
      setError(null);
      fetchUniversities();
    },
    // 追加情報
    isFirebaseOnly: true,
    apiUrl: FIREBASE_API_URL,
    apiEnabled: USE_API
  };
};

export default useFirebaseData;