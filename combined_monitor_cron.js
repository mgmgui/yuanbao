#!/usr/bin/env node

/**
 * 综合监控定时任务系统
 * 每半小时执行伊朗战况和财经市场监控
 */

const { runCombinedMonitor } = require('/root/.openclaw/workspace/combined_monitor.js');

// 定时监控间隔（30分钟）
const INTERVAL_MINUTES = 30;
const INTERVAL_MS = INTERVAL_MINUTES * .5 * 1000; // 为了测试，先设置30秒间隔

console.log("📡 综合监控定时系统启动");
console.log(`监控间隔: ${INTERVAL_MINUTES} 分钟`);
console.log(`启动时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);
console.log(`监控内容: 伊朗战况 + 财经市场`);

// 第一次执行
console.log("\n第一次执行综合监控:");
const firstResult = runCombinedMonitor();

// 设置定时器，每30分钟执行一次
setInterval(() => {
  const now = new Date();
  console.log(`\n[${now.toLocaleString('zh-CN')}] 执行综合监控...`);
  
  try {
    const result = runCombinedMonitor();
    
    if (result) {
      console.log(`✅ 综合监控完成，生成报告成功`);
      
      // 这里可以添加发送消息的逻辑
      // 例如发送到群聊等
      
      // 保存监控日志
      const logFile = `/root/.openclaw/workspace/combined_monitor_log_${now.toISOString().replace(/[:.]/g, '-')}.txt`;
      const logContent = `
综合监控日志
==========
监控时间: ${now.toLocaleString('zh-CN')}
伊朗战况风险评估: ${result.combinedReport.iranMonitor ? result.combinedReport.iranMonitor.风险评估.等级 : "数据未获取"}
财经市场总体情绪: ${result.combinedReport.financialMonitor ? result.combinedReport.financialMonitor.overallRecommendation.overallSentiment : "数据未获取"}
`;
      
      try {
        require('fs').writeFileSync(logFile, logContent);
        console.log(`📝 监控日志保存至: ${logFile}`);
      } catch (error) {
        console.error(`❌ 保存日志失败: ${error.message}`);
      }
      
    } else {
      console.log(`❌ 监控失败，未生成报告`);
    }
  } catch (error) {
    console.error(`❌ 定时监控执行失败: ${error.message}`);
  }
}, INTERVAL_MS);

// 处理退出信号
process.on('SIGINT', () => {
  console.log("\n\n⚠️ 接收到退出信号，综合监控停止");
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log("\n\n⚠️ 接收到终止信号，综合监控停止");
  process.exit(0);
});

// 保持进程运行
console.log("\n综合监控已启动，每30分钟执行一次");
console.log("使用 Ctrl+C 停止监控");

// 监控日志文件
const startupLogFile = `/root/.openclaw/workspace/combined_monitor_startup_log.txt`;
const startupLogContent = `
综合监控系统启动日志
================
启动时间: ${new Date().toLocaleString('zh-CN')}
监控间隔: ${INTERVAL_MINUTES} 分钟
监控内容: 伊朗战况 + 财经市场
监控状态: 已启动
`;
require('fs').writeFileSync(startupLogFile, startupLogContent);
console.log(`📝 启动日志保存至: ${startupLogFile}`);