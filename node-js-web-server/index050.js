const http = require('http');

http.createServer(function (req, res) {
   
});

// Now you have access to user request and give response back.
// req parameters contain a class `http.IncomingMessage` which have some
// methods to access response status, headers and data.
// To check the request headers, you could use headers method like 
// `req.headers;`
// Try logging the request url by using the `url` method.