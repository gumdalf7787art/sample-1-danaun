import {Photo, Source} from './ColumnElements';

const aaos = 'https://www.orthoinfo.org/bodypart/kneelower-leg/patellofemoral-pain-syndrome/';
const nhs = 'https://www.nhs.uk/symptoms/knee-pain/';
const mayo = 'https://www.mayoclinic.org/diseases-conditions/patellofemoral-pain-syndrome/diagnosis-treatment/drc-20350797';

export const kneeColumn = {
  topic: '관절과 움직임',
  titleLines: ['계단을 오르내릴 때', '무릎이 아프다면'],
  summaryLines: ['익숙한 계단이 불편해졌을 때,', '통증이 나타나는 순간부터 차근차근 살펴봅니다.'],
  coverCaption: '무릎의 어느 부분이 불편한지, 움직일 때 어떻게 달라지는지 확인하는 것이 평가의 출발점입니다.',
  video: {id: 'W8zQe5jWXlE', title: '무릎 앞쪽 통증과 운동, 영상으로 살펴보세요'},
  sources: [
    {url: aaos, title: '미국정형외과학회 · 슬개대퇴 통증 증후군'},
    {url: mayo, title: '메이오클리닉 · 슬개대퇴 통증의 진단과 치료'},
    {url: nhs, title: 'NHS · 무릎 통증과 진료가 필요한 신호'},
  ],
};

export default function KneeColumn() {
  return <>
<section className="column-section" id="notice"><span className="column-number">01 / NOTICE</span><h2>평지에서는 괜찮은데, 계단에서만 아픈가요?</h2><p>출근길 계단을 내려가거나 집으로 올라오는 길에 무릎이 시큰할 때가 있습니다. 이때는 <strong>어디가 아픈지와 어떤 순간에 아픈지를 함께 기록</strong>해 보세요. 올라갈 때와 내려갈 때의 차이, 오래 앉았다 일어난 뒤의 느낌, 걷는 양이 늘어난 날의 변화를 적어두면 진료에서 불편을 구체적으로 설명하는 데 도움이 됩니다.</p></section>
<blockquote className="column-quote"><p>“무릎이 아파요”에서 한 걸음 더.<br/><strong>“어떤 동작에서 불편한가요?”</strong></p><span>다나은이 함께 살펴보는 질문</span></blockquote>
<section className="column-section" id="cause"><span className="column-number">02 / UNDERSTAND</span><h2>계단 통증이 곧 관절염을 뜻하지는 않습니다</h2><p>무릎 앞쪽이나 슬개골 주변의 통증은 계단, 쪼그려 앉기처럼 무릎을 반복해서 굽히는 활동에서 나타날 수 있습니다. 하지만 <strong>한 가지 동작만으로 원인을 정할 수는 없습니다.</strong> 통증 위치와 시작 시점, 다친 경험, 붓기 등을 함께 살펴야 합니다. 슬개대퇴 통증에 대한 설명은 <Source href={aaos}>미국정형외과학회 안내</Source>에서도 확인할 수 있습니다.</p></section>
<aside className="column-callout"><span className="column-eyebrow">진료 전, 세 가지 메모</span><ul><li><strong>위치</strong><span>앞쪽, 안쪽, 뒤쪽 중 어디가 불편한가요?</span></li><li><strong>상황</strong><span>올라갈 때와 내려갈 때 중 언제 아픈가요?</span></li><li><strong>변화</strong><span>붓거나 잠기는 느낌, 힘이 빠지는 느낌이 있나요?</span></li></ul></aside>
<section className="column-section" id="evaluate"><span className="column-number">03 / ASSESS</span><h2>진찰과 움직임을 보고, 필요한 검사를 고릅니다</h2><p>진료에서는 증상의 경과를 듣고 무릎을 움직이거나 주변을 살피며 관절과 근육의 기능을 확인합니다. 필요할 때는 걷기나 계단 동작도 관찰합니다. <strong>검사 종류와 범위는 진찰 결과에 따라 달라집니다.</strong> 초음파는 확인하려는 조직에 따라 선택하는 검사이며, 모든 무릎 문제를 초음파 하나로 판단하지는 않습니다. 진찰 과정은 <Source href={mayo}>메이오클리닉 안내</Source>를 참고할 수 있습니다.</p></section>
<Photo src="/images/svf-patellar-ultrasound-side-1120.webp" alt="무릎 앞쪽 슬개골 주변을 초음파 탐촉자로 살피는 모습" caption="무릎 앞쪽 초음파 평가 모습. 확인할 조직에 따라 검사를 선택하고, 영상은 증상과 진찰 소견을 함께 보며 해석합니다."/>
<section className="column-section" id="adjust"><span className="column-number">04 / ADJUST</span><h2>무조건 쉬기보다, 불편을 키우는 활동부터 조절합니다</h2><p>최근 계단이나 달리기의 양을 갑자기 늘렸다면 통증이 심해지는 활동을 잠시 줄이고 상태에 맞는 활동으로 조절할 수 있습니다. <strong>통증을 참고 같은 강도로 반복하기보다, 활동의 양과 반응을 살피는 것</strong>이 먼저입니다. 무릎 앞쪽 통증의 활동 조절과 운동치료에 관한 일반적인 설명은 <Source href={aaos}>미국정형외과학회 자료</Source>를 참고하고, 자신의 운동 범위는 진료에서 상의해 주세요.</p></section>
<section className="column-section" id="exercise"><span className="column-number">05 / MOVE</span><h2>운동은 횟수만큼, 이후의 반응도 중요합니다</h2><p>무릎과 엉덩이 주변 근육을 기르는 운동은 일부 무릎 앞쪽 통증의 관리에 활용됩니다. 다만 같은 운동이라도 현재 기능과 증상에 따라 시작 범위가 다를 수 있습니다. <strong>운동 중 통증이 심해지거나 이후 붓기가 생긴다면 강도를 다시 상의</strong>하세요. 아래 닥터고은TV 영상은 운동을 이해하는 참고자료이며, 개인에게 맞는 동작과 횟수는 평가 후 정합니다.</p></section>
<aside className="column-callout column-alert"><span className="column-eyebrow">먼저 확인할 신호</span><h3>참고 기다리기보다 진료가 필요한 때</h3><p>무릎을 움직이거나 체중을 싣기 어렵고, 심하게 붓거나 모양이 변한 경우에는 신속히 진료받으세요. 열이 나면서 무릎이 붉고 뜨겁다면 즉시 의료진에게 확인해야 합니다. <Source href={nhs}>NHS 무릎 통증 안내</Source></p></aside>
<section className="column-section" id="followup"><span className="column-number">06 / FOLLOW UP</span><h2>회복은 다시 편해진 일상에서 확인합니다</h2><p>치료 뒤에는 통증의 변화와 함께 처음 어려웠던 활동이 어떻게 달라졌는지 돌아봅니다. <strong>계단을 몇 층까지 이용할 수 있는지, 활동 후 불편이 얼마나 이어지는지</strong>를 알려주세요. 다나은은 현재 기능과 치료 후 반응을 함께 살펴 다음 운동과 생활 관리의 방향을 상의합니다. 관련 진료는 <a href="/centers/osteoarthritis">퇴행성 관절염 센터</a>에서 자세히 확인할 수 있습니다.</p></section>
  </>;
}
