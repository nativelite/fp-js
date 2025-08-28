import http from 'node:http';
import { createFingerprint } from '../dist/index.js';

const server = http.createServer(async (req, res) => {
  const headers: Record<string, string> = {};
  for (const [k, v] of Object.entries(req.headers)) headers[k] = String(v);

  const fp = await createFingerprint({
    // @ts-expect-error — Node options allowed
    headers,
    ip: (req.socket as any).remoteAddress
  });

  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(fp, null, 2));
});

server.listen(8080, () => console.log('listening on :8080'));