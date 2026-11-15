const fs = require('fs');
const path = require('path');
const http = require('http');

// Statically read files so Vercel bundles them into serverless lambda
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'));
let pamperHtml = indexHtml;
try {
  pamperHtml = fs.readFileSync(path.join(__dirname, 'pamper-hub.html'));
} catch (e) {
  pamperHtml = indexHtml;
}

function handler(req, res) {
  const url = (req.url || '/').split('?')[0].toLowerCase();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  if (url.includes('pamper')) {
    res.end(pamperHtml);
  } else {
    res.end(indexHtml);
  }
}

module.exports = handler;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const server = http.createServer(handler);
  server.listen(PORT, () => console.log(`Listening on ${PORT}`));
}
