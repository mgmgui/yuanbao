## MODIFIED Requirements

### Requirement: Local Resolution MUST Be Attempted First
Before opening external issues, teams MUST execute local diagnosis checklist and at least one documented repair attempt with evidence.

#### Scenario: Execution error occurs
- **WHEN** a team encounters an operational or quality issue
- **THEN** team MUST log diagnosis steps and attempted fixes before escalation is allowed

#### Scenario: Team attempts immediate escalation
- **WHEN** no local attempt evidence exists
- **THEN** issue creation MUST be blocked and redirected to self-repair checklist

### Requirement: GitHub Issue Template SHALL Be Mandatory
Escalated issues SHALL use required template fields including impact, reproduction, logs, attempted fixes, priority, owner, and closure criteria.

#### Scenario: Issue is escalated
- **WHEN** local attempts fail or exceed escalation threshold
- **THEN** issue submission MUST include all mandatory template fields

#### Scenario: Issue form is incomplete
- **WHEN** any mandatory field is missing
- **THEN** issue MUST be rejected from escalation queue until completed

### Requirement: Issue Ownership and Priority MUST Be Explicit
Each escalated issue MUST have owner, priority, SLA target response, and done-definition before triage completion.

#### Scenario: New issue is created
- **WHEN** issue enters backlog
- **THEN** system MUST assign owner and priority before triage complete status

#### Scenario: Issue remains unowned beyond SLA
- **WHEN** owner is not assigned before ownership SLA
- **THEN** escalation MUST notify project owner for manual assignment
