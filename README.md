# Project Management System

AI-powered project management system with dual AI integration (Roo Code + Claude Code)

## Features

- 📋 **Project Management**: Comprehensive project tracking with YAML structure
- 📅 **Task Management**: Daily task organization and prioritization  
- 🤖 **AI Integration**: Dual AI system for different complexity levels
- 📊 **Progress Tracking**: Status monitoring and milestone management
- 💬 **Slack Integration**: Automated daily summaries

## Structure

```
project-management-system/
├── data/
│   ├── projects/           # Project definitions (YAML)
│   └── tasks/             # Task lists (Markdown)
├── docs/                  # Documentation and guides
├── scripts/               # Automation scripts
└── config/               # Configuration files
```

## AI Usage

### Daily Tasks (Cost-effective)
- **Tool**: Roo Code + Gemini API
- **Trigger**: "タスク整理を開始"
- **Output**: Slack-ready format

### Strategic Analysis (High-quality)
- **Tool**: Claude Code
- **Trigger**: "@claude [specific request]"
- **Use Cases**: Complex analysis, strategic planning

## Quick Start

1. Clone this repository
2. Set up AI integration (see docs/AI-USAGE-GUIDE.md)
3. Start managing projects and tasks
4. Use AI assistants for daily automation

## License

MIT License
