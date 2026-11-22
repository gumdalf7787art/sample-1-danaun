import {getLatestVideos, getLiveVideos} from './youtube.mjs';
import {getPublishedPosts} from './insights/public.mjs';

export async function getClinicMedia({liveVideos = false} = {}) {
  const columns = getPublishedPosts().catch(error => {
    console.error('Unable to load health columns:', error);
    return [];
  });
  const [posts, feed] = await Promise.all([columns, liveVideos ? getLiveVideos() : getLatestVideos()]);
  const latestColumns = posts
    .filter(post => post.category === 'column')
    .slice(0, 4)
    .map(({slug, category, title, summary, publishedAt, cover}) => ({slug, category, title, summary, publishedAt, cover}));

  return {youtubeFeed: {videos: feed.videos.slice(0, 5), checkedAt: feed.checkedAt}, latestColumns};
}
