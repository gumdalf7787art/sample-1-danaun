import './reset-brand-meaning.css';

const brandLetters = [
  ['Re:again', '다시 하고 싶은 일상에서 출발합니다.'],
  ['Empathize', '통증과 그로 인해 달라진 일상을 듣습니다.'],
  ['Specific', '언제, 어디서, 어떤 움직임이 불편한지 구체적으로 살핍니다.'],
  ['Extraordinary', '환자마다 다른 생활과 목표를 진료에 반영합니다.'],
  ['Treat', '치료의 선택부터 이후의 경과까지 함께 살핍니다.'],
];

export default function ResetBrandMeaning() {
  return (
    <section className="ro-band pd-brand" id="reset-name" aria-labelledby="pd-brand-title">
      <div className="ro-wrap">
        <div className="ro-heading">
          <h2 id="pd-brand-title" data-ro-title>다시 건강한 몸으로<br/><em>RESET</em> 될 수 있도록 노력합니다.</h2>
        </div>
        <ul className="pd-letters" role="list">
          {brandLetters.map(([word, meaning], index) => (
            <li key={word} data-ro-reveal data-ro-reveal-delay={index * 70}>
              <span className="pd-letter" aria-hidden="true">{word[0]}</span>
              <div><strong lang="en">{word}</strong><p>{meaning}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
