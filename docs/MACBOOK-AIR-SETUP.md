# MacBook Air セットアップ手順

## 実行記録
- **実行日時**: 2025年6月7日 21:40頃
- **実行者**: MacBook Air（サブ機）でのClaude Code初期設定
- **状況**: MacBook Proで構築したプロジェクト管理システムをサブ機でも利用可能にする

## マルチデバイス環境概要

### メイン機（MacBook Pro）
- **プロジェクト場所**: `~/Library/Mobile Documents/com~apple~CloudDocs/Knowledge-Base/task-manager`
- **役割**: 主要開発・実装作業
- **特徴**: iCloud Drive内で管理、フル機能利用

### サブ機（MacBook Air）
- **プロジェクト場所**: `~/project-management-system`
- **役割**: 外出先での進捗確認・軽微な修正
- **特徴**: GitHubを中心とした同期、モバイル対応

### 同期戦略
1. **GitHubが中核** - 両デバイス間の主要同期手段
2. **sync-progressコマンド** - 簡単な進捗同期
3. **Claude Code** - 同一アカウントで両デバイス利用

## 1. プロジェクトのクローン

```bash
# プロジェクトをクローン
cd ~
git clone https://github.com/tokuitao/project-management-system.git

# iCloud Driveにシンボリックリンク作成（オプション）
ln -s ~/project-management-system ~/Library/Mobile\ Documents/com~apple~CloudDocs/Knowledge-Base/task-manager
```

## 2. sync-progressエイリアスの設定

```bash
# .zshrcにエイリアスを追加
echo 'alias sync-progress="cd ~/project-management-system && git add . && git commit -m \"WIP: $(date +%Y-%m-%d\ %H:%M)\" && git push"' >> ~/.zshrc

# 設定を反映
source ~/.zshrc
```

## 3. プロジェクトディレクトリ移動と依存関係インストール

```bash
# プロジェクトディレクトリに移動
cd ~/project-management-system

# package.jsonがある場合は依存関係をインストール
npm install
```

## 4. Git設定（必要に応じて）

```bash
# ユーザー名とメールアドレスを設定
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 5. 基本的な使い方

```bash
# Claude Codeを起動
claude

# プロジェクトの最新情報を取得
cd ~/project-management-system
git pull

# 作業後の同期
sync-progress

# ナレッジグラフの更新（knowledge/フォルダ内にMarkdownファイルがある場合）
npm run generate-mermaid
```

## 6. 重要なファイルパス

- プロジェクト: `~/project-management-system`
- ナレッジベース: `~/project-management-system/knowledge/`
- ドキュメント: `~/project-management-system/docs/`
- スクリプト: `~/project-management-system/scripts/`

## 7. よく使うコマンド

```bash
# プロジェクトに移動
cd ~/project-management-system

# 最新の変更を取得
git pull

# 進捗を同期
sync-progress

# ナレッジグラフ生成
npm run generate-mermaid

# 全ビルド（グラフデータ + Mermaid）
npm run build-all
```

## 8. トラブルシューティング

### npmコマンドが見つからない場合
```bash
# Homebrewでインストール
brew install node
```

### git pushで権限エラーが出る場合
```bash
# GitHub CLIをインストール
brew install gh

# 認証
gh auth login
```

---
*このドキュメントを参照してMacBook Airの環境を構築してください*