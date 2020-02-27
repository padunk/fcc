const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
   if (req.url === '/') {
      res.write('Hello World');
      res.end();
   }

});

// Next to read the file you could use readFile method.
// createFile method will take a path, an options and a callback as its arguments.
// write createFile method with path refer to empty string and callback (empty function) arguments only.
// Note: please put your res methods inside function callback.