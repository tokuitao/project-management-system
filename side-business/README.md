# D inc. プロジェクト管理システム

このディレクトリはD inc.関連のプロジェクトとタスクを管理するためのものです。

## ディレクトリ構造

```
side-business/
├── data/
│   ├── projects/          # D inc.プロジェクトの詳細情報
│   │   └── d-inc-projects.yaml
│   └── tasks/             # D inc.のタスク管理
│       └── d-inc-tasks.md
├── docs/                  # D inc.関連ドキュメント
│   └── d-inc-workflow-settings.md
└── scripts/               # D inc.用スクリプト
```

## 使い方

1. `data/projects/d-inc-projects.yaml` - D inc.プロジェクトの概要・進捗
2. `data/tasks/d-inc-tasks.md` - 日々のD inc.タスク
3. `docs/d-inc-workflow-settings.md` - D inc.用ワークフロー設定

## N.Avenue本業との分離

- N.Avenue本業: `/project-management-system/`
- D inc.: `/side-business/`

明確に分離管理されています。