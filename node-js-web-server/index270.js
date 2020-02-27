const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');

http.createServer(function (req, res) {
   switch (req.url) {
      case '/':
         fs.readFile(__dirname + '/public/index.html', function (err, data) {
            if (err) throw err;
            res.write(data);
            res.end();
         });
         break;
      case '/products':
         fs.readFile(__dirname + '/public/products.html', function (err, data) {
            if (err) throw err;
            res.write(data);
            res.end();
         });
         break;
      case '/about':
         fs.readFile(__dirname + '/public/about.html', function (err, data) {
            if (err) throw err;
            res.write(data);
            res.end();
         });
         break;
      default:
         res.statusCode = 404;
         res.statusMessage = 'Not Found';
         res.write(res.statusMessage);
         res.end();
         break;
   }
   if (req.method === 'POST') {
         if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            let body = '';
            req.on('data', function (chunk) {
               body += chunk;
            });
         }
      }
}).listen(8080);


// You need `end` event emitter to tell the server that the response is complete.
// Write and `end` event for the `req` object.