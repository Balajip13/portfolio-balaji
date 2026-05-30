import http from 'http';
import fs from 'fs';

try {
  const envContent = fs.readFileSync('.env', 'utf8');
  envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      if (key && val) {
        process.env[key] = val;
      }
    }
  });
  console.log('🔑 Environment variables loaded from .env');
} catch (e) {
  console.log('⚠️ Local .env file not loaded (using process.env instead).');
}

import handler from './api/contact.js';

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/api/contact' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      let parsedBody = {};
      try {
        parsedBody = JSON.parse(body);
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid JSON request' }));
        return;
      }

      const mockReq = {
        method: 'POST',
        body: parsedBody,
        headers: req.headers
      };

      const mockRes = {
        statusCode: 200,
        status(code) {
          this.statusCode = code;
          return this;
        },
        json(data) {
          res.writeHead(this.statusCode, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(data));
        }
      };

      try {
        await handler(mockReq, mockRes);
      } catch (err) {
        console.error('Local Server Error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Unable to send message' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Local Serverless API Mock Server running on http://localhost:${PORT}`);
  console.log(`📡 Vite dev server proxy is now connected!`);
});
