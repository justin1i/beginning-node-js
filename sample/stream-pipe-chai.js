var gzip = require('zlib').createGzip();
var fs = require('fs');
var path = require('path');

var inp = fs.createReadStream(path.join(__dirname,'cool.txt'));
var out = fs.createWriteStream(path.join(__dirname, 'cool.txt.gz'));

inp.pipe(gzip).pipe(out);
