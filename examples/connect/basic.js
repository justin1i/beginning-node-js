var util = require('util');
function logit (req, res, next) {
  util.log(util.format('Request recieved: %s, %s', req.method, req.url));
  next();
}


function echo (req, res, next) {
  req.pipe(res);
}


// Configurable middleware creator
function greeter (message) {
  return function(req,res, next) {
    res.end(message);
  };
}
var helloWorldGreeter = greeter('Hello World!');
var heyThereGreeter = greeter('Hey there!');


function parseJSON (req, res, next) {
  if (req.headers['content-type'] === 'application/json') {
    var readData = '';
    req.on('readable', function() {
      var content = req.read();
      if (content !== null) {
        readData += content;
      }
    });
    req.on('end', function() {
      try{
        req.body = JSON.parse(readData);
      }catch(e) {}
      next();
    });
  } else {
    next();
  }
}


var connect = require('connect');
connect()
  .use(parseJSON)
  .use(logit)
  .use('/echo', echo)
  .use('/hello', helloWorldGreeter)
  .use('/hey', heyThereGreeter)
  .use(function(req, res) {
    if (req.body) {
      res.end('JSON parsed! value of foo: ' + req.body.foo);
    } else {
      res.end('no JSON detected');
    }
  })
  .listen(3000);
console.log('server running on port 3000');