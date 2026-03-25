#!/bin/bash
# 定时任务启动脚本

echo "启动定时任务系统..."

# 检查是否在OpenClaw workspace目录
if [ ! -f "./cron_tasks.yml" ]; then
    echo "错误：不在正确的目录或cron_tasks.yml不存在"
    exit 1
fi

echo "定时任务配置："
echo "1. 小说创作项目监控 - 每10分钟执行一次"
echo "2. 财经监控 - 每半小时执行一次"
echo "3. 国际局势监控 - 每小时执行一次"
echo "4. 定时任务执行监控 - 每5分钟执行一次"

echo ""
echo "测试各个监控脚本..."

# 测试小说创作项目监控
echo "测试小说创作项目监控..."
node ./cron/小说创作项目监控.js

# 测试财经监控
echo "测试财经监控..."
node ./cron/财经监控.js

# 测试国际局势监控
echo "测试国际局势监控..."
node ./cron/国际局势监控.js

# 测试定时任务执行监控
echo "测试定时任务执行监控..."
node ./cron/定时任务执行监控.js

echo ""
echo "定时任务系统已配置完毕！"
echo ""
echo "现在您需要将这些定时任务配置到OpenClaw的定时任务系统中："
echo ""
echo "方法1：使用openclaw定时任务命令"
echo "   openclaw schedule add --file cron_tasks.yml"
echo ""
echo "方法2：手动配置定时任务"
echo "   小说创作项目监控：每10分钟执行"
echo "   财经监控：每半小时执行"
echo "   国际局势监控：每小时执行"
echo "   定时任务执行监控：每5分钟执行"
echo ""
echo "脚本执行完毕！"