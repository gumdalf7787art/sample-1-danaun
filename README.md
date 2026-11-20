# 리셋재활의학과의원

Next.js · React 기반 병원 홈페이지. 딥 네이비·화이트·민트 디자인과 모바일 레이아웃을 사용합니다.

## 개발 실행

```sh
npm ci
npm run dev
```

http://127.0.0.1:3100 에서 확인합니다. 빌드: `npm run build`.

## 구현 범위

- 메인, 원장 소개, 치료센터 6개, 정밀 진단, RESET REGEN 및 근거·연구
- 인사이트 목록·개별 글·관리자, 진료 안내, 비급여 및 정책 초안
- 이메일/아이디 로그인, 카카오·네이버 OAuth 연결 코드, 소유자·관리자 역할
- 닥터고은 일반 동영상 최신 5개, 모달 재생, 스크롤 애니메이션

## 운영 연결 상태

현재 검토용이며 기본 검색 색인은 차단됩니다. 실제 운영 전 의료진의 콘텐츠 검토와 정책·비급여 항목 확인이 필요합니다.

인사이트와 회원 정보는 개발 환경에서 `.local-data/`에 저장합니다. 이 데이터와 인증정보는 Git에 포함하지 않습니다. Workers용 OpenNext 배포 설정을 추가했으며 상세 절차는 [CLOUDFLARE.md](CLOUDFLARE.md)를 참고하세요. D1/R2 관련 코드·마이그레이션은 있지만 실제 연결은 아직 완료되지 않았습니다. 초기 production 배포에서는 인사이트를 빈 목록으로 제공하고 저장을 차단합니다. 회원 인증도 운영용 영구 저장소·메일 연동 전까지 차단됩니다. 이 제한을 제거하는 것만으로 회원·관리자 기능을 운영하지 마세요.

`.env.example`은 설정명 안내입니다. 실제 키는 환경변수로 별도 설정합니다. 최초 관리자는 자동 배정하지 않으며, 사용자가 지정한 SNS 가입 계정을 `scripts/designate-owner.mjs`로 지정합니다. 기존 회원 이전은 제공받을 데이터·비밀번호 저장 방식 확인 후 진행합니다.

유튜브는 채널의 일반 동영상 탭 최신순을 15분 캐시로 읽습니다. 연결 실패 시 확인일이 있는 스냅샷을 표시합니다. YouTube 데이터 구조 변경 시 파서 점검이 필요합니다.

## 검증

```sh
node --test tests/auth.test.mjs tests/insights.test.mjs tests/worker-storage.test.mjs
npm run build
npm run build:worker
```

## 자료 출처

병원 공간: https://www.resetclinic.co.kr/page/page3 (사용자 사용 허용). 로고·원장 사진은 사용자 제공 자료입니다. 원본 요청서와 회원 데이터는 저장소에 포함하지 않습니다.

폰트: Pretendard, SIL Open Font License. https://github.com/orioncactus/pretendard
