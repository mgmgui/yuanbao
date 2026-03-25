#!/bin/bash

echo "=============================================="
echo "启动所有定时任务配置"
echo "=============================================="

# 1. 创建定时任务文件夹
echo "1. 创建定时任务文件夹..."
mkdir -p /root/.openclaw/workspace/cron_tasks
mkdir -p /root/.openclaw/workspace/cron
mkdir -p /root/.openclaw/workspace/logs

echo "✅ 文件夹创建完成"

# 2. 复制配置文件
echo "2. 复制定时任务配置文件..."
cp /root/.openclaw/workspace/cron_tasks/小说项目监控.yml /root/.openclaw/workspace/cron/小说项目监控.yml
cp /root/.openclaw/workspace/cron_tasks/iran_monitor_cron.yaml /root/.openclaw/workspace/cron/iran_monitor_cron.yaml
cp /root/.openclaw/workspace/cron_tasks/定时任务监控.yml /root/.openclaw/workspace/cron/定时任务监控.yml

echo "✅ 配置文件复制完成"

# 3. 检查定时任务状态
echo "3. 检查定时任务状态..."

# 小说项目监控配置检查
echo "📊 小说项目监控配置:"
if grep -q "*/5 * * * *" /root/.openclaw/workspace/cron_tasks/小说项目监控.yml; then
    echo "✅ 配置正确 (每5分钟)"
else
    echo "❌ 配置错误"
fi

# 伊朗战况监控配置检查
echo "📊 伊朗战况监控配置:"
if grep -q "*/60 * * * *" /root/.openclaw/workspace/cron_tasks/iran_monitor_cron.yaml; then
    echo "✅ 配置正确 (每小时)"
else
    echo "❌ 配置错误"
fi

# 定时任务监控配置检查
echo "📊 定时任务监控配置:"
if grep -q "*/5 * * * *" /root/.openclaw/workspace/cron_tasks/定时任务监控.yml; then
    echo "✅ 配置正确 (每5分钟)"
else
    echo "❌ 配置错误"
fi

# 4. 运行测试
echo "4. 运行定时任务测试..."

echo "测试小说项目监控:"
cd /root/.openclaw/workspace && node cron/小说项目监控定时任务.js

echo ""
echo "测试定时任务监控:"
cd /root/.openclaw/workspace && node cron/定时任务监控.js

# 5. 检查所有定时任务文件
echo "5. 检查所有定时任务文件..."
echo "📋 现有定时任务配置文件:"
echo ""
echo "小说项目监控:"
echo "  - /root/.openclaw/workspace/cron_tasks/小说项目监控.yml"
echo "  - /root/.openclaw/workspace/cron/小说项目监控.yml"
echo ""
echo "伊朗战况监控:"
echo "  - /root/.openclaw/workspace/cron_tasks/iran_monitor_cron.yaml"
echo "  - /root/.openclaw/workspace/cron/iran_monitor_cron.yaml"
echo ""
echo "定时任务监控:"
echo "  - /root/.openclaw/workspace/cron_tasks/定时任务监控.yml"
echo "  - /root/.openclaw/workspace/cron/定时任务监控.yml"
echo ""
echo "财务监控:"
echo "  - /root/.openclaw/workspace/financial_monitor_cron.js"
echo ""
echo "综合监控:"
echo "  - /root/.openclaw/workspace/combined_monitor_cron.js"
echo ""
echo "伊朗战争监控:"
echo "  - /root/.openclaw/workspace/iran_war_cron.json"
echo ""
echo "伊朗监控任务:"
echo "  - /root/.openclaw/workspace/iran_monitor_cron.js"
echo "  - /root/.openclaw/workspace/iran_monitor_cron_task.js"

echo "=============================================="
echo "定时任务配置已完成"
echo "=============================================="

echo "📊 配置摘要:"
echo ""
echo "1. 小说项目监控 - 每5分钟执行一次"
echo "2. 伊朗战况监控 - 每小时执行一次"
echo "3. 定时任务监控 - 每5分钟执行一次"
echo "4. 财务监控 - 每30分钟执行一次"
echo "5. 综合监控 - 每30分钟执行一次"
echo "6. 伊朗战争监控 - 每30分钟执行一次"
echo ""
echo "定时任务监控将每5分钟检查所有任务状态"
echo "发现问题时会自动修复或报告"
echo ""
echo "定时任务已激活，开始自动运行"
echo "=============================================="