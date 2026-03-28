## MODIFIED Requirements

### Requirement: Task State Model MUST Be Unified
All teams MUST use one canonical task state model with required fields: status, owner, due date, dependency list, current blocker, and next action.

#### Scenario: Team updates task progress
- **WHEN** a contributor updates a task
- **THEN** the update MUST include canonical fields with timestamp and actor identity

#### Scenario: Non-canonical status is used
- **WHEN** a task state value does not match the canonical model
- **THEN** the update MUST be rejected and corrected before sync

### Requirement: Progress Reports SHALL Be Periodic and Comparable
The system SHALL generate periodic progress snapshots using fixed schema so performance and quality trends can be compared across cycles.

#### Scenario: Daily report is generated
- **WHEN** reporting cycle closes
- **THEN** report MUST include completed items, in-progress items, blockers, risk level, and next-cycle plan

#### Scenario: Report schema drift occurs
- **WHEN** report misses mandatory fields
- **THEN** report MUST be flagged invalid and regenerated

### Requirement: Risks and Blockers MUST Be Escalated by Rule
Risks and blockers MUST be classified and escalated by severity and aging thresholds, including automatic trigger when threshold is exceeded.

#### Scenario: Blocker exceeds SLA
- **WHEN** blocker remains unresolved beyond threshold
- **THEN** task MUST be escalated with explicit resolution owner and deadline

#### Scenario: Heartbeat detects blocker backlog
- **WHEN** heartbeat run finds blocked/rejected accumulation beyond threshold
- **THEN** operations escalation workflow MUST be activated
