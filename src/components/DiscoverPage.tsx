import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { usePullToRefresh } from '../hooks/usePullToRefresh';
import { fetchPosts } from '../services/api';
import PostItem from './PostItem';
import { Post } from '../types/post';
import { LoadingOutlined, EllipsisOutlined } from '@ant-design/icons';
import { rem } from '../utils/rem';

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

const RefreshIndicator = styled.div<{ pullDown: number }>`
  position: fixed;
  top: ${rem(12)};
  width: 100vw;
  text-align: center;
  height: ${props =>{ return props.pullDown > 60 ? 'auto': '0px' }};
  color: #999;
  opacity: ${props => Math.min(props.pullDown / 60, 1)};
 
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
  const [columns, setColumns] = useState<Post[][]>([[], []]);

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

  const handleRefresh = async () => {
    await loadPosts(true);
  };

  // 初始化加载
  useEffect(() => {
    loadPosts(true);
  }, [dataType]);

  // 分配帖子到两列
  useEffect(() => {
    const newColumns: Post[][] = [[], []];
    let heights = [0, 0];
    
    posts.forEach(post => {
      const aspectRatio = post.width / post.height;
      const index = heights[0] <= heights[1] ? 0 : 1;
      newColumns[index].push(post);
      heights[index] += 1 / aspectRatio;
    });
    
    setColumns(newColumns);
  }, [posts]);

  useInfiniteScroll(() => loadPosts(), hasMore);
  const { pullDown } = usePullToRefresh(handleRefresh);

  return (
    <Container>
      <RefreshIndicator pullDown={pullDown}>
        {pullDown > 60 ? <EllipsisOutlined style={{fontSize: '30px'}} /> : <EllipsisOutlined  style={{fontSize: '30px'}}/>}
      </RefreshIndicator>
      
      <ColumnsWrapper>
        {columns.map((columnPosts, index) => (
          <Column key={index}>
            {columnPosts.map(post => (
              <PostItem key={post.id} post={post} />
            ))}
          </Column>
        ))}
      </ColumnsWrapper>
      
      {/* {loading && <LoadingIndicator>加载中...</LoadingIndicator>} */}
      {loading && <LoadingIndicator><LoadingOutlined /></LoadingIndicator>}
      {!hasMore && !loading&& <LoadingIndicator>到底啦</LoadingIndicator>}
    </Container>
  );
};

export default DiscoverPage;