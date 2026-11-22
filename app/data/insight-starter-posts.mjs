import {youtubeThumbnailUrl} from '../../lib/youtube-feed.mjs';
import {recoveryColumn, shoulderColumn, ultrasoundColumn} from './column-editorials.mjs';

// Public starter articles adapted from the clinic's existing pages and videos.
function article(category, slug, title, summary, {tags, image, imageAlt = '', sections, relatedLinks, youtubeId, questionBody}) {
  return {
    category, slug, title, summary, tags, sections, relatedLinks, youtubeId, questionBody,
    cover: image ? {src: '/images/' + image, alt: imageAlt}
      : youtubeId ? {src: youtubeThumbnailUrl(youtubeId), alt: imageAlt} : undefined,
    author: '다나은재활의학과의원',
    reviewedBy: '다나은재활의학과의원 의료진',
    publishedAt: '2026-11-16T00:00:00+09:00',
  };
}

const section = (id, title, ...paragraphs) => ({id, title, paragraphs});
const link = (label, href) => ({label, href});

export const starterPosts = [
  article('column', 'reset-knee-pain-on-stairs', '계단을 오르내릴 때 무릎이 아프다면',
    '계단에서 언제 불편한지, 어떤 활동 후 증상이 달라지는지에 따라 무릎을 살피는 방향이 달라질 수 있습니다.', {
      tags:['무릎', '통증·관절'], image:'center-care-2.webp', imageAlt:'의료진이 환자의 무릎을 손으로 살피는 모습',
      sections:[
        section('symptoms','어떤 동작에서 불편한가요?', '계단을 내려갈 때, 오래 걸은 뒤, 의자에서 일어날 때처럼 불편한 동작을 구체적으로 알려주세요. 같은 무릎 통증도 관련된 조직과 움직임은 사람마다 다를 수 있습니다.'),
        section('evaluation','진료에서는 무엇을 확인하나요?', '언제부터 불편했는지, 부종이나 움직임 제한은 있는지 듣고 관절 상태와 생활 기능을 함께 살핍니다. 검사와 치료 계획은 진찰 결과에 따라 정합니다.'),
      ],
      relatedLinks:[link('퇴행성 관절염 센터','/centers/osteoarthritis')],
    }),
  {
    ...article('column', 'reset-understanding-ultrasound', '근골격계 초음파로 무엇을 살펴볼까요?', ultrasoundColumn.summary, {
      tags: ['검사·진단', '초음파'], image: 'regen-ultrasound-focus-640.webp',
      imageAlt: '탐촉자를 사용해 관절 주변을 초음파로 검사하는 모습',
      sections: ultrasoundColumn.sections,
      relatedLinks: [link('근골격계 초음파 진단', '/diagnosis/ultrasound')],
    }),
    editorial: ultrasoundColumn,
    sources: ultrasoundColumn.sources,
  },
  {
    ...article('column', 'reset-recovery-followup', '치료 후에는 무엇을 다시 확인할까요?', recoveryColumn.summary, {
      tags: ['회복·재활', '움직임'], image: 'diagnosis-assessment-2.webp',
      imageAlt: '의료진이 환자의 무릎을 굽히는 동작을 살피는 모습',
      sections: recoveryColumn.sections,
      relatedLinks: [link('치료 후 주의사항', '/support/aftercare'), link('다나은 4원칙', '/about/principles')],
    }),
    editorial: recoveryColumn,
    sources: recoveryColumn.sources,
  },
  {
    ...article('column', 'reset-shoulder-pain-raising-arm', '팔을 들어 올릴 때 어깨가 아프다면', shoulderColumn.summary, {
      tags: ['목·어깨', '통증·관절'], image: 'joint-center-shoulder.webp',
      imageAlt: '여성이 선반에 놓인 물건에 손을 뻗는 모습',
      sections: shoulderColumn.sections,
      relatedLinks: [link('스포츠손상 센터', '/centers/sports')],
    }),
    publishedAt: '2026-11-17T00:00:00+09:00',
    reviewedBy: null,
    editorial: shoulderColumn,
    sources: shoulderColumn.sources,
  },
  article('questions', 'reset-first-visit-checklist', '처음 방문할 때 무엇을 준비하면 좋을까요?',
    '가지고 계신 검사 자료와 복용 약, 이전 치료 기록이 있다면 가져오세요.', {
      tags:['첫 방문·예약'],
      questionBody: '이번에 처음 예약했습니다. 다른 병원에서 찍은 영상과 검사 결과가 있고 평소에 먹는 약도 있는데, 무엇을 챙겨 가면 될까요? 진료실에서 증상을 설명할 때 미리 정리해 두면 좋은 것도 궁금합니다.',
      sections:[section('prepare','검사 자료와 생활 속 불편을 확인해 주세요','MRI·X-ray 영상과 판독지, 복용 중인 약과 이전 시술 기록이 있다면 도움이 됩니다. 언제부터 불편했는지와 어려운 동작도 함께 알려주세요.')],
    }),
  article('questions', 'reset-ultrasound-evaluation-question', '모든 환자가 초음파 검사를 하나요?',
    '초음파 검사 여부와 범위는 증상과 진찰 결과에 따라 정합니다.', {
      tags:['검사'],
      questionBody: '팔을 들어 올리면 어깨가 아파서 진료를 받아보려고 합니다. 처음 방문하면 초음파 검사도 바로 받게 되나요? 어떤 경우에 검사가 필요한지 궁금합니다.',
      sections:[section('decision','진찰 후 필요한 검사를 선택합니다','같은 부위가 아파도 불편한 동작과 진찰 소견이 다를 수 있습니다. 영상에서 보이는 조직의 상태와 움직임을 함께 고려합니다.')],
    }),
  article('questions', 'reset-injection-ingredients-question', '주사를 맞기 전에 무엇을 확인할 수 있나요?',
    '다나은은 주사를 검토할 때 성분과 사용 목적, 가능한 대안과 주의점을 설명합니다.', {
      tags:['주사치료'],
      questionBody: '진료 중에 주사치료를 권유받으면 어떤 성분을 쓰는지 미리 알 수 있나요? 지금 먹는 약이나 전에 맞은 주사 이야기도 먼저 해야 하는지 궁금합니다.',
      sections:[section('consent','성분과 선택지를 확인합니다','복용하는 약과 이전 치료 반응을 알려주시고, 사용하는 성분과 해당 치료를 고려하는 이유를 확인해 주세요. 설명이 필요한 부분은 진료에서 다시 물어보실 수 있습니다.')],
    }),
  article('questions', 'reset-activity-after-treatment-question', '치료 후 일상이나 운동은 어떻게 이어가나요?',
    '처음 어려웠던 동작과 활동 후 반응을 다시 살피고 필요한 재활을 계획합니다.', {
      tags:['재활·운동'],
      questionBody: '치료를 받고 통증이 조금 줄었는데, 평소 하던 산책이나 운동을 다시 시작해도 될지 모르겠습니다. 어느 정도까지 움직여도 되는지, 운동하고 나서는 무엇을 살펴봐야 할까요?',
      sections:[section('followup','현재 기능과 회복 경과를 함께 살핍니다','걷기나 운동에서 불편이 언제 나타나는지, 활동 뒤 어떻게 달라지는지 알려주세요. 진찰과 경과에 맞춰 다음 활동 범위를 상의합니다.')],
    }),
  article('questions', 'reset-check-non-covered-fees', '비급여 진료비는 어디에서 확인하나요?',
    '비급여 진료비 페이지에서 항목명으로 검색하거나 분류별로 확인할 수 있습니다.', {
      tags:['비용'],
      questionBody: '진료 전에 비급여 항목의 비용을 알아보고 싶습니다. 같은 항목에 금액이 한 가지가 아니라 범위로 적혀 있다면 실제로 내게 적용되는 비용은 어떻게 확인하나요?',
      sections:[section('fees','금액과 비고를 함께 확인하세요','범위로 표시된 금액은 항목에 따라 부위·시간·약제 등 적용 기준이 다를 수 있습니다. 해당 행의 비고를 읽고 적용 금액은 진료 전에 확인해 주세요.')],
    }),
  article('exercise', 'reset-home-knee-movement-video', '무릎 앞쪽이 불편할 때 살펴보는 운동 영상',
    '닥터고은 TV의 무릎 운동 영상을 보고, 걷기와 근력 운동을 조절하는 기준을 함께 살펴보세요.', {
      tags:['무릎'], youtubeId:'W8zQe5jWXlE',
      sections:[
        section('before','어떤 동작이 불편한지 확인합니다','오래 걷기나 계단처럼 불편이 나타나는 활동과 시작 시점을 확인해 주세요.'),
        section('after','운동 후 반응을 확인합니다','센터 안내에서는 운동 뒤 통증과 붓기의 변화를 살피고 강도와 시간을 조절하는 과정을 안내합니다. 적용 범위는 진료에서 상의해 주세요.'),
      ],
      relatedLinks:[link('무릎 관절염 운동 안내','/centers/osteoarthritis#exercise')],
    }),
  article('exercise', 'reset-home-shoulder-movement-video', '어깨 움직임과 보강운동 살펴보기',
    '닥터고은 TV에서 어깨 움직임과 보강운동을 설명하는 영상을 볼 수 있습니다.', {
      tags:['목·어깨'], youtubeId:'6X55o8arZs0',
      sections:[
        section('before','불편한 어깨 동작을 먼저 확인합니다','팔을 어느 방향으로 들 때 불편한지와 운동 후 증상이 어떻게 달라지는지 살펴보세요.'),
        section('after','현재 기능에 맞춰 운동 범위를 상의합니다','스포츠손상 센터에서는 가동범위와 근력, 움직임을 평가하고 운동 반응에 따라 재활 계획을 조정합니다.'),
      ],
      relatedLinks:[link('스포츠손상 센터의 회복 과정','/centers/sports#recovery')],
    }),
];
