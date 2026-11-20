param(
  [Parameter(Mandatory = $true)]
  [string]$OutputZip
)

$ErrorActionPreference = 'Stop'
$repo = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '../..')).Path
$catalog = Get-Content -Raw -LiteralPath (Join-Path $PSScriptRoot 'references/catalog.json') | ConvertFrom-Json
$output = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($OutputZip)
if (Test-Path -LiteralPath $output) { throw "Output already exists: $output" }
if ([IO.Path]::GetExtension($output) -ne '.zip') { throw 'The output path must end in .zip.' }
if (!(Test-Path -LiteralPath (Split-Path -Parent $output) -PathType Container)) { throw 'Create the output directory first.' }

$work = Join-Path $repo ('.build-tmp/clinic-kit-export-' + [Guid]::NewGuid().ToString('N'))
$bundle = Join-Path $work 'source'
$sourceZip = Join-Path $work 'baseline.zip'
New-Item -ItemType Directory -Path $work | Out-Null
$publicSource = @('app', 'lib', 'public', 'package.json', 'package-lock.json', 'next.config.mjs', 'AGENTS.md', '.env.example')
git -C $repo archive --format=zip "--output=$sourceZip" $catalog.revision -- $publicSource
if ($LASTEXITCODE -ne 0) { throw 'Unable to export the pinned source. Fetch the reference commit first.' }

Expand-Archive -LiteralPath $sourceZip -DestinationPath $bundle
$kits = Join-Path $bundle 'kits'
New-Item -ItemType Directory -Path $kits | Out-Null
$bundleKit = Join-Path $kits 'clinic-site'
New-Item -ItemType Directory -Path $bundleKit | Out-Null
$kitFiles = @('README.md','PRODUCTION-PROMPT.md','kit.mjs','export-kit.ps1','new-site.plan.example.json','reset-reference.plan.json','references')
foreach ($name in $kitFiles) {
  Copy-Item -LiteralPath (Join-Path $PSScriptRoot $name) -Destination $bundleKit -Recurse
}
@"
# 리셋 병원 홈페이지 제작 키트

1. kits/clinic-site/README.md — 제작·검수 순서와 실행 명령
2. kits/clinic-site/references/index.html — 기준 화면 12장과 섹션별 코드 위치
3. app/, lib/, public/ — 기준 커밋 $($catalog.revision)의 로컬 확인용 실제 소스와 이미지
4. kits/clinic-site/PRODUCTION-PROMPT.md — 여러 페이지를 한 번에 맡길 때 그대로 쓰는 지시문
"@ | Set-Content -LiteralPath (Join-Path $bundle 'START-HERE.md') -Encoding utf8
Compress-Archive -Path (Join-Path $bundle '*') -DestinationPath $output
Get-Item -LiteralPath $output | Select-Object FullName, Length
