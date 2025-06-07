const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');
const matter = require('gray-matter');

class WikiLinkParser {
  constructor(basePath) {
    this.basePath = basePath;
  }

  async parseFile(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    const { data, content: markdownContent } = matter(content);
    
    return {
      path: path.relative(this.basePath, filePath),
      title: data.title || path.basename(filePath, '.md'),
      tags: this.parseTags(markdownContent),
      links: this.parseWikiLinks(markdownContent),
      content: markdownContent,
      metadata: data
    };
  }

  parseWikiLinks(content) {
    const linkPattern = /\[\[([^\]]+)\]\]/g;
    const links = [];
    let match;
    
    while ((match = linkPattern.exec(content)) !== null) {
      links.push({
        raw: match[0],
        target: match[1],
        position: match.index
      });
    }
    
    return links;
  }

  parseTags(content) {
    const tagPattern = /#[^\s#,\.]+/g;
    const tags = content.match(tagPattern) || [];
    return [...new Set(tags)];
  }

  async getAllFiles() {
    try {
      const files = await glob(`${this.basePath}/**/*.md`);
      return files;
    } catch (err) {
      throw err;
    }
  }

  async buildKnowledgeGraph() {
    const files = await this.getAllFiles();
    const nodes = [];
    const edges = [];
    const tagIndex = {};
    
    for (const file of files) {
      const fileData = await this.parseFile(file);
      nodes.push({
        id: fileData.path,
        label: fileData.title,
        type: 'document',
        tags: fileData.tags
      });
      
      fileData.links.forEach(link => {
        edges.push({
          source: fileData.path,
          target: link.target,
          type: 'wiki-link'
        });
      });
      
      fileData.tags.forEach(tag => {
        if (!tagIndex[tag]) {
          tagIndex[tag] = [];
        }
        tagIndex[tag].push(fileData.path);
      });
    }
    
    Object.keys(tagIndex).forEach(tag => {
      nodes.push({
        id: tag,
        label: tag,
        type: 'tag'
      });
      
      tagIndex[tag].forEach(filePath => {
        edges.push({
          source: filePath,
          target: tag,
          type: 'has-tag'
        });
      });
    });
    
    return { nodes, edges };
  }
}

module.exports = WikiLinkParser;