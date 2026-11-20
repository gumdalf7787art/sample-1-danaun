import assert from 'node:assert/strict';
const origin=process.env.CHECK_ORIGIN||'http://127.0.0.1:3100';
const queue=['/'],seen=new Set(),assets=new Set();
while(queue.length){const path=queue.shift();if(seen.has(path))continue;seen.add(path);const r=await fetch(origin+path);assert.equal(r.status,200,path);const html=await r.text();assert.ok(!/리셋|RESET|이고은|031.?263.?2520|손곡로|184-96-00669|youtube\.com|i\.ytimg\.com/.test(html),'Previous clinic reference on '+path);assert.ok(html.includes('다나은'),path);for(const [,href]of html.matchAll(/href="(\/[^"#?]*)"/g)){if(!href.startsWith('/_next/')&&!href.includes('.')&&!seen.has(href))queue.push(href)}for(const [,src]of html.matchAll(/(?:src|url\()=['"\\]*(\/images\/[^'"\\)\s]+)/g))assets.add(src)}
for(const asset of assets){const r=await fetch(origin+asset);assert.equal(r.status,200,asset);assert.match(r.headers.get('content-type')||'',/^image\//,asset)}
for(const path of ['/images/reset-clinic-logo.png','/reset-clinic-symbol.svg','/research/unknown.pdf','/api/auth/me']){const r=await fetch(origin+path);assert.equal(r.status,404,path)}
const robots=await(await fetch(origin+'/robots.txt')).text();assert.match(robots,/Disallow: \//);console.log(`Verified ${seen.size} pages, ${assets.size} images, old assets/API unavailable, no previous clinic identifiers.`);
