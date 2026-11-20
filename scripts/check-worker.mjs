// Run after starting `npm run preview:worker` on port 8787.
import assert from 'node:assert/strict';
const routes = [
  ['/',200], ['/about/doctor',200], ['/centers/sports',200],
  ['/regen/research',200], ['/insights',200], ['/insights/not-a-real-post',404],
  ['/visit',200], ['/robots.txt',200], ['/sitemap.xml',200],
  ['/images/new021621558423.jpg',200], ['/api/auth/me',503], ['/api/admin/insights',503],
];
for (const [path,status] of routes) {
  const response = await fetch('http://127.0.0.1:8787'+path, {signal:AbortSignal.timeout(20000)});
  assert.equal(response.status,status,path);
  if (response.headers.get('content-type')?.includes('image/')) {
    assert.ok((await response.arrayBuffer()).byteLength>0,path);
  } else {
    const body=await response.text();
    if(path==='/') assert.ok(body.includes('RESET'),'Home content');
    if(path==='/robots.txt') assert.ok(body.includes('Disallow: /'),'Preview must remain noindex');
  }
  console.log(`${status} ${path}`);
}
