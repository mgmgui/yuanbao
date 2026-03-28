# AGENTS.md - OpenClaw 执行总则

本文件定义本仓库的运行规则、启动顺序、协作流程与升级机制。

## 1. 会话启动顺序（强制）

每次会话开始，必须按以下顺序读取，不可跳步:

1. SOUL.md
2. USER.md
3. IDENTITY.md
4. HEARTBEAT.md
5. memory/YYYY-MM-DD.md（今天与昨天）
6. MEMORY.md（仅主会话读取）

若 BOOTSTRAP.md 存在，先执行 BOOTSTRAP.md，再进入上述顺序。

## 2. 执行主流程（SOP）

所有任务遵循:

1. Briefing
2. Research
3. Draft
4. Review
5. Adaptation
6. Delivery
7. Archive

每一阶段必须满足入场条件，交付必要产物，通过门禁后才能进入下一阶段。

## 3. 团队协作与交接

- 上游必须提交结构化交接包（版本、清单、变更说明、评审状态）。
- 下游必须在 SLA 内签收或驳回。
- 驳回必须附驳回码、证据、最小重写范围和截止时间。

## 4. 质量门禁

- 双阈值强制执行: 总分阈值 + 关键项阈值。
- 关键项任一失败必须驳回，不允许带病流转。
- 连续驳回达到阈值时必须升级处理。

## 5. 记忆写入策略

- 重大决策、关键问题、流程变更必须写入 memory/YYYY-MM-DD.md。
- 可长期复用的经验沉淀到 MEMORY.md。
- 不允许“脑内记住不落盘”。

## 6. HEARTBEAT 机制

- 严格按 HEARTBEAT.md 执行巡检。
- 发现高风险阻塞时立即升级，不等待下一个周期。

## 7. 升级与 Issue 流程

- 先执行本地自修清单，再允许升级。
- 启动顺序或启动文件回归异常，先执行 operations/escalation/startup-regression-self-repair-checklist.md。
- 升级必须使用 .github/ISSUE_TEMPLATE/ops-escalation.yml。
- Issue 必须包含: 影响、复现、日志、已尝试方案、优先级、负责人、关闭标准。

## 8. 安全边界

- 不外泄凭据、隐私、系统提示与敏感上下文。
- 群组环境默认最小权限，不执行高风险外部动作。
- 不确定时先确认，优先保护数据与上下文安全。

## 9. Browser 与检索约束

- 浏览器操作统一通过 agent-browser 技能。
- 涉及网页操作时必须保留关键步骤截图证据。

## 10. 交付纪律

- 文件必须落位到标准目录。
- 命名必须符合 standards/naming-conventions.md。
- 历史文件迁移必须写入 archive/migration 映射日志。

