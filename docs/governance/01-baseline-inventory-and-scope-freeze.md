# 基线盘点与范围冻结

更新时间: 2026-03-28

## 1. 仓库总体盘点

- 文件总量: 529
- 主要类型分布:
  - Markdown: 327
  - JSON: 109
  - JavaScript: 29
  - TXT: 19
  - Shell: 13
  - 其他: 32

## 2. 业务类型盘点

- 小说相关文档: 94
- 评审相关文档: 91
- 人物档案/人物清单: 94
- 监控与定时任务相关文件: 126
- OpenSpec 变更文件: 12

## 3. 高风险文件（迁移批次 1 禁止移动）

以下文件在第一批迁移中保持原路径:

- package.json
- README.md
- AGENTS.md
- BOOTSTRAP.md
- SOUL.md
- USER.md
- IDENTITY.md
- HEARTBEAT.md
- MEMORY.md
- TOOLS.md
- cron_tasks.yml
- run_tasks.js
- monitor_service.sh
- 启动所有定时任务.sh
- 启动小说项目监控.sh
- 现有监控入口脚本: *_monitor*.js、*_cron*.js

说明:
- 以上文件与运行入口、身份体系、调度配置直接相关，先改规范后迁移，避免运行中断。

## 4. 范围冻结

本轮改造范围:

- 建立标准目录骨架与治理文件
- 定义主 SOP、质量门禁、交接协议、平台发布标准
- 定义进度与升级机制
- 执行低风险历史报告文件迁移

本轮不做:

- 批量移动活跃脚本与核心运行文件
- 改写历史小说正文内容
- 引入新的自动发布外部集成
