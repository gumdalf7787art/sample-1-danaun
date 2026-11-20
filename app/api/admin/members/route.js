import {authStore} from '../../../../lib/auth/store.mjs';
import {publicUser,changeRole} from '../../../../lib/auth/core.mjs';
import {requireUser,response,bodyJson} from '../../../../lib/auth/server.mjs';
export async function GET(request){try{await requireUser(request.headers,{owner:true});const data=await authStore.read();return response({users:data.users.map(publicUser),audit:data.audit.slice(-30).reverse()});}catch(e){return response({error:e.status?e.message:'회원 조회에 실패했습니다.'},e.status||500)}}
export async function POST(request){try{const s=await requireUser(request.headers,{write:true,owner:true,recent:true});const input=await bodyJson(request);const user=await changeRole(authStore,s.user.id,input.userId,input.role);return response({user});}catch(e){return response({error:e.status?e.message:'권한 변경에 실패했습니다.'},e.status||500)}}
