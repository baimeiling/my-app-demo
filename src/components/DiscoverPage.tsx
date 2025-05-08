import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { usePullToRefresh } from '../hooks/usePullToRefresh';
import { fetchPosts } from '../services/api';
import PostItem from './PostItem';
import { Post, PostItemType } from '../types/post';
import { LoadingOutlined, EllipsisOutlined } from '@ant-design/icons';
import { rem } from '../utils/rem';
import { generateRecommendationCards } from '../utils/recommendationData';

const Container = styled.div`
  padding: ${rem(8)};
`;

const ColumnsWrapper = styled.div`
  display: flex;
  gap: ${rem(8)};
`;

const Column = styled.div`
  flex: 1;
  min-width: 0;
`;

const RefreshIndicator = styled.div<{ $pullDown: number }>`
  position: fixed;
  top: ${rem(12)};
  width: 100vw;
  text-align: center;
  height: ${props =>{ return props.$pullDown > 60 ? 'auto': '0px' }};
  color: #999;
  opacity: ${props => Math.min(props.$pullDown / 60, 1)};
  z-index: 999;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding-bottom: ${rem(16)};
  font-size: ${rem(14)};
  color: #999;
`;

interface DiscoverPageProps {
  dataType?: string;
}

const DiscoverPage: React.FC<DiscoverPageProps> = ({ dataType = 'default' }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState<PostItemType[][]>([[], []]);
  const prevPostsRef = useRef<Post[]>([]);

  const loadPosts = async (refresh = false) => {
    if (loading) return;
    
    setLoading(true);
    const currentPage = refresh ? 1 : page;
    
    try {
      const response = await fetchPosts(currentPage, dataType);
      if(response.nextPage !== null){
        setHasMore(response.nextPage !== null);
      }else{
        setTimeout(()=>{
          setHasMore(response.nextPage !== null);
        },300)
      }
      
      
      if (refresh) {
        setPosts(response.data);
        setPage(2);
      } else {
        setPosts(prev => [...prev, ...response.data]);
        setPage(prev => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  // 合并推荐卡片到帖子流（类似淘宝的随机插入效果）
  const mergeRecommendations = useCallback((posts: Post[]): PostItemType[] => {
    if (posts.length < 8) return [...posts];
    
    const result = [...posts];
    const recommendationInterval = 8 + Math.floor(Math.random() * 5); // 8-12随机间隔
    
    // 计算可以插入的推荐卡片数量（最多2个）
    const maxRecommendations = Math.min(2, Math.floor(posts.length / recommendationInterval));
    
    // 生成推荐卡片
    const recommendations = generateRecommendationCards(maxRecommendations);
    
    // 随机插入位置
    let insertPosition = recommendationInterval;
    recommendations.forEach(recommendation => {
      if (insertPosition < result.length - 3) { // 不在最后几个位置插入
        result.splice(insertPosition, 0, recommendation as any);
        insertPosition += recommendationInterval + Math.floor(Math.random() * 3);
      }
    });
    
    return result;
  }, []);

  // 处理数据合并和列分配
  useEffect(() => {
    if (posts.length === 0 || posts === prevPostsRef.current) return;
    
    // 合并推荐卡片
    const mergedData = posts.length >= 8 ? mergeRecommendations(posts) : [...posts];
    
    // 分配列（确保两列数量差不超过1）
    const newColumns: PostItemType[][] = [[], []];
    const columnHeights = [0, 0];
    const columnCounts = [0, 0];

    mergedData.forEach(item => {
      // 计算item高度
      const aspectRatio = item.type === 'recommendation' 
        ? 0.8  // 推荐卡片固定宽高比
        : item.width / item.height;
      const itemHeight = 1 / aspectRatio;

      // 选择列的规则：优先平衡数量，其次平衡高度
      let targetColumn = 0;
      if (columnCounts[0] - columnCounts[1] > 1) {
        targetColumn = 1;
      } else if (columnCounts[1] - columnCounts[0] > 1) {
        targetColumn = 0;
      } else {
        targetColumn = columnHeights[0] <= columnHeights[1] ? 0 : 1;
      }

      newColumns[targetColumn].push(item);
      columnHeights[targetColumn] += itemHeight;
      columnCounts[targetColumn] += 1;
    });

    setColumns(newColumns);
    prevPostsRef.current = posts;
  }, [posts, mergeRecommendations]);

  const handleRefresh = async () => {
    await loadPosts(true);
  };

  // 初始化加载
  useEffect(() => {
    loadPosts(true);
  }, [dataType]);

  useInfiniteScroll(() => loadPosts(), hasMore);
  const { pullDown } = usePullToRefresh(handleRefresh);

  return (
    <Container>
      <RefreshIndicator $pullDown={pullDown}>
        <EllipsisOutlined style={{ fontSize: rem(20) }} />
      </RefreshIndicator>
      
      <ColumnsWrapper>
        {columns.map((columnItems, index) => (
          <Column key={index}>
            {columnItems.map(item => (
              <PostItem key={item.id} item={item} />
            ))}
          </Column>
        ))}
      </ColumnsWrapper>
      
      {loading && (
        <LoadingIndicator>
          <LoadingOutlined spin style={{ fontSize: rem(20) }} />
        </LoadingIndicator>
      )}
      {!hasMore && !loading && (
        <LoadingIndicator>没有更多内容了</LoadingIndicator>
      )}
    </Container>
  );
};

export default DiscoverPage;