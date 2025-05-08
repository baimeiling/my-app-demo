import { useState, useEffect, useCallback } from 'react';

export const usePullToRefresh = (onRefresh: () => Promise<void>) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);
  const [pullDown, setPullDown] = useState(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].pageY);
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (startY === null) return;
      
      const y = e.touches[0].pageY;
      const diff = y - startY;
      
      if (diff > 0) {
        // e.preventDefault();
        setPullDown(Math.min(diff, 100));
      }
    },
    [startY]
  );

  const handleTouchEnd = useCallback(async () => {
    if (pullDown > 60 && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    setStartY(null);
    setPullDown(0);
  }, [pullDown, isRefreshing, onRefresh]);

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { isRefreshing, pullDown };
};