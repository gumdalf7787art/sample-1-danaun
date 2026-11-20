import {centers} from './centers.js';
import {regenLinks} from './regen.js';
import {diagnosisLinks} from './diagnosis.js';
import {aboutLinks} from './about.js';
import {supportLinks} from './support.js';
import {researchStudies, researchStudyPath} from './research-studies.js';
import {insightLinks} from './insight-sections.mjs';
const configured=process.env.SITE_URL;
const previewOrigin = 'https://resetclinic.gumdalf7787.workers.dev';
export const siteUrl = configured ? new URL(configured).origin
  : process.env.NODE_ENV === 'production' ? previewOrigin : 'http://127.0.0.1:3100';
export const isPublic=process.env.SITE_INDEXING==='true'&&!!configured&&siteUrl.startsWith('https://')&&!/localhost|127\.0\.0\.1/.test(siteUrl);
export const siteName='리셋재활의학과의원';
const shareImage='/images/reset-regen-share-v1.jpg';
const shareImageAlt='RESET REGEN · 재생치료를 중심으로, 당신의 회복을 설계합니다. · 리셋재활의학과의원';
export const publicRoutes=[['홈','/'],...aboutLinks,...centers.map(c=>[c.name,'/centers/'+c.slug,c.lastModified]),...regenLinks,['주사 성분 설명 원칙','/regen/principles'],...diagnosisLinks,['리셋 인사이트','/insights'],...insightLinks,...supportLinks,...researchStudies.map(study=>[study.title,researchStudyPath(study.slug)])];
export function pageMeta(path,title,description,{noindex=false,type='website',image=shareImage,publishedTime,modifiedTime}={}){return {title,description,alternates:{canonical:path},robots:{index:isPublic&&!noindex,follow:true},openGraph:{title,description,url:path,siteName,locale:'ko_KR',type,images:[{url:image,width:1200,height:630,alt:image===shareImage?shareImageAlt:siteName}],...(publishedTime?{publishedTime}:{}),...(modifiedTime?{modifiedTime}:{})},twitter:{card:'summary_large_image',title,description,images:[{url:image,alt:image===shareImage?shareImageAlt:siteName}]}};}
