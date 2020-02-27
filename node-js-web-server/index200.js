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
   console.log(req.method);
}).listen(8080);

// Now we can handle and parse the form data from user.
// You could do it by write an `if` statements (outside switch statement)
// and write the conditional logics if the `req.method` is `'POST'`.
// write your `if` statements first.