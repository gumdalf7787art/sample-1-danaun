# 리셋 홈페이지 작업 인계 — 2026-11-09

## 작업 위치와 운영 지침
- 앱/저장소: F:\병원 홈페이지\리셋재활의학과의원\reset-preview
- GitHub: https://github.com/gumdalf7787art/resetclinic.git / main
- 사용자의 지속 지침: 모든 수정 작업을 마친 뒤 검증하고 GitHub에 커밋·푸시한다.
- 브랜드: 딥 네이비 #0B1738 / 민트 #A4EAD9 / 흰색. 제목 S-Core Dream, 본문 Pretendard 유지.
- 기존 디자인과 내용은 요청한 범위만 변경. 의료 내용·금액·정책을 임의로 확정하지 않는다.
- AGENTS.md에 따라 Next.js 관련 로컬 문서를 읽고 수정한다.
- Next.js + OpenNext / Cloudflare Workers. 푸시와 실제 배포 성공은 별도로 확인한다.

## 현재 메인 순서
히어로 → 진료 공지 → 재생치료 → 원장님 소개 → 네 가지 진료 철학 → 주사 성분 설명 원칙 → 정밀 진단 → 회복 과정 → 유튜브 → 여섯 진료센터 → PRF·SVF 원리 → 병원 공간 → 인사이트 → 질문 → 방문 안내.
네 가지 진료 철학(Tensegrity / Movement / Stability / Recovery)은 원장님 소개와 한 묶음으로 취급하고 바로 아래에 유지한다.

## 완료된 디자인
- 재생치료: 세로 4:5 카드, 사진 하단에 제목·설명·바로가기. 리젠 주사는 장갑 낀 여성 의료진의 허리 주사 장면과 밝은 환자 피부 톤. PRF는 기존 피브린 망 기반 개념 이미지. 무릎 SVF도 여성 의료진의 장갑 낀 손.
- 재생치료 제목 첫 줄은 네이비, '회복의 시작.'은 민트 글자. 민트 밑줄은 제거.
- 원장님 소개: doctor-cutout.webp 투명 배경 인물. 인물만 14초 확대·복귀, 화면 밖에서는 정지. 배경은 옅은 민트·화이트와 아치.
- 원장 소개 제목과 네 가지 진료 철학, 재생치료 및 센터 항목은 화면 밖으로 나갔다 재진입하면 등장 애니메이션 반복.
- 정밀 진단: 초음파 / 움직임·자세 / 체형 분석의 이미지 카드 3장.
- 여섯 진료센터: 딥 네이비 배경, 흰색·민트 제목. PC 2열×3행, 모바일 1열. 사진과 글 영역 분리, 카드 전체 상세페이지 링크, 순차 등장·호버 확대.
- 회복 과정: 평가 → 치료 선택 → 경과 확인 → 재활 관리의 선이 순서대로 뻗고 도착한 점이 밝아지는 8초 무한 반복. 모바일은 세로 연결. 치료 선택 문구는 선 도착 시점(28%)에 살짝 흐려졌다 올라오며 재등장. 화면에 '모션그래픽' 용어를 표기하지 않는다.
- 유튜브: 쇼츠 제외 일반 영상 최신 5개 구조. 큰 썸네일 1개와 2×2 작은 썸네일 4개. 옅은 민트·화이트 배경, 별도 카드 제목을 제거하여 썸네일 위주. 클릭하면 모달, 더보기는 채널 새 탭.
- 썸네일: maxresdefault 우선 → sddefault → hqdefault → mqdefault 대체. HTTP 오류 및 120px 이하 플레이스홀더 감지. 16:9 cover로 양옆 빈 공간 제거. 브라우저에서 현 목록 5개 모두 1280×720 로드 확인.
- 모션 감소 환경은 정적인 표시 지원.

## 주요 소스와 자산
- app/components/HomePage.js: 섹션 순서와 카드
- app/components/HomeScrollMotion.js: 등장·재진입 효과
- app/regen-editorial.css: 재생치료·진단·원장·센터·회복 흐름 스타일
- app/components/YouTubeShowcase.js, app/youtube.css: 유튜브
- REGEN-PHOTO-ASSETS.md, CENTER-IMAGE-ASSETS.md: 생성 이미지 경로와 프롬프트
- public/images/doctor-cutout.webp, regen-injection-lumbar.webp, regen-prf-mesh.webp, regen-photo-04.webp, diagnosis-assessment-1~3.webp, center-care-1~6.webp
- F:\병원 홈페이지\리셋재활의학과의원\시안: 최근 스크린샷

## 검증과 마지막 상태
- 저장 요청 직전 구현 커밋: 87ebbf973706ce9e38fc21e41bdaf0ad11afc2ab (main 원격 일치 확인).
- 각 작업 npm run build 통과(39페이지), git diff --check 확인.
- 실제 HTML에서 regen→doctor, doctor→four-principles, diagnosis→journey→doctor-tv 인접 배치 확인.
- PC 이미지·유튜브 모달 열기 확인. 치료센터는 /mobile-preview의 모바일 iframe에서 1열 확인.
- 회복 흐름은 브라우저 CSS 변환값과 infinite 반복 확인. 최신 모든 변경의 모바일 실측을 전부 완료한 것은 아님.
- CUA viewport 변경이 일부 탭에 적용되지 않는 문제가 있었음. 모바일 확인 시 기존 /mobile-preview 페이지 사용 가능.
- Cloudflare 실제 배포 완료/공개 URL 접근은 이번 작업에서 별도로 검증하지 않음.

## 다음 작업에서 확인할 운영 항목
- 유튜브 피드가 stale 표시될 수 있음. 현재 UI는 확인일 2026-11-08 캐시 목록을 표시했으므로 최신 수집 성공은 별도 점검.
- D1/R2 바인딩·마이그레이션, 인증 영구 저장·메일 발송·OAuth 키/콜백, 기존 회원 이관·최초 관리자 지정은 과거 인계에서 미완료였음. 현재 소스를 확인한 뒤 이어갈 것.
- 최초 관리자는 SNS 가입 예정이며 이메일·기존 회원 자료는 사용자가 나중에 제공하기로 함.
- 정식 도메인·의료 내용·비급여·정책 최종 검토 및 검색 색인 전환도 실제 상태 확인 필요.

## Git 인증 참고
이 PC에서는 git safe.directory 예외와 credential.username=gumdalf7787art를 명령별로 지정하여 푸시했음. 전역 설정을 임의로 바꾸지 않는다. GitHub connector가 과거 404였더라도 CLI 푸시는 정상 동작했음.
