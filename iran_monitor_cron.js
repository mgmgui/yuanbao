#!/usr/bin/env node

/**
 * 伊朗战况监控定时任务
 * 每30分钟执行一次伊朗战况监控
 */

const { runIranMonitor } = require('/root/.openclaw/workspace/iran_monitor_full.js');

// 定时监控间隔（30分钟）
const INTERVAL_MS = 30 * 60 * 1000;

console.log("⏰ 伊朗战况定时监控启动...");
console.log(`监控间隔: ${INTERVAL_MS / 1000 / 60} 分钟`);
console.log(`首次执行时间: ${new Date().toLocaleString('zh-CN')}`);

// 第一次立即执行
console.log("\n第一次执行:");
runIranMonitor();

// 设置定时器，每30分钟执行一次
setInterval(() => {
  const now = new Date();
  console.log(`\n[${now.toLocaleString('zh-CN')}] 定时执行伊朗战况监控...`);
  
  try {
    const report = runIranMonitor();
    
    if (report) {
      console.log(`✅ 监控完成，生成报告成功`);
      
      // 生成通知消息
      const notification = generateNotification(report);
      console.log(`📱 通知内容: ${notification}`);
      
      // 这里可以添加发送消息的逻辑
      // 例如：发送到群聊、保存到文件等
      
    } else {
      console.log(`❌ 监控失败，未生成报告`);
    }
  } catch (error) {
    console.error(`❌ 定时任务执行失败: ${error.message}`);
  }
}, INTERVAL_MS);

// 生成通知消息
function generateNotification(report) {
  const notification = `
伊朗战况监控报告（${report.监控时间}）

风险评估: ${report.风险评估.等级} (${report.风险评估.颜色})
风险描述: ${report.风险评估.风险}

统计信息:
• 新闻数量: ${report.新闻数量}条
• 军事动向: ${report.趋势分析.军事}条
• 外交动向: ${report.趋势分析.外交}条
• 经济动向: ${report.趋势分析.经济}条
• 地区关联: ${report.趋势分析.地区}条
• 伤亡报道: ${report.趋势分析.伤亡}条
• 国际介入: ${report.趋势分析.国际}条

主要建议: ${report.建议措施[0]}

详细信息保存在文件:
• 文本报告: /root/.openclaw/workspace/iran_monitor_report_*.txt
• JSON数据: /root/.openclaw/workspace/iran_monitor_data_*.json
`;
  
  return notification;
}

// 处理退出信号
process.on('SIGINT', () => {
  console.log("\n\n⚠️ 接收到退出信号，定时监控停止");
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log("\n\n⚠️ 接收到终止信号，定时监控停止");
  process.exit(0);
});

// 保持进程运行
console.log("\n定时监控任务已启动，每30分钟执行一次");
console.log("使用 Ctrl+C 停止监控");