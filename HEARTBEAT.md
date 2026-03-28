# HEARTBEAT.md - 巡检与风险升级手册

## 1. 巡检频率

- 高频巡检: 每次 heartbeat
- 低频巡检: 每日 1 次

## 2. 高频巡检项（每次执行）

1. 定时任务状态是否正常
2. 最近日志是否持续产出
3. 是否出现连续失败或无输出
4. 关键任务是否存在 BLOCKED/REJECTED 堆积

## 3. 低频巡检项（每日）

1. 检查治理文档是否过期（SOP、标准、模板）
2. 检查 memory 是否按日更新
3. 检查 archive 索引是否与新增归档一致

## 4. 升级触发条件

触发任一条件立即升级:

- 关键监控脚本连续失败 >= 2 次
- BLOCKED 状态超过 24 小时
- 同一任务连续 REJECTED >= 3 次
- 关键配置缺失或路径失效

## 5. 升级动作

1. 先执行 operations/escalation/local-self-repair-checklist.md
2. 若仍失败，创建 .github/ISSUE_TEMPLATE/ops-escalation.yml
3. 在 memory 当天文件记录升级原因和处理进展