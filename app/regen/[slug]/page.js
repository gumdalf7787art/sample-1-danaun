import {pageMeta} from '../../data/seo';
import {PageData} from '../../components/StructuredData';
import {notFound} from 'next/navigation';
import RegenPage from '../../components/RegenPage';
import RegenInjection from '../../components/RegenInjection';
import RegenPrpPrf from '../../components/RegenPrpPrf';
import RegenKneeSvf from '../../components/RegenKneeSvf';
import {kneeSvfTitle, kneeSvfDescription} from '../../data/knee-svf';
import '../../regen-overview.css';
import '../../regen-prp-prf.css';
import '../../regen-knee-svf.css';
import {prpPrfTitle, prpPrfDescription} from '../../data/regen-prp-prf';
import {regenPages} from '../../data/regen';
import {injectionDescription, injectionTitle} from '../../data/regen-injection';
export function generateStaticParams(){return Object.keys(regenPages).filter(slug=>slug!=='overview').map(slug=>({slug}))}
export async function generateMetadata({params}) {
 const {slug} = await params;
 if (slug === 'injection') {
  return pageMeta('/regen/injection', injectionTitle + ' | 원인과 상태에 맞춘 주사치료 | 리셋재활의학과의원', injectionDescription);
 }
 if (slug === 'prp-prf') return pageMeta('/regen/prp-prf', prpPrfTitle, prpPrfDescription);
 if (slug === 'knee-svf') return pageMeta('/regen/knee-svf', kneeSvfTitle, kneeSvfDescription);
 const page = regenPages[slug];
 return pageMeta('/regen/' + slug, page ? `${page.name} | RESET REGEN · 리셋재활의학과의원` : '페이지를 찾을 수 없습니다', page?.intro);
}
export default async function Page({params}) {
 const {slug} = await params;
 const page = regenPages[slug];
 if (!page || slug === 'overview') notFound();
 if (slug === 'knee-svf') {
  return <><PageData path="/regen/knee-svf" name="무릎 SVF" medicalDescription={kneeSvfDescription} breadcrumbParent={{name: 'RESET REGEN', path: '/regen'}}/><RegenKneeSvf/></>;
 }
 if (slug === 'prp-prf') {
  return <><PageData path="/regen/prp-prf" name="PRP·PRF" medicalDescription={prpPrfDescription} breadcrumbParent={{name: 'RESET REGEN', path: '/regen'}}/><RegenPrpPrf/></>;
 }
 return <><PageData path={'/regen/' + slug} name={page.name} medicalDescription={slug === 'injection' ? injectionDescription : page.intro} breadcrumbParent={{name: 'RESET REGEN', path: '/regen'}}/>{slug === 'injection' ? <RegenInjection/> : <RegenPage slug={slug}/>}</>;
}
