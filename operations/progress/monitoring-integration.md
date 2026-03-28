# 进度治理与监控脚本联动

## 1. 现有脚本映射

- 小说项目10分钟监控脚本.js -> 小说任务节奏巡检
- 小说项目定时监控脚本.js -> 定时任务执行巡检
- global_novel_project_monitor.js -> 全局项目状态汇总
- combined_monitor.js / combined_monitor_cron.js -> 多监控并发汇总

## 2. 联动规则

- 每次监控输出必须同步以下字段:
  - completed_count
  - in_progress_count
  - blocked_count
  - rejected_count
  - risk_level
- 日报与周报必须引用最新监控快照

## 3. 节奏要求

- 10 分钟: 小说项目状态巡检
- 30 分钟: 财经监控
- 60 分钟: 国际局势监控
- 5 分钟: 定时任务执行监控

## 4. 异常处理

- 若监控脚本失败 2 次连续失败: 标记 BLOCKED 并升级
- 若关键脚本缺失日志: 触发 P1 事件并通知负责人
