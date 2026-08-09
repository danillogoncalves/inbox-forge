---
name: creating-commits
description: Use when the user asks to criar commit, fazer commit, gerar commit, commitar, commit changes, create a commit, or prepare a git commit message. Also use before running git commit or proposing a commit message. Do NOT use for general code review, branch cleanup, or changelog writing unless a commit is being created.
license: CC-BY-4.0
metadata:
  author: danillogoncalves
  version: 1.0.0
---

# Creating Commits

Use this skill to create clear Portuguese Conventional Commits that start with the required type emoji, represent one logical change, and do not include AI attribution.

## Execution Through Restricted Orchestrators

When this skill is explicitly invoked by the user, that invocation constitutes authorization to create the commit according to this skill's rules.

If the current agent does not have Bash or sufficient Git permissions:

1. Do not expand the Orchestrator permissions.
2. Do not try to bypass the restrictions.
3. Delegate execution to the `implementer` subagent.
4. The `implementer` must follow this skill in full.
5. The `implementer` may execute only the Git operations necessary for the commit.
6. Do not automatically run push, merge, rebase, reset, clean, force-push, branch deletion, or history rewriting.
7. After the commit, return the commit hash, message, branch, and remaining status to the Orchestrator.

Authorization for `/creating-commits` applies to Git inspection, necessary staging, necessary verification, and `git commit`.

Authorization for `/creating-commits` does not automatically apply to `git push`.

## Instructions

### Step 1: Inspect Before Committing

Before creating a commit, inspect the repository state with non-interactive git commands: `git status`, `git diff`, and `git log --oneline -10`.

Stage only the files intended for the commit. If the worktree contains unrelated changes, do not revert them and do not include them silently. Ask the user how to split or exclude them unless the requested commit scope is already unambiguous.

Expected output: you know exactly which logical change will be committed and which files are included.

### Step 2: Enforce One Logical Change

Each commit represents one logical change. If the staged or requested changes include multiple independent changes, split them into multiple commits or ask the user which one to commit first.

Do not use vague scopes like "tudo", "alteracoes", "pendencias", or "updates" to hide unrelated work.

Expected output: the commit message describes one concrete change.

### Step 3: Choose The Type

Pick the type that matches the change:

| Type | Use for |
| --- | --- |
| `feat` | nova funcionalidade |
| `fix` | correcao de bug |
| `docs` | documentacao |
| `test` | testes |
| `build` | build ou dependencias |
| `perf` | performance |
| `style` | formatacao sem mudar comportamento |
| `refactor` | refatoracao sem mudar regra de negocio |
| `chore` | tarefas internas ou configuracoes |
| `ci` | integracao continua |
| `raw` | dados ou configuracoes especificas |
| `cleanup` | limpeza de codigo |
| `remove` | remocao de arquivos ou funcionalidades |

When uncertain between two types, prefer the type that reflects the user-visible or behavioral impact. For example, use `fix` for a bug correction even if the code was also refactored.

### Step 4: Write The Message

Use this format:

```text
emoji tipo: verbo no infinitivo
```

Rules:

- Every commit message must start with the emoji that represents its type.
- Keep the conventional type after the emoji, such as `✨ feat: adicionar login`.
- Use Portuguese.
- Start the description with a verb in the infinitive, such as `adicionar`, `corrigir`, `atualizar`, `remover`, `melhorar`, `ajustar`, `validar`, or `centralizar`.
- Keep the first line short, preferably up to 4 words after the type.
- Be clear and specific.
- Do not add `Co-authored-by`, automatic signatures, AI mentions, Claude, ChatGPT, or similar attribution.

Required emoji mapping:

| Emoji | Type |
| --- | --- |
| `✨` | `feat` |
| `🐛` | `fix` |
| `📚` | `docs` |
| `🧪` | `test` |
| `🏗️` | `build` |
| `⚡` | `perf` |
| `💄` | `style` |
| `♻️` | `refactor` |
| `🔧` | `chore` |
| `👷` | `ci` |
| `🗃️` | `raw` |
| `🧹` | `cleanup` |
| `🗑️` | `remove` |

Good examples:

```text
✨ feat: adicionar login
🐛 fix: corrigir validacao
📚 docs: atualizar readme
♻️ refactor: melhorar estrutura
🧹 cleanup: remover duplicacao
```

Bad examples:

```text
update
fix bug
chore: atualiza alteracoes
chore: tudo que mudou
feat: adicionar login
```

### Step 5: Add Body Only When Useful

Use a body only when the first line is not enough to explain what changed and why. Keep it factual.

```text
🐛 fix: corrigir validacao

O erro ocorria ao validar dominios com subniveis.
```

Use a footer only for real metadata such as task references or reviews:

```text
Refs #123
Reviewed-by: Nome Sobrenome
```

Do not invent references or reviewers.

### Step 6: Commit Safely

Run verification relevant to the changes before committing when feasible. If verification cannot run, say why.

Use a non-interactive commit command. For a one-line message:

```bash
git commit -m "🐛 fix: corrigir validacao"
```

For a message with body or footer:

```bash
git commit -m "🐛 fix: corrigir validacao" -m "O erro ocorria ao validar dominios com subniveis."
```

## Trigger Examples

### User says: "crie um commit"

Actions: inspect status, diff, and recent log; determine the logical change; stage intended files only; choose a valid type; commit with a short Portuguese infinitive description.

Result: `emoji tipo: verbo no infinitivo` with no AI attribution.

### User says: "faz um commit com tudo"

Actions: inspect all changes first. If they are one logical change, commit them. If they are unrelated, ask how to split instead of creating a vague commit.

Result: no `chore: atualiza alteracoes pendentes` style messages.

### User asks: "qual mensagem de commit usar?"

Actions: infer the logical change from context or diff, then propose only messages that follow this skill.

Result: short valid options such as `🐛 fix: corrigir autenticacao` or `📚 docs: atualizar guia`.

## Red Flags

Stop and fix the message when you notice:

- The message has no allowed type.
- The message does not start with the required emoji for its type.
- The verb is conjugated instead of infinitive, such as `atualiza`, `corrigido`, or `adicionado`.
- The description is generic, such as `update`, `fix bug`, `coisas`, `alteracoes`, or `pendencias`.
- The commit includes unrelated changes.
- The message includes coauthorship, AI attribution, or automatic signatures.
- You are about to commit without inspecting `git status` and `git diff`.

## Common Mistakes

| Mistake | Fix |
| --- | --- |
| `chore: atualiza alteracoes` | Add the required emoji and use a concrete infinitive action, such as `🔧 chore: atualizar config` or another type that matches the change |
| `fix bug` | Add emoji, type, and specific infinitive description, such as `🐛 fix: corrigir login` |
| `docs: atualizar readme` | Add the required emoji, such as `📚 docs: atualizar readme` |
| Multiple unrelated changes staged | Split commits or ask the user how to proceed |
| Adding `Co-authored-by` | Remove it; this policy forbids coauthorship lines |
| Mentioning AI tools | Remove it; commits must not mention AI usage |

## Troubleshooting

### Error: commit hook rejects the message

Cause: the message probably violates the required emoji, Conventional Commit format, allowed types, infinitive verb rule, or forbidden attribution rules.
Solution: read the hook output, rewrite the message to match `emoji tipo: verbo no infinitivo`, and retry without bypassing the hook.

### Error: staged changes do not match the message

Cause: unrelated files may have been staged or the message may be too broad.
Solution: unstage only your own accidental staging when safe, restage the intended files, or ask the user how to split the commit.
