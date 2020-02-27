const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');

http.createServer(function (req, res) {
   switch (req.url) {
      case '/':
         fs.readFile(__dirname + '/public/index.html', function (err, data) {
            if (err) throw err;
            res.write(data);
            res.end();
         });
         break;
      case '/products':
         fs.readFile(__dirname + '/public/products.html', function (err, data) {
            if (err) throw err;
            res.write(data);
            res.end();
         });
         break;
      case '/about':
         fs.readFile(__dirname + '/public/about.html', function (err, data) {
            if (err) throw err;
            res.write(data);
            res.end();
         });
         break;
      default:
         res.write('PAGE IS NOT FOUND');
         res.end();
         break;
   }
   if (req.method === 'POST') {
         if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            
         }
      }
}).listen(8080);

// How to handle the data inside it? You need to use Event emitter.
// Event emitter syntax is like this: `emitter.on(eventName, listener)`
// where eventName is the name of the event and listener is the callback function.
// Write the Event emitter where `emitter` is `req` object and `eventName:String` is `'data'`, leave the `listener:Function` callback to an empty function.