# AI駆動プロジェクト管理システム + ナレッジグラフ

AI-powered project management system with knowledge graph visualization

## 主な機能

- 📋 **プロジェクト管理**: YAMLベースの体系的なプロジェクト管理
- 📅 **タスク管理**: AIによる日次タスクの整理と優先度設定
- 🧠 **ナレッジグラフ**: Obsidian風の知識管理・可視化（新機能）
- 🤖 **マルチAI統合**: Claude Code + Roo Code + Gemini連携
- 📊 **進捗追跡**: リアルタイムステータス監視
- 💬 **Slack連携**: 自動日次サマリー

## ディレクトリ構成

```
task-manager/
├── data/
│   ├── projects/          # プロジェクト定義 (YAML)
│   └── tasks/            # タスクリスト (Markdown)
├── docs/                 # ドキュメント・ガイド
│   └── PROJECT-FLOW.md   # プロジェクト全体のフロー
├── scripts/              # 自動化スクリプト
├── knowledge/            # ナレッジベース（新規）
│   ├── topics/           # トピック別ノート
│   ├── references/       # 参考資料・クリップ
│   └── daily/            # デイリーノート
└── CLAUDE.md             # Claude設定

```

## AI活用方法

### 日常タスク（コスト効率）
- **ツール**: Roo Code + Gemini API
- **トリガー**: "タスク整理を開始"
- **出力**: Slack対応フォーマット

### 戦略的分析・開発（高品質）
- **ツール**: Claude Code
- **トリガー**: "@claude [具体的な要求]"
- **用途**: 複雑な分析、戦略立案、実装

### 進捗確認（外出先対応）
- **ツール**: Gemini + GitHub連携
- **方法**: GitHubリポジトリをインポート
- **用途**: プロジェクト状況の把握

## ナレッジグラフ機能（新規）

### 概要
- `[[ページ名]]`形式でページ間をリンク
- `#タグ`でコンテンツを分類
- グラフビューで知識の関連性を可視化
- Claude Codeが自動でタグ・リンクを提案

### 使い方
```bash
# 進捗同期
sync-progress

# グラフビュー表示（実装予定）
npm run graph-view

# ナレッジインデックス更新（実装予定）
npm run build-knowledge
```

## クイックスタート

1. リポジトリをクローン
2. AI統合の設定（docs/AI-USAGE-GUIDE.md参照）
3. sync-progressエイリアスの設定
4. プロジェクトとタスクの管理開始

## License

MIT License
