// 小说项目定时监控脚本
// 每10分钟自动检查小说创作团队进度

const fs = require('fs');
const path = require('path');

// 导入监控函数
const monitor = require('./小说项目10分钟监控脚本');

function runMonitor() {
  console.log('========== 小说项目定时监控开始 ==========');
  const timestamp = new Date().toISOString().replace(/:/g, '-').slice(0, 19);
  console.log(`执行时间: ${timestamp}`);
  
  // 运行监控
  const reportMessage = monitor.checkProjectStatus();
  
  // 生成发送消息
  const sendMessage = reportMessage;
  
  console.log('========== 小说项目定时监控结束 ==========\n');
  
  return sendMessage;
}

// 创建定时任务
function scheduleMonitor() {
  console.log('设置定时监控任务：每10分钟检查一次');
  
  // 立即运行一次
  runMonitor();
  
  // 设置定时器，每10分钟运行一次
  const intervalMs = 10 * 60 * 1000; // 10分钟
  
  setInterval(() => {
    try {
      console.log('定时监控开始执行...');
      const message = runMonitor();
      
      // 这里可以添加发送消息的代码
      // 例如通过OpenClaw的消息系统发送到聊天
      console.log('监控报告准备发送：\n' + message);
      
    } catch (error) {
      console.error('定时监控执行出错:', error);
    }
  }, intervalMs);
  
  console.log(`定时监控已设置，每${intervalMs/1000}秒运行一次`);
}

// 检查必要文件是否存在
function checkSetup() {
  const requiredFiles = [
    '小说项目10分钟监控脚本.js',
    '矛盾小说评审标准.md',
    '全球人物小说项目TODO清单_详细版.md',
    '日本人物清单.md',
    '英国人物清单.md',
    '法国人物清单.md',
    '俄罗斯人物清单.md',
    '印度人物清单.md',
    '美国人物清单.md'
  ];
  
  console.log('检查必要文件...');
  for (const file of requiredFiles) {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file} 存在`);
    } else {
      console.log(`❌ ${file} 缺失`);
    }
  }
  
  // 检查日本项目文件夹
  const japanDir = path.join(__dirname, '日本');
  if (fs.existsSync(japanDir)) {
    console.log('✅ 日本项目文件夹存在');
  } else {
    console.log('❌ 日本项目文件夹缺失');
  }
}

// 启动定时监控
if (process.argv.includes('--setup')) {
  console.log('执行初始化检查');
  checkSetup();
} else if (process.argv.includes('--run')) {
  console.log('执行一次监控');
  runMonitor();
} else {
  scheduleMonitor();
}