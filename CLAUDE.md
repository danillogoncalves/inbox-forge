# Claude Code — InboxForge

@AGENTS.md

## Regras específicas para Claude Code

- Trate `AGENTS.md` como a fonte principal de instruções do projeto.
- Leia a spec ativa antes de modificar código.
- Não reescreva `AGENTS.md` automaticamente.
- Para tarefas grandes, trabalhe primeiro em modo de planejamento.
- Não execute comandos destrutivos sem solicitação explícita.
- Antes de declarar a tarefa concluída, execute os quality gates exigidos por `AGENTS.md`.

## Harness nativo (`.claude/agents/`)

Este projeto tem um harness multiagente nativo do Claude Code em `.claude/agents/`,
equivalente ao harness do OpenCode em `.opencode/agents/`. Ambos seguem o mesmo pipeline
e os mesmos papéis definidos em `AGENTS.md` e `docs/AI_HARNESS.md` — não há regra
divergente entre as duas integrações, só formato de configuração diferente.

- `orchestrator` é o primary agent: rode `claude --agent orchestrator` para conduzir o
  pipeline SPEC → ... → HUMAN APPROVAL. Ele só pode delegar para `spec-reviewer`,
  `architect`, `implementer`, `tester`, `reviewer` e `security-reviewer`, e não edita
  código nem executa comandos.
- Os demais arquivos em `.claude/agents/` são subagents chamáveis pelo Orchestrator (ou
  diretamente, quando fizer sentido). Todos são somente leitura, exceto `implementer`.

Não use `.claude/agents/` para reescrever regras já cobertas por `AGENTS.md` — cada
arquivo deve referenciá-lo, não duplicá-lo.
