## MODIFIED Requirements

### Requirement: Handoff Package MUST Be Structured
Upstream teams MUST deliver a structured handoff package including output artifacts, version info, stage checklist status, change summary, risk notes, and review status.

#### Scenario: Upstream hands over to downstream
- **WHEN** a stage is marked complete
- **THEN** a structured handoff package MUST be attached before downstream can start intake review

#### Scenario: Handoff package is incomplete
- **WHEN** required fields are missing
- **THEN** handoff submission MUST be rejected automatically and returned to upstream owner

### Requirement: Downstream SHALL Accept or Reject Within SLA
Downstream teams SHALL validate handoff packages and issue accept/reject decisions within configured SLA windows by stage type.

#### Scenario: Downstream receives package
- **WHEN** handoff package is received
- **THEN** downstream MUST record acceptance or rejection before SLA deadline

#### Scenario: SLA is exceeded without decision
- **WHEN** no decision is recorded before SLA expiry
- **THEN** the system MUST escalate to stage lead and mark intake as overdue

### Requirement: Rejection Feedback MUST Loop Back to Owner
Rejected handoffs MUST notify the responsible upstream owner with reject code, evidence links, required fixes, and target resubmission time.

#### Scenario: Handoff is rejected
- **WHEN** downstream rejects a package
- **THEN** upstream owner MUST receive actionable rejection package and task MUST return to previous stage queue

#### Scenario: Repeated rejection occurs
- **WHEN** the same handoff is rejected multiple times beyond configured threshold
- **THEN** escalation workflow MUST be triggered with incident tag for leadership review
