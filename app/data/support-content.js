export const supportSections = {
  notices: {
    label: 'CLINIC NOTICES', summary: '진료 일정 변경, 휴진 등 방문 전에 알아두실 병원 소식을 안내합니다.',
    image: '/images/clinic-tour-reception.webp',
  },
  booking: {
    label: 'CONSULTATION & BOOKING', summary: '진료 일정을 예약하거나 방문 전에 궁금한 점을 문의해 주세요.',
    image: '/images/consultation-soft.webp',
  },
  'first-visit': {
    label: 'YOUR FIRST VISIT', summary: '내원 전에 준비할 것부터 접수와 첫 진료까지 안내합니다.',
    image: '/images/clinic-tour-entrance.webp',
  },
  faq: {
    label: 'FREQUENTLY ASKED QUESTIONS', summary: '예약과 접수, 주차와 검사, 진료비에 관한 질문을 모았습니다.',
    image: '/images/clinic-tour-waiting-room.webp',
  },
  aftercare: {
    label: 'AFTER YOUR TREATMENT', summary: '받으신 치료를 선택하고, 귀가 후 살필 변화와 다음 진료 준비를 확인하세요.',
    image: '/images/hero-recovery.webp',
  },
};

export const notices = [
  {
    id: 'clinic-hours',
    title: '진료시간과 정기 휴진일 확인 안내',
    date: '2026-11-16',
    pinned: true,
    paragraphs: [
      '내원 전 ‘진료시간 - 오시는 길’에서 요일별 진료시간과 정기 휴진일을 확인해 주세요.',
      '당일 접수 가능 여부와 예약 변경은 병원으로 전화해 확인하실 수 있습니다.',
    ],
    links: [
      ['진료시간과 휴진일 보기', '/visit#hours'],
      ['전화 문의 031-263-2520', 'tel:0312632520'],
    ],
  },
  {
    id: 'sample-online-booking',
    title: '네이버 예약 이용 안내',
    date: '2026-11-16',
    sample: true,
    paragraphs: ['예약 안내 페이지에서 네이버 예약으로 이동해 희망하는 방문 일정을 확인할 수 있습니다.'],
    links: [['상담신청 및 예약', '/support/booking']],
  },
  {
    id: 'sample-first-visit',
    title: '첫 방문 전 준비 자료 안내',
    date: '2026-11-16',
    sample: true,
    paragraphs: ['보유하신 검사 영상이나 판독지, 이전 치료 기록, 복용 약 목록을 미리 준비하는 경우를 안내하는 예시입니다.'],
    links: [['처음 오시는 분', '/support/first-visit']],
  },
  {
    id: 'sample-parking',
    title: '주차장 입구 사진 안내',
    date: '2026-11-16',
    sample: true,
    paragraphs: ['차량으로 방문하시는 분께 주차장 진입 경로와 사진을 안내하는 예시입니다.'],
    links: [['주차장 진입 안내', '/visit#parking']],
  },
  {
    id: 'sample-non-covered-fees',
    title: '비급여 진료비 확인 방법',
    date: '2026-11-16',
    sample: true,
    paragraphs: ['홈페이지에서 비급여 항목명과 금액을 찾아보는 방법을 안내하는 예시입니다.'],
    links: [['비급여 진료비', '/fees']],
  },
  {
    id: 'sample-before-appointment',
    title: '내원 전 예약·접수 질문 안내',
    date: '2026-11-16',
    sample: true,
    paragraphs: ['내원 전 예약, 접수, 주차와 관련해 자주 묻는 질문을 안내하는 예시입니다.'],
    links: [['자주 묻는 질문', '/support/faq']],
  },
];

export const firstVisitSteps = [
  ['방문 전 준비', '이전 MRI·X-ray 영상과 판독지, 치료나 주사 기록, 복용 중인 약 목록이 있다면 가져오세요. 언제부터 아팠는지와 어려워진 동작을 정리해 두면 증상을 설명하기 좋습니다.'],
  ['도착과 접수', '송란아트프라자 2층 접수 공간에서 처음 방문했다고 말씀해 주세요. 예약하셨다면 예약 시간과 이름을 알려주시고, 준비한 검사·치료 자료가 있으면 함께 전달해 주세요.'],
  ['첫 진료', '증상이 시작된 상황과 불편한 동작, 다시 하고 싶은 활동을 이야기해 주세요. 의료진은 진찰과 기존 자료를 살펴 필요한 검사와 치료 방향을 설명합니다.'],
];

export const faqGroups = [
  {title: '예약·접수', items: [
    {question: '어떻게 예약하나요?', answer: '상담신청 및 예약 페이지에서 네이버 예약으로 이동해 가능한 일정을 확인하세요. 당일 접수나 예약 변경은 병원으로 전화해 주세요.', links: [['상담신청 및 예약', '/support/booking'], ['전화 문의 031-263-2520', 'tel:0312632520']]},
    {question: '정기 휴진일과 임시 휴진은 어디서 확인하나요?', answer: '정기 휴진과 요일별 운영시간은 진료시간 안내에서 보실 수 있습니다. 휴진이나 운영시간 변경 공지는 공지사항에서 확인해 주세요.', links: [['진료시간', '/visit#hours'], ['공지사항', '/support/notices']]},
  ]},
  {title: '방문·주차', items: [
    {question: '처음 방문할 때 무엇을 가져가면 좋을까요?', answer: '보유하신 검사 영상과 판독지, 이전 치료 기록과 복용 약 목록을 가져오시면 진료에 도움이 됩니다. 준비할 자료와 내원 순서는 첫 방문 안내에서 보실 수 있습니다.', links: [['처음 오시는 분', '/support/first-visit']]},
    {question: '주차장 입구가 어디인가요?', answer: '송란아트프라자 건물 측면에 주차장 입구가 있습니다. 진입 경로를 사진으로 확인할 수 있으며, 주차 이용 조건은 방문 전에 전화로 문의해 주세요.', links: [['주차장 진입 사진 보기', '/visit#parking']]},
  ]},
  {title: '검사·비용', items: [
    {question: '다른 병원에서 찍은 영상도 가져가도 되나요?', answer: '네. 영상과 판독지, 촬영 시기를 함께 알려주세요. 의료진이 현재 증상과 진찰 결과를 함께 살펴 추가 검사가 필요한지 판단합니다.'},
    {question: '비급여 진료비는 어디에서 확인하나요?', answer: '비급여 진료비 페이지에서 항목명과 금액, 비고를 검색할 수 있습니다. 실제 적용 항목은 진료나 접수 시 확인해 주세요.', links: [['비급여 진료비 보기', '/fees']]},
  ]},
];

export const aftercare = [
  {
    id: 'injection', title: '주사치료 후', intro: '리젠 주사·PRP 등 시술 후에는 시술 부위와 사용한 성분에 따라 받은 안내를 확인해 주세요.',
    items: [
      '주사 부위의 통증, 붓기, 열감이 어떻게 변하는지 살피세요. 드레싱 관리와 샤워 시점은 시술 후 받은 지침을 따르세요.',
      '운동과 업무 강도는 시술 부위와 현재 상태에 맞춰 조절하세요. 처방약이나 평소 복용하는 약의 변경은 의료진에게 확인하세요.',
      '통증이 심해지거나 붓기·붉어짐·열감이 늘고, 발열이나 오한이 있으면 시술한 의료기관에 바로 연락해 진료를 받으세요.',
      '다음 진료에는 통증이 달라진 시점과 걷기·계단·팔 들기처럼 원래 불편했던 동작의 변화를 알려주세요.',
    ],
    links: [['리젠 주사 치료 전후 안내', '/regen/injection#aftercare'], ['PRP·PRF 치료 전후 안내', '/regen/prp-prf#safety'], ['영국 RNOH 초음파 유도 주사 안내', 'https://www.rnoh.nhs.uk/patients-and-visitors/patient-information-guides/ultrasound-guided-injection-patients-guide']],
  },
  {
    id: 'knee-svf', title: '무릎 SVF 시술 후', intro: '지방을 채취한 부위와 주사를 맞은 무릎을 각각 살펴주세요.',
    items: [
      '채취 부위의 드레싱과 상처 관리, 압박 여부는 시술 시 받은 지침을 따르세요. 무릎 통증과 붓기의 변화도 함께 살피세요.',
      '샤워, 걷기, 계단 오르기와 운동을 어디까지 할 수 있는지 시술 후 받은 안내에서 확인하세요.',
      '채취 부위의 출혈·분비물, 심해지는 통증·붓기·붉어짐, 열감이나 발열이 있으면 시술한 의료기관에 바로 연락해 진료를 받으세요.',
      '채취 부위 변화와 무릎으로 걷거나 계단을 이용할 때의 불편을 구분해 기록해 두면 다음 진료에서 경과를 설명하기 좋습니다.',
    ],
    links: [['무릎 SVF 재활·경과 확인', '/regen/knee-svf#rehabilitation']],
  },
  {
    id: 'rehab', title: '운동·재활치료 후', intro: '배운 동작과 계획을 기준으로 집에서의 운동을 이어가세요.',
    items: [
      '치료 후 어떤 동작에서 불편했는지, 그 불편이 얼마나 이어졌는지 기록해 주세요.',
      '운동 범위·횟수·강도는 안내받은 계획을 따르세요. 동작 중 새 통증이 생기거나 통증이 심해지면 해당 운동을 멈추고 담당 의료진에게 알려주세요.',
      '평소와 다른 통증이 계속되거나 붓기가 늘어 일상 동작에 지장이 생기면 다음 운동 전에 치료팀에 문의하세요.',
      '다음 진료에는 수행했던 동작과 반복 횟수, 운동 직후와 다음 날의 반응을 함께 알려주세요.',
    ],
    links: [['재활과 운동 안내', '/insights/exercise']],
  },
];

export const aftercareSteps = ['귀가 후 확인할 점', '일상생활과 운동', '병원에 연락해야 할 때', '다음 진료'];
