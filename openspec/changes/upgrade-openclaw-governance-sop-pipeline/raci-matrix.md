# 团队职责 RACI 矩阵（SOP 2.0）

## 1. 目标

本矩阵用于把交付流水线拆成可执行岗位责任，确保每个动作都有唯一负责人与唯一问责人，避免“多人参与、无人负责”。

SOP 原则采用“工序化+停线机制”:
- 工序化: 每一步有明确输入、动作、输出、门禁。
- 停线机制: 任一关键项不达标，立即停线驳回，禁止带病流转。

## 2. 角色定义

- PO（Project Owner）: 项目所有者，最终质量问责。
- PM（Pipeline Manager）: 流水线经理，跨团队排程与交接管理。
- RS（Research Team）: 研究团队，证据检索与素材可信度控制。
- WT（Writing Team）: 创作团队，正文与改写稿生产。
- QR（Quality Review Team）: 评审团队，双阈值评审与驳回裁定。
- PA（Platform Adaptation Team）: 平台改写团队（微信公众号/小红书）。
- DO（Delivery Ops Team）: 交付运营团队，打包、发布前核验、投放。
- RG（Repo Governance Team）: 仓库治理团队，目录治理与归档追踪。
- OA（OpenClaw Agent Operator）: OpenClaw 运行维护与 heartbeat 执行。

## 3. RACI 总表

说明:
- R = Responsible（执行）
- A = Accountable（问责，必须唯一）
- C = Consulted（协作咨询）
- I = Informed（知会）

| 关键工序 | PO | PM | RS | WT | QR | PA | DO | RG | OA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 需求冻结与立项范围锁定 | A | R | C | I | C | I | I | C | I |
| 证据包检索（OpenClaw+平台实践） | I | C | R | I | C | C | I | I | A |
| Briefing 卡片生成 | I | A | C | R | C | I | I | I | C |
| Research 素材包与可信度标注 | I | C | A/R | C | C | I | I | I | C |
| Draft 初稿生产 | I | C | C | A/R | C | I | I | I | I |
| 质量门禁评审（双阈值） | C | I | C | C | A/R | C | I | I | I |
| 驳回包生成（驳回码+证据+重写范围） | I | C | I | I | A/R | C | I | I | I |
| 重写执行与回归复审 | I | C | C | A/R | R | C | I | I | I |
| 微信公众号版本改写 | I | C | C | C | C | A/R | I | I | I |
| 小红书版本改写 | I | C | C | C | C | A/R | I | I | I |
| 双平台发布前核验 | C | C | I | I | A | R | R | I | I |
| 交付包打包与发布就绪确认 | A | C | I | I | C | C | R | I | I |
| 交接签收（上下游） | I | A/R | I | I | C | C | C | I | I |
| 仓库落位与命名校验 | I | I | I | I | I | I | C | A/R | I |
| 未归类文件归档与迁移映射 | I | I | I | I | I | I | C | A/R | I |
| 进度看板与 blocker 老化监控 | I | A | I | I | I | I | C | I | R |
| heartbeat 巡检与自动升级触发 | I | C | I | I | I | I | I | I | A/R |
| 本地自修失败后的 Issue 升级 | A | R | I | I | C | I | C | I | C |

## 4. 团队级交付契约（DoD）

- RS DoD:
  - 必须交付证据来源清单（含来源类型、时间、可追溯链接）。
  - 每条关键论断必须有证据锚点。
- WT DoD:
  - 必须交付结构化稿件（主稿+改写说明+自检表）。
  - 关键事实必须有可追溯素材来源。
- QR DoD:
  - 必须产出打分记录与关键项结论。
  - 失败时必须产出标准驳回包（不可口头驳回）。
- PA DoD:
  - 两平台版本必须分别符合对应模板与禁用项。
  - 必须产出平台差异化说明（不是同文复制）。
- DO DoD:
  - 必须完成发布前核验清单并保存证据。
  - 交付包命名、路径、版本号必须符合规范。
- RG DoD:
  - 新文件路径与命名全量合规。
  - 迁移文件必须写入 mapping 日志与索引。
- OA DoD:
  - startup 顺序、heartbeat 巡检、memory 写入均有执行记录。
  - 达到升级阈值时必须自动触发 escalation，不得拖延。

## 5. 驳回与通知规则（闭环）

- 驳回触发: 关键项失败、证据缺失、格式不合规、路径不合规。
- 通知对象: 当前责任人（R）+ 当前问责人（A）+ PM + PO。
- 通知载荷: 驳回码、失败证据、最小重写范围、截止时间、回归入口。
- 回流策略: 任务状态回退到上一个可重做工序，禁止跳级提交。

## 6. 产物路径约定

- 工序记录: `operations/handoff/` 与 `operations/quality/`
- 发布包: `deliverables/wechat/` 与 `deliverables/xiaohongshu/`
- 进度与状态: `operations/progress/`
- 升级事件: `operations/escalation/` 与 `.github/ISSUE_TEMPLATE/`
- 归档与迁移: `archive/` 与 `archive/migration/`
