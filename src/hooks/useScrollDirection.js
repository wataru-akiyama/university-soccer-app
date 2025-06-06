// src/hooks/useScrollDirection.js (安定版)
import { useState, useEffect } from 'react';

/**
 * スクロール方向を検知するカスタムフック
 * @param {number} threshold - スクロール検知の閾値（px）
 * @returns {object} - { scrollDirection, isVisible }
 */
const useScrollDirection = (threshold = 5) => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      
      // ページトップ付近（50px以内）は常に表示
      if (currentScrollY < 50) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        ticking = false;
        return;
      }

      // 閾値以上スクロールした場合のみ処理
      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      // スクロール方向を判定
      if (currentScrollY > lastScrollY) {
        // 下スクロール：ヘッダーを隠す
        if (scrollDirection !== 'down') {
          setScrollDirection('down');
          setIsVisible(false);
        }
      } else {
        // 上スクロール：ヘッダーを表示
        if (scrollDirection !== 'up') {
          setScrollDirection('up');
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    // 初期状態の設定
    setLastScrollY(window.pageYOffset || document.documentElement.scrollTop);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // クリーンアップ
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollDirection, lastScrollY, threshold]);

  return {
    scrollDirection,
    isVisible
  };
};

export default useScrollDirection;