#!/bin/bash

echo "打包小说文件..."

# 创建小说打包目录
mkdir -p /root/.openclaw/workspace/snovel_package

# 复制小说文件
cp /root/.openclaw/workspace/织田信长小说.md /root/.openclaw/workspace/snovel_package/
cp /root/.openclaw/workspace/织田信长小说评审报告.md /root/.openclaw/workspace/snovel_package/
cp /root/.openclaw/workspace/丰臣秀吉小说.md /root/.openclaw/workspace/snovel_package/
cp /root/.openclaw/workspace/丰臣秀吉小说评审报告.md /root/.openclaw/workspace/snovel_package/
cp /root/.openclaw/workspace/织田信长矛盾小说.md /root/.openclaw/workspace/snovel_package/
cp /root/.openclaw/workspace/织田信长矛盾小说评审报告.md /root/.openclaw/workspace/snovel_package/

# 复制项目文档
cp /root/.openclaw/workspace/小说交付摘要.md /root/.openclaw/workspace/snovel_package/
cp /root/.openclaw/workspace/小说项目当前进度.md /root/.openclaw/workspace/snovel_package/
cp /root/.openclaw/workspace/定时任务配置文档.md /root/.openclaw/workspace/snovel_package/

# 压缩文件
cd /root/.openclaw/workspace/snovel_package
tar -czf 小说文件.tar.gz *.md

echo "小说文件打包完成：/root/.openclaw/workspace/snovel_package/小说文件.tar.gz"

# 显示文件列表
echo "打包的文件："
ls -la /root/.openclaw/workspace/snovel_package/

echo ""
echo "文件大小："
du -sh /root/.openclaw/workspace/snovel_package/小说文件.tar.gz