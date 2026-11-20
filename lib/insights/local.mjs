import {mkdir,readFile,writeFile,rename,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
const conflict=()=>Object.assign(new Error('다른 화면에서 수정되었습니다. 목록을 새로고침한 뒤 다시 열어 주세요.'),{status:409});
export class LocalPostRepository{
 constructor(root=join(process.cwd(),'.local-data')){this.root=root;this.file=join(root,'insights.json');}
 async list(){try{return JSON.parse(await readFile(this.file,'utf8'));}catch(e){if(e.code==='ENOENT')return [];throw e;}}
 async get(id){return (await this.list()).find(p=>p.id===id)||null;}
 async save(post,expectedVersion){await mkdir(this.root,{recursive:true});const lock=join(this.root,'posts.lock');let acquired=false;
 for(let i=0;i<40;i++){try{await mkdir(lock);acquired=true;break;}catch(e){if(e.code!=='EEXIST')throw e;await new Promise(r=>setTimeout(r,25));}}
 if(!acquired)throw conflict();
 try{const posts=await this.list();const old=posts.find(p=>p.id===post.id);if((old?.version||0)!==expectedVersion)throw conflict();if(posts.some(p=>p.slug===post.slug&&p.id!==post.id))throw Object.assign(new Error('이미 사용 중인 개별 주소입니다.'),{status:409});const next={...post,version:expectedVersion+1};const temp=this.file+'.'+randomUUID()+'.tmp';await writeFile(temp,JSON.stringify([...posts.filter(p=>p.id!==post.id),next],null,2),'utf8');await rename(temp,this.file);return next;}finally{await rm(lock,{recursive:true});}}
}
export class LocalMediaStore{
 constructor(root=join(process.cwd(),'.local-data','media')){this.root=root;}
 async put(key,bytes,type){await mkdir(this.root,{recursive:true});await writeFile(join(this.root,key),bytes);return {key,src:'/api/media/'+key,type};}
 async get(key){try{return {body:await readFile(join(this.root,key)),type:key.endsWith('.png')?'image/png':key.endsWith('.webp')?'image/webp':'image/jpeg'};}catch(e){if(e.code==='ENOENT')return null;throw e;}}
}
