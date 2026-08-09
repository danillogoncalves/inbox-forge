# Arquitetura — InboxForge

## Objetivo

Manter o domínio independente de Gmail, Outlook, banco de dados, scheduler e provedores de IA.

A arquitetura deve favorecer:

- testabilidade;
- substituição de adapters;
- evolução incremental;
- revisão humana;
- contexto compreensível para agentes de IA.

## Organização por capacidade

Estrutura prevista:

```text
apps/
├── api/
└── worker/

packages/
├── core/
├── gmail/
├── outlook/
├── ai/
├── rules/
├── storage/
├── scheduler/
├── logger/
└── shared/
```

Cada pacote pode possuir seu próprio `src/` e testes quando isso se justificar.

Não crie subpastas vazias apenas para satisfazer um desenho.

## Camadas conceituais

```text
External Providers
      ↓
Adapters
      ↓
Application / Core
      ↓
Domain Rules
```

Dependências devem apontar para dentro.

O core não deve importar SDK do Gmail, Microsoft Graph ou SDK de IA.

## Formato normalizado de mensagem

Exemplo conceitual:

```ts
export type MailMessage = {
  id: string
  provider: 'gmail' | 'outlook'
  threadId?: string
  from: string
  subject: string
  receivedAt: Date
  text?: string
}
```

Esse contrato evoluirá através de specs.

## Fonte de eventos

O processamento não deve depender de como o evento foi recebido.

Contrato conceitual:

```ts
export interface MailEventSource {
  start(): Promise<void>
  stop(): Promise<void>
}
```

Possíveis implementações futuras:

```text
PollingMailEventSource
GmailPushEventSource
OutlookWebhookEventSource
```

Inicialmente usaremos polling local.

## IA

O domínio não conhece diretamente OpenAI, Anthropic ou outro fornecedor.

Contrato conceitual:

```ts
export interface AIProvider {
  classify(input: ClassificationInput): Promise<ClassificationResult>
  summarize(input: SummaryInput): Promise<SummaryResult>
}
```

Esses tipos são ilustrativos; a spec correspondente define a forma final.

## Persistência

Persistência será acessada através de interfaces do domínio/aplicação.

Primeiros conceitos previstos:

```text
mail_accounts
processed_messages
classifications
rules
alerts
agent_runs
```

Não crie tabelas antes de uma spec exigir.

## Idempotência

Processar o mesmo evento mais de uma vez não deve produzir efeitos duplicados.

Esse requisito será obrigatório antes de automatizações.

## Decisões arquiteturais

Mudanças estruturais relevantes devem gerar ADR em:

```text
docs/adr/
```

Formato:

```text
Status
Context
Decision
Consequences
Alternatives Considered
```
