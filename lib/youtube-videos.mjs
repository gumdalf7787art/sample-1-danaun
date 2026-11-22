import {CHANNEL_ID, DOCTOR_TV_ARCHIVE_SIZE} from './youtube-feed.mjs';
// Read only the selected Videos tab, never home recommendations or Shorts shelves.
export function parseRegularVideos(html){
 if(typeof html!=='string'||html.length>8000000)throw new Error('Invalid channel response');
 const json=html.match(/var ytInitialData = (.*?);<\/script>/s)?.[1];
 if(!json)throw new Error('Channel data unavailable');
 const data=JSON.parse(json);
 const tab=data.contents?.twoColumnBrowseResultsRenderer?.tabs?.find(t=>t.tabRenderer?.selected)?.tabRenderer;
 if(!tab?.endpoint?.commandMetadata?.webCommandMetadata?.url?.endsWith('/videos')||tab.endpoint.browseEndpoint?.browseId!==CHANNEL_ID)throw new Error('Wrong channel or tab');
 const grid=tab.content?.richGridRenderer;
 const chips=grid?.header?.chipBarViewModel?.chips?.map(x=>x.chipViewModel)||grid?.header?.feedFilterChipBarRenderer?.contents?.map(x=>x.chipCloudChipRenderer)||[];
 const latest=chips.find(c=>c.selected||c.isSelected);
 const label=typeof latest?.text==='string'?latest.text:latest?.text?.simpleText;
 if(!['최신순','Latest'].includes(label))throw new Error('Latest order not verified');
 const videos=[],seen=new Set();
 for(const row of grid.contents||[]){const content=row.richItemRenderer?.content;const v=content?.lockupViewModel;const legacy=content?.videoRenderer;
 const id=v?.contentId||legacy?.videoId;
 if(v&&v.contentType!=='LOCKUP_CONTENT_TYPE_VIDEO')continue;
 const title=v?.metadata?.lockupMetadataViewModel?.title?.content||legacy?.title?.runs?.map(x=>x.text).join('');
 const badges=v?.contentImage?.thumbnailViewModel?.overlays?.flatMap(x=>x.thumbnailBottomOverlayViewModel?.badges||[])||[];
 const duration=badges.map(x=>x.thumbnailBadgeViewModel?.text).find(x=>/^\d+(?::\d{2}){1,2}$/.test(x||''))||legacy?.lengthText?.simpleText;
 if(!/^[\w-]{11}$/.test(id||'')||!title||!/^\d+(?::\d{2}){1,2}$/.test(duration||'')||seen.has(id))continue;
 seen.add(id);videos.push({id,title,duration,short:false});if(videos.length===DOCTOR_TV_ARCHIVE_SIZE)break;
 }if(!videos.length)throw new Error('No regular videos');return videos;
}
