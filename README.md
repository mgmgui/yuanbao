# yuanbao 项目治理与交付系统

本仓库已升级为“规范先行、门禁驱动、双平台交付”的治理模式。

核心目标:

- 用统一 SOP 驱动从立项到归档的全流程
- 用严格质量门禁与驳回机制保证交付质量
- 用标准目录与模板降低协作摩擦

## 快速导航

### 角色导航

- 项目管理: operations/sop/master-delivery-sop.md
- 研究与创作: operations/sop/master-delivery-sop.md
- 评审团队: operations/quality/review-gates-and-rejection-loop.md
- 平台改写团队:
	- standards/publication/wechat-sop.md
	- standards/publication/xiaohongshu-sop.md
- 交付与运营团队:
	- operations/handoff/team-handoff-protocol.md
	- operations/progress/todo-status-model.md
	- operations/escalation/local-self-repair-checklist.md

### 仓库目录

- projects/: 项目执行资料
- deliverables/: 可发布交付物
- operations/: SOP、质检、交接、进度、升级规则
- standards/: 命名与发布标准
- templates/: 各类模板
- archive/: 归档索引与迁移日志

## 当前治理标准入口

- 基线盘点: docs/governance/01-baseline-inventory-and-scope-freeze.md
- 路径映射草案: docs/governance/02-path-mapping-draft.md
- 命名规范: standards/naming-conventions.md
- 仓库治理规则: standards/repository-governance.md
- 归档索引: archive/ARCHIVE_INDEX.md

## 双平台交付规范

- 微信公众号 SOP: standards/publication/wechat-sop.md
- 小红书 SOP: standards/publication/xiaohongshu-sop.md
- 双平台交付包标准: standards/publication/dual-output-package-standard.md
- 发布前清单: templates/pre-publish-validation-checklist.md
- 七阶段入场/出场模板: templates/stage-entry-exit-criteria-template.md
- 升级报告模板: templates/escalation-report-template.md

## 进度与升级机制

- 状态模型: operations/progress/todo-status-model.md
- 监控联动: operations/progress/monitoring-integration.md
- 升级规则: operations/progress/blocker-risk-escalation-rules.md
- 本地自修清单: operations/escalation/local-self-repair-checklist.md
- Issue 优先级: operations/escalation/issue-priority-and-sla.md
- GitHub Issue 模板: .github/ISSUE_TEMPLATE/ops-escalation.yml

## Go-Live 后审计节拍

- 每日 20:30: heartbeat 巡检（阻塞/驳回/日志缺失）
- 每周五 18:00: 治理复盘（路径合规、门禁通过率、升级闭环）
- 每月最后一个工作日: 仓库卫生审计（新增文件落位、命名、归档映射）
- 每季度第一个周三: SOP 与平台规范基线复核（微信/小红书规则更新）

## 历史说明

旧版 README 中的定时任务说明仍可在现有脚本与配置文件中查阅；后续将逐步迁移到 operations/ 与 archive/ 下的标准文档中。
