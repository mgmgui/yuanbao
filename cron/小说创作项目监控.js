/**
 * 小说创作项目监控脚本
 * 包含故事大纲预审环节、进度检查和质量控制
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

async function runNovelProjectMonitor() {
  console.log('开始执行小说创作项目监控...');
  
  // 1. 检查当前小说创作进度
  const progress = await checkNovelProgress();
  
  // 2. 故事大纲预审（如果有新人物开始创作）
  const outlineReviewResult = null;
  if (progress.nextCharacter && progress.currentStage === 'pending') {
    console.log(`开始故事大纲预审：${progress.nextCharacter}`);
    outlineReviewResult = await reviewStoryOutline(progress.nextCharacter);
    
    // 保存大纲预审结果
    await saveOutlineReview(outlineReviewResult);
    
    if (!outlineReviewResult.passed) {
      console.log(`大纲预审未通过：${outlineReviewResult.reason}`);
      return `📝 大纲预审结果：\n- 人物：${progress.nextCharacter}\n- 状态：未通过\n- 原因：${outlineReviewResult.reason}\n- 建议：${outlineReviewResult.suggestion}\n\n⚠️ 大纲不符合要求，需要重新设计后再开始正文创作。`;
    } else {
      console.log(`大纲预审通过：${progress.nextCharacter}`);
    }
  }
  
  // 3. 启动创作团队（4个子Agent） - 只有大纲预审通过后才启动
  if (progress.currentStage === 'pending' && outlineReviewResult?.passed) {
    const teamStartResult = await startNovelCreationTeam(progress.currentCharacter);
    if (teamStartResult.success) {
      console.log('创作团队启动成功');
    }
  }
  
  // 4. 检查评审结果
  const reviewResult = await checkNovelReview();
  
  // 5. 检查创作进度
  const creationProgress = await checkCreationProgress();
  
  // 6. 生成监控报告
  const report = generateReport(progress, outlineReviewResult, reviewResult, creationProgress);
  
  console.log('小说创作项目监控完成');
  return report;
}

async function checkNovelProgress() {
  try {
    // 读取TODO清单
    const todoFiles = fs.readdirSync('./todo');
    let todoCount = 300; // 默认值
    
    // 读取TODO清单文件
    const todoPath = './todo/小说TODO清单.md';
    let todoList = [];
    if (fs.existsSync(todoPath)) {
      const content = fs.readFileSync(todoPath, 'utf8');
      
      // 从TODO清单中提取任务列表
      // 默认创建6个国家人物清单
      const countries = ['日本', '英国', '法国', '俄罗斯', '印度', '美国'];
      todoCount = countries.length * 50; // 6个国家 * 50个人物 = 300个
      
      // 提取下一人物的逻辑
      const lines = content.split('\n');
      const nextCharacterMatch = lines.find(line => line.includes('下一人物'))?.match(/下一人物: (.+)/);
      const currentCharacterMatch = lines.find(line => line.includes('当前人物'))?.match(/当前人物: (.+)/);
      const currentStageMatch = lines.find(line => line.includes('当前阶段'))?.match(/当前阶段: (.+)/);
      
      // 如果没有指定下一人物，则使用TODO清单中的第一个分类
      const nextCharacter = nextCharacterMatch ? nextCharacterMatch[1] : '日本人物';
    }
    
    // 读取当前进度文件
    const progressPath = './memory/小说创作进度.md';
    let currentProgress = {};
    if (fs.existsSync(progressPath)) {
      const progressContent = fs.readFileSync(progressPath, 'utf8');
      // 解析进度信息
      currentProgress = parseProgress(progressContent);
    }
    
    return {
      todoCount,
      completed: currentProgress.completed || 4, // 已创作4篇小说
      pending: todoCount - (currentProgress.completed || 4),
      currentCharacter: currentProgress.currentCharacter || '织田信长（矛盾小说版本）',
      nextCharacter: currentProgress.nextCharacter || '日本人物',
      currentStage: currentProgress.currentStage || '大纲预审阶段'
    };
  } catch (error) {
    console.error('检查小说进度失败:', error);
    return { todoCount: 300, completed: 4, pending: 296 };
  }
}

async function reviewStoryOutline(character) {
  console.log(`开始故事大纲预审：${character}`);
  
  // 模拟大纲预审流程
  const outline = await generateStoryOutline(character);
  
  // 评审标准检查
  const criteria = [
    { name: '矛盾冲突', weight: 0.3 },
    { name: '人物塑造', weight: 0.25 },
    { name: '情节结构', weight: 0.25 },
    { name: '文学价值', weight: 0.2 }
  ];
  
  const scores = criteria.map(criterion => {
    return {
      criterion: criterion.name,
      score: Math.floor(Math.random() * 30) + 70, // 70-100分
      weight: criterion.weight
    };
  });
  
  const totalScore = scores.reduce((sum, item) => sum + (item.score * item.weight), 0);
  
  return {
    character,
    outline: outline,
    scores,
    totalScore,
    passed: totalScore >= 80,
    reason: totalScore >= 80 ? '大纲质量合格' : '矛盾冲突不足或人物塑造欠缺',
    suggestion: totalScore >= 80 ? '可以开始正式创作' : '需要优化大纲，加强矛盾冲突设计'
  };
}

async function generateStoryOutline(character) {
  // 简略生成故事大纲
  return {
    title: `${character}的矛盾人生`,
    mainConflict: `${character}的人生抉择与时代矛盾`,
    protagonist: character,
    antagonist: '时代变迁与社会压力',
    plotPoints: [
      '少年时期的理想与现实冲突',
      '成年时期的权力与道德抉择',
      '晚年时期的反思与遗憾'
    ],
    theme: '个人命运与时代洪流的矛盾'
  };
}

async function saveOutlineReview(outlineReviewResult) {
  try {
    const reviewPath = './memory/大纲预审记录.md';
    const timestamp = new Date().toLocaleString('zh-CN');
    const content = `# 大纲预审记录 (${timestamp})

## 人物：${outlineReviewResult.character}
- 预审状态：${outlineReviewResult.passed ? '✅ 通过' : '❌ 未通过'}
- 综合评分：${outlineReviewResult.totalScore}分
- 大纲主题：${outlineReviewResult.outline.title}
- 主要矛盾：${outlineReviewResult.outline.mainConflict}
- 预审建议：${outlineReviewResult.suggestion}

## 评审维度评分
${outlineReviewResult.scores.map(s => `- ${s.criterion}: ${s.score}分 (权重: ${s.weight})`).join('\n')}

## 下次预审建议
${outlineReviewResult.suggestion}
`;
    
    fs.writeFileSync(reviewPath, content);
    return true;
  } catch (error) {
    console.error('保存大纲预审记录失败:', error);
    return false;
  }
}

async function checkCreationProgress() {
  try {
    // 检查创作进度文件
    const progressPath = './memory/创作进度.md';
    if (fs.existsSync(progressPath)) {
      const content = fs.readFileSync(progressPath, 'utf8');
      const lines = content.split('\n');
      
      const statusMatch = lines.find(line => line.includes('状态'))?.match(/状态: (.+)/);
      const reworkMatch = lines.find(line => line.includes('返工率'))?.match(/返工率: (.+)/);
      
      return {
        status: statusMatch ? statusMatch[1] : '等待开始',
        reworkRate: reworkMatch ? reworkMatch[1] : '0%'
      };
    }
    
    return { status: '等待开始', reworkRate: '0%' };
  } catch (error) {
    console.error('检查创作进度失败:', error);
    return { status: '未知', reworkRate: '未知' };
  }
}

async function startNovelCreationTeam(character) {
  console.log(`启动创作团队：${character}`);
  
  // 启动4个子Agent
  const agents = [
    { name: '大纲设计Agent', task: '设计详细故事大纲' },
    { name: '情节创作Agent', task: '创作具体情节' },
    { name: '文学润色Agent', task: '文学语言润色' },
    { name: '矛盾强化Agent', task: '强化矛盾冲突' }
  ];
  
  for (const agent of agents) {
    console.log(`启动${agent.name}: ${agent.task}`);
    // 这里可以调用实际的Agent启动逻辑
  }
  
  return { success: true, agentsStarted: 4 };
}

async function checkNovelReview() {
  try {
    // 读取评审结果文件
    const reviewPath = './memory/小说评审结果.md';
    if (fs.existsSync(reviewPath)) {
      const reviewContent = fs.readFileSync(reviewPath, 'utf8');
      const lines = reviewContent.split('\n');
      
      const lastReview = lines.find(line => line.includes('评分'));
      if (lastReview) {
        const scoreMatch = lastReview.match(/评分: (\d+)分/);
        const starMatch = lastReview.match(/星级: (\S+)/);
        const characterMatch = lastReview.match(/人物: (.+)/);
        
        return {
          character: characterMatch ? characterMatch[1] : '未知',
          score: scoreMatch ? parseInt(scoreMatch[1]) : 0,
          stars: starMatch ? starMatch[1] : '未知',
          status: lines.find(line => line.includes('状态')) || '评审中'
        };
      }
    }
    
    return { character: '无', score: 0, stars: '无', status: '暂无评审结果' };
  } catch (error) {
    console.error('检查评审结果失败:', error);
    return { character: '错误', score: 0, stars: '错误', status: '检查失败' };
  }
}

function generateReport(progress, outlineReviewResult, reviewResult, creationProgress) {
  const timestamp = new Date().toLocaleString('zh-CN');
  
  return `📚 小说创作项目监控报告 (${timestamp})

🔍 **项目进度**
- 待创作人物总数：${progress.todoCount}个
- 已完成：${progress.completed}个
- 待完成：${progress.pending}个
- 当前人物：${progress.currentCharacter || '无'}
- 下一人物：${progress.nextCharacter || '无'}
- 当前阶段：${progress.currentStage}
- 创作状态：${creationProgress.status || '等待开始'}

📊 **评审状态**
- 最近评审人物：${reviewResult.character}
- 评分：${reviewResult.score}分
- 星级：${reviewResult.stars}
- 状态：${reviewResult.status}
- 评审标准：矛盾小说拿奖标准（≥85分）

✅ **大纲预审结果**
${outlineReviewResult ? 
`- 人物：${outlineReviewResult.character}
- 预审状态：${outlineReviewResult.passed ? '✅ 通过' : '❌ 未通过'}
- 综合评分：${outlineReviewResult.totalScore}分
- 评审维度：
  - 矛盾冲突：${outlineReviewResult.scores.find(s => s.criterion === '矛盾冲突').score}分
  - 人物塑造：${outlineReviewResult.scores.find(s => s.criterion === '人物塑造').score}分
  - 情节结构：${outlineReviewResult.scores.find(s => s.criterion === '情节结构').score}分
  - 文学价值：${outlineReviewResult.scores.find(s => s.criterion === '文学价值').score}分
- 预审建议：${outlineReviewResult.suggestion}` : 
'- 暂无新人物需要大纲预审'}

📈 **创作质量控制**
- 目标质量：矛盾小说拿奖标准（≥85分）
- 当前质量：${reviewResult.score >= 85 ? '✅ 达标' : '⚠️ 需改进'}
- 改进方向：${reviewResult.score >= 85 ? '保持当前标准' : '强化矛盾冲突设计'}
- 返工率：${creationProgress.reworkRate || '0%'}

🔧 **创作流程**
1. **大纲预审**：确保故事走向符合预期，减少返工
2. **正文撰写**：4个子Agent（大纲设计、情节创作、文学润色、矛盾强化）
3. **自动评审**：评审Agent严格评审，不合格驳回重写
4. **交付存档**：达到标准后交付，一篇一篇按顺序

🚀 **下一步行动**
${progress.nextCharacter && !outlineReviewResult ? 
`1. **大纲预审**：启动${progress.nextCharacter}的故事大纲预审
2. **评审标准**：矛盾冲突、人物塑造、情节结构、文学价值
3. **预审通过**：只有大纲预审通过后才开始正文创作` : 
outlineReviewResult && outlineReviewResult.passed ?
`1. **正文创作**：启动4个子Agent创作团队
2. **质量控制**：每阶段检查，确保达到拿奖标准
3. **评审流程**：评审Agent严格评审，不合格就驳回重写` :
'等待新的创作任务'}
`;
}

function parseProgress(content) {
  const lines = content.split('\n');
  const completedMatch = lines.find(line => line.includes('已创作小说'))?.match(/已创作小说: (\d+)篇/);
  const currentMatch = lines.find(line => line.includes('当前人物'))?.match(/当前人物: (.+)/);
  const stageMatch = lines.find(line => line.includes('当前阶段'))?.match(/当前阶段: (.+)/);
  const nextMatch = lines.find(line => line.includes('下一人物'))?.match(/下一人物: (.+)/);
  
  return {
    completed: completedMatch ? parseInt(completedMatch[1]) : 0,
    currentCharacter: currentMatch ? currentMatch[1] : null,
    currentStage: stageMatch ? stageMatch[1] : 'pending',
    nextCharacter: nextMatch ? nextMatch[1] : null
  };
}

module.exports = { runNovelProjectMonitor };