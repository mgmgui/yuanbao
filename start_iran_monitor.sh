#!/bin/bash

# 启动伊朗战况监控定时任务
# 每半小时执行一次

echo "🚀 启动伊朗战况定时监控系统..."
echo "当前时间: $(date '+%Y-%m-%d %H:%M:%S')"

# 检查依赖
echo "🔍 检查依赖..."
npm list axios cheerio | grep -E "axios|cheerio" || echo "可能需要安装依赖"

# 启动监控任务
echo "📡 启动监控任务..."
node /root/.openclaw/workspace/iran_monitor_cron_task.js &

# 保存进程ID
MONITOR_PID=$!
echo "✅ 伊朗战况监控任务已启动 (PID: $MONITOR_PID)"

# 创建定时任务配置文件
echo "⏰ 创建定时任务配置文件..."
cat > /root/.openclaw/workspace/iran_monitor_schedule.txt << EOF
伊朗战况监控定时任务配置
=======================
任务名称: 伊朗战况新闻监控
执行间隔: 每30分钟
执行命令: node /root/.openclaw/workspace/iran_monitor_final.js
报告位置: /root/.openclaw/workspace/iran_war_report_*.txt
数据位置: /root/.openclaw/workspace/iran_war_report_*.json
监控状态: 已启动
启动时间: $(date '+%Y-%m-%d %H:%M:%S')
EOF

echo "📄 配置文件已创建: /root/.openclaw/workspace/iran_monitor_schedule.txt"

# 创建监控日志
echo "📝 创建监控日志..."
cat > /root/.openclaw/workspace/iran_monitor_status.log << EOF
伊朗战况监控状态日志
==================
PID: $MONITOR_PID
启动时间: $(date '+%Y-%m-%d %H:%M:%S')
状态: 运行中
EOF

echo "📝 监控日志已创建: /root/.openclaw/workspace/iran_monitor_status.log"

echo "✅ 伊朗战况定时监控系统已完全启动!"
echo "监控任务正在后台运行，每30分钟自动执行"
echo "使用 'ps aux | grep iran_monitor' 查看进程状态"
echo "使用 'kill $MONITOR_PID' 停止监控任务"