/**
 * scripts/serve.js
 * Zero-dependency static HTTP server for Puck & Wick.
 * Serves the project directory on port 3000 by default.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

export function createServer(options = {}) {
  const root = options.root || ROOT_DIR;

  const server = http.createServer((req, res) => {
    // Add CORS & No-Cache headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
      return;
    }

    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') {
      reqPath = '/index.html';
    }

    // Normalize and prevent directory traversal
    const safePath = path.normalize(reqPath).replace(/^(\.\.[/\\])+/, '');
    let filePath = path.join(root, safePath);

    // If path is a directory, check for index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`404 Not Found: ${reqPath}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      const fileStream = fs.createReadStream(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      fileStream.pipe(res);
      fileStream.on('error', (err) => {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(`500 Internal Server Error: ${err.message}`);
        }
      });
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`500 Internal Server Error: ${err.message}`);
    }
  });

  return server;
}

export function startServer(port = 3000, options = {}) {
  return new Promise((resolve, reject) => {
    const server = createServer(options);
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // Port already in use - assume server is running
        resolve({ server: null, port, alreadyRunning: true });
      } else {
        reject(err);
      }
    });

    server.listen(port, '0.0.0.0', () => {
      resolve({ server, port, alreadyRunning: false });
    });
  });
}

// CLI entrypoint
const isMain = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isMain) {
  const port = parseInt(process.argv[2] || process.env.PORT || '3000', 10);
  startServer(port).then(({ port, alreadyRunning }) => {
    if (alreadyRunning) {
      console.log(`[Puck & Wick Server] Server is already running on http://localhost:${port}`);
    } else {
      console.log(`[Puck & Wick Server] Serving at http://localhost:${port} (root: ${ROOT_DIR})`);
    }
  }).catch((err) => {
    console.error(`[Puck & Wick Server Error]`, err);
    process.exit(1);
  });
}
