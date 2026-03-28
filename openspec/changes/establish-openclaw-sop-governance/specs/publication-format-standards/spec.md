## ADDED Requirements

### Requirement: WeChat Delivery Format MUST Be Defined
The system MUST define a dedicated WeChat public account delivery format including title style, lead structure, section cadence, and publish-ready markdown package.

#### Scenario: WeChat package is generated
- **WHEN** an approved novel is prepared for WeChat
- **THEN** output MUST follow WeChat format template and include required metadata

### Requirement: Xiaohongshu Delivery Format MUST Be Defined
The system MUST define a dedicated Xiaohongshu note format including hook opening, segmented body, tag strategy, and visual-caption alignment.

#### Scenario: Xiaohongshu package is generated
- **WHEN** an approved novel is adapted for Xiaohongshu
- **THEN** output MUST follow Xiaohongshu format template and include publish checklist

### Requirement: Pre-Publish Validation SHALL Be Mandatory
Before delivery, both platform packages SHALL pass compliance, readability, and value checks.

#### Scenario: Platform package is ready to deliver
- **WHEN** package enters final delivery gate
- **THEN** validation checklist MUST pass for both compliance and quality criteria