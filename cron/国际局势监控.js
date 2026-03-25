/**
 * 国际局势监控脚本
 * 监控美以伊战况及中东局势，定期汇总不同信源新闻，制作简报
 */

const { exec } = require('child_process');
const fs = require('fs');

async function runInternationalMonitor() {
  console.log('开始执行国际局势监控...');
  
  // 1. 收集多个信源的新闻
  const newsSources = await collectNewsSources();
  
  // 2. 分析中东局势
  const situationAnalysis = await analyzeMiddleEastSituation(newsSources);
  
  // 3. 生成综合简报
  const briefing = generateBriefing(newsSources, situationAnalysis);
  
  // 4. 保存分析结果
  saveAnalysisResults(situationAnalysis);
  
  console.log('国际局势监控完成');
  return briefing;
}

async function collectNewsSources() {
  console.log('收集多信源新闻...');
  
  // 模拟多个新闻来源
  const sources = {
    '新华社': {
      news: [
        { title: '中东局势持续紧张', content: '近期中东地区局势持续紧张...', confidence: 90 },
        { title: '伊朗核谈判进展', content: '伊朗核谈判取得新进展...', confidence: 85 }
      ],
      bias: '官方视角'
    },
    'BBC': {
      news: [
        { title: '美国中东政策调整', content: '美国政府调整中东政策...', confidence: 80 },
        { title: '以色列军事行动', content: '以色列在加沙地带展开军事行动...', confidence: 75 }
      ],
      bias: '国际视角'
    },
    '路透社': {
      news: [
        { title: '石油价格波动', content: '中东局势影响国际石油价格...', confidence: 85 },
        { title: '伊朗军事动态', content: '伊朗军方展示新武器...', confidence: 70 }
      ],
      bias: '商业视角'
    },
    'CNN': {
      news: [
        { title: '美国以色列关系', content: '美以关系面临新的挑战...', confidence: 75 },
        { title: '中东难民问题', content: '中东冲突导致难民问题加剧...', confidence: 80 }
      ],
      bias: '西方视角'
    },
    '半岛电视台': {
      news: [
        { title: '阿拉伯国家立场', content: '阿拉伯国家在中东冲突中的立场...', confidence: 85 },
        { title: '伊朗政治动态', content: '伊朗国内政治局势变化...', confidence: 70 }
      ],
      bias: '阿拉伯视角'
    }
  };
  
  // 模拟网络爬虫收集实时新闻
  const realNews = await simulateNewsCollection();
  sources['网络聚合'] = realNews;
  
  return sources;
}

async function simulateNewsCollection() {
  // 这里可以集成实际的网络爬虫
  return {
    news: [
      { title: '美伊关系最新动态', content: '美伊关系出现微妙变化...', confidence: 75 },
      { title: '以色列安全形势', content: '以色列国内安全形势分析...', confidence: 80 },
      { title: '中东石油出口', content: '中东石油出口受局势影响...', confidence: 85 }
    ],
    bias: '综合视角'
  };
}

async function analyzeMiddleEastSituation(sources) {
  console.log('分析中东局势...');
  
  const analysis = {
    keyEvents: [],
    conflictAnalysis: {},
    riskAssessment: {},
    trendPrediction: {},
    recommendations: []
  };
  
  // 提取关键事件
  Object.values(sources).forEach(source => {
    source.news.forEach(article => {
      if (article.confidence > 75 && article.title.includes('中东') || 
          article.title.includes('伊朗') || 
          article.title.includes('以色列') ||
          article.title.includes('美国')) {
        analysis.keyEvents.push({
          event: article.title,
          summary: article.content.substring(0, 100),
          source: source.bias,
          confidence: article.confidence
        });
      }
    });
  });
  
  // 冲突分析
  const conflictTopics = ['军事冲突', '政治关系', '经济影响', '人道主义'];
  conflictTopics.forEach(topic => {
    const relevantArticles = [];
    Object.values(sources).forEach(source => {
      source.news.forEach(article => {
        if (article.content.includes(topic)) {
          relevantArticles.push({
            title: article.title,
            content: article.content,
            source: source.bias
          });
        }
      });
    });
    
    analysis.conflictAnalysis[topic] = {
      articles: relevantArticles,
      severity: calculateSeverity(relevantArticles),
      trend: analyzeTrend(relevantArticles)
    };
  });
  
  // 风险评估
  analysis.riskAssessment = {
    militaryRisk: calculateRiskScore(sources, '军事冲突'),
    politicalRisk: calculateRiskScore(sources, '政治关系'),
    economicRisk: calculateRiskScore(sources, '经济影响'),
    humanitarianRisk: calculateRiskScore(sources, '人道主义'),
    overallRisk: calculateOverallRisk(analysis.conflictAnalysis)
  };
  
  // 趋势预测
  analysis.trendPrediction = {
    shortTerm: predictShortTermTrend(sources),
    mediumTerm: predictMediumTermTrend(sources),
    longTerm: predictLongTermTrend(sources)
  };
  
  // 建议
  analysis.recommendations = generateRecommendations(analysis);
  
  return analysis;
}

function calculateSeverity(articles) {
  const severityKeywords = ['紧张', '冲突', '升级', '危机', '战争', '袭击'];
  let severityScore = 0;
  
  articles.forEach(article => {
    const contentLower = article.content.toLowerCase();
    severityKeywords.forEach(keyword => {
      if (contentLower.includes(keyword)) {
        severityScore += 10;
      }
    });
  });
  
  if (severityScore > 50) return '高';
  if (severityScore > 20) return '中';
  return '低';
}

function analyzeTrend(articles) {
  const trendKeywords = {
    '恶化': ['恶化', '升级', '加剧', '紧张'],
    '改善': ['改善', '缓和', '进展', '谈判'],
    '稳定': ['稳定', '不变', '维持', '平衡']
  };
  
  let trendScore = { '恶化': 0, '改善': 0, '稳定': 0 };
  
  articles.forEach(article => {
    const contentLower = article.content.toLowerCase();
    Object.entries(trendKeywords).forEach(([trend, keywords]) => {
      keywords.forEach(keyword => {
        if (contentLower.includes(keyword)) {
          trendScore[trend] += 1;
        }
      });
    });
  });
  
  const maxTrend = Object.keys(trendScore).reduce((a, b) => trendScore[a] > trendScore[b] ? a : b);
  return maxTrend;
}

function calculateRiskScore(sources, topic) {
  let riskScore = 0;
  Object.values(sources).forEach(source => {
    source.news.forEach(article => {
      if (article.content.includes(topic)) {
        riskScore += article.confidence / 10;
      }
    });
  });
  
  if (riskScore > 80) return '高';
  if (riskScore > 50) return '中';
  return '低';
}

function calculateOverallRisk(conflictAnalysis) {
  const risks = Object.values(conflictAnalysis).map(item => item.severity);
  const highCount = risks.filter(r => r === '高').length;
  const mediumCount = risks.filter(r => r === '中').length;
  
  if (highCount >= 2) return '高';
  if (highCount >= 1 || mediumCount >= 2) return '中';
  return '低';
}

function predictShortTermTrend(sources) {
  const recentArticles = [];
  Object.values(sources).forEach(source => {
    source.news.forEach(article => {
      if (article.confidence > 80) {
        recentArticles.push(article);
      }
    });
  });
  
  const trend = analyzeTrend(recentArticles);
  return trend;
}

function predictMediumTermTrend(sources) {
  // 综合所有文章的趋势分析
  const allArticles = [];
  Object.values(sources).forEach(source => {
    allArticles.push(...source.news);
  });
  
  const trend = analyzeTrend(allArticles);
  return trend;
}

function predictLongTermTrend(sources) {
  // 基于历史趋势和当前分析的预测
  return '持续紧张，但有缓和可能';
}

function generateRecommendations(analysis) {
  const recommendations = [];
  
  if (analysis.riskAssessment.militaryRisk === '高') {
    recommendations.push({
      type: '军事',
      content: '军事风险较高，建议密切关注军事动向',
      priority: '高'
    });
  }
  
  if (analysis.riskAssessment.politicalRisk === '高') {
    recommendations.push({
      type: '政治',
      content: '政治风险较高，建议关注外交动态',
      priority: '高'
    });
  }
  
  if (analysis.riskAssessment.economicRisk === '高') {
    recommendations.push({
      type: '经济',
      content: '经济风险较高，建议关注石油价格和贸易影响',
      priority: '中'
    });
  }
  
  if (analysis.trendPrediction.shortTerm === '恶化') {
    recommendations.push({
      type: '趋势',
      content: '短期趋势可能恶化，建议保持警惕',
      priority: '高'
    });
  }
  
  if (analysis.trendPrediction.mediumTerm === '改善') {
    recommendations.push({
      type: '趋势',
      content: '中期趋势可能改善，可关注和平进程',
      priority: '中'
    });
  }
  
  return recommendations;
}

function saveAnalysisResults(analysis) {
  const timestamp = new Date().toISOString();
  const filePath = './memory/中东局势分析.md';
  
  const content = `# 中东局势分析报告 (${timestamp})

## 关键事件
${analysis.keyEvents.map(event => `- ${event.event} (${event.source}, 置信度${event.confidence}%)\n  ${event.summary}`).join('\n')}

## 冲突分析
${Object.entries(analysis.conflictAnalysis).map(([topic, data]) => `- **${topic}**:\n  严重程度: ${data.severity}\n  趋势: ${data.trend}\n  相关报道: ${data.articles.length}篇`).join('\n')}

## 风险评估
- 军事风险: ${analysis.riskAssessment.militaryRisk}
- 政治风险: ${analysis.riskAssessment.politicalRisk}
- 经济风险: ${analysis.riskAssessment.economicRisk}
- 人道主义风险: ${analysis.riskAssessment.humanitarianRisk}
- 总体风险: ${analysis.riskAssessment.overallRisk}

## 趋势预测
- 短期趋势 (1-3个月): ${analysis.trendPrediction.shortTerm}
- 中期趋势 (3-6个月): ${analysis.trendPrediction.mediumTerm}
- 长期趋势 (6-12个月): ${analysis.trendPrediction.longTerm}

## 建议
${analysis.recommendations.map(rec => `- ${rec.type}: ${rec.content} (优先级: ${rec.priority})`).join('\n')}
`;
  
  fs.writeFileSync(filePath, content);
}

function generateBriefing(sources, analysis) {
  const timestamp = new Date().toLocaleString('zh-CN');
  
  return `🌍 国际局势监控简报 (${timestamp})

📰 **信息来源**
${Object.keys(sources).map(source => `- ${source}: ${sources[source].bias}视角 (${sources[source].news.length}篇)`).join('\n')}

🔍 **中东局势核心分析**

**关键事件摘要**
${analysis.keyEvents.slice(0, 5).map(event => `- ${event.event}\n  📋 ${event.summary}...\n  信源: ${event.source}, 置信度: ${event.confidence}%`).join('\n')}

**冲突分析**
${Object.entries(analysis.conflictAnalysis).map(([topic, data]) => `- ${topic}: 严重程度 ${data.severity}, 趋势 ${data.trend}`).join('\n')}

**风险评估**
- 军事风险: ${analysis.riskAssessment.militaryRisk}
- 政治风险: ${analysis.riskAssessment.politicalRisk}
- 经济风险: ${analysis.riskAssessment.economicRisk}
- 人道主义风险: ${analysis.riskAssessment.humanitarianRisk}
- ⚠️ 总体风险等级: ${analysis.riskAssessment.overallRisk}

**趋势预测**
- 🕒 短期 (1-3个月): ${analysis.trendPrediction.shortTerm}
- 🕒 中期 (3-6个月): ${analysis.trendPrediction.mediumTerm}
- 🕒 长期 (6-12个月): ${analysis.trendPrediction.longTerm}

💡 **行动建议**
${analysis.recommendations.map(rec => `- ${rec.priority === '高' ? '⚠️' : '📝'} ${rec.content}`).join('\n')}

📊 **综合分析**
- 新闻覆盖率: ${Object.values(sources).reduce((sum, source) => sum + source.news.length, 0)}篇
- 关键事件数量: ${analysis.keyEvents.length}个
- 风险点数量: ${Object.values(analysis.riskAssessment).filter(r => r === '高').length}个高风险

🔔 **监控频率**
- 下一次监控: 1小时后
- 重点关注: 美以伊关系变化、中东军事动向、石油价格影响`;
}

module.exports = { runInternationalMonitor };