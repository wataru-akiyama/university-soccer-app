// src/services/apiService.js - 大学データのみFirebase移行版

// ❌ 大学データのローカルインポートを削除
// import { universities as localUniversities } from '../data';

/**
 * 大学データAPI接続クラス（大学データFirebase移行版）
 */
export class UniversityAPIService {
  static BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-project.cloudfunctions.net/api';
  static TIMEOUT = 10000; // 10秒タイムアウト

  /**
   * 全大学データを取得（Firebase必須、フォールバック削除）
   */
  static async fetchUniversities() {
    const USE_API = process.env.REACT_APP_USE_API === 'true';
    
    if (!USE_API) {
      console.warn('🔧 API無効化中 - 大学データはFirebaseから取得が必須です');
      return { 
        success: false, 
        data: [], 
        source: 'disabled',
        error: 'APIが無効化されています。大学データの取得にはFirebase APIが必要です。.envファイルでREACT_APP_USE_API=trueに設定してください。'
      };
    }

    try {
      console.log('🌐 Firebase APIから大学データ取得中...');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

      const response = await fetch(`${this.BASE_URL}/universities`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      // APIレスポンス形式の正規化
      const universities = result.data || result;
      
      console.log(`✅ Firebase API取得成功: ${universities.length}校のデータ`);
      return { 
        success: true, 
        data: universities, 
        source: 'firebase_api',
        count: universities.length 
      };

    } catch (error) {
      console.error('❌ Firebase API取得失敗:', error.message);
      
      // ❌ ローカルフォールバック削除 - 大学データはFirebase必須
      console.warn('⚠️ 大学データはFirebaseからのみ取得します。ローカルデータのフォールバックはありません。');
      
      return { 
        success: false, 
        data: [], 
        source: 'firebase_error',
        error: `Firebase APIエラー: ${error.message}`,
        count: 0
      };
    }
  }

  /**
   * 特定大学の詳細データを取得（Firebase必須）
   */
  static async fetchUniversityById(id) {
    const USE_API = process.env.REACT_APP_USE_API === 'true';
    
    if (!USE_API) {
      return { 
        success: false, 
        data: null, 
        source: 'disabled',
        error: 'APIが無効化されています。大学データの取得にはFirebase APIが必要です。'
      };
    }

    try {
      console.log(`🔍 Firebase API: 大学ID ${id} の詳細データを取得中...`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

      const response = await fetch(`${this.BASE_URL}/universities/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const university = result.data || result;
      
      console.log(`✅ Firebase API: 大学詳細取得成功: ${university.university_name}`);
      return { 
        success: true, 
        data: university, 
        source: 'firebase_api' 
      };

    } catch (error) {
      console.error(`❌ Firebase API: 大学ID ${id} の詳細取得失敗:`, error.message);
      
      // ❌ ローカルフォールバック削除
      return { 
        success: false, 
        data: null, 
        source: 'firebase_error',
        error: `Firebase APIエラー: ${error.message}`
      };
    }
  }

  /**
   * 大学検索（Firebase API必須、ローカル検索削除）
   */
  static async searchUniversities(searchParams) {
    const USE_API = process.env.REACT_APP_USE_API === 'true';
    
    if (!USE_API) {
      return { 
        success: false, 
        data: [], 
        source: 'disabled',
        error: 'APIが無効化されています。大学検索にはFirebase APIが必要です。'
      };
    }

    try {
      console.log('🔍 Firebase API経由で大学検索中...', searchParams);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

      const response = await fetch(`${this.BASE_URL}/universities/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Search API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const universities = result.data || result;
      
      console.log(`✅ Firebase API検索成功: ${universities.length}校がヒット`);
      return { 
        success: true, 
        data: universities, 
        source: 'firebase_api',
        count: universities.length,
        total_found: result.total_found
      };

    } catch (error) {
      console.error('❌ Firebase API検索失敗:', error.message);
      
      // ❌ ローカル検索フォールバック削除
      return { 
        success: false, 
        data: [], 
        source: 'firebase_error',
        error: `Firebase API検索エラー: ${error.message}`,
        count: 0
      };
    }
  }

  /**
   * API接続テスト
   */
  static async testConnection() {
    try {
      console.log('🔌 Firebase API接続テスト開始...');
      
      const response = await fetch(`${this.BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Health Check Failed: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Firebase API接続テスト成功:', result);
      
      return { success: true, data: result, source: 'firebase_api' };

    } catch (error) {
      console.error('❌ Firebase API接続テスト失敗:', error);
      return { success: false, error: error.message };
    }
  }
}

/**
 * React Hook形式のAPI利用（大学データFirebase移行版）
 */
export const useUniversityAPI = () => {
  return {
    fetchUniversities: UniversityAPIService.fetchUniversities,
    fetchUniversityById: UniversityAPIService.fetchUniversityById,
    searchUniversities: UniversityAPIService.searchUniversities,
    testConnection: UniversityAPIService.testConnection
  };
};

export default UniversityAPIService;

// 📝 移行メモ:
// ✅ ローカル大学データ（localUniversities）のインポートを削除
// ✅ フォールバック処理で大学データを返さないように修正
// ✅ エラー時は空配列を返し、Firebase必須であることを明示
// ✅ 設定データや他の機能はローカル保持のまま