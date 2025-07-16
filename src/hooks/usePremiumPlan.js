// src/hooks/usePremiumPlan.js - プレミアムプラン管理フック
import { useState, useEffect } from 'react';

/**
 * プレミアムプランの状態管理フック
 */
export const usePremiumPlan = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ローカルストレージからプラン状態を読み込み
  useEffect(() => {
    try {
      const savedPlanStatus = localStorage.getItem('isPremiumPlan');
      if (savedPlanStatus !== null) {
        setIsPremium(JSON.parse(savedPlanStatus));
      }
    } catch (error) {
      console.error('プラン状態の読み込みに失敗:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // プラン状態をローカルストレージに保存
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('isPremiumPlan', JSON.stringify(isPremium));
      } catch (error) {
        console.error('プラン状態の保存に失敗:', error);
      }
    }
  }, [isPremium, isLoading]);

  /**
   * プラン状態を切り替える
   */
  const togglePlan = () => {
    setIsPremium(prev => !prev);
  };

  /**
   * プレミアムプランに切り替える
   */
  const upgradeToPremium = () => {
    setIsPremium(true);
  };

  /**
   * フリープランに切り替える
   */
  const downgradeToFree = () => {
    setIsPremium(false);
  };

  /**
   * プレミアム機能が利用可能かチェック
   */
  const canUsePremiumFeature = (featureName) => {
    if (isPremium) return true;
    
    // ログ出力（開発用）
    console.log(`🔒 プレミアム機能 "${featureName}" へのアクセスがブロックされました`);
    return false;
  };

  /**
   * プレミアム限定コンテンツの表示可否判定
   */
  const shouldShowContent = (contentType) => {
    const premiumContentTypes = [
      'playmaker_comment_detail',
      'cost_details', 
      'admission_details',
      'scholarship_details',
      'facility_details',
      'career_details',
      'reviews',
      'comparison',
      'practice_application'
    ];

    if (premiumContentTypes.includes(contentType)) {
      return isPremium;
    }

    return true; // フリーコンテンツは常に表示
  };

  /**
   * プレミアム機能へのアクセス試行をトラッキング
   */
  const trackPremiumAttempt = (featureName, action = 'attempted') => {
    // 実際のアプリでは分析ツールに送信
    console.log(`📊 プレミアム機能トラッキング: ${featureName} - ${action}`);
    
    // ローカルストレージに記録（簡易版）
    try {
      const attempts = JSON.parse(localStorage.getItem('premiumAttempts') || '[]');
      attempts.push({
        feature: featureName,
        action: action,
        timestamp: new Date().toISOString(),
        isPremium: isPremium
      });
      
      // 最新100件のみ保持
      if (attempts.length > 100) {
        attempts.splice(0, attempts.length - 100);
      }
      
      localStorage.setItem('premiumAttempts', JSON.stringify(attempts));
    } catch (error) {
      console.error('プレミアム試行の記録に失敗:', error);
    }
  };

  return {
    // 状態
    isPremium,
    isLoading,
    
    // アクション
    togglePlan,
    upgradeToPremium,
    downgradeToFree,
    
    // ユーティリティ
    canUsePremiumFeature,
    shouldShowContent,
    trackPremiumAttempt
  };
};

export default usePremiumPlan;