import {pageMeta} from '../../data/seo';
import {PageData} from '../../components/StructuredData';
import {notFound} from 'next/navigation';
import DiagnosisPage from '../../components/DiagnosisPage';
import {diagnosisPages} from '../../data/diagnosis';
export function generateStaticParams(){return Object.keys(diagnosisPages).filter(slug=>slug!=='overview').map(slug=>({slug}))}
export async function generateMetadata({params}){const {slug}=await params;const p=diagnosisPages[slug];return pageMeta('/diagnosis/'+slug,p?`${p.name} | 정밀 진단 · 리셋재활의학과의원`:'페이지를 찾을 수 없습니다',p?.intro)}
export default async function Page({params}){const {slug}=await params;if(!diagnosisPages[slug]||slug==='overview')notFound();return <><PageData path={"/diagnosis/"+slug} name={diagnosisPages[slug].name} medicalDescription={diagnosisPages[slug].definition} breadcrumbParent={{name:'정밀 진단',path:'/diagnosis'}}/><DiagnosisPage slug={slug}/></>}