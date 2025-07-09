// src/hooks/useUniversityImage.js - CORS問題回避版
import { useState, useEffect } from 'react';

/**
 * 大学のロゴ画像を管理するカスタムフック（CORS問題回避版）
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
        const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
        const publicUrl = process.env.PUBLIC_URL;
        const nodeEnv = process.env.NODE_ENV;
        
        console.log('🔍 Environment check:', {
          university_id: university.id,
          university_name: university.university_name,
          REACT_APP_FIREBASE_STORAGE_URL: storageUrl,
          REACT_APP_FIREBASE_PROJECT_ID: projectId,
          PUBLIC_URL: publicUrl,
          NODE_ENV: nodeEnv
        });

        // 画像ソースの優先順位を設定
        const imageSources = [];
        
        // 1. 大学データに直接logo_urlが含まれている場合（最優先）
        if (university.logo_url) {
          imageSources.push(university.logo_url);
        }
        
        // 2. Firebase Storage - CORS問題を回避する複数の URL パターン
        if (storageUrl && projectId) {
          // パターン1: 通常の Firebase Storage URL
          imageSources.push(
            `${storageUrl}/logos%2F${university.id}.png?alt=media`,
            `${storageUrl}/logos%2F${university.id}.jpg?alt=media`
          );
          
          // パターン2: 直接 Google Storage URL
          imageSources.push(
            `https://storage.googleapis.com/${projectId}.appspot.com/logos/${university.id}.png`,
            `https://storage.googleapis.com/${projectId}.appspot.com/logos/${university.id}.jpg`
          );
          
          // パターン3: Firebase の CDN URL
          imageSources.push(
            `https://firebasestorage.googleapis.com/v0/b/${projectId}.appspot.com/o/logos%2F${university.id}.png?alt=media`,
            `https://firebasestorage.googleapis.com/v0/b/${projectId}.appspot.com/o/logos%2F${university.id}.jpg?alt=media`
          );
        } else if (storageUrl) {
          // 従来の設定（プロジェクトIDが設定されていない場合）
          imageSources.push(
            `${storageUrl}/logos%2F${university.id}.png?alt=media`,
            `${storageUrl}/logos%2F${university.id}.jpg?alt=media`
          );
        }
        
        // 3. 静的ファイルをフォールバックとして追加
        imageSources.push(
          `${publicUrl || ''}/images/logos/${university.id}.png`,
          `${publicUrl || ''}/images/logos/${university.id}.jpg`,
          `${publicUrl || ''}/images/default-logo.png`,
          `/images/logos/${university.id}.png`,
          `/images/logos/${university.id}.jpg`,
          `/images/default-logo.png`
        );

        // 重複除去
        const uniqueSources = [...new Set(imageSources)].filter(Boolean);

        console.log('📋 Image sources for university', university.id, ':', uniqueSources);

        setDebugInfo({
          universityId: university.id,
          universityName: university.university_name,
          sourcesCount: uniqueSources.length,
          sources: uniqueSources,
          storageUrl,
          projectId,
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
          environment: nodeEnv
        });
        
        setImageUrl(null);
        setHasError(true);

      } catch (error) {
        console.error('💥 Image loading process error:', error);
        setImageUrl(null);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [university?.id, university?.logo_url]);

  return { imageUrl, isLoading, hasError, debugInfo };
};

/**
 * Image要素を使って画像の読み込みをテストする関数（CORS対応版）
 */
const testImageLoad = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    
    // タイムアウト設定
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
    
    // CORS設定 - Firebase Storage によっては必要
    // ただし、?alt=media を使用する場合は通常不要
    try {
      // まず crossOrigin なしで試行
      img.src = src;
    } catch (error) {
      clearTimeout(timeout);
      console.log(`💥 Failed to set img.src for: ${src}`, error);
      resolve(false);
    }
  });
};

export default useUniversityImage;