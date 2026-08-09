# Workflow de Desenvolvimento — InboxForge

## Fluxo padrão

```text
SPEC
↓
SPEC REVIEW
↓
ACCEPTED
↓
ORCHESTRATOR
↓
ARCHITECTURE REVIEW (quando necessário)
↓
IMPLEMENTATION
↓
AUTOMATED TESTS
↓
TEST REVIEW
↓
CODE REVIEW
↓
SECURITY REVIEW
↓
CORREÇÕES
↓
QUALITY GATES
↓
HUMAN APPROVAL
```

## 1. SPEC

Toda feature relevante começa em `specs/`.

A spec define:

- contexto;
- objetivo;
- fora de escopo;
- requisitos;
- critérios de aceitação;
- estratégia de testes.

Specs novas não devem entrar em implementação antes de uma revisão explícita.

Exceção: typos e ajustes puramente editoriais podem pular `SPEC REVIEW` quando não alteram escopo, requisito, arquitetura, teste ou comportamento.

## 2. SPEC REVIEW

Antes da implementação, o Spec Reviewer verifica:

- clareza do objetivo;
- escopo e fora de escopo;
- ambiguidades e contradições;
- critérios de aceitação;
- testabilidade;
- riscos de segurança;
- dependências implícitas;
- decisões arquiteturais não documentadas;
- edge cases importantes;
- overengineering.

Achados `BLOCKER` ou `HIGH` devem ser resolvidos antes da implementação.

## 3. ACCEPTED

A spec só entra em implementação quando estiver aceita para execução.

Vereditos possíveis do Spec Reviewer:

- `APPROVED` permite seguir;
- `APPROVED WITH NOTES` permite seguir com notas explícitas;
- `CHANGES REQUIRED` bloqueia implementação até revisão da spec.

## 4. ORCHESTRATOR

O Orchestrator é o primary agent que conduz o fluxo após a spec estar aceita.

Ele deve:

- identificar a spec ativa;
- confirmar status e escopo;
- decidir quais subagents são necessários;
- acompanhar resultados;
- controlar ciclos de correção;
- consolidar evidências para aprovação humana.

Ele não deve implementar código, alterar testes, executar comandos, aprovar implementação, fazer merge, push ou ações destrutivas.

## 5. PLAN

Antes de escrever código:

- localizar módulos envolvidos;
- identificar interfaces;
- listar arquivos provavelmente alterados;
- definir testes;
- identificar riscos.

O plano não deve inventar requisitos.

## 6. ARCHITECTURE REVIEW

Quando houver mudança estrutural relevante, acoplamento novo, pacote novo, integração externa ou decisão difícil de reverter, envolver o Architect antes do ciclo de implementação.

Quando necessário, registrar ADR em `docs/adr/`.

## 7. IMPLEMENTATION

O Implementer executa a spec aprovada em mudanças pequenas e testáveis.

Quando houver comportamento testável, a implementação deve preferir o ciclo:

```text
RED
↓
GREEN
↓
REFACTOR
```

### RED

Quando houver comportamento testável:

- criar teste;
- confirmar que falha pela razão esperada.

### GREEN

Implementar a menor mudança coerente que satisfaz o comportamento.

### REFACTOR

Melhorar:

- nomes;
- duplicação;
- fronteiras;
- legibilidade.

Sem alterar comportamento.

## 8. AUTOMATED TESTS

Durante a implementação, executar os testes relevantes para demonstrar o comportamento alterado.

Testes automatizados não substituem as revisões posteriores nem os quality gates finais.

## 9. TEST REVIEW

O Tester verifica:

- aderência dos testes à spec;
- casos negativos importantes;
- falsos positivos;
- lacunas de comportamento;
- testes frágeis ou acoplados à implementação.

## 10. CODE REVIEW

O Reviewer verifica:

- aderência à spec;
- edge cases;
- efeitos colaterais;
- código morto;
- dependências desnecessárias;
- manutenibilidade.

## 11. SECURITY REVIEW

Verificar:

- segurança;
- segredos;
- logs;
- entradas não confiáveis;
- OAuth e permissões quando aplicável;
- ações destrutivas ou externas;
- exposição de dados sensíveis.

## 12. CORREÇÕES

Correções devem ser orientadas por feedback concreto de testes, Tester, Reviewer ou Security Reviewer.

Não repetir prompt idêntico esperando resultado diferente.

## 13. QUALITY GATES

Executar:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## 14. HUMAN APPROVAL

Agentes podem implementar e revisar.

A decisão final continua humana, incluindo aceitar a implementação, pedir mudanças, fazer merge ou encerrar o trabalho.

O Orchestrator nunca pode emitir aprovação final de uma implementação. Seu papel termina ao consolidar evidências, resultados dos agentes, quality gates e pendências para decisão humana.

## Limite de loops automáticos

Nenhum harness deve corrigir/revisar indefinidamente.

Valor inicial:

```text
MAX_REVIEW_ITERATIONS=3
```

Após o limite:

- parar;
- apresentar o problema restante;
- listar tentativas realizadas;
- listar agentes envolvidos;
- listar testes/gates executados;
- solicitar decisão humana.

## Mudança fora de escopo

Não implementar.

Registrar como:

```text
FOLLOW-UP:
- descrição
- motivo
- impacto provável
```
