# 统一任务状态模型

## 1. 状态集合

- TODO: 未开始
- IN_PROGRESS: 执行中
- BLOCKED: 被阻塞
- REVIEWING: 评审中
- REJECTED: 被驳回
- DONE: 已完成
- ARCHIVED: 已归档

## 2. 必填字段

- id
- title
- owner
- status
- priority
- due_date
- dependency
- updated_at
- next_action

## 3. 状态流转规则

- TODO -> IN_PROGRESS
- IN_PROGRESS -> REVIEWING
- REVIEWING -> DONE 或 REJECTED
- REJECTED -> IN_PROGRESS
- DONE -> ARCHIVED

## 4. 时间要求

- 每次状态变更必须记录更新时间和责任人
- BLOCKED 超过 24 小时必须升级
