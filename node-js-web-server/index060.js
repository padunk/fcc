const http = require('http');

http.createServer(function (req, res) {
   console.log(req.url);
});

// Now you can also write back the response by using `write` method
// on the res parameters. Write your first 'Hello World' response only
// if the url is home (home url is `/`). Don't forget to end your response
// by using `end` method to indicate that all response have been sent.