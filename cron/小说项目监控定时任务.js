// 小说项目监控定时任务
// 每10分钟自动检查小说创作团队进度并通过消息发送报告

const fs = require('fs');
const path = require('path');

async function runMonitorTask() {
  console.log('执行小说项目定时监控任务...');
  
  try {
    // 读取监控脚本并执行
    const monitorModule = require('../小说项目10分钟监控脚本');
    const result = monitorModule.checkProjectStatus();
    
    // 生成简洁的监控报告
    const timestamp = new Date().toLocaleString('zh-CN');
    const report = `
📊 小说项目10分钟进度监控报告 (${timestamp})

状态更新：
${result}

下一次检查：10分钟后
`;
    
    console.log(report);
    
    // 这里可以添加发送到聊天功能的代码
    // 当前在群里，我会手动发送
    
    return report;
    
  } catch (error) {
    console.error('监控任务出错:', error);
    return `监控任务出错: ${error.message}`;
  }
}

// 导出函数供 cron 使用
module.exports = {
  runMonitorTask
};