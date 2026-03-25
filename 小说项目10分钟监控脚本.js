// 小说项目10分钟监控脚本
// 自动监控小说创作团队的进度和状态

const fs = require('fs');
const path = require('path');

// 检查文件夹是否存在，如果不存在就创建
const projectDir = path.join(__dirname, '全球人物小说项目');
if (!fs.existsSync(projectDir)) {
  fs.mkdirSync(projectDir, { recursive: true });
}

const countryFolders = ['日本', '英国', '法国', '俄罗斯', '印度', '美国'];

function checkProjectStatus() {
  console.log('开始检查小说项目进度...');
  
  // 检查日本项目文件夹
  const japanDir = path.join(__dirname, '日本');
  if (!fs.existsSync(japanDir)) {
    console.log('日本项目文件夹不存在，需要创建');
    return '日本项目文件夹缺失';
  }
  
  // 检查各个子文件夹
  const subFolders = ['人物档案', '小说稿', '评审报告', '归档'];
  const japanStatus = {};
  for (const folder of subFolders) {
    const folderPath = path.join(japanDir, folder);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.md'));
      japanStatus[folder] = files.length;
    } else {
      japanStatus[folder] = 0;
    }
  }
  
  console.log('日本项目状态：');
  console.log('- 人物档案：' + japanStatus['人物档案'] + ' 个');
  console.log('- 小说稿：' + japanStatus['小说稿'] + ' 个');
  console.log('- 评审报告：' + japanStatus['评审报告'] + ' 个');
  console.log('- 归档：' + japanStatus['归档'] + ' 个');
  
  // 读取TODO清单
  const todoPath = path.join(__dirname, '全球人物小说项目TODO清单_详细版.md');
  if (fs.existsSync(todoPath)) {
    const todoContent = fs.readFileSync(todoPath, 'utf8');
    console.log('TODO清单已加载，包含6个国家，每个国家50个人物');
  } else {
    console.log('TODO清单不存在，需要重新创建');
  }
  
  // 检查矛盾小说评审标准
  const standardsPath = path.join(__dirname, '矛盾小说评审标准.md');
  if (fs.existsSync(standardsPath)) {
    console.log('矛盾小说评审标准已存在');
  } else {
    console.log('矛盾小说评审标准缺失，需要创建');
  }
  
  // 检查织田信长小说的完成情况
  const nobunagaNovelPath = path.join(__dirname, '织田信长小说.md');
  const nobunagaReviewPath = path.join(__dirname, '织田信长小说评审报告.md');
  
  let nobunagaStatus = '未知';
  if (fs.existsSync(nobunagaNovelPath) && fs.existsSync(nobunagaReviewPath)) {
    console.log('织田信长小说已创作并评审');
    nobunagaStatus = '已完成';
  } else if (fs.existsSync(nobunagaNovelPath)) {
    console.log('织田信长小说已创作，但未评审');
    nobunagaStatus = '创作完成待评审';
  } else {
    console.log('织田信长小说未完成');
    nobunagaStatus = '未完成';
  }
  
  // 检查丰臣秀吉小说的完成情况
  const hideyoshiNovelPath = path.join(__dirname, '丰臣秀吉小说.md');
  const hideyoshiReviewPath = path.join(__dirname, '丰臣秀吉小说评审报告.md');
  
  let hideyoshiStatus = '未知';
  if (fs.existsSync(hideyoshiNovelPath) && fs.existsSync(hideyoshiReviewPath)) {
    console.log('丰臣秀吉小说已创作并评审');
    hideyoshiStatus = '已完成';
  } else if (fs.existsSync(hideyoshiNovelPath)) {
    console.log('丰臣秀吉小说已创作，但未评审');
    hideyoshiStatus = '创作完成待评审';
  } else {
    console.log('丰臣秀吉小说未完成');
    hideyoshiStatus = '未完成';
  }
  
  // 检查织田信长矛盾小说的完成情况
  const nobunagaConflictNovelPath = path.join(__dirname, '织田信长矛盾小说.md');
  const nobunagaConflictReviewPath = path.join(__dirname, '织田信长矛盾小说评审报告.md');
  
  let nobunagaConflictStatus = '未知';
  if (fs.existsSync(nobunagaConflictNovelPath) && fs.existsSync(nobunagaConflictReviewPath)) {
    console.log('织田信长矛盾小说已创作并评审');
    nobunagaConflictStatus = '已完成';
  } else if (fs.existsSync(nobunagaConflictNovelPath)) {
    console.log('织田信长矛盾小说已创作，但未评审');
    nobunagaConflictStatus = '创作完成待评审';
  } else {
    console.log('织田信长矛盾小说未完成');
    nobunagaConflictStatus = '未完成';
  }
  
  // 总结报告
  const summary = {
    日本项目文件夹: fs.existsSync(japanDir) ? '✅ 存在' : '❌ 缺失',
    人物档案数量: japanStatus['人物档案'],
    小说稿数量: japanStatus['小说稿'],
    评审报告数量: japanStatus['评审报告'],
    归档数量: japanStatus['归档'],
    TODO清单: fs.existsSync(todoPath) ? '✅ 存在' : '❌ 缺失',
    矛盾小说评审标准: fs.existsSync(standardsPath) ? '✅ 存在' : '❌ 缺失',
    织田信长小说: nobunagaStatus,
    丰臣秀吉小说: hideyoshiStatus,
    织田信长矛盾小说: nobunagaConflictStatus,
    日本人物清单文件: fs.existsSync(path.join(__dirname, '日本人物清单.md')) ? '✅ 存在' : '❌ 缺失',
    英国人物清单文件: fs.existsSync(path.join(__dirname, '英国人物清单.md')) ? '✅ 存在' : '❌ 缺失',
    法国人物清单文件: fs.existsSync(path.join(__dirname, '法国人物清单.md')) ? '✅ 存在' : '❌ 缺失',
    俄罗斯人物清单文件: fs.existsSync(path.join(__dirname, '俄罗斯人物清单.md')) ? '✅ 存在' : '❌ 缺失',
    印度人物清单文件: fs.existsSync(path.join(__dirname, '印度人物清单.md')) ? '✅ 存在' : '❌ 缺失',
    美国人物清单文件: fs.existsSync(path.join(__dirname, '美国人物清单.md')) ? '✅ 存在' : '❌ 缺失',
  };
  
  console.log('\n=== 项目进度总结 ===');
  for (const [key, value] of Object.entries(summary)) {
    console.log(`${key}: ${value}`);
  }
  
  // 保存监控报告
  const timestamp = new Date().toISOString().replace(/:/g, '-').slice(0, 19);
  const reportPath = path.join(__dirname, `小说项目监控报告_${timestamp}.txt`);
  
  const reportContent = `小说项目10分钟监控报告
时间: ${new Date().toString()}

项目状态：
1. 日本项目文件夹: ${summary['日本项目文件夹']}
2. 人物档案数量: ${summary['人物档案数量']}
3. 小说稿数量: ${summary['小说稿数量']}
4. 评审报告数量: ${summary['评审报告数量']}
5. 归档数量: ${summary['归档数量']}
6. TODO清单: ${summary['TODO清单']}
7. 矛盾小说评审标准: ${summary['矛盾小说评审标准']}
8. 织田信长小说: ${summary['织田信长小说']}
9. 丰臣秀吉小说: ${summary['丰臣秀吉小说']}
10. 织田信长矛盾小说: ${summary['织田信长矛盾小说']}
11. 日本人物清单文件: ${summary['日本人物清单文件']}
12. 英国人物清单文件: ${summary['英国人物清单文件']}
13. 法国人物清单文件: ${summary['法国人物清单文件']}
14. 俄罗斯人物清单文件: ${summary['俄罗斯人物清单文件']}
15. 印度人物清单文件: ${summary['印度人物清单文件']}
16. 美国人物清单文件: ${summary['美国人物清单文件']}

问题检测：
1. 日本项目缺少人物档案或小说稿吗？
2. 矛盾小说评审标准是否完善？
3. TODO清单是否完整？
4. 其他国家的项目文件夹是否存在？

下一步行动建议：
${getNextActions(summary)}
`;

  fs.writeFileSync(reportPath, reportContent);
  console.log(`监控报告已保存到: ${reportPath}`);
  
  // 生成可发送的消息
  const messageContent = `📊 小说项目10分钟进度监控报告

项目状态：
• 日本项目文件夹: ${summary['日本项目文件夹']}
• 人物档案数量: ${summary['人物档案数量']}个
• 小说稿数量: ${summary['小说稿数量']}个
• 评审报告数量: ${summary['评审报告数量']}个
• TODO清单: ${summary['TODO清单']}
• 矛盾小说评审标准: ${summary['矛盾小说评审标准']}
• 织田信长小说: ${summary['织田信长小说']}
• 丰臣秀吉小说: ${summary['丰臣秀吉小说']}
• 织田信长矛盾小说: ${summary['织田信长矛盾小说']}

当前任务：日本人物小说创作（共50篇）
下一步行动：${getNextActionsSimple(summary)}

下一次检查：10分钟后`;

  console.log('\n=== 可发送的消息 ===');
  console.log(messageContent);
  
  return messageContent;
}

function getNextActions(summary) {
  let actions = '';
  
  if (summary['日本项目文件夹'] === '✅ 存在') {
    actions += '✅ 日本项目文件夹已创建\n';
  } else {
    actions += '❌ 需要创建日本项目文件夹\n';
  }
  
  if (summary['人物档案数量'] < 5) {
    actions += '❌ 需要创建更多人物档案\n';
  }
  
  if (summary['小说稿数量'] < 2) {
    actions += '❌ 需要创作更多小说稿\n';
  }
  
  if (summary['评审报告数量'] < 2) {
    actions += '❌ 需要进行更多评审\n';
  }
  
  if (summary['TODO清单'] === '✅ 存在') {
    actions += '✅ TODO清单已完成\n';
  } else {
    actions += '❌ 需要创建TODO清单\n';
  }
  
  if (summary['矛盾小说评审标准'] === '✅ 存在') {
    actions += '✅ 矛盾小说评审标准已建立\n';
  } else {
    actions += '❌ 需要建立矛盾小说评审标准\n';
  }
  
  if (summary['织田信长小说'] === '已完成') {
    actions += '✅ 织田信长小说已完成\n';
  } else {
    actions += '❌ 织田信长小说未完成\n';
  }
  
  if (summary['丰臣秀吉小说'] === '已完成') {
    actions += '✅ 丰臣秀吉小说已完成\n';
  } else {
    actions += '❌ 丰臣秀吉小说未完成\n';
  }
  
  if (summary['织田信长矛盾小说'] === '已完成') {
    actions += '✅ 织田信长矛盾小说已完成\n';
  } else {
    actions += '❌ 织田信长矛盾小说未完成\n';
  }
  
  return actions;
}

function getNextActionsSimple(summary) {
  if (summary['织田信长小说'] !== '已完成') {
    return '继续创作织田信长小说';
  }
  if (summary['丰臣秀吉小说'] !== '已完成') {
    return '继续创作丰臣秀吉小说';
  }
  if (summary['织田信长矛盾小说'] !== '已完成') {
    return '继续创作织田信长矛盾小说';
  }
  if (summary['人物档案数量'] < 50) {
    return '继续创作日本人物档案';
  }
  return '启动英国项目文件夹并创作人物档案';
}

// 执行监控
const report = checkProjectStatus();
console.log('\n监控完成。脚本将每10分钟自动运行一次。');

// 导出函数供定时任务使用
module.exports = {
  checkProjectStatus,
  getNextActions,
  getNextActionsSimple
};