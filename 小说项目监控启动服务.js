// 小说项目监控启动服务
// 配置定时任务系统，每5分钟检查小说创作团队进度

const fs = require('fs');
const path = require('path');

async function startMonitoringService() {
  console.log('🔧 配置小说项目定时监控服务...');
  
  try {
    // 检查 cron 文件夹结构
    const cronDir = path.join(__dirname, 'cron');
    if (!fs.existsSync(cronDir)) {
      fs.mkdirSync(cronDir, { recursive: true });
      console.log('✅ 创建 cron 文件夹');
    }
    
    // 检查 cron_tasks 文件夹结构
    const cronTasksDir = path.join(__dirname, 'cron_tasks');
    if (!fs.existsSync(cronTasksDir)) {
      fs.mkdirSync(cronTasksDir, { recursive: true });
      console.log('✅ 创建 cron_tasks 文件夹');
    }
    
    // 复制配置文件
    const sourceConfig = path.join(__dirname, 'cron_tasks/小说项目监控.yml');
    const destConfig = path.join(__dirname, 'cron/小说项目监控.yml');
    
    if (fs.existsSync(sourceConfig)) {
      fs.copyFileSync(sourceConfig, destConfig);
      console.log('✅ 复制定时任务配置文件');
    }
    
    // 检查所有必要的文件
    const requiredFiles = [
      '小说项目10分钟监控脚本.js',
      '小说项目定时监控脚本.js',
      '小说项目监控定时任务.js',
      'cron_tasks/小说项目监控.yml',
      'cron/小说项目监控.yml'
    ];
    
    console.log('\n📋 检查文件完整性...');
    for (const file of requiredFiles) {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} 存在`);
      } else {
        console.log(`❌ ${file} 缺失`);
      }
    }
    
    // 检查日本项目结构
    const japanDir = path.join(__dirname, '日本');
    if (fs.existsSync(japanDir)) {
      const japanSubfolders = ['人物档案', '小说稿', '评审报告', '归档'];
      console.log('\n📁 检查日本项目文件夹...');
      for (const folder of japanSubfolders) {
        const folderPath = path.join(japanDir, folder);
        if (fs.existsSync(folderPath)) {
          const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.md'));
          console.log(`✅ ${folder}: ${files.length} 个文件`);
        } else {
          console.log(`❌ ${folder} 缺失`);
        }
      }
    }
    
    // 检查TODO清单完整性
    const todoFile = path.join(__dirname, '全球人物小说项目TODO清单_详细版.md');
    if (fs.existsSync(todoFile)) {
      console.log('✅ TODO清单已建立');
    }
    
    // 检查矛盾小说评审标准
    const standardsFile = path.join(__dirname, '矛盾小说评审标准.md');
    if (fs.existsSync(standardsFile)) {
      console.log('✅ 矛盾小说评审标准已建立');
    }
    
    // 运行一次监控测试
    console.log('\n🚀 运行一次监控测试...');
    const monitorModule = require('./小说项目10分钟监控脚本');
    const report = monitorModule.checkProjectStatus();
    
    console.log('\n🎯 监控测试结果：');
    console.log(report);
    
    // 创建定时任务执行日志文件
    const logDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
      console.log('✅ 创建日志文件夹');
    }
    
    const logFile = path.join(logDir, '小说项目监控.log');
    const timestamp = new Date().toISOString().replace(/:/g, '-').slice(0, 19);
    const logEntry = `${timestamp} - 小说项目监控服务启动\n${report}\n`;
    
    fs.writeFileSync(logFile, logEntry);
    console.log('✅ 监控日志已创建');
    
    return {
      status: 'success',
      message: '小说项目监控服务已成功配置',
      next_check: '5分钟后',
      current_progress: report
    };
    
  } catch (error) {
    console.error('❌ 服务启动失败:', error);
    return {
      status: 'error',
      message: `服务启动失败: ${error.message}`,
      error_details: error.stack
    };
  }
}

// 立即启动监控服务
startMonitoringService().then(result => {
  console.log('\n📊 启动结果：');
  console.log(result);
  
  if (result.status === 'success') {
    console.log('\n🎉 小说项目定时监控服务已启动！');
    console.log('🔔 将在每5分钟自动检查项目进度');
    console.log('📝 监控报告将发送到聊天频道');
  }
}).catch(error => {
  console.error('启动失败:', error);
});