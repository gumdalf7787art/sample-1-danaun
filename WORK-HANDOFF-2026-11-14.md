# 작업 인계 · 2026-11-14

이 문서는 최신 변경 사항을 기록한다. WORK-HANDOFF-2026-11-13.md의 브랜드 기준은 유지하되, 충돌하는 이전 화면 설명은 현재 소스와 이 기록을 우선한다.

## 저장소와 완료 상태
- 프로젝트: F:/병원 홈페이지/리셋재활의학과의원/reset-preview
- GitHub: gumdalf7787art/resetclinic / main
- 최신 기능 커밋: e9eb389 (원형 회복 흐름)
- 재배포 커밋: b514a40 (코드 변경 없는 배포 재시도)
- Cloudflare Workers Builds 성공 확인. Build ID: 39c9d834-4eff-4c5e-ae56-37f6d0e23f08
- 배포 Version ID: 4caf8426-de7a-459d-a3b3-a10a0e870a48
- 공개 /regen HTTP 200 및 recovery-beam-orbit 마크업 반영 확인.
- 기록 저장 커밋은 위 기능/배포 커밋 이후에 추가된다.

## 브랜드와 작업 원칙
- 딥 네이비 #0B1738, 원본 로고 #15B4A2 유지.
- 어두운 배경의 밝은 민트·틸 #82DCCB, 브론즈 #D4B18B.
- 밝은 배경 위 브론즈 #89633F. 본문 Pretendard, 제목 S-Core Dream.
- 절제된 제목 크기, 여백, 얇은 선, 은은한 움직임. 과도한 깜빡임 금지.
- 애니메이션은 HTML/CSS/SVG 중심. reduced-motion 지원 유지.
- 사용자 지속 지시: 수정 후 검증하고 커밋·푸시. 푸시와 배포 성공은 별개로 보고한다.
- 기존 구성 삭제 없이 추가하라는 범위를 존중한다. 현재 사용자 변경부터 확인한다.

## /regen 최근 수정
- 주요 파일: app/components/RegenOverview.js, app/components/RegenOverviewMotion.js, app/regen-overview.css.
- 비교 이미지 그룹은 폭75%, 이미지 aspect-ratio 3/2로 가로·세로 비례 축소.
- FAQ 왼쪽 제목은 div.ro-faq-heading: 전역 header 스타일 충돌 방지. PC sticky, 900px 이하 static. 질문20개 답변은 펼친 상태 유지.
- 원리와 근거/한계 섹션 제거. 해당 상담 사진 regen-evidence-consultation.webp는 스테로이드 설명 원칙 섹션 배경으로 이동.
- 정밀 평가 초음파 이미지 높이25% 확대: aspect-ratio 3/2에서6/5로 변경.
- 초음파 figure는 data-ro-reveal="right": 오른쪽48px에서1.5초 동안 부드럽게 등장.
- 재등장 관찰은 충분히 화면 밖으로 나간 뒤 재설정하여 경계에서 깜빡이지 않도록 유지.
- WHY REGEN 제목은 사용자 지정 예외: 굵기700, 파랑·밝은파랑·보라·연붉은색 오로라 그라데이션.

## 회복에는 시간이 걸립니다: 추가 원형 애니메이션
- 기존 네 단계 타임라인은 유지하고 바로 아래에 별도 도식 추가.
- 파일: app/components/RecoveryBeam.js 및 app/regen-overview.css의 recovery-beam 규칙.
- 가운데 환자 / 회복의 중심.
- 위 진료와 평가 → 오른쪽 치료 방법 선택 → 아래 정기 재평가 → 왼쪽 운동치료·생활 관리.
- 정사각형 도식, 중심으로부터 모두 반지름32% 거리. PC 최대500px 도식에서 네 박스 중심 거리160px.
- 중앙에서 뻗는 방사형 선은 제거. 박스 뒤로 반지름160의 SVG 원 연결선 배치.
- 민트·브론즈 그라데이션 빛이 시계 방향으로8초마다 연속 순환. 각 박스는2초 간격으로 해당 빛 도착 시 테두리/그림자가 은은하게 밝아짐.
- 네이비 패널과 중앙 환자 유지. 모바일도 정사각형, 작은 박스 폭 clamp(72px,23vw,90px).
- PC/390px 모바일 동일 거리 확인, 가로 넘침 없음. 최종 Next 빌드 성공.

## 배포 문제 기록
- 96f2f7d 배포는 Next/OpenNext 빌드와 자산 업로드 후 Cloudflare versions API code10013으로 실패했음. 코드 빌드 오류로 단정하지 않는다.
- 이후 재시도로 성공. 이번 b514a40도 GitHub check-runs API success 및 공개 사이트 반영까지 확인했다.
- Git 네트워크 작업은 실행 환경에 따라 safe.directory와 기존 credential.username 설정이 필요할 수 있다. 비밀 토큰을 출력하지 않는다.

## 다음 작업 시작
1. git status, 최신 로그와 실제 소스를 먼저 확인.
2. 최신 수정 범위를 좁혀 진행하며 기존 타임라인과 원형 도식은 사용자가 삭제 요청하기 전까지 유지.
3. 모바일·빌드 검증 후 커밋·푸시. 배포 문제 제기 시 Cloudflare 상태와 공개 사이트 반영을 함께 확인.

## RESET REGEN 상세페이지 제작 기준
최신 /regen 디자인·섹션 흐름·코드·애니메이션은 [RESET REGEN 상세페이지 제작 기준](docs/reset-regen-detail-design.md)을 따른다. 이 문서는 기준 소스 952be5c 이후 세부 페이지를 맞추는 데 사용한다.
