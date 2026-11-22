import {writeFile} from 'node:fs/promises';
import {CHANNEL_URL, DOCTOR_TV_ARCHIVE_SIZE} from '../lib/youtube-feed.mjs';
import {parseRegularVideos} from '../lib/youtube-videos.mjs';

const response = await fetch(`${CHANNEL_URL}/videos?hl=ko`, {signal: AbortSignal.timeout(10000)});
if (!response.ok) throw new Error(`Unable to load the channel: HTTP ${response.status}`);

const videos = parseRegularVideos(await response.text());
if (videos.length < DOCTOR_TV_ARCHIVE_SIZE) {
  throw new Error(`Expected ${DOCTOR_TV_ARCHIVE_SIZE} regular videos, but found ${videos.length}. Existing snapshot kept.`);
}
const snapshot = new URL('../lib/youtube-snapshot.json', import.meta.url);
await writeFile(snapshot, JSON.stringify({checkedAt: new Date().toISOString(), videos}, null, 2) + '\n');
console.log(`Updated ${videos.length} YouTube video records.`);
