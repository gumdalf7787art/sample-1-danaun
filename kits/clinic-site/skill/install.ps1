param(
  [Parameter(Mandatory = $true)]
  [string]$KitArchive,
  [string]$SkillRoot = $(if ($env:CODEX_HOME) { Join-Path $env:CODEX_HOME 'skills' } else { Join-Path $env:USERPROFILE '.codex/skills' })
)

$ErrorActionPreference = 'Stop'
$name = 'hospital-website-production'
$source = Join-Path $PSScriptRoot $name
$archive = (Resolve-Path -LiteralPath $KitArchive).Path
$root = (Resolve-Path -LiteralPath $SkillRoot).Path
$destination = Join-Path $root $name
if (Test-Path -LiteralPath $destination) { throw "Skill already exists at $destination." }

Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead($archive)
try {
  $entries = @($zip.Entries.FullName | ForEach-Object { $_.Replace('\','/') })
  foreach ($required in @(
    'kits/clinic-site/kit.mjs', 'kits/clinic-site/README.md',
    'kits/clinic-site/references/catalog.json', 'kits/clinic-site/references/index.html',
    'kits/clinic-site/references/metrics.json', 'app/components/RegenOverview.js'
  )) {
    if ($required -notin $entries) { throw "Invalid clinic kit, missing $required." }
  }
} finally { $zip.Dispose() }

New-Item -ItemType Directory -Path $destination | Out-Null
New-Item -ItemType Directory -Path (Join-Path $destination 'assets') | Out-Null
Copy-Item -LiteralPath $archive -Destination (Join-Path $destination 'assets/reset-clinic-kit.zip')
Copy-Item -LiteralPath (Join-Path $source 'agents') -Destination $destination -Recurse
Copy-Item -LiteralPath (Join-Path $source 'SKILL.md') -Destination $destination
Get-Item -LiteralPath (Join-Path $destination 'SKILL.md') | Select-Object -ExpandProperty FullName
