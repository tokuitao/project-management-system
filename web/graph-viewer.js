let cy;
let graphData;

async function loadGraphData() {
    try {
        const response = await fetch('graph-data.json');
        graphData = await response.json();
        initializeCytoscape();
    } catch (error) {
        console.error('グラフデータの読み込みエラー:', error);
    }
}

function initializeCytoscape() {
    const elements = [];
    
    graphData.nodes.forEach(node => {
        elements.push({
            data: { 
                id: node.id, 
                label: node.label,
                type: node.type,
                tags: node.tags || []
            }
        });
    });
    
    graphData.edges.forEach(edge => {
        elements.push({
            data: { 
                source: edge.source, 
                target: edge.target,
                type: edge.type
            }
        });
    });
    
    cy = cytoscape({
        container: document.getElementById('cy'),
        elements: elements,
        style: [
            {
                selector: 'node[type="document"]',
                style: {
                    'background-color': '#0e639c',
                    'label': 'data(label)',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'color': '#ffffff',
                    'text-outline-width': 2,
                    'text-outline-color': '#1e1e1e',
                    'font-size': '12px',
                    'width': 40,
                    'height': 40
                }
            },
            {
                selector: 'node[type="tag"]',
                style: {
                    'background-color': '#608b4e',
                    'label': 'data(label)',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'color': '#ffffff',
                    'text-outline-width': 2,
                    'text-outline-color': '#1e1e1e',
                    'font-size': '10px',
                    'shape': 'roundrectangle',
                    'width': 'label',
                    'height': 30,
                    'padding': 10
                }
            },
            {
                selector: 'edge[type="wiki-link"]',
                style: {
                    'width': 2,
                    'line-color': '#007acc',
                    'target-arrow-color': '#007acc',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                }
            },
            {
                selector: 'edge[type="has-tag"]',
                style: {
                    'width': 1,
                    'line-color': '#608b4e',
                    'line-style': 'dashed',
                    'curve-style': 'bezier'
                }
            },
            {
                selector: ':selected',
                style: {
                    'background-color': '#ff8c00',
                    'line-color': '#ff8c00',
                    'target-arrow-color': '#ff8c00'
                }
            }
        ],
        layout: {
            name: 'cose',
            animate: true,
            animationDuration: 1000,
            nodeRepulsion: 400000,
            idealEdgeLength: 100,
            edgeElasticity: 100,
            nestingFactor: 5,
            gravity: 80,
            numIter: 1000,
            initialTemp: 200,
            coolingFactor: 0.95,
            minTemp: 1.0
        }
    });
    
    cy.on('tap', 'node', function(evt){
        const node = evt.target;
        showNodeInfo(node);
    });
    
    setupFilters();
    setupSearch();
}

function showNodeInfo(node) {
    const data = node.data();
    let info = `<h4>${data.label}</h4>`;
    info += `<p>タイプ: ${data.type}</p>`;
    
    if (data.tags && data.tags.length > 0) {
        info += `<p>タグ: ${data.tags.join(', ')}</p>`;
    }
    
    const connectedEdges = node.connectedEdges();
    const connectedNodes = connectedEdges.connectedNodes().filter(n => n.id() !== node.id());
    
    if (connectedNodes.length > 0) {
        info += '<p>接続:</p><ul>';
        connectedNodes.forEach(n => {
            info += `<li>${n.data('label')}</li>`;
        });
        info += '</ul>';
    }
    
    document.getElementById('node-info').innerHTML = info;
}

function setupFilters() {
    document.getElementById('show-documents').addEventListener('change', updateVisibility);
    document.getElementById('show-tags').addEventListener('change', updateVisibility);
}

function updateVisibility() {
    const showDocs = document.getElementById('show-documents').checked;
    const showTags = document.getElementById('show-tags').checked;
    
    cy.nodes().forEach(node => {
        const type = node.data('type');
        if ((type === 'document' && !showDocs) || (type === 'tag' && !showTags)) {
            node.hide();
        } else {
            node.show();
        }
    });
}

function setupSearch() {
    document.getElementById('search').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm === '') {
            cy.nodes().removeClass('hidden');
        } else {
            cy.nodes().forEach(node => {
                const label = node.data('label').toLowerCase();
                if (label.includes(searchTerm)) {
                    node.removeClass('hidden');
                } else {
                    node.addClass('hidden');
                }
            });
        }
    });
}

function resetView() {
    cy.reset();
}

function fitView() {
    cy.fit();
}

document.addEventListener('DOMContentLoaded', loadGraphData);