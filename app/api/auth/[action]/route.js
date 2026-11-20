import {authStore} from '../../../../lib/auth/store.mjs';
import {register,login,publicUser,digest,throttle,hashPassword,verifyPassword,error} from '../../../../lib/auth/core.mjs';
import {checkOrigin,currentSession,requireUser,bodyJson,response,cookie,cookieValue} from '../../../../lib/auth/server.mjs';
import {requestMail,consumeToken} from '../../../../lib/auth/mail.mjs';
export const dynamic='force-dynamic';
export async function GET(request,{params}){try{const {action}=await params;if(action!=='me')return response({error:'Not found'},404);const s=await currentSession(request.headers);return response({user:publicUser(s?.user),providers:{kakao:!!(process.env.KAKAO_CLIENT_ID&&process.env.KAKAO_CLIENT_SECRET),naver:!!(process.env.NAVER_CLIENT_ID&&process.env.NAVER_CLIENT_SECRET)}});}catch(e){return response({user:null,error:e.status?e.message:'정보를 불러오지 못했습니다.'},e.status||500)}}
export async function POST(request,{params}){try{checkOrigin(request.headers);const {action}=await params;const input=await bodyJson(request);
 if(action==='signup'){await throttle(authStore,'signup',20);const user=await register(authStore,input);return response({user,message:'가입했습니다. 이메일 또는 아이디로 로그인해 주세요.'});}
 if(action==='login'){const result=await login(authStore,input,cookieValue(request.headers));return response({user:result.user},200,{'Set-Cookie':cookie(result.token)});}
 if(action==='logout'){const token=cookieValue(request.headers);await authStore.transaction(d=>{d.sessions=d.sessions.filter(s=>s.hash!==digest(token));});return response({ok:true},200,{'Set-Cookie':cookie('',0)});}
 if(action==='verify-request'||action==='reset-request'){await throttle(authStore,'mail:'+String(input.email).toLowerCase(),4);if(action==='verify-request'){const s=await requireUser(request.headers);await requestMail(authStore,s.user.email,'verify');}else await requestMail(authStore,input.email,'reset');return response({message:'요청을 처리했습니다. 현재 개발 환경에서는 인증 안내가 로컬 메일 보관함에 저장되며 실제 이메일은 발송되지 않습니다.'});}
 if(action==='verify'||action==='reset'){await consumeToken(authStore,input.token,action==='verify'?'verify':'reset',input.password);return response({message:action==='verify'?'이메일 인증을 완료했습니다.':'비밀번호를 변경했습니다. 다시 로그인해 주세요.'},200,action==='reset'?{'Set-Cookie':cookie('',0)}:{});}
 if(action==='password'){const s=await requireUser(request.headers,{recent:true});if(s.user.passwordHash&&!await verifyPassword(input.currentPassword,s.user.passwordHash))error('현재 비밀번호를 확인해 주세요.');const hash=await hashPassword(input.password);await authStore.transaction(d=>{const u=d.users.find(u=>u.id===s.user.id);u.passwordHash=hash;d.sessions=d.sessions.filter(t=>t.userId!==u.id);});return response({message:'비밀번호를 변경했습니다. 다시 로그인해 주세요.'},200,{'Set-Cookie':cookie('',0)});}
 return response({error:'Not found'},404);
 }catch(e){return response({error:e.status?e.message:'요청을 처리하지 못했습니다. 다시 시도해 주세요.'},e.status||500)}}
