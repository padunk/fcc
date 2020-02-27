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

            });
         }
      }
}).listen(8080);


// and then concat the stream of data and store it in body variable inside
// event emitter listener callback function.