#!/usr/bin/env node

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'web')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'web', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`📊 Knowledge Graph Viewer is running at http://localhost:${PORT}`);
    console.log('🛑 Press Ctrl+C to stop');
});

process.on('SIGINT', () => {
    console.log('\n👋 Shutting down server...');
    process.exit(0);
});