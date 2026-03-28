# 治理缺口映射与范围锁定

日期: 2026-03-28  
关联变更: upgrade-openclaw-governance-sop-pipeline

## 1. 缺口映射（执行前）

| id | requirement | baseline | gap |
| --- | --- | --- | --- |
| G-01 | 七阶段主 SOP 可执行化 | `operations/sop/master-delivery-sop.md` 有流程但审计路径不足 | 需补充 actor/input/output/checklist/gate 与证据路径 |
| G-02 | 阶段模板统一 | `templates/` 缺七阶段入场/出场模板 | 需新增统一模板并关联主 SOP |
| G-03 | 平台证据基线 | 平台 SOP 存在，但证据包分散 | 需新增平台适配证据基线文档 |
| G-04 | RACI 模板对齐 | RACI 已定义，模板字段未完全对齐 | 需补充 handoff/review/escalation 的 RACI 字段 |
| G-05 | go-live 后审计节拍 | 已有 heartbeat，但 README 未声明长期节拍 | 需新增每日/每周/每月/每季度审计节拍 |

## 2. 范围锁定

### In Scope

- README 导航与 go-live 审计节拍声明
- operations/sop、operations/escalation、operations/progress 相关治理文档
- standards/publication 与 templates 的协同模板
- docs/research 与 docs/governance 下证据和缺口文档
- archive/migration 与 archive 索引更新

### Out Of Scope

- 现有小说正文重写
- 核心运行脚本批量迁移（高风险入口）
- 外部发布自动化平台建设

## 3. 风险假设

1. 根目录历史文件较多，需采用小批次迁移并记录映射。
2. 涉及调度/监控入口的脚本默认不迁移，避免运行中断。
3. 节拍试运行采用一周窗口，若出现漂移，优先修正模板与责任映射。

## 4. 通过标准

- 所有变更可通过路径检索定位。
- 模板可直接用于交接、评审、升级三条流程。
- 迁移日志可从旧路径追溯到新路径。
