# Startup Regression 自修清单

用途: 会话启动或运行手册加载异常时，先执行本地自修，再决定是否升级。

## 1. 触发条件

- 启动顺序读取失败或缺文件
- startup 顺序被跳过
- memory 当日记录缺失且无法补写
- heartbeat 关键阈值映射不一致

## 2. 自修步骤

1. 验证文件存在性:
   - AGENTS.md
   - BOOTSTRAP.md
   - SOUL.md
   - USER.md
   - IDENTITY.md
   - HEARTBEAT.md
   - MEMORY.md
2. 验证启动顺序:
   - BOOTSTRAP -> SOUL -> USER -> IDENTITY -> HEARTBEAT -> memory(今日+最近) -> MEMORY
3. 验证阈值一致性:
   - HEARTBEAT.md 与 operations/progress/blocker-risk-escalation-rules.md
4. 验证升级路径:
   - operations/escalation/local-self-repair-checklist.md
   - .github/ISSUE_TEMPLATE/ops-escalation.yml
5. 修复记录:
   - 在 memory/YYYY-MM-DD.md 记录触发、处理、结果

## 3. 升级条件

满足任一条件立即升级:

- 连续 2 次自修仍失败
- 关键启动文件损坏且无法恢复
- 阈值冲突导致无法执行门禁

升级动作:

1. 创建 Issue（使用 ops-escalation.yml）
2. 指定 owner、priority、SLA、closure criteria
3. 在当日 memory 记录升级路径和处理进展
