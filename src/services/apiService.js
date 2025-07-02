// src/services/apiService.js - Firebase API接続サービス
import { universities as localUniversities } from '../data';

/**
 * 大学データAPI接続クラス（フォールバック機能付き）
 */
export class UniversityAPIService {
  static BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-project.cloudfunctions.net/api';
  static TIMEOUT = 10000; // 10秒タイムアウト

  /**
   * 全大学データを取得（フォールバック対応）
   */
  static async fetchUniversities() {
    const USE_API = process.env.REACT_APP_USE_API === 'true';
    
    if (!USE_API) {
      console.log('🔧 API無効化中 - ローカルデータを使用');
      return { success: true, data: localUniversities, source: 'local' };
    }

    try {
      console.log('🌐 Firebase APIからデータ取得中...');
      
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
      
      console.log(`✅ API取得成功: ${universities.length}校のデータ`);
      return { 
        success: true, 
        data: universities, 
        source: 'api',
        count: universities.length 
      };

    } catch (error) {
      console.warn('⚠️ API取得失敗、ローカルデータにフォールバック:', error.message);
      
      return { 
        success: true, 
        data: localUniversities, 
        source: 'local_fallback',
        error: error.message,
        count: localUniversities.length 
      };
    }
  }

  /**
   * 特定大学の詳細データを取得
   */
  static async fetchUniversityById(id) {
    const USE_API = process.env.REACT_APP_USE_API === 'true';
    
    if (!USE_API) {
      const university = localUniversities.find(u => u.id === parseInt(id));
      return { success: true, data: university, source: 'local' };
    }

    try {
      console.log(`🔍 大学ID ${id} の詳細データを取得中...`);
      
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
      
      console.log(`✅ 大学詳細取得成功: ${university.university_name}`);
      return { 
        success: true, 
        data: university, 
        source: 'api' 
      };

    } catch (error) {
      console.warn(`⚠️ 大学ID ${id} の詳細取得失敗、ローカルデータにフォールバック:`, error.message);
      
      const university = localUniversities.find(u => u.id === parseInt(id));
      return { 
        success: true, 
        data: university, 
        source: 'local_fallback',
        error: error.message 
      };
    }
  }

  /**
   * 大学検索（フィルタリング機能付き）
   */
  static async searchUniversities(searchParams) {
    const USE_API = process.env.REACT_APP_USE_API === 'true';
    
    if (!USE_API) {
      // ローカル検索ロジック（既存のuseUniversitySearchと同じ）
      return { success: true, data: this.filterLocalUniversities(searchParams), source: 'local' };
    }

    try {
      console.log('🔍 API経由で大学検索中...', searchParams);
      
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
      
      console.log(`✅ 検索成功: ${universities.length}校がヒット`);
      return { 
        success: true, 
        data: universities, 
        source: 'api',
        count: universities.length,
        total_found: result.total_found
      };

    } catch (error) {
      console.warn('⚠️ API検索失敗、ローカル検索にフォールバック:', error.message);
      
      return { 
        success: true, 
        data: this.filterLocalUniversities(searchParams), 
        source: 'local_fallback',
        error: error.message 
      };
    }
  }

  /**
   * ローカルデータのフィルタリング（フォールバック用）
   */
  static filterLocalUniversities(searchParams) {
    // 既存のuseUniversitySearchロジックを移植
    // 簡略版として基本的なフィルタリングのみ実装
    let filtered = localUniversities;

    if (searchParams.searchQuery) {
      const query = searchParams.searchQuery.toLowerCase();
      filtered = filtered.filter(uni => 
        uni.university_name.toLowerCase().includes(query) ||
        uni.soccer_club.league.toLowerCase().includes(query)
      );
    }

    if (searchParams.regions && searchParams.regions.length > 0) {
      filtered = filtered.filter(uni => {
        return searchParams.regions.some(region => {
          if (region === '関東') {
            return ['東京', '神奈川', '埼玉', '千葉', '茨城'].some(pref => 
              uni.location.includes(pref)
            );
          }
          if (region === '関西') {
            return ['大阪', '京都', '兵庫', '奈良', '滋賀'].some(pref => 
              uni.location.includes(pref)
            );
          }
          if (region === '九州・沖縄') {
            return uni.location.includes('福岡');
          }
          if (region === '中部') {
            return uni.location.includes('愛知');
          }
          return false;
        });
      });
    }

    return filtered;
  }

  /**
   * API接続テスト
   */
  static async testConnection() {
    try {
      console.log('🔌 API接続テスト開始...');
      
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
      console.log('✅ API接続テスト成功:', result);
      
      return { success: true, data: result };

    } catch (error) {
      console.error('❌ API接続テスト失敗:', error);
      return { success: false, error: error.message };
    }
  }
}

/**
 * React Hook形式のAPI利用（既存のuseUniversitySearchと互換性保持）
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