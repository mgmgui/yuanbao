# quality-review-gates Specification

## Purpose
TBD - created by archiving change establish-openclaw-sop-governance. Update Purpose after archive.

## Requirements

### Requirement: Multi-Step Review Gates MUST Be Enforced
The system MUST enforce ordered review gates covering factual accuracy, narrative integrity, literary value, audience impact, and platform compliance, and every gate MUST produce scored evidence.

#### Scenario: Submission enters review
- **WHEN** a draft is submitted for review
- **THEN** the submission MUST pass through each required gate in sequence with recorded score and reviewer notes

#### Scenario: Reviewer attempts ad hoc gate removal
- **WHEN** a mandatory gate is removed or bypassed for a standard submission
- **THEN** the review workflow MUST reject the review configuration and require full gate restoration

### Requirement: Rejection and Rewrite Workflow SHALL Be Mandatory
If any mandatory gate fails, the submission SHALL be rejected with structured reject package including reject code, failure evidence, minimum rewrite scope, and rewrite deadline.

#### Scenario: One critical check fails
- **WHEN** a critical review item does not meet the threshold
- **THEN** the submission MUST be rejected and returned with complete reject package

#### Scenario: Reject feedback is vague
- **WHEN** reject notice lacks evidence or rewrite scope
- **THEN** the system MUST mark the rejection invalid and require reviewer correction before dispatch

### Requirement: Delivery MUST Require Dual Threshold Passing
Delivery MUST require overall score threshold and all critical-item thresholds to pass; passing only the aggregate score is insufficient.

#### Scenario: High total score but one critical item fails
- **WHEN** total score is above pass line but any critical item is below its threshold
- **THEN** delivery MUST be blocked and status MUST remain rejected

#### Scenario: All critical items pass but total score fails
- **WHEN** critical items pass but overall score is below threshold
- **THEN** delivery MUST be blocked and rewritten under improvement plan


