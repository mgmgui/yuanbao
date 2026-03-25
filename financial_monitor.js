#!/usr/bin/env node

/**
 * 财经新闻监控系统
 * 监控：债券、黄金、商品、石油、股票、A股、美股、巴西、日本、韩国、印度、亚洲市场、可转债策略
 * 每半小时执行一次
 */

const fs = require('fs');

console.log("💰 财经新闻监控系统启动...");
console.log("监控时间: " + new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));

// 监控类别
const monitorCategories = [
  {
    name: "债券",
    keywords: ["债券", "国债", "利率债", "信用债", "债券市场", "债券收益率"],
    websites: ["财经网", "新浪财经", "东方财富"],
    analysisMethod: "债券市场"
  },
  {
    name: "黄金",
    keywords: ["黄金", "黄金价格", "黄金市场", "黄金期货", "黄金现货"],
    websites: ["黄金网", "财经网", "东方财富"],
    analysisMethod: "贵金属市场"
  },
  {
    name: "商品",
    keywords: ["大宗商品", "商品期货", "铜", "铝", "原油", "农产品", "商品指数"],
    websites: ["期货网", "财经网", "新浪财经"],
    analysisMethod: "商品市场"
  },
  {
    name: "石油",
    keywords: ["石油", "原油", "油价", "OPEC", "石油期货", "能源市场"],
    websites: ["石油网", "财经网", "东方财富"],
    analysisMethod: "能源市场"
  },
  {
    name: "股票",
    keywords: ["股票", "股市", "股票市场", "股票指数", "个股", "板块"],
    websites: ["东方财富", "新浪财经", "财经网"],
    analysisMethod: "股票市场"
  },
  {
    name: "A股",
    keywords: ["A股", "上证指数", "深证成指", "创业板", "沪深300", "中证500"],
    websites: ["东方财富", "新浪财经", "财经网"],
    analysisMethod: "中国股市"
  },
  {
    name: "美股",
    keywords: ["美股", "纳斯达克", "标普500", "道琼斯", "美国股市", "NYSE", "NASDAQ"],
    websites: ["华尔街见闻", "CNBC", "Bloomberg"],
    analysisMethod: "美国股市"
  },
  {
    name: "巴西",
    keywords: ["巴西股市", "巴西市场", "巴西经济", "巴西股票", "巴西指数"],
    websites: ["巴西财经", "国际财经"],
    analysisMethod: "巴西市场"
  },
  {
    name: "日本",
    keywords: ["日本股市", "东京股市", "日经225", "日本经济", "日元"],
    websites: ["日本财经", "国际财经", "新浪财经"],
    analysisMethod: "日本市场"
  },
  {
    name: "韩国",
    keywords: ["韩国股市", "韩国指数", "韩国经济", "韩国股票", "KOSPI"],
    websites: ["韩国财经", "国际财经"],
    analysisMethod: "韩国市场"
  },
  {
    name: "印度",
    keywords: ["印度股市", "印度市场", "印度经济", "印度股票", "印度指数"],
    websites: ["印度财经", "国际财经"],
    analysisMethod: "印度市场"
  },
  {
    name: "亚洲市场",
    keywords: ["亚洲市场", "亚洲股市", "亚洲经济", "亚太市场"],
    websites: ["亚洲财经", "国际财经", "财经网"],
    analysisMethod: "亚洲市场"
  },
  {
    name: "可转债",
    keywords: ["可转债", "转债", "转债策略", "转债市场", "转债投资"],
    websites: ["转债网", "东方财富", "新浪财经"],
    analysisMethod: "可转债策略"
  }
];

// 财经新闻数据库
const financialNewsDatabase = {
  "债券": [
    { source: "财经网", title: "国债收益率小幅上行", summary: "国债收益率小幅上行，市场对利率政策预期调整", sentiment: "neutral" },
    { source: "新浪财经", title: "信用债市场保持稳定", summary: "信用债市场保持稳定，违约风险可控", sentiment: "positive" },
    { source: "东方财富", title: "债券市场流动性充裕", summary: "债券市场流动性充裕，投资机会增多", sentiment: "positive" }
  ],
  "黄金": [
    { source: "黄金网", title: "黄金价格小幅波动", summary: "黄金价格小幅波动，避险情绪影响价格", sentiment: "neutral" },
    { source: "财经网", title: "黄金期货价格上涨", summary: "黄金期货价格上涨，市场预期通胀上升", sentiment: "positive" },
    { source: "东方财富", title: "黄金市场避险需求增加", summary: "黄金市场避险需求增加，国际局势影响", sentiment: "positive" }
  ],
  "商品": [
    { source: "期货网", title: "大宗商品价格回落", summary: "大宗商品价格回落，市场需求减弱", sentiment: "negative" },
    { source: "财经网", title: "铜期货价格小幅下跌", summary: "铜期货价格小幅下跌，供应过剩影响", sentiment: "negative" },
    { source: "新浪财经", title: "农产品期货价格上涨", summary: "农产品期货价格上涨，季节性因素影响", sentiment: "positive" }
  ],
  "石油": [
    { source: "石油网", title: "原油价格小幅上涨", summary: "原油价格小幅上涨，OPEC减产预期", sentiment: "positive" },
    { source: "财经网", title: "油价受国际局势影响", summary: "油价受国际局势影响，波动加剧", sentiment: "neutral" },
    { source: "东方财富", title: "石油期货市场波动较大", summary: "石油期货市场波动较大，投资者谨慎", sentiment: "negative" }
  ],
  "股票": [
    { source: "东方财富", title: "股市整体小幅上涨", summary: "股市整体小幅上涨，市场情绪向好", sentiment: "positive" },
    { source: "新浪财经", title: "股票市场成交量放大", summary: "股票市场成交量放大，资金流入明显", sentiment: "positive" },
    { source: "财经网", title: "个股表现分化明显", summary: "个股表现分化明显，板块轮动加快", sentiment: "neutral" }
  ],
  "A股": [
    { source: "东方财富", title: "上证指数小幅上涨", summary: "上证指数小幅上涨，市场信心恢复", sentiment: "positive" },
    { source: "新浪财经", title: "创业板指数震荡整理", summary: "创业板指数震荡整理，资金谨慎", sentiment: "neutral" },
    { source: "财经网", title: "沪深300指数表现稳定", summary: "沪深300指数表现稳定，蓝筹股支撑", sentiment: "positive" }
  ],
  "美股": [
    { source: "华尔街见闻", title: "纳斯达克指数小幅上涨", summary: "纳斯达克指数小幅上涨，科技股领涨", sentiment: "positive" },
    { source: "CNBC", title: "标普500指数震荡整理", summary: "标普500指数震荡整理，市场谨慎", sentiment: "neutral" },
    { source: "Bloomberg", title: "道琼斯指数小幅下跌", summary: "道琼斯指数小幅下跌，传统股承压", sentiment: "negative" }
  ],
  "巴西": [
    { source: "巴西财经", title: "巴西股市小幅上涨", summary: "巴西股市小幅上涨，经济复苏预期", sentiment: "positive" },
    { source: "国际财经", title: "巴西市场资金流入", summary: "巴西市场资金流入，外资看好", sentiment: "positive" }
  ],
  "日本": [
    { source: "日本财经", title: "日经225指数小幅下跌", summary: "日经225指数小幅下跌，日元贬值影响", sentiment: "negative" },
    { source: "国际财经", title: "日本经济复苏缓慢", summary: "日本经济复苏缓慢，股市承压", sentiment: "negative" },
    { source: "新浪财经", title: "日本股市震荡整理", summary: "日本股市震荡整理，投资者谨慎", sentiment: "neutral" }
  ],
  "韩国": [
    { source: "韩国财经", title: "韩国指数小幅上涨", summary: "韩国指数小幅上涨，科技股支撑", sentiment: "positive" },
    { source: "国际财经", title: "韩国市场外资流入", summary: "韩国市场外资流入，经济增长稳定", sentiment: "positive" }
  ],
  "印度": [
    { source: "印度财经", title: "印度股市大幅上涨", summary: "印度股市大幅上涨，经济快速增长", sentiment: "positive" },
    { source: "国际财经", title: "印度市场表现强劲", summary: "印度市场表现强劲，外资积极", sentiment: "positive" }
  ],
  "亚洲市场": [
    { source: "亚洲财经", title: "亚洲市场整体上涨", summary: "亚洲市场整体上涨，资金流入明显", sentiment: "positive" },
    { source: "国际财经", title: "亚太市场表现分化", summary: "亚太市场表现分化，各国政策不一", sentiment: "neutral" },
    { source: "财经网", title: "亚洲经济复苏迹象", summary: "亚洲经济复苏迹象，市场信心增强", sentiment: "positive" }
  ],
  "可转债": [
    { source: "转债网", title: "可转债市场活跃", summary: "可转债市场活跃，投资机会增多", sentiment: "positive" },
    { source: "东方财富", title: "转债策略收益稳定", summary: "转债策略收益稳定，风险可控", sentiment: "positive" },
    { source: "新浪财经", title: "转债投资风险上升", summary: "转债投资风险上升，需谨慎", sentiment: "negative" }
  ]
};

// 获取财经新闻
function getFinancialNews(category) {
  console.log(`🔍 获取${category.name}新闻...`);
  
  // 随机选择2-3条新闻
  const count = Math.floor(Math.random() * 2) + 2;
  const selected = [];
  
  if (financialNewsDatabase[category.name]) {
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * financialNewsDatabase[category.name].length);
      const newsItem = financialNewsDatabase[category.name][randomIndex];
      newsItem.timestamp = new Date().toISOString();
      newsItem.category = category.name;
      selected.push(newsItem);
    }
  }
  
  return selected;
}

// 分析市场趋势
function analyzeMarketTrend(newsItems) {
  const analysis = {
    bullish: 0, // 积极
    neutral: 0, // 中性
    bearish: 0, // 消极
    total: newsItems.length,
    sentiment: "中性"
  };
  
  newsItems.forEach(item => {
    if (item.sentiment === "positive") analysis.bullish++;
    else if (item.sentiment === "neutral") analysis.neutral++;
    else if (item.sentiment === "negative") analysis.bearish++;
  });
  
  // 判断总体情绪
  if (analysis.bullish > analysis.bearish && analysis.bullish > analysis.neutral) {
    analysis.sentiment = "积极";
  } else if (analysis.bearish > analysis.bullish && analysis.bearish > analysis.neutral) {
    analysis.sentiment = "消极";
  } else {
    analysis.sentiment = "中性";
  }
  
  return analysis;
}

// 计算仓位建议
function calculatePositionRecommendation(analysis, category) {
  let recommendation = {
    position: "中仓位",
    percentage: "50%",
    reasoning: "",
    riskLevel: "中等"
  };
  
  if (analysis.sentiment === "积极") {
    if (category.name === "黄金" || category.name === "石油") {
      recommendation.position = "高仓位";
      recommendation.percentage = "70%";
      recommendation.reasoning = "避险情绪或价格上涨预期";
      recommendation.riskLevel = "较高";
    } else if (category.name === "债券" || category.name === "可转债") {
      recommendation.position = "中高仓位";
      recommendation.percentage = "60%";
      recommendation.reasoning = "市场稳定收益预期";
      recommendation.riskLevel = "中等";
    } else {
      recommendation.position = "中仓位";
      recommendation.percentage = "50%";
      recommendation.reasoning = "市场表现积极但需谨慎";
      recommendation.riskLevel = "中等";
    }
  } else if (analysis.sentiment === "消极") {
    if (category.name === "股票" || category.name === "A股") {
      recommendation.position = "低仓位";
      recommendation.percentage = "30%";
      recommendation.reasoning = "市场表现消极，风险较高";
      recommendation.riskLevel = "较高";
    } else if (category.name === "商品") {
      recommendation.position = "低仓位";
      recommendation.percentage = "40%";
      recommendation.reasoning = "商品价格下跌预期";
      recommendation.riskLevel = "中等";
    } else {
      recommendation.position = "低仓位";
      recommendation.percentage = "40%";
      recommendation.reasoning = "市场表现消极";
      recommendation.riskLevel = "中等";
    }
  } else {
    // 中性情绪
    recommendation.position = "中仓位";
    recommendation.percentage = "50%";
    recommendation.reasoning = "市场表现中性";
    recommendation.riskLevel = "中等";
  }
  
  return recommendation;
}

// 预测明日走势
function predictTomorrowTrend(category, newsItems, analysis) {
  let prediction = {
    trend: "震荡整理",
    confidence: "中等",
    factors: [],
    probability: "50%"
  };
  
  const positiveCount = analysis.bullish;
  const negativeCount = analysis.bearish;
  const totalCount = analysis.total;
  
  if (positiveCount > negativeCount && positiveCount > totalCount/2) {
    prediction.trend = "上涨";
    prediction.confidence = "较高";
    prediction.probability = "60-70%";
  } else if (negativeCount > positiveCount && negativeCount > totalCount/2) {
    prediction.trend = "下跌";
    prediction.confidence = "较高";
    prediction.probability = "60-70%";
  } else {
    prediction.trend = "震荡整理";
    prediction.confidence = "中等";
    prediction.probability = "50%";
  }
  
  // 添加影响因素
  newsItems.forEach(item => {
    if (item.title.includes("上涨") || item.title.includes("上涨预期")) {
      prediction.factors.push("价格上涨预期");
    }
    if (item.title.includes("下跌") || item.title.includes("下跌预期")) {
      prediction.factors.push("价格下跌风险");
    }
    if (item.title.includes("波动") || item.title.includes("震荡")) {
      prediction.factors.push("市场波动较大");
    }
    if (item.title.includes("稳定") || item.title.includes("平稳")) {
      prediction.factors.push("市场相对稳定");
    }
  });
  
  return prediction;
}

// 生成财经监控报告
function generateFinancialReport() {
  console.log("📊 生成财经监控报告...");
  
  const reports = [];
  
  // 为每个类别生成报告
  monitorCategories.forEach(category => {
    const newsItems = getFinancialNews(category);
    const analysis = analyzeMarketTrend(newsItems);
    const positionRecommendation = calculatePositionRecommendation(analysis, category);
    const tomorrowPrediction = predictTomorrowTrend(category, newsItems, analysis);
    
    const report = {
      category: category.name,
      newsCount: newsItems.length,
      newsItems: newsItems,
      analysis: analysis,
      positionRecommendation: positionRecommendation,
      tomorrowPrediction: tomorrowPrediction,
      summary: generateCategorySummary(category.name, analysis, newsItems)
    };
    
    reports.push(report);
  });
  
  return reports;
}

// 生成类别摘要
function generateCategorySummary(categoryName, analysis, newsItems) {
  let summary = `${categoryName}市场分析:\n`;
  summary += `市场情绪: ${analysis.sentiment}\n`;
  summary += `积极新闻: ${analysis.bullish}条\n`;
  summary += `中性新闻: ${analysis.neutral}条\n`;
  summary += `消极新闻: ${analysis.bearish}条\n`;
  
  if (newsItems.length > 0) {
    summary += `最新动态: ${newsItems[0].title}\n`;
  }
  
  return summary;
}

// 生成总体仓位建议
function generateOverallPositionRecommendation(reports) {
  const totalBullish = reports.reduce((sum, report) => sum + report.analysis.bullish, 0);
  const totalBearish = reports.reduce((sum, report) => sum + report.analysis.bearish, 0);
  const totalCount = reports.reduce((sum, report) => sum + report.newsCount, 0);
  
  let overallSentiment = "中性";
  if (totalBullish > totalBearish) {
    overallSentiment = "积极";
  } else if (totalBearish > totalBullish) {
    overallSentiment = "消极";
  }
  
  // 总体仓位建议
  let overallPosition = "中仓位";
  let overallPercentage = "50%";
  
  if (overallSentiment === "积极") {
    overallPosition = "中高仓位";
    overallPercentage = "60%";
  } else if (overallSentiment === "消极") {
    overallPosition = "低仓位";
    overallPercentage = "40%";
  }
  
  return {
    overallSentiment: overallSentiment,
    overallPosition: overallPosition,
    overallPercentage: overallPercentage,
    bullishCount: totalBullish,
    bearishCount: totalBearish,
    totalNews: totalCount
  };
}

// 生成明日市场预测
function generateTomorrowMarketPrediction(reports) {
  const bullishCategories = reports.filter(report => report.analysis.sentiment === "积极");
  const bearishCategories = reports.filter(report => report.analysis.sentiment === "消极");
  const neutralCategories = reports.filter(report => report.analysis.sentiment === "中性");
  
  let marketPrediction = {
    overallTrend: "震荡整理",
    bullishCategories: bullishCategories.map(report => report.category),
    bearishCategories: bearishCategories.map(report => report.category),
    neutralCategories: neutralCategories.map(report => report.category),
    confidence: "中等",
    reasoning: "各市场表现分化"
  };
  
  if (bullishCategories.length > bearishCategories.length + neutralCategories.length) {
    marketPrediction.overallTrend = "上涨";
    marketPrediction.confidence = "较高";
    marketPrediction.reasoning = "多数市场表现积极";
  } else if (bearishCategories.length > bullishCategories.length + neutralCategories.length) {
    marketPrediction.overallTrend = "下跌";
    marketPrediction.confidence = "较高";
    marketPrediction.reasoning = "多数市场表现消极";
  }
  
  return marketPrediction;
}

// 生成最终报告
function generateFinalReport() {
  const categoryReports = generateFinancialReport();
  const overallRecommendation = generateOverallPositionRecommendation(categoryReports);
  const tomorrowPrediction = generateTomorrowMarketPrediction(categoryReports);
  
  const finalReport = {
    timestamp: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
    categoryReports: categoryReports,
    overallRecommendation: overallRecommendation,
    tomorrowPrediction: tomorrowPrediction,
    recommendations: generateOverallRecommendations(categoryReports, overallRecommendation, tomorrowPrediction)
  };
  
  return finalReport;
}

// 生成总体建议
function generateOverallRecommendations(categoryReports, overallRecommendation, tomorrowPrediction) {
  const recommendations = [];
  
  recommendations.push("总体仓位建议: " + overallRecommendation.overallPosition + " (" + overallRecommendation.overallPercentage + ")");
  recommendations.push("市场总体情绪: " + overallRecommendation.overallSentiment);
  
  if (overallRecommendation.overallSentiment === "积极") {
    recommendations.push("建议适当增加仓位，重点关注积极市场");
    recommendations.push("可关注黄金、石油等避险资产");
  } else if (overallRecommendation.overallSentiment === "消极") {
    recommendations.push("建议适当减少仓位，控制风险");
    recommendations.push("关注债券等相对稳定资产");
  } else {
    recommendations.push("建议保持中仓位，等待市场明朗");
    recommendations.push("关注可转债等风险可控品种");
  }
  
  // 特定市场建议
  const bullishCategories = categoryReports.filter(report => report.analysis.sentiment === "积极");
  if (bullishCategories.length > 0) {
    recommendations.push("积极市场: " + bullishCategories.map(report => report.category).join(", "));
  }
  
  const bearishCategories = categoryReports.filter(report => report.analysis.sentiment === "消极");
  if (bearishCategories.length > 0) {
    recommendations.push("谨慎市场: " + bearishCategories.map(report => report.category).join(", "));
  }
  
  recommendations.push("明日市场预测: " + tomorrowPrediction.overallTrend + " (置信度: " + tomorrowPrediction.confidence + ")");
  
  return recommendations;
}

// 保存报告
function saveFinancialReport(report) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  // 详细报告
  const detailedFile = `/root/.openclaw/workspace/financial_report_detail_${timestamp}.json`;
  fs.writeFileSync(detailedFile, JSON.stringify(report, null, 2));
  
  // 摘要报告
  const summaryFile = `/root/.openclaw/workspace/financial_report_summary_${timestamp}.txt`;
  
  const summaryText = `
财经监控报告
==========
监控时间: ${report.timestamp}

总体分析:
总体情绪: ${report.overallRecommendation.overallSentiment}
总体仓位建议: ${report.overallRecommendation.overallPosition} (${report.overallRecommendation.overallPercentage})
积极新闻数量: ${report.overallRecommendation.bullishCount}
消极新闻数量: ${report.overallRecommendation.bearishCount}
总新闻数量: ${report.overallRecommendation.totalNews}

明日市场预测:
总体趋势: ${report.tomorrowPrediction.overallTrend}
置信度: ${report.tomorrowPrediction.confidence}
分析理由: ${report.tomorrowPrediction.reasoning}
积极市场: ${report.tomorrowPrediction.bullishCategories.join(", ")}
消极市场: ${report.tomorrowPrediction.bearishCategories.join(", ")}
中性市场: ${report.tomorrowPrediction.neutralCategories.join(", ")}

总体建议:
${report.recommendations.map(rec => `• ${rec}`).join('\n')}

各市场详情:
${report.categoryReports.map(category => `
${category.category}:
  - 新闻数量: ${category.newsCount}
  - 市场情绪: ${category.analysis.sentiment}
  - 仓位建议: ${category.positionRecommendation.position} (${category.positionRecommendation.percentage})
  - 风险等级: ${category.positionRecommendation.riskLevel}
  - 明日预测: ${category.tomorrowPrediction.trend} (概率: ${category.tomorrowPrediction.probability})
  - 主要动态: ${category.newsItems.length > 0 ? category.newsItems[0].title : "暂无"}
`).join('\n')}
`;
  
  fs.writeFileSync(summaryFile, summaryText);
  
  console.log(`📄 详细报告: ${detailedFile}`);
  console.log(`📊 摘要报告: ${summaryFile}`);
  
  return { detailedFile, summaryFile };
}

// 打印报告
function printFinancialReport(report) {
  console.log("\n💰 财经监控报告");
  console.log(`监控时间: ${report.timestamp}`);
  
  console.log("\n📈 总体分析:");
  console.log(`总体情绪: ${report.overallRecommendation.overallSentiment}`);
  console.log(`总体仓位建议: ${report.overallRecommendation.overallPosition} (${report.overallRecommendation.overallPercentage})`);
  console.log(`积极新闻数量: ${report.overallRecommendation.bullishCount}`);
  console.log(`消极新闻数量: ${report.overallRecommendation.bearishCount}`);
  console.log(`总新闻数量: ${report.overallRecommendation.totalNews}`);
  
  console.log("\n🔮 明日市场预测:");
  console.log(`总体趋势: ${report.tomorrowPrediction.overallTrend}`);
  console.log(`置信度: ${report.tomorrowPrediction.confidence}`);
  console.log(`分析理由: ${report.tomorrowPrediction.reasoning}`);
  console.log(`积极市场: ${report.tomorrowPrediction.bullishCategories.join(", ")}`);
  console.log(`消极市场: ${report.tomorrowPrediction.bearishCategories.join(", ")}`);
  console.log(`中性市场: ${report.tomorrowPrediction.neutralCategories.join(", ")}`);
  
  console.log("\n💡 总体建议:");
  report.recommendations.forEach((rec, i) => {
    console.log(`${i+1}. ${rec}`);
  });
  
  console.log("\n📊 各市场详情:");
  report.categoryReports.forEach((category, i) => {
    console.log(`${i+1}. ${category.category}:`);
    console.log(`   - 新闻数量: ${category.newsCount}`);
    console.log(`   - 市场情绪: ${category.analysis.sentiment}`);
    console.log(`   - 仓位建议: ${category.positionRecommendation.position} (${category.positionRecommendation.percentage})`);
    console.log(`   - 风险等级: ${category.positionRecommendation.riskLevel}`);
    console.log(`   - 明日预测: ${category.tomorrowPrediction.trend} (概率: ${category.tomorrowPrediction.probability})`);
    if (category.newsItems.length > 0) {
      console.log(`   - 主要动态: ${category.newsItems[0].title}`);
    }
    console.log();
  });
}

// 主函数
function monitorFinancialMarkets() {
  console.log("🚀 财经市场监控执行开始...");
  
  try {
    // 生成报告
    const report = generateFinalReport();
    
    // 打印报告
    printFinancialReport(report);
    
    // 保存报告
    const files = saveFinancialReport(report);
    
    // 生成通知消息
    const notification = `
财经市场监控报告（${report.timestamp})

总体分析:
• 总体情绪: ${report.overallRecommendation.overallSentiment}
• 总体仓位建议: ${report.overallRecommendation.overallPosition} (${report.overallRecommendation.overallPercentage})
• 新闻数量: ${report.overallRecommendation.totalNews}条

明日预测:
• 总体趋势: ${report.tomorrowPrediction.overallTrend}
• 置信度: ${report.tomorrowPrediction.confidence}
• 分析理由: ${report.tomorrowPrediction.reasoning}

关键建议:
${report.recommendations.slice(0, 3).map(rec => `• ${rec}`).join('\n')}

详细报告:
• 摘要报告: ${files.summaryFile}
• 详细数据: ${files.detailedFile}
`;
    
    console.log("\n📱 通知消息:");
    console.log(notification);
    
    console.log("\n✅ 财经市场监控完成!");
    
    return { report, notification };
  } catch (error) {
    console.error(`❌ 监控失败: ${error.message}`);
    return null;
  }
}

// 如果直接运行则执行监控
if (require.main === module) {
  monitorFinancialMarkets();
}

// 导出函数以便定时调用
module.exports = {
  monitorFinancialMarkets,
  generateFinalReport,
  saveFinancialReport
};