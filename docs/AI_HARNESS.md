# AI Harness — InboxForge

## Objetivo

O harness define como agentes de IA podem trabalhar no repositório sem transformar autonomia em falta de controle.

Ele combina:

- especificações;
- primary agent;
- subagents especializados;
- skills reutilizáveis quando houver procedimento estável;
- permissões;
- testes;
- quality gates;
- revisão independente;
- limite de iterações;
- aprovação humana.

## Fonte de verdade

```text
spec ativa
↓
AGENTS.md
↓
docs especializados
↓
código existente
```

Nunca duplicar regras desnecessariamente em prompts temporários.

`AGENTS.md` é o contrato principal de papéis e limites. Este documento explica a arquitetura do harness e referencia os detalhes em vez de copiá-los.

## Conceitos

### Primary agent

Primary agent é o agente com quem o humano interage diretamente para conduzir o trabalho.

No InboxForge, o primary agent customizado é o Orchestrator.

### Subagent

Subagent é um especialista chamado pelo Orchestrator para uma etapa específica.

Subagents não substituem aprovação humana e não devem assumir responsabilidade fora do próprio papel.

### Skill

Skill é um procedimento ou conhecimento reutilizável carregado sob demanda.

Skill não representa cargo, responsabilidade ou autoridade. Não criar skill apenas para duplicar `AGENTS.md`, specs ou docs.

### Quality gate

Quality gate é evidência automatizada mínima exigida antes de considerar uma mudança pronta para avaliação humana.

Os comandos obrigatórios ficam definidos em `AGENTS.md`.

### Human approval

Human approval é a decisão final sobre aceitar, descartar, pedir mudanças, fazer merge ou avançar o trabalho.

Nenhum agente emite aprovação final de implementação.

## Papéis

### Orchestrator

Primary agent que coordena o fluxo e decide quais subagents entram em cada etapa.

O Orchestrator coordena. Ele não implementa, não altera testes, não revisa o próprio trabalho como etapa final e não aprova implementação.

Seu papel termina ao consolidar evidências, resultados dos agentes, quality gates e pendências para decisão humana.

### Spec Reviewer

Subagent que revisa especificações antes da implementação.

Não deve alterar arquivos.

### Architect

Subagent que analisa impacto e propõe fronteiras.

Não deve alterar implementação durante revisão arquitetural.

### Implementer

Subagent que executa a spec usando mudanças pequenas.

### Tester

Subagent que procura lacunas, casos negativos e falsos positivos.

### Reviewer

Subagent que analisa correção, manutenção e aderência à spec.

### Security Reviewer

Subagent que analisa segredos, OAuth, entradas não confiáveis, logs e ações perigosas.

## Pipeline conceitual

```text
Human
  ↓
Spec
  ↓
Spec Review
  ↓
Accepted
  ↓
Orchestrator (primary agent)
  ↓
Architect (se necessário)
  ↓
Implementer
  ↓
Automated Tests
  ↓
Tester
  ↓
Reviewer
  ↓
Security Reviewer
  ↓
Correções
  ↓
Quality Gates
  ↓
Human Approval
```

O Orchestrator deve chamar somente estes subagents via Task tool:

- spec-reviewer;
- architect;
- implementer;
- tester;
- reviewer;
- security-reviewer.

A configuração do OpenCode deve usar deny-by-default para `permission.task` quando possível.

## Separação de responsabilidade

Sempre que possível:

- quem implementa não faz a única revisão;
- reviewer não modifica código;
- security reviewer não modifica código;
- testes críticos não são reescritos automaticamente após falha.

## Critério para retry

Um novo ciclo só ocorre quando existe feedback concreto.

Não repetir prompt idêntico esperando resultado diferente.

## Limite

Máximo inicial:

```text
MAX_REVIEW_ITERATIONS=3
```

Depois:

```text
STOP
→ problema restante
→ tentativas realizadas
→ agentes envolvidos
→ testes/gates executados
→ decisão necessária
```

## Evidência de conclusão

O agente deve informar:

- arquivos alterados;
- comportamento implementado;
- testes criados/alterados;
- comandos executados;
- resultado dos gates;
- riscos ou pendências.

"Deve funcionar" não é evidência.

## Contexto

Agentes devem carregar somente o contexto necessário.

Antes de uma feature:

1. `AGENTS.md`;
2. spec ativa;
3. documentação especializada relevante;
4. arquivos de código diretamente relacionados.

Evitar despejar o repositório inteiro no contexto sem necessidade.

## Skills candidatas

Não há skills de projeto nesta rodada.

Possíveis skills futuras, se o procedimento estabilizar e não duplicar documentação existente:

- `spec-driven-development`: fluxo operacional reutilizável para conduzir specs aceitas;
- `tdd-cycle`: ciclo RED/GREEN/REFACTOR para comportamento testável;
- `security-review`: checklist reutilizável para revisão de segurança.

Enquanto essas regras já estiverem claras em `AGENTS.md`, `docs/DEVELOPMENT_WORKFLOW.md`, `docs/TESTING.md` e `docs/SECURITY.md`, elas devem continuar nesses documentos.

## Política de autonomia

Autonomia crescente deve ser conquistada.

Fases sugeridas:

```text
1. Plan only
2. Edit + test
3. Edit + test + review loop
4. PR automation
5. automações operacionais restritas
```

Nenhuma fase deve liberar publicação ou ação destrutiva por padrão.
