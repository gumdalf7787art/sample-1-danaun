import {siteUrl,isPublic,publicRoutes} from './data/seo.js';
import {notices} from './data/support-content.js';
import {insightPostPath} from './data/insight-post-path.mjs';
import {supportHome} from './data/support.js';
import {getPublishedPosts} from '../lib/insights/public.mjs';

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  if (!isPublic) return [];
  const posts = await getPublishedPosts();
  const routes = [
    ...publicRoutes.map(([,path,lastModified])=>[path,lastModified]),
    ...notices.filter(notice=>!notice.sample).map(notice=>[supportHome+'/'+notice.id,notice.date]),
    ...posts.map(post=>[insightPostPath(post),post.updatedAt||post.publishedAt]),
  ];
  return Array.from(new Map(routes), ([path,lastModified])=>({
    url:siteUrl+path,
    ...(lastModified && {lastModified}),
  }));
}
