import { RecommendationCard } from '../types/post';

const recommendationTemplates = [
  {
    title: '热门游戏推荐',
    description: '快来体验今日最火游戏，赢取限量奖励！',
    imageUrl: 'https://via.placeholder.com/600x400/ff9500/ffffff?text=Game+Recommend',
    actionText: '立即试玩',
    actionUrl: '#'
  },
  {
    title: '新版本上线',
    description: '233乐园3.0版本全新上线，更多功能等你发现！',
    imageUrl: 'https://via.placeholder.com/600x400/007aff/ffffff?text=New+Version',
    actionText: '查看详情',
    actionUrl: '#'
  },
  {
    title: '社区活动',
    description: '参与社区互动，赢取周边好礼！',
    imageUrl: 'https://via.placeholder.com/600x400/34c759/ffffff?text=Community+Event',
    actionText: '参与活动',
    actionUrl: '#'
  }
];

let lastUsedIndex = -1;

export const generateRecommendationCards = (count: number): RecommendationCard[] => {
  return Array.from({ length: count }, (_, i) => {
    const nextIndex = (lastUsedIndex + 1) % recommendationTemplates.length;
    lastUsedIndex = nextIndex;
    
    return {
      id: `recommend-${Date.now()}-${i}`,
      type: 'recommendation',
      ...recommendationTemplates[nextIndex]
    };
  });
};