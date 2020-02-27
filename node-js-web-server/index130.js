const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
   if (req.url === '/') {
      fs.readFile(__dirname + '/public/index.html', function (err, data) {
         res.write('Hello World');
         res.end();
      });
   }
});

// You can use many logics to handling the `error` objects,
// but in this case, just use a common way to handle it with `if` and `throw`.
// write your error handling on the top of the callback function body.