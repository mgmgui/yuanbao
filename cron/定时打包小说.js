// 定时打包小说文件
// 每次交付时自动打包最新的小说文件

const fs = require('fs');
const path = require('path');

async function packNovelFiles() {
  console.log('执行定时打包小说文件...');
  
  try {
    // 创建小说打包目录
    const packageDir = path.join(__dirname, '../snovel_package');
    if (!fs.existsSync(packageDir)) {
      fs.mkdirSync(packageDir, { recursive: true });
    }
    
    // 复制小说文件
    const novelFiles = [
      '织田信长小说.md',
      '织田信长小说评审报告.md',
      '丰臣秀吉小说.md',
      '丰臣秀吉小说评审报告.md',
      '织田信长矛盾小说.md',
      '织田信长矛盾小说评审报告.md',
      '小说交付摘要.md',
      '小说项目当前进度.md',
      '定时任务配置文档.md'
    ];
    
    let copyCount = 0;
    for (const file of novelFiles) {
      const sourcePath = path.join(__dirname, '../', file);
      const destPath = path.join(packageDir, file);
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        copyCount++;
        console.log(`✅ 复制: ${file}`);
      } else {
        console.log(`❌ 文件不存在: ${file}`);
      }
    }
    
    // 复制定时任务配置文件
    const cronDir = path.join(__dirname, '../cron_tasks');
    const cronFilesDir = path.join(packageDir, 'cron_tasks');
    if (!fs.existsSync(cronFilesDir)) {
      fs.mkdirSync(cronFilesDir, { recursive: true });
    }
    
    if (fs.existsSync(cronDir)) {
      const cronFiles = fs.readdirSync(cronDir);
      for (const file of cronFiles) {
        const sourcePath = path.join(cronDir, file);
        const destPath = path.join(cronFilesDir, file);
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ 复制定时任务: ${file}`);
      }
    }
    
    // 复制 cron 执行模块
    const cronModuleDir = path.join(__dirname, '../cron');
    const cronModuleFilesDir = path.join(packageDir, 'cron');
    if (!fs.existsSync(cronModuleFilesDir)) {
      fs.mkdirSync(cronModuleFilesDir, { recursive: true });
    }
    
    if (fs.existsSync(cronModuleDir)) {
      const cronModuleFiles = fs.readdirSync(cronModuleDir);
      for (const file of cronModuleFiles) {
        const sourcePath = path.join(cronModuleDir, file);
        const destPath = path.join(cronModuleFilesDir, file);
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ 复制执行模块: ${file}`);
      }
    }
    
    // 压缩文件
    const packagePath = path.join(packageDir, '小说文件.tar.gz');
    const tarCommand = `cd ${packageDir} && tar -czf 小说文件.tar.gz *.md cron_tasks/* cron/*`;
    
    const { exec } = require('child_process');
    exec(tarCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('压缩错误:', error);
        throw error;
      } else {
        console.log('压缩完成:', stdout);
      }
    });
    
    // 检查打包文件
    const packageSize = fs.existsSync(packagePath) ? (fs.statSync(packagePath).size / 1024).toFixed(2) + ' KB' : '未打包';
    
    const result = {
      status: 'success',
      message: `小说文件打包完成，复制了${copyCount}个文件`,
      packagePath: packagePath,
      packageSize: packageSize,
      timestamp: new Date().toLocaleString('zh-CN')
    };
    
    console.log(result);
    
    return result;
    
  } catch (error) {
    console.error('打包出错:', error);
    return {
      status: 'error',
      message: `打包出错: ${error.message}`,
      timestamp: new Date().toLocaleString('zh-CN')
    };
  }
}

// 导出函数供 cron 使用
module.exports = {
  packNovelFiles
};