## ADDED Requirements

### Requirement: Task State Model MUST Be Unified
All teams MUST use a unified task state model with explicit statuses, owners, due dates, and dependencies.

#### Scenario: Team updates task progress
- **WHEN** a contributor updates a task
- **THEN** the task MUST include current state, owner, timestamp, and next action

### Requirement: Progress Reports SHALL Be Periodic and Comparable
The system SHALL produce periodic progress reports using fixed fields so snapshots are comparable across time.

#### Scenario: Daily report is generated
- **WHEN** reporting cycle closes
- **THEN** report MUST include completed items, in-progress items, blockers, risk level, and next-day plan

### Requirement: Risks and Blockers MUST Be Escalated by Rule
Risks and blockers MUST be classified and escalated according to severity and time-to-resolution thresholds.

#### Scenario: Blocker exceeds SLA
- **WHEN** blocker remains unresolved beyond threshold
- **THEN** the task MUST be escalated and assigned an explicit resolution owner