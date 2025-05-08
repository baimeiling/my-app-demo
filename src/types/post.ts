export interface Post {
    id: string;
    type: 'image' | 'video';
    title: string;
    mediaUrl: string;
    width: number;
    height: number;
    likes: number;
    comments: number;
    user: {
      name: string;
      avatar: string;
    };
    appName: string;
    mediaPoster: string;
  }
  
  export type ApiResponse = {
    data: Post[];
    nextPage: number | null;
  };