#!/bin/bash

# 启动财经监控定时任务
# 每半小时执行一次

echo "💰 启动财经市场定时监控系统..."
echo "当前时间: $(date '+%Y-%m-%d %H:%M:%S')"

# 检查依赖
echo "🔍 检查依赖..."
npm list | grep -E "node" || echo "Node.js已安装"

# 启动监控任务
echo "📡 启动财经监控任务..."
node /root/.openclaw/workspace/financial_monitor_cron.js &

# 保存进程ID
MONITOR_PID=$!
echo "✅ 财经监控任务已启动 (PID: $MONITOR_PID)"

# 创建监控配置
echo "📊 创建监控配置..."
cat > /root/.openclaw/workspace/financial_monitor_config.json << EOF
{
  "name": "财经市场监控",
  "description": "每半小时监控债券、黄金、商品、石油、股票、A股、美股、巴西、日本、韩国、印度、亚洲市场、可转债策略",
  "interval": "30分钟",
  "startup_time": "$(date '+%Y-%m-%d %H:%M:%S')",
  "pid": $MONITOR_PID,
  "monitor_categories": [
    "债券",
    "黄金", 
    "商品",
    "石油",
    "股票",
    "A股",
    "美股",
    "巴西",
    "日本",
    "韩国",
    "印度",
    "亚洲市场",
    "可转债策略"
  ],
  "output_files": [
    "/root/.openclaw/workspace/financial_report_summary_*.txt",
    "/root/.openclaw/workspace/financial_report_detail_*.json",
    "/root/.openclaw/workspace/financial_monitor_log_*.txt"
  ],
  "status": "running"
}
EOF

echo "📄 配置文件已创建: /root/.openclaw/workspace/financial_monitor_config.json"

# 创建监控状态文件
echo "📝 创建监控状态..."
cat > /root/.openclaw/workspace/financial_monitor_status.txt << EOF
财经市场监控状态
================
PID: $MONITOR_PID
启动时间: $(date '+%Y-%m-%d %H:%M:%S')
监控间隔: 30分钟
监控状态: 运行中
监控类别:
  - 债券
  - 黄金
  - 商品
  - 石油
  - 股票
  - A股
  - 美股
  - 巴西
  - 日本
  - 韩国
  - 印度
  - 亚洲市场
  - 可转债策略

监控输出:
  - 摘要报告: /root/.openclaw/workspace/financial_report_summary_*.txt
  - 详细数据: /root/.openclaw/workspace/financial_report_detail_*.json
  - 监控日志: /root/.openclaw/workspace/financial_monitor_log_*.txt
EOF

echo "📝 状态文件已创建: /root/.openclaw/workspace/financial_monitor_status.txt"

echo "✅ 财经市场定时监控系统已完全启动!"
echo "监控任务正在后台运行，每30分钟自动执行"
echo "使用 'ps aux | grep financial_monitor' 查看进程状态"
echo "使用 'kill $MONITOR_PID' 停止监控任务"
echo ""
echo "📈 监控内容:"
echo "1. 债券市场动态"
echo "2. 黄金价格变化"
echo "3. 大宗商品市场"
echo "4. 石油价格趋势"
echo "5. 股票市场动态"
echo "6. A股市场分析"
echo "7. 美股市场趋势"
echo "8. 巴西市场情况"
echo "9. 日本市场状况"
echo "10. 韩国市场分析"
echo "11. 印度市场趋势"
echo "12. 亚洲市场整体"
echo "13. 可转债策略分析"
echo ""
echo "📊 输出包含:"
echo "• 市场情绪分析"
echo "• 仓位建议"
echo "• 明日趋势预测"
echo "• 风险等级评估"
echo "• 详细新闻摘要"