## Context

The current repository already contains governance, quality, publication, and handoff documents, but real execution still suffers from drift: teams can bypass depth requirements, review rigor varies by owner, and historical artifacts continue to accumulate in non-canonical locations. The upgrade must preserve current structure while making execution deterministic, auditable, and difficult to game.

Constraints:
- Existing capabilities in `openspec/specs/` are active and should be upgraded, not replaced blindly.
- OpenClaw startup and memory behavior must remain compatible with current file set (`AGENTS.md`, `SOUL.md`, `USER.md`, `IDENTITY.md`, `HEARTBEAT.md`, `MEMORY.md`, daily `memory/*.md`).
- Governance must remain implementable by small teams with mixed manual and agent-assisted execution.

Stakeholders:
- Project owner (final quality authority)
- Pipeline teams (research/writing/review/adaptation/delivery)
- Operations governance team (SOP, progress, escalation, archive hygiene)
- OpenClaw runtime agent (execution operator)

## Goals / Non-Goals

**Goals:**
- Make the full delivery pipeline deterministic with explicit stage contracts and reject rules.
- Introduce evidence-driven redesign practice before major process changes.
- Enforce strict quality gate sequencing with critical-item veto and rewrite loop.
- Standardize team handoffs, status tracking, and escalation with SLA-based controls.
- Strengthen repository placement and archive mechanisms so repository entropy decreases over time.
- Ensure WeChat and Xiaohongshu outputs are generated as publish-ready, platform-specific packages.

**Non-Goals:**
- Rewriting all historical content files in this phase.
- Building new external tooling platforms; this change is process and documentation architecture first.
- Replacing OpenSpec lifecycle; we extend the existing spec-driven workflow.

## Decisions

### Decision 1: Keep capability-oriented spec architecture and apply delta updates
- Choice: Upgrade existing capability specs with `MODIFIED` requirements and add one new capability for evidence-driven benchmarking.
- Why: Preserves compatibility, keeps historical traceability, and avoids fragmentation.
- Alternative considered: Create entirely new capability namespace for v2 governance.
- Why not chosen: Would duplicate existing logic and increase migration overhead.

### Decision 2: Enforce dual-threshold quality model with critical-item veto
- Choice: Delivery requires both overall score threshold and all critical-item thresholds to pass.
- Why: Prevents cosmetically high-score but fundamentally flawed outputs from shipping.
- Alternative considered: Single aggregate score pass line.
- Why not chosen: Too easy to hide critical defects.

### Decision 3: Introduce mandatory reject package schema
- Choice: Rejections must include reject code, evidence, minimum rewrite scope, and due time.
- Why: Makes rewrite actionable and auditable, avoiding vague feedback loops.
- Alternative considered: Free-form reviewer comments.
- Why not chosen: Causes ambiguity and repeated low-quality rewrites.

### Decision 4: Repository hygiene through canonical placement plus archive-first fallback
- Choice: Unknown or uncertain files are moved into controlled archive paths with mapping logs.
- Why: Stops root-directory sprawl while preserving provenance.
- Alternative considered: Leave unknown files in place until manually classified.
- Why not chosen: Prolongs entropy and blocks deterministic navigation.

### Decision 5: OpenClaw anti-forgetfulness contract
- Choice: Strengthen startup file loading order, memory write triggers, and heartbeat escalation bindings.
- Why: User requirement explicitly highlights context loss risks.
- Alternative considered: Rely on prompt reminders only.
- Why not chosen: Non-persistent and non-auditable.

### Decision 6: Platform adaptation as separate, enforceable manufacturing stage
- Choice: WeChat and Xiaohongshu adaptations are distinct SOP stages with dedicated package standards and pre-publish checklists.
- Why: The two platforms require different structures and review criteria.
- Alternative considered: Single generic social distribution format.
- Why not chosen: Produces low fit and lower publish quality.

### Decision 7: Lock execution ownership and rhythm before implementation
- Choice: Add a formal RACI matrix and daily/weekly execution cadence as mandatory operating artifacts for this change.
- Why: Process quality fails most often at team boundaries and scheduling drift; ownership and rhythm controls reduce coordination ambiguity.
- Alternative considered: Keep ownership and cadence as ad hoc team agreements.
- Why not chosen: Informal agreements are hard to audit and easy to bypass under delivery pressure.

## Risks / Trade-offs

- [Risk] Throughput slowdown due to stricter gates -> Mitigation: define clear templates and stage SLAs to keep rewrite cycles bounded.
- [Risk] Team resistance to added documentation load -> Mitigation: provide concise templates and enforce only high-signal required fields.
- [Risk] Over-archiving could hide active files -> Mitigation: require migration index entries and archive lookup in README navigation.
- [Risk] OpenClaw behavior drift from version updates -> Mitigation: include runtime verification checklist and issue escalation rule when startup file loading regresses.
- [Risk] Platform trend changes invalidate writing tactics -> Mitigation: add periodic benchmark research refresh in evidence-driven capability.

## Migration Plan

1. Publish capability deltas and approve tasks under this change.
2. Update canonical governance docs (`README.md`, `operations/`, `standards/`, `templates/`) to align with upgraded requirements.
3. Run repository cleanup in controlled batches with archive mapping logs.
4. Execute one end-to-end dry run on a real project item and record gate evidence.
5. Apply corrective edits from dry-run findings.
6. Enable heartbeat checks and escalation thresholds for ongoing compliance.

Rollback strategy:
- Keep previous governance files in archive snapshots.
- If severe disruption appears, revert to previous approved governance baseline while retaining migration logs for traceability.

Supporting operating artifacts:
- `raci-matrix.md`: Team ownership contract and reject-loop responsibility map.
- `execution-cadence.md`: Daily and weekly cadence windows, gate checkpoints, and escalation timing.

## Open Questions

- Should rejection SLA be globally fixed or capability-specific by stage complexity?
- What is the final threshold matrix (numeric) for each critical review item?
- Should publication package metadata include optional A/B title variants by default?
- Should archive batches be date-based, stage-based, or risk-based as primary partitioning key?
