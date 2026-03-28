# publication-format-standards Specification

## Purpose
TBD - created by archiving change establish-openclaw-sop-governance. Update Purpose after archive.

## Requirements

### Requirement: WeChat Delivery Format MUST Be Defined
The system MUST define a publish-ready WeChat package including title options, lead paragraph, section rhythm, citations, and final markdown deliverable with metadata.

#### Scenario: WeChat package is generated
- **WHEN** an approved novel is prepared for WeChat
- **THEN** output MUST follow WeChat template and include required metadata and validation record

#### Scenario: WeChat package fails readability checks
- **WHEN** content does not meet readability or factual standards
- **THEN** package MUST be rejected before publishing

### Requirement: Xiaohongshu Delivery Format MUST Be Defined
The system MUST define a publish-ready Xiaohongshu package including hook-style opening, segmented body, interaction prompt, hashtag strategy, and visual guidance notes.

#### Scenario: Xiaohongshu package is generated
- **WHEN** an approved novel is adapted for Xiaohongshu
- **THEN** output MUST follow Xiaohongshu template and include publish checklist

#### Scenario: Xiaohongshu package lacks platform fit
- **WHEN** adaptation does not match Xiaohongshu style or engagement rules
- **THEN** package MUST be returned for rewrite with adaptation feedback

### Requirement: Pre-Publish Validation SHALL Be Mandatory
Before delivery, both platform packages SHALL pass compliance, originality, readability, value, and platform-fit checks.

#### Scenario: Platform package is ready to deliver
- **WHEN** package enters final delivery gate
- **THEN** validation checklist MUST pass for both compliance and quality criteria

#### Scenario: One platform package passes but the other fails
- **WHEN** dual-platform validation is not fully passed
- **THEN** final delivery MUST remain blocked until both packages pass


