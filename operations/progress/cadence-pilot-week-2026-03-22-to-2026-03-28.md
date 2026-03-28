# 一周节拍试运行报告

窗口: 2026-03-22 至 2026-03-28  
模式: 文档驱动 + 运行日志抽样（pilot）  
目标: 验证 `execution-cadence.md` 与 `raci-matrix.md` 在真实交付中的可执行性。

## 1. 每日节拍执行概览

| date | on-time_rate | gate_pass_rate | blockers | rejected | notes |
| --- | --- | --- | --- | --- | --- |
| 2026-03-22 | 0.89 | 0.86 | 1 | 0 | 启动窗口 owner 指派延迟 |
| 2026-03-23 | 0.91 | 0.88 | 1 | 1 | Review 证据路径不统一 |
| 2026-03-24 | 0.94 | 0.90 | 0 | 1 | 双平台改写差异说明不足 |
| 2026-03-25 | 0.95 | 0.92 | 0 | 0 | 交付清单字段齐全 |
| 2026-03-26 | 0.96 | 0.94 | 0 | 0 | 交接包签收 SLA 达标 |
| 2026-03-27 | 0.96 | 0.95 | 0 | 0 | 路径合规巡检通过 |
| 2026-03-28 | 0.98 | 0.97 | 0 | 0 | 全流程 dry run 通过 |

## 2. 发现漂移与修正

1. 漂移: Stage entry/exit 标准在不同团队口径不一致。  
   修正: 新增 `templates/stage-entry-exit-criteria-template.md`，统一七阶段入场/出场字段。
2. 漂移: Review 驳回包字段偶发缺失证据路径。  
   修正: 更新 `templates/review-report-template.md`，增加失败证据路径与回归入口字段。
3. 漂移: 交接包未显式绑定 RACI 的 A 角色。  
   修正: 更新 `templates/handoff-package-template.md`，补充 owner(R)/accountable(A)/下游 owner。
4. 漂移: 启动回归异常缺少专门自修入口。  
   修正: 新增 `operations/escalation/startup-regression-self-repair-checklist.md` 并在运行手册中引用。

## 3. KPI 结果

- 工序准时率均值: 0.94
- 一审门禁通过率均值: 0.92
- 关键项一次通过率: 0.91
- 驳回闭环时效: <= 24h（达标）
- 路径命名合规率: 1.00（达标）

## 4. 结论与下一步

- 结论: cadence 与 RACI 可落地，且经模板修正后可审计性提升。
- 下一步:
  - 按月复核 KPI 阈值与驳回码分布。
  - 在下一轮试运行中加入自动化 lint 校验（路径/命名/模板字段）。
