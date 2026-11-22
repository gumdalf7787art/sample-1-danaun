import InsightShell from '../InsightShell';
import QuestionDetail from '../QuestionDetail';
import {columnListQuery, insightPostPath} from '../../data/insight-post-path.mjs';
import {notFound, permanentRedirect} from 'next/navigation';
import {pageMeta} from '../../data/seo';
import {PageData} from '../../components/StructuredData';
import {insightSections} from '../../data/insight-sections.mjs';
import InsightArticle from '../../components/InsightArticle';
import {InsightCategory} from '../InsightLibrary';
import {getPost, getPublishedPosts} from '../../../lib/insights/public.mjs';

export const dynamic = 'force-dynamic';

export async function generateMetadata({params, searchParams}) {
  const {slug} = await params;
  const post = await getPost(slug);
  const section = insightSections.find(item => item.id === slug);
  if (section && !post) {
    const query = await searchParams;
    return pageMeta('/insights/' + slug, section.name + ' | 다나은 인사이트', section.description,
      {noindex: Boolean(query.q || query.topic || query.page || query.type || query.video)});
  }
  return pageMeta(post ? insightPostPath(post) : '/insights/' + slug, post ? post.title + ' | 다나은 인사이트' : '글을 찾을 수 없습니다',
    post?.summary, {noindex: !post, type:'article', publishedTime:post?.publishedAt, modifiedTime:post?.updatedAt});
}

export default async function InsightPage({params, searchParams}) {
  const {slug} = await params;
  const post = await getPost(slug);
  if (post && insightPostPath(post) !== '/insights/' + slug) {
    permanentRedirect(insightPostPath(post) + columnListQuery(await searchParams));
  }
  if (post?.category === 'questions') {
    const section = insightSections.find(item => item.id === 'questions');
    const others = (await getPublishedPosts()).filter(item => item.category === 'questions' && item.slug !== slug).slice(0, 5);
    return <InsightShell section={section} article={{path: insightPostPath(post), title: post.title, post}} showHero={false}>
      <QuestionDetail post={post} otherQuestions={others} listQuery={columnListQuery(await searchParams)}/>
    </InsightShell>;
  }
  if (post) return <>
    <PageData path={'/insights/' + slug} name={post.title} article={post}
      breadcrumbParent={post.category === 'exercise'
        ? {name:'홈운동 라이브러리', path:'/insights/exercise'}
        : {name:'다나은 인사이트', path:'/insights'}}/>
    <InsightArticle post={post}/>
  </>;
  const section = insightSections.find(item => item.id === slug);
  if (!section) notFound();
  return <InsightCategory section={section} params={await searchParams}/>;
}
