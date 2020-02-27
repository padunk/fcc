const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
   if (req.url === '/') {
      fs.readFile(__dirname + '/public/index.html', function () {
         res.write('Hello World');
         res.end();
      });
   }

});

// The callback function takes in two arguments: `error` and `data`.
// `error` is `Error` Objects so you can handling the error and
// `data` is the content of the file.
// write those two arguments in your function callback.