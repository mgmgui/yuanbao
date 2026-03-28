## Why

当前仓库的流程、文档与产出分散且命名不统一，导致团队协作断点多、返工高、质量不可控。现在必须先建立可执行的统一 SOP 与审查门禁，把 OpenClaw 的“记忆、人格、节奏、交接”固化为制度，才能稳定交付高质量小说与平台发布版本。

## What Changes

- 建立端到端交付流水线：选题与人物研究 -> 素材构建 -> 小说创作 -> 多轮评审 -> 平台改写 -> 发布包交付 -> 归档复盘。
- 建立“严格驳回制”质量门禁：每个团队阶段都有输入标准、检查项、通过线、驳回条件、重写路径和时限。
- 建立跨团队交接协议：上游交付结构化产出（模板 + 校验记录 + 版本号），下游按清单验收后签收或驳回。
- 建立统一仓库信息架构：把根目录散落文件收敛到标准目录（projects、deliverables、ops、docs、archive 等）并定义命名规范。
- 建立 OpenClaw 运营手册：统一 AGENTS.md、BOOTSTRAP.md、HEARTBEAT.md、IDENTITY.md、MEMORY.md、SOUL.md、TOOLS.md、USER.md 的职责边界、读写时机、更新频率与异常处理。
- 建立平台发布规范：为微信公众号与小红书定义差异化改写规则、内容结构、字数区间、标题策略、输出格式与上线前检查。
- 建立任务与进度治理：把 TODO、里程碑、看板状态、风险与阻塞项标准化，确保多执行人对齐同一目标。
- 建立 GitHub 问题闭环：优先自修，无法解决时按模板写入 issue，包含证据、影响、复现、建议方案与优先级。

## Capabilities

### New Capabilities
- `delivery-sop-pipeline`: 定义全项目从需求到交付到归档的标准流水线与阶段入口出口条件。
- `quality-review-gates`: 定义多层审查门禁、评分标准、驳回规则与重写流程，保证“垃圾不过线”。
- `team-handoff-and-feedback-loop`: 定义团队间输入输出格式、传递协议、签收机制与驳回通知机制。
- `repository-information-architecture`: 定义仓库目录治理、命名规范、归档策略与迁移执行规则。
- `openclaw-operating-manual`: 定义 OpenClaw 人格、记忆、心跳、角色边界与日常运维规范。
- `publication-format-standards`: 定义微信公众号与小红书交付格式、改写策略、发布前校验清单。
- `progress-governance-and-execution-tracking`: 定义 TODO、进度、里程碑、风险、阻塞、日报周报的统一模板与节奏。
- `issue-escalation-and-github-workflow`: 定义“先自修后上报”与 GitHub issue 升级流程。

### Modified Capabilities
- 无（当前 `openspec/specs/` 为空，本次全部新增能力）。

## Impact

- 文档系统：新增并重写 README、SOP 总纲、团队分工、审查规范、平台发布规范、归档规范与模板文档。
- 项目结构：调整目录布局并迁移历史文件，清理根目录噪音。
- 执行机制：更新定时监控与任务推进文档，使其对齐新 SOP。
- 协作方式：新增跨团队交接与驳回反馈机制，降低返工与漏交付。
- 运营治理：明确 OpenClaw 在记忆更新、问题升级、节奏推进上的标准动作。