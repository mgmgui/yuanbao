#!/bin/bash

# 伊朗战况监控定时任务脚本
# 每半小时执行一次

echo "🚀 伊朗战况监控任务开始执行..."
echo "当前时间: $(date '+%Y-%m-%d %H:%M:%S')"

# 执行监控
node /root/.openclaw/workspace/iran_monitor_simple.js

# 获取最新报告文件
latest_report=$(find /root/.openclaw/workspace -name "iran_monitor_simple_*.txt" -type f -exec ls -1t {} \; | head -1)

if [ -f "$latest_report" ]; then
    echo "📄 找到最新报告文件: $latest_report"
    
    # 提取报告摘要
    report_summary=$(head -n 20 "$latest_report" | grep -E "^监控时间:|^新闻数量:|^风险等级:|^风险描述:|^军事动向:|^外交动向:|^经济动向:")
    
    # 创建通知消息
    echo "📱 创建通知消息..."
    
    # 这里可以添加发送消息到群聊的逻辑
    # 例如使用OpenClaw的message工具
    
    echo "通知内容:"
    echo "$report_summary"
else
    echo "❌ 未找到报告文件"
fi

echo "✅ 伊朗战况监控任务执行完成"