#!/bin/bash

# 监控服务管理脚本
# 功能: 启动、停止、状态查看监控系统

case "$1" in
  start)
    echo "🚀 启动监控服务..."
    /root/.openclaw/workspace/start_all_monitors.sh
    ;;
  
  stop)
    echo "🛑 停止监控服务..."
    
    # 查找监控进程
    IRAN_PID=$(ps aux | grep "iran_monitor_final.js" | grep -v grep | awk '{print $2}')
    FINANCIAL_PID=$(ps aux | grep "financial_monitor.js" | grep -v grep | awk '{print $2}')
    COMBINED_PID=$(ps aux | grep "combined_monitor.js" | grep -v grep | awk '{print $2}')
    
    if [ -n "$IRAN_PID" ]; then
      echo "停止伊朗战况监控 (PID: $IRAN_PID)"
      kill $IRAN_PID
    fi
    
    if [ -n "$FINANCIAL_PID" ]; then
      echo "停止财经市场监控 (PID: $FINANCIAL_PID)"
      kill $FINANCIAL_PID
    fi
    
    if [ -n "$COMBINED_PID" ]; then
      echo "停止综合监控 (PID: $COMBINED_PID)"
      kill $COMBINED_PID
    fi
    
    echo "✅ 监控服务已停止"
    ;;
  
  status)
    echo "📊 监控服务状态..."
    
    # 查看进程状态
    IRAN_STATUS=$(ps aux | grep "iran_monitor_final.js" | grep -v grep)
    FINANCIAL_STATUS=$(ps aux | grep "financial_monitor.js" | grep -v grep)
    COMBINED_STATUS=$(ps aux | grep "combined_monitor.js" | grep -v grep)
    
    echo "伊朗战况监控状态:"
    if [ -n "$IRAN_STATUS" ]; then
      echo "✅ 正在运行"
      echo "$IRAN_STATUS"
    else
      echo "❌ 未运行"
    fi
    
    echo ""
    echo "财经市场监控状态:"
    if [ -n "$FINANCIAL_STATUS" ]; then
      echo "✅ 正在运行"
      echo "$FINANCIAL_STATUS"
    else
      echo "❌ 未运行"
    fi
    
    echo ""
    echo "综合监控状态:"
    if [ -n "$COMBINED_STATUS" ]; then
      echo "✅ 正在运行"
      echo "$COMBINED_STATUS"
    else
      echo "❌ 未运行"
    fi
    
    echo ""
    echo "📁 最新报告文件:"
    IRAN_REPORT=$(find /root/.openclaw/workspace -name "iran_war_report_*.txt" -type f -exec ls -1t {} \; | head -1)
    FINANCIAL_REPORT=$(find /root/.openclaw/workspace -name "financial_report_summary_*.txt" -type f -exec ls -1t {} \; | head -1)
    COMBINED_REPORT=$(find /root/.openclaw/workspace -name "combined_report_*.txt" -type f -exec ls -1t {} \; | head -1)
    
    if [ -n "$IRAN_REPORT" ]; then
      echo "伊朗战况报告: $IRAN_REPORT"
      echo "更新时间: $(stat -c %y "$IRAN_REPORT" | cut -d' ' -f1-2)"
    else
      echo "伊朗战况报告: 无"
    fi
    
    if [ -n "$FINANCIAL_REPORT" ]; then
      echo "财经市场报告: $FINANCIAL_REPORT"
      echo "更新时间: $(stat -c %y "$FINANCIAL_REPORT" | cut -d' ' -f1-2)"
    else
      echo "财经市场报告: 无"
    fi
    
    if [ -n "$COMBINED_REPORT" ]; then
      echo "综合监控报告: $COMBINED_REPORT"
      echo "更新时间: $(stat -c %y "$COMBINED_REPORT" | cut -d' ' -f1-2)"
    else
      echo "综合监控报告: 无"
    fi
    
    echo ""
    echo "📝 监控日志:"
    IRAN_LOG=$(find /root/.openclaw/workspace -name "iran_monitor_log_*.txt" -type f -exec ls -1t {} \; | head -1)
    FINANCIAL_LOG=$(find /root/.openclaw/workspace -name "financial_monitor_log_*.txt" -type f -exec ls -1t {} \; | head -1)
    COMBINED_LOG=$(find /root/.openclaw/workspace -name "combined_monitor_log_*.txt" -type f -exec ls -1t {} \; | head -1)
    
    if [ -n "$IRAN_LOG" ]; then
      echo "伊朗监控日志: $IRAN_LOG"
    else
      echo "伊朗监控日志: 无"
    fi
    
    if [ -n "$FINANCIAL_LOG" ]; then
      echo "财经监控日志: $FINANCIAL_LOG"
    else
      echo "财经监控日志: 无"
    fi
    
    if [ -n "$COMBINED_LOG" ]; then
      echo "综合监控日志: $COMBINED_LOG"
    else
      echo "综合监控日志: 无"
    fi
    ;;
  
  restart)
    echo "🔄 重启监控服务..."
    $0 stop
    sleep 2
    $0 start
    ;;
  
  test)
    echo "🧪 测试监控系统..."
    
    echo "测试伊朗战况监控..."
    node /root/.openclaw/workspace/iran_monitor_final.js
    
    echo "测试财经市场监控..."
    node /root/.openclaw/workspace/financial_monitor.js
    
    echo "测试综合监控..."
    node /root/.openclaw/workspace/combined_monitor.js
    ;;
  
  logs)
    echo "📝 查看监控日志..."
    
    IRAN_LOG="/root/.openclaw/workspace/iran_monitor_output.log"
    FINANCIAL_LOG="/root/.openclaw/workspace/financial_monitor_output.log"
    COMBINED_LOG="/root/.openclaw/workspace/combined_monitor_output.log"
    
    if [ -f "$IRAN_LOG" ]; then
      echo "伊朗监控日志 ($IRAN_LOG):"
      tail -20 "$IRAN_LOG"
    else
      echo "伊朗监控日志: 文件不存在"
    fi
    
    echo ""
    if [ -f "$FINANCIAL_LOG" ]; then
      echo "财经监控日志 ($FINANCIAL_LOG):"
      tail -20 "$FINANCIAL_LOG"
    else
      echo "财经监控日志: 文件不存在"
    fi
    
    echo ""
    if [ -f "$COMBINED_LOG" ]; then
      echo "综合监控日志 ($COMBINED_LOG):"
      tail -20 "$COMBINED_LOG"
    else
      echo "综合监控日志: 文件不存在"
    fi
    ;;
  
  clean)
    echo "🧹 清理旧报告文件..."
    
    # 清理7天前的报告文件
    find /root/.openclaw/workspace -name "iran_war_report_*.txt" -type f -mtime +7 -delete
    find /root/.openclaw/workspace -name "iran_war_report_*.json" -type f -mtime +7 -delete
    find /root/.openclaw/workspace -name "financial_report_summary_*.txt" -type f -mtime +7 -delete
    find /root/.openclaw/workspace -name "financial_report_detail_*.json" -type f -mtime +7 -delete
    find /root/.openclaw/workspace -name "combined_report_*.txt" -type f -mtime +7 -delete
    find /root/.openclaw/workspace -name "iran_monitor_log_*.txt" -type f -mtime +7 -delete
    find /root/.openclaw/workspace -name "financial_monitor_log_*.txt" -type f -mtime +7 -delete
    find /root/.openclaw/workspace -name "combined_monitor_log_*.txt" -type f -mtime +7 -delete
    
    echo "✅ 清理完成"
    ;;
  
  help)
    echo "📖 监控服务管理脚本帮助"
    echo ""
    echo "用法: $0 {start|stop|status|restart|test|logs|clean|help}"
    echo ""
    echo "start    - 启动所有监控服务"
    echo "stop     - 停止所有监控服务"
    echo "status   - 查看监控服务状态"
    echo "restart  - 重启监控服务"
    echo "test     - 测试监控系统"
    echo "logs     - 查看监控日志"
    echo "clean    - 清理旧报告文件"
    echo "help     - 显示帮助信息"
    echo ""
    echo "监控内容:"
    echo "伊朗战况监控: 每半小时监控伊朗冲突相关新闻"
    echo "财经市场监控: 每半小时监控债券、黄金、商品、石油、股票、A股、美股、巴西、日本、韩国、印度、亚洲市场、可转债策略"
    echo "综合监控: 整合伊朗战况和财经市场监控"
    ;;
  
  *)
    echo "❌ 未知命令: $1"
    echo "使用: $0 {start|stop|status|restart|test|logs|clean|help}"
    exit 1
    ;;
esac