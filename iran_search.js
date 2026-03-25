#!/usr/bin/env node

/**
 * Iran Search Monitor - Search for Iran conflict news
 */

const axios = require('axios');
const cheerio = require('cheerio');

// 搜索关键词
const searchKeywords = [
  "Iran conflict news latest",
  "Iran war updates",
  "Iran military situation",
  "Iran-Israel tensions",
  "Middle East conflict Iran"
];

// 搜索引擎列表
const searchEngines = [
  {
    name: "Google",
    url: "https://www.google.com/search",
    params: {
      q: "",
      tbs: "qdr:h"
    }
  },
  {
    name: "Bing",
    url: "https://www.bing.com/search",
    params: {
      q: "",
      FORM: "HDRSC1"
    }
  },
  {
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/html/",
    params: {
      q: ""
    }
  }
];

async function searchIranNews() {
  console.log("🔍 开始搜索伊朗战况新闻...");
  
  const allResults = [];
  
  for (const keyword of searchKeywords) {
    for (const engine of searchEngines) {
      console.log(`搜索: "${keyword}" 在 ${engine.name}`);
      
      try {
        const searchUrl = `${engine.url}?q=${encodeURIComponent(keyword)}`;
        
        const { data } = await axios.get(searchUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
            'Referer': 'https://www.google.com/',
            'DNT': '1'
          },
          timeout: 10000
        });
        
        const $ = cheerio.load(data);
        
        // 提取搜索结果
        const results = $('.g, .b_algo, .result').map((index, element) => {
          const title = $(element).find('h3, a').text().trim();
          const link = $(element).find('a').attr('href');
          const snippet = $(element).find('.s, .summary').text().trim();
          
          if (title && link) {
            return {
              engine: engine.name,
              keyword: keyword,
              title: title,
              url: link,
              snippet: snippet,
              timestamp: new Date().toISOString()
            };
          }
        }).get();
        
        allResults.push(...results);
        
      } catch (error) {
        console.error(`${engine.name} 搜索失败: ${error.message}`);
      }
    }
  }
  
  return allResults;
}

function analyzeIranNews(results) {
  console.log("📊 分析伊朗战况新闻...");
  
  const analysis = {
    militaryCount: 0,
    diplomaticCount: 0,
    economicCount: 0,
    casualtyCount: 0,
    internationalCount: 0,
    totalResults: results.length,
    topics: [],
    sentiment: "neutral"
  };
  
  const militaryKeywords = ['attack', 'military', 'strike', 'operation', 'battle', 'conflict', 'war'];
  const diplomaticKeywords = ['diplomacy', 'negotiations', 'talks', 'peace', 'agreement', 'mediation'];
  const economicKeywords = ['oil', 'economy', 'sanctions', 'trade', 'economic', 'export'];
  const casualtyKeywords = ['casualties', 'dead', 'injured', 'death', 'killed', 'wounded'];
  const internationalKeywords = ['UN', 'United Nations', 'Russia', 'USA', 'China', 'international'];
  
  results.forEach(result => {
    const text = `${result.title} ${result.snippet}`.toLowerCase();
    
    // 统计关键词出现次数
    militaryKeywords.forEach(word => {
      if (text.includes(word)) analysis.militaryCount++;
    });
    
    diplomaticKeywords.forEach(word => {
      if (text.includes(word)) analysis.diplomaticCount++;
    });
    
    economicKeywords.forEach(word => {
      if (text.includes(word)) analysis.economicCount++;
    });
    
    casualtyKeywords.forEach(word => {
      if (text.includes(word)) analysis.casualtyCount++;
    });
    
    internationalKeywords.forEach(word => {
      if (text.includes(word)) analysis.internationalCount++;
    });
    
    // 收集主题
    const IranKeywords = ['Iran', 'Iranian'];
    if (IranKeywords.some(word => text.includes(word.toLowerCase()))) {
      analysis.topics.push(result.title);
    }
  });
  
  // 判断情感倾向
  const positiveWords = ['peace', 'agreement', 'progress', 'positive', 'improvement', 'hopeful'];
  const negativeWords = ['attack', 'war', 'conflict', 'violence', 'tensions', 'crisis', 'danger'];
  
  let positiveScore = 0;
  let negativeScore = 0;
  
  results.forEach(result => {
    const text = `${result.title} ${result.snippet}`.toLowerCase();
    
    positiveWords.forEach(word => {
      if (text.includes(word)) positiveScore++;
    });
    
    negativeWords.forEach(word => {
      if (text.includes(word)) negativeScore++;
    });
  });
  
  if (negativeScore > positiveScore) {
    analysis.sentiment = "negative";
  } else if (positiveScore > negativeScore) {
    analysis.sentiment = "positive";
  } else {
    analysis.sentiment = "neutral";
  }
  
  return analysis;
}

function generateReport(analysis, results) {
  console.log("📝 生成伊朗战况报告...");
  
  const report = {
    timestamp: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
    analysis: analysis,
    keyTopics: analysis.topics.slice(0, 5),
    recommendations: [],
    summary: ""
  };
  
  // 生成建议
  if (analysis.militaryCount > analysis.diplomaticCount) {
    report.recommendations.push("警惕军事冲突升级，监控边境动态");
    report.recommendations.push("关注军事部署和武器装备信息");
  }
  
  if (analysis.diplomaticCount > analysis.militaryCount) {
    report.recommendations.push("关注外交谈判进展");
    report.recommendations.push("留意国际组织的调解努力");
  }
  
  if (analysis.economicCount > 0) {
    report.recommendations.push("监控伊朗石油出口和经济状况");
    report.recommendations.push("关注国际制裁的影响");
  }
  
  if (analysis.casualtyCount > 0) {
    report.recommendations.push("关注人道主义状况");
    report.recommendations.push("监控医疗和救援需求");
  }
  
  // 生成摘要
  report.summary = `伊朗战况分析（${report.timestamp})\n`;
  report.summary += `发现 ${analysis.totalResults} 条相关新闻\n`;
  
  if (analysis.sentiment === "negative") {
    report.summary += "总体趋势：局势紧张，冲突风险较高";
  } else if (analysis.sentiment === "positive") {
    report.summary += "总体趋势：外交努力积极，局势有望缓和";
  } else {
    report.summary += "总体趋势：局势复杂，多因素交织";
  }
  
  report.summary += `\n主要关注领域：\n`;
  report.summary += `军事动向: ${analysis.militaryCount} 条相关报道\n`;
  report.summary += `外交动向: ${analysis.diplomaticCount} 条相关报道\n`;
  report.summary += `经济影响: ${analysis.economicCount} 条相关报道\n`;
  report.summary += `伤亡情况: ${analysis.casualtyCount} 条相关报道\n`;
  
  return report;
}

async function runSearchAndAnalysis() {
  try {
    console.log("📡 伊朗战况监控启动...");
    
    // 搜索伊朗新闻
    const searchResults = await searchIranNews();
    
    // 分析搜索结果
    const analysis = analyzeIranNews(searchResults);
    
    // 生成报告
    const report = generateReport(analysis, searchResults);
    
    console.log("\n=== 伊朗战况监控报告 ===");
    console.log(`监控时间: ${report.timestamp}`);
    console.log(`搜索结果: ${analysis.totalResults} 条`);
    console.log(`情感分析: ${analysis.sentiment}`);
    
    console.log(`\n📈 趋势统计:`);
    console.log(`军事相关: ${analysis.militaryCount} 条`);
    console.log(`外交相关: ${analysis.diplomaticCount} 条`);
    console.log(`经济相关: ${analysis.economicCount} 条`);
    console.log(`伤亡相关: ${analysis.casualtyCount} 条`);
    console.log(`国际介入: ${analysis.internationalCount} 条`);
    
    console.log(`\n📋 报告摘要: ${report.summary}`);
    
    console.log(`\n💡 建议措施:`);
    report.recommendations.forEach((rec, i) => {
      console.log(`${i+1}. ${rec}`);
    });
    
    console.log(`\n📰 重要主题:`);
    report.keyTopics.forEach((topic, i) => {
      console.log(`${i+1}. ${topic}`);
    });
    
    // 保存报告
    const reportFile = `/root/.openclaw/workspace/iran_search_report_${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;
    const reportText = `
伊朗战况搜索分析报告
=====================
监控时间: ${report.timestamp}

搜索统计:
搜索结果: ${analysis.totalResults} 条
情感倾向: ${analysis.sentiment}

趋势统计:
军事相关: ${analysis.militaryCount} 条
外交相关: ${analysis.diplomaticCount} 条
经济相关: ${analysis.economicCount} 条
伤亡相关: ${analysis.casualtyCount} 条
国际介入: ${analysis.internationalCount} 条

报告摘要:
${report.summary}

建议措施:
${report.recommendations.map(rec => `• ${rec}`).join('\n')}

重要主题:
${report.keyTopics.map(topic => `• ${topic}`).join('\n')}
`;
    
    require('fs').writeFileSync(reportFile, reportText);
    console.log(`\n📄 报告已保存至: ${reportFile}`);
    
  } catch (error) {
    console.error(`❌ 监控任务失败: ${error.message}`);
  }
}

// 执行搜索和分析
runSearchAndAnalysis();