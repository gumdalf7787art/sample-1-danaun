import {insightPostPath} from './insight-post-path.mjs';
import {sources as ageSources} from './healthy-aging-center.js';
import {sources as breastSources} from './breast-cancer-rehab.js';
import {sources as diagnosisSources} from './diagnosis-overview.js';
import {sources as ultrasoundSources} from './diagnosis-ultrasound.js';
import {diagnosisPages} from './diagnosis.js';
import {referenceNames as svfNames, sources as svfSources} from './knee-svf.js';
import {sources as jointSources} from './osteoarthritis-center.js';
import {sources as postureSources} from './posture-center.js';
import {sources as injectionSources} from './regen-injection.js';
import {references as plateletSources} from './regen-prp-prf.js';
import {regenPages} from './regen.js';
import {researchSources} from './research.js';
import {sources as spineSources} from './spine-center.js';
import {sources as sportSources} from './sports-center.js';

import {guide, review, trial, lab, policy, info, other} from './research-library-options.js';

const legacy = Object.fromEntries(researchSources.map(source => [source.id, source]));
const aaosGuide = legacy.aaos.href;
const prfReview = 'https://doi.org/10.1111/prd.12626';
const vaGuide = 'https://www.healthquality.va.gov/guidelines/CD/OA/';
const nicePrp = 'https://www.nice.org.uk/guidance/htg497';
const schreiber = 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0168746';
const aapmr = 'https://doi.org/10.1002/pmrj.70144';
const kearney = plateletSources.find(([id]) => id === 'R12')[2];

const aliases = new Map([
  ['https://www.radiologyinfo.org/info/musculous', 'https://www.radiologyinfo.org/en/info/musculous'],
  [legacy['prf-review'].href, prfReview],
  [jointSources.find(([id]) => id === 'S6')[2], aaosGuide],
  [jointSources.find(([id]) => id === 'S3')[2], vaGuide],
  [plateletSources.find(([id]) => id === 'R7')[2][0][1], vaGuide],
  [plateletSources.find(([id]) => id === 'R9')[2][0][1], nicePrp],
  [plateletSources.find(([id]) => id === 'R3')[2][0][1], aapmr],
  [kearney[1][1], kearney[0][1]],
]);

const ccBy = {name: 'CC BY 4.0', href: 'https://creativecommons.org/licenses/by/4.0/'};
const metadata = {
  ['https://www.hsrd.research.va.gov/publications/esp/dextrose-prolotherapy-exec.pdf']: {
    title: '미국 보훈부 · 근골격계 통증의 포도당 증식치료 체계적 문헌고찰', type: review, year: '2024',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK611427/',
    pdf: {file: '/research/va-dextrose-prolotherapy-2024.pdf', label: '연구 요약 PDF 다운로드', credit: '미국 보훈부 · Evidence Synthesis Program',
      license: {name: '퍼블릭 도메인', href: 'https://www.ncbi.nlm.nih.gov/books/NBK611424/'}},
  },
  ['https://www.radiologyinfo.org/en/info/musculous']: {title: 'ACR·RSNA · 근골격계 초음파 안내'},
  ['https://www.niams.nih.gov/health-topics/scoliosis/diagnosis-treatment-and-steps-to-take']: {
    title: 'NIAMS · 척추측만증 진단과 치료',
  },
  ['https://jamanetwork.com/journals/jama/fullarticle/2786501']: {
    title: 'Bennell 등 · 무릎 골관절염 PRP 무작위시험 (RESTORE)', type: trial, year: '2021', doi: '10.1001/jama.2021.19415',
  },
  [aaosGuide]: {title: legacy.aaos.label, type: guide, year: '2021', anchors: ['prp-evidence', 'source-aaos']},
  [prfReview]: {title: 'Farshidfar 등 · PRP와 주입형 PRF 비교 체계적 문헌고찰', type: review, year: '2025', anchors: ['prf-evidence', 'source-prf-review']},
  [svfSources.K1]: {title: legacy['svf-assessment'].label, type: policy, year: '2024', anchors: ['svf-evidence', 'source-svf-assessment']},
  [svfSources.K2]: {type: policy},
  [svfSources.K3]: {type: policy},
  [vaGuide]: {title: 'VA/DoD · 고관절·무릎 골관절염 비수술 진료지침', type: guide, year: '2026'},
  [nicePrp]: {title: 'NICE HTG497 · 무릎 골관절염 PRP 주사', type: guide, year: '2019'},
  [aapmr]: {title: 'AAPM&R · 무릎 골관절염 PRP 임상 지침', type: guide, year: '2026'},
  [kearney[0][1]]: {title: 'Kearney 등 · 아킬레스건병증 PRP 무작위시험', type: trial, year: '2021', doi: '10.1001/jama.2021.6986'},
  [svfSources.R1]: {title: 'Mautner 등 · 무릎 골관절염 세포 주사 비교시험 (MILES)', type: trial, year: '2023',
    doi: '10.1038/s41591-023-02632-w', aliases: ['Cell-based versus corticosteroid injections for knee pain'],
    pdf: {file: '/research/mautner-2023.pdf', credit: '© 2023 The Author(s)', license: ccBy}},
  [svfSources.R2]: {title: 'Lu 등 · 무릎 골관절염 SVF와 재활 비교 연구', type: trial, year: '2025', doi: '10.1038/s41598-025-09398-w'},
  ['https://doi.org/10.3349/ymj.2026.0138']: {title: 'Cho 등 · 무릎 골관절염 SVF 48주 이중눈가림 무작위시험', type: trial, year: '2026'},
  ['https://doi.org/10.1371/journal.pone.0168746']: {title: 'Schreiber 등 · 청소년 척추측만증 Schroth 운동 무작위시험', type: trial, year: '2016',
    url: schreiber, aliases: ['Schroth Physiotherapeutic Scoliosis-Specific Exercises Added to the Standard of Care'],
    pdf: {file: '/research/schreiber-2016.pdf', credit: '© 2016 Schreiber et al.', license: ccBy}},
};

const plateletTypes = {
  R2: lab, R5: lab, R8: guide, R10: trial, R11: policy, R13: trial, R14: policy, R15: other, R16: lab, R17: lab, R18: lab, R19: lab,
};

function canonicalUrl(url) {
  const parsed = new URL(url);
  for (const key of [...parsed.searchParams.keys()]) {
    if (key.startsWith('utm_') || key === 'webid') parsed.searchParams.delete(key);
  }
  parsed.hash = '';
  const cleaned = parsed.href;
  if (aliases.has(cleaned)) return aliases.get(cleaned);
  const doi = [parsed.pathname, parsed.searchParams.get('id')].filter(Boolean)
    .map(part => decodeURIComponent(part).match(/10\.\d{4,9}\/[a-z\d._;()/-]+/i)?.[0])
    .find(Boolean);
  return doi ? 'https://doi.org/' + doi.toLowerCase() : cleaned;
}

function pairRows(rows, section = 'references') {
  return rows.map(([title, url]) => ({title, links: [[title, url]], section}));
}

function keyedRows(rows, prefix) {
  return rows.map(([id, title, url]) => ({title, links: [[title, url]], section: prefix + id}));
}

const pages = [
  ['regen', '주사치료 안내', '/regen', keyedRows(researchSources.map(({id, label, href}) => [id, label, href]), 'regen-source-')],
  ['regen', '맞춤 주사치료', '/regen/injection', pairRows(injectionSources)],
  ['regen', 'PRP·PRF', '/regen/prp-prf', plateletSources.map(([id, institution, links]) => ({
    title: institution + ' · ' + links[0][0], links, section: 'ref-' + id, type: plateletTypes[id],
  }))],
  ['regen', '무릎 SVF', '/regen/knee-svf', keyedRows(Object.entries(svfSources)
    .map(([id, url]) => [id, svfNames[id], url]), 'svf-ref-')],
  ['regen', regenPages.principles.name, '/regen/principles', pairRows(regenPages.principles.sources)],
  ['centers', '스포츠손상 센터', '/centers/sports', pairRows(sportSources)],
  ['centers', '퇴행성 관절염 센터', '/centers/osteoarthritis', keyedRows(jointSources, 'oa-source-')],
  ['centers', '척추 재생 센터', '/centers/spine', keyedRows(spineSources, 'spine-source-')],
  ['centers', '유방암 재활 센터', '/centers/breast-cancer-rehab', keyedRows(breastSources, 'br-source-')],
  ['centers', '척추·체형 교정 센터', '/centers/posture', keyedRows(postureSources, 'pc-source-')],
  ['centers', '항노화·피부·두피 센터', '/centers/healthy-aging', keyedRows(Object.entries(ageSources)
    .map(([id, [title, url]]) => [id, title, url]), 'ha-source-')],
  ['diagnosis', '정밀 진단 소개', '/diagnosis', keyedRows(diagnosisSources, 'source-')],
  ['diagnosis', '초음파 진단', '/diagnosis/ultrasound', keyedRows(ultrasoundSources, 'us-source-')],
  ...['movement', 'alignment'].map(slug => [
    'diagnosis', diagnosisPages[slug].name, '/diagnosis/' + slug, pairRows(diagnosisPages[slug].sources),
  ]),
];

function sourceType(title, url) {
  if (/law\.go\.kr|nhis\.or\.kr|cms\.gov/.test(url)) return policy;
  if (/체계적 문헌고찰|근거 검토|cochrane\.org/i.test(title + ' ' + url)) return review;
  if (/무작위|위약대조/.test(title)) return trial;
  if (/지침|합의문|guideline|nice\.org\.uk\/guidance/i.test(title + ' ' + url)) return guide;
  return info;
}

function accessLabel(url, label, primary) {
  if (/pocket card/i.test(label)) return '요약 카드 PDF';
  if (/provider summary/i.test(label)) return '의료진 요약 PDF';
  if (/Warwick/.test(label)) return '연구팀 요약 PDF';
  if (url === aapmr || url === prfReview) return '학술지 원문';
  if (url.includes('/clinical-guidance/')) return '학회 공식 안내';
  if (/pubmed\.ncbi/.test(url)) return 'PubMed 초록';
  if (url.endsWith('.pdf') || url.includes('-pdf-')) return '공식 PDF 열기';
  return primary ? '공식 출처 보기' : '공식 자료 보기';
}

export function getResearchLibrary(posts = []) {
  const records = new Map();
  const articlePages = posts.filter(post => post.sources?.length).map(post => [
    'insights', post.title, insightPostPath(post),
    pairRows(post.sources.filter(source => /^https?:\/\//i.test(source.url)).map(({title, url}) => [title, url])),
  ]);

  for (const [group, name, path, citations] of [...pages, ...articlePages]) {
    for (const {title, type, links, section} of citations) {
      const key = canonicalUrl(links[0][1]);
      const details = metadata[key] || {};
      if (!records.has(key)) {
        const url = details.url || (key.startsWith('https://doi.org/') ? links[0][1] : key);
        records.set(key, {
          id: key, title: details.title || title, type: details.type || type || sourceType(title, url),
          year: details.year || title.match(/\b20\d{2}\b/)?.[0],
          doi: details.doi || (key.startsWith('https://doi.org/') ? key.split('doi.org/')[1] : undefined),
          pdf: details.pdf, anchors: details.anchors || [], names: [...(details.aliases || [])],
          links: [{url, label: accessLabel(url, url === links[0][1] ? links[0][0] : '', true)}], citations: [],
        });
      }
      const record = records.get(key);
      const href = path + '#' + section;
      if (!record.citations.some(citation => citation.href === href)) record.citations.push({group, name, href});
      if (!record.names.includes(title)) record.names.push(title);
      for (const [label, url] of links) {
        const duplicate = record.links.some(link => link.url === url);
        const companion = /\.pdf(?:$|\?)|-pdf-|\/clinical-guidance\//i.test(url);
        if (!duplicate && companion) record.links.push({url, label: accessLabel(url, label, false)});
      }
    }
  }

  return [...records.values()];
}
