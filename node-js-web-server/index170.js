const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
   console.log(req.url, req.method);
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
         break;
   }
}).listen(8080);

// Looks great, now we can switch between pages by clicking on the link
// in our navigation bar. 
// If you check the url, it will change too as you move between pages.
// But sometimes when we visit a website we encountered a 404 page, which
// happening when the page we are looking for is not there.
// How to handle it?
// You could put it on the default logics if the url is not found.
// Write a text to inform user if the page they're looking for is not found
// the text content should be 'PAGE IS NOT FOUND'.