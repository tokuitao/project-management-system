# プロジェクト管理システム フロー文書

## 現在の構成

### ディレクトリ構造
```
Knowledge-Base/
├── project-management-system/    # メインプロジェクト
├── project-management/          # プロジェクト管理ガイド
├── task-manager/               # タスク管理（現在地）
│   ├── docs/                   # ドキュメント
│   ├── data/                   # データファイル
│   │   ├── projects/           # YAMLプロジェクト定義
│   │   └── tasks/              # Markdownタスクリスト
│   ├── scripts/                # 自動化スクリプト
│   └── knowledge/              # ナレッジベース（新規追加予定）
└── task-manager-backup/        # バックアップ
```

## これまでの実施内容

1. **環境整備**
   - Difyフォルダの削除とDockerサービス停止
   - taotokui_ObsidianをKnowledge-Baseに名称変更
   - iCloud Drive内での一元管理

2. **Git設定**
   - 初回コミット完了
   - sync-progressエイリアス設定
   - GitHubリポジトリとの連携準備

3. **ナレッジ管理計画**
   - Obsidian的な機能の実装検討
   - [[リンク]]と#タグシステムの設計
   - グラフビュー可視化の計画

## 今後の実装フロー

### Phase 1: 基盤整備
- [ ] GitHubリモート設定
- [ ] 基本ディレクトリ構造の作成
- [ ] READMEの更新

### Phase 2: ナレッジシステム構築
- [ ] Markdownリンクパーサーの実装
- [ ] タグシステムの実装
- [ ] ナレッジファイルの自動解析

### Phase 3: 可視化
- [ ] Cytoscape.jsによるグラフビュー
- [ ] インタラクティブな操作
- [ ] リアルタイム更新

## 運用フロー

### 日常作業
1. Claude Codeでの開発・編集
2. sync-progressで定期的にGitHubへプッシュ
3. 外出時はGeminiでGitHub経由で進捗確認

### ナレッジ管理
1. 新規ノート作成時、Claude Codeが自動でタグ・リンク提案
2. グラフビューで関連性を確認
3. 知識の蓄積と可視化

## コマンドリファレンス

```bash
# 進捗同期
sync-progress

# グラフビュー起動（実装後）
npm run graph-view

# ナレッジインデックス更新（実装後）
npm run build-knowledge
```