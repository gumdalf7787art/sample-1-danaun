# 메인 히어로 4개 슬라이드 (2026-11-09)

- 상단 별도 인증 바 제거, 기본 헤더 오른쪽에 AuthNav 배치. 데스크톱 카테고리 가운데 정렬. 높이 96→72px, 모바일 78→58px.
- 1번: RESET REGEN 중앙 카피, 세포 배경 8.5초 무한 왕복 줌·패닝.
- 2번: 첨부 시술 사진 기반 재구성 배경, 오른쪽 첨부 문구, 직접 작성한 SVG 월계수(수상 인증 의미 없음).
- 3번: 첨부 강연 배경만 참고한 재구성 이미지, 기존 건강 정보 카피. 후기 미사용.
- 4번: 기존 로비 사진과 이전 2번 진료 철학 카피.
- 큰 탭·화살표 제거. 마지막 요청의 4장에 맞춰 중앙 하단 점 4개. 4.25초 자동 전환, 점 선택 후에도 자동 재생 유지.
- 키보드 사용자를 위한 포커스 시 표시되는 정지 버튼, 본문 링크 포커스 동안 전환 정지. 모션 감소 설정 시 자동 전환·애니메이션 중지.
- 네 장 제목/본문 크기 통일. 로컬 Pretendard 사용(SIL OFL, public/fonts/LICENSE.txt).
- npm run build 통과, 데스크톱 및 모바일 390/320px 가로 넘침 없음. 네 배경 로딩, 네 장 동일 제목 글꼴·크기 확인.
- 작업 완료 후 검증하고 GitHub main에 커밋·푸시하는 방식으로 진행(사용자 요청).

## 자산 출처

- doctor.jpg: 사용자 제공 이고은 원장 프로필.
- doctor-lecture-2020-b.jpg: 사용자 사용 허용 기존 병원 홈페이지, 2020년 대한외과의사회 추계연수강좌.
  - 게시물: https://www.resetclinic.co.kr/shop_contents/myboard_read.htm?myboard_code=myboard3&idx=272763
  - 원본: https://www.resetclinic.co.kr/img_up/shop_pds/reset11/2021/42_11620718592.jpg
  - 실제 원본 600×450. 고해상도 대체 사진 수령 시 교체 권장.
- regen-cell-concept.webp: 내장 image_gen으로 생성한 콘셉트 이미지. 실제 현미경 사진/치료 결과가 아님. PNG 원본은 상위 시안 폴더, 웹용 WebP는 public/images에 저장.

## 생성 프롬프트

Create a wide cinematic website hero background, 16:9 landscape, premium medical editorial scientific concept illustration of cellular tissue repair. Deep midnight NAVY BLUE dominant (not teal or green), translucent pearl white cells and subtle pale mint connective fibers, softly lit extracellular matrix gently reconnecting. Elegant realistic microscopic-inspired 3D macro photograph aesthetic, no wounds, no blood, no needles, no person, no lettering or labels, no glowing magical effects, no before/after. Quiet dark negative space across central 55 percent for centered white HTML headline, cellular forms gently framing edges, beautiful soft depth of field. This is a conceptual background not clinical evidence. Save a usable project asset.


## 4개 슬라이드용 신규 이미지 (내장 image_gen)

- public/images/hero-procedure.webp (1942×809): 첨부 시술 배너 기반 AI 편집, 이미지 내 문구/장식 제거 및 배경 복원.
- public/images/hero-lecture.webp (1942×809): 첨부 강연 배너 기반 AI 편집, 후기/별점/문구 제거 및 배경 복원.
- 두 이미지 모두 실제 기록 사진과 구별해 화면 하단에 재구성 이미지로 표시. 최종 웹 자산은 저장소 내부에 저장.

### 시술 이미지 프롬프트
Edit this hospital banner into a clean photographic website background, wide 2.4:1. Preserve the same female physician identity, masked face glasses cap, treatment pose on LEFT, patient drape and C-arm room. REMOVE ALL text, logos, laurel, navigation dots and graphic overlays. Reconstruct obscured clinic background naturally. Right half should be subdued uncluttered room, usable for HTML text overlay. Sophisticated desaturated cool navy photographic grade, natural photographic lighting, not black. No text or symbols anywhere.

### 강연 이미지 프롬프트
Use case identity-preserve. Edit target this banner. Create clean wide 2.4:1 photographic hero BACKGROUND ONLY. Preserve the same Korean female physician's face identity, hair, white blouse, and speaking pose on RIGHT with lectern microphone. Remove ALL Korean and English texts, reviews, stars, buttons, dots and graphics. Reconstruct a refined medical lecture room background behind removed text, soft out of focus, large uncluttered dark navy space on LEFT for HTML overlay. No audience necessary, no event labels. Natural realistic physician photograph, subtle cool navy grade, no text or watermarks anywhere.

## 서체 조합 및 배경 모션 수정
- 메인 제목: 에스코어드림 6 Bold, 짧은 원장명 강조 7, 소제목 5. 본문·메뉴는 Pretendard 유지.
- 공식 OTF 원본 3종을 수정 없이 로컬 제공, font-display: swap. 출처 및 원본 라이선스 이미지를 public/fonts에 포함.
- 모든 히어로 배경에 활성 슬라이드 기준 동일한 줌인·패닝 적용. 4.25초 자동 롤링 유지, 모션 감소 설정 존중.

## 전환 연속성 보완
- 다음 장이 1.2초 동안 페이드인되는 동안 이전 장을 불투명하게 유지해 어두운 끊김을 방지. 이전 장의 배경 줌·글자 애니메이션은 전환 완료까지 유지. 비활성 장의 inert/aria-hidden 유지.
- 강연 배경은 데스크톱에서 화면 폭의 8% 왼쪽으로 이동하고 오른쪽 경계는 네이비로 부드럽게 연결. 모바일은 크롭 위치 91%로 인물을 중앙 쪽으로 이동.
