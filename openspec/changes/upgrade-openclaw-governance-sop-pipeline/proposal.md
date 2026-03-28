## Why

The repository already has a first-generation governance baseline, but execution quality is still unstable because process depth, evidence standards, and file placement discipline are inconsistent across teams. We need a second governance upgrade now to enforce industrial-grade SOP execution, strict reject-and-rewrite gates, and repository hygiene so OpenClaw can reliably deliver high-value, publish-ready outputs.

## What Changes

- Upgrade the end-to-end novel delivery SOP into a deeply operational, step-by-step pipeline with explicit actor, input, output, checklist, and pass/fail criteria at each step.
- Add a mandatory research-first mechanism before major workflow changes: OpenClaw docs, platform-writing practices, and internal project context must be summarized as evidence before design updates.
- Strengthen quality governance with multi-stage review gates, dual-threshold enforcement, hard rejection rules, and rewrite SLAs.
- Define team-level operating contracts: upstream handoff package format, downstream acceptance/rejection SLA, and deterministic feedback loop notifications.
- Tighten repository information architecture with strict placement rules, archive-first policy for unknown files, migration mapping logs, and periodic hygiene audits.
- Upgrade progress governance with one canonical todo/state model, stage-level KPIs, blocker aging controls, and heartbeat-linked escalation triggers.
- Enhance OpenClaw operating manual artifacts (AGENTS.md, BOOTSTRAP.md, SOUL.md, USER.md, IDENTITY.md, HEARTBEAT.md, MEMORY.md, TOOLS.md) for anti-forgetfulness and consistent execution personality.
- Upgrade publication standards for WeChat Official Account and Xiaohongshu, including platform-specific adaptation SOP, output package format, and pre-publish validation checks.
- Enforce issue escalation path: local self-repair first, GitHub issue second, with mandatory evidence and owner/SLA/closure criteria.
- **BREAKING**: Any artifact that fails critical review gates can no longer proceed to downstream teams; forced reject-and-rewrite becomes mandatory.

## Capabilities

### New Capabilities
- `evidence-driven-research-benchmarking`: Require external and internal evidence collection before SOP redesign and major process decisions.

### Modified Capabilities
- `delivery-sop-pipeline`: Expand stage SOP depth and enforce stage-level gate contracts.
- `quality-review-gates`: Tighten review sequence, critical-item veto logic, and rejection rewrite protocol.
- `team-handoff-and-feedback-loop`: Add deterministic handoff package schema, SLA windows, and reject feedback routing.
- `progress-governance-and-execution-tracking`: Add canonical todo model, aging controls, and heartbeat-linked progress checkpoints.
- `repository-information-architecture`: Enforce strict placement, migration traceability, and archive policy for unclassified files.
- `publication-format-standards`: Upgrade WeChat/Xiaohongshu adaptation and publish-ready package requirements.
- `openclaw-operating-manual`: Strengthen startup sequence, persona/memory discipline, and runbook behavior under uncertainty.
- `issue-escalation-and-github-workflow`: Clarify local-fix-first policy and strict issue escalation schema.

## Impact

- Affected docs and governance artifacts under `README.md`, `operations/`, `standards/`, `templates/`, `archive/`, and `memory/`.
- New capability specs under `openspec/changes/upgrade-openclaw-governance-sop-pipeline/specs/` and follow-up updates to canonical docs during apply phase.
- Team workflow impact across project manager, research/writing, review, adaptation, delivery, and operations governance roles.
- Increased strictness in delivery gates may initially reduce throughput but will improve consistency and final output quality.
