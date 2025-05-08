import { Post } from "../types/post";

export const generateMockData = (page: number, dataType: string): Post[] => {
  const posts: Post[] = [];
  const count = 10; // 每页10条数据

  for (let i = 0; i < count; i++) {
    const id = `${dataType}-${page}-${i}`;
    const isVideo = Math.random() > 0.7;
    const type = isVideo ? "video" : "image";

    let title = "";
    let mediaUrl = "";
    let avatar = "";
    let appName = "";
    let mediaPoster = "";

    // 根据不同的dataType生成不同的数据
    if (dataType === "animals") {
      title = `可爱的动物 #${page}-${i}`;
      mediaUrl = isVideo
        ? i % 2 == 0
          ? "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          : "http://vjs.zencdn.net/v/oceans.mp4"
        : `https://picsum.photos/${310 + i}/${400 + i}`;
      mediaPoster =
        i % 2 == 0
          ? " https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg"
          : "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg";
    } else if (dataType === "games") {
      title = `热门游戏 #${page}-${i}`;
      mediaUrl = isVideo
        ? i % 2 == 0
          ? "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          : "http://vjs.zencdn.net/v/oceans.mp4"
        : `https://picsum.photos/${310 + i}/${400 + i}`;
      mediaPoster =
        i % 2 == 0
          ? "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg"
          : "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg";
    } else {
      title = `有趣的帖子标题标题标题标题标题标题标题标题标题 #${page}-${i}`;
      mediaPoster =
        i % 2 == 0
          ? "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
          : "http://vjs.zencdn.net/v/oceans.png";
      mediaUrl = isVideo
        ? i % 2 == 0
          ? "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          : "http://vjs.zencdn.net/v/oceans.mp4"
        : `https://picsum.photos/${300 + i}/${400 + i}`;
    }
    avatar = `https://picsum.photos/${300 + i}/${400 + i}`;
    appName = `应用名称${i}`;
    posts.push({
      id,
      type,
      title,
      mediaUrl,
      width: 300 + i,
      height: 280 + i,
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 100),
      user: {
        name: `用户${i}`,
        // avatar: `https://i.pravatar.cc/150?img=${i}`
        avatar,
      },
      appName,
      mediaPoster,
    });
  }

  return posts;
};
