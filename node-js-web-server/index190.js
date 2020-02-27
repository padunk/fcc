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
   console.log(req.method);
}).listen(8080);

// You should see `POST` message in your console when user / you clicked the submit button.
// To handle information giving by the user through form elements, first we need to use `{parse}` method from `querystring` module.
// Include it in your code.