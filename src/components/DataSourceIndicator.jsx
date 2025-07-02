// src/components/DataSourceIndicator.jsx - 新規作成（デバッグ用）
import React from 'react';
import { Cloud, HardDrive, AlertTriangle, RefreshCw } from 'lucide-react';

const DataSourceIndicator = ({ 
  universities, 
  loading, 
  error, 
  onRefresh,
  showDetails = false 
}) => {
  const isFirebaseData = universities.length > 0 && !error;
  const isLocalFallback = universities.length > 0 && error;
  
  // 本番環境では表示しない（開発環境のみ）
  if (process.env.NODE_ENV === 'production' && !showDetails) return null;
  
  return (
    <div className={`fixed top-20 right-4 z-50 p-3 rounded-lg shadow-lg text-sm max-w-xs ${
      loading ? 'bg-yellow-50 border border-yellow-200' :
      error ? 'bg-red-50 border border-red-200' :
      isFirebaseData ? 'bg-green-50 border border-green-200' :
      'bg-blue-50 border border-blue-200'
    }`}>
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          {loading && (
            <>
              <Cloud className="w-4 h-4 text-yellow-600 animate-pulse" />
              <span className="text-yellow-800">Firebase接続中...</span>
            </>
          )}
          
          {error && !loading && (
            <>
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <div>
                <span className="text-red-800 block">Firebase接続失敗</span>
                <span className="text-red-600 text-xs">ローカルデータ使用中</span>
              </div>
            </>
          )}
          
          {isFirebaseData && !loading && (
            <>
              <Cloud className="w-4 h-4 text-green-600" />
              <div>
                <span className="text-green-800 block">Firebase 接続中</span>
                <span className="text-green-600 text-xs">{universities.length}校のデータ</span>
              </div>
            </>
          )}
          
          {isLocalFallback && !loading && (
            <>
              <HardDrive className="w-4 h-4 text-blue-600" />
              <div>
                <span className="text-blue-800 block">ローカルデータ</span>
                <span className="text-blue-600 text-xs">{universities.length}校のデータ</span>
              </div>
            </>
          )}
        </div>
        
        {/* 再取得ボタン */}
        {onRefresh && !loading && (
          <button
            onClick={onRefresh}
            className="text-gray-500 hover:text-gray-700 p-1 rounded"
            title="再取得"
          >
            <RefreshCw size={14} />
          </button>
        )}
      </div>
      
      {error && (
        <div className="mt-2 text-xs text-red-600 bg-red-100 p-2 rounded">
          {error}
        </div>
      )}
      
      {/* Firebase APIの詳細情報 */}
      {(isFirebaseData || error) && process.env.NODE_ENV === 'development' && (
        <div className="mt-2 text-xs text-gray-500 border-t pt-2">
          <div>API: {process.env.REACT_APP_FIREBASE_API_URL ? '設定済み' : '未設定'}</div>
          {universities.length > 0 && (
            <div>最後の更新: {new Date().toLocaleTimeString()}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataSourceIndicator;