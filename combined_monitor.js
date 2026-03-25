#!/usr/bin/env node

/**
 * 综合监控系统
 * 每半小时执行：
 * 1. 伊朗战况监控
 * 2. 财经市场监控
 */

const fs = require('fs');

// 导入伊朗战况监控
const iranMonitorModule = require('/root/.openclaw/workspace/iran_monitor_final.js');
const financialMonitorModule = require('/root/.openclaw/workspace/financial_monitor.js');

console.log("📡 综合监控系统启动...");
console.log("当前时间: " + new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));

// 执行伊朗战况监控
function runIranMonitor() {
  console.log("🚀 执行伊朗战况监控...");
  
  try {
    const iranResult = iranMonitorModule.monitorIranWar();
    if (iranResult) {
      console.log("✅ 伊朗战况监控完成");
      return iranResult.report;
    } else {
      console.log("❌ 伊朗战况监控失败");
      return null;
    }
  } catch (error) {
    console.error(`❌ 伊朗战况监控错误: ${error.message}`);
    return null;
  }
}

// 执行财经市场监控
function runFinancialMonitor() {
  console.log("💰 执行财经市场监控...");
  
  try {
    const financialResult = financialMonitorModule.monitorFinancialMarkets();
    if (financialResult) {
      console.log("✅ 财经市场监控完成");
      return financialResult.report;
    } else {
      console.log("❌ 财经市场监控失败");
      return null;
    }
  } catch (error) {
    console.error(`❌ 财经市场监控错误: ${error.message}`);
    return null;
  }
}

// 生成综合报告
function generateCombinedReport(iranReport, financialReport) {
  const combinedReport = {
    timestamp: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
    iranMonitor: iranReport,
    financialMonitor: financialReport,
    summary: generateSummary(iranReport, financialReport),
    recommendations: generateCombinedRecommendations(iranReport, financialReport)
  };

  return combinedReport;
}

// 生成摘要
function generateSummary(iranReport, financialReport) {
  let summary = `综合监控报告（${new Date().toLocaleDateString('zh-CN')} ${new Date().toLocaleTimeString('zh-CN')})\n\n`;
  
  // 伊朗战况摘要
  summary += `伊朗战况:\n`;
  summary += `风险评估: ${iranReport ? iranReport.风险评估.等级 : "数据未获取"}\n`;
  summary += `市场情绪: ${iranReport ? iranReport.趋势分析.军事 > iranReport.趋势分析.外交 ? "紧张" : "稳定" : "数据未获取"}\n`;
  
  // 财经市场摘要
  summary += `财经市场:\n`;
  summary += `总体情绪: ${financialReport ? financialReport.overallRecommendation.overallSentiment : "数据未获取"}\n`;
  summary += `仓位建议: ${financialReport ? financialReport.overallRecommendation.overallPosition + " (" + financialReport.overallRecommendation.overallPercentage + ")" : "数据未获取"}\n`;
  
  return summary;
}

// 生成综合建议
function generateCombinedRecommendations(iranReport, financialReport) {
  const recommendations = [];
  
  // 伊朗战况建议
  if (iranReport) {
    recommendations.push(`伊朗战况建议: ${iranReport.建议措施[0]}`);
    
    if (iranReport.风险评估.等级 === "高危") {
      recommendations.push("伊朗局势紧张，建议关注避险资产（黄金、石油）");
      recommendations.push("伊朗军事风险可能影响大宗商品价格");
    }
  }
  
  // 财经市场建议
  if (financialReport) {
    recommendations.push(`财经市场建议: ${financialReport.recommendations[0]}`);
    
    if (financialReport.overallRecommendation.overallSentiment === "积极") {
      recommendations.push("市场情绪积极，建议关注股票和债券");
    } else if (financialReport.overallRecommendation.overallSentiment === "消极") {
      recommendations.push("市场情绪消极，建议关注避险资产");
    }
    
    // 特定市场建议
    if (financialReport.categoryReports) {
      const bullishCategories = financialReport.categoryReports.filter(report => report.analysis.sentiment === "积极");
      const bearishCategories = financialReport.categoryReports.filter(report => report.analysis.sentiment === "消极");
      
      if (bullishCategories.length > 0) {
        recommendations.push("积极市场: " + bullishCategories.map(report => report.category).join(", "));
      }
      
      if (bearishCategories.length > 0) {
        recommendations.push("谨慎市场: " + bearishCategories.map(report => report.category).join(", "));
      }
    }
  }
  
  // 综合建议
  if (iranReport && financialReport) {
    if (iranReport.风险评估.等级 === "高危" && financialReport.overallRecommendation.overallSentiment === "消极") {
      recommendations.push("综合风险较高，建议保守仓位，重点关注避险资产");
    } else if (iranReport.风险评估.等级 === "低危" && financialReport.overallRecommendation.overallSentiment === "积极") {
      recommendations.push("市场环境良好，建议适当增加仓位");
    }
  }
  
  return recommendations;
}

// 保存综合报告
function saveCombinedReport(report) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  // 综合报告文件
  const reportFile = `/root/.openclaw/workspace/combined_report_${timestamp}.txt`;
  
  const reportText = `
综合监控报告
==========
监控时间: ${report.timestamp}

伊朗战况监控:
${report.iranMonitor ? `
风险评估: ${report.iranMonitor.风险评估.等级} (${report.iranMonitor.风险评估.颜色})
风险描述: ${report.iranMonitor.风险评估.描述}
新闻数量: ${report.iranMonitor.新闻数量}条
军事动向: ${report.iranMonitor.趋势分析.军事}条
外交动向: ${report.iranMonitor.趋势分析.外交}条
经济动向: ${report.iranMonitor.趋势分析.经济}条
国际介入: ${report.iranMonitor.趋势分析.国际}条
伤亡报道: ${report.iranMonitor.趋势分析.伤亡}条
主要建议: ${report.iranMonitor.建议措施[0]}
` : "伊朗战况监控数据未获取"}

财经市场监控:
${report.financialMonitor ? `
总体情绪: ${report.financialMonitor.overallRecommendation.overallSentiment}
总体仓位建议: ${report.financialMonitor.overallRecommendation.overallPosition} (${report.financialMonitor.overallRecommendation.overallPercentage})
明日趋势预测: ${report.financialMonitor.tomorrowPrediction.overallTrend}
置信度: ${report.financialMonitor.tomorrowPrediction.confidence}
分析理由: ${report.financialMonitor.tomorrowPrediction.reasoning}
总新闻数量: ${report.financialMonitor.overallRecommendation.totalNews}条
` : "财经市场监控数据未获取"}

摘要:
${report.summary}

综合建议:
${report.recommendations.map(rec => `• ${rec}`).join('\n')}
`;
  
  fs.writeFileSync(reportFile, reportText);
  
  console.log(`📄 综合报告保存至: ${reportFile}`);
  
  return reportFile;
}

// 打印综合报告
function printCombinedReport(report) {
  console.log("\n📡 综合监控报告");
  console.log(`监控时间: ${report.timestamp}`);
  
  if (report.iranMonitor) {
    console.log("\n🇮🇷 伊朗战况监控:");
    console.log(`风险评估: ${report.iranMonitor.风险评估.等级} (${report.iranMonitor.风险评估.颜色})`);
    console.log(`风险描述: ${report.iranMonitor.风险评估.描述}`);
    console.log(`新闻数量: ${report.iranMonitor.新闻数量}条`);
    console.log(`军事动向: ${report.iranMonitor.趋势分析.军事}条`);
    console.log(`外交动向: ${report.iranMonitor.趋势分析.外交}条`);
    console.log(`经济动向: ${report.iranMonitor.趋势分析.经济}条`);
    console.log(`国际介入: ${report.iranMonitor.趋势分析.国际}条`);
    console.log(`伤亡报道: ${report.iranMonitor.趋势分析.伤亡}条`);
    console.log(`主要建议: ${report.iranMonitor.建议措施[0]}`);
  } else {
    console.log("❌ 伊朗战况监控数据未获取");
  }
  
  if (report.financialMonitor) {
    console.log("\n💰 财经市场监控:");
    console.log(`总体情绪: ${report.financialMonitor.overallRecommendation.overallSentiment}`);
    console.log(`总体仓位建议: ${report.financialMonitor.overallRecommendation.overallPosition} (${report.financialMonitor.overallRecommendation.overallPercentage})`);
    console.log(`明日趋势预测: ${report.financialMonitor.tomorrowPrediction.overallTrend}`);
    console.log(`置信度: ${report.financialMonitor.tomorrowPrediction.confidence}`);
    console.log(`分析理由: ${report.financialMonitor.tomorrowPrediction.reasoning}`);
    console.log(`总新闻数量: ${report.financialMonitor.overallRecommendation.totalNews}条`);
    console.log(`积极市场数量: ${report.financialMonitor.tomorrowPrediction.bullishCategories.length}`);
    console.log(`消极市场数量: ${report.financialMonitor.tomorrowPrediction.bearishCategories.length}`);
    console.log(`中性市场数量: ${report.financialMonitor.tomorrowPrediction.neutralCategories.length}`);
  } else {
    console.log("❌ 财经市场监控数据未获取");
  }
  
  console.log("\n📋 摘要:");
  console.log(report.summary);
  
  console.log("\n💡 综合建议:");
  report.recommendations.forEach((rec, i) => {
    console.log(`${i+1}. ${rec}`);
  });
}

// 主监控函数
function runCombinedMonitor() {
  console.log("🚀 执行综合监控...");
  
  try {
    // 执行伊朗战况监控
    const iranReport = runIranMonitor();
    
    // 执行财经市场监控
    const financialReport = runFinancialMonitor();
    
    // 生成综合报告
    const combinedReport = generateCombinedReport(iranReport, financialReport);
    
    // 打印报告
    printCombinedReport(combinedReport);
    
    // 保存报告
    const reportFile = saveCombinedReport(combinedReport);
    
    // 生成通知消息
    const notification = `
综合监控报告（${combinedReport.timestamp})

伊朗战况:
风险评估: ${iranReport ? iranReport.风险评估.等级 : "数据未获取"}
风险描述: ${iranReport ? iranReport.风险评估.描述 : "数据未获取"}

财经市场:
总体情绪: ${financialReport ? financialReport.overallRecommendation.overallSentiment : "数据未获取"}
仓位建议: ${financialReport ? financialReport.overallRecommendation.overallPosition + " (" + financialReport.overallRecommendation.overallPercentage + ")" : "数据未获取"}
明日预测: ${financialReport ? financialReport.tomorrowPrediction.overallTrend : "数据未获取"}

综合建议:
${combinedReport.recommendations.map(rec => `• ${rec}`).join('\n')}

详细报告: ${reportFile}
`;
    
    console.log("\n📱 通知消息:");
    console.log(notification);
    
    console.log("\n✅ 综合监控完成!");
    
    return { combinedReport, notification };
  } catch (error) {
    console.error(`❌ 综合监控失败: ${error.message}`);
    return null;
  }
}

// 如果直接运行则执行监控
if (require.main === module) {
  runCombinedMonitor();
}

// 导出函数以便定时调用
module.exports = {
  runCombinedMonitor,
  generateCombinedReport,
  saveCombinedReport
};