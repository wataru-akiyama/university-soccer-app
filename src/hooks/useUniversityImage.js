// src/hooks/useUniversityImage.js - 詳細デバッグ版
import { useState, useEffect } from 'react';

/**
 * 大学のロゴ画像を管理するカスタムフック（詳細デバッグ版）
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
        const nodeEnv = process.env.NODE_ENV;
        
        console.log('🔍 Environment check:', {
          university_id: university.id,
          university_name: university.university_name,
          REACT_APP_FIREBASE_STORAGE_URL: storageUrl,
          PUBLIC_URL: publicUrl,
          NODE_ENV: nodeEnv,
          hostname: window.location.hostname,
          origin: window.location.origin
        });

        // 画像ソースの優先順位を本番環境用に調整
        const imageSources = [];
        
        // 1. 大学データに直接logo_urlが含まれている場合（最優先）
        if (university.logo_url) {
          imageSources.push(university.logo_url);
        }
        
        // 2. 本番環境では静的ファイルを優先、開発環境ではFirebaseを優先
        if (nodeEnv === 'production') {
          // GitHub Pages用: publicディレクトリの画像を優先
          imageSources.push(
            `${publicUrl || ''}/images/logos/${university.id}.png`,
            `${publicUrl || ''}/images/logos/${university.id}.jpg`,
            `${publicUrl || ''}/images/default-logo.png`
          );
          
          // Firebase Storage（念のため試行）
          if (storageUrl) {
            imageSources.push(
              `${storageUrl}/logos%2F${university.id}.png?alt=media`,
              `${storageUrl}/logos%2F${university.id}.jpg?alt=media`
            );
          }
        } else {
          // 開発環境: Firebase Storage を優先
          if (storageUrl) {
            imageSources.push(
              `${storageUrl}/logos%2F${university.id}.png?alt=media`,
              `${storageUrl}/logos%2F${university.id}.jpg?alt=media`
            );
          }
          
          // ローカルファイル
          imageSources.push(
            `${publicUrl || ''}/images/logos/${university.id}.png`,
            `${publicUrl || ''}/images/logos/${university.id}.jpg`,
            `${publicUrl || ''}/images/default-logo.png`,
            `/images/logos/${university.id}.png`,
            `/images/logos/${university.id}.jpg`
          );
        }

        // 重複除去
        const uniqueSources = [...new Set(imageSources)].filter(Boolean);

        console.log('📋 Image sources for university', university.id, ':', uniqueSources);

        setDebugInfo({
          universityId: university.id,
          universityName: university.university_name,
          sourcesCount: uniqueSources.length,
          sources: uniqueSources,
          storageUrl,
          publicUrl,
          nodeEnv,
          loadAttemptTime: new Date().toISOString()
        });

        // 画像ソースを順番にテスト
        for (let i = 0; i < uniqueSources.length; i++) {
          const source = uniqueSources[i];
          
          try {
            console.log(`🔄 Testing image source ${i + 1}/${uniqueSources.length}:`, source);
            
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
                loadTime: Date.now(),
                loadSuccess: true
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
        console.warn(`⚠️ All ${uniqueSources.length} image sources failed for university:`, {
          id: university.id,
          name: university.university_name,
          sources: uniqueSources,
          environment: nodeEnv,
          hostname: window.location.hostname
        });
        
        setImageUrl(null);
        setHasError(true);
        setDebugInfo(prev => ({
          ...prev,
          allSourcesFailed: true,
          failureReason: 'All image sources failed to load',
          totalAttempts: uniqueSources.length
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
 * Image要素を使って画像の読み込みをテストする関数（詳細ログ版）
 * @param {string} src - 画像のURL
 * @returns {Promise<boolean>} - 読み込み成功時true
 */
const testImageLoad = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    
    // 本番環境でのタイムアウトを短く設定
    const isProduction = process.env.NODE_ENV === 'production';
    const timeout = setTimeout(() => {
      console.log(`⏰ Image load timeout (${isProduction ? '5s' : '8s'}) for: ${src}`);
      resolve(false);
    }, isProduction ? 5000 : 8000);
    
    img.onload = () => {
      clearTimeout(timeout);
      console.log(`✅ Image onload success for: ${src}`, {
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        currentSrc: img.currentSrc
      });
      resolve(true);
    };
    
    img.onerror = (error) => {
      clearTimeout(timeout);
      console.log(`❌ Image onerror for: ${src}`, {
        error: error,
        type: error.type,
        target: error.target
      });
      resolve(false);
    };
    
    // リクエスト開始
    try {
      img.src = src;
    } catch (error) {
      clearTimeout(timeout);
      console.log(`💥 Failed to set img.src for: ${src}`, error);
      resolve(false);
    }
  });
};

export default useUniversityImage;