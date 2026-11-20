const steps = [
  ['성분', '주사에 어떤 성분을 사용하는지, 각 성분의 역할은 무엇인지 알려드립니다.'],
  ['목적', '현재 증상과 평가 결과를 바탕으로 해당 치료를 고려하는 이유를 설명합니다.'],
  ['대안과 주의점', '다른 치료 선택지와 예상되는 이득, 부작용과 주의사항을 함께 살펴봅니다.'],
  ['설명과 동의', '궁금한 점을 확인한 뒤, 설명을 이해하고 동의하시면 치료를 진행합니다.'],
];

export default function RegenConsentMarquee() {
  return (
    <div className="ro-consent-marquee">
      <div className="ro-consent-window" id="ro-consent-slider" role="region" aria-label="주사 성분 설명과 동의 절차" tabIndex={0}>
        <div className="ro-consent-track">
          {[false, true].map(duplicate => (
            <ol key={String(duplicate)} className="ro-consent-group" aria-hidden={duplicate || undefined}>
              {steps.map(([title, description], index) => (
                <li key={title}>
                  <small aria-hidden="true">{String(index + 1).padStart(2, '0')}</small>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          ))}
        </div>
      </div>
    </div>
  );
}
