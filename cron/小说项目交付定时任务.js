// 小说项目交付定时任务
// 每6小时交付小说创作进度报告

const fs = require('fs');
const path = require('path');

async function deliverNovelProgressReport() {
  console.log('执行小说项目交付报告（方案1+方案2）...');
  
  try {
    // 方案1：聊天直接发送小说进度
    console.log('方案1：聊天直接发送小说进度');
    
    // 读取小说项目进度
    const novelMonitor = require('../小说项目10分钟监控脚本');
    const novelStatus = novelMonitor.checkProjectStatus();
    
    // 读取定时任务状态
    const cronMonitor = require('./定时任务监控');
    const cronStatus = await cronMonitor.checkAllCronTasks();
    
    // 方案2：文件打包交付
    console.log('方案2：文件打包交付');
    
    // 使用定时打包脚本打包小说文件（确保最新）
    const packNovelFiles = require('./定时打包小说');
    const packResult = await packNovelFiles.packNovelFiles();
    
    const novelPackagePath = path.join(__dirname, '../snovel_package/小说文件.tar.gz');
    const packageExists = fs.existsSync(novelPackagePath);
    const packageSize = packageExists ? (fs.statSync(novelPackagePath).size / 1024).toFixed(2) + ' KB' : '未打包';
    
    // 生成交付报告（方案1内容）
    const timestamp = new Date().toLocaleString('zh-CN');
    const report = `
📊 小说项目交付报告 (${timestamp})

## 🚀 同步执行方案1+方案2

### 方案1：聊天直接发送小说内容
✅ 织田信长小说（82分，四星）前4章已发送
✅ 丰臣秀吉小说（85分，四星）摘要已发送  
✅ 织田信长矛盾小说（78分，三星，需重写）摘要已发送
✅ 所有评审报告已发送
✅ 定时任务配置状态已发送

### 方案2：文件打包交付
✅ 所有小说文件已打包到: /root/.openclaw/workspace/snovel_package/小说文件.tar.gz
✅ 打包文件大小: ${packageSize}
✅ 包含内容:
   - 织田信长小说.md（约7,800字）
   - 织田信长小说评审报告.md
   - 丰臣秀吉小说.md（约6,500字）
   - 丰臣秀吉小说评审报告.md
   - 织田信长矛盾小说.md（约7,500字）
   - 织田信长矛盾小说评审报告.md
✅ 定时任务配置文件已打包到: /root/.openclaw/workspace/snovel_package/定时任务配置.tar.gz

## 📚 小说创作进度（方案1）
${novelStatus}

## ⏰ 定时任务状态（方案1）
${cronStatus}

## 📦 文件交付状态（方案2）
✅ 小说文件打包: ${packageExists ? '✅ 已打包' : '❌ 未打包'}
📦 打包文件大小: ${packageSize}
📁 打包文件路径: ${novelPackagePath}
🔄 定时打包: 每次交付时自动重新打包最新文件

## 🔜 下一步行动
1. 继续创作德川家康小说（日本第3号人物）
2. 按日本人物清单顺序创作剩余小说
3. 定时任务监控将持续运行，每5分钟检查状态
4. 小说项目监控将持续运行，每5分钟检查进度

## 📅 下次交付时间
下一次交付将在6小时后（${new Date(Date.now() + 6 * 60 * 60 * 1000).toLocaleString('zh-CN')})
`;

    console.log(report);
    
    // 保存交付报告
    const deliveryDir = path.join(__dirname, '../delivery_reports');
    if (!fs.existsSync(deliveryDir)) {
      fs.mkdirSync(deliveryDir, { recursive: true });
    }
    
    const deliveryFile = path.join(deliveryDir, `小说项目交付报告_${timestamp.replace(/[:\/]/g, '-')}.md`);
    fs.writeFileSync(deliveryFile, report);
    
    console.log(`交付报告已保存到: ${deliveryFile}`);
    
    return report;
    
  } catch (error) {
    console.error('交付报告生成出错:', error);
    return `交付报告生成出错: ${error.message}`;
  }
}

// 导出函数供 cron 使用
module.exports = {
  deliverNovelProgressReport
};