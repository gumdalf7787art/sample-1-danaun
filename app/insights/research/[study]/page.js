import {notFound} from 'next/navigation';
import {insightSections} from '../../../data/insight-sections.mjs';
import {getResearchLibrary} from '../../../data/research-library';
import {researchStudies, researchStudyPath} from '../../../data/research-studies';
import {pageMeta} from '../../../data/seo';
import InsightShell from '../../InsightShell';
import {StudyExplainer} from '../../ResearchStudies';

const section = insightSections.find(item => item.id === 'research');

export function generateStaticParams() {
  return researchStudies.map(({slug}) => ({study: slug}));
}

function getStudy(slug) {
  const study = researchStudies.find(item => item.slug === slug);
  if (!study) notFound();
  return study;
}

export async function generateMetadata({params}) {
  const study = getStudy((await params).study);
  return pageMeta(researchStudyPath(study.slug), study.title + ' | 리셋 근거연구', study.summary);
}

export default async function Page({params}) {
  const study = getStudy((await params).study);
  const record = getResearchLibrary().find(item => item.doi === study.doi);
  return <InsightShell section={section}
    article={{path: researchStudyPath(study.slug), title: study.title, summary: study.summary, citation: ['https://doi.org/' + study.doi]}}
    heroLinks={[{href:'#study-findings', label:'결과와 해석 보기'}, {href:'#study-source', label:'원문과 인용 정보'}]}>
    <StudyExplainer study={study} record={record}/>
  </InsightShell>;
}
