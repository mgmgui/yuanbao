# 团队交接与反馈闭环协议

## 1. 交接包必须字段

- version: 交付版本号
- stage: 当前阶段
- owner: 上游负责人
- files: 文件清单（相对路径）
- checklist: 阶段检查清单
- review_status: 评审状态
- change_summary: 变更摘要
- next_action: 下游预期动作

## 2. 下游签收 SLA

- 普通任务: 8 小时内签收或驳回
- 紧急任务: 2 小时内签收或驳回

## 3. 签收决策日志格式

| time | receiver | decision | reason_code | notes |
|------|----------|----------|-------------|-------|
| 2026-03-28 10:00 | review-team | ACCEPT | - | 完整可用 |

## 4. 驳回反馈路由

- 下游驳回 -> 自动通知上游 owner
- 必带内容:
  - 驳回码
  - 不通过证据
  - 最小重写范围
  - 重交截止时间

## 5. RACI

| 活动 | R | A | C | I |
|------|---|---|---|---|
| Briefing | PM | PM | Research Lead | All |
| Research | Research Team | Research Lead | Writer | PM |
| Draft | Writer Team | Writing Lead | Research Team | PM |
| Review | Review Team | Review Lead | Writer Lead | PM |
| Adaptation | Platform Team | Platform Lead | Review Lead | PM |
| Delivery | Delivery Team | Delivery Lead | Platform Lead | PM |
| Archive | Ops Team | Ops Lead | Delivery Lead | All |
