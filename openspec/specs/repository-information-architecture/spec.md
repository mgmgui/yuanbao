# repository-information-architecture Specification

## Purpose
TBD - created by archiving change establish-openclaw-sop-governance. Update Purpose after archive.

## Requirements

### Requirement: Repository Layout MUST Be Canonical
The repository MUST enforce canonical top-level domains for active work, deliverables, operations, standards, templates, and archive, and every new artifact MUST map to one domain.

#### Scenario: New artifact is created
- **WHEN** a team creates a new file
- **THEN** the file MUST be stored under the canonical domain matching artifact type

#### Scenario: Artifact is created in root without classification
- **WHEN** file is not mapped to canonical domain
- **THEN** it MUST be moved or archived before handoff approval

### Requirement: Naming and Archiving Rules SHALL Be Enforced
All files SHALL follow naming conventions for topic, stage, version, and date; obsolete or uncertain files MUST be archived with index references.

#### Scenario: Artifact reaches superseded state
- **WHEN** a newer approved version exists
- **THEN** previous version MUST be archived and linked in archive index

#### Scenario: Team cannot classify a file confidently
- **WHEN** file destination is uncertain
- **THEN** file MUST be placed in controlled archive bucket with classification note for later triage

### Requirement: Migration MUST Preserve Traceability
Repository cleanup and migration MUST produce mapping logs from old paths to new paths with reason, operator, and migration batch id.

#### Scenario: Historical file is relocated
- **WHEN** a file is moved during cleanup
- **THEN** migration mapping MUST record old path, new path, reason, and date

#### Scenario: Audit requests provenance for moved file
- **WHEN** reviewer checks migration trace
- **THEN** mapping log MUST reconstruct full path history for that file


