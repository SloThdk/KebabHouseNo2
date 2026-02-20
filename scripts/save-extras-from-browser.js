// Extract extras data from localStorage where we saved it via browser console
// This uses puppeteer-core to connect to the running browser or we can use a simple approach

const fs = require('fs');
const https = require('https');

// Since we can't easily connect to the running browser from Node,
// let's use a different approach: we'll start a local HTTP server that the browser POSTs to

const http = require('http');
const path = require('path');

const outPath = path.join(__dirname, '..', 'data', 'extras-per-item.json');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      fs.writeFileSync(outPath, body);
      console.log(`Saved ${body.length} chars to ${outPath}`);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('OK');
      server.close();
      process.exit(0);
    });
  }
});

server.listen(19876, () => {
  console.log('Listening on port 19876 - POST the data from browser console');
});

// Auto-close after 30s
setTimeout(() => { server.close(); process.exit(1); }, 30000);
