let http = require('http');
let fs = require('fs');

http.createServer((req, res) => {
  let fileName = '.' + req.url;
  if (fileName === './') {
      fileName = './index.html';
  }
  fs.readFile(fileName, function(err, file) {
    if (err) {
      res.writeHead(500);
      res.end('file not found: ' + err.code);
    } else {
      res.writeHead(200);
      res.end(file, 'utf-8');
    }
  });

}).listen(7777);
console.log('Listening at 7777');
