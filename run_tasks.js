/**
 * 定时任务执行脚本
 * 用于OpenClaw定时任务的统一执行入口
 */

const { exec } = require('child_process');

async function runTask(taskName) {
  console.log(`执行定时任务: ${taskName}`);
  
  switch (taskName) {
    case '小说创作项目监控':
      const { runNovelProjectMonitor } = require('./cron/小说创作项目监控.js');
      return await runNovelProjectMonitor();
      
    case '财经监控':
      const { runFinancialMonitor } = require('./cron/财经监控.js');
      return await runFinancialMonitor();
      
    case '国际局势监控':
      const { runInternationalMonitor } = require('./cron/国际局势监控.js');
      return await runInternationalMonitor();
      
    case '定时任务执行监控':
      const { runTaskExecutionMonitor } = require('./cron/定时任务执行监控.js');
      return await runTaskExecutionMonitor();
      
    default:
      console.error(`未知的任务: ${taskName}`);
      return `未知任务: ${taskName}`;
  }
}

module.exports = { runTask };