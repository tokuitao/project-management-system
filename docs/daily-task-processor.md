# Daily Task Processor - Claude AI統合

## 使用方法

### 1. **日々のタスク整理**
```
@claude タスク整理を開始
```
↓ GitHub Issueに投稿すると、Claude Code Actionが自動実行

### 2. **出力フォーマット** 
```
【本日の予定（ミーティング）】
・13:00-14:00 [KDDI様 連携MTG]
・17:00-18:00 [改善ポイントMTG]

---

■ 営業関連
N.Avenue Club 第3期▼
・次週の商談での提案概要を作成
・営業・イベント定例MTG準備

■ 新規事業開発  
Solanaアクセラレーションプログラム▼
・先方からフィードバックをいただくミーティングを設定

■ 社内定例
改善ポイントMTG▼
・3期へ向けた戦略検討
```

### 3. **iCloud ↔ GitHub 同期**

**手動同期**:
```bash
cd /Users/taotokui/Library/Mobile\ Documents/com~apple~CloudDocs/taotokui_Obsidian/task-manager
./sync-to-git.sh "5月31日のタスク更新"
```

**自動化** (任意):
- Automator/Shortcuts アプリで定期実行
- Obsidian プラグインでGit同期

## AI連携フロー

1. **iCloudで編集** → Obsidian日々作業
2. **GitHub Issues** → `@claude タスク整理を開始`
3. **Claude処理** → Slack共有フォーマット生成
4. **必要時同期** → `./sync-to-git.sh`

## メリット

✅ **iCloud**: オフライン編集、デバイス間同期  
✅ **GitHub**: バージョン管理、Claude AI連携  
✅ **Obsidian**: リッチな編集体験  
✅ **Claude**: 自動整理、Slack共有