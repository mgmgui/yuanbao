# OpenClaw 运行时与启动约定证据包

日期: 2026-03-28  
范围: Runtime 行为、启动顺序、升级边界

## 1. 证据来源分类

| source_type | source_path | retrieval_time | relevance |
| --- | --- | --- | --- |
| internal-operating-contract | AGENTS.md | 2026-03-28 | 定义会话启动顺序、SOP、质量门禁与升级流程 |
| internal-operating-contract | BOOTSTRAP.md | 2026-03-28 | 定义初始化步骤与完成条件 |
| internal-operating-contract | HEARTBEAT.md | 2026-03-28 | 定义巡检频率与升级触发阈值 |
| internal-operating-contract | MEMORY.md | 2026-03-28 | 定义长期记忆/日记忆写入策略 |
| external-doc | docs/research/2026-03-28-外部检索摘录.md | 2026-03-28 | OpenClaw 文档结构与网关运行事实来源 |

## 2. 关键结论

1. 启动顺序必须确定化: BOOTSTRAP -> SOUL -> USER -> IDENTITY -> HEARTBEAT -> 当日/最近记忆 -> MEMORY。
2. 关键流程需证据闭环: 每个阶段都要记录 actor/action/input/output/timestamp。
3. 升级路径固定: 先本地自修，再使用 `.github/ISSUE_TEMPLATE/ops-escalation.yml`。
4. heartbeat 需绑定阈值: 关键脚本连续失败、BLOCKED 超时、重复 REJECT 必须触发升级。

## 3. 对本次治理升级的适用性

- 适用于 2.x 阶段深度化: 需要在主 SOP 中显式规定步骤与证据落位。
- 适用于 6.x 运行手册强化: 需要增加 startup regression 自修清单与阈值映射。
- 适用于 8.x 上线治理: 需要明确 go-live 后持续审计节拍。
