# InboxForge

Assistente pessoal de e-mail projetado para evoluir de leitura e organização para classificação, resumos, alertas e automações seguras.

## Estado Atual

Fundação técnica inicial conforme `specs/0001-project-foundation.md`.

Ainda não há integração com Gmail, Outlook, banco de dados, API HTTP ou IA.

## Requisitos

- Node.js 24 LTS
- pnpm 9.15.4

## Instalação

```bash
pnpm install
```

## Verificação

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Estrutura

```text
apps/
packages/
docs/
specs/
```

Agentes devem começar por `AGENTS.md` e pela spec ativa em `specs/`.
