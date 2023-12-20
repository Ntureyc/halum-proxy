var httpProxy = require('http-proxy');

var proxy = httpProxy.createServer({
  target:'http://node.glacier.host:3015'
});

proxy.listen(443);

proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong. And we are reporting a custom error message.');
});

proxy.on('proxyRes', function (proxyRes, req, res) {
  console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});

proxy.on('open', function (proxySocket) {
  proxySocket.on('data', hybiParseAndLogMessage);
});

proxy.on('close', function (res, socket, head) {
  console.log('Client disconnected');
});
