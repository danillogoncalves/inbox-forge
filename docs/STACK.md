# Stack — InboxForge

## Base

- Node.js
- TypeScript
- ESM
- pnpm workspaces

## Qualidade

- Vitest
- ESLint
- Prettier
- TypeScript strict mode

## Persistência

Produção pretendida:

- PostgreSQL

Desenvolvimento inicial pode utilizar uma alternativa local se uma spec justificar.

## Infraestrutura

Fase inicial:

- execução local.

Evolução:

- Docker;
- Docker Compose;
- ambiente de nuvem/VPS quando execução 24/7 fizer sentido.

## CI

GitHub Actions.

Pipeline mínimo:

```text
install
→ lint
→ typecheck
→ test
→ build
```

## Princípio de dependências

A stack é uma decisão consciente, não uma lista obrigatória de pacotes.

Não instalar:

- framework web antes de existir endpoint;
- ORM antes de existir persistência;
- fila antes de existir necessidade de fila;
- biblioteca de IA antes da spec de IA;
- SDK Outlook antes da spec de Outlook.
