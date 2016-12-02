var Q = require('q');
var fs = require('fs');
var readFileAsync = Q.nbind(fs.readFile);

function loadJSONAsync(filename){
    return readFileAsync(filename)
        .then(function(res){
            return JSON.parse(res);
        });
}
