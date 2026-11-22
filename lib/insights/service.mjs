import {randomUUID} from 'node:crypto';
import {categories, insightSections} from '../../app/data/insight-sections.mjs';
export const fail=(message,status=400)=>{throw Object.assign(new Error(message),{status});};
function text(v,max=10000){if(v==null)return '';if(typeof v!=='string'||v.length>max)fail('입력 형식 또는 길이를 확인해 주세요.');return v.trim();}
function list(v,max=50){if(v==null)return [];if(!Array.isArray(v)||v.length>max)fail('목록 항목 수를 확인해 주세요.');return v;}
function https(v){const t=text(v,2000);try{if(new URL(t).protocol==='https:')return t;}catch{}fail('링크는 https://로 시작하는 올바른 주소를 입력해 주세요.');}
export function normalizePost(input,old=null,now=new Date().toISOString()){
 if(!input||typeof input!=='object'||Array.isArray(input))fail('글 형식이 올바르지 않습니다.');
 const slug=text(input.slug,100);if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)||slug==='preview'||(slug!==old?.slug&&insightSections.some(item=>item.id===slug)))fail('개별 주소는 영문 소문자·숫자·하이픈으로 입력해 주세요. 인사이트 메뉴 이름은 개별 주소로 사용할 수 없습니다.');
 if(old?.everPublished&&slug!==old.slug)fail('한 번 발행한 글의 주소는 변경할 수 없습니다.');
 const category=text(input.category);if(!categories.some(item=>item.id===category))fail('카테고리를 선택해 주세요.');
 const status=text(input.status);if(!['draft','published','archived'].includes(status))fail('글 상태가 올바르지 않습니다.');
 const title=text(input.title,200);if(!title)fail('제목을 입력해 주세요.');
 const sections=list(input.sections,40).map((s,i)=>{const id=text(s.id,80)||'section-'+(i+1);if(!/^[a-z][a-z0-9-]*$/.test(id))fail('본문 구간 주소가 올바르지 않습니다.');const result={id,title:text(s.title,200),paragraphs:list(s.paragraphs,80).map(t=>text(t)).filter(Boolean),bullets:list(s.bullets,40).map(t=>text(t,2000)).filter(Boolean)};if(s.table){const headers=list(s.table.headers,10).map(t=>text(t,200));if(!headers.length)fail('표 제목이 필요합니다.');const rows=list(s.table.rows,50).map(r=>{if(!Array.isArray(r)||r.length!==headers.length)fail('표의 열 수가 일치하지 않습니다.');return r.map(t=>text(t,2000));});result.table={headers,rows};}return result;});
 if(new Set(sections.map(s=>s.id)).size!==sections.length)fail('본문 구간 주소가 중복됩니다.');
 const p={id:old?.id||randomUUID(),slug,category,status,title,summary:text(input.summary,2000),author:text(input.author,100),tags:list(input.tags,20).map(t=>text(t,60)).filter(Boolean),sections,faqs:list(input.faqs,20).map(pair=>{if(!Array.isArray(pair)||pair.length!==2)fail('질문과 답변 형식을 확인해 주세요.');return pair.map(t=>text(t));}),sources:list(input.sources,30).map(s=>({title:text(s.title,300),url:https(s.url)})),relatedLinks:list(input.relatedLinks,20).map(l=>{const href=text(l.href,500);if(!/^\/(?!\/)[a-z0-9/#?-]*$/i.test(href))fail('관련 진료는 사이트 내부 주소를 사용해 주세요.');return {label:text(l.label,200),href};}),transcript:text(input.transcript,50000),youtubeId:text(input.youtubeId,30),reviewedBy:text(input.reviewedBy,100),reviewedAt:text(input.reviewedAt,30),createdAt:old?.createdAt||now,updatedAt:now,publishedAt:old?.publishedAt||null,everPublished:!!old?.everPublished};
 if (category === 'questions') {
  p.questionBody = text(input.questionBody ?? old?.questionBody);
  if (status === 'published' && !p.questionBody && !old?.everPublished) {
   fail('묻고 답하기 글을 발행하려면 질문 내용을 입력해 주세요.');
  }
 }
 if(p.youtubeId&&!/^[a-zA-Z0-9_-]{11}$/.test(p.youtubeId))fail('유튜브 영상 주소 또는 영상 ID를 확인해 주세요.');
 if(!!p.reviewedBy!==!!p.reviewedAt)fail('검토자와 검토일을 함께 입력해 주세요.');
 if(p.reviewedAt&&(!/^\d{4}-\d{2}-\d{2}$/.test(p.reviewedAt)||!Number.isFinite(Date.parse(p.reviewedAt))||Date.parse(p.reviewedAt)>Date.parse(now)))fail('검토일을 확인해 주세요.');
 if(input.cover?.src){const src=text(input.cover.src,2000);if(!/^\/api\/media\/[a-f0-9-]+\.(png|jpg|webp)$/.test(src))fail('대표 이미지는 업로드 기능으로 등록해 주세요.');p.cover={src,alt:text(input.cover.alt,300),caption:text(input.cover.caption,500)};}
 if(status==='published'){
  if(!p.summary||!p.author||!p.sections.length||p.sections.some(s=>!s.title||(!s.paragraphs.length&&!s.bullets.length&&!s.table?.rows?.length)))fail('발행하려면 요약·작성자·소제목과 본문을 입력해 주세요.');
  if(p.cover&&!p.cover.alt)fail('대표 이미지 설명을 입력해 주세요.');
  if(p.category==='tv'&&(!p.youtubeId||!p.transcript))fail('TV 글 발행에는 영상과 영상 내용 텍스트가 필요합니다.');
  if(p.faqs.some(p=>!p[0]||!p[1])||p.sources.some(s=>!s.title)||p.relatedLinks.some(l=>!l.label))fail('질문·출처·관련 링크의 비어 있는 항목을 확인해 주세요.');
  p.publishedAt=p.publishedAt||now;p.everPublished=true;
 }
 return p;
}
export async function savePost(repo,input){const old=input.id?await repo.get(input.id):null;if(input.id&&!old)fail('글을 찾을 수 없습니다.',404);const version=input.version??0;if(!Number.isInteger(version)||version<0)fail('글 버전이 올바르지 않습니다.');return repo.save(normalizePost(input,old),version);}
export function publishedPosts(items){return items.filter(p=>p.status==='published'&&Date.parse(p.publishedAt)<=Date.now()).sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt));}
