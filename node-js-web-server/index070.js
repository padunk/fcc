const http = require('http');

http.createServer(function (req, res) {
   if (req.url === '/') {
      res.write('Hello World');
      res.end();
   }
});