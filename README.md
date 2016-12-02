#Beginning Node.js

  1. Core Node.js
  2. Events and Streams	
  3. HTTP
  4. Express
  5. Persisting Data
  6. Simplifying Callbacks

#Core Node.js

##File-Based Module System

  `CommonJS module specification`

  * Each file is its own module
  * Each file has access to the current module definition using the module variable
  * The export of the current module is determited by the module.exports variable
  * To import a module, to use the globally avaiable require function

##Important Globals

  * __dirname 
  * __filename
  * process.argv
  * process.nextTick(callback)
  * Buffer

##Core Modules

  * path
    - path.normalize(str)
    - path.join([str1], [str2], ...)
    - path.dirname()
    - path.basename()
    - path.extname()

  * fs
    - fs.writeFileSync(path, text)
    - fs.readFileSync(path)
    - fs.unlinkSync(path)

  * os
    - os.totalmem()
    - os.freemem()

##npm
  
  ```
  npm init
  npm install
  npm install <module_name> --save
  npm rm <module_name> --save
  npm ls
  ```

#Streams

  * Readable stream
    process.stdin

  * Writable stream
    process.stdout

  * Duplex stream
    socket

  * Transform stream
    encryption and compression streams

#HTTP

#Express

  * body-parser
  * cookie-parser
  * cookie-session
  * express-session (better)
  * compression
  * connect-timeout

##Express Response Object

```
res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  'ETag': '12345'
});
```

```
res.get('content-type'); // case-insensitive
```

```
res.redirect('http://example.com');
res.redirect('/login');
res.redirect('../bar');
res.redirect(301, 'http://example.com');
```

```
res.send(404, 'These are not the droids you are looking for');
res.send({ some: 'json'}); // content-type: application/json
```

##Express Request Object

```
req.get('content-type');
req.is('json');
req.ip
req.secure
```

`URL Handling`

```
// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order
req.query.shoe.color
req.query.shoe.type
```

```
// GET /users?sort=desc
req.path
```
##REST

`collection` & `item`
* GET
* PUT
* POST
* DELETE

##Express Application Routes

* app.all()
* app.get()
* app.post()
* app.put()
* app.delete()
* app.route()

```
app.get('/user/:userId', function(req, res){
  res.end(`userId is: ${req.params['userId']}`)
});
```

##Express Router Object

#Persisting Data

##NoSQL

  * document database - MongoDB
  * key-value database - Redis

##Important MongoDB Concepts

database -> collections -> documents

* mongodb
* mongoose

#Simplifying Callbacks

`if/else in an async world`

```
function alwaysAsync(arg, cb) {
  if(arg) {
    process.nextTick(function(){
      cb('cached data');
    });
  } else {
    setTimeout(function(){
      cb('loaded data');
    }, 500);
  }
}
```

`loops in an async world`

* async

`error handling`

* try/catch
* promise
  - Q style

##Promise

PENDING -> SETTLED ( FULFILLED / REJECTED )

```
var Q = require('q');

var willFulfillDeferred = Q.defer();
var willFulfill = willFulfillDeferred.promise;
willFulfillDeferred.resolve('final value');

willFulfill
  .then(function(val){
    console.log('success with', val); 
  })
  .catch(funciton(reason){
    console.log('failed with', reason);
  });

// then always async! 
Q.when(null).then(function(val){
  console.log(val === null); //true
});

var readFileAsync = Q.nbind(fs.readFile);
```


