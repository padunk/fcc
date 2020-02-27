const http = require('http');

http.createServer();

// The server is running, but won't do anything if it gets a request.
// To deal with any requests to the server, first pass a callback function
// to `createServer`. Here's an example of passing a callback function to `setTimeout`:
// ```
// setTimeout(function() {

// });
// ```