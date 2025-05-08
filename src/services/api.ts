import { ApiResponse, Post } from '../types/post';
import { generateMockData } from '../utils/mockData';

export const fetchPosts = async (
  page: number,
  dataType: string = 'default'
): Promise<ApiResponse> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 根据不同的dataType参数返回不同的数据
  const data = generateMockData(page, dataType);
  
  return {
    data,
    nextPage: page < 3 ? page + 1 : null // 模拟只有3页数据
  };
};