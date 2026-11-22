import {requireUser} from '../auth/server.mjs';
export async function assertAdmin(headers,options={}){return requireUser(headers,{...options,admin:true});}
