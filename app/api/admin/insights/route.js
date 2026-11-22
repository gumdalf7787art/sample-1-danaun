import {assertAdmin} from '../../../../lib/insights/access.mjs';
import {postRepository} from '../../../../lib/insights/repository.mjs';
import {savePost} from '../../../../lib/insights/service.mjs';
export const dynamic='force-dynamic';
const reply=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex'}});
export async function GET(request){try{await assertAdmin(request.headers);return reply({posts:await postRepository.list()});}catch(e){return reply({error:e.status?e.message:'글을 불러오지 못했습니다.'},e.status||500);}}
export async function POST(request){try{await assertAdmin(request.headers,{write:true});if(!request.headers.get('content-type')?.includes('application/json'))return reply({error:'JSON 형식이 필요합니다.'},415);const body=await request.text();if(body.length>250000)return reply({error:'글의 크기가 너무 큽니다.'},413);let input;try{input=JSON.parse(body)}catch{return reply({error:'글 데이터 형식을 확인해 주세요.'},400)}const post=await savePost(postRepository,input);return reply({post});}catch(e){return reply({error:e.status?e.message:'저장하지 못했습니다. 입력 내용은 유지됩니다.'},e.status||500);}}
