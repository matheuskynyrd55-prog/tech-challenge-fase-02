$ErrorActionPreference = 'Stop'

Write-Host '==> Installing dependencies'
npm.cmd install

Write-Host '==> Starting database container'
docker compose up -d db

Write-Host '==> Generating Prisma client'
npx.cmd prisma generate

Write-Host '==> Applying migrations'
npx.cmd prisma migrate dev --name init

Write-Host '==> Running tests'
npm.cmd test

Write-Host 'Bootstrap completed successfully.'
