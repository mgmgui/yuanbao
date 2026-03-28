# repository-information-architecture Specification

## Purpose
TBD - created by archiving change establish-openclaw-sop-governance. Update Purpose after archive.
## Requirements
### Requirement: Repository Layout MUST Be Canonical
The repository MUST define canonical directories for active projects, deliverables, operations, standards, templates, and archives.

#### Scenario: New artifact is created
- **WHEN** a team creates a new file
- **THEN** the file MUST be stored under the canonical directory matching artifact type

### Requirement: Naming and Archiving Rules SHALL Be Enforced
All files SHALL follow naming conventions for topic, stage, version, and date; obsolete files MUST be archived with index references.

#### Scenario: Artifact reaches superseded state
- **WHEN** a newer approved version exists
- **THEN** the previous version MUST be archived and linked in archive index

### Requirement: Migration MUST Preserve Traceability
Repository cleanup and migration MUST produce a mapping log from old paths to new paths.

#### Scenario: Historical file is relocated
- **WHEN** a file is moved during cleanup
- **THEN** a migration mapping entry MUST record old path, new path, reason, and date

