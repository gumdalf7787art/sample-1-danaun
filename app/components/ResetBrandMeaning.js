import './reset-brand-meaning.css';

const brandLetters = [
  ['DA', 'Daily Life', '다시 하고 싶은 일상에서 출발합니다.'],
  ['N', 'Needs', '어떤 동작이 불편하고 무엇을 되찾고 싶은지 듣습니다.'],
  ['A', 'Assessment', '진찰과 움직임 평가로 통증의 원인을 살핍니다.'],
  ['U', 'Understanding', '치료의 목적과 선택지를 알기 쉽게 설명합니다.'],
  ['N', 'Next Steps', '회복 경과를 보며 다음 목표와 재활 계획을 함께 정합니다.'],
];

export default function ResetBrandMeaning() {
  return (
    <section className="ro-band pd-brand" id="reset-name" aria-labelledby="pd-brand-title">
      <div className="ro-wrap">
        <div className="ro-heading">
          <h2 id="pd-brand-title" data-ro-title>다시 하고 싶은 일상,<br/><em>다나은</em>이 함께합니다.</h2>
        </div>
        <ul className="pd-letters" role="list">
          {brandLetters.map(([letters, word, meaning], index) => (
            <li key={word} data-ro-reveal data-ro-reveal-delay={index * 70}>
              <span className="pd-letter" aria-hidden="true">{letters}</span>
              <div><strong lang="en">{word}</strong><p>{meaning}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
