export {categories, insightLinks} from './insight-sections.mjs';
// Published content is loaded by lib/insights/public.mjs. This file contains shared display data only.
export function filterPosts(items,{category='all',q=''}={}){const term=q.trim().toLocaleLowerCase();return items.filter(p=>(category==='all'||p.category===category)&&(!term||[p.title,p.summary,...(p.tags||[])].join(' ').toLocaleLowerCase().includes(term)));}
