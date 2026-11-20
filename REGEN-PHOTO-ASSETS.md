# 실사풍 카테고리 카드

## 2026-11-12 메인 히어로

첫 슬라이드 배경은 ImageGen으로 새로 제작했다. 강남세란의원 화면의 유리 질감을 참고했으며, 투명한 세포막과 대각선 DNA 이중나선을 딥 네이비 위에 배치하고 민트와 브라운을 더했다.

- PC 배경: `public/images/hero-regen-dna.webp` (1672×941)
- 모바일 배경: `public/images/hero-regen-dna-mobile.webp` (730×941)

프롬프트: Original 16:9 landscape hero background for RESET rehabilitation clinic. Photoreal macro studio image of a translucent glass DNA double helix with clearly recognizable paired rungs on the right half, rising diagonally through a cluster of three overlapping translucent cell-like vesicles with thin iridescent membranes and tiny suspended bubbles. Distinct layered composition, dark midnight navy #0B1738 background, mint #A4EAD9 refraction and warm muted bronze brown #C39A73 along glass edges. Place the visual center at x=66%, keep left half clean and dark for white text. High-end medical editorial lighting, smooth gradients and optical clarity. No circular petri dish, no words, no branding, no people, no website mockup.

## 2026-11-09 추가 수정

- 리젠 주사: `public/images/regen-injection-lumbar.webp` (800×1000), 허리 주사 장면의 AI 실사풍 예시.
- PRF: `public/images/regen-prf-mesh.webp` (800×1000), 기존 `regen-category-03.webp`의 피브린 망을 기반으로 만든 개념 이미지.
- 제목은 브랜드 네이비 `#0B1738`, 강조 밑줄은 브랜드 민트 `#A4EAD9`. 흰 배경의 글자 대비를 유지한다.
- 제목·카드·카드 제목은 화면에서 벗어난 후 재진입할 때 다시 나타난다. 모션 감소 설정에서는 애니메이션을 생략한다.
- Next.js 빌드 통과. PC 1440px 및 모바일 390px 레이아웃 확인, 가로 넘침 없음.

### 허리 주사 생성 프롬프트
Photorealistic medical editorial photograph, vertical 4:5 card. Close-up of a clinician wearing blue sterile gloves administering a small syringe injection into the lumbar lower back of an adult patient lying prone on a treatment bed. Only small lower back area exposed, rest modestly covered by navy clinical drape; no face, buttocks or intimate body parts. One gloved hand stabilizes skin, other holds syringe touching skin with needle tip subtly inserted, realistic anatomy and clinical handling. Natural soft clinical lighting, no blood, no gore, no illustration, no 3D, no text, no labels. Treatment action in upper 55 percent, bottom fades to quiet deep navy negative space for HTML copy. Generic illustrative scene, not documentary evidence or specific procedure claims.

### PRF 편집 프롬프트
Adapt this existing PRF conceptual image to a vertical 4:5 website card. Preserve its elegant ivory fibrin mesh and pearl platelet-like particles against deep NAVY blue, same delicate organic network style and palette. Keep detailed mesh concentrated in upper 60 percent; extend bottom into quiet deep navy space for HTML title. No text, no labels, no forceps, no dish, no blood, no new objects. This is a conceptual scientific illustration not an actual micrograph.

## 최초 제작 기록

내장 image_gen으로 제작한 실사풍 예시이며 실제 병원 촬영 사진이 아님. 화면에 생성 이미지임을 표시.
웹용 자산: public/images/regen-photo-01.webp ~ regen-photo-04.webp (각 800×1000).
정사각형 대비 세로 25% 증가(4:5). 제목·설명·바로가기는 이미지 하단 HTML 오버레이. PC 4열, 태블릿 2열, 모바일 1열.
빌드 및 1440px·390px·320px 화면 확인. 글자 잘림과 가로 넘침 없음.

## 생성 프롬프트

### 1
Photorealistic editorial medical photograph for a premium Korean rehabilitation clinic website. Vertical 4:5 composition. Real camera, natural material imperfections, soft window lighting, subtle cool navy color grade. Subject in upper 60 percent, bottom 40 percent quiet dark navy out-of-focus negative space for later HTML text. NO lettering, NO logos, NO illustration, NO 3D rendering, NO floating cells, NO glowing, NO ribbons, NO diagram, NO collage. Close-up of a clinician's pale blue nitrile gloved hand preparing a sterile syringe beside one unbranded small transparent vial on a stainless steel medical tray in a real treatment room. Capped needle, no injection into person, no blood. Real clinical equipment photograph.

### 2
Photorealistic editorial medical photograph for a premium Korean rehabilitation clinic website. Vertical 4:5 composition. Real camera, natural material imperfections, soft window lighting, subtle cool navy color grade. Subject in upper 60 percent, bottom 40 percent quiet dark navy out-of-focus negative space for later HTML text. NO lettering, NO logos, NO illustration, NO 3D rendering, NO floating cells, NO glowing, NO ribbons, NO diagram, NO collage. Macro documentary photograph of a blue nitrile gloved hand holding one clear capped centrifuge blood sample tube with distinct pale golden plasma upper layer and subdued dark red lower layer, real laboratory centrifuge softly blurred in background. Tube unlabelled, realistic small size, no text. Laboratory preparation concept.

### 3
Photorealistic editorial medical photograph for a premium Korean rehabilitation clinic website. Vertical 4:5 composition. Real camera, natural material imperfections, soft window lighting, subtle cool navy color grade. Subject in upper 60 percent, bottom 40 percent quiet dark navy out-of-focus negative space for later HTML text. NO lettering, NO logos, NO illustration, NO 3D rendering, NO floating cells, NO glowing, NO ribbons, NO diagram, NO collage. Macro documentary photograph of a small pale yellow fibrin clot being gently held with sterile metal forceps above a clear glass laboratory dish on a blue sterile drape, blue gloved hand partly visible at upper edge, real clinical laboratory counter. A tangible moist fibrin specimen, not microscopic strands or synthetic web. No gore. No text.

### 4
Photorealistic editorial medical photograph for a premium Korean rehabilitation clinic website. Vertical 4:5 composition. Real camera, natural material imperfections, soft window lighting, subtle cool navy color grade. Subject in upper 60 percent, bottom 40 percent quiet dark navy out-of-focus negative space for later HTML text. NO lettering, NO logos, NO illustration, NO 3D rendering, NO floating cells, NO glowing, NO ribbons, NO diagram, NO collage. Authentic clinical close-up photograph of an adult patient's bare knee being assessed by a clinician wearing blue nitrile gloves in a rehabilitation examination room. Hands gently supporting side of knee, plain navy shorts, knee naturally bent, only knee and hands visible, no face, no needle, no surgery, no anatomical cutaway, no glowing. Clinical knee evaluation concept.


## 여성 의료진 손 수정 및 진단 카드 (2026-11-09)

내장 image_gen 사용. 기존 리젠 주사와 무릎 이미지를 편집하고, 진단 카드 3장을 새로 생성했다. 모두 800×1000 WebP로 저장했다. 실제 이고은 원장 촬영 사진으로 표시하지 않는다.

- public/images/regen-injection-lumbar.webp
- public/images/regen-photo-04.webp
- public/images/diagnosis-assessment-1.webp
- public/images/diagnosis-assessment-2.webp
- public/images/diagnosis-assessment-3.webp

제목 최종 색상: 첫 줄 #0B1738, 회복의 시작 #A4EAD9. 이전 민트 밑줄은 제거.
검증: Next 빌드 39페이지 완료, 데스크톱 1280px에서 이미지·카피·링크 표시 확인. 이번 브라우저의 viewport 설정이 적용되지 않아 모바일 실측 재검증은 하지 못함. 모바일 1열 CSS 유지.

### 최종 생성·편집 프롬프트
1. Edit this image only: replace clinician arms and hands with a female physician's slender hands and smooth slender forearms, wearing properly fitted blue medical gloves. Keep both hands anatomically realistic and the lumbar injection action unchanged. Brighten patient's exposed lower back skin naturally with soft clinical lighting. Preserve 4:5 framing, navy drape, bottom navy negative space, syringe and room. Photorealistic illustrative scene, no text, no face, no blood.
2. Edit this photo: the clinician is a female doctor. Replace both hands with smaller slender female hands wearing fitted blue medical examination gloves, slender wrists in white coat sleeves. Keep realistic five-finger anatomy and professional gentle knee examination pose. Preserve patient knee, navy shorts, clinical room, vertical 4:5 composition, dark navy empty lower area. Photorealistic, no text, no face, no illustration.
3. Photorealistic editorial photograph for Korean rehabilitation clinic, vertical 4:5. Close-up female clinician's blue gloved hand holding an ultrasound probe on adult patient's shoulder, realistic ultrasound equipment blurred behind. White coat sleeve, navy and cool white clinical palette, soft daylight, no face, no text or labels, no logo, no blood. Subject upper two thirds, quiet dark navy gradient at bottom for HTML caption. Illustrative medical assessment scene, elegant premium photographic quality.
4. Photorealistic editorial photograph for Korean rehabilitation clinic, vertical 4:5. Female rehabilitation physician in white coat observing an adult patient in modest navy sportswear performing a shallow squat for movement assessment, side view in bright uncluttered rehabilitation room. Natural professional interaction, realistic anatomy and proportions, no identifiable specific person. Soft daylight, deep navy and cool white palette. Composition upper two thirds, bottom fades subtly to deep navy for HTML caption. No text, logos, graphics or illustration.
5. Photorealistic editorial photograph for Korean rehabilitation clinic, vertical 4:5. Female clinician in white coat assessing standing adult patient's shoulder and pelvic alignment from behind, patient fully clothed in light gray fitted T-shirt and navy trousers, professional modest posture assessment in a bright clean clinical room. Hands gently indicating shoulder alignment, no measuring text or charts, no identifiable person. Cool white and navy palette, soft natural lighting, photo not illustration. Subjects in upper two thirds with deep navy fade in lower part for HTML caption. No text, logo or watermark.

## 원장 소개 배경 제거 (2026-11-09)

내장 image_gen 편집. 원본 public/images/doctor.jpg를 유지하고 투명 알파를 가진 public/images/doctor-cutout.webp (731×1200)를 별도 저장했다.
프롬프트: Background extraction only. Remove the entire white and gray photographic background and all objects behind the woman, including microphone. Isolate ONLY this exact female physician on a genuinely transparent alpha background. Preserve her identity, exact face, hair, expression, crossed-arm pose, white coat, clothing, and body proportions unchanged. Do not beautify, redraw or change her face. Preserve fine hair edges and white coat edges cleanly. Same portrait framing, no added text, shadow, objects or background.

배경은 사진 대신 민트·화이트 그라데이션과 얇은 아치. 인물만 14초간 0.96→1.025 배율로 확대 후 부드럽게 복귀한다. 화면 밖에서는 정지한다. 제목은 두 줄 순차 상승·페이드, 재진입 시 반복한다. 모션 감소 환경에서는 애니메이션 생략.
검증: 투명 알파 확인, Next 빌드 성공, 브라우저에서 인물 확대 running 및 변환값 확인, 1280px 화면 가로 넘침 없음.
