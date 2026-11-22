import snapshot from './youtube-snapshot.json' with {type:'json'};
import {CHANNEL_ID, CHANNEL_URL, CHANNEL_VIDEO_LIMIT} from './youtube-feed.mjs';
import {parseRegularVideos} from './youtube-videos.mjs';

const refreshInterval = 10 * 60 * 1000;
const retryInterval = 60 * 1000;
const cacheRetention = 7 * 24 * 60 * 60;
const cacheKey = 'https://sample-1-danaun.gumdalf7787.workers.dev/api/cache/doctor-tv/' + CHANNEL_ID;
let localFeed;

export function getLatestVideos(limit = 5) {
  return {videos: snapshot.videos.filter(video => !video.short).slice(0, limit), checkedAt: snapshot.checkedAt};
}

async function readCachedFeed(cache) {
  if (!cache) return localFeed;
  try {
    return await (await cache.match(cacheKey))?.json();
  } catch {
    return undefined;
  }
}

async function cacheFeed(cache, feed) {
  if (!cache) {
    localFeed = feed;
    return;
  }
  try {
    await cache.put(cacheKey, Response.json(feed, {
      headers: {'Cache-Control': 'public, max-age=' + cacheRetention},
    }));
  } catch {
    // A cache failure must not suppress the video list.
  }
}

export async function getLiveVideos() {
  const cache = globalThis.caches?.default;
  const cached = await readCachedFeed(cache);
  const now = Date.now();
  if (cached?.refreshAfter > now) return cached;

  let feed;
  try {
    const response = await fetch(CHANNEL_URL + '/videos?hl=ko', {
      cache: 'no-store',
      headers: {'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8'},
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) throw new Error('YouTube returned HTTP ' + response.status);
    const videos = parseRegularVideos(await response.text());
    if (videos.length !== CHANNEL_VIDEO_LIMIT) throw new Error('Incomplete YouTube video list');
    feed = {videos, checkedAt: new Date(now).toISOString(), refreshAfter: now + refreshInterval};
  } catch {
    feed = {...(cached || snapshot), refreshAfter: now + retryInterval};
  }
  await cacheFeed(cache, feed);
  return feed;
}
