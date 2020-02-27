const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
   if (req.url === '/') {
      fs.readFile(__dirname + '/public/index.html', function (err, data) {
         if (err) throw err;
         res.write('Hello World');
         res.end();
      });
   }

});

// Now all you need to do is serve the `data` inside `res.write` method to show
// index.html `data` to user.
