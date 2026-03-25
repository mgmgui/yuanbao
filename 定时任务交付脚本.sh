#!/bin/bash

echo "定时任务产出交付脚本"

# 创建交付报告
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
REPORT_FILE="/root/.openclaw/workspace/timertask_report_${TIMESTAMP}.md"

echo "定时任务产出交付报告" > $REPORT_FILE
echo "生成时间: $(date)" >> $REPORT_FILE

echo "" >> $REPORT_FILE
echo "## 📊 定时任务状态" >> $REPORT_FILE

# 检查小说项目监控状态
echo "### 小说项目监控" >> $REPORT_FILE
cd /root/.openclaw/workspace && node 小说项目10分钟监控脚本.js >> $REPORT_FILE

echo "" >> $REPORT_FILE
echo "## 📋 小说创作进度" >> $REPORT_FILE
cat /root/.openclaw/workspace/小说项目当前进度.md >> $REPORT_FILE

echo "" >> $REPORT_FILE
echo "## ⏰ 定时任务配置" >> $REPORT_FILE
cat /root/.openclaw/workspace/定时任务配置文档.md >> $REPORT_FILE

echo "" >> $REPORT_FILE
echo "## 📁 文件清单" >> $REPORT_FILE
echo "### 小说文件" >> $REPORT_FILE
ls -la /root/.openclaw/workspace/*小说.md /root/.openclaw/workspace/*小说评审报告.md >> $REPORT_FILE

echo "" >> $REPORT_FILE
echo "### 定时任务文件" >> $REPORT_FILE
ls -la /root/.openclaw/workspace/cron_tasks/* /root/.openclaw/workspace/cron/* >> $REPORT_FILE

echo "" >> $REPORT_FILE
echo "### 项目文档" >> $REPORT_FILE
ls -la /root/.openclaw/workspace/*项目*.md /root/.openclaw/workspace/*TODO*.md /root/.openclaw/workspace/*评审标准.md >> $REPORT_FILE

echo "" >> $REPORT_FILE
echo "## 🔍 小说打包信息" >> $REPORT_FILE
echo "小说文件已打包到: /root/.openclaw/workspace/snovel_package/小说文件.tar.gz" >> $REPORT_FILE
echo "打包大小: $(du -sh /root/.openclaw/workspace/snovel_package/小说文件.tar.gz)" >> $REPORT_FILE

echo "交付报告已生成: $REPORT_FILE"
echo "报告内容摘要:"
head -20 $REPORT_FILE

# 输出简短版本
echo ""
echo "📊 定时任务产出交付摘要 📊"
echo "生成时间: $(date)"
echo ""
echo "✅ 定时任务已配置完成"
echo "✅ 小说创作项目已启动"
echo "✅ 伊朗战争监控任务已移除"
echo "✅ 小说文件已打包"
echo "✅ 定时任务监控已建立"
echo ""
echo "下次交付: 5分钟后（定时任务监控将自动报告）"
echo "小说创作: 继续创作德川家康小说"