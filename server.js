require('dotenv').config();
const http = require('http');

const PORT = Number(process.env.PORT || 4000);
const GROK_API_KEY = process.env.GROK_API_KEY;
const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';

const defaultHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
};

const parseBody = (req) => new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
});

const extractAnswer = (grokData) => {
    if (!grokData) return null;
  if (grokData.choices && grokData.choices.length > 0) {
    return grokData.choices[0].message?.content || null;
  }
    if (typeof grokData.response === 'string') return grokData.response;
    if (Array.isArray(grokData.output) && grokData.output.length > 0) {
        return grokData.output.map((item) => item?.content ?? item).join('\n');
    }
    return JSON.stringify(grokData);
};

const server = http.createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, defaultHeaders);
        res.end();
        return;
    }

    if (req.url === '/api/grok' && req.method === 'POST') {
    res.writeHead(200, { ...defaultHeaders, 'Content-Type': 'application/json' });

    if (!GROK_API_KEY) {
      res.end(JSON.stringify({ error: 'GROK_API_KEY environment variable is not set' }));
      return;
    }

    try {
      const rawBody = await parseBody(req);
      const { message } = JSON.parse(rawBody || '{}');

      if (!message || typeof message !== 'string') {
        res.end(JSON.stringify({ error: 'Invalid request body: expected { message: string }' }));
        return;
      }

      const apiResponse = await fetch(GROK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'grok-4-1-fast-reasoning',
          messages: [{ role: 'user', content: message }]
        })
      });

      const grokData = await apiResponse.json();
      const answer = extractAnswer(grokData) || 'No answer was returned by Grok.';
      res.end(JSON.stringify({ answer }));
    } catch (error) {
      console.error('Grok proxy error:', error);
      res.writeHead(500, { ...defaultHeaders, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to call Grok API' }));
    }

    return;
  }

  res.writeHead(404, { ...defaultHeaders, 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`Grok proxy server listening on http://localhost:${PORT}`);
  if (!GROK_API_KEY) {
    console.warn('Warning: GROK_API_KEY is not set. Set it in your environment before running the server.');
  }
});
