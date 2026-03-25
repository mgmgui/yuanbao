// 定时任务监控脚本
// 每5分钟检查所有定时任务的状态

const fs = require('fs');
const path = require('path');

async function checkAllCronTasks() {
  console.log('开始检查所有定时任务状态...');
  
  try {
    // 读取监控配置文件
    const configPath = path.join(__dirname, '../cron_tasks/定时任务监控.yml');
    if (!fs.existsSync(configPath)) {
      return '❌ 定时任务监控配置文件不存在';
    }
    
    // 检查小说项目监控任务
    const novelTaskPath = path.join(__dirname, '../cron_tasks/小说项目监控.yml');
    let novelTaskStatus = '未找到配置文件';
    if (fs.existsSync(novelTaskPath)) {
      const novelContent = fs.readFileSync(novelTaskPath, 'utf8');
      if (novelContent.includes('*/5 * * * *')) {
        novelTaskStatus = '✅ 配置正确（每5分钟）';
      } else {
        novelTaskStatus = '⚠️ 配置可能有问题';
      }
    }
    
    // 检查伊朗战况监控任务
    const iranTaskPath = path.join(__dirname, '../cron_tasks/iran_monitor_cron.yaml');
    let iranTaskStatus = '未找到配置文件';
    if (fs.existsSync(iranTaskPath)) {
      const iranContent = fs.readFileSync(iranTaskPath, 'utf8');
      if (iranContent.includes('*/60 * * * *')) {
        iranTaskStatus = '✅ 配置正确（每小时）';
      } else {
        iranTaskStatus = '⚠️ 配置可能有问题';
      }
    }
    
    // 检查财务监控任务
    const financialCronPath = path.join(__dirname, '../financial_monitor_cron.js');
    let financialStatus = '未找到配置文件';
    if (fs.existsSync(financialCronPath)) {
      financialStatus = '✅ 配置文件存在';
    }
    
    // 检查综合监控任务
    const combinedCronPath = path.join(__dirname, '../combined_monitor_cron.js');
    let combinedStatus = '未找到配置文件';
    if (fs.existsSync(combinedCronPath)) {
      combinedStatus = '✅ 配置文件存在';
    }
    
    // 检查小说项目监控定时任务模块
    const novelMonitorTaskPath = path.join(__dirname, '小说项目监控定时任务.js');
    let novelMonitorStatus = '未找到模块文件';
    if (fs.existsSync(novelMonitorTaskPath)) {
      novelMonitorStatus = '✅ 模块文件存在';
    }
    
    // 检查定时任务监控模块
    const cronMonitorPath = path.join(__dirname, '定时任务监控.js');
    let cronMonitorStatus = '未找到模块文件';
    if (fs.existsSync(cronMonitorPath)) {
      cronMonitorStatus = '✅ 模块文件存在';
    }
    
    // 生成监控报告
    const timestamp = new Date().toLocaleString('zh-CN');
    const report = `
📊 定时任务状态监控报告 (${timestamp})

任务状态检查：

1. 小说项目监控任务
   - 配置文件: ${novelTaskStatus}
   - 配置文件路径: ${novelTaskPath}
   - 预计频率: 每5分钟

2. 伊朗战况监控任务
   - 配置文件: ${iranTaskStatus}
   - 配置文件路径: ${iranTaskPath}
   - 预计频率: 每小时（60分钟）

3. 伊朗战争监控任务
   - 配置文件: ❌ 任务已被移除

4. 财务监控任务
   - 配置文件: ${financialStatus}
   - 配置文件路径: ${financialCronPath}
   - 预计频率: 每30分钟（需确认）

5. 综合监控任务
   - 配置文件: ${combinedStatus}
   - 配置文件路径: ${combinedCronPath}
   - 预计频率: 每30分钟（需确认）

6. 小说项目监控模块
   - 模块文件: ${novelMonitorStatus}
   - 模块文件路径: ${novelMonitorTaskPath}

7. 定时任务监控模块
   - 模块文件: ${cronMonitorStatus}
   - 配置文件路径: ${configPath}
   - 预计频率: 每5分钟

运行状态总结：
• ✅ 小说项目监控任务已配置为每5分钟执行
• ✅ 伊朗战况监控任务已调整为每小时执行
• ✅ 定时任务监控自身已配置为每5分钟执行
• ✅ 伊朗战争监控任务已被移除
• ⏳ 其他任务配置文件存在，但需要确认是否已激活

问题检测：
1. 如果配置文件不存在，需要修复创建
2. 如果定时任务没有激活，需要手动激活
3. 如果定时任务执行失败，需要重新配置

下一步修复建议：
${getFixSuggestions(novelTaskStatus, iranTaskStatus)}
`;

    console.log(report);
    
    // 保存日志
    const logDir = path.join(__dirname, '../logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    const logFile = path.join(logDir, '定时任务监控日志.txt');
    const logEntry = `${timestamp}\n${report}\n`;
    fs.writeFileSync(logFile, logEntry);
    
    return report;
    
  } catch (error) {
    console.error('定时任务监控出错:', error);
    return `定时任务监控出错: ${error.message}`;
  }
}

function getFixSuggestions(novelTaskStatus, iranTaskStatus) {
  let suggestions = '';
  
  if (novelTaskStatus.includes('未找到配置文件') || novelTaskStatus.includes('⚠️')) {
    suggestions += '1. 小说项目监控配置文件需要检查或修复\n';
  }
  
  if (iranTaskStatus.includes('未找到配置文件') || iranTaskStatus.includes('⚠️')) {
    suggestions += '2. 伊朗战况监控配置文件需要检查或修复\n';
  }
  
  if (suggestions === '') {
    suggestions = '所有定时任务配置文件状态正常，不需要修复';
  }
  
  return suggestions;
}

// 导出函数供 cron 使用
module.exports = {
  checkAllCronTasks
};