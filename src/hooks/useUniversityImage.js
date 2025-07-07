// src/hooks/useUniversityImage.js - HEADリクエスト問題修正版
import { useState, useEffect } from 'react';

/**
 * 大学のロゴ画像を管理するカスタムフック
 * @param {Object} university - 大学データオブジェクト
 * @returns {Object} - { imageUrl, isLoading, hasError }
 */
export const useUniversityImage = (university) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      if (!university || !university.id) {
        setImageUrl(null);
        setIsLoading(false);
        setHasError(true);
        return;
      }

      setIsLoading(true);
      setHasError(false);

      try {
        // 画像ソースの優先順位
        const imageSources = [
            // 1. Firebaseデータに直接logo_urlが含まれている場合（最優先）
            university.logo_url,
            
            // 2. Firebase Storage（PNG形式）
            `${process.env.REACT_APP_FIREBASE_STORAGE_URL}/logos%2F${university.id}.png?alt=media`,
            
            // 3. Firebase Storage（JPG形式）  
            `${process.env.REACT_APP_FIREBASE_STORAGE_URL}/logos%2F${university.id}.jpg?alt=media`,
            
            // 4. 汎用フォールバック画像
            `${process.env.PUBLIC_URL}/images/default-logo.png`,
            
            // 5. ローカルの画像フォルダ（開発用）- 最後に試行
            `/images/logos/${university.id}.png`,
            `/images/logos/${university.id}.jpg`
        ].filter(Boolean);

        // 修正: HEADリクエストを使わず、直接Image要素で確認
        for (const source of imageSources) {
          try {
            const success = await testImageLoad(source);
            
            if (success) {
              console.log(`✅ Image loaded successfully: ${source}`);
              setImageUrl(source);
              setIsLoading(false);
              setHasError(false);
              return;
            }
          } catch (error) {
            // この画像ソースは失敗、次を試行
            console.debug(`❌ Image load failed: ${source}`, error);
            continue;
          }
        }

        // すべての画像ソースが失敗した場合
        console.warn(`⚠️ All image sources failed for university: ${university.university_name}`);
        setImageUrl(null);
        setHasError(true);

      } catch (error) {
        console.error('画像読み込みでエラーが発生しました:', error);
        setImageUrl(null);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [university?.id, university?.logo_url]);

  return { imageUrl, isLoading, hasError };
};

/**
 * Image要素を使って画像の読み込みをテストする関数
 * @param {string} src - 画像のURL
 * @returns {Promise<boolean>} - 読み込み成功時true
 */
const testImageLoad = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    
    // Firebase StorageのCORS問題を回避するため、crossOriginは設定しない
    // img.crossOrigin = 'anonymous';
    
    // タイムアウト設定
    const timeout = setTimeout(() => {
      resolve(false);
    }, 5000);
    
    img.onload = () => {
      clearTimeout(timeout);
      resolve(true);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };
    
    img.src = src;
  });
};

export default useUniversityImage;