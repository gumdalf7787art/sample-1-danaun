import {LocalPostRepository,LocalMediaStore} from './local.mjs';
// Composition point: replace with D1PostRepository(env.DB), R2MediaStore(env.MEDIA)
// only after a Cloudflare runtime and verified administrator identity are connected.
// Workers must never treat its ephemeral filesystem as persistent content storage.
// Keep public empty-state pages available until D1/R2 are configured.
const unavailable=()=>{throw Object.assign(new Error('콘텐츠 저장소 연결 준비 중입니다.'),{status:503});};
const disabled=process.env.NODE_ENV==='production'||process.env.INSIGHTS_STORAGE==='disabled';
export const postRepository=disabled?{list:async()=>[],get:async()=>null,save:async()=>unavailable()}:new LocalPostRepository();
export const mediaStore=disabled?{get:async()=>null,put:async()=>unavailable()}:new LocalMediaStore();
