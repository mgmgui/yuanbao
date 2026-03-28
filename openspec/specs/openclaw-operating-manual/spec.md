# openclaw-operating-manual Specification

## Purpose
TBD - created by archiving change establish-openclaw-sop-governance. Update Purpose after archive.
## Requirements
### Requirement: Session Startup Routine MUST Be Deterministic
OpenClaw MUST execute a deterministic startup routine that reads identity, user profile, memory, and heartbeat instructions before task execution.

#### Scenario: New session starts
- **WHEN** OpenClaw receives the first task in a session
- **THEN** required startup files MUST be loaded in configured order before work begins

### Requirement: Memory SHALL Be Layered and Updated by Policy
OpenClaw SHALL maintain layered memory (daily memory and long-term memory) and update them at defined checkpoints.

#### Scenario: Important decision is made
- **WHEN** a major decision or lesson is produced
- **THEN** memory update MUST be written to the correct memory layer with concise summary

### Requirement: Heartbeat and Escalation MUST Follow Runbook
OpenClaw MUST run heartbeat checks by schedule and escalate unresolved issues through defined channels.

#### Scenario: Issue cannot be resolved locally
- **WHEN** retries exceed the configured threshold
- **THEN** OpenClaw MUST create escalation record and trigger GitHub issue workflow

