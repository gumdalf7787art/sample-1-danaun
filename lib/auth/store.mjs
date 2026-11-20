import {mkdir,readFile,writeFile,rename,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
export const blank=()=>({users:[],sessions:[],tokens:[],oauth:[],limits:[],audit:[]});
export class AuthStore{
 constructor(root=join(process.cwd(),'.local-data','auth')){this.root=root;this.file=join(root,'auth.json');}
 async read(){try{return JSON.parse(await readFile(this.file,'utf8'));}catch(e){if(e.code==='ENOENT')return blank();throw e;}}
 async transaction(fn){await mkdir(this.root,{recursive:true});const lock=join(this.root,'lock');let acquired=false;for(let i=0;i<100;i++){try{await mkdir(lock);acquired=true;break;}catch(e){if(e.code!=='EEXIST')throw e;await new Promise(r=>setTimeout(r,25));}}if(!acquired)throw Object.assign(new Error('잠시 후 다시 시도해 주세요.'),{status:503});try{const data=await this.read();const result=await fn(data);const temp=this.file+'.'+randomUUID()+'.tmp';await writeFile(temp,JSON.stringify(data,null,2),{mode:0o600});await rename(temp,this.file);return result;}finally{await rm(lock,{recursive:true});}}
}
export const authStore=new AuthStore();
