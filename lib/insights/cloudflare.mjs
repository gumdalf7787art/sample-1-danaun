// Pass trusted Worker bindings after authentication and runtime integration are configured.
export class D1PostRepository{
 constructor(db){this.db=db;}
 async list(){const {results}=await this.db.prepare('SELECT payload FROM insight_posts ORDER BY updated_at DESC').all();return results.map(r=>JSON.parse(r.payload));}
 async get(id){const row=await this.db.prepare('SELECT payload FROM insight_posts WHERE id = ?').bind(id).first();return row?JSON.parse(row.payload):null;}
 async save(post,expectedVersion){const next={...post,version:expectedVersion+1};let result;
 try{result=expectedVersion===0?await this.db.prepare('INSERT INTO insight_posts (id,slug,category,status,version,published_at,updated_at,payload) VALUES (?,?,?,?,?,?,?,?)').bind(next.id,next.slug,next.category,next.status,next.version,next.publishedAt||null,next.updatedAt,JSON.stringify(next)).run():await this.db.prepare('UPDATE insight_posts SET slug=?,category=?,status=?,version=?,published_at=?,updated_at=?,payload=? WHERE id=? AND version=?').bind(next.slug,next.category,next.status,next.version,next.publishedAt||null,next.updatedAt,JSON.stringify(next),next.id,expectedVersion).run();}catch(e){if(String(e).includes('UNIQUE'))throw Object.assign(new Error('이미 사용 중인 주소입니다.'),{status:409});throw e;}
 if(result.meta.changes!==1)throw Object.assign(new Error('다른 화면에서 수정되었습니다. 다시 열어 주세요.'),{status:409});return next;}
}
export class R2MediaStore{
 constructor(bucket){this.bucket=bucket;}
 async put(key,bytes,type){await this.bucket.put(key,bytes,{httpMetadata:{contentType:type}});return {key,src:'/api/media/'+key,type};}
 async get(key){const obj=await this.bucket.get(key);return obj?{body:obj.body,type:obj.httpMetadata?.contentType||'application/octet-stream'}:null;}
}
