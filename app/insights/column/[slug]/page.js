import {notFound} from 'next/navigation';
import {pageMeta} from '../../../data/seo';
import {insightSections} from '../../../data/insight-sections.mjs';
import {columnListQuery, columnPath, insightPostPath} from '../../../data/insight-post-path.mjs';
import {getPost, getPublishedPosts} from '../../../../lib/insights/public.mjs';
import InsightShell from '../../InsightShell';
import ColumnArticle from '../ColumnArticle';

export const dynamic = 'force-dynamic';
const section = insightSections.find(item => item.id === 'column');
const recommendations = {
  'reset-shoulder-pain-raising-arm': ['reset-understanding-ultrasound', 'reset-home-shoulder-movement-video'],
  'reset-knee-pain-on-stairs': ['reset-recovery-followup', 'reset-home-knee-movement-video'],
  'reset-understanding-ultrasound': ['reset-knee-pain-on-stairs', 'reset-home-shoulder-movement-video'],
  'reset-recovery-followup': ['reset-knee-pain-on-stairs', 'reset-home-knee-movement-video'],
};

async function getColumn(slug) {
  const post = await getPost(slug);
  if (!post || insightPostPath(post) !== columnPath + '/' + slug) notFound();
  return post;
}

export async function generateMetadata({params}) {
  const post = await getColumn((await params).slug);
  return pageMeta(insightPostPath(post), post.title + ' | 다나은 건강칼럼', post.summary, {
    type:'article', publishedTime:post.publishedAt, modifiedTime:post.updatedAt,
  });
}

export default async function Page({params, searchParams}) {
  const post = await getColumn((await params).slug);
  const posts = (await getPublishedPosts()).filter(item => item.slug !== post.slug && ['column','exercise'].includes(item.category));
  const preferred = recommendations[post.slug] || [];
  const related = posts.filter(item => preferred.includes(item.slug)
    || post.tags?.some(tag => item.tags?.includes(tag))).slice(0, 2);
  const other = posts.filter(item => !related.some(entry => entry.slug === item.slug)).slice(0, 2);
  return <InsightShell section={section} article={{path:insightPostPath(post), title:post.title, post}} showHero={false}>
    <ColumnArticle post={post} related={related} other={other}
      listQuery={columnListQuery(await searchParams)}/>
  </InsightShell>;
}
