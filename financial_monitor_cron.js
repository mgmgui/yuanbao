#!/usr/bin/env node

/**
 * 财经监控定时任务系统
 * 每半小时执行财经市场监控
 */

const { monitorFinancialMarkets } = require('/root/.openclaw/workspace/financial_monitor.js');

// 定时监控间隔（30分钟）
const INTERVAL_MINUTES = 30;
const INTERVAL_MS = INTERVAL_MINUTES * 60 * 1000;

console.log("⏰ 财经市场定时监控系统启动");
console.log(`监控间隔: ${INTERVAL_MINUTES} 分钟`);
console.log(`启动时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);
console.log(`监控类别: 债券、黄金、商品、石油、股票、A股、美股、巴西、日本、韩国、印度、亚洲市场、可转债策略`);

// 第一次执行
console.log("\n第一次执行财经监控任务:");
const firstResult = monitorFinancialMarkets();

// 设置定时器，每30分钟执行一次
setInterval(() => {
  const now = new Date();
  console.log(`\n[${now.toLocaleString('zh-CN')}] 执行财经市场监控...`);
  
  try {
    const result = monitorFinancialMarkets();
    
    if (result) {
      console.log(`✅ 监控完成，生成报告成功`);
      
      // 这里可以添加发送消息的逻辑
      // 例如发送到群聊等
      
      // 保存监控日志
      const logFile = `/root/.openclaw/workspace/financial_monitor_log_${now.toISOString().replace(/[:.]/g, '-')}.txt`;
      const logContent = `
财经监控日志
==========
监控时间: ${now.toLocaleString('zh-CN')}
总体情绪: ${result.report.overallRecommendation.overallSentiment}
总体仓位建议: ${result.report.overallRecommendation.overallPosition} (${result.report.overallRecommendation.overallPercentage})
明日预测: ${result.report.tomorrowPrediction.overallTrend}
置信度: ${result.report.tomorrowPrediction.confidence}
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
  console.log("\n\n⚠️ 接收到退出信号，财经市场定时监控停止");
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log("\n\n⚠️ 接收到终止信号，财经市场定时监控停止");
  process.exit(0);
});

// 保持进程运行
console.log("\n财经市场定时监控已启动，每30分钟执行一次");
console.log("使用 Ctrl+C 停止监控");

// 监控日志文件
const startupLogFile = `/root/.openclaw/workspace/financial_monitor_startup_log.txt`;
const startupLogContent = `
财经监控系统启动日志
================
启动时间: ${new Date().toLocaleString('zh-CN')}
监控间隔: ${INTERVAL_MINUTES} 分钟
监控类别: 债券、黄金、商品、石油、股票、A股、美股、巴西、日本、韩国、印度、亚洲市场、可转债策略
监控状态: 已启动
`;
require('fs').writeFileSync(startupLogFile, startupLogContent);
console.log(`📝 启动日志保存至: ${startupLogFile}`);