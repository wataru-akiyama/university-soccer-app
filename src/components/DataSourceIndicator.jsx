// src/components/DataSourceIndicator.jsx - 本番向け簡素化版
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const DataSourceIndicator = ({ 
  error, 
  onRefresh
}) => {
  // エラー時のみ表示
  if (!error) return null;
  
  return (
    <div className="fixed top-20 right-4 z-50 p-3 rounded-lg shadow-lg text-sm max-w-xs bg-red-50 border border-red-200">
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <div>
            <span className="text-red-800 block">接続エラー</span>
            <span className="text-red-600 text-xs">データを取得できません</span>
          </div>
        </div>
        
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="text-red-500 hover:text-red-700 p-1 rounded"
            title="再試行"
          >
            <RefreshCw size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DataSourceIndicator;