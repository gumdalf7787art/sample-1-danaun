# Cloudflare Workers 배포

Next.js를 OpenNext로 변환하여 Workers에 배포합니다. Pages의 Static HTML Export 설정은 사용하지 않습니다.

## 대시보드 입력값

| 항목 | 값 |
| --- | --- |
| GitHub 저장소 | gumdalf7787art/resetclinic |
| Production branch | main |
| Project name | resetclinic |
| Root directory | 저장소 루트 (기본값 유지) |
| Build command | npm run build:worker |
| Deploy command | npm run deploy:worker |
| Enable Preview builds | 초기에는 OFF |
| Protect with Cloudflare Access | 공개 홈페이지라면 OFF |
| Build 환경변수 NODE_VERSION | 22 |

Git 저장소의 루트에 package.json이 있으므로 로컬 폴더명 reset-preview를 Root directory에 입력하지 않습니다. 빌드는 잠금 파일에 고정된 의존성을 사용합니다. 배포 명령은 이미 생성된 산출물을 올리며 다시 빌드하지 않습니다.

## 실행

```sh
npm ci
npm run build:worker
npm run preview:worker
```

실제 배포는 대시보드 또는 인증된 환경에서 `npm run deploy:worker`로 수행합니다. 로컬 확인용 preview 명령을 대시보드의 Preview command에 입력하지 마세요.

`wrangler.jsonc`의 Worker 이름과 WORKER_SELF_REFERENCE 서비스 이름을 함께 유지합니다. `.open-next/worker.js`가 실행 파일이고 `.open-next/assets`가 정적 자산입니다. 둘 다 빌드 결과이므로 Git에서 제외됩니다.

## 초기 배포 범위

- 병원 소개·치료센터·재생치료·진료 안내·유튜브·인사이트 빈 목록 등 공개 화면 확인용입니다.
- production에서 로컬 회원/게시글 데이터는 사용하지 않습니다. 로그인·가입·관리자 API는 영구 인증 저장소 연결 전까지 503으로 차단합니다.
- D1/R2 리소스 생성, 바인딩, 실제 데이터 마이그레이션, 메일 발송, SNS 비밀키 및 콜백 주소 설정은 별도 작업입니다. 가짜 리소스 ID나 비밀키를 포함하지 않습니다.
- R2 기반 영구 ISR 캐시는 아직 사용하지 않습니다. 유튜브는 외부 응답과 내장 스냅샷을 사용하며 Workers에서 정확한 15분 영구 캐시를 보장하지 않습니다.
- SITE_INDEXING=false로 검색 색인은 차단됩니다. 정식 공개 시 콘텐츠 검토 후 SITE_URL을 최종 HTTPS 주소로 빌드와 런타임 양쪽에 설정하고 SITE_INDEXING을 true로 바꿔 다시 빌드합니다.

## 검증과 플랫폼

Node 22 이상을 사용합니다. OpenNext는 Windows 지원에 제한이 있으며 Linux CI 빌드를 권장합니다. 이 PC에서는 한글 경로의 Node 재귀 폴더 복사가 중단되어, 영문 경로에 소스와 동일한 package-lock.json을 복사해 검증합니다. 회원 데이터와 .env 파일은 검증 폴더로 복사하지 않습니다.

glob/minimatch overrides는 배포 도구의 간접 의존성 보안 수정 버전을 고정합니다. OpenNext 업데이트 시 이 고정의 필요성과 호환성을 다시 확인하세요.

2026-11-09 검증: 동일 소스의 OpenNext 빌드 완료, `wrangler deploy --dry-run` 통과(압축 번들 약 1.94 MiB), 로컬 workerd에서 공개 화면·자산·404·인증 차단 12개 응답 확인, 단위 테스트 9개 통과, npm audit 0건. HTTP 검증은 `node scripts/check-worker.mjs`로 재실행할 수 있습니다. 실제 Cloudflare 계정에 업로드한 결과는 아니며, 최초 Deploy 후 대시보드 로그와 배포 URL을 확인해야 합니다.

참고: https://opennext.js.org/cloudflare/get-started
