// src/services/apiService.js - 本番向けクリーン版

/**
 * 大学データAPI接続クラス
 */
export class UniversityAPIService {
  static BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-project.cloudfunctions.net/api';
  static TIMEOUT = 10000;

  /**
   * 全大学データを取得
   */
  static async fetchUniversities() {
    const USE_API = process.env.REACT_APP_USE_API === 'true';
    
    if (!USE_API) {
      return { 
        success: false, 
        data: [], 
        source: 'disabled',
        error: 'APIが無効化されています。'
      };
    }

    try {
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
      const universities = result.data || result;
      
      return { 
        success: true, 
        data: universities, 
        source: 'firebase_api',
        count: universities.length 
      };

    } catch (error) {
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
   * 特定大学の詳細データを取得
   */
  static async fetchUniversityById(id) {
    const USE_API = process.env.REACT_APP_USE_API === 'true';
    
    if (!USE_API) {
      return { 
        success: false, 
        data: null, 
        source: 'disabled',
        error: 'APIが無効化されています。'
      };
    }

    try {
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
      
      return { 
        success: true, 
        data: university, 
        source: 'firebase_api' 
      };

    } catch (error) {
      return { 
        success: false, 
        data: null, 
        source: 'firebase_error',
        error: `Firebase APIエラー: ${error.message}`
      };
    }
  }

  /**
   * 大学検索
   */
  static async searchUniversities(searchParams) {
    const USE_API = process.env.REACT_APP_USE_API === 'true';
    
    if (!USE_API) {
      return { 
        success: false, 
        data: [], 
        source: 'disabled',
        error: 'APIが無効化されています。'
      };
    }

    try {
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
      
      return { 
        success: true, 
        data: universities, 
        source: 'firebase_api',
        count: universities.length,
        total_found: result.total_found
      };

    } catch (error) {
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
      return { success: true, data: result, source: 'firebase_api' };

    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

/**
 * React Hook形式のAPI利用
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