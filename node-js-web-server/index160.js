const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
   if (req.url === '/') {
      fs.readFile(__dirname + '/public/index.html', function (err, data) {
         if (err) throw err;
         res.write(data);
         res.end();
      });
   }
}).listen(8080);

// Voila!, now your server is running.
// Next thing to do is that we currently have three html files in our 
// public directory. If we look at the console.log(req.url) every time we clicked the
// link in our navigation bar, we could see the url for every link.
// You can use if else condition or switch to render all three html files for the user.
// For concise code, you could change the `if` operator into `switch` operator.