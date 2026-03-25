#!/usr/bin/env node

/**
 * 伊朗战况监控定时任务脚本
 * 每半小时执行一次监控并发送通知
 */

const { monitorIranWar } = require('/root/.openclaw/workspace/iran_monitor_final.js');

// 定时监控间隔（30分钟）
const INTERVAL_MINUTES = 30;
const INTERVAL_MS = INTERVAL_MINUTES * 60 * 1000;

console.log("⏰ 伊朗战况定时监控系统启动");
console.log(`监控间隔: ${INTERVAL_MINUTES} 分钟`);
console.log(`启动时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);

// 第一次执行
console.log("\n第一次执行监控任务:");
const firstResult = monitorIranWar();

// 设置定时器，每30分钟执行一次
setInterval(() => {
  const now = new Date();
  console.log(`\n[${now.toLocaleString('zh-CN')}] 执行伊朗战况监控...`);
  
  try {
    const result = monitorIranWar();
    
    if (result) {
      console.log(`✅ 监控完成，生成报告成功`);
      
      // 这里可以添加发送消息的逻辑
      // 例如发送到群聊等
      
    } else {
      console.log(`❌ 监控失败，未生成报告`);
    }
  } catch (error) {
    console.error(`❌ 定时监控执行失败: ${error.message}`);
  }
}, INTERVAL_MS);

// 处理退出信号
process.on('SIGINT', () => {
  console.log("\n\n⚠️ 接收到退出信号，伊朗战况定时监控停止");
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log("\n\n⚠️ 接收到终止信号，伊朗战况定时监控停止");
  process.exit(0);
});

// 保持进程运行
console.log("\n伊朗战况定时监控已启动，每30分钟执行一次");
console.log("使用 Ctrl+C 停止监控");

// 监控日志文件
const logFile = `/root/.openclaw/workspace/iran_monitor_log_${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;
console.log(`监控日志保存至: ${logFile}`);