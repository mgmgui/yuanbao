## MODIFIED Requirements

### Requirement: End-to-End Pipeline MUST Be Standardized
The system MUST define one canonical delivery pipeline for all novel projects with mandatory stages in strict order: briefing, research, draft, review, adaptation, delivery, and archive; stage skipping is prohibited.

#### Scenario: Team starts a new character project
- **WHEN** a new character task is created
- **THEN** the task MUST be instantiated with all canonical stages and an initial owner for each stage

#### Scenario: Team attempts to skip adaptation stage
- **WHEN** a downstream stage is requested before the previous mandatory stage is completed
- **THEN** the system MUST block transition and return a stage-order violation message

### Requirement: Every Stage SHALL Have Entry and Exit Criteria
Each pipeline stage SHALL provide mandatory entry inputs, execution checklist, required outputs, gate rubric, and explicit pass/fail decision record.

#### Scenario: Draft stage is completed
- **WHEN** the drafting team submits output
- **THEN** submission MUST include all required draft artifacts and a completed gate rubric before review can start

#### Scenario: Stage gate evidence is missing
- **WHEN** a stage is marked complete without checklist and decision record
- **THEN** the stage MUST be reset to in-progress and flagged for correction

### Requirement: SOP Steps MUST Be Executable and Auditable
Each SOP step MUST define actor, action, input path, output path, checklist ID, verification owner, and timestamp so execution can be audited end-to-end.

#### Scenario: Quality audit is requested
- **WHEN** an auditor reviews one delivery batch
- **THEN** each stage MUST expose step-level evidence with linked artifacts and verification records

#### Scenario: A step is performed without trace record
- **WHEN** audit detects missing actor/action evidence for a mandatory step
- **THEN** the delivery batch MUST fail governance audit and require remediation before final delivery
