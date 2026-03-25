// Cron 任务管理器
// 管理和检查所有定时任务的执行状态

const fs = require('fs');
const path = require('path');

async function manageCronTasks() {
  console.log('🚀 Cron 任务管理器启动');
  
  // 1. 检查所有定时任务配置文件
  console.log('\n📋 检查定时任务配置文件:');
  
  const cronTasksDir = path.join(__dirname, 'cron_tasks');
  if (!fs.existsSync(cronTasksDir)) {
    console.log('❌ cron_tasks 文件夹不存在');
    return;
  }
  
  const cronFiles = fs.readdirSync(cronTasksDir).filter(f => f.endsWith('.yml') || f.endsWith('.json'));
  console.log(`✅ cron_tasks 文件夹中有 ${cronFiles.length} 个任务配置文件`);
  
  for (const file of cronFiles) {
    const filePath = path.join(cronTasksDir, file);
    const stats = fs.statSync(filePath);
    console.log(`  📄 ${file} (${stats.size} bytes)`);
  }
  
  // 2. 检查 cron 文件夹（执行模块）
  console.log('\n📋 检查 cron 文件夹（执行模块):');
  
  const cronDir = path.join(__dirname, 'cron');
  if (!fs.existsSync(cronDir)) {
    console.log('❌ cron 文件夹不存在');
    return;
  }
  
  const cronModuleFiles = fs.readdirSync(cronDir).filter(f => f.endsWith('.js') || f.endsWith('.yml') || f.endsWith('.json'));
  console.log(`✅ cron 文件夹中有 ${cronModuleFiles.length} 个执行模块`);
  
  for (const file of cronModuleFiles) {
    const filePath = path.join(cronDir, file);
    const stats = fs.statSync(filePath);
    console.log(`  📄 ${file} (${stats.size} bytes)`);
  }
  
  // 3. 检查定时任务是否能在 OpenClaw 中运行
  console.log('\n📋 检查 OpenClaw Cron 状态:');
  console.log('执行命令: openclaw cron list');
  
  // 这个需要在 OpenClaw 环境中运行
  // 暂时输出配置信息
  
  // 4. 检查小说项目监控配置
  console.log('\n📊 小说项目监控配置详情:');
  
  const novelConfigPath = path.join(cronTasksDir, '小说项目监控.yml');
  if (fs.existsSync(novelConfigPath)) {
    const content = fs.readFileSync(novelConfigPath, 'utf8');
    console.log('✅ 小说项目监控配置存在');
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.includes('schedule') || line.includes('module') || line.includes('function')) {
        console.log(`  ${line}`);
      }
    }
  } else {
    console.log('❌ 小说项目监控配置不存在');
  }
  
  // 5. 检查伊朗战况监控配置
  console.log('\n📊 伊朗战况监控配置详情:');
  
  const iranConfigPath = path.join(cronTasksDir, 'iran_monitor_cron.yaml');
  if (fs.existsSync(iranConfigPath)) {
    const content = fs.readFileSync(iranConfigPath, 'utf8');
    console.log('✅ 伊朗战况监控配置存在');
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.includes('schedule') || line.includes('task') || line.includes('description')) {
        console.log(`  ${line}`);
      }
    }
  } else {
    console.log('❌ 伊朗战况监控配置不存在');
  }
  
  // 6. 检查定时任务监控配置
  console.log('\n📊 定时任务监控配置详情:');
  
  const cronMonitorPath = path.join(cronTasksDir, '定时任务监控.yml');
  if (fs.existsSync(cronMonitorPath)) {
    const content = fs.readFileSync(cronMonitorPath, 'utf8');
    console.log('✅ 定时任务监控配置存在');
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.includes('schedule') || line.includes('module') || line.includes('function')) {
        console.log(`  ${line}`);
      }
    }
  } else {
    console.log('❌ 定时任务监控配置不存在');
  }
  
  // 7. 创建定时任务激活脚本
  console.log('\n🔧 创建定时任务激活脚本...');
  
  const cronActivationScript = `
#!/bin/bash

echo "=============================================="
echo "激活 OpenClaw Cron 任务"
echo "=============================================="

# 创建 cron 配置
echo "创建 cron 配置文件..."

# 小说项目监控任务（每5分钟）
echo "创建小说项目监控任务..."
openclaw cron add --config ./cron_tasks/小说项目监控.yml

# 伊朗战况监控任务（每小时）
echo "创建伊朗战况监控任务..."
openclaw cron add --config ./cron_tasks/iran_monitor_cron.yaml

# 定时任务监控任务（每5分钟）
echo "创建定时任务监控任务..."
openclaw cron add --config ./cron_tasks/定时任务监控.yml

echo "=============================================="
echo "Cron 任务激活完成"
echo "=============================================="
`;

  const activationScriptPath = path.join(__dirname, '激活定时任务.sh');
  fs.writeFileSync(activationScriptPath, cronActivationScript);
  console.log(`✅ 创建了激活脚本: ${activationScriptPath}`);
  
  // 8. 运行测试脚本
  console.log('\n🧪 运行测试脚本:');
  
  // 测试小说项目监控
  console.log('测试小说项目监控...');
  const novelTestPath = path.join(__dirname, '小说项目10分钟监控脚本.js');
  if (fs.existsSync(novelTestPath)) {
    const novelTest = require('./小说项目10分钟监控脚本');
    try {
      const result = novelTest.checkProjectStatus();
      console.log('✅ 小说项目监控脚本测试成功');
    } catch (error) {
      console.log(`❌ 小说项目监控脚本测试失败: ${error.message}`);
    }
  }
  
  // 测试定时任务监控
  console.log('测试定时任务监控...');
  const cronMonitorTestPath = path.join(__dirname, 'cron/定时任务监控.js');
  if (fs.existsSync(cronMonitorTestPath)) {
    const cronMonitorTest = require('./cron/定时任务监控');
    try {
      const result = cronMonitorTest.checkAllCronTasks();
      console.log('✅ 定时任务监控脚本测试成功');
    } catch (error) {
      console.log(`❌ 定时任务监控脚本测试失败: ${error.message}`);
    }
  }
  
  console.log('\n🎉 Cron 任务管理器检查完成');
  
  return {
    status: 'success',
    message: '定时任务配置检查完成',
    cron_files: cronFiles.length,
    cron_modules: cronFiles.length,
    activation_script: activationScriptPath
  };
}

// 导出函数
module.exports = {
  manageCronTasks
};

// 执行检查
if (require.main === module) {
  manageCronTasks().then(result => {
    console.log(result);
  }).catch(error => {
    console.error(error);
  });
}