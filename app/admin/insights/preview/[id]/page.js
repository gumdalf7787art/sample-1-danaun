import {headers} from 'next/headers';
import {notFound} from 'next/navigation';
import {assertAdmin} from '../../../../../lib/insights/access.mjs';
import {postRepository} from '../../../../../lib/insights/repository.mjs';
import {insightSections} from '../../../../data/insight-sections.mjs';
import {insightPostPath} from '../../../../data/insight-post-path.mjs';
import InsightShell from '../../../../insights/InsightShell';
import QuestionDetail from '../../../../insights/QuestionDetail';
import InsightArticle from '../../../../components/InsightArticle';
export const metadata={title:'저장한 글 미리보기',robots:{index:false,follow:false}};
export default async function Preview({params}){try{await assertAdmin(await headers());}catch{notFound()}const {id}=await params;const post=await postRepository.get(id);if(!post)notFound();return <><div className="article-preview-notice">저장된 글 미리보기 · 상태: {post.status==='published'?'발행':post.status==='archived'?'보관':'초안'}<a href="/admin/insights">관리자로 돌아가기 ↗</a></div>{post.category === 'questions' ? (
  <InsightShell section={insightSections.find(section => section.id === 'questions')}
    article={{path: insightPostPath(post), title: post.title}} showHero={false}>
    <QuestionDetail post={post} otherQuestions={[]} listQuery=""/>
  </InsightShell>
) : <InsightArticle post={post}/>}</>}
