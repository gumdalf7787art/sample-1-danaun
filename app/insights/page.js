import {permanentRedirect} from 'next/navigation';
import {pageMeta} from '../data/seo';
import {insightSections} from '../data/insight-sections.mjs';
import {InsightLanding} from './InsightLibrary';

export const dynamic = 'force-dynamic';

export async function generateMetadata({searchParams}) {
  const params = await searchParams;
  return pageMeta('/insights', '다나은 인사이트 | 다나은재활의학과의원',
    '외부 건강 영상, 건강칼럼, 묻고 답하기, 홈운동, 방송과 언론, 치료 근거를 확인하세요.',
    {noindex: Boolean(params.q || params.category)});
}

export default async function InsightsPage({searchParams}) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q.trim().slice(0, 200) : '';
  if (insightSections.some(item => item.id === params.category)) {
    permanentRedirect('/insights/' + params.category + (query ? '?' + new URLSearchParams({q:query}) : ''));
  }
  if (params.category === 'all' && !query) permanentRedirect('/insights');
  return <InsightLanding query={query}/>;
}
