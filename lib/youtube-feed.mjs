export const CHANNEL_ID='UCdXw-_i5MesRrzKbd4pTs_A';
export const CHANNEL_URL='https://www.youtube.com/@대재의사회TV';
export const CHANNEL_NAME='대한재활의학과의사회TV';
export const CHANNEL_VIDEO_LIMIT=13;
export function youtubeThumbnailUrl(id, large = false) {
  if (!/^[\w-]{11}$/.test(id || '')) return undefined;
  return `https://i.ytimg.com/vi/${id}/${large ? 'maxresdefault' : 'mqdefault'}.jpg`;
}
function decode(value){return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&#(x[0-9a-f]+|\d+);/gi,(_,n)=>{const v=n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):Number(n);return v>0&&v<=0x10ffff?String.fromCodePoint(v):'';}).replace(/&(amp|quot|apos|lt|gt);/g,(_,n)=>({amp:'&',quot:'"',apos:"'",lt:'<',gt:'>'}[n]));}
export function parseYouTubeFeed(xml){if(typeof xml!=='string'||xml.length>500000||!xml.includes('<feed'))throw new Error('Invalid video feed');const items=[];const seen=new Set();for(const match of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)){const e=match[1];const tag=n=>e.match(new RegExp(`<${n}>([\\s\\S]*?)<\\/${n}>`))?.[1]||'';const id=tag('yt:videoId'),title=decode(tag('title')).trim(),published=tag('published');if(tag('yt:channelId')!==CHANNEL_ID||!/^[\w-]{11}$/.test(id)||!title||!Number.isFinite(Date.parse(published))||seen.has(id))continue;seen.add(id);items.push({id,title,published:new Date(published).toISOString(),short:e.includes('/shorts/'+id)});}return items.sort((a,b)=>b.published.localeCompare(a.published)).slice(0,6);}
