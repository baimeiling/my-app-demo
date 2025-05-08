import { useState, useEffect, useCallback } from 'react';

export const useInfiniteScroll = (
  loadMore: () => Promise<void>,
  hasMore: boolean
) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 100;
    
    if (isBottom && !isLoading && hasMore) {
      setIsLoading(true);
      loadMore().finally(() => setIsLoading(false));
    }
  }, [isLoading, hasMore, loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
};