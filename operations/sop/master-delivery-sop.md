# 端到端交付主 SOP

适用范围: 全球人物小说项目  
生效日期: 2026-03-28  
版本: v2.1

## 1. 总流程（强制顺序）

1. Briefing（需求澄清）
2. Research（人物与背景研究）
3. Draft（初稿创作）
4. Review（质量评审）
5. Adaptation（平台改写）
6. Delivery（交付打包）
7. Archive（归档复盘）

禁止跳阶段。任一阶段未通过门禁，不得进入下一阶段。

## 2. 阶段执行契约（Actor/Input/Output/Checklist/Gate）

| Stage | Actor (R/A) | Entry Input | Required Output | Checklist | Gate |
| --- | --- | --- | --- | --- | --- |
| Briefing | PM / PO | 选题、人物、交付目标 | 任务卡、完成定义、风险假设 | 范围明确、owner 明确、截止明确 | PM 签字通过 |
| Research | RS / Research Lead | Briefing 通过记录、资料检索任务 | 证据包、时间线、冲突图谱 | 每条关键论断有来源锚点 | 研究可信度通过 |
| Draft | WT / Writing Lead | 证据包、写作框架 | 主稿 vX.Y、自检表 | 结构完整、事实可追溯 | 初稿提交门禁通过 |
| Review | QR / Review Lead | 主稿、自检表、上游交接包 | 评分表、评审结论、驳回包(如失败) | 五维评分齐全、关键项有证据 | 双阈值通过 |
| Adaptation | PA / Platform Lead | Review PASS 稿件、平台规范 | 微信版、小红书版、平台差异说明 | 双平台均通过格式检查 | 平台适配通过 |
| Delivery | DO / Delivery Lead | 双平台稿、评审报告、清单 | 发布包、元数据、交接包 | 包结构完整、版本一致 | 发布前核验通过 |
| Archive | RG+OA / Ops Lead | 发布包、执行日志 | 归档索引、迁移日志、复盘 | 路径合规、索引可检索 | 归档验收通过 |

## 3. 阶段入场/出场标准（七阶段）

### Stage 1: Briefing
- 入场条件:
  - 已确定人物对象
  - 已明确受众与发布渠道
- 必要产物:
  - 任务卡
  - 人物目标说明
  - 风险假设
- 出场条件:
  - 范围、风格、完成定义明确
  - owner 与 SLA 可追踪

### Stage 2: Research
- 入场条件:
  - Briefing 已通过
- 必要产物:
  - 人物资料包
  - 事件时间线
  - 核心冲突要点
  - 证据来源分级清单
- 出场条件:
  - 资料完整且来源可追溯
  - 关键论断已绑定证据锚点

### Stage 3: Draft
- 入场条件:
  - Research 通过
- 必要产物:
  - 小说正文草稿
  - 创作说明
  - 主稿自检表
- 出场条件:
  - 草稿满足结构完整性要求
  - 事实引用可回链到 Research 产物

### Stage 4: Review
- 入场条件:
  - Draft 交付完整
- 必要产物:
  - 评审报告
  - 打分记录
  - 是否驳回结论
  - 驳回包（如失败）
- 出场条件:
  - 通过总分阈值且关键项全过线
  - 驳回时必须给出最小重写范围与截止时间

### Stage 5: Adaptation
- 入场条件:
  - Review 已通过
- 必要产物:
  - 微信稿
  - 小红书稿
  - 平台差异化说明
- 出场条件:
  - 双平台稿件均满足格式标准
  - 双稿均通过发布前检查

### Stage 6: Delivery
- 入场条件:
  - Adaptation 双稿完成
- 必要产物:
  - 双平台交付包
  - 发布前检查清单
  - 结构化交接包
- 出场条件:
  - 交付包可直接发布
  - 下游签收 SLA 已启动

### Stage 7: Archive
- 入场条件:
  - Delivery 完成
- 必要产物:
  - 归档记录
  - 迁移映射日志
  - 经验复盘
- 出场条件:
  - 文件已归档并可检索
  - 后续改进项有 owner 与截止时间

## 4. 阶段顺序强制与违规处理

### 4.1 顺序强制规则
- 仅允许 `N -> N+1` 顺序推进。
- 若前序阶段状态不是 PASS，后续阶段不得开工。
- 若发现越级推进，立即停线并回退到最近一个通过门禁的阶段。

### 4.2 违规处理示例
- 示例 A: 直接进入 Adaptation（跳过 Review）
  - 处理: 标记 `STAGE_ORDER_VIOLATION`
  - 回退: 返回 Review 阶段重新评审
  - 证据: 在 `operations/quality/` 落地违规说明
- 示例 B: Delivery 前发现 Xiaohongshu 版本未过清单
  - 处理: 标记 `PACKAGE_INCOMPLETE`
  - 回退: 返回 Adaptation 补齐并重审
  - 证据: 在 `operations/handoff/` 记录驳回码与重交截止

## 5. 步级审计证据要求与存储路径

| Stage | Evidence Type | Required Fields | Storage Path |
| --- | --- | --- | --- |
| Briefing | 立项与范围记录 | actor, action, input, output, timestamp | operations/sop/ |
| Research | 证据检索与来源清单 | source_type, link, extraction_note, owner, timestamp | projects/*/research/ 或 docs/research/ |
| Draft | 主稿提交与自检 | version, self_check, owner, timestamp | projects/*/drafts/ |
| Review | 打分与驳回包 | score_table, critical_items, reject_code, deadline | operations/quality/ |
| Adaptation | 平台改写记录 | platform_delta, checklist_result, owner | deliverables/wechat/ 与 deliverables/xiaohongshu/ |
| Delivery | 交付包与签收日志 | package_version, acceptance_sla, decision | operations/handoff/ 与 deliverables/packages/ |
| Archive | 迁移映射与复盘 | old_path, new_path, reason, operator, batch_id | archive/migration/ 与 archive/ARCHIVE_INDEX.md |

若任一步骤缺失必填审计字段，批次状态必须回退到 `IN_PROGRESS`，并在下一节拍窗口补齐。

## 6. 模板与配套文档入口

- 阶段入场/出场模板: `templates/stage-entry-exit-criteria-template.md`
- 交接包模板: `templates/handoff-package-template.md`
- 评审报告模板: `templates/review-report-template.md`
- 升级报告模板: `templates/escalation-report-template.md`
- 发布前检查模板: `templates/pre-publish-validation-checklist.md`

## 7. 参考执行样例（织田信长）

1. Briefing: 目标为“冲突驱动人物小说”，渠道为微信+小红书。
2. Research: 输出生平关键节点、政治冲突、人物矛盾图谱与证据锚点。
3. Draft: 形成正文 v1.0，突出人物复杂性并完成自检。
4. Review: 关键项“事实准确”与“叙事逻辑”均通过；双阈值通过。
5. Adaptation: 长文版强调叙事连贯，笔记版强调钩子与互动。
6. Delivery: 输出双平台包并附检查清单，触发下游签收。
7. Archive: 归档 v1.0 与评审记录，沉淀复盘结论。
