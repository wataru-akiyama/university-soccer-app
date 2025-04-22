// src/components/AgentView.jsx
import React, { useState, useEffect } from 'react';
import EnhancedAgentView from './EnhancedAgentView';

/**
 * Agent (代理人) View コンポーネント
 * ユーザーのポートフォリオ情報と大学データに基づいて
 * パーソナライズされた進路提案を行うビュー
 */
const AgentView = ({ 
  userProfile,
  universities,
  favoriteUniversities,
  onViewDetails 
}) => {
  // 大学をお気に入りに追加する処理（実際はApp.jsから提供される関数を使用）
  const handleAddToFavorites = (university) => {
    // ViewManagerからonAddToFavoritesプロップを受け取って使用する予定
    // このデモでは仮の実装
    alert(`${university.university_name}をお気に入りに追加しました`);
  };

  // EnhancedAgentViewコンポーネントにデータを渡す
  return (
    <EnhancedAgentView
      userProfile={userProfile}
      universities={universities}
      favoriteUniversities={favoriteUniversities}
      onViewDetails={onViewDetails}
      onAddToFavorites={handleAddToFavorites}
    />
  );
};

export default AgentView;