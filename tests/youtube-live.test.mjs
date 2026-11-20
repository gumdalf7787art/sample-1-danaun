import assert from 'node:assert/strict';
import test from 'node:test';
import {CHANNEL_ID, DOCTOR_TV_ARCHIVE_SIZE} from '../lib/youtube-feed.mjs';
import {getLiveVideos} from '../lib/youtube.mjs';

function channelPage(firstId, count = DOCTOR_TV_ARCHIVE_SIZE) {
  const contents = Array.from({length: count}, (_, index) => ({
    richItemRenderer: {content: {videoRenderer: {
      videoId: index === 0 ? firstId : 'VIDEO' + String(index).padStart(6, '0'),
      title: {runs: [{text: '영상 ' + index}]},
      lengthText: {simpleText: '8:00'},
    }}},
  }));
  const tabRenderer = {
    selected: true,
    endpoint: {
      commandMetadata: {webCommandMetadata: {url: '/@Drkoeun/videos'}},
      browseEndpoint: {browseId: CHANNEL_ID},
    },
    content: {richGridRenderer: {
      header: {chipBarViewModel: {chips: [{chipViewModel: {selected: true, text: '최신순'}}]}},
      contents,
    }},
  };
  const data = {contents: {twoColumnBrowseResultsRenderer: {tabs: [{tabRenderer}]}}};
  return '<script>var ytInitialData = ' + JSON.stringify(data) + ';</script>';
}

test('automatically replaces the featured upload and keeps the last complete list on failure', async t => {
  let now = Date.UTC(2026, 10, 16);
  let stored;
  let calls = 0;
  let next = () => new Response(channelPage('FEATURE0001'));
  t.mock.method(Date, 'now', () => now);
  t.mock.method(globalThis, 'fetch', async () => {
    calls++;
    return next();
  });
  const caches = Object.getOwnPropertyDescriptor(globalThis, 'caches');
  Object.defineProperty(globalThis, 'caches', {configurable: true, value: {default: {
    async match() { return stored?.clone(); },
    async put(key, response) { stored = response.clone(); },
  }}});
  t.after(() => {
    if (caches) Object.defineProperty(globalThis, 'caches', caches);
    else delete globalThis.caches;
  });

  const initial = await getLiveVideos();
  assert.equal(initial.videos.length, 13);
  assert.equal(initial.videos[0].id, 'FEATURE0001');
  assert.equal((await getLiveVideos()).checkedAt, initial.checkedAt);
  assert.equal(calls, 1);

  now += 10 * 60_000;
  next = () => new Response(channelPage('FEATURE0002'));
  const updated = await getLiveVideos();
  assert.equal(updated.videos[0].id, 'FEATURE0002');
  assert.equal(calls, 2);

  now += 10 * 60_000;
  next = () => new Response(channelPage('FEATURE0003', 2));
  assert.equal((await getLiveVideos()).videos[0].id, 'FEATURE0002');
  assert.equal((await getLiveVideos()).checkedAt, updated.checkedAt);
  assert.equal(calls, 3);

  now += 60_000;
  next = () => new Response(channelPage('FEATURE0003'));
  assert.equal((await getLiveVideos()).videos[0].id, 'FEATURE0003');
  assert.equal(calls, 4);
});
