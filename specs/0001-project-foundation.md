# Spec 0001 — Project Foundation

Status: Accepted

## Contexto

InboxForge será desenvolvido com agentes de IA participando de planejamento, implementação e revisão.

Antes de qualquer integração externa, precisamos de uma fundação previsível, testável e reproduzível.

## Objetivo

Criar o esqueleto técnico inicial do projeto com quality gates funcionando localmente e em CI.

## Dentro do escopo

- pnpm workspace;
- Node.js + TypeScript + ESM;
- TypeScript strict mode;
- Vitest;
- ESLint;
- Prettier;
- scripts padronizados;
- estrutura inicial de apps/packages;
- `.gitignore`;
- `.env.example`;
- GitHub Actions CI;
- pelo menos um smoke test;
- documentação mínima de execução.

## Fora de escopo

Não implementar:

- Gmail OAuth;
- leitura de e-mails;
- Outlook;
- banco de dados real;
- ORM;
- Docker runtime;
- IA;
- API HTTP;
- scheduler;
- webhooks;
- regras de classificação.

Diretórios podem ser preparados quando útil, mas não criar implementação fictícia.

## Requisitos funcionais

### RF-01

`pnpm install` deve instalar o workspace.

### RF-02

Deve existir comando:

```bash
pnpm lint
```

### RF-03

Deve existir comando:

```bash
pnpm typecheck
```

### RF-04

Deve existir comando:

```bash
pnpm test
```

### RF-05

Deve existir comando:

```bash
pnpm build
```

### RF-06

A suite de testes deve conter ao menos um teste real de bootstrap/smoke.

### RF-07

GitHub Actions deve executar os quatro quality gates.

## Requisitos não funcionais

### RNF-01

TypeScript deve usar strict mode.

### RNF-02

O repositório não pode conter credenciais reais.

### RNF-03

A instalação deve ser reproduzível usando lockfile.

### RNF-04

O projeto deve manter ESM de forma consistente.

### RNF-05

O README deve explicar como instalar e verificar o projeto.

## Critérios de aceitação

A spec está concluída quando:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

executarem com sucesso em ambiente limpo compatível.

Além disso:

- CI existe;
- smoke test passa;
- `.env` está ignorado;
- `.env.example` não contém segredo;
- nenhuma feature externa foi implementada.

## Estratégia de testes

O smoke test deve provar que a infraestrutura de testes executa corretamente.

Evitar:

```ts
expect(true).toBe(true)
```

se já for possível testar um pequeno módulo real da fundação.

Se não existir nenhum comportamento real ainda, um smoke test temporário é aceitável, desde que documentado para remoção posterior.

## Plano de implementação sugerido

1. inicializar pnpm;
2. criar workspace;
3. configurar TypeScript;
4. configurar lint;
5. configurar formatter;
6. configurar Vitest;
7. criar estrutura mínima;
8. criar smoke test;
9. criar scripts;
10. rodar gates localmente;
11. configurar CI;
12. atualizar README;
13. revisar segurança;
14. rodar gates novamente.
