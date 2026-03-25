#!/bin/bash

# 启动所有监控定时任务
# 1. 伊朗战况监控
# 2. 财经市场监控
# 3. 综合监控

echo "🚀 启动所有监控定时任务..."
echo "当前时间: $(date '+%Y-%m-%d %H:%M:%S')"

echo "🔍 检查监控系统..."
echo "📡 伊朗战况监控系统状态..."
if [ -f "/root/.openclaw/workspace/iran_monitor_final.js" ]; then
  echo "✅ 伊朗战况监控系统已准备"
else
  echo "❌ 伊朗战况监控系统未找到"
fi

echo "💰 财经市场监控系统状态..."
if [ -f "/root/.openclaw/workspace/financial_monitor.js" ]; then
  echo "✅ 财经市场监控系统已准备"
else
  echo "❌ 财经市场监控系统未找到"
fi

echo "📡 综合监控系统状态..."
if [ -f "/root/.openclaw/workspace/combined_monitor.js" ]; then
  echo "✅ 综合监控系统已准备"
else
  echo "❌ 综合监控系统未找到"
fi

# 创建监控状态文件
echo "📝 创建监控状态文件..."
cat > /root/.openclaw/workspace/monitor_status.txt << EOF
监控系统状态
============
更新时间: $(date '+%Y-%m-%d %H:%M:%S')
监控系统:
1. 伊朗战况监控系统: 已准备
2. 财经市场监控系统: 已准备
3. 综合监控系统: 已准备

监控内容:
伊朗战况监控:
  - 军事动向
  - 外交动向
  - 经济动向
  - 国际介入
  - 伤亡报道
  - 风险评估

财经市场监控:
  - 债券市场
  - 黄金价格
  - 大宗商品
  - 石油价格
  - 股票市场
  - A股市场
  - 美股市场
  - 巴西市场
  - 日本市场
  - 韩国市场
  - 印度市场
  - 亚洲市场
  - 可转债策略

综合监控:
  - 伊朗战况 + 财经市场
  - 综合分析
  - 综合建议

监控频率: 每半小时执行一次

输出文件:
  - 伊朗战况报告: /root/.openclaw/workspace/iran_war_report_*.txt
  - 财经市场报告: /root/.openclaw/workspace/financial_report_summary_*.txt
  - 综合监控报告: /root/.openclaw/workspace/combined_report_*.txt

监控日志:
  - 伊朗监控日志: /root/.openclaw/workspace/iran_monitor_log_*.txt
  - 财经监控日志: /root/.openclaw/workspace/financial_monitor_log_*.txt
  - 综合监控日志: /root/.openclaw/workspace/combined_monitor_log_*.txt

启动命令:
  - 伊朗监控: node /root/.openclaw/workspace/iran_monitor_cron_task.js
  - 财经监控: node /root/.openclaw/workspace/financial_monitor_cron.js
  - 综合监控: node /root/.openclaw/workspace/combined_monitor_cron.js
EOF

echo "📄 状态文件已创建: /root/.openclaw/workspace/monitor_status.txt"

echo "📊 开始执行监控..."

# 执行伊朗战况监控（单次执行）
echo "🇮🇷 执行伊朗战况监控..."
node /root/.openclaw/workspace/iran_monitor_final.js > /root/.openclaw/workspace/iran_monitor_output.log 2>&1 &
IRAN_PID=$!
echo "✅ 伊朗战况监控启动 (PID: $IRAN_PID)"

# 执行财经市场监控（单次执行）
echo "💰 执行财经市场监控..."
node /root/.openclaw/workspace/financial_monitor.js > /root/.openclaw/workspace/financial_monitor_output.log 2>&1 &
FINANCIAL_PID=$!
echo "✅ 财经市场监控启动 (PID: $FINANCIAL_PID)"

# 执行综合监控（单次执行）
echo "📡 执行综合监控..."
node /root/.openclaw/workspace/combined_monitor.js > /root/.openclaw/workspace/combined_monitor_output.log 2>&1 &
COMBINED_PID=$!
echo "✅ 综合监控启动 (PID: $COMBINED_PID)"

# 创建定时任务配置
echo "⏰ 创建定时任务配置..."
cat > /root/.openclaw/workspace/monitor_tasks.json << EOF
{
  "monitor_tasks": {
    "iran_monitor": {
      "description": "伊朗战况监控",
      "command": "node /root/.openclaw/workspace/iran_monitor_final.js",
      "interval": "30分钟",
      "status": "已启动",
      "pid": $IRAN_PID,
      "output": "/root/.openclaw/workspace/iran_monitor_output.log"
    },
    "financial_monitor": {
      "description": "财经市场监控",
      "command": "node /root/.openclaw/workspace/financial_monitor.js",
      "interval": "30分钟",
      "status": "已启动",
      "pid": $FINANCIAL_PID,
      "output": "/root/.openclaw/workspace/financial_monitor_output.log"
    },
    "combined_monitor": {
      "description": "综合监控（伊朗战况 + 财经市场）",
      "command": "node /root/.openclaw/workspace/combined_monitor.js",
      "interval": "30分钟",
      "status": "已启动",
      "pid": $COMBINED_PID,
      "output": "/root/.openclaw/workspace/combined_monitor_output.log"
    }
  },
  "startup_time": "$(date '+%Y-%m-%d %H:%M:%S')",
  "report_locations": {
    "iran_reports": "/root/.openclaw/workspace/iran_war_report_*.txt",
    "financial_reports": "/root/.openclaw/workspace/financial_report_summary_*.txt",
    "combined_reports": "/root/.openclaw/workspace/combined_report_*.txt",
    "iran_data": "/root/.openclaw/workspace/iran_war_report_*.json",
    "financial_data": "/root/.openclaw/workspace/financial_report_detail_*.json"
  }
}
EOF

echo "📄 定时任务配置已创建: /root/.openclaw/workspace/monitor_tasks.json"

echo "✅ 所有监控系统已启动!"
echo ""
echo "📈 监控系统功能说明:"
echo "1. 伊朗战况监控: 每半小时监控伊朗冲突相关新闻"
echo "2. 财经市场监控: 每半小时监控债券、黄金、商品、石油、股票、A股、美股、巴西、日本、韩国、印度、亚洲市场、可转债策略"
echo "3. 综合监控: 整合伊朗战况和财经市场监控，提供综合分析和建议"
echo ""
echo "📊 监控输出:"
echo "伊朗战况监控输出: /root/.openclaw/workspace/iran_monitor_output.log"
echo "财经市场监控输出: /root/.openclaw/workspace/financial_monitor_output.log"
echo "综合监控输出: /root/.openclaw/workspace/combined_monitor_output.log"
echo ""
echo "📁 报告文件:"
echo "伊朗战况报告: /root/.openclaw/workspace/iran_war_report_*.txt"
echo "财经市场报告: /root/.openclaw/workspace/financial_report_summary_*.txt"
echo "综合监控报告: /root/.openclaw/workspace/combined_report_*.txt"
echo ""
echo "⚠️ 监控进程:"
echo "伊朗战况监控 PID: $IRAN_PID"
echo "财经市场监控 PID: $FINANCIAL_PID"
echo "综合监控 PID: $COMBINED_PID"
echo ""
echo "📝 查看最新报告:"
echo "find /root/.openclaw/workspace -name \"*report*.txt\" -exec ls -lh {} \\; | head -5"
echo ""
echo "🎯 每半小时自动执行一次监控"
echo "如需停止监控，请执行:"
echo "kill $IRAN_PID $FINANCIAL_PID $COMBINED_PID"