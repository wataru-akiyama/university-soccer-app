// src/hooks/useUniversityImage.js
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
          // 1. Firebaseデータに直接logo_urlが含まれている場合
          university.logo_url,
          
          // 2. Firebase Storage（PNG形式）
          `${process.env.REACT_APP_FIREBASE_STORAGE_URL}/logos%2F${university.id}.png?alt=media`,
          
          // 3. Firebase Storage（JPG形式）
          `${process.env.REACT_APP_FIREBASE_STORAGE_URL}/logos%2F${university.id}.jpg?alt=media`,
          
          // 4. ローカルの画像フォルダ（開発用）
          `/images/logos/${university.id}.png`,
          `/images/logos/${university.id}.jpg`,
          
          // 5. 汎用フォールバック画像
          `${process.env.PUBLIC_URL}/images/default-logo.png`
        ].filter(Boolean); // nullやundefinedを除外

        // 各画像ソースを順番に試行
        for (const source of imageSources) {
          try {
            // 画像の存在確認（HEADリクエスト）
            const response = await fetch(source, { 
              method: 'HEAD',
              timeout: 5000 // 5秒でタイムアウト
            });
            
            if (response.ok) {
              setImageUrl(source);
              setIsLoading(false);
              setHasError(false);
              return;
            }
          } catch (error) {
            // この画像ソースは失敗、次を試行
            console.debug(`画像読み込み失敗: ${source}`, error);
            continue;
          }
        }

        // すべての画像ソースが失敗した場合
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

export default useUniversityImage;