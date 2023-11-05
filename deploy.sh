#!/usr/bin/env sh
# deploy.sh
# 错误时停止
set -e
git push -f origin main

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

# 将当前 dist 仓库的 main 分支 提交到 xxx 项目的 gh-pages 分支
git push -f git@github.com:martinniee/youtube-home-page-learning-project.git main:gh-pages
if [ $? -ne 0 ]; then
   echo -e "\033[32m Failed to push dist folder to gh-pages branch on origin \033[0m"
else
   echo -e "\033[33m Push the  dist folder to gh-pages branch on origin successfully \033[0m"
   rm -rf .git
fi
cd - 