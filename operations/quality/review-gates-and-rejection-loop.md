# 质量门禁与驳回闭环

## 1. 评审维度

- FACT: 事实准确性
- LOGIC: 情节与因果逻辑
- CHARACTER: 人物立体度
- NARRATIVE: 叙事张力与可读性
- PLATFORM: 平台合规与表达适配

## 2. 双阈值规则

- 总分通过线: >= 85/100
- 关键项通过线: FACT、LOGIC、PLATFORM 每项 >= 80
- 任一关键项未达标: 必须驳回

## 3. 驳回码

- FACT-01: 史实错误
- LOGIC-01: 因果断裂
- CHARACTER-01: 人物扁平
- NARR-01: 叙事节奏失衡
- PLATFORM-01: 平台规范不符

## 4. 驳回与重写规则

- 驳回必须附:
  - 驳回码
  - 证据片段
  - 最小重写范围
  - 截止时间
- 重写 SLA:
  - 首次驳回: 24 小时内提交
  - 二次驳回: 12 小时内提交并升级负责人
  - 三次驳回: 触发升级流程并建 issue

## 5. 评审报告模板位置

- templates/review-report-template.md
