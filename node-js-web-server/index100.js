const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
   if (req.url === '/') {
      fs.readFile('', function () {
         res.write('Hello World');
         res.end();
      });
   }

});

// We already write a simple HTML files for you to show when different url is hit.
// in the path arguments, you could use `__dirname` global variable which refer to directory where the executing file is located.