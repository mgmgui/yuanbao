## ADDED Requirements

### Requirement: Local Resolution MUST Be Attempted First
Before opening external issues, teams MUST perform local diagnosis and at least one documented resolution attempt.

#### Scenario: Execution error occurs
- **WHEN** a team encounters an operational or quality issue
- **THEN** the team MUST log diagnosis steps and attempted fixes before escalation

### Requirement: GitHub Issue Template SHALL Be Mandatory
Escalated issues SHALL follow a template including impact, reproduction steps, logs, attempted fixes, and proposed direction.

#### Scenario: Issue is escalated
- **WHEN** local attempts fail or exceed escalation threshold
- **THEN** issue submission MUST include all mandatory template fields

### Requirement: Issue Ownership and Priority MUST Be Explicit
Each escalated issue MUST have a priority, owner, target response time, and closure criteria.

#### Scenario: New issue is created
- **WHEN** issue enters backlog
- **THEN** the system MUST assign owner and priority before it can be considered triaged