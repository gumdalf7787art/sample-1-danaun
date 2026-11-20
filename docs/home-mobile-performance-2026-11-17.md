# 메인 모바일 렌더링 성능 보완 — 2026-11-17

## 측정 기준
- Lighthouse 13.6.0 기본 모바일 설정, performance 카테고리, simulate throttling, Chrome headless.
- 공개 URL https://resetclinic.gumdalf7787.workers.dev/ 에서 수정 전후 각각 3회 연속 측정. Lighthouse가 매번 저장소를 초기화하며 브라우저 캐시를 공유하지 않는다.
- 이전 CDP 수동 네트워크 제한 측정과는 별개이며 사용자 제공 단일 73점과도 직접 동일 측정으로 간주하지 않는다.
- 원본 JSON과 Chrome Performance trace는 로컬 `.build-tmp/lh-before-*`, `.build-tmp/lh-after-*`에 보존한다.

## 수정 전
| 회차 | 성능 점수 | LCP(ms) | TBT(ms) |
| --- | --- | --- | --- |
| 1 | 77 | 2293.13 | 890 |
| 2 | 80 | 2302.417 | 640.5 |
| 3 | 75 | 3334.3035 | 643.5 |
| 중앙값 | 77 | 2302.417 | 643.5 |

첫 기록의 main-thread style/layout 합계는 약 3084ms, rendering 약 720ms, script evaluation 약 364ms다. Performance trace에서는 문서 전체 1264~1275개 레이아웃 객체를 대상으로 259.7ms, 149.7ms, 91.7ms 등의 배치 계산이 반복됐다. 초기 모션의 개별 위치 측정/스타일 쓰기 교차도 제거 대상으로 확인했다. 모든 지연을 자바스크립트 탓으로 판단하지 않는다.

## 적용
- 메인 하단 섹션 `content-visibility:auto`로 화면 밖 배치와 그리기 생략. 실제 모바일/PC 섹션 높이를 초기 추정치로 지정하고 렌더링 후 크기 기억. HTML, 텍스트, 링크는 서버 응답에 그대로 유지. 인쇄에서는 전체 내용 렌더링.
- 메인 스크롤 모션은 각 섹션이 화면 350px 근처에 들어올 때 준비. 위치를 한 번에 읽고 애니메이션 스타일을 변경하여 반복 강제 배치 방지. 상세페이지의 모션 동작은 유지.
- 기존 첫 히어로 반응형 preload, 우선순위 및 캐러셀 디자인 유지.
- 메인 진료 카드 10개의 기존 사진에 480/800px WebP 제공. 색상, 비율, 배치 유지. 원본 파일은 다른 페이지를 위해 보존.
- 유튜브 팝업 코드는 영상 카드 클릭 시 별도 로드. 서버 렌더링된 썸네일과 최신 영상 자동 갱신은 유지.

## 검증
프로덕션 빌드, 기존 테스트 10개, 360/390/1440px 스크롤과 가로 넘침, 이미지 로딩, 팝업 열기/닫기 및 본문 바로가기 점검. 공개 배포 후 동일한 Lighthouse 조건으로 결과를 추가 기록한다.

## 공개 배포 후 결과
동일 Chrome 157 / Lighthouse 13.6.0, 모바일 412×823·DPR 1.75, simulated 4× CPU slowdown, RTT 150ms / 1638.4Kbps로 측정했다. 각 실행의 설정과 요약 결과는 `home-mobile-performance-2026-11-17.json`에 저장했다. 측정 대상 코드는 `861280a`, 수정 전은 `94aec96`이다.

| 회차 | 성능 점수 | LCP(ms) | TBT(ms) | CLS |
| --- | --- | --- | --- | --- |
| 1 | 91 | 2300.975 | 284 | 0 |
| 2 | 91 | 2283.287 | 312 | 0 |
| 3 | 92 | 2463.722 | 221 | 0.00239 |
| 중앙값 | 91 | 2300.975 | 284 | 0 |

- 성능 중앙값 77 → 91. 기술 SEO 97점의 재산정이 아니라 Lighthouse 성능 점수다.
- LCP 중앙값 2.302 → 2.301초로 유지. 1ms 차이를 속도 개선으로 해석하지 않는다.
- TBT 중앙값 643.5 → 284ms, 약 56% 감소.
- Style & Layout 중앙값 3084 → 2032ms, 약 34% 감소.
- 실사용자의 INP 측정이 아닌 동일 환경의 모바일 모의 테스트다. 네트워크와 장치에 따라 수치는 변동할 수 있다.
- 하단 콘텐츠의 HTML/링크/문구를 제거하지 않았으며 검색 설정, 사이트맵과 대표 주소는 변경하지 않았다.

재측정 명령 예시 (PowerShell, 프로젝트 폴더에서 실행)

```powershell
$env:CHROME_PATH='C:/Program Files/Google/Chrome/Application/chrome.exe'
1..3 | ForEach-Object {
  npx --yes lighthouse@13.6.0 https://resetclinic.gumdalf7787.workers.dev/ --only-categories=performance --output=json --output-path=".build-tmp/lh-recheck-$_.json" --save-assets --chrome-flags="--headless --no-first-run" --quiet
}
```

각 JSON의 `runtimeError`가 없고 `categories.performance.score`가 유효한지 먼저 확인한다. LCP와 TBT는 각각 세 값의 중앙값으로 비교한다. 다른 빌드·테스트·브라우저 자동화를 동시에 돌리지 않는다.
