export const insightSections = [
  {id:'tv', name:'외부 건강 영상', en:'DOCTOR GOEUN TV', description:'샘플 의료진이 영상으로 전하는 몸과 움직임 이야기.'},
  {id:'column', name:'건강칼럼', en:'HEALTH JOURNAL', description:'증상과 검사, 치료를 이해하는 데 도움이 되는 글.'},
  {id:'questions', name:'묻고 답하기', en:'QUESTIONS & ANSWERS', description:'진료 전후 자주 궁금해하는 내용을 질문별로 찾아보세요.'},
  {id:'exercise', name:'홈운동 라이브러리', en:'HOME EXERCISE', description:'관심 있는 부위의 운동 영상과 운동 전후에 확인할 내용을 모았습니다.'},
  {id:'media', name:'방송 - 언론', en:'MEDIA ARCHIVE', description:'샘플 의료진의 방송 출연 화면과 언론 보도 자료를 살펴보세요.'},
  {id:'research', name:'근거연구', en:'EVIDENCE & RESEARCH', description:'DANAUN REGEN, 치료센터, 정밀 진단의 진료 안내에서 인용한 논문·지침·평가 자료를 찾아보세요.'},
];

export const categories = insightSections.filter(({id}) => id !== 'media' && id !== 'research');
export const insightLinks = insightSections.map(({id, name}) => [name, '/insights/' + id]);
