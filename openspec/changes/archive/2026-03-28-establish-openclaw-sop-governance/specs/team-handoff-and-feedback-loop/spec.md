## ADDED Requirements

### Requirement: Handoff Package MUST Be Structured
Upstream teams MUST deliver a structured handoff package including output files, version, checklist, change summary, and review status.

#### Scenario: Upstream hands over to downstream
- **WHEN** a stage is marked complete
- **THEN** a structured handoff package MUST be generated and attached to the task record

### Requirement: Downstream SHALL Accept or Reject Within SLA
Downstream teams SHALL validate the package and respond with accept or reject within a defined SLA window.

#### Scenario: Downstream receives package
- **WHEN** handoff package is received
- **THEN** downstream MUST issue acceptance or rejection decision before SLA expires

### Requirement: Rejection Feedback MUST Loop Back to Owner
Rejected handoffs MUST notify the responsible upstream owner with rejection code, evidence, and required fixes.

#### Scenario: Handoff is rejected
- **WHEN** downstream rejects a package
- **THEN** upstream owner MUST receive actionable feedback and the task MUST return to the previous stage