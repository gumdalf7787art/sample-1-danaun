import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {existsSync} from 'node:fs';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {dirname, join, relative, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const kit = dirname(fileURLToPath(import.meta.url));
const json = async path => JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/, ''));
const save = (path, value) => writeFile(path, JSON.stringify(value, null, 2) + '\n');
const hash = value => createHash('sha256').update(value).digest('hex');
const catalog = await json(join(kit, 'references/catalog.json'));
const [command, origin, planPath, outputPath] = process.argv.slice(2);
const patterns = ['.ro-faq-answer', 'img', 'table', '[data-ro-reveal]', '.journey-backdrop'];
const reviewItems = ['hero', 'typography', 'rhythm', 'alignment', 'image-crop', 'motion', 'navigation'];
const baselineSections = page => Object.entries(page.sections).map(([id, selector]) => ({id, selector}));

function validatePlan(plan, planDirectory) {
  assert.ok(Array.isArray(plan.pages) && plan.pages.length, '계획에 페이지를 한 개 이상 지정하세요.');
  const ids = new Set();
  const paths = new Set();
  for (const page of plan.pages) {
    assert.match(page.id, /^[a-z0-9-]+$/);
    assert.match(page.path, /^\/(?!\/)[^?#]*$/);
    assert.ok(!ids.has(page.id) && !paths.has(page.path), '중복 페이지 ID 또는 경로');
    ids.add(page.id);
    paths.add(page.path);
    assert.ok(page.goal?.trim() && page.hero && page.sections?.length >= 3, page.id + ': 목표, 히어로, 섹션 목록 필요');
    assert.ok(Array.isArray(page.interactions) && page.interactions.length, page.id + ': 클릭/탭/모달 등 검수 동작 지정');
    const used = new Set();
    for (const section of page.sections) {
      assert.match(section.id, /^[a-z0-9-]+$/);
      assert.ok(!used.has(section.id), page.id + ': 중복 섹션 ' + section.id);
      used.add(section.id);
      const [pageId, sectionId, ...extra] = (section.reference || '').split('/');
      assert.ok(!extra.length && catalog.pages[pageId]?.sections[sectionId], page.id + ': 잘못된 섹션 원본 ' + section.reference);
      assert.ok(section.selector && section.purpose?.trim() && section.keep?.length, page.id + ': 셀렉터·환자 질문·유지 요소 필요');
      const implementation = resolve(planDirectory, section.implementation || '');
      assert.ok(section.implementation && existsSync(implementation) && /\.(js|jsx|ts|tsx|css|astro|vue|html)$/.test(implementation),
        page.id + '/' + section.id + ': 실제 코드 파일 경로 필요');
    }
    for (const action of page.interactions) {
      assert.ok(Boolean(action.click) !== Boolean(action.scroll) && (action.visible || action.href || action.url),
        page.id + ': 동작의 버튼/스크롤과 확인 결과 필요');
    }
  }
}

async function snapshot(page, definitions) {
  return page.evaluate(({definitions, patterns}) => {
    const measure = (element, props) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const css = getComputedStyle(element);
      const metrics = {width: Math.round(rect.width), height: Math.round(rect.height)};
      for (const prop of props) metrics[prop] = css[prop];
      return metrics;
    };
    return {
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      headings: document.querySelectorAll('main h1').length,
      sections: Object.fromEntries(definitions.map(({id, selector}) => {
        const element = document.querySelector(selector);
        const title = element?.querySelector('h1,h2');
        return [id, element ? {
          ...measure(element, ['backgroundColor']),
          y: Math.round(element.getBoundingClientRect().top + window.scrollY),
          titleText: title?.textContent.trim() || '',
          title: measure(title, ['fontSize','lineHeight','fontWeight','fontFamily','color']),
          counts: Object.fromEntries(patterns.map(item => [item, element.querySelectorAll(item).length])),
        } : null];
      })),
      brokenLocalImages: [...document.images].filter(img => {
        if (!img.currentSrc || new URL(img.currentSrc).origin !== location.origin) return false;
        return img.complete && img.naturalWidth === 0 && img.getClientRects().length > 0 && !img.closest('[inert],[aria-hidden="true"]');
      }).map(img => img.currentSrc),
    };
  }, {definitions, patterns});
}

async function imageCapture(page, file) {
  // Capture the whole document even when the live page defers offscreen rendering.
  const captureStyle = await page.addStyleTag({content:'main * { content-visibility: visible !important; }'});
  await page.evaluate(async () => {
    for (const img of document.images) img.loading = 'eager';
    await document.fonts.ready;
    const height = document.documentElement.scrollHeight;
    for (let y = 0; y < height; y += Math.floor(innerHeight * .8)) {
      window.scrollTo({top: y, behavior:'instant'});
      await new Promise(requestAnimationFrame);
    }
    await Promise.race([
      Promise.allSettled([...document.images].filter(img => img.currentSrc).map(img => img.decode())),
      new Promise(resolve => setTimeout(resolve, 4500)),
    ]);
    await document.fonts.ready;
    window.scrollTo({top:0, behavior:'instant'});
    await new Promise(requestAnimationFrame);
  });
  await page.screenshot({path:file, fullPage:true, animations:'disabled', quality:78});
  return captureStyle;
}

async function runAction(page, action) {
  const target = page.locator(action.click || action.scroll).first();
  if (action.href) assert.equal(await target.getAttribute('href'), action.href);
  if (action.scroll) await target.scrollIntoViewIfNeeded({timeout:5000});
  else if (action.key) {
    await target.focus();
    await target.press(action.key, {timeout:5000});
  } else if (action.visible || action.url) await target.click({timeout:5000});
  if (action.visible) await page.locator(action.visible).first().waitFor({timeout:6000});
  if (action.url) await page.waitForURL(url => url.pathname + url.hash === action.url, {timeout:6000});
}

async function chromiumDriver() {
  const custom = process.env.PLAYWRIGHT_MODULE;
  return (await import(custom ? (/^file:/.test(custom) ? custom : pathToFileURL(resolve(custom)).href) : 'playwright')).chromium;
}

async function auditPage(browser, page, id, view, viewport, base, destination, referenceMetrics) {
  const context = await browser.newContext({viewport, isMobile:view === 'mobile', hasTouch:view === 'mobile', reducedMotion:'reduce'});
  const errors = [];
  const tab = await context.newPage();
  tab.on('pageerror', error => errors.push(error.message));
  try {
    const response = await tab.goto(new URL(page.path, base).href, {waitUntil:'load',timeout:35000});
    assert.ok(response?.ok(), '페이지 응답 실패');
    if (!referenceMetrics && id === 'home') await tab.locator('.reset-slide.is-active img').first().waitFor();
    const filename = id + '-' + view + '.jpg';
    const captureStyle = await imageCapture(tab, join(destination, filename));
    const sections = referenceMetrics ? page.sections : baselineSections(page);
    const metrics = await snapshot(tab, sections);
    await captureStyle.evaluate(element => element.remove());
    const result = {metrics, screenshot:filename, failures:errors};
    if (metrics.headings !== 1) errors.push('main 안에 H1이 정확히 1개여야 합니다.');
    if (metrics.width !== viewport.width || metrics.scrollWidth > metrics.width + 1) errors.push('뷰포트 너비 불일치 또는 가로 넘침');
    for (const url of metrics.brokenLocalImages) errors.push('깨진 로컬 이미지: ' + url);
    let previous = -1;
    for (const section of sections) {
      const measured = metrics.sections[section.id];
      if (!measured || !measured.width || !measured.height) {
        errors.push('표시되는 필수 섹션 누락: ' + section.id);
        continue;
      }
      if (measured.y < previous) errors.push('기획 순서와 다른 섹션: ' + section.id);
      previous = measured.y;
      if (!referenceMetrics) continue;
      const [pageId, sectionId] = section.reference.split('/');
      const expected = referenceMetrics[pageId][view].metrics.sections[sectionId];
      assert.ok(expected, section.reference + ': 기준 수치 없음');
      if (section.lockTypography && (!measured.title || !expected.title
        || measured.title.fontSize !== expected.title.fontSize
        || measured.title.fontWeight !== expected.title.fontWeight)) errors.push(section.id + ': 제목 크기/굵기가 기준과 다름');
      if (section.lockHeight && Math.abs(measured.height - expected.height) > 24) errors.push(section.id + ': 기준 높이에서 24px 초과');
      const requirements = section.allowPatternChange?.trim() ? {} : Object.fromEntries(
        ['img', 'table', '.journey-backdrop'].filter(selector => expected.counts[selector] > 0).map(selector => [selector, 1]),
      );
      for (const [selector, minimum] of Object.entries({...requirements, ...section.minimum})) {
        if (await tab.locator(section.selector).first().locator(selector).count() < minimum) {
          errors.push(section.id + ': ' + selector + ' 최소 ' + minimum + '개 필요');
        }
      }
    }
    if (referenceMetrics) {
      if (await tab.locator(page.hero).count() !== 1) errors.push('히어로 하나가 필요합니다.');
      await tab.emulateMedia({reducedMotion:'no-preference'});
      for (const action of page.interactions) {
        if (action.viewport && action.viewport !== view) continue;
        try {
          await tab.goto(new URL(page.path, base).href, {waitUntil:'domcontentloaded'});
          await runAction(tab, action);
        } catch (error) {
          errors.push((action.click || action.scroll) + ': ' + error.message.split('\n')[0]);
        }
      }
    }
    return result;
  } finally {
    await context.close();
  }
}

async function run() {
  const capture = command === 'capture';
  const destination = capture ? resolve(kit, 'references') : resolve(outputPath || '.build-tmp/clinic-kit');
  const referenceMetrics = capture ? null : await json(join(kit, 'references/metrics.json'));
  const plan = capture ? null : await json(resolve(planPath));
  if (plan) validatePlan(plan, dirname(resolve(planPath)));
  const pages = capture ? Object.entries(catalog.pages) : plan.pages.map(page => [page.id, page]);
  const browser = await (await chromiumDriver()).launch({headless:true, channel:process.env.BROWSER_CHANNEL || 'chrome'});
  const results = {};
  await mkdir(destination, {recursive:true});
  try {
    for (const [id, page] of pages) {
      results[id] = {};
      for (const [view, viewport] of Object.entries(catalog.viewports)) {
        try {
          const result = await auditPage(browser, page, id, view, viewport, origin, destination, referenceMetrics);
          results[id][view] = result;
          console.log(id + ' ' + view + ': ' + (result.failures.join(' / ') || 'OK'));
        } catch (error) {
          results[id][view] = {failures:[error.message]};
          console.error(id + ' ' + view + ': ' + error.message);
        }
      }
    }
  } finally {
    await browser.close();
  }
  const failed = Object.values(results).some(views => Object.values(views).some(view => view.failures.length));
  if (capture) {
    if (!failed) await save(join(destination, 'metrics.json'), results);
  } else {
    const report = {origin, referenceRevision:catalog.revision, planHash:hash(await readFile(planPath)), pages:results};
    const sourceFiles = new Set([...(plan.watch || []), ...plan.pages.flatMap(page => page.sections.map(section => section.implementation))]);
    report.sourceHashes = Object.fromEntries(await Promise.all([...sourceFiles].map(async path =>
      [path, hash(await readFile(resolve(dirname(planPath), path)))],
    )));
    for (const views of Object.values(results)) for (const view of Object.values(views)) {
      if (view.screenshot) view.imageHash = hash(await readFile(join(destination, view.screenshot)));
    }
    await save(join(destination, 'report.json'), report);
    const review = {
      reportHash:hash(await readFile(join(destination, 'report.json'))),
      pages:Object.fromEntries(pages.map(([id]) => [id,Object.fromEntries(
        Object.keys(catalog.viewports).map(view => [view,{checks:Object.fromEntries(reviewItems.map(item => [item,false])), note:''}]),
      )])),
    };
    await save(join(destination,'review.json'), review);
    console.log('검수 자료: ' + relative(process.cwd(), destination));
  }
  if (failed) process.exitCode = 1;
}

async function ready(reportPath, planFile) {
  const directory = dirname(reportPath);
  const report = await json(reportPath);
  const review = await json(join(directory,'review.json'));
  assert.equal(report.planHash, hash(await readFile(planFile)), '기획이 변경되었습니다. 다시 검수하세요.');
  assert.equal(review.reportHash, hash(await readFile(reportPath)), '다른 실행의 검수 기록입니다.');
  for (const [path, digest] of Object.entries(report.sourceHashes)) {
    assert.equal(hash(await readFile(resolve(dirname(planFile), path))), digest, path + ': 제작 코드가 변경되었습니다.');
  }
  assert.ok(Object.keys(report.pages).length, '검수된 페이지 없음');
  for (const [id, views] of Object.entries(report.pages)) {
    for (const name of Object.keys(catalog.viewports)) {
      const view = views[name];
      const decision = review.pages[id]?.[name];
      assert.equal(view.failures.length, 0, id + ' ' + name + ': 브라우저 검사 실패');
      assert.equal(view.imageHash, hash(await readFile(join(directory,view.screenshot))), '화면 파일이 변경되었습니다.');
      assert.ok(decision?.note?.trim() && reviewItems.every(item => decision.checks?.[item] === true),
        id + ' ' + name + ': 기준 화면과 비교한 검수 항목 및 구체적 관찰 기록이 필요합니다.');
    }
  }
  console.log('모든 페이지의 PC·모바일 자동 검사와 화면 검수 기록 완료');
}

if (command === 'capture' && origin) await run();
else if (command === 'audit' && origin && planPath) await run();
else if (command === 'ready' && origin && planPath) await ready(resolve(origin),resolve(planPath));
else {
  console.error('Usage: node kit.mjs capture <origin> | audit <origin> <plan.json> [output-dir] | ready <report.json> <plan.json>');
  process.exitCode = 2;
}
