/**
 * 定时任务执行监控脚本
 * 监控所有定时任务的执行情况
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

async function runTaskExecutionMonitor() {
  console.log('开始执行定时任务监控...');
  
  // 1. 检查所有定时任务配置
  const taskConfigs = await checkTaskConfigs();
  
  // 2. 检查任务执行日志
  const executionLogs = await checkExecutionLogs();
  
  // 3. 分析任务运行状态
  const taskStatus = await analyzeTaskStatus(taskConfigs, executionLogs);
  
  // 4. 检查资源使用情况
  const resourceUsage = await checkResourceUsage();
  
  // 5. 生成监控报告
  const report = generateTaskMonitorReport(taskConfigs, executionLogs, taskStatus, resourceUsage);
  
  // 6. 保存监控结果
  saveMonitorResults(taskStatus);
  
  console.log('定时任务监控完成');
  return report;
}

async function checkTaskConfigs() {
  console.log('检查定时任务配置...');
  
  // 读取cron_tasks.yml文件
  const tasksYamlPath = './cron_tasks.yml';
  
  if (fs.existsSync(tasksYamlPath)) {
    const content = fs.readFileSync(tasksYamlPath, 'utf8');
    const taskConfigs = parseTasksYaml(content);
    return taskConfigs;
  } else {
    // 备选：读取tasks.yml文件
    const tasksYamlPath2 = './tasks.yml';
    
    if (fs.existsSync(tasksYamlPath2)) {
      const content = fs.readFileSync(tasksYamlPath2, 'utf8');
      const taskConfigs = parseTasksYaml(content);
      return taskConfigs;
    } else {
      return [];
    }
  }
}

function parseTasksYaml(content) {
  const lines = content.split('\n');
  const tasks = [];
  
  let inTasksSection = false;
  let currentTask = {};
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed === 'tasks:') {
      inTasksSection = true;
    } else if (trimmed.startsWith('- name:')) {
      currentTask = { fileName: 'tasks.yml' };
      currentTask.name = trimmed.split(':')[1].trim();
    } else if (trimmed.startsWith('schedule:')) {
      currentTask.schedule = trimmed.split(':')[1].trim();
    } else if (trimmed.startsWith('module:')) {
      currentTask.module = trimmed.split(':')[1].trim();
    } else if (trimmed.startsWith('function:')) {
      currentTask.function = trimmed.split(':')[1].trim();
    } else if (trimmed.startsWith('args:')) {
      // args字段
    } else if (trimmed.startsWith('output_format:')) {
      currentTask.output_format = trimmed.split(':')[1].trim();
    } else if (trimmed.startsWith('channel:')) {
      currentTask.channel = trimmed.split(':')[1].trim();
    } else if (trimmed === '' && currentTask.name) {
      // 任务结束
      if (currentTask.name) {
        tasks.push(currentTask);
        currentTask = {};
      }
    }
  }
  
  if (currentTask.name) {
    tasks.push(currentTask);
  }
  
  // 检查模块文件是否存在
  tasks.forEach(task => {
    task.moduleExists = fs.existsSync(task.module);
  });
  
  return tasks;
}

function parseTaskConfig(content, fileName) {
  const lines = content.split('\n');
  
  const config = {
    fileName,
    name: '',
    schedule: '',
    module: '',
    function: '',
    output_format: '',
    channel: '',
    description: ''
  };
  
  for (const line of lines) {
    if (line.includes('name:')) {
      config.name = line.split(':')[1].trim();
    } else if (line.includes('schedule:')) {
      config.schedule = line.split(':')[1].trim();
    } else if (line.includes('module:')) {
      config.module = line.split(':')[1].trim();
    } else if (line.includes('function:')) {
      config.function = line.split(':')[1].trim();
    } else if (line.includes('output_format:')) {
      config.output_format = line.split(':')[1].trim();
    } else if (line.includes('channel:')) {
      config.channel = line.split(':')[1].trim();
    } else if (line.includes('description:')) {
      config.description = line.split(':')[1].trim();
    }
  }
  
  // 检查模块文件是否存在
  const modulePath = config.module.replace('./cron/', './cron/');
  config.moduleExists = fs.existsSync(modulePath);
  
  return config;
}

async function checkExecutionLogs() {
  console.log('检查任务执行日志...');
  
  const logsDir = './memory';
  const logFiles = fs.readdirSync(logsDir).filter(file => file.includes('监控') || file.includes('日志'));
  
  const executionLogs = [];
  
  for (const file of logFiles) {
    const filePath = path.join(logsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const logInfo = parseLogFile(content, file);
    executionLogs.push(logInfo);
  }
  
  return executionLogs;
}

function parseLogFile(content, fileName) {
  const lines = content.split('\n');
  
  // 查找最近执行时间
  const timestampLines = lines.filter(line => line.includes('报告') || line.includes('监控'));
  const lastExecuted = timestampLines.length > 0 ? timestampLines[0] : null;
  
  // 查找成功/失败状态
  const statusLines = lines.filter(line => line.includes('成功') || line.includes('失败'));
  const lastStatus = statusLines.length > 0 ? statusLines[0] : null;
  
  return {
    fileName,
    lastExecuted,
    lastStatus,
    linesCount: lines.length,
    lastModified: fs.statSync(path.join('./memory', fileName)).mtime
  };
}

async function analyzeTaskStatus(taskConfigs, executionLogs) {
  console.log('分析任务运行状态...');
  
  const statuses = [];
  
  for (const config of taskConfigs) {
    const status = {
      taskName: config.name,
      schedule: config.schedule,
      moduleStatus: config.moduleExists ? '✅ 正常' : '❌ 缺失',
      lastExecution: null,
      executionStatus: '未知',
      nextExecution: null
    };
    
    // 查找对应日志
    const relatedLog = executionLogs.find(log => 
      log.fileName.includes(config.name) || 
      config.name.includes(log.fileName.split('.')[0])
    );
    
    if (relatedLog) {
      status.lastExecution = relatedLog.lastModified;
      status.executionStatus = relatedLog.lastStatus ? '已执行' : '无状态记录';
    } else {
      status.lastExecution = null;
      status.executionStatus = '无日志记录';
    }
    
    // 计算下一次执行时间
    status.nextExecution = calculateNextExecution(config.schedule);
    
    statuses.push(status);
  }
  
  return statuses;
}

function calculateNextExecution(schedule) {
  // 简单的schedule解析
  if (schedule.includes('*/5')) {
    return '5分钟后';
  } else if (schedule.includes('*/10')) {
    return '10分钟后';
  } else if (schedule.includes('*/30')) {
    return '30分钟后';
  } else if (schedule.includes('*/60')) {
    return '60分钟后';
  } else if (schedule.includes('0 *')) {
    return '1小时后';
  } else {
    return '未知';
  }
}

async function checkResourceUsage() {
  console.log('检查资源使用情况...');
  
  try {
    // 检查内存使用
    const memoryUsage = await execCommand('free -h');
    
    // 检查磁盘使用
    const diskUsage = await execCommand('df -h');
    
    // 检查CPU负载
    const cpuLoad = await execCommand('uptime');
    
    // 检查任务进程
    const processes = await execCommand('ps aux | grep -E "cron|task|monitor"');
    
    return {
      memory: parseMemoryUsage(memoryUsage),
      disk: parseDiskUsage(diskUsage),
      cpu: parseCPULoad(cpuLoad),
      processes: processes.split('\n').filter(line => line.includes('cron') || line.includes('task')).length
    };
  } catch (error) {
    return {
      memory: '检查失败',
      disk: '检查失败',
      cpu: '检查失败',
      processes: 0
    };
  }
}

async function execCommand(command) {
  try {
    const { stdout } = await exec(command);
    return stdout;
  } catch (error) {
    return error.message;
  }
}

function parseMemoryUsage(output) {
  const lines = output.split('\n');
  if (lines.length < 2) return output;
  
  const memLine = lines.find(line => line.includes('Mem:'));
  if (!memLine) return output;
  
  const parts = memLine.split(' ');
  const total = parts[1];
  const used = parts[2];
  const free = parts[3];
  
  return `总内存: ${total}, 已用: ${used}, 空闲: ${free}`;
}

function parseDiskUsage(output) {
  const lines = output.split('\n');
  const rootLine = lines.find(line => line.includes('/'));
  if (!rootLine) return output;
  
  const parts = rootLine.split(' ');
  const total = parts[1];
  const used = parts[2];
  const free = parts[3];
  const percent = parts[4];
  
  return `总容量: ${total}, 已用: ${used}, 空闲: ${free}, 使用率: ${percent}`;
}

function parseCPULoad(output) {
  const parts = output.split(' ');
  const loadAvg = parts.find(part => part.includes('load'));
  if (!loadAvg) return output;
  
  return loadAvg;
}

function saveMonitorResults(taskStatus) {
  const timestamp = new Date().toISOString();
  const filePath = './memory/定时任务监控结果.md';
  
  const content = `# 定时任务监控结果 (${timestamp})

## 任务状态汇总
${taskStatus.map(status => `- **${status.taskName}**:\n  调度: ${status.schedule}\n  模块状态: ${status.moduleStatus}\n  上次执行: ${status.lastExecution || '无记录'}\n  执行状态: ${status.executionStatus}\n  下次执行: ${status.nextExecution}`).join('\n')}

## 监控频率
- 本监控执行时间: ${timestamp}
- 下一次监控: 5分钟后

## 备注
${taskStatus.filter(status => status.moduleStatus.includes('缺失')).map(status => `⚠️ ${status.taskName} 的模块文件缺失: ${status.module}`).join('\n')}
`;
  
  fs.writeFileSync(filePath, content);
}

function generateTaskMonitorReport(taskConfigs, executionLogs, taskStatus, resourceUsage) {
  const timestamp = new Date().toLocaleString('zh-CN');
  
  return `🔄 定时任务执行监控报告 (${timestamp})

📊 **任务配置状态**
${taskStatus.map(status => `${status.moduleStatus.includes('✅') ? '✅' : '❌'} ${status.taskName}\n  调度: ${status.schedule}\n  上次执行: ${status.lastExecution ? new Date(status.lastExecution).toLocaleString('zh-CN') : '无记录'}\n  执行状态: ${status.executionStatus}\n  下次执行: ${status.nextExecution}`).join('\n')}

📋 **执行日志统计**
- 日志文件数量: ${executionLogs.length}
- 最新日志: ${executionLogs.length > 0 ? executionLogs[0].fileName : '无'}
- 日志总行数: ${executionLogs.reduce((sum, log) => sum + log.linesCount, 0)}

💻 **资源使用情况**
- 内存: ${resourceUsage.memory}
- 磁盘: ${resourceUsage.disk}
- CPU负载: ${resourceUsage.cpu}
- 相关进程数量: ${resourceUsage.processes}

⚠️ **问题识别**
${taskStatus.filter(status => status.moduleStatus.includes('缺失')).map(status => `- ${status.taskName}: 模块文件缺失`).join('\n')}
${taskStatus.filter(status => status.executionStatus === '无日志记录').map(status => `- ${status.taskName}: 无执行日志记录`).join('\n')}

🔧 **建议**
${taskStatus.filter(status => status.moduleStatus.includes('缺失')).length > 0 ? '- 缺失的模块文件需要补充' : ''}
${taskStatus.filter(status => status.executionStatus === '无日志记录').length > 0 ? '- 无日志的任务需要检查执行情况' : ''}
${taskStatus.filter(status => status.executionStatus === '未知').length > 0 ? '- 状态未知的任务需要重新配置' : ''}

📈 **监控范围**
- 小说创作项目监控 (10分钟)
- 财经监控 (30分钟)
- 国际局势监控 (1小时)
- 本监控任务 (5分钟)

🕒 **下一次监控**
- 本监控: 5分钟后
- 小说创作项目: ${taskStatus.find(s => s.taskName.includes('小说')).nextExecution}
- 财经监控: ${taskStatus.find(s => s.taskName.includes('财经')).nextExecution}
- 国际局势: ${taskStatus.find(s => s.taskName.includes('国际')).nextExecution}`;
}

module.exports = { runTaskExecutionMonitor };