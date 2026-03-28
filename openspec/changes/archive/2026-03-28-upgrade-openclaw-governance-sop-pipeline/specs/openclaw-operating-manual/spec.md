## MODIFIED Requirements

### Requirement: Session Startup Routine MUST Be Deterministic
OpenClaw MUST execute a deterministic startup sequence that loads bootstrap and governance files in configured order before task execution.

#### Scenario: New session starts
- **WHEN** OpenClaw receives first task in a session
- **THEN** required startup files MUST be loaded in configured order before any task action

#### Scenario: Startup file loading regression appears
- **WHEN** runtime cannot load workspace bootstrap files
- **THEN** system MUST trigger self-repair checks and, if unresolved, escalate through issue workflow

### Requirement: Memory SHALL Be Layered and Updated by Policy
OpenClaw SHALL maintain layered memory (daily and long-term) and MUST write memory updates for major decisions, process changes, and critical incidents.

#### Scenario: Important decision is made
- **WHEN** a major decision or lesson is produced
- **THEN** memory update MUST be written to correct memory layer with concise summary

#### Scenario: Session ends with unresolved critical decision log
- **WHEN** required memory entry is missing
- **THEN** session closure MUST be blocked until memory write requirement is satisfied

### Requirement: Heartbeat and Escalation MUST Follow Runbook
OpenClaw MUST execute heartbeat checks by schedule and escalate unresolved issues based on configured thresholds and runbook actions.

#### Scenario: Issue cannot be resolved locally
- **WHEN** retries exceed configured threshold
- **THEN** OpenClaw MUST create escalation record and trigger GitHub issue workflow

#### Scenario: Heartbeat detects high-risk blocker
- **WHEN** heartbeat scan finds high-risk blocked state
- **THEN** immediate escalation MUST be initiated without waiting for next cycle
