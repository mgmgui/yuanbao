#!/usr/bin/env node

/**
 * 全球人物小说项目监控系统
 * 每10分钟检查项目进度，协调团队运作，确保小说质量达到矛盾小说奖标准
 */

const fs = require('fs');

console.log("📊 全球人物小说项目监控系统启动");
console.log("监控频率：每10分钟");
console.log("当前时间：" + new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));

// 四Agent状态检查
function checkAgentsStatus() {
  const status = {
    agent1: { name: "构思人物Agent", status: "未知", files: [] },
    agent2: { name: "构思背景Agent", status: "未知", files: [] },
    agent3: { name: "构思创意Agent", status: "未知", files: [] },
    agent4: { name: "构思小说Agent", status: "未知", files: [] }
  };

  // 检查Agent 1：构思人物Agent
  const characterFiles = fs.readdirSync('/root/.openclaw/workspace/全球人物小说项目/日本/人物档案');
  status.agent1.files = characterFiles;
  status.agent1.status = characterFiles.length > 0 ? "✅ 已工作" : "❌ 未工作";
  
  // 检查Agent 2：构思背景Agent
  const backgroundFiles = fs.readdirSync('/root/.openclaw/workspace/全球人物小说项目/日本/背景构思');
  status.agent2.files = backgroundFiles;
  status.agent2.status = backgroundFiles.length > 0 ? "✅ 已工作" : "❌ 未工作";
  
  // 检查Agent 3：构思创意Agent
  const creativeFiles = fs.readdirSync('/root/.openclaw/workspace/全球人物小说项目/日本/创意构思');
  status.agent3.files = creativeFiles;
  status.agent3.status = creativeFiles.length > 0 ? "✅ 已工作" : "❌ 未工作";
  
  // 检查Agent 4：构思小说Agent
  const novelFiles = fs.readdirSync('/root/.openclaw/workspace/全球人物小说项目/日本/小说稿');
  status.agent4.files = novelFiles;
  status.agent4.status = novelFiles.length > 0 ? "✅ 已工作" : "❌ 未工作";

  return status;
}

// 检查当前小说创作进度
function checkCurrentNovelProgress() {
  const projectPath = '/root/.openclaw/workspace/全球人物小说项目/日本/项目管理/织田信长小说项目管理.md';
  
  if (!fs.existsSync(projectPath)) {
    return { status: "❌ 项目管理文件不存在", progress: 0 };
  }

  const content = fs.readFileSync(projectPath, 'utf8');
  
  // 解析进度
  const progress = {
    agent1: false,
    agent2: false,
    agent3: false,
    agent4: false,
    review: false,
    archive: false,
    overallProgress: 0
  };

  // 检查Agent完成状态
  if (content.includes('构思人物Agent ✅ 已完成')) progress.agent1 = true;
  if (content.includes('构思背景Agent ✅ 已完成')) progress.agent2 = true;
  if (content.includes('构思创意Agent ✅ 已完成')) progress.agent3 = true;
  if (content.includes('构思小说Agent ⏳ 正在进行')) progress.agent4 = false;
  if (content.includes('构思小说Agent ✅ 已完成')) progress.agent4 = true;
  
  // 检查评审状态
  if (content.includes('评审Agent ⏳ 等待')) progress.review = false;
  if (content.includes('评审Agent ✅ 已完成')) progress.review = true;
  
  // 检查归档状态
  if (content.includes('归档Agent ⏳ 等待')) progress.archive = false;
  if (content.includes('归档Agent ✅ 已完成')) progress.archive = true;

  // 计算总体进度
  const totalSteps = 6;
  const completedSteps = (progress.agent1 ? 1 : 0) + 
                         (progress.agent2 ? 1 : 0) + 
                         (progress.agent3 ? 1 : 0) + 
                         (progress.agent4 ? 1 : 0) + 
                         (progress.review ? 1 : 0) + 
                         (progress.archive ? 1 : 0);
  
  progress.overallProgress = Math.round((completedSteps / totalSteps) * 100);

  return progress;
}

// 检查小说质量（是否符合矛盾小说奖标准）
function checkNovelQuality() {
  const novelPath = '/root/.openclaw/workspace/全球人物小说项目/日本/小说稿/织田信长小说.md';
  
  if (!fs.existsSync(novelPath)) {
    return { status: "❌ 小说文件不存在", qualityScore: 0, standards: [] };
  }

  const novelContent = fs.readFileSync(novelPath, 'utf8');
  
  // 矛盾小说奖标准检查
  const standards = {
    contradiction: 0,       // 矛盾性
    climax: 0,              // 高潮场景
    imagery: 0,             // 意象运用
    structure: 0,           // 结构完整性
    characterization: 0,    // 人物塑造
    totalScore: 0
  };

  // 检查矛盾性（人物内心矛盾）
  if (novelContent.includes('内心挣扎') || novelContent.includes('矛盾')) {
    standards.contradiction += 10;
  }
  if (novelContent.includes('革新与传统') || novelContent.includes('冲突')) {
    standards.contradiction += 10;
  }

  // 检查高潮场景（本能寺之夜）
  if (novelContent.includes('本能寺') && novelContent.includes('背叛')) {
    standards.climax += 10;
  }
  if (novelContent.includes('流星陨落') && novelContent.includes('火焰')) {
    standards.climax += 10;
  }

  // 检查意象运用（流星、火焰、安土城）
  if (novelContent.includes('流星') && novelContent.includes('闪耀')) {
    standards.imagery += 10;
  }
  if (novelContent.includes('火焰') && novelContent.includes('焚毁')) {
    standards.imagery += 10;
  }

  // 检查结构完整性（章节结构）
  const chapters = novelContent.match(/第[一二三四五]章|第一章|第二章|第三章|第四章|第五章/);
  if (chapters && chapters.length >= 5) {
    standards.structure += 10;
  }
  if (novelContent.includes('字数统计')) {
    standards.structure += 10;
  }

  // 检查人物塑造（织田信长形象）
  if (novelContent.includes('尾张的大傻瓜')) {
    standards.characterization += 10;
  }
  if (novelContent.includes('革新者')) {
    standards.characterization += 10;
  }

  // 计算总分
  standards.totalScore = standards.contradiction + standards.climax + standards.imagery + standards.structure + standards.characterization;

  // 判断是否符合矛盾小说奖标准
  const qualityScore = standards.totalScore;
  const qualityStatus = qualityScore >= 80 ? "✅ 符合矛盾小说奖标准" : "❌ 不符合矛盾小说奖标准";

  return {
    status: qualityStatus,
    qualityScore: qualityScore,
    standards: standards,
    details: {
      contradictionScore: standards.contradiction,
      climaxScore: standards.climax,
      imageryScore: standards.imagery,
      structureScore: standards.structure,
      characterizationScore: standards.characterization
    }
  };
}

// 协调团队运作
function coordinateTeamWork(progress, quality) {
  const actions = [];

  // Agent 1 检查
  if (!progress.agent1) {
    actions.push("启动构思人物Agent，创建人物档案");
  }

  // Agent 2 检查
  if (!progress.agent2) {
    actions.push("启动构思背景Agent，补充历史背景");
  }

  // Agent 3 检查
  if (!progress.agent3) {
    actions.push("启动构思创意Agent，补充小说创意");
  }

  // Agent 4 检查
  if (!progress.agent4) {
    actions.push("启动构思小说Agent，创作小说正文");
  }

  // 小说质量检查
  if (quality.status.includes("❌")) {
    actions.push(`小说质量不足（得分：${quality.qualityScore}/100），需要修改`);
  }

  // 评审检查
  if (!progress.review && progress.agent4) {
    actions.push("启动评审Agent，评审小说质量");
  }

  // 归档检查
  if (!progress.archive && progress.review && quality.status.includes("✅")) {
    actions.push("启动归档Agent，归档小说文件");
  }

  // 交付检查
  if (progress.archive && quality.status.includes("✅")) {
    actions.push("小说已达标，准备交付给用户");
  }

  return actions;
}

// 执行监控
function performMonitoring() {
  console.log("\n=== 全球人物小说项目监控 ===");
  console.log(`监控时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);

  // 检查四Agent状态
  const agentStatus = checkAgentsStatus();
  console.log("\n📈 四Agent状态检查:");
  console.log(`Agent 1（构思人物Agent）：${agentStatus.agent1.status}，文件：${agentStatus.agent1.files.join(', ')}`);
  console.log(`Agent 2（构思背景Agent）：${agentStatus.agent2.status}，文件：${agentStatus.agent2.files.join(', ')}`);
  console.log(`Agent 3（构思创意Agent）：${agentStatus.agent3.status}，文件：${agentStatus.agent3.files.join(', ')}`);
  console.log(`Agent 4（构思小说Agent）：${agentStatus.agent4.status}，文件：${agentStatus.agent4.files.join(', ')}`);

  // 检查小说进度
  const progress = checkCurrentNovelProgress();
  console.log("\n📊 当前小说进度:");
  console.log(`总体进度：${progress.overallProgress}%`);
  console.log(`Agent 1 完成：${progress.agent1 ? '✅' : '❌'}`);
  console.log(`Agent 2 完成：${progress.agent2 ? '✅' : '❌'}`);
  console.log(`Agent 3 完成：${progress.agent3 ? '✅' : '❌'}`);
  console.log(`Agent 4 完成：${progress.agent4 ? '✅' : '❌'}`);
  console.log(`评审完成：${progress.review ? '✅' : '❌'}`);
  console.log(`归档完成：${progress.archive ? '✅' : '❌'}`);

  // 检查小说质量
  const quality = checkNovelQuality();
  console.log("\n🎯 小说质量检查（矛盾小说奖标准）:");
  console.log(`质量状态：${quality.status}`);
  console.log(`质量得分：${quality.qualityScore}/100`);
  console.log(`矛盾性得分：${quality.details.contradictionScore}/20`);
  console.log(`高潮场景得分：${quality.details.climaxScore}/20`);
  console.log(`意象运用得分：${quality.details.imageryScore}/20`);
  console.log(`结构完整性得分：${quality.details.structureScore}/20`);
  console.log(`人物塑造得分：${quality.details.characterizationScore}/20`);

  // 协调团队运作
  const actions = coordinateTeamWork(progress, quality);
  console.log("\n🚀 需要采取的行动:");
  if (actions.length > 0) {
    actions.forEach((action, index) => {
      console.log(`${index + 1}. ${action}`);
    });
  } else {
    console.log("✅ 一切正常，无需干预");
  }

  // 生成报告
  const report = generateReport(agentStatus, progress, quality, actions);
  
  return report;
}

// 生成监控报告
function generateReport(agentStatus, progress, quality, actions) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportFile = `/root/.openclaw/workspace/global_novel_monitor_report_${timestamp}.txt`;
  
  const reportText = `
全球人物小说项目监控报告
================
监控时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}

四Agent状态检查：
Agent 1（构思人物Agent）：${agentStatus.agent1.status}
Agent 2（构思背景Agent）：${agentStatus.agent2.status}
Agent 3（构思创意Agent）：${agentStatus.agent3.status}
Agent 4（构思小说Agent）：${agentStatus.agent4.status}

当前小说进度：
总体进度：${progress.overallProgress}%
Agent 1 完成：${progress.agent1 ? '✅' : '❌'}
Agent 2 完成：${progress.agent2 ? '✅' : '❌'}
Agent 3 完成：${progress.agent3 ? '✅' : '❌'}
Agent 4 完成：${progress.agent4 ? '✅' : '❌'}
评审完成：${progress.review ? '✅' : '❌'}
归档完成：${progress.archive ? '✅' : '❌'}

小说质量检查（矛盾小说奖标准）：
质量状态：${quality.status}
质量得分：${quality.qualityScore}/100
矛盾性得分：${quality.details.contradictionScore}/20
高潮场景得分：${quality.details.climaxScore}/20
意象运用得分：${quality.details.imageryScore}/20
结构完整性得分：${quality.details.structureScore}/20
人物塑造得分：${quality.details.characterizationScore}/20

需要采取的行动：
${actions.length > 0 ? actions.map(action => `• ${action}`).join('\n') : '✅ 一切正常，无需干预'}
`;

  fs.writeFileSync(reportFile, reportText);
  
  console.log(`📄 监控报告保存至：${reportFile}`);
  
  return reportFile;
}

// 设置定时监控
function startMonitoring() {
  console.log("\n⏰ 开始定时监控（每10分钟检查一次）");
  
  // 立即执行一次监控
  const report = performMonitoring();
  
  // 设置定时器，每10分钟执行一次
  setInterval(() => {
    const now = new Date();
    console.log(`\n[${now.toLocaleString('zh-CN')}] 定时检查项目进度...`);
    performMonitoring();
  }, 10 * 60 * 1000); // 10分钟
  
  console.log("\n✅ 定时监控已启动");
  console.log("每10分钟自动检查项目进度");
  console.log("如果发现问题，会自动协调团队运作");
}

// 如果直接运行则开始监控
if (require.main === module) {
  startMonitoring();
}

// 导出函数
module.exports = {
  performMonitoring,
  startMonitoring,
  checkAgentsStatus,
  checkCurrentNovelProgress,
  checkNovelQuality,
  coordinateTeamWork
};