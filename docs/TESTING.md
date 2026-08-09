# Estratégia de Testes — InboxForge

## Filosofia

Testamos comportamento, contratos e riscos.

Cobertura percentual não substitui qualidade de teste.

## Pirâmide inicial

### Unitários

Para:

- regras de domínio;
- normalização;
- classificação baseada em regra;
- funções puras;
- idempotência.

### Integração

Para:

- adapters;
- persistência;
- integração com APIs usando ambientes controlados/mocks adequados;
- autenticação quando viável.

### E2E

Somente quando existir um fluxo relevante ponta a ponta.

## TDD

Ciclo:

```text
RED → GREEN → REFACTOR
```

Um agente nunca deve alterar o teste simplesmente porque a implementação falhou.

Alterar um teste existente exige uma destas justificativas:

- requisito mudou;
- teste estava incorreto;
- contrato foi explicitamente alterado.

## Casos negativos

Toda integração crítica deve considerar:

- timeout;
- credencial ausente;
- token expirado;
- resposta inválida;
- rate limit;
- payload parcial;
- duplicidade;
- indisponibilidade externa.

## Testes e provedores externos

Testes comuns não devem depender de:

- internet;
- Gmail real;
- Outlook real;
- modelo de IA real.

Testes contra serviços reais devem ser isolados e explicitamente acionados.

## Quality gates

Obrigatórios:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Futuros:

```bash
pnpm test:integration
pnpm test:e2e
```
