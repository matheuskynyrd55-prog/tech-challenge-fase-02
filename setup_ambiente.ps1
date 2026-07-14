#Requires -RunAsAdministrator

$ErrorActionPreference = 'Stop'

function Write-Step {
    param([string]$Message)
    Write-Host "`n==> $Message" -ForegroundColor Cyan
}

function Test-CommandExists {
    param([string]$Name)
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Install-WingetPackage {
    param(
        [string]$Id,
        [string]$Label,
        [string]$ExtraArgs = ''
    )

    Write-Step "Instalando $Label"

    $arguments = @(
        'install', '--id', $Id, '-e',
        '--accept-package-agreements',
        '--accept-source-agreements',
        '--source', 'winget'
    )

    if ($ExtraArgs) {
        $arguments += $ExtraArgs.Split(' ')
    }

    & winget @arguments
}

Write-Step 'Verificando winget'
if (-not (Test-CommandExists 'winget')) {
    throw 'winget não está disponível nesta máquina.'
}

Write-Step 'Instalando Git'
if (-not (Test-Path 'C:\Program Files\Git\cmd\git.exe')) {
    Install-WingetPackage -Id 'Git.Git' -Label 'Git' -ExtraArgs '--silent'
} else {
    Write-Host 'Git já está instalado.' -ForegroundColor Yellow
}

Write-Step 'Instalando Node.js LTS'
if (-not (Test-Path 'C:\Program Files\nodejs\node.exe')) {
    Install-WingetPackage -Id 'OpenJS.NodeJS.LTS' -Label 'Node.js LTS' -ExtraArgs '--silent'
} else {
    Write-Host 'Node.js já está instalado.' -ForegroundColor Yellow
}

Write-Step 'Instalando WSL'
$wslStatus = & wsl.exe --status 2>&1
if ($LASTEXITCODE -ne 0 -or ($wslStatus -join "`n") -match 'não está instalado|not installed') {
    & wsl.exe --install --no-distribution
    Write-Host 'WSL foi solicitado. Pode ser necessário reiniciar o Windows.' -ForegroundColor Yellow
} else {
    Write-Host 'WSL já está disponível.' -ForegroundColor Yellow
}

Write-Step 'Instalando Docker Desktop'
$dockerDesktopPath = 'C:\Program Files\Docker\Docker\Docker Desktop.exe'
if (-not (Test-Path $dockerDesktopPath)) {
    Install-WingetPackage -Id 'Docker.DockerDesktop' -Label 'Docker Desktop'
} else {
    Write-Host 'Docker Desktop já está instalado.' -ForegroundColor Yellow
}

Write-Step 'Resumo de versões'
if (Test-Path 'C:\Program Files\Git\cmd\git.exe') {
    & 'C:\Program Files\Git\cmd\git.exe' --version
}

if (Test-Path 'C:\Program Files\nodejs\node.exe') {
    & 'C:\Program Files\nodejs\node.exe' --version
}

if (Test-Path 'C:\Program Files\nodejs\npm.cmd') {
    & 'C:\Program Files\nodejs\npm.cmd' --version
}

if (Test-CommandExists 'wsl.exe') {
    & wsl.exe --status
}

if (Test-Path $dockerDesktopPath) {
    Write-Host 'Docker Desktop instalado em:' $dockerDesktopPath
}

Write-Step 'Próximos passos'
Write-Host '1. Reinicie o Windows se o WSL solicitar.'
Write-Host '2. Abra o Docker Desktop e conclua a configuração inicial.'
Write-Host '3. Abra um novo terminal e valide: git --version, node --version, npm --version, docker --version.'
Write-Host '4. Depois disso, o ambiente estará pronto para iniciar a API do Trabalho 2.'