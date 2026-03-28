# delivery-sop-pipeline Specification

## Purpose
TBD - created by archiving change establish-openclaw-sop-governance. Update Purpose after archive.
## Requirements
### Requirement: End-to-End Pipeline MUST Be Standardized
The system MUST define a single end-to-end delivery pipeline for all novel projects: briefing, research, draft, review, platform adaptation, delivery, and archive.

#### Scenario: Team starts a new character project
- **WHEN** a new character task is created
- **THEN** the task MUST be assigned to the standardized pipeline stages in order

### Requirement: Every Stage SHALL Have Entry and Exit Criteria
Each pipeline stage SHALL define mandatory entry conditions, mandatory completion artifacts, and a pass/fail gate before moving to the next stage.

#### Scenario: Draft stage is completed
- **WHEN** the drafting team submits output
- **THEN** the output MUST include all required artifacts and pass the stage gate before review starts

### Requirement: SOP Steps MUST Be Executable and Auditable
Each SOP step MUST include actor, action, output path, checklist, and verification record so execution can be audited later.

#### Scenario: Quality audit is requested
- **WHEN** an auditor reviews one delivery batch
- **THEN** each stage MUST provide step-level evidence of execution and verification

