## ADDED Requirements

### Requirement: Multi-Step Review Gates MUST Be Enforced
The system MUST enforce review gates for factual accuracy, narrative quality, literary value, and platform compliance before delivery.

#### Scenario: Submission enters review
- **WHEN** a draft is submitted for review
- **THEN** it MUST be checked against all required review dimensions with recorded results

### Requirement: Rejection and Rewrite Workflow SHALL Be Mandatory
If any mandatory gate fails, the submission SHALL be rejected with rejection codes, rewrite scope, and deadline.

#### Scenario: One critical check fails
- **WHEN** a critical review item does not meet the threshold
- **THEN** the submission MUST be rejected and sent back with explicit rewrite instructions

### Requirement: Delivery MUST Require Dual Threshold Passing
Delivery MUST require both overall score threshold and all critical-item thresholds; passing only total score is insufficient.

#### Scenario: High total score but one critical item fails
- **WHEN** total score is above pass line but critical item is below pass line
- **THEN** the system MUST block delivery and mark status as rejected