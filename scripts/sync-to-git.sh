#!/bin/bash

# iCloud → GitHub 同期スクリプト
# 使用方法: ./sync-to-git.sh "コミットメッセージ"

ICLOUD_PATH="/Users/taotokui/Library/Mobile Documents/com~apple~CloudDocs/taotokui_Obsidian/task-manager"
GIT_REPO_PATH="/Users/taotokui/task-manager/task-manager/personal-task-manager"

echo "🔄 iCloud → GitHub 同期を開始..."

# 1. iCloudの最新ファイルをGitリポジトリにコピー
echo "📁 ファイルをコピー中..."
cp "$ICLOUD_PATH/Projects/Task Management/project-plan.yaml" "$GIT_REPO_PATH/data/projects.md"
cp "$ICLOUD_PATH/Projects/Task Management/tasks.md" "$GIT_REPO_PATH/data/tasks.md"

# 2. Gitにコミット・プッシュ
cd "$GIT_REPO_PATH"
git add .
git commit -m "${1:-'Update from iCloud'} 

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
git push

echo "✅ 同期完了！GitHub: https://github.com/tokuitao/personal-task-manager"