const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
   if (req.url === '/') {
      fs.readFile(__dirname, function () {
         res.write('Hello World');
         res.end();
      });
   }

});

// Now you could add the folder and the HTML file if the user hit `/` url
// This example will lead to `static` folder and `hello.html` file
// ```
// '/static/hello.html'
// ```
// write the path to show `index.html` in the `public` folder and concatenate it with `__dirname` global variable.