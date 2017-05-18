var port = 8055;
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname + '/ImagesInc'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

console.log('point your browser to localhost:'+port+'/index.html');

app.listen(port);

