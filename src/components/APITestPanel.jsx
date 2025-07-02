// src/components/APITestPanel.jsx - 大学データFirebase移行版
import React, { useState } from 'react';
import { CheckCircle, XCircle, Loader, Database, Globe, AlertTriangle } from 'lucide-react';
import UniversityAPIService from '../services/apiService';

/**
 * 大学データFirebase接続テスト用コンポーネント（段階的移行版）
 * 本番時は削除またはDEBUG_MODEでのみ表示
 */
const APITestPanel = () => {
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);

  // APIヘルスチェック
  const testAPIHealth = async () => {
    setIsLoading(true);
    try {
      const result = await UniversityAPIService.testConnection();
      setTestResults(prev => ({
        ...prev,
        health: result
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        health: { success: false, error: error.message }
      }));
    }
    setIsLoading(false);
  };

  // 大学データ取得テスト（Firebase必須）
  const testUniversityFetch = async () => {
    setIsLoading(true);
    try {
      const result = await UniversityAPIService.fetchUniversities();
      setTestResults(prev => ({
        ...prev,
        universities: result
      }));
      setApiData(result.data);
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        universities: { success: false, error: error.message }
      }));
    }
    setIsLoading(false);
  };

  // 特定大学取得テスト（Firebase必須）
  const testSpecificUniversity = async () => {
    setIsLoading(true);
    try {
      const result = await UniversityAPIService.fetchUniversityById(1); // ID 1の大学を取得
      setTestResults(prev => ({
        ...prev,
        specific: result
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        specific: { success: false, error: error.message }
      }));
    }
    setIsLoading(false);
  };

  // 検索機能テスト（Firebase必須）
  const testSearch = async () => {
    setIsLoading(true);
    try {
      const searchParams = {
        searchQuery: '早稲田',
        regions: ['関東'],
        leagues: ['関東大学サッカーリーグ1部']
      };
      const result = await UniversityAPIService.searchUniversities(searchParams);
      setTestResults(prev => ({
        ...prev,
        search: result
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        search: { success: false, error: error.message }
      }));
    }
    setIsLoading(false);
  };

  // 結果表示用コンポーネント
  const TestResult = ({ title, result, icon: Icon }) => {
    if (!result) return null;

    const isSuccess = result.success;
    const StatusIcon = isSuccess ? CheckCircle : XCircle;
    const statusColor = isSuccess ? 'text-green-600' : 'text-red-600';
    const bgColor = isSuccess ? 'bg-green-50' : 'bg-red-50';

    return (
      <div className={`p-4 rounded-lg border ${bgColor}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon size={20} className="text-blue-600" />
            <h4 className="font-medium">{title}</h4>
          </div>
          <StatusIcon size={20} className={statusColor} />
        </div>
        
        {isSuccess ? (
          <div className="space-y-1">
            <p className="text-sm text-green-700">✅ 成功</p>
            <p className="text-xs text-gray-600">データソース: {result.source}</p>
            {result.count && (
              <p className="text-xs text-gray-600">取得件数: {result.count}件</p>
            )}
            {result.total_found && (
              <p className="text-xs text-gray-600">総件数: {result.total_found}件</p>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-sm text-red-700">❌ 失敗</p>
            <p className="text-xs text-red-600">{result.error}</p>
          </div>
        )}
      </div>
    );
  };

  // Firebase API設定状態の表示
  const apiEnabled = process.env.REACT_APP_USE_API === 'true';
  const apiUrl = process.env.REACT_APP_FIREBASE_API_URL;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-dashed border-blue-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Database size={24} className="mr-2 text-blue-600" />
          大学データFirebase接続テスト
        </h3>
        <div className="text-sm text-gray-500">
          開発・検証専用
        </div>
      </div>

      {/* 環境設定状態 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-3 flex items-center">
          <AlertTriangle size={16} className="mr-2 text-yellow-600" />
          現在の設定
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>大学データ取得:</span>
            <span className={`font-medium ${apiEnabled ? 'text-green-600' : 'text-red-600'}`}>
              {apiEnabled ? '🔥 Firebase使用中' : '❌ API無効化（大学データなし）'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Firebase URL:</span>
            <span className="font-mono text-xs text-gray-600">
              {apiUrl || '❌ 未設定（必須）'}
            </span>
          </div>
          <div className="bg-blue-100 p-2 rounded text-blue-700 text-xs">
            📊 大学データ: Firebase必須（ローカルフォールバックなし）
          </div>
          {!apiEnabled && (
            <div className="bg-red-100 p-2 rounded text-red-700 text-xs">
              ⚠️ APIが無効化されています。大学データの取得ができません。
            </div>
          )}
          {!apiUrl && (
            <div className="bg-orange-100 p-2 rounded text-orange-700 text-xs">
              ⚠️ Firebase API URLが設定されていません。
            </div>
          )}
        </div>
      </div>

      {/* テストボタン */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <button
          onClick={testAPIHealth}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? <Loader size={16} className="animate-spin mr-2" /> : <Globe size={16} className="mr-2" />}
          ヘルス
        </button>
        
        <button
          onClick={testUniversityFetch}
          disabled={isLoading}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? <Loader size={16} className="animate-spin mr-2" /> : <Database size={16} className="mr-2" />}
          全取得
        </button>
        
        <button
          onClick={testSpecificUniversity}
          disabled={isLoading}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center"
        >
          個別取得
        </button>
        
        <button
          onClick={testSearch}
          disabled={isLoading}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 flex items-center justify-center"
        >
          検索
        </button>
      </div>

      {/* テスト結果 */}
      <div className="space-y-3">
        <TestResult title="Firebase APIヘルスチェック" result={testResults.health} icon={Globe} />
        <TestResult title="大学データ取得（Firebase）" result={testResults.universities} icon={Database} />
        <TestResult title="特定大学取得（Firebase）" result={testResults.specific} icon={CheckCircle} />
        <TestResult title="検索機能（Firebase）" result={testResults.search} icon={XCircle} />
      </div>

      {/* データプレビュー */}
      {apiData && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">取得データプレビュー（最初の2校）</h4>
          <div className="text-xs">
            <pre className="bg-white p-3 rounded border overflow-x-auto">
              {JSON.stringify(apiData.slice(0, 2), null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* 大学データFirebase移行ガイド */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">📊 段階的Firebase移行（第1段階）</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p><code className="bg-white px-1 rounded">.env</code> ファイル設定:</p>
          <p>• <code className="bg-white px-1 rounded">REACT_APP_USE_API=true</code>（大学データ取得に必須）</p>
          <p>• <code className="bg-white px-1 rounded">REACT_APP_FIREBASE_API_URL=https://your-firebase-url</code></p>
          <div className="bg-blue-100 p-2 rounded mt-2">
            <p className="font-medium">📋 移行状況:</p>
            <p>✅ 大学データ: Firebase必須</p>
            <p>📁 設定データ: ローカル保持</p>
            <p>👤 ユーザープロフィール: ローカル保持</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITestPanel;