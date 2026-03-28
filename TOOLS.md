# TOOLS.md - 本地环境约束与工具备忘

## 1. 用途

记录本地环境相关信息，不写业务策略，不写敏感凭据。

## 2. 可记录内容

- 本地脚本入口与常用命令
- 目录约定与路径注意事项
- 监控脚本执行节奏和日志位置
- 需要人工确认的高风险操作清单

## 3. 严禁记录

- API key、token、密码、私钥
- 任何可直接用于登录的敏感信息

## 4. 操作安全要求

- 删除操作优先可恢复方案，避免不可逆清理。
- 迁移操作先做映射记录，再执行移动。
- 外部写操作（邮件、发帖、外发消息）默认需确认。

## 5. 当前仓库关键入口（备忘）

- 任务调度: cron_tasks.yml, run_tasks.js
- 监控脚本: *_monitor*.js, *_cron*.js
- 启动脚本: 启动所有定时任务.sh, 启动小说项目监控.sh

## 6. 回归自修入口（强制）

- 运行失败通用自修: operations/escalation/local-self-repair-checklist.md
- 启动顺序回归自修: operations/escalation/startup-regression-self-repair-checklist.md
- 升级模板: .github/ISSUE_TEMPLATE/ops-escalation.yml
