import {authStore} from './store.mjs';
import {lookupSession,error} from './core.mjs';
export const origin=process.env.AUTH_ORIGIN||'http://127.0.0.1:3100';
export const sessionCookie='reset_session';
export function cookieValue(headers,name=sessionCookie){return (headers.get('cookie')||'').split(';').map(p=>p.trim()).find(p=>p.startsWith(name+'='))?.slice(name.length+1)||'';}
export function cookie(token,maxAge=28800,name=sessionCookie){return `${name}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${origin.startsWith('https:')?'; Secure':''}`;}
export function assertEnvironment(){if(process.env.NODE_ENV!=='development')error('정식 인증 저장소 연결 전에는 로컬 개발 환경에서만 사용할 수 있습니다.',503);}
export function checkOrigin(headers){assertEnvironment();if(headers.get('origin')!==origin||headers.get('host')!==new URL(origin).host||headers.get('sec-fetch-site')==='cross-site')error('요청 출처를 확인할 수 없습니다.',403);}
export async function currentSession(headers){assertEnvironment();return lookupSession(await authStore.read(),cookieValue(headers));}
export async function requireUser(headers,{write=false,admin=false,owner=false,recent=false}={}){if(write)checkOrigin(headers);const s=await currentSession(headers);if(!s)error('로그인이 필요합니다.',401);if(admin&&!['owner','admin'].includes(s.user.role))error('관리자 권한이 필요합니다.',403);if(owner&&s.user.role!=='owner')error('최초 관리자 권한이 필요합니다.',403);if(recent&&Date.now()-s.session.createdAt>15*60*1000)error('중요한 변경을 위해 다시 로그인해 주세요.',401);return s;}
export function response(body,status=200,extra={}){return Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex','Referrer-Policy':'no-referrer',...extra}});}
export async function bodyJson(request){if(!request.headers.get('content-type')?.includes('application/json'))error('JSON 형식이 필요합니다.',415);const body=await request.text();if(body.length>12000)error('입력 내용이 너무 큽니다.',413);try{const value=JSON.parse(body);if(!value||typeof value!=='object'||Array.isArray(value))error('입력 형식을 확인해 주세요.');return value}catch{error('입력 형식을 확인해 주세요.');}}
