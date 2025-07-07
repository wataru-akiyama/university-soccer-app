// src/hooks/useUniversityImage.js - デバッグ改善版
import { useState, useEffect } from 'react';

/**
 * 大学のロゴ画像を管理するカスタムフック
 * @param {Object} university - 大学データオブジェクト
 * @returns {Object} - { imageUrl, isLoading, hasError, debugInfo }
 */
export const useUniversityImage = (university) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      if (!university || !university.id) {
        setImageUrl(null);
        setIsLoading(false);
        setHasError(true);
        setDebugInfo('University or university.id is missing');
        return;
      }

      setIsLoading(true);
      setHasError(false);

      try {
        // 環境変数の確認
        const storageUrl = process.env.REACT_APP_FIREBASE_STORAGE_URL;
        const publicUrl = process.env.PUBLIC_URL;
        
        console.log('🔍 Environment check:', {
          university_id: university.id,
          university_name: university.university_name,
          REACT_APP_FIREBASE_STORAGE_URL: storageUrl,
          PUBLIC_URL: publicUrl,
          NODE_ENV: process.env.NODE_ENV
        });

        // 画像ソースの優先順位
        const imageSources = [
            // 1. Firebaseデータに直接logo_urlが含まれている場合（最優先）
            university.logo_url,
            
            // 2. Firebase Storage（PNG形式）
            storageUrl ? `${storageUrl}/logos%2F${university.id}.png?alt=media` : null,
            
            // 3. Firebase Storage（JPG形式）  
            storageUrl ? `${storageUrl}/logos%2F${university.id}.jpg?alt=media` : null,
            
            // 4. 汎用フォールバック画像
            `${publicUrl || ''}/images/default-logo.png`,
            
            // 5. ローカルの画像フォルダ（開発用）- 最後に試行
            `/images/logos/${university.id}.png`,
            `/images/logos/${university.id}.jpg`
        ].filter(Boolean);

        console.log('📋 Image sources for university', university.id, ':', imageSources);

        setDebugInfo({
          universityId: university.id,
          universityName: university.university_name,
          sourcesCount: imageSources.length,
          sources: imageSources,
          storageUrl,
          publicUrl
        });

        // 画像ソースを順番にテスト
        for (let i = 0; i < imageSources.length; i++) {
          const source = imageSources[i];
          
          try {
            console.log(`🔄 Testing image source ${i + 1}/${imageSources.length}:`, source);
            
            const success = await testImageLoad(source);
            
            if (success) {
              console.log(`✅ Image loaded successfully from source ${i + 1}:`, source);
              setImageUrl(source);
              setIsLoading(false);
              setHasError(false);
              setDebugInfo(prev => ({
                ...prev,
                successfulSource: source,
                successfulSourceIndex: i,
                loadTime: Date.now()
              }));
              return;
            } else {
              console.log(`❌ Image load failed from source ${i + 1}:`, source);
            }
          } catch (error) {
            console.log(`💥 Image load error from source ${i + 1}:`, source, error);
            continue;
          }
        }

        // すべての画像ソースが失敗した場合
        console.warn(`⚠️ All ${imageSources.length} image sources failed for university:`, {
          id: university.id,
          name: university.university_name,
          sources: imageSources
        });
        
        setImageUrl(null);
        setHasError(true);
        setDebugInfo(prev => ({
          ...prev,
          allSourcesFailed: true,
          failureReason: 'All image sources failed to load'
        }));

      } catch (error) {
        console.error('💥 Image loading process error:', error);
        setImageUrl(null);
        setHasError(true);
        setDebugInfo(prev => ({
          ...prev,
          processError: error.message
        }));
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [university?.id, university?.logo_url]);

  return { imageUrl, isLoading, hasError, debugInfo };
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
    
    // タイムアウト設定（本番環境では少し長めに）
    const timeout = setTimeout(() => {
      console.log(`⏰ Image load timeout for: ${src}`);
      resolve(false);
    }, 8000);
    
    img.onload = () => {
      clearTimeout(timeout);
      console.log(`✅ Image onload success for: ${src}`);
      resolve(true);
    };
    
    img.onerror = (error) => {
      clearTimeout(timeout);
      console.log(`❌ Image onerror for: ${src}`, error);
      resolve(false);
    };
    
    img.src = src;
  });
};

export default useUniversityImage;