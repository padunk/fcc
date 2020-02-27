const http = require('http');
const fs = require('fs');

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
}).listen(8080);

// If you change the url like `.../abcde`, you will find a `PAGE IS NOT FOUND` message in the browser.

// Now if you go to `about` page, you could see there is a form  which user can submit. 
// You could see the method of this `form` when you click the submit button using `req.method`.
// log `req.method` in you console (put it after switch statements) and click the submit button.