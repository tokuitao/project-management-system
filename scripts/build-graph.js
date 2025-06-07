#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const WikiLinkParser = require('./link-parser');

async function buildGraph() {
  const knowledgeBase = path.join(__dirname, '..', 'knowledge');
  const outputPath = path.join(__dirname, '..', 'web', 'graph-data.json');
  
  try {
    const parser = new WikiLinkParser(knowledgeBase);
    const graphData = await parser.buildKnowledgeGraph();
    
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    
    await fs.writeFile(
      outputPath,
      JSON.stringify(graphData, null, 2)
    );
    
    console.log(`✅ グラフデータを生成しました: ${outputPath}`);
    console.log(`📊 ノード数: ${graphData.nodes.length}`);
    console.log(`🔗 エッジ数: ${graphData.edges.length}`);
    
  } catch (error) {
    console.error('❌ グラフ生成エラー:', error);
    process.exit(1);
  }
}

buildGraph();