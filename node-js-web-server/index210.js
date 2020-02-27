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
         res.write('PAGE IS NOT FOUND');
         res.end();
         break;
   }

   if (req.method === 'POST') {

   }
}).listen(8080);

// You need to make sure that the request come from `form` element by looking at
// `req.headers` property and then `content-type` property.
// The `content-type` property will have value of `application/x-www-form-urlencoded` if this request come from `form` element.
// Write another `if` statements inside previous `if`, where the `'content-type'`
// is a `form` element.
// Remember you could access object property with `.` or `[]`.