# InboxForge — Start Here

Este arquivo é o ponto de entrada humano para iniciar o projeto.

## Objetivo desta etapa

Criar somente a fundação do repositório, com:

- Git;
- Node.js + TypeScript;
- pnpm;
- Vitest;
- ESLint;
- Prettier;
- quality gates;
- documentação para agentes;
- CI;
- primeiro smoke test.

**Não integrar Gmail ainda.**

A integração com Gmail começa somente depois que a fundação estiver verde.

---

## 1. Criar o repositório

```bash
mkdir inbox-forge
cd inbox-forge

git init
git branch -M main
```

Copie para a raiz do repositório os arquivos deste kit.

A estrutura inicial de documentação deverá ficar assim:

```text
inbox-forge/
├── AGENTS.md
├── CLAUDE.md
├── START_HERE.md
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── AI_HARNESS.md
│   ├── DEVELOPMENT_WORKFLOW.md
│   ├── SECURITY.md
│   ├── STACK.md
│   └── TESTING.md
│
├── specs/
│   └── 0001-project-foundation.md
│
└── .opencode/
    └── agents/
        ├── architect.md
        ├── implementer.md
        ├── reviewer.md
        ├── security-reviewer.md
        └── tester.md
```

---

## 2. Primeiro contato com o agente

Antes de permitir qualquer alteração, peça ao agente para **somente ler e planejar**.

Prompt sugerido:

```text
Leia AGENTS.md, START_HERE.md, docs/ e specs/0001-project-foundation.md.

Não altere nenhum arquivo ainda.

Explique:
1. o objetivo da Spec 0001;
2. a arquitetura pretendida;
3. os quality gates;
4. a ordem exata em que você implementaria a fundação;
5. quaisquer inconsistências ou riscos que encontrou.

Pare após apresentar o plano.
```

A intenção é verificar se o agente entendeu o contrato antes de escrever código.

---

## 3. Aprovar o plano

Revise o plano.

Se estiver coerente, use:

```text
Implemente somente a Spec 0001.

Siga AGENTS.md e docs/DEVELOPMENT_WORKFLOW.md.

Trabalhe em ciclos pequenos.
Use TDD onde houver comportamento testável.
Não implemente Gmail, Outlook, banco ou integração com IA.

Antes de terminar, execute todos os quality gates definidos no projeto.
Se algum gate falhar, corrija a implementação — não enfraqueça os testes.
```

---

## 4. O que o agente deverá criar

A Spec 0001 deverá resultar aproximadamente nesta base:

```text
inbox-forge/
├── apps/
│   ├── api/
│   │   └── src/
│   └── worker/
│       └── src/
│
├── packages/
│   ├── core/
│   ├── gmail/
│   ├── outlook/
│   ├── ai/
│   ├── rules/
│   ├── storage/
│   ├── scheduler/
│   ├── logger/
│   └── shared/
│
├── docs/
├── specs/
├── tests/
├── scripts/
├── docker/
├── .github/
│   └── workflows/
│
├── .opencode/
│   └── agents/
│
├── AGENTS.md
├── CLAUDE.md
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
├── eslint.config.js
├── prettier.config.js
├── vitest.config.ts
├── .gitignore
└── .env.example
```

Não é necessário criar código artificial em todos os pacotes só para ocupar a árvore.

---

## 5. Quality gates obrigatórios

Ao final da fundação, estes comandos devem existir e passar:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

O CI deverá executar os mesmos gates.

---

## 6. Primeiro commit

Somente depois de tudo verde:

```bash
git status
git add .
git commit -m "chore: bootstrap InboxForge foundation"
```

Antes do commit, confira que não existem:

- `.env`;
- tokens;
- credenciais;
- segredos;
- arquivos temporários;
- dumps de e-mail.

---

## 7. Próxima etapa

Depois que a Spec 0001 estiver concluída:

```text
specs/0002-gmail-oauth.md
```

A Spec 0002 deverá introduzir autenticação Gmail em modo seguro e ainda sem automação destrutiva.

Não pule para classificação com IA antes de termos:

1. autenticação;
2. leitura;
3. normalização;
4. idempotência;
5. testes.
