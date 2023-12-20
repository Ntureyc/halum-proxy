const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const proxyOptions = {
  target: 'http://node.glacier.host:3015',
  changeOrigin: true, // Needed for virtual hosted sites
  ws: true, // Proxy websockets
};

const proxy = createProxyMiddleware(proxyOptions);

app.use('/api', proxy); // Change '/api' to the path you want to proxy

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
