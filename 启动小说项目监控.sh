#!/bin/bash

echo "启动小说项目监控系统..."

# 创建 cron 任务文件夹
mkdir -p /root/.openclaw/workspace/cron_tasks
mkdir -p /root/.openclaw/workspace/cron

# 复制监控配置文件到 cron 文件夹
cp /root/.openclaw/workspace/cron_tasks/小说项目监控.yml /root/.openclaw/workspace/cron/小说项目监控.yml

echo "小说项目监控定时任务已配置为每5分钟执行一次"

# 运行一次测试监控
cd /root/.openclaw/workspace && node 小说项目定时监控脚本.js --run

echo "监控系统已启动，将在每5分钟自动执行"