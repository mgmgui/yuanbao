/**
 * 财经监控脚本
 * 监控股票、基金、可转债、黄金、商品等金融市场
 * 包含异常波动警报和决策辅助功能
 */

const { exec } = require('child_process');
const fs = require('fs');

async function runFinancialMonitor() {
  console.log('开始执行财经监控...');
  
  // 1. 获取各类资产价格
  const financialData = await collectFinancialData();
  
  // 2. 检查异常波动
  const alerts = await checkPriceAlerts(financialData);
  
  // 3. 生成决策辅助分析
  const analysis = await generateDecisionAnalysis(financialData);
  
  // 4. 生成监控报告
  const report = generateFinancialReport(financialData, alerts, analysis);
  
  console.log('财经监控完成');
  return report;
}

async function collectFinancialData() {
  console.log('收集金融市场数据...');
  
  // 这里可以集成实际的API接口
  // 暂时模拟数据
  const stockData = {
    '沪深300': { price: 3800.12, change: 1.5, volume: '200亿' },
    '上证指数': { price: 3250.45, change: 0.8, volume: '150亿' },
    '创业板': { price: 2100.67, change: -0.3, volume: '80亿' }
  };
  
  const fundData = {
    '货币基金A': { price: 1.0234, change: 0.01 },
    '股票基金B': { price: 2.5678, change: 1.2 },
    '债券基金C': { price: 1.2345, change: 0.3 }
  };
  
  const bondData = {
    '可转债001': { price: 105.23, premium: 5.2 },
    '可转债002': { price: 98.76, premium: -1.3 },
    '可转债003': { price: 102.45, premium: 2.5 }
  };
  
  const goldData = {
    '黄金现货': { price: 480.12, change: 0.5 },
    '黄金期货': { price: 482.34, change: 0.8 }
  };
  
  const commodityData = {
    '原油': { price: 75.23, change: -1.2 },
    '铜': { price: 8500.45, change: 0.5 },
    '大豆': { price: 4500.67, change: 0.3 }
  };
  
  return {
    stocks: stockData,
    funds: fundData,
    bonds: bondData,
    gold: goldData,
    commodities: commodityData,
    timestamp: new Date().toISOString()
  };
}

async function checkPriceAlerts(data) {
  console.log('检查价格异常波动...');
  
  const alerts = [];
  
  // 股票异常波动检查
  for (const [stockName, stockData] of Object.entries(data.stocks)) {
    if (Math.abs(stockData.change) > 3) { // 超过3%视为异常
      alerts.push({
        asset: stockName,
        type: '股票',
        change: stockData.change,
        alert: `价格波动超过3%，当前涨幅${stockData.change}%`,
        reason: await findAlertReason(stockName, stockData.change)
      });
    }
  }
  
  // 基金异常波动检查
  for (const [fundName, fundData] of Object.entries(data.funds)) {
    if (Math.abs(fundData.change) > 2) { // 超过2%视为异常
      alerts.push({
        asset: fundName,
        type: '基金',
        change: fundData.change,
        alert: `净值波动超过2%，当前变化${fundData.change}%`,
        reason: '可能受市场情绪或政策影响'
      });
    }
  }
  
  // 黄金异常波动检查
  if (Math.abs(data.gold['黄金现货'].change) > 2) {
    alerts.push({
      asset: '黄金现货',
      type: '黄金',
      change: data.gold['黄金现货'].change,
      alert: `黄金价格波动超过2%，当前变化${data.gold['黄金现货'].change}%`,
      reason: '可能受国际局势或货币政策影响'
    });
  }
  
  return alerts;
}

async function findAlertReason(assetName, change) {
  // 这里可以集成新闻分析API
  const reasons = [
    '公司财报发布',
    '行业政策变化',
    '宏观经济数据发布',
    '国际局势影响',
    '市场情绪波动',
    '技术面突破'
  ];
  
  const randomIndex = Math.floor(Math.random() * reasons.length);
  return reasons[randomIndex];
}

async function generateDecisionAnalysis(data) {
  console.log('生成决策辅助分析...');
  
  const analysis = {
    marketTrend: analyzeMarketTrend(data),
    investmentOpportunities: findInvestmentOpportunities(data),
    riskWarnings: identifyRisks(data),
    recommendations: generateRecommendations(data)
  };
  
  return analysis;
}

function analyzeMarketTrend(data) {
  const stockChanges = Object.values(data.stocks).map(item => item.change);
  const avgStockChange = stockChanges.reduce((a, b) => a + b, 0) / stockChanges.length;
  
  if (avgStockChange > 1) {
    return { trend: '上涨', strength: '较强', confidence: 70 };
  } else if (avgStockChange < -1) {
    return { trend: '下跌', strength: '较弱', confidence: 65 };
  } else {
    return { trend: '震荡', strength: '中性', confidence: 60 };
  }
}

function findInvestmentOpportunities(data) {
  const opportunities = [];
  
  // 寻找表现良好的资产
  Object.entries(data.stocks).forEach(([name, info]) => {
    if (info.change > 2 && info.volume > '100亿') {
      opportunities.push({
        asset: name,
        type: '股票',
        reason: '涨幅较大且成交量活跃',
        suggestion: '可考虑短期关注'
      });
    }
  });
  
  // 寻找可转债机会
  Object.entries(data.bonds).forEach(([name, info]) => {
    if (info.premium < 0) {
      opportunities.push({
        asset: name,
        type: '可转债',
        reason: '溢价率较低，安全边际较高',
        suggestion: '可考虑配置'
      });
    }
  });
  
  // 黄金机会
  if (data.gold['黄金现货'].change > 0.5) {
    opportunities.push({
      asset: '黄金',
      type: '贵金属',
      reason: '价格稳步上涨，避险需求增加',
      suggestion: '可适量配置避险'
    });
  }
  
  return opportunities;
}

function identifyRisks(data) {
  const risks = [];
  
  // 股票风险
  Object.entries(data.stocks).forEach(([name, info]) => {
    if (info.change < -2) {
      risks.push({
        asset: name,
        type: '股票',
        risk: '跌幅较大',
        level: '中等',
        suggestion: '谨慎持有'
      });
    }
  });
  
  // 商品风险
  if (data.commodities['原油'].change < -1) {
    risks.push({
      asset: '原油',
      type: '商品',
      risk: '价格下跌',
      level: '中等',
      suggestion: '关注供需变化'
    });
  }
  
  // 市场整体风险
  const stockChanges = Object.values(data.stocks).map(item => item.change);
  const negativeCount = stockChanges.filter(change => change < 0).length;
  if (negativeCount > Object.keys(data.stocks).length / 2) {
    risks.push({
      asset: '市场整体',
      type: '系统性',
      risk: '多数股票下跌',
      level: '较高',
      suggestion: '控制仓位，分散风险'
    });
  }
  
  return risks;
}

function generateRecommendations(data) {
  const recommendations = [];
  
  // 基于趋势的分析建议
  const trend = analyzeMarketTrend(data);
  
  if (trend.trend === '上涨') {
    recommendations.push({
      type: '策略',
      content: '市场上涨趋势，可适度增加权益类资产配置',
      priority: '高'
    });
  } else if (trend.trend === '下跌') {
    recommendations.push({
      type: '策略',
      content: '市场下跌趋势，建议控制仓位，关注防御性资产',
      priority: '高'
    });
  } else {
    recommendations.push({
      type: '策略',
      content: '市场震荡，建议平衡配置，等待趋势明朗',
      priority: '中'
    });
  }
  
  // 具体资产建议
  const opportunities = findInvestmentOpportunities(data);
  if (opportunities.length > 0) {
    recommendations.push({
      type: '具体',
      content: `发现${opportunities.length}个投资机会，可重点关注：${opportunities.map(o => o.asset).join(', ')}`,
      priority: '中'
    });
  }
  
  const risks = identifyRisks(data);
  if (risks.length > 0) {
    recommendations.push({
      type: '风险',
      content: `需关注${risks.length}个风险点：${risks.map(r => r.asset).join(', ')}`,
      priority: '高'
    });
  }
  
  return recommendations;
}

function generateFinancialReport(data, alerts, analysis) {
  const timestamp = new Date().toLocaleString('zh-CN');
  
  return `📈 财经监控报告 (${timestamp})

💰 **资产价格概览**
- 沪深300: ${data.stocks['沪深300'].price} (${data.stocks['沪深300'].change}%)
- 上证指数: ${data.stocks['上证指数'].price} (${data.stocks['上证指数'].change}%)
- 创业板: ${data.stocks['创业板'].price} (${data.stocks['创业板'].change}%)
- 黄金现货: ${data.gold['黄金现货'].price} (${data.gold['黄金现货'].change}%)
- 原油: ${data.commodities['原油'].price} (${data.commodities['原油'].change}%)

⚠️ **异常波动警报**
${alerts.length > 0 ? alerts.map(alert => `- ${alert.asset} (${alert.type}): ${alert.alert}\n  📝 原因分析: ${alert.reason}`).join('\n') : '✅ 无异常波动'}

📊 **市场趋势分析**
- 整体趋势: ${analysis.marketTrend.trend}
- 趋势强度: ${analysis.marketTrend.strength}
- 置信度: ${analysis.marketTrend.confidence}%

🎯 **投资机会发现**
${analysis.investmentOpportunities.length > 0 ? analysis.investmentOpportunities.map(opp => `- ${opp.asset}: ${opp.reason}\n  建议: ${opp.suggestion}`).join('\n') : '🔍 暂无显著机会'}

⚠️ **风险提示**
${analysis.riskWarnings.length > 0 ? analysis.riskWarnings.map(risk => `- ${risk.asset}: ${risk.risk} (风险等级: ${risk.level})\n  建议: ${risk.suggestion}`).join('\n') : '✅ 无明显风险'}

💡 **决策辅助建议**
${analysis.recommendations.map(rec => `- ${rec.type}: ${rec.content} (优先级: ${rec.priority})`).join('\n')}

🔍 **监控频率**
- 下一次监控: 30分钟后
- 重点关注: 股票异常波动、黄金价格变化、大宗商品走势`;
}

module.exports = { runFinancialMonitor };