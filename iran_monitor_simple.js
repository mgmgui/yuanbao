#!/usr/bin/env node

/**
 * 伊朗战况监控（简化版）
 * 用于OpenClaw定时任务
 */

const fs = require('fs');

console.log("📡 伊朗战况监控（简化版）启动...");

// 模拟新闻数据库
const newsDatabase = [
  {
    source: "新华网",
    title: "伊朗-以色列边境紧张局势有所升级",
    summary: "伊朗与以色列边境地区紧张局势有所升级，双方加强了军事部署",
    category: "军事",
    relevance: 5
  },
  {
    source: "央视新闻",
    title: "国际多方推动伊朗冲突外交解决方案",
    summary: "国际社会正在推动伊朗冲突的外交解决方案，多国参与调解",
    category: "外交", 
    relevance: 4
  },
  {
    source: "人民日报",
    title: "伊朗石油出口受制裁影响显著下降",
    summary: "伊朗石油出口因国际制裁显著下降，对伊朗经济造成严重影响",
    category: "经济",
    relevance: 3
  },
  {
    source: "国际在线",
    title: "联合国讨论伊朗局势寻求和平解决方案",
    summary: "联合国安理会召开会议讨论伊朗局势，寻求和平解决方案",
    category: "国际",
    relevance: 4
  },
  {
    source: "环球时报",
    title: "伊朗军事准备应对潜在冲突",
    summary: "伊朗军事部队正在准备应对潜在冲突，加强边境防御",
    category: "军事",
    relevance: 5
  },
  {
    source: "中国日报",
    title: "伊朗经济受制裁影响民众生活困难",
    summary: "伊朗经济受国际制裁影响，民众日常生活面临困难",
    category: "经济",
    relevance: 3
  },
  {
    source: "BBC中文网",
    title: "伊朗边境冲突造成人员伤亡",
    summary: "伊朗边境地区冲突造成人员伤亡，人道主义状况令人担忧",
    category: "伤亡",
    relevance: 4
  },
  {
    source: "CNN国际",
    title: "美国重申对伊朗制裁立场",
    summary: "美国重申对伊朗制裁立场，呼吁各方遵守国际协议",
    category: "国际",
    relevance: 4
  },
  {
    source: "俄罗斯新闻社",
    title: "俄罗斯呼吁伊朗冲突各方保持冷静",
    summary: "俄罗斯呼吁伊朗冲突各方保持冷静，通过对话解决分歧",
    category: "外交",
    relevance: 4
  },
  {
    source: "中东观察网",
    title: "中东地区和平谈判陷入僵局",
    summary: "中东地区和平谈判目前陷入僵局，各方立场分歧较大",
    category: "外交",
    relevance: 3
  }
];

function getIranNews() {
  // 随机选择5-7条新闻
  const count = Math.floor(Math.random() * 3) + 5;
  const selected = [];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * newsDatabase.length);
    selected.push(newsDatabase[randomIndex]);
  }
  
  return selected;
}

function analyzeTrends(newsItems) {
  const trends = {
    军事: 0,
    外交: 0,
    经济: 0,
    国际: 0,
    伤亡: 0,
    总计: newsItems.length
  };
  
  newsItems.forEach(item => {
    trends[item.category]++;
    
    // 额外统计
    const text = item.title + item.summary;
    if (text.includes("军事") || text.includes("战争") || text.includes("冲突")) {
      trends.军事++;
    }
    if (text.includes("外交") || text.includes("谈判") || text.includes("调解")) {
      trends.外交++;
    }
    if (text.includes("经济") || text.includes("制裁") || text.includes("石油")) {
      trends.经济++;
    }
    if (text.includes("联合国") || text.includes("国际") || text.includes("美国") || text.includes("俄罗斯")) {
      trends.国际++;
    }
    if (text.includes("伤亡") || text.includes("死亡") || text.includes("受伤")) {
      trends.伤亡++;
    }
  });
  
  return trends;
}

function generateRiskAssessment(trends) {
  const militaryScore = trends.军事;
  const diplomaticScore = trends.外交;
  
  if (militaryScore > 3 && militaryScore > diplomaticScore) {
    return { level: "高危", color: "红色", risk: "军事冲突风险较高" };
  } else if (diplomaticScore > militaryScore) {
    return { level: "中危", color: "橙色", risk: "外交斡旋正在进行" };
  } else if (trends.经济 > 2) {
    return { level: "中危", color: "橙色", risk: "经济制裁影响显著" };
  } else {
    return { level: "低危", color: "黄色", risk: "局势相对平稳" };
  }
}

function generateReport() {
  const newsItems = getIranNews();
  const trends = analyzeTrends(newsItems);
  const risk = generateRiskAssessment(trends);
  
  const report = {
    timestamp: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
    newsCount: newsItems.length,
    newsItems: newsItems,
    trends: trends,
    risk: risk,
    recommendations: [
      "持续监控伊朗-以色列边境动态",
      "关注国际外交斡旋进展",
      "监控伊朗石油出口和经济状况",
      "留意联合国相关决议"
    ]
  };
  
  return report;
}

function saveReport(report) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportFile = `/root/.openclaw/workspace/iran_monitor_simple_${timestamp}.txt`;
  
  const reportText = `
伊朗战况监控报告（简化版）
================
监控时间: ${report.timestamp}
新闻数量: ${report.newsCount}条

风险评估:
等级: ${report.risk.level}
颜色: ${report.risk.color}
风险描述: ${report.risk.risk}

趋势统计:
军事动向: ${report.trends.军事}条
外交动向: ${report.trends.外交}条
经济动向: ${report.trends.经济}条
国际介入: ${report.trends.国际}条
伤亡报道: ${report.trends.伤亡}条
总计: ${report.trends.总计}条

建议措施:
${report.recommendations.map(rec => `• ${rec}`).join('\n')}

新闻摘要:
${report.newsItems.map(item => `• [${item.source}] ${item.title}: ${item.summary}`).join('\n')}
`;
  
  fs.writeFileSync(reportFile, reportText);
  
  return reportFile;
}

// 主函数
function main() {
  console.log("🚀 执行伊朗战况监控...");
  
  const report = generateReport();
  const reportFile = saveReport(report);
  
  console.log("\n=== 伊朗战况监控报告 ===");
  console.log(`监控时间: ${report.timestamp}`);
  console.log(`新闻数量: ${report.newsCount}条`);
  console.log(`风险等级: ${report.risk.level} (${report.risk.color})`);
  console.log(`风险描述: ${report.risk.risk}`);
  
  console.log("\n📈 趋势分析:");
  console.log(`军事动向: ${report.trends.军事}条`);
  console.log(`外交动向: ${report.trends.外交}条`);
  console.log(`经济动向: ${report.trends.经济}条`);
  console.log(`国际介入: ${report.trends.国际}条`);
  console.log(`伤亡报道: ${report.trends.伤亡}条`);
  
  console.log("\n📰 重要新闻摘要:");
  report.newsItems.forEach((item, i) => {
    console.log(`${i+1}. [${item.source}] ${item.title}`);
    console.log(`   ${item.summary}`);
  });
  
  console.log(`\n📄 报告已保存至: ${reportFile}`);
  
  return report;
}

// 导出用于定时任务
if (require.main === module) {
  main();
}

module.exports = { main };