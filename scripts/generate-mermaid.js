#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const WikiLinkParser = require('./link-parser');

async function generateMermaidGraph() {
  const knowledgeBase = path.join(__dirname, '..', 'knowledge');
  const outputPath = path.join(__dirname, '..', 'knowledge', 'KNOWLEDGE-GRAPH.md');
  
  try {
    const parser = new WikiLinkParser(knowledgeBase);
    const graphData = await parser.buildKnowledgeGraph();
    
    // Mermaid記法でグラフを生成
    let mermaidCode = '```mermaid\ngraph TD\n';
    
    // ノードのIDマッピング（Mermaidで使える形式に変換）
    const nodeIdMap = new Map();
    const sanitizeId = (id) => {
      return id.replace(/[^a-zA-Z0-9]/g, '_').replace(/^_+|_+$/g, '');
    };
    
    // ドキュメントノードを追加
    graphData.nodes.forEach((node, index) => {
      const safeId = `node${index}`;
      nodeIdMap.set(node.id, safeId);
      
      if (node.type === 'document') {
        mermaidCode += `    ${safeId}["📄 ${node.label}"]\n`;
      } else if (node.type === 'tag') {
        mermaidCode += `    ${safeId}[/"🏷️ ${node.label}"/]\n`;
      }
    });
    
    mermaidCode += '\n';
    
    // エッジを追加
    graphData.edges.forEach(edge => {
      const sourceId = nodeIdMap.get(edge.source);
      const targetId = nodeIdMap.get(edge.target);
      
      if (sourceId && targetId) {
        if (edge.type === 'wiki-link') {
          mermaidCode += `    ${sourceId} --> ${targetId}\n`;
        } else if (edge.type === 'has-tag') {
          mermaidCode += `    ${sourceId} -.-> ${targetId}\n`;
        }
      }
    });
    
    mermaidCode += '```\n';
    
    // スタイル定義
    const styles = `
\`\`\`mermaid
%%{init: {
  'theme': 'dark',
  'themeVariables': {
    'primaryColor': '#1e1e1e',
    'primaryTextColor': '#d4d4d4',
    'primaryBorderColor': '#0e639c',
    'lineColor': '#007acc',
    'secondaryColor': '#608b4e',
    'tertiaryColor': '#1e1e1e'
  }
}}%%
\`\`\`
`;

    // テキストベースのグラフも生成
    let textGraph = '\n## テキストベース表現\n\n';
    
    const docNodes = graphData.nodes.filter(n => n.type === 'document');
    docNodes.forEach(node => {
      textGraph += `### 📄 ${node.label}\n`;
      
      // このドキュメントからのリンク
      const outgoingLinks = graphData.edges
        .filter(e => e.source === node.id && e.type === 'wiki-link')
        .map(e => e.target);
      
      if (outgoingLinks.length > 0) {
        textGraph += '**リンク先:**\n';
        outgoingLinks.forEach(target => {
          const targetNode = graphData.nodes.find(n => n.id === target);
          if (targetNode) {
            textGraph += `- 🔗 ${targetNode.label}\n`;
          }
        });
      }
      
      // タグ
      const tags = graphData.edges
        .filter(e => e.source === node.id && e.type === 'has-tag')
        .map(e => {
          const tagNode = graphData.nodes.find(n => n.id === e.target);
          return tagNode ? tagNode.label : null;
        })
        .filter(Boolean);
      
      if (tags.length > 0) {
        textGraph += `**タグ:** ${tags.join(', ')}\n`;
      }
      
      textGraph += '\n';
    });
    
    // ファイル内容を作成
    const content = `# ナレッジグラフ

このファイルは自動生成されたナレッジグラフの可視化です。

## グラフビュー（Mermaid）

${mermaidCode}

${styles}

## 統計情報

- 📄 ドキュメント数: ${graphData.nodes.filter(n => n.type === 'document').length}
- 🏷️ タグ数: ${graphData.nodes.filter(n => n.type === 'tag').length}
- 🔗 リンク数: ${graphData.edges.filter(e => e.type === 'wiki-link').length}
- 📌 タグ関連数: ${graphData.edges.filter(e => e.type === 'has-tag').length}

${textGraph}

---
*最終更新: ${new Date().toLocaleString('ja-JP')}*
`;
    
    await fs.writeFile(outputPath, content);
    
    console.log(`✅ Mermaidグラフを生成しました: ${outputPath}`);
    console.log(`📊 ノード数: ${graphData.nodes.length}`);
    console.log(`🔗 エッジ数: ${graphData.edges.length}`);
    console.log('\n💡 GitHubやMarkdownプレビューツールで表示できます！');
    
  } catch (error) {
    console.error('❌ Mermaidグラフ生成エラー:', error);
    process.exit(1);
  }
}

generateMermaidGraph();